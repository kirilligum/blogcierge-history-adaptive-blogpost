Style rendered Markdown with Tailwind Typography
================================================

You can use [Tailwind](https://tailwindcss.com)’s Typography plugin to style rendered Markdown from sources such as Astro’s [**content collections**](/en/guides/content-collections/).

This recipe will teach you how to create a reusable Astro component to style your Markdown content using Tailwind’s utility classes.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

An Astro project that:

*   has [Tailwind’s Vite plugin](/en/guides/styling/#tailwind) installed.
*   uses Astro’s [content collections](/en/guides/content-collections/).

Setting Up `@tailwindcss/typography`
------------------------------------

[Section titled Setting Up @tailwindcss/typography](#setting-up-tailwindcsstypography)

First, install `@tailwindcss/typography` using your preferred package manager.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-1828)
*   [pnpm](#tab-panel-1829)
*   [Yarn](#tab-panel-1830)

Terminal window

    npm install -D @tailwindcss/typography

Terminal window

    pnpm add -D @tailwindcss/typography

Terminal window

    yarn add --dev @tailwindcss/typography

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Then, add the package as a plugin in your Tailwind configuration file.

src/styles/global.css

    @import 'tailwindcss';@plugin '@tailwindcss/typography';

Recipe
------

[Section titled Recipe](#recipe)

1.  Create a `<Prose />` component to provide a wrapping `<div>` with a `<slot />` for your rendered Markdown. Add the style class `prose` alongside any desired [Tailwind element modifiers](https://tailwindcss.com/docs/typography-plugin#element-modifiers) in the parent element.
    
    src/components/Prose.astro
    
        ------<div  class="prose dark:prose-invert  prose-h1:font-bold prose-h1:text-xl  prose-a:text-blue-600 prose-p:text-justify prose-img:rounded-xl  prose-headings:underline">  <slot /></div>
    
    Tip
    
    The `@tailwindcss/typography` plugin uses [**element modifiers**](https://tailwindcss.com/docs/typography-plugin#element-modifiers) to style child components of a container with the `prose` class.
    
    These modifiers follow the following general syntax:
    
        prose-[element]:class-to-apply
    
    For example, `prose-h1:font-bold` gives all `<h1>` tags the `font-bold` Tailwind class.
    
2.  Query your collection entry on the page you want to render your Markdown. Pass the `<Content />` component from `await render(entry)` to `<Prose />` as a child to wrap your Markdown content in Tailwind styles.
    
    src/pages/index.astro
    
        ---import Prose from '../components/Prose.astro';import Layout from '../layouts/Layout.astro';import { getEntry, render } from 'astro:content';
        const entry = await getEntry('collection', 'entry');const { Content } = await render(entry);---<Layout>  <Prose>    <Content />  </Prose></Layout>
    

Resources
---------

[Section titled Resources](#resources)

*   [Tailwind Typography Documentation](https://tailwindcss.com/docs/typography-plugin)

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/tailwind-rendered-markdown.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Using streaming to improve page performance](/en/recipes/streaming-improve-page-performance/) [Next  
Contribute to Astro](/en/contribute/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

