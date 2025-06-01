Forbidden rewrite to a static route.
====================================

> **ForbiddenRewrite**: You tried to rewrite the on-demand route ‘FROM’ with the static route ‘TO’, when using the ‘server’ output.  
>   
> The static route ‘TO’ is rendered by the component ‘COMPONENT’, which is marked as prerendered. This is a forbidden operation because during the build the component ‘COMPONENT’ is compiled to an HTML file, which can’t be retrieved at runtime by Astro.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`Astro.rewrite()` can’t be used to rewrite an on-demand route with a static route when using the `"server"` output.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

