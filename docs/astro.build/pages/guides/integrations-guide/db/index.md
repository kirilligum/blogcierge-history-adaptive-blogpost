@astrojs/ db
============

v0.14.14 [GitHub](https://github.com/withastro/astro/tree/main/packages/db/) [npm](https://www.npmjs.com/package/@astrojs/db) [Changelog](https://github.com/withastro/astro/tree/main/packages/db/CHANGELOG.md)

Astro DB is a fully-managed SQL database designed for the Astro ecosystem: develop locally in Astro and deploy to any [libSQL-compatible database](/en/guides/astro-db/).

With Astro DB you have a powerful, local, type-safe tool to query and model content as a relational database.

See the [Astro DB guide](/en/guides/astro-db/) for full usage and examples.

Installation
------------

[Section titled Installation](#installation)

Astro includes an `astro add` command to automate the setup of official integrations. If you prefer, you can [install integrations manually](#manual-installation) instead.

Run one of the following commands in a new terminal window.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3194)
*   [pnpm](#tab-panel-3195)
*   [Yarn](#tab-panel-3196)

Terminal window

    npx astro add db

Terminal window

    pnpm astro add db

Terminal window

    yarn astro add db

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

#### Manual Installation

[Section titled Manual Installation](#manual-installation)

If you prefer to set things up from scratch yourself, skip `astro add` and follow these instructions to install Astro DB yourself.

##### 1\. Install the integration from npm via a package manager

[Section titled 1. Install the integration from npm via a package manager](#1-install-the-integration-from-npm-via-a-package-manager)

*   [npm](#tab-panel-3197)
*   [pnpm](#tab-panel-3198)
*   [Yarn](#tab-panel-3199)

Terminal window

    npm install @astrojs/db

Terminal window

    pnpm add @astrojs/db

Terminal window

    yarn add @astrojs/db

##### 2\. Add the integration to `astro.config.mjs`

[Section titled 2. Add the integration to astro.config.mjs](#2-add-the-integration-to-astroconfigmjs)

astro.config.mjs

    import { defineConfig } from 'astro/config';import db from '@astrojs/db';
    export default defineConfig({  integrations: [   db()  ]});

##### 3\. Configure your database

[Section titled 3. Configure your database](#3-configure-your-database)

Create a `db/config.ts` file at the root of your project. This is a special file that Astro will automatically load and use to configure your database tables.

db/config.ts

    import { defineDb } from 'astro:db';
    export default defineDb({  tables: {},})

Table configuration reference
-----------------------------

[Section titled Table configuration reference](#table-configuration-reference)

### `columns`

[Section titled columns](#columns)

Table columns are configured using the `columns` object:

    import { defineTable, column, NOW } from 'astro:db';
    const Comment = defineTable({  columns: {    id: column.number({ primaryKey: true }),    author: column.text(),    content: column.text({ optional: true }),    published: column.date({ default: NOW }),  },});

Columns are configured using the `column` utility. `column` supports the following types:

*   **`column.text(...)`** - store either plain or rich text content
*   **`column.number(...)`** - store integer and floating point values
*   **`column.boolean(...)`** - store true / false values
*   **`column.date(...)`** - store `Date` objects, parsed as ISO strings for data storage
*   **`column.json(...)`** - store arbitrary JSON blobs, parsed as stringified JSON for data storage

There are a few shared configuration values across all columns:

*   `primaryKey` - Set a `number` or `text` column as the unique identifier.
*   `optional` - Astro DB uses `NOT NULL` for all columns by default. Set `optional` to `true` to allow null values.
*   `default` - Set the default value for newly inserted entries. This accepts either a static value or a string of `sql` for generated values like timestamps.
*   `unique` - Mark a column as unique. This prevents duplicate values across entries in the table.
*   `references` - Reference a related table by column. This establishes a foreign key constraint, meaning each column value must have a matching value in the referenced table.

### `indexes`

[Section titled indexes](#indexes)

Table indexes are used to improve lookup speeds on a given column or combination of columns. The `indexes` property accepts an array of configuration objects specifying the columns to index:

db/config.ts

    import { defineTable, column } from 'astro:db';
    const Comment = defineTable({  columns: {    authorId: column.number(),    published: column.date(),    body: column.text(),  },  indexes: [    { on: ["authorId", "published"], unique: true },  ]});

This will generate a unique index on the `authorId` and `published` columns with the name `Comment_authorId_published_idx`.

The following configuration options are available for each index:

*   `on`: `string | string[]` - A single column or array of column names to index.
*   `unique`: `boolean` - Set to `true` to enforce unique values across the indexed columns.
*   `name`: `string` (optional) - A custom name for the unique index. This will override Astro’s generated name based on the table and column names being indexed (e.g. `Comment_authorId_published_idx`). Custom names are global, so ensure index names do not conflict between tables.

### `foreignKeys`

[Section titled foreignKeys](#foreignkeys)

Tip

`foreignKeys` is an advanced API for relating multiple table columns. If you only need to reference a single column, try using [the column `references` property.](#columns)

Foreign keys are used to establish a relationship between two tables. The `foreignKeys` property accepts an array of configuration objects that may relate one or more columns between tables:

db/config.ts

    import { defineTable, column } from 'astro:db';
    const Author = defineTable({  columns: {    firstName: column.text(),    lastName: column.text(),  },});
    const Comment = defineTable({  columns: {    authorFirstName: column.text(),    authorLastName: column.text(),    body: column.text(),  },  foreignKeys: [    {      columns: ["authorFirstName", "authorLastName"],      references: () => [Author.columns.firstName, Author.columns.lastName],    },  ],});

Each foreign key configuration object accepts the following properties:

*   `columns`: `string[]` - An array of column names to relate to the referenced table.
*   `references`: `() => Column[]` - A function that returns an array of columns from the referenced table.

Astro DB CLI reference
----------------------

[Section titled Astro DB CLI reference](#astro-db-cli-reference)

Astro DB includes a set of CLI commands to interact with your local and libSQL-compatible database.

These commands are called automatically when using a GitHub CI action, and can be called manually using the `astro db` CLI.

### `astro db push`

[Section titled astro db push](#astro-db-push)

**Flags:**

*   `--force-reset` Reset all production data if a breaking schema change is required.

Safely push database configuration changes to your project database. This will check for any risk of data loss and guide you on any recommended migration steps. If a breaking schema change must be made, use the `--force-reset` flag to reset all production data.

### `astro db verify`

[Section titled astro db verify](#astro-db-verify)

Check for any differences between your local and remote database configurations. This is automatically run by `astro db push`. `verify` will compare your local `db/config.ts` file with the remote database and warn if changes are detected.

### `astro db execute <file-path>`

[Section titled astro db execute &lt;file-path&gt;](#astro-db-execute-file-path)

**Flags:**

*   `--remote` Run against your libSQL-compatible database. Omit to run against your development server.

Execute a `.ts` or `.js` file to read or write to your database. This accepts a file path as an argument, and supports usage of the `astro:db` module to write type-safe queries. Use the `--remote` flag to run against your libSQL-compatible database, or omit the flag to run against your development server. See how to [seed development data](/en/guides/astro-db/#seed-your-database-for-development) for an example file.

### `astro db shell --query <sql-string>`

[Section titled astro db shell --query &lt;sql-string&gt;](#astro-db-shell---query-sql-string)

**Flags:**

*   `--query` Raw SQL query to execute.
*   `--remote` Run against your libSQL-compatible database. Omit to run against your development server.

Execute a raw SQL query against your database. Use the `--remote` flag to run against your libSQL-compatible database, or omit the flag to run against your development server.

Astro DB utility reference
--------------------------

[Section titled Astro DB utility reference](#astro-db-utility-reference)

### `isDbError()`

[Section titled isDbError()](#isdberror)

The `isDbError()` function checks if an error is a libSQL database exception. This may include a foreign key constraint error when using references, or missing fields when inserting data. You can combine `isDbError()` with a try / catch block to handle database errors in your application:

src/pages/api/comment/\[id\].ts

    import { db, Comment, isDbError } from 'astro:db';import type { APIRoute } from 'astro';
    export const POST: APIRoute = (ctx) => {  try {    await db.insert(Comment).values({      id: ctx.params.id,      content: 'Hello, world!'    });  } catch (e) {    if (isDbError(e)) {      return new Response(`Cannot insert comment with id ${id}\n\n${e.message}`, { status: 400 });    }    return new Response('An unexpected error occurred', { status: 500 });  }
      return new Response(null, { status: 201 });};

More integrations
-----------------

### Front-end frameworks

*   ![](/logos/alpine-js.svg)
    
    ### [@astrojs/alpinejs](/en/guides/integrations-guide/alpinejs/)
    
*   ![](/logos/preact.svg)
    
    ### [@astrojs/preact](/en/guides/integrations-guide/preact/)
    
*   ![](/logos/react.svg)
    
    ### [@astrojs/react](/en/guides/integrations-guide/react/)
    
*   ![](/logos/solid.svg)
    
    ### [@astrojs/solid⁠-⁠js](/en/guides/integrations-guide/solid-js/)
    
*   ![](/logos/svelte.svg)
    
    ### [@astrojs/svelte](/en/guides/integrations-guide/svelte/)
    
*   ![](/logos/vue.svg)
    
    ### [@astrojs/vue](/en/guides/integrations-guide/vue/)
    

### Adapters

*   ![](/logos/cloudflare-pages.svg)
    
    ### [@astrojs/cloudflare](/en/guides/integrations-guide/cloudflare/)
    
*   ![](/logos/netlify.svg)
    
    ### [@astrojs/netlify](/en/guides/integrations-guide/netlify/)
    
*   ![](/logos/node.svg)
    
    ### [@astrojs/node](/en/guides/integrations-guide/node/)
    
*   ![](/logos/vercel.svg)
    
    ### [@astrojs/vercel](/en/guides/integrations-guide/vercel/)
    

### Other integrations

*   ![](/logos/db.svg)
    
    ### [@astrojs/db](/en/guides/integrations-guide/db/)
    
*   ![](/logos/markdoc.svg)
    
    ### [@astrojs/markdoc](/en/guides/integrations-guide/markdoc/)
    
*   ![](/logos/mdx.svg)
    
    ### [@astrojs/mdx](/en/guides/integrations-guide/mdx/)
    
*   ![](/logos/partytown.svg)
    
    ### [@astrojs/partytown](/en/guides/integrations-guide/partytown/)
    
*   ![](/logos/sitemap.svg)
    
    ### [@astrojs/sitemap](/en/guides/integrations-guide/sitemap/)
    

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/integrations-guide/db.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Vercel](/en/guides/integrations-guide/vercel/) [Next  
Markdoc](/en/guides/integrations-guide/markdoc/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)