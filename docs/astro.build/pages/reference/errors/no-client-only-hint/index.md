Missing hint on client:only directive.
======================================

> **NoClientOnlyHint**: Unable to render `COMPONENT_NAME`. When using the `client:only` hydration strategy, Astro needs a hint to use the correct renderer.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`client:only` components are not run on the server, as such Astro does not know (and cannot guess) which renderer to use and require a hint. Like such:

      <SomeReactComponent client:only="react" />

**See Also:**

*   [`client:only`](/en/reference/directives-reference/#clientonly)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)