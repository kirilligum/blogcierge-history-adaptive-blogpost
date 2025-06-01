Missing image dimensions
========================

> Missing width and height attributes for `IMAGE_URL`. When using remote images, both dimensions are required in order to avoid cumulative layout shift (CLS).

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

For remote images, `width` and `height` cannot automatically be inferred from the original file. To avoid cumulative layout shift (CLS), either specify these two properties, or set [`inferSize`](/en/reference/modules/astro-assets/#infersize) to `true` to fetch a remote image’s original dimensions.

If your image is inside your `src` folder, you probably meant to import it instead. See [the Imports guide for more information](/en/guides/imports/#other-assets).

**See Also:**

*   [Images](/en/guides/images/)
*   [Image component#width-and-height-required](/en/reference/modules/astro-assets/#width-and-height-required-for-images-in-public)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

