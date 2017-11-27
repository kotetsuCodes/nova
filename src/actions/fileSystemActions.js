import * as types from "../actions/actionTypes";
import FileSystemApi from "../api/FileSystemApi";

export function getFileSystemEntriesSuccess(fileSystemEntries) {
  return { type: types.GET_FILESYSTEM_ENTRIES_SUCCESS, fileSystemEntries };
}

export function setSelectedSuccess(fileSystemInfo) {
  return { type: types.SET_ENTRY_AS_SELECTED_SUCCESS, fileSystemInfo };
}

export function setEditingSuccess(fileSystemInfo) {
  return { type: types.SET_ENTRY_AS_EDITING_SUCCESS, fileSystemInfo };
}

export function deleteFileSystemEntrySuccess(path) {
  return { type: types.DELETE_ENTRY_SUCCESS, path };
}

export function openFileSystemEntrySuccess(path) {
  return { type: types.OPEN_FILE_SUCCESS, path };
}

export function openContextMenuSuccess(fileSystemInfo, isVisible, x, y) {
  return { type: types.OPEN_CONTEXT_MENU_SUCCESS, isVisible, x, y };
}

export function showPropertiesDialogSuccess(result) {
  return { type: types.SHOW_PROPERTIES_DIALOG_SUCCESS, result };
}

export function getFileSystemEntries(path) {
  return function(dispatch) {
    return FileSystemApi.getFileSystemEntries(path)
      .then(fileSystemEntries => {
        if (!fileSystemEntries.Success) {
          throw fileSystemEntries.Errors;
        }
        dispatch(getFileSystemEntriesSuccess(fileSystemEntries));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function setSelected(fileSystemInfo) {
  return function(dispatch) {
    dispatch(setSelectedSuccess(fileSystemInfo));
  };
}

export function setEditing(fileSystemInfo) {
  return function(dispatch) {
    dispatch(setEditingSuccess(fileSystemInfo));
  };
}

export function deleteFileSystemEntry(fileSystemInfo) {
  console.log(
    "fileSystemActions.js.deleteFileSystemEntry fileSystemInfo",
    fileSystemInfo
  );
  return function(dispatch) {
    return FileSystemApi.deleteFileSystemEntry(fileSystemInfo.FullName)
      .then(deleteFileSystemEntryResponse => {
        if (!deleteFileSystemEntryResponse.Success) {
          throw deleteFileSystemEntryResponse.Errors;
        }
        dispatch(
          deleteFileSystemEntrySuccess(deleteFileSystemEntryResponse.Data)
        );
      })
      .catch(error => {
        throw error;
      });
  };
}

export function openFileSystemEntry(fileSystemInfo) {
  console.log("openFileSystemEntry called");
  return function(dispatch) {
    const { ipcRenderer } = window.require("electron");
    ipcRenderer.send("openFileSystemEntry", fileSystemInfo.FullName);
    dispatch(openFileSystemEntrySuccess(fileSystemInfo.FullName));
  };
}

export function openContextMenu(fileSystemInfo, isVisible, x, y) {
  console.log("opening Context Menu");
  return function(dispatch) {
    dispatch(openContextMenuSuccess(fileSystemInfo, isVisible, x, y));
  };
}

export function showPropertiesDialog(fileSystemInfo) {
  return function(dispatch) {
    return FileSystemApi.showPropertiesDialog(fileSystemInfo.FullName)
      .then(showPropertiesDialogResponse => {
        if (!showPropertiesDialogResponse.Success) {
          throw showPropertiesDialogResponse.Errors;
        }
        dispatch(
          showPropertiesDialogSuccess(showPropertiesDialogResponse.Success)
        );
      })
      .catch(error => {
        throw error;
      });
  };
}
