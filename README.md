# 🚀 debugError

**Understand your code, don't just fix it.**

In the era of AI coding assistants, it's easy to "copy-paste" a fix without actually understanding *why* an error happened. `debugError` is a beginner-friendly CLI tool designed to bridge that gap. It provides instant, offline explanations for common programming errors, helping you learn and grow as a developer.

![Version](https://img.shields.io/npm/v/debugerror)
![License](https://img.shields.io/npm/l/debugerror)

---

## 🌟 Why debugError?

- **Beginner Friendly:** No complex jargon. Simple explanations for common headaches.
- **Learn While You Code:** Understand the "What", "Why", and "How" of every error.
- **Privacy First & Offline:** Works 100% offline. No data sent to any APIs.
- **Framework Support:** Includes patterns for **JavaScript, Node.js, React, Next.js, Express, and Python**.

---

## 📦 Installation

Install it globally via npm:

```bash
npm install -g debugerror
```

---

## 🛠️ Usage

Simply pass your error message as an argument (wrap it in quotes):

```bash
debugError "TypeError: Cannot read properties of undefined (reading 'map')"
```

### Piping from logs
You can also pipe error logs directly into the tool:

```bash
cat error.log | debugError
```

### Options
- `-r, --raw`: See exactly which line was extracted from the stack trace before the analysis.
- `-h, --help`: Show help and examples.

---

## 📖 Supported Errors

Currently, `debugError` recognizes over **30+ common patterns**, including:
- **Core JS:** `TypeError`, `ReferenceError`, `SyntaxError`, `RangeError`.
- **Frameworks:** React hooks issues, Next.js hydration mismatches, Express header errors.
- **System:** `ENOENT` (file not found), `EADDRINUSE` (port busy).
- **Python:** `NameError`, `IndentationError`, `KeyError`.

---

## ❤️ Contribute & Expand

I want `debugError` to be the ultimate companion for developers. If you've faced a frustrating error and want to help others understand it, **I would be happy for you to contribute!**

### How to add new errors:
1. Open `errors.js`.
2. Add a new entry following the schema:
   ```javascript
   {
     title: "Short Name of Error",
     match: /regex-pattern-to-match-the-error/i,
     explanation: "A simple, human-readable explanation.",
     causes: ["Cause 1", "Cause 2"],
     fixes: ["Fix 1", "Fix 2"]
   }
   ```
3. Submit a Pull Request!

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Made with ❤️ for the developer community.**
