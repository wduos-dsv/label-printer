import banner from "../assets/setup.svg";

export default function Home() {
  return (
    <div
      className="Home"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <img
        src={banner}
        alt="banner"
        style={{ height: "9rem", marginBottom: "var(--spacing-1)" }}
      />
      <p className="bold center">Impressão de etiquetas padrão ARQ</p>
      <ul
        className="center dim"
        style={{ margin: 0, padding: 0, listStyle: "none" }}
      >
        <li>
          <small>Escolha o tipo de etiqueta na lista ao lado</small>
        </li>
        <li>
          <small>Personalize os dados das etiquetas pela interface</small>
        </li>
        <li>
          <small>Configure a impressora de destino</small>
        </li>
        <li>
          <small>Imprima!</small>
        </li>
      </ul>
    </div>
  );
}
