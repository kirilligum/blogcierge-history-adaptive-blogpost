Content loader returned an entry with an invalid id.
====================================================

> **Example error message:**  
> The content loader for the collection **blog** returned an entry with an invalid `id`:  
> {  
> “id”: 1,  
> “title”: “Hello, World!”  
> }

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A content loader returned an invalid `id`. Make sure that the `id` of the entry is a string. See the [Content collections documentation](/en/guides/content-collections/) for more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)