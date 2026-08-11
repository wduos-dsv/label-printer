import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as net from "node:net";

createRequire(import.meta.url);
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
    frame: false,
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    height: 575,
    minHeight: 575,
    width: 757,
    minWidth: 757,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  /* Use contextBridge
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  }); */

  win.removeMenu();

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

function sendZplOverTcp(
  ip: string,
  port: number,
  zplData: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    client.setTimeout(5000);

    client.connect(port, ip, () => {
      client.write(zplData, "utf-8", () => {
        setTimeout(() => {
          client.end();
        }, 300); // Small delay matching Python's time.sleep(0.3)
      });
    });

    client.on("error", (err) => {
      client.destroy();
      reject(err);
    });

    client.on("timeout", () => {
      client.destroy();
      reject(
        new Error(
          "Tempo de conexão esgotado. Verifique a rede ou configurações da impressora.",
        ),
      );
    });

    client.on("close", () => {
      resolve();
    });
  });
}

function generateRegularZpl(
  cfg: any,
  currentIdx: number,
  totalTagsFormatted: string,
): string {
  const barcodeCounter = String(currentIdx).padStart(3, "0");
  const printCounter = String(currentIdx).padStart(2, "0");
  return `^XA^MMT^PW783^LL384^LS0^FT339,73^A0N,62,61^FH\\^CI28^FD${cfg.municipio.toUpperCase()}^FS^CI27^FT16,71^A0N,62,61^FH\\^CI28^FDEXPEDIÇÃO:^FS^CI27^FT16,134^A0N,45,46^FH\\^CI28^FDDATA:^FS^CI27^FT138,134^A0N,45,46^FH\\^CI28^FD${cfg.dataExp}^FS^CI27^FT16,185^A0N,45,46^FH\\^CI28^FDPEDIDO:^FS^CI27^FT183,185^A0N,45,46^FH\\^CI28^FD${cfg.ordem}^FS^CI27^FO2,7^GB771,369,4^FS^FO659,333^GFA,373,512,16,:Z64:eJxlkD1qxDAQhZ9xDIYUZgvXOUIOsIVcKL0L6z6CbQx7Cd8g7bJFHMhFVPoIZgWezJMES8jDI0v+9Dw/gAc08gq8WAtYawfd6w4mylJHiQ+gPvTcOzc2TgVUE7nI8S6qb3TkRD2XAU3ia9GC7pb9WSOaUc+YryK7n9cd3Y4kMvQjnySJAXjdYUI+9+Rq7lljyxK2lskT149MMWhyR26WVMK9/sLqn9xVDo4/WwNbEPGHF3JX+MAb9Aeco/Yf4uWB4h9PJ/KpcLOhlSA/B7KfeZV/ZL5AW9eX+bxlf5V56kLBdpUwzxLeZEeZ38Ao/CxRvMbSxYAyP15Ck9pL8wfr7yQU//SHc/JmvaNO7f/TLySEld0=:7C7C^FT515,177^A0N,102,101^FD${printCounter}/${totalTagsFormatted}^FS^BY2,2,70^FO16,215^BCN,70,N,N,N^FDEXP${cfg.ordem}${barcodeCounter}ARQ^FS^FT16,325^A0N,45,46^FDEXP${cfg.ordem}${barcodeCounter}ARQ^FS^PQ1,0,1,Y^XZ`;
}

function generateRepackZpl(cfg: any, totalTagsFormatted: string): string {
  const repackI = cfg.totalTags + 1;
  const repackStr = String(repackI).padStart(2, "0");
  const repackBarcode = String(repackI).padStart(3, "0");
  return `^XA^MMT^PW783^LL384^LS0^FT339,73^A0N,62,61^FH\\^CI28^FD${cfg.municipio.toUpperCase()}^FS^CI27^FT16,71^A0N,62,61^FH\\^CI28^FDEXPEDIÇÃO:^FS^CI27^FT16,134^A0N,45,46^FH\\^CI28^FDDATA:^FS^CI27^FT138,134^A0N,45,46^FH\\^CI28^FD${cfg.dataExp}^FS^CI27^FT16,185^A0N,45,46^FH\\^CI28^FDPEDIDO:^FS^CI27^FT183,185^A0N,45,46^FH\\^CI28^FD${cfg.ordem}^FS^CI27^FO2,7^GB771,369,4^FS^FO659,333^GFA,373,512,16,:Z64:eJxlkD1qxDAQhZ9xDIYUZgvXOUIOsIVcKL0L6z6CbQx7Cd8g7bJFHMhFVPoIZgWezJMES8jDI0v+9Dw/gAc08gq8WAtYawfd6w4mylJHiQ+gPvTcOzc2TgVUE7nI8S6qb3TkRD2XAU3ia9GC7pb9WSOaUc+YryK7n9cd3Y4kMvQjnySJAXjdYUI+9+Rq7lljyxK2lskT149MMWhyR26WVMK9/sLqn9xVDo4/WwNbEPGHF3JX+MAb9Aeco/Yf4uWB4h9PJ/KpcLOhlSA/B7KfeZV/ZL5AW9eX+bxlf5V56kLBdpUwzxLeZEeZ38Ao/CxRvMbSxYAyP15Ck9pL8wfr7yQU//SHc/JmvaNO7f/TLySEld0=:7C7C^FT515,177^A0N,102,101^FD${repackStr}/${totalTagsFormatted}^FS^BY2,2,70^FO16,215^BCN,70,N,N,N^FDREPACK${cfg.ordem}${repackBarcode}^FS^FT16,325^A0N,45,46^FDREPACK${cfg.ordem}${repackBarcode}^FS^PQ1,0,1,Y^XZ`;
}

