import { Router } from "@vaadin/router";
import { state } from "../../state";

class NewGame extends HTMLElement {
  connectedCallback() {
    this.render();

    const form = this.querySelector(".container-inputName") as HTMLFormElement;
    form.addEventListener("submit", async (e: any) => {
      e.preventDefault();
      const nombre = e.target.nombre.value;
      state.setPlayer(nombre);
      try {
        await state.createGame(() => {
          state.createRoom(async () => {
            Router.go("/initpre");
          });
        });
      } catch (error) {
        console.error("Error al crear el juego:", error);
        alert("Hubo un problema al crear el juego. Intenta nuevamente.");
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
    <form class="container-inputName">
        <label for="nombre" class="label__tuNombre">Tu Nombre</label>
        <input type="text" name="nombre" class="input__inputName">
        <button class="button-empezar">Empezar</button>
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
customElements.define("newgame-page", NewGame);
