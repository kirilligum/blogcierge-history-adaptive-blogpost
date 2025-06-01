Glob patterns are not supported in the file loader
==================================================

> **FileGlobNotSupported**: Glob patterns are not supported in the `file` loader. Use the `glob` loader instead.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `file` loader must be passed a single local file. Glob patterns are not supported. Use the built-in `glob` loader to create entries from patterns of multiple local files.

**See Also:**

*   [Astro’s built-in loaders](/en/guides/content-collections/#built-in-loaders)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

