import { random } from './script/random.mjs';
import { hypeMessages } from './script/hypeMessages.mjs';
import './script/theme.mjs';

const randomHype = hypeMessages[random(0, hypeMessages.length - 1)];

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
    const root = document.getElementById('root');
    root.appendChild(element);
}


function printHeading() {
    const { heading } = randomHype;

    const element = createTypewriter(heading);
    element.setAttribute('tag', 'h1');

    attachElement(element);

    return new Promise((resolve) => element.addEventListener('typewrite:done', resolve));
}

function printMessages() {
    const { messages } = randomHype;

    const element = createTypewriter(messages);
    attachElement(element);

    return new Promise((resolve) => element.addEventListener('typewrite:done', resolve));
}

function printSlogan() {
    const { slogan } = randomHype;
    const element = createTypewriter(slogan);
    attachElement(element);

    return new Promise((resolve) => element.addEventListener('typewrite:done', resolve));
}

await printHeading();
await printMessages()
await printSlogan();
