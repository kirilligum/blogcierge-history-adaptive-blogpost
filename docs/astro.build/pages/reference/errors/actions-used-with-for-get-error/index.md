An invalid Action query string was passed by a form.
====================================================

Deprecated

Deprecated since version 4.13.2.

> **ActionsUsedWithForGetError**: Action ACTION\_NAME was called from a form using a GET request, but only POST requests are supported. This often occurs if `method="POST"` is missing on the form.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Action was called from a form using a GET request, but only POST requests are supported. This often occurs if `method="POST"` is missing on the form.

**See Also:**

*   [Actions RFC](https://github.com/withastro/roadmap/blob/actions/proposals/0046-actions.md)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)