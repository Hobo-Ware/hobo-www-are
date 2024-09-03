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

        const maxWidth = Math.max(
            ...messages.map(message => {
                const clone = textElement.cloneNode();
                clone.textContent = message;

                return parseFloat(computeWidth({
                    root: this.shadowRoot,
                    element: clone,
                }));
            })
        );

        textElement.style.width = `${maxWidth}px`;

        textElement.addEventListener('typewrite:done', () => {
            this.dispatchEvent(new CustomEvent('typewrite:done'));
        });

        this.shadowRoot.appendChild(textElement);

        typewrite(textElement, messages);
    }
}

customElements.define('hobo-type', TypewriterParagraph);