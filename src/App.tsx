import { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Exp from "./views/Exp";
import Rec from "./views/Rec";
import "./App.css";

import icon from "./assets/icon.png";

interface PrinterInfo {
  name: string;
  displayName: string;
  description: string;
  status: number;
  isDefault: boolean;
}

export default function App() {
  const [printers, setPrinters] = useState<PrinterInfo[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<string>("/");

  useEffect(() => {
    async function loadPrinters() {
      try {
        // Invoke the IPC handler exposed via preload
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const printerList = await (window as any).ipcRenderer.invoke(
          "get-printers",
        );
        setPrinters(printerList);

        // Automatically select the system's default printer if available
        const defaultPrinter = printerList.find(
          (p: PrinterInfo) => p.isDefault,
        );
        if (defaultPrinter) {
          setSelectedPrinter(defaultPrinter.name);
        } else if (printerList.length > 0) {
          setSelectedPrinter(printerList[0].name);
        }
      } catch (error) {
        console.error("Failed to fetch printers:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPrinters();
  }, []);

  return (
    <HashRouter>
      <div className="App">
        <header>
          <img src={icon} alt="Icon" />
          <div className="control-btns">
            <button
              className="minimize-btn"
              onClick={() =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (window as any).ipcRenderer.send("window-minimize")
              }
            >
              <svg viewBox="0 0 24 24">
                <path d="M16.5,13.5h-9a1.5,1.5,0,0,1,0-3h9a1.5,1.5,0,0,1,0,3Z" />
              </svg>
            </button>
            <button
              className="maximize-btn"
              onClick={() =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (window as any).ipcRenderer.send("window-maximize")
              }
            >
              <svg viewBox="0 0 24 24">
                <path d="M14,19h-4c-2.76,0-5-2.24-5-5v-4c0-2.76,2.24-5,5-5h4c2.76,0,5,2.24,5,5v4c0,2.76-2.24,5-5,5Zm-4-11c-1.1,0-2,.9-2,2v4c0,1.1,.9,2,2,2h4c1.1,0,2-.9,2-2v-4c0-1.1-.9-2-2-2h-4Z" />
              </svg>
            </button>
            <button
              className="close-btn"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => (window as any).ipcRenderer.send("window-close")}
            >
              <svg viewBox="0 0 24 24">
                <path d="M14.121,12,18,8.117A1.5,1.5,0,0,0,15.883,6L12,9.879,8.11,5.988A1.5,1.5,0,1,0,5.988,8.11L9.879,12,6,15.882A1.5,1.5,0,1,0,8.118,18L12,14.121,15.878,18A1.5,1.5,0,0,0,18,15.878Z" />
              </svg>
            </button>
          </div>
        </header>

        <nav>
          <Link
            to="/"
            onClick={() => setCurrentView("/")}
            className={currentView === "/" ? "active" : ""}
          >
            <svg viewBox="0 0 24 24">
              <path d="M22,5.724V2c0-.552-.447-1-1-1s-1,.448-1,1v2.366L14.797,.855c-1.699-1.146-3.895-1.146-5.594,0L2.203,5.579c-1.379,.931-2.203,2.48-2.203,4.145v9.276c0,2.757,2.243,5,5,5h2c.553,0,1-.448,1-1V14c0-.551,.448-1,1-1h6c.552,0,1,.449,1,1v9c0,.552,.447,1,1,1h2c2.757,0,5-2.243,5-5V9.724c0-1.581-.744-3.058-2-4Z" />
            </svg>
            Início
          </Link>
          <Link
            to="/exp"
            onClick={() => setCurrentView("/exp")}
            className={currentView === "/exp" ? "active" : ""}
          >
            <svg viewBox="0 0 24 24">
              <path d="m24 11.5c0-3.032-2.468-5.5-5.5-5.5h-1.5v-.5c0-1.93-1.57-3.5-3.5-3.5h-2.181c.441.927.681 1.944.681 3h1.5c.275 0 .5.225.5.5v12.5h-11v-5.165s-2.973-2.916-3-2.944v11.109h3.05c-.033.162-.05.329-.05.5 0 1.381 1.119 2.5 2.5 2.5s2.5-1.119 2.5-2.5c0-.171-.018-.338-.05-.5h8.101c-.033.162-.05.329-.05.5 0 1.381 1.119 2.5 2.5 2.5s2.5-1.119 2.5-2.5c0-.171-.018-.338-.05-.5h3.05v-9.5zm-5.5-2.5c1.379 0 2.5 1.121 2.5 2.5v2.5h-4v-5zm-13.5 2.994 3.535-3.458c.944-.944 1.465-2.2 1.465-3.536s-.521-2.591-1.465-3.535-2.2-1.465-3.535-1.465-2.593.521-3.535 1.465c-.944.943-1.465 2.199-1.465 3.535s.521 2.592 1.477 3.547zm-1.413-8.409c.377-.377.879-.585 1.413-.585s1.036.208 1.414.586.586.88.586 1.414-.208 1.036-.574 1.402l-1.426 1.395-1.414-1.384c-.378-.377-.586-.879-.586-1.413s.208-1.036.587-1.415z" />
            </svg>
            Expedição
          </Link>
          <Link
            to="/rec"
            onClick={() => setCurrentView("/rec")}
            className={currentView === "/rec" ? "active" : ""}
          >
            <svg viewBox="0 0 24 24">
              <path d="m10 6v-6h4v6a2 2 0 0 1 -4 0zm6-1h8a5.006 5.006 0 0 0 -5-5h-3zm-8-5h-3a5.006 5.006 0 0 0 -5 5h8zm16 7v12a5.006 5.006 0 0 1 -5 5h-14a5.006 5.006 0 0 1 -5-5v-12h8.142a3.981 3.981 0 0 0 7.716 0zm-4 12a1 1 0 0 0 -1-1h-3a1 1 0 0 0 0 2h3a1 1 0 0 0 1-1z" />
            </svg>
            Recebimento
          </Link>

          <div id="printer-picker">
            <small className="view-subtitle">Seleção de Impressora</small>
            {loading ? (
              <small>Carregando impressoras...</small>
            ) : printers.length === 0 ? (
              <small className="err bold">Sem impressoras conectadas</small>
            ) : (
              <>
                <select
                  value={selectedPrinter}
                  onChange={(e) => setSelectedPrinter(e.target.value)}
                >
                  {printers.map((printer) => (
                    <option key={printer.name} value={printer.name}>
                      {printer.displayName || printer.name}{" "}
                      {printer.isDefault ? "(Padrão)" : ""}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/exp"
              element={<Exp selectedPrinter={selectedPrinter} />}
            />
            <Route path="/rec" element={<Rec />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
