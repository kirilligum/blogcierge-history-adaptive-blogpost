Call endpoints from the server
==============================

Endpoints can be used to serve many kinds of data. This recipe calls a server endpoint from a page’s component script to display a greeting, without requiring an additional fetch request.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

*   A project with [SSR](/en/guides/on-demand-rendering/) (output: ‘server’) enabled

Recipe
------

[Section titled Recipe](#recipe)

1.  Create an endpoint in a new file `src/pages/api/hello.ts` that returns some data:
    
    src/pages/api/hello.ts
    
        import type { APIRoute } from 'astro'
        export const GET: APIRoute = () => {  return new Response(    JSON.stringify({      greeting: 'Hello',    }),  )}
    
2.  On any Astro page, import the `GET()` method from the endpoint. Call it with the [`Astro` global](/en/reference/api-reference/) to provide the request context, and use the response on the page:
    
    src/pages/index.astro
    
        ---import { GET } from './api/hello.ts'
        let response = await GET(Astro)const data = await response.json()---
        <h1>{data.greeting} world!</h1>
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/call-endpoints.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Use Bun with Astro](/en/recipes/bun/) [Next  
Verify a Captcha](/en/recipes/captcha/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)