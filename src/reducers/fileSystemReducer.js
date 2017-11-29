import * as types from "../actions/actionTypes";

const fileSystemEntries = {
  Success: false,
  CurrentWorkingDirectory: "/",
  Entries: [],
  ContextMenuVisible: false,
  x: 0,
  y: 0
};

export default function fileSystemEntryReducer(
  state = fileSystemEntries,
  action
) {
  switch (action.type) {
    case types.GET_FILESYSTEM_ENTRIES_SUCCESS:
      let returnObj = {
        Success: action.fileSystemEntries.Success,
        CurrentWorkingDirectory:
          action.fileSystemEntries.CurrentWorkingDirectory,
        Entries: action.fileSystemEntries.Entries.map((item, index) => {
          return { ...item, isSelected: false };
        }),
        ContextMenuVisible: false,
        x: 0,
        y: 0
      };

      return returnObj;
    case types.SET_ENTRY_AS_SELECTED_SUCCESS:
      let setSelectedReturnObj = {
        Success: state.Success,
        CurrentWorkingDirectory: state.CurrentWorkingDirectory,
        Entries: state.Entries.map((item, index) => {
          let isSelected = item.FullName === action.fileSystemInfo.FullName;
          return { ...item, isSelected: isSelected, isEditing: false };
        }),
        ContextMenuVisible: false,
        x: 0,
        y: 0
      };

      return setSelectedReturnObj;
    case types.SET_ENTRY_AS_EDITING_SUCCESS:
      let setEditingReturnObj = {
        Success: state.Success,
        CurrentWorkingDirectory: state.CurrentWorkingDirectory,
        Entries: state.Entries.map((item, index) => {
          let isEditing = item.FullName === action.fileSystemInfo.FullName;
          return { ...item, isEditing: isEditing };
        }),
        ContextMenuVisible: false,
        x: 0,
        y: 0
      };

      return setEditingReturnObj;
    case types.DELETE_ENTRY_SUCCESS:
      console.log("action", action);
      let deleteFileSystemEntryObj = {
        Success: state.Success,
        CurrentWorkingDirectory: state.CurrentWorkingDirectory,
        Entries: state.Entries.filter((item, index) => {
          return item.FullName !== action.path;
        }),
        ContextMenuVisible: false,
        x: 0,
        y: 0
      };

      return deleteFileSystemEntryObj;
    case types.OPEN_FILE_SUCCESS:
      let openFileSystemEntryObj = {
        ...state,
        ContextMenuVisible: false
      };

      return openFileSystemEntryObj;
    case types.OPEN_CONTEXT_MENU_SUCCESS:
      console.log("opening Context Menu");
      let openContextMenuObj = {
        ...state,
        Entries: state.Entries.map((item, index) => {
          return { ...item, isEditing: false };
        }),
        ContextMenuVisible: action.isVisible,
        x: action.x,
        y: action.y
      };

      return openContextMenuObj;
    case types.SHOW_PROPERTIES_DIALOG_SUCCESS:
      let showPropertiesDialogObj = {
        ...state,
        ContextMenuVisible: false
      };

      return showPropertiesDialogObj;
    case types.CLOSE_NOVA_SUCCESS:
      return state;
    case types.MINIMIZE_NOVA_SUCCESS:
      return state;
    case types.MAXIMIZE_NOVA_SUCCESS:
      return state;
    default:
      return fileSystemEntries;
  }
}
