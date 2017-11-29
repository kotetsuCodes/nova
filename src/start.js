const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const { ipcMain } = require("electron");
const shell = require("electron").shell;
const edge = require("electron-edge");
const execSync = require("child_process").execSync;
const fs = require("fs");

const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    useContentSize: true
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    });

  mainWindow.loadURL(startUrl);

  mainWindow.webContents.toggleDevTools();

  //initialize start up
  //initialize();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

//init functions
function initialize() {
  let test;

  test = edge.func({
    assemblyFile:
      __dirname +
      "../nova_utilities/NovaUtilities/bin/Release/NovaUtilities.dll",
    typeName: "NovaUtilities.Nova",
    methodName: "CheckConfig"
  });

  let testResult = test(
    { Path: "settings.json", DefaultConfig: { Blah: "blah" } },
    true
  );
  throw Error(testResult);
}

//ipc events
ipcMain.on("requestFileSystemEntries", (event, arg) => {
  let test = execSync(
    "D:\\dev\\csharp-sandbox\\csharp-sandbox\\bin\\Release\\csharp-sandbox.exe GetDrives",
    { stdio: "pipe" }
  ).toString();

  //let test;

  // if (arg === "/") {
  //   test = edge.func(function() {
  //     /*
  //     using System.Linq;
  //     using System.IO;

  //       async(input) => {
  //         return DriveInfo.GetDrives().Where(d => d.IsReady && d.DriveType == DriveType.Fixed).Select(d => new
  //           {
  //              Name = d.Name,
  //              AvailableFreeSpace = d.AvailableFreeSpace,
  //              TotalSize = d.TotalSize,
  //              DriveFormat = d.DriveFormat
  //           });
  //       }
  //     */
  //   });
  // } else {
  //   test = edge.func(function() {
  //     /*
  //     using System.Linq;
  //     using System.IO;

  //       async(input) => {
  //         return DriveInfo.GetDrives().Where(d => d.IsReady && d.DriveType == DriveType.Fixed).Select(d => new
  //           {
  //             Name = d.Name,
  //             AvailableFreeSpace = d.AvailableFreeSpace,
  //             TotalSize = d.TotalSize,
  //             DriveFormat = d.DriveFormat
  //           });
  //       }
  //     */
  //   });
  // }

  let testResult = test("", true);

  event.returnValue = testResult;
});

ipcMain.on("openFileSystemEntry", (event, arg) => {
  console.log("openFileSystemEntry called with arg:", arg);

  shell.openItem(arg);
});

ipcMain.on("closeNova", (event, arg) => {
  app.quit();
});

ipcMain.on("minimizeNova", (event, arg) => {
  mainWindow.minimize();
});

ipcMain.on("maximizeNova", (event, arg) => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});
