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

