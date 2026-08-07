import { useState } from "react";

export default function Exp({ selectedPrinter }: { selectedPrinter: string }) {
  const [printMode, setPrintMode] = useState<"full" | "specific">("full");

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
    <div>
      <h2 className="view-title">Etiquetas EXP</h2>

      <small className="view-subtitle">modo</small>
      <div className="flex-btns">
        <button
          type="button"
          onClick={() => setPrintMode("full")}
          className={printMode === "full" ? "active" : ""}
        >
          Sequência Completa
        </button>
        <button
          type="button"
          onClick={() => setPrintMode("specific")}
          className={printMode === "specific" ? "active" : ""}
        >
          Etiqueta Específica
        </button>
      </div>

      <small className="view-subtitle">Município</small>
      <select>
        <option value="1">Itajaí</option>
        <option value="2">Cachoeirinha</option>
        <option value="3">Passo Fundo</option>
      </select>

      <br />
      <button onClick={handlePrint} style={{ padding: "8px 16px" }}>
        Imprimir Etiqueta
      </button>
    </div>
  );
}
