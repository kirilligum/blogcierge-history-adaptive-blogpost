# Aggregated from ./pages/guides/upgrade-to/v1
Legacy v0.x Upgrade Guide
=========================

This guide will help you upgrade through breaking changes in pre-v1 versions of Astro.

You can update your project’s version of Astro to the latest version using your package manager. If you’re using Astro integrations, you’ll also want to update those to the latest version.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3322)
*   [pnpm](#tab-panel-3323)
*   [Yarn](#tab-panel-3324)

Terminal window

    # updates the astro dependency:npm upgrade astro# or, to update all dependencies:npm upgrade

Terminal window

    # updates the astro dependency:pnpm upgrade astro# or, to update all dependencies:pnpm upgrade

Terminal window

    # updates the astro dependency:yarn upgrade astro# or, to update all dependencies:yarn upgrade

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Read the guide below for major highlights and instructions on how to handle breaking changes.

Astro 1.0
---------

[Section titled Astro 1.0](#astro-10)

Astro v1.0 introduces some changes that you should be aware of when migrating from v0.x and v1.0-beta releases. See below for more details.

### Updated: Vite 3

[Section titled Updated: Vite 3](#updated-vite-3)

Astro v1.0 has upgraded from Vite 2 to [Vite 3](https://vite.dev/). We’ve handled most of the upgrade for you inside of Astro; however, some subtle Vite behaviors may still change between versions. Refer to the official [Vite Migration Guide](https://vite.dev/guide/migration.html#general-changes) if you run into trouble.

### Deprecated: `Astro.canonicalURL`

[Section titled Deprecated: Astro.canonicalURL](#deprecated-astrocanonicalurl)

You can now use the new [`Astro.url`](/en/reference/api-reference/#url) helper to construct your own canonical URL from the current page/request URL.

    // Before:const canonicalURL = Astro.canonicalURL;// After:const canonicalURL = new URL(Astro.url.pathname, Astro.site);

### Changed: Scoped CSS specificity

[Section titled Changed: Scoped CSS specificity](#changed-scoped-css-specificity)

[Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) will now be preserved in scoped CSS styles. This change will cause most scoped styles to _happen_ to take precedence over global styles. But, this behavior is no longer explicitly guaranteed.

Technically, this is accomplished using [the `:where()` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) instead of using classes directly in Astro’s CSS output.

Let’s use the following style block in an Astro component as an example:

    <style>  div { color: red; } /* 0-0-1 specificity */</style>

Previously, Astro would transform this into the following CSS, which has a specificity of `0-1-1` — a higher specificity than the source CSS:

    div.astro-XXXXXX { color: red; } /* 0-1-1 specificity */

Now, Astro wraps the class selector with `:where()`, maintaining the authored specificity:

    div:where(.astro-XXXXXX) { color: red; } /* 0-0-1 specificity */

The previous specificity increase made it hard to combine scoped styles in Astro with other CSS files or styling libraries (e.g. Tailwind, CSS Modules, Styled Components, Stitches). This change will allow Astro’s scoped styles to work consistently alongside them while still preserving the exclusive boundaries that prevent styles from applying outside the component.

Caution

When upgrading, please visually inspect your site output to make sure everything is styled as expected. If not, find your scoped style and increase the selector specificity manually to match the old behavior.

### Deprecated: Components and JSX in Markdown

[Section titled Deprecated: Components and JSX in Markdown](#deprecated-components-and-jsx-in-markdown)

Astro no longer supports components or JSX expressions in Markdown pages by default. For long-term support you should migrate to the [`@astrojs/mdx`](/en/guides/integrations-guide/mdx/) integration.

To make migrating easier, a new `legacy.astroFlavoredMarkdown` flag (removed in v2.0) can be used to re-enable previous Markdown features.

### Converting existing `.md` files to `.mdx`

[Section titled Converting existing .md files to .mdx](#converting-existing-md-files-to-mdx)

If you’re not familiar with MDX, here are some steps you can follow to quickly convert an existing “Astro Flavored Markdown” file to MDX. As you learn more about MDX, feel free to explore other ways of writing your pages!

1.  Install the [`@astrojs/mdx`](/en/guides/integrations-guide/mdx/) integration.
    
2.  Change your existing `.md` file extensions to `.mdx`
    
3.  Remove any `setup:` properties from your frontmatter, and write any import statements below the frontmatter instead.
    
    src/pages/posts/my-post.mdx
    
        ---layout: '../../layouts/BaseLayout.astro'setup: |  import ReactCounter from '../../components/ReactCounter.jsx'title: 'Migrating to MDX'date: 2022-07-26tags: ["markdown", "mdx", "astro"]---import ReactCounter from '../../components/ReactCounter.jsx'
        # {frontmatter.title}
        Here is my counter component, working in MDX:
        <ReactCounter client:load />
    
4.  Update any `Astro.glob()` statements that currently return `.md` files so that they will now return your `.mdx` files.
    
    Caution
    
    The object returned when importing `.mdx` files (including using Astro.glob) differs from the object returned when importing `.md` files. However, `frontmatter`, `file`, and `url` work identically.
    
5.  Update any use of the `<Content />` component to use the default export when importing MDX:
    
    src/pages/index.astro
    
        ---// Multiple imports with Astro.globconst mdxPosts = await Astro.glob('./posts/*.mdx');---
        {mdxPosts.map(Post => <Post.default />)}
    
    src/pages/index.astro
    
        ---// Import a single pageimport { default as About } from './about.mdx';---
        <About />
    

Tip

While you are transitioning to MDX, you may wish to enable the `legacy.astroFlavoredMarkdown` flag (removed in v2.0) and include both **`.md` and `.mdx`** files, so that your site continues to function normally even before all your files have been converted. Here is one way you can do that:

    ---const mdPosts = await Astro.glob('../pages/posts/*.md');const mdxPosts = await Astro.glob('../pages/posts/*.mdx');const allPosts = [...mdxPosts, ...mdPosts];---

### `<Markdown />` Component Removed

[Section titled &lt;Markdown /&gt; Component Removed](#markdown--component-removed)

Astro’s built-in `<Markdown />` component has been moved to a separate package. To continue using this component, you will now need to install `@astrojs/markdown-component` and update your imports accordingly. For more details, see [the `@astrojs/markdown` README](https://github.com/withastro/astro/tree/main/packages/markdown/component).

Tip

Astro now has support for [MDX](https://mdxjs.com/) through our [MDX integration](https://github.com/withastro/astro/tree/main/packages/integrations/mdx). MDX gives you the ability to include both Markdown and imported components in the same file. MDX can be good alternative for the `<Markdown />` component due to its large community and stable APIs.

Migrate to v1.0.0-beta
----------------------

[Section titled Migrate to v1.0.0-beta](#migrate-to-v100-beta)

On April 4, 2022 we released the Astro 1.0 Beta! 🎉

If you are coming from v0.25 or earlier, make sure you have read and followed the [v0.26 Migration Guide](#migrate-to-v026) below, which contained several major breaking changes.

The `v1.0.0-beta.0` release of Astro contained no breaking changes. Below are small changes that were introduced during the beta period.

### Changed: RSS Feeds

[Section titled Changed: RSS Feeds](#changed-rss-feeds)

RSS feeds should now be generated using the `@astrojs/rss` package, as described in our [RSS guide](/en/recipes/rss/).

Migrate to v0.26
----------------

[Section titled Migrate to v0.26](#migrate-to-v026)

### New Configuration API

[Section titled New Configuration API](#new-configuration-api)

Our Configuration API has been redesigned to solve a few glaring points of confusion that had built up over the last year. Most of the configuration options have just been moved or renamed, which will hopefully be a quick update for most users. A few options have been refactored more heavily, and may require a few additional changes:

*   `.buildOptions.site` has been replaced with `.site` (your deployed domain) and a new `.base` (your deployed subpath) option.
*   `.markdownOptions` has been replaced with `.markdown`, a mostly similar config object with some small changes to simplify Markdown configuration.
*   `.sitemap` has been moved into the [@astrojs/sitemap](https://www.npmjs.com/package/@astrojs/sitemap) integration.

If you run Astro with legacy configuration, you will see a warning with instructions on how to update. See our updated [Configuration Reference](/en/reference/configuration-reference/) for more information on upgrading.

Read [RFC0019](https://github.com/withastro/rfcs/blob/main/proposals/0019-config-finalization.md) for more background on these changes.

### New Markdown API

[Section titled New Markdown API](#new-markdown-api)

Astro v0.26 releases a brand new Markdown API for your content. This included three major user-facing changes:

*   You can now `import`/`import()` markdown content directly using an ESM import.
*   A new `Astro.glob()` API, for easier glob imports (especially for Markdown).
*   **BREAKING CHANGE:** `Astro.fetchContent()` has been removed and replaced by `Astro.glob()`
*   **BREAKING CHANGE:** Markdown objects have an updated interface.

    // v0.25let allPosts = Astro.fetchContent('./posts/*.md');// v0.26+let allPosts = await Astro.glob('./posts/*.md');

When migrating, be careful about the new Markdown object interface. Frontmatter, for example, has been moved to the `.frontmatter` property, so references like `post.title` should change to `post.frontmatter.title`.

This should solve many issues for Markdown users, including some nice performance boosts for larger sites.

Read [RFC0017](https://github.com/withastro/rfcs/blob/main/proposals/0017-markdown-content-redesign.md) for more background on these changes.

### New Default Script Behavior

[Section titled New Default Script Behavior](#new-default-script-behavior)

`<script>` tags in Astro components are now built, bundled and optimized by default. This completes a long-term move to make our Astro component syntax more consistent, matching the default-optimized behavior our `<style>` tags have today.

This includes a few changes to be aware of:

*   **BREAKING:** `<script hoist>` is the new default `<script>` behavior. The `hoist` attribute has been removed. To use the new default behaviour, make sure there are no other attributes on the `<script>` tag. For example, remove `type="module"` if you were using it before.
*   New `<script is:inline>` directive, to revert a `<script>` tag to previous default behavior (unbuilt, unbundled, untouched by Astro).
*   New `<style is:inline>` directive, to leave a style tag inline in the page template (similar to previous `<script>` behavior).
*   New `<style is:global>` directive to replace `<style global>` in a future release.

    // v0.25<script hoist type="module">// v0.26+<script>

See how to use [client-side scripts](/en/guides/client-side-scripts/) in Astro for full details.

Read [RFC0016](https://github.com/withastro/rfcs/blob/main/proposals/0016-style-script-defaults.md) for more background on these changes.

### Updated `Astro.request` API

[Section titled Updated Astro.request API](#updated-astrorequest-api)

`Astro.request` has been changed from our custom object to a standard `Request` object. This is part of a project to use more web standard APIs, especially where SSR is concerned.

This includes a few changes to be aware of:

*   Change `Astro.request` to become a [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object.
*   Move `Astro.request.params` to `Astro.params`.
*   Move `Astro.request.canonicalURL` to `Astro.canonicalURL`.

Read [RFC0018](https://github.com/withastro/rfcs/blob/main/proposals/0018-astro-request.md) for more background on these changes.

### Other Changes

[Section titled Other Changes](#other-changes)

*   Improve `Astro.slots` API to support passing arguments to function-based slots. This allows for more ergonomic utility components that accept a callback function as a child.
*   Update CLI output formatting, especially around error reporting.
*   Update `@astrojs/compiler`, fixing some bugs related to RegExp usage in frontmatter

Migrate to v0.25
----------------

[Section titled Migrate to v0.25](#migrate-to-v025)

### Astro Integrations

[Section titled Astro Integrations](#astro-integrations)

The `renderers` config has been replaced by a new, official integration system! This unlocks some really exciting new features for Astro. You can read our [Using Integrations](/en/guides/integrations-guide/) guide for more details on how to use this new system.

Integrations replace our original `renderers` concept, and come with a few breaking changes and new defaults for existing users. These changes are covered below.

#### Removed: Built-in Framework Support

[Section titled Removed: Built-in Framework Support](#removed-built-in-framework-support)

Previously, React, Preact, Svelte, and Vue were all included with Astro by default. Starting in v0.25.0, Astro no longer comes with any built-in renderers. If you did not have a `renderers` configuration entry already defined for your project, you will now need to install those frameworks yourself.

Read our [step-by-step walkthrough](/en/guides/integrations-guide/) to learn how to add a new Astro integration for the framework(s) that you currently use.

#### Deprecated: Renderers

[Section titled Deprecated: Renderers](#deprecated-renderers)

Note

Read this section if you have custom “renderers” already defined in your configuration file.

The new integration system replaces the previous `renderers` system, including the published `@astrojs/renderer-*` packages on npm. Going forward, `@astrojs/renderer-react` becomes `@astrojs/react`, `@astrojs/renderer-vue` becomes `@astrojs/vue`, and so on.

**To migrate:** update Astro to `v0.25.0` and then run `astro dev` or `astro build` with your old configuration file containing the outdated `"renderers"` config. You will immediately see a notice telling you the exact changes you need to make to your `astro.config.mjs` file, based on your current config. You can also update your packages yourself, using the table below.

For a deeper walkthrough, read our [step-by-step guide](/en/guides/integrations-guide/) to learn how to replace existing renderers with a new Astro framework integration.

Terminal window

    # Install your new integrations and frameworks:# (Read the full walkthrough: https://docs.astro.build/en/guides/integrations-guide)npm install @astrojs/lit litnpm install @astrojs/react react react-dom

    // Then, update your `astro.config.mjs` file:// (Read the full walkthrough: https://docs.astro.build/en/guides/integrations-guide)import lit from '@astrojs/lit';import react from '@astrojs/react';
    export default {  renderers: ['@astrojs/renderer-lit', '@astrojs/renderer-react'],  integrations: [lit(), react()],}

Deprecated Renderers on npm

v0.25+ Integrations on npm

@astrojs/renderer-react

@astrojs/react

@astrojs/renderer-preact

@astrojs/preact

@astrojs/renderer-solid

@astrojs/solid-js

@astrojs/renderer-vue

@astrojs/vue

@astrojs/renderer-svelte

@astrojs/svelte

#### Handling Peer Dependencies

[Section titled Handling Peer Dependencies](#handling-peer-dependencies)

Note

Read this section if: You are on Node v14 **or** if you use any package manager other than npm.

Unlike the old renderers, integrations no longer mark the frameworks themselves (“react”, “svelte”, “vue”, etc.) as direct dependencies of the integration. Instead, you should now install your framework packages _in addition to_ your integrations.

Terminal window

    # Example: Install integrations and frameworks togethernpm install @astrojs/react react react-dom

If you see a `"Cannot find package 'react'"` (or similar) warning when you start up Astro, that means that you need to install that package into your project. See our [note on peer dependencies](/en/guides/troubleshooting/#cannot-find-package-x) in the troubleshooting guide for more information.

If you are using `npm` & Node v16+, then this may be automatically handled for you by `npm`, since the latest version of `npm` (v7+) installs peer dependencies like this for you automatically. In that case, installing a framework like “react” into your project is an optional but still recommended step.

### Updated: Syntax Highlighting

[Section titled Updated: Syntax Highlighting](#updated-syntax-highlighting)

We love to find sensible defaults that “just work” out-of-the-box. As part of this, we decided to make [Shiki](https://github.com/shikijs/shiki) our new default syntax highlighter. This comes pre-configured with the `github-dark` theme, providing zero-config highlighting in your code blocks without extraneous CSS classes, stylesheets, or client-side JS.

Check our new syntax highlighting docs for full details. **If you prefer to keep Prism as your syntax highlighter,** set the `syntaxHighlight` option to `'prism'` in your project’s markdown configuration.

#### The `<Prism />` component has a new home

[Section titled The &lt;Prism /&gt; component has a new home](#the-prism--component-has-a-new-home)

As part of our mission to keep Astro core as lean as possible, we’ve moved the built-in `Prism` component out of `astro/components` and into the `@astrojs/prism` package. You can now import this component from `@astrojs/prism` like so:

    ---import { Prism } from '@astrojs/prism';---

Since the `@astrojs/prism` package is still bundled with `astro` core, you won’t need to install anything new, nor add Prism as an integration! However, note that we _do_ plan to extract `@astrojs/prism` (and Prism syntax highlighting in general) to a separate, installable package in the future. See the `<Prism />` component API reference for more details.

### CSS Parser Upgrade

[Section titled CSS Parser Upgrade](#css-parser-upgrade)

Our internal CSS parser has been updated, and comes with better support for advanced CSS syntax, like container queries. This should be a mostly invisible change for most users, but hopefully advanced users will enjoy the new CSS feature support.

Migrate to v0.24
----------------

[Section titled Migrate to v0.24](#migrate-to-v024)

Note

The new build strategy is on by default on 0.24. If you run into a problem you can continue using the old build strategy by passing the `--legacy-build` flag. Please [open an issue](https://github.com/withastro/astro/issues/new/choose) so that we can resolve problems with the new build strategy.

0.24 introduced a new _static build_ strategy that changes the behavior of a few features. In previous versions of Astro this was available behavior with an opt-in flag: `--experimental-static-build`.

To migrate for the transition, be aware of the following changes that will be required to move to this new build engine. You can make these changes to your codebase at any time so that you are ready ahead of schedule.

### Deprecated: `Astro.resolve()`

[Section titled Deprecated: Astro.resolve()](#deprecated-astroresolve)

`Astro.resolve()` allows you to get resolved URLs to assets that you might want to reference in the browser. This was most commonly used inside of `<link>` and `<img>` tags to load CSS files and images as needed. Unfortunately, this will no longer work due to Astro now building assets at _build time_ rather than at _render time_. You’ll want to upgrade your asset references to one of the following future-proof options available going forward:

#### How to Resolve CSS Files

[Section titled How to Resolve CSS Files](#how-to-resolve-css-files)

**1\. ESM Import (Recommended)**

**Example:** `import './style.css';` **When to use this:** If your CSS file lives inside of the `src/` directory, and you want automatic CSS build and optimization features.

Use an ESM import to add some CSS onto the page. Astro detects these CSS imports and then builds, optimizes, and adds the CSS to the page automatically. This is the easiest way to migrate from `Astro.resolve()` while keeping the automatic building/bundling that Astro provides.

    ---// Example: Astro will include and optimize this CSS for you automaticallyimport './style.css';---<html><!-- Your page here --></html>

Importing CSS files should work anywhere that ESM imports are supported, including:

*   JavaScript files
*   TypeScript files
*   Astro component frontmatter
*   non-Astro components like React, Svelte, and others

When a CSS file is imported using this method, any `@import` statements are also resolved and inlined into the imported CSS file. All `url()` references are also resolved relative to the source file, and any `url()` referenced assets will be included in the final build.

**2\. Absolute URL Path**

**Example:** `<link href="/style.css">` **When to use this:** If your CSS file lives inside of `public/`, and you prefer to create your HTML `link` element yourself.

You can reference any file inside of the `public/` directory by absolute URL path in your component template. This is a good option if you want to control the `<link>` tag on the page yourself. However, this approach also skips the CSS processing, bundling and optimizations that are provided by Astro when you use the `import` method described above.

We recommend using the `import` approach over the absolute URL approach since it provides the best possible CSS performance and features by default.

#### How to Resolve JavaScript Files

[Section titled How to Resolve JavaScript Files](#how-to-resolve-javascript-files)

**1\. Absolute URL Path**

**Example:** `<script src="/some-external-script.js" />` **When to use this:** If your JavaScript file lives inside of `public/`.

You can reference any file inside of the `public/` directory by absolute URL path in your Astro component templates. This is a good default option for external scripts because it lets you control the `<script>` tag on the page yourself.

Note that this approach skips the JavaScript processing, bundling and optimizations that are provided by Astro when you use the `import` method described below. However, this may be preferred for any external scripts that have already been published and minified separately from Astro. If your script was downloaded from an external source, then this method is probably preferred.

**2\. ESM Import via `<script hoist>`**

**Example:** `<script hoist>import './some-external-script.js';</script>` **When to use this:** If your external script lives inside of `src/` _and_ it supports the ESM module type.

Use an ESM import inside of a `<script hoist>` element in your Astro template, and Astro will include the JavaScript file in your final build. Astro detects these JavaScript client-side imports and then builds, optimizes, and adds the JavaScript to the page automatically. This is the easiest way to migrate from `Astro.resolve()` while keeping the automatic building/bundling that Astro provides.

    <script hoist>  import './some-external-script.js';</script>

Note that Astro will bundle this external script with the rest of your client-side JavaScript, and load it in the `type="module"` script context. Some older JavaScript files may not be written for the `module` context, in which case they may need to be updated to use this method.

#### How to Resolve Images & Other Assets

[Section titled How to Resolve Images &amp; Other Assets](#how-to-resolve-images--other-assets)

**1\. Absolute URL Path (Recommended)**

**Example:** `<img src="/penguin.png">` **When to use this:** If your asset lives inside of `public/`.

If you place your images inside of `public/` you can safely reference them by absolute URL path directly in your component templates. This is the simplest way to reference an asset that you can use today, and it is recommended for most users who are getting started with Astro.

**2\. ESM Import**

**Example:** `import imgUrl from './penguin.png'` **When to use this:** If your asset lives inside of the `src/` directory, and you want automatic optimization features like filename hashing.

This works inside of any JavaScript or Astro component, and returns a resolved URL to the final image. Once you have the resolved URL, you can use it anywhere inside of the component template.

    ---// Example: Astro will include this image file in your final buildimport imgUrl from './penguin.png';---<img src={imgUrl} />

Similar to how Astro handles CSS, the ESM import allows Astro to perform some simple build optimizations for you automatically. For example, any asset inside of `src/` that is imported using an ESM import (ex: `import imgUrl from './penguin.png'`) will have its filename hashed automatically. This can let you cache the file more aggressively on the server, improving user performance. In the future, Astro may add more optimizations like this.

**Tip:** If you dislike static ESM imports, Astro also supports dynamic ESM imports. We only recommend this option if you prefer this syntax: `<img src={(await import('./penguin.png')).default} />`.

### Deprecated: `<script>` Default Processing

[Section titled Deprecated: &lt;script&gt; Default Processing](#deprecated-script-default-processing)

Previously, all `<script>` elements were read from the final HTML output and processed + bundled automatically. This behavior is no longer the default. Starting in 0.24, you must opt-in to `<script>` element processing via the `hoist` attribute. The `type="module"` is also required for hoisted modules.

    <script>  // Will be rendered into the HTML exactly as written!  // ESM imports will not be resolved relative to the file.</script><script type="module" hoist>  // Processed! Bundled! ESM imports work, even to npm packages.</script>

Migrate to v0.23
----------------

[Section titled Migrate to v0.23](#migrate-to-v023)

### Missing Sass Error

[Section titled Missing Sass Error](#missing-sass-error)

    Preprocessor dependency "sass" not found. Did you install it?

In our quest to reduce npm install size, we’ve moved [Sass](https://sass-lang.com/) out to an optional dependency. If you use Sass in your project, you’ll want to make sure that you run `npm install sass --save-dev` to save it as a dependency.

### Deprecated: Unescaped HTML

[Section titled Deprecated: Unescaped HTML](#deprecated-unescaped-html)

In Astro v0.23+, unescaped HTML content in expressions is now deprecated. In future releases, content within expressions will have strings escaped to protect against unintended HTML injection.

    <h1>{title}</h1> <!-- <h1>Hello <strong>World</strong></h1> --><h1>{title}</h1> <!-- <h1>Hello &lt;strong&gt;World&lt;/strong&gt;</h1> -->

To continue injecting unescaped HTML, you can now use `set:html`.

    <h1>{title}</h1><h1 set:html={title} />

To avoid a wrapper element, `set:html` can work alongside `<Fragment>`.

    <h1>{title}!</h1><h1><Fragment set:html={title}>!</h1>

You can also protect against unintended HTML injection with `set:text`.

    <h1 set:text={title} /> <!-- <h1>Hello &lt;strong&gt;World&lt;/strong&gt;</h1> -->

Migrate to v0.21
----------------

[Section titled Migrate to v0.21](#migrate-to-v021)

### Vite

[Section titled Vite](#vite)

Starting in v0.21, Astro is built with [Vite](https://vite.dev). As a result, configurations written in `snowpack.config.mjs` should be moved into `astro.config.mjs`.

    // @ts-check
    /** @type {import('astro').AstroUserConfig} */export default {  renderers: [],  vite: {    plugins: [],  },};

To learn more about configuring Vite, please visit their [configuration guide](https://vite.dev/config/).

#### Vite Plugins

[Section titled Vite Plugins](#vite-plugins)

In Astro v0.21+, Vite plugins may be configured within `astro.config.mjs`.

    import { imagetools } from 'vite-imagetools';
    export default {  vite: {    plugins: [imagetools()],  },};

To learn more about Vite plugins, please visit their [plugin guide](https://vite.dev/guide/using-plugins.html).

#### Vite Changes to Renderers

[Section titled Vite Changes to Renderers](#vite-changes-to-renderers)

In Astro v0.21+, plugins should now use `viteConfig()`.

renderer-svelte/index.js

    import { svelte } from '@sveltejs/vite-plugin-svelte';
    export default {  name: '@astrojs/renderer-svelte',  client: './client.js',  server: './server.js',  snowpackPlugin: '@snowpack/plugin-svelte',  snowpackPluginOptions: { compilerOptions: { hydratable: true } },  viteConfig() {    return {      optimizeDeps: {        include: ['@astrojs/renderer-svelte/client.js', 'svelte', 'svelte/internal'],        exclude: ['@astrojs/renderer-svelte/server.js'],      },      plugins: [        svelte({          emitCss: true,          compilerOptions: { hydratable: true },        }),      ],    };  },}

To learn more about Vite plugins, please visit their [plugin guide](https://vite.dev/guide/using-plugins.html).

Note

In prior releases, these were configured with `snowpackPlugin` or `snowpackPluginOptions`.

### Aliasing

[Section titled Aliasing](#aliasing)

In Astro v0.21+, import aliases can be added in `tsconfig.json`.

    {  "compilerOptions": {    "baseUrl": ".",    "paths": {      "@/components/*": ["src/components/*"]    }  }}

### File Extensions in Imports

[Section titled File Extensions in Imports](#file-extensions-in-imports)

In Astro v0.21+, files need to be referenced by their actual extension, exactly as it is on disk. In this example, `Div.tsx` would need to be referenced as `Div.tsx`, not `Div.jsx`.

    import Div from './Div.jsx' // Astro v0.20import Div from './Div.tsx' // Astro v0.21

This same change applies to a compile-to-css file like `Div.scss`:

    <link rel="stylesheet" href={Astro.resolve('./Div.css')}><link rel="stylesheet" href={Astro.resolve('./Div.scss')}>

### Removed: Components in Frontmatter

[Section titled Removed: Components in Frontmatter](#removed-components-in-frontmatter)

Previously, you could create mini Astro Components inside of the Astro Frontmatter, using JSX syntax instead of Astro’s component syntax. This was always a bit of a hack, but in the new compiler it became impossible to support. We hope to re-introduce this feature in a future release of Astro using a different, non-JSX API.

To migrate to v0.21+, please convert all JSX Astro components (that is, any Astro components created inside of another component’s frontmatter) to standalone components.

### Styling Changes

[Section titled Styling Changes](#styling-changes)

#### Autoprefixer

[Section titled Autoprefixer](#autoprefixer)

Autoprefixer is no longer run by default. To enable:

1.  Install the latest version (`npm install autoprefixer`)
    
2.  Create a `postcss.config.cjs` file at the root of your project with:
    
        module.exports = {  plugins: {    autoprefixer: {},  },};
    

#### Tailwind CSS

[Section titled Tailwind CSS](#tailwind-css)

Ensure you have PostCSS installed. This was optional in previous releases, but is required now:

1.  Install the latest version of postcss (`npm install -D postcss`)
    
2.  Create a `postcss.config.cjs` file at the root of your project with:
    
        module.exports = {  plugins: {    tailwindcss: {},  },};
    
    For more information, read the [Tailwind CSS documentation](https://tailwindcss.com/docs/installation#add-tailwind-as-a-post-css-plugin)
    

### Known Issues

[Section titled Known Issues](#known-issues)

#### Imports on top

[Section titled Imports on top](#imports-on-top)

In Astro v0.21+, a bug has been introduced that requires imports inside components to be at the top of your frontmatter.

    ---import Component from '../components/Component.astro'const whereShouldIPutMyImports = "on top!"---

Upgrade Guides

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/upgrade-to/v1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
v2.0](/en/guides/upgrade-to/v2/) [Next  
Troubleshooting](/en/guides/troubleshooting/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/guides/upgrade-to/v2
Upgrade to Astro v2
===================

This guide will help you migrate from Astro v1 to Astro v2.

Need to upgrade an older project to v1? See our [older migration guide](/en/guides/upgrade-to/v1/).

Upgrade Astro
-------------

[Section titled Upgrade Astro](#upgrade-astro)

Update your project’s version of Astro to the latest version using your package manager. If you’re using Astro integrations, please also update those to the latest version.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3325)
*   [pnpm](#tab-panel-3326)
*   [Yarn](#tab-panel-3327)

Terminal window

    # Upgrade to Astro v2.xnpm install astro@latest
    # Example: upgrade React and Tailwind integrationsnpm install @astrojs/react@latest @astrojs/tailwind@latest

Terminal window

    # Upgrade to Astro v2.xpnpm add astro@latest
    # Example: upgrade React and Tailwind integrationspnpm add @astrojs/react@latest @astrojs/tailwind@latest

Terminal window

    # Upgrade to Astro v2.xyarn add astro@latest
    # Example: upgrade React and Tailwind integrationsyarn add @astrojs/react@latest @astrojs/tailwind@latest

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Astro v2.0 Breaking Changes
---------------------------

[Section titled Astro v2.0 Breaking Changes](#astro-v20-breaking-changes)

Astro v2.0 includes some breaking changes, as well as the removal of some previously deprecated features. If your project doesn’t work as expected after upgrading to v2.0, check this guide for an overview of all breaking changes and instructions on how to update your codebase.

See [the changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) for full release notes.

### Removed: Support for Node 14

[Section titled Removed: Support for Node 14](#removed-support-for-node-14)

Node 14 is scheduled to reach its End of Life in April 2023.

Astro v2.0 drops Node 14 support entirely, so that all Astro users can take advantage of Node’s more modern features.

#### What should I do?

[Section titled What should I do?](#what-should-i-do)

Check that both your development environment and your deployment environment are using **Node `16.12.0` or later**.

1.  Check your local version of Node using:
    
    Terminal window
    
        node -v
    
    If your local development environment needs upgrading, [install Node](https://nodejs.org/en/download/).
    
2.  Check your [deployment environment’s](/en/guides/deploy/) own documentation to verify that they support Node 16.
    
    You can specify Node `16.12.0` for your Astro project either in a dashboard configuration setting, or a `.nvmrc` file.
    

### Reserved: `src/content/`

[Section titled Reserved: src/content/](#reserved-srccontent)

Astro v2.0 now includes the Collections API for organizing your Markdown and MDX files into [content collections](/en/guides/content-collections/). This API reserves `src/content/` as a special folder.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-1)

Rename an existing `src/content/` folder to avoid conflicts. This folder, if it exists, can now only be used for [content collections](/en/guides/content-collections/).

### Changed: `Astro.site` trailing slash

[Section titled Changed: Astro.site trailing slash](#changed-astrosite-trailing-slash)

In v1.x, Astro ensured the URL you set as `site` in `astro.config.mjs` always had a trailing slash when accessed using `Astro.site`.

Astro v2.0 no longer modifies the value of `site`. `Astro.site` will use the exact value defined, and a trailing slash must be specified if desired.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-2)

In `astro.config.mjs`, add a trailing slash to the URL set in `site`.

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  site: 'https://example.com',  site: 'https://example.com/',});

### Changed: `_astro/` folder for build assets

[Section titled Changed: \_astro/ folder for build assets](#changed-_astro-folder-for-build-assets)

In v1.x, assets were built to various locations, including `assets/`, `chunks/`, and to the root of the build output.

Astro v2.0 moves and unifies the location of all build output assets to a new `_astro/` folder.

*   Directorydist/
    
    *   Directory\_astro
        
        *   client.9218e799.js
        *   index.df3f880e0.css
        
    

You can control this location with the [new `build.assets` configuration option](/en/reference/configuration-reference/#buildassets).

#### What should I do?

[Section titled What should I do?](#what-should-i-do-3)

Update your deployment platform configuration if it relies on the location of these assets.

### Changed: Markdown plugin configuration

[Section titled Changed: Markdown plugin configuration](#changed-markdown-plugin-configuration)

#### Removed: `extendDefaultPlugins`

[Section titled Removed: extendDefaultPlugins](#removed-extenddefaultplugins)

In v1.x, Astro used `markdown.extendDefaultPlugins` to re-enable Astro’s default plugins when adding your own Markdown plugins.

Astro v2.0 removes this configuration option entirely because its behavior is now the default.

Applying remark and rehype plugins in your Markdown configuration **no longer disables Astro’s default plugins**. GitHub-Flavored Markdown and Smartypants are now applied whether or not custom `remarkPlugins` or `rehypePlugins` are configured.

##### What should I do?

[Section titled What should I do?](#what-should-i-do-4)

Remove `extendDefaultPlugins` in your configuration. This is now Astro’s default behavior in v2.0, and you can delete this line without any replacement.

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  markdown: {    extendDefaultPlugins,  }});

#### Added: `gfm` and `smartypants`

[Section titled Added: gfm and smartypants](#added-gfm-and-smartypants)

In v1.x, you could choose to disable both of Astro’s default Markdown plugins (GitHub-Flavored Markdown and SmartyPants) by setting `markdown.extendDefaultPlugins: false`.

Astro v2.0 replaces `markdown.extendDefaultPlugins: false` with separate Boolean options to individually control each of Astro’s built-in default Markdown plugins. These are enabled by default and can be set to `false` independently.

##### What should I do?

[Section titled What should I do?](#what-should-i-do-5)

Remove `extendDefaultPlugins: false` and add the flags to disable each plugin individually instead.

*   `markdown.gfm: false` disables GitHub-Flavored Markdown
*   `markdown.smartypants: false` disables SmartyPants

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  markdown: {    extendDefaultPlugins: false,    smartypants: false,    gfm: false,  }});

### Changed: MDX plugin configuration

[Section titled Changed: MDX plugin configuration](#changed-mdx-plugin-configuration)

#### Replaced: `extendPlugins` changed to `extendMarkdownConfig`

[Section titled Replaced: extendPlugins changed to extendMarkdownConfig](#replaced-extendplugins-changed-to-extendmarkdownconfig)

In v1.x, the MDX integration’s `extendPlugins` option managed how your MDX files should inherit your Markdown configuration: all your Markdown configuration (`markdown`), or Astro’s default plugins only (`default`).

Astro v2.0 replaces the behavior controlled by `mdx.extendPlugins` with three new, independently-configurable options that are `true` by default:

*   **[`mdx.extendMarkdownConfig`](/en/guides/integrations-guide/mdx/#extendmarkdownconfig)** to inherit all or none of your Markdown configuration
*   **`mdx.gfm`** to enable or disable GitHub-Flavored Markdown in MDX
*   **`mdx.smartypants`** to enable or disable SmartyPants in MDX

##### What should I do?

[Section titled What should I do?](#what-should-i-do-6)

Delete `extendPlugins: 'markdown'` in your configuration. This is now the default behavior.

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  integrations: [    mdx({      extendPlugins: 'markdown',    }),  ],});

Replace `extendPlugins: 'defaults'` with `extendMarkdownConfig: false` and add the separate options for GitHub-Flavored Markdown and SmartyPants to enable these default plugins individually in MDX.

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  integrations: [    mdx({      extendPlugins: 'defaults',      extendMarkdownConfig: false,      smartypants: true,      gfm: true,    }),  ],});

#### Added: More MDX config options to match Markdown

[Section titled Added: More MDX config options to match Markdown](#added-more-mdx-config-options-to-match-markdown)

Astro v2.0 allows you to now individually set [every available Markdown configuration option](/en/reference/configuration-reference/#markdown-options) (except `drafts`) separately in your MDX integration configuration.

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  markdown: {    remarkPlugins: [remarkPlugin1],    gfm: true,  },  integrations: [    mdx({      remarkPlugins: [remarkPlugin2],      gfm: false,    })  ]});

##### What should I do?

[Section titled What should I do?](#what-should-i-do-7)

Revisit your Markdown and MDX configuration and compare your existing config with the new options available.

### Changed: Plugin access to frontmatter

[Section titled Changed: Plugin access to frontmatter](#changed-plugin-access-to-frontmatter)

In v1.x, remark and rehype plugins did not have access to user frontmatter. Astro merged plugin frontmatter with your file’s frontmatter, without passing the file frontmatter to your plugins.

Astro v2.0 gives remark and rehype plugins access to user frontmatter via frontmatter injection. This allows plugin authors to modify a user’s existing frontmatter, or compute new properties based on other properties.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-8)

Check any remark and rehype plugins you have written to see whether their behavior has changed. Note that `data.astro.frontmatter` is now the _complete_ Markdown or MDX document’s frontmatter, rather than an empty object.

### Changed: RSS Configuration

[Section titled Changed: RSS Configuration](#changed-rss-configuration)

In v1.x, Astro’s RSS package allowed you to use `items: import.meta.glob(...)` to generate a list of RSS feed items. This usage is now deprecated and will eventually be removed.

Astro v2.0 introduces a `pagesGlobToRssItems()` wrapper to the `items` property.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-9)

Import, then wrap your existing function containing `import.meta.glob()` with the `pagesGlobToRssItems()` helper.

src/pages/rss.xml.js

    import rss, {  pagesGlobToRssItems} from '@astrojs/rss';
    export async function get(context) {  return rss({    items: await pagesGlobToRssItems(      import.meta.glob('./blog/*.{md,mdx}'),    ),  });}

### Changed: Svelte IDE support

[Section titled Changed: Svelte IDE support](#changed-svelte-ide-support)

Astro v2.0 requires a `svelte.config.js` file in your project if you are using [the `@astrojs/svelte` integration](/en/guides/integrations-guide/svelte/). This is needed to provide IDE autocompletion.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-10)

Add a `svelte.config.js` file to the root of your project:

svelte.config.js

    import { vitePreprocess } from '@astrojs/svelte';
    export default {  preprocess: vitePreprocess(),};

For new users, this file will be added automatically when running `astro add svelte`.

### Removed: `legacy.astroFlavoredMarkdown`

[Section titled Removed: legacy.astroFlavoredMarkdown](#removed-legacyastroflavoredmarkdown)

In v1.0, Astro moved the old Astro-Flavored Markdown (also known as Components in Markdown) to a legacy feature.

Astro v2.0 removes the `legacy.astroFlavoredMarkdown` option completely. Importing and using components in `.md` files will no longer work.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-11)

Remove this legacy flag. It is no longer available in Astro.

astro.config.mjs

    export default defineConfig({  legacy: {    astroFlavoredMarkdown: true,  },})

If you were using this feature in v1.x, we recommend [using the MDX integration](/en/guides/integrations-guide/mdx/) which allows you to combine components and JSX expressions with Markdown syntax.

### Removed: `Astro.resolve()`

[Section titled Removed: Astro.resolve()](#removed-astroresolve)

In v0.24, Astro deprecated `Astro.resolve()` for getting resolved URLs to assets that you might want to reference in the browser.

Astro v2.0 removes this option entirely. `Astro.resolve()` in your code will cause an error.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-12)

Resolve asset paths using `import` instead. For example:

src/pages/index.astro

    ---import 'style.css';import imageUrl from './image.png';---
    <img src={imageUrl} />

### Removed: `Astro.fetchContent()`

[Section titled Removed: Astro.fetchContent()](#removed-astrofetchcontent)

In v0.26, Astro deprecated `Astro.fetchContent()` for fetching data from your local Markdown files.

Astro v2.0 removes this option entirely. `Astro.fetchContent()` in your code will cause an error.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-13)

Use `Astro.glob()` to fetch Markdown files, or convert to the [Content Collections](/en/guides/content-collections/) feature.

src/pages/index.astro

    ---const allPosts = await Astro.glob('./posts/*.md');---

### Removed: `Astro.canonicalURL`

[Section titled Removed: Astro.canonicalURL](#removed-astrocanonicalurl)

In v1.0, Astro deprecated `Astro.canonicalURL` for constructing a canonical URL.

Astro v2.0 removes this option entirely. `Astro.canonicalURL` in your code will cause an error.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-14)

Use `Astro.url` to construct a canonical URL.

src/pages/index.astro

    ---const canonicalURL = new URL(Astro.url.pathname, Astro.site);---

### Updated: Vite 4

[Section titled Updated: Vite 4](#updated-vite-4)

Astro v2.0 upgrades from Vite 3 to [Vite 4](https://vite.dev/), released in December 2022.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-15)

There should be no changes to your code necessary! We’ve handled most of the upgrade for you inside of Astro; however, some subtle Vite behaviors may still change between versions.

Refer to the official [Vite Migration Guide](https://vite.dev/guide/migration.html) if you run into trouble.

Astro v2.0 Experimental Flags Removed
-------------------------------------

[Section titled Astro v2.0 Experimental Flags Removed](#astro-v20-experimental-flags-removed)

Remove the following experimental flags from `astro.config.mjs`:

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  experimental: {    contentCollections: true,    prerender: true,    errorOverlay: true,  },})

These features are now available by default:

*   [Content collections](/en/guides/content-collections/) as a way to manage your Markdown and MDX files with type-safety.
*   [Prerendering individual pages to static HTML](/en/guides/on-demand-rendering/) when using SSR to improve speed and cacheability.
*   A redesigned error message overlay.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/upgrade-to/v2.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
v3.0](/en/guides/upgrade-to/v3/) [Next  
v1.0](/en/guides/upgrade-to/v1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/guides/upgrade-to/v3
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



# Aggregated from ./pages/guides/upgrade-to/v4
Upgrade to Astro v4
===================

This guide will help you migrate from Astro v3 to Astro v4.

Need to upgrade an older project to v3? See our [older migration guide](/en/guides/upgrade-to/v3/).

Need to see the v3 docs? Visit this [older version of the docs site (unmaintained v3.6 snapshot)](https://docs-git-v3-docs-unmaintained-astrodotbuild.vercel.app/).

Upgrade Astro
-------------

[Section titled Upgrade Astro](#upgrade-astro)

Update your project’s version of Astro and all official integrations to the latest versions using your package manager.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3331)
*   [pnpm](#tab-panel-3332)
*   [Yarn](#tab-panel-3333)

Terminal window

    # Upgrade Astro and official integrations togethernpx @astrojs/upgrade

Terminal window

    # Upgrade Astro and official integrations togetherpnpm dlx @astrojs/upgrade

Terminal window

    # Upgrade Astro and official integrations togetheryarn dlx @astrojs/upgrade

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

You can also [upgrade your Astro integrations manually](/en/guides/integrations-guide/#manual-upgrading) if needed, and you may also need to upgrade other dependencies in your project.

Need to continue?

After upgrading Astro to the latest version, you may not need to make any changes to your project at all!

But, if you notice errors or unexpected behavior, please check below for what has changed that might need updating in your project.

Astro v4.0 includes [potentially breaking changes](#breaking-changes), as well as the [removal of some previously deprecated features](#previously-deprecated-features-now-removed).

If your project doesn’t work as expected after upgrading to v4.0, check this guide for an overview of all breaking changes and instructions on how to update your codebase.

See [the changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) for full release notes.

Astro v4.0 Experimental Flags Removed
-------------------------------------

[Section titled Astro v4.0 Experimental Flags Removed](#astro-v40-experimental-flags-removed)

Remove the `devOverlay` experimental flag and move any `i18n` config to the top level in `astro.config.mjs`:

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  experimental: {    devOverlay: true,    i18n: {      locales: ["en", "fr", "pt-br", "es"],      defaultLocale: "en",    }  },  i18n: {    locales: ["en", "fr", "pt-br", "es"],    defaultLocale: "en",  },})

These configurations, `i18n` and the renamed `devToolbar`, are now available in Astro v4.0.

Read more about these two exciting features and more in [the v4.0 Blog post](https://astro.build/blog/astro-4/)!

Upgrades
--------

[Section titled Upgrades](#upgrades)

Any major upgrades to Astro’s dependencies may cause breaking changes in your project.

### Upgraded: Vite 5.0

[Section titled Upgraded: Vite 5.0](#upgraded-vite-50)

In Astro v3.0, Vite 4 was used as the development server and production bundler.

Astro v4.0 upgrades from Vite 4 to Vite 5.

#### What should I do?

[Section titled What should I do?](#what-should-i-do)

If you are using Vite-specific plugins, configuration, or APIs, check the [Vite migration guide](https://vite.dev/guide/migration) for their breaking changes and upgrade your project as needed. There are no breaking changes to Astro itself.

### Upgraded: unified, remark, and rehype dependencies

[Section titled Upgraded: unified, remark, and rehype dependencies](#upgraded-unified-remark-and-rehype-dependencies)

In Astro v3.x, unified v10 and its related compatible remark/rehype packages were used to process Markdown and MDX.

Astro v4.0 upgrades [unified to v11](https://github.com/unifiedjs/unified/releases/tag/11.0.0) and the other remark/rehype packages to the latest version.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-1)

If you used custom remark/rehype packages, update all of them to the latest version using your package manager to ensure they support unified v11. The packages you are using can be found in `astro.config.mjs`.

There should not be any significant breaking changes if you use actively updated packages, but some packages may not yet be compatible with unified v11. Visually inspect your Markdown/MDX pages before deploying to ensure your site is functioning as intended.

Breaking Changes
----------------

[Section titled Breaking Changes](#breaking-changes)

The following changes are considered breaking changes in Astro. Breaking changes may or may not provide temporary backwards compatibility, and all documentation is updated to refer to only the current, supported code.

If you need to refer to the documentation for a v3.x project, you can browse this [(unmaintained) snapshot of the docs from before v4.0 was released](https://docs-git-v3-docs-unmaintained-astrodotbuild.vercel.app/).

### Renamed: `entrypoint` (Integrations API)

[Section titled Renamed: entrypoint (Integrations API)](#renamed-entrypoint-integrations-api)

In Astro v3.x, the property of the `injectRoute` integrations API that specified the route entry point was named `entryPoint`.

Astro v4.0 renames this property to `entrypoint` to be consistent with other Astro APIs. The `entryPoint` property is deprecated but will continue to work and logs a warning prompting you to update your code.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-2)

If you have integrations that use the `injectRoute` API, rename the `entryPoint` property to `entrypoint`. If you’re a library author who wants to support both Astro 3 and 4, you can specify both `entryPoint` and `entrypoint`, in which case, a warning will not be logged.

    injectRoute({  pattern: '/fancy-dashboard',  entryPoint: '@fancy/dashboard/dashboard.astro'  entrypoint: '@fancy/dashboard/dashboard.astro'});

### Changed: `app.render` signature in Integrations API

[Section titled Changed: app.render signature in Integrations API](#changed-apprender-signature-in-integrations-api)

In Astro v3.0, the `app.render()` method accepted `routeData` and `locals` as separate, optional arguments.

Astro v4.0 changes the `app.render()` signature. These two properties are now available in a single object. Both the object and these two properties are still optional.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-3)

If you are maintaining an adapter, the current signature will continue to work until the next major version. To migrate to the new signature, pass `routeData` and `locals` as properties of an object instead of as multiple independent arguments.

    app.render(request, routeData, locals)app.render(request, { routeData, locals })

### Changed: adapters must now specify supported features

[Section titled Changed: adapters must now specify supported features](#changed-adapters-must-now-specify-supported-features)

In Astro v3.x, adapters were not required to specify the features they support.

Astro v4.0 requires adapters to pass the `supportedAstroFeatures{}` property to specify a list of features they support. This property is no longer optional.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-4)

Adapter authors need to pass the `supportedAstroFeatures{}` option to specify a list of features they support.

my-adapter.mjs

    export default function createIntegration() {  return {    name: '@matthewp/my-adapter',    hooks: {      'astro:config:done': ({ setAdapter }) => {        setAdapter({          name: '@matthewp/my-adapter',          serverEntrypoint: '@matthewp/my-adapter/server.js',          supportedAstroFeatures: {              staticOutput: 'stable'          }        });      },    },  };}

### Removed: Shiki language `path` property

[Section titled Removed: Shiki language path property](#removed-shiki-language-path-property)

In Astro v3.x, a Shiki language passed to `markdown.shikiConfig.langs` was automatically converted to a Shikiji-compatible language. Shikiji is the internal tooling used by Astro for syntax highlighting.

Astro v4.0 removes support for the `path` property of a Shiki language, which was confusing to configure. It is replaced by an import which can be passed to `langs` directly.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-5)

The language JSON file should be imported and passed to the option instead.

astro.config.js

     import customLang from './custom.tmLanguage.json'
    export default defineConfig({  markdown: {    shikiConfig: {      langs: [       { path: '../../custom.tmLanguage.json' },       customLang,      ],    },  },})

Deprecated
----------

[Section titled Deprecated](#deprecated)

The following deprecated features are no longer supported and are no longer documented. Please update your project accordingly.

Some deprecated features may temporarily continue to function until they are completely removed. Others may silently have no effect, or throw an error prompting you to update your code.

### Deprecated: `handleForms` for View Transitions `submit` events

[Section titled Deprecated: handleForms for View Transitions submit events](#deprecated-handleforms-for-view-transitions-submit-events)

In Astro v3.x, projects using the `<ViewTransitions />` component were required to opt-in to handling `submit` events for `form` elements. This was done by passing a `handleForms` prop.

Astro v4.0 handles `submit` events for `form` elements by default when `<ViewTransitions />` are used. The `handleForms` prop has been deprecated and no longer has any effect.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-6)

Remove the `handleForms` property from your `ViewTransitions` component. It is no longer necessary.

src/pages/index.astro

    ---import { ViewTransitions } from "astro:transitions";---<html>  <head>    <ViewTransitions handleForms />  </head>  <body>    <!-- stuff here -->  </body></html>

To opt out of `submit` event handling, add the `data-astro-reload` attribute to relevant `form` elements.

src/components/Form.astro

    <form action="/contact" data-astro-reload>  <!-- --></form>

Previously deprecated features now removed
------------------------------------------

[Section titled Previously deprecated features now removed](#previously-deprecated-features-now-removed)

The following deprecated features have now been entirely removed from the code base and can no longer be used. Some of these features may have continued to work in your project even after deprecation. Others may have silently had no effect.

Projects now containing these removed features will be unable to build, and there will no longer be any supporting documentation prompting you to remove these features.

### Removed: returning simple objects from endpoints

[Section titled Removed: returning simple objects from endpoints](#removed-returning-simple-objects-from-endpoints)

In Astro v3.x, returning simple objects from endpoints was deprecated, but was still supported to maintain compatibility with Astro v2. A `ResponseWithEncoding` utility was also provided to ease the migration.

Astro v4.0 removes support for simple objects and requires endpoints to always return a `Response`. The `ResponseWithEncoding` utility is also removed in favor of a proper `Response` type.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-7)

Update your endpoints to return a `Response` object directly.

    export async function GET() {  return { body: { "title": "Bob's blog" }};  return new Response(JSON.stringify({ "title": "Bob's blog" }));}

To remove usage of `ResponseWithEncoding`, refactor your code to use an `ArrayBuffer` instead:

    export async function GET() {  const file = await fs.readFile('./bob.png');  return new ResponseWithEncoding(file.toString('binary'), undefined, 'binary');  return new Response(file.buffer);}

### Removed: `build.split` and `build.excludeMiddleware`

[Section titled Removed: build.split and build.excludeMiddleware](#removed-buildsplit-and-buildexcludemiddleware)

In Astro v3.0, `build.split` and `build.excludeMiddleware` build config options were deprecated and replaced with [adapter configuration options](/en/reference/adapter-reference/#adapter-features) to perform the same tasks.

Astro v4.0 removes these properties entirely.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-8)

If you are using the deprecated `build.split` or `build.excludeMiddleware`, you must now remove them as these no longer exist.

Please see the v3 migration guide to [update these deprecated middleware properties](/en/guides/upgrade-to/v3/#deprecated-buildexcludemiddleware-and-buildsplit) with adapter configurations.

### Removed: `Astro.request.params`

[Section titled Removed: Astro.request.params](#removed-astrorequestparams)

In Astro v3.0, the `Astro.request.params` API was deprecated, but preserved for backwards compatibility.

Astro v4.0 removes this option entirely.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-9)

Update all occurrences to [`Astro.params`](/en/reference/api-reference/#params), which is the supported replacement.

    const { id } = Astro.request.params;const { id } = Astro.params;

### Removed: `markdown.drafts`

[Section titled Removed: markdown.drafts](#removed-markdowndrafts)

In Astro v3.0, using `markdown.drafts` to control the building of draft posts was deprecated.

Astro v4.0 removes this option entirely.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-10)

If you are using the deprecated `markdown.drafts`, you must now remove it as it no longer exists.

To continue to mark some pages in your project as drafts, [migrate to content collections](/en/guides/content-collections/) and manually filter out pages with the `draft: true` frontmatter property instead.

### Removed: `getHeaders()`

[Section titled Removed: getHeaders()](#removed-getheaders)

In Astro v3.0, the `getHeaders()` Markdown export was deprecated and replaced with `getHeadings()`.

Astro v4.0 removes this option entirely.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-11)

If you are using the deprecated `getHeaders()`, you must now remove it as it no longer exists. Replace any instances with `getHeadings()`, which is the supported replacement.

    const posts = await Astro.glob('../content/blog/*.mdx');const firstPostHeadings = posts.at(0).getHeaders();const firstPostHeadings = posts.at(0).getHeadings();

### Removed: using `rss` in `getStaticPaths()`

[Section titled Removed: using rss in getStaticPaths()](#removed-using-rss-in-getstaticpaths)

In Astro v3.0, using the deprecated `rss` helper in `getStaticPaths()` would throw an error.

Astro v4.0 removes this helper entirely.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-12)

If you are using the unsupported method for generating RSS feeds, you must now use the [`@astrojs/rss` integration](/en/recipes/rss/) for a complete RSS setup.

### Removed: lowercase HTTP method names

[Section titled Removed: lowercase HTTP method names](#removed-lowercase-http-method-names)

In Astro v3.0, using lowercase HTTP request method names (`get`, `post`, `put`, `all`, `del`) was deprecated.

Astro v4.0 removes support for lowercase names entirely. All HTTP request methods must now be written using uppercase.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-13)

If you are using the deprecated lowercase names, you must now replace them with their uppercase equivalents.

Please see the v3 migration guide [for guidance using uppercase HTTP request methods](/en/guides/upgrade-to/v3/#changed-http-request-methods-case).

### Removed: 301 redirects when missing a `base` prefix

[Section titled Removed: 301 redirects when missing a base prefix](#removed-301-redirects-when-missing-a-base-prefix)

In Astro v3.x, the Astro preview server returned a 301 redirect when accessing public directory assets without a base path.

Astro v4.0 returns a 404 status without a base path prefix for public directory assets when the preview server is running, matching the behavior of the dev server.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-14)

When using the Astro preview server, all of your static asset imports and URLs from the public directory must have [the base value](/en/reference/configuration-reference/#base) prefixed to the path.

The following example shows the `src` attribute required to display an image from the public folder when `base: '/docs'` is configured:

src/pages/index.astro

    // To access public/images/my-image.png:
    <img src="/docs/images/my-image.png" alt="">

### Removed: `astro/client-image` auto-conversion

[Section titled Removed: astro/client-image auto-conversion](#removed-astroclient-image-auto-conversion)

In Astro v3.x, the `astro/client-image` type (used for the deprecated image integration) was removed but was auto-converted to the default Astro type `astro/client` if found in your `env.d.ts` file.

Astro v4.0 ignores `astro/client-image` and will no longer update `env.d.ts` for you automatically.

#### What should I do?

[Section titled What should I do?](#what-should-i-do-15)

If you had types configured for `@astrojs/image` in `src/env.d.ts` and upgrading to v3.0 did not automatically convert the type for you, replace the `astro/client-image` type manually with `astro/client`.

src/env.d.ts

      /// <reference types="astro/client-image" />  /// <reference types="astro/client" />

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

Know a good resource for Astro v4.0? [Edit this page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/upgrade-to/v4.mdx) and add a link below!

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/upgrade-to/v4.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
v5.0](/en/guides/upgrade-to/v5/) [Next  
v3.0](/en/guides/upgrade-to/v3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/guides/upgrade-to/v5
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



