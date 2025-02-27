export function initResultado() {
  customElements.define(
    "custom-resultado",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const variant = this.getAttribute("variant");
        let resultEl = "";
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        const style = document.createElement("style");
        if (variant == "Ganaste") {
          resultEl = "ganaste";
        } else if (variant == "Empate") {
          resultEl = "empate";
        } else {
          resultEl = "perdiste";
        }

        div.innerHTML = `
                <div class=${resultEl}>${variant}</div>
        `;
        style.innerHTML = `
              .ganaste{
                width: 250px;
                height: 250px;
                background-color: #4CAF50; 
                clip-path: polygon(
                    50% 0%, 61% 38%, 100% 38%, 
                    68% 60%, 79% 100%, 50% 75%, 
                    21% 100%, 32% 60%, 0% 38%, 39% 38%
                );
                position: relative;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 55px;
                font-weight: 400;
                color: white;
                border: 20px solid black;
                }
              .perdiste, .empate{
                width: 250px;
                height: 250px;
                background-color:rgba(220, 91, 73, 1);
                clip-path: polygon(
                    50% 0%, 61% 38%, 100% 38%, 
                    68% 60%, 79% 100%, 50% 75%, 
                    21% 100%, 32% 60%, 0% 38%, 39% 38%
                );
                position: relative;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 55px;
                font-weight: 400;
                color: white;
                border: 20px solid black;
              }
          `;

        shadow.appendChild(style);
        shadow.appendChild(div);
      }
    }
  );
}
