Internationalization (i18n) Routing
===================================

Astro’s internationalization (i18n) features allow you to adapt your project for an international audience. This routing API helps you generate, use, and verify the URLs that your multi-language site produces.

Astro’s i18n routing allows you to bring your multilingual content with support for configuring a default language, computing relative page URLs, and accepting preferred languages provided by your visitor’s browser. You can also specify fallback languages on a per-language basis so that your visitors can always be directed to existing content on your site.

Routing Logic
-------------

[Section titled Routing Logic](#routing-logic)

Astro uses a [middleware](/en/guides/middleware/) to implement its routing logic. This middleware function is placed in the [first position](/en/guides/middleware/#chaining-middleware) where it awaits every `Response` coming from any additional middleware and each page route before finally executing its own logic.

This means that operations (e.g. redirects) from your own middleware and your page logic are run first, your routes are rendered, and then the i18n middleware performs its own actions such as verifying that a localized URL corresponds to a valid route.

You can also choose to [add your own i18n logic in addition to or instead of Astro’s i18n middleware](#manual), giving you even more control over your routes while still having access to the `astro:i18n` helper functions.

Configure i18n routing
----------------------

[Section titled Configure i18n routing](#configure-i18n-routing)

Both a list of all supported languages ([`locales`](/en/reference/configuration-reference/#i18nlocales)) and a default language ([`defaultLocale`](/en/reference/configuration-reference/#i18ndefaultlocale)), which must be one of the languages listed in `locales`, need to be specified in an `i18n` configuration object. Additionally, you can configure more specific routing and fallback behavior to match your desired URLs.

astro.config.mjs

    import { defineConfig } from "astro/config"export default defineConfig({  i18n: {    locales: ["es", "en", "pt-br"],    defaultLocale: "en",  }})

### Create localized folders

[Section titled Create localized folders](#create-localized-folders)

Organize your content folders with localized content by language. Create individual `/[locale]/` folders anywhere within `src/pages/` and Astro’s [file-based routing](/en/guides/routing/) will create your pages at corresponding URL paths.

Your folder names must match the items in `locales` exactly. Include a localized folder for your `defaultLocale` only if you configure `prefixDefaultLocale: true` to show a localized URL path for your default language (e.g. `/en/about/`).

*   Directorysrc
    
    *   Directorypages
        
        *   about.astro
        *   index.astro
        *   Directoryes
            
            *   about.astro
            *   index.astro
            
        *   Directorypt-br
            
            *   about.astro
            *   index.astro
            
        
    

Note

The localized folders do not need to be at the root of the `/pages/` folder.

### Create links

[Section titled Create links](#create-links)

With i18n routing configured, you can now compute links to pages within your site using the helper functions such as [`getRelativeLocaleUrl()`](/en/reference/modules/astro-i18n/#getrelativelocaleurl) available from the [`astro:i18n` module](/en/reference/modules/astro-i18n/). These generated links will always provide the correct, localized route and can help you correctly use, or check, URLs on your site.

You can also still write the links manually.

src/pages/es/index.astro

    ---import { getRelativeLocaleUrl } from 'astro:i18n';
    // defaultLocale is "es"const aboutURL = getRelativeLocaleUrl("es", "about");---
    <a href="/get-started/">¡Vamos!</a><a href={getRelativeLocaleUrl('es', 'blog')}>Blog</a><a href={aboutURL}>Acerca</a>

`routing`
---------

[Section titled routing](#routing)

Astro’s built-in file-based routing automatically creates URL routes for you based on your file structure within `src/pages/`.

When you configure i18n routing, information about this file structure (and the corresponding URL paths generated) is available to the i18n helper functions so they can generate, use, and verify the routes in your project. Many of these options can be used together for even more customization and per-language flexibility.

You can even choose to [implement your own routing logic manually](#manual) for even greater control.

### `prefixDefaultLocale`

[Section titled prefixDefaultLocale](#prefixdefaultlocale)

**Added in:** `astro@3.5.0`

This routing option defines whether or not your default language’s URLs should use a language prefix (e.g. `/en/about/`).

All non-default supported languages **will** use a localized prefix (e.g. `/fr/` or `/french/`) and content files must be located in appropriate folders. This configuration option allows you to specify whether your default language should also follow a localized URL structure.

This setting also determines where the page files for your default language must exist (e.g. `src/pages/about/` or `src/pages/en/about`) as the file structure and URL structure must match for all languages.

*   `"prefixDefaultLocale: false"` (default): URLs in your default language will **not** have a `/[locale]/` prefix. All other locales will.
    
*   `"prefixDefaultLocale: true"`: All URLs, including your default language, will have a `/[locale]/` prefix.
    

#### `prefixDefaultLocale: false`

[Section titled prefixDefaultLocale: false](#prefixdefaultlocale-false)

astro.config.mjs

    import { defineConfig } from "astro/config"export default defineConfig({  i18n: {    locales: ["es", "en", "fr"],    defaultLocale: "en",    routing: {        prefixDefaultLocale: false    }  }})

This is the **default** value. Set this option when URLs in your default language will **not** have a `/[locale]/` prefix and files in your default language exist at the root of `src/pages/`:

*   Directorysrc
    
    *   Directorypages
        
        *   about.astro
        *   index.astro
        *   Directoryes
            
            *   about.astro
            *   index.astro
            
        *   Directoryfr
            
            *   about.astro
            *   index.astro
            
        
    

*   `src/pages/about.astro` will produce the route `example.com/about/`
*   `src/pages/fr/about.astro` will produce the route `example.com/fr/about/`

#### `prefixDefaultLocale: true`

[Section titled prefixDefaultLocale: true](#prefixdefaultlocale-true)

astro.config.mjs

    import { defineConfig } from "astro/config"export default defineConfig({  i18n: {    locales: ["es", "en", "fr"],    defaultLocale: "en",    routing: {        prefixDefaultLocale: true    }  }})

Set this option when all routes will have their `/locale/` prefix in their URL and when all page content files, including those for your `defaultLocale`, exist in a localized folder:

*   Directorysrc
    
    *   Directorypages
        
        *   **index.astro** // Note: this file is always required
        *   Directoryen
            
            *   index.astro
            *   about.astro
            
        *   Directoryes
            
            *   about.astro
            *   index.astro
            
        *   Directorypt-br
            
            *   about.astro
            *   index.astro
            
        
    

*   URLs without a locale prefix, (e.g. `example.com/about/`) will return a 404 (not found) status code unless you specify a [fallback strategy](#fallback).

### `redirectToDefaultLocale`

[Section titled redirectToDefaultLocale](#redirecttodefaultlocale)

**Added in:** `astro@4.2.0`

Configures whether or not the home URL (`/`) generated by `src/pages/index.astro` will redirect to `/<defaultLocale>`.

Setting `prefixDefaultLocale: true` will also automatically set `redirectToDefaultLocale: true` in your `routing` config object. By default, the required `src/pages/index.astro` file will automatically redirect to the index page of your default locale.

You can opt out of this behavior by [setting `redirectToDefaultLocale: false`](/en/reference/configuration-reference/#i18nroutingredirecttodefaultlocale). This allows you to have a site home page that exists outside of your configured locale folder structure.

### `manual`

[Section titled manual](#manual)

**Added in:** `astro@4.6.0`

When this option is enabled, Astro will **disable** its i18n middleware so that you can implement your own custom logic. No other `routing` options (e.g. `prefixDefaultLocale`) may be configured with `routing: "manual"`.

You will be responsible for writing your own routing logic, or [executing Astro’s i18n middleware manually](#middleware-function) alongside your own.

astro.config.mjs

    import { defineConfig } from "astro/config"export default defineConfig({  i18n: {    locales: ["es", "en", "fr"],    defaultLocale: "en",    routing: "manual"  }})

Astro provides helper functions for your middleware so you can control your own default routing, exceptions, fallback behavior, error catching, etc: [`redirectToDefaultLocale()`](/en/reference/modules/astro-i18n/#redirecttodefaultlocale), [`notFound()`](/en/reference/modules/astro-i18n/#notfound), and [`redirectToFallback()`](/en/reference/modules/astro-i18n/#redirecttofallback):

src/middleware.js

    import { defineMiddleware } from "astro:middleware";import { redirectToDefaultLocale } from "astro:i18n"; // function available with `manual` routingexport const onRequest = defineMiddleware(async (ctx, next) => {  if (ctx.url.startsWith("/about")) {    return next();  } else {    return redirectToDefaultLocale(302);  }})

#### middleware function

[Section titled middleware function](#middleware-function)

The [`middleware`](#middleware-function) function manually creates Astro’s i18n middleware. This allows you to extend Astro’s i18n routing instead of completely replacing it.

You can run `middleware` with [routing options](#routing) in combination with your own middleware, using the [`sequence`](/en/reference/modules/astro-middleware/#sequence) utility to determine the order:

src/middleware.js

    import {defineMiddleware, sequence} from "astro:middleware";import { middleware } from "astro:i18n"; // Astro's own i18n routing config
    export const userMiddleware = defineMiddleware(async (ctx, next) => {  // this response might come from Astro's i18n middleware, and it might return a 404  const response = await next();  // the /about page is an exception and we want to render it  if (ctx.url.startsWith("/about")) {    return new Response("About page", {      status: 200    });  } else {    return response;  }});
    
    export const onRequest = sequence(  userMiddleware,  middleware({    redirectToDefaultLocale: false,    prefixDefaultLocale: true  }))

`domains`
---------

[Section titled domains](#domains)

**Added in:** `astro@4.9.0`

This routing option allows you to customize your domains on a per-language basis for `server` rendered projects using the [`@astrojs/node`](/en/guides/integrations-guide/node/) or [`@astrojs/vercel`](/en/guides/integrations-guide/vercel/) adapter with a `site` configured.

Add `i18n.domains` to map any of your supported `locales` to custom URLs:

astro.config.mjs

    import { defineConfig } from "astro/config"export default defineConfig({  site: "https://example.com",  output: "server", // required, with no prerendered pages  adapter: node({    mode: 'standalone',  }),  i18n: {    locales: ["es", "en", "fr", "ja"],    defaultLocale: "en",    routing: {      prefixDefaultLocale: false    },    domains: {      fr: "https://fr.example.com",      es: "https://example.es"    }  }})

All non-mapped `locales` will follow your `prefixDefaultLocales` configuration. However, even if this value is `false`, page files for your `defaultLocale` must also exist within a localized folder. For the configuration above, an `/en/` folder is required.

With the above configuration:

*   The file `/fr/about.astro` will create the URL `https://fr.example.com/about`.
*   The file `/es/about.astro` will create the URL `https://example.es/about`.
*   The file `/ja/about.astro` will create the URL `https://example.com/ja/about`.
*   The file `/en/about.astro` will create the URL `https://example.com/about`.

The above URLs will also be returned by the `getAbsoluteLocaleUrl()` and `getAbsoluteLocaleUrlList()` functions.

Fallback
--------

[Section titled Fallback](#fallback)

When a page in one language doesn’t exist (e.g. a page that is not yet translated), instead of displaying a 404 page, you can choose to display fallback content from another `locale` on a per-language basis. This is useful when you do not yet have a page for every route, but you want to still provide some content to your visitors.

Your fallback strategy consists of two parts: choosing which languages should fallback to which other languages ([`i18n.fallback`](/en/reference/configuration-reference/#i18nfallback)) and choosing whether to perform a [redirect](/en/guides/routing/#redirects) or a [rewrite](/en/guides/routing/#rewrites) to show the fallback content ([`i18n.routing.fallbackType`](/en/reference/configuration-reference/#i18nroutingfallbacktype) added in Astro v4.15.0).

For example, when you configure `i18n.fallback: { fr: "es" }`, Astro will ensure that a page is built in `src/pages/fr/` for every page that exists in `src/pages/es/`.

If any page does not already exist, then a page will be created depending on your `fallbackType`:

*   With a redirect to the corresponding `es` route (default behavior).
*   With the content of the `/es/` page (`i18n.routing.fallbackType: "rewrite"`).

For example, the configuration below sets `es` as the fallback locale for any missing `fr` routes. This means that a user visiting `example.com/fr/my-page/` will be shown the content for `example.com/es/my-page/` (without being redirected) instead of being taken to a 404 page when `src/pages/fr/my-page.astro` does not exist.

astro.config.mjs

    import { defineConfig } from "astro/config"export default defineConfig({  i18n: {    locales: ["es", "en", "fr"],    defaultLocale: "en",    fallback: {      fr: "es"    },    routing: {      fallbackType: "rewrite"    }  }})

Custom locale paths
-------------------

[Section titled Custom locale paths](#custom-locale-paths)

In addition to defining your site’s supported `locales` as strings (e.g. “en”, “pt-br”), Astro also allows you to map an arbitrary number of [browser-recognized language `codes`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language#syntax) to a custom URL `path`. While locales can be strings of any format as long as they correspond to your project folder structure, `codes` must follow the browser’s accepted syntax.

Pass an object to the `locales` array with a `path` key to define a custom URL prefix, and `codes` to indicate the languages mapped to this URL. In this case, your `/[locale]/` folder name must match exactly the value of the `path` and your URLs will be generated using the `path` value.

This is useful if you support multiple variations of a language (e.g. `"fr"`, `"fr-BR"`, and `"fr-CA"`) and you want to have all these variations mapped under the same URL `/fr/`, or even customize it entirely (e.g. `/french/`):

astro.config.mjs

    import { defineConfig } from "astro/config"export default defineConfig({  i18n: {    locales: ["es", "en", "fr"],    locales: ["es", "en", {      path: "french", // no slashes included      codes: ["fr", "fr-BR", "fr-CA"]    }],    defaultLocale: "en",    routing: {        prefixDefaultLocale: true    }  }})

When using functions from the [`astro:i18n` virtual module](/en/reference/modules/astro-i18n/) to compute valid URL paths based on your configuration (e.g. `getRelativeLocaleUrl()`), [use the `path` as the value for `locale`](/en/reference/modules/astro-i18n/#getlocalebypath).

#### Limitations

[Section titled Limitations](#limitations)

This feature has some restrictions:

*   The `site` option is mandatory.
*   The `output` option must be set to `"server"`.
*   There cannot be any individual prerendered pages.

Astro relies on the following headers in order to support the feature:

*   [`X-Forwarded-Host`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host) and [`Host`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host). Astro will use the former, and if not present, will try the latter.
*   [`X-Forwarded-Proto`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto) and [`URL#protocol`](https://developer.mozilla.org/en-US/docs/Web/API/URL/protocol) of the server request.

Make sure that your server proxy/hosting platform is able to provide this information. Failing to retrieve these headers will result in a 404 (status code) page.

Browser language detection
--------------------------

[Section titled Browser language detection](#browser-language-detection)

Astro’s i18n routing allows you to access two properties for browser language detection in pages rendered on demand: `Astro.preferredLocale` and `Astro.preferredLocaleList`. All pages, including static prerendered pages, have access to `Astro.currentLocale`.

These combine the browser’s `Accept-Language` header, and your `locales` (strings or `codes`) to automatically respect your visitor’s preferred languages.

*   [`Astro.preferredLocale`](/en/reference/api-reference/#preferredlocale): Astro can compute a **preferred locale** for your visitor if their browser’s preferred locale is included in your `locales` array. This value is undefined if no such match exists.
    
*   [`Astro.preferredLocaleList`](/en/reference/api-reference/#preferredlocalelist): An array of all locales that are both requested by the browser and supported by your website. This produces a list of all compatible languages between your site and your visitor. The value is `[]` if none of the browser’s requested languages are found in your `locales` array. If the browser does not specify any preferred languages, then this value will be [`i18n.locales`](/en/reference/configuration-reference/#i18nlocales).
    
*   [`Astro.currentLocale`](/en/reference/api-reference/#currentlocale): The locale computed from the current URL, using the syntax specified in your `locales` configuration. If the URL does not contain a `/[locale]/` prefix, then the value will default to [`i18n.defaultLocale`](/en/reference/configuration-reference/#i18ndefaultlocale).
    

In order to successfully match your visitors’ preferences, provide your `codes` using the same pattern [used by the browser](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language#syntax).

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/internationalization.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Middleware](/en/guides/middleware/) [Next  
Prefetch](/en/guides/prefetch/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)