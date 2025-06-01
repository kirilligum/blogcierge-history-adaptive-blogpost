Add icons to external links
===========================

Using a rehype plugin, you can identify and modify links in your Markdown files that point to external sites. This example adds icons to the end of each external link, so that visitors will know they are leaving your site.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

*   An Astro project using Markdown for content pages.

Recipe
------

[Section titled Recipe](#recipe)

1.  Install the `rehype-external-links` plugin.
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-1774)
    *   [pnpm](#tab-panel-1775)
    *   [Yarn](#tab-panel-1776)
    
    Terminal window
    
        npm install rehype-external-links
    
    Terminal window
    
        pnpm add rehype-external-links
    
    Terminal window
    
        yarn add rehype-external-links
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Import the plugin into your `astro.config.mjs` file.
    
    Pass `rehypeExternalLinks` to the `rehypePlugins` array, along with an options object that includes a content property. Set this property’s `type` to `text` if you want to add plain text to the end of the link. To add HTML to the end of the link instead, set the property `type` to `raw`.
    
        // ...import rehypeExternalLinks from 'rehype-external-links';
        export default defineConfig({  // ...  markdown: {    rehypePlugins: [      [        rehypeExternalLinks,        {          content: { type: 'text', value: ' 🔗' }        }      ],    ]  },});
    
    Note
    
    The value of the `content` property is [not represented in the accessibility tree](https://developer.mozilla.org/en-US/docs/Web/CSS/content#accessibility_concerns). As such, it’s best to make clear that the link is external in the surrounding content, rather than relying on the icon alone.
    

Resources
---------

[Section titled Resources](#resources)

*   [rehype-external-links](https://www.npmjs.com/package/rehype-external-links)

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/external-links.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Dynamically import images](/en/recipes/dynamically-importing-images/) [Next  
Add i18n features](/en/recipes/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)