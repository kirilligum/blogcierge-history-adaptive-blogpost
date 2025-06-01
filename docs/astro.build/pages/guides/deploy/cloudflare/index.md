Deploy your Astro Site to Cloudflare
====================================

You can deploy full-stack applications, including front-end static assets and back-end APIs, as well as on-demand rendered sites, to both [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) and [Cloudflare Pages](https://pages.cloudflare.com/).

This guide includes:

*   [How to deploy to Cloudflare Workers](#cloudflare-workers)
*   [How to deploy to Cloudflare Pages](#cloudflare-pages)

Note

Cloudflare recommends using Cloudflare Workers for new projects. For existing Pages projects, refer to [Cloudflare’s migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/) and [compatibility matrix](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/#compatibility-matrix).

Read more about [using the Cloudflare runtime](/en/guides/integrations-guide/cloudflare/) in your Astro project.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

To get started, you will need:

*   A Cloudflare account. If you don’t already have one, you can create a free Cloudflare account during the process.

Cloudflare Workers
------------------

[Section titled Cloudflare Workers](#cloudflare-workers)

### How to deploy with Wrangler

[Section titled How to deploy with Wrangler](#how-to-deploy-with-wrangler)

1.  Install [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/).
    
    Terminal window
    
        npm install wrangler@latest --save-dev
    
2.  If your site uses on demand rendering, install the [`@astrojs/cloudflare` adapter](/en/guides/integrations-guide/cloudflare/).
    
    This will install the adapter and make the appropriate changes to your `astro.config.mjs` file in one step.
    
    Terminal window
    
        npx astro add cloudflare
    
    Then, create a `.assetsignore` file in your `public/` folder, and add the following lines to it:
    
    public/.assetsignore
    
        _worker.js_routes.json
    
    Read more about [on-demand rendering in Astro](/en/guides/on-demand-rendering/).
    
3.  Create a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [Static](#tab-panel-3116)
    *   [On demand](#tab-panel-3117)
    
    wrangler.jsonc
    
        {  "$schema": "node_modules/wrangler/config-schema.json",  "name": "my-astro-app",  // Update to today's date  "compatibility_date": "2025-03-25",  "assets": {    "directory": "./dist"  }}
    
    wrangler.jsonc
    
        {  "$schema": "node_modules/wrangler/config-schema.json",  "name": "my-astro-app",  "main": "./dist/_worker.js/index.js",  // Update to today's date  "compatibility_date": "2025-03-25",  "compatibility_flags": ["nodejs_compat"],  "assets": {    "binding": "ASSETS",    "directory": "./dist"  },  "observability": {    "enabled": true  }}
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
4.  Preview your project locally with Wrangler.
    
    Terminal window
    
        npx astro build && npx wrangler dev
    
5.  Deploy using `npx wrangler deploy`.
    
    Terminal window
    
        npx astro build && npx wrangler deploy
    

After your assets are uploaded, Wrangler will give you a preview URL to inspect your site.

Read more about using [Cloudflare runtime APIs](/en/guides/integrations-guide/cloudflare/) such as bindings.

### How to deploy with CI/CD

[Section titled How to deploy with CI/CD](#how-to-deploy-with-cicd)

You can also use a CI/CD system such as [Workers Builds (BETA)](https://developers.cloudflare.com/workers/ci-cd/builds/) to automatically build and deploy your site on push.

If you’re using Workers Builds:

1.  Follow Steps 1-3 from the Wrangler section above.
    
2.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to `Workers & Pages`. Select `Create`.
    
3.  Under `Import a repository`, select a Git account and then the repository containing your Astro project.
    
4.  Configure your project with:
    
    *   Build command: `npx astro build`
    *   Deploy command: `npx wrangler deploy`
5.  Click `Save and Deploy`. You can now preview your Worker at its provided `workers.dev` subdomain.
    

Cloudflare Pages
----------------

[Section titled Cloudflare Pages](#cloudflare-pages)

### How to deploy with Wrangler

[Section titled How to deploy with Wrangler](#how-to-deploy-with-wrangler-1)

1.  Install [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/).
    
    Terminal window
    
        npm install wrangler@latest --save-dev
    
2.  If your site uses on demand rendering, install the [`@astrojs/cloudflare` adapter](/en/guides/integrations-guide/cloudflare/).
    
    This will install the adapter and make the appropriate changes to your `astro.config.mjs` file in one step.
    
    Terminal window
    
        npx astro add cloudflare
    
    Read more about [on demand rendering in Astro](/en/guides/on-demand-rendering/).
    
3.  Preview your project locally with Wrangler.
    
    Terminal window
    
        npx astro build && npx wrangler pages dev ./dist
    
4.  Deploy using `npx wrangler deploy`.
    
    Terminal window
    
        npx astro build && npx wrangler pages deploy ./dist
    

After your assets are uploaded, Wrangler will give you a preview URL to inspect your site.

### How to deploy a site with Git

[Section titled How to deploy a site with Git](#how-to-deploy-a-site-with-git)

1.  Push your code to your git repository (e.g. GitHub, GitLab).
    
2.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to **Compute (Workers) > Workers & Pages**. Select **Create** and then select the **Pages** tab. Connect your git repository.
    
3.  Configure your project with:
    
    *   **Framework preset**: `Astro`
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`
    *   **Environment variables:** Set the `NODE_VERSION` variable to `20` or `22`. By default, Cloudflare Pages builds sites using Node.js `v18.17.1`, which is not compatible with the latest version of Astro.
4.  Click the **Save and Deploy** button.
    

Troubleshooting
---------------

[Section titled Troubleshooting](#troubleshooting)

### Client-side hydration

[Section titled Client-side hydration](#client-side-hydration)

Client-side hydration may fail as a result of Cloudflare’s Auto Minify setting. If you see `Hydration completed but contains mismatches` in the console, make sure to disable Auto Minify under Cloudflare settings.

### Node.js runtime APIs

[Section titled Node.js runtime APIs](#nodejs-runtime-apis)

If you are building a project that is using on-demand rendering with [the Cloudflare adapter](/en/guides/integrations-guide/cloudflare/) and the server fails to build with an error message such as `[Error] Could not resolve "XXXX. The package "XXXX" wasn't found on the file system but is built into node.`:

*   This means that a package or import you are using in the server-side environment is not compatible with the [Cloudflare runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/nodejs/).
    
*   If you are directly importing a Node.js runtime API, please refer to the Astro documentation on Cloudflare’s [Node.js compatibility](/en/guides/integrations-guide/cloudflare/#nodejs-compatibility) for further steps on how to resolve this.
    
*   If you are importing a package that imports a Node.js runtime API, check with the author of the package to see if they support the `node:*` import syntax. If they do not, you may need to find an alternative package.
    

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/deploy/cloudflare.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Clever Cloud](/en/guides/deploy/clever-cloud/) [Next  
Deno](/en/guides/deploy/deno/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)