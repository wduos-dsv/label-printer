import { useState } from "react";
// import Modal from "../components/Modal";

export default function Exp({ selectedPrinter }: { selectedPrinter: string }) {
  const [printMode, setPrintMode] = useState<"full" | "specific">("full");
  const [selectedMunicipality, setSelectedMunicipality] = useState<
    "Itajaí" | "Cachoeirinha" | "Passo Fundo"
  >("Itajaí");
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [orderNumber, setOrderNumber] = useState("");
  const [palletQuantity, setPalletQuantity] = useState(1);
  const [printRepackLabel, setPrintRepackLabel] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  const handlePrint = async () => {
    // setShowModal(true);

    alert("Por favor, selecione uma impressora.");
    return;

    if (!selectedPrinter) {
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
      <div className="flex-btns">
        <button
          type="button"
          onClick={() => setSelectedMunicipality("Itajaí")}
          className={selectedMunicipality === "Itajaí" ? "active" : ""}
        >
          Itajaí
        </button>
        <button
          type="button"
          onClick={() => setSelectedMunicipality("Cachoeirinha")}
          className={selectedMunicipality === "Cachoeirinha" ? "active" : ""}
        >
          Cachoeirinha
        </button>
        <button
          type="button"
          onClick={() => setSelectedMunicipality("Passo Fundo")}
          className={selectedMunicipality === "Passo Fundo" ? "active" : ""}
        >
          Passo Fundo
        </button>
      </div>
      <small className="view-subtitle">Data de Expedição</small>
      <input
        type="date"
        value={selectedDate}
        onChange={(event) => setSelectedDate(event.target.value)}
      />
      <small className="view-subtitle">Número da Ordem</small>
      <input
        type="number"
        placeholder="6878496221"
        value={orderNumber}
        min={6878000000}
        max={9999999999}
        onChange={(event) => {
          const digits = event.target.value.replace(/\D/g, "").slice(0, 10);
          setOrderNumber(digits);
        }}
      />
      <small className="view-subtitle">Quantidade de Pallets</small>
      <input
        type="number"
        value={palletQuantity}
        max={30}
        onChange={(event) =>
          setPalletQuantity(parseInt(event.target.value) || 1)
        }
      />
      <small className="view-subtitle">Imprimir etiqueta de Repack</small>
      <div className="flex-btns">
        <button
          type="button"
          onClick={() => setPrintRepackLabel(true)}
          className={printRepackLabel ? "active" : ""}
        >
          Sim
        </button>
        <button
          type="button"
          onClick={() => setPrintRepackLabel(false)}
          className={printRepackLabel ? "" : "active"}
        >
          Não
        </button>
      </div>
      <button
        className="print-labels-btn"
        onClick={handlePrint}
        style={{ padding: "8px 16px" }}
      >
        Iniciar Impressão
      </button>

      {/* <Modal show={showModal} /> */}
    </div>
  );
}
