Using environment variables
===========================

Astro gives you access to [Vite’s built-in environment variables support](#vites-built-in-support) and includes some [default environment variables for your project](#default-environment-variables) that allow you to access configuration values for your current project (e.g. `site`, `base`), whether your project is running in development or production, and more.

Astro also provides a way to [use and organize your environment variables with type safety](#type-safe-environment-variables). It is available for use inside the Astro context (e.g. Astro components, routes and endpoints, UI framework components, middleware), and managed with [a schema in your Astro configuration](/en/reference/configuration-reference/#env).

Vite’s built-in support
-----------------------

[Section titled Vite’s built-in support](#vites-built-in-support)

Astro uses Vite’s built-in support for environment variables, which are statically replaced at build time, and lets you [use any of its methods](https://vite.dev/guide/env-and-mode.html) to work with them.

Note that while _all_ environment variables are available in server-side code, only environment variables prefixed with `PUBLIC_` are available in client-side code for security purposes.

.env

    SECRET_PASSWORD=password123PUBLIC_ANYBODY=there

In this example, `PUBLIC_ANYBODY` (accessible via `import.meta.env.PUBLIC_ANYBODY`) will be available in server or client code, while `SECRET_PASSWORD` (accessible via `import.meta.env.SECRET_PASSWORD`) will be server-side only.

Caution

`.env` files are not loaded inside [configuration files](#in-the-astro-config-file).

### IntelliSense for TypeScript

[Section titled IntelliSense for TypeScript](#intellisense-for-typescript)

By default, Astro provides a type definition for `import.meta.env` in `astro/client.d.ts`.

While you can define more custom env variables in `.env.[mode]` files, you may want to get TypeScript IntelliSense for user-defined env variables which are prefixed with `PUBLIC_`.

To achieve this, you can create an `env.d.ts` in `src/` and configure `ImportMetaEnv` like this:

src/env.d.ts

    interface ImportMetaEnv {  readonly DB_PASSWORD: string;  readonly PUBLIC_POKEAPI: string;  // more env variables...}
    interface ImportMeta {  readonly env: ImportMetaEnv;}

Default environment variables
-----------------------------

[Section titled Default environment variables](#default-environment-variables)

Astro includes a few environment variables out of the box:

*   `import.meta.env.MODE`: The mode your site is running in. This is `development` when running `astro dev` and `production` when running `astro build`.
*   `import.meta.env.PROD`: `true` if your site is running in production; `false` otherwise.
*   `import.meta.env.DEV`: `true` if your site is running in development; `false` otherwise. Always the opposite of `import.meta.env.PROD`.
*   `import.meta.env.BASE_URL`: The base URL your site is being served from. This is determined by the [`base` config option](/en/reference/configuration-reference/#base).
*   `import.meta.env.SITE`: This is set to [the `site` option](/en/reference/configuration-reference/#site) specified in your project’s `astro.config`.
*   `import.meta.env.ASSETS_PREFIX`: The prefix for Astro-generated asset links if the [`build.assetsPrefix` config option](/en/reference/configuration-reference/#buildassetsprefix) is set. This can be used to create asset links not handled by Astro.

Use them like any other environment variable.

    const isProd = import.meta.env.PROD;const isDev = import.meta.env.DEV;

Setting environment variables
-----------------------------

[Section titled Setting environment variables](#setting-environment-variables)

### `.env` files

[Section titled .env files](#env-files)

Environment variables can be loaded from `.env` files in your project directory.

Just create a `.env` file in the project directory and add some variables to it.

.env

    # This will only be available when run on the server!DB_PASSWORD="foobar"
    # This will be available everywhere!PUBLIC_POKEAPI="https://pokeapi.co/api/v2"

You can also add `.production`, `.development` or a custom mode name to the filename itself (e.g `.env.testing`, `.env.staging`). This allows you to use different sets of environment variables at different times.

The `astro dev` and `astro build` commands default to `"development"` and `"production"` modes, respectively. You can run these commands with the [`--mode` flag](/en/reference/cli-reference/#--mode-string) to pass a different value for `mode` and load the matching `.env` file.

This allows you to run the dev server or build your site connecting to different APIs:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-1711)
*   [pnpm](#tab-panel-1712)
*   [Yarn](#tab-panel-1713)

Terminal window

    # Run the dev server connected to a "staging" APInpm run astro dev -- --mode staging
    # Build a site that connects to a "production" API with additional debug informationnpm run astro build -- --devOutput
    # Build a site that connects to a "testing" APInpm run astro build -- --mode testing

Terminal window

    # Run the dev server connected to a "staging" APIpnpm astro dev --mode staging
    # Build a site that connects to a "production" API with additional debug informationpnpm astro build --devOutput
    # Build a site that connects to a "testing" APIpnpm astro build --mode testing

Terminal window

    # Run the dev server connected to a "staging" APIyarn astro dev --mode staging
    # Build a site that connects to a "production" API with additional debug informationyarn astro build --devOutput
    # Build a site that connects to a "testing" APIyarn astro build --mode testing

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

For more on `.env` files, [see the Vite documentation](https://vite.dev/guide/env-and-mode.html#env-files).

### In the Astro config file

[Section titled In the Astro config file](#in-the-astro-config-file)

Astro evaluates configuration files before it loads your other files. This means that you cannot use `import.meta.env` in `astro.config.mjs` to access environment variables that were set in `.env` files.

You can use `process.env` in a configuration file to access other environment variables, like those [set by the CLI](#using-the-cli).

You can also use [Vite’s `loadEnv` helper](https://main.vite.dev/config/#using-environment-variables-in-config) to manually load `.env` files.

astro.config.mjs

    import { loadEnv } from "vite";
    const { SECRET_PASSWORD } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

Note

`pnpm` does not allow you to import modules that are not directly installed in your project. If you are using `pnpm`, you will need to install `vite` to use the `loadEnv` helper.

Terminal window

    pnpm add -D vite

### Using the CLI

[Section titled Using the CLI](#using-the-cli)

You can also add environment variables as you run your project:

*   [npm](#tab-panel-1714)
*   [pnpm](#tab-panel-1715)
*   [Yarn](#tab-panel-1716)

Terminal window

    PUBLIC_POKEAPI=https://pokeapi.co/api/v2 npm run dev

Terminal window

    PUBLIC_POKEAPI=https://pokeapi.co/api/v2 pnpm run dev

Terminal window

    PUBLIC_POKEAPI=https://pokeapi.co/api/v2 yarn run dev

Getting environment variables
-----------------------------

[Section titled Getting environment variables](#getting-environment-variables)

Environment variables in Astro are accessed with `import.meta.env`, using the [`import.meta` feature added in ES2020](https://tc39.es/ecma262/2020/#prod-ImportMeta), instead of `process.env`.

For example, use `import.meta.env.PUBLIC_POKEAPI` to get the `PUBLIC_POKEAPI` environment variable.

    // When import.meta.env.SSR === trueconst data = await db(import.meta.env.DB_PASSWORD);
    // When import.meta.env.SSR === falseconst data = fetch(`${import.meta.env.PUBLIC_POKEAPI}/pokemon/squirtle`);

When using SSR, environment variables can be accessed at runtime based on the SSR adapter being used. With most adapters you can access environment variables with `process.env`, but some adapters work differently. For the Deno adapter, you will use `Deno.env.get()`. See how to [access the Cloudflare runtime](/en/guides/integrations-guide/cloudflare/#cloudflare-runtime) to handle environment variables when using the Cloudflare adapter. Astro will first check the server environment for variables, and if they don’t exist, Astro will look for them in `.env` files.

Type safe environment variables
-------------------------------

[Section titled Type safe environment variables](#type-safe-environment-variables)

The `astro:env` API lets you configure a type-safe schema for [environment variables you have set](#setting-environment-variables). This allows you to indicate whether they should be available on the server or the client, and define their data type and additional properties.

Developing an adapter? See how to [make an adapter compatible with `astro:env`](/en/reference/adapter-reference/#envgetsecret).

### Basic Usage

[Section titled Basic Usage](#basic-usage)

#### Define your schema

[Section titled Define your schema](#define-your-schema)

To configure a schema, add the `env.schema` option to your Astro config:

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({  env: {    schema: {      // ...    }  }})

You can then [register variables as a string, number, enum, or boolean](#data-types) using the `envField` helper. Define the [kind of environment variable](#variable-types) by providing a `context` (`"client"` or `"server"`) and `access` (`"secret"` or `"public"`) for each variable, and pass any additional properties such as `optional` or `default` in an object:

astro.config.mjs

    import { defineConfig, envField } from "astro/config";
    export default defineConfig({  env: {    schema: {      API_URL: envField.string({ context: "client", access: "public", optional: true }),      PORT: envField.number({ context: "server", access: "public", default: 4321 }),      API_SECRET: envField.string({ context: "server", access: "secret" }),    }  }})

Types will be generated for you when running `astro dev` or `astro build`, but you can run `astro sync` to generate types only.

#### Use variables from your schema

[Section titled Use variables from your schema](#use-variables-from-your-schema)

Import and use your defined variables from the appropriate `/client` or `/server` module:

    ---import { API_URL } from "astro:env/client";import { API_SECRET_TOKEN } from "astro:env/server";
    const data = await fetch(`${API_URL}/users`, {  method: "GET",  headers: {    "Content-Type": "application/json",    "Authorization": `Bearer ${API_SECRET_TOKEN}`  },})---
    <script>  import { API_URL } from "astro:env/client";
      fetch(`${API_URL}/ping`)</script>

### Variable types

[Section titled Variable types](#variable-types)

There are three kinds of environment variables, determined by the combination of `context` (`"client"` or `"server"`) and `access` (`"secret"` or `"public"`) settings defined in your schema:

*   **Public client variables**: These variables end up in both your final client and server bundles, and can be accessed from both client and server through the `astro:env/client` module:
    
        import { API_URL } from "astro:env/client";
    
*   **Public server variables**: These variables end up in your final server bundle and can be accessed on the server through the `astro:env/server` module:
    
        import { PORT } from "astro:env/server";
    
*   **Secret server variables**: These variables are not part of your final bundle and can be accessed on the server through the `astro:env/server` module:
    
        import { API_SECRET } from "astro:env/server";
    
    By default, secrets are only validated at runtime. You can enable validating private variables on start by [configuring `validateSecrets: true`](/en/reference/configuration-reference/#envvalidatesecrets).
    

Note

**Secret client variables** are not supported because there is no safe way to send this data to the client. Therefore, it is not possible to configure both `context: "client"` and `access: "secret"` in your schema.

### Data types

[Section titled Data types](#data-types)

There are currently four data types supported: strings, numbers, enums, and booleans:

    import { envField } from "astro/config";
    envField.string({   // context & access   optional: true,   default: "foo",})
    envField.number({   // context & access   optional: true,   default: 15,})
    envField.boolean({   // context & access   optional: true,   default: true,})
    envField.enum({   // context & access   values: ["foo", "bar", "baz"],   optional: true,   default: "baz",})

For a complete list of validation fields, see the [`envField` API reference](/en/reference/configuration-reference/#envschema).

### Retrieving secrets dynamically

[Section titled Retrieving secrets dynamically](#retrieving-secrets-dynamically)

Despite defining your schema, you may want to retrieve the raw value of a given secret or to retrieve secrets not defined in your schema. In this case, you can use `getSecret()` exported from `astro:env/server`:

    import {   FOO, // boolean   getSecret} from "astro:env/server";
    getSecret("FOO"); // string | undefined

Learn more in [the API reference](/en/reference/modules/astro-env/#getsecret).

### Limitations

[Section titled Limitations](#limitations)

`astro:env` is a virtual module which means it can only be used inside the Astro context. For example, you can use it in:

*   Middlewares
*   Astro routes and endpoints
*   Astro components
*   Framework components
*   Modules

You cannot use it in the following and will have to resort to `process.env`:

*   `astro.config.mjs`
*   Scripts

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/environment-variables.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
TypeScript](/en/guides/typescript/) [Next  
Dev toolbar](/en/guides/dev-toolbar/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

