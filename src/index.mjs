import { random } from './script/random.mjs';
import { hypeMessages } from './script/hypeMessages.mjs';

const randomHype = hypeMessages[random(0, hypeMessages.length - 1)];

const root = document.getElementById('hobo-void');

const hoboWaveElement = document.createElement('hobo-wave');
hoboWaveElement.setAttribute('dot-count', 3);
hoboWaveElement.setAttribute('dot-size', '1em');
hoboWaveElement.setAttribute('animation-duration', 1);

const createTypewriter = (content) => {
    const element = document.createElement('hobo-type');
    const isArray = Array.isArray(content);

    if (isArray) {
        element.messages = content;
    }

    if (!isArray) {
        element.textContent = content;
    }

    return element;
}

const attachElement = (element) => {
    root.appendChild(element);
}

const removeElement = (element) => {
    root.removeChild(element);
}


function printMessages() {
    const { messages } = randomHype;

    const element = createTypewriter(messages);
    attachElement(element);
    attachElement(hoboWaveElement);

    return new Promise((resolve) => element.addEventListener('typewrite:done', resolve));
}

function printSlogan() {
    const { slogan } = randomHype;
    const element = createTypewriter(slogan);
    attachElement(element);
    removeElement(hoboWaveElement);

    return new Promise((resolve) => element.addEventListener('typewrite:done', resolve));
}

root.innerHTML = '';
await printMessages()
await printSlogan();