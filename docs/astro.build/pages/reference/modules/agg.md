# Aggregated from ./pages/reference/modules/astro-actions
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



# Aggregated from ./pages/reference/modules/astro-assets
Image and Assets API Reference
==============================

**Added in:** `astro@3.0.0`

Astro provides built-in components and helper functions for optimizing and displaying your images. For features and usage examples, [see our image guide](/en/guides/images/).

Imports from `astro:assets`
---------------------------

[Section titled Imports from astro:assets](#imports-from-astroassets)

    import {  Image,  Picture,  getImage,  inferRemoteSize, } from 'astro:assets';

### `<Image />`

[Section titled &lt;Image /&gt;](#image-)

src/components/MyComponent.astro

    ---// import the Image component and the imageimport { Image } from 'astro:assets';import myImage from "../assets/my_image.png"; // Image is 1600x900---
    <!-- `alt` is mandatory on the Image component --><Image src={myImage} alt="A description of my image." />

    <!-- Output --><!-- Image is optimized, proper attributes are enforced --><img  src="/_astro/my_image.hash.webp"  width="1600"  height="900"  decoding="async"  loading="lazy"  alt="A description of my image."/>

#### Image properties

[Section titled Image properties](#image-properties)

The `<Image />` component accepts all properties accepted by the HTML `<img>` tag in addition to the properties described below.

##### src (required)

[Section titled src (required)](#src-required)

**Type:** `ImageMetadata | string | Promise<{ default: ImageMetadata }>`

The format of the `src` value of your image file depends on where your image file is located:

*   **Local images in `src/`** - you must **also import the image** using a relative file path or configure and use an [import alias](/en/guides/imports/#aliases). Then use the import name as the `src` value:
    
    src/pages/index.astro
    
        ---import { Image } from 'astro:assets';import myImportedImage from '../assets/my-local-image.png';---<Image src={myImportedImage} alt="descriptive text" />
    
*   **Images in the `public/` folder** - use the image’s **file path relative to the public folder**:
    
    src/pages/index.astro
    
        ---import { Image } from 'astro:assets';---<Image  src="/images/my-public-image.png"  alt="descriptive text"  width="200"  height="150"/>
    
*   **Remote images** - use the image’s **full URL** as the property value:
    
    src/pages/index.astro
    
        ---import { Image } from 'astro:assets';---<Image  src="https://example.com/remote-image.jpg"  alt="descriptive text"  width="200"  height="150"/>
    

##### alt (required)

[Section titled alt (required)](#alt-required)

**Type:** `string`

Use the required `alt` attribute to provide a string of [descriptive alt text](https://www.w3.org/WAI/tutorials/images/) for images.

If an image is merely decorative (i.e. doesn’t contribute to the understanding of the page), set `alt=""` so that screen readers and other assistive technologies know to ignore the image.

##### width and height (required for images in `public/`)

[Section titled width and height (required for images in public/)](#width-and-height-required-for-images-in-public)

**Type:** `number | undefined`

These properties define the dimensions to use for the image.

When using images in their original aspect ratio, `width` and `height` are optional. These dimensions can be automatically inferred from image files located in `src/`. For remote images, add [the `inferSize` attribute set to `true`](#infersize) on the `<Image />` or `<Picture />` component or use [`inferRemoteSize()` function](#inferremotesize).

However, both of these properties are required for images stored in your `public/` folder as Astro is unable to analyze these files.

##### densities

[Section titled densities](#densities)

**Type:** ``(number | `${number}x`)[] | undefined``  

**Added in:** `astro@3.3.0`

A list of pixel densities to generate for the image.

If provided, this value will be used to generate a `srcset` attribute on the `<img>` tag. Do not provide a value for `widths` when using this value.

Densities that are equal to widths larger than the original image will be ignored to avoid upscaling the image.

src/components/MyComponent.astro

    ---import { Image } from 'astro:assets';import myImage from '../assets/my_image.png';---<Image  src={myImage}  width={myImage.width / 2}  densities={[1.5, 2]}  alt="A description of my image."/>

    <!-- Output --><img  src="/_astro/my_image.hash.webp"  srcset="    /_astro/my_image.hash.webp 1.5x    /_astro/my_image.hash.webp 2x  "  alt="A description of my image."  width="800"  height="450"  loading="lazy"  decoding="async"/>

##### widths

[Section titled widths](#widths)

**Type:** `number[] | undefined`  

**Added in:** `astro@3.3.0`

A list of widths to generate for the image.

If provided, this value will be used to generate a `srcset` attribute on the `<img>` tag. A [`sizes` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) must also be provided.

Do not provide a value for `densities` when using this value. Only one of these two values can be used to generate a `srcset`.

Widths that are larger than the original image will be ignored to avoid upscaling the image.

    ---import { Image } from 'astro:assets';import myImage from '../assets/my_image.png'; // Image is 1600x900---<Image  src={myImage}  widths={[240, 540, 720, myImage.width]}  sizes={`(max-width: 360px) 240px, (max-width: 720px) 540px, (max-width: 1600px) 720px, ${myImage.width}px`}  alt="A description of my image."/>

    <!-- Output --><img  src="/_astro/my_image.hash.webp"  srcset="    /_astro/my_image.hash.webp 240w,    /_astro/my_image.hash.webp 540w,    /_astro/my_image.hash.webp 720w,    /_astro/my_image.hash.webp 1600w  "  sizes="    (max-width: 360px) 240px,    (max-width: 720px) 540px,    (max-width: 1600px) 720px,    1600px  "  alt="A description of my image."  width="1600"  height="900"  loading="lazy"  decoding="async"/>

##### format

[Section titled format](#format)

**Type:** `ImageOutputFormat | undefined`

You can optionally state the [image file type](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#common_image_file_types) output to be used.

By default, the `<Image />` component will produce a `.webp` file.

##### quality

[Section titled quality](#quality)

**Type:** `ImageQuality | undefined`

`quality` is an optional property that can either be:

*   a preset (`low`, `mid`, `high`, `max`) that is automatically normalized between formats.
*   a number from `0` to `100` (interpreted differently between formats).

##### inferSize

[Section titled inferSize](#infersize)

**Type:** `boolean`  

**Added in:** `astro@4.4.0`

Allows you to set the original `width` and `height` of a remote image automatically.

By default, this value is set to `false` and you must manually specify both dimensions for your remote image.

Add `inferSize` to the `<Image />` component (or `inferSize: true` to `getImage()`) to infer these values from the image content when fetched. This is helpful if you don’t know the dimensions of the remote image, or if they might change:

    ---import { Image } from 'astro:assets';---<Image src="https://example.com/cat.png" inferSize alt="A cat sleeping in the sun." />

`inferSize` can fetch the dimensions of a [remote image from a domain that has not been authorized](/en/guides/images/#authorizing-remote-images), however the image itself will remain unprocessed.

### `<Picture />`

[Section titled &lt;Picture /&gt;](#picture-)

**Added in:** `astro@3.3.0`

Use the built-in `<Picture />` Astro component to display a responsive image with multiple formats and/or sizes.

src/pages/index.astro

    ---import { Picture } from 'astro:assets';import myImage from "../assets/my_image.png"; // Image is 1600x900---
    <!-- `alt` is mandatory on the Picture component --><Picture src={myImage} formats={['avif', 'webp']} alt="A description of my image." />

    <!-- Output --><picture>  <source srcset="/_astro/my_image.hash.avif" type="image/avif" />  <source srcset="/_astro/my_image.hash.webp" type="image/webp" />  <img    src="/_astro/my_image.hash.png"    width="1600"    height="900"    decoding="async"    loading="lazy"    alt="A description of my image."  /></picture>

#### Picture properties

[Section titled Picture properties](#picture-properties)

`<Picture />` accepts all the properties of [the `<Image />` component](#image-properties), plus the following:

##### `formats`

[Section titled formats](#formats)

**Type:** `ImageOutputFormat[]`

An array of image formats to use for the `<source>` tags. Entries will be added as `<source>` elements in the order they are listed, and this order determines which format is displayed. For the best performance, list the most modern format first (e.g. `webp` or `avif`). By default, this is set to `['webp']`.

##### `fallbackFormat`

[Section titled fallbackFormat](#fallbackformat)

**Type:** `ImageOutputFormat`

Format to use as a fallback value for the `<img>` tag. Defaults to `.png` for static images (or `.jpg` if the image is a JPG), `.gif` for animated images, and `.svg` for SVG files.

##### `pictureAttributes`

[Section titled pictureAttributes](#pictureattributes)

**Type:** `HTMLAttributes<'picture'>`

An object of attributes to be added to the `<picture>` tag.

Use this property to apply attributes to the outer `<picture>` element itself. Attributes applied to the `<Picture />` component directly will apply to the inner `<img>` element, except for those used for image transformation.

src/components/MyComponent.astro

    ---import { Picture } from "astro:assets";import myImage from "../my_image.png"; // Image is 1600x900---
    <Picture  src={myImage}  alt="A description of my image."  pictureAttributes={{ style: "background-color: red;" }}/>

    <!-- Output --><picture style="background-color: red;">  <source srcset="/_astro/my_image.hash.webp" type="image/webp" />  <img    src="/_astro/my_image.hash.png"    alt="A description of my image."    width="1600"    height="900"    loading="lazy"    decoding="async"  /></picture>

### `getImage()`

[Section titled getImage()](#getimage)

**Type:** `(options: UnresolvedImageTransform) => Promise<GetImageResult>`

Caution

`getImage()` relies on server-only APIs and breaks the build when used on the client.

The `getImage()` function is intended for generating images destined to be used somewhere else than directly in HTML, for example in an [API Route](/en/guides/endpoints/#server-endpoints-api-routes). It also allows you to create your own custom `<Image />` component.

`getImage()` takes an options object with the [same properties as the Image component](#image-properties) (except `alt`).

    ---import { getImage } from "astro:assets";import myBackground from "../background.png"
    const optimizedBackground = await getImage({src: myBackground, format: 'avif'})---
    <div style={`background-image: url(${optimizedBackground.src});`}></div>

It returns an object with the following type:

    type GetImageResult = {  /* Additional HTML attributes needed to render the image (width, height, style, etc..) */  attributes: Record<string, any>;  /* Validated parameters passed */  options: ImageTransform;  /* Original parameters passed */  rawOptions: ImageTransform;  /* Path to the generated image */  src: string;  srcSet: {    /* Generated values for srcset, every entry has a url and a size descriptor */    values: SrcSetValue[];    /* A value ready to use in`srcset` attribute */    attribute: string;  };}

### inferRemoteSize()

[Section titled inferRemoteSize()](#inferremotesize)

**Type:** `(url: string) => Promise<Omit<ImageMetadata, 'src' | 'fsPath'>>`  

**Added in:** `astro@4.12.0`

A function to infer the dimensions of remote images. This can be used as an alternative to passing the `inferSize` property.

    import { inferRemoteSize } from 'astro:assets';const {width, height} = await inferRemoteSize("https://example.com/cat.png");

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/modules/astro-assets.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
astro:actions](/en/reference/modules/astro-actions/) [Next  
astro:config](/en/reference/modules/astro-config/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/modules/astro-config
Config imports API Reference
============================

**Added in:** `astro@5.7.0`

This virtual module `astro:config` exposes a non-exhaustive, serializable, type-safe version of the Astro configuration. There are two submodules for accessing different subsets of your configuration values: [`/client`](#imports-from-astroconfigclient) and [`/server`](#imports-from-astroconfigserver).

All available config values can be accessed from `astro:config/server`. However, for code executed on the client, only those values exposed by `astro:config/client` will be available. This protects your information by only making some data available to the client.

Imports from `astro:config/client`
----------------------------------

[Section titled Imports from astro:config/client](#imports-from-astroconfigclient)

    import {  i18n,  trailingSlash,  base,  build,  site,} from "astro:config/client";

Use this submodule for client-side code:

src/utils.js

    import { trailingSlash } from "astro:config/client";
    function addForwardSlash(path) {  if (trailingSlash === "always") {    return path.endsWith("/") ? path : path + "/"  } else {    return path  }}

See more about the configuration imports available from `astro:config/client`:

*   [`i18n`](/en/reference/configuration-reference/#i18n)
*   [`trailingSlash`](/en/reference/configuration-reference/#trailingslash)
*   [`base`](/en/reference/configuration-reference/#base)
*   [`build.format`](/en/reference/configuration-reference/#buildformat)
*   [`site`](/en/reference/configuration-reference/#site)

Imports from `astro:config/server`
----------------------------------

[Section titled Imports from astro:config/server](#imports-from-astroconfigserver)

    import {  i18n,  trailingSlash,  base,  build,  site,  srcDir,  cacheDir,  outDir,  publicDir,  root,} from "astro:config/server";

These imports include everything available from `astro:config/client` as well as additional sensitive information about your file system configuration that is not safe to expose to the client.

Use this submodule for server side code:

astro.config.mjs

    import { integration } from "./integration.mjs";
    export default defineConfig({    integrations: [      integration(),    ]});

integration.mjs

    import { outDir } from "astro:config/server";import { writeFileSync } from "node:fs";import { fileURLToPath } from "node:url";
    export default function() {  return {    name: "internal-integration",    hooks: {      "astro:build:done": () => {        let file = new URL("result.json", outDir);        // generate data from some operation        let data = JSON.stringify([]);        writeFileSync(fileURLToPath(file), data, "utf-8");      }    }  }}

See more about the configuration imports available from `astro:config/server`:

*   [`i18n`](/en/reference/configuration-reference/#i18n)
*   [`trailingSlash`](/en/reference/configuration-reference/#trailingslash)
*   [`base`](/en/reference/configuration-reference/#base)
*   [`build.format`](/en/reference/configuration-reference/#buildformat)
*   [`build.client`](/en/reference/configuration-reference/#buildclient)
*   [`build.server`](/en/reference/configuration-reference/#buildserver)
*   [`build.serverEntry`](/en/reference/configuration-reference/#buildserverentry)
*   [`build.assetsPrefix`](/en/reference/configuration-reference/#buildassetsprefix)
*   [`site`](/en/reference/configuration-reference/#site)
*   [`srcDir`](/en/reference/configuration-reference/#srcdir)
*   [`cacheDir`](/en/reference/configuration-reference/#cachedir)
*   [`outDir`](/en/reference/configuration-reference/#outdir)
*   [`publicDir`](/en/reference/configuration-reference/#publicdir)
*   [`root`](/en/reference/configuration-reference/#root)

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/modules/astro-config.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
astro:assets](/en/reference/modules/astro-assets/) [Next  
astro:content](/en/reference/modules/astro-content/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/modules/astro-content
Content Collections API Reference
=================================

**Added in:** `astro@2.0.0`

Content collections offer APIs to configure and query your Markdown or MDX documents in `src/content/`. For features and usage examples, [see our content collections guide](/en/guides/content-collections/).

Imports from `astro:content`
----------------------------

[Section titled Imports from astro:content](#imports-from-astrocontent)

    import {  z,  defineCollection,  getCollection,  getEntry,  getEntries,  reference,  render } from 'astro:content';

### `defineCollection()`

[Section titled defineCollection()](#definecollection)

**Type:** `(input: CollectionConfig) => CollectionConfig`

**Added in:** `astro@2.0.0`

`defineCollection()` is a utility to configure a collection in a `src/content.config.*` file.

src/content.config.ts

    import { z, defineCollection } from 'astro:content';import { glob } from 'astro/loaders';
    const blog = defineCollection({  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),  schema: z.object({    title: z.string(),    permalink: z.string().optional(),  }),});
    // Expose your defined collection to Astro// with the `collections` exportexport const collections = { blog };

This function accepts the following properties:

#### `loader`

[Section titled loader](#loader)

**Type:** `() => Promise<Array<{ id: string, [key: string]: any }> | Record<string, Record<string, any>>> | [Loader](/en/reference/content-loader-reference/#object-loader-api)`

**Added in:** `astro@5.0.0`

A `loader` is either an object or a function that allows you to load data from any source, local or remote, into content collections.

[See the `Content Collection` guide](/en/guides/content-collections/#defining-the-collection-loader) for example usage.

#### `schema`

[Section titled schema](#schema)

**Type:** `ZodType | (context: [SchemaContext](#schemacontext)) => ZodType`

**Added in:** `astro@2.0.0`

`schema` is an optional Zod object to configure the type and shape of document frontmatter for a collection. Each value must use [a Zod validator](https://github.com/colinhacks/zod).

[See the `Content Collection` guide](/en/guides/content-collections/#defining-the-collection-schema) for example usage.

### `reference()`

[Section titled reference()](#reference)

**Type:** `(collection: string) => ZodEffects<ZodString, { collection, id: string }>`  

**Added in:** `astro@2.5.0`

The `reference()` function is used in the content config to define a relationship, or “reference,” from one collection to another. This accepts a collection name and transforms the reference into an object containing the collection name and the reference id.

This example defines references from a blog author to the `authors` collection and an array of related posts to the same `blog` collection:

    import { defineCollection, reference, z } from 'astro:content';import { glob, file } from 'astro/loaders';
    const blog = defineCollection({  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),  schema: z.object({    // Reference a single author from the `authors` collection by `id`    author: reference('authors'),    // Reference an array of related posts from the `blog` collection by `slug`    relatedPosts: z.array(reference('blog')),  })});
    const authors = defineCollection({  loader: file("src/data/authors.json"),  schema: z.object({ /* ... */ })});
    export const collections = { blog, authors };

Validation of referenced entries happens at runtime when using `getEntry()` or `getEntries()`:

src/pages/\[posts\].astro

    // if a referenced entry is invalid, this will return undefined.const relatedPosts = await getEntries(blogPost.data.relatedPosts);

[See the `Content Collection` guide](/en/guides/content-collections/#defining-collection-references) for example usage.

### `getCollection()`

[Section titled getCollection()](#getcollection)

**Type:** `(collection: string, filter?: (entry: CollectionEntry<collection>) => boolean) => CollectionEntry<collection>[]`

**Added in:** `astro@2.0.0`

`getCollection()` is a function that retrieves a list of content collection entries by collection name.

It returns all items in the collection by default, and accepts an optional `filter` function to narrow by entry properties. This allows you to query for only some items in a collection based on `id` or frontmatter values via the `data` object.

    ---import { getCollection } from 'astro:content';
    // Get all `src/content/blog/` entriesconst allBlogPosts = await getCollection('blog');
    // Only return posts with `draft: true` in the frontmatterconst draftBlogPosts = await getCollection('blog', ({ data }) => {  return data.draft === true;});---

[See the `Content Collection` guide](/en/guides/content-collections/#querying-collections) for example usage.

### `getEntry()`

[Section titled getEntry()](#getentry)

**Types:**

*   `(collection: string, id: string) => Promise<CollectionEntry<collection> | undefined>`
*   `({ collection: string, id: string }) => Promise<CollectionEntry<collection> | undefined>`

**Added in:** `astro@2.5.0`

`getEntry()` is a function that retrieves a single collection entry by collection name and the entry `id`. `getEntry()` can also be used to get referenced entries to access the `data` or `body` properties:

    ---import { getEntry } from 'astro:content';
    // Get `src/content/blog/enterprise.md`const enterprisePost = await getEntry('blog', 'enterprise');
    // Get `src/content/captains/picard.json`const picardProfile = await getEntry('captains', 'picard');
    // Get the profile referenced by `data.captain`const enterpriseCaptainProfile = await getEntry(enterprisePost.data.captain);---

See the `Content Collections` guide for examples of [querying collection entries](/en/guides/content-collections/#querying-collections).

### `getEntries()`

[Section titled getEntries()](#getentries)

**Type:** `(Array<{ collection: string, id: string }>) => Array<CollectionEntry<collection>>`

**Added in:** `astro@2.5.0`

`getEntries()` is a function that retrieves multiple collection entries from the same collection. This is useful for [returning an array of referenced entries](/en/guides/content-collections/#defining-collection-references) to access their associated `data` and `body` properties.

    ---import { getEntries, getEntry } from 'astro:content';
    const enterprisePost = await getEntry('blog', 'enterprise');
    // Get related posts referenced by `data.relatedPosts`const enterpriseRelatedPosts = await getEntries(enterprisePost.data.relatedPosts);---

### `render()`

[Section titled render()](#render)

**Type:** `(entry: CollectionEntry) => Promise<RenderedEntry>`

**Added in:** `astro@5.0.0`

A function to compile a given entry for rendering. This returns the following properties:

*   `<Content />` - A component used to render the document’s contents in an Astro file.
*   `headings` - A generated list of headings, [mirroring Astro’s `getHeadings()` utility](/en/guides/markdown-content/#available-properties) on Markdown and MDX imports.
*   `remarkPluginFrontmatter` \- The modified frontmatter object after any [remark or rehype plugins have been applied](/en/guides/markdown-content/#modifying-frontmatter-programmatically). Set to type `any`.

    ---import { getEntry, render } from 'astro:content';const entry = await getEntry('blog', 'entry-1');
    if (!entry) {   // Handle Error, for example:  throw new Error('Could not find blog post 1');}const { Content, headings, remarkPluginFrontmatter } = await render(entry);---

[See the `Content Collection` guide](/en/guides/content-collections/#rendering-body-content) for example usage.

`astro:content` types
---------------------

[Section titled astro:content types](#astrocontent-types)

    import type {  CollectionEntry,  CollectionKey,  ContentCollectionKey,  DataCollectionKey,  SchemaContext, } from 'astro:content';

### `CollectionEntry`

[Section titled CollectionEntry](#collectionentry)

Query functions including [`getCollection()`](#getcollection), [`getEntry()`](#getentry), and [`getEntries()`](#getentries) each return entries with the `CollectionEntry` type. This type is available as a utility from `astro:content`:

    import type { CollectionEntry } from 'astro:content';

`CollectionEntry` is a generic type. Use it with the name of the collection you’re querying. For example, an entry in your `blog` collection would have the type `CollectionEntry<'blog'>`.

Each `CollectionEntry` is an object with the following values:

#### `id`

[Section titled id](#id)

**Type:** `string`

A unique ID. Note that all IDs from Astro’s built-in `glob()` loader are slugified.

#### `collection`

[Section titled collection](#collection)

**Example Type:** `'blog' | 'authors' | ...`

The name of a collection in which entries are located. This is the name used to reference the collection in your schema, and in querying functions.

#### `data`

[Section titled data](#data)

**Type:** `CollectionSchema<TCollectionName>`

An object of frontmatter properties inferred from your collection schema ([see `defineCollection()` reference](#definecollection)). Defaults to `any` if no schema is configured.

#### `body`

[Section titled body](#body)

**Type:** `string`

A string containing the raw, uncompiled body of the Markdown or MDX document.

### `CollectionKey`

[Section titled CollectionKey](#collectionkey)

**Added in:** `astro@3.1.0`

A string union of all collection names defined in your `src/content.config.*` file. This type can be useful when defining a generic function wrapping the built-in `getCollection()`.

    import { type CollectionKey, getCollection } from 'astro:content';
    async function queryCollection(collection: CollectionKey) {  return getCollection(collection, ({ data }) => {    return data.draft !== true;  });}

### `SchemaContext`

[Section titled SchemaContext](#schemacontext)

The `context` object that `defineCollection` uses for the function shape of `schema`. This type can be useful when building reusable schemas for multiple collections.

This includes the following property:

*   `image` - The `image()` schema helper that allows you [to use local images in Content Collections](/en/guides/images/#images-in-content-collections)

    import { defineCollection, z, type SchemaContext } from "astro:content";
    export const imageSchema = ({ image }: SchemaContext) =>    z.object({        image: image(),        description: z.string().optional(),    });
    const blog = defineCollection({  loader: /* ... */,  schema: ({ image }) => z.object({    title: z.string(),    permalink: z.string().optional(),    image: imageSchema({ image })  }),});

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/modules/astro-content.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
astro:config](/en/reference/modules/astro-config/) [Next  
astro:env](/en/reference/modules/astro-env/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/modules/astro-env
Environment Variables API Reference
===================================

**Added in:** `astro@5.0.0`

The `astro:env` API lets you configure a type-safe schema for environment variables you have set. This allows you to indicate whether they should be available on the server or the client, and define their data type and additional properties. For examples and usage instructions, [see the `astro:env` guide](/en/guides/environment-variables/#type-safe-environment-variables).

Imports from `astro:env`
------------------------

[Section titled Imports from astro:env](#imports-from-astroenv)

    import {  getSecret, } from 'astro:env/server';

### `getSecret()`

[Section titled getSecret()](#getsecret)

**Added in:** `astro@5.0.0`

The `getSecret()` helper function allows retrieving the raw value of an environment variable by its key.

For example, you can retrieve a boolean value as a string:

    import {  FEATURE_FLAG, // boolean  getSecret} from 'astro:env/server'
    getSecret('FEATURE_FLAG') // string | undefined

This can also be useful to get a secret not defined in your schema, for example one that depends on dynamic data from a database or API.

If you need to retrieve environment variables programmatically, we recommend using `getSecret()` instead of `process.env` (or equivalent). Because its implementation is provided by your adapter, you won’t need to update all your calls if you switch adapters. It defaults to `process.env` in dev and build.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/modules/astro-env.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
astro:content](/en/reference/modules/astro-content/) [Next  
astro:i18n](/en/reference/modules/astro-i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/modules/astro-i18n
Internationalization API Reference
==================================

**Added in:** `astro@3.5.0`

This module provides functions to help you create URLs using your project’s configured locales.

Creating routes for your project with the i18n router will depend on certain configuration values you have set that affect your page routes. When creating routes with these functions, be sure to take into account your individual settings for:

*   [`base`](/en/reference/configuration-reference/#base)
*   [`trailingSlash`](/en/reference/configuration-reference/#trailingslash)
*   [`build.format`](/en/reference/configuration-reference/#buildformat)
*   [`site`](/en/reference/configuration-reference/#site)

Also, note that the returned URLs created by these functions for your `defaultLocale` will reflect your `i18n.routing` configuration.

For features and usage examples, [see our i18n routing guide](/en/guides/internationalization/).

Imports from `astro:i18n`
-------------------------

[Section titled Imports from astro:i18n](#imports-from-astroi18n)

    import {  getRelativeLocaleUrl,  getAbsoluteLocaleUrl,  getRelativeLocaleUrlList,  getAbsoluteLocaleUrlList,  getPathByLocale,  getLocaleByPath,  redirectToDefaultLocale,  redirectToFallback,  notFound,  middleware,  requestHasLocale, } from 'astro:i18n';

### `getRelativeLocaleUrl()`

[Section titled getRelativeLocaleUrl()](#getrelativelocaleurl)

**Type:** `(locale: string, path?: string, options?: GetLocaleOptions) => string`

Use this function to retrieve a relative path for a locale. If the locale doesn’t exist, Astro throws an error.

    ---import { getRelativeLocaleUrl } from 'astro:i18n';
    getRelativeLocaleUrl("fr");// returns /fr
    getRelativeLocaleUrl("fr", "");// returns /fr/
    getRelativeLocaleUrl("fr", "getting-started");// returns /fr/getting-started
    getRelativeLocaleUrl("fr_CA", "getting-started", {  prependWith: "blog"});// returns /blog/fr-ca/getting-started
    getRelativeLocaleUrl("fr_CA", "getting-started", {  prependWith: "blog",  normalizeLocale: false});// returns /blog/fr_CA/getting-started---

### `getAbsoluteLocaleUrl()`

[Section titled getAbsoluteLocaleUrl()](#getabsolutelocaleurl)

**Type:** `(locale: string, path?: string, options?: GetLocaleOptions) => string`

Use this function to retrieve an absolute path for a locale when \[`site`\] has a value. If \[`site`\] isn’t configured, the function returns a relative URL. If the locale doesn’t exist, Astro throws an error.

src/pages/index.astro

    ---import { getAbsoluteLocaleUrl } from 'astro:i18n';
    // If `site` is set to be `https://example.com`
    getAbsoluteLocaleUrl("fr");// returns https://example.com/fr
    getAbsoluteLocaleUrl("fr", "");// returns https://example.com/fr/
    getAbsoluteLocaleUrl("fr", "getting-started");// returns https://example.com/fr/getting-started
    getAbsoluteLocaleUrl("fr_CA", "getting-started", {  prependWith: "blog"});// returns https://example.com/blog/fr-ca/getting-started
    getAbsoluteLocaleUrl("fr_CA", "getting-started", {  prependWith: "blog",  normalizeLocale: false});// returns https://example.com/blog/fr_CA/getting-started---

### `getRelativeLocaleUrlList()`

[Section titled getRelativeLocaleUrlList()](#getrelativelocaleurllist)

**Type:** `(path?: string, options?: GetLocaleOptions) => string[]`

Use this like [`getRelativeLocaleUrl`](#getrelativelocaleurl) to return a list of relative paths for all the locales.

### `getAbsoluteLocaleUrlList()`

[Section titled getAbsoluteLocaleUrlList()](#getabsolutelocaleurllist)

**Type:** `(path?: string, options?: GetLocaleOptions) => string[]`

Use this like [`getAbsoluteLocaleUrl`](/en/guides/internationalization/#custom-locale-paths) to return a list of absolute paths for all the locales.

### `getPathByLocale()`

[Section titled getPathByLocale()](#getpathbylocale)

**Type:** `(locale: string) => string`

A function that returns the `path` associated to one or more `codes` when [custom locale paths](/en/guides/internationalization/#custom-locale-paths) are configured.

astro.config.mjs

    export default defineConfig({  i18n: {    locales: ["es", "en", {      path: "french",      codes: ["fr", "fr-BR", "fr-CA"]    }]  }})

src/pages/index.astro

    ---import { getPathByLocale } from 'astro:i18n';
    getPathByLocale("fr"); // returns "french"getPathByLocale("fr-CA"); // returns "french"---

### `getLocaleByPath()`

[Section titled getLocaleByPath()](#getlocalebypath)

**Type:** `(path: string) => string`

A function that returns the `code` associated to a locale `path`.

astro.config.mjs

    export default defineConfig({  i18n: {    locales: ["es", "en", {      path: "french",      codes: ["fr", "fr-BR", "fr-CA"]    }]  }})

src/pages/index.astro

    ---import { getLocaleByPath } from 'astro:i18n';
    getLocaleByPath("french"); // returns "fr" because that's the first code configured---

### `redirectToDefaultLocale()`

[Section titled redirectToDefaultLocale()](#redirecttodefaultlocale)

**Type:** `(context: APIContext, statusCode?: ValidRedirectStatus) => Promise<Response>`  

**Added in:** `astro@4.6.0`

Note

Available only when `i18n.routing` is set to `"manual"`

A function that returns a `Response` that redirects to the `defaultLocale` configured. It accepts an optional valid redirect status code.

middleware.js

    import { defineMiddleware } from "astro:middleware";import { redirectToDefaultLocale } from "astro:i18n";
    export const onRequest = defineMiddleware((context, next) => {  if (context.url.pathname.startsWith("/about")) {    return next();  } else {    return redirectToDefaultLocale(context, 302);  }})

### `redirectToFallback()`

[Section titled redirectToFallback()](#redirecttofallback)

**Type:** `(context: APIContext, response: Response) => Promise<Response>`  

**Added in:** `astro@4.6.0`

Note

Available only when `i18n.routing` is set to `"manual"`

A function that allows you to use your [`i18n.fallback` configuration](/en/reference/configuration-reference/#i18nfallback) in your own middleware.

middleware.js

    import { defineMiddleware } from "astro:middleware";import { redirectToFallback } from "astro:i18n";
    export const onRequest = defineMiddleware(async (context, next) => {  const response = await next();  if (response.status >= 300) {    return redirectToFallback(context, response)  }  return response;})

### `notFound()`

[Section titled notFound()](#notfound)

**Type:** `(context: APIContext, response?: Response) => Promise<Response> | undefined`  

**Added in:** `astro@4.6.0`

Note

Available only when `i18n.routing` is set to `"manual"`

Use this function in your routing middleware to return a 404 when:

*   the current path isn’t a root. e.g. `/` or `/<base>`
*   the URL doesn’t contain a locale

When a `Response` is passed, the new `Response` emitted by this function will contain the same headers of the original response.

middleware.js

    import { defineMiddleware } from "astro:middleware";import { notFound } from "astro:i18n";
    export const onRequest = defineMiddleware((context, next) => {  const pathNotFound = notFound(context);  if (pathNotFound) {    return pathNotFound;  }  return next();})

### `middleware()`

[Section titled middleware()](#middleware)

**Type:** `(options: { prefixDefaultLocale: boolean, redirectToDefaultLocale: boolean }) => MiddlewareHandler`  

**Added in:** `astro@4.6.0`

Note

Available only when `i18n.routing` is set to `"manual"`

A function that allows you to programmatically create the Astro i18n middleware.

This is useful when you still want to use the default i18n logic, but add only a few exceptions to your website.

middleware.js

    import { middleware } from "astro:i18n";import { sequence, defineMiddleware } from "astro:middleware";
    const customLogic = defineMiddleware(async (context, next) => {  const response = await next();
      // Custom logic after resolving the response.  // It's possible to catch the response coming from Astro i18n middleware.
      return response;});
    export const onRequest = sequence(customLogic, middleware({  prefixDefaultLocale: true,  redirectToDefaultLocale: false}))

### `requestHasLocale()`

[Section titled requestHasLocale()](#requesthaslocale)

**Type:** `(context: APIContext) => boolean`  

**Added in:** `astro@4.6.0`

Note

Available only when `i18n.routing` is set to `"manual"`

Checks whether the current URL contains a configured locale. Internally, this function will use `APIContext#url.pathname`.

middleware.js

    import { defineMiddleware } from "astro:middleware";import { requestHasLocale } from "astro:i18n";
    export const onRequest = defineMiddleware(async (context, next) => {  if (requestHasLocale(context)) {    return next();  }  return new Response("Not found", { status: 404 });})

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/modules/astro-i18n.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
astro:env](/en/reference/modules/astro-env/) [Next  
astro:middleware](/en/reference/modules/astro-middleware/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/modules/astro-middleware
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



# Aggregated from ./pages/reference/modules/astro-transitions
View Transitions Router API Reference
=====================================

**Added in:** `astro@3.0.0`

These modules provide functions to control and interact with the View Transitions API and client-side router.

Note

This API is compatible with the `<ClientRouter />` included in `astro:transitions`, but can’t be used with native browser MPA routing.

For features and usage examples, [see our View Transitions guide](/en/guides/view-transitions/).

Imports from `astro:transitions`
--------------------------------

[Section titled Imports from astro:transitions](#imports-from-astrotransitions)

    import { ClientRouter, fade, slide } from 'astro:transitions';

### `<ClientRouter />`

[Section titled &lt;ClientRouter /&gt;](#clientrouter-)

**Added in:** `astro@3.0.0`

Opt in to using view transitions on individual pages by importing and adding the `<ClientRouter />` routing component to `<head>` on every desired page.

src/pages/index.astro

    ---import { ClientRouter } from 'astro:transitions';---<html lang="en">  <head>    <title>My Homepage</title>    <ClientRouter />  </head>  <body>    <h1>Welcome to my website!</h1>  </body></html>

See more about how to [control the router](/en/guides/view-transitions/#router-control) and [add transition directives](/en/guides/view-transitions/#transition-directives) to page elements and components.

### `fade`

[Section titled fade](#fade)

**Type:** `(opts: { duration?: string | number }) => TransitionDirectionalAnimations`

**Added in:** `astro@3.0.0`

Utility function to support customizing the duration of the built-in `fade` animation.

    ---import { fade } from 'astro:transitions';---
    <!-- Fade transition with the default duration --><div transition:animate="fade" />
    <!-- Fade transition with a duration of 400 milliseconds --><div transition:animate={fade({ duration: '0.4s' })} />

### `slide`

[Section titled slide](#slide)

**Type:** `(opts: { duration?: string | number }) => TransitionDirectionalAnimations`

**Added in:** `astro@3.0.0`

Utility function to support customizing the duration of the built-in `slide` animation.

    ---import { slide } from 'astro:transitions';---
    <!-- Slide transition with the default duration --><div transition:animate="slide" />
    <!-- Slide transition with a duration of 400 milliseconds --><div transition:animate={slide({ duration: '0.4s' })} />

Imports from `astro:transitions/client`
---------------------------------------

[Section titled Imports from astro:transitions/client](#imports-from-astrotransitionsclient)

    <script>  import {    navigate,    supportsViewTransitions,    transitionEnabledOnThisPage,    getFallback,    swapFunctions,  } from 'astro:transitions/client';</script>

### `navigate()`

[Section titled navigate()](#navigate)

**Type:** `(href: string, options?: Options) => void`  

**Added in:** `astro@3.2.0`

A function that executes a navigation to the given `href` using the View Transitions API.

This function signature is based on the [`navigate` function from the browser Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate). Although based on the Navigation API, this function is implemented on top of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to allow for navigation without reloading the page.

#### `history` option

[Section titled history option](#history-option)

**Type:** `'auto' | 'push' | 'replace'`  
**Default:** `'auto'`  

**Added in:** `astro@3.2.0`

Defines how this navigation should be added to the browser history.

*   `'push'`: the router will use `history.pushState` to create a new entry in the browser history.
*   `'replace'`: the router will use `history.replaceState` to update the URL without adding a new entry into navigation.
*   `'auto'` (default): the router will attempt `history.pushState`, but if the URL cannot be transitioned to, the current URL will remain with no changes to the browser history.

This option follows the [`history` option](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate#history) from the browser Navigation API but simplified for the cases that can happen on an Astro project.

#### `formData` option

[Section titled formData option](#formdata-option)

**Type:** `FormData`  

**Added in:** `astro@3.5.0`

A `FormData` object for `POST` requests.

When this option is provided, the requests to the navigation target page will be sent as a `POST` request with the form data object as the content.

Submitting an HTML form with view transitions enabled will use this method instead of the default navigation with page reload. Calling this method allows triggering the same behavior programmatically.

#### `info` option

[Section titled info option](#info-option)

**Type:** `any`  

**Added in:** `astro@3.6.0`

Arbitrary data to be included in the `astro:before-preparation` and `astro:before-swap` events caused by this navigation.

This option mimics the [`info` option](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate#info) from the browser Navigation API.

#### `state` option

[Section titled state option](#state-option)

**Type:** `any`  

**Added in:** `astro@3.6.0`

Arbitrary data to be associated with the `NavitationHistoryEntry` object created by this navigation. This data can then be retrieved using the [`history.getState` function](https://developer.mozilla.org/en-US/docs/Web/API/NavigationHistoryEntry/getState) from the History API.

This option mimics the [`state` option](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate#state) from the browser Navigation API.

#### `sourceElement` option

[Section titled sourceElement option](#sourceelement-option)

**Type:** `Element`  

**Added in:** `astro@3.6.0`

The element that triggered this navigation, if any. This element will be available in the following events:

*   `astro:before-preparation`
*   `astro:before-swap`

### `supportsViewTransitions`

[Section titled supportsViewTransitions](#supportsviewtransitions)

**Type:** `boolean`  

**Added in:** `astro@3.2.0`

Whether or not view transitions are supported and enabled in the current browser.

### `transitionEnabledOnThisPage`

[Section titled transitionEnabledOnThisPage](#transitionenabledonthispage)

**Type:** `boolean`  

**Added in:** `astro@3.2.0`

Whether or not the current page has view transitions enabled for client-side navigation. This can be used to make components that behave differently when they are used on pages with view transitions.

### `getFallback()`

[Section titled getFallback()](#getfallback)

**Type:** `() => 'none' | 'animate' | 'swap'`  

**Added in:** `astro@3.6.0`

Returns the fallback strategy to use in browsers that do not support view transitions.

See the guide on [Fallback control](/en/guides/view-transitions/#fallback-control) for how to choose and configure the fallback behavior.

### `swapFunctions`

[Section titled swapFunctions](#swapfunctions)

**Added in:** `astro@4.15.0`

An object containing the utility functions used to build Astro’s default swap function. These can be useful when [building a custom swap function](/en/guides/view-transitions/#building-a-custom-swap-function).

`swapFunctions` provides the following methods:

#### `deselectScripts()`

[Section titled deselectScripts()](#deselectscripts)

**Type:** `(newDocument: Document) => void`

Marks scripts in the new document that should not be executed. Those scripts are already in the current document and are not flagged for re-execution using [`data-astro-rerun`](/en/guides/view-transitions/#data-astro-rerun).

#### `swapRootAttributes()`

[Section titled swapRootAttributes()](#swaprootattributes)

**Type:** `(newDocument: Document) => void`

Swaps the attributes between the document roots, like the `lang` attribute. This also includes Astro-injected internal attributes like `data-astro-transition`, which makes the transition direction available to Astro-generated CSS rules.

When making a custom swap function, it is important to call this function so as not to break the view transition’s animations.

#### `swapHeadElements()`

[Section titled swapHeadElements()](#swapheadelements)

**Type:** `(newDocument: Document) => void`

Removes every element from the current document’s `<head>` that is not persisted to the new document. Then appends all new elements from the new document’s `<head>` to the current document’s `<head>`.

#### `saveFocus()`

[Section titled saveFocus()](#savefocus)

**Type:** `() => () => void`

Stores the element in focus on the current page and returns a function that when called, if the focused element was persisted, returns the focus to it.

#### `swapBodyElement()`

[Section titled swapBodyElement()](#swapbodyelement)

**Type:** `(newBody: Element, oldBody: Element) => void`

Replaces the old body with the new body. Then, goes through every element in the old body that should be persisted and have a matching element in the new body and swaps the old element back in place.

Lifecycle events
----------------

[Section titled Lifecycle events](#lifecycle-events)

### `astro:before-preparation` event

[Section titled astro:before-preparation event](#astrobefore-preparation-event)

An event dispatched at the beginning of a navigation using the View Transitions router. This event happens before any request is made and any browser state is changed.

This event has the attributes:

*   [`info`](#info)
*   [`sourceElement`](#sourceelement)
*   [`navigationType`](#navigationtype)
*   [`direction`](#direction)
*   [`from`](#from)
*   [`to`](#to)
*   [`formData`](#formdata)
*   [`loader()`](#loader)

Read more about how to use this event on the [View Transitions guide](/en/guides/view-transitions/#astrobefore-preparation).

### `astro:after-preparation` event

[Section titled astro:after-preparation event](#astroafter-preparation-event)

An event dispatched after the next page in a navigation using View Transitions router is loaded.

This event has no attributes.

Read more about how to use this event on the [View Transitions guide](/en/guides/view-transitions/#astroafter-preparation).

### `astro:before-swap` event

[Section titled astro:before-swap event](#astrobefore-swap-event)

An event dispatched after the next page is parsed, prepared, and linked into a document in preparation for the transition but before any content is swapped between the documents.

This event can’t be canceled. Calling `preventDefault()` is a no-op.

This event has the attributes:

*   [`info`](#info)
*   [`sourceElement`](#sourceelement)
*   [`navigationType`](#navigationtype)
*   [`direction`](#direction)
*   [`from`](#from)
*   [`to`](#to)
*   [`viewTransition`](#viewtransition)
*   [`swap()`](#swap)

Read more about how to use this event on the [View Transitions guide](/en/guides/view-transitions/#astrobefore-swap).

### `astro:after-swap` event

[Section titled astro:after-swap event](#astroafter-swap-event)

An event dispatched after the contents of the page have been swapped but before the view transition ends.

The history entry and scroll position have already been updated when this event is triggered.

### `astro:page-load` event

[Section titled astro:page-load event](#astropage-load-event)

An event dispatched after a page completes loading, whether from a navigation using view transitions or native to the browser.

When view transitions is enabled on the page, code that would normally execute on `DOMContentLoaded` should be changed to execute on this event.

### Lifecycle events attributes

[Section titled Lifecycle events attributes](#lifecycle-events-attributes)

**Added in:** `astro@3.6.0`

#### `info`

[Section titled info](#info)

**Type:** `URL`

Arbitrary data defined during navigation.

This is the literal value passed on the [`info` option](#info-option) of the [`navigate()` function](#navigate).

#### `sourceElement`

[Section titled sourceElement](#sourceelement)

**Type:** `Element | undefined`

The element that triggered the navigation. This can be, for example, an `<a>` element that was clicked.

When using the [`navigate()` function](#navigate), this will be the element specified in the call.

#### `newDocument`

[Section titled newDocument](#newdocument)

**Type:** `Document`

The document for the next page in the navigation. The contents of this document will be swapped in place of the contents of the current document.

#### `navigationType`

[Section titled navigationType](#navigationtype)

**Type:** `'push' | 'replace' | 'traverse'`

Which kind of history navigation is happening.

*   `push`: a new `NavigationHistoryEntry` is being created for the new page.
*   `replace`: the current `NavigationHistoryEntry` is being replaced with an entry for the new page.
*   `traverse`: no `NavigationHistoryEntry` is created. The position in the history is changing. The direction of the traversal is given on the [`direction` attribute](#direction)

#### `direction`

[Section titled direction](#direction)

**Type:** `Direction`

The direction of the transition.

*   `forward`: navigating to the next page in the history or to a new page.
*   `back`: navigating to the previous page in the history.
*   Anything else some other listener might have set.

#### `from`

[Section titled from](#from)

**Type:** `URL`

The URL of the page initiating the navigation.

#### `to`

[Section titled to](#to)

**Type:** `URL`

The URL of the page being navigated to. This property can be modified, the value at the end of the lifecycle will be used in the `NavigationHistoryEntry` for the next page.

#### `formData`

[Section titled formData](#formdata)

**Type:** `FormData | undefined`

A `FormData` object for `POST` requests.

When this attribute is set, a `POST` request will be sent to the [`to` URL](#to) with the given form data object as the content instead of the normal `GET` request.

When submitting an HTML form with view transitions enabled, this field is automatically set to the data in the form. When using the [`navigate()` function](#navigate), this value is the same as given in the options.

#### `loader()`

[Section titled loader()](#loader)

**Type:** `() => Promise<void>`

Implementation of the following phase in the navigation (loading the next page). This implementation can be overridden to add extra behavior.

#### `viewTransition`

[Section titled viewTransition](#viewtransition)

**Type:** [`ViewTransition`](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition)

The view transition object used in this navigation. On browsers that do not support the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API), this is an object implementing the same API for convenience but without the DOM integration.

#### `swap()`

[Section titled swap()](#swap)

**Type:** `() => void`

Implementation of the document swap logic.

Read more about [building a custom swap function](/en/guides/view-transitions/#building-a-custom-swap-function) in the View Transitions guide.

By default, this implementation will call the following functions in order:

1.  [`deselectScripts()`](#deselectscripts)
2.  [`swapRootAttributes()`](#swaprootattributes)
3.  [`swapHeadElements()`](#swapheadelements)
4.  [`saveFocus()`](#savefocus)
5.  [`swapBodyElement()`](#swapbodyelement)

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/modules/astro-transitions.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
astro:middleware](/en/reference/modules/astro-middleware/) [Next  
Integration API](/en/reference/integrations-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



