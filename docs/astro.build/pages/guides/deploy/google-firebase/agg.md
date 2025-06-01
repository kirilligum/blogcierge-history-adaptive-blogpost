Deploy your Astro Site to Google’s Firebase Hosting
===================================================

[Firebase Hosting](https://firebase.google.com/products/hosting) is a service provided by Google’s [Firebase](https://firebase.google.com/) app development platform, which can be used to deploy an Astro site.

See our separate guide for [adding Firebase backend services](/en/guides/backend/google-firebase/) such as databases, authentication, and storage.

Project Configuration
---------------------

[Section titled Project Configuration](#project-configuration)

Your Astro project can be deployed to Firebase as a static site, or as a server-side rendered site (SSR).

### Static Site

[Section titled Static Site](#static-site)

Your Astro project is a static site by default. You don’t need any extra configuration to deploy a static Astro site to Firebase.

### Adapter for SSR

[Section titled Adapter for SSR](#adapter-for-ssr)

To enable SSR in your Astro project and deploy on Firebase add the [Node.js adapter](/en/guides/integrations-guide/node/).

Note

Deploying an SSR Astro site to Firebase requires the [Blaze plan](https://firebase.google.com/pricing) or higher.

How to deploy
-------------

[Section titled How to deploy](#how-to-deploy)

1.  Install the [Firebase CLI](https://github.com/firebase/firebase-tools). This is a command-line tool that allows you to interact with Firebase from the terminal.
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3146)
    *   [pnpm](#tab-panel-3147)
    *   [Yarn](#tab-panel-3148)
    
    Terminal window
    
        npm install firebase-tools
    
    Terminal window
    
        pnpm add firebase-tools
    
    Terminal window
    
        yarn add firebase-tools
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Authenticate the Firebase CLI with your Google account. This will open a browser window where you can log in to your Google account.
    
    *   [npm](#tab-panel-3149)
    *   [pnpm](#tab-panel-3150)
    *   [Yarn](#tab-panel-3151)
    
    Terminal window
    
        npx firebase login
    
    Terminal window
    
        pnpm exec firebase login
    
    Terminal window
    
        yarn firebase login
    
3.  Enable experimental web frameworks support. This is an experimental feature that allows the Firebase CLI to detect and configure your deployment settings for Astro.
    
    *   [npm](#tab-panel-3152)
    *   [pnpm](#tab-panel-3153)
    *   [Yarn](#tab-panel-3154)
    
    Terminal window
    
        npx firebase experiments:enable webframeworks
    
    Terminal window
    
        pnpm exec firebase experiments:enable webframeworks
    
    Terminal window
    
        yarn firebase experiments:enable webframeworks
    
4.  Initialize Firebase Hosting in your project. This will create a `firebase.json` and `.firebaserc` file in your project root.
    
    *   [npm](#tab-panel-3155)
    *   [pnpm](#tab-panel-3156)
    *   [Yarn](#tab-panel-3157)
    
    Terminal window
    
        npx firebase init hosting
    
    Terminal window
    
        pnpm exec firebase init hosting
    
    Terminal window
    
        yarn firebase init hosting
    
5.  Deploy your site to Firebase Hosting. This will build your Astro site and deploy it to Firebase.
    
    *   [npm](#tab-panel-3158)
    *   [pnpm](#tab-panel-3159)
    *   [Yarn](#tab-panel-3160)
    
    Terminal window
    
        npx firebase deploy --only hosting
    
    Terminal window
    
        pnpm exec firebase deploy --only hosting
    
    Terminal window
    
        yarn firebase deploy --only hosting
    

More Deployment Guides
----------------------

*   ![](/logos/netlify.svg)
    
    ### [Netlify](/en/guides/deploy/netlify/)
    
*   ![](/logos/vercel.svg)
    
    ### [Vercel](/en/guides/deploy/vercel/)
    
*   ![](/logos/deno.svg)
    
    ### [Deno Deploy](/en/guides/deploy/deno/)
    
*   ![](/logos/github.svg)
    
    ### [GitHub Pages](/en/guides/deploy/github/)
    
*   ![](/logos/gitlab.svg)
    
    ### [GitLab Pages](/en/guides/deploy/gitlab/)
    
*   ![](/logos/cloudflare-pages.svg)
    
    ### [Cloudflare Pages](/en/guides/deploy/cloudflare/)
    
*   ![](/logos/aws.svg)
    
    ### [AWS](/en/guides/deploy/aws/)
    
*   ![](/logos/flightcontrol.svg)
    
    ### [AWS via Flightcontrol](/en/guides/deploy/flightcontrol/)
    
*   ![](/logos/sst.svg)
    
    ### [AWS via SST](/en/guides/deploy/sst/)
    
*   ![](/logos/clever-cloud.svg)
    
    ### [Clever Cloud](/en/guides/deploy/clever-cloud/)
    
*   ![](/logos/azion.svg)
    
    ### [Azion](/en/guides/deploy/azion/)
    
*   ![](/logos/google-cloud.svg)
    
    ### [Google Cloud](/en/guides/deploy/google-cloud/)
    
*   ![](/logos/firebase.svg)
    
    ### [Google Firebase](/en/guides/deploy/google-firebase/)
    
*   ![](/logos/heroku.svg)
    
    ### [Heroku](/en/guides/deploy/heroku/)
    
*   ![](/logos/microsoft-azure.svg)
    
    ### [Microsoft Azure](/en/guides/deploy/microsoft-azure/)
    
*   ![](/logos/buddy.svg)
    
    ### [Buddy](/en/guides/deploy/buddy/)
    
*   ![](/logos/edgio.svg)
    
    ### [Edgio](/en/guides/deploy/edgio/)
    
*   ![](/logos/fleek.svg)
    
    ### [Fleek](/en/guides/deploy/fleek/)
    
*   ![](/logos/flyio.svg)
    
    ### [Fly.io](/en/guides/deploy/flyio/)
    
*   ![](/logos/render.svg)
    
    ### [Render](/en/guides/deploy/render/)
    
*   ![](/logos/stormkit.svg)
    
    ### [Stormkit](/en/guides/deploy/stormkit/)
    
*   ![](/logos/surge.svg)
    
    ### [Surge](/en/guides/deploy/surge/)
    
*   ![](/logos/cleavr.svg)
    
    ### [Cleavr](/en/guides/deploy/cleavr/)
    
*   ![](/logos/kinsta.svg)
    
    ### [Kinsta](/en/guides/deploy/kinsta/)
    
*   ![](/logos/zeabur.svg)
    
    ### [Zeabur](/en/guides/deploy/zeabur/)
    
*   ![](/logos/zerops.svg)
    
    ### [Zerops](/en/guides/deploy/zerops/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/google-firebase.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Google Cloud](/en/guides/deploy/google-cloud/) [Next  
Heroku](/en/guides/deploy/heroku/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

