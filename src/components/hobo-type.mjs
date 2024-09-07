import { typewrite } from './internal/typewrite.mjs';

function createTextStyle(tagName) {
    const tagStyle = document.createElement('style');

    tagStyle.textContent = `
        ${tagName}:empty:before {
            content: ' ';
            white-space: pre;
        }
        
        ${tagName} {
            width: fit-content;
            size: 1em;        
        }

        @media (max-width: 480px) {
            ${tagName} {
                width: fit-content;
                font-size: .75em;
            }
        }
    `;

    return tagStyle;
}

function computeWidth({
    root,
    element,
}) {
    root.appendChild(element);

    const { width } = window.getComputedStyle(element);

    root.removeChild(element);

    return width;
}

function extractMessages(root) {
    const text = root.textContent.trim();
    const messages = root.messages;

    return !text ? messages : [text];
}

export default class TypewriterParagraph extends HTMLElement {
    #messages = [];

    set messages(value) {
        this.#messages = value;
    }

    get messages() {
        return Object.freeze(this.#messages);
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
        const tagName = this.getAttribute('tag') ?? 'p';

        this.shadowRoot.appendChild(createTextStyle(tagName));

        const messages = extractMessages(this);

        const textElement = document.createElement(tagName);

        const getWidthForText = (text) => {
            const clone = textElement.cloneNode();
            clone.style.width = '';
            clone.textContent = text;

            return computeWidth({
                root: this.shadowRoot,
                element: clone,
            });
        }

        textElement.style.width = getWidthForText(messages[0]);

        textElement.addEventListener('typewrite:next', (event) => {
            const { message } = event.detail;
            textElement.style.width = getWidthForText(message);
        });

        textElement.addEventListener('typewrite:done', () => {
            this.dispatchEvent(new CustomEvent('typewrite:done'));
        });

        this.shadowRoot.appendChild(textElement);

        typewrite(textElement, messages);
    }
}

customElements.define('hobo-type', TypewriterParagraph);