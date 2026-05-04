#!/usr/bin/env node
/**
 * index.js — Entry point for the explain-error CLI tool.
 *
 * Usage:
 *   explain-error "TypeError: Cannot read properties of undefined (reading 'map')"
 *   cat error.log | explain-error
 *   explain-error --help
 */

const { program } = require("commander");
const { extractErrorLine, matchError } = require("./matcher");
const { printMatch, printNoMatch } = require("./formatter");

// ─── CLI definition ──────────────────────────────────────────────────────────

program
  .name("debugError")
  .description(
    "Explains common programming errors with causes and fixes — no internet required."
  )
  .version("1.0.0")
  .argument("[error]", "The error string to explain (wrap in quotes)")
  .option("-r, --raw", "Print the matched error line before analysis")
  .helpOption("-h, --help", "Show this help message")
  .addHelpText(
    "after",
    `
Examples:
  $ debugError "TypeError: Cannot read properties of undefined (reading 'map')"
  $ debugError "ReferenceError: myVar is not defined"
  $ debugError "ENOENT: no such file or directory"
  $ cat error.log | debugError
`
  );

program.parse(process.argv);

// ─── Input handling ───────────────────────────────────────────────────────────

const opts = program.opts();
const [cliArg] = program.args;

/**
 * Determines whether stdin has data piped into it.
 * On TTY (interactive terminal) there is no piped input.
 */
function isStdinPiped() {
  return !process.stdin.isTTY;
}

/**
 * Core logic: extract the key error line, find a match, and render output.
 *
 * @param {string} rawInput - Full error text (may be a multi-line stack trace).
 */
function run(rawInput) {
  if (!rawInput || !rawInput.trim()) {
    console.error(
      "\n  ⚠  No error input provided. Pass an error string as an argument or pipe it via stdin.\n" +
        '  Example: debugError "TypeError: x is not a function"\n'
    );
    process.exit(1);
  }

  const errorLine = extractErrorLine(rawInput);

  // Optionally show the extracted line (--raw flag)
  if (opts.raw) {
    const chalk = require("chalk");
    console.log(chalk.dim("\n[extracted] ") + chalk.yellow(errorLine));
  }

  const match = matchError(errorLine);

  if (match) {
    printMatch(match, errorLine);
  } else {
    printNoMatch(errorLine);
  }
}

// ─── Entry: CLI arg vs. piped stdin ──────────────────────────────────────────

if (cliArg) {
  // Input provided as a direct argument
  run(cliArg);
} else if (isStdinPiped()) {
  // Input piped from stdin (e.g. cat error.log | explain-error)
  let buffer = "";
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", (chunk) => {
    buffer += chunk;
  });

  process.stdin.on("end", () => {
    run(buffer);
  });
} else {
  // No input at all — show help
  program.help();
}
