Configuring experimental flags
==============================

Experimental features are available only after enabling a flag in the Astro configuration file.

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({    experimental: {        // enable experimental flags        // to try out new features    },});

Astro offers experimental flags to give users early access to new features for testing and feedback.

These flags allow you to participate in feature development by reporting issues and sharing your opinions. These features are not guaranteed to be stable and may include breaking changes even in small `patch` releases while the feature is actively developed.

We recommend [updating Astro](/en/upgrade-astro/#upgrade-to-the-latest-version) frequently, and keeping up with release notes in the [Astro changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) which will inform you of any changes needed to your project code. The experimental feature documentation will always be updated for the current released version only.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Programmatic Astro API (experimental)](/en/reference/programmatic-reference/) [Next  
Responsive images](/en/reference/experimental-flags/responsive-images/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)