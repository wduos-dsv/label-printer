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
  timeoutMs: number = 5000,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    if (timeoutMs > 0) {
      client.setTimeout(timeoutMs);
    }

    client.connect(port, ip, () => {
      client.write(zplData, "utf-8", () => {
        setTimeout(() => {
          client.end();
        }, 500);
      });
    });

    client.on("error", (err) => {
      client.destroy();
      reject(err);
    });

    if (timeoutMs > 0) {
      client.on("timeout", () => {
        client.destroy();
        reject(
          new Error(
            "Tempo de conexão esgotado. Verifique a rede ou configurações da impressora.",
          ),
        );
      });
    }

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
  return `^XA~TA000~JSN^LT0^MNW^MTT^LH0,0^PR4,4~SD10^CI27^MMT^PW815^LL416^LS0^FT48,87^A0N,62,61^FH\^CI28^FDEXPEDIÇÃO:^FS^CI27^FO29,18^GB772,381,6^FS^FO658,340^GFA,305,688,16,:Z64:eJx90c2NwyAQBeCxfMiREiiF0vB2RilOB0R7QVrE5L2ZJLZQvBwsPgvmD5H/V1QdsipWg1JL2JVAj49rpHUTyWb7uCu3PZuLiJqHe4d3P/rVVRYtcTKTei3wag7u3GDklNu7Vuzo9eUOs6XFHWcPCcN69t6CGVHEqwPiyQ2XEQJR3R1OJw8Ug8OXVhSf68nL4V/6R3eMBF7QKd5hO7yz6U3vJ6PV/MA44HXy7eX0h3HAgVOj1Z3oYLbh4jcfaIuXFhpXhntM7vRAiu5udD9cab5Wcxe6fuxRivc9ryc4jW7G:3FF8^FT350,87^A0N,62,61^FH\^CI28^FD${cfg.municipality.toUpperCase()}^FS^CI27^FT48,158^A0N,51,51^FH\^CI28^FDDATA:^FS^CI27^FT177,158^A0N,51,51^FH\^CI28^FD${cfg.expDate}^FS^CI27^FT48,364^A0N,46,46^FH\^CI28^FDEXP${cfg.order}${barcodeCounter}ARQ^FS^CI27^BY3,3,69^FT48,318^BCN,,N,N^FH\^FD>:EXP${cfg.order}${barcodeCounter}ARQ^FS^FT512,200^A0N,102,112^FH\^CI28^FD${printCounter}/${totalLabelsFormatted}^FS^CI27^FT48,210^A0N,51,51^FH\^CI28^FDPEDIDO:^FS^CI27^FT229,210^A0N,51,51^FH\^CI28^FD${cfg.order}^FS^CI27^PQ1,0,1,Y^XZ`;
}
function genExpLabelRepackZpl(cfg: any, totalLabelsFormatted: string): string {
  const repackI = cfg.totalLabels + 1;
  const repackStr = String(repackI).padStart(2, "0");
  const repackBarcode = String(repackI).padStart(3, "0");
  return `^XA~TA000~JSN^LT0^MNW^MTT^LH0,0^PR4,4~SD10^CI27^MMT^PW815^LL416^LS0^FT48,87^A0N,62,61^FH\^CI28^FDEXPEDIÇÃO:^FS^CI27^FO29,18^GB772,381,6^FS^FO658,340^GFA,305,688,16,:Z64:eJx90c2NwyAQBeCxfMiREiiF0vB2RilOB0R7QVrE5L2ZJLZQvBwsPgvmD5H/V1QdsipWg1JL2JVAj49rpHUTyWb7uCu3PZuLiJqHe4d3P/rVVRYtcTKTei3wag7u3GDklNu7Vuzo9eUOs6XFHWcPCcN69t6CGVHEqwPiyQ2XEQJR3R1OJw8Ug8OXVhSf68nL4V/6R3eMBF7QKd5hO7yz6U3vJ6PV/MA44HXy7eX0h3HAgVOj1Z3oYLbh4jcfaIuXFhpXhntM7vRAiu5udD9cab5Wcxe6fuxRivc9ryc4jW7G:3FF8^FT350,87^A0N,62,61^FH\^CI28^FD${cfg.municipality.toUpperCase()}^FS^CI27^FT48,158^A0N,51,51^FH\^CI28^FDDATA:^FS^CI27^FT177,158^A0N,51,51^FH\^CI28^FD${cfg.expDate}^FS^CI27^FT48,364^A0N,46,46^FH\^CI28^FDREPACK${cfg.order}${repackBarcode}^FS^CI27^BY3,3,69^FT48,318^BCN,,N,N^FH\^FD>:REPACK${cfg.order}${repackBarcode}^FS^FT512,200^A0N,102,112^FH\^CI28^FD${repackStr}/${totalLabelsFormatted}^FS^CI27^FT48,210^A0N,51,51^FH\^CI28^FDPEDIDO:^FS^CI27^FT229,210^A0N,51,51^FH\^CI28^FD${cfg.order}^FS^CI27^PQ1,0,1,Y^XZ`;
}
function genExpOrderOnlyZpl(cfg: any, totalLabelsFormatted: string): string {
  return `^XA~TA000~JSN^LT0^MNW^MTT^LH0,0^PR4,4~SD10^CI27^MMT^PW815^LL416^LS0^FT48,87^A0N,62,61^FH\^CI28^FDEXPEDIÇÃO:^FS^CI27^FO29,18^GB772,381,6^FS^FO658,340^GFA,305,688,16,:Z64:eJx90c2NwyAQBeCxfMiREiiF0vB2RilOB0R7QVrE5L2ZJLZQvBwsPgvmD5H/V1QdsipWg1JL2JVAj49rpHUTyWb7uCu3PZuLiJqHe4d3P/rVVRYtcTKTei3wag7u3GDklNu7Vuzo9eUOs6XFHWcPCcN69t6CGVHEqwPiyQ2XEQJR3R1OJw8Ug8OXVhSf68nL4V/6R3eMBF7QKd5hO7yz6U3vJ6PV/MA44HXy7eX0h3HAgVOj1Z3oYLbh4jcfaIuXFhpXhntM7vRAiu5udD9cab5Wcxe6fuxRivc9ryc4jW7G:3FF8^FT350,87^A0N,62,61^FH\^CI28^FD${cfg.municipality.toUpperCase()}^FS^CI27^FT48,158^A0N,51,51^FH\^CI28^FDDATA:^FS^CI27^FT177,158^A0N,51,51^FH\^CI28^FD${cfg.expDate}^FS^CI27^FT48,364^A0N,46,46^FH\^CI28^FD${cfg.order}^FS^CI27^BY3,3,69^FT48,318^BCN,,N,N^FH\^FD>:${cfg.order}^FS^FT512,200^A0N,102,112^FH\^CI28^FD00/${totalLabelsFormatted}^FS^CI27^FT48,210^A0N,51,51^FH\^CI28^FDPEDIDO:^FS^CI27^FT229,210^A0N,51,51^FH\^CI28^FD${cfg.order}^FS^CI27^PQ1,0,1,Y^XZ`;
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

  return `^XA~TA000~JSN^LT0^MNW^MTT^LH0,0^PR4,4~SD10^CI27^MMT^PW815^LL416^LS0^FT319,135^A0N,102,106^FH\^CI28^FDLPN^FS^CI27^FO29,18^GB772,381,6^FS^FO658,340^GFA,305,688,16,:Z64:eJx90c2NwyAQBeCxfMiREiiF0vB2RilOB0R7QVrE5L2ZJLZQvBwsPgvmD5H/V1QdsipWg1JL2JVAj49rpHUTyWb7uCu3PZuLiJqHe4d3P/rVVRYtcTKTei3wag7u3GDklNu7Vuzo9eUOs6XFHWcPCcN69t6CGVHEqwPiyQ2XEQJR3R1OJw8Ug8OXVhSf68nL4V/6R3eMBF7QKd5hO7yz6U3vJ6PV/MA44HXy7eX0h3HAgVOj1Z3oYLbh4jcfaIuXFhpXhntM7vRAiu5udD9cab5Wcxe6fuxRivc9ryc4jW7G:3FF8^FT242,324^A0N,46,46^FH\^CI28^FD${barcodePayload}^FS^CI27^BY3,3,95^FT130,278^BCN,,N,N^FH\^FD>:${barcodePayload}^FS^PQ1,0,1,Y^XZ`;
}

