Local images must be imported.
==============================

> **LocalImageUsedWrongly**: `Image`’s and `getImage`’s `src` parameter must be an imported image or an URL, it cannot be a string filepath. Received `IMAGE_FILE_PATH`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

When using the default image services, `Image`’s and `getImage`’s `src` parameter must be either an imported image or an URL, it cannot be a string of a filepath.

For local images from content collections, you can use the [image() schema helper](/en/guides/images/#images-in-content-collections) to resolve the images.

    ---import { Image } from "astro:assets";import myImage from "../my_image.png";---
    <!-- GOOD: `src` is the full imported image. --><Image src={myImage} alt="Cool image" />
    <!-- GOOD: `src` is a URL. --><Image src="https://example.com/my_image.png" alt="Cool image" />
    <!-- BAD: `src` is an image's `src` path instead of the full image object. --><Image src={myImage.src} alt="Cool image" />
    <!-- BAD: `src` is a string filepath. --><Image src="../my_image.png" alt="Cool image" />

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

