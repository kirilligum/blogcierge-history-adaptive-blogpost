# Aggregated from ./pages/reference/errors/action-called-from-server-error
Action unexpected called from the server.
=========================================

> **ActionCalledFromServerError**: Action called from a server page or endpoint without using `Astro.callAction()`. This wrapper must be used to call actions from server code.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Action called from a server page or endpoint without using `Astro.callAction()`.

**See Also:**

*   [`Astro.callAction()` reference](/en/reference/api-reference/#callaction)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/action-not-found-error
Action not found.
=================

> **ActionNotFoundError**: The server received a request for an action named `ACTION_NAME` but could not find a match. If you renamed an action, check that you’ve updated your `actions/index` file and your calling code to match.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The server received a request for an action but could not find a match with the same name.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/action-query-string-invalid-error
An invalid Action query string was passed by a form.
====================================================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **ActionQueryStringInvalidError**: The server received the query string `?_astroAction=ACTION_NAME`, but could not find an action with that name. If you changed an action’s name in development, remove this query param from your URL and refresh.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The server received the query string `?_astroAction=name`, but could not find an action with that name. Use the action function’s `.queryString` property to retrieve the form `action` URL.

**See Also:**

*   [Actions RFC](https://github.com/withastro/roadmap/blob/actions/proposals/0046-actions.md)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/actions-cant-be-loaded
Can't load the Astro actions.
=============================

> **ActionsCantBeLoaded**: An unknown error was thrown while loading the Astro actions file.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown in development mode when the actions file can’t be loaded.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/actions-returned-invalid-data-error
Action handler returned invalid data.
=====================================

> **ActionsReturnedInvalidDataError**: Action handler returned invalid data. Handlers should return serializable data types like objects, arrays, strings, and numbers. Parse error: ERROR

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Action handler returned invalid data. Handlers should return serializable data types, and cannot return a Response object.

**See Also:**

*   [Actions handler reference](/en/reference/modules/astro-actions/#handler-property)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/actions-used-with-for-get-error
An invalid Action query string was passed by a form.
====================================================

Deprecated

Deprecated since version 4.13.2.

> **ActionsUsedWithForGetError**: Action ACTION\_NAME was called from a form using a GET request, but only POST requests are supported. This often occurs if `method="POST"` is missing on the form.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Action was called from a form using a GET request, but only POST requests are supported. This often occurs if `method="POST"` is missing on the form.

**See Also:**

*   [Actions RFC](https://github.com/withastro/roadmap/blob/actions/proposals/0046-actions.md)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/actions-without-server-output-error
Actions must be used with server output.
========================================

> **ActionsWithoutServerOutputError**: A server is required to create callable backend functions. To deploy routes to a server, add an adapter to your Astro config and configure your route for on-demand rendering

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Your project must have a server output to create backend functions with Actions.

**See Also:**

*   [On-demand rendering](/en/guides/on-demand-rendering/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/adapter-support-output-mismatch
Adapter does not support server output.
=======================================

> **AdapterSupportOutputMismatch**: The `ADAPTER_NAME` adapter is configured to output a static website, but the project contains server-rendered pages. Please install and configure the appropriate server adapter for your final deployment.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The currently configured adapter does not support server-side rendering, which is required for the current project setup.

Depending on your adapter, there may be a different entrypoint to use for server-side rendering. For example, the `@astrojs/vercel` adapter has a `@astrojs/vercel/static` entrypoint for static rendering, and a `@astrojs/vercel/serverless` entrypoint for server-side rendering.

**See Also:**

*   [Server-side Rendering](/en/guides/on-demand-rendering/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/astro-glob-no-match
Astro.glob() did not match any files.
=====================================

> **AstroGlobNoMatch**: `Astro.glob(GLOB_STR)` did not return any matching files.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`Astro.glob()` did not return any matching files. There might be a typo in the glob pattern.

**See Also:**

*   [Astro.glob](/en/reference/api-reference/#astroglob)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/astro-glob-used-outside
Astro.glob() used outside of an Astro file.
===========================================

> **AstroGlobUsedOutside**: `Astro.glob(GLOB_STR)` can only be used in `.astro` files. `import.meta.glob(GLOB_STR)` can be used instead to achieve a similar result.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`Astro.glob()` can only be used in `.astro` files. You can use [`import.meta.glob()`](https://vite.dev/guide/features.html#glob-import) instead to achieve the same result.

**See Also:**

*   [Astro.glob](/en/reference/api-reference/#astroglob)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/astro-response-headers-reassigned
Astro.response.headers must not be reassigned.
==============================================

> **AstroResponseHeadersReassigned**: Individual headers can be added to and removed from `Astro.response.headers`, but it must not be replaced with another instance of `Headers` altogether.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when a value is being set as the `headers` field on the `ResponseInit` object available as `Astro.response`.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/cannot-determine-weight-and-style-from-font-file
Cannot determine weight and style from font file.
=================================================

> An error occured while determining the weight and style from the local font file.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Cannot determine weight and style from font file, update your family config and set `weight` and `style` manually instead.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/cannot-extract-font-type
Cannot extract the font type from the given URL.
================================================

> An error occured while trying to extract the font type from the given URL.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Cannot extract the font type from the given URL.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/cannot-fetch-font-file
Cannot fetch the given font file.
=================================

> An error occured while fetching font file from the given URL.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Cannot fetch the given font file

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/cannot-load-font-provider
Cannot load font provider
=========================

> Astro is unable to load the given font provider. Open an issue on the corresponding provider’s repository.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Cannot load font provider

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/cant-render-page
Astro can't render the route.
=============================

> **CantRenderPage**: Astro cannot find any content to render for this route. There is no file or redirect associated with this route.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not find an associated file with content while trying to render the route. This is an Astro error and not a user error. If restarting the dev server does not fix the problem, please file an issue.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/cant-use-astro-config-module-error
Cannot use the astro:config module without enabling the experimental feature.
=============================================================================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **CantUseAstroConfigModuleError**: Cannot import the module “MODULE\_NAME” because the experimental feature is disabled. Enable `experimental.serializeConfig` in your `astro.config.mjs`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Cannot use the module `astro:config` without enabling the experimental feature.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/client-address-not-available
Astro.clientAddress is not available in current adapter.
========================================================

> **ClientAddressNotAvailable**: `Astro.clientAddress` is not available in the `ADAPTER_NAME` adapter. File an issue with the adapter to add support.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The adapter you’re using unfortunately does not support `Astro.clientAddress`.

**See Also:**

*   [Official integrations](/en/guides/integrations-guide/#official-integrations)
*   [Astro.clientAddress](/en/reference/api-reference/#clientaddress)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/collection-does-not-exist-error
Collection does not exist
=========================

Deprecated

Collections that do not exist no longer result in an error. A warning is given instead.

> A collection queried via `getCollection()` does not exist.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

When querying a collection, ensure a collection directory with the requested name exists under `src/content/`.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/config-legacy-key
Legacy configuration detected.
==============================

> **ConfigLegacyKey**: Legacy configuration detected: `LEGACY_CONFIG_KEY`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro detected a legacy configuration option in your configuration file.

**See Also:**

*   [Configuration reference](/en/reference/configuration-reference/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/config-not-found
Specified configuration file not found.
=======================================

> **ConfigNotFound**: Unable to resolve `--config "CONFIG_FILE"`. Does the file exist?

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The specified configuration file using `--config` could not be found. Make sure that it exists or that the path is correct

**See Also:**

*   [\--config](/en/reference/cli-reference/#--config-path)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/content-collection-type-mismatch-error
Collection contains entries of a different type.
================================================

> **ContentCollectionTypeMismatchError**: COLLECTION contains EXPECTED\_TYPE entries, but is configured as a ACTUAL\_TYPE collection.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Legacy content collections must contain entries of the type configured. Collections are `type: 'content'` by default. Try adding `type: 'data'` to your collection config for data collections.

**See Also:**

*   [Legacy content collections](/en/guides/upgrade-to/v5/#updating-existing-collections)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/content-entry-data-error
Content entry data does not match schema.
=========================================

> **Example error message:**  
> **blog** → **post** data does not match collection schema.  
> “title” is required.  
> “date” must be a valid date.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A content entry does not match its collection schema. Make sure that all required fields are present, and that all fields are of the correct type. You can check against the collection schema in your `src/content.config.*` file. See the [Content collections documentation](/en/guides/content-collections/) for more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/content-loader-invalid-data-error
Content entry is missing an ID
==============================

> **Example error message:**  
> The loader for **blog** returned invalid data.  
> Object is missing required property “id”.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The loader for a content collection returned invalid data. Inline loaders must return an array of objects with unique ID fields or a plain object with IDs as keys and entries as values.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/content-loader-returns-invalid-id
Content loader returned an entry with an invalid id.
====================================================

> **Example error message:**  
> The content loader for the collection **blog** returned an entry with an invalid `id`:  
> {  
> “id”: 1,  
> “title”: “Hello, World!”  
> }

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A content loader returned an invalid `id`. Make sure that the `id` of the entry is a string. See the [Content collections documentation](/en/guides/content-collections/) for more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/content-schema-contains-slug-error
Content Schema should not contain slug.
=======================================

> **ContentSchemaContainsSlugError**: A content collection schema should not contain `slug` since it is reserved for slug generation. Remove this from your COLLECTION\_NAME collection schema.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A legacy content collection schema should not contain the `slug` field. This is reserved by Astro for generating entry slugs. Remove `slug` from your schema. You can still use custom slugs in your frontmatter.

**See Also:**

*   [Legacy content collections](/en/guides/upgrade-to/v5/#updating-existing-collections)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/could-not-transform-image
Could not transform image.
==========================

> **CouldNotTransformImage**: Could not transform image `IMAGE_PATH`. See the stack trace for more information.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not transform one of your images. Often, this is caused by a corrupted or malformed image. Re-exporting the image from your image editor may fix this issue.

Depending on the image service you are using, the stack trace may contain more information on the specific error encountered.

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



# Aggregated from ./pages/reference/errors/csssyntax-error
CSS Syntax Error.
=================

> **Example error messages:**  
> CSSSyntaxError: Missed semicolon  
> CSSSyntaxError: Unclosed string  

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an error while parsing your CSS, due to a syntax error. This is often caused by a missing semicolon.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/data-collection-entry-parse-error
Data collection entry failed to parse.
======================================

> `COLLECTION_ENTRY_NAME` failed to parse.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Collection entries of `type: 'data'` must return an object with valid JSON (for `.json` entries) or YAML (for `.yaml` entries).

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/duplicate-content-entry-slug-error
Duplicate content entry slug.
=============================

> `COLLECTION_NAME` contains multiple entries with the same slug: `SLUG`. Slugs must be unique.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Content collection entries must have unique slugs. Duplicates are often caused by the `slug` frontmatter property.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/endpoint-did-not-return-aresponse
The endpoint did not return a Response.
=======================================

> **EndpointDidNotReturnAResponse**: An endpoint must return either a `Response`, or a `Promise` that resolves with a `Response`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when an endpoint does not return anything or returns an object that is not a `Response` object.

An endpoint must return either a `Response`, or a `Promise` that resolves with a `Response`. For example:

    import type { APIContext } from 'astro';
    export async function GET({ request, url, cookies }: APIContext): Promise<Response> {    return Response.json({        success: true,        result: 'Data from Astro Endpoint!'    })}

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/env-invalid-variable
Invalid Environment Variable
============================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **EnvInvalidVariable**: The following environment variable does not match the data type and/or properties defined in `experimental.env.schema`: KEY is not of type TYPE

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An environment variable does not match the data type and/or properties defined in `experimental.env.schema`.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/env-invalid-variables
Invalid Environment Variables
=============================

> The following environment variables defined in `env.schema` are invalid.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Some environment variables do not match the data type and/or properties defined in `env.schema`.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/env-unsupported-get-secret
Unsupported astro:env getSecret
===============================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **EnvUnsupportedGetSecret**: `astro:env/server` exported function `getSecret` is not supported by your adapter.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `astro:env/server` exported function `getSecret()` is not supported by your adapter.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/expected-image-options
Expected image options.
=======================

> **ExpectedImageOptions**: Expected getImage() parameter to be an object. Received `OPTIONS`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`getImage()`’s first parameter should be an object with the different properties to apply to your image.

    import { getImage } from "astro:assets";import myImage from "../assets/my_image.png";
    const optimizedImage = await getImage({src: myImage, width: 300, height: 300});

In most cases, this error happens because parameters were passed directly instead of inside an object.

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



# Aggregated from ./pages/reference/errors/expected-image
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



# Aggregated from ./pages/reference/errors/expected-not-esmimage
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



# Aggregated from ./pages/reference/errors/experimental-fonts-not-enabled
Experimental fonts are not enabled
==================================

> **ExperimentalFontsNotEnabled**: The Font component is used but experimental fonts have not been registered in the config.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Font component is used but experimental fonts have not been registered in the config.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/failed-to-fetch-remote-image-dimensions
Failed to retrieve remote image dimensions
==========================================

> Failed to get the dimensions for `IMAGE_URL`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Determining the remote image’s dimensions failed. This is typically caused by an incorrect URL or attempting to infer the size of an image in the public folder which is not possible.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/failed-to-find-page-map-ssr
Astro couldn't find the correct page to render
==============================================

> **FailedToFindPageMapSSR**: Astro couldn’t find the correct page to render, probably because it wasn’t correctly mapped for SSR usage. This is an internal error. Please file an issue.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro couldn’t find the correct page to render, probably because it wasn’t correctly mapped for SSR usage. This is an internal error.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/failed-to-load-module-ssr
Could not import file.
======================

> **FailedToLoadModuleSSR**: Could not import `IMPORT_NAME`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not import the requested file. Oftentimes, this is caused by the import path being wrong (either because the file does not exist, or there is a typo in the path)

This message can also appear when a type is imported without specifying that it is a [type import](/en/guides/typescript/#type-imports).

**See Also:**

*   [Type Imports](/en/guides/typescript/#type-imports)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/file-glob-not-supported
Glob patterns are not supported in the file loader
==================================================

> **FileGlobNotSupported**: Glob patterns are not supported in the `file` loader. Use the `glob` loader instead.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `file` loader must be passed a single local file. Glob patterns are not supported. Use the built-in `glob` loader to create entries from patterns of multiple local files.

**See Also:**

*   [Astro’s built-in loaders](/en/guides/content-collections/#built-in-loaders)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/file-parser-not-found
File parser not found
=====================

> **FileParserNotFound**: No parser was found for ‘FILE\_NAME’. Pass a parser function (e.g. `parser: csv`) to the `file` loader.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `file` loader can’t determine which parser to use. Please provide a custom parser (e.g. `toml.parse` or `csv-parse`) to create a collection from your file type.

**See Also:**

*   [Passing a `parser` to the `file` loader](/en/guides/content-collections/#parser-function)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/font-family-not-found
Font family not found
=====================

> No data was found for the family passed to the Font component.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Font family not found

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/forbidden-rewrite
Forbidden rewrite to a static route.
====================================

> **ForbiddenRewrite**: You tried to rewrite the on-demand route ‘FROM’ with the static route ‘TO’, when using the ‘server’ output.  
>   
> The static route ‘TO’ is rendered by the component ‘COMPONENT’, which is marked as prerendered. This is a forbidden operation because during the build the component ‘COMPONENT’ is compiled to an HTML file, which can’t be retrieved at runtime by Astro.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`Astro.rewrite()` can’t be used to rewrite an on-demand route with a static route when using the `"server"` output.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/generate-content-types-error
Failed to generate content types.
=================================

> **GenerateContentTypesError**: `astro sync` command failed to generate content collection types: ERROR\_MESSAGE

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`astro sync` command failed to generate content collection types.

**See Also:**

*   [Content collections documentation](/en/guides/content-collections/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/get-entry-deprecation-error
Invalid use of getDataEntryById or getEntryBySlug function.
===========================================================

> **GetEntryDeprecationError**: The `METHOD` function is deprecated and cannot be used to query the “COLLECTION” collection. Use `getEntry` instead.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `getDataEntryById` and `getEntryBySlug` functions are deprecated and cannot be used with content layer collections. Use the `getEntry` function instead.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/get-static-paths-expected-params
Missing params property on getStaticPaths route.
================================================

> **GetStaticPathsExpectedParams**: Missing or empty required `params` property on `getStaticPaths` route.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Every route specified by `getStaticPaths` require a `params` property specifying the path parameters needed to match the route.

For instance, the following code:

pages/blog/\[id\].astro

    ---export async function getStaticPaths() {  return [    { params: { id: '1' } }  ];}---

Will create the following route: `site.com/blog/1`.

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [`params`](/en/reference/api-reference/#params)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/get-static-paths-invalid-route-param
Invalid value for getStaticPaths route parameter.
=================================================

> **GetStaticPathsInvalidRouteParam**: Invalid getStaticPaths route parameter for `KEY`. Expected undefined, a string or a number, received `VALUE_TYPE` (`VALUE`)

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Since `params` are encoded into the URL, only certain types are supported as values.

/route/\[id\].astro

    ---export async function getStaticPaths() {  return [    { params: { id: '1' } } // Works    { params: { id: 2 } } // Works    { params: { id: false } } // Does not work  ];}---

In routes using [rest parameters](/en/guides/routing/#rest-parameters), `undefined` can be used to represent a path with no parameters passed in the URL:

/route/\[...id\].astro

    ---export async function getStaticPaths() {  return [    { params: { id: 1 } } // /route/1    { params: { id: 2 } } // /route/2    { params: { id: undefined } } // /route/  ];}---

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [`params`](/en/reference/api-reference/#params)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/get-static-paths-removed-rsshelper
getStaticPaths RSS helper is not available anymore.
===================================================

Deprecated

Deprecated since Astro 4.0. The RSS helper no longer exists with an error fallback.

> **GetStaticPathsRemovedRSSHelper**: The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`getStaticPaths` no longer expose an helper for generating a RSS feed. We recommend migrating to the [@astrojs/rss](/en/recipes/rss/#setting-up-astrojsrss)integration instead.

**See Also:**

*   [RSS Guide](/en/recipes/rss/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/get-static-paths-required
getStaticPaths() function required for dynamic routes.
======================================================

> **GetStaticPathsRequired**: `getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

In [Static Mode](/en/guides/routing/#static-ssg-mode), all routes must be determined at build time. As such, dynamic routes must `export` a `getStaticPaths` function returning the different paths to generate.

**See Also:**

*   [Dynamic Routes](/en/guides/routing/#dynamic-routes)
*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [Server-side Rendering](/en/guides/on-demand-rendering/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/i18n-no-locale-found-in-path
The path doesn't contain any locale
===================================

> **i18nNoLocaleFoundInPath**: You tried to use an i18n utility on a path that doesn’t contain any locale. You can use `pathHasLocale` first to determine if the path has a locale.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An i18n utility tried to use the locale from a URL path that does not contain one. You can prevent this error by using pathHasLocale to check URLs for a locale first before using i18n utilities.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/i18n-not-enabled
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



# Aggregated from ./pages/reference/errors/image-missing-alt
Image missing required "alt" property.
======================================

> **ImageMissingAlt**: Image missing “alt” property. “alt” text is required to describe important images on the page.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `alt` property allows you to provide descriptive alt text to users of screen readers and other assistive technologies. In order to ensure your images are accessible, the `Image` component requires that an `alt` be specified.

If the image is merely decorative (i.e. doesn’t contribute to the understanding of the page), set `alt=""` so that screen readers know to ignore the image.

**See Also:**

*   [Images](/en/guides/images/)
*   [Image component](/en/reference/modules/astro-assets/#image-)
*    [Image component#alt](/en/reference/modules/astro-assets/#alt-required)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/image-not-found
Image not found.
================

> **ImageNotFound**: Could not find requested image `IMAGE_PATH`. Does it exist?

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not find an image you imported. Often, this is simply caused by a typo in the path.

Images in Markdown are relative to the current file. To refer to an image that is located in the same folder as the `.md` file, the path should start with `./`

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



# Aggregated from ./pages/reference/errors/incompatible-descriptor-options
Cannot set both densities and widths
====================================

> **IncompatibleDescriptorOptions**: Only one of `densities` or `widths` can be specified. In most cases, you’ll probably want to use only `widths` if you require specific widths.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Only one of `densities` or `widths` can be specified. Those attributes are used to construct a `srcset` attribute, which cannot have both `x` and `w` descriptors.

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



# Aggregated from ./pages/reference/errors/incorrect-strategy-for-i18n
You can't use the current function with the current strategy
============================================================

> **IncorrectStrategyForI18n**: The function `FUNCTION_NAME` can only be used when the `i18n.routing.strategy` is set to `"manual"`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Some internationalization functions are only available when Astro’s own i18n routing is disabled by the configuration setting `i18n.routing: "manual"`.

**See Also:**

*   [`i18n` routing](/en/guides/internationalization/#routing)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-component-args
Invalid component arguments.
============================

> **Example error messages:**  
> InvalidComponentArgs: Invalid arguments passed to `<MyAstroComponent>` component.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro components cannot be rendered manually via a function call, such as `Component()` or `{items.map(Component)}`. Prefer the component syntax `<Component />` or `{items.map(item => <Component {...item} />)}`.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-content-entry-data-error
Content entry data does not match schema.
=========================================

> **Example error message:**  
> **blog** → **post** frontmatter does not match collection schema.  
> “title” is required.  
> “date” must be a valid date.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A content entry does not match its collection schema. Make sure that all required fields are present, and that all fields are of the correct type. You can check against the collection schema in your `src/content.config.*` file. See the [Content collections documentation](/en/guides/content-collections/) for more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-content-entry-frontmatter-error
Content entry frontmatter does not match schema.
================================================

> **Example error message:**  
> **blog** → **post.md** frontmatter does not match collection schema.  
> “title” is required.  
> “date” must be a valid date.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A Markdown or MDX entry does not match its collection schema. Make sure that all required fields are present, and that all fields are of the correct type. You can check against the collection schema in your `src/content.config.*` file. See the [Content collections documentation](/en/guides/content-collections/) for more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-content-entry-slug-error
Invalid content entry slug.
===========================

> `COLLECTION_NAME` → `ENTRY_ID` has an invalid slug. `slug` must be a string.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A collection entry has an invalid `slug`. This field is reserved for generating entry slugs, and must be a string when present.

**See Also:**

*   [The reserved entry `slug` field](/en/guides/content-collections/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-dynamic-route
Invalid dynamic route.
======================

> **InvalidDynamicRoute**: The INVALID\_PARAM param for route ROUTE is invalid. Received **RECEIVED**.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A dynamic route param is invalid. This is often caused by an `undefined` parameter or a missing [rest parameter](/en/guides/routing/#rest-parameters).

**See Also:**

*   [Dynamic routes](/en/guides/routing/#dynamic-routes)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-frontmatter-injection-error
Invalid frontmatter injection.
==============================

> **InvalidFrontmatterInjectionError**: A remark or rehype plugin attempted to inject invalid frontmatter. Ensure “astro.frontmatter” is set to a valid JSON object that is not `null` or `undefined`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A remark or rehype plugin attempted to inject invalid frontmatter. This occurs when “astro.frontmatter” is set to `null`, `undefined`, or an invalid JSON object.

**See Also:**

*   [Modifying frontmatter programmatically](/en/guides/markdown-content/#modifying-frontmatter-programmatically)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-get-static-path-param
Invalid value returned by a getStaticPaths path.
================================================

> **InvalidGetStaticPathParam**: Invalid params given to `getStaticPaths` path. Expected an `object`, got `PARAM_TYPE`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `params` property in `getStaticPaths`’s return value (an array of objects) should also be an object.

pages/blog/\[id\].astro

    ---export async function getStaticPaths() {  return [    { params: { slug: "blog" } },    { params: { slug: "about" } }  ];}---

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [`params`](/en/reference/api-reference/#params)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-get-static-paths-entry
Invalid entry inside getStaticPath's return value
=================================================

> **InvalidGetStaticPathsEntry**: Invalid entry returned by getStaticPaths. Expected an object, got `ENTRY_TYPE`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`getStaticPaths`’s return value must be an array of objects. In most cases, this error happens because an array of array was returned. Using [`.flatMap()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) or a [`.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) call may be useful.

pages/blog/\[id\].astro

    export async function getStaticPaths() {  return [ // <-- Array    { params: { slug: "blog" } }, // <-- Object    { params: { slug: "about" } }  ];}

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-get-static-paths-return
Invalid value returned by getStaticPaths.
=========================================

> **InvalidGetStaticPathsReturn**: Invalid type returned by `getStaticPaths`. Expected an `array`, got `RETURN_TYPE`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`getStaticPaths`’s return value must be an array of objects.

pages/blog/\[id\].astro

    export async function getStaticPaths() {  return [ // <-- Array    { params: { slug: "blog" } },    { params: { slug: "about" } }  ];}

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [`params`](/en/reference/api-reference/#params)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-glob
Invalid glob pattern.
=====================

> **InvalidGlob**: Invalid glob pattern: `GLOB_PATTERN`. Glob patterns must start with ’./’, ‘../’ or ’/‘.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an invalid glob pattern. This is often caused by the glob pattern not being a valid file path.

**See Also:**

*   [Glob Patterns](/en/guides/imports/#glob-patterns)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-image-service
Error while loading image service.
==================================

> **InvalidImageService**: There was an error loading the configured image service. Please see the stack trace for more information.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

There was an error while loading the configured image service. This can be caused by various factors, such as your image service not properly exporting a compatible object in its default export, or an incorrect path.

If you believe that your service is properly configured and this error is wrong, please [open an issue](https://astro.build/issues/).

**See Also:**

*   [Image Service API](/en/reference/image-service-reference/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-prerender-export
Invalid prerender export.
=========================

> **Example error messages:**  
> InvalidPrerenderExport: A `prerender` export has been detected, but its value cannot be statically analyzed.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `prerender` feature only supports a subset of valid JavaScript — be sure to use exactly `export const prerender = true` so that our compiler can detect this directive at build time. Variables, `let`, and `var` declarations are not supported.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/invalid-rewrite404
You attempted to rewrite a 404 inside a static page, and this isn't allowed.
============================================================================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **InvalidRewrite404**: Rewriting a 404 is only allowed inside on-demand pages.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The user tried to rewrite a 404 page inside a static page.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/local-image-used-wrongly
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



# Aggregated from ./pages/reference/errors/locals-not-an-object
Value assigned to locals is not accepted.
=========================================

> **LocalsNotAnObject**: `locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when `locals` is overwritten with something that is not an object

For example:

    import {defineMiddleware} from "astro:middleware";export const onRequest = defineMiddleware((context, next) => {  context.locals = 1541;  return next();});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/locals-not-serializable
Astro.locals is not serializable
================================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **LocalsNotSerializable**: The information stored in `Astro.locals` for the path “`HREF`” is not serializable. Make sure you store only serializable data. (E03034)

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown in development mode when a user attempts to store something that is not serializable in `locals`.

For example:

    import {defineMiddleware} from "astro/middleware";export const onRequest = defineMiddleware((context, next) => {  context.locals = {    foo() {      alert("Hello world!")    }  };  return next();});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/locals-reassigned
locals must not be reassigned.
==============================

> **LocalsReassigned**: `locals` can not be assigned directly.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when a value is being set as the `locals` field on the Astro global or context.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/markdown-content-schema-validation-error
Content collection frontmatter invalid.
=======================================

Deprecated

This error is from an older version of Astro and is no longer in use. If you are unable to upgrade your project to a more recent version, then you can consult [unmaintained snapshots of older documentation](/en/upgrade-astro/#older-docs-unmaintained) for assistance.

> **Example error message:**  
> Could not parse frontmatter in **blog** → **post.md**  
> “title” is required.  
> “date” must be a valid date.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A Markdown document’s frontmatter in `src/content/` does not match its collection schema. Make sure that all required fields are present, and that all fields are of the correct type. You can check against the collection schema in your `src/content/config.*` file. See the [Content collections documentation](/en/guides/content-collections/) for more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/markdown-frontmatter-parse-error
Failed to parse Markdown frontmatter.
=====================================

> **Example error messages:**  
> can not read an implicit mapping pair; a colon is missed  
> unexpected end of the stream within a double quoted scalar  
> can not read a block mapping entry; a multiline key may not be an implicit key

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an error while parsing the frontmatter of your Markdown file. This is often caused by a mistake in the syntax, such as a missing colon or a missing end quote.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/markdown-image-not-found
Image not found.
================

Deprecated

This error is no longer Markdown specific and as such, as been replaced by `ImageNotFound`

> Could not find requested image `IMAGE_PATH` at `FULL_IMAGE_PATH`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not find an image you included in your Markdown content. Usually, this is simply caused by a typo in the path.

Images in Markdown are relative to the current file. To refer to an image that is located in the same folder as the `.md` file, the path should start with `./`

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



# Aggregated from ./pages/reference/errors/mdx-integration-missing-error
MDX integration missing.
========================

> **MdxIntegrationMissingError**: Unable to render FILE. Ensure that the `@astrojs/mdx` integration is installed.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Unable to find the official `@astrojs/mdx` integration. This error is raised when using MDX files without an MDX integration installed.

**See Also:**

*   [MDX installation and usage](/en/guides/integrations-guide/mdx/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/middleware-cant-be-loaded
Can't load the middleware.
==========================

> **MiddlewareCantBeLoaded**: An unknown error was thrown while loading your middleware.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown in development mode when middleware throws an error while attempting to loading it.

For example:

    import {defineMiddleware} from "astro:middleware";throw new Error("Error thrown while loading the middleware.")export const onRequest = defineMiddleware(() => {  return "string"});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/middleware-no-data-or-next-called
The middleware didn't return a Response.
========================================

> **MiddlewareNoDataOrNextCalled**: Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when the middleware does not return any data or call the `next` function.

For example:

    import {defineMiddleware} from "astro:middleware";export const onRequest = defineMiddleware((context, _) => {  // doesn't return anything or call `next`  context.locals.someData = false;});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/middleware-not-aresponse
The middleware returned something that is not a Response object.
================================================================

> **MiddlewareNotAResponse**: Any data returned from middleware must be a valid `Response` object.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown in development mode when middleware returns something that is not a `Response` object.

For example:

    import {defineMiddleware} from "astro:middleware";export const onRequest = defineMiddleware(() => {  return "string"});

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/missing-image-dimension
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



# Aggregated from ./pages/reference/errors/missing-index-for-internationalization
Index page not found.
=====================

> **MissingIndexForInternationalization**: Could not find index page. A root index page is required in order to create a redirect to the index URL of the default locale. (`/DEFAULT_LOCALE`)

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not find the index URL of your website. An index page is required so that Astro can create a redirect from the main index page to the localized index page of the default locale when using [`i18n.routing.prefixDefaultLocale`](/en/reference/configuration-reference/#i18nroutingprefixdefaultlocale).

**See Also:**

*   [Internationalization](/en/guides/internationalization/#routing)
*   [`i18n.routing` Configuration Reference](/en/reference/configuration-reference/#i18nrouting)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/missing-locale
The provided locale does not exist.
===================================

> **MissingLocale**: The locale/path `LOCALE` does not exist in the configured `i18n.locales`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro can’t find the requested locale. All supported locales must be configured in [i18n.locales](/en/reference/configuration-reference/#i18nlocales) and have corresponding directories within `src/pages/`.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/missing-media-query-directive
Missing value for client:media directive.
=========================================

> **MissingMediaQueryDirective**: Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) parameter is required when using the `client:media` directive.

    <Counter client:media="(max-width: 640px)" />

**See Also:**

*   [`client:media`](/en/reference/directives-reference/#clientmedia)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/missing-middleware-for-internationalization
Enabled manual internationalization routing without having a middleware.
========================================================================

> **MissingMiddlewareForInternationalization**: Your configuration setting `i18n.routing: 'manual'` requires you to provide your own i18n `middleware` file.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro throws an error if the user enables manual routing, but it doesn’t have a middleware file.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/missing-sharp
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



# Aggregated from ./pages/reference/errors/mixed-content-data-collection-error
Content and data cannot be in same collection.
==============================================

> **MixedContentDataCollectionError**: **COLLECTION\_NAME** contains a mix of content and data entries. All entries must be of the same type.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A legacy content collection cannot contain a mix of content and data entries. You must store entries in separate collections by type.

**See Also:**

*   [Legacy content collections](/en/guides/upgrade-to/v5/#updating-existing-collections)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-adapter-installed-server-islands
Cannot use Server Islands without an adapter.
=============================================

> **NoAdapterInstalledServerIslands**: Cannot use server islands without an adapter. Please install and configure the appropriate server adapter for your final deployment.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

To use server islands, the same constraints exist as for sever-side rendering, so an adapter is needed.

**See Also:**

*   [On-demand Rendering](/en/guides/on-demand-rendering/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-adapter-installed
Cannot use Server-side Rendering without an adapter.
====================================================

> **NoAdapterInstalled**: Cannot use server-rendered pages without an adapter. Please install and configure the appropriate server adapter for your final deployment.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

To use server-side rendering, an adapter needs to be installed so Astro knows how to generate the proper output for your targeted deployment platform.

**See Also:**

*   [Server-side Rendering](/en/guides/on-demand-rendering/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-client-entrypoint
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



# Aggregated from ./pages/reference/errors/no-client-only-hint
Missing hint on client:only directive.
======================================

> **NoClientOnlyHint**: Unable to render `COMPONENT_NAME`. When using the `client:only` hydration strategy, Astro needs a hint to use the correct renderer.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`client:only` components are not run on the server, as such Astro does not know (and cannot guess) which renderer to use and require a hint. Like such:

      <SomeReactComponent client:only="react" />

**See Also:**

*   [`client:only`](/en/reference/directives-reference/#clientonly)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-image-metadata
Could not process image metadata.
=================================

> Could not process image metadata for `IMAGE_PATH`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not process the metadata of an image you imported. This is often caused by a corrupted or malformed image and re-exporting the image from your image editor may fix this issue.

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



# Aggregated from ./pages/reference/errors/no-matching-import
No import found for component.
==============================

> **NoMatchingImport**: Could not render `COMPONENT_NAME`. No matching import has been found for `COMPONENT_NAME`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

No import statement was found for one of the components. If there is an import statement, make sure you are using the same identifier in both the imports and the component usage.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-matching-renderer
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



# Aggregated from ./pages/reference/errors/no-matching-static-path-found
No static path found for requested path.
========================================

> **NoMatchingStaticPathFound**: A `getStaticPaths()` route pattern was matched, but no matching static path was found for requested path `PATH_NAME`.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A [dynamic route](/en/guides/routing/#dynamic-routes) was matched, but no corresponding path was found for the requested parameters. This is often caused by a typo in either the generated or the requested path.

**See Also:**

*   [getStaticPaths()](/en/reference/routing-reference/#getstaticpaths)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/no-prerendered-routes-with-domains
Prerendered routes aren't supported when internationalization domains are enabled.
==================================================================================

> **NoPrerenderedRoutesWithDomains**: Static pages aren’t yet supported with multiple domains. To enable this feature, you must disable prerendering for the page COMPONENT

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Static pages aren’t yet supported with i18n domains. If you wish to enable this feature, you have to disable prerendering.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/only-response-can-be-returned
Invalid type returned by Astro page.
====================================

> Route returned a `RETURNED_VALUE`. Only a Response can be returned from Astro files.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Only instances of [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned inside Astro files.

pages/login.astro

    ---return new Response(null, { status: 404, statusText: 'Not found'});
    // Alternatively, for redirects, Astro.redirect also returns an instance of Responsereturn Astro.redirect('/login');---

**See Also:**

*   [Response](/en/guides/on-demand-rendering/#response)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/page-number-param-not-found
Page number param not found.
============================

> **PageNumberParamNotFound**: \[paginate()\] page number param `PARAM_NAME` not found in your filepath.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The page number parameter was not found in your filepath.

**See Also:**

*   [Pagination](/en/guides/routing/#pagination)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/prerender-client-address-not-available
Astro.clientAddress cannot be used inside prerendered routes.
=============================================================

> **PrerenderClientAddressNotAvailable**: `Astro.clientAddress` cannot be used inside prerendered route NAME

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `Astro.clientAddress` property cannot be used inside prerendered routes.

**See Also:**

*   [On-demand rendering](/en/guides/on-demand-rendering/)
*   [Astro.clientAddress](/en/reference/api-reference/#clientaddress)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/prerender-dynamic-endpoint-path-collide
Prerendered dynamic endpoint has path collision.
================================================

> **PrerenderDynamicEndpointPathCollide**: Could not render `PATHNAME` with an `undefined` param as the generated path will collide during prerendering. Prevent passing `undefined` as `params` for the endpoint’s `getStaticPaths()` function, or add an additional extension to the endpoint’s filename.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The endpoint is prerendered with an `undefined` param so the generated path will collide with another route.

If you cannot prevent passing `undefined`, then an additional extension can be added to the endpoint file name to generate the file with a different name. For example, renaming `pages/api/[slug].ts` to `pages/api/[slug].json.ts`.

**See Also:**

*   [`getStaticPaths()`](/en/reference/routing-reference/#getstaticpaths)
*   [`params`](/en/reference/api-reference/#params)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/redirect-with-no-location
A redirect must be given a location with the Location header.
=============================================================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

A redirect must be given a location with the `Location` header.

**See Also:**

*   [Astro.redirect](/en/reference/api-reference/#redirect)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/render-undefined-entry-error
Attempted to render an undefined content collection entry.
==========================================================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro tried to render a content collection entry that was undefined. This can happen if you try to render an entry that does not exist.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/reserved-slot-name
Invalid slot name.
==================

> **ReservedSlotName**: Unable to create a slot named `SLOT_NAME`. `SLOT_NAME` is a reserved slot name. Please update the name of this slot.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Certain words cannot be used for slot names due to being already used internally.

**See Also:**

*   [Named slots](/en/basics/astro-components/#named-slots)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/response-sent-error
Unable to set response.
=======================

> **ResponseSentError**: The response has already been sent to the browser and cannot be altered.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Making changes to the response, such as setting headers, cookies, and the status code cannot be done outside of page components.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/rewrite-encountered-an-error
Astro couldn't find the route to rewrite, or if was found but it emitted an error during the rendering phase.
=============================================================================================================

Deprecated

This error cannot be emitted by Astro anymore

> **RewriteEncounteredAnError**: The route ROUTE that you tried to render doesn’t exist, or it emitted an error during the rendering phase. STACK ? STACK : ”.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The user tried to rewrite using a route that doesn’t exist, or it emitted a runtime error during its rendering phase.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/rewrite-with-body-used
Cannot use Astro.rewrite after the request body has been read
=============================================================

> **RewriteWithBodyUsed**: Astro.rewrite() cannot be used if the request body has already been read. If you need to read the body, first clone the request.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`Astro.rewrite()` cannot be used if the request body has already been read. If you need to read the body, first clone the request. For example:

    const data = await Astro.request.clone().formData();
    Astro.rewrite("/target")

**See Also:**

*   [Request.clone()](https://developer.mozilla.org/en-US/docs/Web/API/Request/clone)
*   [Astro.rewrite](/en/reference/api-reference/#rewrite)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/route-not-found
Route not found.
================

> **RouteNotFound**: Astro could not find a route that matches the one you requested.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro couldn’t find a route matching the one provided by the user

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/server-only-module
Module is only available server-side
====================================

> **ServerOnlyModule**: The “NAME” module is only available server-side.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

This module is only available server-side.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/session-config-missing-error
Session storage was enabled but not configured.
===============================================

Deprecated

This error was removed in Astro 5.7, when the Sessions feature stopped being experimental.

> The `experimental.session` flag was set to `true`, but no storage was configured. Either configure the storage manually or use an adapter that provides session storage.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when session storage is enabled but not configured.

**See Also:**

*   [Sessions](/en/guides/sessions/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/session-config-without-flag-error
Session flag not set
====================

Deprecated

This error was removed in Astro 5.7, when the Sessions feature stopped being experimental.

> Session config was provided without enabling the `experimental.session` flag

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when session storage is configured but the `experimental.session` flag is not enabled.

**See Also:**

*   [Sessions](/en/guides/sessions/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/session-storage-init-error
Session storage could not be initialized.
=========================================

> Error when initializing session storage with driver `DRIVER`. `ERROR`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when the session storage could not be initialized.

**See Also:**

*   [Sessions](/en/guides/sessions/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/session-storage-save-error
Session data could not be saved.
================================

> Error when saving session data with driver `DRIVER`. `ERROR`

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Thrown when the session data could not be saved.

**See Also:**

*   [Sessions](/en/guides/sessions/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/session-without-supported-adapter-output-error
Sessions cannot be used with an adapter that doesn't support server output.
===========================================================================

Deprecated

This error was removed in Astro 5.7, when the Sessions feature stopped being experimental.

> **SessionWithoutSupportedAdapterOutputError**: Sessions require an adapter that supports server output. The adapter must set `"server"` in the `buildOutput` adapter feature.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Your adapter must support server output to use sessions.

**See Also:**

*   [Sessions](/en/guides/sessions/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/static-client-address-not-available
Astro.clientAddress is not available in prerendered pages.
==========================================================

> **StaticClientAddressNotAvailable**: `Astro.clientAddress` is only available on pages that are server-rendered.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `Astro.clientAddress` property is only available when [Server-side rendering](/en/guides/on-demand-rendering/) is enabled.

To get the user’s IP address in static mode, different APIs such as [Ipify](https://www.ipify.org/) can be used in a [Client-side script](/en/guides/client-side-scripts/) or it may be possible to get the user’s IP using a serverless function hosted on your hosting provider.

**See Also:**

*   [Enabling SSR in Your Project](/en/guides/on-demand-rendering/)
*   [Astro.clientAddress](/en/reference/api-reference/#clientaddress)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/static-redirect-not-available
Astro.redirect is not available in static mode.
===============================================

Deprecated

Deprecated since version 2.6.

> **StaticRedirectNotAvailable**: Redirects are only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The `Astro.redirect` function is only available when [Server-side rendering](/en/guides/on-demand-rendering/) is enabled.

To redirect on a static website, the [meta refresh attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) can be used. Certain hosts also provide config-based redirects (ex: [Netlify redirects](https://docs.netlify.com/routing/redirects/)).

**See Also:**

*   [Enabling SSR in Your Project](/en/guides/on-demand-rendering/)
*   [Astro.redirect](/en/reference/api-reference/#redirect)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unhandled-rejection
Unhandled rejection
===================

> **UnhandledRejection**: Astro detected an unhandled rejection. Here’s the stack trace:  
> STACK

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro could not find any code to handle a rejected `Promise`. Make sure all your promises have an `await` or `.catch()` handler.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-clierror
Unknown CLI Error.
==================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an unknown error while starting one of its CLI commands. The error message should contain more information.

If you can reliably cause this error to happen, we’d appreciate if you could [open an issue](https://astro.build/issues/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-compiler-error
Unknown compiler error.
=======================

> Unknown compiler error.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an unknown error while compiling your files. In most cases, this is not your fault, but an issue in our compiler.

If there isn’t one already, please [create an issue](https://astro.build/issues/compiler).

**See Also:**

*   [withastro/compiler issues list](https://astro.build/issues/compiler)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-config-error
Unknown configuration error.
============================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an unknown error loading your Astro configuration file. This is often caused by a syntax error in your config and the message should offer more information.

If you can reliably cause this error to happen, we’d appreciate if you could [open an issue](https://astro.build/issues/)

**See Also:**

*   [Configuration Reference](/en/reference/configuration-reference/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-content-collection-error
Unknown Content Collection Error.
=================================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an unknown error loading your content collections. This can be caused by certain errors inside your `src/content.config.ts` file or some internal errors.

If you can reliably cause this error to happen, we’d appreciate if you could [open an issue](https://astro.build/issues/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-csserror
Unknown CSS Error.
==================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an unknown error while parsing your CSS. Oftentimes, this is caused by a syntax error and the error message should contain more information.

**See Also:**

*   [Styles and CSS](/en/guides/styling/)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-filesystem-error
An unknown error occurred while reading or writing files to disk.
=================================================================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An unknown error occurred while reading or writing files to disk. It can be caused by many things, eg. missing permissions or a file not existing we attempt to read.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-markdown-error
Unknown Markdown Error.
=======================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro encountered an unknown error while parsing your Markdown. Oftentimes, this is caused by a syntax error and the error message should contain more information.

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unknown-vite-error
Unknown Vite Error.
===================

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Vite encountered an unknown error while rendering your project. We unfortunately do not know what happened (or we would tell you!)

If you can reliably cause this error to happen, we’d appreciate if you could [open an issue](https://astro.build/issues/)

**See Also:**

*   [Vite troubleshooting guide](https://vite.dev/guide/troubleshooting.html)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unsupported-config-transform-error
Unsupported transform in content config.
========================================

> **UnsupportedConfigTransformError**: `transform()` functions in your content config must return valid JSON, or data types compatible with the devalue library (including Dates, Maps, and Sets).  
> Full error: PARSE\_ERROR

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

`transform()` functions in your content config must return valid JSON, or data types compatible with the devalue library (including Dates, Maps, and Sets).

**See Also:**

*   [devalue library](https://github.com/rich-harris/devalue)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unsupported-external-redirect
Unsupported or malformed URL.
=============================

> **UnsupportedExternalRedirect**: The destination URL in the external redirect from “FROM” to “TO” is unsupported.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

An external redirect must start with http or https, and must be a valid URL.

**See Also:**

*   [Astro.redirect](/en/reference/api-reference/#redirect)

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/errors/unsupported-image-conversion
Unsupported image conversion
============================

> **UnsupportedImageConversion**: Converting between vector (such as SVGs) and raster (such as PNGs and JPEGs) images is not currently supported.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

Astro does not currently supporting converting between vector (such as SVGs) and raster (such as PNGs and JPEGs) images.

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



# Aggregated from ./pages/reference/errors/unsupported-image-format
Unsupported image format
========================

> **UnsupportedImageFormat**: Received unsupported format `FORMAT` from `IMAGE_PATH`. Currently only SUPPORTED\_FORMATS.JOIN(’, ’) are supported by our image services.

What went wrong?
----------------

[Section titled What went wrong?](#what-went-wrong)

The built-in image services do not currently support optimizing all image formats.

For unsupported formats such as GIFs, you may be able to use an `img` tag directly:

    ---import rocket from '../assets/images/rocket.gif';---
    <img src={rocket.src} width={rocket.width} height={rocket.height} alt="A rocketship in space." />

Error Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



