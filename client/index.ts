import "./router.ts";
import "../client/pages/welcome/index.ts";
import "../client/pages/newGame/index.ts";
import "../client/pages/joinRoom/index.ts";
import "../client/pages/salaOcupada/index.ts";
import "../client/pages/preInicio/index.ts";
import "../client/pages/inicio/index.ts";
import "../client/pages/inicioP2/index.ts";
import "../client/pages/result/index.ts";
import "../client/pages/waitForOponent/index.ts";
import "../client/pages/game/index.ts";
import "../client/pages/gameP2/index.ts";
import "../client/pages/show-moves/index.ts";
import "../client/pages/result/index.ts";
import "../client/pages/resultP2/index.ts";
import { initPiedra } from "./components/piedra";
import { initTijera } from "./components/tijera";
import { initPapel } from "./components/papel";
import { initResultado } from "./components/resultado";

(function () {
  initPiedra();
  initTijera();
  initPapel();
  initResultado();
})();
