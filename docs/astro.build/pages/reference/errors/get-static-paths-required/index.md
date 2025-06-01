getStaticPaths() function required for dynamic routes.
======================================================

> **GetStaticPathsRequired**: `getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

In [Static Mode](/en/guides/routing/#static-ssg-mode), all routes must be determined at build time. As such, dynamic routes must `export` a `getStaticPaths` function returning the different paths to generate.

**See Also:**

*   [Dynamic Routes](/en/guides/routing/#dynamic-routes)
*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [Server-side Rendering](/en/guides/on-demand-rendering/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)