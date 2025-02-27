import { Router } from "@vaadin/router";
import { state } from "../../state";

class ShowMoves extends HTMLElement {
  connectedCallback() {
    this.style.justifyContent = "space-between";
    this.style.height = "100vh";
    this.style.alignItems = "center";
    this.style.flexDirection = "column-reverse";
    this.style.display = "flex";

    this.render();
    if (state.data.owner == true) {
      setTimeout(() => {
        Router.go("/result");
      }, 3000);
    } else if (state.data.owner == false) {
      setTimeout(() => {
        Router.go("/resultP2");
      }, 3000);
    }
  }
  render() {
    const player1Move = state.data.currentGame.player1.choice as any;
    const player2Move = state.data.currentGame.player2.choice as any;
    const resultado = state.whoWins(player1Move, player2Move);
    state.setPuntaje(player1Move, player2Move);

    const player1Element = state.createPlayerElement(player1Move);
    const player2Element = state.createPlayerElement(player2Move);

    player2Element.style.transform = "rotate(180deg)";

    this.innerHTML = "";

    this.appendChild(player1Element);
    this.appendChild(player2Element);
    this.className = "main";
  }
}
customElements.define("showmoves-page", ShowMoves);
