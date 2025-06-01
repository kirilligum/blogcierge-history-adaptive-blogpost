Expected src to be an image.
============================

> **ExpectedImage**: Expected `src` property for `getImage` or `<Image />` to be either an ESM imported image or a string with the path of a remote image. Received `SRC` (type: `TYPEOF_OPTIONS`).  
>   
> Full serialized options received: `FULL_OPTIONS`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An image’s `src` property is not valid. The Image component requires the `src` attribute to be either an image that has been ESM imported or a string. This is also true for the first parameter of `getImage()`.

    ---import { Image } from "astro:assets";import myImage from "../assets/my_image.png";---
    <Image src={myImage} alt="..." /><Image src="https://example.com/logo.png" width={300} height={300} alt="..." />

In most cases, this error happens when the value passed to `src` is undefined.

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