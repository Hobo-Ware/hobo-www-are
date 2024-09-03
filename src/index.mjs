import { random } from './script/random.mjs';
import { hypeMessages } from './script/hypeMessages.mjs';
import { typewrite } from './script/typewrite.mjs';
import './script/theme.mjs';


const randomHype = hypeMessages[random(0, hypeMessages.length - 1)];

const heading = document.getElementById('heading');
const hype = document.getElementById('hype');
const slogan = document.getElementById('slogan');

function printHeading(element) {
    const { heading } = randomHype;
    typewrite(element, [heading]);

    return new Promise((resolve) => {
        element.addEventListener('typewrite:done', resolve);
    });
}

function printMessages(element) {
    const { messages } = randomHype;
    typewrite(element, messages);

    return new Promise((resolve) => {
        element.addEventListener('typewrite:done', resolve);
    });
}

function printSlogan(element) {
    const { slogan } = randomHype;
    typewrite(element, [slogan]);

    return new Promise((resolve) => {
        element.addEventListener('typewrite:done', resolve);
    });
}

await printHeading(heading);
await printMessages(hype)
await printSlogan(slogan);
