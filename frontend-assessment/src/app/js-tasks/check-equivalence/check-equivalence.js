/**
 * Recursively checks if two values are equivalent in structure and content.
 * Handles primitives, arrays, objects, Date, and RegExp instances.
 *
 * @param {*} a - The first value to compare.
 * @param {*} b - The second value to compare.
 * @returns {boolean} True if the values are equivalent, false otherwise.
 */
function checkEquivalence(a, b) {
  // Handle primitives (string, number, boolean, bigint, symbol)
  if (typeof a !== 'object' && typeof b !== 'object') {
    return a === b;
  }
  // Handle primitives (string, number, boolean, bigint, symbol)
  if (a == null && b == null) return true;
  // Handle Date objects
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  // Handle RegExp objects
  if (a instanceof RegExp && b instanceof RegExp)
    return a.toString() === b.toString();
  // If one is array and the other is not
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  // Handle Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!checkEquivalence(a[i], b[i])) return false;
    }
    return true;
  }
  // Handle Objects
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    // Ignore keys where value is null/undefined
    const allKeys = new Set([...keysA, ...keysB]);
    for (const key of allKeys) {
      if (!checkEquivalence(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
}

export { checkEquivalence };
