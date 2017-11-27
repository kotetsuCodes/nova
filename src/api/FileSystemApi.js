import { Map } from "immutable";

const fileSystemApi = new Map({
  GetFiles: `${process.env.REACT_APP_BASEAPIURL}/api/FileSystem/GetFileSystemEntries`,
  DeleteFile: `${process.env.REACT_APP_BASEAPIURL}/api/FileSystem/DeleteFileSystemEntry`,
  ShowPropertiesDialog:
    `${process.env.REACT_APP_BASEAPIURL}/api/FileSystem/ShowFileProperties`
});

export default class FileSystemApi {
  static getFileSystemEntries(path) {
    console.log("FileSystemApi", path);
    return fetch(fileSystemApi.get("GetFiles"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ path: path })
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static deleteFileSystemEntry(path) {
    console.log("path", path);
    return fetch(fileSystemApi.get("DeleteFile"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ path: path })
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static showPropertiesDialog(path) {
    return fetch(fileSystemApi.get("ShowPropertiesDialog"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ path: path })
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
}
