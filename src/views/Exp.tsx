export default function Exp({ selectedPrinter }: { selectedPrinter: string }) {
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
      <h2>Exp View</h2>
      <p>Welcome to the Exp view!</p>

      <button onClick={handlePrint} style={{ padding: "8px 16px" }}>
        Imprimir Etiqueta
      </button>
    </div>
  );
}
