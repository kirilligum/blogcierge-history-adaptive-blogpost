@astrojs/ markdoc
=================

v0.15.0 [GitHub](https://github.com/withastro/astro/tree/main/packages/integrations/markdoc/) [npm](https://www.npmjs.com/package/@astrojs/markdoc) [Changelog](https://github.com/withastro/astro/tree/main/packages/integrations/markdoc/CHANGELOG.md)

This **[Astro integration](/en/guides/integrations-guide/)** enables the usage of [Markdoc](https://markdoc.dev/) to create components, pages, and content collection entries.

Why Markdoc?
------------

[Section titled Why Markdoc?](#why-markdoc)

Markdoc allows you to enhance your Markdown with [Astro components](/en/basics/astro-components/). If you have existing content authored in Markdoc, this integration allows you to bring those files to your Astro project using content collections.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-install) instead.

Run one of the following commands in a new terminal window.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3229)
*   [pnpm](#tab-panel-3230)
*   [Yarn](#tab-panel-3231)

Terminal window

    npx astro add markdoc

Terminal window

    pnpm astro add markdoc

Terminal window

    yarn astro add markdoc

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

If you run into any issues, [feel free to report them to us on GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

### Manual Install

[Section titled Manual Install](#manual-install)

First, install the `@astrojs/markdoc` package:

*   [npm](#tab-panel-3232)
*   [pnpm](#tab-panel-3233)
*   [Yarn](#tab-panel-3234)

Terminal window

    npm install @astrojs/markdoc

Terminal window

    pnpm add @astrojs/markdoc

Terminal window

    yarn add @astrojs/markdoc

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

astro.config.mjs

    import { defineConfig } from 'astro/config';import markdoc from '@astrojs/markdoc';export default defineConfig({  // ...  integrations: [markdoc()],});

### VS Code Editor Integration

[Section titled VS Code Editor Integration](#vs-code-editor-integration)

If you are using VS Code, there is an official [Markdoc language extension](https://marketplace.visualstudio.com/items?itemName=Stripe.markdoc-language-support) that includes syntax highlighting and autocomplete for configured tags. [See the language server on GitHub](https://github.com/markdoc/language-server.git) for more information.

To set up the extension, create a `markdoc.config.json` file in the project root with following content:

markdoc.config.json

    [  {    "id": "my-site",    "path": "src/content",    "schema": {      "path": "markdoc.config.mjs",      "type": "esm",      "property": "default",      "watch": true    }  }]

Set `markdoc.config.mjs` as your configuration file with the `schema` object, and define where your Markdoc files are stored using the `path` property. Since Markdoc is specific to content collections, you can use `src/content`.

Usage
-----

[Section titled Usage](#usage)

Markdoc files can only be used within content collections. Add entries to any content collection using the `.mdoc` extension:

*   Directorysrc/
    
    *   Directorycontent/
        
        *   Directorydocs/
            
            *   why-markdoc.mdoc
            *   quick-start.mdoc
            
        
    

Then, query your collection using the [Content Collection APIs](/en/guides/content-collections/#querying-collections):

src/pages/why-markdoc.astro

    ---import { getEntry, render } from 'astro:content';
    const entry = await getEntry('docs', 'why-markdoc');const { Content } = await render(entry);---
    <!--Access frontmatter properties with `data`--><h1>{entry.data.title}</h1><!--Render Markdoc contents with the Content component--><Content />

See the [Astro Content Collection docs](/en/guides/content-collections/) for more information.

Pass Markdoc variables
----------------------

[Section titled Pass Markdoc variables](#pass-markdoc-variables)

You may need to pass [variables](https://markdoc.dev/docs/variables) to your content. This is useful when passing SSR parameters like A/B tests.

Variables can be passed as props via the `Content` component:

src/pages/why-markdoc.astro

    ---import { getEntry, render } from 'astro:content';
    const entry = await getEntry('docs', 'why-markdoc');const { Content } = await render(entry);---
    <!--Pass the `abTest` param as a variable--><Content abTestGroup={Astro.params.abTestGroup} />

Now, `abTestGroup` is available as a variable in `docs/why-markdoc.mdoc`:

src/content/docs/why-markdoc.mdoc

    {% if $abTestGroup === 'image-optimization-lover' %}
    Let me tell you about image optimization...
    {% /if %}

To make a variable global to all Markdoc files, you can use the `variables` attribute from your `markdoc.config.mjs|ts`:

markdoc.config.mjs

    import { defineMarkdocConfig } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  variables: {    environment: process.env.IS_PROD ? 'prod' : 'dev',  },});

### Access frontmatter from your Markdoc content

[Section titled Access frontmatter from your Markdoc content](#access-frontmatter-from-your-markdoc-content)

To access frontmatter, you can pass the entry `data` property as a variable where you render your content:

src/pages/why-markdoc.astro

    ---import { getEntry, render } from 'astro:content';
    const entry = await getEntry('docs', 'why-markdoc');const { Content } = await render(entry);---
    <Content frontmatter={entry.data} />

This can now be accessed as `$frontmatter` in your Markdoc.

Render components
-----------------

[Section titled Render components](#render-components)

`@astrojs/markdoc` offers configuration options to use all of Markdoc’s features and connect UI components to your content.

### Use Astro components as Markdoc tags

[Section titled Use Astro components as Markdoc tags](#use-astro-components-as-markdoc-tags)

You can configure [Markdoc tags](https://markdoc.dev/docs/tags) that map to `.astro` components. You can add a new tag by creating a `markdoc.config.mjs|ts` file at the root of your project and configuring the `tag` attribute.

This example renders an `Aside` component, and allows a `type` prop to be passed as a string:

markdoc.config.mjs

    import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  tags: {    aside: {      render: component('./src/components/Aside.astro'),      attributes: {        // Markdoc requires type defs for each attribute.        // These should mirror the `Props` type of the component        // you are rendering.        // See Markdoc's documentation on defining attributes        // https://markdoc.dev/docs/attributes#defining-attributes        type: { type: String },      },    },  },});

This component can now be used in your Markdoc files with the `{% aside %}` tag. Children will be passed to your component’s default slot:

    # Welcome to Markdoc 👋
    {% aside type="tip" %}
    Use tags like this fancy "aside" to add some _flair_ to your docs.
    {% /aside %}

### Use client-side UI components

[Section titled Use client-side UI components](#use-client-side-ui-components)

Tags and nodes are restricted to `.astro` files. To embed client-side UI components in Markdoc, [use a wrapper `.astro` component that renders a framework component](/en/guides/framework-components/#nesting-framework-components) with your desired `client:` directive.

This example wraps a React `Aside.tsx` component with a `ClientAside.astro` component:

src/components/ClientAside.astro

    ---import Aside from './Aside';---
    <Aside {...Astro.props} client:load />

This Astro component can now be passed to the `render` prop for any [tag](https://markdoc.dev/docs/tags) or [node](https://markdoc.dev/docs/nodes) in your config:

markdoc.config.mjs

    import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  tags: {    aside: {      render: component('./src/components/ClientAside.astro'),      attributes: {        type: { type: String },      },    },  },});

### Use Astro components from npm packages and TypeScript files

[Section titled Use Astro components from npm packages and TypeScript files](#use-astro-components-from-npm-packages-and-typescript-files)

You may need to use Astro components exposed as named exports from TypeScript or JavaScript files. This is common when using npm packages and design systems.

You can pass the import name as the second argument to the `component()` function:

markdoc.config.mjs

    import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  tags: {    tabs: {      render: component('@astrojs/starlight/components', 'Tabs'),    },  },});

This generates the following import statement internally:

    import { Tabs } from '@astrojs/starlight/components';

Markdoc Partials
----------------

[Section titled Markdoc Partials](#markdoc-partials)

The `{% partial /%}` tag allows you to render other `.mdoc` files inside your Markdoc content.

This is useful for reusing content across multiple documents, and allows you to have `.mdoc` content files that do not follow your collection schema.

Tip

Use an underscore `_` prefix for partial files or directories. This excludes partials from content collection queries.

This example shows a Markdoc partial for a footer to be used inside blog collection entries:

src/content/blog/\_footer.mdoc

    Social links:
    - [Twitter / X](https://twitter.com/astrodotbuild)- [Discord](https://astro.build/chat)- [GitHub](https://github.com/withastro/astro)

Use the `{% partial /%}` tag with to render the footer at the bottom of a blog post entry. Apply the `file` attribute with the path to the file, using either a relative path or an import alias:

src/content/blog/post.mdoc

    # My Blog Post
    {% partial file="./_footer.mdoc" /%}

Syntax highlighting
-------------------

[Section titled Syntax highlighting](#syntax-highlighting)

`@astrojs/markdoc` provides [Shiki](https://shiki.style) and [Prism](https://github.com/PrismJS) extensions to highlight your code blocks.

### Shiki

[Section titled Shiki](#shiki)

Apply the `shiki()` extension to your Markdoc config using the `extends` property. You can optionally pass a shiki configuration object:

markdoc.config.mjs

    import { defineMarkdocConfig } from '@astrojs/markdoc/config';import shiki from '@astrojs/markdoc/shiki';
    export default defineMarkdocConfig({  extends: [    shiki({      // Choose from Shiki's built-in themes (or add your own)      // Default: 'github-dark'      // https://shiki.style/themes      theme: 'dracula',      // Enable word wrap to prevent horizontal scrolling      // Default: false      wrap: true,      // Pass custom languages      // Note: Shiki has countless langs built-in, including `.astro`!      // https://shiki.style/languages      langs: [],    }),  ],});

### Prism

[Section titled Prism](#prism)

Apply the `prism()` extension to your Markdoc config using the `extends` property.

markdoc.config.mjs

    import { defineMarkdocConfig } from '@astrojs/markdoc/config';import prism from '@astrojs/markdoc/prism';
    export default defineMarkdocConfig({  extends: [prism()],});

To learn about configuring Prism stylesheets, [see our syntax highlighting guide](/en/guides/syntax-highlighting/#add-a-prism-stylesheet).

Custom Markdoc nodes / elements
-------------------------------

[Section titled Custom Markdoc nodes / elements](#custom-markdoc-nodes--elements)

You may want to render standard Markdown elements, such as paragraphs and bolded text, as Astro components. For this, you can configure a [Markdoc node](https://markdoc.dev/docs/nodes). If a given node receives attributes, they will be available as component props.

This example renders blockquotes with a custom `Quote.astro` component:

markdoc.config.mjs

    import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  nodes: {    blockquote: {      ...nodes.blockquote, // Apply Markdoc's defaults for other options      render: component('./src/components/Quote.astro'),    },  },});

See the [Markdoc nodes documentation](https://markdoc.dev/docs/nodes#built-in-nodes) to learn about all the built-in nodes and attributes.

### Custom headings

[Section titled Custom headings](#custom-headings)

`@astrojs/markdoc` automatically adds anchor links to your headings, and [generates a list of `headings` via the content collections API](/en/guides/content-collections/#rendering-body-content). To further customize how headings are rendered, you can apply an Astro component [as a Markdoc node](https://markdoc.dev/docs/nodes).

This example renders a `Heading.astro` component using the `render` property:

markdoc.config.mjs

    import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  nodes: {    heading: {      ...nodes.heading, // Preserve default anchor link generation      render: component('./src/components/Heading.astro'),    },  },});

All Markdown headings will render the `Heading.astro` component and pass the following `attributes` as component props:

*   `level: number` The heading level 1 - 6
*   `id: string` An `id` generated from the heading’s text contents. This corresponds to the `slug` generated by the [content `render()` function](/en/guides/content-collections/#rendering-body-content).

For example, the heading `### Level 3 heading!` will pass `level: 3` and `id: 'level-3-heading'` as component props.

### Custom image components

[Section titled Custom image components](#custom-image-components)

Astro’s `<Image />` component cannot be used directly in Markdoc. However, you can configure an Astro component to override the default image node every time the native `![]()` image syntax is used, or as a custom Markdoc tag to allow you to specify additional image attributes.

#### Override Markdoc’s default image node

[Section titled Override Markdoc’s default image node](#override-markdocs-default-image-node)

To override the default image node, you can configure an `.astro` component to be rendered in place of a standard `<img>`.

1.  Build a custom `MarkdocImage.astro` component to pass the required `src` and `alt` properties from your image to the `<Image />` component:
    
    src/components/MarkdocImage.astro
    
        ---import { Image } from "astro:assets";interface Props {  src: ImageMetadata;  alt: string;}const { src, alt } = Astro.props;---<Image src={src} alt={alt} />
    
2.  The `<Image />` component requires a `width` and `height` for remote images which cannot be provided using the `![]()` syntax. To avoid errors when using remote images, update your component to render a standard HTML `<img>` tag when a remote URL `src` is found:
    
    src/components/MarkdocImage.astro
    
        ---import { Image } from "astro:assets";interface Props {  src: ImageMetadata | string;  alt: string;}const { src, alt } = Astro.props;---<Image src={src} alt={alt} />{  typeof src === 'string' ? <img src={src} alt={alt} /> : <Image src={src} alt={alt} />}
    
3.  Configure Markdoc to override the default image node and render `MarkdocImage.astro`:
    
    markdoc.config.mjs
    
        import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';
        export default defineMarkdocConfig({  nodes: {    image: {      ...nodes.image, // Apply Markdoc's defaults for other options      render: component('./src/components/MarkdocImage.astro'),    },  },});
    
4.  The native image syntax in any `.mdoc` file will now use the `<Image />` component to optimize your local images. Remote images may still be used, but will not be rendered by Astro’s `<Image />` component.
    
    src/content/blog/post.mdoc
    
        <!-- Optimized by <Image /> -->![A picture of a cat](/cat.jpg)
        <!-- Unoptimized <img> -->![A picture of a dog](https://example.com/dog.jpg)
    

#### Create a custom Markdoc image tag

[Section titled Create a custom Markdoc image tag](#create-a-custom-markdoc-image-tag)

A Markdoc `image` tag allows you to set additional attributes on your image that are not possible with the `![]()` syntax. For example, custom image tags allow you to use Astro’s `<Image />` component for remote images that require a `width` and `height`.

The following steps will create a custom Markdoc image tag to display a `<figure>` element with a caption, using the Astro `<Image />` component to optimize the image.

1.  Create a `MarkdocFigure.astro` component to receive the necessary props and render an image with a caption:
    
    src/components/MarkdocFigure.astro
    
        ---// src/components/MarkdocFigure.astroimport { Image } from "astro:assets";
        interface Props {  src: ImageMetadata | string;  alt: string;  width: number;  height: number;  caption: string;}
        const { src, alt, width, height, caption } = Astro.props;---<figure>    <Image {src} {alt} {width} {height}  />    {caption && <figcaption>{caption}</figcaption>}</figure>
    
2.  Configure your custom image tag to render your Astro component:
    
    markdoc.config.mjs
    
        import { component, defineMarkdocConfig, nodes } from '@astrojs/markdoc/config';
        export default defineMarkdocConfig({  tags: {    image: {      attributes: {        width: {          type: String,        },        height: {          type: String,        },        caption: {          type: String,        },        ...nodes.image.attributes      },      render: component('./src/components/MarkdocFigure.astro'),    },  },});
    
3.  Use the `image` tag in Markdoc files to display a figure with caption, providing all the necessary attributes for your component:
    
        {% image src="./astro-logo.png" alt="Astro Logo" width="100" height="100" caption="a caption!" /%}
    

Advanced Markdoc configuration
------------------------------

[Section titled Advanced Markdoc configuration](#advanced-markdoc-configuration)

The `markdoc.config.mjs|ts` file accepts [all Markdoc configuration options](https://markdoc.dev/docs/config), including [tags](https://markdoc.dev/docs/tags) and [functions](https://markdoc.dev/docs/functions).

You can pass these options from the default export in your `markdoc.config.mjs|ts` file:

markdoc.config.mjs

    import { defineMarkdocConfig } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  functions: {    getCountryEmoji: {      transform(parameters) {        const [country] = Object.values(parameters);        const countryToEmojiMap = {          japan: '🇯🇵',          spain: '🇪🇸',          france: '🇫🇷',        };        return countryToEmojiMap[country] ?? '🏳';      },    },  },});

Now, you can call this function from any Markdoc content entry:

    ¡Hola {% getCountryEmoji("spain") %}!

[See the Markdoc documentation](https://markdoc.dev/docs/functions#creating-a-custom-function) for more on using variables or functions in your content.

### Set the root HTML element

[Section titled Set the root HTML element](#set-the-root-html-element)

Markdoc wraps documents with an `<article>` tag by default. This can be changed from the `document` Markdoc node. This accepts an HTML element name or `null` if you prefer to remove the wrapper element:

markdoc.config.mjs

    import { defineMarkdocConfig, nodes } from '@astrojs/markdoc/config';
    export default defineMarkdocConfig({  nodes: {    document: {      ...nodes.document, // Apply defaults for other options      render: null, // default 'article'    },  },});

Integration config options
--------------------------

[Section titled Integration config options](#integration-config-options)

The Astro Markdoc integration handles configuring Markdoc options and capabilities that are not available through the `markdoc.config.js` file.

### `allowHTML`

[Section titled allowHTML](#allowhtml)

Enables writing HTML markup alongside Markdoc tags and nodes.

By default, Markdoc will not recognize HTML markup as semantic content.

To achieve a more Markdown-like experience, where HTML elements can be included alongside your content, set `allowHTML:true` as a `markdoc` integration option. This will enable HTML parsing in Markdoc markup.

astro.config.mjs

      import { defineConfig } from 'astro/config';  import markdoc from '@astrojs/markdoc';
      export default defineConfig({    // ...    integrations: [markdoc({ allowHTML: true })],  });

Caution

When `allowHTML` is enabled, HTML markup inside Markdoc documents will be rendered as actual HTML elements (including `<script>`), making attack vectors like XSS possible. Ensure that any HTML markup comes from trusted sources.

### `ignoreIndentation`

[Section titled ignoreIndentation](#ignoreindentation)

By default, any content that is indented by four spaces is treated as a code block. Unfortunately, this behavior makes it difficult to use arbitrary levels of indentation to improve the readability of documents with complex structure.

When using nested tags in Markdoc, it can be helpful to indent the content inside of tags so that the level of depth is clear. To support arbitrary indentation, we have to disable the indent-based code blocks and modify several other markdown-it parsing rules that account for indent-based code blocks. These changes can be applied by enabling the ignoreIndentation option.

astro.config.mjs

      import { defineConfig } from 'astro/config';  import markdoc from '@astrojs/markdoc';
      export default defineConfig({    // ...    integrations: [markdoc({ ignoreIndentation: true })],  });

    # Welcome to Markdoc with indented tags 👋
    # Note: Can use either spaces or tabs for indentation
    {% custom-tag %}{% custom-tag %} ### Tags can be indented for better readability
        {% another-custom-tag %}      This is easier to follow when there is a lot of nesting    {% /another-custom-tag %}
    {% /custom-tag %}{% /custom-tag %}

Examples
--------

[Section titled Examples](#examples)

*   The [Astro Markdoc starter template](https://github.com/withastro/astro/tree/latest/examples/with-markdoc) shows how to use Markdoc files in your Astro project.

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/markdoc.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
DB](/en/guides/integrations-guide/db/) [Next  
MDX](/en/guides/integrations-guide/mdx/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)