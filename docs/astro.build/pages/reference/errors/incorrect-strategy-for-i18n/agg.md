You can't use the current function with the current strategy
============================================================

> **IncorrectStrategyForI18n**: The function `FUNCTION_NAME` can only be used when the `i18n.routing.strategy` is set to `"manual"`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Some internationalization functions are only available when Astro’s own i18n routing is disabled by the configuration setting `i18n.routing: "manual"`.

**See Also:**

*   [`i18n` routing](/en/guides/internationalization/#routing)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

