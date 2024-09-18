export class HoboPicture extends HTMLElement {
    #isRendered = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (this.#isRendered) {
            return;
        }

        const founder = this.getAttribute('founder');

        const style = document.createElement('style');
        style.textContent = `
            picture {
                display: flex;

                img {
                    width: var(--founder-size);
                }
            }
        `;

        const picture = document.createElement('picture');
        const source480 = document.createElement('source');
        source480.setAttribute('media', '(max-width: 480px)');
        source480.setAttribute('srcset', `assets/${founder}/${founder}_200.png`);

        const source768 = document.createElement('source');
        source768.setAttribute('media', '(max-width: 768px)');
        source768.setAttribute('srcset', `assets/${founder}/${founder}_400.png`);

        const img = document.createElement('img');
        img.setAttribute('srcset', `assets/${founder}/${founder}_600.png`);

        picture.append(source480);
        picture.append(source768);
        picture.append(img);

        this.shadowRoot.append(style);
        this.shadowRoot.append(picture);

        this.#isRendered = true;
    }
}

customElements.define('hobo-picture', HoboPicture);
