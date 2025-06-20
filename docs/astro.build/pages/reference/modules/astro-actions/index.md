Actions API Reference
=====================

**Added in:** `astro@4.15.0`

Actions help you build a type-safe backend you can call from client code and HTML forms. All utilities to define and call actions are exposed by the `astro:actions` module. For examples and usage instructions, [see the Actions guide](/en/guides/actions/).

Imports from `astro:actions`
----------------------------

[Section titled Imports from astro:actions](#imports-from-astroactions)

    import {  actions,  defineAction,  isInputError,  isActionError,  ActionError, } from 'astro:actions';

### `defineAction()`

[Section titled defineAction()](#defineaction)

**Added in:** `astro@4.15.0`

The `defineAction()` utility is used to define new actions from the `src/actions/index.ts` file. This accepts a [`handler()`](#handler-property) function containing the server logic to run, and an optional [`input`](#input-validator) property to validate input parameters at runtime.

src/actions/index.ts

    import { defineAction } from 'astro:actions';import { z } from 'astro:schema';
    export const server = {  getGreeting: defineAction({    input: z.object({      name: z.string(),    }),    handler: async (input, context) => {      return `Hello, ${input.name}!`    }  })}

#### `handler()` property

[Section titled handler() property](#handler-property)

**Type:** `(input, context) => any`

`defineAction()` requires a `handler()` function containing the server logic to run when the action is called. Data returned from the handler is automatically serialized and sent to the caller.

The `handler()` is called with user input as its first argument. If an [`input`](#input-validator) validator is set, the user input will be validated before being passed to the handler. The second argument is a `context` object containing most of Astro’s [standard endpoint context](/en/reference/api-reference/), excluding `getActionResult()`, `callAction()`, and `redirect()`.

Return values are parsed using the [devalue library](https://github.com/Rich-Harris/devalue). This supports JSON values and instances of `Date()`, `Map()`, `Set()`, and `URL()`.

#### `input` validator

[Section titled input validator](#input-validator)

**Type:** `ZodType | undefined`

The optional `input` property accepts a Zod validator (e.g. Zod object, Zod discriminated union) to validate handler inputs at runtime. If the action fails to validate, [a `BAD_REQUEST` error](#actionerror) is returned and the `handler` is not called.

If `input` is omitted, the `handler` will receive an input of type `unknown` for JSON requests and type `FormData` for form requests.

##### Use with `accept: 'form'`

[Section titled Use with accept: &#39;form&#39;](#use-with-accept-form)

If your action accepts form inputs, use the `z.object()` validator to automatically parse form data to a typed object. The following validators are supported for form data fields:

*   Inputs of type `number` can be validated using `z.number()`
*   Inputs of type `checkbox` can be validated using `z.coerce.boolean()`
*   Inputs of type `file` can be validated using `z.instanceof(File)`
*   Multiple inputs of the same `name` can be validated using `z.array(/* validator */)`
*   All other inputs can be validated using `z.string()`

Extension functions including `.refine()`, `.transform()`, and `.pipe()` are also supported on the `z.object()` validator.

To apply a union of different validators, use the `z.discriminatedUnion()` wrapper to narrow the type based on a specific form field. This example accepts a form submission to either “create” or “update” a user, using the form field with the name `type` to determine which object to validate against:

    import { defineAction } from 'astro:actions';import { z } from 'astro:schema';
    export const server = {  changeUser: defineAction({    accept: 'form',    input: z.discriminatedUnion('type', [      z.object({        // Matches when the `type` field has the value `create`        type: z.literal('create'),        name: z.string(),        email: z.string().email(),      }),      z.object({        // Matches when the `type` field has the value `update`        type: z.literal('update'),        id: z.number(),        name: z.string(),        email: z.string().email(),      }),    ]),    async handler(input) {      if (input.type === 'create') {        // input is { type: 'create', name: string, email: string }      } else {        // input is { type: 'update', id: number, name: string, email: string }      }    },  }),};

### `isInputError()`

[Section titled isInputError()](#isinputerror)

**Type:** `(error?: unknown | [ActionError](#actionerror)) => boolean`  

**Added in:** `astro@4.15.0`

The `isInputError()` utility is used to check whether an `ActionError` is an input validation error. When the `input` validator is a `z.object()`, input errors include a `fields` object with error messages grouped by name.

See the [form input errors guide](/en/guides/actions/#displaying-form-input-errors) for more on using `isInputError()`.

### `isActionError()`

[Section titled isActionError()](#isactionerror)

**Type:** `(error?: unknown | [ActionError](#actionerror)) => boolean`  

**Added in:** `astro@4.15.0`

The `isActionError()` utility is used to check whether your action raised an `ActionError` within the [handler property](/en/reference/modules/astro-actions/#handler-property). This is useful when narrowing the type of a generic error in a `try / catch` block.

### `ActionError`

[Section titled ActionError](#actionerror)

**Added in:** `astro@4.15.0`

The `ActionError()` constructor is used to create errors thrown by an action `handler`. This accepts a `code` property describing the error that occurred (example: `"UNAUTHORIZED"`), and an optional `message` property with further details.

#### `code`

[Section titled code](#code)

**Added in:** `astro@4.15.0`

The `code` property accepts human-readable versions of all HTTP status codes. The following codes are supported:

*   `BAD_REQUEST` (400): The client sent invalid input. This error is thrown when an action `input` validator fails to validate.
*   `UNAUTHORIZED` (401): The client lacks valid authentication credentials.
*   `FORBIDDEN` (403): The client is not authorized to access a resource.
*   `NOT_FOUND` (404): The server cannot find the requested resource.
*   `METHOD_NOT_SUPPORTED` (405): The server does not support the requested method.
*   `TIMEOUT` (408): The server timed out while processing the request.
*   `CONFLICT` (409): The server cannot update a resource due to a conflict.
*   `PRECONDITION_FAILED` (412): The server does not meet a precondition of the request.
*   `PAYLOAD_TOO_LARGE` (413): The server cannot process the request because the payload is too large.
*   `UNSUPPORTED_MEDIA_TYPE` (415): The server does not support the request’s media type. Note: Actions already check [the `Content-Type` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) for JSON and form requests, so you likely won’t need to raise this code manually.
*   `UNPROCESSABLE_CONTENT` (422): The server cannot process the request due to semantic errors.
*   `TOO_MANY_REQUESTS` (429): The server has exceeded a specified rate limit.
*   `CLIENT_CLOSED_REQUEST` (499): The client closed the request before the server could respond.
*   `INTERNAL_SERVER_ERROR` (500): The server failed unexpectedly.
*   `NOT_IMPLEMENTED` (501): The server does not support the requested feature.
*   `BAD_GATEWAY` (502): The server received an invalid response from an upstream server.
*   `SERVICE_UNAVAILABLE` (503): The server is temporarily unavailable.
*   `GATEWAY_TIMEOUT` (504): The server received a timeout from an upstream server.

#### `message`

[Section titled message](#message)

**Added in:** `astro@4.15.0`

The `message` property accepts a string. (e.g. “User must be logged in.“)

### `getActionContext()`

[Section titled getActionContext()](#getactioncontext)

**Type:** `(context: APIContext) => ActionMiddlewareContext`

**Added in:** `astro@5.0.0`

`getActionContext()` is a function called from your middleware handler to retrieve information about inbound action requests.

This function returns an `action` object with information about the request, and the `setActionResult()` and `serializeActionResult()` functions to programmatically set the value returned by `Astro.getActionResult()`.

`getActionContext()` lets you programmatically get and set action results using middleware, allowing you to persist action results from HTML forms, gate action requests with added security checks, and more.

src/middleware.ts

    import { defineMiddleware } from 'astro:middleware';import { getActionContext } from 'astro:actions';
    export const onRequest = defineMiddleware(async (context, next) => {  const { action, setActionResult, serializeActionResult } = getActionContext(context);  if (action?.calledFrom === 'form') {    const result = await action.handler();    setActionResult(action.name, serializeActionResult(result));  }  return next();});

#### `action`

[Section titled action](#action)

**Type:** `{ calledFrom: 'rpc' | 'form', name: string, handler: () => Promise<SafeResult<any, any>> } | undefined`

`action` is an object containing information about an inbound action request.

It is available from `getActionContext()`, and provides the action name, handler, and whether the action was called from an client-side RPC function (e.g. `actions.newsletter()`) or an HTML form action.

src/middleware.ts

    import { defineMiddleware } from 'astro:middleware';import { getActionContext } from 'astro:actions';
    export const onRequest = defineMiddleware(async (context, next) => {  const { action, setActionResult, serializeActionResult } = getActionContext(context);  if (action?.calledFrom === 'rpc' && action.name.startsWith('private')) {    // Check for a valid session token  }  // ...});

#### `setActionResult()`

[Section titled setActionResult()](#setactionresult)

**Type:** `(actionName: string, actionResult: SerializedActionResult) => void`

`setActionResult()` is a function to programmatically set the value returned by `Astro.getActionResult()` in middleware. It is passed the action name and an action result serialized by [`serializeActionResult()`](#serializeactionresult).

This is useful when calling actions from an HTML form to persist and load results from a session.

src/middleware.ts

    import { defineMiddleware } from 'astro:middleware';import { getActionContext } from 'astro:actions';export const onRequest = defineMiddleware(async (context, next) => {  const { action, setActionResult, serializeActionResult } = getActionContext(context);  if (action?.calledFrom === 'form') {    const result = await action.handler();    // ... handle the action result    setActionResult(action.name, serializeActionResult(result));  }  return next();});

See the [advanced sessions guide](/en/guides/actions/#advanced-persist-action-results-with-a-session) for a sample implementation using Netlify Blob.

#### `serializeActionResult()`

[Section titled serializeActionResult()](#serializeactionresult)

**Type:** `(result: SafeResult<any, any>) => SerializedActionResult`

`serializeActionResult()` will serialize an action result to JSON for persistence. This is required to properly handle non-JSON return values like `Map` or `Date` as well as the `ActionError` object.

Call this function when serializing an action result to be passed to `setActionResult()`:

src/middleware.ts

    import { defineMiddleware } from 'astro:middleware';import { getActionContext } from 'astro:actions';
    export const onRequest = defineMiddleware(async (context, next) => {  const { action, setActionResult, serializeActionResult } = getActionContext(context);  if (action) {    const result = await action.handler();    setActionResult(action.name, serializeActionResult(result));  }  // ...});

#### `deserializeActionResult()`

[Section titled deserializeActionResult()](#deserializeactionresult)

**Type:** `(result: SerializedActionResult) => SafeResult<any, any>`

`deserializeActionResult()` will reverse the effect of `serializeActionResult()` and return an action result to its original state. This is useful to access the `data` and `error` objects on a serialized action result.

### `getActionPath()`

[Section titled getActionPath()](#getactionpath)

**Type:** `(action: ActionClient<any, any, any>) => string`

**Added in:** `astro@5.1.0`

The `getActionPath()` utility accepts an action and returns a URL path so you can execute an action call as a `fetch()` operation directly. This allows you to provide details such as custom headers when you call your action. Then, you can [handle the custom-formatted returned data](/en/guides/actions/#handling-returned-data) as needed, just as if you had called an action directly.

This example shows how to call a defined `like` action passing the `Authorization` header and the [`keepalive`](https://developer.mozilla.org/en-US/docs/Web/API/Request/keepalive) option:

src/components/my-component.astro

    <script>import { actions, getActionPath } from 'astro:actions'
    await fetch(getActionPath(actions.like), {  method: 'POST',  headers: {    'Content-Type': 'application/json',    Authorization: 'Bearer YOUR_TOKEN'  },  body: JSON.stringify({ id: 'YOUR_ID' }),  keepalive: true})</script>

This example shows how to call the same `like` action using the [`sendBeacon`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) API:

src/components/my-component.astro

    <script>import { actions, getActionPath } from 'astro:actions'
    navigator.sendBeacon(  getActionPath(actions.like),  new Blob([JSON.stringify({ id: 'YOUR_ID' })], {    type: 'application/json'  }))</script>

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/modules/astro-actions.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Render context](/en/reference/api-reference/) [Next  
astro:assets](/en/reference/modules/astro-assets/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)