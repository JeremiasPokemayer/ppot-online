import { Router } from "@vaadin/router";
import { state } from "../../state";

class JoinRoom extends HTMLElement {
  connectedCallback() {
    this.render();

    const form = this.querySelector(".container-inputCode");
    form.addEventListener("submit", async (e: any) => {
      e.preventDefault();
      const codigo = e.target.code.value;
      const nombreP2 = e.target.nombre.value;
      state.data.roomIdPublic = codigo;
      await state.getRtdbId(codigo);

      if (state.data.rtdbRoomId) {
        await state.joinRoom(state.data.rtdbRoomId);
        if (state.data.currentGame.player2.nombre == "") {
          state.setPlayer2(nombreP2);
          state.setDatabaseP2();
          Router.go("/initplayer2");
        } else {
          Router.go("/roomComplete");
        }
      } else {
        console.error("No se pudo obtener el ID de la sala.");
      }
    });
  }
  render() {
    this.innerHTML = `
    <div class="container-title">
        <h3 class="title-ppt">Piedra</h3>
        <h3 class="title-ppt">Papel</h3>
        <h3 class="title-o">ó</h3>
        <h3 class="title-ppt">Tijera</h3>
    </div>
    <form class="container-inputCode">
        <input type="text" name="nombre" class="input__inputName" placeholder="Tu Nombre">
        <input type="text" name="code" class="input__inputCode" placeholder="código">
        <button class="button-joinRoom">Ingresar a una sala</button>
    </form>
    <div class="container-ppt">
      <img src="https://i.ibb.co/HRz6GvW/piedra.png" alt="" class="img-piedra" />
      <img src="https://i.ibb.co/s9ZMbKNp/papel.png" alt="" class="img-papel" />
      <img src="https://i.ibb.co/KpsMSHnS/tijera.png" alt="" class="img-tijera" />
    </div>
    `;
    this.className = "main";
  }
}
customElements.define("joinroom-page", JoinRoom);
