Legacy flags
============

To help some users migrate between versions of Astro, we occasionally introduce `legacy` flags.

These flags allow you to opt in to some deprecated or otherwise outdated behavior of Astro in the latest version, so that you can continue to upgrade and take advantage of new Astro releases until you are able to fully update your project code.

Collections
-----------

[Section titled Collections](#collections)

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@5.0.0`

Enable legacy behavior for content collections (as used in Astro v2 through v4)

astro.config.mjs

    import { defineConfig } from 'astro/config';export default defineConfig({  legacy: {    collections: true  }});

If enabled, `data` and `content` collections (only) are handled using the legacy content collections implementation. Collections with a `loader` (only) will continue to use the Content Layer API instead. Both kinds of collections may exist in the same project, each using their respective implementations.

The following limitations continue to exist:

*   Any legacy (`type: 'content'` or `type: 'data'`) collections must continue to be located in the `src/content/` directory.
*   These legacy collections will not be transformed to implicitly use the `glob()` loader, and will instead be handled by legacy code.
*   Collections using the Content Layer API (with a `loader` defined) are forbidden in `src/content/`, but may exist anywhere else in your project.

When you are ready to remove this flag and migrate to the new Content Layer API for your legacy collections, you must define a collection for any directories in `src/content/` that you want to continue to use as a collection. It is sufficient to declare an empty collection, and Astro will implicitly generate an appropriate definition for your legacy collections:

src/content/config.ts

    import { defineCollection, z } from 'astro:content';
    const blog = defineCollection({ })
    export const collections = { blog };

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/legacy-flags.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Markdown heading ID compatibility](/en/reference/experimental-flags/heading-id-compat/) [Next  
Error reference](/en/reference/error-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)