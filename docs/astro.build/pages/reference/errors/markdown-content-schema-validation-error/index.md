Content collection frontmatter invalid.
=======================================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **Example error message:**  
> Could not parse frontmatter in **blog** → **post.md**  
> “title” is required.  
> “date” must be a valid date.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A Markdown document’s frontmatter in `src/content/` does not match its collection schema. Make sure that all required fields are present, and that all fields are of the correct type. You can check against the collection schema in your `src/content/config.*` file. See the [Content collections documentation](/en/guides/content-collections/) for more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)