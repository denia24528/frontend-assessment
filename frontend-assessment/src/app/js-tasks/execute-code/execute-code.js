/**
 * Executes a given JavaScript code string with provided variables and utility objects.
 *
 * @param {string} code - The JavaScript code to execute.
 * @param {Object} [variables={}] - An object containing variable names and their values to be injected into the code.
 * @returns {*} The result of the executed code.
 */
export function executeCode(code, variables = {}) {
  const $math = {
    sum: (a, b) => a + b,
    mul: (a, b) => a * b,
  };
  const $logger = (...args) => console.log(...args);

  // Create a function with named source for debugging
  const keys = Object.keys(variables);
  const values = Object.values(variables);
  const fn = new Function(...keys, '$math', '$logger', `"use strict";\n${code}\n//# sourceURL=executed_code.js`);
  return fn(...values, $math, $logger);
}
