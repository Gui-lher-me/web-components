const template = document.createElement("template");

template.innerHTML = `
  <style>
  .user-card {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
		width: 500px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 10px;
		margin-bottom: 15px;
		border-bottom: darkorchid 5px solid;
	}

	.user-card img {
		width: 100%;
	}

	.user-card button {
		cursor: pointer;
		background: darkorchid;
		color: #fff;
		border: 0;
		border-radius: 5px;
		padding: 5px 10px;
	}
  </style>

  <div class="user-card">
    <img />
    <div>
      <h3></h3>
      <div class="info">
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`;

window.customElements.define(
  "user-card",
  class extends HTMLElement {
    constructor() {
      super();

      this.showInfo = true;

      this.toggleInfo = this.toggleInfo.bind(this);

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
      this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");

      this.toggleBtn = this.shadowRoot.querySelector("#toggle-info");
    }

    toggleInfo() {
      this.showInfo = !this.showInfo;

      const info = this.shadowRoot.querySelector(".info");

      if (this.showInfo) {
        info.style.display = "block";
        this.toggleBtn.innerText = "Hide Info";
      } else {
        info.style.display = "none";
        this.toggleBtn.innerText = "Show Info";
      }
    }

    connectedCallback() {
      this.toggleBtn.addEventListener("click", this.toggleInfo);
    }

    disconnectedCallback() {
      this.toggleBtn.removeEventListener("click", this.toggleInfo);
    }
  }
);
