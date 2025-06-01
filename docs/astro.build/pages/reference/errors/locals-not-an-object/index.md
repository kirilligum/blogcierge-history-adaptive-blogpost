Value assigned to locals is not accepted.
=========================================

> **LocalsNotAnObject**: `locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when `locals` is overwritten with something that is not an object

For example:

    import {defineMiddleware} from "astro:middleware";export const onRequest = defineMiddleware((context, next) => {  context.locals = 1541;  return next();});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)