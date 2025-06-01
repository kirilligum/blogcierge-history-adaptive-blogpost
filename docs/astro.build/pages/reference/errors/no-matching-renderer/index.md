No matching renderer found.
===========================

> Unable to render `COMPONENT_NAME`. There are `RENDERER_COUNT` renderer(s) configured in your `astro.config.mjs` file, but none were able to server-side render `COMPONENT_NAME`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

None of the installed integrations were able to render the component you imported. Make sure to install the appropriate integration for the type of component you are trying to include in your page.

For JSX / TSX files, [@astrojs/react](/en/guides/integrations-guide/react/), [@astrojs/preact](/en/guides/integrations-guide/preact/) or [@astrojs/solid-js](/en/guides/integrations-guide/solid-js/) can be used. For Vue and Svelte files, the [@astrojs/vue](/en/guides/integrations-guide/vue/) and [@astrojs/svelte](/en/guides/integrations-guide/svelte/) integrations can be used respectively

**See Also:**

*   [Frameworks components](/en/guides/framework-components/)
*   [UI Frameworks](/en/guides/integrations-guide/#official-integrations)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)