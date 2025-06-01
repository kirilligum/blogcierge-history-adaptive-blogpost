@astrojs/ mdx
=============

v4.3.0 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/) [npm](https://www.npmjs.com/package/@astrojs/mdx) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/CHANGELOG.md)

This **[Astro integration](/en/guides/integrations-guide/)** enables the usage of [MDX](https://mdxjs.com/) components and allows you to create pages as `.mdx` files.

Why MDX?
--------

[Section titled Why MDX?](#why-mdx)

MDX allows you to use variables, JSX expressions and components within Markdown content in Astro. If you have existing content authored in MDX, this integration allows you to bring those files to your Astro project.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

Run one of the following commands in a new terminal window.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3235)
*   [pnpm](#tab-panel-3236)
*   [Yarn](#tab-panel-3237)

Terminal window

    npx astro add mdx

Terminal window

    pnpm astro add mdx

Terminal window

    yarn astro add mdx

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the `@astrojs/mdx` package:

*   [npm](#tab-panel-3238)
*   [pnpm](#tab-panel-3239)
*   [Yarn](#tab-panel-3240)

Terminal window

    npm install @astrojs/mdx

Terminal window

    pnpm add @astrojs/mdx

Terminal window

    yarn add @astrojs/mdx

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  // ...  integrations: [mdx()],});

### Editor Integration

[Section titled Editor Integration](#editor-integration)

For editor support in [VS Code](https://code.visualstudio.com/), install the [official MDX extension](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx).

For other editors, use the [MDX language server](https://github.com/mdx-js/mdx-analyzer/tree/main/packages/language-server).

Usage
-----

[Section titled Usage](#usage)

Visit the [MDX docs](https://mdxjs.com/docs/what-is-mdx/) to learn about using standard MDX features.

MDX in Astro
------------

[Section titled MDX in Astro](#mdx-in-astro)

Adding the MDX integration enhances your Markdown authoring with JSX variables, expressions and components.

It also adds extra features to standard MDX, including support for Markdown-style frontmatter in MDX. This allows you to use most of [Astro’s built-in Markdown features](/en/guides/markdown-content/).

`.mdx` files must be written in [MDX syntax](https://mdxjs.com/docs/what-is-mdx/#mdx-syntax) rather than Astro’s HTML-like syntax.

### Using MDX with content collections

[Section titled Using MDX with content collections](#using-mdx-with-content-collections)

To include MDX files in a content collection, make sure that your [collection loader](/en/guides/content-collections/#defining-the-collection-loader) is configured to load content from `.mdx` files:

src/content.config.ts

    import { defineCollection, z } from 'astro:content';import { glob } from 'astro/loaders';
    const blog = defineCollection({  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/blog" }),  schema: z.object({    title: z.string(),    description: z.string(),    pubDate: z.coerce.date(),  })});
    export const collections = { blog };

### Using Exported Variables in MDX

[Section titled Using Exported Variables in MDX](#using-exported-variables-in-mdx)

MDX supports using `export` statements to add variables to your MDX content or to export data to a component that imports it.

For example, you can export a `title` field from an MDX page or component to use as a heading with `{JSX expressions}`:

/src/blog/posts/post-1.mdx

    export const title = 'My first MDX post'
    # {title}

Or you can use that exported `title` in your page using `import` and `import.meta.glob()` statements:

src/pages/index.astro

    ---const matches = import.meta.glob('./posts/*.mdx', { eager: true });const posts = Object.values(matches);---
    {posts.map(post => <p>{post.title}</p>)}

#### Exported Properties

[Section titled Exported Properties](#exported-properties)

The following properties are available to a `.astro` component when using an `import` statement or `import.meta.glob()`:

*   **`file`** - The absolute file path (e.g. `/home/user/projects/.../file.mdx`).
*   **`url`** - The URL of the page (e.g. `/en/guides/markdown-content`).
*   **`frontmatter`** - Contains any data specified in the file’s YAML/TOML frontmatter.
*   **`getHeadings()`** - An async function that returns an array of all headings (`<h1>` to `<h6>`) in the file with the type: `{ depth: number; slug: string; text: string }[]`. Each heading’s `slug` corresponds to the generated ID for a given heading and can be used for anchor links.
*   **`<Content />`** - A component that returns the full, rendered contents of the file.
*   **(any `export` value)** - MDX files can also export data with an `export` statement.

### Using Frontmatter Variables in MDX

[Section titled Using Frontmatter Variables in MDX](#using-frontmatter-variables-in-mdx)

The Astro MDX integration includes support for using frontmatter in MDX by default. Add frontmatter properties just as you would in Markdown files, and these variables are available to use in the template, and as named properties when importing the file somewhere else.

/src/blog/posts/post-1.mdx

    ---title: 'My first MDX post'author: 'Houston'---
    # {frontmatter.title}
    Written by: {frontmatter.author}

### Using Components in MDX

[Section titled Using Components in MDX](#using-components-in-mdx)

After installing the MDX integration, you can import and use both [Astro components](/en/basics/astro-components/) and [UI framework components](/en/guides/framework-components/#using-framework-components) in MDX (`.mdx`) files just as you would use them in any other Astro component.

Don’t forget to include a `client:directive` on your UI framework components, if necessary!

See more examples of using import and export statements in the [MDX docs](https://mdxjs.com/docs/what-is-mdx/#esm).

src/blog/post-1.mdx

    ---title: My first post---import ReactCounter from '../components/ReactCounter.jsx';
    I just started my new Astro blog!
    Here is my counter component, working in MDX:<ReactCounter client:load />

#### Custom components with imported MDX

[Section titled Custom components with imported MDX](#custom-components-with-imported-mdx)

When rendering imported MDX content, [custom components](#assigning-custom-components-to-html-elements) can be passed via the `components` prop.

src/pages/page.astro

    ---import { Content, components } from '../content.mdx';import Heading from '../Heading.astro';---<!-- Creates a custom <h1> for the # syntax, _and_ applies any custom components defined in `content.mdx` --><Content components={{...components, h1: Heading }} />

Note

Custom components defined and exported in an MDX file must be imported and then passed back to the `<Content />` component via the `components` property.

#### Assigning Custom Components to HTML elements

[Section titled Assigning Custom Components to HTML elements](#assigning-custom-components-to-html-elements)

With MDX, you can map Markdown syntax to custom components instead of their standard HTML elements. This allows you to write in standard Markdown syntax, but apply special component styling to selected elements.

Import your custom component into your `.mdx` file, then export a `components` object that maps the standard HTML element to your custom component:

src/blog/posts/post-1.mdx

    import Blockquote from '../components/Blockquote.astro';export const components = {blockquote: Blockquote}
    > This quote will be a custom Blockquote

src/components/Blockquote.astro

    ---const props = Astro.props;---<blockquote {...props} class="bg-blue-50 p-4">  <span class="text-4xl text-blue-600 mb-2">“</span>  <slot /> <!-- Be sure to add a `<slot/>` for child content! --></blockquote>

Visit the [MDX website](https://mdxjs.com/table-of-components/) for a full list of HTML elements that can be overwritten as custom components.

Configuration
-------------

[Section titled Configuration](#configuration)

Once the MDX integration is installed, no configuration is necessary to use `.mdx` files in your Astro project.

You can configure how your MDX is rendered with the following options:

*   [Options inherited from Markdown config](#options-inherited-from-markdown-config)
*   [`extendMarkdownConfig`](#extendmarkdownconfig)
*   [`recmaPlugins`](#recmaplugins)
*   [`optimize`](#optimize)

### Options inherited from Markdown config

[Section titled Options inherited from Markdown config](#options-inherited-from-markdown-config)

All [`markdown` configuration options](/en/reference/configuration-reference/#markdown-options) can be configured separately in the MDX integration. This includes remark and rehype plugins, syntax highlighting, and more. Options will default to those in your Markdown config ([see the `extendMarkdownConfig` option](#extendmarkdownconfig) to modify this).

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';import remarkToc from 'remark-toc';import rehypePresetMinify from 'rehype-preset-minify';
    export default defineConfig({  // ...  integrations: [    mdx({      syntaxHighlight: 'shiki',      shikiConfig: { theme: 'dracula' },      remarkPlugins: [remarkToc],      rehypePlugins: [rehypePresetMinify],      remarkRehype: { footnoteLabel: 'Footnotes' },      gfm: false,    }),  ],});

Caution

MDX does not support passing remark and rehype plugins as a string. You should install, import, and apply the plugin function instead.

See the [Markdown Options reference](/en/reference/configuration-reference/#markdown-options) for a complete list of options.

### `extendMarkdownConfig`

[Section titled extendMarkdownConfig](#extendmarkdownconfig)

*   **Type:** `boolean`
*   **Default:** `true`

MDX will extend [your project’s existing Markdown configuration](/en/reference/configuration-reference/#markdown-options) by default. To override individual options, you can specify their equivalent in your MDX configuration.

For example, say you need to disable GitHub-Flavored Markdown and apply a different set of remark plugins for MDX files. You can apply these options like so, with `extendMarkdownConfig` enabled by default:

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  // ...  markdown: {    syntaxHighlight: 'prism',    remarkPlugins: [remarkPlugin1],    gfm: true,  },  integrations: [    mdx({      // `syntaxHighlight` inherited from Markdown
          // Markdown `remarkPlugins` ignored,      // only `remarkPlugin2` applied.      remarkPlugins: [remarkPlugin2],      // `gfm` overridden to `false`      gfm: false,    }),  ],});

You may also need to disable `markdown` config extension in MDX. For this, set `extendMarkdownConfig` to `false`:

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  // ...  markdown: {    remarkPlugins: [remarkPlugin1],  },  integrations: [    mdx({      // Markdown config now ignored      extendMarkdownConfig: false,      // No `remarkPlugins` applied    }),  ],});

### `recmaPlugins`

[Section titled recmaPlugins](#recmaplugins)

These are plugins that modify the output [estree](https://github.com/estree/estree) directly. This is useful for modifying or injecting JavaScript variables in your MDX files.

We suggest [using AST Explorer](https://astexplorer.net/) to play with estree outputs, and trying [`estree-util-visit`](https://unifiedjs.com/explore/package/estree-util-visit/) for searching across JavaScript nodes.

### `optimize`

[Section titled optimize](#optimize)

*   **Type:** `boolean | { ignoreElementNames?: string[] }`

This is an optional configuration setting to optimize the MDX output for faster builds and rendering via an internal rehype plugin. This may be useful if you have many MDX files and notice slow builds. However, this option may generate some unescaped HTML, so make sure your site’s interactive parts still work correctly after enabling it.

This is disabled by default. To enable MDX optimization, add the following to your MDX integration configuration:

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  // ...  integrations: [    mdx({      optimize: true,    }),  ],});

#### `ignoreElementNames`

[Section titled ignoreElementNames](#ignoreelementnames)

*   **Type:** `string[]`

**Added in:** `@astrojs/mdx@3.0.0`

Previously known as `customComponentNames`.

An optional property of `optimize` to prevent the MDX optimizer from handling certain element names, like [custom components passed to imported MDX content via the components prop](/en/guides/integrations-guide/mdx/#custom-components-with-imported-mdx).

You will need to exclude these components from optimization as the optimizer eagerly converts content into a static string, which will break custom components that needs to be dynamically rendered.

For example, the intended MDX output of the following is `<Heading>...</Heading>` in place of every `"<h1>...</h1>"`:

    ---import { Content, components } from '../content.mdx';import Heading from '../Heading.astro';---
    <Content components={{ ...components, h1: Heading }} />

To configure optimization for this using the `ignoreElementNames` property, specify an array of HTML element names that should be treated as custom components:

astro.config.mjs

    import { defineConfig } from 'astro/config';import mdx from '@astrojs/mdx';
    export default defineConfig({  // ...  integrations: [    mdx({      optimize: {        // Prevent the optimizer from handling `h1` elements        ignoreElementNames: ['h1'],      },    }),  ],});

Note that if your MDX file [configures custom components using `export const components = { ... }`](/en/guides/integrations-guide/mdx/#assigning-custom-components-to-html-elements), then you do not need to manually configure this option. The optimizer will automatically detect them.

Examples
--------

[Section titled Examples](#examples)

*   The [Astro MDX starter template](https://github.com/withastro/astro/tree/latest/examples/with-mdx) shows how to use MDX files in your Astro project.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/mdx.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Markdoc](/en/guides/integrations-guide/markdoc/) [Next  
Partytown](/en/guides/integrations-guide/partytown/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

