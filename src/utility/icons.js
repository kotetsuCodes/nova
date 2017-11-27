import { Map } from "immutable";
import nodeFile from "../fileSystemIcons/file_type_node.svg";
import jsFile from "../fileSystemIcons/file_type_js.svg";
//import jsFile from "../fileSystemIcons/file_type_js_official.svg";
import svgFile from "../fileSystemIcons/file_type_svg.svg";
import cssFile from "../fileSystemIcons/file_type_css.svg";
import markdownFile from "../fileSystemIcons/file_type_markdown.svg";
import procFile from "../fileSystemIcons/file_type_procfile.svg";
import gitIgnoreFile from "../fileSystemIcons/file_type_git.svg";
import csharpFile from "../fileSystemIcons/file_type_csharp.svg";
import yarnFile from "../fileSystemIcons/file_type_yarn.svg";
import textFile from "../fileSystemIcons/file_type_text.svg";
//folders
import nodeFolder from "../fileSystemIcons/folder_type_node.svg";
import defaultFile from "../fileSystemIcons/default_file.svg";
import defaultFolder from "../fileSystemIcons/default_folder.svg";

let iconBasePath = "../fileSystemIcons/";

const fileIconManifest = new Map({
  "package.json": nodeFile,
  "package-lock.json": nodeFile,
  ".gitignore": gitIgnoreFile,
  "yarn.lock": yarnFile,
  Procfile: procFile
});

const fileExtensionManifest = new Map({
  ".txt": textFile,
  ".js": jsFile,
  ".svg": svgFile,
  ".css": cssFile,
  ".md": markdownFile,
  ".cs": csharpFile
});

const folderIconManifest = new Map({
  node_modules: nodeFolder
});

export function getIconForFile(name) {
  let extension = name.substr(name.lastIndexOf("."), name.length);
  let icon = fileIconManifest.get(name);
  let extensionIcon = fileExtensionManifest.get(extension);

  if (icon) {
    return icon;
  } else if (extensionIcon) {
    return extensionIcon;
  } else {
    return defaultFile;
  }
}

export function getIconForDirectory(name) {
  let icon = folderIconManifest.get(name);

  if (icon) {
    return icon;
  } else {
    return defaultFolder;
  }
}
