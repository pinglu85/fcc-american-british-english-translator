export default function injectHtml(str, replacements) {
  for (const replacement of replacements) {
    // Wrap all of the current replacement in the string
    // with <span>.
    let start = str.indexOf(replacement);
    while (start !== -1) {
      const end = start + replacement.length;
      const replace = `<span class="highlight">${replacement}</span>`;
      str = str.slice(0, start) + replace + str.slice(end);
      start = str.indexOf(replacement, end + 31);
    }
  }
  return str;
}
