Monitor your Astro Site with Sentry
===================================

[Sentry](https://sentry.io) offers a comprehensive application monitoring and error tracking service designed to help developers identify, diagnose, and resolve issues in real-time.

Read more on our blog about [Astro’s partnership with Sentry](https://astro.build/blog/sentry-official-monitoring-partner/) and Sentry’s Spotlight dev toolbar app that brings a rich debug overlay into your Astro development environment. Spotlight shows errors, traces, and important context right in your browser during local development.

Sentry’s Astro SDK enables automatic reporting of errors and tracing data in your Astro application.

Project Configuration
---------------------

[Section titled Project Configuration](#project-configuration)

A full list of prerequisites can be found in [the Sentry guide for Astro](https://docs.sentry.io/platforms/javascript/guides/astro/#prerequisites).

Install
-------

[Section titled Install](#install)

Sentry captures data by using an SDK within your application’s runtime.

Install the SDK by running the following command for the package manager of your choice in the Astro CLI:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3041)
*   [pnpm](#tab-panel-3042)
*   [Yarn](#tab-panel-3043)

Terminal window

    npx astro add @sentry/astro

Terminal window

    pnpm astro add @sentry/astro

Terminal window

    yarn astro add @sentry/astro

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

The astro CLI installs the SDK package and adds the Sentry integration to your `astro.config.mjs` file.

Configure
---------

[Section titled Configure](#configure)

To configure the Sentry integration, you need to provide the following credentials in your `astro.config.mjs` file.

1.  **Client key (DSN)** - You can find the DSN in your Sentry project settings under _Client keys (DSN)_.
2.  **Project name** - You can find the project name in your Sentry project settings under _General settings_.
3.  **Auth token** - You can create an auth token in your Sentry organization settings under _Auth tokens_.

Note

If you are creating a new Sentry project, select Astro as your platform to get all the necessary information to configure the SDK.

astro.config.mjs

    import { defineConfig } from 'astro/config';import sentry from '@sentry/astro';
    export default defineConfig({  integrations: [    sentry({      dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',      sourceMapsUploadOptions: {        project: 'example-project',        authToken: process.env.SENTRY_AUTH_TOKEN,      },    }),  ],});

Once you’ve configured your `sourceMapsUploadOptions` and added your `dsn`, the SDK will automatically capture and send errors and performance events to Sentry.

Test your setup
---------------

[Section titled Test your setup](#test-your-setup)

Add the following `<button>` element to one of your `.astro` pages. This will allow you to manually trigger an error so you can test the error reporting process.

src/pages/index.astro

    <button onclick="throw new Error('This is a test error')">Throw test error</button>

To view and resolve the recorded error, log into [sentry.io](https://sentry.io/) and open your project.

More backend service guides
---------------------------

*   ![](/logos/appwriteio.svg)
    
    ### [Appwrite](/en/guides/backend/appwriteio/)
    
*   ![](/logos/firebase.svg)
    
    ### [Firebase](/en/guides/backend/google-firebase/)
    
*   ![](/logos/neon.svg)
    
    ### [Neon](/en/guides/backend/neon/)
    
*   ![](/logos/sentry.svg)
    
    ### [Sentry](/en/guides/backend/sentry/)
    
*   ![](/logos/supabase.svg)
    
    ### [Supabase](/en/guides/backend/supabase/)
    
*   ![](/logos/turso.svg)
    
    ### [Turso](/en/guides/backend/turso/)
    
*   ![](/logos/xata.svg)
    
    ### [Xata](/en/guides/backend/xata/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/backend/sentry.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Neon](/en/guides/backend/neon/) [Next  
Supabase](/en/guides/backend/supabase/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)