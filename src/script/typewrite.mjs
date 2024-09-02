export function typewrite(element, messages, options = {}) {
    const {
        nextMessageDelay = 4500,
        characterTypeDelay = 1000 / 30,
        characterWipeDelay = 1000 / 60,
    } = options;

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

        if (elapsedCharacterWipingTime > characterWipeDelay && isWipingCharacter) {
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

        if (elapsedCharacterPrintingTime > characterTypeDelay && isPrintingCharacter) {
            element.textContent += message.charAt(state.characterIndex);
            state.characterIndex++;
            state.characterPrintTime = currentTime;
        }

        if (!isPrintingCharacter && elapsedMessagePritingTime >= nextMessageDelay) {
            state.isDoneTyping = true;
            state.messageQueueTime = currentTime;
        }

        requestAnimationFrame(start);
    }

    function start() {
        const isDoneDisplayingAllMessages = messages.length - 1 === state.messageIndex;
        if (state.isDoneTyping && isDoneDisplayingAllMessages) {
            console.log('done');
            element.dispatchEvent(new Event('typewrite:done'));
            return;
        }

        const fn = state.isDoneTyping ? wipe : type;
        requestAnimationFrame(fn);
    }

    start();
}