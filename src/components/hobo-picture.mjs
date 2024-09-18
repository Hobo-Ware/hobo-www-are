function createPicture(founder, isFrame = false) {
    const className = isFrame ? 'frame' : 'founder';
    const assetPrefix = isFrame ? `frame_${founder}` : founder;

    const picture = document.createElement('picture');
    picture.addEventListener('contextmenu', e => e.preventDefault());
    picture.classList.add(className);

    const responsiveSizes = [
        {
            maxWidth: 480,
            fileName: `${assetPrefix}_200.png`
        },
        {
            maxWidth: 768,
            fileName: `${assetPrefix}_400.png`
        },
    ];

    responsiveSizes.forEach(({ maxWidth, fileName }) => {
        const source = document.createElement('source');
        source.setAttribute('media', `(max-width: ${maxWidth}px)`);
        source.setAttribute('srcset', `assets/${founder}/${fileName}`);
        picture.append(source);
    });

    const img = document.createElement('img');
    img.setAttribute('srcset', `assets/${founder}/${assetPrefix}_600.png`);

    picture.append(img);

    return picture
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

        const pictureFounder = createPicture(founder);
        const pictureFrame = createPicture(founder, true);

        this.shadowRoot.append(style);
        this.shadowRoot.append(pictureFrame);
        this.shadowRoot.append(pictureFounder);

        this.#isRendered = true;
    }
}

customElements.define('hobo-picture', HoboPicture);
