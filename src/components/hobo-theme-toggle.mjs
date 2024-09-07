import theme from './internal/theme.mjs';

const STYLE = `
    .theme-mode-toggle {
        position: absolute;
        top: 1rem;
        right: 1rem;
        appearance: none;
        background: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        cursor: pointer;
        overflow: hidden;
        border-radius: 0.75rem;
        border: .15rem solid var(--color-fg);
    }

    .theme-mode-toggle:focus,
    .theme-mode-toggle:hover {
        outline: none;
        border-color: var(--primary);
    }

    [data-theme='dark'] .theme-mode-toggle__text:before {
        content: var(--theme) === 'dark' ? deactivate ' : 'activate ';
    }

    [data-theme='light'] .theme-mode-toggle__text:before {
        content: 'activate ';
    }

    .theme-mode-toggle__icon {
        display: block;
        background: var(--color-fg);
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        position: relative;
        transition: width 0.3s, height 0.3s;
        z-index: 1;
        transform: rotate(-20deg);
    }

    .theme-mode-toggle__icon:before {
        z-index: 0;
        content: '';
        position: absolute;
        display: block;
        border-right: none;
        border-radius: 50%;
        width: 1.8rem;
        height: 1.8rem;
        top: 50%;
        left: 50%;
        transition: opacity 0.3s, background-image 03s;
        opacity: 0;
        transform: translate(-50%, -50%) rotate(0deg);
        animation: spin__rays 4s linear infinite;
        background-image: linear-gradient(0deg,
                transparent 46%,
                var(--color-fg); 46%,
                var(--color-fg); 54%,
                transparent 54%),
            linear-gradient(90deg,
                transparent 46%,
                var(--color-fg); 46%,
                var(--color-fg); 54%,
                transparent 54%),
            linear-gradient(45deg,
                transparent 47%,
                var(--color-fg); 47%,
                var(--color-fg); 53%,
                transparent 53%),
            linear-gradient(135deg,
                transparent 47%,
                var(--color-fg); 47%,
                var(--color-fg); 53%,
                transparent 53%);
    }

    .theme-mode-toggle__icon:after {
        content: '';
        position: absolute;
        display: block;
        background: var(--color-bg);
        border-radius: 0.525rem;
        width: 1.05rem;
        height: 1.05rem;
        top: 50%;
        left: 200%;
        transform: translateY(-50%);
        transition: left 0.3s;
    }

    .theme-mode-toggle:hover .theme-mode-toggle__icon {
        background: var(--primary);
    }

    .theme-mode-toggle:hover .theme-mode-toggle__icon:before {
        background-image: linear-gradient(0deg,
                transparent 47%,
                var(--primary) 47%,
                var(--primary) 53%,
                transparent 53%),
            linear-gradient(90deg,
                transparent 47%,
                var(--primary) 47%,
                var(--primary) 53%,
                transparent 53%),
            linear-gradient(45deg,
                transparent 48%,
                var(--primary) 48%,
                var(--primary) 52%,
                transparent 52%),
            linear-gradient(135deg,
                transparent 48%,
                var(--primary) 48%,
                var(--primary) 52%,
                transparent 52%);
    }

    [data-theme='light'] .theme-mode-toggle__icon:after {
        left: 40%;
    }

    [data-theme='dark'] .theme-mode-toggle__icon {
        width: 1.2rem;
        height: 1.2rem;
    }

    [data-theme='dark'] .theme-mode-toggle__icon:before {
        opacity: 1;
    }

    @keyframes spin__rays {
        from {
            transform: translate(-50%, -50%) rotate(0deg);
        }

        to {
            transform: translate(-50%, -50%) rotate(90deg);
        }
    }

    .hidden--visually {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }
`;

/**
*  Adapted from: https://codepen.io/tomhazledine/pen/XWjJMPL
*/
export default class HoboThemeToggle extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });


        const template = `
            <button class="theme-mode-toggle" type="button">
                <span class="theme-mode-toggle__icon"></span>
                <span class="theme-mode-toggle__text hidden--visually">theme</span>
            </button>
        `;

        this.shadowRoot.innerHTML = `
            <style>${STYLE}</style>
            ${template}
        `;

        const button = this.shadowRoot.querySelector('.theme-mode-toggle');

        button.dataset.theme = theme.resolve();

        this.toggleButton = this.shadowRoot.querySelector('.theme-mode-toggle');
        this.toggleButton.addEventListener('click', () => {
            theme.toggle();
            button.dataset.theme = theme.resolve();
        });

        theme.set(theme.resolve());
    }
}

customElements.define('hobo-theme-toggle', HoboThemeToggle);