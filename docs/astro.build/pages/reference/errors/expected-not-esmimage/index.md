Expected image options, not an ESM-imported image.
==================================================

> **ExpectedNotESMImage**: An ESM-imported image cannot be passed directly to `getImage()`. Instead, pass an object with the image in the `src` property.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An ESM-imported image cannot be passed directly to `getImage()`. Instead, pass an object with the image in the `src` property.

    import { getImage } from "astro:assets";import myImage from "../assets/my_image.png"; const optimizedImage = await getImage( myImage ); const optimizedImage = await getImage({ src: myImage });

**See Also:**

*   [Images](/en/guides/images/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)