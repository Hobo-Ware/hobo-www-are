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
            element: 'media',
            maxWidth: 480,
            fileName: `${assetName}_200.png`
        },
        {
            element: 'media',
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

        if (maxWidth) {
            source.setAttribute('media', `(max-width: ${maxWidth}px)`);
        }

        source.setAttribute('srcset', `assets/${founder}/${fileName}`);
        picture.append(source);
    });

    return picture;
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
            picture img {
                width: ${imgSize};
            }

            .frame img {
                position: absolute;

                transition:
                        width 0.3s,
                        height 0.3s,
                        margin-left 0.3s,
                        margin-top 0.3s;
                    
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
                }
            }

            .frame::before {
                content: '';
                position: absolute;
                display: block;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 0px;
                height: 0px;
                background: rgba(0, 0 ,0 , 0.2);
                border-radius: 5%;
                opacity: 0;
            }

            .frame:hover::before {
                animation: founder-square-flash ${animationDuration};
            }

            @keyframes founder-square-flash {
                40% {
                    opacity: 1;
                }
                100% {
                    width: ${imgSize};
                    height: ${imgSize};
                    opacity: 0;
                }
            }
        `;

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

        this.#isRendered = true;
    }
}

customElements.define('hobo-picture', HoboPicture);