function generateFinalZpl(cfg: any, totalTagsFormatted: string): string {
  return `^XA^MMT^PW783^LL384^LS0^FT339,73^A0N,62,61^FH\\^CI28^FD${cfg.municipio.toUpperCase()}^FS^CI27^FT16,71^A0N,62,61^FH\\^CI28^FDEXPEDIÇÃO:^FS^CI27^FT16,134^A0N,45,46^FH\\^CI28^FDDATA:^FS^CI27^FT138,134^A0N,45,46^FH\\^CI28^FD${cfg.dataExp}^FS^CI27^FT16,185^A0N,45,46^FH\\^CI28^FDPEDIDO:^FS^CI27^FT183,185^A0N,45,46^FH\\^CI28^FD${cfg.ordem}^FS^CI27^FO2,7^GB771,369,4^FS^FO659,333^GFA,373,512,16,:Z64:eJxlkD1qxDAQhZ9xDIYUZgvXOUIOsIVcKL0L6z6CbQx7Cd8g7bJFHMhFVPoIZgWezJMES8jDI0v+9Dw/gAc08gq8WAtYawfd6w4mylJHiQ+gPvTcOzc2TgVUE7nI8S6qb3TkRD2XAU3ia9GC7pb9WSOaUc+YryK7n9cd3Y4kMvQjnySJAXjdYUI+9+Rq7lljyxK2lskT149MMWhyR26WVMK9/sLqn9xVDo4/WwNbEPGHF3JX+MAb9Aeco/Yf4uWB4h9PJ/KpcLOhlSA/B7KfeZV/ZL5AW9eX+bxlf5V56kLBdpUwzxLeZEeZ38Ao/CxRvMbSxYAyP15Ck9pL8wfr7yQU//SHc/JmvaNO7f/TLySEld0=:7C7C^FT515,177^A0N,102,101^FD00/${totalTagsFormatted}^FS^BY2,2,70^FO16,215^BCN,70,N,N,N^FD${cfg.ordem}^FS^FT16,325^A0N,45,46^FD${cfg.ordem}^FS^PQ1,0,1,Y^XZ`;
}

ipcMain.handle("print-exp-full-range", async (_, config) => {
  try {
    const ip = config.ip || "10.55.22.240";
    const port = config.port || 9100;
    const totalTagsFormatted = String(config.totalTags).padStart(2, "0");

    for (let i = 1; i <= config.totalTags; i++) {
      const zpl = generateRegularZpl(config, i, totalTagsFormatted);
      await sendZplOverTcp(ip, port, zpl);
    }

    if (config.repack === "Sim") {
      const zpl = generateRepackZpl(config, totalTagsFormatted);
      await sendZplOverTcp(ip, port, zpl);
    }

    const finalZpl = generateFinalZpl(config, totalTagsFormatted);
    await sendZplOverTcp(ip, port, finalZpl);

    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: (error as Error).message };
  }
});

// Handle printer fetching request from Renderer
ipcMain.handle("get-printers", async () => {
  if (!win) return [];
  return await win.webContents.getPrintersAsync();
});

// Window control handlers
ipcMain.on("window-minimize", () => {
  win?.minimize();
});

ipcMain.on("window-maximize", () => {
  if (win?.isMaximized()) {
    win.unmaximize();
  } else {
    win?.maximize();
  }
});

ipcMain.on("window-close", () => {
  win?.close();
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
