Sessions cannot be used with an adapter that doesn't support server output.
===========================================================================

Deprecated

This error was removed in Astro 5.7, when the Sessions feature stopped being experimental.

> **SessionWithoutSupportedAdapterOutputError**: Sessions require an adapter that supports server output. The adapter must set `"server"` in the `buildOutput` adapter feature.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Your adapter must support server output to use sessions.

**See Also:**

*   [Sessions](/en/guides/sessions/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

