export function initTijera() {
  customElements.define(
    "custom-tijera",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const variant = this.getAttribute("variant") || "body";
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        const style = document.createElement("style");
        const img = document.createElement("img");
        img.src = "https://i.ibb.co/ch8ns7Dy/tijera-1.png";
        img.className = variant;

        style.innerHTML = `
            .seleccion-tijera{
                width: 104px;
                height: 238px;
                transform : translate(0px, 80px);
            }
            .body{
                width: 159px;
                height: 356px;
                transform : translate(0px, 60px);

            }
        `;

        div.appendChild(img);
        shadow.appendChild(style);
        shadow.appendChild(div);
      }
    }
  );
}
