getStaticPaths RSS helper is not available anymore.
===================================================

Deprecated

Deprecated since Astro 4.0. The RSS helper no longer exists with an error fallback.

> **GetStaticPathsRemovedRSSHelper**: The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`getStaticPaths` no longer expose an helper for generating a RSS feed. We recommend migrating to the [@astrojs/rss](/en/recipes/rss/#setting-up-astrojsrss)integration instead.

**See Also:**

*   [RSS Guide](/en/recipes/rss/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

