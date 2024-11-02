import { derived, readonly, writable } from "svelte/store";

const CHARACTER_TYPE_DELAY = 1000 / 30;
const CHARACTER_WIPE_DELAY = 1000 / 60;

function readTime(word: string): number {
    const wpm = 180;
    const words = word.split(" ").length;
    const time = (words / wpm) * 60 * 1000;

    const buffer = CHARACTER_TYPE_DELAY * word.length * 2;

    return time + buffer;
}

export function typewriter(messages: string[]) {
    const state = {
        messageIndex: 0,
        characterIndex: 0,
        characterPrintTime: 0,
        characterWipeTime: 0,
        messageQueueTime: 0,
        isDoneTyping: false,
        isComplete: writable(false),
        typed: writable(""),
        untyped: writable(""),
    };

    function wipe(currentTime: number) {
        const message = messages[state.messageIndex];

        if (!message) {
            return;
        }

        const isWipingCharacter = state.characterIndex > 0;

        const elapsedCharacterWipingTime = currentTime -
            state.characterWipeTime;

        if (!isWipingCharacter) {
            state.typed.set("");
            state.isDoneTyping = false;
            state.characterWipeTime = 0;
            state.messageIndex += 1;
        }

        if (
            elapsedCharacterWipingTime > CHARACTER_WIPE_DELAY &&
            isWipingCharacter
        ) {
            state.untyped.set(message.slice(state.characterIndex - 1));
            state.typed.set(message.slice(0, state.characterIndex - 1));
            state.characterIndex--;
            state.characterWipeTime = currentTime;
        }

        globalThis?.requestAnimationFrame?.(start);
    }

    function type(currentTime: number) {
        const message = messages[state.messageIndex];

        if (!message) {
            return;
        }

        const isPrintingCharacter = state.characterIndex < message.length;

        const elapsedCharacterPrintingTime = currentTime -
            state.characterPrintTime;
        const elapsedMessagePrintingTime = currentTime - state.messageQueueTime;

        if (
            elapsedCharacterPrintingTime > CHARACTER_TYPE_DELAY &&
            isPrintingCharacter
        ) {
            state.untyped.set(message.slice(state.characterIndex + 1));
            state.typed.update(($typed) =>
                $typed + message.charAt(state.characterIndex)
            );
            state.characterIndex++;
            state.characterPrintTime = currentTime;
        }

        if (
            !isPrintingCharacter &&
            elapsedMessagePrintingTime >= readTime(message)
        ) {
            state.isDoneTyping = true;
            state.messageQueueTime = currentTime;
        }

        globalThis?.requestAnimationFrame?.(start);
    }

    function start() {
        const isDoneDisplayingAllMessages =
            messages.length - 1 === state.messageIndex;

        if (state.isDoneTyping && isDoneDisplayingAllMessages) {
            state.isComplete.set(true);
            return;
        }

        const fn = state.isDoneTyping ? wipe : type;
        fn(performance.now());
    }

    return {
        typed: readonly(state.typed),
        untyped: readonly(state.untyped),
        isTyping: derived(state.typed, ($typed) => $typed.length > 0),
        isComplete: readonly(state.isComplete),
        start,
    };
}
