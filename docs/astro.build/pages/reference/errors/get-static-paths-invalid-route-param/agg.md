Invalid value for getStaticPaths route parameter.
=================================================

> **GetStaticPathsInvalidRouteParam**: Invalid getStaticPaths route parameter for `KEY`. Expected undefined, a string or a number, received `VALUE_TYPE` (`VALUE`)

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Since `params` are encoded into the URL, only certain types are supported as values.

/route/\[id\].astro

    ---export async function getStaticPaths() {  return [    { params: { id: '1' } } // Works    { params: { id: 2 } } // Works    { params: { id: false } } // Does not work  ];}---

In routes using [rest parameters](/en/guides/routing/#rest-parameters), `undefined` can be used to represent a path with no parameters passed in the URL:

/route/\[...id\].astro

    ---export async function getStaticPaths() {  return [    { params: { id: 1 } } // /route/1    { params: { id: 2 } } // /route/2    { params: { id: undefined } } // /route/  ];}---

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

