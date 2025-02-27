export function initPapel() {
  customElements.define(
    "custom-papel",
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
        img.src = "https://i.ibb.co/gb3j53SG/papel-1.png";
        img.className = variant;

        style.innerHTML = `
            .seleccion-papel{
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
