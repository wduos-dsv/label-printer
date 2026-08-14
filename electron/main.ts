import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as net from "node:net";
import * as crypto from "node:crypto"; // Needed for REC LPNs generation
import { autoUpdater } from "electron-updater";

autoUpdater.logger = console;

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
    height: 500,
    minHeight: 500,
    width: 700,
    minWidth: 700,
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

  win.once("ready-to-show", () => {
    if (!VITE_DEV_SERVER_URL) {
      autoUpdater.checkForUpdatesAndNotify();
    }
  });
}

autoUpdater.on("update-available", () => {
  dialog.showMessageBox(win!, {
    type: "info",
    title: "Atualização Disponível",
    message:
      "Uma nova versão do Label Printer está sendo baixada em segundo plano.",
    buttons: ["OK"],
  });
});

autoUpdater.on("update-downloaded", () => {
  dialog
    .showMessageBox(win!, {
      type: "info",
      title: "Atualização Pronta",
      message:
        "O download foi concluído. O aplicativo será reiniciado para instalar a atualização.",
      buttons: ["Reiniciar Agora"],
    })
    .then(() => {
      autoUpdater.quitAndInstall();
    });
});

// helpers
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

function getUnique5DigitCode(): string {
  const timestampStr = String(Date.now() / 1000);
  const hashHex = crypto
    .createHash("sha256")
    .update(timestampStr)
    .digest("hex");
  const uniqueInt = BigInt("0x" + hashHex);
  const uniqueStr = uniqueInt.toString();
  return uniqueStr.slice(-5);
}

