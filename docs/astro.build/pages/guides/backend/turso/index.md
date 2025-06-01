Turso & Astro
=============

[Turso](https://turso.tech) is a distributed database built on libSQL, a fork of SQLite. It is optimized for low query latency, making it suitable for global applications.

Initializing Turso in Astro
---------------------------

[Section titled Initializing Turso in Astro](#initializing-turso-in-astro)

### Prerequisites

[Section titled Prerequisites](#prerequisites)

*   The [Turso CLI](https://docs.turso.tech/cli/introduction) installed and signed in
*   A [Turso](https://turso.tech) Database with schema
*   Your Database URL
*   An Access Token

### Configure environment variables

[Section titled Configure environment variables](#configure-environment-variables)

Obtain your database URL using the following command:

Terminal window

    turso db show <database-name> --url

Create an auth token for the database:

Terminal window

    turso db tokens create <database-name>

Add the output from both commands above into your `.env` file at the root of your project. If this file does not exist, create one.

.env

    TURSO_DATABASE_URL=libsql://...TURSO_AUTH_TOKEN=

Caution

Do not use the `PUBLIC_` prefix when creating these private [environment variables](/en/guides/environment-variables/). This will expose these values on the client.

### Install LibSQL Client

[Section titled Install LibSQL Client](#install-libsql-client)

Install the `@libsql/client` to connect Turso to Astro:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3047)
*   [pnpm](#tab-panel-3048)
*   [Yarn](#tab-panel-3049)

Terminal window

    npm install @libsql/client

Terminal window

    pnpm add @libsql/client

Terminal window

    yarn add @libsql/client

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

### Initialize a new client

[Section titled Initialize a new client](#initialize-a-new-client)

Create a file `turso.ts` in the `src` folder and invoke `createClient`, passing it `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`:

src/turso.ts

    import { createClient } from "@libsql/client/web";
    export const turso = createClient({  url: import.meta.env.TURSO_DATABASE_URL,  authToken: import.meta.env.TURSO_AUTH_TOKEN,});

Querying your database
----------------------

[Section titled Querying your database](#querying-your-database)

To access information from your database, import `turso` and [execute a SQL query](https://docs.turso.tech/sdk/ts/reference#simple-query) inside any `.astro` component.

The following example fetches all `posts` from your table, then displays a list of titles in a `<BlogIndex />` component:

src/components/BlogIndex.astro

    ---import { turso } from '../turso'
    const { rows } = await turso.execute('SELECT * FROM posts')---
    <ul>  {rows.map((post) => (    <li>{post.title}</li>  ))}</ul>

### SQL Placeholders

[Section titled SQL Placeholders](#sql-placeholders)

The `execute()` method can take [an object to pass variables to the SQL statement](https://docs.turso.tech/sdk/ts/reference#placeholders), such as `slug`, or pagination.

The following example fetches a single entry from the `posts` table `WHERE` the `slug` is the retrieved value from `Astro.params`, then displays the title of the post.

src/pages/index.astro

    ---import { turso } from '../turso'
    const { slug } = Astro.params
    const { rows } = await turso.execute({  sql: 'SELECT * FROM posts WHERE slug = ?',  args: [slug!]})---
    <h1>{rows[0].title}</h1>

Turso Resources
---------------

[Section titled Turso Resources](#turso-resources)

*   [Turso Docs](https://docs.turso.tech)
*   [Turso on GitHub](https://github.com/tursodatabase)
*   [Using Turso to serve a Server-side Rendered Astro blog’s content](https://blog.turso.tech/using-turso-to-serve-a-server-side-rendered-astro-blogs-content-58caa6188bd5)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/backend/turso.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Supabase](/en/guides/backend/supabase/) [Next  
Xata](/en/guides/backend/xata/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)