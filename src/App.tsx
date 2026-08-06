import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Exp from "./views/Exp";
import Rec from "./views/Rec";
import "./App.css";

import icon from "./assets/icon.png";

export default function App() {
  return (
    <HashRouter>
      <div className="App">
        <header>
          <img src={icon} className="app-icon" alt="App Icon" />
        </header>

        <nav>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
            >
              <path d="M22,5.724V2c0-.552-.447-1-1-1s-1,.448-1,1v2.366L14.797,.855c-1.699-1.146-3.895-1.146-5.594,0L2.203,5.579c-1.379,.931-2.203,2.48-2.203,4.145v9.276c0,2.757,2.243,5,5,5h2c.553,0,1-.448,1-1V14c0-.551,.448-1,1-1h6c.552,0,1,.449,1,1v9c0,.552,.447,1,1,1h2c2.757,0,5-2.243,5-5V9.724c0-1.581-.744-3.058-2-4Z" />
            </svg>
            Início
          </Link>
          <Link to="/exp">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
            >
              <path d="m24 11.5c0-3.032-2.468-5.5-5.5-5.5h-1.5v-.5c0-1.93-1.57-3.5-3.5-3.5h-2.181c.441.927.681 1.944.681 3h1.5c.275 0 .5.225.5.5v12.5h-11v-5.165s-2.973-2.916-3-2.944v11.109h3.05c-.033.162-.05.329-.05.5 0 1.381 1.119 2.5 2.5 2.5s2.5-1.119 2.5-2.5c0-.171-.018-.338-.05-.5h8.101c-.033.162-.05.329-.05.5 0 1.381 1.119 2.5 2.5 2.5s2.5-1.119 2.5-2.5c0-.171-.018-.338-.05-.5h3.05v-9.5zm-5.5-2.5c1.379 0 2.5 1.121 2.5 2.5v2.5h-4v-5zm-13.5 2.994 3.535-3.458c.944-.944 1.465-2.2 1.465-3.536s-.521-2.591-1.465-3.535-2.2-1.465-3.535-1.465-2.593.521-3.535 1.465c-.944.943-1.465 2.199-1.465 3.535s.521 2.592 1.477 3.547zm-1.413-8.409c.377-.377.879-.585 1.413-.585s1.036.208 1.414.586.586.88.586 1.414-.208 1.036-.574 1.402l-1.426 1.395-1.414-1.384c-.378-.377-.586-.879-.586-1.413s.208-1.036.587-1.415z" />
            </svg>
            Expedição
          </Link>
          <Link to="/rec">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
            >
              <path d="m10 6v-6h4v6a2 2 0 0 1 -4 0zm6-1h8a5.006 5.006 0 0 0 -5-5h-3zm-8-5h-3a5.006 5.006 0 0 0 -5 5h8zm16 7v12a5.006 5.006 0 0 1 -5 5h-14a5.006 5.006 0 0 1 -5-5v-12h8.142a3.981 3.981 0 0 0 7.716 0zm-4 12a1 1 0 0 0 -1-1h-3a1 1 0 0 0 0 2h3a1 1 0 0 0 1-1z" />
            </svg>
            Recebimento
          </Link>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exp" element={<Exp />} />
            <Route path="/rec" element={<Rec />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
