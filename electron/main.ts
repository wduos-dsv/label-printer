import { app, BrowserWindow, ipcMain } from "electron"; // Added ipcMain
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { webContents } from "electron";
import path from "node:path";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// Handle printer fetching request from Renderer
ipcMain.handle("get-printers", async () => {
  if (!win) return [];
  return await win.webContents.getPrintersAsync();
});

// Handle print requests from Renderer
ipcMain.handle("print-label", async (_, printerName, htmlContent) => {
  if (!win) return { success: false, error: "Window not found" };

  try {
    // You can print a specific webContents or create a hidden window for the label layout
    win.webContents.print(
      {
        silent: true, // Set to true to bypass the OS print dialog
        printBackground: true,
        deviceName: printerName, // Uses the selected printer name here!
      },
      (success, failureReason) => {
        if (!success) console.error("Print failed:", failureReason);
      },
    );

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
