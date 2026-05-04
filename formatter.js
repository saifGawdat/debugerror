/**
 * formatter.js
 * Renders structured error information to the terminal using chalk.
 */

const chalk = require("chalk");

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Prints a horizontal divider */
function divider(char = "─", len = 60) {
  return chalk.dim(char.repeat(len));
}

/** Prints a labelled section header */
function sectionHeader(label) {
  return chalk.bold.underline(label);
}

// ─── Main formatter ─────────────────────────────────────────────────────────

/**
 * Prints a matched error explanation to stdout in a structured, readable format.
 *
 * @param {object} match    - A matched entry from the error database.
 * @param {string} inputLine - The cleaned error line that was matched.
 */
function printMatch(match, inputLine) {
  console.log();
  console.log(divider("═"));

  // ── Header ──
  console.log(
    chalk.bgRed.white.bold(" ✖  ERROR DETECTED ") +
      " " +
      chalk.red.bold(match.title)
  );

  console.log(divider());

  // ── Matched input ──
  console.log(chalk.dim("Matched: ") + chalk.yellow(inputLine));

  console.log(divider());

  // ── Explanation ──
  console.log(sectionHeader("📖  What happened?"));
  console.log(chalk.white("  " + match.explanation));
  console.log();

  // ── Causes ──
  console.log(sectionHeader("🔍  Common causes"));
  match.causes.forEach((cause, i) => {
    console.log(chalk.cyan(`  ${i + 1}. `) + cause);
  });
  console.log();

  // ── Fixes ──
  console.log(sectionHeader("🔧  How to fix it"));
  match.fixes.forEach((fix, i) => {
    console.log(chalk.green(`  ${i + 1}. `) + fix);
  });

  console.log(divider("═"));
  console.log();
}

/**
 * Prints a "no match found" message when no pattern in the database matches.
 *
 * @param {string} inputLine - The cleaned error line that was tested.
 */
function printNoMatch(inputLine) {
  console.log();
  console.log(divider("═"));
  console.log(chalk.bgYellow.black.bold(" ⚠  NO MATCH FOUND "));
  console.log(divider());
  console.log(
    chalk.dim("Searched for: ") + chalk.yellow(inputLine)
  );
  console.log();
  console.log(
    chalk.white(
      "  This error pattern is not in the database yet.\n" +
        "  Tips to debug on your own:"
    )
  );
  const tips = [
    "Copy the exact error message and search it on Stack Overflow",
    "Check the documentation for the library mentioned in the trace",
    "Isolate the problem by commenting out code until the error disappears",
    "Add `console.log()` statements around the failing line",
  ];
  tips.forEach((tip, i) => {
    console.log(chalk.dim(`  ${i + 1}. `) + tip);
  });
  console.log(divider("═"));
  console.log();
}

module.exports = { printMatch, printNoMatch };
