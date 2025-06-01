Experimental Intellisense for content collections
=================================================

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@4.14.0`

Enables Intellisense features (e.g. code completion, quick hints) for your content collection entries in compatible editors.

When enabled, this feature will generate and add JSON schemas to the `.astro` directory in your project. These files can be used by the Astro language server to provide Intellisense inside content files (`.md`, `.mdx`, `.mdoc`).

    {  experimental: {    contentIntellisense: true,  },}

To use this feature with the Astro VS Code extension, you must also enable the `astro.content-intellisense` option in your VS Code settings. For editors using the Astro language server directly, pass the `contentIntellisense: true` initialization parameter to enable this feature.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/content-intellisense.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Client prerendering](/en/reference/experimental-flags/client-prerender/) [Next  
Preserve scripts order](/en/reference/experimental-flags/preserve-scripts-order/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

