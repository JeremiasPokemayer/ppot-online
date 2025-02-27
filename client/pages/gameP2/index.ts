import { Router } from "@vaadin/router";
import { state } from "../../state";

class GameRoomP2 extends HTMLElement {
  connectedCallback() {
    this.render();

    const tijeraEl = document.getElementById("tijera") as HTMLElement;
    const papelEl = document.getElementById("papel") as HTMLElement;
    const piedraEl = document.getElementById("piedra") as HTMLElement;

    tijeraEl.addEventListener("click", () => {
      tijeraEl.style.transform = "translate(0px, -70px)";
      tijeraEl.style.opacity = "1";
      papelEl.style.transform = "translate(0px, 40px)";
      papelEl.style.opacity = "0.5";
      piedraEl.style.transform = "translate(0px, 40px)";
      piedraEl.style.opacity = "0.5";
      state.setMoveP2("tijera");
      state.data.owner = false;
    });
    piedraEl.addEventListener("click", () => {
      tijeraEl.style.transform = "translate(0px, 40px)";
      tijeraEl.style.opacity = "0.5";
      papelEl.style.transform = "translate(0px, 40px)";
      papelEl.style.opacity = "0.5";
      piedraEl.style.transform = "translate(0px, -70px)";
      piedraEl.style.opacity = "1";
      state.setMoveP2("piedra");
      state.data.owner = false;
    });
    papelEl.addEventListener("click", () => {
      tijeraEl.style.transform = "translate(0px, 40px)";
      tijeraEl.style.opacity = "0.5";
      papelEl.style.transform = "translate(0px, -70px)";
      papelEl.style.opacity = "1";
      piedraEl.style.transform = "translate(0px, 40px)";
      piedraEl.style.opacity = "0.5";
      state.setMoveP2("papel");
      state.data.owner = false;
    });
  }
  render() {
    let contador = 3;
    const intervalId = setInterval(() => {
      contador--;
      const titleCounter = document.getElementById("titleCounter") as any;
      titleCounter.innerText = contador.toString();
      if (contador == 0) {
        clearInterval(intervalId);
        setTimeout(() => {
          Router.go("/showmoves");
        }, 3000);
      }
    }, 1000);

    this.innerHTML = `
        <div class="container-title-counter">
          <h1 class="title-counter" id="titleCounter">
            ${contador}
          </h1>
        </div>
        <div class="container-ppt-game">
            <div class="opcion" id="piedra">
                <custom-piedra variant="seleccion-piedra"></custom-piedra>
            </div>
             <div class="opcion" id="papel"> 
                <custom-papel variant="seleccion-papel"></custom-papel>
            </div>
            <div class="opcion" id="tijera">
                <custom-tijera variant="seleccion-tijera"></custom-tijera>
             </div>
        </div>
        `;
    this.className = "main-counter";
  }
}
customElements.define("gameroomp2-page", GameRoomP2);
