import { Router } from "@vaadin/router";
import { state } from "../../state";

class initWFO extends HTMLElement {
  connectedCallback() {
    state.listenRoom(state.data.rtdbRoomId, async () => {
      if (state.data.currentGame.player2.start == true) {
        Router.go("/gameP1");
      }
    });
    this.render();
  }
  async render() {
    const nombreP1 = state.data.currentGame.player1.nombre;
    const nombreP2 = state.data.currentGame.player2.nombre;

    const puntajeP1 = state.data.puntajes.puntajeP1;
    const puntajeP2 = state.data.puntajes.puntajeP2;
    this.innerHTML = `
      <footer class="footer__namesYPoints">
      <div class="container__nombres">
        <p>${nombreP1}:${puntajeP1}</p>
        <p>${nombreP2}:${puntajeP2}</p>
      </div>
      <div class="container__sala">
        <p class="parrafo__sala">Sala</p>
        <p class="parrafo__sala-code">${state.data.roomIdPublic}</p>
      </div>
      </footer>
      <div class="container-title">
        <h3 class="title-juego">
          Esperando a que ${nombreP2} presione ¡Jugar!...
        </h3>
      </div>
      <div class="container-ppt">
        <img src="https://i.ibb.co/HRz6GvW/piedra.png" alt="" class="img-piedra" />
        <img src="https://i.ibb.co/s9ZMbKNp/papel.png" alt="" class="img-papel" />
        <img src="https://i.ibb.co/KpsMSHnS/tijera.png" alt="" class="img-tijera" />
      </div>
      `;
    this.className = "main";
  }
}
customElements.define("init-wfo", initWFO);
