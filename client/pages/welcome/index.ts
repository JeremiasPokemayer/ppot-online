import { Router } from "@vaadin/router";

class Home extends HTMLElement {
  connectedCallback() {
    this.render();

    const buttonNewGame = this.querySelector(".button-newGame");
    buttonNewGame?.addEventListener("click", () => {
      Router.go("/newGame");
    });

    const buttonJoinRoom = this.querySelector(".button-joinRoom");
    buttonJoinRoom?.addEventListener("click", () => {
      Router.go("/joinRoom");
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
    <button class="button-newGame">Nuevo Juego</button>
    <button class="button-joinRoom">Ingresar a una sala</button>
    <div class="container-ppt">
      <img src="https://i.ibb.co/HRz6GvW/piedra.png" alt="" class="img-piedra" />
      <img src="https://i.ibb.co/s9ZMbKNp/papel.png" alt="" class="img-papel" />
      <img src="https://i.ibb.co/KpsMSHnS/tijera.png" alt="" class="img-tijera" />
    </div>
    `;
    this.className = "main";
  }
}
customElements.define("home-page", Home);
