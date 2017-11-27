const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const { ipcMain } = require("electron");
const shell = require("electron").shell;
//const edge = require("electron-edge");
const execSync = require("child_process").execSync;

const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
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

  //event.returnValue = "Success";
});
