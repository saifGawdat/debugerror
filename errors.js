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
    title: "React: Cannot update a component while rendering a different component",
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
    title: "Next.js: You're importing a component that needs useState (Client Component)",
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
    match: /next\/headers.+outside.*server|was called outside a server component/i,
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
      "Add your alias to `tsconfig.json`: `{ \"paths\": { \"@/*\": [\"./src/*\"] } }`",
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
    match: /userouter.*server|invariant.*router.*not.*mounted|next\/navigation.*server/i,
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
];

module.exports = ERROR_DB;

