import { random } from './script/random.mjs';
import { hypeMessages } from './script/hypeMessages.mjs';
import { typewrite } from './script/typewrite.mjs';
import './script/theme.mjs';


const randomHype = hypeMessages[random(0, hypeMessages.length - 1)];

const heading = document.getElementById('heading');
const hype = document.getElementById('hype');
const outro = document.getElementById('outro');

function printHeading(element) {
    const { heading } = randomHype;
    typewrite(element, [heading], { nextMessageDelay: 1500 });

    return new Promise((resolve) => {
        element.addEventListener('typewrite:done', resolve);
    });
}

function printMessages(element) {
    const { messages } = randomHype;
    typewrite(element, messages, { nextMessageDelay: 4000 });

    return new Promise((resolve) => {
        element.addEventListener('typewrite:done', resolve);
    });
}

function printOutro(element) {
    const { outro } = randomHype;
    typewrite(element, [outro]);

    return new Promise((resolve) => {
        element.addEventListener('typewrite:done', resolve);
    });
}

await printHeading(heading);
await printMessages(hype)
await printOutro(outro);
