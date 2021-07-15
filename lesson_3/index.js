const PUNCTUATION_SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';
const VOWEL_LETTERS = 'aeiou';

function isPalindrome(str) {
  const cleanString = str.split('')
    .filter((letter) => !PUNCTUATION_SYMBOLS.includes(letter))
    .join('')
    .toLowerCase();

  const reverseCleanString = cleanString.split('')
    .reverse()
    .join('');

  return cleanString === reverseCleanString;
}

function countVowelLetters(str) {
  return str.toLowerCase()
    .split('')
    .filter((symbol) => VOWEL_LETTERS.includes(symbol))
    .length;
}

Array.prototype.myFilter = function (callbackFunc, thisArg = this) {
  const filteredItems = [];

  thisArg.forEach((item, index, array) => {
    if (callbackFunc.call(thisArg, item, index, array)) {
      filteredItems.push(item);
    }
  });

  return filteredItems;
}

