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
 * Uses a scoring system:
 * - Exact regex match: 100 points
 * - Title match: 30 points per word
 * - Keyword match: 20 points per word
 *
 * @param {string} errorLine - The cleaned, single-line error string.
 * @returns {object|null} The matching error object from ERROR_DB, or null.
 */
function matchError(errorLine) {
  const inputWords = errorLine
    .toLowerCase()
    .split(/[^a-z0-9]/)
    .filter((w) => w.length > 2);

  let bestMatch = null;
  let highestScore = 0;

  for (const entry of ERROR_DB) {
    let score = 0;

    // 1. Regex Match
    if (entry.match.test(errorLine)) {
      score += 100;
    }

    const titleLower = entry.title.toLowerCase();
    const titleWords = titleLower.split(/[^a-z0-9]/).filter((w) => w.length > 2);
    const keywords = entry.keywords || [];

    for (const word of inputWords) {
      // 2. Title Match (check if any word in the title contains or is contained by the input word)
      if (titleWords.some((tw) => tw.includes(word) || word.includes(tw))) {
        score += 30;
      }
      // 3. Keyword Match
      if (keywords.some((k) => k.toLowerCase() === word)) {
        score += 20;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  // Threshold: 20 points (e.g. one keyword match)
  return highestScore >= 20 ? bestMatch : null;
}

module.exports = { extractErrorLine, matchError };
