using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace nova_webserver.Controllers
{
    public class FileSystemController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage GetFileSystemEntries([FromBody]GetFileSystemEntriesRequest getFileSystemEntriesRequest)
        {
            if (getFileSystemEntriesRequest.Path == "/")
            {
                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    Success = true,
                    CurrentWorkingDirectory = getFileSystemEntriesRequest.Path,
                    Entries = DriveInfo.GetDrives().Where(d => d.IsReady && d.DriveType == DriveType.Fixed).Select(drive => new
                    {
                        Name = drive.Name,
                        Type = "Drive",
                        FullName = drive.RootDirectory.FullName,
                        TotalFreeSpace = drive.TotalFreeSpace,
                        TotalSize = drive.TotalSize,
                        AvailableFreeSpace = drive.AvailableFreeSpace,
                        DriveFormat = drive.DriveFormat,
                        DriveType = drive.DriveType,
                        RootDirectory = drive.RootDirectory.FullName
                    })
                });
            }
            else
            {
                var directoryInfo = new DirectoryInfo(getFileSystemEntriesRequest.Path);
                var fileEntries = directoryInfo.GetFileSystemInfos();
                List<object> entries = new List<object>();

                foreach(var fileEntry in fileEntries.Where(fe => fe.Attributes.HasFlag(FileAttributes.Directory)).OrderBy(fe => fe.Name.Substring(0, 1)))
                {
                    entries.Add(new
                    {
                        Name = fileEntry.Name,
                        Type = "Directory",
                        FullName = fileEntry.FullName,
                        LastAccessTime = fileEntry.LastAccessTime.ToString(),
                        CreationTime = fileEntry.CreationTime.ToString(),                        
                        Attributes = GetAttributesString(fileEntry.Attributes, new List<FileAttributes>() { FileAttributes.ReadOnly, FileAttributes.Hidden }),
                        LastWriteTime = fileEntry.LastWriteTime.ToString()
                    });
                }

                foreach (var fileEntry in fileEntries.Where(fe => !fe.Attributes.HasFlag(FileAttributes.Directory)).OrderBy(fe => fe.Name.Substring(0, 1)))
                {
                    entries.Add(new
                    {
                        Name = fileEntry.Name,
                        Type = "File",
                        FullName = fileEntry.FullName,
                        LastAccessTime = fileEntry.LastAccessTime.ToString(),
                        CreationTime = fileEntry.CreationTime.ToString(),
                        Extension = fileEntry.Extension,
                        Attributes = GetAttributesString(fileEntry.Attributes, new List<FileAttributes>() { FileAttributes.ReadOnly, FileAttributes.Hidden }),
                        LastWriteTime = fileEntry.LastWriteTime.ToString(),
                        Size = new FileInfo(fileEntry.FullName).Length.BytesToString()
                    });
                }


                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    Success = true,
                    CurrentWorkingDirectory = directoryInfo.FullName,
                    Entries = entries
                });
            }
            
        }

        [HttpPost]
        public HttpResponseMessage DeleteFileSystemEntry([FromBody] DeleteFileSystemEntryRequest deleteFileSystemEntryRequest)
        {
            var fileInfo = new FileInfo(deleteFileSystemEntryRequest.Path);

            if(File.Exists(deleteFileSystemEntryRequest.Path))
            {
                fileInfo.DeleteReadOnly();
            }
            else if(Directory.Exists(deleteFileSystemEntryRequest.Path))
            {
                var directoryInfo = new DirectoryInfo(deleteFileSystemEntryRequest.Path);
                directoryInfo.DeleteReadOnly();
            }
            else
            {
                Request.CreateResponse(HttpStatusCode.BadRequest, new { Success = false, Errors = new string[] { "Specified file system entry does not exist" } });
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { Success = true, Data = deleteFileSystemEntryRequest.Path });
        }

        [HttpPost]
        public HttpResponseMessage ShowFileProperties([FromBody] ShowFilePropertiesRequest showFilePropertiesRequest)
        {
            var fileInfo = new FileInfo(showFilePropertiesRequest.Path);

            if (File.Exists(showFilePropertiesRequest.Path))
            {
                Extensions.ShowFilePropertiesDialog(showFilePropertiesRequest.Path);
            }
            else if (Directory.Exists(showFilePropertiesRequest.Path))
            {
                Extensions.ShowFilePropertiesDialog(showFilePropertiesRequest.Path);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Success = false, Errors = new string[] { "Specified file system entry does not exist" } });
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { Success = true });
        }

        

        public static string GetAttributesString(FileAttributes srcAttributes, IEnumerable<FileAttributes> filter)
        {
            List<string> attributesStr = new List<string>();

            foreach(var attribute in filter)
            {
                if(srcAttributes.HasFlag(attribute))
                {
                    attributesStr.Add(attribute.ToString());
                }
            }

            return string.Join(", ", attributesStr);
        }

        public class GetFileSystemEntriesRequest
        { 
            public string Path { get; set; }
        }

        public class DeleteFileSystemEntryRequest
        {
            public string Path { get; set; }
        }
    }

    public class ShowFilePropertiesRequest
    {
        public string Path { get; set; }
    }
}