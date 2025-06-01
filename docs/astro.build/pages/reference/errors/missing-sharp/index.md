Could not find Sharp.
=====================

> **MissingSharp**: Could not find Sharp. Please install Sharp (`sharp`) manually into your project or migrate to another image service.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Sharp is the default image service used for `astro:assets`. When using a [strict package manager](https://pnpm.io/pnpm-vs-npm#npms-flat-tree) like pnpm, Sharp must be installed manually into your project in order to use image processing.

If you are not using `astro:assets` for image processing, and do not wish to install Sharp, you can configure the following passthrough image service that does no processing:

    import { defineConfig, passthroughImageService } from "astro/config";export default defineConfig({ image: {   service: passthroughImageService(), },});

**See Also:**

*   [Default Image Service](/en/guides/images/#default-image-service)
*   [Image Services API](/en/reference/image-service-reference/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)