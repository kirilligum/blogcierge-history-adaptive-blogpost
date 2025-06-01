Using custom fonts
==================

This guide will show you how to add web fonts to your project and use them in your components.

Experimental Fonts API

Learn about Astro’s [experimental Fonts API](/en/reference/experimental-flags/fonts/) that allows you to use fonts from your filesystem and various font providers through a unified, fully customizable, and type-safe API.

Using a local font file
-----------------------

[Section titled Using a local font file](#using-a-local-font-file)

This example will demonstrate adding a custom font using the font file `DistantGalaxy.woff`.

1.  Add your font file to `public/fonts/`.
    
2.  Add the following `@font-face` statement to your CSS. This could be in a global `.css` file you import, a `<style is:global>` block, or a `<style>` block in a specific layout or component where you want to use this font.
    
        /* Register your custom font family and tell the browser where to find it. */@font-face {  font-family: 'DistantGalaxy';  src: url('/fonts/DistantGalaxy.woff') format('woff');  font-weight: normal;  font-style: normal;  font-display: swap;}
    
3.  Use the `font-family` value from the `@font-face` statement to style elements in your component or layout. In this example, the `<h1>` heading will have the custom font applied, while the paragraph `<p>` will not.
    
    src/pages/example.astro
    
        ------
        <h1>In a galaxy far, far away...</h1>
        <p>Custom fonts make my headings much cooler!</p>
        <style>h1 {  font-family: 'DistantGalaxy', sans-serif;}</style>
    

Using Fontsource
----------------

[Section titled Using Fontsource](#using-fontsource)

The [Fontsource](https://fontsource.org/) project simplifies using Google Fonts and other open-source fonts. It provides npm modules you can install for the fonts you want to use.

1.  Find the font you want to use in [Fontsource’s catalog](https://fontsource.org/). This example will use [Twinkle Star](https://fontsource.org/fonts/twinkle-star).
    
2.  Install the package for your chosen font.
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-1717)
    *   [pnpm](#tab-panel-1718)
    *   [Yarn](#tab-panel-1719)
    
    Terminal window
    
        npm install @fontsource/twinkle-star
    
    Terminal window
    
        pnpm add @fontsource/twinkle-star
    
    Terminal window
    
        yarn add @fontsource/twinkle-star
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
    
    Tip
    
    You’ll find the correct package name in the “Quick Installation” section of each font page on Fontsource’s website. It will start with `@fontsource/` or `@fontsource-variable/` followed by the name of the font.
    
3.  Import the font package in the component where you want to use the font. Usually, you will want to do this in a common layout component to make sure the font is available across your site.
    
    The import will automatically add the necessary `@font-face` rules needed to set up the font.
    
    src/layouts/BaseLayout.astro
    
        ---import '@fontsource/twinkle-star';---
    
4.  Use the font’s name as shown in the `body` example on its Fontsource page as the `font-family` value. This will work anywhere you can write CSS in your Astro project.
    
        h1 {  font-family: "Twinkle Star", cursive;}
    

To optimize your website’s rendering times, you may want to preload fonts that are essential for the initial page display. See the [Fontsource guide to preloading fonts](https://fontsource.org/docs/getting-started/preload) for more information and usage.

Register fonts in Tailwind
--------------------------

[Section titled Register fonts in Tailwind](#register-fonts-in-tailwind)

If you are using [Tailwind](/en/guides/styling/#tailwind), you can use either of the previous methods on this page to install your font, with some modifications. You can either add an [`@font-face` statement for a local font](#using-a-local-font-file) or use [Fontsource’s `import` strategy](#using-fontsource) to install your font.

To register your font in Tailwind:

1.  Follow either of the guides above, but skip the final step of adding `font-family` to your CSS.
    
2.  Add the typeface name to `src/styles/global.css`.
    
    This example adds `Inter` to the sans-serif font stack.
    
    src/styles/global.css
    
        @import 'tailwindcss';
        @theme {  --font-sans: 'Inter', 'sans-serif';}
    
    Now, all sans-serif text (the default with Tailwind) in your project will use your chosen font and the `font-sans` class will also apply the Inter font.
    

See [Tailwind’s docs on adding custom font families](https://tailwindcss.com/docs/font-family#using-custom-values) for more information.

More resources
--------------

[Section titled More resources](#more-resources)

*   Learn how web fonts work in [MDN’s web fonts guide](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts).
*   Generate CSS for your font with [Font Squirrel’s Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator).

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/fonts.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Styles and CSS](/en/guides/styling/) [Next  
Syntax Highlighting](/en/guides/syntax-highlighting/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

