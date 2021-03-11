"use strict";
exports.__esModule = true;
exports.shuffleArray = void 0;
function shuffleArray(array) {
    var tmp;
    var current;
    var top = array.length;
    if (top) {
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    }
    return array;
}
exports.shuffleArray = shuffleArray;