function genPositionLabelZpl(
  position: string,
  hasQR: boolean,
  fontSize: number,
): string {
  if (hasQR) {
    return `~CT~~CD,~CC^~CT~^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR6,6~SD15^JUS^LRN^CI27^PA0,1,1,0^XZ^XA^MMT^PW799^LL719^LS0^FPH,3^FT637,719^A0B,${fontSize},${fontSize}^FB718,1,35,C^FH\\^CI28^FD${position}^FS^CI27^FO103,180^BQN,2,18,H^FDQA,${position}^FS^FO13,34^GB773,673,8^FS^FO703,50^GFA,789,2544,12,:Z64:eJy1lkGO2zAMRWUEQQrMwpt61YUP4oXcG3hhnaaL5ig9RhYDO0cp0AvM0rAGVUmJEr/jBE2L1gMYwsPnJ2WJzBjz++cjrO1Z100P/AJ8BB40oHEa0IUF+Ah6DWicBth5vgB3oC8BzHOA9cEvwB3owzWtj8yHtD7M9LyKyD0TQAnKHp4K4AwXCBgh4KfRgMwrSrAaCMjrVvUxIK+reZ4MBJR1rXpTAT/4+xz1DXDwr8C/hnrwbKD+CvZVw34b4HAC+N1YHr6XTWX7yqs9ytv78ug+aTHlVEBegfxE9ngoAxR/BZ732urt4U0Nhat88ym397/I6TJQMR8y76mmPvH5bGpJ0Tj14v7KLUC8yi1gPW3Np50JH5LenEi/CC9bszPZyx6Ej6LnL/ouvJxXRzx/IuSkL/d5w2du4XQCwt1d/WfhnlKcv66FG9Abq/r4NcTf2GnHH+ipfk6x9/lH/rF+Y9f/5c8fB+p3qv8RVO+U8/0v/pHLeYVbfeLcXsYumY8y7dsHzdtqe214nS+P2Q63A0xP7K9dP+J0mGUd+7pPawsBOAdeKIF/14KyUdQH8HHgT02W80qCKspTAuFDrp/+3kpa4aekX255nfxfhY+NFFTzfCj95cqPYcu1vwS5PwMHJR7eOLmcV89FSX994x+AqXCT+/FK79JfhXdxZHxBnu8bv4GX+8nvaccf6X18r0/r/9C/i7zb+zz2P8H8OcL8aW/mlfavD+uO7+eb9u8z8014nD/b+flX/i3ojzBvD6v5hP8/5OcXll0rCA==:5FF3^PQ1,0,1,Y^XZ`;
  }

  return `~CT~~CD,~CC^~CT~^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR6,6~SD15^JUS^LRN^CI27^PA0,1,1,0^XZ^XA^MMT^PW799^LL719^LS0^FO13,34^GB773,673,8^FS^FO703,50^GFA,789,2544,12,:Z64:eJy1lkGO2zAMRWUEQQrMwpt61YUP4oXcG3hhnaaL5ig9RhYDO0cp0AvM0rAGVUmJEr/jBE2L1gMYwsPnJ2WJzBjz++cjrO1Z100P/AJ8BB40oHEa0IUF+Ah6DWicBth5vgB3oC8BzHOA9cEvwB3owzWtj8yHtD7M9LyKyD0TQAnKHp4K4AwXCBgh4KfRgMwrSrAaCMjrVvUxIK+reZ4MBJR1rXpTAT/4+xz1DXDwr8C/hnrwbKD+CvZVw34b4HAC+N1YHr6XTWX7yqs9ytv78ug+aTHlVEBegfxE9ngoAxR/BZ732urt4U0Nhat88ym397/I6TJQMR8y76mmPvH5bGpJ0Tj14v7KLUC8yi1gPW3Np50JH5LenEi/CC9bszPZyx6Ej6LnL/ouvJxXRzx/IuSkL/d5w2du4XQCwt1d/WfhnlKcv66FG9Abq/r4NcTf2GnHH+ipfk6x9/lH/rF+Y9f/5c8fB+p3qv8RVO+U8/0v/pHLeYVbfeLcXsYumY8y7dsHzdtqe214nS+P2Q63A0xP7K9dP+J0mGUd+7pPawsBOAdeKIF/14KyUdQH8HHgT02W80qCKspTAuFDrp/+3kpa4aekX255nfxfhY+NFFTzfCj95cqPYcu1vwS5PwMHJR7eOLmcV89FSX994x+AqXCT+/FK79JfhXdxZHxBnu8bv4GX+8nvaccf6X18r0/r/9C/i7zb+zz2P8H8OcL8aW/mlfavD+uO7+eb9u8z8014nD/b+flX/i3ojzBvD6v5hP8/5OcXll0rCA==:5FF3^FPH,3^FT450,718^A0B,${fontSize},${fontSize}^FB718,1,35,C^FH\^CI28^FD${position}^FS^CI27^PQ1,0,1,Y^XZ`;
}

