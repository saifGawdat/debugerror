/**
 * matcher.js
 * Responsible for cleaning raw error input and matching it against the error database.
 */

const ERROR_DB = require("./errors");

/**
 * Cleans a raw error string or stack trace down to the most useful single line.
 * Strategy: use the first line that contains a known error type keyword.
 *
 * @param {string} raw - Raw error text (may be a full stack trace).
 * @returns {string} The extracted, trimmed error line.
 */
function extractErrorLine(raw) {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // Error keywords that commonly appear on the "main" error line
  const errorKeywords = [
    "Error:",
    "error:",
    "Exception",
    "ENOENT",
    "EADDRINUSE",
    "SyntaxError",
    "TypeError",
    "ReferenceError",
    "RangeError",
    "NameError",
    "AttributeError",
    "KeyError",
    "IndentationError",
  ];

  for (const line of lines) {
    for (const keyword of errorKeywords) {
      if (line.includes(keyword)) {
        return line;
      }
    }
  }

  // Fallback: return the first non-empty line
  return lines[0] || raw.trim();
}

/**
 * Matches a cleaned error string against every pattern in the error database.
 * Returns the first matching entry, or null if nothing matches.
 *
 * @param {string} errorLine - The cleaned, single-line error string.
 * @returns {object|null} The matching error object from ERROR_DB, or null.
 */
function matchError(errorLine) {
  for (const entry of ERROR_DB) {
    if (entry.match.test(errorLine)) {
      return entry;
    }
  }
  return null;
}

module.exports = { extractErrorLine, matchError };
