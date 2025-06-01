Upgrade to Astro v3
===================

This guide will help you migrate from Astro v2 to Astro v3.

Need to upgrade an older project to v2? See our [older migration guide](/en/guides/upgrade-to/v2/).

Upgrade Astro
-------------

[Section titled Upgrade Astro](#upgrade-astro)

Update your project’s version of Astro to the latest version using your package manager. If you’re using Astro integrations, please also update those to the latest version.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3328)
*   [pnpm](#tab-panel-3329)
*   [Yarn](#tab-panel-3330)

Terminal window

    # Upgrade to Astro v3.xnpm install astro@latest
    # Example: upgrade React and Tailwind integrationsnpm install @astrojs/react@latest @astrojs/tailwind@latest

Terminal window

    # Upgrade to Astro v3.xpnpm add astro@latest
    # Example: upgrade React and Tailwind integrationspnpm add @astrojs/react@latest @astrojs/tailwind@latest

Terminal window

    # Upgrade to Astro v3.xyarn add astro@latest
    # Example: upgrade React and Tailwind integrationsyarn add @astrojs/react@latest @astrojs/tailwind@latest

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Need to continue?

After upgrading Astro to the latest version, you may not need to make any changes to your project at all!

But, if you notice errors or unexpected behavior, please check below for what has changed that might need updating in your project.

Astro v3.0 Experimental Flags Removed
-------------------------------------

[Section titled Astro v3.0 Experimental Flags Removed](#astro-v30-experimental-flags-removed)

Remove the following experimental flags from `astro.config.mjs`:

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  experimental: {    assets: true,    viewTransitions: true,  },})

These features are now available by default:

*   View Transitions for animated page transitions and persistent islands. See [view transitions API breaking changes and upgrading advice](#upgrade-view-transitions-to-v3) if you were using this experimental flag.
*   A new image services API `astro:assets` for using images in Astro, including a new `<Image />` component and `getImage()` function. Please read the detailed [image upgrade advice](#upgrade-images-to-v3) **whether or not you were using this experimental flag** to see how this might affect your project.

Read more about these two exciting features and more in [the 3.0 Blog post](https://astro.build/blog/astro-3/)!

Astro v3.0 Breaking Changes
---------------------------

[Section titled Astro v3.0 Breaking Changes](#astro-v30-breaking-changes)

Astro v3.0 includes some breaking changes, as well as the removal of some previously deprecated features. If your project doesn’t work as expected after upgrading to v3.0, check this guide for an overview of all breaking changes and instructions on how to update your codebase.

See [the changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) for full release notes.

### Removed: Support for Node 16

[Section titled Removed: Support for Node 16](#removed-support-for-node-16)

Node 16 is scheduled to reach its End of Life in September 2023.

Astro v3.0 drops Node 16 support entirely so that all Astro users can take advantage of Node’s more modern features.

#### What should I do?

[Section titled What should I do?](#what-should-i-do)

Check that both your development environment and your deployment environment are using **Node `18.14.1` or higher**.

1.  Check your local version of Node using:
    
    Terminal window
    
        node -v
    
2.  Check your [deployment environment’s](/en/guides/deploy/) own documentation to verify that they support Node 18.
    
    You can specify Node `18.14.1` for your Astro project either in a dashboard configuration setting or a `.nvmrc` file.
    
    .nvmrc
    
        18.14.1
    

### Removed: Support for TypeScript 4

[Section titled Removed: Support for TypeScript 4](#removed-support-for-typescript-4)

In Astro v2.x, the `tsconfig.json` presets include support for both TypeScript 4.x and 5.x.

Astro v3.0 updates the `tsconfig.json` presets to only support TypeScript 5.x. Astro now assumes that you use TypeScript 5.0 (March 2023), or that your editor includes it (e.g. VS Code 1.77).

#### What should I do?

[Section titled What should I do?](#what-should-i-do-1)

If you have installed TypeScript locally, update to at least v5.0.

Terminal window

    npm install typescript@latest --save-dev

### Removed: `@astrojs/image`

[Section titled Removed: @astrojs/image](#removed-astrojsimage)

In Astro v2.x, Astro offered an official image integration that included Astro `<Image />` and `<Picture />` components.

Astro v3.0 removes this integration from the codebase entirely. Astro’s new solution for images is a built-in image services API: `astro:assets`.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-2)

Remove the `@astrojs/image` integration from your project. You will need to not only uninstall the integration but also update or remove any import statements and existing `<Image />` and `<Picture />` components. You might also need to configure a preferred default image processing service.

You will find [complete, step-by-step instructions for removing the old image integration](#remove-astrojsimage) in our Images guide.

Migrating to `astro:assets` will also bring some new image options and features that you may now wish to use. Please see the full [v3.0 Image Upgrade Advice](#upgrade-images-to-v3) for full details!

astro.config.mjs

    import { defineConfig } from 'astro/config';import image from '@astrojs/image';
    export default defineConfig({  integrations: [    image(),  ]})

### Removed: `<Markdown />` component

[Section titled Removed: &lt;Markdown /&gt; component](#removed-markdown--component)

In Astro v1.x, Astro deprecated the `<Markdown />` component and moved it to an external package.

Astro v3.0 completely removes the package `@astrojs/markdown-component`. Astro’s `<Markdown />` component will no longer work in your project.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-3)

Remove all instances of the `@astrojs/markdown-component`.

src/components/MyAstroComponent.astro

    ---import Markdown from '@astrojs/markdown-component';---

To continue using a similar `<Markdown />` component in your code, consider using [community integrations](https://astro.build/integrations/) such as [`astro-remote`](https://github.com/natemoo-re/astro-remote). Be sure to update your `<Markdown />` component imports and attributes as necessary, according to the integration’s own documentation.

Otherwise, delete all references to importing Astro’s `<Markdown />` component and the component itself in your `.astro` files. You will need to rewrite your content as HTML directly or [import Markdown](/en/guides/markdown-content/#importing-markdown) from a `.md` file.

### Removed: deprecated 1.x APIs

[Section titled Removed: deprecated 1.x APIs](#removed-deprecated-1x-apis)

In Astro v1.x, Astro deprecated our original configuration settings as well as `<style global>` and `<script hoist>` support. However, these were still supported for backwards compatibility.

Astro v3.0 removes these deprecated APIs entirely. The officially supported [configuration settings](/en/reference/configuration-reference/) and modern `<style is:global>` and `<script>` syntax should be used instead.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-4)

If you are continuing to use v1.x APIs, use the new APIs for each feature instead:

*   Deprecated config options: See [the 0.26 migration guide](/en/guides/upgrade-to/v1/#new-configuration-api)
*   Deprecated script/style attribute types: See [the 0.26 migration guide](/en/guides/upgrade-to/v1/#new-default-script-behavior)

### Removed: Partial shims for Web APIs in server code

[Section titled Removed: Partial shims for Web APIs in server code](#removed-partial-shims-for-web-apis-in-server-code)

In Astro v2.x, Astro provided partial shims for Web APIs such as `document` or `localStorage` in server-rendered code. These shims were often incomplete and unreliable.

Astro v3.0 removes these partial shims entirely. Web APIs are no longer available in server-rendered code.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-5)

If you are using Web APIs in server-rendered components, you will need to either make the usage of those APIs conditional or use [the `client:only` client directive](/en/reference/directives-reference/#clientonly).

### Removed: `image` from `astro:content` in content collections schema

[Section titled Removed: image from astro:content in content collections schema](#removed-image-from-astrocontent-in-content-collections-schema)

In Astro v2.x, the content collections API deprecated an `image` export from `astro:content` for use in your content collections schemas.

Astro v3.0 removes this export entirely.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-6)

If you are using the deprecated `image()` from `astro:content`, remove it as this no longer exists. Validate images through [the `image` helper from `schema`](#update-content-collections-schemas) instead:

src/content/config.ts

    import { defineCollection, z, image } from "astro:content";import { defineCollection, z } from "astro:content";
    defineCollection({  schema: ({ image }) =>    z.object({      image: image(),   }),});

### Removed: pre-0.14 Shiki theme names

[Section titled Removed: pre-0.14 Shiki theme names](#removed-pre-014-shiki-theme-names)

In Astro v2.x, some Shiki theme names had been renamed, but the original names were kept for backwards compatibility.

Astro v3.0 removes the original names in favor of the renamed theme names.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-7)

If your project uses any of the themes below, rename them to their updated name:

*   `material-darker` -> `material-theme-darker`
*   `material-default` -> `material-theme`
*   `material-lighter` -> `material-theme-lighter`
*   `material-ocean` -> `material-theme-ocean`
*   `material-palenight` -> `material-theme-palenight`

### Removed: `class:list` features

[Section titled Removed: class:list features](#removed-classlist-features)

In Astro v2.x, the [`class:list` directive](/en/reference/directives-reference/#classlist) used a custom implementation inspired by [`clsx`](https://github.com/lukeed/clsx) with a few extra features like deduplication and `Set` support.

Astro v3.0 now uses `clsx` directly for `class:list`, which does not support deduplication or `Set` values.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-8)

Replace any `Set` elements passed to the `class:list` directive with a plain `Array`.

src/components/MyAstroComponent.astro

    <Component class:list={[  'a',  'b',  new Set(['c', 'd'])  ['c', 'd']]} />

### Removed: passing `class:list` as a prop

[Section titled Removed: passing class:list as a prop](#removed-passing-classlist-as-a-prop)

In Astro v2.x, [`class:list` values](/en/reference/directives-reference/#classlist) were sent to components via [`Astro.props['class:list']`](/en/reference/api-reference/#props).

Astro v3.0 normalizes `class:list` values into a string before being sent to components via `Astro.props['class']`

#### What should I do?

[Section titled What should I do?](#what-should-i-do-9)

Remove any code that expects to receive the `class:list` prop.

src/components/MyAstroComponent.astro

    ---import { clsx } from 'clsx';const { class: className, 'class:list': classList } = Astro.props;const { class: className } = Astro.props;---<div  class:list={[className, classList]}  class:list={[className]}/>

### Removed: kebab-case transform for camelCase CSS variables

[Section titled Removed: kebab-case transform for camelCase CSS variables](#removed-kebab-case-transform-for-camelcase-css-variables)

In Astro v2.x, camelCase [CSS variables](/en/guides/styling/#css-variables) passed to the `style` attribute were rendered as both camelCase (as written) and kebab-case (kept for backwards compatibility).

Astro v3.0 removes the kebab-case transform for these camelCase CSS variable names, and only the original camelCase CSS variable is rendered.

src/components/MyAstroComponent.astro

    ---const myValue = "red"---<!-- input --><div style={{ "--myValue": myValue }}></div>
    <!-- output (Astro 2.x) --><div style="--my-value:var(--myValue);--myValue:red"></div><!-- output (Astro 3.0) --><div style="--myValue:red"></div>

#### What should I do?

[Section titled What should I do?](#what-should-i-do-10)

If you were relying on Astro to transform kebab-case in your styles, update your existing styles to camelCase to prevent missing styles. For example:

src/components/MyAstroComponent.astro

    <style>  div {   color: var(--my-value);   color: var(--myValue);  }</style>

### Removed: automatic flattening of `getStaticPaths()`’s return value

[Section titled Removed: automatic flattening of getStaticPaths()’s return value](#removed-automatic-flattening-of-getstaticpathss-return-value)

In Astro v2.x, the return value of [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths) was automatically flattened to allow you to return an array of arrays without errors.

Astro v3.0 removes automatic flattening of `getStaticPaths()`’s result.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-11)

If you’re returning an array of arrays instead of an array of _objects_ (as is expected), `.flatMap` and `.flat` should now be used to ensure that you are returning a flat array.

An [error message indicating that `getStaticPath()`’s return value must be an array of objects](/en/reference/errors/invalid-get-static-paths-entry/#what-went-wrong) will be provided if you need to update your code.

### Moved: `astro check` now requires an external package

[Section titled Moved: astro check now requires an external package](#moved-astro-check-now-requires-an-external-package)

In Astro v2.x, [`astro check`](/en/reference/cli-reference/#astro-check) was included in Astro by default, and its dependencies were bundled in Astro. This meant a larger package whether or not you ever used `astro check`. This also prevented you from having control over the version of TypeScript and the Astro Language Server to use.

Astro v3.0 moves the `astro check` command out of Astro core and now requires an external package `@astrojs/check`. Additionally, you must install `typescript` in your project to use the `astro check` command.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-12)

Run the `astro check` command after upgrading to Astro v3.0 and follow the prompts to install the required dependencies, or manually install `@astrojs/check` and `typescript` into your project.

### Deprecated: `build.excludeMiddleware` and `build.split`

[Section titled Deprecated: build.excludeMiddleware and build.split](#deprecated-buildexcludemiddleware-and-buildsplit)

In Astro v2.x, `build.excludeMiddleware` and `build.split` were used to change how specific files were emitted when using an adapter in SSR mode.

Astro v3.0 replaces these build config options with new [SSR adapter configuration options](/en/guides/integrations-guide/#official-integrations) to perform the same tasks: `edgeMiddleware` and `functionPerRoute`.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-13)

Update the Astro config file to now use the new options **in the adapter configuration** directly.

astro.config.mjs

    import { defineConfig } from "astro/config";import vercel from "@astrojs/vercel/serverless";
    export default defineConfig({    build: {      excludeMiddleware: true    },    adapter: vercel({      edgeMiddleware: true    }),});

astro.config.mjs

    import { defineConfig } from "astro/config";import netlify from "@astrojs/netlify/functions";
    export default defineConfig({     build: {        split: true     },     adapter: netlify({        functionPerRoute: true     }),});

### Deprecated: `markdown.drafts`

[Section titled Deprecated: markdown.drafts](#deprecated-markdowndrafts)

In Astro v2.x, the `markdown.drafts` configuration allowed you to have draft pages that were available in when running the dev server, but not built in production.

Astro v3.0 deprecates this feature in favor of the content collections method of handling draft pages by filtering manually instead, which gives more control over the feature.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-14)

To continue to mark some pages in your project as drafts, [migrate to content collections](/en/guides/content-collections/) and manually filter out pages with the `draft: true` frontmatter property instead.

### Deprecated: returning simple object in endpoints

[Section titled Deprecated: returning simple object in endpoints](#deprecated-returning-simple-object-in-endpoints)

In Astro v2.x, endpoints could return a simple object, which would be converted to a JSON response.

Astro v3.0 deprecates this behavior in favor of returning a `Response` object directly.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-15)

Update your endpoints to return a `Response` object directly.

endpoint.json.ts

    export async function GET() {  return { body: { "title": "Bob's blog" }};  return new Response(JSON.stringify({ "title": "Bob's blog" }));}

If you really need to keep the previous format, you can use the `ResponseWithEncoding` object but will be deprecated in the future.

endpoint.json.ts

    export async function GET() {  return { body: { "title": "Bob's blog" } };  return new ResponseWithEncoding({ body: { "title": "Bob's blog" }});}

### Changed default: `verbatimModuleSyntax` in tsconfig.json presets

[Section titled Changed default: verbatimModuleSyntax in tsconfig.json presets](#changed-default-verbatimmodulesyntax-in-tsconfigjson-presets)

In Astro v2.x, the [`verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax) setting was off by default, with its TypeScript 4.x equivalent `importsNotUsedAsValues` being enabled in the `strict` preset.

In Astro v3.0, `verbatimModuleSyntax` is enabled in every preset.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-16)

This option requires that types are imported using the `import type` syntax.

src/components/MyAstroComponent.astro

    ---import { type CollectionEntry, getEntry } from "astro:content";---

While we recommend keeping it on and properly making your type imports with `type` (as shown above), you can disable it by setting `verbatimModuleSyntax: false` in your `tsconfig.json` file if it causes any issues.

tsconfig.json

    {  "compilerOptions": {    "verbatimModuleSyntax": false  }}

### Changed default: port `3000`

[Section titled Changed default: port 3000](#changed-default-port-3000)

In Astro v2.x, Astro ran on port `3000` by default.

Astro v3.0 changes the [default port](/en/reference/cli-reference/#--port-number) to `4321`. 🚀

#### What should I do?

[Section titled What should I do?](#what-should-i-do-17)

Update any existing references to `localhost:3000`, for example in tests or in your `README`, to reflect the new port `localhost:4321`.

### Changed default: import.meta.env.BASE\_URL `trailingSlash`

[Section titled Changed default: import.meta.env.BASE\_URL trailingSlash](#changed-default-importmetaenvbase_url-trailingslash)

In Astro v2.x, `import.meta.env.BASE_URL` appended your [`base`](/en/reference/configuration-reference/#base) setting with a [trailingSlash](/en/reference/configuration-reference/#trailingslash) by default. `trailingSlash: "ignore"` also appended a trailing slash.

Astro v3.0 no longer appends `import.meta.env.BASE_URL` with a trailing slash by default, nor when `trailingSlash: "ignore"` is set. (The existing behavior of `base` in combination with `trailingSlash: "always"` or `trailingSlash: "never"` is unchanged.)

#### What should I do?

[Section titled What should I do?](#what-should-i-do-18)

If your `base` already has a trailing slash, no change is needed.

If your `base` does not have a trailing slash, add one if you wish to preserve the previous default (or `trailingSlash: "ignore"`) behavior:

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({  base: 'my-base',  base: 'my-base/',});

### Changed default: `compressHTML`

[Section titled Changed default: compressHTML](#changed-default-compresshtml)

In Astro v2.x, Astro only compressed your emitted HTML when [`compressHTML`](/en/reference/configuration-reference/#compresshtml) was explicitly set to `true`. The default value was `false`.

Astro v3.0 now compresses emitted HTML by default.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-19)

You can now remove `compressHTML: true` from your configuration as this is the new default behavior.

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({  compressHTML: true})

You must now set `compressHTML: false` to opt out of HTML compression.

### Changed default: `scopedStyleStrategy`

[Section titled Changed default: scopedStyleStrategy](#changed-default-scopedstylestrategy)

In Astro v2.x, the default value of [`scopedStyleStrategy`](/en/reference/configuration-reference/#scopedstylestrategy) was `"where"`.

Astro v3.0 introduces a new, default value: `"attribute"`. By default, styles are now applied using `data-*` attributes.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-20)

To retain your project’s current [style scoping](/en/guides/styling/#scoped-styles), update the configuration file to the previous default value:

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({  scopedStyleStrategy: "where"})

### Changed default: `inlineStyleSheets`

[Section titled Changed default: inlineStyleSheets](#changed-default-inlinestylesheets)

In Astro v2.x, all project stylesheets were sent as link tags by default. You could opt in to inlining them into `<style>` tags every time with `"always"`, or to inlining only stylesheets below a certain size with `"auto"` by setting the [`build.inlineStylesheets`](/en/reference/configuration-reference/#buildinlinestylesheets) configuration. The default setting was `"never"`.

Astro v3.0 changes the default value of `inlineStylesheets` to `"auto"`. Stylesheets smaller than `ViteConfig.build.assetsInlineLimit` (default: 4kb) are inlined by default. Otherwise, project styles are sent in external stylesheets.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-21)

If you want to keep your project’s current behavior, set `build.inlineStylesheets` to the previous default, `"never"`:

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({   build: {    inlineStylesheets: "never"  }})

### Changed default: image service

[Section titled Changed default: image service](#changed-default-image-service)

In Astro v2.x, Squoosh was the [default image processing service](/en/guides/images/#default-image-service).

Astro v3.0 now includes Sharp as the default image processing service and instead provides a configuration option to use Squoosh.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-22)

Note

When using a [strict package manager](https://pnpm.io/pnpm-vs-npm#npms-flat-tree) like `pnpm`, you may need to manually install Sharp into your project even though it is an Astro dependency:

Terminal window

    pnpm add sharp

If you would prefer to continue to use Squoosh to transform your images, update your config with the following:

astro.config.mjs

    import { defineConfig, squooshImageService } from "astro/config";
    export default defineConfig({  image: {    service: squooshImageService(),  }})

### Changed: HTTP request methods case

[Section titled Changed: HTTP request methods case](#changed-http-request-methods-case)

In Astro v2.x, [HTTP request methods](/en/guides/endpoints/#http-methods) were written using lowercase function names: `get`, `post`, `put`, `all`, and `del`.

Astro v3.0 uses uppercase function names, including `DELETE` instead of `del`.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-23)

Rename all functions to their uppercase equivalent:

*   `get` to `GET`
*   `post` to `POST`
*   `put` to `PUT`
*   `all` to `ALL`
*   `del` to `DELETE`

endpoint.ts

    export function get() {export function GET() {    return new Response(JSON.stringify({ "title": "Bob's blog" }));}

### Changed: Multiple JSX framework configuration

[Section titled Changed: Multiple JSX framework configuration](#changed-multiple-jsx-framework-configuration)

In Astro v2.x, you could use [multiple JSX framework integrations](/en/guides/integrations-guide/#official-integrations) (React, Solid, Preact) in the same project without needing to identify which files belonged to which framework.

Astro v3.0 now requires you to specify which framework to use for your files with new `include` and `exclude` integration config options when you have multiple JSX framework integrations installed. This allows Astro to better support single-framework usage, as well as advanced features like React Fast Refresh.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-24)

If you are using multiple JSX frameworks in the same project, set `include` (and optionally `exclude`) to an array of files and/or folders. Wildcards may be used to include multiple file paths.

We recommend placing common framework components in the same folder (e.g. `/components/react/` and `/components/solid/`) to make specifying your includes easier, but this is not required:

    import { defineConfig } from 'astro/config';import preact from '@astrojs/preact';import react from '@astrojs/react';import svelte from '@astrojs/svelte';import vue from '@astrojs/vue';import solid from '@astrojs/solid-js';
    export default defineConfig({  // Enable many frameworks to support all different kinds of components.  // No `include` is needed if you are only using a single framework!  integrations: [    preact({      include: ['**/preact/*']    }),    react({      include: ['**/react/*']    }),    solid({      include: ['**/solid/*'],    }),  ]});

### Changed: `Astro.cookies.get(key)` can return `undefined`

[Section titled Changed: Astro.cookies.get(key) can return undefined](#changed-astrocookiesgetkey-can-return-undefined)

In Astro v2.x, `Astro.cookies.get(key)` would always return an `AstroCookie` object, even if the cookie did not exist. To check for its existence, you needed to use `Astro.cookies.has(key)`.

Astro v3.0 returns `undefined` for `Astro.cookies.get(key)` if the cookie does not exist.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-25)

This change will not break any code that checks for the existence of the `Astro.cookie` object before using `Astro.cookies.get(key)`, but is now no longer required.

You can safely remove any code that uses `has()` to check if the value of `Astro.cookies` is `undefined`:

    if (Astro.cookies.has(id)) {  const id = Astro.cookies.get(id)!;}
    const id = Astro.cookies.get(id);if (id) {}

### Changed: running the Astro CLI programmatically

[Section titled Changed: running the Astro CLI programmatically](#changed-running-the-astro-cli-programmatically)

In Astro v2.x, the `"astro"` package entrypoint exported and ran the Astro CLI directly. It is not recommended to run Astro this way in practice.

Astro v3.0 removes the CLI from the entrypoint, and exports a new set of experimental JavaScript APIs, including `dev()`, `build()`, `preview()`, and `sync()`.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-26)

To [run the Astro CLI programmatically](/en/reference/programmatic-reference/), use the new experimental JavaScript APIs:

    import { dev, build } from "astro";
    // Start the Astro dev serverconst devServer = await dev();await devServer.stop();
    // Build your Astro projectawait build();

### Changed: internal Astro API entry point export paths

[Section titled Changed: internal Astro API entry point export paths](#changed-internal-astro-api-entry-point-export-paths)

In Astro v2.x, you could import internal Astro APIs from `astro/internal/*` and `astro/runtime/server/*`.

Astro v3.0 removes the two entry points in favor of the existing `astro/runtime/*` entrypoint. Additionally, a new `astro/compiler-runtime` export has been added for compiler-specific runtime code.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-27)

These are entry points for Astro’s internal API and should not affect your project. But if you do use these entrypoints, update as shown below:

    import 'astro/internal/index.js';import 'astro/runtime/server/index.js';
    import 'astro/server/index.js';import 'astro/runtime/server/index.js';

    import { transform } from '@astrojs/compiler';
    const result = await transform(source, {  internalURL: 'astro/runtime/server/index.js',  internalURL: 'astro/compiler-runtime',  // ...});

Feature Upgrades
----------------

[Section titled Feature Upgrades](#feature-upgrades)

### Upgrade images to v3

[Section titled Upgrade images to v3](#upgrade-images-to-v3)

`astro:assets` is no longer behind an experimental flag in Astro v3.0.

`<Image />` is now a built-in component and the previous `@astrojs/image` integration has been removed.

These and other accompanying changes to using images in Astro may cause some breaking changes when you upgrade your Astro project from an earlier version.

Please follow the instructions below as appropriate to upgrade an Astro v2.x project to v3.0.

#### Upgrade from `experimental.assets`

[Section titled Upgrade from experimental.assets](#upgrade-from-experimentalassets)

If you had previously enabled the experimental flag for `astro:assets`, you will need to update your project for Astro v3.0 which now includes assets features by default.

##### Remove `experimental.assets` flag

[Section titled Remove experimental.assets flag](#remove-experimentalassets-flag)

Remove the experimental flag:

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  experimental: {    assets: true  }});

If necessary, also update your `src/env.d.ts` file to replace the `astro/client-image` reference with `astro/client`:

src/env.d.ts

    /// <reference types="astro/client-image" />/// <reference types="astro/client" />

##### Remove the `~/assets` import alias

[Section titled Remove the ~/assets import alias](#remove-the-assets-import-alias)

This import alias is no longer included by default with `astro:assets`. If you were using this alias with experimental assets, you must convert them to relative file paths, or [create your own import aliases](/en/guides/imports/#aliases).

src/pages/posts/post-1.astro

    ---import rocket from '~/assets/rocket.png';import rocket from '../../assets/rocket.png';---

##### Add simple asset support for Cloudflare, Deno, Vercel Edge and Netlify Edge

[Section titled Add simple asset support for Cloudflare, Deno, Vercel Edge and Netlify Edge](#add-simple-asset-support-for-cloudflare-deno-vercel-edge-and-netlify-edge)

Astro v3.0 allows `astro:assets` to work without errors in Cloudflare, Deno, Vercel Edge and Netlify Edge, which do not support Astro’s built-in Squoosh and Sharp image optimization. Note that Astro does not perform any image transformation and processing in these environments. However, you can still enjoy the other benefits of using `astro:assets`, including no Cumulative Layout Shift (CLS), the enforced `alt` attribute, and a consistent authoring experience.

If you previously avoided using `astro:assets` because of these constraints, you can now use them without issues. You can configure the no-op image service to explicitly opt-in to this behavior:

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  image: {    service: {      entrypoint: 'astro/assets/services/noop'    }  }});

#### Decide where to store your images

[Section titled Decide where to store your images](#decide-where-to-store-your-images)

See the Images guide to help you decide [where to store your images](/en/guides/images/#where-to-store-images). You may wish to take advantage of new options for storing your images with the added flexibility `astro:assets` brings. For example, relative images from your project `src/` can now be referenced in Markdown, MDX, and Markdoc using standard Markdown `![alt](src)` syntax.

#### Update existing `<img>` tags

[Section titled Update existing &lt;img&gt; tags](#update-existing-img-tags)

Previously, importing an image would return a simple `string` with the path of the image. Now, imported image assets match the following signature:

    interface ImageMetadata {  src: string;  width: number;  height: number;  format: string;}

You must update the `src` attribute of any existing `<img>` tags (including any [images in UI framework components](/en/guides/images/#images-in-ui-framework-components)) and you may also update other attributes that are now available to you from the imported image.

src/components/MyComponent.astro

    ---import rocket from '../images/rocket.svg';---<img src={rocket} width="250" height="250" alt="A rocketship in space." />
    <img src={rocket.src} width={rocket.width} height={rocket.height} alt="A rocketship in space." />

#### Update your Markdown, MDX, and Markdoc files

[Section titled Update your Markdown, MDX, and Markdoc files](#update-your-markdown-mdx-and-markdoc-files)

Relative images from your project `src/` can now be referenced in Markdown, MDX, and Markdoc using standard Markdown `![alt](src)` syntax.

This allows you to move your images from the `public/` directory to your project `src/` where they will now be processed and optimized. Your existing images in `public/` and remote images are still valid but are not optimized by Astro’s build process.

src/pages/posts/post-1.md

    # My Markdown Page
    <!-- Local images now possible! -->![A starry night sky.](../../images/stars.png)
    <!-- Keep your images next to your content! -->![A starry night sky.](./stars.png)

If you require more control over your image attributes, we recommend using the `.mdx` file format, which allows you to include Astro’s `<Image />` component or a JSX `<img />` tag in addition to the Markdown syntax. Use the [MDX integration](/en/guides/integrations-guide/mdx/) to add support for MDX to Astro.

#### Remove `@astrojs/image`

[Section titled Remove @astrojs/image](#remove-astrojsimage)

If you were using the image integration in Astro v2.x, complete the following steps:

1.  Remove the `@astrojs/image` integration.
    
    You must [remove the integration](/en/guides/integrations-guide/#removing-an-integration) by uninstalling and then removing it from your `astro.config.mjs` file.
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';import image from '@astrojs/image';
        export default defineConfig({  integrations: [    image(),  ]})
    
2.  Update types (if required).
    
    If you had special types configured for `@astrojs/image` in `src/env.d.ts`, you may need to change them back to the default Astro types if your upgrade to v3 did not complete this step for you.
    
    src/env.d.ts
    
         /// <reference types="@astrojs/image/client" /> /// <reference types="astro/client" />
    
    Similarly, update `tsconfig.json` if necessary:
    
    tsconfig.json
    
        {  "compilerOptions": {    "types": ["@astrojs/image/client"]    "types": ["astro/client"]  }}
    
3.  Migrate any existing `<Image />` components.
    
    Change all `import` statements from `@astrojs/image/components` to `astro:assets` in order to use the new built-in `<Image />` component.
    
    Remove any component attributes that are not [currently supported image asset properties](/en/reference/modules/astro-assets/#image-properties).
    
    For example, `aspectRatio` is no longer supported, as it is now automatically inferred from the `width` and `height` attributes.
    
    src/components/MyComponent.astro
    
        ---import { Image } from '@astrojs/image/components';import { Image } from 'astro:assets';import localImage from '../assets/logo.png';const localAlt = 'The Astro Logo';---
        <Image  src={localImage}  width={300}  aspectRatio="16:9"  alt={localAlt}/>
    
4.  Choose a default image service.
    
    [Sharp](https://github.com/lovell/sharp) is now the default image service used for `astro:assets`. If you would like to use Sharp, no configuration is required.
    
    If you would prefer to use [Squoosh](https://github.com/GoogleChromeLabs/squoosh) to transform your images, update your config with the following `image.service` option:
    
    astro.config.mjs
    
        import { defineConfig, squooshImageService } from 'astro/config';
        export default defineConfig({  image: {    service: squooshImageService(),  },});
    

#### Update Content Collections schemas

[Section titled Update Content Collections schemas](#update-content-collections-schemas)

You can now declare an associated image for a content collections entry, such as a blog post’s cover image, in your frontmatter using its path relative to the current folder.

The new `image` helper for content collections lets you validate the image metadata using Zod. Learn more about [how to use images in content collections](/en/guides/images/#images-in-content-collections)

#### Navigating Image Imports in Astro v3.0

[Section titled Navigating Image Imports in Astro v3.0](#navigating-image-imports-in-astro-v30)

In Astro v3.0, if you have to preserve the old import behavior for images and require a string representation of the image’s URL, append `?url` to the end of your image path when importing it. For example:

src/pages/blog/MyImages.astro

    ---import Sprite from '../assets/logo.svg?url';---
    <svg>  <use xlink:href={Sprite + '#cart'} /></svg>

This approach ensures you obtain the URL string. Keep in mind that during development, Astro uses a `src/` path, but upon building, it generates hashed paths like `/_astro/cat.a6737dd3.png`.

If you prefer to work directly with the image object itself, you can access the `.src` property. This approach is best for tasks like managing image dimensions for Core Web Vitals metrics and preventing CLS.

If you are transitioning into the new import behavior, combining `?url` and `.src` methods might be the right method for seamless image handling.

### Upgrade view transitions to v3

[Section titled Upgrade view transitions to v3](#upgrade-view-transitions-to-v3)

View transitions are no longer behind an experimental flag in Astro v3.0.

If you had **not** enabled this experimental flag in Astro 2.x, this will not cause any breaking changes to your project. The new View Transitions API has no effect on your existing code.

If you were previously using experimental view transitions, there may be some breaking changes when you upgrade your Astro project from an earlier version.

Please follow the instructions below as appropriate to upgrade **an Astro v2.x project configured with `experimental.viewTransitions: true`** to v3.0.

#### Upgrade from `experimental.viewTransitions`

[Section titled Upgrade from experimental.viewTransitions](#upgrade-from-experimentalviewtransitions)

If you had previously enabled the experimental flag for view transitions, you will need to update your project for Astro v3.0 which now allows view transitions by default.

##### Remove `experimental.viewTransitions` flag

[Section titled Remove experimental.viewTransitions flag](#remove-experimentalviewtransitions-flag)

Remove the experimental flag:

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  experimental: {   viewTransitions: true  }});

##### Update import source

[Section titled Update import source](#update-import-source)

The `<ViewTransitions />` component has been moved from `astro:components` to `astro:transitions`. Update the import source across all occurrences in your project.

src/layouts/BaseLayout.astro

    ---import { ViewTransitions } from "astro:components astro:transitions"---<html lang="en">  <head>    <title>My Homepage</title>    <ViewTransitions />  </head>  <body>    <h1>Welcome to my website!</h1>  </body></html>

#### Update `transition:animate` directives

[Section titled Update transition:animate directives](#update-transitionanimate-directives)

**Changed:** The `transition:animate` value `morph` has been renamed to `initial`. Also, this is no longer the default animation. If no `transition:animate` directive is specified, your animations will now default to `fade`.

1.  Rename any `morph` animations to `initial`.
    
    src/components/MyComponent.astro
    
        <div transition:name="name" transition:animate="morph initial" />
    
2.  To keep any animations that were previously using `morph` by default, explicitly add `transition:animate="initial"`
    
    src/components/MyComponent.astro
    
        <div transition:name="name" transition:animate="initial" />
    
3.  You can safely remove any animations explicitly set to `fade`. This is now the default behavior:
    
    src/components/MyComponent.astro
    
        <div transition:name="name" transition:animate="fade" />
    

**Added:** Astro also supports a new `transition:animate` value, `none`. This value can be used on a page’s `<html>` element to disable animated full-page transitions on an entire page. This will only override **default animation behavior** on page elements without an animation directive. You can still set animations on individual elements, and these specific animations will occur.

4.  You may now disable all default transitions on an individual page, animating only elements that explicitly use a `transition:animate` directive:
    
        <html transition:animate="none">  <head></head>  <body>    <h1>Hello world!</h1>  </body></html>
    

##### Update event names

[Section titled Update event names](#update-event-names)

The event `astro:load` has been renamed to `astro:page-load`. Rename all occurrences in your project.

src/components/MyComponent.astro

    <script>document.addEventListener('astro:load astro:page-load', runSetupLogic);</script>

The event `astro:beforeload` has been renamed to `astro:after-swap`. Rename all occurrences in your project.

src/components/MyComponent.astro

    <script>document.addEventListener('astro:beforeload astro:after-swap', setDarkMode);</script>

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

Know a good resource for Astro v3.0? [Edit this page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/upgrade-to/v3.mdx) and add a link below!

Known Issues
------------

[Section titled Known Issues](#known-issues)

There are currently no known issues.

Upgrade Guides

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/upgrade-to/v3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
v4.0](/en/guides/upgrade-to/v4/) [Next  
v2.0](/en/guides/upgrade-to/v2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

