Prerendered dynamic endpoint has path collision.
================================================

> **PrerenderDynamicEndpointPathCollide**: Could not render `PATHNAME` with an `undefined` param as the generated path will collide during prerendering. Prevent passing `undefined` as `params` for the endpoint’s `getStaticPaths()` function, or add an additional extension to the endpoint’s filename.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The endpoint is prerendered with an `undefined` param so the generated path will collide with another route.

If you cannot prevent passing `undefined`, then an additional extension can be added to the endpoint file name to generate the file with a different name. For example, renaming `pages/api/[slug].ts` to `pages/api/[slug].json.ts`.

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [`params`](/en/reference/api-reference/#params)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

