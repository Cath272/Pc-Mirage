/**
 * This module provides a function to generate a random alphanumeric token.
 * @module TokenGenerator
 */

/**
 * A string containing all alphanumeric characters.
 * @type {string}
 */
let sirAlphaNum = "";

/**
 * An array of intervals representing the ASCII codes for numbers (0-9), uppercase letters (A-Z), and lowercase letters (a-z).
 * @type {number[][]}
 */
const v_intervale = [[48, 57], [65, 90], [97, 122]];

for (let interval of v_intervale) {
    for (let i = interval[0]; i <= interval[1]; i++) {
        sirAlphaNum += String.fromCharCode(i);
    }
}

console.log(sirAlphaNum);

/**
 * Generates a random alphanumeric token of a given length.
 * @param {number} n - The length of the token to be generated.
 * @returns {string} A randomly generated alphanumeric token.
 */
function genereazaToken(n) {
    let token = "";
    for (let i = 0; i < n; i++) {
        token += sirAlphaNum[Math.floor(Math.random() * sirAlphaNum.length)];
    }
    return token;
}

module.exports.genereazaToken = genereazaToken;
