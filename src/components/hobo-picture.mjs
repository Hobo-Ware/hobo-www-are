/**
 * Creates a picture element with multiple source elements for responsive images.
 *
 * @param {Object} options - The options for creating the picture element.
 * @param {string} options.founder - The name of the founder.
 * @param {string} options.className - The class name to be added to the picture element.
 * @param {string} options.assetName - The base name of the asset files.
 * @returns {HTMLPictureElement} The created picture element.
 */
function createFounderPicture({
    founder,
    className,
    assetName,
}) {
    const picture = document.createElement('picture');
    picture.addEventListener('contextmenu', e => e.preventDefault());
    picture.classList.add(className);

    [
        {
            element: 'source',
            maxWidth: 480,
            fileName: `${assetName}_200.png`
        },
        {
            element: 'source',
            maxWidth: 768,
            fileName: `${assetName}_400.png`
        },
        {
            element: 'img',
            fileName: `${assetName}_600.png`
        },
    ].forEach(({
        element,
        maxWidth,
        fileName
    }) => {
        const source = document.createElement(element);
        source.setAttribute('draggable', 'false');

        if (maxWidth) {
            source.setAttribute('media', `(max-width: ${maxWidth}px)`);
        }

        source.setAttribute('srcset', `assets/${founder}/${fileName}`);
        picture.append(source);
    });

    return picture;
}

/**
 * Retrieves the URL of the picture element based on the current media query match.
 *
 * @param {HTMLPictureElement} picture - The picture element containing source and img elements.
 * @returns {string} - The URL of the matched source element or the img element.
 */
function getPictureUrl(picture) {
    const sources = picture.querySelectorAll('source');
    const image = Array.from(sources)
        .find(source => {
            const media = source.getAttribute('media');
            const isMatch = window.matchMedia(media).matches;

            return isMatch;
        }) ?? picture.querySelector('img');

    return image.srcset ?? image.src;
}

/**
 * Creates a ripple effect on the specified element.
 *
 * @param {Object} params - The parameters for creating the ripple.
 * @param {HTMLElement} params.element - The HTML element on which to create the ripple effect.
 * @param {Object} params.offset - The offset of the element.
 * @param {number} params.offset.left - The left offset of the element.
 * @param {number} params.offset.top - The top offset of the element.
 * @param {Object} params.cursor - The cursor position.
 * @param {number} params.cursor.x - The x-coordinate of the cursor.
 * @param {number} params.cursor.y - The y-coordinate of the cursor.
 */
function createRipple({
    element,
    offset,
    cursor,
}) {
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    element.style.setProperty('--ripple-width', `${diameter}px`);
    element.style.setProperty('--ripple-height', `${diameter}px`);
    element.style.setProperty('--ripple-left', `${cursor.x - offset.left - radius}px`);
    element.style.setProperty('--ripple-top', `${cursor.y - offset.top - radius}px`);

    element.classList.add('ripple-active');

    function destroy() {
        element.classList.remove('ripple-active');
        element.removeEventListener('animationend', destroy);
    }

    element.addEventListener('animationend', destroy);
}

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
        const imgSize = this.getAttribute('image-size') || 'auto';
        const animationDuration = this.getAttribute('animation-duration') || '0.5s';
        const hoverSizeIncrease = this.getAttribute('hover-size-increase') || 5;

        const style = document.createElement('style');

        style.textContent = `
            :host {
                position: relative;
            }

            picture img {
                width: ${imgSize};
            }

            .frame img {
                position: absolute;
                pointer-events: auto;
                transition:
                    width ${animationDuration},
                    height ${animationDuration},
                    margin-left ${animationDuration},
                    margin-top ${animationDuration};
                    
                &:hover {
                    transition:
                        width ${animationDuration},
                        height ${animationDuration},
                        margin-left ${animationDuration},
                        margin-top ${animationDuration};
                    width: calc(100% + ${hoverSizeIncrease}%);
                    height: auto;
                    margin-left: -${hoverSizeIncrease / 2}%;
                    margin-top: -${hoverSizeIncrease / 2}%;
                    mask-size: calc(100% + ${hoverSizeIncrease}%);
                    mask-position: center;
                }
            }

            .ripple-mask {
                pointer-events: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                mask-repeat: no-repeat;
                mask-size: 100%;
            }

            .ripple-active::after {
                content: '';
                position: absolute;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.2);
                width: var(--ripple-width);
                height: var(--ripple-height);
                left: var(--ripple-left);
                top: var(--ripple-top);
                transform: scale(0);
                animation: ripple ${animationDuration} linear;
            }

            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;

        const rippleMask = document.createElement('div');
        rippleMask.classList.add('ripple-mask');
        const ripple = document.createElement('div');

        const pictureFounder = createFounderPicture({
            founder,
            className: 'founder',
            assetName: founder,
        });

        const pictureFrame = createFounderPicture({
            founder,
            className: 'frame',
            assetName: `frame_${founder}`,
        });

        this.shadowRoot.append(style);
        this.shadowRoot.append(pictureFrame);
        this.shadowRoot.append(pictureFounder);
        this.shadowRoot.append(rippleMask);
        rippleMask.append(ripple);

        rippleMask.style.maskImage = `
            url(${getPictureUrl(pictureFounder)})
        `;

        this.addEventListener('mouseenter', e => createRipple({
            element: ripple,
            offset: {
                left: this.offsetLeft,
                top: this.offsetTop,
            },
            cursor: {
                x: e.clientX,
                y: e.clientY,
            },
        }));

        this.#isRendered = true;
    }
}

customElements.define('hobo-picture', HoboPicture);