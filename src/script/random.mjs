
/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} The randomly generated integer.
 */
export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
