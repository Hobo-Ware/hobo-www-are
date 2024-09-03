const CHARACTER_TYPE_DELAY = 1000 / 30;
const CHARACTER_WIPE_DELAY = 1000 / 60;

function readTime(word) {
    const wpm = 180;
    const words = word.split(' ').length;
    const time = (words / wpm) * 60 * 1000;

    const buffer = CHARACTER_TYPE_DELAY * word.length * 1.5;

    return time + buffer;
}

export function typewrite(element, messages) {
    const state = {
        messageIndex: 0,
        characterIndex: 0,
        characterPrintTime: 0,
        characterWipeTime: 0,
        messageQueueTime: 0,
        isDoneTyping: false,
    };

    function wipe(currentTime) {
        const message = messages[state.messageIndex];

        if (!message) {
            return;
        }

        const isWipingCharacter = state.characterIndex > 0;

        const elapsedCharacterWipingTime = currentTime - state.characterWipeTime;

        if (!isWipingCharacter) {
            element.textContent = '';
            state.isDoneTyping = false;
            state.characterWipeTime = 0;
            state.messageIndex += 1;
        }

        if (elapsedCharacterWipingTime > CHARACTER_WIPE_DELAY && isWipingCharacter) {
            element.textContent = message.slice(0, state.characterIndex - 1);
            state.characterIndex--;
            state.characterWipeTime = currentTime;
        }

        requestAnimationFrame(start);
    }

    function type(currentTime) {
        const message = messages[state.messageIndex];

        if (!message) {
            return;
        }

        const isPrintingCharacter = state.characterIndex < message.length;

        const elapsedCharacterPrintingTime = currentTime - state.characterPrintTime;
        const elapsedMessagePritingTime = currentTime - state.messageQueueTime;

        if (elapsedCharacterPrintingTime > CHARACTER_TYPE_DELAY && isPrintingCharacter) {
            element.textContent += message.charAt(state.characterIndex);
            state.characterIndex++;
            state.characterPrintTime = currentTime;
        }

        if (!isPrintingCharacter && elapsedMessagePritingTime >= readTime(message)) {
            state.isDoneTyping = true;
            state.messageQueueTime = currentTime;
        }

        requestAnimationFrame(start);
    }

    function start() {
        const isDoneDisplayingAllMessages = messages.length - 1 === state.messageIndex;
        if (state.isDoneTyping && isDoneDisplayingAllMessages) {
            element.dispatchEvent(new Event('typewrite:done'));
            return;
        }

        const fn = state.isDoneTyping ? wipe : type;
        requestAnimationFrame(fn);
    }

    start();
}