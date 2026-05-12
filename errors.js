/**
 * errors.js
 * Static database of known programming errors with explanations, causes, and fixes.
 * Each entry follows the schema: { title, match, explanation, causes, fixes }
 */

const ERROR_DB = [
  // ─── JavaScript / TypeScript ───────────────────────────────────────────────

  {
    title: "Cannot read properties of undefined",
    match: /cannot read propert(?:y|ies) of undefined/i,
    explanation:
      "You are attempting to access a property or call a method on a variable that is `undefined`. JavaScript cannot look up properties on `undefined`, so it throws immediately.",
    causes: [
      "The variable was never assigned a value",
      "An async operation hasn't resolved yet when the code runs",
      "An API response returned `undefined` instead of the expected object",
      "A function returned nothing (implicitly `undefined`) and its result was used",
    ],
    fixes: [
      "Check the variable with `if (value !== undefined)` before accessing it",
      "Use optional chaining: `obj?.property` instead of `obj.property`",
      "Provide a default fallback: `const x = data ?? {}`",
      "Add `console.log()` before the error line to inspect the actual value",
    ],
    keywords: [
      "undefined",
      "read",
      "properties",
      "null",
      "variable",
      "missing",
    ],
  },

  {
    title: "Cannot read properties of null",
    match: /cannot read propert(?:y|ies) of null/i,
    explanation:
      "Similar to the `undefined` error, but the variable holds `null` — an intentional 'no value' marker. Accessing any property on `null` is a runtime error.",
    causes: [
      "A DOM query like `document.getElementById()` returned `null` (element not found)",
      "An API explicitly returned `null` for a missing resource",
      "A variable was initialised as `null` and never updated",
    ],
    fixes: [
      "Guard with `if (element !== null)` before use",
      "Use optional chaining: `element?.value`",
      "Use nullish coalescing: `const val = result ?? defaultValue`",
      "Verify the element ID or API path is correct",
    ],
    keywords: ["null", "read", "properties", "undefined", "missing", "object"],
  },

  {
    title: "TypeError: X is not a function",
    match: /typeerror:.+is not a function/i,
    explanation:
      "You are calling something with `()` that is not actually a function. The variable exists but its type is a string, number, object, or `undefined` — not a callable.",
    causes: [
      "A typo in the function name (e.g., `arr.fliter()` instead of `arr.filter()`)",
      "Overwriting a built-in method accidentally (e.g., `const map = {};` then `[].map()`)",
      "Importing a non-function export and calling it",
      "Using `new` incorrectly, or calling a constructor without `new`",
    ],
    fixes: [
      "Check the spelling of the method name",
      "Use `console.log(typeof x)` to confirm `x` is actually a function",
      "Check your imports — ensure you're importing the correct named or default export",
      "Look for variable name collisions that shadow built-ins",
    ],
  },

  {
    title: "ReferenceError: Variable is not defined",
    match: /referenceerror:.+is not defined/i,
    explanation:
      "You are referencing an identifier (variable, function, or class) that does not exist in the current scope. JavaScript cannot find it anywhere in the scope chain.",
    causes: [
      "The variable was never declared",
      "A `const`/`let` variable is used before its declaration (temporal dead zone)",
      "A typo in the variable name",
      "The variable is declared in a different scope (e.g., inside an `if` block)",
      "A missing `import` statement",
    ],
    fixes: [
      "Declare the variable with `const`, `let`, or `var` before use",
      "Move the declaration above the line where it is first used",
      "Double-check for typos in the identifier name",
      "Add the missing `import` or `require()` statement",
    ],
  },

  {
    title: "TypeScript: Unexpected any",
    match: /unexpected any/i,
    explanation:
      "A value was assigned the `any` type, which disables TypeScript's type checking for that variable. This often triggers a linting error (like `@typescript-eslint/no-explicit-any`).",
    causes: [
      "Explicitly using the `: any` type annotation",
      "Using a library that doesn't provide types, causing variables to default to `any`",
      "Assigning the result of `JSON.parse()` to a variable without a type",
    ],
    fixes: [
      "Define a proper interface or type for the variable",
      "Use `unknown` if the type is truly unknown, and narrow it later",
      "If using a third-party library, install its `@types` package",
      "Use a type assertion `as SpecificType` if you are certain of the shape",
    ],
    keywords: ["typescript", "any", "unexpected", "lint", "type"],
  },

  {
    title: "TypeScript: Type is not assignable to type",
    match: /type '.+' is not assignable to type '.+'/i,
    explanation:
      "TypeScript's static analysis detected that you are trying to assign a value of one type to a variable or property that expects a different, incompatible type.",
    causes: [
      "Passing a string to a function that expects a number",
      "Missing a required property in an object literal",
      "A typo in an object property name",
      "An API response shape changed and no longer matches your interface",
    ],
    fixes: [
      "Check the target type's definition and ensure your value matches it",
      "Add the missing properties to your object",
      "Use a type guard or `is` keyword to narrow the type before assignment",
      "Cast the value if you are sure it is compatible: `value as TargetType`",
    ],
    keywords: ["typescript", "assignable", "type", "mismatch", "incompatible"],
  },

  {
    title: "SyntaxError: Unexpected token",
    match: /syntaxerror: unexpected token/i,
    explanation:
      "The JavaScript parser encountered a character or keyword it did not expect at that position. The code cannot be parsed, so nothing in the file runs.",
    causes: [
      "Missing or mismatched brackets, braces, or parentheses",
      "Using reserved words as variable names",
      "Trailing commas in older environments that don't support them",
      "Pasting code with smart/curly quotes instead of straight quotes",
      "Using ES module syntax (`import`) in a CommonJS context without a bundler",
    ],
    fixes: [
      "Check the line number in the error and inspect surrounding brackets",
      "Use an editor with bracket-matching highlight to find the mismatch",
      "Run the file through a linter (ESLint) to get a precise report",
      "Ensure your Node.js version supports the syntax you are using",
    ],
    keywords: [
      "syntax",
      "token",
      "unexpected",
      "bracket",
      "parentheses",
      "parse",
    ],
  },

  {
    title: "RangeError: Maximum call stack size exceeded",
    match: /rangeerror: maximum call stack size exceeded/i,
    explanation:
      "A function keeps calling itself (directly or indirectly) without ever reaching a base case, causing the call stack to overflow.",
    causes: [
      "A recursive function with a missing or unreachable base case",
      "Two functions calling each other infinitely (mutual recursion)",
      "A getter/setter accidentally calling itself",
      "An event listener re-triggering the same event repeatedly",
    ],
    fixes: [
      "Add or fix the base case in your recursive function",
      "Use an iterative approach (loop) instead of recursion",
      "Add a `console.log()` near the recursive call to trace the depth",
      "Check that setters do not call themselves (use the backing field instead)",
    ],
    keywords: ["stack", "recursion", "recursive", "overflow", "range", "call"],
  },

  {
    title: "Promise rejected / UnhandledPromiseRejection",
    match: /unhandledpromiserejection|unhandled promise rejection/i,
    explanation:
      "A Promise was rejected (failed) and no `.catch()` handler or `try/catch` block was attached to handle the error. In Node.js 15+, this crashes the process.",
    causes: [
      "Missing `.catch()` on a promise chain",
      "An `async` function threw but was not awaited inside a try/catch",
      "A rejected promise stored in a variable that was never `.catch()`-ed",
    ],
    fixes: [
      "Append `.catch(err => console.error(err))` to every promise chain",
      "Wrap `await` calls in a `try { } catch (err) { }` block",
      "Add a global handler: `process.on('unhandledRejection', handler)`",
      "Use Promise.allSettled() instead of Promise.all() when partial failure is acceptable",
    ],
  },

  {
    title: "Cannot find module",
    match: /cannot find module/i,
    explanation:
      "Node.js tried to load a module via `require()` or `import` but could not locate it on disk or in `node_modules`.",
    causes: [
      "The package is not installed (`npm install` not run)",
      "A typo in the module path or package name",
      "The file path is relative but incorrect (e.g., `./utils` vs `../utils`)",
      "The package was installed globally but the project needs it locally",
    ],
    fixes: [
      "Run `npm install` or `yarn` to install all dependencies",
      "Install the specific package: `npm install <package-name>`",
      "Double-check the relative path with your file explorer",
      "Verify the exact package name on npmjs.com",
    ],
  },

  // ─── Python ────────────────────────────────────────────────────────────────

  {
    title: "Python: NameError — name not defined",
    match: /nameerror: name '.+' is not defined/i,
    explanation:
      "Python encountered a name it doesn't recognise in the current scope. The variable or function hasn't been created yet (or at all) when this line executes.",
    causes: [
      "Variable used before assignment",
      "Typo in the variable or function name",
      "The variable lives in a different scope (e.g., inside a function)",
      "A missing `import` statement",
    ],
    fixes: [
      "Assign the variable before using it",
      "Check for spelling errors in the name",
      "Move the variable to the correct scope or pass it as a parameter",
      "Add the required `import` at the top of the file",
    ],
  },

  {
    title: "Python: IndentationError",
    match: /indentationerror/i,
    explanation:
      "Python uses indentation to define code blocks. This error means a line is indented inconsistently or incorrectly relative to the surrounding block.",
    causes: [
      "Mixing tabs and spaces in the same file",
      "Wrong number of spaces for a block",
      "A misplaced `else`, `elif`, `except`, or `finally`",
    ],
    fixes: [
      "Configure your editor to convert tabs to spaces (PEP 8 recommends 4 spaces)",
      "Run `python -tt script.py` to detect tab/space mixing",
      "Re-indent the block from scratch using consistent spaces",
    ],
  },

  {
    title: "Python: AttributeError",
    match: /attributeerror: '.+' object has no attribute/i,
    explanation:
      "You are trying to access an attribute or method that does not exist on the given object type. This often means a wrong type was passed or there is a typo.",
    causes: [
      "Typo in the attribute or method name",
      "The variable holds a different type than expected (e.g., `None` instead of a list)",
      "Using a method from one library on an object from another",
      "Accessing a private attribute without the correct prefix",
    ],
    fixes: [
      "Use `dir(obj)` or `type(obj)` in a Python REPL to inspect the object",
      "Check the official documentation for the correct method name",
      "Add a type check: `if isinstance(obj, ExpectedType):`",
      "Ensure the function returning the object doesn't return `None` on error",
    ],
  },

  {
    title: "Python: KeyError",
    match: /keyerror:/i,
    explanation:
      "You accessed a dictionary with a key that does not exist. Python raises `KeyError` instead of returning `undefined` (like JavaScript).",
    causes: [
      "The key was never inserted into the dictionary",
      "A typo in the key string",
      "The key was removed elsewhere in the code",
      "Case sensitivity issue (e.g., `'Name'` vs `'name'`)",
    ],
    fixes: [
      "Use `dict.get('key', default)` to provide a fallback value",
      "Check for key existence: `if 'key' in my_dict:`",
      "Use `collections.defaultdict` for dictionaries with automatic defaults",
      "Print the dictionary keys with `print(my_dict.keys())` to debug",
    ],
  },

  // ─── General / Node.js ────────────────────────────────────────────────────

  {
    title: "ENOENT: No such file or directory",
    match: /enoent: no such file or directory/i,
    explanation:
      "The operating system could not find the file or directory at the specified path. The path is either wrong or the file doesn't exist.",
    causes: [
      "A typo in the file path",
      "The file was deleted, moved, or not yet created",
      "Using an absolute path that differs between machines",
      "Incorrect working directory when running the script",
    ],
    fixes: [
      "Verify the file exists using your file explorer or `ls`/`dir`",
      "Use `path.join(__dirname, 'filename')` to build paths relative to the script",
      "Print the resolved path with `console.log(path.resolve(filePath))`",
      "Check the current working directory with `process.cwd()`",
    ],
  },

  {
    title: "EADDRINUSE: Address already in use",
    match: /eaddrinuse: address already in use/i,
    explanation:
      "A server process tried to listen on a port that is already occupied by another process. Only one process can own a port at a time.",
    causes: [
      "A previous instance of your server is still running",
      "Another application is using the same port",
      "The port was not released after a crash",
    ],
    fixes: [
      "Kill the existing process: `npx kill-port <port>` or `lsof -ti:<port> | xargs kill`",
      "Change the port number in your config or `.env` file",
      "On Windows, find the process: `netstat -ano | findstr :<port>` then `taskkill /PID <pid> /F`",
    ],
  },

  {
    title: "JSON SyntaxError: Unexpected token",
    match: /syntaxerror: unexpected token.+json/i,
    explanation:
      "JSON.parse() received a string that is not valid JSON. This commonly happens when an API returns an HTML error page or plain text instead of JSON.",
    causes: [
      "The server returned an error page (HTML) which was then parsed as JSON",
      "The JSON string has trailing commas (not allowed in JSON)",
      "Single quotes used instead of double quotes",
      "An undefined value was serialised as the literal word `undefined`",
    ],
    fixes: [
      "Log the raw response text before parsing: `console.log(text)` or `res.text()`",
      "Validate your JSON at jsonlint.com",
      "Wrap `JSON.parse()` in a try/catch to handle malformed input gracefully",
      "Check the HTTP status code before parsing the body",
    ],
  },

  {
    title: "TypeError: Cannot set properties of undefined",
    match: /cannot set propert(?:y|ies) of undefined/i,
    explanation:
      "You tried to assign a value to a property of something that is `undefined`. This is the write-side equivalent of the 'Cannot read properties of undefined' error.",
    causes: [
      "The object was never initialised before the assignment",
      "A function returned `undefined` instead of an object",
      "An array index is out of bounds, returning `undefined`",
    ],
    fixes: [
      "Initialise the object first: `const obj = {}`",
      "Check the return value of the function before assigning to its result",
      "Ensure array indices are within bounds before writing to them",
    ],
  },

  {
    title: "Unexpected Error",
    match: /unexpected error|unknown error|an error occurred/i,
    explanation:
      "A generic error caught by the system when a more specific error message wasn't available. This is often a 'fallback' for unhandled exceptions.",
    causes: [
      "An unhandled exception in an async block",
      "A third-party library throwing an error without a descriptive message",
      "The code reached a state that the developer didn't anticipate",
    ],
    fixes: [
      "Check the full stack trace (if available) to find the source",
      "Add more granular `try/catch` blocks to identify the specific failing line",
      "Log the entire error object: `console.error(err)` to see hidden properties",
    ],
  },

  {
    title: "HTTP 500: Internal Server Error",
    match: /500 internal server error|status code 500/i,
    explanation:
      "The server encountered an unexpected condition that prevented it from fulfilling the request. This is a generic 'catch-all' for server-side crashes.",
    causes: [
      "A crash in the backend code (null pointer, uncaught exception)",
      "Database connection failure or timeout",
      "A misconfiguration in the web server (e.g., Nginx, Apache)",
    ],
    fixes: [
      "Check the server-side logs for a more specific error message",
      "Verify that the database and other microservices are running",
      "Check for recent code changes that might have introduced a regression",
    ],
    keywords: ["server", "error", "internal", "crash", "500", "backend"],
  },

  {
    title: "HTTP 401: Unauthorized",
    match: /401 unauthorized|status code 401/i,
    explanation:
      "The request requires user authentication. The client must provide a valid credential (like a JWT or session cookie) to access the resource.",
    causes: [
      "Missing `Authorization` header",
      "The token has expired or is invalid",
      "The user has been logged out",
    ],
    fixes: [
      "Ensure you are sending a valid token in the headers",
      "Check if the user needs to log in again",
      "Verify the token secret matches on both client and server",
    ],
    keywords: ["unauthorized", "auth", "token", "login", "401", "jwt"],
  },

  {
    title: "HTTP 403: Forbidden",
    match: /403 forbidden|status code 403/i,
    explanation:
      "The server understood the request but refuses to authorize it. Unlike 401, the client's identity is known, but they don't have permission for this specific resource.",
    causes: [
      "User role does not have sufficient permissions",
      "Attempting to access a resource that belongs to another user",
      "The IP address is blocked by a firewall or WAF",
    ],
    fixes: [
      "Check your account permissions / role",
      "Ensure you are requesting the correct resource ID",
      "Contact the administrator if you believe you should have access",
    ],
    keywords: [
      "forbidden",
      "permission",
      "permissions",
      "access",
      "403",
      "role",
    ],
  },

  {
    title: "EACCES: Permission denied",
    match: /eacces: permission denied|permission denied/i,
    explanation:
      "The process attempted to perform a file or network operation that it does not have permission for. Common when writing to protected folders or binding to low ports.",
    causes: [
      "Trying to use a port below 1024 without root/admin privileges",
      "Writing to a directory owned by another user or `root`",
      "A file is currently locked by another process",
    ],
    fixes: [
      "Run the command with `sudo` or as an Administrator (if safe)",
      "Change the port to something above 1024 (e.g., 3000, 8080)",
      "Check file permissions with `ls -l` and change them with `chmod` or `chown`",
    ],
    keywords: [
      "eacces",
      "permission",
      "permissions",
      "denied",
      "access",
      "sudo",
      "port",
    ],
  },

  {
    title: "ECONNREFUSED: Connection refused",
    match: /econnrefused: connection refused|connection refused/i,
    explanation:
      "The target machine actively refused the connection. Usually means the service you are trying to reach isn't running on the specified port.",
    causes: [
      "The backend server is not running",
      "The port number is incorrect",
      "A firewall is blocking the connection",
    ],
    fixes: [
      "Ensure the service you are calling is actually started",
      "Double-check the host and port in your configuration",
      "Verify that the service is listening on `0.0.0.0` or `127.0.0.1` as expected",
    ],
    keywords: [
      "connection",
      "refused",
      "econnrefused",
      "offline",
      "server",
      "port",
    ],
  },

  // ─── React ────────────────────────────────────────────────────────────────

  {
    title: "React: Invalid hook call",
    match: /invalid hook call|hooks can only be called inside/i,
    explanation:
      "React Hooks (useState, useEffect, etc.) must be called at the top level of a React function component or a custom Hook. Calling them inside loops, conditions, nested functions, or class components breaks React's rules.",
    causes: [
      "Calling a hook inside an `if` statement or a loop",
      "Calling a hook inside a regular JavaScript function (not a component or custom hook)",
      "Having multiple versions of React installed (common in monorepos)",
      "Using a hook in a class component",
    ],
    fixes: [
      "Move the hook to the top level of your function component",
      "Never call hooks conditionally — use conditions *inside* the hook instead",
      "Run `npm ls react` to check for duplicate React versions and dedupe them",
      "Convert class components to function components to use hooks",
    ],
  },

  {
    title: "React: Each child in a list should have a unique key",
    match: /each child in a list should have a unique.+key/i,
    explanation:
      "When rendering a list with `.map()`, React needs a stable, unique `key` prop on each element so it can efficiently track which items changed, were added, or were removed.",
    causes: [
      "Returning JSX elements from `.map()` without a `key` prop",
      "Using the array index as `key` when items can be reordered or filtered",
      "Rendering a list inside a fragment without passing `key` to the fragment",
    ],
    fixes: [
      "Add a unique `key` prop: `items.map(item => <li key={item.id}>{item.name}</li>)`",
      "Use a stable, unique identifier (database ID, slug) — not the array index",
      "Pass `key` to the outermost element, not a nested child",
    ],
  },

  {
    title: "React: Objects are not valid as a React child",
    match: /objects are not valid as a react child/i,
    explanation:
      "You tried to render a plain JavaScript object directly in JSX. React can render strings and numbers, but not raw objects. This often happens when you accidentally render a Date, a Promise, or a nested object.",
    causes: [
      "Rendering `{user}` where `user` is an object instead of `{user.name}`",
      "Rendering a Date object directly: `{new Date()}` instead of `{new Date().toLocaleDateString()}`",
      "A function returning an object where a component is expected",
      "Rendering state that was accidentally set to an object",
    ],
    fixes: [
      "Access the specific property: `{user.name}` instead of `{user}`",
      "Convert objects to strings before rendering: `{JSON.stringify(data)}`",
      "Format Dates: `{date.toLocaleDateString()}`",
      "Use `console.log()` to inspect what type is being rendered",
    ],
  },

  {
    title:
      "React: Cannot update a component while rendering a different component",
    match: /cannot update a component.+while rendering a different component/i,
    explanation:
      "A state update (setState / useState setter) was triggered during the render phase of another component. React doesn't allow side effects during rendering.",
    causes: [
      "Calling a parent's state setter directly inside a child's render (not inside useEffect or an event handler)",
      "Passing a setState call as a prop and calling it during render",
      "Updating state inside a render method without a condition",
    ],
    fixes: [
      "Move state updates into a `useEffect` hook",
      "Trigger state changes only from event handlers, not during render",
      "Lift state up and pass down callbacks that are only called in events",
    ],
  },

  {
    title: "React: Too many re-renders",
    match: /too many re-renders/i,
    explanation:
      "React detected an infinite rendering loop. A state update is being triggered on every render, causing the component to render again and again without stopping.",
    causes: [
      "Calling a state setter directly in the component body (not inside useEffect or an event handler)",
      "Passing an inline function to an event handler that calls setState immediately: `onClick={setState(val)}` instead of `onClick={() => setState(val)}`",
      "A useEffect with incorrect dependencies that keeps updating state",
    ],
    fixes: [
      "Wrap the state setter call in an arrow function for event handlers: `onClick={() => setValue(x)}`",
      "Move state initialisation logic into `useEffect` with an empty dependency array `[]`",
      "Review `useEffect` dependencies — make sure they don't change on every render",
    ],
  },

  {
    title: "React: useEffect missing dependency",
    match: /react-hooks\/exhaustive-deps|useEffect has a missing dependency/i,
    explanation:
      "The `useEffect` hook uses a variable inside its callback but that variable is not listed in the dependency array. This can cause stale closures where the effect references an outdated value.",
    causes: [
      "Using props, state, or functions inside useEffect without adding them to `[]`",
      "Deliberately omitting a dependency to prevent infinite loops (a sign of a deeper design issue)",
    ],
    fixes: [
      "Add all variables used inside the effect to the dependency array",
      "Wrap functions used in useEffect with `useCallback` to stabilise their reference",
      "If the effect should only run once, ensure its logic doesn't need changing dependencies",
    ],
  },

  {
    title: "React: Hydration failed / Hydration mismatch",
    match: /hydration failed|did not match.*server.*client|hydration mismatch/i,
    explanation:
      "The HTML rendered on the server doesn't match what React tries to render on the client during hydration. React cannot reconcile the two trees and throws.",
    causes: [
      "Rendering different content based on `window`, `localStorage`, or `Date` (not available on the server)",
      "Using browser-only APIs directly in a component without checking `typeof window !== 'undefined'`",
      "Invalid HTML nesting (e.g., `<p>` inside `<p>`, `<div>` inside `<p>`)",
      "A third-party browser extension modifying the DOM before hydration",
    ],
    fixes: [
      "Gate browser-only code with `useEffect` or check `typeof window !== 'undefined'`",
      "Use `suppressHydrationWarning` on elements with intentionally different content (e.g. timestamps)",
      "Fix invalid HTML nesting in your JSX",
      "Use Next.js `dynamic()` with `{ ssr: false }` for components that rely on browser APIs",
    ],
  },

  // ─── Next.js ──────────────────────────────────────────────────────────────

  {
    title:
      "Next.js: You're importing a component that needs useState (Client Component)",
    match: /you('re| are) importing a component that needs (usestate|client)/i,
    explanation:
      "In Next.js App Router, components are Server Components by default. If you use React hooks (useState, useEffect, etc.) you must mark the file as a Client Component by adding 'use client' at the very top.",
    causes: [
      "Using useState, useEffect, or other hooks in a Server Component",
      "Using browser APIs (window, document) in a Server Component",
      "Importing a third-party component that internally uses hooks, into a Server Component",
    ],
    fixes: [
      "Add `'use client';` as the very first line of the file",
      "Split the component: keep the server shell as a Server Component and extract the interactive part into a separate Client Component file",
      "Use `dynamic()` with `{ ssr: false }` for components that need the browser",
    ],
  },

  {
    title: "Next.js: next/headers called outside Server Component",
    match:
      /next\/headers.+outside.*server|was called outside a server component/i,
    explanation:
      "`cookies()`, `headers()`, and other functions from `next/headers` are only available inside Server Components or Route Handlers. They cannot be used in Client Components.",
    causes: [
      "Calling `cookies()` or `headers()` inside a file marked with `'use client'`",
      "Calling them inside a utility function that ends up running on the client",
    ],
    fixes: [
      "Remove `'use client'` from the file, or move the `cookies()`/`headers()` call to a Server Component",
      "Pass the cookie/header value as a prop from a Server Component down to the Client Component",
      "Use a Route Handler (`app/api/...`) to access headers server-side and expose them via fetch",
    ],
  },

  {
    title: "Next.js: Module not found — can't resolve",
    match: /module not found.*can't resolve|cannot find module.*next/i,
    explanation:
      "Next.js (or webpack) could not locate a module you are importing. The file path is wrong, the package is not installed, or there is an alias misconfiguration.",
    causes: [
      "Wrong relative import path (e.g. `'../components/Button'` should be `'./components/Button'`)",
      "Package not installed — forgot to run `npm install`",
      "Path alias (`@/`) not configured in `tsconfig.json` or `jsconfig.json`",
      "Case-sensitivity issues on Linux/Mac servers (file is `Button.jsx` but imported as `button.jsx`)",
    ],
    fixes: [
      "Double-check the import path against the actual file location",
      "Run `npm install` to ensure all packages are present",
      'Add your alias to `tsconfig.json`: `{ "paths": { "@/*": ["./src/*"] } }`',
      "Match import casing exactly to the filename on disk",
    ],
  },

  {
    title: "Next.js: getServerSideProps / getStaticProps used in App Router",
    match: /getServerSideProps|getStaticProps|getStaticPaths/i,
    explanation:
      "`getServerSideProps`, `getStaticProps`, and `getStaticPaths` are Pages Router APIs. They do not work in the App Router (`app/` directory). The App Router uses async Server Components and `fetch()` with caching options instead.",
    causes: [
      "Migrating pages from `pages/` to `app/` without updating the data-fetching pattern",
      "Accidentally placing a Pages Router file inside the `app/` directory",
    ],
    fixes: [
      "Replace `getServerSideProps` with an `async` Server Component that fetches data directly",
      "Replace `getStaticProps` with `fetch(url, { next: { revalidate: 60 } })` inside a Server Component",
      "If you must use the Pages Router, keep the file inside the `pages/` directory",
    ],
  },

  {
    title: "Next.js: useRouter called on the server / next/navigation error",
    match:
      /userouter.*server|invariant.*router.*not.*mounted|next\/navigation.*server/i,
    explanation:
      "`useRouter` from `next/navigation` (App Router) or `next/router` (Pages Router) is a client-side hook. It cannot be called in Server Components.",
    causes: [
      "Using `useRouter` in a Server Component (missing `'use client'` directive)",
      "Mixing `next/router` (Pages Router) with `next/navigation` (App Router)",
    ],
    fixes: [
      "Add `'use client';` to the top of the file that uses `useRouter`",
      "In the App Router, import from `next/navigation`, not `next/router`",
      "For server-side redirects, use the `redirect()` function from `next/navigation` instead",
    ],
  },

  // ─── Express ──────────────────────────────────────────────────────────────

  {
    title: "Express: Cannot set headers after they are sent to the client",
    match: /cannot set headers after they are sent to the client/i,
    explanation:
      "You tried to send a response (res.send, res.json, res.redirect, etc.) more than once for the same request. Once a response is sent, the HTTP connection is closed and no more headers or body can be written.",
    causes: [
      "Missing `return` before `res.send()` or `res.json()` inside a conditional",
      "Calling `next()` and then also calling `res.send()` in the same middleware",
      "An async callback sending a response after a timeout or second async operation completes",
    ],
    fixes: [
      "Add `return` before every response call: `return res.json({ error: 'not found' })`",
      "Use `if/else` rather than consecutive `if` blocks when sending responses",
      "Never call `next()` and `res.send()` in the same code path",
    ],
  },

  {
    title: "Express: req.body is undefined",
    match: /req\.body.*undefined|request\.body.*undefined/i,
    explanation:
      "Express does not parse request bodies by default. `req.body` will be `undefined` unless you add the appropriate body-parsing middleware before your routes.",
    causes: [
      "Missing `express.json()` or `express.urlencoded()` middleware",
      "Middleware registered *after* the route instead of before it",
      "Sending the request with the wrong `Content-Type` header for the parser used",
    ],
    fixes: [
      "Add `app.use(express.json())` before your routes for JSON bodies",
      "Add `app.use(express.urlencoded({ extended: true }))` for form data",
      "Ensure middleware is registered before route handlers in your file",
      "Check the `Content-Type` header matches what your parser expects (`application/json`)",
    ],
  },

  {
    title: "Express: CORS — blocked by CORS policy",
    match: /blocked by cors policy|cors.*header|access-control-allow-origin/i,
    explanation:
      "The browser blocked the request because the server's response did not include the correct CORS headers. This is a browser security feature — the server must explicitly allow cross-origin requests.",
    causes: [
      "No CORS middleware configured on the Express server",
      "CORS configured but the requesting origin is not in the allowed list",
      "Preflight `OPTIONS` request not handled",
    ],
    fixes: [
      "Install and use the `cors` package: `app.use(require('cors')())`",
      "Restrict to specific origins: `app.use(cors({ origin: 'https://yourfrontend.com' }))`",
      "Handle preflight: `app.options('*', cors())`",
      "For development only, you can allow all origins: `app.use(cors())`",
    ],
  },

  {
    title: "Express: Route not found — 404",
    match: /cannot (get|post|put|patch|delete) \//i,
    explanation:
      "Express could not match the incoming HTTP method and path to any defined route. It returned a default 404 response.",
    causes: [
      "Typo in the route path (e.g. `/user` defined but `/users` requested)",
      "HTTP method mismatch (route is `app.get` but request is `POST`)",
      "Route registered on the wrong router instance",
      "Router not mounted with `app.use()` or mounted at the wrong prefix",
    ],
    fixes: [
      "Check that the route path and HTTP method exactly match the request",
      "Log all registered routes with `app._router.stack` to inspect what is registered",
      "Ensure your router is mounted: `app.use('/api', router)`",
      "Add a catch-all 404 handler at the bottom: `app.use((req, res) => res.status(404).json({ error: 'Not found' }))`",
    ],
  },

  {
    title: "Express: Middleware error — next is not a function",
    match: /next is not a function|express.*next.*not a function/i,
    explanation:
      "An Express middleware function was called with the wrong number of arguments, or `next` was not passed to a function that expected it.",
    causes: [
      "Defining an error-handling middleware with only 3 params `(req, res, next)` instead of 4 `(err, req, res, next)`",
      "Calling middleware as a regular function instead of registering it with `app.use()`",
      "Accidentally overwriting the `next` variable inside the middleware",
    ],
    fixes: [
      "Error-handling middleware MUST have exactly 4 parameters: `(err, req, res, next) => {}`",
      "Register middleware with `app.use(myMiddleware)` not `myMiddleware(req, res, next)`",
      "Check that you are not shadowing `next` with a local variable of the same name",
    ],
  },

  {
    title: "Express: JWT / Token malformed or invalid signature",
    match: /jsonwebtokenerror|jwt malformed|invalid signature|jwt expired/i,
    explanation:
      "The JSON Web Token provided in the request is malformed, has been tampered with, has an invalid signature, or has expired. This commonly occurs in auth middleware.",
    causes: [
      "The token was signed with a different secret than the one used to verify it",
      "The token string was corrupted (e.g. truncated, or `Bearer ` prefix not stripped)",
      "The token has passed its `exp` (expiry) time",
      "The wrong algorithm was used to sign or verify the token",
    ],
    fixes: [
      "Ensure the same `JWT_SECRET` is used for both signing and verifying",
      "Strip the `Bearer ` prefix before verifying: `token = authHeader.split(' ')[1]`",
      "Issue a new token if the old one is expired (implement a refresh token flow)",
      "Check that the `algorithm` option matches in both `jwt.sign()` and `jwt.verify()`",
    ],
  },
  // ─── TypeScript Advanced ───────────────────────────────────────────────

  {
    title: "TypeScript: Property does not exist on type",
    match: /property '.+' does not exist on type/i,
    explanation:
      "You are trying to access a property that TypeScript does not recognise on the given type. The object shape does not match your expectation.",
    causes: [
      "Incorrect type definition",
      "Using a union type without narrowing",
      "Typo in property name",
      "API response shape mismatch",
    ],
    fixes: [
      "Check the interface/type definition",
      "Use type narrowing (if / in / typeof)",
      "Ensure the property exists on all union members",
      "Log the actual object to verify structure",
    ],
  },

  {
    title: "TypeScript: Object is possibly undefined",
    match: /object is possibly 'undefined'/i,
    explanation:
      "TypeScript warns that a variable may be undefined at runtime, so accessing it is unsafe.",
    causes: [
      "Optional chaining not used",
      "Missing null/undefined checks",
      "Async data not loaded yet",
    ],
    fixes: [
      "Use optional chaining: obj?.prop",
      "Add guards: if (!obj) return",
      "Use non-null assertion carefully: obj!.prop",
    ],
  },

  // ─── Node.js / Backend ───────────────────────────────────────────────

  {
    title: "ERR_HTTP_HEADERS_SENT",
    match: /err_http_headers_sent/i,
    explanation:
      "Headers were already sent to the client, and the server attempted to modify them again.",
    causes: [
      "Multiple res.send/res.json calls",
      "Async logic sending response twice",
    ],
    fixes: [
      "Ensure only one response is sent",
      "Return immediately after sending response",
    ],
  },

  {
    title: "ERR_REQUIRE_ESM",
    match: /err_require_esm/i,
    explanation:
      "You are trying to require() an ES module using CommonJS syntax.",
    causes: ["Using require() with ESM package", "Mixing module systems"],
    fixes: [
      "Use import instead of require",
      'Set "type": "module" in package.json',
      "Use dynamic import()",
    ],
  },

  {
    title: "ERR_MODULE_NOT_FOUND",
    match: /err_module_not_found/i,
    explanation: "Node.js could not resolve an ES module import.",
    causes: [
      "Wrong file extension",
      "Missing .js in import path",
      "Incorrect relative path",
    ],
    fixes: ["Add file extension in import", "Check path correctness"],
  },

  // ─── Database ───────────────────────────────────────────────

  {
    title: "MongoError: E11000 duplicate key",
    match: /e11000 duplicate key/i,
    explanation:
      "MongoDB rejected the insert/update because it violates a unique index constraint.",
    causes: ["Duplicate value for unique field", "User already exists"],
    fixes: [
      "Check for existing record before insert",
      "Handle error and return proper response",
    ],
  },

  {
    title: "Prisma: Unique constraint failed",
    match: /unique constraint failed/i,
    explanation:
      "Prisma tried to insert or update a record that violates a unique constraint in the database.",
    causes: ["Duplicate email/username", "Incorrect unique field handling"],
    fixes: [
      "Validate uniqueness before insert",
      "Catch error and show user-friendly message",
    ],
  },

  // ─── Networking / Fetch ───────────────────────────────────────────────

  {
    title: "FetchError: network error",
    match: /fetcherror|network error/i,
    explanation:
      "The request failed due to network issues before reaching the server.",
    causes: ["No internet connection", "DNS failure", "Server down"],
    fixes: [
      "Check internet connection",
      "Retry request",
      "Add timeout + retry logic",
    ],
  },

  {
    title: "CORS: Preflight failed",
    match: /preflight.*failed/i,
    explanation:
      "The browser blocked the request because the preflight OPTIONS request failed.",
    causes: ["Server not handling OPTIONS", "Missing CORS headers"],
    fixes: ["Enable OPTIONS handling", "Use cors middleware properly"],
  },

  // ─── React Advanced ───────────────────────────────────────────────

  {
    title: "React: setState on unmounted component",
    match: /can't perform a react state update on an unmounted component/i,
    explanation:
      "A state update was triggered after the component was unmounted.",
    causes: [
      "Async request finished after unmount",
      "Missing cleanup in useEffect",
    ],
    fixes: ["Cancel async tasks in cleanup", "Track mounted state"],
  },

  {
    title: "React: Controlled vs uncontrolled input",
    match: /a component is changing an uncontrolled input/i,
    explanation: "An input switched between controlled and uncontrolled state.",
    causes: [
      "value changes from undefined to defined",
      "Missing initial state",
    ],
    fixes: ["Initialize state properly", "Ensure value is always defined"],
  },

  // ─── Build Tools ───────────────────────────────────────────────

  {
    title: "Vite: Failed to resolve import",
    match: /failed to resolve import/i,
    explanation: "Vite could not resolve an imported module.",
    causes: ["Wrong path", "Missing dependency"],
    fixes: ["Check import path", "Install dependency"],
  },

  {
    title: "Webpack: Module parse failed",
    match: /module parse failed/i,
    explanation: "Webpack encountered syntax it cannot parse without a loader.",
    causes: ["Missing loader (babel, ts-loader)", "Unsupported syntax"],
    fixes: ["Install proper loader", "Update webpack config"],
  }, // ─── Next.js Advanced ───────────────────────────────────────────────

  {
    title: "Next.js: Dynamic server usage error",
    match: /dynamic server usage/i,
    explanation:
      "Next.js detected usage of dynamic data (cookies, headers) in a static context.",
    causes: [
      "Using cookies() in static page",
      "Mixing static and dynamic rendering",
    ],
    fixes: [
      "Mark route as dynamic: export const dynamic = 'force-dynamic'",
      "Move logic to server component",
    ],
    keywords: ["nextjs", "dynamic"],
  },

  {
    title: "Next.js: Middleware infinite loop",
    match: /middleware.*loop/i,
    explanation: "Middleware keeps redirecting causing infinite loop.",
    causes: ["Redirect condition always true", "Missing path check"],
    fixes: ["Add condition to stop redirect", "Check pathname before redirect"],
    keywords: ["nextjs", "middleware"],
  },

  // ─── Authentication / Security ───────────────────────────────────────────────

  {
    title: "Auth: Invalid CSRF token",
    match: /csrf token/i,
    explanation: "Request rejected due to invalid or missing CSRF token.",
    causes: ["Token expired", "Token not sent"],
    fixes: ["Regenerate token", "Include token in request"],
    keywords: ["auth", "csrf"],
  },

  {
    title: "Auth: Session expired",
    match: /session expired/i,
    explanation: "User session is no longer valid.",
    causes: ["Token expired", "User logged out"],
    fixes: ["Re-login user", "Refresh token"],
    keywords: ["auth"],
  },

  // ─── SQL / Databases ───────────────────────────────────────────────

  {
    title: "SQL: Syntax error",
    match: /sql syntax.*error/i,
    explanation: "Database query contains invalid SQL syntax.",
    causes: ["Missing comma", "Wrong keyword"],
    fixes: ["Check query syntax", "Test in DB client"],
    keywords: ["sql"],
  },

  {
    title: "SQL: Connection timeout",
    match: /connection timeout/i,
    explanation: "Database connection took too long.",
    causes: ["DB down", "Network slow"],
    fixes: ["Check DB status", "Increase timeout"],
    keywords: ["sql"],
  },

  // ─── Docker ───────────────────────────────────────────────

  {
    title: "Docker: Container exited with code 1",
    match: /exited with code 1/i,
    explanation: "Container crashed due to runtime error.",
    causes: ["App crash", "Missing env variables"],
    fixes: ["Check logs: docker logs", "Fix app error"],
    keywords: ["docker"],
  },

  {
    title: "Docker: Port already allocated",
    match: /port is already allocated/i,
    explanation: "Docker cannot bind port because it's already used.",
    causes: ["Another container running"],
    fixes: ["Stop container", "Change port"],
    keywords: ["docker"],
  },

  // ─── Git ───────────────────────────────────────────────

  {
    title: "Git: Merge conflict",
    match: /merge conflict/i,
    explanation: "Git cannot automatically merge changes.",
    causes: ["Same lines modified"],
    fixes: ["Resolve conflict manually", "Commit after resolving"],
    keywords: ["git"],
  },

  {
    title: "Git: Detached HEAD",
    match: /detached head/i,
    explanation: "You are not on a branch.",
    causes: ["Checked out commit directly"],
    fixes: ["Create new branch"],
    keywords: ["git"],
  },

  // ─── Browser / DOM ───────────────────────────────────────────────

  {
    title: "DOMException: Failed to execute",
    match: /domexception/i,
    explanation: "Browser failed to execute DOM operation.",
    causes: ["Invalid DOM operation", "Wrong element type"],
    fixes: ["Check DOM API usage"],
    keywords: ["browser"],
  },

  {
    title: "ResizeObserver loop limit exceeded",
    match: /resizeobserver loop/i,
    explanation: "Too many layout recalculations triggered.",
    causes: ["Infinite resize loop"],
    fixes: ["Debounce resize"],
    keywords: ["browser"],
  },

  // ─── Performance ───────────────────────────────────────────────

  {
    title: "Memory leak detected",
    match: /memory leak/i,
    explanation: "Application is consuming memory without releasing it.",
    causes: ["Uncleared intervals", "Event listeners not removed"],
    fixes: ["Cleanup listeners", "Use useEffect cleanup"],
    keywords: ["performance"],
  },

  {
    title: "Long task warning",
    match: /long task/i,
    explanation: "Main thread blocked for too long.",
    causes: ["Heavy computation"],
    fixes: ["Use web workers", "Optimize code"],
    keywords: ["performance"],
  },

  // ─── Validation (Zod / similar) ───────────────────────────────────────────

  {
    title: "Zod: Validation failed / invalid_type",
    match: /zoderror|zod\.|validation failed.*zod|\[\s*zod\s*\]/i,
    explanation:
      "Zod rejected input because it did not match your schema (wrong type, missing field, string too short, etc.).",
    causes: [
      "Request body or props don't match the schema shape",
      "Optional fields treated as required, or the opposite",
      "Coercion off — e.g. string `'123'` passed where a number was expected",
    ],
    fixes: [
      "Read `error.flatten()` or `error.errors` for field paths and messages",
      "Align API/UI payloads with the schema (rename keys, add defaults)",
      "Use `.safeParse()` and branch on `success` instead of throwing",
      "Loosen or refine the schema with `.optional()`, `.nullable()`, or unions",
    ],
    keywords: ["zod", "validation", "schema", "invalid"],
  },

  // ─── npm / Yarn / pnpm ───────────────────────────────────────────────────

  {
    title: "npm: ERESOLVE unable to resolve dependency tree",
    match: /eresolve unable to resolve dependency tree|peer dep.*conflict/i,
    explanation:
      "npm could not satisfy version constraints between your direct dependencies and their peers (or between nested packages).",
    causes: [
      "Two packages require incompatible versions of the same peer",
      "Strict npm v7+ peer resolution vs older packages",
    ],
    fixes: [
      "Run `npm install <pkg>@<version>` to pick a compatible set",
      "Use `npm install --legacy-peer-deps` as a temporary workaround (know the risk)",
      "Switch to overrides in package.json or use pnpm `overrides`",
      "Upgrade the conflicting library to a version that supports your stack",
    ],
    keywords: ["eresolve", "npm", "peer", "dependency"],
  },

  {
    title: "npm: EBADENGINE unsupported engine",
    match: /ebadengine|unsupported engine/i,
    explanation:
      "The package declares a Node/npm version range that does not include your current runtime.",
    causes: ["Node.js too old or too new for the package", "Wrong npm version"],
    fixes: [
      "Upgrade Node with nvm, fnm, or the official installer",
      "Use `nvm install` / `nvm use` to match the project's `.nvmrc`",
      "If safe, use `npm install --ignore-engines` (last resort)",
    ],
    keywords: ["ebadengine", "engine", "node"],
  },

  // ─── HTTP clients ─────────────────────────────────────────────────────────

  {
    title: "Axios: Network Error / connection failed",
    match: /axioserror.*network|network error.*axios|econnaborted|timeout of \d+ms exceeded/i,
    explanation:
      "The HTTP client could not complete the request — no response, timeout, or TLS failure before headers arrived.",
    causes: [
      "Server down or wrong URL/port",
      "CORS preflight blocked (browser shows as network error)",
      "Request exceeded `timeout`",
      "SSL certificate problems on HTTPS",
    ],
    fixes: [
      "Verify the URL and that the API is reachable (`curl` the endpoint)",
      "Increase `timeout` or add retries for flaky networks",
      "In the browser, check DevTools Network for CORS or 4xx/5xx",
      "Log `error.code` and `error.response` for Axios-specific details",
    ],
    keywords: ["axios", "network", "timeout", "econnaborted"],
  },

  {
    title: "HTTP 429: Too Many Requests",
    match: /429 too many requests|status code 429/i,
    explanation:
      "The server rate-limited you. Too many requests arrived in a short window.",
    causes: [
      "Retries or polling too aggressive",
      "Shared API key hitting a quota",
    ],
    fixes: [
      "Respect `Retry-After` header if present",
      "Exponential backoff between retries",
      "Reduce concurrency or cache responses",
    ],
    keywords: ["429", "rate", "limit", "too many"],
  },

  {
    title: "HTTP 404: Not Found",
    match: /404 not found|status code 404/i,
    explanation:
      "The server has no resource at the requested URL. The path or ID may be wrong.",
    causes: [
      "Typo in route or REST id",
      "Resource deleted or never created",
      "Wrong API base URL or environment",
    ],
    fixes: [
      "Compare the request URL with server routes",
      "Confirm IDs exist in the database",
      "Check trailing slashes and API versioning (`/v1/` vs `/v2/`)",
    ],
    keywords: ["404", "not found"],
  },

  // ─── React (more) ────────────────────────────────────────────────────────

  {
    title: "React: Maximum update depth exceeded",
    match: /maximum update depth exceeded/i,
    explanation:
      "React stopped an infinite loop of state updates — usually `setState` or a hook setter runs during render or in an effect with unstable dependencies.",
    causes: [
      "`useEffect(() => setX(...), [x])` where the effect always changes `x`",
      "Calling a setter unconditionally in the component body",
      "Child render triggers parent update which re-renders child again",
    ],
    fixes: [
      "Fix effect dependencies so the effect does not fire every render",
      "Only update state in response to user events or valid async completion",
      "Split state so effects do not depend on values they themselves update",
    ],
    keywords: ["maximum", "update", "depth", "react"],
  },

  {
    title: "React: Minified React error",
    match: /minified react error #\d+/i,
    explanation:
      "Production React throws opaque error codes. The full message exists only in the development build.",
    causes: ["Bug surfaced only in production bundle", "Invariant failed in prod"],
    fixes: [
      "Open https://react.dev/errors and look up the error number",
      "Reproduce locally with `NODE_ENV=development` or `npm run dev`",
      "Search the stack trace component names to find the offending code",
    ],
    keywords: ["minified", "react", "error"],
  },

  // ─── Testing (Jest / Vitest) ─────────────────────────────────────────────

  {
    title: "Testing Library: Unable to find element / role",
    match: /testinglibraryelementerror|unable to find an accessible|unable to find element/i,
    explanation:
      "A query such as `getByRole`, `getByText`, or `findBy*` did not match any node in the DOM (or match was ambiguous).",
    causes: [
      "Text or role differs from what the component renders (whitespace, case, i18n)",
      "Element inside a portal or shadow root not included in `container`",
      "Async content not awaited — use `findBy*` or `waitFor`",
    ],
    fixes: [
      "Use `screen.debug()` or `debug()` to print the current DOM",
      "Prefer `findBy*` for elements that appear after async work",
      "Check `hidden`, `name`, and `level` options for roles",
      "Use `within(container)` if querying a subtree",
    ],
    keywords: ["testing", "library", "unable", "element", "role"],
  },

  {
    title: "Jest / Vitest: Snapshot mismatch",
    match: /snapshot.*mismatch|snapshot test failed/i,
    explanation:
      "Rendered output or serialized value no longer matches the stored snapshot.",
    causes: ["Intentional UI change", "Non-deterministic output (dates, ids)"],
    fixes: [
      "If change is correct, update snapshots: `jest -u` / `vitest -u`",
      "Mock `Date`, random ids, or i18n for stable snapshots",
      "Remove snapshots for overly brittle full-page dumps.",
    ],
    keywords: ["snapshot", "jest", "vitest"],
  },

  // ─── Node.js runtime ──────────────────────────────────────────────────────

  {
    title: "EMFILE: too many open files",
    match: /emfile.*too many open files|too many open files/i,
    explanation:
      "The process hit the OS limit on concurrent file descriptors (often from many parallel file watchers or unclosed handles).",
    causes: [
      "Huge `node_modules` + default file watcher limit on macOS/Linux",
      "Leaked file streams or sockets",
    ],
    fixes: [
      "Raise ulimit: `ulimit -n 10240` (macOS/Linux)",
      "Exclude folders in the watcher (e.g. watchOptions.ignored in webpack/vite)",
      "Close streams explicitly or use `with` / `finally` patterns",
    ],
    keywords: ["emfile", "open", "files"],
  },

  {
    title: "SSL / TLS: certificate verify failed",
    match: /unable to verify the first certificate|certificate has expired|self signed certificate|ssl routines|UNABLE_TO_VERIFY_LEAF_SIGNATURE/i,
    explanation:
      "HTTPS handshake failed because the certificate chain could not be trusted or is expired.",
    causes: [
      "Corporate proxy replacing certs",
      "Expired server cert",
      "Local dev using self-signed HTTPS",
    ],
    fixes: [
      "Fix the server certificate or install the correct CA bundle",
      "For local dev only: `NODE_TLS_REJECT_UNAUTHORIZED=0` (never in production)",
      "Point Node to a custom CA: `NODE_EXTRA_CA_CERTS=/path/to/ca.pem`",
    ],
    keywords: ["ssl", "tls", "certificate", "verify"],
  },

  {
    title: "AggregateError: All promises were rejected",
    match: /aggregateerror|all promises were rejected/i,
    explanation:
      "An API like `Promise.any` received only rejections, or multiple failures were grouped into one error.",
    causes: [
      "All parallel fetches failed",
      "Every candidate in `Promise.any` rejected",
    ],
    fixes: [
      "Inspect `error.errors` array for each underlying reason",
      "Add logging inside each promise branch",
      "Use `Promise.allSettled` to handle partial success",
    ],
    keywords: ["aggregate", "promises"],
  },

  // ─── Python (more) ───────────────────────────────────────────────────────

  {
    title: "Python: ModuleNotFoundError / ImportError",
    match: /modulenotfounderror: no module named|importerror: cannot import name/i,
    explanation:
      "Python could not locate the package or symbol you tried to import.",
    causes: [
      "Package not installed in the active venv",
      "Wrong working directory / PYTHONPATH",
      "Circular import",
    ],
    fixes: [
      "`pip install <package>` inside the correct environment",
      "Activate the venv your IDE uses",
      "Refactor to break circular imports (lazy import inside function)",
    ],
    keywords: ["modulenotfound", "import", "python"],
  },

  {
    title: "Python: TypeError (wrong types)",
    match: /typeerror: unsupported operand|typeerror: 'NoneType'/i,
    explanation:
      "An operation was applied to values whose types do not support it (e.g. `None + 1`, wrong argument types).",
    causes: [
      "Function returned `None` where a value was expected",
      "Mixing str and int",
    ],
    fixes: [
      "Add guards: `if x is not None:`",
      "Validate inputs with types or pydantic",
      "Read the full traceback line for the offending operator",
    ],
    keywords: ["typeerror", "python", "nonetype"],
  },

  {
    title: "Python: RecursionError",
    match: /recursionerror: maximum recursion depth exceeded/i,
    explanation:
      "A function called itself too deeply without reaching a base case (or recursion limit is too low for a valid deep recursion).",
    causes: [
      "Infinite recursion",
      "Algorithm needs more depth than CPython default allows",
    ],
    fixes: [
      "Fix base case or iteration",
      "Rewrite as a loop",
      "For rare cases: `sys.setrecursionlimit` (use carefully)",
    ],
    keywords: ["recursion", "python"],
  },

  // ─── SQL / Postgres / SQLite ───────────────────────────────────────────────

  {
    title: "PostgreSQL: relation does not exist",
    match: /relation \".+\" does not exist|undefinedtable.*postgres/i,
    explanation:
      "A query referenced a table or view that is not in the connected database schema.",
    causes: [
      "Migration not applied",
      "Wrong schema search_path",
      "Typo in table name",
    ],
    fixes: [
      "Run pending migrations",
      "Qualify with schema: `public.users`",
      "List tables: `\\dt` in psql",
    ],
    keywords: ["relation", "postgres", "does not exist"],
  },

  {
    title: "SQLite: database is locked",
    match: /sqlite.*database is locked|database is locked/i,
    explanation:
      "Another connection is holding a write lock longer than SQLite allows your operation to wait.",
    causes: [
      "Long-running write transaction",
      "Multiple processes writing the same file",
      "WAL mode misconfiguration",
    ],
    fixes: [
      "Use a single writer connection or a pool with correct busy_timeout",
      "Keep transactions short",
      "Avoid opening many connections to the same DB file from one app",
    ],
    keywords: ["sqlite", "locked"],
  },

  // ─── Go ───────────────────────────────────────────────────────────────────

  {
    title: "Go: panic — nil pointer dereference",
    match: /panic:.*nil pointer|runtime error: invalid memory address/i,
    explanation:
      "The program dereferenced a nil pointer or interface at runtime.",
    causes: [
      "Struct field or map value not initialised before use",
      "Function returned nil without a guard",
    ],
    fixes: [
      "Check the panic stack trace file:line",
      "Add nil checks before use",
      "Return zero values or errors instead of nil where appropriate",
    ],
    keywords: ["panic", "nil", "pointer", "go"],
  },

  // ─── Rust ─────────────────────────────────────────────────────────────────

  {
    title: "Rust: panic at runtime",
    match: /thread '.+' panicked at|panic! at /i,
    explanation:
      "Rust aborted the thread because of an explicit `panic!` or an unrecoverable check (e.g. `unwrap` on `None`).",
    causes: [
      "`unwrap()` / `expect()` on Err or None",
      "Assertion failed in debug",
    ],
    fixes: [
      "Replace `unwrap` with `?` propagation or `match`",
      "Read the panic location printed after `panicked at`",
      "Use `RUST_BACKTRACE=1` for a full stack trace",
    ],
    keywords: ["panic", "rust", "thread"],
  },

  // ─── Bundlers / tooling ───────────────────────────────────────────────────

  {
    title: "PostCSS: Failed to find PostCSS config",
    match: /failed to find postcss config|postcss config not found/i,
    explanation:
      "A tool expected a `postcss.config.js` (or similar) and did not find it.",
    causes: ["Missing config after adding Tailwind/Autoprefixer", "Wrong cwd"],
    fixes: [
      "Add `postcss.config.js` at project root",
      "Ensure the bundler's root matches where the config lives",
    ],
    keywords: ["postcss", "config"],
  },

  {
    title: "ESLint: Parsing error: Unexpected token",
    match: /eslint.*parsing error|parsing error.*eslint/i,
    explanation:
      "ESLint's parser could not understand the file — often a parser mismatch for TypeScript or modern syntax.",
    causes: [
      "Missing `@typescript-eslint/parser` for .ts/.tsx",
      "Parser options out of sync with your TS/JS version",
    ],
    fixes: [
      "Set `parser: '@typescript-eslint/parser'` in eslint config for TS files",
      "Align `parserOptions.ecmaVersion` and `project` with tsconfig",
    ],
    keywords: ["eslint", "parsing"],
  },

  // ─── Browser storage ─────────────────────────────────────────────────────

  {
    title: "QuotaExceededError: localStorage quota",
    match: /quotaexceedederror|exceeded the quota/i,
    explanation:
      "The browser refused to store more data in `localStorage` or `sessionStorage` (per-origin limit, often ~5MB).",
    causes: [
      "Storing large blobs or logs in localStorage",
      "Never clearing old keys",
    ],
    fixes: [
      "Store large assets in IndexedDB instead",
      "Prune keys or compress payloads",
      "Catch `QuotaExceededError` and degrade gracefully",
    ],
    keywords: ["quota", "localstorage", "storage"],
  },
];

module.exports = ERROR_DB;

