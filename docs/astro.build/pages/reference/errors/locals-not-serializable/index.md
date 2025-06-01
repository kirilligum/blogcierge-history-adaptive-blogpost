Astro.locals is not serializable
================================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **LocalsNotSerializable**: The information stored in `Astro.locals` for the path “`HREF`” is not serializable. Make sure you store only serializable data. (E03034)

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown in development mode when a user attempts to store something that is not serializable in `locals`.

For example:

    import {defineMiddleware} from "astro/middleware";export const onRequest = defineMiddleware((context, next) => {  context.locals = {    foo() {      alert("Hello world!")    }  };  return next();});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)