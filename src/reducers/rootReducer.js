import { combineReducers } from "redux";
import fileSystemEntries from "./fileSystemReducer";

const rootReducer = combineReducers({
  fileSystemEntries: fileSystemEntries
});

export default rootReducer;
