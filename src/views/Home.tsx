import { useEffect, useState } from "react";

interface PrinterInfo {
  name: string;
  displayName: string;
  description: string;
  status: number;
  isDefault: boolean;
}

export default function Home() {
  const [printers, setPrinters] = useState<PrinterInfo[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPrinters() {
      try {
        // Invoke the IPC handler exposed via preload
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

  const handlePrint = async () => {
    if (!selectedPrinter) {
      alert("Por favor, selecione uma impressora.");
      return;
    }

    try {
      const result = await (window as any).ipcRenderer.invoke(
        "print-label",
        selectedPrinter,
      );
      if (result.success) {
        alert("Impresso com sucesso!");
      } else {
        alert("Erro ao imprimir: " + result.error);
      }
    } catch (error) {
      console.error("Erro na comunicação de impressão:", error);
    }
  };

  return (
    <div
      className="Home"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
      }}
    >
      <p>Impressão de etiquetas padrão ARQ</p>
      <small className="dim">Selecione uma opção na lista ao lado.</small>

      <div style={{ marginTop: "20px" }}>
        <h3>Impressora</h3>
        {loading ? (
          <p>Carregando impressoras...</p>
        ) : printers.length === 0 ? (
          <p>Nenhuma impressora encontrada.</p>
        ) : (
          <>
            <select
              value={selectedPrinter}
              onChange={(e) => setSelectedPrinter(e.target.value)}
              style={{
                padding: "8px",
                fontSize: "14px",
                minWidth: "220px",
                marginRight: "10px",
              }}
            >
              {printers.map((printer) => (
                <option key={printer.name} value={printer.name}>
                  {printer.displayName || printer.name}{" "}
                  {printer.isDefault ? "(Padrão)" : ""}
                </option>
              ))}
            </select>

            <button onClick={handlePrint} style={{ padding: "8px 16px" }}>
              Imprimir Etiqueta
            </button>
          </>
        )}
      </div>
    </div>
  );
}
