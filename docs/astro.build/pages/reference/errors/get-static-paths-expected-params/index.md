Missing params property on getStaticPaths route.
================================================

> **GetStaticPathsExpectedParams**: Missing or empty required `params` property on `getStaticPaths` route.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Every route specified by `getStaticPaths` require a `params` property specifying the path parameters needed to match the route.

For instance, the following code:

pages/blog/\[id\].astro

    ---export async function getStaticPaths() {  return [    { params: { id: '1' } }  ];}---

Will create the following route: `site.com/blog/1`.

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