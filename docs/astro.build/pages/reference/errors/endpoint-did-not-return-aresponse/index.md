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