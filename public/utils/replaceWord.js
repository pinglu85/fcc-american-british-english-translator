import { americanOnly } from '../american-only.js';
import { britishOnly } from '../british-only.js';
import { americanToBritishSpelling } from '../american-to-british-spelling.js';
import { americanToBritishTitles } from '../american-to-british-titles.js';

import capitalize from './capitalize.js';

// Split a string into word and punctuation, only punctuation
// at the end of the string is considered.
function removePunctuation(word) {
  const wordArr = word.split(/([^a-z0-9]*$)/i);
  const wordWithoutPunctuation = wordArr[0];
  return [wordArr, wordWithoutPunctuation];
}

// Translate word from American English to British English.
export const replaceAmericanWord = (word, replacements, isTranslated) => {
  const [wordArr, wordWithoutPunctuation] = removePunctuation(word);
  const lowerCased = wordWithoutPunctuation.toLowerCase();
  const timeRegex = /^\d{1,2}:\d{1,2}$/;
  let replacement;

  // Format time
  if (timeRegex.test(lowerCased)) {
    replacement = lowerCased.replace(':', '.');
  }
  // Handle spelling
  else if (americanToBritishSpelling.hasOwnProperty(lowerCased)) {
    // Capitalize the first character of the replacement
    // or the entire replacement according to the case
    // of the original one.
    replacement = capitalize(
      wordWithoutPunctuation,
      americanToBritishSpelling[lowerCased]
    );
  }
  // Handle American only word
  else if (americanOnly.hasOwnProperty(lowerCased)) {
    replacement = capitalize(wordWithoutPunctuation, americanOnly[lowerCased]);
  }

  if (replacement) {
    replacements.push(replacement);
    wordArr[0] = replacement;
    return [true, wordArr.join('')];
  }

  // Handle titles/honorifics
  if (americanToBritishTitles.hasOwnProperty(lowerCased + wordArr[1])) {
    replacement = capitalize(
      wordWithoutPunctuation,
      americanToBritishTitles[lowerCased + wordArr[1]]
    );
    replacements.push(replacement);
    return [true, replacement];
  }

  return [isTranslated, word];
};

// Translate word from British English to American English.
export const replaceBritishWord = (word, replacements, isTranslated) => {
  const [wordArr, wordWithoutPunctuation] = removePunctuation(word);
  const lowerCased = wordWithoutPunctuation.toLowerCase();
  const timeRegex = /^\d{1,2}\.\d{1,2}$/;
  let replacement;

  // Format time
  if (timeRegex.test(lowerCased)) {
    replacement = lowerCased.replace('.', ':');
    replacements.push(replacement);
    wordArr[0] = replacement;
    return [true, wordArr.join('')];
  }

  // Handle British only word
  if (britishOnly.hasOwnProperty(lowerCased)) {
    replacement = capitalize(wordWithoutPunctuation, britishOnly[lowerCased]);
    replacements.push(replacement);
    wordArr[0] = replacement;
    return [true, wordArr.join('')];
  }

  // Handle spelling and titles.
  [americanToBritishSpelling, americanToBritishTitles].forEach((dict) => {
    for (const key in dict) {
      if (lowerCased === dict[key]) {
        replacement = capitalize(wordWithoutPunctuation, key);
        replacements.push(replacement);
        wordArr[0] = replacement;
        word = wordArr.join('');
        isTranslated = true;
        break;
      }
    }
  });

  return [isTranslated, word];
};