function genExpLabelZpl(
  cfg: any,
  currentIdx: number,
  totalLabelsFormatted: string,
): string {
  const barcodeCounter = String(currentIdx).padStart(3, "0");
  const printCounter = String(currentIdx).padStart(2, "0");
  return `^XA^MMT^PW783^LL384^LS0^FT339,73^A0N,62,61^FH\\^CI28^FD${cfg.municipality.toUpperCase()}^FS^CI27^FT16,71^A0N,62,61^FH\\^CI28^FDEXPEDIÇÃO:^FS^CI27^FT16,134^A0N,45,46^FH\\^CI28^FDDATA:^FS^CI27^FT138,134^A0N,45,46^FH\\^CI28^FD${cfg.expDate}^FS^CI27^FT16,185^A0N,45,46^FH\\^CI28^FDPEDIDO:^FS^CI27^FT183,185^A0N,45,46^FH\\^CI28^FD${cfg.order}^FS^CI27^FO2,7^GB771,369,4^FS^FO659,333^GFA,373,512,16,:Z64:eJxlkD1qxDAQhZ9xDIYUZgvXOUIOsIVcKL0L6z6CbQx7Cd8g7bJFHMhFVPoIZgWezJMES8jDI0v+9Dw/gAc08gq8WAtYawfd6w4mylJHiQ+gPvTcOzc2TgVUE7nI8S6qb3TkRD2XAU3ia9GC7pb9WSOaUc+YryK7n9cd3Y4kMvQjnySJAXjdYUI+9+Rq7lljyxK2lskT149MMWhyR26WVMK9/sLqn9xVDo4/WwNbEPGHF3JX+MAb9Aeco/Yf4uWB4h9PJ/KpcLOhlSA/B7KfeZV/ZL5AW9eX+bxlf5V56kLBdpUwzxLeZEeZ38Ao/CxRvMbSxYAyP15Ck9pL8wfr7yQU//SHc/JmvaNO7f/TLySEld0=:7C7C^FT515,177^A0N,102,101^FD${printCounter}/${totalLabelsFormatted}^FS^BY2,2,70^FO16,215^BCN,70,N,N,N^FDEXP${cfg.order}${barcodeCounter}ARQ^FS^FT16,325^A0N,45,46^FDEXP${cfg.order}${barcodeCounter}ARQ^FS^PQ1,0,1,Y^XZ`;
}
function genExpLabelRepackZpl(cfg: any, totalLabelsFormatted: string): string {
  const repackI = cfg.totalLabels + 1;
  const repackStr = String(repackI).padStart(2, "0");
  const repackBarcode = String(repackI).padStart(3, "0");
  return `^XA^MMT^PW783^LL384^LS0^FT339,73^A0N,62,61^FH\\^CI28^FD${cfg.municipality.toUpperCase()}^FS^CI27^FT16,71^A0N,62,61^FH\\^CI28^FDEXPEDIÇÃO:^FS^CI27^FT16,134^A0N,45,46^FH\\^CI28^FDDATA:^FS^CI27^FT138,134^A0N,45,46^FH\\^CI28^FD${cfg.expDate}^FS^CI27^FT16,185^A0N,45,46^FH\\^CI28^FDPEDIDO:^FS^CI27^FT183,185^A0N,45,46^FH\\^CI28^FD${cfg.order}^FS^CI27^FO2,7^GB771,369,4^FS^FO659,333^GFA,373,512,16,:Z64:eJxlkD1qxDAQhZ9xDIYUZgvXOUIOsIVcKL0L6z6CbQx7Cd8g7bJFHMhFVPoIZgWezJMES8jDI0v+9Dw/gAc08gq8WAtYawfd6w4mylJHiQ+gPvTcOzc2TgVUE7nI8S6qb3TkRD2XAU3ia9GC7pb9WSOaUc+YryK7n9cd3Y4kMvQjnySJAXjdYUI+9+Rq7lljyxK2lskT149MMWhyR26WVMK9/sLqn9xVDo4/WwNbEPGHF3JX+MAb9Aeco/Yf4uWB4h9PJ/KpcLOhlSA/B7KfeZV/ZL5AW9eX+bxlf5V56kLBdpUwzxLeZEeZ38Ao/CxRvMbSxYAyP15Ck9pL8wfr7yQU//SHc/JmvaNO7f/TLySEld0=:7C7C^FT515,177^A0N,102,101^FD${repackStr}/${totalLabelsFormatted}^FS^BY2,2,70^FO16,215^BCN,70,N,N,N^FDREPACK${cfg.order}${repackBarcode}^FS^FT16,325^A0N,45,46^FDREPACK${cfg.order}${repackBarcode}^FS^PQ1,0,1,Y^XZ`;
}
function genExpOrderOnlyZpl(cfg: any, totalLabelsFormatted: string): string {
  return `^XA^MMT^PW783^LL384^LS0^FT339,73^A0N,62,61^FH\\^CI28^FD${cfg.municipality.toUpperCase()}^FS^CI27^FT16,71^A0N,62,61^FH\\^CI28^FDEXPEDIÇÃO:^FS^CI27^FT16,134^A0N,45,46^FH\\^CI28^FDDATA:^FS^CI27^FT138,134^A0N,45,46^FH\\^CI28^FD${cfg.expDate}^FS^CI27^FT16,185^A0N,45,46^FH\\^CI28^FDPEDIDO:^FS^CI27^FT183,185^A0N,45,46^FH\\^CI28^FD${cfg.order}^FS^CI27^FO2,7^GB771,369,4^FS^FO659,333^GFA,373,512,16,:Z64:eJxlkD1qxDAQhZ9xDIYUZgvXOUIOsIVcKL0L6z6CbQx7Cd8g7bJFHMhFVPoIZgWezJMES8jDI0v+9Dw/gAc08gq8WAtYawfd6w4mylJHiQ+gPvTcOzc2TgVUE7nI8S6qb3TkRD2XAU3ia9GC7pb9WSOaUc+YryK7n9cd3Y4kMvQjnySJAXjdYUI+9+Rq7lljyxK2lskT149MMWhyR26WVMK9/sLqn9xVDo4/WwNbEPGHF3JX+MAb9Aeco/Yf4uWB4h9PJ/KpcLOhlSA/B7KfeZV/ZL5AW9eX+bxlf5V56kLBdpUwzxLeZEeZ38Ao/CxRvMbSxYAyP15Ck9pL8wfr7yQU//SHc/JmvaNO7f/TLySEld0=:7C7C^FT515,177^A0N,102,101^FD00/${totalLabelsFormatted}^FS^BY2,2,70^FO16,215^BCN,70,N,N,N^FD${cfg.order}^FS^FT16,325^A0N,45,46^FD${cfg.order}^FS^PQ1,0,1,Y^XZ`;
}

