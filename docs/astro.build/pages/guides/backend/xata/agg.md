Xata & Astro
============

[Xata](https://xata.io) is a **Serverless Data Platform** that combines the features of a relational database, a search engine, and an analytics engine by exposing a single consistent REST API.

Adding a database with Xata
---------------------------

[Section titled Adding a database with Xata](#adding-a-database-with-xata)

### Prerequisites

[Section titled Prerequisites](#prerequisites)

*   A [Xata](https://app.xata.io/signin) account with a created database. (You can use the sample database from the Web UI.)
*   An Access Token (`XATA_API_KEY`).
*   Your Database URL.

After you update and initialize the [Xata CLI](https://xata.io/docs/getting-started/installation), you will have your API token in your `.env` file and database URL defined.

By the end of the setup, you should have:

.env

    XATA_API_KEY=hash_key
    # Xata branch that will be used# if there's not a xata branch with# the same name as your git branchXATA_BRANCH=main

And the `databaseURL` defined:

.xatarc

    {  "databaseUrl": "https://your-database-url"}

### Environment configuration

[Section titled Environment configuration](#environment-configuration)

To have IntelliSense and type safety for your environment variables, edit or create the file `env.d.ts` in your `src/` directory:

src/env.d.ts

    interface ImportMetaEnv {  readonly XATA_API_KEY: string;  readonly XATA_BRANCH?: string;}
    interface ImportMeta {  readonly env: ImportMetaEnv;}

Tip

Read more about [environment variables](/en/guides/environment-variables/) and `.env` files in Astro.

Using the code generation from the Xata CLI and choosing the TypeScript option, generated an instance of the SDK for you, with types tailored to your database schema. Additionally, `@xata.io/client` was added to your `package.json`.

Your Xata environment variables and database url were automatically pulled by the SDK instance, so there’s no more setup work needed.

Now, your project should have the following structure:

*   Directorysrc/
    
    *   **xata.ts**
    *   **env.d.ts**
    
*   **.env**
*   astro.config.mjs
*   package.json
*   **.xatarc**

Create your queries
-------------------

[Section titled Create your queries](#create-your-queries)

To query your posts, import and use `XataClient` class in a `.astro` file. The example below queries the first 50 posts from Xata’s Sample Blog Database.

src/pages/blog/index.astro

    ---import { XataClient } from '../../xata';
    const xata = new XataClient({  apiKey: import.meta.env.XATA_API_KEY,  branch: import.meta.env.XATA_BRANCH});
    const { records } = await xata.db.Posts.getPaginated({  pagination: {    size: 50  }})---
    <ul>  {records.map((post) => (    <li>{post.title}</li>  ))}</ul>

It’s important to note the SDK needs to be regenerated everytime your schema changes. So, avoid making changes to the generated files the Xata CLI creates because once schema updates, your changes will be overwritten.

Official Resources
------------------

[Section titled Official Resources](#official-resources)

*   [Xata Astro Starter](https://github.com/xataio/examples/tree/main/apps/getting-started-astro)
*   [Xata Docs: Quick Start Guide](https://xata.io/docs/getting-started/quickstart-astro)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/backend/xata.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Turso](/en/guides/backend/turso/) [Next  
Digital Asset Management overview](/en/guides/media/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

