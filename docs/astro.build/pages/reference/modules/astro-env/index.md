Environment Variables API Reference
===================================

**Added in:** `astro@5.0.0`

The `astro:env` API lets you configure a type-safe schema for environment variables you have set. This allows you to indicate whether they should be available on the server or the client, and define their data type and additional properties. For examples and usage instructions, [see the `astro:env` guide](/en/guides/environment-variables/#type-safe-environment-variables).

Imports from `astro:env`
------------------------

[Section titled Imports from astro:env](#imports-from-astroenv)

    import {  getSecret, } from 'astro:env/server';

### `getSecret()`

[Section titled getSecret()](#getsecret)

**Added in:** `astro@5.0.0`

The `getSecret()` helper function allows retrieving the raw value of an environment variable by its key.

For example, you can retrieve a boolean value as a string:

    import {  FEATURE_FLAG, // boolean  getSecret} from 'astro:env/server'
    getSecret('FEATURE_FLAG') // string | undefined

This can also be useful to get a secret not defined in your schema, for example one that depends on dynamic data from a database or API.

If you need to retrieve environment variables programmatically, we recommend using `getSecret()` instead of `process.env` (or equivalent). Because its implementation is provided by your adapter, you won’t need to update all your calls if you switch adapters. It defaults to `process.env` in dev and build.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/modules/astro-env.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
astro:content](/en/reference/modules/astro-content/) [Next  
astro:i18n](/en/reference/modules/astro-i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)