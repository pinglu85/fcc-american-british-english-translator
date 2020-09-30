import { americanOnly } from '../american-only.js';
import { britishOnly } from '../british-only.js';

import { replaceAmericanWord, replaceBritishWord } from './replaceWord.js';
import replacePhrases from './replacePhrases.js';

// Translate sentence from American to British
export const translateFromAmerican = (str) => {
  let isTranslated = false;
  const replacements = [];

  // Replace words and format time.
  str = str
    .split(' ')
    .map((word) => {
      [isTranslated, word] = replaceAmericanWord(
        word,
        replacements,
        isTranslated
      );
      return word;
    })
    .join(' ');

  // Replace American only phrases
  for (const key in americanOnly) {
    // Escape all words, because they have already been checked.
    if (key.indexOf(' ') === -1) continue;

    const replacement = americanOnly[key];
    [isTranslated, str] = replacePhrases(
      str,
      key,
      replacement,
      replacements,
      isTranslated
    );
  }

  return {
    newStr: str,
    replacements: [...new Set(replacements)],
    isTranslated,
  };
};

// Translate sentence from British to American
export const translateFromBritish = (str) => {
  let isTranslated = false;
  const replacements = [];

  // Replace words and format time.
  str = str
    .split(' ')
    .map((word) => {
      [isTranslated, word] = replaceBritishWord(
        word,
        replacements,
        isTranslated
      );
      return word;
    })
    .join(' ');

  // Replace British only phrases.
  for (const key in britishOnly) {
    // Escape all words, because they have already been checked.
    if (key.indexOf(' ') === -1) continue;

    const replacement = britishOnly[key];
    [isTranslated, str] = replacePhrases(
      str,
      key,
      replacement,
      replacements,
      isTranslated
    );
  }

  return {
    newStr: str,
    replacements: [...new Set(replacements)],
    isTranslated,
  };
};
