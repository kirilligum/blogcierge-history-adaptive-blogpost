Upgrade to Astro v5
===================

This guide will help you migrate from Astro v4 to Astro v5.

Need to upgrade an older project to v4 first? See our [older migration guide](/en/guides/upgrade-to/v4/).

Need to see the v4 docs? Visit this [older version of the docs site (unmaintained v4.16 snapshot)](https://v4.docs.astro.build/).

Upgrade Astro
-------------

[Section titled Upgrade Astro](#upgrade-astro)

Update your project’s version of Astro to the latest version using your package manager:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3334)
*   [pnpm](#tab-panel-3335)
*   [Yarn](#tab-panel-3336)

Terminal window

    # Upgrade Astro and official integrations togethernpx @astrojs/upgrade

Terminal window

    # Upgrade Astro and official integrations togetherpnpm dlx @astrojs/upgrade

Terminal window

    # Upgrade Astro and official integrations togetheryarn dlx @astrojs/upgrade

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

You can also [upgrade your Astro integrations manually](/en/guides/integrations-guide/#manual-upgrading) if needed, and you may also need to upgrade other dependencies in your project.

Need to continue?

After upgrading Astro, you may not need to make any changes to your project at all!

But, if you notice errors or unexpected behavior, please check below for what has changed that might need updating in your project.

Astro v5.0 includes [potentially breaking changes](#breaking-changes), as well as the removal and deprecation of some features.

If your project doesn’t work as expected after upgrading to v5.0, check this guide for an overview of all breaking changes and instructions on how to update your codebase.

See [the Astro changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) for full release notes.

Dependency Upgrades
-------------------

[Section titled Dependency Upgrades](#dependency-upgrades)

Any major upgrades to Astro’s dependencies may cause breaking changes in your project.

### Vite 6.0

[Section titled Vite 6.0](#vite-60)

Astro v5.0 upgrades to Vite v6.0 as the development server and production bundler.

#### What should I do?

[Section titled What should I do?](#what-should-i-do)

If you are using Vite-specific plugins, configuration, or APIs, check the [Vite migration guide](https://vite.dev/guide/migration.html) for their breaking changes and upgrade your project as needed.

### `@astrojs/mdx`

[Section titled @astrojs/mdx](#astrojsmdx)

[Implementation PR: Cleanup unused JSX code (#11741)](https://github.com/withastro/astro/pull/11741)

In Astro v4.x, Astro performed internal JSX handling for the `@astrojs/mdx` integration.

Astro v5.0 moves this responsibility to handle and render JSX and MDX to the `@astrojs/mdx` package directly. This means that Astro 5.0 is no longer compatible with older versions of the MDX integration.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-1)

If your project includes `.mdx` files, you must upgrade `@astrojs/mdx` to the latest version (v4.0.0) so that your JSX can be handled properly by the integration.

If you are using an MDX server renderer with the experimental [Astro Container API](/en/reference/container-reference/) you must update the import to reflect the new location:

    import mdxRenderer from "astro/jsx/server.js";import mdxRenderer from "@astrojs/mdx/server.js";

Learn more about [using MDX in your project](/en/guides/integrations-guide/mdx/).

Legacy
------

[Section titled Legacy](#legacy)

The following features are now considered legacy features. They should function normally but are no longer recommended and are in maintenance mode. They will see no future improvements and documentation will not be updated. These features will eventually be deprecated, and then removed entirely.

### Legacy: v2.0 Content Collections API

[Section titled Legacy: v2.0 Content Collections API](#legacy-v20-content-collections-api)

In Astro 4.x, content collections were defined, queried, and rendered using [the Content Collections API first introduced in Astro v2.0](https://astro.build/blog/introducing-content-collections/). All collection entries were local files within the reserved `src/content/` folder. Additionally, Astro’s [file name convention to exclude building individual pages](/en/guides/routing/#excluding-pages) was built in to the Content Collections API.

Astro 5.0 introduces a new version of content collections using the Content Layer API which brings several performance improvements and added capabilities. While old (legacy) and new (Content Layer API) collections can continue exist together in this release, there are potentially breaking changes to existing legacy collections.

This release also removes the option to prefix collection entry file names with an underscore (`_`) to prevent building a route.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-2)

We recommend [converting any existing collections to the new Content Layer API](#updating-existing-collections) as soon as you are able and making any new collections using the Content Layer API.

If you are unable to convert your collections, then please consult the [legacy collections breaking changes](#breaking-changes-to-legacy-content-and-data-collections) to see whether your existing collections are affected and require updating.

If you are unable to make any changes to your collections at this time, you can [enable the `legacy.collections` flag](#enabling-the-legacycollections-flag) which will allow you to keep your collections in their current state until the legacy flag is no longer supported.

Learn more about the updated [content collections](/en/guides/content-collections/).

##### Updating existing collections

[Section titled Updating existing collections](#updating-existing-collections)

See the instructions below for updating an existing content collection (`type: 'content'` or `type: 'data'`) to use the Content Layer API.

Step-by-step instructions to update a collection

1.  **Move the content config file**. This file no longer lives within the `src/content/` folder. This file should now exist at `src/content.config.ts`.
    
2.  **Edit the collection definition**. Your updated collection requires a `loader` which indicates both a folder for the location of your collection (`base`) and a `pattern` defining the collection entry filenames and extensions to match. (You may need to update the example below accordingly. You can use [globster.xyz](https://globster.xyz/) to check your glob pattern.) The option to select a collection `type` is no longer available.
    
    src/content.config.ts
    
        import { defineCollection, z } from 'astro:content';import { glob } from 'astro/loaders';
        const blog = defineCollection({  // For content layer you no longer define a `type`  type: 'content',  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/blog" }),  schema: z.object({    title: z.string(),    description: z.string(),    pubDate: z.coerce.date(),    updatedDate: z.coerce.date().optional(),  }),});
    
3.  **Change references from `slug` to `id`**. Content layer collections do not have a reserved `slug` field. Instead, all updated collections will have an `id`:
    
    src/pages/\[slug\].astro
    
        ---export async function getStaticPaths() {  const posts = await getCollection('blog');  return posts.map((post) => ({    params: { slug: post.slug },    params: { slug: post.id },    props: post,  }));}---
    
    You can also update the dynamic routing file names to match the value of the changed `getStaticPaths()` parameter.
    
4.  **Switch to the new `render()` function**. Entries no longer have a `render()` method, as they are now serializable plain objects. Instead, import the `render()` function from `astro:content`.
    
    src/pages/index.astro
    
        ---import { getEntry, render } from 'astro:content';
        const post = await getEntry('blog', params.slug);
        const { Content, headings } = await post.render();const { Content, headings } = await render(post);---<Content />
    

##### Breaking changes to legacy `content` and `data` collections

[Section titled Breaking changes to legacy content and data collections](#breaking-changes-to-legacy-content-and-data-collections)

[Implementation PR: Implement legacy collections using glob (#11976)](https://github.com/withastro/astro/pull/11976)

By default, collections that use the old `type` property (`content` or `data`) and do not define a `loader` are now implemented under the hood using the Content Layer API’s built-in `glob()` loader, with extra backward-compatibility handling.

Additionally, temporary backwards compatibility exists for keeping the content config file in its original location of `src/content/config.ts`.

This backwards compatibility implementation is able to emulate most of the features of legacy collections and will allow many legacy collections to continue to work even without updating your code. However, **there are some differences and limitations that may cause breaking changes to existing collections**:

*   In previous versions of Astro, collections would be generated for all folders in `src/content/`, even if they were not defined in `src/content/config.ts`. This behavior is now deprecated, and collections should always be defined in `src/content.config.ts`. For existing collections, these can just be empty declarations (e.g. `const blog = defineCollection({})`) and Astro will implicitly define your legacy collection for you in a way that is compatible with the new loading behavior.
*   The special `layout` field is not supported in Markdown collection entries. This property is intended only for standalone page files located in `src/pages/` and not likely to be in your collection entries. However, if you were using this property, you must now create dynamic routes that include your page styling.
*   Sort order of generated collections is non-deterministic and platform-dependent. This means that if you are calling `getCollection()`, the order in which entries are returned may be different than before. If you need a specific order, you must sort the collection entries yourself.
*   `image().refine()` is not supported. If you need to validate the properties of an image you will need to do this at runtime in your page or component.
*   The `key` argument of `getEntry(collection, key)` is typed as `string`, rather than having types for every entry.
*   Previously when calling `getEntry(collection, key)` with a static string as the key, the return type was not nullable. The type now includes `undefined` so you must check if the entry is defined before using the result or you will have type errors.

##### Enabling the `legacy.collections` flag

[Section titled Enabling the legacy.collections flag](#enabling-the-legacycollections-flag)

[Implementation PR: Implement legacy collections using glob (#11976)](https://github.com/withastro/astro/pull/11976)

If you are not yet ready to update your existing collections, you can enable the [`legacy.collections`](/en/reference/legacy-flags/) flag and your existing collections will continue to function as before.

Deprecated
----------

[Section titled Deprecated](#deprecated)

The following deprecated features are no longer supported and are no longer documented. Please update your project accordingly.

Some deprecated features may temporarily continue to function until they are completely removed. Others may silently have no effect, or throw an error prompting you to update your code.

### Deprecated: `Astro.glob()`

[Section titled Deprecated: Astro.glob()](#deprecated-astroglob)

[Implementation PR: Deprecate glob (#11826)](https://github.com/withastro/astro/pull/11826)

In Astro v4.x, you could use `Astro.glob()` in your `.astro` components to query multiple files in your project. This had some limitations (where it could be used, performance, etc.), and using querying functions from the Content Collections API or Vite’s own `import.meta.glob()` often provided more function and flexibility.

Astro 5.0 deprecates `Astro.glob()` in favor of using `getCollection()` to query your collections, and `import.meta.glob()` to query other source files in your project.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-3)

Replace all use of `Astro.glob()` with `import.meta.glob()`. Note that `import.meta.glob()` no longer returns a `Promise`, so you may have to update your code accordingly. You should not require any updates to your [glob patterns](/en/guides/imports/#glob-patterns).

src/pages/blog.astro

    ---const posts = await Astro.glob('./posts/*.md');const posts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));---
    {posts.map((post) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}

Where appropriate, consider using [content collections](/en/guides/content-collections/) to organize your content, which has its own newer, more performant querying functions.

You may also wish to consider using glob packages from NPM, such as [`fast-glob`](https://www.npmjs.com/package/fast-glob).

Learn more about [importing files with `import.meta.glob`](/en/guides/imports/#importmetaglob).

### Deprecated: `functionPerRoute` (Adapter API)

[Section titled Deprecated: functionPerRoute (Adapter API)](#deprecated-functionperroute-adapter-api)

[Implementation PR: Remove functionPerRoute option (#11714)](https://github.com/withastro/astro/pull/11714)

In Astro v4.x, you could opt into creating a separate file for each route defined in the project, mirroring your `src/pages/` directory in the build folder. By default, Astro emitted a single `entry.mjs` file, which was responsible for emitting the rendered page on each request.

Astro v5.0 removes the option to opt out of the default behavior. This behavior is now standard, and non-configurable.

Remove the `functionPerRoute` property from your `adapterFeatures` configuration. It is no longer available.

my-adapter.mjs

    export default function createIntegration() {  return {    name: '@matthewp/my-adapter',    hooks: {      'astro:config:done': ({ setAdapter }) => {        setAdapter({          name: '@matthewp/my-adapter',          serverEntrypoint: '@matthewp/my-adapter/server.js',          adapterFeatures: {              functionPerRoute: true          }        });      },    },  };}

Learn more about [the Adapter API](/en/reference/adapter-reference/) for building adapter integrations.

### Deprecated: `routes` on `astro:build:done` hook (Integration API)

[Section titled Deprecated: routes on astro:build:done hook (Integration API)](#deprecated-routes-on-astrobuilddone-hook-integration-api)

[Implementation PR: feat(next): astro:routes:resolved (#12329)](https://github.com/withastro/astro/pull/12329)

In Astro v4.x, integrations accessed routes from the `astro:build:done` hook.

Astro v5.0 deprecates the `routes` array passed to this hook. Instead, it exposes a new `astro:routes:resolved` hook that runs before `astro:config:done`, and whenever a route changes in development. It has all the same properties of the deprecated `routes` list, except `distURL` which is only available during build.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-4)

Remove any instance of `routes` passed to `astro:build:done` and replace it with the new `astro:routes:resolved` hook. Access `distURL` on the newly exposed `assets` map:

my-integration.mjs

    const integration = () => {    let routes    return {        name: 'my-integration',        hooks: {            'astro:routes:resolved': (params) => {                routes = params.routes            },            'astro:build:done': ({                routes                assets            }) => {                for (const route of routes) {                    const distURL = assets.get(route.pattern)                    if (distURL) {                        Object.assign(route, { distURL })                    }                }                console.log(routes)            }        }    }}

Learn more about [the Integration API `astro:routes:resolved` hook](/en/reference/integrations-reference/#astroroutesresolved) for building integrations.

Removed
-------

[Section titled Removed](#removed)

The following features have now been entirely removed from the code base and can no longer be used. Some of these features may have continued to work in your project even after deprecation. Others may have silently had no effect.

Projects now containing these removed features will be unable to build, and there will no longer be any supporting documentation prompting you to remove these features.

### Removed: The Lit integration

[Section titled Removed: The Lit integration](#removed-the-lit-integration)

[Implementation PR: Remove \`@astrojs/lit\` (#11680)](https://github.com/withastro/astro/pull/11680)

In Astro v4.x, [Lit](https://lit.dev/) was a core-maintained framework library through the `@astrojs/lit` package.

Astro v5.0 removes the integration and it will not receive further updates for compatibility with 5.x and above.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-5)

You can continue to use Lit for client components by adding a client-side script tag. For example:

    <script>  import "../components/MyTabs";</script>
    <my-tabs title="These are my tabs">...</my-tabs>

If you’re interested in maintaining a Lit integration yourself, you may wish to use the [last published version of `@astrojs/lit`](https://github.com/withastro/astro/tree/astro%404.13.0/packages/integrations/lit) as a starting point and upgrade the relevant packages.

Learn more about [Astro’s official integrations](/en/guides/integrations-guide/).

### Removed: `hybrid` rendering mode

[Section titled Removed: hybrid rendering mode](#removed-hybrid-rendering-mode)

[Implementation PR: Merge output:hybrid and output:static (#11824)](https://github.com/withastro/astro/pull/11824)

In Astro v4.x, Astro provided three rendering `output` rendering modes: `'static'`, `'hybrid'`, and `'server'`

Astro v5.0 merges the `output: 'hybrid'` and `output: 'static'` configurations into one single configuration (now called `'static'`) that works the same way as the previous hybrid option.

It is no longer necessary to specify `output: 'hybrid'` in your Astro config to use server-rendered pages. The new `output: 'static'` has this capability included.

Astro will now automatically allow you to opt out of prerendering in your static site with no change to your output configuration required. Any page route or endpoint can include `export const prerender = false` to be server-rendered on demand, while the rest of your site is statically generated.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-6)

If your project used hybrid rendering, you must now remove the `output: 'hybrid'` option from your Astro config as it no longer exists. However, no other changes to your project are required, and you should have no breaking changes. The previous `'hybrid'` behavior is now the default, under a new name `'static'`.

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({  output: 'hybrid',});

If you were using the `output: 'static'` (default) option, you can continue to use it as before. By default, all of your pages will continue to be prerendered and you will have a completely static site. You should have no breaking changes to your project.

An adapter is still required to deploy an Astro project with any server-rendered pages, no matter which `output` mode your project uses. Failure to include an adapter will result in a warning in development and an error at build time.

Learn more about [on-demand rendering in Astro](/en/guides/on-demand-rendering/).

### Removed: Squoosh image service

[Section titled Removed: Squoosh image service](#removed-squoosh-image-service)

[Implementation PR: remove the squoosh image service (#11770)](https://github.com/withastro/astro/pull/11770)

In Astro 4.x, you could configure `image.service: squooshImageService()` to use Squoosh to transform your images instead of Sharp. However, the underlying library `libsquoosh` is no longer maintained and has memory and performance issues.

Astro 5.0 removes the Squoosh image optimization service entirely.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-7)

To switch to the built-in Sharp image service, remove the `squooshImageService` import from your Astro config. By default, you will use Sharp for `astro:assets`.

astro.config.mjs

    import { squooshImageService } from "astro/config";import { defineConfig } from "astro/config";
    export default defineConfig({ image: {   service: squooshImageService() }});

If you are using a strict package manager like `pnpm`, you may need to install the `sharp` package manually to use the Sharp image service, even though it is built into Astro by default.

If your adapter does not support Astro’s built-in Sharp image optimization, you can [configure a no-op image service](/en/guides/images/#configure-no-op-passthrough-service) to allow you to use the `<Image />` and `<Picture />` components.

Alternatively, you may wish to consider [a community-maintained Squoosh image service](https://github.com/Princesseuh/astro-image-service-squoosh) if you are unable to use the Sharp image service.

##### For adapters

[Section titled For adapters](#for-adapters)

If your adapter previously precised its compatibility status with Squoosh, you should now remove this information from your adapter configuration.

my-adapter.mjs

    supportedAstroFeatures: {  assets: {    isSquooshCompatible: true  }}

Read more about [configuring your default image service](/en/guides/images/#default-image-service).

### Removed: some public-facing types

[Section titled Removed: some public-facing types](#removed-some-public-facing-types)

[Implementation PR: Refactor/types (#11715)](https://github.com/withastro/astro/pull/11715)

In Astro v4.x, `@types/astro.ts` exposed all types publicly to users, whether or not they were still actively used or only intended for internal use.

Astro v5.0 refactors this file to remove outdated and internal types. This refactor brings improvements to your editor (e.g. faster completions, lower memory usage, and more relevant completion options). However, this refactor may cause errors in some projects that have been relying on types that are no longer available to the public.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-8)

Remove any types that now cause errors in your project as you no longer have access to them. These are mostly APIs that have previously been deprecated and removed, but may also include types that are now internal.

See the [public types exposed for use](https://github.com/withastro/astro/tree/main/packages/astro/src/types/public).

### Experimental Flags

[Section titled Experimental Flags](#experimental-flags)

The following experimental flags have been removed in Astro v5.0 and these features are available for use:

*   `env`
*   `serverIslands`

Additionally, the following experimental flags have been removed and **are now the default or recommended behavior in Astro v5.0**.

*   `directRenderScript` (See below for breaking changes to [default `<script>` behavior](#script-tags-are-rendered-directly-as-declared).)
*   `globalRoutePriority` (See below for breaking changes to [default route priority order](#route-priority-order-for-injected-routes-and-redirects).)
*   `contentLayer` (See guidance for [upgrading existing content collections](#legacy-v20-content-collections-api) to the new, preferred Content Layer API.)

The following experimental flags have been removed and **their corresponding features are not part of Astro v5.0**.

*   `contentCollectionsCache`

Remove these experimental flags if you were previously using them, and move your `env` configuration to the root of your Astro config:

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  experimental: {    directRenderScript: true,    globalRoutePriority: true,    contentLayer: true,    serverIslands: true,    contentCollectionsCache: true,    env: {      schema: {...}    }  },  env: {      schema: {...}  }})

These features are all available by default in Astro v5.0.

Read about these exciting features and more in [the v5.0 Blog post](https://astro.build/blog/astro-5/).

Changed Defaults
----------------

[Section titled Changed Defaults](#changed-defaults)

Some default behavior has changed in Astro v5.0 and your project code may need updating to account for these changes.

In most cases, the only action needed is to review your existing project’s deployment and ensure that it continues to function as you expect, making updates to your code as necessary. In some cases, there may be a configuration setting to allow you to continue to use the previous default behavior.

### CSRF protection is now set by default

[Section titled CSRF protection is now set by default](#csrf-protection-is-now-set-by-default)

[Implementation PR: change default value of checkOrigin (#11788)](https://github.com/withastro/astro/pull/11788)

In Astro v4.x, The default value of `security.checkOrigin` was `false`. Previously, you had to explicitly set this value to `true` to enable Cross-Site Request Forgery (CSRF) protection.

Astro v5.0 changes the default value of this option to `true`, and will automatically check that the “origin” header matches the URL sent by each request in on-demand rendered pages.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-9)

If you had previously configured `security.checkOrigin: true`, you no longer need this line in your Astro config. This is now the default.

To disable this behavior, you must explicitly set `security.checkOrigin: false`.

astro.config.mjs

    export default defineConfig({  output: "server",  security: {    checkOrigin: false  }})

Read more about [security configuration options](/en/reference/configuration-reference/#security)

### Route priority order for injected routes and redirects

[Section titled Route priority order for injected routes and redirects](#route-priority-order-for-injected-routes-and-redirects)

[Implementation PR: Remove legacy route prioritization (#11798)](https://github.com/withastro/astro/pull/11798)

In Astro v4.x, `experimental.globalRoutePriority` was an optional flag that ensured that injected routes, file-based routes, and redirects were all prioritized using the [route priority order rules for all routes](/en/guides/routing/#route-priority-order). This allowed more control over routing in your project by not automatically prioritizing certain kinds of routes and standardizing the route priority order.

Astro v5.0 removes this experimental flag and makes this the new default behavior in Astro: redirects and injected routes are now prioritized equally alongside file-based project routes.

Note that this was already the default behavior in Starlight, and should not affect updated Starlight projects.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-10)

If your project includes injected routes or redirects, please check that your routes are building page URLs as expected. An example of the new expected behavior is shown below.

In a project containing the following routes:

*   File-based route: `/blog/post/[pid]`
*   File-based route: `/[page]`
*   Injected route: `/blog/[...slug]`
*   Redirect: `/blog/tags/[tag] -> /[tag]`
*   Redirect: `/posts -> /blog`

The following URLs will be built (instead of following the route priority order of Astro v4.x):

*   `/blog/tags/astro` is built by the redirect to `/tags/[tag]` (instead of the injected route `/blog/[...slug]`)
*   `/blog/post/0` is built by the file-based route `/blog/post/[pid]` (instead of the injected route `/blog/[...slug]`)
*   `/posts` is built by the redirect to `/blog` (instead of the file-based route `/[page]`)

In the event of route collisions, where two routes of equal route priority attempt to build the same URL, Astro will log a warning identifying the conflicting routes.

Read more about the [route priority order rules](/en/guides/routing/#route-priority-order).

### `<script>` tags are rendered directly as declared

[Section titled &lt;script&gt; tags are rendered directly as declared](#script-tags-are-rendered-directly-as-declared)

[Implementation PR: Make directRenderScript the default (#11791)](https://github.com/withastro/astro/pull/11791)

In Astro v4.x, `experimental.directRenderScript` was an optional flag to directly render `<scripts>` as declared in `.astro` files (including existing features like TypeScript, importing `node_modules`, and deduplicating scripts). This strategy prevented scripts from being executed in places where they were not used. Additionally, conditionally rendered scripts were previously implicitly inlined, as if an `is:inline` directive was automatically added to them.

Astro 5.0 removes this experimental flag and makes this the new default behavior in Astro: scripts are no longer hoisted to the `<head>`, multiple scripts on a page are no longer bundled together, and a `<script>` tag may interfere with CSS styling. Additionally, conditionally rendered scripts are no longer implicitly inlined.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-11)

Please review your `<script>` tags and ensure they behave as desired.

If you previously had conditionally rendered `<script>` tags, you will need to add an `is:inline` attribute to preserve the same behavior as before:

src/components/MyComponent.astro

    ---type Props = {  showAlert: boolean}
    const { showAlert } = Astro.props;---{  showAlert && <script is:inline>alert("Some very important code!!")</script>}

Read more about [using `script` tags in Astro](/en/guides/client-side-scripts/#using-script-in-astro).

Breaking Changes
----------------

[Section titled Breaking Changes](#breaking-changes)

The following changes are considered breaking changes in Astro v5.0. Breaking changes may or may not provide temporary backwards compatibility. If you were using these features, you may have to update your code as recommended in each entry.

### Renamed: `<ViewTransitions />` component

[Section titled Renamed: &lt;ViewTransitions /&gt; component](#renamed-viewtransitions--component)

[Implementation PR: Rename the ViewTransitions component to ClientRouter (#11980)](https://github.com/withastro/astro/pull/11980)

In Astro 4.x, Astro’s View Transitions API included a `<ViewTransitions />` router component to enable client-side routing, page transitions, and more.

Astro 5.0 renames this component to `<ClientRouter />` to clarify the role of the component within the API. This makes it more clear that the features you get from Astro’s `<ClientRouter />` routing component are slightly different from the native CSS-based MPA router.

No functionality has changed. This component has only changed its name.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-12)

Replace all occurrences of the `ViewTransitions` import and component with `ClientRouter`:

src/layouts/MyLayout.astro

    import { ViewTransitions } from 'astro:transitions';import { ClientRouter } from 'astro:transitions';
    <html>  <head>    ...   <ViewTransitions />   <ClientRouter />  </head></html>

Read more about [view transitions and client-side routing in Astro](/en/guides/view-transitions/).

### Changed: TypeScript configuration

[Section titled Changed: TypeScript configuration](#changed-typescript-configuration)

[Implementation PR: better tsconfig (#11859)](https://github.com/withastro/astro/pull/11859)

In Astro v4.x, Astro relied on a `src/env.d.ts` file for type inferencing and defining modules for features that relied on generated types.

Astro 5.0 instead uses a `.astro/types.d.ts` file for type inferencing, and now recommends setting `include` and `exclude` in `tsconfig.json` to benefit from Astro types and avoid checking built files.

Running `astro sync` no longer creates, nor updates, `src/env.d.ts` as it is not required for type-checking standard Astro projects.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-13)

To update your project to Astro’s recommended TypeScript settings, add the following `include` and `exclude` properties to your existing `tsconfig.json`:

tsconfig.json

    {  "extends": "astro/tsconfigs/base",  "include": [".astro/types.d.ts", "**/*"],  "exclude": ["dist"]}

Note that `src/env.d.ts` is only necessary if you have added custom configurations, or if you’re not using a `tsconfig.json` file.

Read more about [TypeScript configuration in Astro](/en/guides/typescript/#setup).

### Changed: Actions submitted by HTML forms no longer use cookie redirects

[Section titled Changed: Actions submitted by HTML forms no longer use cookie redirects](#changed-actions-submitted-by-html-forms-no-longer-use-cookie-redirects)

[Implementation PR: Actions middleware (#12373)](https://github.com/withastro/astro/pull/12373)

In Astro 4.x, actions called from an HTML form would trigger a redirect with the result forwarded using cookies. This caused issues for large form errors and return values that exceeded the 4 KB limit of cookie-based storage.

Astro 5.0 now renders the result of an action as a POST result without any forwarding. This will introduce a “confirm form resubmission?” dialog when a user attempts to refresh the page, though it no longer imposes a 4 KB limit on action return value.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-14)

You should update handling for action results that relies on redirects, and optionally address the “confirm form resubmission?” dialog with middleware.

##### To redirect to the previous route on error

[Section titled To redirect to the previous route on error](#to-redirect-to-the-previous-route-on-error)

If your HTML form action is directed to a different route (i.e. `action={"/success-page" + actions.name}`), Astro will no longer redirect to the previous route on error. You can implement this behavior manually using redirects from your Astro component. This example instead redirects to a new route on success, and handles errors on the current page otherwise:

src/pages/newsletter.astro

    ---import { actions } from 'astro:actions';
    const result = Astro.getActionResult(actions.newsletter);if (!result?.error) {  // Embed relevant result data in the URL if needed  // example: redirect(`/confirmation?email=${result.data.email}`);  return redirect('/confirmation');}---
    <form method="POST" action={'/confirmation' + actions.newsletter}>  <label>E-mail <input required type="email" name="email" /></label>  <button>Sign up</button></form>

##### (Optional) To remove the confirm dialog on refresh

[Section titled (Optional) To remove the confirm dialog on refresh](#optional-to-remove-the-confirm-dialog-on-refresh)

To address the “confirm form resubmission?” dialog on refresh, or to preserve action results across sessions, you can now [customize action result handling from middleware](/en/guides/actions/#advanced-persist-action-results-with-a-session).

We recommend using a session storage provider [as described in our Netlify Blob example](/en/guides/actions/#advanced-persist-action-results-with-a-session). However, if you prefer the cookie forwarding behavior from 4.X and accept the 4 KB size limit, you can implement the pattern as shown in this sample snippet:

src/middleware.ts

    import { defineMiddleware } from 'astro:middleware';import { getActionContext } from 'astro:actions';
    export const onRequest = defineMiddleware(async (context, next) => {  // Skip requests for prerendered pages  if (context.isPrerendered) return next();
      const { action, setActionResult, serializeActionResult } = getActionContext(context);
      // If an action result was forwarded as a cookie, set the result  // to be accessible from `Astro.getActionResult()`  const payload = context.cookies.get('ACTION_PAYLOAD');  if (payload) {    const { actionName, actionResult } = payload.json();    setActionResult(actionName, actionResult);    context.cookies.delete('ACTION_PAYLOAD');    return next();  }
      // If an action was called from an HTML form action,  // call the action handler and redirect with the result as a cookie.  if (action?.calledFrom === 'form') {    const actionResult = await action.handler();
        context.cookies.set('ACTION_PAYLOAD', {      actionName: action.name,      actionResult: serializeActionResult(actionResult),    });
        if (actionResult.error) {    // Redirect back to the previous page on error      const referer = context.request.headers.get('Referer');      if (!referer) {        throw new Error('Internal: Referer unexpectedly missing from Action POST request.');      }      return context.redirect(referer);    }    // Redirect to the destination page on success    return context.redirect(context.originPathname);  }
      return next();})

### Changed: `compiledContent()` is now an async function

[Section titled Changed: compiledContent() is now an async function](#changed-compiledcontent-is-now-an-async-function)

[Implementation PR: Remove TLA by making compiledContent async (#11782)](https://github.com/withastro/astro/pull/11782)

In Astro 4.x, top level await was included in Markdown modules. This caused some issues with custom image services and images inside Markdown, causing Node to suddenly exit with no error message.

Astro 5.0 makes the `compiledContent()` property on Markdown import an async function, requiring an `await` to resolve the content.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-15)

Update your code to use `await` when calling `compiledContent()`.

src/pages/post.astro

    ---import * as myPost from "../blog/post.md";
    const content = myPost.compiledContent();const content = await myPost.compiledContent();---
    <Fragment set:html={content} />

Read more about the [`compiledContent()` function](/en/guides/markdown-content/#importing-markdown) for returning compiled Markdown.

### Changed: `astro:content` can no longer be used on the client

[Section titled Changed: astro:content can no longer be used on the client](#changed-astrocontent-can-no-longer-be-used-on-the-client)

[Implementation PR: Prevent usage of \`astro:content\` in the client (#11827)](https://github.com/withastro/astro/pull/11827)

In Astro 4.x, it was possible to access the `astro:content` module on the client.

Astro 5.0 removes this access as it was never intentionally exposed for client use. Using `astro:content` this way had limitations and bloated client bundles.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-16)

If you are currently using `astro:content` in the client, pass the data you need through props to your client components instead:

src/pages/blog.astro

    ---import { getCollection } from 'astro:content';import ClientComponent from '../components/ClientComponent';
    const posts = await getCollection('blog');const postsData = posts.map(post => post.data);---
    <ClientComponent posts={postsData} />

Read more about [the `astro:content` API](/en/reference/modules/astro-content/).

### Renamed: Shiki `css-variables` theme color token names

[Section titled Renamed: Shiki css-variables theme color token names](#renamed-shiki-css-variables-theme-color-token-names)

[Implementation PR: Update to new shiki token names (#11661)](https://github.com/withastro/astro/pull/11661)

In Astro v4.x, the Shiki `css-variables` theme used the `--astro-code-color-text` and `--astro-code-color-background` tokens for styling the foreground and background colors of code blocks respectively.

Astro v5.0 renames them to `--astro-code-foreground` and `--astro-code-background` respectively to better align with the Shiki v1 defaults.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-17)

You can perform a global find and replace in your project to migrate to the new token names.

src/styles/global.css

    :root {  --astro-code-color-text: #000;  --astro-code-color-background: #fff;  --astro-code-foreground: #000;  --astro-code-background: #fff;}

Read more about [syntax highlighting in Astro](/en/guides/syntax-highlighting/).

### Changed: internal Shiki rehype plugin for highlighting code blocks

[Section titled Changed: internal Shiki rehype plugin for highlighting code blocks](#changed-internal-shiki-rehype-plugin-for-highlighting-code-blocks)

[Implementation PR: Refactor createShikiHighlighter (#11825)](https://github.com/withastro/astro/pull/11825)

In Astro 4.x, Astro’s internal Shiki rehype plugin highlighted code blocks as HTML.

Astro 5.0 updates this plugin to highlight code blocks as hast. This allows a more direct Markdown and MDX processing and improves the performance when building the project. However, this may cause issues with existing Shiki transformers.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-18)

If you are using Shiki transformers passed to `markdown.shikiConfig.transformers`, you must make sure they do not use the `postprocess` hook. This hook no longer runs on code blocks in `.md` and `.mdx` files. (See [the Shiki documentation on transformer hooks](https://shiki.style/guide/transformers#transformer-hooks) for more information).

Code blocks in `.mdoc` files and Astro’s built-in `<Code />` component do not use the internal Shiki rehype plugin and are unaffected.

Read more about [syntax highlighting in Astro](/en/guides/syntax-highlighting/).

### Changed: Automatic `charset=utf-8` behavior for Markdown and MDX pages

[Section titled Changed: Automatic charset=utf-8 behavior for Markdown and MDX pages](#changed-automatic-charsetutf-8-behavior-for-markdown-and-mdx-pages)

[Implementation PR: Unset charset=utf-8 content-type for md/mdx pages (#12231)](https://github.com/withastro/astro/pull/12231)

In Astro 4.0, Markdown and MDX pages (located in `src/pages/`) automatically responded with `charset=utf-8` in the `Content-Type` header, which allowed rendering non-ASCII characters in your pages.

Astro 5.0 updates the behaviour to add the `<meta charset="utf-8">` tag instead, and only for pages that do not use Astro’s special `layout` frontmatter property. Similarly for MDX pages, Astro will only add the tag if the MDX content does not import a wrapping `Layout` component.

If your Markdown or MDX pages use the `layout` frontmatter property, or if the MDX page content imports a wrapping `Layout` component, then the HTML encoding will be handled by the designated layout component instead, and the `<meta charset="utf-8">` tag will not be added to your page by default.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-19)

If you require `charset=utf-8` to render your page correctly, make sure that your layout components contain the `<meta charset="utf-8">` tag. You may need to add this if you have not already done so.

Read more about [Markdown layouts](/en/basics/layouts/#markdown-layouts).

### Changed: Astro-specific metadata attached in remark and rehype plugins

[Section titled Changed: Astro-specific metadata attached in remark and rehype plugins](#changed-astro-specific-metadata-attached-in-remark-and-rehype-plugins)

[Implementation PR: Clean up Astro metadata in vfile.data (#11861)](https://github.com/withastro/astro/pull/11861)

In Astro 4.x, the Astro-specific metadata attached to `vfile.data` in remark and rehype plugins was attached in different locations with inconsistent names.

Astro 5 cleans up the API and the metadata is now renamed as below:

*   `vfile.data.__astroHeadings` -> `vfile.data.astro.headings`
*   `vfile.data.imagePaths` -> `vfile.data.astro.imagePaths`

The types of `imagePaths` has also been updated from `Set<string>` to `string[]`. The `vfile.data.astro.frontmatter` metadata is left unchanged.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-20)

While we don’t consider these APIs public, they can be accessed by remark and rehype plugins that want to re-use Astro’s metadata. If you are using these APIs, make sure to access them in the new locations.

Read more about [using Markdown plugins in Astro](/en/guides/markdown-content/#markdown-plugins).

### Changed: image endpoint configuration

[Section titled Changed: image endpoint configuration](#changed-image-endpoint-configuration)

[Implementation PR: Allow customising the route of the image endpoint (#11908)](https://github.com/withastro/astro/pull/11908)

In Astro 4.x, you could set an endpoint in your `image` configuration to use for image optimization.

Astro 5.0 allows you to customize a `route` and `entrypoint` of the `image.endpoint` config. This can be useful in niche situations where the default route `/_image` conflicts with an existing route or your local server setup.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-21)

If you had previously customized `image.endpoint`, move this endpoint to the new `endpoint.entrypoint` property. Optionally, you may customize a `route`:

astro.config.mjs

    import { defineConfig } from "astro/config";
    defineConfig({  image: {    endpoint: './src/image-endpoint.ts',    endpoint: {      route: "/image",      entrypoint: "./src/image_endpoint.ts"    }  },})

Read more about [setting an endpoint to use for image optimization](/en/reference/configuration-reference/#imageendpoint).

### Changed: `build.client` and `build.server` resolve behavior

[Section titled Changed: build.client and build.server resolve behavior](#changed-buildclient-and-buildserver-resolve-behavior)

[Implementation PR: Fix build.client and build.server resolve behaviour (#11916)](https://github.com/withastro/astro/pull/11916)

In Astro v4.x, the `build.client` and `build.server` options were documented to resolve relatively from the `outDir` option, but it didn’t always work as expected.

Astro 5.0 fixes the behavior to correctly resolve from the `outDir` option. For example, if `outDir` is set to `./dist/nested/`, then by default:

*   `build.client` will resolve to `<root>/dist/nested/client/`
*   `build.server` will resolve to `<root>/dist/nested/server/`

Previously the values were incorrectly resolved:

*   `build.client` was resolved to `<root>/dist/nested/dist/client/`
*   `build.server` was resolved to `<root>/dist/nested/dist/server/`

#### What should I do?

[Section titled What should I do?](#what-should-i-do-22)

If you were relying on the previous build paths, make sure that your project code is updated to the new build paths.

Read more about [`build` configuration options in Astro](/en/reference/configuration-reference/#build-options).

### Changed: JS dependencies in config file are no longer processed by Vite

[Section titled Changed: JS dependencies in config file are no longer processed by Vite](#changed-js-dependencies-in-config-file-are-no-longer-processed-by-vite)

[Implementation PR: Set external: true when loading astro config (#11819)](https://github.com/withastro/astro/pull/11819)

In Astro 4.x, locally-linked JS dependencies (e.g. `npm link`, in a monorepo, etc) were able to use Vite features like `import.meta.glob` when imported by the Astro config file.

Astro 5 updates the Astro config loading flow to ignore processing locally-linked JS dependencies with Vite. Dependencies exporting raw TypeScript files are unaffected. Instead, these JS dependencies will be normally imported by the Node.js runtime the same way as other dependencies from `node_modules`.

This change was made as the previous behavior caused confusion among integration authors who tested against a package that worked locally, but not when published. It also restricted using CJS-only dependencies because Vite required the code to be ESM. While this change only affects JS dependencies, it’s also recommended for packages to export JavaScript instead of raw TypeScript where possible to prevent accidental Vite-specific usage as it’s an implementation detail of Astro’s config loading flow.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-23)

Make sure your locally-linked JS dependencies are built before running your Astro project. Then, the config loading should work as before.

Read more about [Vite configuration settings in Astro](/en/reference/configuration-reference/#vite).

### Changed: URLs returned by `paginate()`

[Section titled Changed: URLs returned by paginate()](#changed-urls-returned-by-paginate)

[Implementation PR: Add base to paginate (#11253)](https://github.com/withastro/astro/pull/11253)

In Astro v4.x, the URL returned by `paginate()` (e.g. `page.url.next`, `page.url.first`, etc.) did not include the value set for `base` in your Astro config. You had to manually prepend your configured value for `base` to the URL path.

Astro 5.0 automatically includes the `base` value in `page.url`.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-24)

If you are using the `paginate()` function for these URLs, remove any existing `base` value as it is now added for you:

    ---export async function getStaticPaths({ paginate }) {  const astronautPages = [{    astronaut: 'Neil Armstrong',  }, {    astronaut: 'Buzz Aldrin',  }, {    astronaut: 'Sally Ride',  }, {    astronaut: 'John Glenn',  }];  return paginate(astronautPages, { pageSize: 1 });}const { page } = Astro.props;// `base: /'docs'` configured in `astro.config.mjs`const prev = "/docs" + page.url.prev;const prev = page.url.prev;---<a id="prev" href={prev}>Back</a>

Read more about [pagination in Astro](/en/guides/routing/#pagination).

### Changed: non-boolean HTML attribute values

[Section titled Changed: non-boolean HTML attribute values](#changed-non-boolean-html-attribute-values)

[Implementation PR: Fix attribute rendering for boolean values (take 2) (#11660)](https://github.com/withastro/astro/pull/11660)

In Astro v4.x, non-[boolean HTML attributes](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML) may not have included their values when rendered to HTML.

Astro v5.0 renders the values explicitly as `="true"` or `="false"`, matching proper attribute handling in browsers.

In the following `.astro` examples, only `allowfullscreen` is a boolean attribute:

src/pages/index.astro

    <!-- `allowfullscreen` is a boolean attribute --><p allowfullscreen={true}></p><p allowfullscreen={false}></p><!-- `inherit` is *not* a boolean attribute --><p inherit={true}></p><p inherit={false}></p><!-- `data-*` attributes are not boolean attributes --><p data-light={true}></p><p data-light={false}></p>

Astro v5.0 now preserves the full data attribute with its value when rendering the HTML of non-boolean attributes:

    <p allowfullscreen></p><p></p>
    <p inherit="true"></p><p inherit></p><p inherit="false"></p>
    <p data-light></p><p data-light="true"></p><p></p><p data-light="false"></p>

#### What should I do?

[Section titled What should I do?](#what-should-i-do-25)

If you rely on attribute values, for example, to locate elements or to conditionally render, update your code to match the new non-boolean attribute values:

    el.getAttribute('inherit') === ''el.getAttribute('inherit') === 'false'
    el.hasAttribute('data-light')el.dataset.light === 'true'

Read more about [using HTML attributes in Astro](/en/reference/astro-syntax/#dynamic-attributes).

### Changed: adding values to `context.locals`

[Section titled Changed: adding values to context.locals](#changed-adding-values-to-contextlocals)

[Implementation PR: TODOs (#11987)](https://github.com/withastro/astro/pull/11987)

In Astro 4.x, it was possible to completely replace the entire `locals` object in middleware, API endpoints, and pages when adding new values.

Astro 5.0 requires you to append values to the existing `locals` object without deleting it. Locals in middleware, API endpoints, and pages, can no longer be completely overridden.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-26)

Where you previously were overwriting the object, you must now instead assign values to it:

src/middleware.js

    ctx.locals = {Object.assign(ctx.locals, {  one: 1,  two: 2}})

See more about [storing data in `context.locals`](/en/guides/middleware/#storing-data-in-contextlocals).

### Changed: `params` no longer decoded

[Section titled Changed: params no longer decoded](#changed-params-no-longer-decoded)

[Implementation PR: decode pathname early, don't decode params (#12079)](https://github.com/withastro/astro/pull/12079)

In Astro v4.x, `params` passed to `getStaticPath()` were automatically decoded using `decodeURIComponent`.

Astro v5.0 no longer decodes the value of `params` passed to `getStaticPaths`. You must manually decode them yourself if needed.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-27)

If you were previously relying on the automatic decoding, use `decodeURI` when passing `params`.

src/pages/\[id\].astro

    ---export function getStaticPaths() {  return [    { params: { id: "%5Bpage%5D" } },    { params: { id: decodeURI("%5Bpage%5D") } },  ]}
    const { id } = Astro.params;---

Note that the use of [`decodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) is discouraged for `getStaticPaths` because it decodes more characters than it should, for example `/`, `?`, `#` and more.

Read more about [creating dynamic routes with `params`](/en/guides/routing/#static-ssg-mode).

### Changed: `RouteData` type replaced by `IntegrationsRouteData` (Integrations API)

[Section titled Changed: RouteData type replaced by IntegrationsRouteData (Integrations API)](#changed-routedata-type-replaced-by-integrationsroutedata-integrations-api)

[Implementation PR: send \`IntegrationRouteData\` to integrations (#11864)](https://github.com/withastro/astro/pull/11864)

In Astro v4.x, the `entryPoints` type inside the `astro:build:ssr` and `astro:build:done` hooks was `RouteData`.

Astro v5.0 the `entryPoints` type is now `IntegrationRouteData`, which contains a subset of the `RouteData` type. The fields `isIndex` and `fallbackRoutes` were removed.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-28)

Update your adapter to change the type of `entryPoints` from `RouteData` to `IntegrationRouteData`.

    import type {RouteData} from 'astro';import type {IntegrationRouteData} from "astro"
    function useRoute(route: RouteData) {function useRoute(route: IntegrationRouteData) {}

See the [API reference for `IntegrationRouteData`](/en/reference/integrations-reference/#integrationroutedata-type-reference).

### Changed: `distURL` is now an array (Integrations API)

[Section titled Changed: distURL is now an array (Integrations API)](#changed-disturl-is-now-an-array-integrations-api)

[Implementation PR: send \`IntegrationRouteData\` to integrations (#11864)](https://github.com/withastro/astro/pull/11864)

In Astro v4.x, `RouteData.distURL` was `undefined` or a `URL`.

Astro v5.0 updates the shape of `IntegrationRouteData.distURL` to be `undefined` or an array of `URL`s. This fixes a previous error because a route can generate multiple files on disk, especially when using dynamic routes such as `[slug]` or `[...slug]`.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-29)

Update your code to handle `IntegrationRouteData.distURL` as an array.

    if (route.distURL) {  if (route.distURL.endsWith('index.html')) {    // do something  }  for (const url of route.distURL) {    if (url.endsWith('index.html')) {      // do something    }  }}

See the [API reference for `IntegrationRouteData`](/en/reference/integrations-reference/#integrationroutedata-type-reference).

### Changed: Arguments passed to `app.render()` (Adapter API)

[Section titled Changed: Arguments passed to app.render() (Adapter API)](#changed-arguments-passed-to-apprender-adapter-api)

[Implementation PR: TODOs (#11987)](https://github.com/withastro/astro/pull/11987)

In Astro 4.x, The Adapter API method `app.render()` could receive three arguments: a mandatory `request`, an object of options or a `routeData` object, and `locals`.

Astro 5.0 combines these last two arguments into a single options argument named `renderOptions`.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-30)

Pass an object as the second argument to `app.render()`, which can include `routeData` and `locals` as properties.

    const response = await app.render(request, routeData, locals);const response = await app.render(request, {routeData, locals});

See the [Adapter API reference for `renderOptions`](/en/reference/adapter-reference/#renderoptions).

### Changed: Properties on `supportedAstroFeatures` (Adapter API)

[Section titled Changed: Properties on supportedAstroFeatures (Adapter API)](#changed-properties-on-supportedastrofeatures-adapter-api)

[Implementation PR: rework supportedAstroFeatures (#11806)](https://github.com/withastro/astro/pull/11806)

In Astro 4.x, `supportedAstroFeatures`, which allows adapter authors to specify which features their integration supports, included an `assets` property to specify which of Astro’s image services were supported.

Astro 5.0 replaces this property with a dedicated `sharpImageService` property, used to determine whether the adapter is compatible with the built-in sharp image service.

v5.0 also adds a new `limited` value for the different properties of `supportedAstroFeatures` for adapters, which indicates that the adapter is compatible with the feature, but with some limitations. This is useful for adapters that support a feature, but not in all cases or with all options.

Additionally, the value of the different properties on `supportedAstroFeatures` for adapters can now be objects, with `support` and `message` properties. The content of the `message` property will show a helpful message in the Astro CLI when the adapter is not compatible with a feature. This is notably useful with the new `limited` value, to explain to the user why support is limited.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-31)

If you were using the `assets` property, remove this as it is no longer available. To specify that your adapter supports the built-in sharp image service, replace this with `sharpImageService`.

You may also wish to update your supported features with the new `limited` option and include a message about your adapter’s support.

my-adapter.mjs

    supportedAstroFeatures: {  assets: {    supportKind: "stable",    isSharpCompatible: true,    isSquooshCompatible: true,  },  sharpImageService: {    support: "limited",    message: 'This adapter supports the built-in sharp image service, but with some limitations.'  }}

Read more about [specifying supported Astro features in an adapter](/en/reference/adapter-reference/#astro-features).

### Removed: Deprecated definition shape for dev toolbar apps (Dev Toolbar API)

[Section titled Removed: Deprecated definition shape for dev toolbar apps (Dev Toolbar API)](#removed-deprecated-definition-shape-for-dev-toolbar-apps-dev-toolbar-api)

[Implementation PR: Remove deprecated dev toolbar app shape (#11987)](https://github.com/withastro/astro/pull/11987)

In Astro 4.x, when building a dev toolbar app, it was still possible to use the previously deprecated `addDevToolbarApp(string);` signature. The `id`, `title`, and `icon` properties to define the app were then made available through the default export of the app’s `entrypoint`.

Astro 5.0 completely removes this option entirely in favor of the current object shape when defining a dev toolbar app in an integration that’s more intuitive and allows Astro to provide better errors when toolbar apps fail to load correctly.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-32)

If you were using the deprecated shape, update your dev toolbar app to use the new shape:

my-integration.mjs

    // Old shapeaddDevToolbarApp("./my-dev-toolbar-app.mjs");
    // New shapeaddDevToolbarApp({  id: "my-app",  name: "My App",  icon: "<svg>...</svg>",  entrypoint: "./my-dev-toolbar-app.mjs",});

my-dev-toolbar-app.mjs

    export default {  id: 'my-dev-toolbar-app',  title: 'My Dev Toolbar App',  icon: '🚀',  init() {    // ...  }}

Read more about [developing a dev toolbar app for Astro using the Dev Toolbar API](/en/reference/dev-toolbar-app-reference/).

### Removed: configuring Typescript during `create-astro`

[Section titled Removed: configuring Typescript during create-astro](#removed-configuring-typescript-during-create-astro)

[Implementation PR: create-astro updates (#12083)](https://github.com/withastro/astro/pull/12083)

In Astro v4.x, it was possible to choose between Astro’s three TypeScript settings when creating a new project using `create astro`, either by answering a question or by passing an associated `--typescript` flag with the desired TypeScript setting.

Astro 5.0 updates the `create astro` CLI command to remove the TypeScript question and its associated `--typescript` flag. The “strict” preset is now the default for all new projects created with the command line and it is no longer possible to customize this at that time. However, the TypeScript template can still be changed manually in `tsconfig.json`.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-33)

If you were using the `--typescript` flag with `create-astro`, remove it from your command.

*   [npm](#tab-panel-3337)
*   [pnpm](#tab-panel-3338)
*   [Yarn](#tab-panel-3339)

Terminal window

    npm create astro@latest -- --template <example-name> --typescript strictnpm create astro@latest -- --template <example-name>

Terminal window

    pnpm create astro@latest --template <example-name> --typescript strictpnpm create astro@latest --template <example-name>

Terminal window

    yarn create astro --template <example-name> --typescript strictyarn create astro --template <example-name>

See [all the available `create astro` command flags](https://github.com/withastro/astro/blob/main/packages/create-astro/README.md)

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

Know a good resource for Astro v5.0? [Edit this page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/upgrade-to/v5.mdx) and add a link below!

Known Issues
------------

[Section titled Known Issues](#known-issues)

Please check [Astro’s issues on GitHub](https://github.com/withastro/astro/issues/) for any reported issues, or to file an issue yourself.

Upgrade Guides

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/upgrade-to/v5.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Upgrade Astro](/en/upgrade-astro/) [Next  
v4.0](/en/guides/upgrade-to/v4/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