function genHuaweiExpZpl(
  destination: string,
  nf: number,
  packingList: string,
  thisLabel: number,
  totalLabels: number,
): string {
  return `^XA~TA000~JSN^LT0^MNW^MTT^LH0,0^PR4,4~SD10^CI27^MMT^PW815^LL416^LS0^FT48,71^A0N,46,46^FH\^CI28^FDDESTINO:^FS^CI27^FO29,18^GB772,381,6^FS^FO48,336^GFA,305,688,16,:Z64:eJx90c2NwyAQBeCxfMiREiiF0vB2RilOB0R7QVrE5L2ZJLZQvBwsPgvmD5H/V1QdsipWg1JL2JVAj49rpHUTyWb7uCu3PZuLiJqHe4d3P/rVVRYtcTKTei3wag7u3GDklNu7Vuzo9eUOs6XFHWcPCcN69t6CGVHEqwPiyQ2XEQJR3R1OJw8Ug8OXVhSf68nL4V/6R3eMBF7QKd5hO7yz6U3vJ6PV/MA44HXy7eX0h3HAgVOj1Z3oYLbh4jcfaIuXFhpXhntM7vRAiu5udD9cab5Wcxe6fuxRivc9ryc4jW7G:3FF8^FT234,71^A0N,46,46^FH\^CI28^FD${destination}^FS^CI27^FT48,118^A0N,46,46^FH\^CI28^FDNF:^FS^CI27^FT119,118^A0N,46,46^FH\^CI28^FD${nf}^FS^CI27^BY3,3,57^FT48,186^BCN,,N,N^FH\^FD>:${nf}^FS^FT48,247^A0N,46,46^FH\^CI28^FDPEDIDO:^FS^CI27^FT209,247^A0N,46,46^FH\^CI28^FD${packingList}^FS^CI27^BY2,3,57^FT48,318^BCN,,N,N^FH\^FD>:${packingList}^FS^FT663,371^A0N,32,33^FH\^CI28^FDVOL: ${thisLabel}/${totalLabels}^FS^CI27^PQ1,0,1,Y^XZ`;
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
    await sendZplOverTcp(ip, port, finalZpl, 0);

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

    await sendZplOverTcp(ip, port, allLabelsZpl, 0);

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
    const fontSize = config.fontSize;

    const zpl = genPositionLabelZpl(position, hasQR, fontSize);

    await sendZplOverTcp(ip, port, zpl);

    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: (error as Error).message };
  }
});

ipcMain.handle("print-huawei-exp-label", async (_, config) => {
  try {
    const ip = config.ip || "10.55.22.240";
    const port = config.port || 9100;
    const destination = config.destination;
    const nf = config.nfNumber;
    const packingList = config.packingList;
    const totalLabels = config.totalLabels;

    for (let i = 1; i <= config.totalLabels; i++) {
      const zpl = genHuaweiExpZpl(destination, nf, packingList, i, totalLabels);
      await sendZplOverTcp(ip, port, zpl);
    }

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
