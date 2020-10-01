import capitalize from './capitalize.js';

export default function replacePhrases(
  str,
  target,
  replacement,
  replacements,
  isTranslated
) {
  let lowerCased = str.toLowerCase();

  // Stop function execution if replacement is already in the string,
  // so as to avoid infinity loop. For instance, when user typed 'chippy',
  // it is replaced with 'fish-and-chip shop' in the phase of replacing
  // words, however, british english has the phrase 'chip shop'
  // which also means 'fish-and-chip shop', hence creating infinite loop.
  if (lowerCased.indexOf(replacement) !== -1) return [isTranslated, str];

  // Search the target phrase in the string.
  let startIndexInStr = lowerCased.indexOf(target);

  while (startIndexInStr !== -1) {
    const oldPhraseLen = target.length;
    const oldEnd = startIndexInStr + oldPhraseLen;

    // Capitalize the first character of the replacement
    // or the entire replacement according to the case
    // of the original phrase.
    const newPhrase = capitalize(
      str.substring(startIndexInStr, oldEnd),
      replacement
    );

    isTranslated = true;

    // The target in the original sentence is replaced by replacement.
    str = str.substring(0, startIndexInStr) + newPhrase + str.substring(oldEnd);
    // Append the capitalized replacement to the replacements array for further
    // processing.
    replacements.push(newPhrase);

    // Search the target phrase in the rest of string
    const newEnd = startIndexInStr + newPhrase.length;
    lowerCased = str.toLowerCase();
    startIndexInStr = lowerCased.indexOf(target, newEnd);
  }
  return [isTranslated, str];
}