function genRecLabelZpl(
  uniqueCode: string,
  counter: number,
  manualCode?: string,
  mode?: string,
): string {
  const barcodePayload =
    mode === "sequential"
      ? `REC${uniqueCode}${String(counter).padStart(3, "0")}ARQ`
      : `REC${manualCode}ARQ`;

  return `^XA^MMT^PW783^LL384^LS0^FO2,7^GB771,369,4^FS^FT300,145^A0N,102,101^FH\\^CI28^FDLPN^FS^CI27^FO105,170^BY3^BCN,100,N,N,N^FD${barcodePayload}^FS^FT220,320^A0N,48,46^FD${barcodePayload}^FS^FO659,333^GFA,373,512,16,:Z64:eJxlkD1qxDAQhZ9xDIYUZgvXOUIOsIVcKL0L6z6CbQx7Cd8g7bJFHMhFVPoIZgWezJMES8jDI0v+9Dw/gAc08gq8WAtYard/6w4mylJHiQ+gPvTcOzc2TgVUE7nI8S6qb3TkRD2XAU3ia9GC7pb9WSOaUx+YryK7n9cd3Y4kMvQjnySJAXjdYUI+9+Rq7lljyxK2lskT149MMWhyR26WVMK9/sLqn9xVDo4/WwNbEPGHF3JX+MAb9Aeco/Yf4uWB4h9PJ/KpcLOhlSA/B7KfeZV/ZL5AW9eX+bxlf5V56kLBdpUwzxLeZEeZ38Ao/CxRvMbSxYAyP15Ck9pL8wfr7yQU//SHc/JmvaNO7f/TLySEld0=:7C7C^PQ1,0,1,Y^XZ`;
}

function genPositionLabelZpl(position: string, hasQR: boolean): string {
  if (hasQR) {
    return `~CT~~CD,~CC^~CT~^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR6,6~SD15^JUS^LRN^CI27^PA0,1,1,0^XZ^XA^MMT^PW799^LL719^LS0^FPH,3^FT637,719^A0B,135,134^FB718,1,35,C^FH\\^CI28^FD${position}^FS^CI27^FO103,120^BQN,2,18,H^FDQA,${position}^FS^FO13,34^GB773,673,8^FS^FO703,50^GFA,789,2544,12,:Z64:eJy1lkGO2zAMRWUEQQrMwpt61YUP4oXcG3hhnaaL5ig9RhYDO0cp0AvM0rAGVUmJEr/jBE2L1gMYwsPnJ2WJzBjz++cjrO1Z100P/AJ8BB40oHEa0IUF+Ah6DWicBth5vgB3oC8BzHOA9cEvwB3owzWtj8yHtD7M9LyKyD0TQAnKHp4K4AwXCBgh4KfRgMwrSrAaCMjrVvUxIK+reZ4MBJR1rXpTAT/4+xz1DXDwr8C/hnrwbKD+CvZVw34b4HAC+N1YHr6XTWX7yqs9ytv78ug+aTHlVEBegfxE9ngoAxR/BZ732urt4U0Nhat88ym397/I6TJQMR8y76mmPvH5bGpJ0Tj14v7KLUC8yi1gPW3Np50JH5LenEi/CC9bszPZyx6Ej6LnL/ouvJxXRzx/IuSkL/d5w2du4XQCwt1d/WfhnlKcv66FG9Abq/r4NcTf2GnHH+ipfk6x9/lH/rF+Y9f/5c8fB+p3qv8RVO+U8/0v/pHLeYVbfeLcXsYumY8y7dsHzdtqe214nS+P2Q63A0xP7K9dP+J0mGUd+7pPawsBOAdeKIF/14KyUdQH8HHgT02W80qCKspTAuFDrp/+3kpa4aekX255nfxfhY+NFFTzfCj95cqPYcu1vwS5PwMHJR7eOLmcV89FSX994x+AqXCT+/FK79JfhXdxZHxBnu8bv4GX+8nvaccf6X18r0/r/9C/i7zb+zz2P8H8OcL8aW/mlfavD+uO7+eb9u8z8014nD/b+flX/i3ojzBvD6v5hP8/5OcXll0rCA==:5FF3^PQ1,0,1,Y^XZ`;
  }

  return `~CT~~CD,~CC^~CT~^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR6,6~SD15^JUS^LRN^CI27^PA0,1,1,0^XZ^XA^MMT^PW799^LL719^LS0^FO13,34^GB773,673,8^FS^FO703,50^GFA,789,2544,12,:Z64:eJy1lkGO2zAMRWUEQQrMwpt61YUP4oXcG3hhnaaL5ig9RhYDO0cp0AvM0rAGVUmJEr/jBE2L1gMYwsPnJ2WJzBjz++cjrO1Z100P/AJ8BB40oHEa0IUF+Ah6DWicBth5vgB3oC8BzHOA9cEvwB3owzWtj8yHtD7M9LyKyD0TQAnKHp4K4AwXCBgh4KfRgMwrSrAaCMjrVvUxIK+reZ4MBJR1rXpTAT/4+xz1DXDwr8C/hnrwbKD+CvZVw34b4HAC+N1YHr6XTWX7yqs9ytv78ug+aTHlVEBegfxE9ngoAxR/BZ732urt4U0Nhat88ym397/I6TJQMR8y76mmPvH5bGpJ0Tj14v7KLUC8yi1gPW3Np50JH5LenEi/CC9bszPZyx6Ej6LnL/ouvJxXRzx/IuSkL/d5w2du4XQCwt1d/WfhnlKcv66FG9Abq/r4NcTf2GnHH+ipfk6x9/lH/rF+Y9f/5c8fB+p3qv8RVO+U8/0v/pHLeYVbfeLcXsYumY8y7dsHzdtqe214nS+P2Q63A0xP7K9dP+J0mGUd+7pPawsBOAdeKIF/14KyUdQH8HHgT02W80qCKspTAuFDrp/+3kpa4aekX255nfxfhY+NFFTzfCj95cqPYcu1vwS5PwMHJR7eOLmcV89FSX994x+AqXCT+/FK79JfhXdxZHxBnu8bv4GX+8nvaccf6X18r0/r/9C/i7zb+zz2P8H8OcL8aW/mlfavD+uO7+eb9u8z8014nD/b+flX/i3ojzBvD6v5hP8/5OcXll0rCA==:5FF3^FPH,3^FT450,718^A0B,135,134^FB718,1,35,C^FH\^CI28^FD${position}^FS^CI27^PQ1,0,1,Y^XZ`;
}

