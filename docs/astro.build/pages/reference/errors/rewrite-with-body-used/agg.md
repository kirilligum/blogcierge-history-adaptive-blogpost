Cannot use Astro.rewrite after the request body has been read
=============================================================

> **RewriteWithBodyUsed**: Astro.rewrite() cannot be used if the request body has already been read. If you need to read the body, first clone the request.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`Astro.rewrite()` cannot be used if the request body has already been read. If you need to read the body, first clone the request. For example:

    const data = await Astro.request.clone().formData();
    Astro.rewrite("/target")

**See Also:**

*   [Request.clone()](https://developer.mozilla.org/en-US/docs/Web/API/Request/clone)
*   [Astro.rewrite](/en/reference/api-reference/#rewrite)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

