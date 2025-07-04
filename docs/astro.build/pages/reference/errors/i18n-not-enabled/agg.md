i18n Not Enabled
================

> **i18nNotEnabled**: The `astro:i18n` module can not be used without enabling i18n in your Astro config.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `astro:i18n` module can not be used without enabling i18n in your Astro config. To enable i18n, add a default locale and a list of supported locales to your Astro config:

    import { defineConfig } from 'astro'export default defineConfig({ i18n: {   locales: ['en', 'fr'],   defaultLocale: 'en',  },})

For more information on internationalization support in Astro, see our [Internationalization guide](/en/guides/internationalization/).

**See Also:**

*   [Internationalization](/en/guides/internationalization/)
*   [`i18n` Configuration Reference](/en/reference/configuration-reference/#i18n)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

