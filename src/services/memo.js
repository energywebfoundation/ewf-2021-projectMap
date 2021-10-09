export default function buildMemo(fn) {
  const cache = {};
  return (...args) => {
    const cacheKey = JSON.stringify({ ...args });
    if (!cache[cacheKey]) {
      cache[cacheKey] = fn(...args);
    }
    return cache[cacheKey];
  };
}
