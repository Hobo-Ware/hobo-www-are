export function typewrite(element, messages) {
    const nextMessageDelay = 2500;
    const characterTypeDelay = 1000 / 24;

    const state = {
        messageIndex: 0,
        characterIndex: 0,
        characterPrintTime: 0,
        messageQueueTime: 0,
    };

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
            element.textContent = "";
            state.characterIndex = 0;
            state.messageIndex += 1;
            state.messageQueueTime = currentTime;
        }

        requestAnimationFrame(type);
    }

    requestAnimationFrame(type);
}