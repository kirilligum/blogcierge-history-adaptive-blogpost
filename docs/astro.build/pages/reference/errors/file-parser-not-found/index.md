File parser not found
=====================

> **FileParserNotFound**: No parser was found for ‘FILE\_NAME’. Pass a parser function (e.g. `parser: csv`) to the `file` loader.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `file` loader can’t determine which parser to use. Please provide a custom parser (e.g. `toml.parse` or `csv-parse`) to create a collection from your file type.

**See Also:**

*   [Passing a `parser` to the `file` loader](/en/guides/content-collections/#parser-function)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)