
/**
 * Fetches the 'hype.json' file and returns the parsed JSON data.
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON data.
 */
export const hypeMessages = await fetch('assets/hype.json')
    .then(response => response.text())
    .then(data => JSON.parse(data))