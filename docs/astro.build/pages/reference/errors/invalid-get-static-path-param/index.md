Invalid value returned by a getStaticPaths path.
================================================

> **InvalidGetStaticPathParam**: Invalid params given to `getStaticPaths` path. Expected an `object`, got `PARAM_TYPE`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `params` property in `getStaticPaths`’s return value (an array of objects) should also be an object.

pages/blog/\[id\].astro

    ---export async function getStaticPaths() {  return [    { params: { slug: "blog" } },    { params: { slug: "about" } }  ];}---

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