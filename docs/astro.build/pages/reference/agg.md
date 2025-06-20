# Aggregated from ./pages/reference/adapter-reference
Astro Adapter API
=================

Astro is designed to make it easy to deploy to any cloud provider for on-demand rendering, also known as server-side rendering (SSR). This ability is provided by **adapters**, which are [integrations](/en/reference/integrations-reference/). See the [on-demand rendering guide](/en/guides/on-demand-rendering/) to learn how to use an existing adapter.

What is an adapter?
-------------------

[Section titled What is an adapter?](#what-is-an-adapter)

An adapter is a special kind of [integration](/en/reference/integrations-reference/) that provides an entrypoint for server rendering at request time. An adapter does two things:

*   Implements host-specific APIs for handling requests.
*   Configures the build according to host conventions.

Building an Adapter
-------------------

[Section titled Building an Adapter](#building-an-adapter)

An adapter is an [integration](/en/reference/integrations-reference/) and can do anything that an integration can do.

An adapter **must** call the `setAdapter` API in the `astro:config:done` hook like so:

my-adapter.mjs

    export default function createIntegration() {  return {    name: '@matthewp/my-adapter',    hooks: {      'astro:config:done': ({ setAdapter }) => {        setAdapter({          name: '@matthewp/my-adapter',          serverEntrypoint: '@matthewp/my-adapter/server.js',          supportedAstroFeatures: {              staticOutput: 'stable'          }        });      },    },  };}

The object passed into `setAdapter` is defined as:

    interface AstroAdapter {  name: string;  serverEntrypoint?: string;  previewEntrypoint?: string;  exports?: string[];  args?: any;  adapterFeatures?: AstroAdapterFeatures;  supportedAstroFeatures: AstroAdapterFeatureMap;}
    export interface AstroAdapterFeatures {  /**   * Creates an edge function that will communicate with the Astro middleware.   */  edgeMiddleware: boolean;  /**   * Determine the type of build output the adapter is intended for. Defaults to `server`;   */  buildOutput?: 'static' | 'server';}
    export type AdapterSupportsKind = 'unsupported' | 'stable' | 'experimental' | 'deprecated' | 'limited';
    export type AdapterSupportWithMessage = {  support: Exclude<AdapterSupportsKind, 'stable'>;  message: string;};
    export type AdapterSupport = AdapterSupportsKind | AdapterSupportWithMessage;
    export type AstroAdapterFeatureMap = {  /**   * The adapter is able to serve static pages   */  staticOutput?: AdapterSupport;  /**   * The adapter is able to serve pages that are static or rendered via server   */  hybridOutput?: AdapterSupport;  /**   * The adapter is able to serve pages rendered on demand   */  serverOutput?: AdapterSupport;  /**   * The adapter is able to support i18n domains   */  i18nDomains?: AdapterSupport;  /**   * The adapter is able to support `getSecret` exported from `astro:env/server`   */  envGetSecret?: AdapterSupport;  /**   * The adapter supports the Sharp image service   */  sharpImageService?: AdapterSupport;};

The properties are:

*   **name**: A unique name for your adapter, used for logging.
*   **serverEntrypoint**: The entrypoint for on-demand server rendering.
*   **exports**: An array of named exports when used in conjunction with `createExports` (explained below).
*   **adapterFeatures**: An object that enables specific features that must be supported by the adapter. These features will change the built output, and the adapter must implement the proper logic to handle the different output.
*   **supportedAstroFeatures**: A map of Astro built-in features. This allows Astro to determine which features an adapter is unable or unwilling to support so appropriate error messages can be provided.

### Server Entrypoint

[Section titled Server Entrypoint](#server-entrypoint)

Astro’s adapter API attempts to work with any type of host, and gives a flexible way to conform to the host APIs.

#### Exports

[Section titled Exports](#exports)

Some serverless hosts expect you to export a function, such as `handler`:

    export function handler(event, context) {  // ...}

With the adapter API you achieve this by implementing `createExports` in your `serverEntrypoint`:

    import { App } from 'astro/app';
    export function createExports(manifest) {  const app = new App(manifest);
      const handler = (event, context) => {    // ...  };
      return { handler };}

And then in your integration, where you call `setAdapter`, provide this name in `exports`:

my-adapter.mjs

    export default function createIntegration() {  return {    name: '@matthewp/my-adapter',    hooks: {      'astro:config:done': ({ setAdapter }) => {        setAdapter({          name: '@matthewp/my-adapter',          serverEntrypoint: '@matthewp/my-adapter/server.js',          exports: ['handler'],        });      },    },  };}

#### Start

[Section titled Start](#start)

Some hosts expect you to _start_ the server yourselves, for example by listening to a port. For these types of hosts, the adapter API allows you to export a `start` function which will be called when the bundle script is run.

    import { App } from 'astro/app';
    export function start(manifest) {  const app = new App(manifest);
      addEventListener('fetch', event => {    // ...  });}

#### `astro/app`

[Section titled astro/app](#astroapp)

This module is used for rendering pages that have been prebuilt through `astro build`. Astro uses the standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) objects. Hosts that have a different API for request/response should convert to these types in their adapter.

    import { App } from 'astro/app';import http from 'http';
    export function start(manifest) {  const app = new App(manifest);
      addEventListener('fetch', event => {    event.respondWith(      app.render(event.request)    );  });}

The following methods are provided:

##### `app.render()`

[Section titled app.render()](#apprender)

**Type:** `(request: Request, options?: RenderOptions) => Promise<Response>`

This method calls the Astro page that matches the request, renders it, and returns a Promise to a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object. This also works for API routes that do not render pages.

    const response = await app.render(request);

##### `RenderOptions`

[Section titled RenderOptions](#renderoptions)

**Type:** `{addCookieHeader?: boolean; clientAddress?: string; locals?: object; prerenderedErrorPageFetch?: (url: ErrorPagePath) => Promise<Response>; routeData?: RouteData;}`

The `app.render()` method accepts a mandatory `request` argument, and an optional `RenderOptions` object for [`addCookieHeader`](#addcookieheader), [`clientAddress`](#clientaddress), [`locals`](#locals), [`prerenderedErrorPageFetch`](#prerenderederrorpagefetch), and [`routeData`](#routedata).

###### `addCookieHeader`

[Section titled addCookieHeader](#addcookieheader)

**Type:** `boolean`  
**Default:** `false`

Whether or not to automatically add all cookies written by `Astro.cookie.set()` to the response headers.

When set to `true`, they will be added to the `Set-Cookie` header of the response as comma separated key-value pairs. You can use the standard `response.headers.getSetCookie()` API to read them individually. When set to `false`(default), the cookies will only be available from `App.getSetCookieFromResponse(response)`.

    const response = await app.render(request, { addCookieHeader: true });

###### `clientAddress`

[Section titled clientAddress](#clientaddress)

**Type:** `string`  
**Default:** `request[Symbol.for("astro.clientAddress")]`

The client IP address that will be made available as [`Astro.clientAddress`](/en/reference/api-reference/#clientaddress) in pages, and as `ctx.clientAddress` in API routes and middleware.

The example below reads the `x-forwarded-for` header and passes it as `clientAddress`. This value becomes available to the user as `Astro.clientAddress`.

    const clientAddress = request.headers.get("x-forwarded-for");const response = await app.render(request, { clientAddress });

###### `locals`

[Section titled locals](#locals)

**Type:** `object`

The [`context.locals` object](/en/reference/api-reference/#locals) used to store and access information during the lifecycle of a request.

The example below reads a header named `x-private-header`, attempts to parse it as an object and pass it to `locals`, which can then be passed to any [middleware function](/en/guides/middleware/).

    const privateHeader = request.headers.get("x-private-header");let locals = {};try {    if (privateHeader) {        locals = JSON.parse(privateHeader);    }} finally {    const response = await app.render(request, { locals });}

###### `prerenderedErrorPageFetch`

[Section titled prerenderedErrorPageFetch](#prerenderederrorpagefetch)

**Type:** `(url: ErrorPagePath) => Promise<Response>`  
**Default:** `fetch`  

**Added in:** `astro@5.6.0`

A function that allows you to provide custom implementations for fetching prerendered error pages.

This is used to override the default `fetch()` behavior, for example, when `fetch()` is unavailable or when you cannot call the server from itself.

The following example reads `500.html` and `404.html` from disk instead of performing an HTTP call:

    return app.render(request, {  prerenderedErrorPageFetch: async (url: string): Promise<Response> => {    if (url.includes("/500")) {        const content = await fs.promises.readFile("500.html", "utf-8");        return new Response(content, {          status: 500,          headers: { "Content-Type": "text/html" },        });    }
        const content = await fs.promises.readFile("404.html", "utf-8");      return new Response(content, {        status: 404,        headers: { "Content-Type": "text/html" },      });});

If not provided, Astro will fallback to its default behavior for fetching error pages.

###### `routeData`

[Section titled routeData](#routedata)

**Type:** `RouteData`  
**Default:** `app.match(request)`

Provide a value for [`integrationRouteData`](/en/reference/integrations-reference/#integrationroutedata-type-reference) if you already know the route to render. Doing so will bypass the internal call to [`app.match`](#appmatch) to determine the route to render.

    const routeData = app.match(request);if (routeData) {    return app.render(request, { routeData });} else {    /* adapter-specific 404 response */    return new Response(..., { status: 404 });}

##### `app.match()`

[Section titled app.match()](#appmatch)

**Type:** `(request: Request) => RouteData | undefined`

This method is used to determine if a request is matched by the Astro app’s routing rules.

    if(app.match(request)) {  const response = await app.render(request);}

You can usually call `app.render(request)` without using `.match` because Astro handles 404s if you provide a `404.astro` file. Use `app.match(request)` if you want to handle 404s in a different way.

Allow installation via `astro add`
----------------------------------

[Section titled Allow installation via astro add](#allow-installation-via-astro-add)

[The `astro add` command](/en/reference/cli-reference/#astro-add) allows users to easily add integrations and adapters to their project. If you want _your_ adapter to be installable with this tool, **add `astro-adapter` to the `keywords` field in your `package.json`**:

    {  "name": "example",  "keywords": ["astro-adapter"],}

Once you [publish your adapter to npm](https://docs.npmjs.com/cli/v8/commands/npm-publish), running `astro add example` will install your package with any peer dependencies specified in your `package.json`. We will also instruct users to update their project config manually.

Astro features
--------------

[Section titled Astro features](#astro-features)

**Added in:** `astro@3.0.0`

Astro features are a way for an adapter to tell Astro whether they are able to support a feature, and also the adapter’s level of support.

When using these properties, Astro will:

*   run specific validation;
*   emit contextual to the logs;

These operations are run based on the features supported or not supported, their level of support, and the configuration that the user uses.

The following configuration tells Astro that this adapter has experimental support for the Sharp-powered built-in image service:

my-adapter.mjs

    export default function createIntegration() {  return {    name: '@matthewp/my-adapter',    hooks: {      'astro:config:done': ({ setAdapter }) => {        setAdapter({          name: '@matthewp/my-adapter',          serverEntrypoint: '@matthewp/my-adapter/server.js',          supportedAstroFeatures: {            sharpImageService: 'experimental'          }        });      },    },  };}

If the Sharp image service is used, Astro will log a warning and error to the terminal based on your adapter’s support:

    [@matthewp/my-adapter] The feature is experimental and subject to issues or changes.
    [@matthewp/my-adapter] The currently selected adapter `@matthewp/my-adapter` is not compatible with the service "Sharp". Your project will NOT be able to build.

A message can additionally be provided to give more context to the user:

my-adapter.mjs

    export default function createIntegration() {  return {    name: '@matthewp/my-adapter',    hooks: {      'astro:config:done': ({ setAdapter }) => {        setAdapter({          name: '@matthewp/my-adapter',          serverEntrypoint: '@matthewp/my-adapter/server.js',          supportedAstroFeatures: {            sharpImageService: {              support: 'limited',              message: 'This adapter has limited support for Sharp, certain features may not work as expected.'            }          }        });      },    },  };}

Adapter features
----------------

[Section titled Adapter features](#adapter-features)

A set of features that changes the output of the emitted files. When an adapter opts in to these features, they will get additional information inside specific hooks.

### `edgeMiddleware`

[Section titled edgeMiddleware](#edgemiddleware)

**Type:** `boolean`

Defines whether any on-demand rendering middleware code will be bundled when built.

When enabled, this prevents middleware code from being bundled and imported by all pages during the build:

my-adapter.mjs

    export default function createIntegration() {  return {    name: '@matthewp/my-adapter',    hooks: {      'astro:config:done': ({ setAdapter }) => {        setAdapter({          name: '@matthewp/my-adapter',          serverEntrypoint: '@matthewp/my-adapter/server.js',          adapterFeatures: {              edgeMiddleware: true          }        });      },    },  };}

Then, consume the hook [`astro:build:ssr`](/en/reference/integrations-reference/#astrobuildssr), which will give you a `middlewareEntryPoint`, an `URL` to the physical file on the file system.

my-adapter.mjs

    export default function createIntegration() {  return {    name: '@matthewp/my-adapter',    hooks: {      'astro:config:done': ({ setAdapter }) => {        setAdapter({          name: '@matthewp/my-adapter',          serverEntrypoint: '@matthewp/my-adapter/server.js',          adapterFeatures: {              edgeMiddleware: true          }        });      },
          'astro:build:ssr': ({ middlewareEntryPoint }) => {          // remember to check if this property exits, it will be `undefined` if the adapter doesn't opt in to the feature          if (middlewareEntryPoint) {             createEdgeMiddleware(middlewareEntryPoint)          }      }    },  };}
    function createEdgeMiddleware(middlewareEntryPoint) {    // emit a new physical file using your bundler}

### envGetSecret

[Section titled envGetSecret](#envgetsecret)

**Type:** `AdapterSupportsKind`

This is a feature to allow your adapter to retrieve secrets configured by users in `env.schema`.

Enable the feature by passing any valid `AdapterSupportsKind` value to the adapter:

my-adapter.mjs

    export default function createIntegration() {  return {    name: '@matthewp/my-adapter',    hooks: {      'astro:config:done': ({ setAdapter }) => {        setAdapter({          name: '@matthewp/my-adapter',          serverEntrypoint: '@matthewp/my-adapter/server.js',          adapterFeatures: {              envGetSecret: 'stable'          }        });      },    },  };}

The `astro/env/setup` module allows you to provide an implementation for `getSecret()`. In your server entrypoint, call `setGetEnv()` as soon as possible:

    import { App } from 'astro/app';import { setGetEnv } from "astro/env/setup"
    setGetEnv((key) => process.env[key])
    export function createExports(manifest) {  const app = new App(manifest);
      const handler = (event, context) => {    // ...  };
      return { handler };}

If you support secrets, be sure to call `setGetEnv()` before `getSecret()` when your environment variables are tied to the request:

    import type { SSRManifest } from 'astro';import { App } from 'astro/app';import { setGetEnv } from 'astro/env/setup';import { createGetEnv } from '../utils/env.js';
    type Env = {  [key: string]: unknown;};
    export function createExports(manifest: SSRManifest) {  const app = new App(manifest);
      const fetch = async (request: Request, env: Env) => {    setGetEnv(createGetEnv(env));
        const response = await app.render(request);
        return response;  };
      return { default: { fetch } };}

### buildOutput

[Section titled buildOutput](#buildoutput)

**Type:** `'static' | 'server'`  

**Added in:** `astro@5.0.0`

This property allows you to force a specific output shape for the build. This can be useful for adapters that only work with a specific output type, for instance, your adapter might expect a static website, but uses an adapter to create host-specific files. Defaults to `server` if not specified.

my-adapter.mjs

    export default function createIntegration() {  return {    name: '@matthewp/my-adapter',    hooks: {      'astro:config:done': ({ setAdapter }) => {        setAdapter({          name: '@matthewp/my-adapter',          serverEntrypoint: '@matthewp/my-adapter/server.js',          adapterFeatures: {            buildOutput: 'static'          }        });      },    },  };}

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/adapter-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Integration API](/en/reference/integrations-reference/) [Next  
Content Loader API](/en/reference/content-loader-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/api-reference
Astro render context
====================

When rendering a page, Astro provides a runtime API specific to the current render. This includes useful information such as the current page URL as well as APIs to perform actions like redirecting to another page.

In `.astro` components, this context is available from the `Astro` global object. Endpoint functions are also called with this same context object as their first argument, whose properties mirror the Astro global properties.

Some properties are only available for routes rendered on demand or may have limited functionality on prerendered pages.

The `Astro` global object is available to all `.astro` files. Use the `context` object in [endpoint functions](/en/guides/endpoints/) to serve static or live server endpoints and in [middleware](/en/guides/middleware/) to inject behavior when a page or endpoint is about to be rendered.

The context object
------------------

[Section titled The context object](#the-context-object)

The following properties are available on the `Astro` global (e.g. `Astro.props`, `Astro.redirect()`) and are also available on the context object (e.g. `context.props`, `context.redirect()`) passed to endpoint functions and middleware.

### `props`

[Section titled props](#props)

`props` is an object containing any values that have been passed as [component attributes](/en/basics/astro-components/#component-props).

src/components/Heading.astro

    ---const { title, date } = Astro.props;---<div>  <h1>{title}</h1>  <p>{date}</p></div>

src/pages/index.astro

    ---import Heading from '../components/Heading.astro';---<Heading title="My First Post" date="09 Aug 2022" />

Learn more about how [Markdown and MDX layouts](/en/guides/markdown-content/#frontmatter-layout-property) handle props.

The `props` object also contains any `props` passed from `getStaticPaths()` when rendering static routes.

*   [Astro.props](#tab-panel-1831)
*   [context.props](#tab-panel-1832)

src/pages/posts/\[id\].astro

    ---export function getStaticPaths() {  return [    { params: { id: '1' }, props: { author: 'Blu' } },    { params: { id: '2' }, props: { author: 'Erika' } },    { params: { id: '3' }, props: { author: 'Matthew' } }  ];}
    const { id } = Astro.params;const { author } = Astro.props;---

src/pages/posts/\[id\].json.ts

    import type { APIContext } from 'astro';
    export function getStaticPaths() {  return [    { params: { id: '1' }, props: { author: 'Blu' } },    { params: { id: '2' }, props: { author: 'Erika' } },    { params: { id: '3' }, props: { author: 'Matthew' } }  ];}
    export function GET({ props }: APIContext) {  return new Response(    JSON.stringify({ author: props.author }),  );}

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

See also: [Data Passing with `props`](/en/reference/routing-reference/#data-passing-with-props)

### `params`

[Section titled params](#params)

`params` is an object containing the values of dynamic route segments matched for a request. Its keys must match the [parameters](/en/guides/routing/#dynamic-routes) in the page or endpoint file path.

In static builds, this will be the `params` returned by `getStaticPaths()` used for prerendering [dynamic routes](/en/guides/routing/#dynamic-routes):

*   [Astro.params](#tab-panel-1833)
*   [context.params](#tab-panel-1834)

src/pages/posts/\[id\].astro

    ---export function getStaticPaths() {  return [    { params: { id: '1' } },    { params: { id: '2' } },    { params: { id: '3' } }  ];}const { id } = Astro.params;---<h1>{id}</h1>

src/pages/posts/\[id\].json.ts

    import type { APIContext } from 'astro';
    export function getStaticPaths() {  return [    { params: { id: '1' } },    { params: { id: '2' } },    { params: { id: '3' } }  ];}
    export function GET({ params }: APIContext) {  return new Response(    JSON.stringify({ id: params.id }),  );}

When routes are rendered on demand, `params` can be any value matching the path segments in the dynamic route pattern.

src/pages/posts/\[id\].astro

    ---import { getPost } from '../api';
    const post = await getPost(Astro.params.id);
    // No posts found with this IDif (!post) {  return Astro.redirect("/404")}---<html>  <h1>{post.name}</h1></html>

See also: [`params`](/en/reference/routing-reference/#params)

### `url`

[Section titled url](#url)

**Type:** `URL`  

**Added in:** `astro@1.0.0`

`url` is a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object constructed from the current `request.url` value. It is useful for interacting with individual properties of the request URL, like pathname and origin.

`Astro.url` is equivalent to doing `new URL(Astro.request.url)`.

`url` will be a `localhost` URL in dev mode. When building a site, prerendered routes will receive a URL based on the [`site`](/en/reference/configuration-reference/#site) and [`base`](/en/reference/configuration-reference/#base) options. If `site` is not configured, prerendered pages will receive a `localhost` URL during builds as well.

src/pages/index.astro

    <h1>The current URL is: {Astro.url}</h1><h1>The current URL pathname is: {Astro.url.pathname}</h1><h1>The current URL origin is: {Astro.url.origin}</h1>

You can also use `url` to create new URLs by passing it as an argument to [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL).

src/pages/index.astro

    ---// Example: Construct a canonical URL using your production domainconst canonicalURL = new URL(Astro.url.pathname, Astro.site);// Example: Construct a URL for SEO meta tags using your current domainconst socialImageURL = new URL('/images/preview.png', Astro.url);---<link rel="canonical" href={canonicalURL} /><meta property="og:image" content={socialImageURL} />

### `site`

[Section titled site](#site)

**Type:** `URL | undefined`

`site` returns a `URL` made from `site` in your Astro config. It returns `undefined` if you have not set a value for [`site`](/en/reference/configuration-reference/#site) in your Astro config.

src/pages/index.astro

    <link    rel="alternate"    type="application/rss+xml"    title="Your Site's Title"    href={new URL("rss.xml", Astro.site)}/>

### `clientAddress`

[Section titled clientAddress](#clientaddress)

**Type:** `string`  

**Added in:** `astro@1.0.0`

`clientAddress` specifies the [IP address](https://en.wikipedia.org/wiki/IP_address) of the request. This property is only available for routes rendered on demand and cannot be used on prerendered pages.

*   [Astro.clientAddress](#tab-panel-1835)
*   [context.clientAddress](#tab-panel-1836)

src/pages/ip-address.astro

    ---export const prerender = false; // Not needed in 'server' mode---
    <div>Your IP address is: <span class="address">{Astro.clientAddress}</span></div>

src/pages/ip-address.ts

    export const prerender = false; // Not needed in 'server' modeimport type { APIContext } from 'astro';
    export function GET({ clientAddress }: APIContext) {  return new Response(`Your IP address is: ${clientAddress}`);}

### `isPrerendered`

[Section titled isPrerendered](#isprerendered)

**Type**: `boolean`  

**Added in:** `astro@5.0.0`

A boolean representing whether or not the current page is prerendered.

You can use this property to run conditional logic in middleware, for example, to avoid accessing headers in prerendered pages.

### `generator`

[Section titled generator](#generator)

**Type:** `string`  

**Added in:** `astro@1.0.0`

`generator` provides the current version of Astro your project is running. This is a convenient way to add a [`<meta name="generator">`](https://html.spec.whatwg.org/multipage/semantics.html#meta-generator) tag with your current version of Astro. It follows the format `"Astro v5.x.x"`.

*   [Astro.generator](#tab-panel-1837)
*   [context.generator](#tab-panel-1838)

src/pages/site-info.astro

    <html>  <head>    <meta name="generator" content={Astro.generator} />  </head>  <body>    <footer>      <p>Built with <a href="https://astro.build">{Astro.generator}</a></p>    </footer>  </body></html>

src/pages/site-info.json.ts

    import type { APIContext } from 'astro';
    export function GET({ generator, site }: APIContext) {  const body = JSON.stringify({ generator, site });  return new Response(body);}

### `request`

[Section titled request](#request)

**Type:** `Request`

`request` is a standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object. It can be used to get the `url`, `headers`, `method`, and even the body of the request.

*   [Astro.request](#tab-panel-1839)
*   [context.request](#tab-panel-1840)

src/pages/index.astro

    <p>Received a {Astro.request.method} request to "{Astro.request.url}".</p><p>Received request headers:</p><p><code>{JSON.stringify(Object.fromEntries(Astro.request.headers))}</code></p>

    import type { APIContext } from 'astro';
    export function GET({ request }: APIContext) {  return new Response(`Hello ${request.url}`);}

Note

On prerendered pages, `request.url` does not contain search parameters, like `?type=new`, as it’s not possible to determine them ahead of time during static builds. However, `request.url` does contain search parameters for pages rendered on-demand as they can be determined from a server request.

### `response`

[Section titled response](#response)

**Type:** `ResponseInit & { readonly headers: Headers }`

`response` is a standard `ResponseInit` object. It has the following structure.

*   `status`: The numeric status code of the response, e.g., `200`.
*   `statusText`: The status message associated with the status code, e.g., `'OK'`.
*   `headers`: A [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers) instance that you can use to set the HTTP headers of the response.

`Astro.response` is used to set the `status`, `statusText`, and `headers` for a page’s response.

    ---if (condition) {  Astro.response.status = 404;  Astro.response.statusText = 'Not found';}---

Or to set a header:

    ---Astro.response.headers.set('Set-Cookie', 'a=b; Path=/;');---

### `redirect()`

[Section titled redirect()](#redirect)

**Type:** `(path: string, status?: number) => Response`

**Added in:** `astro@1.5.0`

`redirect()` returns a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object that allows you to redirect to another page, and optionally provide an [HTTP response status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages) as a second parameter.

A page (and not a child component) must `return` the result of `Astro.redirect()` for the redirect to occur.

For statically-generated routes, this will produce a client redirect using a [`<meta http-equiv="refresh">` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#http-equiv) and does not support status codes.

For on-demand rendered routes, setting a custom status code is supported when redirecting. If not specified, redirects will be served with a `302` status code.

The following example redirects a user to a login page:

*   [Astro.redirect()](#tab-panel-1841)
*   [context.redirect()](#tab-panel-1842)

src/pages/account.astro

    ---import { isLoggedIn } from '../utils';
    const cookie = Astro.request.headers.get('cookie');
    // If the user is not logged in, redirect them to the login pageif (!isLoggedIn(cookie)) {  return Astro.redirect('/login');}---
    <p>User information</p>

    import type { APIContext } from 'astro';
    export function GET({ redirect, request }: APIContext) {  const cookie = request.headers.get('cookie');  if (!isLoggedIn(cookie)) {    return redirect('/login', 302);  } else {    // return user information  }}

### `rewrite()`

[Section titled rewrite()](#rewrite)

**Type:** `(rewritePayload: string | URL | Request) => Promise<Response>`  

**Added in:** `astro@4.13.0`

`rewrite()` allows you to serve content from a different URL or path without redirecting the browser to a new page.

The method accepts either a string, a `URL`, or a `Request` for the location of the path.

Use a string to provide an explicit path:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [Astro.rewrite()](#tab-panel-1843)
*   [context.rewrite()](#tab-panel-1844)

src/pages/index.astro

    ---return Astro.rewrite("/login")---

    import type { APIContext } from 'astro';
    export function GET({ rewrite }: APIContext) {  return rewrite('/login');}

Use a `URL` type when you need to construct the URL path for the rewrite. The following example renders a page’s parent path by creating a new URL from the relative `"../"` path:

*   [Astro.rewrite()](#tab-panel-1845)
*   [context.rewrite()](#tab-panel-1846)

src/pages/blog/index.astro

    ---return Astro.rewrite(new URL("../", Astro.url))---

    import type { APIContext } from 'astro';
    export function GET({ rewrite }: APIContext) {  return rewrite(new URL("../", Astro.url));}

Use a `Request` type for complete control of the `Request` sent to the server for the new path. The following example sends a request to render the parent page while also providing headers:

*   [Astro.rewrite()](#tab-panel-1847)
*   [context.rewrite()](#tab-panel-1848)

src/pages/blog/index.astro

    ---return Astro.rewrite(new Request(new URL("../", Astro.url), {  headers: {    "x-custom-header": JSON.stringify(Astro.locals.someValue)  }}))---

    import type { APIContext } from 'astro';
    export function GET({ rewrite }: APIContext) {  return rewrite(new Request(new URL("../", Astro.url), {    headers: {      "x-custom-header": JSON.stringify(Astro.locals.someValue)    }  }));}

### `locals`

[Section titled locals](#locals)

**Added in:** `astro@2.4.0`

`locals` is an object used to store and access arbitrary information during the lifecycle of a request. `Astro.locals` is an object containing any values from the `context.locals` object set by middleware. Use this to access data returned by middleware in your `.astro` files.

Middleware functions can both read and write the values of `context.locals`:

src/middleware.ts

    import type { MiddlewareHandler } from 'astro';
    export const onRequest: MiddlewareHandler = ({ locals }, next) => {  if (!locals.title) {    locals.title = "Default Title";  }  return next();}

Astro components and API endpoints can read values from `locals` when they render:

*   [Astro.locals](#tab-panel-1849)
*   [context.locals](#tab-panel-1850)

src/pages/Orders.astro

    ---const title = Astro.locals.title;---<h1>{title}</h1>

src/pages/hello.ts

    import type { APIContext } from 'astro';
    export function GET({ locals }: APIContext) {  return new Response(locals.title); // "Default Title"}

### `preferredLocale`

[Section titled preferredLocale](#preferredlocale)

**Type:** `string | undefined`  

**Added in:** `astro@3.5.0`

`preferredLocale` is a computed value to find the best match between your visitor’s browser language preferences and the locales supported by your site.

It is computed by checking the configured locales in your [`i18n.locales`](/en/reference/configuration-reference/#i18nlocales) array and the locales supported by the user’s browser via the header `Accept-Language`. This value is `undefined` if no such match exists.

This property is only available for routes rendered on demand and cannot be used on prerendered, static pages.

### `preferredLocaleList`

[Section titled preferredLocaleList](#preferredlocalelist)

**Type:** `string[] | undefined`  

**Added in:** `astro@3.5.0`

`preferredLocaleList` represents the array of all locales that are both requested by the browser and supported by your website. This produces a list of all compatible languages between your site and your visitor.

If none of the browser’s requested languages are found in your locales array, then the value is `[]`. This occurs when you do not support any of your visitor’s preferred locales.

If the browser does not specify any preferred languages, then this value will be [`i18n.locales`](/en/reference/configuration-reference/#i18nlocales): all of your supported locales will be considered equally preferred by a visitor with no preferences.

This property is only available for routes rendered on demand and cannot be used on prerendered, static pages.

### `currentLocale`

[Section titled currentLocale](#currentlocale)

**Type:** `string | undefined`  

**Added in:** `astro@3.5.6`

The locale computed from the current URL, using the syntax specified in your `locales` configuration. If the URL does not contain a `/[locale]/` prefix, then the value will default to [`i18n.defaultLocale`](/en/reference/configuration-reference/#i18ndefaultlocale).

### `getActionResult()`

[Section titled getActionResult()](#getactionresult)

**Type:** `(action: TAction) => ActionReturnType<TAction> | undefined`  

**Added in:** `astro@4.15.0`

`getActionResult()` is a function that returns the result of an [Action](/en/guides/actions/) submission. This accepts an action function as an argument (e.g. `actions.logout`) and returns a `data` or `error` object when a submission is received. Otherwise, it will return `undefined`.

src/pages/index.astro

    ---import { actions } from 'astro:actions';
    const result = Astro.getActionResult(actions.logout);---
    <form action={actions.logout}>  <button type="submit">Log out</button></form>{result?.error && <p>Failed to log out. Please try again.</p>}

### `callAction()`

[Section titled callAction()](#callaction)

**Added in:** `astro@4.15.0`

`callAction()` is a function used to call an Action handler directly from your Astro component. This function accepts an Action function as the first argument (e.g. `actions.logout`) and any input that action receives as the second argument. It returns the result of the action as a promise.

src/pages/index.astro

    ---import { actions } from 'astro:actions';
    const { data, error } = await Astro.callAction(actions.logout, { userId: '123' });---

### `routePattern`

[Section titled routePattern](#routepattern)

**Type**: `string`  

**Added in:** `astro@5.0.0`

The route pattern responsible for generating the current page or route. In file-based routing, this resembles the file path in your project used to create the route. When integrations create routes for your project, `context.routePattern` is identical to the value for `injectRoute.pattern`.

The value will start with a leading slash and look similar to the path of a page component relative to your `src/pages/` folder without a file extension.

For example, the file `src/pages/en/blog/[slug].astro` will return `/en/blog/[slug]` for `routePattern`. Every page on your site generated by that file (e.g. `/en/blog/post-1/`, `/en/blog/post-2/`, etc.) shares the same value for `routePattern`. In the case of `index.*` routes, the route pattern will not include the word “index.” For example, `src/pages/index.astro` will return `/`.

You can use this property to understand which route is rendering your component. This allows you to target or analyze similarly-generated page URLs together. For example, you can use it to conditionally render certain information, or collect metrics about which routes are slower.

### `cookies`

[Section titled cookies](#cookies)

**Type:** `AstroCookies`  

**Added in:** `astro@1.4.0`

`cookies` contains utilities for reading and manipulating cookies for [routes rendered on demand](/en/guides/on-demand-rendering/).

#### Cookie utilities

[Section titled Cookie utilities](#cookie-utilities)

##### `cookies.get()`

[Section titled cookies.get()](#cookiesget)

**Type:** `(key: string, options?: [AstroCookieGetOptions](#astrocookiegetoptions)) => [AstroCookie](#astrocookie-type) | undefined`

Gets the cookie as an [`AstroCookie`](#astrocookie-type) object, which contains the `value` and utility functions for converting the cookie to non-string types.

##### `cookies.has()`

[Section titled cookies.has()](#cookieshas)

**Type:** `(key: string, options?: [AstroCookieGetOptions](#astrocookiegetoptions)) => boolean`

Whether this cookie exists. If the cookie has been set via `Astro.cookies.set()` this will return true, otherwise, it will check cookies in the `Astro.request`.

##### `cookies.set()`

[Section titled cookies.set()](#cookiesset)

**Type:** `(key: string, value: string | object, options?: [AstroCookieSetOptions](#astrocookiesetoptions)) => void`

Sets the cookie `key` to the given value. This will attempt to convert the cookie value to a string. Options provide ways to set [cookie features](https://www.npmjs.com/package/cookie#options-1), such as the `maxAge` or `httpOnly`.

##### `cookies.delete()`

[Section titled cookies.delete()](#cookiesdelete)

**Type:** `(key: string, options?: AstroCookieDeleteOptions) => void`

Invalidates a cookie by setting the expiration date in the past (0 in Unix time).

Once a cookie is “deleted” (expired), `Astro.cookies.has()` will return `false` and `Astro.cookies.get()` will return an [`AstroCookie`](#astrocookie-type) with a `value` of `undefined`. Options available when deleting a cookie are: `domain`, `path`, `httpOnly`, `sameSite`, and `secure`.

##### `cookies.merge()`

[Section titled cookies.merge()](#cookiesmerge)

**Type:** `(cookies: AstroCookies) => void`

Merges a new `AstroCookies` instance into the current instance. Any new cookies will be added to the current instance and any cookies with the same name will overwrite existing values.

##### `cookies.headers()`

[Section titled cookies.headers()](#cookiesheaders)

**Type:** `() => Iterator<string>`

Gets the header values for `Set-Cookie` that will be sent out with the response.

#### `AstroCookie` Type

[Section titled AstroCookie Type](#astrocookie-type)

The type returned from getting a cookie via `Astro.cookies.get()`. It has the following properties:

##### `value`

[Section titled value](#value)

**Type:** `string`

The raw string value of the cookie.

##### `json`

[Section titled json](#json)

**Type:** `() => Record<string, any>`

Parses the cookie value via `JSON.parse()`, returning an object. Throws if the cookie value is not valid JSON.

##### `number`

[Section titled number](#number)

**Type:** `() => number`

Parses the cookie value as a Number. Returns NaN if not a valid number.

##### `boolean`

[Section titled boolean](#boolean)

**Type:** `() => boolean`

Converts the cookie value to a boolean.

#### `AstroCookieGetOptions`

[Section titled AstroCookieGetOptions](#astrocookiegetoptions)

**Added in:** `astro@4.1.0`

The `AstroCookieGetOption` interface allows you to specify options when you get a cookie.

##### `decode`

[Section titled decode](#decode)

**Type:** `(value: string) => string`

Allows customization of how a cookie is deserialized into a value.

#### `AstroCookieSetOptions`

[Section titled AstroCookieSetOptions](#astrocookiesetoptions)

**Added in:** `astro@4.1.0`

`AstroCookieSetOptions` is an object that can be passed to `Astro.cookies.set()` when setting a cookie to customize how the cookie is serialized.

##### `domain`

[Section titled domain](#domain)

**Type:** `string`

Specifies the domain. If no domain is set, most clients will interpret to apply to the current domain.

##### `expires`

[Section titled expires](#expires)

**Type:** `Date`

Specifies the date on which the cookie will expire.

##### `httpOnly`

[Section titled httpOnly](#httponly)

**Type:** `boolean`

If true, the cookie will not be accessible client-side.

##### `maxAge`

[Section titled maxAge](#maxage)

**Type:** `number`

Specifies a number, in seconds, for which the cookie is valid.

##### `path`

[Section titled path](#path)

**Type:** `string`

Specifies a subpath of the domain in which the cookie is applied.

##### `sameSite`

[Section titled sameSite](#samesite)

**Type:** `boolean | 'lax' | 'none' | 'strict'`

Specifies the value of the [SameSite](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-09#section-5.4.7) cookie header.

##### `secure`

[Section titled secure](#secure)

**Type:** `boolean`

If true, the cookie is only set on https sites.

##### `encode`

[Section titled encode](#encode)

**Type:** `(value: string) => string`

Allows customizing how the cookie is serialized.

### `session`

[Section titled session](#session)

**Type:** `AstroSession`

**Added in:** `astro@5.7.0`

`session` is an object that allows data to be stored between requests for [routes rendered on demand](/en/guides/on-demand-rendering/). It is associated with a cookie that contains the session ID only: the data itself is not stored in the cookie.

The session is created when first used, and the session cookie is automatically set. The `session` object is `undefined` if no session storage has been configured, or if the current route is prerendered, and will log an error if you try to use it.

See [the session guide](/en/guides/sessions/) for more information on how to use sessions in your Astro project.

#### `get()`

[Section titled get()](#get)

**Type**: `(key: string) => Promise<any>`

Returns the value of the given key in the session. If the key does not exist, it returns `undefined`.

*   [Astro.session](#tab-panel-1851)
*   [context.session](#tab-panel-1852)

src/components/Cart.astro

    ---const cart = await Astro.session?.get('cart');---<button>🛒 {cart?.length}</button>

src/pages/api/cart.ts

    import type { APIContext } from 'astro';
    export async function GET({ session }: APIContext) {  const cart = await session.get('cart');  return Response.json({ cart });}

#### `set()`

[Section titled set()](#set)

**Type**: `(key: string, value: any, options?: { ttl: number }) => void`

Sets the value of the given key in the session. The value can be any serializable type. This method is synchronous and the value is immediately available for retrieval, but it is not saved to the backend until the end of the request.

*   [Astro.session](#tab-panel-1853)
*   [context.session](#tab-panel-1854)

src/pages/products/\[slug\].astro

    ---const { slug } = Astro.params;Astro.session?.set('lastViewedProduct', slug);---

src/pages/api/add-to-cart.ts

    import type { APIContext } from 'astro';
    export async function POST({ session, request }: APIContext) {  const cart = await session.get('cart');  const newItem = await request.json();  cart.push(newItem);  // Save the updated cart to the session  session.set('cart', cart);  return Response.json({ cart });}

#### `regenerate()`

[Section titled regenerate()](#regenerate)

**Type**: `() => void`

Regenerates the session ID. Call this when a user logs in or escalates their privileges, to prevent session fixation attacks.

*   [Astro.session](#tab-panel-1855)
*   [context.session](#tab-panel-1856)

src/pages/welcome.astro

    ---Astro.session?.regenerate();---

src/pages/api/login.ts

    import type { APIContext } from 'astro';
    export async function POST({ session }: APIContext) {  // Authenticate the user...  doLogin();  // Regenerate the session ID to prevent session fixation attacks  session.regenerate();  return Response.json({ success: true });}

#### `destroy()`

[Section titled destroy()](#destroy)

**Type**: `() => void`

Destroys the session, deleting the cookie and the object from the backend. Call this when a user logs out or their session is otherwise invalidated.

*   [Astro.session](#tab-panel-1857)
*   [context.session](#tab-panel-1858)

src/pages/logout.astro

    ---Astro.session?.destroy();return Astro.redirect('/login');---

src/pages/api/logout.ts

    import type { APIContext } from 'astro';
    export async function POST({ session }: APIContext) {  session.destroy();  return Response.json({ success: true });}

#### `load()`

[Section titled load()](#load)

**Type**: `(id: string) => Promise<void>`

Loads a session by ID. In normal use, a session is loaded automatically from the request cookie. Use this method to load a session from a different ID. This is useful if you are handling the session ID yourself, or if you want to keep track of a session without using cookies.

*   [Astro.session](#tab-panel-1859)
*   [context.session](#tab-panel-1860)

src/pages/cart.astro

    ---// Load the session from a header instead of cookiesconst sessionId = Astro.request.headers.get('x-session-id');await Astro.session?.load(sessionId);const cart = await Astro.session?.get('cart');---<h1>Your cart</h1><ul>  {cart?.map((item) => (    <li>{item.name}</li>  ))}</ul>

src/pages/api/load-session.ts

    import type { APIRoute } from 'astro';
    export const GET: APIRoute = async ({ session, request }) => {  // Load the session from a header instead of cookies  const sessionId = request.headers.get('x-session-id');  await session.load(sessionId);  const cart = await session.get('cart');  return Response.json({ cart });};

### Deprecated object properties

[Section titled Deprecated object properties](#deprecated-object-properties)

#### `Astro.glob()`

[Section titled Astro.glob()](#astroglob)

Deprecated in v5.0

Use [Vite’s `import.meta.glob`](https://vite.dev/guide/features.html#glob-import) to query project files.

`Astro.glob('../pages/post/*.md')` can be replaced with:

`Object.values(import.meta.glob('../pages/post/*.md', { eager: true }));`

See the [imports guide](/en/guides/imports/#importmetaglob) for more information and usage.

`Astro.glob()` is a way to load many local files into your static site setup.

src/components/my-component.astro

    ---const posts = await Astro.glob('../pages/post/*.md'); // returns an array of posts that live at ./src/pages/post/*.md---
    <div>{posts.slice(0, 3).map((post) => (  <article>    <h2>{post.frontmatter.title}</h2>    <p>{post.frontmatter.description}</p>    <a href={post.url}>Read more</a>  </article>))}</div>

`.glob()` only takes one parameter: a relative URL glob of which local files you’d like to import. It’s asynchronous and returns an array of the exports from matching files.

`.glob()` can’t take variables or strings that interpolate them, as they aren’t statically analyzable. (See [the imports guide](/en/guides/imports/#supported-values) for a workaround.) This is because `Astro.glob()` is a wrapper of Vite’s [`import.meta.glob()`](https://vite.dev/guide/features.html#glob-import).

Note

You can also use `import.meta.glob()` itself in your Astro project. You may want to do this when:

*   You need this feature in a file that isn’t `.astro`, like an API route. `Astro.glob()` is only available in `.astro` files, while `import.meta.glob()` is available anywhere in the project.
*   You don’t want to load each file immediately. `import.meta.glob()` can return functions that import the file content, rather than returning the content itself. Note that this import includes all styles and scripts for any imported files. These will be bundled and added to the page whether or not a file is actually used, as this is decided by static analysis, not at runtime.
*   You want access to each file’s path. `import.meta.glob()` returns a map of a file’s path to its content, while `Astro.glob()` returns a list of content.
*   You want to pass multiple patterns; for example, you want to add a “negative pattern” that filters out certain files. `import.meta.glob()` can optionally take an array of glob strings, rather than a single string.

Read more in the [Vite documentation](https://vite.dev/guide/features.html#glob-import).

##### Markdown Files

[Section titled Markdown Files](#markdown-files)

Markdown files loaded with `Astro.glob()` return the following `MarkdownInstance` interface:

    export interface MarkdownInstance<T extends Record<string, any>> {  /* Any data specified in this file's YAML/TOML frontmatter */  frontmatter: T;  /* The absolute file path of this file */  file: string;  /* The rendered path of this file */  url: string | undefined;  /* Astro Component that renders the contents of this file */  Content: AstroComponentFactory;  /** (Markdown only) Raw Markdown file content, excluding layout HTML and YAML/TOML frontmatter */  rawContent(): string;  /** (Markdown only) Markdown file compiled to HTML, excluding layout HTML */  compiledContent(): string;  /* Function that returns an array of the h1...h6 elements in this file */  getHeadings(): Promise<{ depth: number; slug: string; text: string }[]>;  default: AstroComponentFactory;}

You can optionally provide a type for the `frontmatter` variable using a TypeScript generic.

    ---interface Frontmatter {  title: string;  description?: string;}const posts = await Astro.glob<Frontmatter>('../pages/post/*.md');---
    <ul>  {posts.map(post => <li>{post.frontmatter.title}</li>)}</ul>

##### Astro Files

[Section titled Astro Files](#astro-files)

Astro files have the following interface:

    export interface AstroInstance {  /* The file path of this file */  file: string;  /* The URL for this file (if it is in the pages directory) */  url: string | undefined;  default: AstroComponentFactory;}

##### Other Files

[Section titled Other Files](#other-files)

Other files may have various different interfaces, but `Astro.glob()` accepts a TypeScript generic if you know exactly what an unrecognized file type contains.

    ---interface CustomDataFile {  default: Record<string, any>;}const data = await Astro.glob<CustomDataFile>('../data/**/*.js');---

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/api-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Routing Reference](/en/reference/routing-reference/) [Next  
astro:actions](/en/reference/modules/astro-actions/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/astro-syntax
Template expressions reference
==============================

Astro component syntax is a superset of HTML. The syntax was designed to feel familiar to anyone with experience writing HTML or JSX, and adds support for including components and JavaScript expressions.

JSX-like Expressions
--------------------

[Section titled JSX-like Expressions](#jsx-like-expressions)

You can define local JavaScript variables inside of the frontmatter component script between the two code fences (`---`) of an Astro component. You can then inject these variables into the component’s HTML template using JSX-like expressions!

Dynamic vs reactive

Using this approach, you can include **dynamic** values that are calculated in the frontmatter. But once included, these values are not **reactive** and will never change. Astro components are templates that only run once, during the rendering step.

See below for more examples of [differences between Astro and JSX](#differences-between-astro-and-jsx).

### Variables

[Section titled Variables](#variables)

Local variables can be added into the HTML using the curly braces syntax:

src/components/Variables.astro

    ---const name = "Astro";---<div>  <h1>Hello {name}!</h1>  <!-- Outputs <h1>Hello Astro!</h1> --></div>

### Dynamic Attributes

[Section titled Dynamic Attributes](#dynamic-attributes)

Local variables can be used in curly braces to pass attribute values to both HTML elements and components:

src/components/DynamicAttributes.astro

    ---const name = "Astro";---<h1 class={name}>Attribute expressions are supported</h1>
    <MyComponent templateLiteralNameAttribute={`MyNameIs${name}`} />

Caution

HTML attributes will be converted to strings, so it is not possible to pass functions and objects to HTML elements. For example, you can’t assign an event handler to an HTML element in an Astro component:

dont-do-this.astro

    ---function handleClick () {    console.log("button clicked!");}---<!-- ❌ This doesn't work! ❌ --><button onClick={handleClick}>Nothing will happen when you click me!</button>

Instead, use a client-side script to add the event handler, like you would in vanilla JavaScript:

do-this-instead.astro

    ------<button id="button">Click Me</button><script>  function handleClick () {    console.log("button clicked!");  }  document.getElementById("button").addEventListener("click", handleClick);</script>

### Dynamic HTML

[Section titled Dynamic HTML](#dynamic-html)

Local variables can be used in JSX-like functions to produce dynamically-generated HTML elements:

src/components/DynamicHtml.astro

    ---const items = ["Dog", "Cat", "Platypus"];---<ul>  {items.map((item) => (    <li>{item}</li>  ))}</ul>

Astro can conditionally display HTML using JSX logical operators and ternary expressions.

src/components/ConditionalHtml.astro

    ---const visible = true;---{visible && <p>Show me!</p>}
    {visible ? <p>Show me!</p> : <p>Else show me!</p>}

### Dynamic Tags

[Section titled Dynamic Tags](#dynamic-tags)

You can also use dynamic tags by assigning an HTML tag name to a variable or with a component import reassignment:

src/components/DynamicTags.astro

    ---import MyComponent from "./MyComponent.astro";const Element = 'div'const Component = MyComponent;---<Element>Hello!</Element> <!-- renders as <div>Hello!</div> --><Component /> <!-- renders as <MyComponent /> -->

When using dynamic tags:

*   **Variable names must be capitalized.** For example, use `Element`, not `element`. Otherwise, Astro will try to render your variable name as a literal HTML tag.
    
*   **Hydration directives are not supported.** When using [`client:*` hydration directives](/en/guides/framework-components/#hydrating-interactive-components), Astro needs to know which components to bundle for production, and the dynamic tag pattern prevents this from working.
    
*   **The [define:vars directive](/en/reference/directives-reference/#definevars) is not supported.** If you cannot wrap the children with an extra element (e.g `<div>`), then you can manually add a ``style={`--myVar:${value}`}`` to your Element.
    

### Fragments

[Section titled Fragments](#fragments)

Astro supports `<> </>` notation and also provides a built-in `<Fragment />` component. This component can be useful to avoid wrapper elements when adding [`set:*` directives](/en/reference/directives-reference/#sethtml) to inject an HTML string.

The following example renders paragraph text using the `<Fragment />` component:

src/components/SetHtml.astro

    ---const htmlString = '<p>Raw HTML content</p>';---<Fragment set:html={htmlString} />

### Differences between Astro and JSX

[Section titled Differences between Astro and JSX](#differences-between-astro-and-jsx)

Astro component syntax is a superset of HTML. It was designed to feel familiar to anyone with HTML or JSX experience, but there are a couple of key differences between `.astro` files and JSX.

#### Attributes

[Section titled Attributes](#attributes)

In Astro, you use the standard `kebab-case` format for all HTML attributes instead of the `camelCase` used in JSX. This even works for `class`, which is not supported by React.

example.astro

    <div className="box" dataValue="3" /><div class="box" data-value="3" />

#### Multiple Elements

[Section titled Multiple Elements](#multiple-elements)

An Astro component template can render multiple elements with no need to wrap everything in a single `<div>` or `<>`, unlike JavaScript or JSX.

src/components/RootElements.astro

    ---// Template with multiple elements---<p>No need to wrap elements in a single containing element.</p><p>Astro supports multiple root elements in a template.</p>

#### Comments

[Section titled Comments](#comments)

In Astro, you can use standard HTML comments or JavaScript-style comments.

example.astro

    ------<!-- HTML comment syntax is valid in .astro files -->{/* JS comment syntax is also valid */}

Caution

HTML-style comments will be included in browser DOM, while JS ones will be skipped. To leave TODO messages or other development-only explanations, you may wish to use JavaScript-style comments instead.

Component utilities
-------------------

[Section titled Component utilities](#component-utilities)

### `Astro.slots`

[Section titled Astro.slots](#astroslots)

`Astro.slots` contains utility functions for modifying an Astro component’s slotted children.

#### `Astro.slots.has()`

[Section titled Astro.slots.has()](#astroslotshas)

**Type:** `(slotName: string) => boolean`

You can check whether content for a specific slot name exists with `Astro.slots.has()`. This can be useful when you want to wrap slot contents but only want to render the wrapper elements when the slot is being used.

src/pages/index.astro

    ------<slot />
    {Astro.slots.has('more') && (  <aside>    <h2>More</h2>    <slot name="more" />  </aside>)}

#### `Astro.slots.render()`

[Section titled Astro.slots.render()](#astroslotsrender)

**Type:** `(slotName: string, args?: any[]) => Promise<string>`

You can asynchronously render the contents of a slot to a string of HTML using `Astro.slots.render()`.

    ---const html = await Astro.slots.render('default');---<Fragment set:html={html} />

Note

This is for advanced use cases! In most circumstances, it is simpler to render slot contents with [the `<slot />` element](/en/basics/astro-components/#slots).

`Astro.slots.render()` optionally accepts a second argument: an array of parameters that will be forwarded to any function children. This can be useful for custom utility components.

For example, this `<Shout />` component converts its `message` prop to uppercase and passes it to the default slot:

src/components/Shout.astro

    ---const message = Astro.props.message.toUpperCase();let html = '';if (Astro.slots.has('default')) {  html = await Astro.slots.render('default', [message]);}---<Fragment set:html={html} />

A callback function passed as `<Shout />`’s child will receive the all-caps `message` parameter:

src/pages/index.astro

    ---import Shout from "../components/Shout.astro";---<Shout message="slots!">  {(message) => <div>{message}</div>}</Shout>
    <!-- renders as <div>SLOTS!</div> -->

Callback functions can be passed to named slots inside a wrapping HTML element tag with a `slot` attribute. This element is only used to transfer the callback to a named slot and will not be rendered onto the page.

    <Shout message="slots!">  <fragment slot="message">    {(message) => <div>{message}</div>}  </fragment></Shout>

Use a standard HTML element for the wrapping tag or any lowercase tag (e.g. `<fragment>` instead of `<Fragment />`) that will not be interpreted as a component. Do not use the HTML `<slot>` element as this will be interpreted as an Astro slot.

### `Astro.self`

[Section titled Astro.self](#astroself)

`Astro.self` allows Astro components to be recursively called. This behavior lets you render an Astro component from within itself by using `<Astro.self>` in the component template. This can help iterate over large data stores and nested data structures.

NestedList.astro

    ---const { items } = Astro.props;---<ul class="nested-list">  {items.map((item) => (    <li>      <!-- If there is a nested data-structure we render `<Astro.self>` -->      <!-- and can pass props through with the recursive call -->      {Array.isArray(item) ? (        <Astro.self items={item} />      ) : (        item      )}    </li>  ))}</ul>

This component could then be used like this:

    ---import NestedList from './NestedList.astro';---<NestedList items={['A', ['B', 'C'], 'D']} />

And would render HTML like this:

    <ul class="nested-list">  <li>A</li>  <li>    <ul class="nested-list">      <li>B</li>      <li>C</li>    </ul>  </li>  <li>D</li></ul>

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/astro-syntax.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Contribute to Astro](/en/contribute/) [Next  
Template directives reference](/en/reference/directives-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/cli-reference
CLI Commands
============

You can use the Command-Line Interface (CLI) provided by Astro to develop, build, and preview your project from a terminal window.

### `astro` commands

[Section titled astro commands](#astro-commands)

Use the CLI by running one of the **commands** documented on this page with your preferred package manager, optionally followed by any **flags**. Flags customize the behavior of a command.

One of the commands you’ll use most often is `astro dev`. This command starts the development server and gives you a live, updating preview of your site in a browser as you work:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-1861)
*   [pnpm](#tab-panel-1862)
*   [Yarn](#tab-panel-1863)

Terminal window

    # start the development servernpx astro dev

Terminal window

    # start the development serverpnpm astro dev

Terminal window

    # start the development serveryarn astro dev

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

You can type `astro --help` in your terminal to display a list of all available commands:

*   [npm](#tab-panel-1864)
*   [pnpm](#tab-panel-1865)
*   [Yarn](#tab-panel-1866)

Terminal window

    npx astro --help

Terminal window

    pnpm astro --help

Terminal window

    yarn astro --help

The following message will display in your terminal:

Terminal window

    astro [command] [...flags]
    Commands              add  Add an integration.            build  Build your project and write it to disk.            check  Check your project for errors.       create-key  Create a cryptography key              dev  Start the development server.             docs  Open documentation in your web browser.             info  List info about your current Astro setup.          preview  Preview your build locally.             sync  Generate TypeScript types for all Astro modules.      preferences  Configure user preferences.        telemetry  Configure telemetry settings.
    Global Flags  --config <path>  Specify your config file.    --root <path>  Specify your project root folder.     --site <url>  Specify your project site.--base <pathname>  Specify your project base.        --verbose  Enable verbose logging.         --silent  Disable all logging.        --version  Show the version number and exit.           --help  Show this help message.

You can add the `--help` flag after any command to get a list of all the flags for that command.

*   [npm](#tab-panel-1867)
*   [pnpm](#tab-panel-1868)
*   [Yarn](#tab-panel-1869)

Terminal window

    # get a list of all flags for the `dev` commandnpm run dev -- --help

Terminal window

    # get a list of all flags for the `dev` commandpnpm dev --help

Terminal window

    # get a list of all flags for the `dev` commandyarn dev --help

The following message will display in your terminal:

Terminal window

    astro dev [...flags]
    Flags                 --port  Specify which port to run on. Defaults to 4321.                 --host  Listen on all addresses, including LAN and public addresses.--host <custom-address>  Expose on a network IP address at <custom-address>                 --open  Automatically open the app in the browser on server start                --force  Clear the content layer cache, forcing a full rebuild.            --help (-h)  See all available flags.

Note

The extra `--` before any flag is necessary for `npm` to pass your flags to the `astro` command.

### `package.json` scripts

[Section titled package.json scripts](#packagejson-scripts)

You can also use scripts in `package.json` for shorter versions of these commands. Using a script allows you to use the same commands that you may be familiar with from other projects, such as `npm run build`.

The following scripts for the most common `astro` commands (`astro dev`, `astro build`, and `astro preview`) are added for you automatically when you create a project using [the `create astro` wizard](/en/install-and-setup/).

When you follow the instructions to [install Astro manually](/en/install-and-setup/#manual-setup), you are instructed to add these scripts yourself. You can also add more scripts to this list manually for any commands you use frequently.

package.json

    {  "scripts": {    "dev": "astro dev",    "build": "astro build",    "preview": "astro preview"  }}

You will often use these `astro` commands, or the scripts that run them, without any flags. Add flags to the command when you want to customize the command’s behavior. For example, you may wish to start the development server on a different port, or build your site with verbose logs for debugging.

*   [npm](#tab-panel-1870)
*   [pnpm](#tab-panel-1871)
*   [Yarn](#tab-panel-1872)

Terminal window

    # run the dev server on port 8080 using the `dev` script in `package.json`npm run dev -- --port 8080
    # build your site with verbose logs using the `build` script in `package.json`npm run build -- --verbose

Terminal window

    # run the dev server on port 8080 using the `dev` script in `package.json`pnpm dev --port 8080
    # build your site with verbose logs using the `build` script in `package.json`pnpm build --verbose

Terminal window

    # run the dev server on port 8080 using the `dev` script in `package.json`yarn dev --port 8080
    # build your site with verbose logs using the `build` script in `package.json`yarn build --verbose

`astro dev`
-----------

[Section titled astro dev](#astro-dev)

Runs Astro’s development server. This is a local HTTP server that doesn’t bundle assets. It uses Hot Module Replacement (HMR) to update your browser as you save changes in your editor.

The following hotkeys can be used in the terminal where the Astro development server is running:

*   `s + enter` to sync the content layer data (content and types).
*   `o + enter` to open your Astro site in the browser.
*   `q + enter` to quit the development server.

`astro build`
-------------

[Section titled astro build](#astro-build)

Builds your site for deployment. By default, this will generate static files and place them in a `dist/` directory. If any routes are [rendered on demand](/en/guides/on-demand-rendering/), this will generate the necessary server files to serve your site.

### Flags

[Section titled Flags](#flags)

The command accepts [common flags](#common-flags) and the following additional flags:

#### `--devOutput`

[Section titled --devOutput](#--devoutput)

**Added in:** `astro@5.0.0`

Outputs a development-based build similar to code transformed in `astro dev`. This can be useful to test build-only issues with additional debugging information included.

`astro preview`
---------------

[Section titled astro preview](#astro-preview)

Starts a local server to serve the contents of your static directory (`dist/` by default) created by running `astro build`.

This command allows you to preview your site locally [after building](#astro-build) to catch any errors in your build output before deploying it. It is not designed to be run in production. For help with production hosting, check out our guide on [Deploying an Astro Website](/en/guides/deploy/).

Since Astro 1.5.0, the [Node adapter](/en/guides/integrations-guide/node/) supports `astro preview` for builds generated with on-demand rendering.

Can be combined with the [common flags](#common-flags) documented below.

`astro check`
-------------

[Section titled astro check](#astro-check)

Runs diagnostics (such as type-checking within `.astro` files) against your project and reports errors to the console. If any errors are found the process will exit with a code of **1**.

This command is intended to be used in CI workflows.

### Flags

Use these flags to customize the behavior of the command.

#### `--watch`

[Section titled --watch](#--watch)

The command will watch for any changes in your project, and will report any errors.

#### `--root <path-to-dir>`

[Section titled --root &lt;path-to-dir&gt;](#--root-path-to-dir)

Specifies a different root directory to check. Uses the current working directory by default.

#### `--tsconfig <path-to-file>`

[Section titled --tsconfig &lt;path-to-file&gt;](#--tsconfig-path-to-file)

Specifies a `tsconfig.json` file to use manually. If not provided, Astro will attempt to find a config, or infer the project’s config automatically.

#### `--minimumFailingSeverity <error|warning|hint>`

[Section titled --minimumFailingSeverity &lt;error|warning|hint&gt;](#--minimumfailingseverity-errorwarninghint)

Specifies the minimum severity needed to exit with an error code. Defaults to `error`.

For example, running `astro check --minimumFailingSeverity warning` will cause the command to exit with an error if any warnings are detected.

#### `--minimumSeverity <error|warning|hint>`

[Section titled --minimumSeverity &lt;error|warning|hint&gt;](#--minimumseverity-errorwarninghint)

Specifies the minimum severity to output. Defaults to `hint`.

For example, running `astro check --minimumSeverity warning` will show errors and warning, but not hints.

#### `--preserveWatchOutput`

[Section titled --preserveWatchOutput](#--preservewatchoutput)

Specifies not to clear the output between checks when in watch mode.

#### `--noSync`

[Section titled --noSync](#--nosync)

Specifies not to run `astro sync` before checking the project.

Read more about [type checking in Astro](/en/guides/typescript/#type-checking).

`astro sync`
------------

[Section titled astro sync](#astro-sync)

**Added in:** `astro@2.0.0`

Tip

Running `astro dev`, `astro build` or `astro check` will run the `sync` command as well.

Generates TypeScript types for all Astro modules. This sets up a [`.astro/types.d.ts` file](/en/guides/typescript/#setup) for type inferencing, and defines modules for features that rely on generated types:

*   The `astro:content` module for the [Content Collections API](/en/guides/content-collections/).
*   The `astro:db` module for [Astro DB](/en/guides/astro-db/).
*   The `astro:env` module for [Astro Env](/en/guides/environment-variables/).
*   The `astro:actions` module for [Astro Actions](/en/guides/actions/)

`astro add`
-----------

[Section titled astro add](#astro-add)

Adds an integration to your configuration. Read more in [the integrations guide](/en/guides/integrations-guide/#automatic-integration-setup).

`astro docs`
------------

[Section titled astro docs](#astro-docs)

Launches the Astro Docs website directly from the terminal.

`astro info`
------------

[Section titled astro info](#astro-info)

Reports useful information about your current Astro environment. Useful for providing information when opening an issue.

Terminal window

    astro info

Example output:

    Astro                    v3.0.12Node                     v20.5.1System                   macOS (arm64)Package Manager          pnpmOutput                   serverAdapter                  @astrojs/vercel/serverlessIntegrations             none

`astro preferences`
-------------------

[Section titled astro preferences](#astro-preferences)

Manage user preferences with the `astro preferences` command. User preferences are specific to individual Astro users, unlike the `astro.config.mjs` file which changes behavior for everyone working on a project.

User preferences are scoped to the current project by default, stored in a local `.astro/settings.json` file.

Using the `--global` flag, user preferences can also be applied to every Astro project on the current machine. Global user preferences are stored in an operating system-specific location.

### Available preferences

*   `devToolbar` — Enable or disable the development toolbar in the browser. (Default: `true`)
*   `checkUpdates` — Enable or disable automatic update checks for the Astro CLI. (Default: `true`)

The `list` command prints the current settings of all configurable user preferences. It also supports a machine-readable `--json` output.

Terminal window

    astro preferences list

Example terminal output:

Preference

Value

devToolbar.enabled

true

checkUpdates.enabled

true

You can `enable`, `disable`, or `reset` preferences to their default.

For example, to disable the devToolbar in a specific Astro project:

Terminal window

    astro preferences disable devToolbar

To disable the devToolbar in all Astro projects on the current machine:

Terminal window

    astro preferences disable --global devToolbar

The devToolbar can later be enabled with:

Terminal window

    astro preferences enable devToolbar

The `reset` command resets a preference to its default value:

Terminal window

    astro preferences reset devToolbar

`astro telemetry`
-----------------

[Section titled astro telemetry](#astro-telemetry)

Sets telemetry configuration for the current CLI user. Telemetry is anonymous data that provides the Astro team insights into which Astro features are most often used. For more information see [Astro’s telemetry page](https://astro.build/telemetry/).

Telemetry can be disabled with this CLI command:

Terminal window

    astro telemetry disable

Telemetry can later be re-enabled with:

Terminal window

    astro telemetry enable

The `reset` command resets the telemetry data:

Terminal window

    astro telemetry reset

Want to disable telemetry in CI environments?

Add the `astro telemetry disable` command to your CI scripts or set the `ASTRO_TELEMETRY_DISABLED` environment variable.

Common flags
------------

[Section titled Common flags](#common-flags)

### `--root <path>`

[Section titled --root &lt;path&gt;](#--root-path)

Specifies the path to the project root. If not specified, the current working directory is assumed to be the root.

The root is used for finding the Astro configuration file.

Terminal window

    astro --root myRootFolder/myProjectFolder dev

### `--config <path>`

[Section titled --config &lt;path&gt;](#--config-path)

Specifies the path to the config file relative to the project root. Defaults to `astro.config.mjs`. Use this if you use a different name for your configuration file or have your config file in another folder.

Terminal window

    astro --config config/astro.config.mjs dev

### `--force <string>`

[Section titled --force &lt;string&gt;](#--force-string)

**Added in:** `astro@5.0.0`

Clear the [content layer cache](/en/guides/content-collections/#defining-the-collection-loader), forcing a full rebuild.

### `--mode <string>`

[Section titled --mode &lt;string&gt;](#--mode-string)

**Added in:** `astro@5.0.0`

Configures the [`mode`](/en/reference/programmatic-reference/#mode) inline config for your project.

### `--outDir <path>`

[Section titled --outDir &lt;path&gt;](#--outdir-path)

**Added in:** `astro@3.3.0`

Configures the [`outDir`](/en/reference/configuration-reference/#outdir) for your project. Passing this flag will override the `outDir` value in your `astro.config.mjs` file, if one exists.

### `--site <url>`

[Section titled --site &lt;url&gt;](#--site-url)

Configures the [`site`](/en/reference/configuration-reference/#site) for your project. Passing this flag will override the `site` value in your `astro.config.mjs` file, if one exists.

### `--base <pathname>`

[Section titled --base &lt;pathname&gt;](#--base-pathname)

**Added in:** `astro@1.4.1`

Configures the [`base`](/en/reference/configuration-reference/#base) for your project. Passing this flag will override the `base` value in your `astro.config.mjs` file, if one exists.

### `--port <number>`

[Section titled --port &lt;number&gt;](#--port-number)

Specifies which port to run the dev server and preview server on. Defaults to `4321`.

### `--host [optional host address]`

[Section titled --host \[optional host address\]](#--host-optional-host-address)

Sets which network IP addresses the dev server and preview server should listen on (i.e. non-localhost IPs). This can be useful for testing your project on local devices like a mobile phone during development.

*   `--host` — listen on all addresses, including LAN and public addresses
*   `--host <custom-address>` — expose on a network IP address at `<custom-address>`

Caution

Do not use the `--host` flag to expose the dev server and preview server in a production environment. The servers are designed for local use while developing your site only.

### `--allowed-hosts`

[Section titled --allowed-hosts](#--allowed-hosts)

**Added in:** `astro@5.4.0`

Specifies the hostnames that Astro is allowed to respond to in `dev` or `preview` modes. Can be passed a comma-separated list of hostnames or `true` to allow any hostname.

Refer to [Vite’s `allowedHosts` feature](https://vite.dev/config/server-options.html#server-allowedhosts) for more information, including security implications of allowing hostnames.

### `--verbose`

[Section titled --verbose](#--verbose)

Enables verbose logging, which is helpful when debugging an issue.

### `--silent`

[Section titled --silent](#--silent)

Enables silent logging, which will run the server without any console output.

### `--open`

[Section titled --open](#--open)

Automatically opens the app in the browser on server start. Can be passed a full URL string (e.g. `--open http://example.com`) or a pathname (e.g. `--open /about`) to specify the URL to open.

Global flags
------------

[Section titled Global flags](#global-flags)

Use these flags to get information about the `astro` CLI.

### `--version`

[Section titled --version](#--version)

Prints the Astro version number and exits.

### `--help`

[Section titled --help](#--help)

Prints the help message and exits.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/cli-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Configuration Reference](/en/reference/configuration-reference/) [Next  
Imports reference](/en/guides/imports/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/configuration-reference
Configuration Reference
=======================

The following reference covers all supported configuration options in Astro. To learn more about configuring Astro, read our guide on [Configuring Astro](/en/guides/configuring-astro/).

astro.config.mjs

    import { defineConfig } from 'astro/config'
    export default defineConfig({  // your configuration options here...})

Top-Level Options
-----------------

[Section titled Top-Level Options](#top-level-options)

### site

[Section titled site](#site)

**Type:** `string`

Your final, deployed URL. Astro uses this full URL to generate your sitemap and canonical URLs in your final build. It is strongly recommended that you set this configuration to get the most out of Astro.

    {  site: 'https://www.my-site.dev'}

### base

[Section titled base](#base)

**Type:** `string`

The base path to deploy to. Astro will use this path as the root for your pages and assets both in development and in production build.

In the example below, `astro dev` will start your server at `/docs`.

    {  base: '/docs'}

When using this option, all of your static asset imports and URLs should add the base as a prefix. You can access this value via `import.meta.env.BASE_URL`.

The value of `import.meta.env.BASE_URL` will be determined by your `trailingSlash` config, no matter what value you have set for `base`.

A trailing slash is always included if `trailingSlash: "always"` is set. If `trailingSlash: "never"` is set, `BASE_URL` will not include a trailing slash, even if `base` includes one.

Additionally, Astro will internally manipulate the configured value of `config.base` before making it available to integrations. The value of `config.base` as read by integrations will also be determined by your `trailingSlash` configuration in the same way.

In the example below, the values of `import.meta.env.BASE_URL` and `config.base` when processed will both be `/docs`:

    {   base: '/docs/',   trailingSlash: "never"}

In the example below, the values of `import.meta.env.BASE_URL` and `config.base` when processed will both be `/docs/`:

    {   base: '/docs',   trailingSlash: "always"}

### trailingSlash

[Section titled trailingSlash](#trailingslash)

**Type:** `'always' | 'never' | 'ignore'`  
**Default:** `'ignore'`

Set the route matching behavior for trailing slashes in the dev server and on-demand rendered pages. Choose from the following options:

*   `'ignore'` - Match URLs regardless of whether a trailing ”/” exists. Requests for “/about” and “/about/” will both match the same route.
*   `'always'` - Only match URLs that include a trailing slash (e.g: “/about/”). In production, requests for on-demand rendered URLs without a trailing slash will be redirected to the correct URL for your convenience. However, in development, they will display a warning page reminding you that you have `always` configured.
*   `'never'` - Only match URLs that do not include a trailing slash (e.g: “/about”). In production, requests for on-demand rendered URLs with a trailing slash will be redirected to the correct URL for your convenience. However, in development, they will display a warning page reminding you that you have `never` configured.

When redirects occur in production for GET requests, the redirect will be a 301 (permanent) redirect. For all other request methods, it will be a 308 (permanent, and preserve the request method) redirect.

Trailing slashes on prerendered pages are handled by the hosting platform, and may not respect your chosen configuration. See your hosting platform’s documentation for more information. You cannot use Astro [redirects](#redirects) for this use case at this point.

    {  // Example: Require a trailing slash during development  trailingSlash: 'always'}

**See Also:**

*   build.format

### redirects

[Section titled redirects](#redirects)

**Type:** `Record<string, RedirectConfig>`  
**Default:** `{}`  

**Added in:** `astro@2.9.0`

Specify a mapping of redirects where the key is the route to match and the value is the path to redirect to.

You can redirect both static and dynamic routes, but only to the same kind of route. For example, you cannot have a `'/article': '/blog/[...slug]'` redirect.

    export default defineConfig({  redirects: {   '/old': '/new',   '/blog/[...slug]': '/articles/[...slug]',   '/about': 'https://example.com/about',   '/news': {     status: 302,     destination: 'https://example.com/news'   },   // '/product1/', '/product1' // Note, this is not supported  }})

For statically-generated sites with no adapter installed, this will produce a client redirect using a [`<meta http-equiv="refresh">` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#http-equiv) and does not support status codes.

When using SSR or with a static adapter in `output: static` mode, status codes are supported. Astro will serve redirected GET requests with a status of `301` and use a status of `308` for any other request method.

You can customize the [redirection status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages) using an object in the redirect config:

    export default defineConfig({  redirects: {    '/other': {      status: 302,      destination: '/place',    },  }})

### output

[Section titled output](#output)

**Type:** `'static' | 'server'`  
**Default:** `'static'`

Specifies the output target for builds.

*   `'static'` - Prerender all your pages by default, outputting a completely static site if none of your pages opt out of prerendering.
*   `'server'` - Use server-side rendering (SSR) for all pages by default, always outputting a server-rendered site.

    import { defineConfig } from 'astro/config';
    export default defineConfig({  output: 'static'})

**See Also:**

*   adapter

### adapter

[Section titled adapter](#adapter)

**Type:** `AstroIntegration`

Deploy to your favorite server, serverless, or edge host with build adapters. Import one of our first-party adapters ([Cloudflare](/en/guides/integrations-guide/cloudflare/), [Netlify](/en/guides/integrations-guide/netlify/), [Node.js](/en/guides/integrations-guide/node/), [Vercel](/en/guides/integrations-guide/vercel/)) or explore [community adapters](https://astro.build/integrations/2/?search=&categories%5B%5D=adapters) to enable on-demand rendering in your Astro project.

See our [on-demand rendering guide](/en/guides/on-demand-rendering/) for more on Astro’s server rendering options.

    import netlify from '@astrojs/netlify';{  // Example: Build for Netlify serverless deployment  adapter: netlify(),}

**See Also:**

*   output

### integrations

[Section titled integrations](#integrations)

**Type:** `AstroIntegration[]`

Extend Astro with custom integrations. Integrations are your one-stop-shop for adding framework support (like Solid.js), new features (like sitemaps), and new libraries (like Partytown).

Read our [Integrations Guide](/en/guides/integrations-guide/) for help getting started with Astro Integrations.

    import react from '@astrojs/react';import mdx from '@astrojs/mdx';{  // Example: Add React + MDX support to Astro  integrations: [react(), mdx()]}

### root

[Section titled root](#root)

**Type:** `string`  
**CLI:** `--root`  
**Default:** `"."` (current working directory)

You should only provide this option if you run the `astro` CLI commands in a directory other than the project root directory. Usually, this option is provided via the CLI instead of the Astro config file, since Astro needs to know your project root before it can locate your config file.

If you provide a relative path (ex: `--root: './my-project'`) Astro will resolve it against your current working directory.

#### Examples

[Section titled Examples](#examples)

    {  root: './my-project-directory'}

Terminal window

    $ astro build --root ./my-project-directory

### srcDir

[Section titled srcDir](#srcdir)

**Type:** `string`  
**Default:** `"./src"`

Set the directory that Astro will read your site from.

The value can be either an absolute file system path or a path relative to the project root.

    {  srcDir: './www'}

### publicDir

[Section titled publicDir](#publicdir)

**Type:** `string`  
**Default:** `"./public"`

Set the directory for your static assets. Files in this directory are served at `/` during dev and copied to your build directory during build. These files are always served or copied as-is, without transform or bundling.

The value can be either an absolute file system path or a path relative to the project root.

    {  publicDir: './my-custom-publicDir-directory'}

### outDir

[Section titled outDir](#outdir)

**Type:** `string`  
**Default:** `"./dist"`

Set the directory that `astro build` writes your final build to.

The value can be either an absolute file system path or a path relative to the project root.

    {  outDir: './my-custom-build-directory'}

**See Also:**

*   build.server

### cacheDir

[Section titled cacheDir](#cachedir)

**Type:** `string`  
**Default:** `"./node_modules/.astro"`

Set the directory for caching build artifacts. Files in this directory will be used in subsequent builds to speed up the build time.

The value can be either an absolute file system path or a path relative to the project root.

    {  cacheDir: './my-custom-cache-directory'}

### compressHTML

[Section titled compressHTML](#compresshtml)

**Type:** `boolean`  
**Default:** `true`

This is an option to minify your HTML output and reduce the size of your HTML files.

By default, Astro removes whitespace from your HTML, including line breaks, from `.astro` components in a lossless manner. Some whitespace may be kept as needed to preserve the visual rendering of your HTML. This occurs both in development mode and in the final build.

To disable HTML compression, set `compressHTML` to false.

    {  compressHTML: false}

### scopedStyleStrategy

[Section titled scopedStyleStrategy](#scopedstylestrategy)

**Type:** `'where' | 'class' | 'attribute'`  
**Default:** `'attribute'`  

**Added in:** `astro@2.4`

Specify the strategy used for scoping styles within Astro components. Choose from:

*   `'where'` - Use `:where` selectors, causing no specificity increase.
*   `'class'` - Use class-based selectors, causing a +1 specificity increase.
*   `'attribute'` - Use `data-` attributes, causing a +1 specificity increase.

Using `'class'` is helpful when you want to ensure that element selectors within an Astro component override global style defaults (e.g. from a global stylesheet). Using `'where'` gives you more control over specificity, but requires that you use higher-specificity selectors, layers, and other tools to control which selectors are applied. Using `'attribute'` is useful when you are manipulating the `class` attribute of elements and need to avoid conflicts between your own styling logic and Astro’s application of styles.

### security

[Section titled security](#security)

**Type:** `Record<"checkOrigin", boolean> | undefined`  
**Default:** `{checkOrigin: true}`  

**Added in:** `astro@4.9.0`

Enables security measures for an Astro website.

These features only exist for pages rendered on demand (SSR) using `server` mode or pages that opt out of prerendering in `static` mode.

By default, Astro will automatically check that the “origin” header matches the URL sent by each request in on-demand rendered pages. You can disable this behavior by setting `checkOrigin` to `false`:

astro.config.mjs

    export default defineConfig({  output: "server",  security: {    checkOrigin: false  }})

#### security.checkOrigin

[Section titled security.checkOrigin](#securitycheckorigin)

**Type:** `boolean`  
**Default:** `true`  

**Added in:** `astro@4.9.0`

Performs a check that the “origin” header, automatically passed by all modern browsers, matches the URL sent by each `Request`. This is used to provide Cross-Site Request Forgery (CSRF) protection.

The “origin” check is executed only for pages rendered on demand, and only for the requests `POST`, `PATCH`, `DELETE` and `PUT` with one of the following `content-type` headers: `'application/x-www-form-urlencoded'`, `'multipart/form-data'`, `'text/plain'`.

If the “origin” header doesn’t match the `pathname` of the request, Astro will return a 403 status code and will not render the page.

### vite

[Section titled vite](#vite)

**Type:** `ViteUserConfig`

Pass additional configuration options to Vite. Useful when Astro doesn’t support some advanced configuration that you may need.

View the full `vite` configuration object documentation on [vite.dev](https://vite.dev/config/).

#### Examples

[Section titled Examples](#examples-1)

    {  vite: {    ssr: {      // Example: Force a broken package to skip SSR processing, if needed      external: ['broken-npm-package'],    }  }}

    {  vite: {    // Example: Add custom vite plugins directly to your Astro project    plugins: [myPlugin()],  }}

Build Options
-------------

[Section titled Build Options](#build-options)

### build.format

[Section titled build.format](#buildformat)

**Type:** `('file' | 'directory' | 'preserve')`  
**Default:** `'directory'`

Control the output file format of each page. This value may be set by an adapter for you.

*   `'file'`: Astro will generate an HTML file named for each page route. (e.g. `src/pages/about.astro` and `src/pages/about/index.astro` both build the file `/about.html`)
*   `'directory'`: Astro will generate a directory with a nested `index.html` file for each page. (e.g. `src/pages/about.astro` and `src/pages/about/index.astro` both build the file `/about/index.html`)
*   `'preserve'`: Astro will generate HTML files exactly as they appear in your source folder. (e.g. `src/pages/about.astro` builds `/about.html` and `src/pages/about/index.astro` builds the file `/about/index.html`)

    {  build: {    // Example: Generate `page.html` instead of `page/index.html` during build.    format: 'file'  }}

#### Effect on Astro.url

[Section titled Effect on Astro.url](#effect-on-astrourl)

Setting `build.format` controls what `Astro.url` is set to during the build. When it is:

*   `directory` - The `Astro.url.pathname` will include a trailing slash to mimic folder behavior. (e.g. `/foo/`)
*   `file` - The `Astro.url.pathname` will include `.html`. (e.g. `/foo.html`)

This means that when you create relative URLs using `new URL('./relative', Astro.url)`, you will get consistent behavior between dev and build.

To prevent inconsistencies with trailing slash behaviour in dev, you can restrict the [`trailingSlash` option](#trailingslash) to `'always'` or `'never'` depending on your build format:

*   `directory` - Set `trailingSlash: 'always'`
*   `file` - Set `trailingSlash: 'never'`

### build.client

[Section titled build.client](#buildclient)

**Type:** `string`  
**Default:** `'./client'`

Controls the output directory of your client-side CSS and JavaScript when building a website with server-rendered pages. `outDir` controls where the code is built to.

This value is relative to the `outDir`.

    {  output: 'server',  build: {    client: './client'  }}

### build.server

[Section titled build.server](#buildserver)

**Type:** `string`  
**Default:** `'./server'`

Controls the output directory of server JavaScript when building to SSR.

This value is relative to the `outDir`.

    {  build: {    server: './server'  }}

### build.assets

[Section titled build.assets](#buildassets)

**Type:** `string`  
**Default:** `'_astro'`  

**Added in:** `astro@2.0.0`

Specifies the directory in the build output where Astro-generated assets (bundled JS and CSS for example) should live.

    {  build: {    assets: '_custom'  }}

**See Also:**

*   outDir

### build.assetsPrefix

[Section titled build.assetsPrefix](#buildassetsprefix)

**Type:** `string | Record<string, string>`  
**Default:** `undefined`  

**Added in:** `astro@2.2.0`

Specifies the prefix for Astro-generated asset links. This can be used if assets are served from a different domain than the current site.

This requires uploading the assets in your local `./dist/_astro` folder to a corresponding `/_astro/` folder on the remote domain. To rename the `_astro` path, specify a new directory in `build.assets`.

To fetch all assets uploaded to the same domain (e.g. `https://cdn.example.com/_astro/...`), set `assetsPrefix` to the root domain as a string (regardless of your `base` configuration):

    {  build: {    assetsPrefix: 'https://cdn.example.com'  }}

**Added in:** `astro@4.5.0`

You can also pass an object to `assetsPrefix` to specify a different domain for each file type. In this case, a `fallback` property is required and will be used by default for any other files.

    {  build: {    assetsPrefix: {      'js': 'https://js.cdn.example.com',      'mjs': 'https://js.cdn.example.com',      'css': 'https://css.cdn.example.com',      'fallback': 'https://cdn.example.com'    }  }}

### build.serverEntry

[Section titled build.serverEntry](#buildserverentry)

**Type:** `string`  
**Default:** `'entry.mjs'`

Specifies the file name of the server entrypoint when building to SSR. This entrypoint is usually dependent on which host you are deploying to and will be set by your adapter for you.

Note that it is recommended that this file ends with `.mjs` so that the runtime detects that the file is a JavaScript module.

    {  build: {    serverEntry: 'main.mjs'  }}

### build.redirects

[Section titled build.redirects](#buildredirects)

**Type:** `boolean`  
**Default:** `true`  

**Added in:** `astro@2.6.0`

Specifies whether redirects will be output to HTML during the build. This option only applies to `output: 'static'` mode; in SSR redirects are treated the same as all responses.

This option is mostly meant to be used by adapters that have special configuration files for redirects and do not need/want HTML based redirects.

    {  build: {    redirects: false  }}

### build.inlineStylesheets

[Section titled build.inlineStylesheets](#buildinlinestylesheets)

**Type:** `'always' | 'auto' | 'never'`  
**Default:** `auto`  

**Added in:** `astro@2.6.0`

Control whether project styles are sent to the browser in a separate css file or inlined into `<style>` tags. Choose from the following options:

*   `'always'` - project styles are inlined into `<style>` tags
*   `'auto'` - only stylesheets smaller than `ViteConfig.build.assetsInlineLimit` (default: 4kb) are inlined. Otherwise, project styles are sent in external stylesheets.
*   `'never'` - project styles are sent in external stylesheets

    {  build: {    inlineStylesheets: `never`,  },}

### build.concurrency

[Section titled build.concurrency](#buildconcurrency)

**Type:** `number`  
**Default:** `1`  

**Added in:** `astro@4.16.0`

The number of pages to build in parallel.

**In most cases, you should not change the default value of `1`.**

Use this option only when other attempts to reduce the overall rendering time (e.g. batch or cache long running tasks like fetch calls or data access) are not possible or are insufficient. If the number is set too high, page rendering may slow down due to insufficient memory resources and because JS is single-threaded.

    {  build: {    concurrency: 2  }}

Breaking changes possible

This feature is stable and is not considered experimental. However, this feature is only intended to address difficult performance issues, and breaking changes may occur in a [minor release](/en/upgrade-astro/#semantic-versioning) to keep this option as performant as possible. Please check the [Astro CHANGELOG](https://github.com/withastro/astro/blob/refs/heads/next/packages/astro/CHANGELOG.md) for every minor release if you are using this feature.

Server Options
--------------

[Section titled Server Options](#server-options)

Customize the Astro dev server, used by both `astro dev` and `astro preview`.

    {  server: { port: 1234, host: true}}

To set different configuration based on the command run (“dev”, “preview”) a function can also be passed to this configuration option.

    {  // Example: Use the function syntax to customize based on command  server: ({ command }) => ({ port: command === 'dev' ? 4321 : 4000 })}

### server.host

[Section titled server.host](#serverhost)

**Type:** `string | boolean`  
**Default:** `false`  

**Added in:** `astro@0.24.0`

Set which network IP addresses the server should listen on (i.e. non-localhost IPs).

*   `false` - do not expose on a network IP address
*   `true` - listen on all addresses, including LAN and public addresses
*   `[custom-address]` - expose on a network IP address at `[custom-address]` (ex: `192.168.0.1`)

### server.port

[Section titled server.port](#serverport)

**Type:** `number`  
**Default:** `4321`

Set which port the server should listen on.

If the given port is already in use, Astro will automatically try the next available port.

    {  server: { port: 8080 }}

### server.allowedHosts

[Section titled server.allowedHosts](#serverallowedhosts)

**Type:** `Array<string> | true`  
**Default:** `[]`  

**Added in:** `astro@5.4.0`

A list of hostnames that Astro is allowed to respond to. When the value is set to `true`, any hostname is allowed.

    {  server: {    allowedHosts: ['staging.example.com', 'qa.example.com']  }}

### server.open

[Section titled server.open](#serveropen)

**Type:** `string | boolean`  
**Default:** `false`  

**Added in:** `astro@4.1.0`

Controls whether the dev server should open in your browser window on startup.

Pass a full URL string (e.g. “[http://example.com](http://example.com)”) or a pathname (e.g. “/about”) to specify the URL to open.

    {  server: { open: "/about" }}

### server.headers

[Section titled server.headers](#serverheaders)

**Type:** `OutgoingHttpHeaders`  
**Default:** `{}`  

**Added in:** `astro@1.7.0`

Set custom HTTP response headers to be sent in `astro dev` and `astro preview`.

Session Options
---------------

[Section titled Session Options](#session-options)

**Added in:** `astro@5.7.0`

Configures session storage for your Astro project. This is used to store session data in a persistent way, so that it can be accessed across different requests. Some adapters may provide a default session driver, but you can override it with your own configuration.

See [the sessions guide](/en/guides/sessions/) for more information.

astro.config.mjs

      {    session: {      // The name of the Unstorage driver      driver: 'redis',      // The required options depend on the driver      options: {        url: process.env.REDIS_URL,      },      ttl: 3600, // 1 hour    }  }

### session.driver

[Section titled session.driver](#sessiondriver)

**Type:** `string | undefined`  

**Added in:** `astro@5.7.0`

The Unstorage driver to use for session storage. The [Node](/en/guides/integrations-guide/node/#sessions), [Cloudflare](/en/guides/integrations-guide/cloudflare/#sessions), and [Netlify](/en/guides/integrations-guide/netlify/#sessions) adapters automatically configure a default driver for you, but you can specify your own if you would prefer or if you are using an adapter that does not provide one.

The value is the “Driver name” from the [Unstorage driver documentation](https://unstorage.unjs.io/drivers).

astro.config.mjs

    {  adapter: vercel(),  session: {    driver: "redis",  },}

Note

Some drivers may need extra packages to be installed. Some drivers may also require environment variables or credentials to be set. See the [Unstorage documentation](https://unstorage.unjs.io/drivers) for more information.

### session.options

[Section titled session.options](#sessionoptions)

**Type:** `Record<string, unknown> | undefined`  
**Default:** `{}`  

**Added in:** `astro@5.7.0`

The driver-specific options to use for session storage. The options depend on the driver you are using. See the [Unstorage documentation](https://unstorage.unjs.io/drivers) for more information on the options available for each driver.

astro.config.mjs

    {   session: {     driver: "redis",     options: {       url: process.env.REDIS_URL     },   }}

### session.cookie

[Section titled session.cookie](#sessioncookie)

**Type:** `string | AstroCookieSetOptions | undefined`  
**Default:** `{ name: "astro-session", sameSite: "lax", httpOnly: true, secure: true }`  

**Added in:** `astro@5.7.0`

The session cookie configuration. If set to a string, it will be used as the cookie name. Alternatively, you can pass an object with additional options. These will be merged with the defaults.

astro.config.mjs

    { session: {   // If set to a string, it will be used as the cookie name.   cookie: "my-session-cookie", }}

astro.config.mjs

    { session: {   // If set to an object, it will be used as the cookie options.   cookie: {     name: "my-session-cookie",     sameSite: "lax",     secure: true,   } }}

### session.ttl

[Section titled session.ttl](#sessionttl)

**Type:** `number | undefined`  
**Default:** Infinity  

**Added in:** `astro@5.7.0`

An optional default time-to-live expiration period for session values, in seconds.

By default, session values persist until they are deleted or the session is destroyed, and do not automatically expire because a particular amount of time has passed. Set `session.ttl` to add a default expiration period for your session values. Passing a `ttl` option to [`session.set()`](/en/reference/api-reference/#set) will override the global default for that individual entry.

astro.config.mjs

    { session: {   // Set a default expiration period of 1 hour (3600 seconds)   ttl: 3600, }}

Note

Setting a value for `ttl` does not automatically delete the value from storage after the time limit has passed.

Values from storage will only be deleted when there is an attempt to access them after the `ttl` period has expired. At this time, the session value will be undefined and only then will the value be deleted.

Individual drivers may also support a `ttl` option that will automatically delete sessions after the specified time. See your chosen driver’s documentation for more information.

Dev Toolbar Options
-------------------

[Section titled Dev Toolbar Options](#dev-toolbar-options)

### devToolbar.enabled

[Section titled devToolbar.enabled](#devtoolbarenabled)

**Type:** `boolean`  
**Default:** `true`

Whether to enable the Astro Dev Toolbar. This toolbar allows you to inspect your page islands, see helpful audits on performance and accessibility, and more.

This option is scoped to the entire project, to only disable the toolbar for yourself, run `npm run astro preferences disable devToolbar`. To disable the toolbar for all your Astro projects, run `npm run astro preferences disable devToolbar --global`.

Prefetch Options
----------------

[Section titled Prefetch Options](#prefetch-options)

**Type:** `boolean | object`

Enable prefetching for links on your site to provide faster page transitions. (Enabled by default on pages using the `<ClientRouter />` router. Set `prefetch: false` to opt out of this behaviour.)

This configuration automatically adds a prefetch script to every page in the project giving you access to the `data-astro-prefetch` attribute. Add this attribute to any `<a />` link on your page to enable prefetching for that page.

    <a href="/about" data-astro-prefetch>About</a>

Further customize the default prefetching behavior using the [`prefetch.defaultStrategy`](#prefetchdefaultstrategy) and [`prefetch.prefetchAll`](#prefetchprefetchall) options.

See the [Prefetch guide](/en/guides/prefetch/) for more information.

### prefetch.prefetchAll

[Section titled prefetch.prefetchAll](#prefetchprefetchall)

**Type:** `boolean`

Enable prefetching for all links, including those without the `data-astro-prefetch` attribute. This value defaults to `true` when using the `<ClientRouter />` router. Otherwise, the default value is `false`.

    prefetch: {  prefetchAll: true}

When set to `true`, you can disable prefetching individually by setting `data-astro-prefetch="false"` on any individual links.

    <a href="/about" data-astro-prefetch="false">About</a>

### prefetch.defaultStrategy

[Section titled prefetch.defaultStrategy](#prefetchdefaultstrategy)

**Type:** `'tap' | 'hover' | 'viewport' | 'load'`  
**Default:** `'hover'`

The default prefetch strategy to use when the `data-astro-prefetch` attribute is set on a link with no value.

*   `'tap'`: Prefetch just before you click on the link.
*   `'hover'`: Prefetch when you hover over or focus on the link. (default)
*   `'viewport'`: Prefetch as the links enter the viewport.
*   `'load'`: Prefetch all links on the page after the page is loaded.

You can override this default value and select a different strategy for any individual link by setting a value on the attribute.

    <a href="/about" data-astro-prefetch="viewport">About</a>

Image Options
-------------

[Section titled Image Options](#image-options)

### image.endpoint

[Section titled image.endpoint](#imageendpoint)

**Type:** `Object`  
**Default:** `{route: '/_image', entrypoint: undefined}`  

**Added in:** `astro@3.1.0`

Set the endpoint to use for image optimization in dev and SSR. The `entrypoint` property can be set to `undefined` to use the default image endpoint.

    {  image: {    // Example: Use a custom image endpoint at `/custom_endpoint`    endpoint: {       route: '/custom_endpoint',       entrypoint: 'src/my_endpoint.ts',    },  },}

### image.service

[Section titled image.service](#imageservice)

**Type:** `Object`  
**Default:** `{entrypoint: 'astro/assets/services/sharp', config?: {}}`  

**Added in:** `astro@2.1.0`

Set which image service is used for Astro’s assets support.

The value should be an object with an entrypoint for the image service to use and optionally, a config object to pass to the service.

The service entrypoint can be either one of the included services, or a third-party package.

    {  image: {    // Example: Enable the Sharp-based image service with a custom config    service: {       entrypoint: 'astro/assets/services/sharp',       config: {         limitInputPixels: false,      },     },  },}

#### image.service.config.limitInputPixels

[Section titled image.service.config.limitInputPixels](#imageserviceconfiglimitinputpixels)

**Type:** `number | boolean`  
**Default:** `true`  

**Added in:** `astro@4.1.0`

Whether or not to limit the size of images that the Sharp image service will process.

Set `false` to bypass the default image size limit for the Sharp image service and process large images.

### image.domains

[Section titled image.domains](#imagedomains)

**Type:** `Array<string>`  
**Default:** `[]`  

**Added in:** `astro@2.10.10`

Defines a list of permitted image source domains for remote image optimization. No other remote images will be optimized by Astro.

This option requires an array of individual domain names as strings. Wildcards are not permitted. Instead, use [`image.remotePatterns`](#imageremotepatterns) to define a list of allowed source URL patterns.

astro.config.mjs

    {  image: {    // Example: Allow remote image optimization from a single domain    domains: ['astro.build'],  },}

### image.remotePatterns

[Section titled image.remotePatterns](#imageremotepatterns)

**Type:** `Array<RemotePattern>`  
**Default:** `[]`  

**Added in:** `astro@2.10.10`

Defines a list of permitted image source URL patterns for remote image optimization.

`remotePatterns` can be configured with four properties:

1.  protocol
2.  hostname
3.  port
4.  pathname

    {  image: {    // Example: allow processing all images from your aws s3 bucket    remotePatterns: [{      protocol: 'https',      hostname: '**.amazonaws.com',    }],  },}

You can use wildcards to define the permitted `hostname` and `pathname` values as described below. Otherwise, only the exact values provided will be configured: `hostname`:

*   Start with ’\*\*.’ to allow all subdomains (‘endsWith’).
*   Start with ’\*.’ to allow only one level of subdomain.

`pathname`:

*   End with ’/\*\*’ to allow all sub-routes (‘startsWith’).
*   End with ’/\*’ to allow only one level of sub-route.

### image.experimentalLayout

[Section titled image.experimentalLayout](#imageexperimentallayout)

**Type:** `ImageLayout`  
**Default:** `undefined`

The default layout type for responsive images. Can be overridden by the `layout` prop on the image component. Requires the `experimental.responsiveImages` flag to be enabled.

*   `constrained` - The image will scale to fit the container, maintaining its aspect ratio, but will not exceed the specified dimensions.
*   `fixed` - The image will maintain its original dimensions.
*   `full-width` - The image will scale to fit the container, maintaining its aspect ratio.

### image.experimentalObjectFit

[Section titled image.experimentalObjectFit](#imageexperimentalobjectfit)

**Type:** `ImageFit`  
**Default:** `"cover"`

The default object-fit value for responsive images. Can be overridden by the `fit` prop on the image component. Requires the `experimental.responsiveImages` flag to be enabled.

### image.experimentalObjectPosition

[Section titled image.experimentalObjectPosition](#imageexperimentalobjectposition)

**Type:** `string`  
**Default:** `"center"`

The default object-position value for responsive images. Can be overridden by the `position` prop on the image component. Requires the `experimental.responsiveImages` flag to be enabled.

### image.experimentalBreakpoints

[Section titled image.experimentalBreakpoints](#imageexperimentalbreakpoints)

**Type:** `Array<number>`  
**Default:** `[640, 750, 828, 1080, 1280, 1668, 2048, 2560] | [640, 750, 828, 960, 1080, 1280, 1668, 1920, 2048, 2560, 3200, 3840, 4480, 5120, 6016]`

The breakpoints used to generate responsive images. Requires the `experimental.responsiveImages` flag to be enabled. The full list is not normally used, but is filtered according to the source and output size. The defaults used depend on whether a local or remote image service is used. For remote services the more comprehensive list is used, because only the required sizes are generated. For local services, the list is shorter to reduce the number of images generated.

Markdown Options
----------------

[Section titled Markdown Options](#markdown-options)

### markdown.shikiConfig

[Section titled markdown.shikiConfig](#markdownshikiconfig)

**Type:** `Partial<ShikiConfig>`

Shiki is our default syntax highlighter. You can configure all options via the `markdown.shikiConfig` object:

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  markdown: {    shikiConfig: {      // Choose from Shiki's built-in themes (or add your own)      // https://shiki.style/themes      theme: 'dracula',      // Alternatively, provide multiple themes      // See note below for using dual light/dark themes      themes: {        light: 'github-light',        dark: 'github-dark',      },      // Disable the default colors      // https://shiki.style/guide/dual-themes#without-default-color      // (Added in v4.12.0)      defaultColor: false,      // Add custom languages      // Note: Shiki has countless langs built-in, including .astro!      // https://shiki.style/languages      langs: [],      // Add custom aliases for languages      // Map an alias to a Shiki language ID: https://shiki.style/languages#bundled-languages      // https://shiki.style/guide/load-lang#custom-language-aliases      langAlias: {        cjs: "javascript"      },      // Enable word wrap to prevent horizontal scrolling      wrap: true,      // Add custom transformers: https://shiki.style/guide/transformers      // Find common transformers: https://shiki.style/packages/transformers      transformers: [],    },  },});

See the [code syntax highlighting guide](/en/guides/syntax-highlighting/) for usage and examples.

### markdown.syntaxHighlight

[Section titled markdown.syntaxHighlight](#markdownsyntaxhighlight)

**Type:** `SyntaxHighlightConfig | SyntaxHighlightConfigType | false`  
**Default:** `{ type: 'shiki', excludeLangs: ['math'] }`

Which syntax highlighter to use for Markdown code blocks (\`\`\`), if any. This determines the CSS classes that Astro will apply to your Markdown code blocks.

*   `shiki` - use the [Shiki](https://shiki.style) highlighter (`github-dark` theme configured by default)
*   `prism` - use the [Prism](https://prismjs.com/) highlighter and [provide your own Prism stylesheet](/en/guides/syntax-highlighting/#add-a-prism-stylesheet)
*   `false` - do not apply syntax highlighting.

    {  markdown: {    // Example: Switch to use prism for syntax highlighting in Markdown    syntaxHighlight: 'prism',  }}

For more control over syntax highlighting, you can instead specify a configuration object with the properties listed below.

#### markdown.syntaxHighlight.type

[Section titled markdown.syntaxHighlight.type](#markdownsyntaxhighlighttype)

**Type:** `'shiki' | 'prism'`  
**Default:** `'shiki'`  

**Added in:** `astro@5.5.0`

The default CSS classes to apply to Markdown code blocks. (If no other syntax highlighting configuration is needed, you can instead set `markdown.syntaxHighlight` directly to `shiki`, `prism`, or `false`.)

#### markdown.syntaxHighlight.excludeLangs

[Section titled markdown.syntaxHighlight.excludeLangs](#markdownsyntaxhighlightexcludelangs)

**Type:** `Array<string>`  
**Default:** `['math']`  

**Added in:** `astro@5.5.0`

An array of languages to exclude from the default syntax highlighting specified in `markdown.syntaxHighlight.type`. This can be useful when using tools that create diagrams from Markdown code blocks, such as Mermaid.js and D2.

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  markdown: {    syntaxHighlight: {      type: 'shiki',      excludeLangs: ['mermaid', 'math'],    },  },});

### markdown.remarkPlugins

[Section titled markdown.remarkPlugins](#markdownremarkplugins)

**Type:** `RemarkPlugins`

Pass [remark plugins](https://github.com/remarkjs/remark) to customize how your Markdown is built. You can import and apply the plugin function (recommended), or pass the plugin name as a string.

    import remarkToc from 'remark-toc';{  markdown: {    remarkPlugins: [ [remarkToc, { heading: "contents"} ] ]  }}

### markdown.rehypePlugins

[Section titled markdown.rehypePlugins](#markdownrehypeplugins)

**Type:** `RehypePlugins`

Pass [rehype plugins](https://github.com/remarkjs/remark-rehype) to customize how your Markdown’s output HTML is processed. You can import and apply the plugin function (recommended), or pass the plugin name as a string.

    import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';{  markdown: {    rehypePlugins: [rehypeAccessibleEmojis]  }}

### markdown.gfm

[Section titled markdown.gfm](#markdowngfm)

**Type:** `boolean`  
**Default:** `true`  

**Added in:** `astro@2.0.0`

Astro uses [GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm) by default. To disable this, set the `gfm` flag to `false`:

    {  markdown: {    gfm: false,  }}

### markdown.smartypants

[Section titled markdown.smartypants](#markdownsmartypants)

**Type:** `boolean`  
**Default:** `true`  

**Added in:** `astro@2.0.0`

Astro uses the [SmartyPants formatter](https://daringfireball.net/projects/smartypants/) by default. To disable this, set the `smartypants` flag to `false`:

    {  markdown: {    smartypants: false,  }}

### markdown.remarkRehype

[Section titled markdown.remarkRehype](#markdownremarkrehype)

**Type:** `RemarkRehype`

Pass options to [remark-rehype](https://github.com/remarkjs/remark-rehype#api).

    {  markdown: {    // Example: Translate the footnotes text to another language, here are the default English values    remarkRehype: { footnoteLabel: "Footnotes", footnoteBackLabel: "Back to reference 1"},  },};

i18n
----

[Section titled i18n](#i18n)

**Type:** `object`  

**Added in:** `astro@3.5.0`

Configures i18n routing and allows you to specify some customization options.

See our guide for more information on [internationalization in Astro](/en/guides/internationalization/)

### i18n.locales

[Section titled i18n.locales](#i18nlocales)

**Type:** `Locales`  

**Added in:** `astro@3.5.0`

A list of all locales supported by the website. This is a required field.

Languages can be listed either as individual codes (e.g. `['en', 'es', 'pt-br']`) or mapped to a shared `path` of codes (e.g. `{ path: "english", codes: ["en", "en-US"]}`). These codes will be used to determine the URL structure of your deployed site.

No particular language code format or syntax is enforced, but your project folders containing your content files must match exactly the `locales` items in the list. In the case of multiple `codes` pointing to a custom URL path prefix, store your content files in a folder with the same name as the `path` configured.

### i18n.defaultLocale

[Section titled i18n.defaultLocale](#i18ndefaultlocale)

**Type:** `string`  

**Added in:** `astro@3.5.0`

The default locale of your website/application, that is one of the specified `locales`. This is a required field.

No particular language format or syntax is enforced, but we suggest using lower-case and hyphens as needed (e.g. “es”, “pt-br”) for greatest compatibility.

### i18n.fallback

[Section titled i18n.fallback](#i18nfallback)

**Type:** `Record<string, string>`  

**Added in:** `astro@3.5.0`

The fallback strategy when navigating to pages that do not exist (e.g. a translated page has not been created).

Use this object to declare a fallback `locale` route for each language you support. If no fallback is specified, then unavailable pages will return a 404.

##### Example

[Section titled Example](#example)

The following example configures your content fallback strategy to redirect unavailable pages in `/pt-br/` to their `es` version, and unavailable pages in `/fr/` to their `en` version. Unavailable `/es/` pages will return a 404.

    export default defineConfig({  i18n: {    defaultLocale: "en",    locales: ["en", "fr", "pt-br", "es"],    fallback: {      pt: "es",      fr: "en"    }  }})

### i18n.routing

[Section titled i18n.routing](#i18nrouting)

**Type:** `object | "manual"`  
**Default:** `object`  

**Added in:** `astro@3.7.0`

Controls the routing strategy to determine your site URLs. Set this based on your folder/URL path configuration for your default language.

    export default defineConfig({  i18n: {    defaultLocale: "en",    locales: ["en", "fr"],    routing: {      prefixDefaultLocale: false,      redirectToDefaultLocale: true,      fallbackType: "redirect",    }  }})

Since 4.6.0, this option can also be set to `manual`. When this routing strategy is enabled, Astro will **disable** its i18n middleware and no other `routing` options (e.g. `prefixDefaultLocale`) may be configured. You will be responsible for writing your own routing logic, or executing Astro’s i18n middleware manually alongside your own.

    export default defineConfig({  i18n: {    defaultLocale: "en",    locales: ["en", "fr"],    routing: "manual"  }})

#### i18n.routing.prefixDefaultLocale

[Section titled i18n.routing.prefixDefaultLocale](#i18nroutingprefixdefaultlocale)

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@3.7.0`

When `false`, only non-default languages will display a language prefix. The `defaultLocale` will not show a language prefix and content files do not exist in a localized folder. URLs will be of the form `example.com/[locale]/content/` for all non-default languages, but `example.com/content/` for the default locale.

When `true`, all URLs will display a language prefix. URLs will be of the form `example.com/[locale]/content/` for every route, including the default language. Localized folders are used for every language, including the default.

    export default defineConfig({  i18n: {    defaultLocale: "en",    locales: ["en", "fr", "pt-br", "es"],    routing: {      prefixDefaultLocale: true,    }  }})

#### i18n.routing.redirectToDefaultLocale

[Section titled i18n.routing.redirectToDefaultLocale](#i18nroutingredirecttodefaultlocale)

**Type:** `boolean`  
**Default:** `true`  

**Added in:** `astro@4.2.0`

Configures whether or not the home URL (`/`) generated by `src/pages/index.astro` will redirect to `/[defaultLocale]` when `prefixDefaultLocale: true` is set.

Set `redirectToDefaultLocale: false` to disable this automatic redirection at the root of your site:

astro.config.mjs

    export default defineConfig({  i18n:{    defaultLocale: "en",    locales: ["en", "fr"],    routing: {      prefixDefaultLocale: true,      redirectToDefaultLocale: false    }  }})

#### i18n.routing.fallbackType

[Section titled i18n.routing.fallbackType](#i18nroutingfallbacktype)

**Type:** `"redirect" | "rewrite"`  
**Default:** `"redirect"`  

**Added in:** `astro@4.15.0`

When [`i18n.fallback`](#i18nfallback) is configured to avoid showing a 404 page for missing page routes, this option controls whether to [redirect](/en/guides/routing/#redirects) to the fallback page, or to [rewrite](/en/guides/routing/#rewrites) the fallback page’s content in place.

By default, Astro’s i18n routing creates pages that redirect your visitors to a new destination based on your fallback configuration. The browser will refresh and show the destination address in the URL bar.

When `i18n.routing.fallback: "rewrite"` is configured, Astro will create pages that render the contents of the fallback page on the original, requested URL.

With the following configuration, if you have the file `src/pages/en/about.astro` but not `src/pages/fr/about.astro`, the `astro build` command will generate `dist/fr/about.html` with the same content as the `dist/en/about.html` page. Your site visitor will see the English version of the page at `https://example.com/fr/about/` and will not be redirected.

astro.config.mjs

    export default defineConfig({   i18n: {    defaultLocale: "en",    locales: ["en", "fr"],    routing: {      prefixDefaultLocale: false,      fallbackType: "rewrite",    },    fallback: {      fr: "en",    }  },})

### i18n.domains

[Section titled i18n.domains](#i18ndomains)

**Type:** `Record<string, string>`  
**Default:** `{}`  

**Added in:** `astro@4.3.0`

Configures the URL pattern of one or more supported languages to use a custom domain (or sub-domain).

When a locale is mapped to a domain, a `/[locale]/` path prefix will not be used. However, localized folders within `src/pages/` are still required, including for your configured `defaultLocale`.

Any other locale not configured will default to a localized path-based URL according to your `prefixDefaultLocale` strategy (e.g. `https://example.com/[locale]/blog`).

astro.config.mjs

    export default defineConfig({   site: "https://example.com",   output: "server", // required, with no prerendered pages   adapter: node({     mode: 'standalone',   }),   i18n: {    defaultLocale: "en",    locales: ["en", "fr", "pt-br", "es"],    prefixDefaultLocale: false,    domains: {      fr: "https://fr.example.com",      es: "https://example.es"    }  },})

Both page routes built and URLs returned by the `astro:i18n` helper functions [`getAbsoluteLocaleUrl()`](/en/reference/modules/astro-i18n/#getabsolutelocaleurl) and [`getAbsoluteLocaleUrlList()`](/en/reference/modules/astro-i18n/#getabsolutelocaleurllist) will use the options set in `i18n.domains`.

See the [Internationalization Guide](/en/guides/internationalization/#domains) for more details, including the limitations of this feature.

env
---

[Section titled env](#env)

**Type:** `object`  
**Default:** `{}`  

**Added in:** `astro@5.0.0`

Configuration options for type-safe environment variables.

See our guide for more information on [environment variables in Astro](/en/guides/environment-variables/).

### env.schema

[Section titled env.schema](#envschema)

**Type:** `EnvSchema`  
**Default:** `{}`  

**Added in:** `astro@5.0.0`

An object that uses `envField` to define the data type and properties of your environment variables: `context` (client or server), `access` (public or secret), a `default` value to use, and whether or not this environment variable is `optional` (defaults to `false`).

astro.config.mjs

    import { defineConfig, envField } from "astro/config"
    export default defineConfig({  env: {    schema: {      API_URL: envField.string({ context: "client", access: "public", optional: true }),      PORT: envField.number({ context: "server", access: "public", default: 4321 }),      API_SECRET: envField.string({ context: "server", access: "secret" }),    }  }})

`envField` supports four data types: string, number, enum, and boolean. `context` and `access` are required properties for all data types. The following shows the complete list of properties available for each data type:

    import { envField } from "astro/config"
    envField.string({   // context & access   optional: true,   default: "foo",   max: 20,   min: 1,   length: 13,   url: true,   includes: "oo",   startsWith: "f",   endsWith: "o",})envField.number({   // context & access   optional: true,   default: 15,   gt: 2,   min: 1,   lt: 3,   max: 4,   int: true,})envField.boolean({   // context & access   optional: true,   default: true,})envField.enum({   // context & access   values: ['foo', 'bar', 'baz'], // required   optional: true,   default: 'baz',})

### env.validateSecrets

[Section titled env.validateSecrets](#envvalidatesecrets)

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@5.0.0`

Whether or not to validate secrets on the server when starting the dev server or running a build.

By default, only public variables are validated on the server when starting the dev server or a build, and private variables are validated at runtime only. If enabled, private variables will also be checked on start. This is useful in some continuous integration (CI) pipelines to make sure all your secrets are correctly set before deploying.

astro.config.mjs

    import { defineConfig, envField } from "astro/config"
    export default defineConfig({  env: {    schema: {      // ...    },    validateSecrets: true  }})

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/types/public/config.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Template directives reference](/en/reference/directives-reference/) [Next  
CLI Commands](/en/reference/cli-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/container-reference
Astro Container API (experimental)
==================================

**Added in:** `astro@4.9.0`

The Container API allows you to render Astro components in isolation.

This experimental server-side API unlocks a variety of potential future uses, but is currently scoped to allow [testing of `.astro` component output](/en/guides/testing/#vitest-and-container-api) in `vite` environments such as `vitest`.

It also allows you to [manually load rendering scripts](#adding-a-renderer-manually) for creating containers in pages rendered on demand or other “shell” environments outside of `vite` (e.g. inside a PHP or Elixir application).

This API allows you to [create a new container](#create), and render an Astro component returning [a string](#rendertostring) or a [`Response`](#rendertoresponse).

This API is experimental and subject to breaking changes, even in [minor or patch releases](/en/upgrade-astro/#semantic-versioning). Please consult [the Astro CHANGELOG](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) for changes as they occur. This page will always be updated with the most current information for the latest version of Astro.

`create()`
----------

[Section titled create()](#create)

Creates a new instance of the container.

    import { experimental_AstroContainer } from "astro/container";
    const container = await experimental_AstroContainer.create();

It accepts an object with the following options:

    export type AstroContainerOptions = {  streaming?: boolean;  renderers?: AddServerRenderer[];};
    export type AddServerRenderer =  | {      renderer: NamedSSRLoadedRendererValue;      name: never;    }  | {      renderer: SSRLoadedRendererValue;      name: string;    };

### `streaming` option

[Section titled streaming option](#streaming-option)

**Type:** `boolean`

Enables rendering components using [HTML streaming](/en/guides/on-demand-rendering/#html-streaming).

### `renderers` option

[Section titled renderers option](#renderers-option)

**Type:** `AddServerRenderer[]`

A list of loaded client renderers required by the component. Use this if your `.astro` component renders any [UI framework components](/en/guides/framework-components/) or MDX using an official Astro integration (e.g. React, Vue, etc.).

Renderers can be added through the Container API automatically for static applications, or cases where the container isn’t called at runtime (e.g. testing with `vitest`).

For [on-demand rendered applications](/en/guides/on-demand-rendering/), or cases where the container is called at runtime or inside other “shells” (e.g. PHP, Ruby, Java, etc.), renderers must be manually imported.

#### Adding a renderer through the Container API

[Section titled Adding a renderer through the Container API](#adding-a-renderer-through-the-container-api)

For each official Astro integration, import and use the `getContainerRenderer()` helper function to expose its client and server rendering scripts. These are available for `@astrojs/react`, `@astrojs/preact`, `@astrojs/solid-js`, `@astrojs/svelte`, `@astrojs/vue`, and `@astrojs/mdx`.

For renderer packages outside the `@astrojs` npm org, look in their documentation for `getContainerRenderer()` or a similar function provided.

When using `vite` (`vitest`, Astro integrations, etc.), the renderers are loaded with the function `loadRenderers()` from the virtual module `astro:container`.

Caution

Outside `vite` or for on-demand usage, you’ll have to [load the renderers manually](#adding-a-renderer-manually).

The following example provides the necessary object to render an Astro component that renders a React component and a Svelte component:

    import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";import { getContainerRenderer as svelteContainerRenderer } from "@astrojs/svelte";import { loadRenderers } from "astro:container";
    const renderers = await loadRenderers([reactContainerRenderer(), svelteContainerRenderer()]);const container = await experimental_AstroContainer.create({    renderers})const result = await container.renderToString(ReactWrapper);

#### Adding a renderer manually

[Section titled Adding a renderer manually](#adding-a-renderer-manually)

When the container is called at runtime, or inside other “shells”, the `astro:container` virtual module’s helper functions are not available. You must import the necessary server and client renderers manually and store them inside the container using `addServerRenderer` and `addClientRenderer`.

Server renderers are required to build your project, and must be stored in the container for every framework used. Client renderers are additionally needed to any hydrate client-side components using [`client:*` directives](/en/reference/directives-reference/#client-directives).

Only one import statement is needed per framework. Importing a renderer makes both the server and client renderers available to your container. However, **server renderers must be added to your container before client renderers**. This allows your entire container to render first, and then hydrate any interactive components.

The following example manually imports the necessary server renderers to be able to display static Vue components and `.mdx` pages. It additionally adds both server and client renderers for interactive React components.

    import reactRenderer from "@astrojs/react/server.js";import vueRenderer from "@astrojs/vue/server.js";import mdxRenderer from "@astrojs/mdx/server.js";
    const container = await experimental_AstroContainer.create();container.addServerRenderer({renderer: vueRenderer});container.addServerRenderer({renderer: mdxRenderer});
    container.addServerRenderer({ renderer: reactRenderer });container.addClientRenderer({ name: "@astrojs/react", entrypoint: "@astrojs/react/client.js" });

`renderToString()`
------------------

[Section titled renderToString()](#rendertostring)

This function renders a specified component inside a container. It takes an Astro component as an argument and it returns a string that represents the HTML/content rendered by the Astro component.

    import { experimental_AstroContainer } from "astro/container";import Card from "../src/components/Card.astro";
    const container = await experimental_AstroContainer.create();const result = await container.renderToString(Card);

Under the hood, this function calls [`renderToResponse`](#rendertoresponse) and calls `Response.text()`.

It also accepts an object as a second argument that can contain a [number of options](#rendering-options).

`renderToResponse()`
--------------------

[Section titled renderToResponse()](#rendertoresponse)

It renders a component, and it returns a `Response` object.

    import { experimental_AstroContainer } from "astro/container";import Card from "../src/components/Card.astro";
    const container = await experimental_AstroContainer.create();const result = await container.renderToResponse(Card);

It also accepts an object as a second argument that can contain a [number of options](#rendering-options).

Rendering options
-----------------

[Section titled Rendering options](#rendering-options)

Both [`renderToResponse`](#rendertoresponse) and [`renderToString`](#rendertostring) accept an object as their second argument:

    export type ContainerRenderOptions = {  slots?: Record<string, any>;  props?: Record<string, unknown>;  request?: Request;  params?: Record<string, string | undefined>;  locals?: App.Locals;  routeType?: "page" | "endpoint";};

These optional values can be passed to the rendering function in order to provide additional information necessary for an Astro component to properly render.

### `slots`

[Section titled slots](#slots)

**Type**: `Record<string, any>`;

An option to pass content to be rendered with [`<slots>`](/en/basics/astro-components/#slots).

If your Astro component renders one default slot, pass an object with `default` as the key:

    import Card from "../src/components/Card.astro";
    const result = await container.renderToString(Card, {  slots: { default: "Some value" }});

If your component renders named slots, use the slot names as the object keys:

    ------<div>  <slot name="header" />  <slot name="footer" /></div>

    import Card from "../src/components/Card.astro";
    const result = await container.renderToString(Card, {  slots: {    header: "Header content",    footer: "Footer"  }});

You can also render components in cascade:

    ------<div>  <slot name="header" />  <slot name="footer" /></div>

    import Card from "../src/components/Card.astro";import CardHeader from "../src/components/CardHeader.astro";import CardFooter from "../src/components/CardFooter.astro";
    const result = await container.renderToString(Card, {  slots: {    header: await container.renderToString(CardHeader),    footer:  await container.renderToString(CardFooter)  }});

### `props` option

[Section titled props option](#props-option)

**Type**: `Record<string, unknown>`

An option to pass [properties](/en/basics/astro-components/#component-props) for Astro components.

    import Card from "../src/components/Card.astro";
    const result = await container.renderToString(Card, {  props: { name: "Hello, world!" }});

    ---// For TypeScript supportinterface Props {  name: string;};
    const { name } = Astro.props;---<div>  {name}</div>

### `request` option

[Section titled request option](#request-option)

**Type**: `Request`

An option to pass a `Request` with information about the path/URL the component will render.

Use this option when your component needs to read information like `Astro.url` or `Astro.request`.

You can also inject possible headers or cookies.

    import Card from "../src/components/Card.astro";
    const result = await container.renderToString(Card, {  request: new Request("https://example.com/blog", {    headers: {      "x-some-secret-header": "test-value"    }  })});

### `params` option

[Section titled params option](#params-option)

**Type**: `Record<string, string | undefined>`;

An object to pass information about the path parameter to an Astro component responsible for [generating dynamic routes](/en/guides/routing/#dynamic-routes).

Use this option when your component needs a value for `Astro.params` in order to generate a single route dynamically.

    ---const { locale, slug } = Astro.params;---<div></div>

    import LocaleSlug from "../src/components/[locale]/[slug].astro";
    const result = await container.renderToString(LocaleSlug, {  params: {    locale: "en",    slug: "getting-started"  }});

### `locals` options

[Section titled locals options](#locals-options)

**Type**: `App.Locals`

An option to pass information from [`Astro.locals`](/en/reference/api-reference/#locals) for rendering your component.

Use this option to when your component needs information stored during the lifecycle of a request in order to render, such as logged in status.

    ---const { checkAuth } = Astro.locals;const isAuthenticated = checkAuth();---{isAuthenticated ? <span>You're in</span> : <span>You're out</span> }

    import Card from "../src/components/Card.astro";
    test("User is in", async () => {  const result = await container.renderToString(Card, {    locals: {      checkAuth() { return true; }    }  });
      // assert result contains "You're in"});
    
    test("User is out", async () => {  const result = await container.renderToString(Card, {    locals: {      checkAuth() { return false; }    }  });
      // assert result contains "You're out"});

### `routeType` option

[Section titled routeType option](#routetype-option)

**Type**: `"page" | "endpoint"`

An option available when using `renderToResponse` to specify that you are rendering an [endpoint](/en/guides/endpoints/):

    container.renderToString(Endpoint, { routeType: "endpoint" });

    import * as Endpoint from "../src/pages/api/endpoint.js";
    const response = await container.renderToResponse(Endpoint, {  routeType: "endpoint"});const json = await response.json();

To test your endpoint on methods such as `POST`, `PATCH`, etc., use the `request` option to call the correct function:

    export function GET() {}
    // need to test thisexport function POST() {}

    import * as Endpoint from "../src/pages/api/endpoint.js";
    const response = await container.renderToResponse(Endpoint, {    routeType: "endpoint",    request: new Request("https://example.com", {      method: "POST" // Specify POST method for testing    })});const json = await response.json();

### `partial` option

[Section titled partial option](#partial-option)

**Type:** `boolean`  
**Default:** `true`  

**Added in:** `astro@4.16.6`

Whether or not the Container API renders components as if they were [page partials](/en/basics/astro-pages/#page-partials). This is usually the behavior you want when rendering `components.boolean` so you can render components without a full page shell.

To render a component as a full Astro page, including `<!DOCTYPE html>`, you can opt-out of this behavior by setting `partial` to `false`:

    import Blog from "../src/pages/Blog.astro";
    const result = await container.renderToString(Card, {    partial: false});console.log(result) // includes `<!DOCTYPE html>` at the beginning of the HTML

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/container-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Dev Toolbar App API](/en/reference/dev-toolbar-app-reference/) [Next  
Programmatic Astro API (experimental)](/en/reference/programmatic-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/content-loader-reference
Astro Content Loader API
========================

Astro’s Content Loader API allows you to load your data from any source, local or remote, and interact with Astro’s content layer to manage your [content collections](/en/guides/content-collections/).

What is a loader?
-----------------

[Section titled What is a loader?](#what-is-a-loader)

Astro loaders allow you to load data into [content collections](/en/guides/content-collections/), which can then be used in pages and components. The [built-in `glob()` and `file()` loaders](/en/guides/content-collections/#built-in-loaders) are used to load content from the file system, and you can create your own loaders to load content from other sources.

Each collection needs [a loader defined in its schema](/en/guides/content-collections/#defining-the-collection-loader). You can define a loader inline in your project’s `src/content.config.ts` file, share one loader between multiple collections, or even [publish your loader to NPM as a package](/en/reference/publish-to-npm/) to share with others and be included in our integrations library.

Built-in loaders
----------------

[Section titled Built-in loaders](#built-in-loaders)

Astro provides two built-in loaders to help you fetch your collections. Both offer options to suit a wide range of use cases.

### `glob()` loader

[Section titled glob() loader](#glob-loader)

**Type:** `(options: GlobOptions) => [Loader](#the-loader-object)`  

**Added in:** `astro@5.0.0`

The `glob()` loader creates entries from directories of files from anywhere on the filesystem. The supported file types are Markdown, MDX, Markdoc, JSON, and YAML files.

This loader accepts an object with the following properties: `pattern`, `base` (optional), and `generateId` (optional).

src/content.config.ts

    import { defineCollection } from 'astro:content';import { glob } from 'astro/loaders';
    const pages = defineCollection({  /* Retrieve all Markdown files in your pages directory. */  loader: glob({ pattern: "**/*.md", base: "./src/data/pages" }),  schema: /* ... */});const blog = defineCollection({  /* Retrieve all Markdown and MDX files in your blog directory. */  loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/data/blog" }),  schema: /* ... */});const authors = defineCollection({  /* Retrieve all JSON files in your authors directory while retaining   * uppercase letters in the ID. */  loader: glob({    pattern: '**/*.json',    base: "./src/data/authors",    generateId: ({ entry }) => entry.replace(/\.json$/, ''),  }),  schema: /* ... */});

#### `pattern`

[Section titled pattern](#pattern)

**Type:** `string | string[]`

The `pattern` property accepts a string or an array of strings using glob matching (e.g. wildcards, globstars). The patterns must be relative to the base directory of entry files to match.

You can learn more about the syntax to use in the [micromatch documentation](https://github.com/micromatch/micromatch#matching-features). You can also verify the validity of your pattern using an online tool like the [DigitalOcean Glob Tool](https://www.digitalocean.com/community/tools/glob).

#### `base`

[Section titled base](#base)

**Type:** `string | URL`  
**Default:** `"."`

A relative path or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) to the directory from which to resolve the `pattern`.

#### `generateId()`

[Section titled generateId()](#generateid)

**Type:** `(options: GenerateIdOptions) => string`

A callback function that returns a unique string per entry in a collection. It accepts an object as parameter with the following properties:

*   `entry` - the path to the entry file, relative to the base directory
*   `base` - the base directory [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)
*   `data` - the parsed, unvalidated data of the entry

By default it uses [`github-slugger`](https://github.com/Flet/github-slugger) to generate a slug with [kebab-cased](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) words.

### `file()` loader

[Section titled file() loader](#file-loader)

**Type:** `(fileName: string, options?: FileOptions) => [Loader](#the-loader-object)`  

**Added in:** `astro@5.0.0`

The `file()` loader creates entries from a single file that contains an array of objects with a unique `id` field, or an object with IDs as keys and entries as values. It supports JSON or YAML, and you can provide a custom `parser` for data files it cannot parse by default.

This loader accepts a `fileName` property and an optional object as second argument:

src/content.config.ts

    import { defineCollection } from 'astro:content';import { file } from 'astro/loaders';
    const authors = defineCollection({  /* Retrieve all entries from a JSON file. */  loader: file("src/data/authors.json"),  schema: /* ... */});const products = defineCollection({  /* Retrieve all entries from a CSV file using a custom parser. */  loader: file("src/data/products.csv", {    parser: (fileContent) => { /* your parser logic */ },  }),  schema: /* ... */});

#### `fileName`

[Section titled fileName](#filename)

**Type:** `string`

Sets the path to the file to load, relative to the root directory.

#### Options

[Section titled Options](#options)

**Type:** `FileOptions`

An optional object with the following properties:

##### `parser()`

[Section titled parser()](#parser)

**Type:** `(text: string) => Record<string, Record<string, unknown>> | Array<Record<string, unknown>>`

A callback function to create a collection from a file’s contents. Use it when you need to process file not supported by default (e.g. `.csv`) or when using [nested `.json` documents](/en/guides/content-collections/#nested-json-documents).

Loader types
------------

[Section titled Loader types](#loader-types)

Loaders can be defined either as a simple function that returns an array of entries or with the more powerful object Content Loader API for more control over the loading process.

### Inline loaders

[Section titled Inline loaders](#inline-loaders)

An inline loader is an async function that returns an array or object containing entries. Use this for simple loaders, particularly those that are defined inline in the `src/content.config.ts` file.

The function can be async and must return either an array of entries that each contain a unique `id` field, or an object where each key is a unique ID and each value is the entry. Whenever the loader is invoked, it will clear the store and reload all the entries.

src/content.config.ts

    const countries = defineCollection({  loader: async () => {    const response = await fetch("https://restcountries.com/v3.1/all");    const data = await response.json();    // Must return an array of entries with an id property    // or an object with IDs as keys and entries as values    return data.map((country) => ({      id: country.cca3,      ...country,    }));  },  schema: /* ... */});

### Object loaders

[Section titled Object loaders](#object-loaders)

A loader is an object with a `load()` method that is called at build time to fetch data and update the data store. It allows entries to be updated incrementally, or for the store to be cleared only when necessary. It can also define a schema for the entries, which can be used to validate the data and generate static types.

The recommended pattern is to define a function that accepts configuration options and returns the loader object, in the same way that you would normally define an Astro integration or Vite plugin.

loader.ts

    import type { Loader, LoaderContext } from 'astro/loaders';import { z } from 'astro:content';import { loadFeedData } from "./feed.js";
    // Define any options that the loader needsexport function myLoader(options: { url: string, apiKey: string }): Loader {  // Configure the loader  const feedUrl = new URL(options.url);  // Return a loader object  return {    name: "my-loader",    // Called when updating the collection.    load: async (context: LoaderContext): Promise<void> => {      // Load data and update the store      const response = await loadFeedData(feedUrl, options.apiKey);    },    // Optionally, define the schema of an entry.    // It will be overridden by user-defined schema.    schema: async () => z.object({      // ...    })  };}

These configuration options can then be set when defining a collection:

src/content.config.ts

    import { defineCollection, z } from 'astro:content';import myLoader from '../../loader.ts';
    const blog = defineCollection({  loader: myLoader({    url: "https://api.example.com/posts",    apiKey: "my-secret",  }),  schema: /* ... */});

Object loader API
-----------------

[Section titled Object loader API](#object-loader-api)

The API for [inline loaders](#inline-loaders) is very simple, and is shown above. This section shows the API for defining an object loader.

### The `Loader` object

[Section titled The Loader object](#the-loader-object)

The loader object has the following properties:

#### `name`

[Section titled name](#name)

**Type**: `string`

A unique name for the loader, used in logs and [for conditional loading](/en/reference/integrations-reference/#refreshcontent-option).

#### `load`

[Section titled load](#load)

**Type**: `(context: [LoaderContext](#loadercontext)) => Promise<void>`

An async function that is called at build time to load data and update the store. See [`LoaderContext`](#loadercontext) for more information.

#### `schema`

[Section titled schema](#schema)

**Type**: `ZodSchema | Promise<ZodSchema> | (() => ZodSchema | Promise<ZodSchema>)`

An optional [Zod schema](/en/guides/content-collections/#defining-datatypes-with-zod) that defines the shape of the entries. It is used to both validate the data and also to generate TypeScript types for the collection.

If a function is provided, it will be called at build time before `load()` to generate the schema. You can use this to dynamically generate the schema based on the configuration options or by introspecting an API.

### `LoaderContext`

[Section titled LoaderContext](#loadercontext)

This object is passed to the `load()` method of the loader, and contains the following properties:

#### `collection`

[Section titled collection](#collection)

**Type**: `string`

The unique name of the collection. This is the key in the `collections` object in the `src/content.config.ts` file.

#### `store`

[Section titled store](#store)

**Type**: [`DataStore`](#datastore)

A database to store the actual data. Use this to update the store with new entries. See [`DataStore`](#datastore) for more information.

#### `meta`

[Section titled meta](#meta)

**Type**: `MetaStore`

A key-value store scoped to the collection, designed for things like sync tokens and last-modified times. This metadata is persisted between builds alongside the collection data but is only available inside the loader.

    const lastModified = meta.get("lastModified");// ...meta.set("lastModified", new Date().toISOString());

#### `logger`

[Section titled logger](#logger)

**Type**: [`AstroIntegrationLogger`](/en/reference/integrations-reference/#astrointegrationlogger)

A logger that can be used to log messages to the console. Use this instead of `console.log` for more helpful logs that include the loader name in the log message. See [`AstroIntegrationLogger`](/en/reference/integrations-reference/#astrointegrationlogger) for more information.

#### `config`

[Section titled config](#config)

**Type**: `AstroConfig`

The full, resolved Astro configuration object with all defaults applied. See [the configuration reference](/en/reference/configuration-reference/) for more information.

#### `parseData`

[Section titled parseData](#parsedata)

**Type**: `(props: ParseDataOptions<TData>) => Promise<TData>`

Validates and parses the data according to the collection schema. Pass data to this function to validate and parse it before storing it in the data store.

loader.ts

    import type { Loader } from "astro/loaders";import { loadFeed } from "./feed.js";
    export function feedLoader({ url }): Loader {  const feedUrl = new URL(url);  return {    name: "feed-loader",    load: async ({ store, logger, parseData, meta, generateDigest }) => {      logger.info("Loading posts");      const feed = loadFeed(feedUrl);      store.clear();
          for (const item of feed.items) {        const data = await parseData({          id: item.guid,          data: item,        });        store.set({          id,          data,        });      }    },  };}

#### `generateDigest`

[Section titled generateDigest](#generatedigest)

**Type**: `(data: Record<string, unknown> | string) => string`

Generates a non-cryptographic content digest of an object or string. This can be used to track if the data has changed by setting [the `digest` field](#digest) of an entry.

loader.ts

    import type { Loader } from "astro/loaders";import { loadFeed } from "./feed.js";
    export function feedLoader({ url }): Loader {  const feedUrl = new URL(url);  return {    name: "feed-loader",    load: async ({ store, logger, parseData, meta, generateDigest }) => {      logger.info("Loading posts");      const feed = loadFeed(feedUrl);      store.clear();
          for (const item of feed.items) {        const data = await parseData({          id: item.guid,          data: item,        });
            const digest = generateDigest(data);
            store.set({          id,          data,          digest,        });      }    },  };}

#### `watcher`

[Section titled watcher](#watcher)

**Type**: `FSWatcher`

When running in dev mode, this is a filesystem watcher that can be used to trigger updates. See [`ViteDevServer`](https://vite.dev/guide/api-javascript.html#vitedevserver) for more information.

Extract from the file() loader

    return {  name: 'file-loader',  load: async ({ config, store, watcher }) => {    const url = new URL(fileName, config.root);    const filePath = fileURLToPath(url);    await syncData(filePath, store);
        watcher?.on('change', async (changedPath) => {      if (changedPath === filePath) {        logger.info(`Reloading data from ${fileName}`);        await syncData(filePath, store);      }    });  },};

#### `refreshContextData`

[Section titled refreshContextData](#refreshcontextdata)

**Type**: `Record<string, unknown>`

If the loader has been triggered by an integration, this may optionally contain extra data set by that integration. It is only set when the loader is triggered by an integration. See the [`astro:server:setup`](/en/reference/integrations-reference/#refreshcontent-option) hook reference for more information.

loader.ts

    export function myLoader(options: { url: string }): Loader {  return {    name: "my-loader",    load: async ({ refreshContextData, store, logger }) => {      if(refreshContextData?.webhookBody) {        logger.info("Webhook triggered with body");        processWebhook(store, refreshContextData.webhookBody);      }      // ...    },  };}

### `DataStore`

[Section titled DataStore](#datastore)

The data store is a loader’s interface to the content collection data. It is a key-value (KV) store, scoped to the collection, and therefore a loader can only access the data for its own collection.

#### `get`

[Section titled get](#get)

**Type**: `(key: string) => [DataEntry](#dataentry) | undefined`

Get an entry from the store by its ID. Returns `undefined` if the entry does not exist.

    const existingEntry = store.get("my-entry");

The returned object is a [`DataEntry`](#dataentry) object.

#### `set`

[Section titled set](#set)

**Type**: `(entry: [DataEntry](#dataentry)) => boolean`

Used after data has been [validated and parsed](#parsedata) to add an entry to the store, returning `true` if the entry was set. This returns `false` when the [`digest`](#digest) property determines that an entry has not changed and should not be updated.

loader.ts

        for (const item of feed.items) {      const data = await parseData({        id: item.guid,        data: item,      });      const digest = generateDigest(data);      store.set({        id,        data,        rendered: {          html: data.description ?? "",        },        digest,      });    }

#### `entries`

[Section titled entries](#entries)

**Type**: `() => Array<[id: string, DataEntry]>`

Get all entries in the collection as an array of key-value pairs.

#### `keys`

[Section titled keys](#keys)

**Type**: `() => Array<string>`

Get all the keys of the entries in the collection.

#### `values`

[Section titled values](#values)

**Type**: `() => Array<DataEntry>`

Get all entries in the collection as an array.

#### `delete`

[Section titled delete](#delete)

**Type**: `(key: string) => void`

Delete an entry from the store by its ID.

#### `clear`

[Section titled clear](#clear)

**Type**: `() => void`

Clear all entries from the collection.

#### `has`

[Section titled has](#has)

**Type**: `(key: string) => boolean`

Check if an entry exists in the store by its ID.

### `DataEntry`

[Section titled DataEntry](#dataentry)

This is the type of the object that is stored in the data store. It has the following properties:

#### `id`

[Section titled id](#id)

**Type**: `string`

An identifier for the entry, which must be unique within the collection. This is used to look up the entry in the store and is the key used with `getEntry` for that collection.

#### `data`

[Section titled data](#data)

**Type**: `Record<string, unknown>`

The actual data for the entry. When a user accesses the collection, this will have TypeScript types generated according to the collection schema.

It is the loader’s responsibility to use [`parseData`](#parsedata) to validate and parse the data before storing it in the data store: no validation is done when getting or setting the data.

#### `filePath`

[Section titled filePath](#filepath)

**Type**: `string | undefined`

A path to the file that is the source of this entry, relative to the root of the site. This only applies to file-based loaders and is used to resolve paths such as images or other assets.

If not set, then any fields in the schema that use [the `image()` helper](/en/guides/images/#images-in-content-collections) will be treated as [public paths](/en/guides/images/#where-to-store-images) and not transformed.

#### `body`

[Section titled body](#body)

**Type**: `string | undefined`

The raw body of the entry, if applicable. If the entry includes [rendered content](#rendered), then this field can be used to store the raw source. This is optional and is not used internally.

#### `digest`

[Section titled digest](#digest)

**Type**: `string | undefined`

An optional content digest for the entry. This can be used to check if the data has changed.

When [setting an entry](#set), the entry will only update if the digest does not match an existing entry with the same ID.

The format of the digest is up to the loader, but it must be a string that changes when the data changes. This can be done with the [`generateDigest`](#generatedigest) function.

#### `rendered`

[Section titled rendered](#rendered)

**Type**: `RenderedContent | undefined`

Stores an object with an entry’s rendered content and metadata if it has been rendered to HTML. For example, this can be used to store the rendered content of a Markdown entry, or HTML from a CMS.

If this field is provided, then [the `render()` function and `<Content />` component](/en/guides/content-collections/#rendering-body-content) are available to render the entry in a page.

The format of the `RenderedContent` object is:

    {  /** Rendered HTML string. If present then `render(entry)` will return a component that renders this HTML. */  html: string;  metadata?: {    /** Any images that are present in this entry. Relative to the {@link DataEntry} filePath. */    imagePaths?: Array<string>;    /** Any headings that are present in this file. Returned as `headings` from `render()` */    headings?: MarkdownHeading[];    /** Raw frontmatter, parsed from the file. This may include data from remark plugins. */    frontmatter?: Record<string, any>;    /** Any other metadata that is present in this file. */    [key: string]: unknown;  };}

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/content-loader-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Adapter API](/en/reference/adapter-reference/) [Next  
Image Service API](/en/reference/image-service-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/dev-toolbar-app-reference
Dev Toolbar App API
===================

The Astro Dev Toolbar App API allows you to create [Astro Integrations](/en/reference/integrations-reference/) that add apps to the Astro Dev Toolbar. This allows you to add new features and integrations with third-party services.

![](/houston_chef.webp) **Related recipe:** [Create a dev toolbar app](/en/recipes/making-toolbar-apps/)

Toolbar app integration setup
-----------------------------

[Section titled Toolbar app integration setup](#toolbar-app-integration-setup)

Integrations can add apps to the dev toolbar in [the `astro:config:setup` hook](/en/reference/integrations-reference/#astroconfigsetup).

my-integration.js

    /** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "my-integration",  hooks: {    "astro:config:setup": ({ addDevToolbarApp }) => {      addDevToolbarApp({        id: "my-app",        name: "My App",        icon: "<svg>...</svg>",        entrypoint: "./my-app.js",      });    },  },});

### `addDevToolbarApp()`

[Section titled addDevToolbarApp()](#adddevtoolbarapp)

A function available to [the `astro:config:setup` hook](/en/reference/integrations-reference/#astroconfigsetup) that adds dev toolbar apps. It takes an object with the following required properties to define the toolbar app: [`id`](#id), [`name`](#name), [`icon`](#icon), and [`entrypoint`](#entrypoint).

### `id`

[Section titled id](#id)

A unique identifier for the app. This will be used to uniquely identify the app in hooks and events.

my-integration.js

    {  id: 'my-app',  // ...}

### `name`

[Section titled name](#name)

The name of the app. This will be shown to users whenever the app needs to be referenced using a human-readable name.

my-integration.js

    {  // ...  name: 'My App',  // ...}

### `icon`

[Section titled icon](#icon)

The icon used to display the app in the toolbar. This can either be an icon from [the icon list](#icons), or a string containing the SVG markup of the icon.

my-integration.js

    {  // ...  icon: '<svg>...</svg>', // or, e.g. 'astro:logo'  // ...}

### `entrypoint`

[Section titled entrypoint](#entrypoint)

The path to the file that exports the dev toolbar app.

my-integration.js

    {  // ...  entrypoint: './my-app.js',}

**Added in:** `astro@5.0.0`

The function also accepts a `URL` as `entrypoint`:

my-integration.js

    /** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "my-integration",  hooks: {    "astro:config:setup": ({ addDevToolbarApp }) => {      addDevToolbarApp({        id: "my-app",        name: "My App",        icon: "<svg>...</svg>",        entrypoint: new URL("./my-app.js", import.meta.url),      });    },  },});

Structure of a Dev Toolbar App
------------------------------

[Section titled Structure of a Dev Toolbar App](#structure-of-a-dev-toolbar-app)

A Dev Toolbar App is a `.js` or `.ts` file that default exports an object using the [`defineToolbarApp()` function](#definetoolbarapp) available from the `astro/toolbar` module.

src/my-app.js

    import { defineToolbarApp } from "astro/toolbar";
    export default defineToolbarApp({  init(canvas) {    const text = document.createTextNode('Hello World!');    canvas.appendChild(text);  },  beforeTogglingOff() {    const confirmation = window.confirm('Really exit?');    return confirmation;  }});

### `defineToolbarApp()`

[Section titled defineToolbarApp()](#definetoolbarapp)

**Added in:** `astro@4.7.0`

A function that defines the logic of your toolbar app when it is loaded and toggled off.

This function takes an object with an [`init()`](#init) function that will be called when the dev toolbar app is loaded. It can also take a [`beforeTogglingOff()`](#beforetogglingoff) function that will run when the toolbar app is clicked to toggle off its active status.

### `init()`

[Section titled init()](#init)

**Signature:** `init(canvas: ShadowRoot, app: ToolbarAppEventTarget, server: ToolbarServerHelpers) => void`

Although not required, most apps will use this function to define the core behavior of the app. This function will be called only once when the app is loaded, which will either be when the browser is idle or when the user clicks on the app in the UI, depending on which one comes first.

The function receives three arguments to define your app logic: [`canvas`](#canvas) (to render elements to the screen), [`app`](#app) (to send and receive client-side events from the dev toolbar), and [`server`](#server) (to communicate with the server).

#### `canvas`

[Section titled canvas](#canvas)

A standard [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) that the app can use to render its UI. Elements can be created and added to the ShadowRoot using the standard DOM APIs.

Every app receives its own dedicated ShadowRoot for rendering its UI. Additionally, the parent element is positioned using `position: absolute;` so the app UI will not affect the layout of an Astro page.

src/my-app.js

    export default defineToolbarApp({  init(canvas) {    canvas.appendChild(document.createTextNode('Hello World!'))  }});

#### `app`

[Section titled app](#app)

**Added in:** `astro@4.7.0`

A standard [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) with a few additional [helpers for client-side events](#client-side-events) that can be used to send and receive events from the Dev toolbar.

src/my-app.js

    export default defineToolbarApp({  init(canvas, app) {    app.onToggled(({ state }) => {      const text = document.createTextNode(        `The app is now ${state ? "enabled" : "disabled"}!`,      );      canvas.appendChild(text);    });  },});

#### `server`

[Section titled server](#server)

**Added in:** `astro@4.7.0`

An object that can be used to [communicate with the server](#client-server-communication).

src/my-app.js

    export default defineToolbarApp({  init(canvas, app, server) {    server.send('my-message', { message: 'Hello!' });
        server.on('server-message', (data) => {      console.log(data.message);    });  },});

### `beforeTogglingOff()`

[Section titled beforeTogglingOff()](#beforetogglingoff)

**Signature:** `beforeTogglingOff(canvas: ShadowRoot): boolean | void`

**Added in:** `astro@4.7.0`  

This optional function will be called when the user clicks on the app icon in the UI to toggle off the app. This function can be used, for example, to perform cleanup operations, or to ask the user for confirmation before toggling off the app.

If a falsy value is returned, the toggling off will be cancelled and the app will stay enabled.

src/my-app.js

    export default defineToolbarApp({  // ...  beforeTogglingOff() {    const confirmation = window.confirm('Are you sure you want to disable this app?');    return confirmation;  }});

#### canvas

[Section titled canvas](#canvas-1)

The ShadowRoot of the app, can be used to render any UI needed before closing. Same as the [`canvas` argument of the `init` function](#canvas).

Client-side Events
------------------

[Section titled Client-side Events](#client-side-events)

In addition to the standard methods of an `EventTarget` ([`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget), [`dispatchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent), [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)etc.), the [`app`](#app) object also has the following methods:

### `onToggled()`

[Section titled onToggled()](#ontoggled)

**Signature:** `onToggled(callback: (options: {state: boolean})) => void`

**Added in:** `astro@4.7.0`  

Registers a callback to be called when the user clicks on the app icon in the UI to toggle the app on or off.

src/my-app.js

    app.onToggled((options) => {  console.log(`The app is now ${options.state ? 'enabled' : 'disabled'}!`);});

### `onToolbarPlacementUpdated()`

[Section titled onToolbarPlacementUpdated()](#ontoolbarplacementupdated)

**Signature:** `onToolbarPlacementUpdated(callback: (options: {placement: 'bottom-left' | 'bottom-center' | 'bottom-right'})) => void`

**Added in:** `astro@4.7.0`  

This event is fired when the user changes the placement of the Dev Toolbar. This can, for example, be used to reposition the app’s UI when the toolbar is moved.

src/my-app.js

    app.onToolbarPlacementUpdated((options) => {  console.log(`The toolbar is now placed at ${options.placement}!`);});

### `toggleState()`

[Section titled toggleState()](#togglestate)

**Signature:** `toggleState(options: {state: boolean}) => void`

**Added in:** `astro@4.7.0`  

Changes the state of the app. This can be used to enable or disable the app programmatically, for example, when the user clicks on a button in the app’s UI.

src/my-app.js

    app.toggleState({ state: false });

### `toggleNotification()`

[Section titled toggleNotification()](#togglenotification)

**Signature:** `toggleNotification(options: {state?: boolean, level?: 'error' | 'warning' | 'info'}) => void`

**Added in:** `astro@4.7.0`  

Toggles a notification on the app icon. This can be used to inform the user that the app requires attention, or remove the current notification.

src/my-app.js

    app.toggleNotification({  state: true,  level: 'warning',});

#### `state: boolean`

[Section titled state: boolean](#state-boolean)

Indicates whether or not the app has a notification for the user. When `true`, the app icon will be highlighted. Conversely, when `false`, the highlight will be removed. If this property is not specified, `true` will be assumed.

#### `level: 'error' | 'warning' | 'info'`

[Section titled level: &#39;error&#39; | &#39;warning&#39; | &#39;info&#39;](#level-error--warning--info)

Indicates the level of the notification. This will be used to determine the color and shape (dark pink circle, gold triangle, or blue square) of the highlight on the app icon. If this property is not specified, `'error'` will be assumed.

Client-Server Communication
---------------------------

[Section titled Client-Server Communication](#client-server-communication)

Using [Vite’s methods for client-server communication](https://vite.dev/guide/api-plugin.html#client-server-communication), Dev Toolbar Apps and the server can communicate with each other. In order to facilitate sending and receiving custom messages, helper methods are provided for use both in your toolbar app (on the client) and in your integration (on the server).

### On the client

[Section titled On the client](#on-the-client)

In your app, use the [`server` object on the `init()` hook](#server) to send and receive messages to and from the server.

src/my-app.js

    export default defineToolbarApp({  init(canvas, app, server) {    server.send('my-message', { message: 'Hello!' });
        server.on('server-message', (data) => {      console.log(data.message);    });  },});

#### `send()`

[Section titled send()](#send)

**Signature:** `send<T>(event: stringify, data: T) => void`

**Added in:** `astro@4.7.0`

Sends data to the server from logic defined in your toolbar app.

src/my-app.js

    init(canvas, app, server) {  server.send('my-app:my-message', { message: 'Hello!' });}

When sending messages from the client to the server, it is good practice to prefix the event name with the app ID or other namespaces to avoid conflicts with other apps or other integrations that may be listening for messages.

#### `on()`

[Section titled on()](#on)

**Signature:** `on<T>(event: string, callback: (data: T) => void) => void`

**Added in:** `astro@4.7.0`  

Registers a callback to be called when the server sends a message with the specified event.

src/my-app.js

    init(canvas, app, server) {  server.on('server-message', (data) => {    console.log(data.message);  });}

### On the server

[Section titled On the server](#on-the-server)

In an integration, such as [the integration that adds your toolbar app](#toolbar-app-integration-setup), use the [`astro:server:setup` hook](/en/reference/integrations-reference/#astroserversetup) to access the `toolbar` object to send and receive messages to and from your apps.

my-integration.js

    export default () => ({  name: "my-integration",  hooks: {    "astro:config:setup": ({ addDevToolbarApp }) => {},    "astro:server:setup": ({ toolbar }) => {},  },});

#### `send()`

[Section titled send()](#send-1)

**Signature:** `send<T>(event: string, data: T) => void`

**Added in:** `astro@4.7.0`  

Sends data to the client.

my-integration.js

    'astro:server:setup': ({ toolbar }) => {  toolbar.send('server-message', { message: 'Hello!' });},

#### `on()`

[Section titled on()](#on-1)

**Signature:** `on<T>(event: string, callback: (data: T) => void) => void`

**Added in:** `astro@4.7.0`  

Registers a callback to be called when the client sends a message with the specified event.

my-integration.js

    'astro:server:setup': ({ toolbar }) => {  toolbar.on('my-app:my-message', (data) => {    console.log(data.message);  });},

#### `onInitialized()`

[Section titled onInitialized()](#oninitialized)

**Signature:** `onInitialized(appId: string, callback: () => void) => void`

**Added in:** `astro@4.7.0`  

Registers a callback to be called when the app is initialized.

my-integration.js

    'astro:server:setup': ({ toolbar }) => {  toolbar.onInitialized('my-app', () => {    console.log('The app is now initialized!');  });},

Note

The built-in `connection` event from Vite fires **before** Dev Toolbar apps are initialized and therefore cannot be used directly by apps. Use the `onInitialized` method to ensure that the app is fully initialized before sending messages to it.

#### `onAppToggled()`

[Section titled onAppToggled()](#onapptoggled)

**Signature:** `onAppToggled(appId: string, callback: (options: {state: boolean}) => void) => void`

**Added in:** `astro@4.7.0`  

Registers a callback to be called when the user clicks on the app icon in the UI to toggle the app on or off.

my-integration.js

    'astro:server:setup': ({ toolbar }) => {  toolbar.onAppToggled('my-app', ({ state }) => {    console.log(`The app is now ${state ? 'enabled' : 'disabled'}!`);  });},

Component Library
-----------------

[Section titled Component Library](#component-library)

The Dev Toolbar includes a set of web components that can be used to build apps with a consistent look and feel.

### `astro-dev-toolbar-window`

[Section titled astro-dev-toolbar-window](#astro-dev-toolbar-window)

Shows a window.

The slot of the component will be used as the content of the window.

    <astro-dev-toolbar-window>  <p>My content</p></astro-dev-toolbar-window>

When building a window using JavaScript, slotted content must go inside the light DOM of the component.

    const myWindow = document.createElement('astro-dev-toolbar-window');const myContent = document.createElement('p');myContent.textContent = 'My content';
    // use appendChild directly on `window`, not `myWindow.shadowRoot`myWindow.appendChild(myContent);

### `astro-dev-toolbar-button`

[Section titled astro-dev-toolbar-button](#astro-dev-toolbar-button)

Shows a button.

The slot of the component will be used as the content of the button.

    const myButton = document.createElement('astro-dev-toolbar-button');myButton.textContent = 'Click me!';myButton.buttonStyle = "purple";myButton.size = "medium";
    myButton.addEventListener('click', () => {  console.log('Clicked!');});

#### `size`

[Section titled size](#size)

The size of the button (`small`, `medium`, `large`).

#### `button-style`

[Section titled button-style](#button-style)

The style of the button (`ghost`, `outline`, `purple`, `gray`, `red`, `green`, `yellow`, `blue`). When using `ghost`, the button itself is invisible and only the content of the button will be shown.

In JavaScript, set this property using the `buttonStyle` property to avoid conflict with the native `style` property.

#### `button-border-radius`

[Section titled button-border-radius](#button-border-radius)

**Added in:** `astro@4.8.0`

The border radius of the button (`normal`, `rounded`). When using `rounded`, the button will have rounded corners and uniform padding on all sides.

In JavaScript, set this property using the `buttonBorderRadius` property.

### `astro-dev-toolbar-badge`

[Section titled astro-dev-toolbar-badge](#astro-dev-toolbar-badge)

Shows a badge.

The slot of the component will be used as the content of the badge.

    <astro-dev-toolbar-badge>My badge</astro-dev-toolbar-badge>

#### `size`

[Section titled size](#size-1)

The size of the badge (`small`, `large`).

#### `badge-style`

[Section titled badge-style](#badge-style)

The style (color) of the badge (`purple`, `gray`, `red`, `green`, `yellow`, `blue`).

In JavaScript, set this property using the `badgeStyle` property to avoid conflict with the native `style` property.

### `astro-dev-toolbar-card`

[Section titled astro-dev-toolbar-card](#astro-dev-toolbar-card)

Shows a card. Specify an optional `link` attribute to make the card act like an `<a>` element.

When making a card using JavaScript, a `clickAction` property can be specified to make the card act like a `<button>` element.

The slot of the component will be used as the content of the card.

    <astro-dev-toolbar-card icon="astro:logo" link="https://github.com/withastro/astro/issues/new/choose">Report an issue</astro-dev-toolbar-card>

#### `card-style`

[Section titled card-style](#card-style)

The style of the card (`purple`, `gray`, `red`, `green`, `yellow`, `blue`). The color is only applied to the border of the card on hover.

In JavaScript, set this property using the `cardStyle`.

### `astro-dev-toolbar-toggle`

[Section titled astro-dev-toolbar-toggle](#astro-dev-toolbar-toggle)

Shows a toggle element, acting as a checkbox. This element internally is a simple wrapper around a native `<input type="checkbox">` element. The checkbox element can be accessed using the `input` property.

    const toggle = document.createElement('astro-dev-toolbar-toggle');
    toggle.input.addEventListener('change', (evt) => {  console.log(`The toggle is now ${evt.currentTarget.checked ? 'enabled' : 'disabled'}!`);});

### `astro-dev-toolbar-radio-checkbox`

[Section titled astro-dev-toolbar-radio-checkbox](#astro-dev-toolbar-radio-checkbox)

**Added in:** `astro@4.8.0`

Shows a radio checkbox. Similar to the `astro-dev-toolbar-toggle` component, this element is a simple wrapper around a native `<input type="radio">` element. The radio element can be accessed using the `input` property.

    const radio = document.createElement('astro-dev-toolbar-radio-checkbox');
    radio.input.addEventListener('change', (evt) => {  console.log(`The radio is now ${evt.currentTarget.checked ? 'enabled' : 'disabled'}!`);});

#### `toggle-style`

[Section titled toggle-style](#toggle-style)

The style of the toggle (`purple`, `gray`, `red`, `green`, `yellow`, `blue`).

In JavaScript, set this property using the `toggleStyle` property.

### `astro-dev-toolbar-highlight`

[Section titled astro-dev-toolbar-highlight](#astro-dev-toolbar-highlight)

Can be used to highlight an element on the page. In most cases, you’ll want to position and resize this element using the `top`, `left`, `width` and `height` CSS properties to match the element you want to highlight.

    <!-- Highlight the entire page --><astro-dev-toolbar-highlight style="top: 0; left: 0; width: 100%; height: 100%;"></astro-dev-toolbar-highlight>

    const elementToHighlight = document.querySelector('h1');const rect = elementToHighlight.getBoundingClientRect();
    const highlight = document.createElement('astro-dev-toolbar-highlight');
    highlight.style.top = `${Math.max(rect.top + window.scrollY - 10, 0)}px`;highlight.style.left = `${Math.max(rect.left + window.scrollX - 10, 0)}px`;highlight.style.width = `${rect.width + 15}px`;highlight.style.height = `${rect.height + 15}px`;highlight.icon = 'astro:logo';

#### `style`

[Section titled style](#style)

The style of the highlight (`purple`, `gray`, `red`, `green`, `yellow`, `blue`).

#### `icon`

[Section titled icon](#icon-1)

An [icon](#icons) to show in the top right corner of the highlight.

### `astro-dev-toolbar-tooltip`

[Section titled astro-dev-toolbar-tooltip](#astro-dev-toolbar-tooltip)

Shows a tooltip with different sections. This component is set to `display: none;` by default and can be made visible using a `data-show="true"` attribute.

Sections are defined using the `sections` property. This property is an array of objects with the following shape:

    {  title?: string; // Title of the section  inlineTitle?: string; // Title of the section, shown inline next to the title  icon?: Icon; // Icon of the section  content?: string; // Content of the section  clickAction?: () => void | Promise<void>; // Action to perform when clicking on the section  clickDescription?: string; // Description of the action to perform when clicking on the section}

    const tooltip = document.createElement('astro-dev-toolbar-tooltip');
    tooltip.sections = [{  title: 'My section',  icon: 'astro:logo',  content: 'My content',  clickAction: () => {    console.log('Clicked!')  },  clickDescription: 'Click me!'}]

This component is often combined with the `astro-dev-toolbar-highlight` component to show a tooltip when hovering a highlighted element:

    const highlight = document.createElement('astro-dev-toolbar-highlight');
    // Position the highlight...
    const tooltip = document.createElement('astro-dev-toolbar-tooltip');
    // Add sections to the tooltip...
    highlight.addEventListener('mouseover', () => {  tooltip.dataset.show = 'true';});
    highlight.addEventListener('mouseout', () => {  tooltip.dataset.show = 'false';});

### `astro-dev-toolbar-icon`

[Section titled astro-dev-toolbar-icon](#astro-dev-toolbar-icon)

Shows an icon. An icon from [the icon list](#icons) can be specified using the `icon` attribute, or the SVG markup of an icon can be passed as a slot.

    <astro-dev-toolbar-icon icon="astro:logo" />

    <astro-dev-toolbar-icon>  <svg>...</svg></astro-dev-toolbar-icon>

#### Icons

[Section titled Icons](#icons)

Currently, the following icons are available and can be used in any component that accepts an icon:

*   `astro:logo`
*   `warning`
*   `arrow-down`
*   `bug`
*   `file-search`
*   `check-circle`
*   `gear`
*   `lightbulb`
*   `checkmark`
*   `dots-three`
*   `copy`

All of the above icons have `fill="currentColor"` set by default and will inherit their color from the parent element.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/dev-toolbar-app-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Image Service API](/en/reference/image-service-reference/) [Next  
Container API (experimental)](/en/reference/container-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/directives-reference
Template directives reference
=============================

**Template directives** are a special kind of HTML attribute available inside of any Astro component template (`.astro` files), and some can also be used in `.mdx` files.

Template directives are used to control an element or component’s behavior in some way. A template directive could enable some compiler feature that makes your life easier (like using `class:list` instead of `class`). Or, a directive could tell the Astro compiler to do something special with that component (like hydrating with `client:load`).

This page describes all of the template directives available to you in Astro, and how they work.

Rules
-----

[Section titled Rules](#rules)

For a template directive to be valid, it must:

*   Include a colon `:` in its name, using the form `X:Y` (ex: `client:load`).
*   Be visible to the compiler (ex: `<X {...attr}>` would not work if `attr` contained a directive).

Some template directives, but not all, can take a custom value:

*   `<X client:load />` (takes no value)
*   `<X class:list={['some-css-class']} />` (takes an array)

A template directive is never included directly in the final HTML output of a component.

Common Directives
-----------------

[Section titled Common Directives](#common-directives)

### `class:list`

[Section titled class:list](#classlist)

`class:list={...}` takes an array of class values and converts them into a class string. This is powered by @lukeed’s popular [clsx](https://github.com/lukeed/clsx) helper library.

`class:list` takes an array of several different possible value kinds:

*   `string`: Added to the element `class`
*   `Object`: All truthy keys are added to the element `class`
*   `Array`: flattened
*   `false`, `null`, or `undefined`: skipped

    <!-- This --><span class:list={[ 'hello goodbye', { world: true }, [ 'friend' ] ]} /><!-- Becomes --><span class="hello goodbye world friend"></span>

### `set:html`

[Section titled set:html](#sethtml)

`set:html={string}` injects an HTML string into an element, similar to setting `el.innerHTML`.

**The value is not automatically escaped by Astro!** Be sure that you trust the value, or that you have escaped it manually before passing it to the template. Forgetting to do this will open you up to [Cross Site Scripting (XSS) attacks.](https://owasp.org/www-community/attacks/xss/)

    ---const rawHTMLString = "Hello <strong>World</strong>"---<h1>{rawHTMLString}</h1>  <!-- Output: <h1>Hello &lt;strong&gt;World&lt;/strong&gt;</h1> --><h1 set:html={rawHTMLString} />  <!-- Output: <h1>Hello <strong>World</strong></h1> -->

You can also use `set:html` on a `<Fragment>` to avoid adding an unnecessary wrapper element. This can be especially useful when fetching HTML from a CMS.

    ---const cmsContent = await fetchHTMLFromMyCMS();---<Fragment set:html={cmsContent}>

`set:html={Promise<string>}` injects an HTML string into an element that is wrapped in a Promise.

This can be used to inject HTML stored externally, such as in a database.

    ---import api from '../db/api.js';---<article set:html={api.getArticle(Astro.props.id)}></article>

`set:html={Promise<Response>}` injects a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) into an element.

This is most helpful when using `fetch()`. For example, fetching old posts from a previous static-site generator.

    <article set:html={fetch('http://example/old-posts/making-soup.html')}></article>

`set:html` can be used on any tag and does not have to include HTML. For example, use with [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) on a `<script>` tag to add a [JSON-LD](https://json-ld.org/) schema to your page.

    <script type="application/ld+json" set:html={JSON.stringify({  "@context": "https://schema.org/",  "@type": "Person",  name: "Houston",  hasOccupation: {    "@type": "Occupation",    name: "Astronaut"  }})}/>

### `set:text`

[Section titled set:text](#settext)

`set:text={string}` injects a text string into an element, similar to setting `el.innerText`. Unlike `set:html`, the `string` value that is passed is automatically escaped by Astro.

This is equivalent to just passing a variable into a template expression directly (ex: `<div>{someText}</div>`) and therefore this directive is not commonly used.

Client Directives
-----------------

[Section titled Client Directives](#client-directives)

These directives control how [UI Framework components](/en/guides/framework-components/) are hydrated on the page.

By default, a UI Framework component is not hydrated in the client. If no `client:*` directive is provided, its HTML is rendered onto the page without JavaScript.

A client directive can only be used on a UI framework component that is directly imported into a `.astro` component. Hydration directives are not supported when using [dynamic tags](/en/reference/astro-syntax/#dynamic-tags) and [custom components passed via the `components` prop](/en/guides/integrations-guide/mdx/#custom-components-with-imported-mdx).

### `client:load`

[Section titled client:load](#clientload)

*   **Priority:** High
*   **Useful for:** Immediately-visible UI elements that need to be interactive as soon as possible.

Load and hydrate the component JavaScript immediately on page load.

    <BuyButton client:load />

### `client:idle`

[Section titled client:idle](#clientidle)

*   **Priority:** Medium
*   **Useful for:** Lower-priority UI elements that don’t need to be immediately interactive.

Load and hydrate the component JavaScript once the page is done with its initial load and the `requestIdleCallback` event has fired. If you are in a browser that doesn’t support [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback), then the document [`load`](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) event is used.

    <ShowHideButton client:idle />

#### `timeout`

[Section titled timeout](#timeout)

**Added in:** `astro@4.15.0`

The maximum time to wait, in milliseconds, before hydrating the component, even if the page is not yet done with its initial load.

This allows you to pass a value for [the `timeout` option from the `requestIdleCallback()` specification](https://www.w3.org/TR/requestidlecallback/#the-requestidlecallback-method). This means you can delay hydration for lower-priority UI elements with more control to ensure your element is interactive within a specified time frame.

    <ShowHideButton client:idle={{timeout: 500}} />

### `client:visible`

[Section titled client:visible](#clientvisible)

*   **Priority:** Low
*   **Useful for:** Low-priority UI elements that are either far down the page (“below the fold”) or so resource-intensive to load that you would prefer not to load them at all if the user never saw the element.

Load and hydrate the component JavaScript once the component has entered the user’s viewport. This uses an `IntersectionObserver` internally to keep track of visibility.

    <HeavyImageCarousel client:visible />

#### `client:visible={{rootMargin}}`

[Section titled client:visible={{rootMargin}}](#clientvisiblerootmargin)

**Added in:** `astro@4.1.0`

Optionally, a value for `rootMargin` can be passed to the underlying `IntersectionObserver`. When `rootMargin` is specified, the component JavaScript will hydrate when a specified margin (in pixels) around the component enters the viewport, rather than the component itself.

    <HeavyImageCarousel client:visible={{rootMargin: "200px"}} />

Specifying a `rootMargin` value can reduce layout shifts (CLS), allow more time for a component to hydrate on slower internet connections, and make components interactive sooner, enhancing the stability and responsiveness of the page.

### `client:media`

[Section titled client:media](#clientmedia)

*   **Priority:** Low
*   **Useful for:** Sidebar toggles, or other elements that might only be visible on certain screen sizes.

`client:media={string}` loads and hydrates the component JavaScript once a certain CSS media query is met.

Note

If the component is already hidden and shown by a media query in your CSS, then it can be easier to just use `client:visible` and not pass that same media query into the directive.

    <SidebarToggle client:media="(max-width: 50em)" />

### `client:only`

[Section titled client:only](#clientonly)

`client:only={string}` **skips** HTML server rendering, and renders only on the client. It acts similarly to `client:load` in that it loads, renders, and hydrates the component immediately on page load.

**You must pass the component’s correct framework as a value!** Because Astro doesn’t run the component during your build / on the server, Astro doesn’t know what framework your component uses unless you tell it explicitly.

    <SomeReactComponent client:only="react" /><SomePreactComponent client:only="preact" /><SomeSvelteComponent client:only="svelte" /><SomeVueComponent client:only="vue" /><SomeSolidComponent client:only="solid-js" />

#### Display loading content

[Section titled Display loading content](#display-loading-content)

For components that render only on the client, it is also possible to display fallback content while they are loading. Use `slot="fallback"` on any child element to create content that will be displayed only until your client component is available:

    <ClientComponent client:only="vue">  <div slot="fallback">Loading</div></ClientComponent>

### Custom Client Directives

[Section titled Custom Client Directives](#custom-client-directives)

Since Astro 2.6.0, integrations can also add custom `client:*` directives to change how and when components should be hydrated.

Visit the [`addClientDirective` API](/en/reference/integrations-reference/#addclientdirective-option) page to learn more about creating a custom client directive.

Server Directives
-----------------

[Section titled Server Directives](#server-directives)

These directives control how server island components are rendered.

### `server:defer`

[Section titled server:defer](#serverdefer)

The `server:defer` directive transforms the component into a server island, causing it to be rendered on demand, outside the scope of the rest of the page rendering.

See more about using [server island components](/en/guides/server-islands/).

    <Avatar server:defer />

Script & Style Directives
-------------------------

[Section titled Script &amp; Style Directives](#script--style-directives)

These directives can only be used on HTML `<script>` and `<style>` tags, to control how your client-side JavaScript and CSS are handled on the page.

### `is:global`

[Section titled is:global](#isglobal)

By default, Astro automatically scopes `<style>` CSS rules to the component. You can opt-out of this behavior with the `is:global` directive.

`is:global` makes the contents of a `<style>` tag apply globally on the page when the component is included. This disables Astro’s CSS scoping system. This is equivalent to wrapping all of the selectors within a `<style>` tag with `:global()`.

You can combine `<style>` and `<style is:global>` together in the same component, to create some global style rules while still scoping most of your component CSS.

See the [Styling & CSS](/en/guides/styling/#global-styles) page for more details about how global styles work.

    <style is:global>  body a { color: red; }</style>

### `is:inline`

[Section titled is:inline](#isinline)

By default, Astro will process, optimize, and bundle any `<script>` and `<style>` tags that it sees on the page. You can opt-out of this behavior with the `is:inline` directive.

`is:inline` tells Astro to leave the `<script>` or `<style>` tag as-is in the final output HTML. The contents will not be processed, optimized, or bundled. This limits some Astro features, like importing an npm package or using a compile-to-CSS language like Sass.

The `is:inline` directive means that `<style>` and `<script>` tags:

*   Will not be bundled into an external file. This means that [attributes like `defer`](https://javascript.info/script-async-defer) which control the loading of an external file will have no effect.
*   Will not be deduplicated—the element will appear as many times as it is rendered.
*   Will not have its `import`/`@import`/`url()` references resolved relative to the `.astro` file.
*   Will be rendered in the final output HTML exactly where it is authored.
*   Styles will be global and not scoped to the component.

Caution

The `is:inline` directive is implied whenever any attribute other than `src` is used on a `<script>` or `<style>` tag. The one exception is using the [`define:vars` directive](/en/reference/directives-reference/#definevars) on the `<style>` tag, which does not automatically imply `is:inline`.

    <style is:inline>  /* inline: relative & npm package imports are not supported. */  @import '/assets/some-public-styles.css';  span { color: green; }</style>
    <script is:inline>  /* inline: relative & npm package imports are not supported. */  console.log('I am inlined right here in the final output HTML.');</script>

See how [client-side scripts](/en/guides/client-side-scripts/) work in Astro components.

### `define:vars`

[Section titled define:vars](#definevars)

`define:vars={...}` can pass server-side variables from your component frontmatter into the client `<script>` or `<style>` tags. Any JSON-serializable frontmatter variable is supported, including `props` passed to your component through `Astro.props`. Values are serialized with [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

    ---const foregroundColor = "rgb(221 243 228)";const backgroundColor = "rgb(24 121 78)";const message = "Astro is awesome!";---<style define:vars={{ textColor: foregroundColor, backgroundColor }}>  h1 {    background-color: var(--backgroundColor);    color: var(--textColor);  }</style>
    <script define:vars={{ message }}>  alert(message);</script>

Caution

Using `define:vars` on a `<script>` tag implies the [`is:inline` directive](#isinline), which means your scripts won’t be bundled and will be inlined directly into the HTML.

This is because when Astro bundles a script, it includes and runs the script once even if you include the component containing the script multiple times on one page. `define:vars` requires a script to rerun with each set of values, so Astro creates an inline script instead.

For scripts, try [passing variables to scripts manually](/en/guides/client-side-scripts/#pass-frontmatter-variables-to-scripts) instead.

Advanced Directives
-------------------

[Section titled Advanced Directives](#advanced-directives)

### `is:raw`

[Section titled is:raw](#israw)

`is:raw` instructs the Astro compiler to treat any children of that element as text. This means that all special Astro templating syntax will be ignored inside of this component.

For example, if you had a custom Katex component that converted some text to HTML, you could have users do this:

    ---import Katex from '../components/Katex.astro';---<Katex is:raw>Some conflicting {syntax} here</Katex>

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/directives-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Template expressions reference](/en/reference/astro-syntax/) [Next  
Configuration Reference](/en/reference/configuration-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/error-reference
Error reference
===============

The following reference is a complete list of the errors you may encounter while using Astro. For additional assistance, including common pitfalls, please also see our [Troubleshooting Guide](/en/guides/troubleshooting/).

Astro Errors
------------

[Section titled Astro Errors](#astro-errors)

*   [**UnknownCompilerError**](/en/reference/errors/unknown-compiler-error/)  
    Unknown compiler error.
*   [**ClientAddressNotAvailable**](/en/reference/errors/client-address-not-available/)  
    `Astro.clientAddress` is not available in current adapter.
*   [**PrerenderClientAddressNotAvailable**](/en/reference/errors/prerender-client-address-not-available/)  
    `Astro.clientAddress` cannot be used inside prerendered routes.
*   [**StaticClientAddressNotAvailable**](/en/reference/errors/static-client-address-not-available/)  
    `Astro.clientAddress` is not available in prerendered pages.
*   [**NoMatchingStaticPathFound**](/en/reference/errors/no-matching-static-path-found/)  
    No static path found for requested path.
*   [**OnlyResponseCanBeReturned**](/en/reference/errors/only-response-can-be-returned/)  
    Invalid type returned by Astro page.
*   [**MissingMediaQueryDirective**](/en/reference/errors/missing-media-query-directive/)  
    Missing value for `client:media` directive.
*   [**NoMatchingRenderer**](/en/reference/errors/no-matching-renderer/)  
    No matching renderer found.
*   [**NoClientEntrypoint**](/en/reference/errors/no-client-entrypoint/)  
    No client entrypoint specified in renderer.
*   [**NoClientOnlyHint**](/en/reference/errors/no-client-only-hint/)  
    Missing hint on `client:only` directive.
*   [**InvalidGetStaticPathParam**](/en/reference/errors/invalid-get-static-path-param/)  
    Invalid value returned by a `getStaticPaths` path.
*   [**InvalidGetStaticPathsEntry**](/en/reference/errors/invalid-get-static-paths-entry/)  
    Invalid entry inside getStaticPath’s return value
*   [**InvalidGetStaticPathsReturn**](/en/reference/errors/invalid-get-static-paths-return/)  
    Invalid value returned by getStaticPaths.
*   [**GetStaticPathsExpectedParams**](/en/reference/errors/get-static-paths-expected-params/)  
    Missing params property on `getStaticPaths` route.
*   [**GetStaticPathsInvalidRouteParam**](/en/reference/errors/get-static-paths-invalid-route-param/)  
    Invalid value for `getStaticPaths` route parameter.
*   [**GetStaticPathsRequired**](/en/reference/errors/get-static-paths-required/)  
    `getStaticPaths()` function required for dynamic routes.
*   [**ReservedSlotName**](/en/reference/errors/reserved-slot-name/)  
    Invalid slot name.
*   [**NoAdapterInstalled**](/en/reference/errors/no-adapter-installed/)  
    Cannot use Server-side Rendering without an adapter.
*   [**AdapterSupportOutputMismatch**](/en/reference/errors/adapter-support-output-mismatch/)  
    Adapter does not support server output.
*   [**NoAdapterInstalledServerIslands**](/en/reference/errors/no-adapter-installed-server-islands/)  
    Cannot use Server Islands without an adapter.
*   [**NoMatchingImport**](/en/reference/errors/no-matching-import/)  
    No import found for component.
*   [**InvalidPrerenderExport**](/en/reference/errors/invalid-prerender-export/)  
    Invalid prerender export.
*   [**InvalidComponentArgs**](/en/reference/errors/invalid-component-args/)  
    Invalid component arguments.
*   [**PageNumberParamNotFound**](/en/reference/errors/page-number-param-not-found/)  
    Page number param not found.
*   [**ImageMissingAlt**](/en/reference/errors/image-missing-alt/)  
    Image missing required “alt” property.
*   [**InvalidImageService**](/en/reference/errors/invalid-image-service/)  
    Error while loading image service.
*   [**MissingImageDimension**](/en/reference/errors/missing-image-dimension/)  
    Missing image dimensions
*   [**FailedToFetchRemoteImageDimensions**](/en/reference/errors/failed-to-fetch-remote-image-dimensions/)  
    Failed to retrieve remote image dimensions
*   [**UnsupportedImageFormat**](/en/reference/errors/unsupported-image-format/)  
    Unsupported image format
*   [**UnsupportedImageConversion**](/en/reference/errors/unsupported-image-conversion/)  
    Unsupported image conversion
*   [**PrerenderDynamicEndpointPathCollide**](/en/reference/errors/prerender-dynamic-endpoint-path-collide/)  
    Prerendered dynamic endpoint has path collision.
*   [**ExpectedImage**](/en/reference/errors/expected-image/)  
    Expected src to be an image.
*   [**ExpectedImageOptions**](/en/reference/errors/expected-image-options/)  
    Expected image options.
*   [**ExpectedNotESMImage**](/en/reference/errors/expected-not-esmimage/)  
    Expected image options, not an ESM-imported image.
*   [**IncompatibleDescriptorOptions**](/en/reference/errors/incompatible-descriptor-options/)  
    Cannot set both `densities` and `widths`
*   [**ImageNotFound**](/en/reference/errors/image-not-found/)  
    Image not found.
*   [**NoImageMetadata**](/en/reference/errors/no-image-metadata/)  
    Could not process image metadata.
*   [**CouldNotTransformImage**](/en/reference/errors/could-not-transform-image/)  
    Could not transform image.
*   [**ResponseSentError**](/en/reference/errors/response-sent-error/)  
    Unable to set response.
*   [**MiddlewareNoDataOrNextCalled**](/en/reference/errors/middleware-no-data-or-next-called/)  
    The middleware didn’t return a `Response`.
*   [**MiddlewareNotAResponse**](/en/reference/errors/middleware-not-aresponse/)  
    The middleware returned something that is not a `Response` object.
*   [**EndpointDidNotReturnAResponse**](/en/reference/errors/endpoint-did-not-return-aresponse/)  
    The endpoint did not return a `Response`.
*   [**LocalsNotAnObject**](/en/reference/errors/locals-not-an-object/)  
    Value assigned to `locals` is not accepted.
*   [**LocalsReassigned**](/en/reference/errors/locals-reassigned/)  
    `locals` must not be reassigned.
*   [**AstroResponseHeadersReassigned**](/en/reference/errors/astro-response-headers-reassigned/)  
    `Astro.response.headers` must not be reassigned.
*   [**MiddlewareCantBeLoaded**](/en/reference/errors/middleware-cant-be-loaded/)  
    Can’t load the middleware.
*   [**LocalImageUsedWrongly**](/en/reference/errors/local-image-used-wrongly/)  
    Local images must be imported.
*   [**AstroGlobUsedOutside**](/en/reference/errors/astro-glob-used-outside/)  
    Astro.glob() used outside of an Astro file.
*   [**AstroGlobNoMatch**](/en/reference/errors/astro-glob-no-match/)  
    Astro.glob() did not match any files.
*   [**RedirectWithNoLocation**](/en/reference/errors/redirect-with-no-location/)  
    A redirect must be given a location with the `Location` header.
*   [**UnsupportedExternalRedirect**](/en/reference/errors/unsupported-external-redirect/)  
    Unsupported or malformed URL.
*   [**InvalidDynamicRoute**](/en/reference/errors/invalid-dynamic-route/)  
    Invalid dynamic route.
*   [**MissingSharp**](/en/reference/errors/missing-sharp/)  
    Could not find Sharp.
*   [**UnknownViteError**](/en/reference/errors/unknown-vite-error/)  
    Unknown Vite Error.
*   [**FailedToLoadModuleSSR**](/en/reference/errors/failed-to-load-module-ssr/)  
    Could not import file.
*   [**InvalidGlob**](/en/reference/errors/invalid-glob/)  
    Invalid glob pattern.
*   [**FailedToFindPageMapSSR**](/en/reference/errors/failed-to-find-page-map-ssr/)  
    Astro couldn’t find the correct page to render
*   [**MissingLocale**](/en/reference/errors/missing-locale/)  
    The provided locale does not exist.
*   [**MissingIndexForInternationalization**](/en/reference/errors/missing-index-for-internationalization/)  
    Index page not found.
*   [**IncorrectStrategyForI18n**](/en/reference/errors/incorrect-strategy-for-i18n/)  
    You can’t use the current function with the current strategy
*   [**NoPrerenderedRoutesWithDomains**](/en/reference/errors/no-prerendered-routes-with-domains/)  
    Prerendered routes aren’t supported when internationalization domains are enabled.
*   [**MissingMiddlewareForInternationalization**](/en/reference/errors/missing-middleware-for-internationalization/)  
    Enabled manual internationalization routing without having a middleware.
*   [**CantRenderPage**](/en/reference/errors/cant-render-page/)  
    Astro can’t render the route.
*   [**UnhandledRejection**](/en/reference/errors/unhandled-rejection/)  
    Unhandled rejection
*   [**i18nNotEnabled**](/en/reference/errors/i18n-not-enabled/)  
    i18n Not Enabled
*   [**i18nNoLocaleFoundInPath**](/en/reference/errors/i18n-no-locale-found-in-path/)  
    The path doesn’t contain any locale
*   [**RouteNotFound**](/en/reference/errors/route-not-found/)  
    Route not found.
*   [**EnvInvalidVariables**](/en/reference/errors/env-invalid-variables/)  
    Invalid Environment Variables
*   [**ServerOnlyModule**](/en/reference/errors/server-only-module/)  
    Module is only available server-side
*   [**RewriteWithBodyUsed**](/en/reference/errors/rewrite-with-body-used/)  
    Cannot use Astro.rewrite after the request body has been read
*   [**ForbiddenRewrite**](/en/reference/errors/forbidden-rewrite/)  
    Forbidden rewrite to a static route.
*   [**UnknownFilesystemError**](/en/reference/errors/unknown-filesystem-error/)  
    An unknown error occurred while reading or writing files to disk.
*   [**CannotExtractFontType**](/en/reference/errors/cannot-extract-font-type/)  
    Cannot extract the font type from the given URL.
*   [**CannotDetermineWeightAndStyleFromFontFile**](/en/reference/errors/cannot-determine-weight-and-style-from-font-file/)  
    Cannot determine weight and style from font file.
*   [**CannotFetchFontFile**](/en/reference/errors/cannot-fetch-font-file/)  
    Cannot fetch the given font file.
*   [**CannotLoadFontProvider**](/en/reference/errors/cannot-load-font-provider/)  
    Cannot load font provider
*   [**ExperimentalFontsNotEnabled**](/en/reference/errors/experimental-fonts-not-enabled/)  
    Experimental fonts are not enabled
*   [**FontFamilyNotFound**](/en/reference/errors/font-family-not-found/)  
    Font family not found

CSS Errors
----------

[Section titled CSS Errors](#css-errors)

*   [**UnknownCSSError**](/en/reference/errors/unknown-csserror/)  
    Unknown CSS Error.
*   [**CSSSyntaxError**](/en/reference/errors/csssyntax-error/)  
    CSS Syntax Error.

Markdown Errors
---------------

[Section titled Markdown Errors](#markdown-errors)

*   [**UnknownMarkdownError**](/en/reference/errors/unknown-markdown-error/)  
    Unknown Markdown Error.
*   [**MarkdownFrontmatterParseError**](/en/reference/errors/markdown-frontmatter-parse-error/)  
    Failed to parse Markdown frontmatter.
*   [**InvalidFrontmatterInjectionError**](/en/reference/errors/invalid-frontmatter-injection-error/)  
    Invalid frontmatter injection.
*   [**MdxIntegrationMissingError**](/en/reference/errors/mdx-integration-missing-error/)  
    MDX integration missing.
*   [**UnknownConfigError**](/en/reference/errors/unknown-config-error/)  
    Unknown configuration error.
*   [**ConfigNotFound**](/en/reference/errors/config-not-found/)  
    Specified configuration file not found.
*   [**ConfigLegacyKey**](/en/reference/errors/config-legacy-key/)  
    Legacy configuration detected.

CLI Errors
----------

[Section titled CLI Errors](#cli-errors)

*   [**UnknownCLIError**](/en/reference/errors/unknown-clierror/)  
    Unknown CLI Error.
*   [**GenerateContentTypesError**](/en/reference/errors/generate-content-types-error/)  
    Failed to generate content types.

Content Collection Errors
-------------------------

[Section titled Content Collection Errors](#content-collection-errors)

*   [**UnknownContentCollectionError**](/en/reference/errors/unknown-content-collection-error/)  
    Unknown Content Collection Error.
*   [**RenderUndefinedEntryError**](/en/reference/errors/render-undefined-entry-error/)  
    Attempted to render an undefined content collection entry.
*   [**GetEntryDeprecationError**](/en/reference/errors/get-entry-deprecation-error/)  
    Invalid use of `getDataEntryById` or `getEntryBySlug` function.
*   [**InvalidContentEntryFrontmatterError**](/en/reference/errors/invalid-content-entry-frontmatter-error/)  
    Content entry frontmatter does not match schema.
*   [**InvalidContentEntryDataError**](/en/reference/errors/invalid-content-entry-data-error/)  
    Content entry data does not match schema.
*   [**ContentLoaderReturnsInvalidId**](/en/reference/errors/content-loader-returns-invalid-id/)  
    Content loader returned an entry with an invalid `id`.
*   [**ContentEntryDataError**](/en/reference/errors/content-entry-data-error/)  
    Content entry data does not match schema.
*   [**ContentLoaderInvalidDataError**](/en/reference/errors/content-loader-invalid-data-error/)  
    Content entry is missing an ID
*   [**InvalidContentEntrySlugError**](/en/reference/errors/invalid-content-entry-slug-error/)  
    Invalid content entry slug.
*   [**ContentSchemaContainsSlugError**](/en/reference/errors/content-schema-contains-slug-error/)  
    Content Schema should not contain `slug`.
*   [**MixedContentDataCollectionError**](/en/reference/errors/mixed-content-data-collection-error/)  
    Content and data cannot be in same collection.
*   [**ContentCollectionTypeMismatchError**](/en/reference/errors/content-collection-type-mismatch-error/)  
    Collection contains entries of a different type.
*   [**DataCollectionEntryParseError**](/en/reference/errors/data-collection-entry-parse-error/)  
    Data collection entry failed to parse.
*   [**DuplicateContentEntrySlugError**](/en/reference/errors/duplicate-content-entry-slug-error/)  
    Duplicate content entry slug.
*   [**UnsupportedConfigTransformError**](/en/reference/errors/unsupported-config-transform-error/)  
    Unsupported transform in content config.
*   [**FileParserNotFound**](/en/reference/errors/file-parser-not-found/)  
    File parser not found
*   [**FileGlobNotSupported**](/en/reference/errors/file-glob-not-supported/)  
    Glob patterns are not supported in the file loader

Action Errors
-------------

[Section titled Action Errors](#action-errors)

*   [**ActionsWithoutServerOutputError**](/en/reference/errors/actions-without-server-output-error/)  
    Actions must be used with server output.
*   [**ActionsReturnedInvalidDataError**](/en/reference/errors/actions-returned-invalid-data-error/)  
    Action handler returned invalid data.
*   [**ActionNotFoundError**](/en/reference/errors/action-not-found-error/)  
    Action not found.
*   [**ActionCalledFromServerError**](/en/reference/errors/action-called-from-server-error/)  
    Action unexpected called from the server.
*   [**ActionsCantBeLoaded**](/en/reference/errors/actions-cant-be-loaded/)  
    Can’t load the Astro actions.

Session Errors
--------------

[Section titled Session Errors](#session-errors)

*   [**SessionStorageInitError**](/en/reference/errors/session-storage-init-error/)  
    Session storage could not be initialized.
*   [**SessionStorageSaveError**](/en/reference/errors/session-storage-save-error/)  
    Session data could not be saved.
*   [**SessionWithoutSupportedAdapterOutputError**](/en/reference/errors/session-without-supported-adapter-output-error/)  
    Sessions cannot be used with an adapter that doesn’t support server output.
*   [**SessionConfigMissingError**](/en/reference/errors/session-config-missing-error/)  
    Session storage was enabled but not configured.
*   [**SessionConfigWithoutFlagError**](/en/reference/errors/session-config-without-flag-error/)  
    Session flag not set

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Legacy flags](/en/reference/legacy-flags/) [Next  
Integrations overview](/en/guides/integrations-guide/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors
# Aggregated from ./pages/reference/errors/action-called-from-server-error
Action unexpected called from the server.
=========================================

> **ActionCalledFromServerError**: Action called from a server page or endpoint without using `Astro.callAction()`. This wrapper must be used to call actions from server code.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Action called from a server page or endpoint without using `Astro.callAction()`.

**See Also:**

*   [`Astro.callAction()` reference](/en/reference/api-reference/#callaction)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/action-not-found-error
Action not found.
=================

> **ActionNotFoundError**: The server received a request for an action named `ACTION_NAME` but could not find a match. If you renamed an action, check that you’ve updated your `actions/index` file and your calling code to match.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The server received a request for an action but could not find a match with the same name.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/action-query-string-invalid-error
An invalid Action query string was passed by a form.
====================================================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **ActionQueryStringInvalidError**: The server received the query string `?_astroAction=ACTION_NAME`, but could not find an action with that name. If you changed an action’s name in development, remove this query param from your URL and refresh.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The server received the query string `?_astroAction=name`, but could not find an action with that name. Use the action function’s `.queryString` property to retrieve the form `action` URL.

**See Also:**

*   [Actions RFC](https://github.com/withastro/roadmap/blob/actions/proposals/0046-actions.md)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/actions-cant-be-loaded
Can't load the Astro actions.
=============================

> **ActionsCantBeLoaded**: An unknown error was thrown while loading the Astro actions file.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown in development mode when the actions file can’t be loaded.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/actions-returned-invalid-data-error
Action handler returned invalid data.
=====================================

> **ActionsReturnedInvalidDataError**: Action handler returned invalid data. Handlers should return serializable data types like objects, arrays, strings, and numbers. Parse error: ERROR

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Action handler returned invalid data. Handlers should return serializable data types, and cannot return a Response object.

**See Also:**

*   [Actions handler reference](/en/reference/modules/astro-actions/#handler-property)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/actions-used-with-for-get-error
An invalid Action query string was passed by a form.
====================================================

Deprecated

Deprecated since version 4.13.2.

> **ActionsUsedWithForGetError**: Action ACTION\_NAME was called from a form using a GET request, but only POST requests are supported. This often occurs if `method="POST"` is missing on the form.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Action was called from a form using a GET request, but only POST requests are supported. This often occurs if `method="POST"` is missing on the form.

**See Also:**

*   [Actions RFC](https://github.com/withastro/roadmap/blob/actions/proposals/0046-actions.md)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/actions-without-server-output-error
Actions must be used with server output.
========================================

> **ActionsWithoutServerOutputError**: A server is required to create callable backend functions. To deploy routes to a server, add an adapter to your Astro config and configure your route for on-demand rendering

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Your project must have a server output to create backend functions with Actions.

**See Also:**

*   [On-demand rendering](/en/guides/on-demand-rendering/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/adapter-support-output-mismatch
Adapter does not support server output.
=======================================

> **AdapterSupportOutputMismatch**: The `ADAPTER_NAME` adapter is configured to output a static website, but the project contains server-rendered pages. Please install and configure the appropriate server adapter for your final deployment.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The currently configured adapter does not support server-side rendering, which is required for the current project setup.

Depending on your adapter, there may be a different entrypoint to use for server-side rendering. For example, the `@astrojs/vercel` adapter has a `@astrojs/vercel/static` entrypoint for static rendering, and a `@astrojs/vercel/serverless` entrypoint for server-side rendering.

**See Also:**

*   [Server-side Rendering](/en/guides/on-demand-rendering/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/astro-glob-no-match
Astro.glob() did not match any files.
=====================================

> **AstroGlobNoMatch**: `Astro.glob(GLOB_STR)` did not return any matching files.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`Astro.glob()` did not return any matching files. There might be a typo in the glob pattern.

**See Also:**

*   [Astro.glob](/en/reference/api-reference/#astroglob)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/astro-glob-used-outside
Astro.glob() used outside of an Astro file.
===========================================

> **AstroGlobUsedOutside**: `Astro.glob(GLOB_STR)` can only be used in `.astro` files. `import.meta.glob(GLOB_STR)` can be used instead to achieve a similar result.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`Astro.glob()` can only be used in `.astro` files. You can use [`import.meta.glob()`](https://vite.dev/guide/features.html#glob-import) instead to achieve the same result.

**See Also:**

*   [Astro.glob](/en/reference/api-reference/#astroglob)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/astro-response-headers-reassigned
Astro.response.headers must not be reassigned.
==============================================

> **AstroResponseHeadersReassigned**: Individual headers can be added to and removed from `Astro.response.headers`, but it must not be replaced with another instance of `Headers` altogether.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when a value is being set as the `headers` field on the `ResponseInit` object available as `Astro.response`.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/cannot-determine-weight-and-style-from-font-file
Cannot determine weight and style from font file.
=================================================

> An error occured while determining the weight and style from the local font file.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Cannot determine weight and style from font file, update your family config and set `weight` and `style` manually instead.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/cannot-extract-font-type
Cannot extract the font type from the given URL.
================================================

> An error occured while trying to extract the font type from the given URL.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Cannot extract the font type from the given URL.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/cannot-fetch-font-file
Cannot fetch the given font file.
=================================

> An error occured while fetching font file from the given URL.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Cannot fetch the given font file

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/cannot-load-font-provider
Cannot load font provider
=========================

> Astro is unable to load the given font provider. Open an issue on the corresponding provider’s repository.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Cannot load font provider

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/cant-render-page
Astro can't render the route.
=============================

> **CantRenderPage**: Astro cannot find any content to render for this route. There is no file or redirect associated with this route.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not find an associated file with content while trying to render the route. This is an Astro error and not a user error. If restarting the dev server does not fix the problem, please file an issue.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/cant-use-astro-config-module-error
Cannot use the astro:config module without enabling the experimental feature.
=============================================================================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **CantUseAstroConfigModuleError**: Cannot import the module “MODULE\_NAME” because the experimental feature is disabled. Enable `experimental.serializeConfig` in your `astro.config.mjs`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Cannot use the module `astro:config` without enabling the experimental feature.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/client-address-not-available
Astro.clientAddress is not available in current adapter.
========================================================

> **ClientAddressNotAvailable**: `Astro.clientAddress` is not available in the `ADAPTER_NAME` adapter. File an issue with the adapter to add support.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The adapter you’re using unfortunately does not support `Astro.clientAddress`.

**See Also:**

*   [Official integrations](/en/guides/integrations-guide/#official-integrations)
*   [Astro.clientAddress](/en/reference/api-reference/#clientaddress)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/collection-does-not-exist-error
Collection does not exist
=========================

Deprecated

Collections that do not exist no longer result in an error. A warning is given instead.

> A collection queried via `getCollection()` does not exist.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

When querying a collection, ensure a collection directory with the requested name exists under `src/content/`.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/config-legacy-key
Legacy configuration detected.
==============================

> **ConfigLegacyKey**: Legacy configuration detected: `LEGACY_CONFIG_KEY`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro detected a legacy configuration option in your configuration file.

**See Also:**

*   [Configuration reference](/en/reference/configuration-reference/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/config-not-found
Specified configuration file not found.
=======================================

> **ConfigNotFound**: Unable to resolve `--config "CONFIG_FILE"`. Does the file exist?

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The specified configuration file using `--config` could not be found. Make sure that it exists or that the path is correct

**See Also:**

*   [\--config](/en/reference/cli-reference/#--config-path)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/content-collection-type-mismatch-error
Collection contains entries of a different type.
================================================

> **ContentCollectionTypeMismatchError**: COLLECTION contains EXPECTED\_TYPE entries, but is configured as a ACTUAL\_TYPE collection.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Legacy content collections must contain entries of the type configured. Collections are `type: 'content'` by default. Try adding `type: 'data'` to your collection config for data collections.

**See Also:**

*   [Legacy content collections](/en/guides/upgrade-to/v5/#updating-existing-collections)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/content-entry-data-error
Content entry data does not match schema.
=========================================

> **Example error message:**  
> **blog** → **post** data does not match collection schema.  
> “title” is required.  
> “date” must be a valid date.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A content entry does not match its collection schema. Make sure that all required fields are present, and that all fields are of the correct type. You can check against the collection schema in your `src/content.config.*` file. See the [Content collections documentation](/en/guides/content-collections/) for more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/content-loader-invalid-data-error
Content entry is missing an ID
==============================

> **Example error message:**  
> The loader for **blog** returned invalid data.  
> Object is missing required property “id”.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The loader for a content collection returned invalid data. Inline loaders must return an array of objects with unique ID fields or a plain object with IDs as keys and entries as values.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/content-loader-returns-invalid-id
Content loader returned an entry with an invalid id.
====================================================

> **Example error message:**  
> The content loader for the collection **blog** returned an entry with an invalid `id`:  
> {  
> “id”: 1,  
> “title”: “Hello, World!”  
> }

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A content loader returned an invalid `id`. Make sure that the `id` of the entry is a string. See the [Content collections documentation](/en/guides/content-collections/) for more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/content-schema-contains-slug-error
Content Schema should not contain slug.
=======================================

> **ContentSchemaContainsSlugError**: A content collection schema should not contain `slug` since it is reserved for slug generation. Remove this from your COLLECTION\_NAME collection schema.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A legacy content collection schema should not contain the `slug` field. This is reserved by Astro for generating entry slugs. Remove `slug` from your schema. You can still use custom slugs in your frontmatter.

**See Also:**

*   [Legacy content collections](/en/guides/upgrade-to/v5/#updating-existing-collections)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/could-not-transform-image
Could not transform image.
==========================

> **CouldNotTransformImage**: Could not transform image `IMAGE_PATH`. See the stack trace for more information.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not transform one of your images. Often, this is caused by a corrupted or malformed image. Re-exporting the image from your image editor may fix this issue.

Depending on the image service you are using, the stack trace may contain more information on the specific error encountered.

**See Also:**

*   [Images](/en/guides/images/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/csssyntax-error
CSS Syntax Error.
=================

> **Example error messages:**  
> CSSSyntaxError: Missed semicolon  
> CSSSyntaxError: Unclosed string  

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an error while parsing your CSS, due to a syntax error. This is often caused by a missing semicolon.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/data-collection-entry-parse-error
Data collection entry failed to parse.
======================================

> `COLLECTION_ENTRY_NAME` failed to parse.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Collection entries of `type: 'data'` must return an object with valid JSON (for `.json` entries) or YAML (for `.yaml` entries).

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/duplicate-content-entry-slug-error
Duplicate content entry slug.
=============================

> `COLLECTION_NAME` contains multiple entries with the same slug: `SLUG`. Slugs must be unique.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Content collection entries must have unique slugs. Duplicates are often caused by the `slug` frontmatter property.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/endpoint-did-not-return-aresponse
The endpoint did not return a Response.
=======================================

> **EndpointDidNotReturnAResponse**: An endpoint must return either a `Response`, or a `Promise` that resolves with a `Response`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when an endpoint does not return anything or returns an object that is not a `Response` object.

An endpoint must return either a `Response`, or a `Promise` that resolves with a `Response`. For example:

    import type { APIContext } from 'astro';
    export async function GET({ request, url, cookies }: APIContext): Promise<Response> {    return Response.json({        success: true,        result: 'Data from Astro Endpoint!'    })}

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/env-invalid-variable
Invalid Environment Variable
============================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **EnvInvalidVariable**: The following environment variable does not match the data type and/or properties defined in `experimental.env.schema`: KEY is not of type TYPE

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An environment variable does not match the data type and/or properties defined in `experimental.env.schema`.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/env-invalid-variables
Invalid Environment Variables
=============================

> The following environment variables defined in `env.schema` are invalid.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Some environment variables do not match the data type and/or properties defined in `env.schema`.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/env-unsupported-get-secret
Unsupported astro:env getSecret
===============================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **EnvUnsupportedGetSecret**: `astro:env/server` exported function `getSecret` is not supported by your adapter.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `astro:env/server` exported function `getSecret()` is not supported by your adapter.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/expected-image-options
Expected image options.
=======================

> **ExpectedImageOptions**: Expected getImage() parameter to be an object. Received `OPTIONS`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`getImage()`’s first parameter should be an object with the different properties to apply to your image.

    import { getImage } from "astro:assets";import myImage from "../assets/my_image.png";
    const optimizedImage = await getImage({src: myImage, width: 300, height: 300});

In most cases, this error happens because parameters were passed directly instead of inside an object.

**See Also:**

*   [Images](/en/guides/images/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/expected-image
Expected src to be an image.
============================

> **ExpectedImage**: Expected `src` property for `getImage` or `<Image />` to be either an ESM imported image or a string with the path of a remote image. Received `SRC` (type: `TYPEOF_OPTIONS`).  
>   
> Full serialized options received: `FULL_OPTIONS`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An image’s `src` property is not valid. The Image component requires the `src` attribute to be either an image that has been ESM imported or a string. This is also true for the first parameter of `getImage()`.

    ---import { Image } from "astro:assets";import myImage from "../assets/my_image.png";---
    <Image src={myImage} alt="..." /><Image src="https://example.com/logo.png" width={300} height={300} alt="..." />

In most cases, this error happens when the value passed to `src` is undefined.

**See Also:**

*   [Images](/en/guides/images/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/expected-not-esmimage
Expected image options, not an ESM-imported image.
==================================================

> **ExpectedNotESMImage**: An ESM-imported image cannot be passed directly to `getImage()`. Instead, pass an object with the image in the `src` property.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An ESM-imported image cannot be passed directly to `getImage()`. Instead, pass an object with the image in the `src` property.

    import { getImage } from "astro:assets";import myImage from "../assets/my_image.png"; const optimizedImage = await getImage( myImage ); const optimizedImage = await getImage({ src: myImage });

**See Also:**

*   [Images](/en/guides/images/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/experimental-fonts-not-enabled
Experimental fonts are not enabled
==================================

> **ExperimentalFontsNotEnabled**: The Font component is used but experimental fonts have not been registered in the config.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Font component is used but experimental fonts have not been registered in the config.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/failed-to-fetch-remote-image-dimensions
Failed to retrieve remote image dimensions
==========================================

> Failed to get the dimensions for `IMAGE_URL`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Determining the remote image’s dimensions failed. This is typically caused by an incorrect URL or attempting to infer the size of an image in the public folder which is not possible.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/failed-to-find-page-map-ssr
Astro couldn't find the correct page to render
==============================================

> **FailedToFindPageMapSSR**: Astro couldn’t find the correct page to render, probably because it wasn’t correctly mapped for SSR usage. This is an internal error. Please file an issue.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro couldn’t find the correct page to render, probably because it wasn’t correctly mapped for SSR usage. This is an internal error.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/failed-to-load-module-ssr
Could not import file.
======================

> **FailedToLoadModuleSSR**: Could not import `IMPORT_NAME`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not import the requested file. Oftentimes, this is caused by the import path being wrong (either because the file does not exist, or there is a typo in the path)

This message can also appear when a type is imported without specifying that it is a [type import](/en/guides/typescript/#type-imports).

**See Also:**

*   [Type Imports](/en/guides/typescript/#type-imports)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/file-glob-not-supported
Glob patterns are not supported in the file loader
==================================================

> **FileGlobNotSupported**: Glob patterns are not supported in the `file` loader. Use the `glob` loader instead.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `file` loader must be passed a single local file. Glob patterns are not supported. Use the built-in `glob` loader to create entries from patterns of multiple local files.

**See Also:**

*   [Astro’s built-in loaders](/en/guides/content-collections/#built-in-loaders)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/file-parser-not-found
File parser not found
=====================

> **FileParserNotFound**: No parser was found for ‘FILE\_NAME’. Pass a parser function (e.g. `parser: csv`) to the `file` loader.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `file` loader can’t determine which parser to use. Please provide a custom parser (e.g. `toml.parse` or `csv-parse`) to create a collection from your file type.

**See Also:**

*   [Passing a `parser` to the `file` loader](/en/guides/content-collections/#parser-function)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/font-family-not-found
Font family not found
=====================

> No data was found for the family passed to the Font component.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Font family not found

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/forbidden-rewrite
Forbidden rewrite to a static route.
====================================

> **ForbiddenRewrite**: You tried to rewrite the on-demand route ‘FROM’ with the static route ‘TO’, when using the ‘server’ output.  
>   
> The static route ‘TO’ is rendered by the component ‘COMPONENT’, which is marked as prerendered. This is a forbidden operation because during the build the component ‘COMPONENT’ is compiled to an HTML file, which can’t be retrieved at runtime by Astro.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`Astro.rewrite()` can’t be used to rewrite an on-demand route with a static route when using the `"server"` output.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/generate-content-types-error
Failed to generate content types.
=================================

> **GenerateContentTypesError**: `astro sync` command failed to generate content collection types: ERROR\_MESSAGE

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`astro sync` command failed to generate content collection types.

**See Also:**

*   [Content collections documentation](/en/guides/content-collections/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/get-entry-deprecation-error
Invalid use of getDataEntryById or getEntryBySlug function.
===========================================================

> **GetEntryDeprecationError**: The `METHOD` function is deprecated and cannot be used to query the “COLLECTION” collection. Use `getEntry` instead.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `getDataEntryById` and `getEntryBySlug` functions are deprecated and cannot be used with content layer collections. Use the `getEntry` function instead.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/get-static-paths-expected-params
Missing params property on getStaticPaths route.
================================================

> **GetStaticPathsExpectedParams**: Missing or empty required `params` property on `getStaticPaths` route.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Every route specified by `getStaticPaths` require a `params` property specifying the path parameters needed to match the route.

For instance, the following code:

pages/blog/\[id\].astro

    ---export async function getStaticPaths() {  return [    { params: { id: '1' } }  ];}---

Will create the following route: `site.com/blog/1`.

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [`params`](/en/reference/api-reference/#params)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/get-static-paths-invalid-route-param
Invalid value for getStaticPaths route parameter.
=================================================

> **GetStaticPathsInvalidRouteParam**: Invalid getStaticPaths route parameter for `KEY`. Expected undefined, a string or a number, received `VALUE_TYPE` (`VALUE`)

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Since `params` are encoded into the URL, only certain types are supported as values.

/route/\[id\].astro

    ---export async function getStaticPaths() {  return [    { params: { id: '1' } } // Works    { params: { id: 2 } } // Works    { params: { id: false } } // Does not work  ];}---

In routes using [rest parameters](/en/guides/routing/#rest-parameters), `undefined` can be used to represent a path with no parameters passed in the URL:

/route/\[...id\].astro

    ---export async function getStaticPaths() {  return [    { params: { id: 1 } } // /route/1    { params: { id: 2 } } // /route/2    { params: { id: undefined } } // /route/  ];}---

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [`params`](/en/reference/api-reference/#params)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/get-static-paths-removed-rsshelper
getStaticPaths RSS helper is not available anymore.
===================================================

Deprecated

Deprecated since Astro 4.0. The RSS helper no longer exists with an error fallback.

> **GetStaticPathsRemovedRSSHelper**: The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`getStaticPaths` no longer expose an helper for generating a RSS feed. We recommend migrating to the [@astrojs/rss](/en/recipes/rss/#setting-up-astrojsrss)integration instead.

**See Also:**

*   [RSS Guide](/en/recipes/rss/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/get-static-paths-required
getStaticPaths() function required for dynamic routes.
======================================================

> **GetStaticPathsRequired**: `getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

In [Static Mode](/en/guides/routing/#static-ssg-mode), all routes must be determined at build time. As such, dynamic routes must `export` a `getStaticPaths` function returning the different paths to generate.

**See Also:**

*   [Dynamic Routes](/en/guides/routing/#dynamic-routes)
*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [Server-side Rendering](/en/guides/on-demand-rendering/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/i18n-no-locale-found-in-path
The path doesn't contain any locale
===================================

> **i18nNoLocaleFoundInPath**: You tried to use an i18n utility on a path that doesn’t contain any locale. You can use `pathHasLocale` first to determine if the path has a locale.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An i18n utility tried to use the locale from a URL path that does not contain one. You can prevent this error by using pathHasLocale to check URLs for a locale first before using i18n utilities.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/i18n-not-enabled
i18n Not Enabled
================

> **i18nNotEnabled**: The `astro:i18n` module can not be used without enabling i18n in your Astro config.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `astro:i18n` module can not be used without enabling i18n in your Astro config. To enable i18n, add a default locale and a list of supported locales to your Astro config:

    import { defineConfig } from 'astro'export default defineConfig({ i18n: {   locales: ['en', 'fr'],   defaultLocale: 'en',  },})

For more information on internationalization support in Astro, see our [Internationalization guide](/en/guides/internationalization/).

**See Also:**

*   [Internationalization](/en/guides/internationalization/)
*   [`i18n` Configuration Reference](/en/reference/configuration-reference/#i18n)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/image-missing-alt
Image missing required "alt" property.
======================================

> **ImageMissingAlt**: Image missing “alt” property. “alt” text is required to describe important images on the page.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `alt` property allows you to provide descriptive alt text to users of screen readers and other assistive technologies. In order to ensure your images are accessible, the `Image` component requires that an `alt` be specified.

If the image is merely decorative (i.e. doesn’t contribute to the understanding of the page), set `alt=""` so that screen readers know to ignore the image.

**See Also:**

*   [Images](/en/guides/images/)
*   [Image component](/en/reference/modules/astro-assets/#image-)
*    [Image component#alt](/en/reference/modules/astro-assets/#alt-required)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/image-not-found
Image not found.
================

> **ImageNotFound**: Could not find requested image `IMAGE_PATH`. Does it exist?

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not find an image you imported. Often, this is simply caused by a typo in the path.

Images in Markdown are relative to the current file. To refer to an image that is located in the same folder as the `.md` file, the path should start with `./`

**See Also:**

*   [Images](/en/guides/images/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/incompatible-descriptor-options
Cannot set both densities and widths
====================================

> **IncompatibleDescriptorOptions**: Only one of `densities` or `widths` can be specified. In most cases, you’ll probably want to use only `widths` if you require specific widths.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Only one of `densities` or `widths` can be specified. Those attributes are used to construct a `srcset` attribute, which cannot have both `x` and `w` descriptors.

**See Also:**

*   [Images](/en/guides/images/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/incorrect-strategy-for-i18n
You can't use the current function with the current strategy
============================================================

> **IncorrectStrategyForI18n**: The function `FUNCTION_NAME` can only be used when the `i18n.routing.strategy` is set to `"manual"`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Some internationalization functions are only available when Astro’s own i18n routing is disabled by the configuration setting `i18n.routing: "manual"`.

**See Also:**

*   [`i18n` routing](/en/guides/internationalization/#routing)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-component-args
Invalid component arguments.
============================

> **Example error messages:**  
> InvalidComponentArgs: Invalid arguments passed to `<MyAstroComponent>` component.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro components cannot be rendered manually via a function call, such as `Component()` or `{items.map(Component)}`. Prefer the component syntax `<Component />` or `{items.map(item => <Component {...item} />)}`.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-content-entry-data-error
Content entry data does not match schema.
=========================================

> **Example error message:**  
> **blog** → **post** frontmatter does not match collection schema.  
> “title” is required.  
> “date” must be a valid date.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A content entry does not match its collection schema. Make sure that all required fields are present, and that all fields are of the correct type. You can check against the collection schema in your `src/content.config.*` file. See the [Content collections documentation](/en/guides/content-collections/) for more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-content-entry-frontmatter-error
Content entry frontmatter does not match schema.
================================================

> **Example error message:**  
> **blog** → **post.md** frontmatter does not match collection schema.  
> “title” is required.  
> “date” must be a valid date.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A Markdown or MDX entry does not match its collection schema. Make sure that all required fields are present, and that all fields are of the correct type. You can check against the collection schema in your `src/content.config.*` file. See the [Content collections documentation](/en/guides/content-collections/) for more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-content-entry-slug-error
Invalid content entry slug.
===========================

> `COLLECTION_NAME` → `ENTRY_ID` has an invalid slug. `slug` must be a string.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A collection entry has an invalid `slug`. This field is reserved for generating entry slugs, and must be a string when present.

**See Also:**

*   [The reserved entry `slug` field](/en/guides/content-collections/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-dynamic-route
Invalid dynamic route.
======================

> **InvalidDynamicRoute**: The INVALID\_PARAM param for route ROUTE is invalid. Received **RECEIVED**.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A dynamic route param is invalid. This is often caused by an `undefined` parameter or a missing [rest parameter](/en/guides/routing/#rest-parameters).

**See Also:**

*   [Dynamic routes](/en/guides/routing/#dynamic-routes)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-frontmatter-injection-error
Invalid frontmatter injection.
==============================

> **InvalidFrontmatterInjectionError**: A remark or rehype plugin attempted to inject invalid frontmatter. Ensure “astro.frontmatter” is set to a valid JSON object that is not `null` or `undefined`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A remark or rehype plugin attempted to inject invalid frontmatter. This occurs when “astro.frontmatter” is set to `null`, `undefined`, or an invalid JSON object.

**See Also:**

*   [Modifying frontmatter programmatically](/en/guides/markdown-content/#modifying-frontmatter-programmatically)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-get-static-path-param
Invalid value returned by a getStaticPaths path.
================================================

> **InvalidGetStaticPathParam**: Invalid params given to `getStaticPaths` path. Expected an `object`, got `PARAM_TYPE`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `params` property in `getStaticPaths`’s return value (an array of objects) should also be an object.

pages/blog/\[id\].astro

    ---export async function getStaticPaths() {  return [    { params: { slug: "blog" } },    { params: { slug: "about" } }  ];}---

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [`params`](/en/reference/api-reference/#params)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-get-static-paths-entry
Invalid entry inside getStaticPath's return value
=================================================

> **InvalidGetStaticPathsEntry**: Invalid entry returned by getStaticPaths. Expected an object, got `ENTRY_TYPE`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`getStaticPaths`’s return value must be an array of objects. In most cases, this error happens because an array of array was returned. Using [`.flatMap()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) or a [`.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) call may be useful.

pages/blog/\[id\].astro

    export async function getStaticPaths() {  return [ // <-- Array    { params: { slug: "blog" } }, // <-- Object    { params: { slug: "about" } }  ];}

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-get-static-paths-return
Invalid value returned by getStaticPaths.
=========================================

> **InvalidGetStaticPathsReturn**: Invalid type returned by `getStaticPaths`. Expected an `array`, got `RETURN_TYPE`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`getStaticPaths`’s return value must be an array of objects.

pages/blog/\[id\].astro

    export async function getStaticPaths() {  return [ // <-- Array    { params: { slug: "blog" } },    { params: { slug: "about" } }  ];}

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [`params`](/en/reference/api-reference/#params)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-glob
Invalid glob pattern.
=====================

> **InvalidGlob**: Invalid glob pattern: `GLOB_PATTERN`. Glob patterns must start with ’./’, ‘../’ or ’/‘.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an invalid glob pattern. This is often caused by the glob pattern not being a valid file path.

**See Also:**

*   [Glob Patterns](/en/guides/imports/#glob-patterns)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-image-service
Error while loading image service.
==================================

> **InvalidImageService**: There was an error loading the configured image service. Please see the stack trace for more information.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

There was an error while loading the configured image service. This can be caused by various factors, such as your image service not properly exporting a compatible object in its default export, or an incorrect path.

If you believe that your service is properly configured and this error is wrong, please [open an issue](https://astro.build/issues/).

**See Also:**

*   [Image Service API](/en/reference/image-service-reference/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-prerender-export
Invalid prerender export.
=========================

> **Example error messages:**  
> InvalidPrerenderExport: A `prerender` export has been detected, but its value cannot be statically analyzed.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `prerender` feature only supports a subset of valid JavaScript — be sure to use exactly `export const prerender = true` so that our compiler can detect this directive at build time. Variables, `let`, and `var` declarations are not supported.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-rewrite404
You attempted to rewrite a 404 inside a static page, and this isn't allowed.
============================================================================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **InvalidRewrite404**: Rewriting a 404 is only allowed inside on-demand pages.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The user tried to rewrite a 404 page inside a static page.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/local-image-used-wrongly
Local images must be imported.
==============================

> **LocalImageUsedWrongly**: `Image`’s and `getImage`’s `src` parameter must be an imported image or an URL, it cannot be a string filepath. Received `IMAGE_FILE_PATH`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

When using the default image services, `Image`’s and `getImage`’s `src` parameter must be either an imported image or an URL, it cannot be a string of a filepath.

For local images from content collections, you can use the [image() schema helper](/en/guides/images/#images-in-content-collections) to resolve the images.

    ---import { Image } from "astro:assets";import myImage from "../my_image.png";---
    <!-- GOOD: `src` is the full imported image. --><Image src={myImage} alt="Cool image" />
    <!-- GOOD: `src` is a URL. --><Image src="https://example.com/my_image.png" alt="Cool image" />
    <!-- BAD: `src` is an image's `src` path instead of the full image object. --><Image src={myImage.src} alt="Cool image" />
    <!-- BAD: `src` is a string filepath. --><Image src="../my_image.png" alt="Cool image" />

**See Also:**

*   [Images](/en/guides/images/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/locals-not-an-object
Value assigned to locals is not accepted.
=========================================

> **LocalsNotAnObject**: `locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when `locals` is overwritten with something that is not an object

For example:

    import {defineMiddleware} from "astro:middleware";export const onRequest = defineMiddleware((context, next) => {  context.locals = 1541;  return next();});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/locals-not-serializable
Astro.locals is not serializable
================================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **LocalsNotSerializable**: The information stored in `Astro.locals` for the path “`HREF`” is not serializable. Make sure you store only serializable data. (E03034)

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown in development mode when a user attempts to store something that is not serializable in `locals`.

For example:

    import {defineMiddleware} from "astro/middleware";export const onRequest = defineMiddleware((context, next) => {  context.locals = {    foo() {      alert("Hello world!")    }  };  return next();});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/locals-reassigned
locals must not be reassigned.
==============================

> **LocalsReassigned**: `locals` can not be assigned directly.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when a value is being set as the `locals` field on the Astro global or context.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/markdown-content-schema-validation-error
Content collection frontmatter invalid.
=======================================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **Example error message:**  
> Could not parse frontmatter in **blog** → **post.md**  
> “title” is required.  
> “date” must be a valid date.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A Markdown document’s frontmatter in `src/content/` does not match its collection schema. Make sure that all required fields are present, and that all fields are of the correct type. You can check against the collection schema in your `src/content/config.*` file. See the [Content collections documentation](/en/guides/content-collections/) for more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/markdown-frontmatter-parse-error
Failed to parse Markdown frontmatter.
=====================================

> **Example error messages:**  
> can not read an implicit mapping pair; a colon is missed  
> unexpected end of the stream within a double quoted scalar  
> can not read a block mapping entry; a multiline key may not be an implicit key

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an error while parsing the frontmatter of your Markdown file. This is often caused by a mistake in the syntax, such as a missing colon or a missing end quote.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/markdown-image-not-found
Image not found.
================

Deprecated

This error is no longer Markdown specific and as such, as been replaced by `ImageNotFound`

> Could not find requested image `IMAGE_PATH` at `FULL_IMAGE_PATH`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not find an image you included in your Markdown content. Usually, this is simply caused by a typo in the path.

Images in Markdown are relative to the current file. To refer to an image that is located in the same folder as the `.md` file, the path should start with `./`

**See Also:**

*   [Images](/en/guides/images/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/mdx-integration-missing-error
MDX integration missing.
========================

> **MdxIntegrationMissingError**: Unable to render FILE. Ensure that the `@astrojs/mdx` integration is installed.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Unable to find the official `@astrojs/mdx` integration. This error is raised when using MDX files without an MDX integration installed.

**See Also:**

*   [MDX installation and usage](/en/guides/integrations-guide/mdx/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/middleware-cant-be-loaded
Can't load the middleware.
==========================

> **MiddlewareCantBeLoaded**: An unknown error was thrown while loading your middleware.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown in development mode when middleware throws an error while attempting to loading it.

For example:

    import {defineMiddleware} from "astro:middleware";throw new Error("Error thrown while loading the middleware.")export const onRequest = defineMiddleware(() => {  return "string"});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/middleware-no-data-or-next-called
The middleware didn't return a Response.
========================================

> **MiddlewareNoDataOrNextCalled**: Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when the middleware does not return any data or call the `next` function.

For example:

    import {defineMiddleware} from "astro:middleware";export const onRequest = defineMiddleware((context, _) => {  // doesn't return anything or call `next`  context.locals.someData = false;});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/middleware-not-aresponse
The middleware returned something that is not a Response object.
================================================================

> **MiddlewareNotAResponse**: Any data returned from middleware must be a valid `Response` object.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown in development mode when middleware returns something that is not a `Response` object.

For example:

    import {defineMiddleware} from "astro:middleware";export const onRequest = defineMiddleware(() => {  return "string"});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/missing-image-dimension
Missing image dimensions
========================

> Missing width and height attributes for `IMAGE_URL`. When using remote images, both dimensions are required in order to avoid cumulative layout shift (CLS).

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

For remote images, `width` and `height` cannot automatically be inferred from the original file. To avoid cumulative layout shift (CLS), either specify these two properties, or set [`inferSize`](/en/reference/modules/astro-assets/#infersize) to `true` to fetch a remote image’s original dimensions.

If your image is inside your `src` folder, you probably meant to import it instead. See [the Imports guide for more information](/en/guides/imports/#other-assets).

**See Also:**

*   [Images](/en/guides/images/)
*   [Image component#width-and-height-required](/en/reference/modules/astro-assets/#width-and-height-required-for-images-in-public)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/missing-index-for-internationalization
Index page not found.
=====================

> **MissingIndexForInternationalization**: Could not find index page. A root index page is required in order to create a redirect to the index URL of the default locale. (`/DEFAULT_LOCALE`)

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not find the index URL of your website. An index page is required so that Astro can create a redirect from the main index page to the localized index page of the default locale when using [`i18n.routing.prefixDefaultLocale`](/en/reference/configuration-reference/#i18nroutingprefixdefaultlocale).

**See Also:**

*   [Internationalization](/en/guides/internationalization/#routing)
*   [`i18n.routing` Configuration Reference](/en/reference/configuration-reference/#i18nrouting)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/missing-locale
The provided locale does not exist.
===================================

> **MissingLocale**: The locale/path `LOCALE` does not exist in the configured `i18n.locales`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro can’t find the requested locale. All supported locales must be configured in [i18n.locales](/en/reference/configuration-reference/#i18nlocales) and have corresponding directories within `src/pages/`.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/missing-media-query-directive
Missing value for client:media directive.
=========================================

> **MissingMediaQueryDirective**: Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) parameter is required when using the `client:media` directive.

    <Counter client:media="(max-width: 640px)" />

**See Also:**

*   [`client:media`](/en/reference/directives-reference/#clientmedia)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/missing-middleware-for-internationalization
Enabled manual internationalization routing without having a middleware.
========================================================================

> **MissingMiddlewareForInternationalization**: Your configuration setting `i18n.routing: 'manual'` requires you to provide your own i18n `middleware` file.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro throws an error if the user enables manual routing, but it doesn’t have a middleware file.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/missing-sharp
Could not find Sharp.
=====================

> **MissingSharp**: Could not find Sharp. Please install Sharp (`sharp`) manually into your project or migrate to another image service.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Sharp is the default image service used for `astro:assets`. When using a [strict package manager](https://pnpm.io/pnpm-vs-npm#npms-flat-tree) like pnpm, Sharp must be installed manually into your project in order to use image processing.

If you are not using `astro:assets` for image processing, and do not wish to install Sharp, you can configure the following passthrough image service that does no processing:

    import { defineConfig, passthroughImageService } from "astro/config";export default defineConfig({ image: {   service: passthroughImageService(), },});

**See Also:**

*   [Default Image Service](/en/guides/images/#default-image-service)
*   [Image Services API](/en/reference/image-service-reference/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/mixed-content-data-collection-error
Content and data cannot be in same collection.
==============================================

> **MixedContentDataCollectionError**: **COLLECTION\_NAME** contains a mix of content and data entries. All entries must be of the same type.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A legacy content collection cannot contain a mix of content and data entries. You must store entries in separate collections by type.

**See Also:**

*   [Legacy content collections](/en/guides/upgrade-to/v5/#updating-existing-collections)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-adapter-installed-server-islands
Cannot use Server Islands without an adapter.
=============================================

> **NoAdapterInstalledServerIslands**: Cannot use server islands without an adapter. Please install and configure the appropriate server adapter for your final deployment.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

To use server islands, the same constraints exist as for sever-side rendering, so an adapter is needed.

**See Also:**

*   [On-demand Rendering](/en/guides/on-demand-rendering/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-adapter-installed
Cannot use Server-side Rendering without an adapter.
====================================================

> **NoAdapterInstalled**: Cannot use server-rendered pages without an adapter. Please install and configure the appropriate server adapter for your final deployment.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

To use server-side rendering, an adapter needs to be installed so Astro knows how to generate the proper output for your targeted deployment platform.

**See Also:**

*   [Server-side Rendering](/en/guides/on-demand-rendering/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-client-entrypoint
No client entrypoint specified in renderer.
===========================================

> **NoClientEntrypoint**: `COMPONENT_NAME` component has a `client:CLIENT_DIRECTIVE` directive, but no client entrypoint was provided by `RENDERER_NAME`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro tried to hydrate a component on the client, but the renderer used does not provide a client entrypoint to use to hydrate.

**See Also:**

*   [addRenderer option](/en/reference/integrations-reference/#addrenderer-option)
*   [Hydrating framework components](/en/guides/framework-components/#hydrating-interactive-components)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-client-only-hint
Missing hint on client:only directive.
======================================

> **NoClientOnlyHint**: Unable to render `COMPONENT_NAME`. When using the `client:only` hydration strategy, Astro needs a hint to use the correct renderer.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`client:only` components are not run on the server, as such Astro does not know (and cannot guess) which renderer to use and require a hint. Like such:

      <SomeReactComponent client:only="react" />

**See Also:**

*   [`client:only`](/en/reference/directives-reference/#clientonly)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-image-metadata
Could not process image metadata.
=================================

> Could not process image metadata for `IMAGE_PATH`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not process the metadata of an image you imported. This is often caused by a corrupted or malformed image and re-exporting the image from your image editor may fix this issue.

**See Also:**

*   [Images](/en/guides/images/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-matching-import
No import found for component.
==============================

> **NoMatchingImport**: Could not render `COMPONENT_NAME`. No matching import has been found for `COMPONENT_NAME`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

No import statement was found for one of the components. If there is an import statement, make sure you are using the same identifier in both the imports and the component usage.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-matching-renderer
No matching renderer found.
===========================

> Unable to render `COMPONENT_NAME`. There are `RENDERER_COUNT` renderer(s) configured in your `astro.config.mjs` file, but none were able to server-side render `COMPONENT_NAME`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

None of the installed integrations were able to render the component you imported. Make sure to install the appropriate integration for the type of component you are trying to include in your page.

For JSX / TSX files, [@astrojs/react](/en/guides/integrations-guide/react/), [@astrojs/preact](/en/guides/integrations-guide/preact/) or [@astrojs/solid-js](/en/guides/integrations-guide/solid-js/) can be used. For Vue and Svelte files, the [@astrojs/vue](/en/guides/integrations-guide/vue/) and [@astrojs/svelte](/en/guides/integrations-guide/svelte/) integrations can be used respectively

**See Also:**

*   [Frameworks components](/en/guides/framework-components/)
*   [UI Frameworks](/en/guides/integrations-guide/#official-integrations)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-matching-static-path-found
No static path found for requested path.
========================================

> **NoMatchingStaticPathFound**: A `getStaticPaths()` route pattern was matched, but no matching static path was found for requested path `PATH_NAME`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A [dynamic route](/en/guides/routing/#dynamic-routes) was matched, but no corresponding path was found for the requested parameters. This is often caused by a typo in either the generated or the requested path.

**See Also:**

*   [getStaticPaths()](/en/reference/routing-reference/#getstaticpaths)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-prerendered-routes-with-domains
Prerendered routes aren't supported when internationalization domains are enabled.
==================================================================================

> **NoPrerenderedRoutesWithDomains**: Static pages aren’t yet supported with multiple domains. To enable this feature, you must disable prerendering for the page COMPONENT

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Static pages aren’t yet supported with i18n domains. If you wish to enable this feature, you have to disable prerendering.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/only-response-can-be-returned
Invalid type returned by Astro page.
====================================

> Route returned a `RETURNED_VALUE`. Only a Response can be returned from Astro files.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Only instances of [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned inside Astro files.

pages/login.astro

    ---return new Response(null, { status: 404, statusText: 'Not found'});
    // Alternatively, for redirects, Astro.redirect also returns an instance of Responsereturn Astro.redirect('/login');---

**See Also:**

*   [Response](/en/guides/on-demand-rendering/#response)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/page-number-param-not-found
Page number param not found.
============================

> **PageNumberParamNotFound**: \[paginate()\] page number param `PARAM_NAME` not found in your filepath.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The page number parameter was not found in your filepath.

**See Also:**

*   [Pagination](/en/guides/routing/#pagination)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/prerender-client-address-not-available
Astro.clientAddress cannot be used inside prerendered routes.
=============================================================

> **PrerenderClientAddressNotAvailable**: `Astro.clientAddress` cannot be used inside prerendered route NAME

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `Astro.clientAddress` property cannot be used inside prerendered routes.

**See Also:**

*   [On-demand rendering](/en/guides/on-demand-rendering/)
*   [Astro.clientAddress](/en/reference/api-reference/#clientaddress)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/prerender-dynamic-endpoint-path-collide
Prerendered dynamic endpoint has path collision.
================================================

> **PrerenderDynamicEndpointPathCollide**: Could not render `PATHNAME` with an `undefined` param as the generated path will collide during prerendering. Prevent passing `undefined` as `params` for the endpoint’s `getStaticPaths()` function, or add an additional extension to the endpoint’s filename.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The endpoint is prerendered with an `undefined` param so the generated path will collide with another route.

If you cannot prevent passing `undefined`, then an additional extension can be added to the endpoint file name to generate the file with a different name. For example, renaming `pages/api/[slug].ts` to `pages/api/[slug].json.ts`.

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [`params`](/en/reference/api-reference/#params)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/redirect-with-no-location
A redirect must be given a location with the Location header.
=============================================================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A redirect must be given a location with the `Location` header.

**See Also:**

*   [Astro.redirect](/en/reference/api-reference/#redirect)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/render-undefined-entry-error
Attempted to render an undefined content collection entry.
==========================================================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro tried to render a content collection entry that was undefined. This can happen if you try to render an entry that does not exist.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/reserved-slot-name
Invalid slot name.
==================

> **ReservedSlotName**: Unable to create a slot named `SLOT_NAME`. `SLOT_NAME` is a reserved slot name. Please update the name of this slot.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Certain words cannot be used for slot names due to being already used internally.

**See Also:**

*   [Named slots](/en/basics/astro-components/#named-slots)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/response-sent-error
Unable to set response.
=======================

> **ResponseSentError**: The response has already been sent to the browser and cannot be altered.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Making changes to the response, such as setting headers, cookies, and the status code cannot be done outside of page components.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/rewrite-encountered-an-error
Astro couldn't find the route to rewrite, or if was found but it emitted an error during the rendering phase.
=============================================================================================================

Deprecated

This error cannot be emitted by Astro anymore

> **RewriteEncounteredAnError**: The route ROUTE that you tried to render doesn’t exist, or it emitted an error during the rendering phase. STACK ? STACK : ”.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The user tried to rewrite using a route that doesn’t exist, or it emitted a runtime error during its rendering phase.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/rewrite-with-body-used
Cannot use Astro.rewrite after the request body has been read
=============================================================

> **RewriteWithBodyUsed**: Astro.rewrite() cannot be used if the request body has already been read. If you need to read the body, first clone the request.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`Astro.rewrite()` cannot be used if the request body has already been read. If you need to read the body, first clone the request. For example:

    const data = await Astro.request.clone().formData();
    Astro.rewrite("/target")

**See Also:**

*   [Request.clone()](https://developer.mozilla.org/en-US/docs/Web/API/Request/clone)
*   [Astro.rewrite](/en/reference/api-reference/#rewrite)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/route-not-found
Route not found.
================

> **RouteNotFound**: Astro could not find a route that matches the one you requested.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro couldn’t find a route matching the one provided by the user

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/server-only-module
Module is only available server-side
====================================

> **ServerOnlyModule**: The “NAME” module is only available server-side.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

This module is only available server-side.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/session-config-missing-error
Session storage was enabled but not configured.
===============================================

Deprecated

This error was removed in Astro 5.7, when the Sessions feature stopped being experimental.

> The `experimental.session` flag was set to `true`, but no storage was configured. Either configure the storage manually or use an adapter that provides session storage.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when session storage is enabled but not configured.

**See Also:**

*   [Sessions](/en/guides/sessions/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/session-config-without-flag-error
Session flag not set
====================

Deprecated

This error was removed in Astro 5.7, when the Sessions feature stopped being experimental.

> Session config was provided without enabling the `experimental.session` flag

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when session storage is configured but the `experimental.session` flag is not enabled.

**See Also:**

*   [Sessions](/en/guides/sessions/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/session-storage-init-error
Session storage could not be initialized.
=========================================

> Error when initializing session storage with driver `DRIVER`. `ERROR`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when the session storage could not be initialized.

**See Also:**

*   [Sessions](/en/guides/sessions/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/session-storage-save-error
Session data could not be saved.
================================

> Error when saving session data with driver `DRIVER`. `ERROR`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when the session data could not be saved.

**See Also:**

*   [Sessions](/en/guides/sessions/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/session-without-supported-adapter-output-error
Sessions cannot be used with an adapter that doesn't support server output.
===========================================================================

Deprecated

This error was removed in Astro 5.7, when the Sessions feature stopped being experimental.

> **SessionWithoutSupportedAdapterOutputError**: Sessions require an adapter that supports server output. The adapter must set `"server"` in the `buildOutput` adapter feature.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Your adapter must support server output to use sessions.

**See Also:**

*   [Sessions](/en/guides/sessions/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/static-client-address-not-available
Astro.clientAddress is not available in prerendered pages.
==========================================================

> **StaticClientAddressNotAvailable**: `Astro.clientAddress` is only available on pages that are server-rendered.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `Astro.clientAddress` property is only available when [Server-side rendering](/en/guides/on-demand-rendering/) is enabled.

To get the user’s IP address in static mode, different APIs such as [Ipify](https://www.ipify.org/) can be used in a [Client-side script](/en/guides/client-side-scripts/) or it may be possible to get the user’s IP using a serverless function hosted on your hosting provider.

**See Also:**

*   [Enabling SSR in Your Project](/en/guides/on-demand-rendering/)
*   [Astro.clientAddress](/en/reference/api-reference/#clientaddress)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/static-redirect-not-available
Astro.redirect is not available in static mode.
===============================================

Deprecated

Deprecated since version 2.6.

> **StaticRedirectNotAvailable**: Redirects are only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `Astro.redirect` function is only available when [Server-side rendering](/en/guides/on-demand-rendering/) is enabled.

To redirect on a static website, the [meta refresh attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) can be used. Certain hosts also provide config-based redirects (ex: [Netlify redirects](https://docs.netlify.com/routing/redirects/)).

**See Also:**

*   [Enabling SSR in Your Project](/en/guides/on-demand-rendering/)
*   [Astro.redirect](/en/reference/api-reference/#redirect)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unhandled-rejection
Unhandled rejection
===================

> **UnhandledRejection**: Astro detected an unhandled rejection. Here’s the stack trace:  
> STACK

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not find any code to handle a rejected `Promise`. Make sure all your promises have an `await` or `.catch()` handler.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-clierror
Unknown CLI Error.
==================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an unknown error while starting one of its CLI commands. The error message should contain more information.

If you can reliably cause this error to happen, we’d appreciate if you could [open an issue](https://astro.build/issues/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-compiler-error
Unknown compiler error.
=======================

> Unknown compiler error.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an unknown error while compiling your files. In most cases, this is not your fault, but an issue in our compiler.

If there isn’t one already, please [create an issue](https://astro.build/issues/compiler).

**See Also:**

*   [withastro/compiler issues list](https://astro.build/issues/compiler)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-config-error
Unknown configuration error.
============================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an unknown error loading your Astro configuration file. This is often caused by a syntax error in your config and the message should offer more information.

If you can reliably cause this error to happen, we’d appreciate if you could [open an issue](https://astro.build/issues/)

**See Also:**

*   [Configuration Reference](/en/reference/configuration-reference/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-content-collection-error
Unknown Content Collection Error.
=================================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an unknown error loading your content collections. This can be caused by certain errors inside your `src/content.config.ts` file or some internal errors.

If you can reliably cause this error to happen, we’d appreciate if you could [open an issue](https://astro.build/issues/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-csserror
Unknown CSS Error.
==================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an unknown error while parsing your CSS. Oftentimes, this is caused by a syntax error and the error message should contain more information.

**See Also:**

*   [Styles and CSS](/en/guides/styling/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-filesystem-error
An unknown error occurred while reading or writing files to disk.
=================================================================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An unknown error occurred while reading or writing files to disk. It can be caused by many things, eg. missing permissions or a file not existing we attempt to read.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-markdown-error
Unknown Markdown Error.
=======================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an unknown error while parsing your Markdown. Oftentimes, this is caused by a syntax error and the error message should contain more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-vite-error
Unknown Vite Error.
===================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Vite encountered an unknown error while rendering your project. We unfortunately do not know what happened (or we would tell you!)

If you can reliably cause this error to happen, we’d appreciate if you could [open an issue](https://astro.build/issues/)

**See Also:**

*   [Vite troubleshooting guide](https://vite.dev/guide/troubleshooting.html)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unsupported-config-transform-error
Unsupported transform in content config.
========================================

> **UnsupportedConfigTransformError**: `transform()` functions in your content config must return valid JSON, or data types compatible with the devalue library (including Dates, Maps, and Sets).  
> Full error: PARSE\_ERROR

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`transform()` functions in your content config must return valid JSON, or data types compatible with the devalue library (including Dates, Maps, and Sets).

**See Also:**

*   [devalue library](https://github.com/rich-harris/devalue)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unsupported-external-redirect
Unsupported or malformed URL.
=============================

> **UnsupportedExternalRedirect**: The destination URL in the external redirect from “FROM” to “TO” is unsupported.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An external redirect must start with http or https, and must be a valid URL.

**See Also:**

*   [Astro.redirect](/en/reference/api-reference/#redirect)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unsupported-image-conversion
Unsupported image conversion
============================

> **UnsupportedImageConversion**: Converting between vector (such as SVGs) and raster (such as PNGs and JPEGs) images is not currently supported.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro does not currently supporting converting between vector (such as SVGs) and raster (such as PNGs and JPEGs) images.

**See Also:**

*   [Images](/en/guides/images/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unsupported-image-format
Unsupported image format
========================

> **UnsupportedImageFormat**: Received unsupported format `FORMAT` from `IMAGE_PATH`. Currently only SUPPORTED\_FORMATS.JOIN(’, ’) are supported by our image services.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The built-in image services do not currently support optimizing all image formats.

For unsupported formats such as GIFs, you may be able to use an `img` tag directly:

    ---import rocket from '../assets/images/rocket.gif';---
    <img src={rocket.src} width={rocket.width} height={rocket.height} alt="A rocketship in space." />

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)





# Aggregated from ./pages/reference/experimental-flags
Configuring experimental flags
==============================

Experimental features are available only after enabling a flag in the Astro configuration file.

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({    experimental: {        // enable experimental flags        // to try out new features    },});

Astro offers experimental flags to give users early access to new features for testing and feedback.

These flags allow you to participate in feature development by reporting issues and sharing your opinions. These features are not guaranteed to be stable and may include breaking changes even in small `patch` releases while the feature is actively developed.

We recommend [updating Astro](/en/upgrade-astro/#upgrade-to-the-latest-version) frequently, and keeping up with release notes in the [Astro changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) which will inform you of any changes needed to your project code. The experimental feature documentation will always be updated for the current released version only.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Programmatic Astro API (experimental)](/en/reference/programmatic-reference/) [Next  
Responsive images](/en/reference/experimental-flags/responsive-images/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/reference/experimental-flags/client-prerender
Experimental client prerendering
================================

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@4.2.0`

Enables pre-rendering your prefetched pages on the client in supported browsers.

This feature uses the experimental [Speculation Rules Web API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) and enhances the default `prefetch` behavior globally to prerender links on the client. You may wish to review the [possible risks when prerendering on the client](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API#unsafe_prefetching) before enabling this feature.

Enable client side prerendering in your `astro.config.mjs` along with any desired `prefetch` configuration options:

astro.config.mjs

    {  prefetch: {    prefetchAll: true,    defaultStrategy: 'viewport',  },  experimental: {    clientPrerender: true,  },}

Continue to use the `data-astro-prefetch` attribute on any `<a />` link on your site to opt in to prefetching. Instead of appending a `<link>` tag to the head of the document or fetching the page with JavaScript, a `<script>` tag will be appended with the corresponding speculation rules.

Client side prerendering requires browser support. If the Speculation Rules API is not supported, `prefetch` will fallback to the supported strategy.

See the [Prefetch Guide](/en/guides/prefetch/) for more `prefetch` options and usage.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/client-prerender.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Fonts](/en/reference/experimental-flags/fonts/) [Next  
Intellisense for collections](/en/reference/experimental-flags/content-intellisense/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/experimental-flags/content-intellisense
Experimental Intellisense for content collections
=================================================

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@4.14.0`

Enables Intellisense features (e.g. code completion, quick hints) for your content collection entries in compatible editors.

When enabled, this feature will generate and add JSON schemas to the `.astro` directory in your project. These files can be used by the Astro language server to provide Intellisense inside content files (`.md`, `.mdx`, `.mdoc`).

    {  experimental: {    contentIntellisense: true,  },}

To use this feature with the Astro VS Code extension, you must also enable the `astro.content-intellisense` option in your VS Code settings. For editors using the Astro language server directly, pass the `contentIntellisense: true` initialization parameter to enable this feature.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/content-intellisense.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Client prerendering](/en/reference/experimental-flags/client-prerender/) [Next  
Preserve scripts order](/en/reference/experimental-flags/preserve-scripts-order/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/experimental-flags/fonts
Experimental fonts API
======================

**Type:** `FontFamily[]`  

**Added in:** `astro@5.7.0`

This experimental feature allows you to use fonts from your filesystem and various font providers (eg. Google, Fontsource, Bunny) through a unified, fully customizable, and type-safe API.

Web fonts can impact page performance at both load time and rendering time. This API helps you keep your site performant with automatic [web font optimizations](https://web.dev/learn/performance/optimize-web-fonts) including preload links, optimized fallbacks, and opinionated defaults. [See common usage examples](#usage-examples).

To enable this feature, configure an `experimental.fonts` object with at least one font:

astro.config.mjs

    import { defineConfig, fontProviders } from "astro/config";
    export default defineConfig({    experimental: {        fonts: [{            provider: fontProviders.google(),            name: "Roboto",            cssVariable: "--font-roboto"        }]    }});

Then, add the `<Font />` component and site-wide styling in your `<head>`:

src/components/Head.astro

    ---import { Font } from 'astro:assets';---
    <Font cssVariable='--font-roboto' preload />
    <style>body {    font-family: var(--font-roboto);}</style>

Usage
-----

[Section titled Usage](#usage)

1.  `experimental.fonts` accepts an array of font objects. For each font, you must specify a `provider`, the family `name`, and define a `cssVariable` to refer to your font.
    
    *   [`provider`](#provider): You can choose from the list of [built-in remote providers](#available-remote-font-providers), build your own [custom font provider](#build-your-own-font-provider), or use the [local provider](#local-font-variants) to register local font files.
    *   [`name`](#name): Choose a font family supported by your provider.
    *   [`cssVariable`](#cssvariable-1): Must be a valid [ident](https://developer.mozilla.org/en-US/docs/Web/CSS/ident) in the form of a CSS variable.
    
    The following example configures the [“Roboto” family from Google Fonts](https://fonts.google.com/specimen/Roboto):
    
    astro.config.mjs
    
        import { defineConfig, fontProviders } from "astro/config";
        export default defineConfig({  experimental: {    fonts: [{      provider: fontProviders.google(),      name: "Roboto",      cssVariable: "--font-roboto"    }]  }});
    
    More configuration options, such as defining [fallback font families](#fallbacks) and which [`weights`](#weights) and [`styles`](#styles) to download, are available and some will depend on your chosen provider.
    
    See the full [configuration reference](#font-configuration-reference) to learn more.
    
2.  Apply styles using the `<Font />` component. It must be imported and added to your page `<head>`. Providing the font’s [`cssVariable`](#cssvariable) is required, and you can optionally [output preload links](#preload):
    
    src/components/Head.astro
    
        ---import { Font } from 'astro:assets';---
        <Font cssVariable="--font-roboto" preload />
    
    This is commonly done in a component such as `Head.astro` that is used in a common site layout.
    
    See the full [`<Font>` component reference](#font--component-reference) for more information.
    
    Since the `<Font />` component generates CSS with font declarations, you can reference the font family using the `cssVariable`:
    
    *   [CSS](#tab-panel-3411)
    *   [Tailwind CSS 4.0](#tab-panel-3412)
    *   [Tailwind CSS 3.0](#tab-panel-3413)
    
        <style>body {    font-family: var(--font-roboto);}</style>
    
    src/styles/global.css
    
        @import 'tailwindcss';
        @theme inline {    --font-sans: var(--font-roboto);}
    
    tailwind.config.mjs
    
        /** @type {import("tailwindcss").Config} */export default {content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],theme: {    extend: {},    fontFamily: {        sans: ["var(--font-roboto)"]    }},plugins: []};
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Available remote font providers
-------------------------------

[Section titled Available remote font providers](#available-remote-font-providers)

Astro re-exports most [unifont](https://github.com/unjs/unifont/) providers. The following have built-in support:

*   [Adobe](https://fonts.adobe.com/)
*   [Bunny](https://fonts.bunny.net/)
*   [Fontshare](https://www.fontshare.com/)
*   [Fontsource](https://fontsource.org/)
*   [Google](https://fonts.google.com/)

To use a built-in remote provider, configure `provider` with the appropriate value for your chosen font provider:

*   [Adobe](#tab-panel-3414)
*   [Bunny](#tab-panel-3415)
*   [Fontshare](#tab-panel-3416)
*   [Fontsource](#tab-panel-3417)
*   [Google](#tab-panel-3418)

    provider: fontProviders.adobe({ id: process.env.ADOBE_ID })

    provider: fontProviders.bunny()

    provider: fontProviders.fontshare()

    provider: fontProviders.fontsource()

    provider: fontProviders.google()

Additionally, the `google()` font provider accepts all options available for the [unifont Google `ProviderOption`](https://github.com/unjs/unifont/blob/main/src/providers/google.ts#L10-L26):

    provider: fontProviders.google({  glyphs: {    Roboto: ["a"]  }})

You can also [make a custom Astro font provider](#build-your-own-font-provider) for any unifont provider.

Usage examples
--------------

[Section titled Usage examples](#usage-examples)

astro.config.mjs

    import { defineConfig, fontProviders } from "astro/config";
    export default defineConfig({  experimental: {    fonts: [      {        name: "Roboto",        cssVariable: "--font-roboto"        provider: fontProviders.google(),        // Default included:        // weights: [400] ,        // styles: ["normal", "italics"],        // subsets: ["cyrillic-ext", "cyrillic", "greek-ext", "greek", "vietnamese", "latin-ext", "latin"],        // fallbacks: ["sans-serif"],      },      {        name: "Inter",        cssVariable: "--font-inter",        provider: fontProviders.fontsource(),        // Specify weights that are actually used        weights: [400, 500, 600, 700],        // Specify styles that are actually used        styles: ["normal"],        // Download only font files for characters used on the page        subsets: ["cyrillic"],      },      {        name: "JetBrains Mono",        cssVariable: "--font-jetbrains-mono",        provider: fontProviders.fontsource(),        // Download only font files for characters used on the page        subsets: ["latin"],        // Use a fallback font family matching the intended appearance        fallbacks: ["monospace"],      },      {        name: "Poppins",        cssVariable: "--font-poppins",        provider: "local",        // Weight and style are not specified so Astro        // will try to infer them for each variant        variants: [          {            src: [              "./src/assets/fonts/Poppins-regular.woff2",              "./src/assets/fonts/Poppins-regular.woff",            ]          },          {            src: [              "./src/assets/fonts/Poppins-bold.woff2",              "./src/assets/fonts/Poppins-bold.woff",            ]          },        ]      }    ],  }});

`<Font />` component reference
------------------------------

[Section titled &lt;Font /&gt; component reference](#font--component-reference)

This component outputs style tags and can optionally output preload links for a given font family.

It must be imported and added to your page `<head>`. This is commonly done in a component such as `Head.astro` that is used in a common site layout for global use but may be added to individual pages as needed.

With this component, you have control over which font family is used on which page, and which fonts are preloaded.

### cssVariable

[Section titled cssVariable](#cssvariable)

**Example type:** `"--font-roboto" | "--font-comic-sans" | ...`

The [`cssVariable`](#cssvariable-1) registered in your Astro configuration:

src/components/Head.astro

    ---import { Font } from 'astro:assets';---
    <Font cssVariable="--font-roboto" />

### preload

[Section titled preload](#preload)

**Type:** `boolean`  
**Default:** `false`

Whether to output [preload links](https://web.dev/learn/performance/optimize-web-fonts#preload) or not:

src/components/Head.astro

    ---import { Font } from 'astro:assets';---
    <Font cssVariable="--font-roboto" preload />

Font configuration reference
----------------------------

[Section titled Font configuration reference](#font-configuration-reference)

All properties of your fonts must be configured in the Astro config. Some properties are common to both remote and local fonts, and other properties are available depending on your chosen font provider.

### Common properties

[Section titled Common properties](#common-properties)

The following properties are available for remote and local fonts. `provider`, `name`, and `cssVariable` are required.

astro.config.mjs

    import { defineConfig, fontProviders } from "astro/config";
    export default defineConfig({  experimental: {    fonts: [{      provider: fontProviders.google(),      name: "Roboto",      cssVariable: "--font-roboto"    }]  }});

#### provider

[Section titled provider](#provider)

**Type:** `AstroFontProvider | "local"`

The source of your font files. You can use a [built-in provider](#available-remote-font-providers), write your own [custom provider](#build-your-own-font-provider), or set to `"local"` to use local font files:

astro.config.mjs

    import { defineConfig, fontProviders } from "astro/config";
    export default defineConfig({  experimental: {    fonts: [{      provider: fontProviders.google(),      name: "Roboto",      cssVariable: "--font-roboto"    }]  }});

#### name

[Section titled name](#name)

**Type:** `string`

The font family name, as identified by your font provider:

    name: "Roboto"

#### cssVariable

[Section titled cssVariable](#cssvariable-1)

**Type:** `string`

A valid [ident](https://developer.mozilla.org/en-US/docs/Web/CSS/ident) of your choosing in the form of a CSS variable (i.e. starting with `--`):

    cssVariable: "--font-roboto"

#### fallbacks

[Section titled fallbacks](#fallbacks)

**Type:** `string[]`  
**Default:** `["sans-serif"]`

An array of fonts to use when your chosen font is unavailable, or loading. Fallback fonts will be chosen in the order listed. The first available font will be used:

    fallbacks: ["CustomFont", "serif"]

To disable fallback fonts completely, configure an empty array:

    fallbacks: []

Specify at least a [generic family name](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family#generic-name) matching the intended appearance of your font. Astro will then attempt to generate [optimized fallbacks](https://developer.chrome.com/blog/font-fallbacks) using font metrics. To disable this optimization, set `optimizedFallbacks` to false.

#### optimizedFallbacks

[Section titled optimizedFallbacks](#optimizedfallbacks)

**Type:** `boolean`  
**Default:** `true`

Whether or not to enable Astro’s default optimization when generating fallback fonts. You may disable this default optimization to have full control over how [`fallbacks`](#fallbacks) are generated:

    optimizedFallbacks: false

### Remote font properties

[Section titled Remote font properties](#remote-font-properties)

Further configuration options are available for remote fonts. Set these to customize the data loaded from your [font provider](#available-remote-font-providers), for example to only download certain font weights or styles.

Under the hood, these options are handled by [unifont](https://github.com/unjs/unifont/). Some properties may not be supported by some providers and may be handled differently by each provider.

#### weights

[Section titled weights](#weights)

**Type:** `(number | string)[]`  
**Default:** `[400]`

An array of [font weights](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight). If no value is specified in your configuration, only weight `400` is included by default to prevent unnecessary downloads. You will need to include this property to access any other font weights:

    weights: [200, "400", "bold"]

If the associated font is a [variable font](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide), you can specify a range of weights:

    weights: ["100 900"]

#### styles

[Section titled styles](#styles)

**Type:** `("normal" | "italic" | "oblique")[]`  
**Default:** `["normal", "italic"]`

An array of [font styles](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style):

    styles: ["normal", "oblique"]

#### subsets

[Section titled subsets](#subsets)

**Type:** `string[]`  
**Default:** `["cyrillic-ext", "cyrillic", "greek-ext", "greek", "vietnamese", "latin-ext", "latin"]`

Defines a list of [font subsets](https://knaap.dev/posts/font-subsetting/) to preload.

    subsets: ["latin"]

#### display

[Section titled display](#display)

**Type:** `"auto" | "block" | "swap" | "fallback" | "optional"`  
**Default:** `"swap"`

Defines [how a font displays](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) based on when it is downloaded and ready for use:

    display: "block"

#### unicodeRange

[Section titled unicodeRange](#unicoderange)

**Type:** `string[]`  
**Default:** `undefined`

Determines when a font must be downloaded and used based on a specific [range of unicode characters](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range). If a character on the page matches the configured range, the browser will download the font and all characters will be available for use on the page. To configure a subset of characters preloaded for a single font, see the [subsets](#subsets) property instead.

This can be useful for localization to avoid unnecessary font downloads when a specific part of your website uses a different alphabet and will be displayed with a separate font. For example, a website that offers both English and Japanese versions can prevent the browser from downloading the Japanese font on English versions of the page that do not contain any of the Japanese characters provided in `unicodeRange`.

    unicodeRange: ["U+26"]

#### stretch

[Section titled stretch](#stretch)

**Type:** `string`  
**Default:** `undefined`

A [font stretch](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-stretch):

    stretch: "condensed"

#### featureSettings

[Section titled featureSettings](#featuresettings)

**Type:** `string`  
**Default:** `undefined`

Controls the [typographic font features](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-feature-settings) (e.g. ligatures, small caps, or swashes):

    featureSettings: "'smcp' 2"

#### variationSettings

[Section titled variationSettings](#variationsettings)

**Type:** `string`  
**Default:** `undefined`

Font [variation settings](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-variation-settings):

    variationSettings: "'xhgt' 0.7"

### Local font `variants`

[Section titled Local font variants](#local-font-variants)

**Type:** `LocalFontFamily["variants"]`

The `variants` property is required when using local font files. Each variant represents a [`@font-face` declaration](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/) and requires a `weight`, `style`, and `src` value.

Additionally, [some other properties of remote fonts](#other-properties) may be specified within each variant.

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({    experimental: {        fonts: [{            provider: "local",            name: "Custom",            cssVariable: "--font-custom",            variants: [                {                    weight: 400,                    style: "normal",                    src: ["./src/assets/fonts/custom-400.woff2"]                },                {                    weight: 700,                    style: "normal",                    src: ["./src/assets/fonts/custom-700.woff2"]                }                // ...            ]        }]    }});

#### weight

[Section titled weight](#weight)

**Type:** `number | string`  
**Default:** `undefined`

A [font weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight):

    weight: 200

If the associated font is a [variable font](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide), you can specify a range of weights:

    weight: "100 900"

When the value is not set, by default Astro will try to infer the value based on the first [`source`](#src).

#### style

[Section titled style](#style)

**Type:** `"normal" | "italic" | "oblique"`  
**Default:** `undefined`

A [font style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style):

    style: "normal"

When the value is not set, by default Astro will try to infer the value based on the first [`source`](#src).

#### src

[Section titled src](#src)

**Type:** `(string | URL | { url: string | URL; tech?: string })[]`

Font [sources](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src). It can be a path relative to the root, a package import or a URL. URLs are particularly useful if you inject local fonts through an integration:

*   [Relative path](#tab-panel-3419)
*   [URL](#tab-panel-3420)
*   [Package import](#tab-panel-3421)

    src: ["./src/assets/fonts/MyFont.woff2", "./src/assets/fonts/MyFont.woff"]

    src: [new URL("./custom.ttf", import.meta.url)]

    src: ["my-package/SomeFont.ttf"]

Caution

We recommend not putting your font files in [the `public/` directory](/en/reference/configuration-reference/#publicdir). Since Astro will copy these files into that folder at build time, this will result in duplicated files in your build output. Instead, store them somewhere else in your project, such as in [`src/`](/en/reference/configuration-reference/#srcdir).

You can also specify a [tech](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src#tech) by providing objects:

    src: [{ url:"./src/assets/fonts/MyFont.woff2", tech: "color-COLRv1" }]

#### Other properties

[Section titled Other properties](#other-properties)

The following options from remote font families are also available for local font families within variants:

*   [display](#display)
*   [unicodeRange](#unicoderange)
*   [stretch](#stretch)
*   [featureSettings](#featuresettings)
*   [variationSettings](#variationsettings)

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({    experimental: {        fonts: [{            provider: "local",            name: "Custom",            cssVariable: "--font-custom",            variants: [                {                    weight: 400,                    style: "normal",                    src: ["./src/assets/fonts/custom-400.woff2"],                    display: "block"                }            ]        }]    }});

Build your own font provider
----------------------------

[Section titled Build your own font provider](#build-your-own-font-provider)

If you do not wish to use one of the [built-in providers](#available-remote-font-providers) (eg. you want to use a 3rd-party unifont provider or build something for a private registry), you can build your own.

An Astro font provider is made up of two parts: the config object and the actual implementation.

1.  Using the `defineAstroFontProvider()` type helper, create a function that returns a font provider config object containing:
    
    *   `entrypoint`: A URL, a path relative to the root, or a package import.
    *   `config`: An optional serializable object passed to the unifont provider.
    
    *   [Without config](#tab-panel-3422)
    *   [With config](#tab-panel-3423)
    
    provider/config.ts
    
        import { defineAstroFontProvider } from 'astro/config';
        export function myProvider() {    return defineAstroFontProvider({        entrypoint: new URL('./implementation.js', import.meta.url)    });};
    
    provider/config.ts
    
        import { defineAstroFontProvider } from 'astro/config';
        interface Config {    // ...};
        export function myProvider(config: Config) {    return defineAstroFontProvider({        entrypoint: new URL('./implementation.js', import.meta.url),        config    });};
    
2.  Create a second file to export your unifont `provider` implementation:
    
    implementation.ts
    
        import { defineFontProvider } from "unifont";
        export const provider = defineFontProvider("my-provider", async (options, ctx) => {    // fetch/define your custom fonts    // ...});
    
    Tip
    
    You can check out [the source code for unifont’s providers](https://github.com/unjs/unifont/blob/main/src/providers/) to learn more about how to create a unifont provider.
    
3.  Add your custom provider to your font configuration.
    
    astro.config.mjs
    
        fonts: [{  provider: fontProviders.myProvider(),  name: "Custom Font",  cssVariable: "--font-custom" }]
    

Caching
-------

[Section titled Caching](#caching)

The Fonts API caching implementation was designed to be practical in development and efficient in production. During builds, font files are copied to the `_astro/fonts` output directory, so they can benefit from HTTP caching of static assets (usually a year).

To clear the cache in development, remove the `.astro/fonts` directory. To clear the build cache, remove the `node_modules/.astro/fonts` directory

Further reading
---------------

[Section titled Further reading](#further-reading)

For full details and to give feedback on this experimental API, see [the Fonts RFC](https://github.com/withastro/roadmap/blob/rfc/fonts/proposals/0052-fonts.md).

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/fonts.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Responsive images](/en/reference/experimental-flags/responsive-images/) [Next  
Client prerendering](/en/reference/experimental-flags/client-prerender/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/experimental-flags/heading-id-compat
Experimental Markdown heading ID compatibility
==============================================

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@5.5.0`

The `experimental.headingIdCompat` flag makes the IDs generated by Astro for Markdown headings compatible with common platforms like GitHub and npm.

To enable heading ID compatibility, set the flag to `true` in your Astro configuration:

astro.config.mjs

    import { defineConfig } from "astro/config"
    export default defineConfig({  experimental: {    headingIdCompat: true,  }})

Usage
-----

[Section titled Usage](#usage)

This experimental flag allows you to retain the trailing hyphens on the end of IDs for Markdown headings ending in special characters, creating IDs compatible with those generated by other common platforms. It requires no specific usage and only affects how Astro generates the `id` for your headings written using Markdown syntax.

Astro, like many platforms, uses the popular [`github-slugger`](https://github.com/Flet/github-slugger) package to convert the text content of a Markdown heading to a slug to use in IDs. This experimental flag allows you to omit Astro’s additional default processing step that strips a trailing hyphen from the end of IDs for headings ending in special characters.

For example, the following Markdown heading:

    ## `<Picture />`

will generate the following HTML in Astro by default:

    <h2 id="picture"><code>&lt;Picture /&gt;</h2>

Using `experimental.headingIdCompat`, the same Markdown will generate the following HTML, which is identical to that of platforms such as GitHub:

    <h2 id="picture-"><code>&lt;Picture /&gt;</h2>

In a future major version, Astro will switch to use the compatible ID style by default, but you can opt in to the future behavior early using the `experimental.headingIdCompat` flag.

Usage with `rehypeHeadingIds` plugin
------------------------------------

[Section titled Usage with rehypeHeadingIds plugin](#usage-with-rehypeheadingids-plugin)

If you are [using the `rehypeHeadingIds` plugin](/en/guides/markdown-content/#heading-ids-and-plugins) directly, opt in to the compatibility mode when passing the plugin in your Astro configuration:

astro.config.mjs

    import { defineConfig } from 'astro/config';import { rehypeHeadingIds } from '@astrojs/markdown-remark';import { otherPluginThatReliesOnHeadingIDs } from 'some/plugin/source';
    export default defineConfig({  markdown: {    rehypePlugins: [      [rehypeHeadingIds, { headingIdCompat: true }],      otherPluginThatReliesOnHeadingIDs,    ],  },});

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/heading-id-compat.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Preserve scripts order](/en/reference/experimental-flags/preserve-scripts-order/) [Next  
Legacy flags](/en/reference/legacy-flags/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/experimental-flags/preserve-scripts-order
Experimental preserve scripts order
===================================

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@5.5.0`

Renders multiple `<style>` and `<script>` tags in the same order as they were declared in the source code.

To enable this behavior, add the `experimental.preserveScriptOrder` feature flag to your Astro config:

astro.config.mjs

    import { defineConfig } from "astro/config"
    export default defineConfig({  experimental: {    preserveScriptOrder: true  }})

Usage
-----

[Section titled Usage](#usage)

This experimental flag requires no specific usage and only affects the order in which Astro renders your styles and scripts.

When rendering multiple `<style>` and `<script>` tags on the same page, Astro currently reverses their order in your generated HTML output. This can give unexpected results, for example, CSS styles being overridden by earlier defined style tags when your site is built. This experimental flag instead renders `<script>` and `<style>` tags in the order they are defined.

For example, the following component has two `<style>` tags and two `<script>` tags:

src/components/MyComponent.astro

    <p>I am a component</p><style>  body {    background: red;  }</style><style>  body {    background: yellow;  }</style><script>    console.log("hello")</script><script>    console.log("world!")</script>

After compiling, Astro’s default behavior will create an inline style where `yellow` appears first, and then `red`. This means the `red` background is applied. Similarly with the two scripts, the word `world!` is logged first, and then `hello` second:

    body {background:#ff0} body {background:red}

    console.log("world!")console.log("hello")

When `experimental.preserveScriptOrder` is set to `true`, the rendering order of `<style>` and `<script>` tags matches the order in which they are written. For the same example component, the style generated `red` appears first, and then `yellow`; as for the scripts, `hello` is logged first, and then `world!`:

    body {background:red} body {background:#ff0}

    console.log("hello")console.log("world!")

In a future major version, Astro will preserve style and script order by default, but you can opt in to the future behavior early using the `experimental.preserveScriptOrder` flag.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/preserve-scripts-order.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Intellisense for collections](/en/reference/experimental-flags/content-intellisense/) [Next  
Markdown heading ID compatibility](/en/reference/experimental-flags/heading-id-compat/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/experimental-flags/responsive-images
Experimental responsive images
==============================

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@5.0.0`

Enables support for automatic responsive images in your project.

The term [responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images) refers images that work well on different devices. This particularly applies to images that resize to fit their container, and that can be served in different sizes depending on the device’s screen size and resolution.

There are a number of additional properties that can be set to control how the image is displayed, but these can be complicated to handle manually. Incorrect handling of these properties can lead to images that are slow to download or that are not displayed correctly. This is one of the most common causes of poor Core Web Vitals and Lighthouse performance scores.

When this flag is enabled, Astro can automatically generate the required `srcset` and `sizes` values for images, and apply the correct styles to ensure they resize correctly. This behavior can be configured globally or on a per-image basis.

To enable the feature, first add the `responsiveImages` flag to your `astro.config.mjs` file:

astro.config.mjs

    {  experimental: {    responsiveImages: true,  },}

Enabling this flag will not change anything by default, but responsive images can then be configured by setting the [image layout](#image-layout) either globally or per image.

To do this, you have access to additional [`image` configuration settings](#configuration-settings) for controlling the default behavior of all images processed and optimized by Astro:

*   Local and remote images using [the Markdown `![]()` syntax](/en/guides/images/#images-in-markdown-files).
*   The [`<Image />`](/en/guides/images/#display-optimized-images-with-the-image--component) and [`<Picture />`](/en/guides/images/#create-responsive-images-with-the-picture--component) components.

Additionally, Astro’s image components can receive [responsive image props](#responsive-image-properties) to override these defaults on a per-image basis.

Images in your `public/` folder are never optimized, and responsive images are not supported.

Note

Enabling responsive images will generate additional image sizes for all affected images. For prerendered pages this happens during the build so may increase the build time of your project, especially if you have a large number of images.

For pages rendered on-demand the images are generated as-needed, so this has no impact on build times but may increase the number of transformations performed. Depending on your image service this may incur additional costs.

Image layout
------------

[Section titled Image layout](#image-layout)

In order to generate the correct `srcset` and `sizes` attributes, the `<Image />` and `<Picture />` components need to know how the image should resize when its container changes size. This is done by setting the `layout` prop, or `image.experimentalLayout` default. The supported values are:

*   `constrained` - The image will scale down to fit the container, maintaining its aspect ratio, but will not scale up beyond the specified `width` and `height`, or the image’s original dimensions. Use this if you want the image to display at the requested size where possible, but shrink to fit smaller screens. This matches the default behavior for images when using Tailwind. If you’re not sure, this is probably the layout you should choose.
*   `full-width` - The image will scale to fit the width of the container, maintaining its aspect ratio. Use this for hero images or other images that should take up the full width of the page.
*   `fixed` - The image will maintain the requested dimensions and not resize. It will generate a `srcset` to support high density displays, but not for different screen sizes. Use this if the image will not resize, for example icons or logos smaller than any screen width, or other images in a fixed-width container.
*   `none` - The image will not be responsive. No `srcset` or `sizes` will be automatically generated, and no styles will be applied. This is useful if you have enabled a default layout, but want to disable it for a specific image.

The chosen `layout` will be used to generate the correct `srcset` and `sizes` attributes for the image, and will define the default styles applied to that `<img>` tag.

Configuration settings
----------------------

[Section titled Configuration settings](#configuration-settings)

Set [`image.experimentalLayout`](/en/reference/configuration-reference/#imageexperimentallayout) with a default value to enable responsive images throughout your project.

If this value is not configured, you can still pass a `layout` prop to any `<Image />` or `<Picture />` component to create a responsive image. However, Markdown images will not be responsive.

Optionally, you can configure [`image.experimentalObjectFit`](/en/reference/configuration-reference/#imageexperimentalobjectfit) and [`image.experimentalObjectPosition`](/en/reference/configuration-reference/#imageexperimentalobjectposition) which will apply to all processed images by default.

Each of these settings can be overridden on any individual `<Image />` or `<Picture />` component with a prop, but Markdown images will always use the default settings.

astro.config.mjs

    {  image: {    // Used for all Markdown images; not configurable per-image    // Used for all `<Image />` and `<Picture />` components unless overridden with a prop    experimentalLayout: 'constrained',  },  experimental: {    responsiveImages: true,  },}

Responsive image properties
---------------------------

[Section titled Responsive image properties](#responsive-image-properties)

These are additional properties available to the `<Image />` and `<Picture />` components when responsive images are enabled:

*   `layout`: The [layout type](#image-layout) for the image. Can be `constrained`, `fixed`, `full-width`, or `none`. If set to `none`, responsive behavior is disabled for this image and all other options are ignored. Defaults to `none`, or the value of [`image.experimentalLayout`](/en/reference/configuration-reference/#imageexperimentallayout) if set.
*   `fit`: Defines how the image should be cropped if the aspect ratio is changed. Values match those of CSS `object-fit`. Defaults to `cover`, or the value of [`image.experimentalObjectFit`](/en/reference/configuration-reference/#imageexperimentalobjectfit) if set.
*   `position`: Defines the position of the image crop if the aspect ratio is changed. Values match those of CSS `object-position`. Defaults to `center`, or the value of [`image.experimentalObjectPosition`](/en/reference/configuration-reference/#imageexperimentalobjectposition) if set.
*   `priority`: If set, eagerly loads the image. Otherwise, images will be lazy-loaded. Use this for your largest above-the-fold image. Defaults to `false`.

The `widths` and `sizes` attributes are automatically generated based on the image’s dimensions and the layout type, and in most cases should not be set manually. The generated `sizes` attribute for `constrained` and `full-width` images is based on the assumption that the image is displayed at close to the full width of the screen when the viewport is smaller than the image’s width. If it is significantly different (e.g. if it’s in a multi-column layout on small screens) you may need to adjust the `sizes` attribute manually for best results.

The `densities` attribute is not compatible with responsive images and will be ignored if set.

For example, with `constrained` set as the default layout, you can override any individual image’s `layout` property:

    ---import { Image } from 'astro:assets';import myImage from '../assets/my_image.png';---<Image src={myImage} alt="This will use responsive layout" width={800} height={600} /><Image src={myImage} alt="This will use full-width layout" layout="full-width" /><Image src={myImage} alt="This will disable responsive images" layout="none" />

Generated HTML output for responsive images
-------------------------------------------

[Section titled Generated HTML output for responsive images](#generated-html-output-for-responsive-images)

When a layout is set, either by default or on an individual component, images have automatically generated `srcset` and `sizes` attributes based on the image’s dimensions and the layout type. Images with `constrained` and `full-width` layouts will have styles applied to ensure they resize according to their container.

MyComponent.astro

    ---import { Image, Picture } from 'astro:assets';import myImage from '../assets/my_image.png';---<Image src={myImage} alt="A description of my image." layout='responsive' width={800} height={600} /><Picture src={myImage} alt="A description of my image." layout='full-width' formats={['avif', 'webp', 'jpeg']} />

This `<Image />` component will generate the following HTML output:

    <img  src="/_astro/my_image.hash3.webp"  srcset="/_astro/my_image.hash1.webp 640w,      /_astro/my_image.hash2.webp 750w,      /_astro/my_image.hash3.webp 800w,      /_astro/my_image.hash4.webp 828w,      /_astro/my_image.hash5.webp 1080w,      /_astro/my_image.hash6.webp 1280w,      /_astro/my_image.hash7.webp 1600w"  alt="A description of my image"  sizes="(min-width: 800px) 800px, 100vw"  loading="lazy"  decoding="async"  fetchpriority="auto"  width="800"  height="600"  style="--fit: cover; --pos: center;"  data-astro-image="constrained">

Overriding image styles
-----------------------

[Section titled Overriding image styles](#overriding-image-styles)

The responsive image component applies a small number of styles to ensure they resize correctly. The applied styles depend on the layout type, and are designed to give the best behavior for the generated `srcset` and `sizes` attributes. These are the default styles:

Responsive Image Styles

    :where([data-astro-image]) {  object-fit: var(--fit);  object-position: var(--pos);}:where([data-astro-image='full-width']) {  width: 100%;}:where([data-astro-image='constrained']) {  max-width: 100%;}

You can override the `object-fit` and `object-position` styles by setting the `fit` and `position` props on the `<Image />` or `<Picture />` component.

The styles use the [`:where()` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:where), which has a [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity) of 0, meaning that it is easy to override with your own styles. Any class or tag name will have a higher specificity than `:where()`, so you can easily override the styles by adding your own class or tag name to the image.

Tailwind 4 is a special case, because it uses [cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), meaning the Tailwind rules are always lower specificity than rules that don’t use layers. Astro supports browsers that do not support cascade layers, so it cannot use them for images. This means that if you need to override the styles using Tailwind 4, you must use [the `!important` modifier](https://tailwindcss.com/docs/styling-with-utility-classes#using-the-important-modifier).

For a complete overview, and to give feedback on this experimental API, see the [Responsive Images RFC](https://github.com/withastro/roadmap/blob/responsive-images/proposals/0053-responsive-images.md).

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/responsive-images.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Configuring experimental flags](/en/reference/experimental-flags/) [Next  
Fonts](/en/reference/experimental-flags/fonts/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)





# Aggregated from ./pages/reference/image-service-reference
Image Service API
=================

`astro:assets` was designed to make it easy for any image optimization service to build a service on top of Astro.

What is an Image Service?
-------------------------

[Section titled What is an Image Service?](#what-is-an-image-service)

Astro provides two types of image services: Local and External.

*   **Local services** handle image transformations directly at build for static sites, or at runtime both in development mode and for on-demand rendering. These are often wrappers around libraries like Sharp, ImageMagick, or Squoosh. In dev mode and in production routes rendered on demand, local services use an API endpoint to do the transformation.
*   **External services** point to URLs and can add support for services such as Cloudinary, Vercel, or any [RIAPI](https://github.com/riapi/riapi)\-compliant server.

Building using the Image Services API
-------------------------------------

[Section titled Building using the Image Services API](#building-using-the-image-services-api)

Service definitions take the shape of an exported default object with various required methods (“hooks”).

External services provide a `getURL()` that points to the `src` of the output `<img>` tag.

Local services provide a `transform()` method to perform transformations on your image, and `getURL()` and `parseURL()` methods to use an endpoint for dev mode and when rendered on demand.

Both types of services can provide `getHTMLAttributes()` to determine the other attributes of the output `<img>` and `validateOptions()` to validate and augment the passed options.

### External Services

[Section titled External Services](#external-services)

An external service points to a remote URL to be used as the `src` attribute of the final `<img>` tag. This remote URL is responsible for downloading, transforming, and returning the image.

    import type { ExternalImageService, ImageTransform, AstroConfig } from "astro";
    const service: ExternalImageService = {  validateOptions(options: ImageTransform, imageConfig: AstroConfig['image']) {    const serviceConfig = imageConfig.service.config;
        // Enforce the user set max width.    if (options.width > serviceConfig.maxWidth) {      console.warn(`Image width ${options.width} exceeds max width ${serviceConfig.maxWidth}. Falling back to max width.`);      options.width = serviceConfig.maxWidth;    }
        return options;  },  getURL(options, imageConfig) {    return `https://mysupercdn.com/${options.src}?q=${options.quality}&w=${options.width}&h=${options.height}`;  },  getHTMLAttributes(options, imageConfig) {    const { src, format, quality, ...attributes } = options;    return {      ...attributes,      loading: options.loading ?? 'lazy',      decoding: options.decoding ?? 'async',    };  }};
    
    export default service;

### Local Services

[Section titled Local Services](#local-services)

To create your own local service, you can point to the [built-in endpoint](https://github.com/withastro/astro/blob/main/packages/astro/src/assets/endpoint/generic.ts) (`/_image`), or you can additionally create your own endpoint that can call the service’s methods.

    import type { LocalImageService, AstroConfig } from "astro";
    const service: LocalImageService = {  getURL(options: ImageTransform, imageConfig: AstroConfig['image']) {    const searchParams = new URLSearchParams();    searchParams.append('href', typeof options.src === "string" ? options.src : options.src.src);    options.width && searchParams.append('w', options.width.toString());    options.height && searchParams.append('h', options.height.toString());    options.quality && searchParams.append('q', options.quality.toString());    options.format && searchParams.append('f', options.format);    return `/my_custom_endpoint_that_transforms_images?${searchParams}`;    // Or use the built-in endpoint, which will call your parseURL and transform functions:    // return `/_image?${searchParams}`;  },  parseURL(url: URL, imageConfig) {    return {      src: params.get('href')!,      width: params.has('w') ? parseInt(params.get('w')!) : undefined,      height: params.has('h') ? parseInt(params.get('h')!) : undefined,      format: params.get('f'),      quality: params.get('q'),    };  },  transform(buffer: Uint8Array, options: { src: string, [key: string]: any }, imageConfig): { data: Uint8Array, format: OutputFormat } {    const { buffer } = mySuperLibraryThatEncodesImages(options);    return {      data: buffer,      format: options.format,    };  },  getHTMLAttributes(options, imageConfig) {    let targetWidth = options.width;    let targetHeight = options.height;    if (typeof options.src === "object") {      const aspectRatio = options.src.width / options.src.height;
          if (targetHeight && !targetWidth) {        targetWidth = Math.round(targetHeight * aspectRatio);      } else if (targetWidth && !targetHeight) {        targetHeight = Math.round(targetWidth / aspectRatio);      }    }
        const { src, width, height, format, quality, ...attributes } = options;
        return {      ...attributes,      width: targetWidth,      height: targetHeight,      loading: attributes.loading ?? 'lazy',      decoding: attributes.decoding ?? 'async',    };  },  propertiesToHash: ['src', 'width', 'height', 'format', 'quality'],};export default service;

At build time for static sites and pre-rendered routes, both `<Image />` and `getImage(options)` call the `transform()` function. They pass options either through component attributes or an `options` argument, respectively. The transformed images will be built to a `dist/_astro` folder. Their file names will contain a hash of the properties passed to `propertiesToHash`. This property is optional and will default to `['src', 'width', 'height', 'format', 'quality']`. If your custom image service has more options that change the generated images, add these to the array.

In dev mode and when using an adapter to render on demand, Astro doesn’t know ahead of time which images need to be optimized. Astro uses a GET endpoint (by default, `/_image`) to process the images at runtime. `<Image />` and `getImage()` pass their options to `getURL()`, which will return the endpoint URL. Then, the endpoint calls `parseURL()` and passes the resulting properties to `transform()`.

#### getConfiguredImageService & imageConfig

[Section titled getConfiguredImageService &amp; imageConfig](#getconfiguredimageservice--imageconfig)

If you implement your own endpoint as an Astro endpoint, you can use `getConfiguredImageService` and `imageConfig` to call your service’s `parseURL` and `transform` methods and provide the image config.

To access the image service config ([`image.service.config`](/en/reference/configuration-reference/#imageservice)), you can use `imageConfig.service.config`.

src/api/my\_custom\_endpoint\_that\_transforms\_images.ts

    import type { APIRoute } from "astro";import { getConfiguredImageService, imageConfig } from 'astro:assets';
    export const GET: APIRoute = async ({ request }) => {  const imageService = await getConfiguredImageService();
      const imageTransform = imageService.parseURL(new URL(request.url), imageConfig);  // ... fetch the image from imageTransform.src and store it in inputBuffer  const { data, format } = await imageService.transform(inputBuffer, imageTransform, imageConfig);  return new Response(data, {      status: 200,      headers: {        'Content-Type': mime.getType(format) || ''      }    }  );}

[See the built-in endpoint](https://github.com/withastro/astro/blob/main/packages/astro/src/assets/endpoint/generic.ts) for a full example.

Hooks
-----

[Section titled Hooks](#hooks)

### `getURL()`

[Section titled getURL()](#geturl)

**Required for local and external services**

`getURL(options: ImageTransform, imageConfig: AstroConfig['image']): string`

For local services, this hook returns the URL of the endpoint that generates your image (for on-demand rendering and in dev mode). It is unused during build. The local endpoint that `getURL()` points to may call both `parseURL()` and `transform()`.

For external services, this hook returns the final URL of the image.

For both types of services, `options` are the properties passed by the user as attributes of the `<Image />` component or as options to `getImage()`. They are of the following type:

    export type ImageTransform = {    // ESM imported images | remote/public image paths    src: ImageMetadata | string;    width?: number;    height?: number;    widths?: number[] | undefined;    densities?: (number | `${number}x`)[] | undefined;    quality?: ImageQuality;    format?: OutputFormat;    alt?: string;    [key: string]: any;};

### `parseURL()`

[Section titled parseURL()](#parseurl)

**Required for local services; unavailable for external services**

`parseURL(url: URL, imageConfig: AstroConfig['image']): { src: string, [key: string]: any}`

This hook parses the generated URLs by `getURL()` back into an object with the different properties to be used by `transform` (for on-demand rendering and in dev mode). It is unused during build.

### `transform()`

[Section titled transform()](#transform)

**Required for local services only; unavailable for external services**

`transform(buffer: Uint8Array, options: { src: string, [key: string]: any }, imageConfig: AstroConfig['image']): { data: Uint8Array, format: OutputFormat }`

This hook transforms and returns the image and is called during the build to create the final asset files.

You must return a `format` to ensure that the proper MIME type is served to users for on-demand rendering and development mode.

### `getHTMLAttributes()`

[Section titled getHTMLAttributes()](#gethtmlattributes)

**Optional for both local and external services**

`getHTMLAttributes(options: ImageTransform, imageConfig: AstroConfig['image']): Record<string, any>`

This hook returns all additional attributes used to render the image as HTML, based on the parameters passed by the user (`options`).

### `getSrcSet()`

[Section titled getSrcSet()](#getsrcset)

**Added in:** `astro@3.3.0`

**Optional for both local and external services.**

`getSrcSet?: (options: ImageTransform, imageConfig: AstroConfig['image']): SrcSetValue[] | Promise<SrcSetValue[]>;`

This hook generates multiple variants of the specified image, for example, to generate a `srcset` attribute on an `<img>` or `<picture>`’s `source`.

This hook returns an array of objects with the following properties:

    export type SrcSetValue = {  transform: ImageTransform;  descriptor?: string;  attributes?: Record<string, any>;};

### `validateOptions()`

[Section titled validateOptions()](#validateoptions)

**Optional for both local and external services**

`validateOptions(options: ImageTransform, imageConfig: AstroConfig['image']): ImageTransform`

This hook allows you to validate and augment the options passed by the user. This is useful for setting default options, or telling the user that a parameter is required.

[See how `validateOptions()` is used in Astro built-in services](https://github.com/withastro/astro/blob/0ab6bad7dffd413c975ab00e545f8bc150f6a92f/packages/astro/src/assets/services/service.ts#L124).

User configuration
------------------

[Section titled User configuration](#user-configuration)

Configure the image service to use in `astro.config.mjs`. The config takes the following form:

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({  image: {    service: {      entrypoint: "your-entrypoint", // 'astro/assets/services/sharp' | string,      config: {        // ... service-specific config. Optional.      }    }  },});

Utilities
---------

[Section titled Utilities](#utilities)

Astro exposes a number of helper functions that can be used to develop a custom image service. These utilities can be imported from `astro/assets/utils`:

    import {    isRemoteAllowed,    matchHostname,    matchPathname,    matchPattern,    matchPort,    matchProtocol,    isESMImportedImage,    isRemoteImage,    resolveSrc,    imageMetadata,    emitESMImage,    getOrigQueryParams,    inferRemoteSize,    propsToFilename,    hashTransform} from "astro/assets/utils";

### `isRemoteAllowed()`

[Section titled isRemoteAllowed()](#isremoteallowed)

**Type:** `(src: string, { domains, remotePatterns }: {domains: string[], remotePatterns: RemotePattern[] }): boolean`  

**Added in:** `astro@4.0.0`

Determines whether a given remote resource, identified by its source URL, is allowed based on specified domains and remote patterns.

    import { isRemoteAllowed } from 'astro/assets/utils';
    const testImageURL = 'https://example.com/images/test.jpg';const domains = ['example.com', 'anotherdomain.com'];const remotePatterns = [  { protocol: 'https', hostname: 'images.example.com', pathname: '/**' }, // Allow any path under this hostname];
    const url = new URL(testImageURL);const isAllowed = isRemoteAllowed(url.href, { domains, remotePatterns });
    console.log(`Is the remote image allowed? ${isAllowed}`);

### `matchHostname()`

[Section titled matchHostname()](#matchhostname)

**Type:** `(url: URL, hostname?: string, allowWildcard = false): boolean`  

**Added in:** `astro@4.0.0`

Matches a given URL’s hostname against a specified hostname, with optional support for wildcard patterns.

    import { matchHostname } from 'astro/assets/utils';
    const testURL = new URL('https://sub.example.com/path/to/resource');
    // Example usage of matchHostnameconst hostnameToMatch = 'example.com';
    // Match without wildcardconst isMatchWithoutWildcard = matchHostname(testURL, hostnameToMatch);console.log(`Does the hostname match without wildcard? ${isMatchWithoutWildcard}`); // Output: false
    // Match with wildcardconst isMatchWithWildcard = matchHostname(testURL, hostnameToMatch, true);console.log(`Does the hostname match with wildcard? ${isMatchWithWildcard}`); // Output: true

### `matchPathname()`

[Section titled matchPathname()](#matchpathname)

**Type:** `(url: URL, pathname?: string, allowWildcard = false): boolean`  

**Added in:** `astro@4.0.0`

Matches a given URL’s pathname against a specified pattern, with optional support for wildcards.

    import { matchPathname } from 'astro/assets/utils';
    const testURL = new URL('https://example.com/images/photo.jpg');
    // Example pathname to matchconst pathnameToMatch = '/images/photo.jpg';
    // Match without wildcardconst isMatchWithoutWildcard = matchPathname(testURL, pathnameToMatch);console.log(`Does the pathname match without wildcard? ${isMatchWithoutWildcard}`); // Output: true
    // Match with wildcardconst wildcardPathname = '/images/*';const isMatchWithWildcard = matchPathname(testURL, wildcardPathname, true);console.log(`Does the pathname match with wildcard? ${isMatchWithWildcard}`); // Output: true

### `matchPattern()`

[Section titled matchPattern()](#matchpattern)

**Type:** `(url: URL, remotePattern: RemotePattern): boolean`  

**Added in:** `astro@4.0.0`

Evaluates whether a given URL matches the specified remote pattern based on protocol, hostname, port, and pathname.

    import { matchPattern } from 'astro/assets/utils';
    const testURL = new URL('https://images.example.com/photos/test.jpg');
    // Define a remote pattern to match the URLconst remotePattern = {  protocol: 'https',  hostname: 'images.example.com',  pathname: '/photos/**', // Wildcard to allow all files under /photos/  port: '', // Optional: Match any port or leave empty for default};
    // Check if the URL matches the remote patternconst isPatternMatched = matchPattern(testURL, remotePattern);
    console.log(`Does the URL match the remote pattern? ${isPatternMatched}`); // Output: true

### `matchPort()`

[Section titled matchPort()](#matchport)

**Type:** `(url: URL, port?: string): boolean`  

**Added in:** `astro@4.0.0`

Checks if the given URL’s port matches the specified port. If no port is provided, it returns `true`.

    import { matchPort } from 'astro/assets/utils';
    const testURL1 = new URL('https://example.com:8080/resource');const testURL2 = new URL('https://example.com/resource');
    // Example usage of matchPortconst portToMatch = '8080';
    // Match a URL with a port specifiedconst isPortMatch1 = matchPort(testURL1, portToMatch);console.log(`Does the port match? ${isPortMatch1}`); // Output: true
    // Match a URL without a port specified (default port will be assumed)const isPortMatch2 = matchPort(testURL2, portToMatch);console.log(`Does the port match? ${isPortMatch2}`); // Output: false
    // Check a URL without explicitly providing a port (defaults to true if port is undefined)const isPortMatch3 = matchPort(testURL1);console.log(`Does the port match (no port specified)? ${isPortMatch3}`); // Output: true

### `matchProtocol()`

[Section titled matchProtocol()](#matchprotocol)

**Type:** `(url: URL, protocol?: string): boolean`  

**Added in:** `astro@4.0.0`

Compares the protocol of the provided URL with a specified protocol.

    import { matchProtocol } from 'astro/assets/utils';
    const testURL1 = new URL('https://example.com/resource');const testURL2 = new URL('http://example.com/resource');
    // Example usage of matchProtocolconst protocolToMatch = 'https';
    // Match a URL with correct protocolconst isProtocolMatch1 = matchProtocol(testURL1, protocolToMatch);console.log(`Does the protocol match for testURL1? ${isProtocolMatch1}`); // Output: true
    // Match a URL with incorrect protocolconst isProtocolMatch2 = matchProtocol(testURL2, protocolToMatch);console.log(`Does the protocol match for testURL2? ${isProtocolMatch2}`); // Output: false
    // Match a URL without explicitly providing a protocol (defaults to true if protocol is undefined)const isProtocolMatch3 = matchProtocol(testURL1);console.log(`Does the protocol match (no protocol specified)? ${isProtocolMatch3}`); // Output: true

### `isESMImportedImage()`

[Section titled isESMImportedImage()](#isesmimportedimage)

**Type:** `(src: ImageMetadata | string): boolean`  

**Added in:** `astro@4.0.0`

Determines if the given source is an ECMAScript Module (ESM) imported image.

    import { isESMImportedImage } from 'astro/assets/utils';
    // Example usage of isESMImportedImageconst imageMetadataExample = {  src: '/images/photo.jpg',  width: 800,  height: 600,  format: 'jpg',};
    const filePathExample = '/images/photo.jpg';
    // Check if the input is an ESM imported imageconst isMetadataImage = isESMImportedImage(imageMetadataExample);console.log(`Is imageMetadataExample an ESM imported image? ${isMetadataImage}`); // Output: true
    const isFilePathImage = isESMImportedImage(filePathExample);console.log(`Is filePathExample an ESM imported image? ${isFilePathImage}`); // Output: false

### `isRemoteImage()`

[Section titled isRemoteImage()](#isremoteimage)

**Type:** `(src: ImageMetadata | string): boolean`  

**Added in:** `astro@4.0.0`

Determines if the provided source is a remote image URL in the form of a string.

    import { isRemoteImage } from 'astro/assets/utils';
    // Example usage of isRemoteImageconst remoteImageUrl = 'https://example.com/images/photo.jpg';const localImageMetadata = {  src: '/images/photo.jpg',  width: 800,  height: 600,  format: 'jpg',};
    // Check if the input is a remote image URLconst isRemote1 = isRemoteImage(remoteImageUrl);console.log(`Is remoteImageUrl a remote image? ${isRemote1}`); // Output: true
    const isRemote2 = isRemoteImage(localImageMetadata);console.log(`Is localImageMetadata a remote image? ${isRemote2}`); // Output: false

### `resolveSrc()`

[Section titled resolveSrc()](#resolvesrc)

**Type:** `(src: UnresolvedImageTransform['src']): Promise<string | ImageMetadata>`  

**Added in:** `astro@4.0.0`

Returns the image source. This function ensures that if `src` is a Promise (e.g., a dynamic `import()`), it is awaited and the correct `src` is extracted. If `src` is already a resolved value, it is returned as-is.

    import { resolveSrc } from 'astro/assets/utils';import localImage from "./images/photo.jpg";
    const resolvedLocal = await resolveSrc(localImage);// will be `{ src: '/images/photo.jpg', width: 800, height: 600, format: 'jpg' }`
    const resolvedRemote = await resolveSrc("https://example.com/remote-img.jpg");// will be `"https://example.com/remote-img.jpg"`
    const resolvedDynamic = await resolveSrc(import("./images/dynamic-image.jpg"))// will be `{ src: '/images/dynamic-image.jpg', width: 800, height: 600, format: 'jpg' }`

### `imageMetadata()`

[Section titled imageMetadata()](#imagemetadata)

**Type:** `(data: Uint8Array, src?: string): Promise<Omit<ImageMetadata, 'src' | 'fsPath'>>`  

**Added in:** `astro@4.0.0`

Extracts image metadata such as dimensions, format, and orientation from the provided image data.

    import { imageMetadata } from 'astro/assets/utils';
    async function extractImageMetadata() {  // Example image data (Uint8Array)  const exampleImageData = new Uint8Array([/* ...binary image data... */]);
      // Optional source path (useful for debugging or additional metadata context)  const sourcePath = '/images/photo.jpg';
      try {    // Extract metadata from the image data    const metadata = await imageMetadata(exampleImageData, sourcePath);
        console.log('Extracted Image Metadata:', metadata);    // Example output:    // {    //   width: 800,    //   height: 600,    //   format: 'jpg',    //   orientation: undefined    // }  } catch (error) {    console.error('Failed to extract metadata from image:', error);  }}
    await extractImageMetadata();

### `emitESMImage()`

[Section titled emitESMImage()](#emitesmimage)

Deprecated

Use the [`emitImageMetadata`](#emitimagemetadata) function instead.

**Type:** `(id: string | undefined, _watchMode: boolean, experimentalSvgEnabled: boolean, fileEmitter?: FileEmitter): Promise<ImageMetadataWithContents | undefined>`  

**Added in:** `astro@4.0.0`

Processes an image file and emits its metadata and optionally its contents. In build mode, the function uses `fileEmitter` to generate an asset reference. In development mode, it resolves to a local file URL with query parameters for metadata.

    import { emitESMImage } from 'astro/assets/utils';
    const imageId = '/images/photo.jpg';const unusedWatchMode = false; // Deprecated, unusedconst unusedExperimentalSvgEnabled = false; // Set to `true` only if you are using SVG and want the file data to be embedded
    try {  const result = await emitESMImage(imageId, unusedWatchMode, unusedExperimentalSvgEnabled);  if (result) {    console.log('Image metadata with contents:', result);    // Example output:    // {    //   width: 800,    //   height: 600,    //   format: 'jpg',    //   contents: Uint8Array([...])    // }  } else {    console.log('No metadata was emitted for this image.');  }} catch (error) {  console.error('Failed to emit ESM image:', error);}

### `emitImageMetadata()`

[Section titled emitImageMetadata()](#emitimagemetadata)

**Type:** `(id: string | undefined, fileEmitter?: FileEmitter): Promise<ImageMetadataWithContents | undefined>`  

**Added in:** `astro@5.7.0`

Processes an image file and emits its metadata and optionally its contents. In build mode, the function uses `fileEmitter` to generate an asset reference. In development mode, it resolves to a local file URL with query parameters for metadata.

    import { emitImageMetadata } from 'astro/assets/utils';
    const imageId = '/images/photo.jpg';
    try {  const result = await emitImageMetadata(imageId);  if (result) {    console.log('Image metadata with contents:', result);    // Example output:    // {    //   width: 800,    //   height: 600,    //   format: 'jpg',    //   contents: Uint8Array([...])    // }  } else {    console.log('No metadata was emitted for this image.');  }} catch (error) {  console.error('Failed to emit ESM image:', error);}

### `getOrigQueryParams()`

[Section titled getOrigQueryParams()](#getorigqueryparams)

**Type:** `(params: URLSearchParams): Pick<ImageMetadata, 'width' | 'height' | 'format'> | undefined`  

**Added in:** `astro@4.0.0`

Retrieves the `width`, `height`, and `format` of an image from a [`URLSearchParams` object](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams). If any of these parameters are missing or invalid, the function returns `undefined`.

    import { getOrigQueryParams } from 'astro/assets/utils';
    const url = new URL('https://example.com/image.jpg?width=800&height=600&format=jpg');const queryParams = url.searchParams;
    // Extract the original query parametersconst origParams = getOrigQueryParams(queryParams);
    if (origParams) {  console.log('Original query parameters:', origParams);  // Example output:  // {  //   width: 800,  //   height: 600,  //   format: 'jpg'  // }} else {  console.log('Failed to extract original query parameters.');}

### `inferRemoteSize()`

[Section titled inferRemoteSize()](#inferremotesize)

**Type:** `(url: string): Promise<Omit<ImageMetadata, 'src' | 'fsPath'>>`  

**Added in:** `astro@4.0.0`

Infers the dimensions of a remote image by streaming its data and analyzing it progressively until sufficient metadata is available.

    import { inferRemoteSize } from 'astro/assets/utils';
    async function getRemoteImageSize() {  const remoteImageUrl = 'https://example.com/image.jpg';
      try {    // Infer remote image size from the URL    const imageSize = await inferRemoteSize(remoteImageUrl);
        console.log('Inferred remote image size:', imageSize);    // Example output:    // {    //   width: 1920,    //   height: 1080,    //   format: 'jpg'    // }  } catch (error) {    console.error('Failed to infer the size of the remote image:', error);  }}
    await getRemoteImageSize();

### `propsToFilename()`

[Section titled propsToFilename()](#propstofilename)

**Type:** `(filePath: string, transform: ImageTransform, hash: string): string`  

**Added in:** `astro@4.0.0`

Generates a formatted filename for an image based on its source path, transformation properties, and a unique hash.

The formatted filename follows this structure:

`<prefixDirname>/<baseFilename>_<hash><outputExtension>`

*   `prefixDirname`: If the image is an ESM imported image, this is the directory name of the original file path; otherwise, it will be an empty string.
*   `baseFilename`: The base name of the file or a hashed short name if the file is a `data:` URI.
*   `hash`: A unique hash string generated to distinguish the transformed file.
*   `outputExtension`: The desired output file extension derived from the `transform.format` or the original file extension.

    import { propsToFilename } from 'astro/assets/utils';
    function generateTransformedFilename() {  const filePath = '/images/photo.jpg';  const transform = {    format: 'png',    src: '/images/photo.jpg'  };  const hash = 'abcd1234';
      // Generate the transformed filename based on the file path, transformation, and hash  const filename = propsToFilename(filePath, transform, hash);
      console.log('Generated transformed filename:', filename);  // Example output: '/images/photo_abcd1234.png'}
    generateTransformedFilename();

### `hashTransform()`

[Section titled hashTransform()](#hashtransform)

**Type:** `(transform: ImageTransform, imageService: string, propertiesToHash: string[]): string`  

**Added in:** `astro@4.0.0`

Transforms the provided `transform` object into a hash string based on selected properties and the specified `imageService`.

    import { hashTransform } from 'astro/assets/utils';
    function generateTransformHash() {  const transform = {    width: 800,    height: 600,    format: 'jpg',  };
      const imageService = 'astroImageService';  const propertiesToHash = ['width', 'height', 'format'];
      // Generate the hash based on the transform, image service, and properties  const hash = hashTransform(transform, imageService, propertiesToHash);
      console.log('Generated transform hash:', hash);  // Example output: 'd41d8cd98f00b204e9800998ecf8427e'}
    generateTransformHash();

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/image-service-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Content Loader API](/en/reference/content-loader-reference/) [Next  
Dev Toolbar App API](/en/reference/dev-toolbar-app-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/integrations-reference
Astro Integration API
=====================

**Astro Integrations** add new functionality and behaviors for your project with only a few lines of code.

This reference page is for anyone writing their own integration. To learn how to use an integration in your project, check out our [Using Integrations](/en/guides/integrations-guide/) guide instead.

Examples
--------

[Section titled Examples](#examples)

The official Astro integrations can act as reference for you as you go to build your own integrations.

*   **Renderers:** [`svelte`](/en/guides/integrations-guide/svelte/), [`react`](/en/guides/integrations-guide/react/), [`preact`](/en/guides/integrations-guide/preact/), [`vue`](/en/guides/integrations-guide/vue/), [`solid`](/en/guides/integrations-guide/solid-js/)
*   **Libraries:** [`partytown`](/en/guides/integrations-guide/partytown/)
*   **Features:** [`sitemap`](/en/guides/integrations-guide/sitemap/)

Quick API Reference
-------------------

[Section titled Quick API Reference](#quick-api-reference)

    interface AstroIntegration {  name: string;  hooks: {    'astro:config:setup'?: (options: {      config: AstroConfig;      command: 'dev' | 'build' | 'preview' | 'sync';      isRestart: boolean;      updateConfig: (newConfig: DeepPartial<AstroConfig>) => AstroConfig;      addRenderer: (renderer: AstroRenderer) => void;      addWatchFile: (path: URL | string) => void;      addClientDirective: (directive: ClientDirectiveConfig) => void;      addMiddleware: (middleware: AstroIntegrationMiddleware) => void;      addDevToolbarApp: (entrypoint: DevToolbarAppEntry) => void;      injectScript: (stage: InjectedScriptStage, content: string) => void;      injectRoute: (injectedRoute: InjectedRoute) => void;      createCodegenDir: () => URL;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:route:setup'?: (options: {      route: RouteOptions;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:routes:resolved'?: (options: {      routes: IntegrationResolvedRoute[];      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:config:done'?: (options: {      config: AstroConfig;      setAdapter: (adapter: AstroAdapter) => void;      injectTypes: (injectedType: InjectedType) => URL;      logger: AstroIntegrationLogger;      buildOutput: 'static' | 'server';    }) => void | Promise<void>;    'astro:server:setup'?: (options: {      server: vite.ViteDevServer;      logger: AstroIntegrationLogger;      toolbar: ReturnType<typeof getToolbarServerCommunicationHelpers>;      refreshContent?: (options: RefreshContentOptions) => Promise<void>;    }) => void | Promise<void>;    'astro:server:start'?: (options: {      address: AddressInfo;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:server:done'?: (options: {      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:build:start'?: (options: {      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:build:setup'?: (options: {      vite: vite.InlineConfig;      pages: Map<string, PageBuildData>;      target: 'client' | 'server';      updateConfig: (newConfig: vite.InlineConfig) => void;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:build:ssr'?: (options: {      manifest: SerializedSSRManifest;      entryPoints: Map<IntegrationRouteData, URL>;      middlewareEntryPoint: URL | undefined;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:build:generated'?: (options: {      dir: URL;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:build:done'?: (options: {      pages: { pathname: string }[];      dir: URL;      assets: Map<string, URL[]>;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;
        // ... any custom hooks from integrations  };}

Hooks
-----

[Section titled Hooks](#hooks)

Astro provides hooks that integrations can implement to execute during certain parts of Astro’s lifecycle. Astro hooks are defined in the `IntegrationHooks` interface, which is part of the global `Astro` namespace. Each hook has a [`logger` option](#astrointegrationlogger) that allows you to use the Astro logger to write logs.

The following hooks are built in to Astro:

### `astro:config:setup`

[Section titled astro:config:setup](#astroconfigsetup)

**Next hook:** [`astro:route:setup`](#astroroutesetup)

**When:** On initialization, before either the [Vite](https://vite.dev/config/) or [Astro config](/en/reference/configuration-reference/) have resolved.

**Why:** To extend the project config. This includes updating the [Astro config](/en/reference/configuration-reference/), applying [Vite plugins](https://vite.dev/guide/api-plugin.html), adding component renderers, and injecting scripts onto the page.

    'astro:config:setup'?: (options: {  config: AstroConfig;  command: 'dev' | 'build' | 'preview' | 'sync';  isRestart: boolean;  updateConfig: (newConfig: DeepPartial<AstroConfig>) => AstroConfig;  addRenderer: (renderer: AstroRenderer) => void;  addClientDirective: (directive: ClientDirectiveConfig) => void;  addMiddleware: (middleware: AstroIntegrationMiddleware) => void;  addDevToolbarApp: (entrypoint: DevToolbarAppEntry) => void;  addWatchFile: (path: URL | string) => void;  injectScript: (stage: InjectedScriptStage, content: string) => void;  injectRoute: (injectedRoute: InjectedRoute) => void;  createCodegenDir: () => URL;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `config` option

[Section titled config option](#config-option)

**Type:** `AstroConfig`

A read-only copy of the user-supplied [Astro config](/en/reference/configuration-reference/). This is resolved _before_ any other integrations have run. If you need a copy of the config after all integrations have completed their config updates, [see the `astro:config:done` hook](#astroconfigdone).

#### `command` option

[Section titled command option](#command-option)

**Type:** `'dev' | 'build' | 'preview' | 'sync'`

*   `dev` - Project is executed with `astro dev`
*   `build` - Project is executed with `astro build`
*   `preview` - Project is executed with `astro preview`
*   `sync` - Project is executed with `astro sync`

#### `isRestart` option

[Section titled isRestart option](#isrestart-option)

**Type:** `boolean`  

**Added in:** `astro@1.5.0`

`false` when the dev server starts, `true` when a reload is triggered. Useful to detect when this function is called more than once.

#### `updateConfig()` option

[Section titled updateConfig() option](#updateconfig-option)

**Type:** `(newConfig: DeepPartial<AstroConfig>) => AstroConfig;`

A callback function to update the user-supplied [Astro config](/en/reference/configuration-reference/). Any config you provide **will be merged with the user config + other integration config updates,** so you are free to omit keys!

For example, say you need to supply a [Vite](https://vite.dev/) plugin to the user’s project:

    import bananaCSS from '@vitejs/official-banana-css-plugin';
    export default {  name: 'banana-css-integration',  hooks: {    'astro:config:setup': ({ updateConfig }) => {      updateConfig({        vite: {          plugins: [bananaCSS()],        }      })    }  }}

#### `addRenderer()` option

[Section titled addRenderer() option](#addrenderer-option)

**Type:** `(renderer:` [`AstroRenderer`](https://github.com/withastro/astro/blob/fdd607c5755034edf262e7b275732519328a33b2/packages/astro/src/%40types/astro.ts#L872-L883) `) => void;`  
**Examples:** [`svelte`](https://github.com/withastro/astro/blob/main/packages/integrations/svelte/src/index.ts), [`react`](https://github.com/withastro/astro/blob/main/packages/integrations/react/src/index.ts), [`preact`](https://github.com/withastro/astro/blob/main/packages/integrations/preact/src/index.ts), [`vue`](https://github.com/withastro/astro/blob/main/packages/integrations/vue/src/index.ts), [`solid`](https://github.com/withastro/astro/blob/main/packages/integrations/solid/src/index.ts)

A callback function to add a component framework renderer (i.e. React, Vue, Svelte, etc). You can browse the examples and type definition above for more advanced options, but here are the 2 main options to be aware of:

*   `clientEntrypoint` - path to a file that executes on the client whenever your component is used. This is mainly for rendering or hydrating your component with JS.
*   `serverEntrypoint` - path to a file that executes during server-side requests or static builds whenever your component is used. These should render components to static markup, with hooks for hydration where applicable. [React’s `renderToString` callback](https://react.dev/reference/react-dom/server/renderToString) is a classic example.

**Added in:** `astro@5.0.0`

The functions `clientEntrypoint` and `serverEntrypoint` accept a `URL`.

#### `addWatchFile()` option

[Section titled addWatchFile() option](#addwatchfile-option)

**Type:** `(path: URL | string) => void`  

**Added in:** `astro@1.5.0`

If your integration depends on some configuration file that Vite doesn’t watch and/or needs a full dev server restart to take effect, add it with `addWatchFile`. Whenever that file changes, the Astro dev server will be reloaded (you can check when a reload happens with `isRestart`).

Example usage:

    // Must be an absolute path!addWatchFile('/home/user/.../my-config.json');addWatchFile(new URL('./ec.config.mjs', config.root));

#### `addClientDirective()` option

[Section titled addClientDirective() option](#addclientdirective-option)

**Type:** `(directive:` [`ClientDirectiveConfig`](https://github.com/withastro/astro/blob/00327c213f74627ac9ca1dec774efa5bf71e9375/packages/astro/src/%40types/astro.ts#L1872-L1875) `) => void;`  

**Added in:** `astro@2.6.0`

Adds a [custom client directive](/en/reference/directives-reference/#custom-client-directives) to be used in `.astro` files.

Note that directive entrypoints are only bundled through esbuild and should be kept small so they don’t slow down component hydration.

Example usage:

astro.config.mjs

    import { defineConfig } from 'astro/config';import clickDirective from './astro-click-directive/register.js'
    // https://astro.build/configexport default defineConfig({  integrations: [    clickDirective()  ],});

astro-click-directive/register.js

    /** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "client:click",  hooks: {    "astro:config:setup": ({ addClientDirective }) => {      addClientDirective({        name: "click",        entrypoint: "./astro-click-directive/click.js",      });    },  },});

astro-click-directive/click.js

    /** * Hydrate on first click on the window * @type {import('astro').ClientDirective} */export default (load, opts, el) => {  window.addEventListener('click', async () => {    const hydrate = await load()    await hydrate()  }, { once: true })}

You can also add types for the directives in your library’s type definition file:

astro-click-directive/index.d.ts

    import 'astro'declare module 'astro' {  interface AstroClientDirectives {    'client:click'?: boolean  }}

#### `addDevToolbarApp()` option

[Section titled addDevToolbarApp() option](#adddevtoolbarapp-option)

**Type:** `(entrypoint: DevToolbarAppEntry) => void;`  

**Added in:** `astro@3.4.0`

Adds a [custom dev toolbar app](/en/reference/dev-toolbar-app-reference/).

Example usage:

astro.config.mjs

    import { defineConfig } from 'astro/config';import devToolbarIntegration from './astro-dev-toolbar-app/integration.js'
    // https://astro.build/configexport default defineConfig({  integrations: [    devToolbarIntegration()  ],});

astro-dev-toolbar-app/integration.js

    /** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "dev-toolbar-app",  hooks: {    "astro:config:setup": ({ addDevToolbarApp }) => {      addDevToolbarApp({        entrypoint: "./astro-dev-toolbar-app/plugin.js",        id: "my-plugin",        name: "My Plugin"      });    },  },});

astro-dev-toolbar-app/plugin.js

    /** * @type {import('astro').DevToolbarApp} */export default {  id: "my-plugin",  name: "My Plugin",  icon: "<svg>...</svg>",  init() {    console.log("I'm a dev toolbar app!")  },};

#### `addMiddleware()` option

[Section titled addMiddleware() option](#addmiddleware-option)

**Type:** `(middleware:` [`AstroIntegrationMiddleware`](https://github.com/withastro/astro/blob/852ac0f75dfca1b2602e9cdbfa0447d9998e2449/packages/astro/src/%40types/astro.ts#L2124-L2127) `) => void;`  

**Added in:** `astro@3.5.0`

Adds [middleware](/en/guides/middleware/) to run on each request. Takes the `entrypoint` module that contains the middleware, and an `order` to specify whether it should run before (`pre`) other middleware or after (`post`).

@my-package/integration.js

    /** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "my-middleware-package",  hooks: {    "astro:config:setup": ({ addMiddleware }) => {      addMiddleware({        entrypoint: '@my-package/middleware',        order: 'pre'      });    },  },});

Middleware is defined in a package with an `onRequest` function, as with user-defined middleware.

@my-package/middleware.js

    import { defineMiddleware } from 'astro:middleware';
    export const onRequest = defineMiddleware(async (context, next) => {  if(context.url.pathname === '/some-test-path') {    return Response.json({      ok: true    });  }
      return next();});

**Added in:** `astro@5.0.0`

The function also accepts a `URL` for `entrypoint`:

@my-package/integration.js

    /** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "my-middleware-package",  hooks: {    "astro:config:setup": ({ addMiddleware }) => {      addMiddleware({        entrypoint: new URL('./middleware.js', import.meta.url),        order: 'pre'      });    },  },});

#### `injectRoute()` option

[Section titled injectRoute() option](#injectroute-option)

**Type:** `({ pattern: string; entrypoint: string | URL; prerender?: boolean }) => void;`

A callback function to inject routes into an Astro project. Injected routes can be [`.astro` pages](/en/basics/astro-pages/) or [`.js` and `.ts` route handlers](/en/guides/endpoints/#static-file-endpoints).

`injectRoute` takes an object with a `pattern` and an `entrypoint`.

*   `pattern` - where the route should be output in the browser, for example `/foo/bar`. A `pattern` can use Astro’s filepath syntax for denoting dynamic routes, for example `/foo/[bar]` or `/foo/[...bar]`. Note that a file extension is **not** needed in the `pattern`.
*   `entrypoint` - a bare module specifier pointing towards the `.astro` page or `.js`/`.ts` route handler that handles the route denoted in the `pattern`.
*   `prerender` - a boolean to set if Astro can’t detect your `prerender` export.

##### Example usage

[Section titled Example usage](#example-usage)

    injectRoute({  // Use Astro’s pattern syntax for dynamic routes.  pattern: '/subfolder/[dynamic]',  // Use relative path syntax for a local route.  entrypoint: './src/dynamic-page.astro',  // Use only if Astro can't detect your prerender export  prerender: false});

For an integration designed to be installed in other projects, use its package name to refer to the route entrypoint. The following example shows a package published to npm as `@fancy/dashboard` injecting a dashboard route:

    injectRoute({  pattern: '/fancy-dashboard',  entrypoint: '@fancy/dashboard/dashboard.astro'});

When publishing your package (`@fancy/dashboard`, in this case) to npm, you must export `dashboard.astro` in your `package.json`:

package.json

    {  "name": "@fancy/dashboard",  // ...  "exports": { "./dashboard.astro": "./dashboard.astro" }}

**Added in:** `astro@5.0.0`

The function also accepts a `URL` for `entrypoint`:

    injectRoute({  pattern: '/fancy-dashboard',  entrypoint: new URL('./dashboard.astro', import.meta.url)});

#### `injectScript()` option

[Section titled injectScript() option](#injectscript-option)

**Type:** `(stage: InjectedScriptStage, content: string) => void;`

A callback function to inject a string of JavaScript content onto every page.

The **`stage`** denotes how this script (the `content`) should be inserted. Some stages allow inserting scripts without modification, while others allow optimization during [Vite’s bundling step](https://vite.dev/guide/build.html):

*   `"head-inline"`: Injected into a script tag in the `<head>` of every page. **Not** optimized or resolved by Vite.
    
*   `"before-hydration"`: Imported client-side, before the hydration script runs. Optimized and resolved by Vite.
    
*   `"page"`: Similar to `head-inline`, except that the injected snippet is handled by Vite and bundled with any other `<script>` tags defined inside of Astro components on the page. The script will be loaded with a `<script type="module">` in the final page output, optimized and resolved by Vite.
    
*   `"page-ssr"`: Imported as a separate module in the frontmatter of every Astro page component. Because this stage imports your script, the `Astro` global is not available and your script will only be run once when the `import` is first evaluated.
    
    The main use for the `page-ssr` stage is injecting a CSS `import` into every page to be optimized and resolved by Vite:
    
        injectScript('page-ssr', 'import "global-styles.css";');
    

#### `createCodegenDir`

[Section titled createCodegenDir](#createcodegendir)

**Type:** `() => URL;`  

**Added in:** `astro@5.0.0`

A function that creates the `<root>/.astro/integrations/<normalized_integration_name>` folder and returns its path.

It allows you to have a dedicated folder, avoiding conflicts with another integration or Astro itself. This directory is created by calling this function so it’s safe to write files to it directly:

my-integration.ts

    import { writeFileSync } from 'node:fs'
    const integration = {  name: 'my-integration',  hooks: {    'astro:config:setup': ({ createCodegenDir }) => {      const codegenDir = createCodegenDir()      writeFileSync(new URL('cache.json', codegenDir), '{}', 'utf-8')    }  }}

### `astro:route:setup`

[Section titled astro:route:setup](#astroroutesetup)

**Added in:** `astro@4.14.0`

**Previous hook:** [`astro:config:setup`](#astroconfigsetup)

**Next hook:** [`astro:routes:resolved`](#astroroutesresolved)

**When:** In `astro build`, before bundling starts. In `astro dev`, while building the module graph and on every change to a file based route (added/removed/updated).

**Why:** To set options for a route at build or request time, such as enabling [on-demand server rendering](/en/guides/on-demand-rendering/#enabling-on-demand-rendering).

    'astro:route:setup'?: (options: {  route: RouteOptions;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `route` option

[Section titled route option](#route-option)

**Type:** [`RouteOptions`](https://github.com/withastro/astro/blob/3b10b97a4fecd1dfd959b160a07b5b8427fe40a7/packages/astro/src/types/public/integrations.ts#L14-L27)

An object with a `component` property to identify the route and the following additional values to allow you to configure the generated route: `prerender`.

##### `route.component`

[Section titled route.component](#routecomponent)

**Type:** `string`  

**Added in:** `astro@4.14.0`

The `component` property indicates the entrypoint that will be rendered on the route. You can access this value before the routes are built to configure on-demand server rendering for that page.

##### `route.prerender`

[Section titled route.prerender](#routeprerender)

**Type:** `boolean`  
**Default:** `undefined`  

**Added in:** `astro@4.14.0`

The `prerender` property is used to configure [on-demand server rendering](/en/guides/on-demand-rendering/#enabling-on-demand-rendering) for a route. If the route file contains an explicit `export const prerender` value, the value will be used as the default instead of `undefined`.

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  integrations: [setPrerender()],});
    function setPrerender() {  return {    name: 'set-prerender',    hooks: {      'astro:route:setup': ({ route }) => {        if (route.component.endsWith('/blog/[slug].astro')) {          route.prerender = true;        }      },    },  };}

If the final value after running all the hooks is `undefined`, the route will fall back to a prerender default based on the [`output` option](/en/reference/configuration-reference/#output): prerendered for `static` mode, and on-demand rendered for `server` mode.

### `astro:routes:resolved`

[Section titled astro:routes:resolved](#astroroutesresolved)

**Added in:** `astro@5.0.0`

**Previous hook:** [`astro:route:setup`](#astroroutesetup)

**Next hook:** [`astro:config:done`](#astroconfigdone) (only during setup)

**When:** In `astro dev`, it also runs on every change to a file based route (added/removed/updated).

**Why:** To access routes and their metadata

    'astro:routes:resolved'?: (options: {  routes: IntegrationResolvedRoute[];  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `routes` option

[Section titled routes option](#routes-option)

**Type:** [`IntegrationResolvedRoute[]`](#integrationresolvedroute-type-reference)

A list of all routes with their associated metadata.

Example use:

my-integration.mjs

    const integration = () => {  return {    name: 'my-integration',    hooks: {      'astro:routes:resolved': ({ routes }) => {        const projectRoutes = routes.filter(r => r.origin === 'project').map(r => r.pattern)
            console.log(projectRoutes)      },    }  }}

### `astro:config:done`

[Section titled astro:config:done](#astroconfigdone)

**Previous hook:** [`astro:routes:resolved`](#astroroutesresolved)

**Next hook:** [`astro:server:setup`](#astroserversetup) when running in “dev” mode, or [`astro:build:start`](#astrobuildstart) during production builds

**When:** After the Astro config has resolved and other integrations have run their `astro:config:setup` hooks.

**Why:** To retrieve the final config for use in other hooks.

    'astro:config:done'?: (options: {  config: AstroConfig;  setAdapter: (adapter: AstroAdapter) => void;  injectTypes: (injectedType: InjectedType) => URL;  logger: AstroIntegrationLogger;  buildOutput: 'static' | 'server';}) => void | Promise<void>;

#### `config` option

[Section titled config option](#config-option-1)

**Type:** `AstroConfig`

A read-only copy of the user-supplied [Astro config](/en/reference/configuration-reference/). This is resolved _after_ other integrations have run.

#### `setAdapter()` option

[Section titled setAdapter() option](#setadapter-option)

**Type:** `(adapter: AstroAdapter) => void;`

Makes the integration an adapter. Read more in the [adapter API](/en/reference/adapter-reference/).

#### `injectTypes()` option

[Section titled injectTypes() option](#injecttypes-option)

**Type:** `(injectedType: { filename: string; content: string }) => URL`  

**Added in:** `astro@4.14.0`

Allows you to inject types into your user’s project by adding a new `*.d.ts` file.

The `filename` property will be used to generate a file at `/.astro/integrations/<normalized_integration_name>/<normalized_filename>.d.ts` and must end with `".d.ts"`.

The `content` property will create the body of the file and must be valid TypeScript.

Additionally, `injectTypes()` returns a URL to the normalized path so you can overwrite its content later on, or manipulate it in any way you want.

    const path = injectTypes({  filename: "types.d.ts",  content: "declare module 'virtual:integration' {}"})console.log(path) // URL

#### `buildOutput` option

[Section titled buildOutput option](#buildoutput-option)

**Type:** `'static' | 'server'`  

**Added in:** `astro@5.0.0`

Allows you to adapt the logic of your integration depending on the user’s project output.

### `astro:server:setup`

[Section titled astro:server:setup](#astroserversetup)

**Previous hook:** [`astro:config:done`](#astroconfigdone)

**Next hook:** [`astro:server:start`](#astroserverstart)

**When:** Just after the Vite server is created in “dev” mode, but before the `listen()` event is fired. [See Vite’s createServer API](https://vite.dev/guide/api-javascript.html#createserver) for more.

**Why:** To update Vite server options and middleware, or enable support for refreshing the content layer.

    'astro:server:setup'?: (options: {  server: vite.ViteDevServer;  logger: AstroIntegrationLogger;  toolbar: ReturnType<typeof getToolbarServerCommunicationHelpers>;  refreshContent: (options: {    loaders?: Array<string>;    context?: Record<string, any>;  }) => Promise<void>;}) => void | Promise<void>;

#### `server` option

[Section titled server option](#server-option)

**Type:** [`ViteDevServer`](https://vite.dev/guide/api-javascript.html#vitedevserver)

A mutable instance of the Vite server used in “dev” mode. For instance, this is [used by our Partytown integration](/en/guides/integrations-guide/partytown/) to inject the Partytown server as middleware:

    export default {  name: 'partytown',  hooks: {    'astro:server:setup': ({ server }) => {      server.middlewares.use(        function middleware(req, res, next) {          // handle requests        }      );    }  }}

#### `toolbar` option

[Section titled toolbar option](#toolbar-option)

**Type:** `ReturnType<typeof getToolbarServerCommunicationHelpers>`  

**Added in:** `astro@4.7.0`

An object providing callback functions to interact with the [dev toolbar](/en/reference/dev-toolbar-app-reference/):

##### `on()`

[Section titled on()](#on)

**Type:** `<T>(event: string, callback: (data: T) => void) => void`  

A function that takes an event name as first argument and a callback function as second argument. This allows you to receive a message from a dev toolbar app with data associated to that event.

##### `onAppInitialized()`

[Section titled onAppInitialized()](#onappinitialized)

**Type:** `(appId: string, callback: (data: Record<string, never>) => void) => void`  

A function fired when a dev toolbar app is initialized. The first argument is the id of the app that was initialized. The second argument is a callback function to run when the app is initialized.

##### `onAppToggled()`

[Section titled onAppToggled()](#onapptoggled)

**Type:** `(appId: string, callback: (data: { state: boolean; }) => void) => void`  

A function fired when a dev toolbar app is toggled on or off. The first argument is the id of the app that was toggled. The second argument is a callback function providing the state to execute when the application is toggled.

##### `send()`

[Section titled send()](#send)

**Type:** `<T>(event: string, payload: T) => void`  

A function that sends a message to the dev toolbar that an app can listen for. This takes an event name as the first argument and a payload as the second argument which can be any serializable data.

#### `refreshContent()` option

[Section titled refreshContent() option](#refreshcontent-option)

**Type:** `(options: { loaders?: Array<string>; context?: Record<string, any>; }) => Promise<void>`  

**Added in:** `astro@5.0.0`

A function for integrations to trigger an update to the content layer during `astro dev`. This can be used, for example, to register a webhook endpoint during dev, or to open a socket to a CMS to listen for changes.

By default, `refreshContent` will refresh all collections. You can optionally pass a `loaders` property, which is an array of loader names. If provided, only collections that use those loaders will be refreshed. For example, A CMS integration could use this property to only refresh its own collections.

You can also pass a `context` object to the loaders. This can be used to pass arbitrary data such as the webhook body, or an event from the websocket.

my-integration.ts

    {  name: 'my-integration',  hooks: {    'astro:server:setup': async ({ server, refreshContent }) => {      // Register a dev server webhook endpoint      server.middlewares.use('/_refresh', async (req, res) => {        if(req.method !== 'POST') {          res.statusCode = 405          res.end('Method Not Allowed');          return        }        let body = '';        req.on('data', chunk => {          body += chunk.toString();        });        req.on('end', async () => {          try {            const webhookBody = JSON.parse(body);            await refreshContent({              context: { webhookBody },              loaders: ['my-loader']            });            res.writeHead(200, { 'Content-Type': 'application/json' });            res.end(JSON.stringify({ message: 'Content refreshed successfully' }));          } catch (error) {            res.writeHead(500, { 'Content-Type': 'application/json' });            res.end(JSON.stringify({ error: 'Failed to refresh content: ' + error.message }));          }        });      });    }  }}

The loader can then access the `refreshContextData` property to get the webhook body. See the [`refreshContextData`](/en/reference/content-loader-reference/#refreshcontextdata) property for more information.

### `astro:server:start`

[Section titled astro:server:start](#astroserverstart)

**Previous hook:** [`astro:server:setup`](#astroserversetup)

**Next hook:** [`astro:server:done`](#astroserverdone)

**When:** Just after the server’s `listen()` event has fired.

**Why:** To intercept network requests at the specified address. If you intend to use this address for middleware, consider using `astro:server:setup` instead.

    'astro:server:start'?: (options: {  address: AddressInfo;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `address` option

[Section titled address option](#address-option)

**Type:** [`AddressInfo`](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules__types_node_net_d_._net_.addressinfo.html)

The address, family and port number supplied by the [Node.js Net module](https://nodejs.org/api/net.html).

### `astro:server:done`

[Section titled astro:server:done](#astroserverdone)

**Previous hook:** [`astro:server:start`](#astroserverstart)

**When:** Just after the dev server is closed.

**Why:** To run any cleanup events you may trigger during the `astro:server:setup` or `astro:server:start` hooks.

    'astro:server:done'?: (options: {  logger: AstroIntegrationLogger;}) => void | Promise<void>;

### `astro:build:start`

[Section titled astro:build:start](#astrobuildstart)

**Previous hook:** [`astro:config:done`](#astroconfigdone)

**Next hook:** [`astro:build:setup`](#astrobuildsetup)

**When:** After the `astro:config:done` event, but before the production build begins.

**Why:** To set up any global objects or clients needed during a production build. This can also extend the build configuration options in the [adapter API](/en/reference/adapter-reference/).

    'astro:build:start'?: (options: {  logger: AstroIntegrationLogger;}) => void | Promise<void>;

### `astro:build:setup`

[Section titled astro:build:setup](#astrobuildsetup)

**Previous hook:** [`astro:build:start`](#astrobuildstart)

**Next hook:** [`astro:build:ssr`](#astrobuildssr)

**When:** After the `astro:build:start` hook, runs immediately before the build.

**Why:** At this point, the Vite config for the build has been completely constructed, this is your final chance to modify it. This can be useful for example to overwrite some defaults. If you’re not sure whether you should use this hook or `astro:build:start`, use `astro:build:start` instead.

    'astro:build:setup'?: (options: {  vite: vite.InlineConfig;  pages: Map<string, PageBuildData>;  target: 'client' | 'server';  updateConfig: (newConfig: vite.InlineConfig) => void;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `vite` option

[Section titled vite option](#vite-option)

**Type:** [`InlineConfig`](https://vite.dev/guide/api-javascript.html#inlineconfig)

An object that allows you to access the Vite configuration used in the build.

This can be useful if you need to access configuration options in your integration:

    export default {  name: 'my-integration',  hooks: {    'astro:build:setup': ({ vite }) => {      const { publicDir, root } = vite;    },  }}

#### `pages` option

[Section titled pages option](#pages-option)

**Type:** `Map<string, [PageBuildData](https://github.com/withastro/astro/blob/3b10b97a4fecd1dfd959b160a07b5b8427fe40a7/packages/astro/src/core/build/types.ts#L17-L23)>`

A `Map` with a list of pages as key and their build data as value.

This can be used to perform an action if a route matches a criteria:

    export default {  name: 'my-integration',  hooks: {    'astro:build:setup': ({ pages }) => {      pages.forEach((data) => {        if (data.route.pattern.test("/blog")) {          console.log(data.route.type);        }      });    },  }}

#### `target` option

[Section titled target option](#target-option)

**Type:** `'client' | 'server'`

Builds are separated in two distinct phases: `client` and `server`. This option allow you to determine the current build phase.

This can be used to perform an action only in a specific phase:

    export default {  name: 'my-integration',  hooks: {    'astro:build:setup': ({ target }) => {      if (target === "server") {        // do something in server build phase      }    },  }}

#### `updateConfig()` option

[Section titled updateConfig() option](#updateconfig-option-1)

**Type:** `(newConfig: [InlineConfig](https://vite.dev/guide/api-javascript.html#inlineconfig)) => void`

A callback function to update the [Vite](https://vite.dev/) options used in the build. Any config you provide **will be merged with the user config + other integration config updates**, so you are free to omit keys!

For example, this can be used to supply a plugin to the user’s project:

    import awesomeCssPlugin from 'awesome-css-vite-plugin';
    export default {  name: 'my-integration',  hooks: {    'astro:build:setup': ({ updateConfig }) => {      updateConfig({        plugins: [awesomeCssPlugin()],      })    }  }}

### `astro:build:ssr`

[Section titled astro:build:ssr](#astrobuildssr)

**Previous hook:** [`astro:build:setup`](#astrobuildsetup)

**Next hook:** [`astro:build:generated`](#astrobuildgenerated)

**When:** After a production SSR build has completed.

**Why:** To access the SSR manifest and map of the emitted entry points. This is useful when creating custom SSR builds in plugins or integrations.

*   `entryPoints` maps a page route to the physical file emitted after the build;
*   `middlewareEntryPoint` is the file system path of the middleware file;

    'astro:build:ssr'?: (options: {  manifest: SerializedSSRManifest;  entryPoints: Map<IntegrationRouteData, URL>;  middlewareEntryPoint: URL | undefined;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `manifest` option

[Section titled manifest option](#manifest-option)

**Type:** [`SerializedSSRManifest`](https://github.com/withastro/astro/blob/3b10b97a4fecd1dfd959b160a07b5b8427fe40a7/packages/astro/src/core/app/types.ts#L91-L109)

Allows you to create a custom build by accessing the SSR manifest.

    export default {  name: 'my-integration',  hooks: {    'astro:build:ssr': ({ manifest }) => {      const { i18n } = manifest;      if (i18n?.strategy === "domains-prefix-always") {        // do something      }    },  },}

#### `entryPoints` option

[Section titled entryPoints option](#entrypoints-option)

**Type:** `Map<[IntegrationRouteData](#integrationroutedata-type-reference), URL>`  

**Added in:** `astro@2.7.0`

A `Map` of the emitted entry points with the `IntegrationRouteData` as key and the physical file URL as value.

    export default {  name: 'my-integration',  hooks: {    'astro:build:ssr': ({ entryPoints }) => {      entryPoints.forEach((url) => {        console.log(url.href);      });    },  },}

#### `middlewareEntryPoint` option

[Section titled middlewareEntryPoint option](#middlewareentrypoint-option)

**Type:** `URL | undefined`  

**Added in:** `astro@2.8.0`

Exposes the [middleware](/en/guides/middleware/) file path.

    export default {  name: 'my-integration',  hooks: {    'astro:build:ssr': ({ middlewareEntryPoint }) => {      if (middlewareEntryPoint) {        // do some operations if a middleware exist      }    },  },}

### `astro:build:generated`

[Section titled astro:build:generated](#astrobuildgenerated)

**Added in:** `astro@1.3.0`

**Previous hook:** [`astro:build:ssr`](#astrobuildssr)

**Next hook:** [`astro:build:done`](#astrobuilddone)

**When:** After a static production build has finished generating routes and assets.

**Why:** To access generated routes and assets **before** build artifacts are cleaned up. This is a very uncommon use case. We recommend using [`astro:build:done`](#astrobuilddone) unless you really need to access the generated files before cleanup.

    'astro:build:generated'?: (options: {  dir: URL;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `dir` option

[Section titled dir option](#dir-option)

**Type:** [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)

A URL path to the build output directory. Note that if you need a valid absolute path string, you should use Node’s built-in [`fileURLToPath`](https://nodejs.org/api/url.html#urlfileurltopathurl-options) utility.

    import { fileURLToPath } from 'node:url';
    export default {  name: 'my-integration',  hooks: {    'astro:build:generated': ({ dir }) => {      const outFile = fileURLToPath(new URL('./my-integration.json', dir));    }  }}

### `astro:build:done`

[Section titled astro:build:done](#astrobuilddone)

**Previous hook:** [`astro:build:generated`](#astrobuildgenerated)

**When:** After a production build (SSG or SSR) has completed.

**Why:** To access generated routes and assets for extension (ex. copy content into the generated `/assets` directory). If you plan to transform generated assets, we recommend exploring the [Vite Plugin API](https://vite.dev/guide/api-plugin.html) and [configuring via `astro:config:setup`](#updateconfig-option) instead.

    'astro:build:done'?: (options: {  pages: { pathname: string }[];  dir: URL;  /** @deprecated Use the `assets` map and the new `astro:routes:resolved` hook */  routes: IntegrationRouteData[];  assets: Map<string, URL[]>;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `dir` option

[Section titled dir option](#dir-option-1)

**Type:** [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)

A URL path to the build output directory. Note that if you need a valid absolute path string, you should use Node’s built-in [`fileURLToPath`](https://nodejs.org/api/url.html#urlfileurltopathurl-options) utility.

    import { writeFile } from 'node:fs/promises';import { fileURLToPath } from 'node:url';
    export default function myIntegration() {  return {    hooks: {      'astro:build:done': async ({ dir }) => {        const metadata = await getIntegrationMetadata();        // Use fileURLToPath to get a valid, cross-platform absolute path string        const outFile = fileURLToPath(new URL('./my-integration.json', dir));        await writeFile(outFile, JSON.stringify(metadata));      }    }  }}

#### `routes` option

[Section titled routes option](#routes-option-1)

Caution

This property is deprecated since v5.0. Check the [migration guide](/en/guides/upgrade-to/v5/#deprecated-routes-on-astrobuilddone-hook-integration-api).

**Type:** [`IntegrationRouteData[]`](#integrationroutedata-type-reference)

A list of all generated routes alongside their associated metadata.

You can reference the full `IntegrationRouteData` type below, but the most common properties are:

*   `component` - the input file path relative to the project root
*   `pathname` - the output file URL (undefined for routes using `[dynamic]` and `[...spread]` params)

#### `assets` option

[Section titled assets option](#assets-option)

**Type:** `Map<string, URL[]>`  

**Added in:** `astro@5.0.0`

Contains URLs to output files paths, grouped by [`IntegrationResolvedRoute`](#integrationresolvedroute-type-reference) `pattern` property.

#### `pages` option

[Section titled pages option](#pages-option-1)

**Type:** `{ pathname: string }[]`

A list of all generated pages. It is an object with one property.

*   `pathname` - the finalized path of the page.

### Custom hooks

[Section titled Custom hooks](#custom-hooks)

Custom hooks can be added to integrations by extending the `IntegrationHooks` interface through [global augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation).

    declare global {  namespace Astro {    export interface IntegrationHook {      'your:hook': (params: YourHookParameters) => Promise<void>    }  }}

Astro reserves the `astro:` prefix for future built-in hooks. Please choose a different prefix when naming your custom hook.

Integration types reference
---------------------------

[Section titled Integration types reference](#integration-types-reference)

### `AstroIntegrationLogger`

[Section titled AstroIntegrationLogger](#astrointegrationlogger)

An instance of the Astro logger, useful to write logs. This logger uses the same [log level](/en/reference/cli-reference/#--verbose) configured via CLI.

**Methods available** to write to terminal:

*   `logger.info("Message")`;
*   `logger.warn("Message")`;
*   `logger.error("Message")`;
*   `logger.debug("Message")`;

All the messages are prepended with a label that has the same value as the name of the integration.

integration.ts

    import type { AstroIntegration } from "astro";export function formatIntegration(): AstroIntegration {  return {    name: "astro-format",    hooks: {      "astro:build:done": ({ logger }) => {        // do something        logger.info("Integration ready.");      }    }  }}

The example above will log a message that includes the provided `info` message:

Terminal window

    [astro-format] Integration ready.

To log some messages with a different label, use the `.fork` method to specify an alternative to the default `name`:

integration.ts

    import type { AstroIntegration } from "astro";export function formatIntegration(): AstroIntegration {  return {    name: "astro-format",    hooks: {      "astro:config:done": ({ logger }) => {        // do something        logger.info("Integration ready.");      },      "astro:build:done": ({ logger }) => {        const buildLogger = logger.fork("astro-format/build");        // do something        buildLogger.info("Build finished.")      }    }  }}

The example above will produce logs with `[astro-format]` by default, and `[astro-format/build]` when specified:

Terminal window

    [astro-format] Integration ready.[astro-format/build] Build finished.

### `HookParameters`

[Section titled HookParameters](#hookparameters)

You can get the type of a hook’s arguments by passing the hook’s name to the `HookParameters` utility type. In the following example, a function’s `options` argument is typed to match the parameters of the `astro:config:setup` hook:

    import type { HookParameters } from 'astro';
    function mySetup(options: HookParameters<'astro:config:setup'>) {  options.updateConfig({ /* ... */ });}

### `IntegrationResolvedRoute` type reference

[Section titled IntegrationResolvedRoute type reference](#integrationresolvedroute-type-reference)

    interface IntegrationResolvedRoute {  pattern: RouteData['route'];  patternRegex: RouteData['pattern'];  entrypoint: RouteData['component'];  isPrerendered: RouteData['prerender'];  redirectRoute?: IntegrationResolvedRoute;  generate: (data?: any) => string;  params: string[];  pathname?: string;  segments: RoutePart[][];  type: RouteType;  redirect?: RedirectConfig;  origin: 'internal' | 'external' | 'project';}

#### `pattern`

[Section titled pattern](#pattern)

**Type:** `string`

Allows you to identify the type of route based on its path. Here are some examples of paths associated with their pattern:

*   `src/pages/index.astro` will be `/`
*   `src/pages/blog/[...slug].astro` will be `/blog/[...slug]`
*   `src/pages/site/[blog]/[...slug].astro` will be `/site/[blog]/[...slug]`

#### `patternRegex`

[Section titled patternRegex](#patternregex)

**Type:** `RegExp`

Allows you to access a regex used for matching an input URL against a requested route.

For example, given a `[fruit]/about.astro` path, the regex will be `/^\/([^/]+?)\/about\/?$/`. Using `pattern.test("banana/about")` will return `true`.

#### `entrypoint`

[Section titled entrypoint](#entrypoint)

**Type:** `string`

The URL pathname of the source component.

#### `isPrerendered`

[Section titled isPrerendered](#isprerendered)

**Type:** `boolean`

Determines whether the route use [on demand rendering](/en/guides/on-demand-rendering/). The value will be `true` for projects configured with:

*   `output: 'static'` when the route does not export `const prerender = true`
*   `output: 'server'` when the route exports `const prerender = false`

#### `redirectRoute`

[Section titled redirectRoute](#redirectroute)

**Type:** `IntegrationResolvedRoute | undefined`

When the value of `IntegrationResolvedRoute.type` is `redirect`, the value will be the `IntegrationResolvedRoute` to redirect to. Otherwise, the value will be undefined.

#### `generate()`

[Section titled generate()](#generate)

**Type:** `(data?: any) => string`

A function that provides the optional parameters of the route, interpolates them with the route pattern, and returns the path name of the route.

For example, with a route such as `/blog/[...id].astro`, the `generate` function could return:

    console.log(generate({ id: 'presentation' })) // will log `/blog/presentation`

#### `params`

[Section titled params](#params)

**Type:** `string[]`

Allows you to access the route `params`. For example, when a project uses the following [dynamic routes](/en/guides/routing/#dynamic-routes) `/pages/[lang]/[...slug].astro`, the value will be `['lang', '...slug']`.

#### `pathname`

[Section titled pathname](#pathname)

**Type:** `string | undefined`

For regular routes, the value will be the URL pathname where this route will be served. When the project uses [dynamic routes](/en/guides/routing/#dynamic-routes) (ie. `[dynamic]` or `[...spread]`), the pathname will be undefined.

#### `segments`

[Section titled segments](#segments)

**Type:** `[RoutePart](https://github.com/withastro/astro/blob/3b10b97a4fecd1dfd959b160a07b5b8427fe40a7/packages/astro/src/types/public/internal.ts#L154-L158)[][]`

Allows you to access the route [`params`](#params) with additional metadata. Each object contains the following properties:

*   `content`: the `param` name,
*   `dynamic`: whether the route is dynamic or not,
*   `spread`: whether the dynamic route uses the spread syntax or not.

For example, the following route `/pages/[blog]/[...slug].astro` will output the segments:

    [  [ { content: 'pages', dynamic: false, spread: false } ],  [ { content: 'blog', dynamic: true, spread: false } ],  [ { content: '...slug', dynamic: true, spread: true } ]]

#### `type`

[Section titled type](#type)

**Type:** `RouteType`

Allows you to identify the type of route. Possible values are:

*   `page`: a route that lives in the file system, usually an Astro component
*   `endpoint`: a route that lives in the file system, usually a JS file that exposes endpoints methods
*   `redirect`: a route points to another route that lives in the file system
*   `fallback`: a route that doesn’t exist in the file system that needs to be handled with other means, usually the middleware

#### `redirect`

[Section titled redirect](#redirect)

**Type:** `[RedirectConfig](https://github.com/withastro/astro/blob/3b10b97a4fecd1dfd959b160a07b5b8427fe40a7/packages/astro/src/types/public/config.ts#L39-L44) | undefined`

Allows you to access the route to redirect to. This can be a string or an object containing information about the status code and its destination.

#### `origin`

[Section titled origin](#origin)

**Type:** `'internal' | 'external' | 'project'`

Determines if a route comes from Astro core (`internal`), an integration (`external`) or the user’s project (`project`).

### `IntegrationRouteData` type reference

[Section titled IntegrationRouteData type reference](#integrationroutedata-type-reference)

Caution

This type is deprecated since v5.0. Use [`IntegrationResolvedRoute`](#integrationresolvedroute-type-reference) instead.

A smaller version of the `RouteData` that is used in the integrations.

    interface IntegrationRouteData {  type: RouteType;  component: string;  pathname?: string;  pattern: RegExp;  params: string[];  segments: { content: string; dynamic: boolean; spread: boolean; }[][];  generate: (data?: any) => string;  prerender: boolean;  distURL?: URL[];  redirect?: RedirectConfig;  redirectRoute?: IntegrationRouteData;}

#### `type`

[Section titled type](#type-1)

**Type:** `RouteType`

Allows you to identify the type of the route. The value can be:

*   `page`: a route that lives in the file system, usually an Astro component
*   `endpoint`: a route that lives in the file system, usually a JS file that exposes endpoints methods
*   `redirect`: a route that points to another route that lives in the file system
*   `fallback`: a route that doesn’t exist in the file system and needs to be handled with other means, usually middleware

#### `component`

[Section titled component](#component)

**Type:** `string`

Allows you to access the source component URL pathname.

#### `pathname`

[Section titled pathname](#pathname-1)

**Type:** `string | undefined`

For regular routes, the value will be the URL pathname where this route will be served. When the project uses [dynamic routes](/en/guides/routing/#dynamic-routes) (ie. `[dynamic]` or `[...spread]`), the pathname will be undefined.

#### `pattern`

[Section titled pattern](#pattern-1)

**Type:** `RegExp`

Allows you to access a regex used for matching an input URL against a requested route.

For example, given a `[fruit]/about.astro` path, the regex will be `/^\/([^/]+?)\/about\/?$/`. Using `pattern.test("banana/about")` will return `true`.

#### `params`

[Section titled params](#params-1)

**Type:** `string[]`

Allows you to access the route `params`. For example, when a project uses the following [dynamic routes](/en/guides/routing/#dynamic-routes) `/pages/[lang]/[...slug].astro`, the value will be `['lang', '...slug']`.

#### `segments`

[Section titled segments](#segments-1)

**Type:** `{ content: string; dynamic: boolean; spread: boolean; }[][]`

Allows you to access the route [`params`](#params-1) with additional metadata. Each object contains the following properties:

*   `content`: the `param`,
*   `dynamic`: whether the route is dynamic or not,
*   `spread`: whether the dynamic route uses the spread syntax or not.

For example, the following route `/pages/[lang]/index.astro` will output the segments `[[ { content: 'lang', dynamic: true, spread: false } ]]`.

#### `generate()`

[Section titled generate()](#generate-1)

**Type:** `(data?: any) => string`

A function that provides the optional parameters of the route, interpolates them with the route pattern, and returns the path name of the route.

For example, with a route such as `/blog/[...id].astro`, the `generate` function could return:

    console.log(generate({ id: 'presentation' })) // will log `/blog/presentation`

#### `prerender`

[Section titled prerender](#prerender)

**Type:** `boolean`

Determines whether the route is prerendered or not.

#### `distURL`

[Section titled distURL](#disturl)

**Type:** `URL[] | undefined`

The paths of the physical files emitted by this route. When a route **isn’t** prerendered, the value is either `undefined` or an empty array.

#### `redirect`

[Section titled redirect](#redirect-1)

**Type:** `[RedirectConfig](https://github.com/withastro/astro/blob/3b10b97a4fecd1dfd959b160a07b5b8427fe40a7/packages/astro/src/types/public/config.ts#L39-L44) | undefined`

Allows you to access the route to redirect to. This can be a string or an object containing information about the status code and its destination.

#### `redirectRoute`

[Section titled redirectRoute](#redirectroute-1)

**Type:** `IntegrationRouteData | undefined`

When the value of `RouteData.type` is `redirect`, the value will contains the `IntegrationRouteData` of the route to redirect to. Otherwise, the value will be undefined.

Allow installation with `astro add`
-----------------------------------

[Section titled Allow installation with astro add](#allow-installation-with-astro-add)

[The `astro add` command](/en/reference/cli-reference/#astro-add) allows users to easily add integrations and adapters to their project. If you want _your_ integration to be installable with this tool, **add `astro-integration` to the `keywords` field in your `package.json`**:

    {  "name": "example",  "keywords": ["astro-integration"],}

Once you [publish your integration to npm](https://docs.npmjs.com/cli/v8/commands/npm-publish), running `astro add example` will install your package with any peer dependencies specified in your `package.json`. This will also apply your integration to the user’s `astro.config.*` like so:

astro.config.mjs

    import { defineConfig } from 'astro/config';import example from 'example';
    export default defineConfig({  integrations: [example()],})

Caution

This assumes your integration definition is 1) a `default` export and 2) a function. Ensure this is true before adding the `astro-integration` keyword!

Integration Ordering
--------------------

[Section titled Integration Ordering](#integration-ordering)

All integrations are run in the order that they are configured. For instance, for the array `[react(), svelte()]` in a user’s `astro.config.*`, `react` will run before `svelte`.

Your integration should ideally run in any order. If this isn’t possible, we recommend documenting that your integration needs to come first or last in your user’s `integrations` configuration array.

Combine integrations into presets
---------------------------------

[Section titled Combine integrations into presets](#combine-integrations-into-presets)

An integration can also be written as a collection of multiple, smaller integrations. We call these collections **presets.** Instead of creating a factory function that returns a single integration object, a preset returns an _array_ of integration objects. This is useful for building complex features out of multiple integrations.

    integrations: [  // Example: where examplePreset() returns: [integrationOne, integrationTwo, ...etc]  examplePreset()]

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   [Build your own Astro Integrations](https://www.freecodecamp.org/news/how-to-use-the-astro-ui-framework/#chapter-8-build-your-own-astro-integrations-1) - by Emmanuel Ohans on FreeCodeCamp
*   [Astro Integration Template](https://github.com/florian-lefebvre/astro-integration-template) - by Florian Lefebvre on GitHub

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/integrations-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
astro:transitions](/en/reference/modules/astro-transitions/) [Next  
Adapter API](/en/reference/adapter-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/legacy-flags
Legacy flags
============

To help some users migrate between versions of Astro, we occasionally introduce `legacy` flags.

These flags allow you to opt in to some deprecated or otherwise outdated behavior of Astro in the latest version, so that you can continue to upgrade and take advantage of new Astro releases until you are able to fully update your project code.

Collections
-----------

[Section titled Collections](#collections)

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@5.0.0`

Enable legacy behavior for content collections (as used in Astro v2 through v4)

astro.config.mjs

    import { defineConfig } from 'astro/config';export default defineConfig({  legacy: {    collections: true  }});

If enabled, `data` and `content` collections (only) are handled using the legacy content collections implementation. Collections with a `loader` (only) will continue to use the Content Layer API instead. Both kinds of collections may exist in the same project, each using their respective implementations.

The following limitations continue to exist:

*   Any legacy (`type: 'content'` or `type: 'data'`) collections must continue to be located in the `src/content/` directory.
*   These legacy collections will not be transformed to implicitly use the `glob()` loader, and will instead be handled by legacy code.
*   Collections using the Content Layer API (with a `loader` defined) are forbidden in `src/content/`, but may exist anywhere else in your project.

When you are ready to remove this flag and migrate to the new Content Layer API for your legacy collections, you must define a collection for any directories in `src/content/` that you want to continue to use as a collection. It is sufficient to declare an empty collection, and Astro will implicitly generate an appropriate definition for your legacy collections:

src/content/config.ts

    import { defineCollection, z } from 'astro:content';
    const blog = defineCollection({ })
    export const collections = { blog };

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/legacy-flags.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Markdown heading ID compatibility](/en/reference/experimental-flags/heading-id-compat/) [Next  
Error reference](/en/reference/error-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/modules
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





# Aggregated from ./pages/reference/programmatic-reference
Programmatic Astro API (experimental)
=====================================

If you need more control when running Astro, the `"astro"` package exports APIs to programmatically run the CLI commands.

These APIs are experimental and their API signature may change. Any updates will be mentioned in the [Astro changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) and the information below will always show the current, up-to-date information.

`AstroInlineConfig`
-------------------

[Section titled AstroInlineConfig](#astroinlineconfig)

The `AstroInlineConfig` type is used by all of the command APIs below. It extends from the user [Astro config](/en/reference/configuration-reference/) type:

    interface AstroInlineConfig extends AstroUserConfig {  configFile?: string | false;  mode?: string;  logLevel?: "debug" | "info" | "warn" | "error" | "silent";}

### `configFile`

[Section titled configFile](#configfile)

**Type:** `string | false`  
**Default:** `undefined`

A custom path to the Astro config file.

If this value is undefined (default) or unset, Astro will search for an `astro.config.(js,mjs,ts,mts)` file relative to the `root` and load the config file if found.

If a relative path is set, it will resolve based on the `root` option.

Set to `false` to disable loading any config files.

The inline config passed in this object will take highest priority when merging with the loaded user config.

### `mode`

[Section titled mode](#mode)

**Type:** `string`  
**Default:** `"development"` when running `astro dev`, `"production"` when running `astro build`  

**Added in:** `astro@5.0.0`

The mode used when developing or building your site (e.g. `"production"`, `"testing"`).

This value is passed to Vite using [the `--mode` flag](/en/reference/cli-reference/#--mode-string) when the `astro build` or `astro dev` commands are run to determine the value of `import.meta.env.MODE`. This also determines which `.env` files are loaded, and therefore the values of `astro:env`. See the [environment variables page](/en/guides/environment-variables/) for more details.

To output a development-based build, you can run `astro build` with the [`--devOutput` flag](/en/reference/cli-reference/#--devoutput).

### `logLevel`

[Section titled logLevel](#loglevel)

**Type:** `"debug" | "info" | "warn" | "error" | "silent"`  
**Default:** `"info"`

The logging level to filter messages logged by Astro.

*   `"debug"`: Log everything, including noisy debugging diagnostics.
*   `"info"`: Log informational messages, warnings, and errors.
*   `"warn"`: Log warnings and errors.
*   `"error"`: Log errors only.
*   `"silent"`: No logging.

`dev()`
-------

[Section titled dev()](#dev)

**Type:** `(inlineConfig: AstroInlineConfig) => Promise<DevServer>`

Similar to [`astro dev`](/en/reference/cli-reference/#astro-dev), it runs Astro’s development server.

    import { dev } from "astro";
    const devServer = await dev({  root: "./my-project",});
    // Stop the server if neededawait devServer.stop();

### `DevServer`

[Section titled DevServer](#devserver)

    export interface DevServer {  address: AddressInfo;  handle: (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => void;  watcher: vite.FSWatcher;  stop(): Promise<void>;}

#### `address`

[Section titled address](#address)

**Type:** `AddressInfo`

The address the dev server is listening on.

This property contains the value returned by Node’s [`net.Server#address()` method](https://nodejs.org/api/net.html#serveraddress).

#### `handle()`

[Section titled handle()](#handle)

**Type:** `(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => void`

A handle for raw Node HTTP requests. You can call `handle()` with an [`http.IncomingMessage`](https://nodejs.org/api/http.html#class-httpincomingmessage) and an [`http.ServerResponse`](https://nodejs.org/api/http.html#class-httpserverresponse) instead of sending a request through the network.

#### `watcher`

[Section titled watcher](#watcher)

**Type:** `vite.FSWatcher`

The [Chokidar file watcher](https://github.com/paulmillr/chokidar#getting-started) as exposed by [Vite’s development server](https://vite.dev/guide/api-javascript#vitedevserver).

#### `stop()`

[Section titled stop()](#stop)

**Type:** `Promise<void>`

Stops the development server. This closes all idle connections and stops listening for new connections.

Returns a `Promise` that resolves once all pending requests have been fulfilled and all idle connections have been closed.

`build()`
---------

[Section titled build()](#build)

**Type:** `(inlineConfig: AstroInlineConfig, options?: BuildOptions) => Promise<void>`

Similar to [`astro build`](/en/reference/cli-reference/#astro-build), it builds your site for deployment.

    import { build } from "astro";
    await build({  root: "./my-project",});

### `BuildOptions`

[Section titled BuildOptions](#buildoptions)

    export interface BuildOptions {  devOutput?: boolean;  teardownCompiler?: boolean;}

#### `devOutput`

[Section titled devOutput](#devoutput)

**Type:** `boolean`  
**Default:** `false`

**Added in:** `astro@5.4.0`

Output a development-based build similar to code transformed in `astro dev`. This can be useful to test build-only issues with additional debugging information included.

#### `teardownCompiler`

[Section titled teardownCompiler](#teardowncompiler)

**Type:** `boolean`  
**Default:** `true`

**Added in:** `astro@5.4.0`

Teardown the compiler WASM instance after build. This can improve performance when building once but may cause a performance hit if building multiple times in a row.

When building multiple projects in the same execution (e.g. during tests), disabling this option can greatly increase performance and reduce peak memory usage at the cost of higher sustained memory usage.

`preview()`
-----------

[Section titled preview()](#preview)

**Type:** `(inlineConfig: AstroInlineConfig) => Promise<PreviewServer>`

Similar to [`astro preview`](/en/reference/cli-reference/#astro-preview), it starts a local server to serve your build output.

If no adapter is set in the configuration, the preview server will only serve the built static files. If an adapter is set in the configuration, the preview server is provided by the adapter. Adapters are not required to provide a preview server, so this feature may not be available depending on your adapter of choice.

    import { preview } from "astro";
    const previewServer = await preview({  root: "./my-project",});
    // Stop the server if neededawait previewServer.stop();

### `PreviewServer`

[Section titled PreviewServer](#previewserver)

    export interface PreviewServer {  host?: string;  port: number;  closed(): Promise<void>;  stop(): Promise<void>;}

#### `host`

[Section titled host](#host)

**Type:** `string`

The host where the server is listening for connections.

Adapters are allowed to leave this field unset. The value of `host` is implementation-specific.

#### `port`

[Section titled port](#port)

**Type:** `number`

The port where the server is listening for connections.

#### `stop()`

[Section titled stop()](#stop-1)

**Type:** `Promise<void>`

Asks the preview server to close, stop accepting requests, and drop idle connections.

The returned `Promise` resolves when the close request has been sent. This does not mean that the server has closed yet. Use the [`closed()`](#closed) method if you need to ensure the server has fully closed.

#### `closed()`

[Section titled closed()](#closed)

**Type:** `Promise<void>`

Returns a `Promise` that will resolve once the server is closed and reject if an error happens on the server.

`sync()`
--------

[Section titled sync()](#sync)

**Type:** `(inlineConfig: AstroInlineConfig) => Promise<void>`

Similar to [`astro sync`](/en/reference/cli-reference/#astro-sync), it generates TypeScript types for all Astro modules.

    import { sync } from "astro";
    await sync({  root: "./my-project",});

`mergeConfig()`
---------------

[Section titled mergeConfig()](#mergeconfig)

**Type:** `<T extends AstroConfig | AstroInlineConfig>(config: T, overrides: DeepPartial<T>) => T`

**Added in:** `astro@5.4.0`

Imported from `astro/config`, merges a partial Astro configuration on top of an existing, valid, Astro configuration.

`mergeConfig()` accepts an Astro config object and a partial config (any set of valid Astro config options), and returns a valid Astro config combining both values such that:

*   Arrays are concatenated (including integrations and remark plugins).
*   Objects are merged recursively.
*   Vite options are merged using [Vite’s own `mergeConfig` function](https://vite.dev/guide/api-javascript#mergeconfig) with the default `isRoot` flag.
*   Options that can be provided as functions are wrapped into new functions that recursively merge the return values from both configurations with these same rules.
*   All other options override the existing config.

    import { mergeConfig } from "astro/config";
    mergeConfig(  {    output: 'static',    site: 'https://example.com',    integrations: [partytown()],    server: ({command}) => ({      port: command === 'dev' ? 4321 : 1234,    }),    build: {      client: './custom-client',    },  },  {    output: 'server',    base: '/astro',    integrations: [mdx()],    server: ({command}) => ({      host: command === 'dev' ? 'localhost' : 'site.localhost',    }),    build: {      server: './custom-server',    },  });
    // Result is equivalent to:{  output: 'server',  site: 'https://example.com',  base: '/astro',  integrations: [partytown(), mdx()],  server: ({command}) => ({    port: command === 'dev' ? 4321 : 1234,    host: command === 'dev' ? 'localhost' : 'site.localhost',  }),  build: {    client: './custom-client',    server: './custom-server',  },}

`validateConfig()`
------------------

[Section titled validateConfig()](#validateconfig)

**Type:** `(userConfig: any, root: string, cmd: string): Promise<AstroConfig>`

**Added in:** `astro@5.4.0`

Imported from `astro/config`, validates an object as if it was exported from `astro.config.mjs` and imported by Astro.

It takes the following arguments:

*   The configuration to be validated.
*   The root directory of the project.
*   The Astro command that is being executed (`build`, `dev`, `sync`, etc.)

The returned promise resolves to the validated configuration, filled with all default values appropriate for the given Astro command.

    import { validateConfig } from "astro/config";
    const config = await validateConfig({  integrations: [partytown()],}, "./my-project", "build");
    // defaults are appliedawait rm(config.outDir, { recursive: true, force: true });

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/programmatic-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Container API (experimental)](/en/reference/container-reference/) [Next  
Configuring experimental flags](/en/reference/experimental-flags/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/publish-to-npm
Publish to NPM
==============

Building a new Astro component? **Publish it to [npm!](https://npmjs.com/)**

Publishing an Astro component is a great way to reuse your existing work across your projects, and to share with the wider Astro community at large. Astro components can be published directly to and installed from NPM, just like any other JavaScript package.

Looking for inspiration? Check out some of our favorite [themes](https://astro.build/themes/) and [components](https://astro.build/integrations/) from the Astro community. You can also [search npm](https://www.npmjs.com/search?q=keywords:astro-component,withastro) to see the entire public catalog.

Don’t want to go it alone?

Check out [Astro Community’s component template](https://github.com/astro-community/component-template) for a community-supported, out-of-the-box template!

Quick Start
-----------

[Section titled Quick Start](#quick-start)

To get started developing your component quickly, you can use a template already set up for you.

Terminal window

    # Initialize the Astro Component template in a new directorynpm create astro@latest my-new-component-directory -- --template component# yarnyarn create astro my-new-component-directory --template component# pnpmpnpm create astro@latest my-new-component-directory -- --template component

Creating a package
------------------

[Section titled Creating a package](#creating-a-package)

Prerequisites

Before diving in, it will help to have a basic understanding of:

*   [Node Modules](https://docs.npmjs.com/creating-node-js-modules)
*   [Package Manifest (`package.json`)](https://docs.npmjs.com/creating-a-package-json-file)
*   [Workspaces](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#workspaces)

To create a new package, configure your development environment to use **workspaces** within your project. This will allow you to develop your component alongside a working copy of Astro.

*   Directorymy-new-component-directory/
    
    *   Directorydemo/
        
        *   … for testing and demonstration
        
    *   package.json
    *   Directorypackages/
        
        *   Directorymy-component/
            
            *   index.js
            *   package.json
            *   … additional files used by the package
            
        
    

This example, named `my-project`, creates a project with a single package, named `my-component`, and a `demo/` directory for testing and demonstrating the component.

This is configured in the project root’s `package.json` file:

    {  "name": "my-project",  "workspaces": ["demo", "packages/*"]}

In this example, multiple packages can be developed together from the `packages` directory. These packages can also be referenced from `demo`, where you can install a working copy of Astro.

Terminal window

    npm create astro@latest demo -- --template minimal# yarnyarn create astro demo --template minimal# pnpmpnpm create astro@latest demo -- --template minimal

There are two initial files that will make up your individual package: `package.json` and `index.js`.

### `package.json`

[Section titled package.json](#packagejson)

The `package.json` in the package directory includes all of the information related to your package, including its description, dependencies, and any other package metadata.

    {  "name": "my-component",  "description": "Component description",  "version": "1.0.0",  "homepage": "https://github.com/owner/project#readme",  "type": "module",  "exports": {    ".": "./index.js",    "./astro": "./MyAstroComponent.astro",    "./react": "./MyReactComponent.jsx"  },  "files": ["index.js", "MyAstroComponent.astro", "MyReactComponent.jsx"],  "keywords": ["astro", "withastro", "astro-component", "...", "..."]}

#### `description`

[Section titled description](#description)

A short description of your component used to help others know what it does.

    {  "description": "An Astro Element Generator"}

#### `type`

[Section titled type](#type)

The module format used by Node.js and Astro to interpret your `index.js` files.

    {  "type": "module"}

Use `"type": "module"` so that your `index.js` can be used as an entrypoint with `import` and `export` .

#### `homepage`

[Section titled homepage](#homepage)

The url to the project homepage.

    {  "homepage": "https://github.com/owner/project#readme"}

This is a great way to direct users to an online demo, documentation, or homepage for your project.

#### `exports`

[Section titled exports](#exports)

The entry points of a package when imported by name.

    {  "exports": {    ".": "./index.js",    "./astro": "./MyAstroComponent.astro",    "./react": "./MyReactComponent.jsx"  }}

In this example, importing `my-component` would use `index.js`, while importing `my-component/astro` or `my-component/react` would use `MyAstroComponent.astro` or `MyReactComponent.jsx` respectively.

#### `files`

[Section titled files](#files)

An optional optimization to exclude unnecessary files from the bundle shipped to users via npm. Note that **only files listed here will be included in your package**, so if you add or change files necessary for your package to work, you must update this list accordingly.

    {  "files": ["index.js", "MyAstroComponent.astro", "MyReactComponent.jsx"]}

#### `keywords`

[Section titled keywords](#keywords)

An array of keywords relevant to your component, used to help others [find your component on npm](https://www.npmjs.com/search?q=keywords:astro-component,withastro) and in any other search catalogs.

Add `astro-component` or `withastro` as a special keyword to maximize its discoverability in the Astro ecosystem.

    {  "keywords": ["astro-component", "withastro", "... etc", "... etc"]}

Tip

Keywords are also used by our [integrations library](https://astro.build/integrations/)! [See below](#integrations-library) for a full list of keywords we look for in NPM.

* * *

### `index.js`

[Section titled index.js](#indexjs)

The main **package entrypoint** used whenever your package is imported.

    export { default as MyAstroComponent } from './MyAstroComponent.astro';
    export { default as MyReactComponent } from './MyReactComponent.jsx';

This allows you to package multiple components together into a single interface.

#### Example: Using Named Imports

[Section titled Example: Using Named Imports](#example-using-named-imports)

    ---import { MyAstroComponent } from 'my-component';import { MyReactComponent } from 'my-component';---<MyAstroComponent /><MyReactComponent />

#### Example: Using Namespace Imports

[Section titled Example: Using Namespace Imports](#example-using-namespace-imports)

    ---import * as Example from 'example-astro-component';---<Example.MyAstroComponent /><Example.MyReactComponent />

#### Example: Using Individual Imports

[Section titled Example: Using Individual Imports](#example-using-individual-imports)

    ---import MyAstroComponent from 'example-astro-component/astro';import MyReactComponent from 'example-astro-component/react';---<MyAstroComponent /><MyReactComponent />

* * *

Developing your package
-----------------------

[Section titled Developing your package](#developing-your-package)

Astro does not have a dedicated “package mode” for development. Instead, you should use a demo project to develop and test your package inside of your project. This can be a private website only used for development, or a public demo/documentation website for your package.

If you are extracting components from an existing project, you can even continue to use that project to develop your now-extracted components.

Testing your component
----------------------

[Section titled Testing your component](#testing-your-component)

Astro does not currently ship a test runner. _(If you are interested in helping out with this, [join us on Discord!](https://astro.build/chat))_

In the meantime, our current recommendation for testing is:

1.  Add a test `fixtures` directory to your `demo/src/pages` directory.
    
2.  Add a new page for every test that you’d like to run.
    
3.  Each page should include some different component usage that you’d like to test.
    
4.  Run `astro build` to build your fixtures, then compare the output of the `dist/__fixtures__/` directory to what you expected.
    
    *   Directorymy-project/demo/src/pages/\_\_fixtures\_\_/
        
        *   test-name-01.astro
        *   test-name-02.astro
        *   test-name-03.astro
        
    

Publishing your component
-------------------------

[Section titled Publishing your component](#publishing-your-component)

Once you have your package ready, you can publish it to npm using the `npm publish` command. If that fails, make sure that you have logged in via `npm login` and that your `package.json` is correct. If it succeeds, you’re done!

Notice that there was no `build` step for Astro packages. Any file type that Astro supports natively, such as `.astro`, `.ts`, `.jsx`, and `.css`, can be published directly without a build step.

If you need another file type that isn’t natively supported by Astro, add a build step to your package. This advanced exercise is left up to you.

Integrations Library
--------------------

[Section titled Integrations Library](#integrations-library)

Share your hard work by adding your integration to our [integrations library](https://astro.build/integrations/)!

Tip

Do you need some help building your integration, or just want to meet other integrations builders? We have a dedicated `#integrations` channel on our [Discord server](https://astro.build/chat). Come say hi!

### `package.json` data

[Section titled package.json data](#packagejson-data)

The library is automatically updated weekly, pulling in every package published to NPM with the `astro-component` or `withastro` keyword.

The integrations library reads the `name`, `description`, `repository`, and `homepage` data from your `package.json`.

Avatars are a great way to highlight your brand in the library! Once your package is published you can [file a GitHub issue](https://github.com/withastro/astro.build/issues/new/choose) with your avatar attached and we will add it to your listing.

Tip

Need to override the information our library reads from NPM? No problem! [File an issue](https://github.com/withastro/astro.build/issues/new/choose) with the updated information and we’ll make sure the custom `name`, `description`, or `homepage` is used instead.

### Categories

[Section titled Categories](#categories)

In addition to the required `astro-component` or `withastro` keyword, special keywords are also used to automatically organize packages. Including any of the keywords below will add your integration to the matching category in our integrations library.

category

keywords

Accessibility

`a11y`, `accessibility`

Adapters

`astro-adapter`

Analytics

`analytics`

CSS + UI

`css`, `ui`, `icon`, `icons`, `renderer`

Frameworks

`renderer`

Content Loaders

`astro-loader`

Images + Media

`media`, `image`, `images`, `video`, `audio`

Performance + SEO

`performance`, `perf`, `seo`, `optimization`

Dev Toolbar

`devtools`, `dev-overlay`, `dev-toolbar`

Utilities

`tooling`, `utils`, `utility`

Packages that don’t include any keyword matching a category will be shown as `Uncategorized`.

Share
-----

[Section titled Share](#share)

We encourage you to share your work, and we really do love seeing what our talented Astronauts create. Come and share what you create with us in our [Discord](https://astro.build/chat) or mention [@astrodotbuild](https://twitter.com/astrodotbuild) in a Tweet!

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/publish-to-npm.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Sitemap](/en/guides/integrations-guide/sitemap/) [Next  
Deployment overview](/en/guides/deploy/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/routing-reference
Routing Reference
=================

There is no separate routing configuration in Astro.

Every [supported page file](/en/basics/astro-pages/#supported-page-files) located within the special `src/pages/` directory creates a route. When the file name contains a [parameter](#params), a route can create multiple pages dynamically, otherwise it creates a single page.

By default, all Astro page routes and endpoints are generated and prerendered at build time. [On-demand server rendering](/en/guides/on-demand-rendering/) can be set for individual routes, or as the default.

`prerender`
-----------

[Section titled prerender](#prerender)

**Type:** `boolean`  
**Default:** `true` in static mode (default); `false` with `output: 'server'` configuration  

**Added in:** `astro@1.0.0`

A value exported from each individual route to determine whether or not it is prerendered.

By default, all pages and endpoints are prerendered and will be statically generated at build time. You can opt out of prerendering on one or more routes, and you can have both static and on-demand rendered routes in the same project.

### Per-page override

[Section titled Per-page override](#per-page-override)

You can override the default value to enable [on demand rendering](/en/guides/on-demand-rendering/) for an individual route by exporting `prerender` with the value `false` from that file:

src/pages/rendered-on-demand.astro

    ---export const prerender = false---<!-- server-rendered content --><!-- the rest of my site is static -->

### Switch to `server` mode

[Section titled Switch to server mode](#switch-to-server-mode)

You can override the default value for all routes by configuring [`output: 'server'`](/en/reference/configuration-reference/#output). In this output mode, all pages and endpoints will be generated on the server upon request by default instead of being prerendered.

In `server` mode, enable prerendering for an individual route by exporting `prerender` with the value `true` from that file:

src/pages/static-about-page.astro

    ---// with `output: 'server'` configuredexport const prerender = true---<!-- My static about page --><!-- All other pages are rendered on demand -->

`partial`
---------

[Section titled partial](#partial)

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@3.4.0`

A value exported from an individual route to determine whether or not it should be rendered as a full HTML page.

By default, all files located within the reserved `src/pages/` directory automatically include the `<!DOCTYPE html>` declaration and additional `<head>` content such as Astro’s scoped styles and scripts.

You can override the default value to designate the content as a [page partial](/en/basics/astro-pages/#page-partials) for an individual route by exporting a value for `partial` from that file:

src/pages/my-page-partial.astro

    ---export const partial = true---<!-- Generated HTML available at a URL --><!-- Available to a rendering library -->

The `export const partial` must be identifiable statically. It can have the value of:

*   The boolean **`true`**.
*   An environment variable using import.meta.env such as `import.meta.env.USE_PARTIALS`.

`getStaticPaths()`
------------------

[Section titled getStaticPaths()](#getstaticpaths)

**Type:** `(options: GetStaticPathsOptions) => Promise<GetStaticPathsResult> | GetStaticPathsResult`  

**Added in:** `astro@1.0.0`

A function to generate multiple, prerendered page routes from a single `.astro` page component with one or more [parameters](#params) in its file path. Use this for routes that will be created at build time, also known as static site building.

The `getStaticPaths()` function must return an array of objects to determine which URL paths will be prerendered by Astro. Each object must include a `params` object, to specify route paths. The object may optionally contain a `props` object with [data to be passed](#data-passing-with-props) to each page template.

src/pages/blog/\[post\].astro

    ---// In 'server' mode, opt in to prerendering:// export const prerender = true
    export async function getStaticPaths() {  return [    // { params: { /* required */ }, props: { /* optional */ } },    { params: { post: '1' } }, // [post] is the parameter    { params: { post: '2' } }, // must match the file name    // ...  ];}---<!-- Your HTML template here. -->

`getStaticPaths()` can also be used in static file endpoints for [dynamic routing](/en/guides/endpoints/#params-and-dynamic-routing).

Tip

When using TypeScript, use the [`GetStaticPaths`](/en/guides/typescript/#infer-getstaticpaths-types) type utility to ensure type-safe access of your `params` and `props`.

Caution

The `getStaticPaths()` function executes in its own isolated scope once, before any page loads. Therefore you can’t reference anything from its parent scope, other than file imports. The compiler will warn you if you break this requirement.

### `params`

[Section titled params](#params)

The `params` key of each object in the array returned by `getStaticPaths()` tells Astro what routes to build.

The keys in `params` must match the parameters defined in your component file path. The value for each `params` object must match the parameters used in the page name. `params` are encoded into the URL, so only strings are supported as values.

For example,`src/pages/posts/[id].astro`has an `id` parameter in its file name. The following `getStaticPaths()` function in this `.astro` component tells Astro to statically generate `posts/1`, `posts/2`, and `posts/3` at build time.

src/pages/posts/\[id\].astro

    ---export async function getStaticPaths() {  return [    { params: { id: '1' } },    { params: { id: '2' } },    { params: { id: '3' } }  ];}
    const { id } = Astro.params;---<h1>{id}</h1>

### Data passing with `props`

[Section titled Data passing with props](#data-passing-with-props)

To pass additional data to each generated page, you can set a `props` value on each object in the array returned by `getStaticPaths()`. Unlike `params`, `props` are not encoded into the URL and so aren’t limited to only strings.

For example, if you generate pages with data fetched from a remote API, you can pass the full data object to the page component inside of `getStaticPaths()`. The page template can reference the data from each post using `Astro.props`.

src/pages/posts/\[id\].astro

    ---export async function getStaticPaths() {  const response = await fetch('...');  const data = await response.json();
      return data.map((post) => {    return {      params: { id: post.id },      props: { post },    };  });}
    const { id } = Astro.params;const { post } = Astro.props;---<h1>{id}: {post.name}</h1>

### `paginate()`

[Section titled paginate()](#paginate)

**Added in:** `astro@1.0.0`

A function that can be returned from [`getStaticPaths()`](#getstaticpaths) to divide a collection of content items into separate pages.

`paginate()` will automatically generate the necessary array to return from `getStaticPaths()` to create one URL for every page of your paginated collection. The page number will be passed as a `param`, and the page data will be passed as a `page` prop.

The following example fetches and passes 150 items to the `paginate` function, and creates static, prerendered pages at build time that will display 10 items per page:

src/pages/pokemon/\[page\].astro

    ---export async function getStaticPaths({ paginate }) {  // Load your data with fetch(), getCollection(), etc.  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);  const result = await response.json();  const allPokemon = result.results;
      // Return a paginated collection of paths for all items  return paginate(allPokemon, { pageSize: 10 });}
    const { page } = Astro.props;---

`paginate()` has the following arguments:

*   `data` - array containing the page’s data passed to the `paginate()` function
*   `options` - Optional object with the following properties:
    *   `pageSize` - The number of items shown per page (`10` by default)
    *   `params` - Send additional parameters for creating dynamic routes
    *   `props` - Send additional props to be available on each page

`paginate()` assumes a file name of `[page].astro` or `[...page].astro`. The `page` param becomes the page number in your URL:

*   `/posts/[page].astro` would generate the URLs `/posts/1`, `/posts/2`, `/posts/3`, etc.
*   `/posts/[...page].astro` would generate the URLs `/posts`, `/posts/2`, `/posts/3`, etc.

#### The pagination `page` prop

[Section titled The pagination page prop](#the-pagination-page-prop)

**Type:** `Page<TData>`

Pagination will pass a `page` prop to every rendered page that represents a single page of data in the paginated collection. This includes the data that you’ve paginated (`page.data`) as well as metadata for the page (`page.url`, `page.start`, `page.end`, `page.total`, etc). This metadata is useful for things like a “Next Page” button or a “Showing 1-10 of 100” message.

##### `page.data`

[Section titled page.data](#pagedata)

**Type:** `Array<TData>`

Array of data returned from the `paginate()` function for the current page.

##### `page.start`

[Section titled page.start](#pagestart)

**Type:** `number`

Index of the first item on the current page, starting at `0`. (e.g. if `pageSize: 25`, this would be `0` on page 1, `25` on page 2, etc.)

##### `page.end`

[Section titled page.end](#pageend)

**Type:** `number`

Index of the last item on the current page.

##### `page.size`

[Section titled page.size](#pagesize)

**Type:** `number`  
**Default:** `10`

The total number of items per page.

##### `page.total`

[Section titled page.total](#pagetotal)

**Type:** `number`

The total number of items across all pages.

##### `page.currentPage`

[Section titled page.currentPage](#pagecurrentpage)

**Type:** `number`

The current page number, starting with `1`.

##### `page.lastPage`

[Section titled page.lastPage](#pagelastpage)

**Type:** `number`

The total number of pages.

##### `page.url.current`

[Section titled page.url.current](#pageurlcurrent)

**Type:** `string`

Get the URL of the current page (useful for canonical URLs). If a value is set for [`base`](/en/reference/configuration-reference/#base), the URL starts with that value.

##### `page.url.prev`

[Section titled page.url.prev](#pageurlprev)

**Type:** `string | undefined`

Get the URL of the previous page (will be `undefined` if on page 1). If a value is set for [`base`](/en/reference/configuration-reference/#base), prepend the base path to the URL.

##### `page.url.next`

[Section titled page.url.next](#pageurlnext)

**Type:** `string | undefined`

Get the URL of the next page (will be `undefined` if no more pages). If a value is set for [`base`](/en/reference/configuration-reference/#base), prepend the base path to the URL.

##### `page.url.first`

[Section titled page.url.first](#pageurlfirst)

**Type:** `string | undefined`  

**Added in:** `astro@4.12.0`

Get the URL of the first page (will be `undefined` if on page 1). If a value is set for [`base`](/en/reference/configuration-reference/#base), prepend the base path to the URL.

##### `page.url.last`

[Section titled page.url.last](#pageurllast)

**Type:** `string | undefined`  

**Added in:** `astro@4.12.0`

Get the URL of the last page (will be `undefined` if no more pages). If a value is set for [`base`](/en/reference/configuration-reference/#base), prepend the base path to the URL.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/routing-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Imports reference](/en/guides/imports/) [Next  
Render context](/en/reference/api-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



