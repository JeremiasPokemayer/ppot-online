import { Router } from "@vaadin/router";
import { state } from "../../state";

class initPreGame extends HTMLElement {
  connectedCallback() {
    const codeRoom = state.data.roomIdPublic;
    state.getRoomId(codeRoom, async () => {
      await state.setDatabaseP1();
      await state.listenRoom(state.data.rtdbRoomId, () => {
        if (state.data.currentGame.player2.online == true) {
          Router.go("/init");
        }
      });
    });

    this.render();
  }
  render() {
    this.innerHTML = `
      <div class="container-title">
        <h3 class="title-juego">Compartí el código:</h3>
        <h3 class="title-juego__code">${state.data.roomIdPublic}</h3>
        <h3 class="title-juego">Con tu contrincante.</h3>
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
customElements.define("initpre-page", initPreGame);
