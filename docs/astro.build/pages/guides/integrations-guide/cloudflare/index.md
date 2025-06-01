@astrojs/ cloudflare
====================

v12.5.3 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare/) [npm](https://www.npmjs.com/package/@astrojs/cloudflare) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare/CHANGELOG.md)

This adapter allows Astro to deploy your [on-demand rendered routes and features](/en/guides/on-demand-rendering/) to [Cloudflare](https://www.cloudflare.com/), including [server islands](/en/guides/server-islands/), [actions](/en/guides/actions/), and [sessions](/en/guides/sessions/).

If you’re using Astro as a static site builder, you don’t need an adapter.

Learn how to deploy your Astro site in our [Cloudflare deployment guide](/en/guides/deploy/cloudflare/).

Why Astro Cloudflare
--------------------

[Section titled Why Astro Cloudflare](#why-astro-cloudflare)

Cloudflare’s [Developer Platform](https://developers.cloudflare.com/) lets you develop full-stack applications with access to resources such as storage and AI, all deployed to a global edge network. This adapter builds your Astro project for deployment through Cloudflare.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

Add the Cloudflare adapter to enable server-rendering in your Astro project with the `astro add` command. This will install `@astrojs/cloudflare` and make the appropriate changes to your `astro.config.mjs` file in one step.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3202)
*   [pnpm](#tab-panel-3203)
*   [Yarn](#tab-panel-3204)

Terminal window

    npx astro add cloudflare

Terminal window

    pnpm astro add cloudflare

Terminal window

    yarn astro add cloudflare

Now, you can enable [on-demand rendering per page](/en/guides/on-demand-rendering/#enabling-on-demand-rendering), or set your build output configuration to `output: 'server'` to [server-render all your pages by default](/en/guides/on-demand-rendering/#server-mode).

### Manual Install

[Section titled Manual Install](#manual-install)

First, add the `@astrojs/cloudflare` adapter to your project’s dependencies using your preferred package manager.

*   [npm](#tab-panel-3205)
*   [pnpm](#tab-panel-3206)
*   [Yarn](#tab-panel-3207)

Terminal window

    npm install @astrojs/cloudflare

Terminal window

    pnpm add @astrojs/cloudflare

Terminal window

    yarn add @astrojs/cloudflare

Then, add the adapter to your `astro.config.mjs` file:

astro.config.mjs

    import { defineConfig } from 'astro/config';import cloudflare from '@astrojs/cloudflare';
    export default defineConfig({  adapter: cloudflare(),});

Options
-------

[Section titled Options](#options)

The Cloudflare adapter accepts the following options:

### `cloudflareModules`

[Section titled cloudflareModules](#cloudflaremodules)

**Type:** `boolean`  
**Default:** `true`

Enables [imports of `.wasm`, `.bin`, and `.txt` modules](#cloudflare-module-imports).

This functionality is enabled by default. If you’d like to disable, set `cloudflareModules` to `false`.

### `imageService`

[Section titled imageService](#imageservice)

**Type:** `'passthrough' | 'cloudflare' | 'compile' | 'custom'`  
**Default:** `'compile'`

Determines which image service is used by the adapter. The adapter will default to `compile` mode when an incompatible image service is configured. Otherwise, it will use the globally configured image service:

*   **`cloudflare`:** Uses the [Cloudflare Image Resizing](https://developers.cloudflare.com/images/image-resizing/) service.
*   **`passthrough`:** Uses the existing [`noop`](/en/guides/images/#configure-no-op-passthrough-service) service.
*   **`compile`:** Uses Astro’s default service (sharp), but only on pre-rendered routes at build time. For pages rendered on-demand, all `astro:assets` features are disabled.
*   **`custom`:** Always uses the image service configured in [Image Options](/en/reference/configuration-reference/#image-options). **This option will not check to see whether the configured image service works in Cloudflare’s `workerd` runtime.**

astro.config.mjs

    import { defineConfig } from "astro/config";import cloudflare from '@astrojs/cloudflare';
    export default defineConfig({  adapter: cloudflare({     imageService: 'cloudflare'  }),})

### `platformProxy`

[Section titled platformProxy](#platformproxy)

Determines whether and how the Cloudflare runtime is added to `astro dev`. It contains proxies to local `workerd` bindings and emulations of Cloudflare specific values, allowing the emulation of the runtime in the Node.js dev process. Read more about the [Cloudflare Runtime](#cloudflare-runtime).

Note

Proxies provided by this are a best effort emulation of the real production. Although they are designed to be as close as possible to the real thing, there might be a slight differences and inconsistencies between the two.

#### `platformProxy.enabled`

[Section titled platformProxy.enabled](#platformproxyenabled)

**Type:** `boolean`  
**Default:** `true`

Determines whether to enable the Cloudflare runtime in development mode.

#### `platformProxy.configPath`

[Section titled platformProxy.configPath](#platformproxyconfigpath)

**Type:** `string`  
**Default:** `undefined`

Defines the path to the Wrangler configuration file. If no value is set, it tracks `wrangler.toml`, `wrangler.json`, and `wrangler.jsonc` in the project root.

#### `platformProxy.environment`

[Section titled platformProxy.environment](#platformproxyenvironment)

**Type:** `string`  
**Default:** `undefined`

Sets the [Cloudflare environment](https://developers.cloudflare.com/workers/wrangler/environments/) to use. You must select an environment defined in the Wrangler configuration file, otherwise an error occurs.

#### `platformProxy.persist`

[Section titled platformProxy.persist](#platformproxypersist)

**Type:** `boolean | { path: string }`  
**Default:** `true`

Sets whether and where to save binding data locally to the file system.

*   If set to `true`, binding data is stored in `.wrangler/state/v3/`. It is the same as the default setting for wrangler.
*   If set to `false`, binding data is not stored in file system.
*   If set to `{ path: string }`, binding data is stored in the specified path.

Note

`wrangler`’s `--persist-to` option adds a sub directory called `v3` under the hood while the `@astrojs/cloudflare` `persist` property does not. For example, to reuse the same location as running `wrangler dev --persist-to ./my-directory`, you must specify: `persist: { path: "./my-directory/v3" }`.

The following configuration shows an example of enabling the Cloudflare runtime when running the development server, as well as using a `wrangler.json` config file. It also specifies a custom location for persisting data to the filesystem:

    import cloudflare from '@astrojs/cloudflare';import { defineConfig } from 'astro/config';
    export default defineConfig({  adapter: cloudflare({    platformProxy: {      enabled: true,      configPath: 'wrangler.json',      persist: {        path: './.cache/wrangler/v3'      },    },  }),});

### `routes.extend`

[Section titled routes.extend](#routesextend)

On Cloudflare Workers, this option is not applicable. Refer to [Routing on Cloudflare Workers](#routing-on-cloudflare-workers) for more information.

On Cloudflare Pages, this option allows you to add or exclude custom patterns (e.g. `/fonts/*`) to the generated `_routes.json` file that determines which routes are generated on-demand. This can be useful if you need to add route patterns which cannot be automatically generated, or exclude prerendered routes.

More information about the custom route patterns can be found in [Cloudflare’s routing docs](https://developers.cloudflare.com/pages/functions/routing/#functions-invocation-routes). Any routes specified are not automatically deduplicated and will be appended to the existing routes as is.

#### `routes.extend.include`

[Section titled routes.extend.include](#routesextendinclude)

**Type:** `{ pattern: string }[]`  
**Default:** `undefined`

Configures additional routes to be generated on demand by the Cloudflare adapter in the `routes.extend.include` array.

#### `routes.extend.exclude`

[Section titled routes.extend.exclude](#routesextendexclude)

**Type:** `{ pattern: string }[]`  
**Default:** `undefined`

Configures routes to be excluded from on-demand rendering in the `routes.extend.exclude` array. These routes will be prerendered and served statically instead, and will not invoke the server function. Additionally you can use this option to serve any static asset (e.g. images, fonts, css, js, html, txt, json, etc.) files directly without routing the request through the server function.

astro.config.mjs

    export default defineConfig({  adapter: cloudflare({    routes: {      extend: {        include: [{ pattern: '/static' }], // Route a prerended page to the server function for on-demand rendering        exclude: [{ pattern: '/pagefind/*' }], // Use Starlight's pagefind search, which is generated statically at build time      }    },  }),});

### `sessionKVBindingName`

[Section titled sessionKVBindingName](#sessionkvbindingname)

**Type:** `string`  
**Default:** `SESSION`

**Added in:** `astro@5.6.0`

The `sessionKVBindingName` option allows you to specify the name of the KV binding used for session storage. By default, this is set to `SESSION`, but you can change it to match your own KV binding name. See [Sessions](#sessions) for more information.

astro.config.mjs

    export default defineConfig({  adapter: cloudflare({    sessionKVBindingName: 'MY_SESSION_BINDING',  }),});

Cloudflare runtime
------------------

[Section titled Cloudflare runtime](#cloudflare-runtime)

### Usage

[Section titled Usage](#usage)

The Cloudflare runtime gives you access to environment variables and bindings to Cloudflare resources. The Cloudflare runtime uses bindings found in the `wrangler.toml`/`wrangler.json` configuration file.

You can access the bindings from `Astro.locals.runtime`:

src/pages/index.astro

    ---const { env } = Astro.locals.runtime;---

You can access the runtime from API endpoints through `context.locals`:

src/pages/api/someFile.js

    export function GET(context) {  const runtime = context.locals.runtime;
      return new Response('Some body');}

See the [list of all supported bindings](https://developers.cloudflare.com/workers/wrangler/api/#supported-bindings) in the Cloudflare documentation.

### Environment variables and secrets

[Section titled Environment variables and secrets](#environment-variables-and-secrets)

The Cloudflare runtime treats environment variables as a type of binding.

For example, you can define an [environment variable](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-wrangler) in `wrangler.json` as follows:

wrangler.json

    {  "vars" : {    "MY_VARIABLE": "test"  }}

Secrets are a special type of environment variable that allow you to attach encrypted text values to your Worker. They need to be defined differently to ensure they are not visible after you set them.

To define `secrets`, add them through the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) rather than in your Wrangler config file.

Terminal window

    npx wrangler secret put <KEY>

To set secrets for local development, you also need to add a `.dev.vars` file to the root of the Astro project:

.dev.vars

    DB_PASSWORD=myPassword

You can then access environment variables, including secrets, from the `env` object available from `Astro.locals.runtime`:

src/pages/index.astro

    ---const { env } = Astro.locals.runtime;const myVariable = env.MY_VARIABLE;const secret = env.DB_PASSWORD;---

Cloudflare environment variables and secrets are compatible with the [`astro:env` API](/en/guides/environment-variables/#type-safe-environment-variables).

### Typing

[Section titled Typing](#typing)

`wrangler` provides a `types` command to generate TypeScript types for the bindings. This allows you to type locals without the need to manually type them. Refer to the [Cloudflare documentation](https://developers.cloudflare.com/workers/wrangler/commands/#types) for more information.

Every time you change your configuration files (e.g. `wrangler.toml`, `.dev.vars`) you need to run `wrangler types`.

Note

You can create a pnpm script to run `wrangler types` automatically before other commands.

package.json

    {  "scripts": {    "dev": "wrangler types && astro dev",    "start": "wrangler types && astro dev",    "build": "wrangler types && astro check && astro build",    "preview": "wrangler types && astro preview",    "astro": "astro"  }}

You can type the `runtime` object using `Runtime`:

src/env.d.ts

    type Runtime = import('@astrojs/cloudflare').Runtime<Env>;
    declare namespace App {  interface Locals extends Runtime {    otherLocals: {      test: string;    };  }}

Cloudflare Platform
-------------------

[Section titled Cloudflare Platform](#cloudflare-platform)

### Headers

[Section titled Headers](#headers)

You can attach [custom headers](https://developers.cloudflare.com/pages/platform/headers/) to your responses by adding a `_headers` file in your Astro project’s `public/` folder. This file will be copied to your build output directory.

This is available on Cloudflare Workers and Pages.

### Assets

[Section titled Assets](#assets)

Assets built by Astro are all named with a hash and therefore can be given long cache headers. By default, Astro on Cloudflare will add such a header for these files.

### Redirects

[Section titled Redirects](#redirects)

You can declare [custom redirects](https://developers.cloudflare.com/pages/platform/redirects/) to redirect requests to a different URL. To do so, add a `_redirects` file in your Astro project’s `public/` folder. This file will be copied to your build output directory.

This is available on Cloudflare Workers and Pages.

### Routes

[Section titled Routes](#routes)

#### Routing on Cloudflare Workers

[Section titled Routing on Cloudflare Workers](#routing-on-cloudflare-workers)

Routing for static assets is based on the file structure in the build directory (e.g. `./dist`). If no match is found, this will fall back to the Worker for on-demand rendering. Read more about [static asset routing with Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/routing/).

Unlike [Cloudflare Pages](#routing-on-cloudflare-pages), with Workers, you do not need a `_routes.json` file.

Currently, the Cloudflare adapter always generates this file. To work around this, create a `.assetsignore` file in your `public/` folder, and add the following lines to it:

public/.assetsignore

    _worker.js_routes.json

#### Routing on Cloudflare Pages

[Section titled Routing on Cloudflare Pages](#routing-on-cloudflare-pages)

For Cloudflare Pages, [routing](https://developers.cloudflare.com/pages/platform/functions/routing/#functions-invocation-routes) uses a `_routes.json` file to determine which requests are routed to the server function and which are served as static assets. By default, a `_routes.json` file will be automatically generated for your project based on its files and configuration.

You can [specify additional routing patterns to follow](#routesextend) in your adapter config, or create your own custom `_routes.json` file to fully override the automatic generation.

Creating a custom `public/_routes.json` will override the automatic generation. See [Cloudflare’s documentation on creating a custom `_routes.json`](https://developers.cloudflare.com/pages/platform/functions/routing/#create-a-_routesjson-file) for more details.

Sessions
--------

[Section titled Sessions](#sessions)

The Astro [Sessions API](/en/guides/sessions/) allows you to easily store user data between requests. This can be used for things like user data and preferences, shopping carts, and authentication credentials. Unlike cookie storage, there are no size limits on the data, and it can be restored on different devices.

Astro automatically configures [Workers KV](https://developers.cloudflare.com/kv/) for session storage when using the Cloudflare adapter. Before using sessions, you need to create a KV namespace to store the data and configure a KV binding in your Wrangler config file. By default, Astro expects the KV binding to be named `SESSION`, but you can choose a different name if you prefer by setting the [`sessionKVBindingName`](#sessionkvbindingname) option in the adapter config.

1.  Create a KV namespace using the Wrangler CLI and make note of the ID of the new namespace:
    
    Terminal window
    
        npx wrangler kv namespace create "SESSION"
    
2.  Declare the KV namespace in your Wrangler config, setting the namespace ID to the one returned by the previous command:
    
    *   [wrangler.json](#tab-panel-3200)
    *   [wrangler.toml](#tab-panel-3201)
    
    wrangler.json
    
        {  "kv_namespaces": [    {      "binding": "SESSION",      "id": "<KV_NAMESPACE_ID>"    }  ]}
    
    wrangler.toml
    
        kv_namespaces = [  { binding = "SESSION", id = "<KV_NAMESPACE_ID>" }]
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
3.  You can then use sessions in your server code:
    
    src/components/CartButton.astro
    
        ---export const prerender = false;const cart = await Astro.session?.get('cart');---
        <a href="/checkout">🛒 {cart?.length ?? 0} items</a>
    

Note

Writes to Cloudflare KV are [eventually consistent](https://developers.cloudflare.com/kv/concepts/how-kv-works/#consistency) between regions. This means that changes are available immediately within the same region but may take up to 60 seconds to propagate globally. This won’t affect most users as they are unlikely to switch regions between requests, but it may be a consideration for some use cases, such as VPN users.

Cloudflare Module Imports
-------------------------

[Section titled Cloudflare Module Imports](#cloudflare-module-imports)

The Cloudflare `workerd` runtime supports imports of some [non-standard module types](https://developers.cloudflare.com/workers/wrangler/bundling/#including-non-javascript-modules). Most additional file types are also available in Astro:

*   `.wasm` or `.wasm?module`: exports a [`WebAssembly.Module`](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Module) that can then be instantiated
*   `.bin`: exports an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) of the raw binary contents of the file
*   `.txt`: exports a string of the file contents

All module types export a single default value. Modules can be imported both from server-side rendered pages, or from prerendered pages for static site generation.

The following is an example of importing a Wasm module that then responds to requests by adding the request’s number parameters together.

pages/add/\[a\]/\[b\].js

    // Import the WebAssembly moduleimport mod from '../util/add.wasm';
    // Instantiate first in order to use itconst addModule: any = new WebAssembly.Instance(mod);
    export async function GET(context) {  const a = Number.parseInt(context.params.a);  const b = Number.parseInt(context.params.b);  return new Response(`${addModule.exports.add(a, b)}`);}

While this example is trivial, Wasm can be used to accelerate computationally intensive operations which do not involve significant I/O such as embedding an image processing library, or embedding a small pre-indexed database for search over a read-only dataset.

Node.js compatibility
---------------------

[Section titled Node.js compatibility](#nodejs-compatibility)

Out of the box, Cloudflare does not support the Node.js runtime APIs. With some configuration, Cloudflare does support a subset of the Node.js runtime APIs. You can find supported Node.js runtime APIs in Cloudflare’s [documentation](https://developers.cloudflare.com/workers/runtime-apis/nodejs).

To use these APIs, your page or endpoint must be server-side rendered (not pre-rendered) and must use the `import {} from 'node:*'` import syntax.

pages/api/endpoint.js

    export const prerender = false;import { Buffer } from 'node:buffer';

You’ll also need to modify the `vite` configuration in your Astro config to allow for the `node:*` import syntax:

astro.config.mjs

    import {defineConfig} from "astro/config";import cloudflare from '@astrojs/cloudflare';
    export default defineConfig({  adapter: cloudflare({}),  vite: {    ssr: {      external: ['node:buffer'],    },  },})

Additionally, you’ll need to follow Cloudflare’s documentation on how to enable support. For detailed guidance, please refer to the [Cloudflare documentation on enabling Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/).

Package Compatibility Implications

If a project imports a package into the server that uses the Node.js runtime APIs, this can cause issues when deploying to Cloudflare. This issue arises with package that do not use the `node:*` import syntax. It is recommended that you contact the authors of the package to determine if the package supports the above import syntax. If the package does not support this, you may need to use a different package.

Preview with Wrangler
---------------------

[Section titled Preview with Wrangler](#preview-with-wrangler)

To use [`wrangler`](https://developers.cloudflare.com/workers/wrangler/) to run your application locally, update the preview script.

For Workers:

package.json

    "preview": "wrangler dev ./dist"

For Pages:

package.json

    "preview": "wrangler pages dev ./dist"

Developing with [`wrangler`](https://developers.cloudflare.com/workers/wrangler/) gives you access to [Cloudflare bindings](https://developers.cloudflare.com/pages/platform/functions/bindings), [environment variables](https://developers.cloudflare.com/pages/platform/functions/bindings/#environment-variables), and the [cf object](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties). Getting hot reloading of the Astro dev server to work with Wrangler might require custom setup. See [community examples](https://github.com/withastro/roadmap/discussions/590).

### Meaningful error messages

[Section titled Meaningful error messages](#meaningful-error-messages)

Currently, errors during running your application in Wrangler are not very useful, due to the minification of your code. For better debugging, you can add `vite.build.minify = false` setting to your `astro.config.mjs`.

astro.config.mjs

    export default defineConfig({  adapter: cloudflare(),  vite: {    build: {      minify: false,    },  },});

More integrations
-----------------

### Front-end frameworks

*   ![](/logos/alpine-js.svg)
    
    ### [@astrojs/alpinejs](/en/guides/integrations-guide/alpinejs/)
    
*   ![](/logos/preact.svg)
    
    ### [@astrojs/preact](/en/guides/integrations-guide/preact/)
    
*   ![](/logos/react.svg)
    
    ### [@astrojs/react](/en/guides/integrations-guide/react/)
    
*   ![](/logos/solid.svg)
    
    ### [@astrojs/solid⁠-⁠js](/en/guides/integrations-guide/solid-js/)
    
*   ![](/logos/svelte.svg)
    
    ### [@astrojs/svelte](/en/guides/integrations-guide/svelte/)
    
*   ![](/logos/vue.svg)
    
    ### [@astrojs/vue](/en/guides/integrations-guide/vue/)
    

### Adapters

*   ![](/logos/cloudflare-pages.svg)
    
    ### [@astrojs/cloudflare](/en/guides/integrations-guide/cloudflare/)
    
*   ![](/logos/netlify.svg)
    
    ### [@astrojs/netlify](/en/guides/integrations-guide/netlify/)
    
*   ![](/logos/node.svg)
    
    ### [@astrojs/node](/en/guides/integrations-guide/node/)
    
*   ![](/logos/vercel.svg)
    
    ### [@astrojs/vercel](/en/guides/integrations-guide/vercel/)
    

### Other integrations

*   ![](/logos/db.svg)
    
    ### [@astrojs/db](/en/guides/integrations-guide/db/)
    
*   ![](/logos/markdoc.svg)
    
    ### [@astrojs/markdoc](/en/guides/integrations-guide/markdoc/)
    
*   ![](/logos/mdx.svg)
    
    ### [@astrojs/mdx](/en/guides/integrations-guide/mdx/)
    
*   ![](/logos/partytown.svg)
    
    ### [@astrojs/partytown](/en/guides/integrations-guide/partytown/)
    
*   ![](/logos/sitemap.svg)
    
    ### [@astrojs/sitemap](/en/guides/integrations-guide/sitemap/)
    

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/cloudflare.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Vue](/en/guides/integrations-guide/vue/) [Next  
Netlify](/en/guides/integrations-guide/netlify/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)