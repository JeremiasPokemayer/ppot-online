import { Router } from "@vaadin/router";
import { state } from "../../state";

class InitResult extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    let variantEl = state.data.currentGame.player1.result;
    console.log(variantEl, "variantEl P1");

    this.innerHTML = `
    <div class="main-resultado-${variantEl}"> 
      <custom-resultado variant="${variantEl}"></custom-resultado>
      <div class="main-score">
        <h3 class="h3-points">Score</h3>
        <div class="main-points"> 
          <h4 class="h4-points">${state.data.currentGame.player1.nombre}:${state.data.puntajes.puntajeP1}</h4>
          <h4 class="h4-points">${state.data.currentGame.player2.nombre}:${state.data.puntajes.puntajeP2}</h4>
        </div>
      </div>
      <button class="button-volver">Volver a Jugar</button>
    </div>
  `;

    this.className = "main";

    const style = document.createElement("style");
    style.innerHTML = `
    .main{
      margin:0px;
    }

    .main-resultado-Ganaste{
      background-color:rgba(136, 137, 73, 0.9);
      font-family: "Odibee Sans";
      display:flex;
      flex-direction:column;
      height:100vh;
      width:100%;
      justify-content: space-around;
      align-items: center;
    }

    .main-resultado-Perdiste, .main-resultado-Empate{
      background-color:rgba(137, 73, 73, 0.9);
      font-family: "Odibee Sans";
      display:flex;
      flex-direction:column;
      height:100vh;
      width:100%;
      justify-content: space-around;
      align-items: center;
    }`;

    this.appendChild(style);

    const buttonVolver = this.querySelector(".button-volver");
    buttonVolver?.addEventListener("click", () => {
      state.setReadyP2(false);
      Router.go("/initWFO");
    });
  }
}
customElements.define("result-page", InitResult);
