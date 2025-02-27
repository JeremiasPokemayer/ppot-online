class RoomComplete extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <div class="container-title">
        <h3 class="title-ppt">Piedra</h3>
        <h3 class="title-ppt">Papel</h3>
        <h3 class="title-o">ó</h3>
        <h3 class="title-ppt">Tijera</h3>
    </div>
    <div>
        <h3>Ups, esta sala está completa y tu nombre no coincide con nadie en la sala.</h3>
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
customElements.define("roomcomplete-page", RoomComplete);
