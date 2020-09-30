export default function capitalize(oldPhrase, newPhrase) {
  // Check if the entire original string is capitalized
  let allIsCapitalized = true;
  for (const char of oldPhrase) {
    if (/[^a-z]/i.test(char)) {
      continue;
    }
    const asciiCode = char.charCodeAt(0);
    if (asciiCode >= 97 && asciiCode <= 122) {
      allIsCapitalized = false;
      break;
    }
  }
  if (allIsCapitalized) {
    return newPhrase.toUpperCase();
  }

  // Check if the first character of the original string
  // is capitalized
  const firstCharCode = oldPhrase.charCodeAt(0);
  if (firstCharCode >= 65 && firstCharCode <= 90) {
    return newPhrase[0].toUpperCase() + newPhrase.substring(1);
  }

  return newPhrase;
}
