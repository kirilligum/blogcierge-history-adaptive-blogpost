Syntax Highlighting
===================

Astro comes with built-in support for [Shiki](https://shiki.style/) and [Prism](https://prismjs.com/). This provides syntax highlighting for:

*   all [code fences (\`\`\`)](#markdown-code-blocks) used in a Markdown or MDX file.
*   content within the [built-in `<Code />` component](#code-) (powered by Shiki) in `.astro` files.
*   content within the [`<Prism />` component](#prism-) (powered by Prism) in `.astro` files.

Add [community integrations such as Expressive Code](https://astro.build/integrations/?search=syntax+highlight) for even more text marking and annotation options in your code blocks.

Markdown code blocks
--------------------

[Section titled Markdown code blocks](#markdown-code-blocks)

A Markdown code block is indicated by a block with three backticks \`\`\` at the start and end. You can indicate the programming language being used after the opening backticks to indicate how to color and style your code to make it easier to read.

    ```js// Javascript code with syntax highlighting.var fun = function lang(l) {  dateformat.i18n = require('./lang/' + l);  return true;};```

Astro’s Markdown code blocks are styled by Shiki by default, preconfigured with the `github-dark` theme. The compiled output will be limited to inline `style`s without any extraneous CSS classes, stylesheets, or client-side JS.

You can [add a Prism stylesheet and switch to Prism’s highlighting](#add-a-prism-stylesheet), or disable Astro’s syntax highlighting entirely, with the [`markdown.syntaxHighlight`](/en/reference/configuration-reference/#markdownsyntaxhighlight) configuration option.

See the full [`markdown.shikiConfig` reference](/en/reference/configuration-reference/#markdownshikiconfig) for the complete set of Markdown syntax highlighting options available when using Shiki.

### Setting a default Shiki theme

[Section titled Setting a default Shiki theme](#setting-a-default-shiki-theme)

You can configure any [built-in Shiki theme](https://shiki.style/themes) for your Markdown code blocks in your Astro config:

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  markdown: {    shikiConfig: {      theme: 'dracula',    },  },});

See the full [Shiki config reference](/en/reference/configuration-reference/#markdownshikiconfig) for the complete set of Markdown code block options.

### Setting light and dark mode themes

[Section titled Setting light and dark mode themes](#setting-light-and-dark-mode-themes)

You can specify dual Shiki themes for light and dark mode in your Astro config:

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  markdown: {    shikiConfig: {      themes: {        light: 'github-light',        dark: 'github-dark',      },    },  },});

Then, [add Shiki’s dark mode CSS variables via media query or classes](https://shiki.style/guide/dual-themes#query-based-dark-mode) to apply to all your Markdown code blocks by default. Replace the `.shiki` class in the examples from Shiki’s documentation with `.astro-code`:

src/styles/global.css

    @media (prefers-color-scheme: dark) {  .shiki,  .shiki span {  .astro-code,  .astro-code span {    color: var(--shiki-dark) !important;    background-color: var(--shiki-dark-bg) !important;    /* Optional, if you also want font styles */    font-style: var(--shiki-dark-font-style) !important;    font-weight: var(--shiki-dark-font-weight) !important;    text-decoration: var(--shiki-dark-text-decoration) !important;  }}

See the full [Shiki config reference](/en/reference/configuration-reference/#markdownshikiconfig) for the complete set of Markdown code block options.

### Adding your own Shiki theme

[Section titled Adding your own Shiki theme](#adding-your-own-shiki-theme)

Instead of using one of Shiki’s predefined themes, you can import a custom Shiki theme from a local file.

astro.config.mjs

    import { defineConfig } from 'astro/config';import customTheme from './my-shiki-theme.json';
    export default defineConfig({  markdown: {    shikiConfig: {      theme: customTheme,    },  },});

### Customizing Shiki themes

[Section titled Customizing Shiki themes](#customizing-shiki-themes)

You can follow [Shiki’s own theme documentation](https://shiki.style/themes) for more customization options for themes, [light vs dark mode toggles](https://shiki.style/guide/dual-themes), or styling via [CSS variables](https://shiki.style/guide/theme-colors#css-variables-theme).

You will need to adjust the examples from Shiki’s documentation for your Astro project by making the following substitutions:

*   Code blocks are styled using the `.astro-code` class instead of `.shiki`
*   When using the `css-variables` theme, custom properties are prefixed with `--astro-code-` instead of `--shiki-`

Components for code blocks
--------------------------

[Section titled Components for code blocks](#components-for-code-blocks)

There are two Astro components available for `.astro` and `.mdx` files to render code blocks: [`<Code />`](#code-) and [`<Prism />`](#prism-).

You can reference the `Props` of these components using the [`ComponentProps` type](/en/guides/typescript/#componentprops-type) utility.

### `<Code />`

[Section titled &lt;Code /&gt;](#code-)

This component is powered internally by Shiki. It supports all popular Shiki themes and languages as well as several other Shiki options such as custom themes, languages, [transformers](#transformers), and default colors.

These values are passed to the `<Code />` component using the `theme`, `lang`, `transformers`, and `defaultColor` attributes respectively as props. The `<Code />` component will not inherit your `shikiConfig` settings for Markdown code blocks.

    ---import { Code } from 'astro:components';---<!-- Syntax highlight some JavaScript code. --><Code code={`const foo = 'bar';`} lang="js" /><!-- Optional: Customize your theme. --><Code code={`const foo = 'bar';`} lang="js" theme="dark-plus" /><!-- Optional: Enable word wrapping. --><Code code={`const foo = 'bar';`} lang="js" wrap /><!-- Optional: Output inline code. --><p>  <Code code={`const foo = 'bar';`} lang="js" inline />  will be rendered inline.</p><!-- Optional: defaultColor --><Code code={`const foo = 'bar';`} lang="js" defaultColor={false} />

#### Transformers

[Section titled Transformers](#transformers)

**Added in:** `astro@4.11.0`

[Shiki transformers](https://shiki.style/packages/transformers#shikijs-transformers) can optionally be applied to code by passing them in through the `transformers` property as an array. Since Astro v4.14.0, you can also provide a string for [Shiki’s `meta` attribute](https://shiki.style/guide/transformers#meta) to pass options to transformers.

Note that `transformers` only applies classes and you must provide your own CSS rules to target the elements of your code block.

src/pages/index.astro

    ---import { transformerNotationFocus, transformerMetaHighlight } from '@shikijs/transformers'import { Code } from 'astro:components'const code = `const foo = 'hello'const bar = ' world'console.log(foo + bar) // [!code focus]`---<Code  code={code}  lang="js"  transformers={[transformerMetaHighlight()]}  meta="{1,3}"/>
    <style is:global>  pre.has-focused .line:not(.focused) {    filter: blur(1px);  }</style>

### `<Prism />`

[Section titled &lt;Prism /&gt;](#prism-)

This component provides language-specific syntax highlighting for code blocks by applying Prism’s CSS classes. Note that you must [provide a Prism CSS stylesheet](#add-a-prism-stylesheet) (or bring your own) to style the classes.

To use the `Prism` highlighter component, you must install the `@astrojs/prism` package:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-1735)
*   [pnpm](#tab-panel-1736)
*   [Yarn](#tab-panel-1737)

Terminal window

    npm install @astrojs/prism

Terminal window

    pnpm add @astrojs/prism

Terminal window

    yarn add @astrojs/prism

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Then, you can import and use the `<Prism />` component like any other Astro component, passing a language and the code to render.

    ---import { Prism } from '@astrojs/prism';---<Prism lang="js" code={`const foo = 'bar';`} />

In addition to the [list of languages supported by Prism](https://prismjs.com/#supported-languages), you can also use `lang="astro"` to display Astro code blocks.

Add a Prism stylesheet
----------------------

[Section titled Add a Prism stylesheet](#add-a-prism-stylesheet)

If you opt to use Prism (either by configuring `markdown.syntaxHighlight: 'prism'` or with the `<Prism />` component), Astro will apply Prism’s CSS classes instead of Shiki’s to your code. You will need to bring your own CSS stylesheet for syntax highlighting to appear.

1.  Choose a premade stylesheet from the available [Prism Themes](https://github.com/PrismJS/prism-themes).
    
2.  Add this stylesheet to [your project’s `public/` directory](/en/basics/project-structure/#public).
    
3.  Load this into your page’s `<head>` in a [layout component](/en/basics/layouts/) via a `<link>` tag. (See [Prism basic usage](https://prismjs.com/#basic-usage).)
    

You can also visit the [list of languages supported by Prism](https://prismjs.com/#supported-languages) for options and usage.

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/syntax-highlighting.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Fonts](/en/guides/fonts/) [Next  
Scripts and event handling](/en/guides/client-side-scripts/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

