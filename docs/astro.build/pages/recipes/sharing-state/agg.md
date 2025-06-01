Share state between Astro components
====================================

Tip

Using framework components? See [how to share state between Islands](/en/recipes/sharing-state-islands/)!

When building an Astro website, you may need to share state across components. Astro recommends the use of [Nano Stores](https://github.com/nanostores/nanostores) for shared client storage.

Recipe
------

[Section titled Recipe](#recipe)

1.  Install Nano Stores:
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-1825)
    *   [pnpm](#tab-panel-1826)
    *   [Yarn](#tab-panel-1827)
    
    Terminal window
    
        npm install nanostores
    
    Terminal window
    
        pnpm add nanostores
    
    Terminal window
    
        yarn add nanostores
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Create a store. In this example, the store tracks whether a dialog is open or not:
    
    src/store.js
    
        import { atom } from 'nanostores';
        export const isOpen = atom(false);
    
3.  Import and use the store in a `<script>` tag in the components that will share state.
    
    The following `Button` and `Dialog` components each use the shared `isOpen` state to control whether a particular `<div>` is hidden or displayed:
    
    src/components/Button.astro
    
        <button id="openDialog">Open</button>
        <script>  import { isOpen } from '../store.js';
          // Set the store to true when the button is clicked  function openDialog() {    isOpen.set(true);  }
          // Add an event listener to the button  document.getElementById('openDialog').addEventListener('click', openDialog);</script>
    
    src/components/Dialog.astro
    
        <div id="dialog" style="display: none">Hello world!</div>
        <script>  import { isOpen } from '../store.js';
          // Listen to changes in the store, and show/hide the dialog accordingly  isOpen.subscribe(open => {    if (open) {      document.getElementById('dialog').style.display = 'block';    } else {      document.getElementById('dialog').style.display = 'none';    }  })</script>
    

Resources
---------

[Section titled Resources](#resources)

*   [Nano Stores on NPM](https://www.npmjs.com/package/nanostores)
*   [Nano Stores documentation for Vanilla JS](https://github.com/nanostores/nanostores#vanilla-js)

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/sharing-state.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Add an RSS feed](/en/recipes/rss/) [Next  
Share state between islands](/en/recipes/sharing-state-islands/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

