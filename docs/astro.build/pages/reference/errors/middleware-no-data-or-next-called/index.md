The middleware didn't return a Response.
========================================

> **MiddlewareNoDataOrNextCalled**: Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when the middleware does not return any data or call the `next` function.

For example:

    import {defineMiddleware} from "astro:middleware";export const onRequest = defineMiddleware((context, _) => {  // doesn't return anything or call `next`  context.locals.someData = false;});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)