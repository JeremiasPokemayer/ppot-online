import { Router } from "@vaadin/router";
import { state } from "../../state";

class initGameP2 extends HTMLElement {
  connectedCallback() {
    this.render();
    const buttonJugar = this.querySelector(".button-jugar");
    buttonJugar?.addEventListener("click", () => {
      state.setReadyP2(true);
      Router.go("/gamep2");
    });
  }
  render() {
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
          Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
        </h3>
      </div>
      <button class="button-jugar">¡Jugar!</button>
      <div class="container-ppt">
        <img src="https://i.ibb.co/HRz6GvW/piedra.png" alt="" class="img-piedra" />
        <img src="https://i.ibb.co/s9ZMbKNp/papel.png" alt="" class="img-papel" />
        <img src="https://i.ibb.co/KpsMSHnS/tijera.png" alt="" class="img-tijera" />
      </div>
      `;
    this.className = "main";
  }
}
customElements.define("init-page-p2", initGameP2);
