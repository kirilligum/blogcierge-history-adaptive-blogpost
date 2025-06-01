No client entrypoint specified in renderer.
===========================================

> **NoClientEntrypoint**: `COMPONENT_NAME` component has a `client:CLIENT_DIRECTIVE` directive, but no client entrypoint was provided by `RENDERER_NAME`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro tried to hydrate a component on the client, but the renderer used does not provide a client entrypoint to use to hydrate.

**See Also:**

*   [addRenderer option](/en/reference/integrations-reference/#addrenderer-option)
*   [Hydrating framework components](/en/guides/framework-components/#hydrating-interactive-components)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)