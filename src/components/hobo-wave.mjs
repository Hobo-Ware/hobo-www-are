class HoboWave extends HTMLElement {
    #isRendered = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (this.#isRendered) {
            return;
        }

        const numDots = this.getAttribute('dot-count') || 5;
        const animationDuration = this.getAttribute('animation-duration') || 2;

        const container = document.createElement('div');
        container.classList.add('container');

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.textContent = '.';
            dot.classList.add('dot');
            dot.style.animationDelay = `${i * 0.2}s`;
            container.appendChild(dot);
        }

        const style = document.createElement('style');
        style.textContent = `
            .container {
                display: flex;
                align-items: center;
            }

            .dot {
                font-weight: bold;
                color: var(--foreground-color);
                border-radius: 50%;
                animation: wave ${animationDuration}s ease-in-out infinite;
            }

            @keyframes wave {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-5px); /* Adjust the height of the wave */
                }
            }
        `;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(container);

        this.#isRendered = true;
    }
}

customElements.define('hobo-wave', HoboWave);