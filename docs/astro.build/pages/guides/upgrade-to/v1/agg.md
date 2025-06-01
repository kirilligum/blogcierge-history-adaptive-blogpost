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

