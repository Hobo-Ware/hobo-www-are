import { random } from './script/random.mjs';
import { hypeMessages } from './script/hypeMessages.mjs';
import { typewrite } from './script/typewrite.mjs';
import './script/theme.mjs';

const hypeMessage = hypeMessages[random(0, hypeMessages.length - 1)];

const heading = document.getElementById('heading');
heading.textContent = hypeMessage.heading;

const hypeParagraph = document.getElementById('hype');
const messageCount = hypeMessage.messages.length;

const isOnlyOneMessage = messageCount === 1;

isOnlyOneMessage
    ? hypeParagraph.textContent = hypeMessage.messages[0]
    : typewrite(hypeParagraph, hypeMessage.messages);

const outro = document.getElementById('outro');
outro.textContent = hypeMessage.outro;
