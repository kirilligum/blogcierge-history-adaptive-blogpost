Analyze bundle size
===================

Understanding what is a part of an Astro bundle is important for improving site performance. Visualizing the bundle can give clues as to where changes can be made in your project to reduce the bundle size.

Recipe
------

[Section titled Recipe](#recipe)

The [`rollup-plugin-visualizer` library](https://github.com/btd/rollup-plugin-visualizer) allows you to visualize and analyze your Rollup bundle to see which modules are taking up space.

1.  Install `rollup-plugin-visualizer`:
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-1753)
    *   [pnpm](#tab-panel-1754)
    *   [Yarn](#tab-panel-1755)
    
    Terminal window
    
        npm install rollup-plugin-visualizer --save-dev
    
    Terminal window
    
        pnpm add rollup-plugin-visualizer --save-dev
    
    Terminal window
    
        yarn add rollup-plugin-visualizer --save-dev
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Add the plugin to the `astro.config.mjs` file:
    
        // @ts-checkimport { defineConfig } from 'astro/config';import { visualizer } from "rollup-plugin-visualizer";
        export default defineConfig({vite: {    plugins: [visualizer({        emitFile: true,        filename: "stats.html",    })]}});
    
3.  Run the build command:
    
    *   [npm](#tab-panel-1756)
    *   [pnpm](#tab-panel-1757)
    *   [Yarn](#tab-panel-1758)
    
    Terminal window
    
        npm run build
    
    Terminal window
    
        pnpm build
    
    Terminal window
    
        yarn build
    
4.  Find the `stats.html` file(s) for your project.
    
    This will be at the root of your `dist/` directory for entirely static sites and will allow you to see what is included in the bundle.
    
    If your Astro project uses on-demand rendering, you will have two `stats.html` files. One will be for the client, and the other for the server, and each will be located at the root of the `dist/client` and `dist/server/` directories.
    
    See [the Rollup Plugin Visualizer documentation](https://github.com/btd/rollup-plugin-visualizer#how-to-use-generated-files) for guidance on how to interpret these files, or configure specific options.
    

Note

Given Astro’s unique approach to hydration, the build isn’t necessarily representative of the bundle that the client will receive.

The Rollup visualizer shows all dependencies that are used across the site, but it does not break down the bundle size on a per-page basis.

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/analyze-bundle-size.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Installing a Vite or Rollup plugin](/en/recipes/add-yaml-support/) [Next  
Build a custom image component](/en/recipes/build-custom-img-component/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

