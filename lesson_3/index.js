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
  let vowelsCount = 0;

  str.split('')
    .forEach((symbol) => {
      if (VOWEL_LETTERS.includes(symbol.toLowerCase())) {
        vowelsCount++;
      }
  });

  return vowelsCount;
}

function myFilter(callbackFunc, thisArg = this) {
  const filteredItems = [];

  thisArg.forEach((item, index, array) => {
    if (callbackFunc.call(thisArg, item, index, array)) {
      filteredItems.push(item);
    }
  });

  return filteredItems;
}

Array.prototype.myFilter = myFilter;

