export default function memoize(fn) {
  const lastResults = new Map();

  return function memoizedFn(str, replacements) {
    if (lastResults.has(str)) {
      return lastResults.get(str);
    }
    const result = replacements ? fn(str, replacements) : fn(str);
    lastResults.set(str, result);
    return result;
  };
}
