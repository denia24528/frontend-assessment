/**
 * Creates a deep copy of the provided object, array, or value.
 * Handles nested objects, arrays, and Date instances.
 *
 * @param {*} obj - The value to deep copy. Can be an object, array, Date, or primitive.
 * @returns {*} A deep copy of the input value.
 */
export function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (Array.isArray(obj)) return obj.map(deepCopy);
  const copy = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
}
