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

