@astrojs/ node
==============

v9.2.2 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/node/) [npm](https://www.npmjs.com/package/@astrojs/node) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/node/CHANGELOG.md)

This adapter allows Astro to deploy your [on-demand rendered routes and features](/en/guides/on-demand-rendering/) to Node targets, including [server islands](/en/guides/server-islands/), [actions](/en/guides/actions/), and [sessions](/en/guides/sessions/).

If you’re using Astro as a static site builder, you don’t need an adapter.

Why Astro Node.js
-----------------

[Section titled Why Astro Node.js](#why-astro-nodejs)

[Node.js](https://nodejs.org/en/) is a JavaScript runtime for server-side code. @astrojs/node can be used either in standalone mode or as middleware for other http servers, such as [Express](https://expressjs.com/).

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

Add the Node adapter to enable on-demand rendering in your Astro project with the `astro add` command. This will install `@astrojs/node` and make the appropriate changes to your `astro.config.*` file in one step.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3247)
*   [pnpm](#tab-panel-3248)
*   [Yarn](#tab-panel-3249)

Terminal window

    npx astro add node

Terminal window

    pnpm astro add node

Terminal window

    yarn astro add node

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Now, you can enable [on-demand rendering per page](/en/guides/on-demand-rendering/#enabling-on-demand-rendering), or set your build output configuration to `output: 'server'` to [server-render all your pages by default](/en/guides/on-demand-rendering/#server-mode).

### Manual Install

[Section titled Manual Install](#manual-install)

First, add the Node adapter to your project’s dependencies using your preferred package manager.

*   [npm](#tab-panel-3250)
*   [pnpm](#tab-panel-3251)
*   [Yarn](#tab-panel-3252)

Terminal window

    npm install @astrojs/node

Terminal window

    pnpm add @astrojs/node

Terminal window

    yarn add @astrojs/node

Then, add the adapter to your `astro.config.*` file:

astro.config.mjs

    import { defineConfig } from 'astro/config';import node from '@astrojs/node';
    export default defineConfig({  adapter: node({    mode: 'standalone',  }),});

Configuration
-------------

[Section titled Configuration](#configuration)

@astrojs/node can be configured by passing options into the adapter function. The following options are available:

### `mode`

[Section titled mode](#mode)

**Type:** `'middleware' | 'standalone'`  

Controls whether the adapter builds to `middleware` or `standalone` mode.

*   `middleware` mode allows the built output to be used as middleware for another Node.js server, like Express.js or Fastify.
*   `standalone` mode builds a server that automatically starts when the entry module is run. This allows you to more easily deploy your build to a host without needing additional code.

astro.config.mjs

    import { defineConfig } from 'astro/config';import node from '@astrojs/node';
    export default defineConfig({  adapter: node({    mode: 'middleware',  }),});

Usage
-----

[Section titled Usage](#usage)

First, [performing a build](/en/guides/deploy/#building-your-site-locally). Depending on which `mode` selected (see above) follow the appropriate steps below:

### Middleware

[Section titled Middleware](#middleware)

The server entrypoint is built to `./dist/server/entry.mjs` by default. This module exports a `handler` function that can be used with any framework that supports the Node `request` and `response` objects.

For example, with Express:

run-server.mjs

    import express from 'express';import { handler as ssrHandler } from './dist/server/entry.mjs';
    const app = express();// Change this based on your astro.config.mjs, `base` option.// They should match. The default value is "/".const base = '/';app.use(base, express.static('dist/client/'));app.use(ssrHandler);
    app.listen(8080);

Or, with Fastify (>4):

run-server.mjs

    import Fastify from 'fastify';import fastifyMiddie from '@fastify/middie';import fastifyStatic from '@fastify/static';import { fileURLToPath } from 'node:url';import { handler as ssrHandler } from './dist/server/entry.mjs';
    const app = Fastify({ logger: true });
    await app  .register(fastifyStatic, {    root: fileURLToPath(new URL('./dist/client', import.meta.url)),  })  .register(fastifyMiddie);app.use(ssrHandler);
    app.listen({ port: 8080 });

Additionally, you can also pass in an object to be accessed with `Astro.locals` or in Astro middleware:

run-server.mjs

    import express from 'express';import { handler as ssrHandler } from './dist/server/entry.mjs';
    const app = express();app.use(express.static('dist/client/'));app.use((req, res, next) => {  const locals = {    title: 'New title',  };
      ssrHandler(req, res, next, locals);});
    app.listen(8080);

Note that middleware mode does not do file serving. You’ll need to configure your HTTP framework to do that for you. By default the client assets are written to `./dist/client/`.

### Standalone

[Section titled Standalone](#standalone)

In standalone mode a server starts when the server entrypoint is run. By default it is built to `./dist/server/entry.mjs`. You can run it with:

Terminal window

    node ./dist/server/entry.mjs

For standalone mode the server handles file serving in addition to the page and API routes.

#### Custom host and port

[Section titled Custom host and port](#custom-host-and-port)

You can override the host and port the standalone server runs on by passing them as environment variables at runtime:

Terminal window

    HOST=0.0.0.0 PORT=4321 node ./dist/server/entry.mjs

#### HTTPS

[Section titled HTTPS](#https)

By default the standalone server uses HTTP. This works well if you have a proxy server in front of it that does HTTPS. If you need the standalone server to run HTTPS itself you need to provide your SSL key and certificate.

You can pass the path to your key and certification via the environment variables `SERVER_CERT_PATH` and `SERVER_KEY_PATH`. This is how you might pass them in bash:

Terminal window

    SERVER_KEY_PATH=./private/key.pem SERVER_CERT_PATH=./private/cert.pem node ./dist/server/entry.mjs

#### Runtime environment variables

[Section titled Runtime environment variables](#runtime-environment-variables)

If an `.env` file containing environment variables is present when the build process is run, these values will be hard-coded in the output, just as when generating a static website.

During the build, the runtime variables must be absent from the `.env` file, and you must provide Astro with every environment variable to expect at run-time: `VARIABLE_1=placeholder astro build`. This signals to Astro that the actual value will be available when the built application is run. The placeholder value will be ignored by the build process, and Astro will use the value provided at run-time.

In the case of multiple run-time variables, store them in a separate file (e.g. `.env.runtime`) from `.env`. Start the build with the following command:

Terminal window

    export $(cat .env.runtime) && astro build

#### Assets

[Section titled Assets](#assets)

In standalone mode, assets in your `dist/client/` folder are served via the standalone server. You might be deploying these assets to a CDN, in which case the server will never actually be serving them. But in some cases, such as intranet sites, it’s fine to serve static assets directly from the application server.

Assets in the `dist/client/_astro/` folder are the ones that Astro has built. These assets are all named with a hash and therefore can be given long cache headers. Internally the adapter adds this header for these assets:

    Cache-Control: public, max-age=31536000, immutable

Sessions
--------

[Section titled Sessions](#sessions)

The Astro [Sessions API](/en/guides/sessions/) allows you to easily store user data between requests. This can be used for things like user data and preferences, shopping carts, and authentication credentials. Unlike cookie storage, there are no size limits on the data, and it can be restored on different devices.

Astro uses the local filesystem for session storage when using the Node adapter. If you would prefer to use a different session storage driver, you can specify it in your Astro config. See [the `session` configuration reference](/en/reference/configuration-reference/#sessiondriver) for more details.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/node.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Netlify](/en/guides/integrations-guide/netlify/) [Next  
Vercel](/en/guides/integrations-guide/vercel/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

