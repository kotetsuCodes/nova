using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Runtime.InteropServices;

namespace nova_webserver
{
    public static class Extensions
    {
        [DllImport("shell32.dll", CharSet = CharSet.Auto)]
        static extern bool ShellExecuteEx(ref SHELLEXECUTEINFO lpExecInfo);

        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
        public struct SHELLEXECUTEINFO
        {
            public int cbSize;
            public uint fMask;
            public IntPtr hwnd;
            [MarshalAs(UnmanagedType.LPTStr)]
            public string lpVerb;
            [MarshalAs(UnmanagedType.LPTStr)]
            public string lpFile;
            [MarshalAs(UnmanagedType.LPTStr)]
            public string lpParameters;
            [MarshalAs(UnmanagedType.LPTStr)]
            public string lpDirectory;
            public int nShow;
            public IntPtr hInstApp;
            public IntPtr lpIDList;
            [MarshalAs(UnmanagedType.LPTStr)]
            public string lpClass;
            public IntPtr hkeyClass;
            public uint dwHotKey;
            public IntPtr hIcon;
            public IntPtr hProcess;
        }

        private const int SW_SHOW = 5;
        private const uint SEE_MASK_INVOKEIDLIST = 12;
        public static bool ShowFilePropertiesDialog(string fileName)
        {
            SHELLEXECUTEINFO info = new SHELLEXECUTEINFO();
            info.cbSize = System.Runtime.InteropServices.Marshal.SizeOf(info);
            info.lpVerb = "properties";
            info.lpFile = fileName;
            info.nShow = SW_SHOW;
            info.fMask = SEE_MASK_INVOKEIDLIST;
            return ShellExecuteEx(ref info);
        }


        //https://stackoverflow.com/questions/281640/how-do-i-get-a-human-readable-file-size-in-bytes-abbreviation-using-net
        public static String BytesToString(this long byteCount)
        {
            string[] suf = { "B", "KB", "MB", "GB", "TB", "PB", "EB" }; //Longs run out around EB
            if (byteCount == 0)
                return $"0 {suf[0]}";
            long bytes = Math.Abs(byteCount);
            int place = Convert.ToInt32(Math.Floor(Math.Log(bytes, 1024)));
            double num = Math.Round(bytes / Math.Pow(1024, place), 1);
            return $"{(Math.Sign(byteCount) * num)} {suf[place]}";
        }

        //https://stackoverflow.com/questions/611921/how-do-i-delete-a-directory-with-read-only-files-in-c
        public static void DeleteReadOnly(this FileSystemInfo fileSystemInfo)
        {
            var directoryInfo = fileSystemInfo as DirectoryInfo;
            if (directoryInfo != null)
            {
                foreach (FileSystemInfo childInfo in directoryInfo.GetFileSystemInfos())
                {
                    childInfo.DeleteReadOnly();
                }
            }
            fileSystemInfo.Attributes = FileAttributes.Normal;
            fileSystemInfo.Delete();
        }


    }
}