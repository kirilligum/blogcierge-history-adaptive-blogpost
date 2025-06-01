The path doesn't contain any locale
===================================

> **i18nNoLocaleFoundInPath**: You tried to use an i18n utility on a path that doesn’t contain any locale. You can use `pathHasLocale` first to determine if the path has a locale.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An i18n utility tried to use the locale from a URL path that does not contain one. You can prevent this error by using pathHasLocale to check URLs for a locale first before using i18n utilities.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)