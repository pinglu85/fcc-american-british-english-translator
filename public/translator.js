import {
  translateFromAmerican,
  translateFromBritish,
} from './utils/translateSentence.js';
import injectHtml from './utils/injectHtml.js';
import memoize from './utils/memoize.js';

const textArea = document.getElementById('text-input');
const optionDiv = document.getElementById('locale-select');
const translateBtn = document.getElementById('translate-btn');
const clearBtn = document.getElementById('clear-btn');
const translatedSentenceDiv = document.getElementById('translated-sentence');
const errorDiv = document.getElementById('error-msg');

const memoizedTranslateFromAmerican = memoize(translateFromAmerican);
const memoizedTranslateFromBritish = memoize(translateFromBritish);
const memoizedInjectHtml = memoize(injectHtml);

// Translate sentence from american to british
// or from british depending on type parameter.
// @param {string} str - The original string
// @param {string} type - The type of translation: 'american-to-british' or vice versa
// @returns undefined or {object} - { {string} newStr, {array} replacements, {boolean} isTranslated }
function translate(str, type) {
  if (!str) {
    return;
  }

  switch (type) {
    case 'american-to-british':
      return memoizedTranslateFromAmerican(str);
    case 'british-to-american':
      return memoizedTranslateFromBritish(str);
    default:
      throw new Error("Shouldn't reach here.");
  }
}

// Display the translated result onto the screen.
// @param {object} translated - { {string} newStr, {array} replacements, {boolean} isTranslated }
function showTranslate(translated) {
  errorDiv.textContent = '';
  translatedSentenceDiv.innerHTML = '';

  if (!translated) {
    errorDiv.textContent = 'Error: No text to translate.';
    return;
  }

  const { newStr, replacements, isTranslated } = translated;
  if (!isTranslated) {
    translatedSentenceDiv.textContent = 'Everything looks good to me!';
  } else {
    // Highlight the translated parts of the sentence in green.
    const html = memoizedInjectHtml(newStr, replacements);
    translatedSentenceDiv.innerHTML = html;
  }
}

// Clear text area, and both the 'translated-sentence' and 'error-msg' divs.
function clearInAndOutput() {
  textArea.value = '';
  errorDiv.textContent = '';
  translatedSentenceDiv.innerHTML = '';
}

// Listen for click on 'Translate' button
translateBtn.addEventListener('click', () => {
  const translated = translate(textArea.value, optionDiv.value);
  showTranslate(translated);
});

// Listen for click on 'Clear' button
clearBtn.addEventListener('click', clearInAndOutput);

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    translate,
    showTranslate,
    clearInAndOutput,
  };
} catch (e) {}