ipcMain.handle("print-exp-full-range", async (_, config) => {
  try {
    const ip = config.ip || "10.55.22.240";
    const port = config.port || 9100;
    const totalLabelsFormatted = String(config.totalLabels).padStart(2, "0");

    for (let i = 1; i <= config.totalLabels; i++) {
      const zpl = genExpLabelZpl(config, i, totalLabelsFormatted);
      await sendZplOverTcp(ip, port, zpl);
    }

    if (config.repack === "Sim") {
      const zpl = genExpLabelRepackZpl(config, totalLabelsFormatted);
      await sendZplOverTcp(ip, port, zpl);
    }

    const finalZpl = genExpOrderOnlyZpl(config, totalLabelsFormatted);
    await sendZplOverTcp(ip, port, finalZpl);

    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: (error as Error).message };
  }
});

ipcMain.handle("print-exp-specific-label", async (_, config) => {
  try {
    const ip = config.ip || "10.55.22.240";
    const port = config.port || 9100;
    const totalLabelsFormatted = String(config.totalLabels).padStart(2, "0");

    const zpl = genExpLabelZpl(
      config,
      config.labelToPrint,
      totalLabelsFormatted,
    );
    await sendZplOverTcp(ip, port, zpl);

    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: (error as Error).message };
  }
});

ipcMain.handle("print-rec-labels", async (_, config) => {
  try {
    const ip = config.ip || "10.55.22.240";
    const port = config.port || 9100;
    const mode = config.mode;
    const totalLabels = config.totalLabels || 1;
    const manualCode = config.manualCode || "";

    let uniqueCode = "";
    if (mode === "sequential") {
      uniqueCode = getUnique5DigitCode();
    }

    let allLabelsZpl =
      "~CT~~CD,~CC^~CT~\n^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR6,6~SD15^JUS^LRN^CI27^PA0,1,1,0^XZ\n";

    for (let i = 1; i <= totalLabels; i++) {
      allLabelsZpl += genRecLabelZpl(uniqueCode, i, manualCode, mode);
    }

    await sendZplOverTcp(ip, port, allLabelsZpl);

    return { success: true, uniqueCode };
  } catch (error: unknown) {
    return { success: false, error: (error as Error).message };
  }
});

ipcMain.handle("print-position-label", async (_, config) => {
  try {
    const ip = config.ip || "10.55.22.240";
    const port = config.port || 9100;
    const position = config.position;
    const hasQR = config.hasQR;

    const zpl = genPositionLabelZpl(position, hasQR);

    await sendZplOverTcp(ip, port, zpl);

    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: (error as Error).message };
  }
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
