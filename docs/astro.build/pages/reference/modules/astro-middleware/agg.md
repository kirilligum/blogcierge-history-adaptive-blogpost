Middleware API Reference
========================

**Added in:** `astro@2.6.0`

Middleware allows you to intercept requests and responses and inject behaviors dynamically every time a page or endpoint is about to be rendered. For features and usage examples, [see our middleware guide](/en/guides/middleware/).

Imports from `astro:middleware`
-------------------------------

[Section titled Imports from astro:middleware](#imports-from-astromiddleware)

    import {  sequence,  createContext,  trySerializeLocals,  defineMiddleware, } from 'astro:middleware';

### `defineMiddleware()`

[Section titled defineMiddleware()](#definemiddleware)

You can import and use the utility function `defineMiddleware()` to take advantage of type safety:

src/middleware.ts

    import { defineMiddleware } from "astro:middleware";
    // `context` and `next` are automatically typedexport const onRequest = defineMiddleware((context, next) => {
    });

### `sequence()`

[Section titled sequence()](#sequence)

**Type:** `(...handlers: MiddlewareHandler[]) => MiddlewareHandler`

A function that accepts middleware functions as arguments, and will execute them in the order in which they are passed.

src/middleware.js

    import { sequence } from "astro:middleware";
    async function validation(_, next) {...}async function auth(_, next) {...}async function greeting(_, next) {...}
    export const onRequest = sequence(validation, auth, greeting);

### `createContext()`

[Section titled createContext()](#createcontext)

**Type:** `(context: CreateContext) => APIContext`  

**Added in:** `astro@2.8.0`

A low-level API to create an [`APIContext`](/en/reference/api-reference/)to be passed to an Astro middleware `onRequest()` function.

This function can be used by integrations/adapters to programmatically execute the Astro middleware.

### `trySerializeLocals()`

[Section titled trySerializeLocals()](#tryserializelocals)

**Type:** `(value: unknown) => string`  

**Added in:** `astro@2.8.0`

A low-level API that takes in any value and tries to return a serialized version (a string) of it. If the value cannot be serialized, the function will throw a runtime error.

Middleware exports
------------------

[Section titled Middleware exports](#middleware-exports)

When defining your project’s middleware in `src/middleware.js`, export the following user-defined functions:

### `onRequest()`

[Section titled onRequest()](#onrequest)

**Type:** `(context: APIContext, next: MiddlewareNext) => Promise<Response> | Response | Promise<void> | void`

A required exported function from `src/middleware.js` that will be called before rendering every page or API route. It receives two arguments: [context](#context) and [next()](#next). `onRequest()` must return a `Response`: either directly, or by calling `next()`.

src/middleware.js

    export function onRequest (context, next) {    // intercept response data from a request    // optionally, transform the response    // return a Response directly, or the result of calling `next()`    return next();};

Your `onRequest()` function will be called with the following arguments:

#### `context`

[Section titled context](#context)

**Type:** `APIContext`

The first argument of `onRequest()` is a context object. It mirrors many of the `Astro` global properties.

See [Endpoint contexts](/en/reference/api-reference/) for more information about the context object.

#### `next()`

[Section titled next()](#next)

**Type:** `(rewritePayload?: string | URL | Request) => Promise<Response>`  

The second argument of `onRequest()` is a function that calls all the subsequent middleware in the chain and returns a `Response`. For example, other middleware could modify the HTML body of a response and awaiting the result of `next()` would allow your middleware to respond to those changes.

Since Astro v4.13.0, `next()` accepts an optional URL path parameter in the form of a string, `URL`, or `Request` to [rewrite](/en/guides/routing/#rewrites) the current request without retriggering a new rendering phase.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/modules/astro-middleware.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
astro:i18n](/en/reference/modules/astro-i18n/) [Next  
astro:transitions](/en/reference/modules/astro-transitions/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

