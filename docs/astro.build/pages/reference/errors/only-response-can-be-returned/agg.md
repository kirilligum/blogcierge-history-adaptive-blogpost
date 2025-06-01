Invalid type returned by Astro page.
====================================

> Route returned a `RETURNED_VALUE`. Only a Response can be returned from Astro files.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Only instances of [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned inside Astro files.

pages/login.astro

    ---return new Response(null, { status: 404, statusText: 'Not found'});
    // Alternatively, for redirects, Astro.redirect also returns an instance of Responsereturn Astro.redirect('/login');---

**See Also:**

*   [Response](/en/guides/on-demand-rendering/#response)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

