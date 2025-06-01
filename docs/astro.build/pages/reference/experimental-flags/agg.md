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

# Aggregated from ./pages/reference/experimental-flags/client-prerender
Experimental client prerendering
================================

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@4.2.0`

Enables pre-rendering your prefetched pages on the client in supported browsers.

This feature uses the experimental [Speculation Rules Web API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) and enhances the default `prefetch` behavior globally to prerender links on the client. You may wish to review the [possible risks when prerendering on the client](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API#unsafe_prefetching) before enabling this feature.

Enable client side prerendering in your `astro.config.mjs` along with any desired `prefetch` configuration options:

astro.config.mjs

    {  prefetch: {    prefetchAll: true,    defaultStrategy: 'viewport',  },  experimental: {    clientPrerender: true,  },}

Continue to use the `data-astro-prefetch` attribute on any `<a />` link on your site to opt in to prefetching. Instead of appending a `<link>` tag to the head of the document or fetching the page with JavaScript, a `<script>` tag will be appended with the corresponding speculation rules.

Client side prerendering requires browser support. If the Speculation Rules API is not supported, `prefetch` will fallback to the supported strategy.

See the [Prefetch Guide](/en/guides/prefetch/) for more `prefetch` options and usage.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/client-prerender.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Fonts](/en/reference/experimental-flags/fonts/) [Next  
Intellisense for collections](/en/reference/experimental-flags/content-intellisense/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/experimental-flags/content-intellisense
Experimental Intellisense for content collections
=================================================

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@4.14.0`

Enables Intellisense features (e.g. code completion, quick hints) for your content collection entries in compatible editors.

When enabled, this feature will generate and add JSON schemas to the `.astro` directory in your project. These files can be used by the Astro language server to provide Intellisense inside content files (`.md`, `.mdx`, `.mdoc`).

    {  experimental: {    contentIntellisense: true,  },}

To use this feature with the Astro VS Code extension, you must also enable the `astro.content-intellisense` option in your VS Code settings. For editors using the Astro language server directly, pass the `contentIntellisense: true` initialization parameter to enable this feature.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/content-intellisense.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Client prerendering](/en/reference/experimental-flags/client-prerender/) [Next  
Preserve scripts order](/en/reference/experimental-flags/preserve-scripts-order/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/experimental-flags/fonts
Experimental fonts API
======================

**Type:** `FontFamily[]`  

**Added in:** `astro@5.7.0`

This experimental feature allows you to use fonts from your filesystem and various font providers (eg. Google, Fontsource, Bunny) through a unified, fully customizable, and type-safe API.

Web fonts can impact page performance at both load time and rendering time. This API helps you keep your site performant with automatic [web font optimizations](https://web.dev/learn/performance/optimize-web-fonts) including preload links, optimized fallbacks, and opinionated defaults. [See common usage examples](#usage-examples).

To enable this feature, configure an `experimental.fonts` object with at least one font:

astro.config.mjs

    import { defineConfig, fontProviders } from "astro/config";
    export default defineConfig({    experimental: {        fonts: [{            provider: fontProviders.google(),            name: "Roboto",            cssVariable: "--font-roboto"        }]    }});

Then, add the `<Font />` component and site-wide styling in your `<head>`:

src/components/Head.astro

    ---import { Font } from 'astro:assets';---
    <Font cssVariable='--font-roboto' preload />
    <style>body {    font-family: var(--font-roboto);}</style>

Usage
-----

[Section titled Usage](#usage)

1.  `experimental.fonts` accepts an array of font objects. For each font, you must specify a `provider`, the family `name`, and define a `cssVariable` to refer to your font.
    
    *   [`provider`](#provider): You can choose from the list of [built-in remote providers](#available-remote-font-providers), build your own [custom font provider](#build-your-own-font-provider), or use the [local provider](#local-font-variants) to register local font files.
    *   [`name`](#name): Choose a font family supported by your provider.
    *   [`cssVariable`](#cssvariable-1): Must be a valid [ident](https://developer.mozilla.org/en-US/docs/Web/CSS/ident) in the form of a CSS variable.
    
    The following example configures the [“Roboto” family from Google Fonts](https://fonts.google.com/specimen/Roboto):
    
    astro.config.mjs
    
        import { defineConfig, fontProviders } from "astro/config";
        export default defineConfig({  experimental: {    fonts: [{      provider: fontProviders.google(),      name: "Roboto",      cssVariable: "--font-roboto"    }]  }});
    
    More configuration options, such as defining [fallback font families](#fallbacks) and which [`weights`](#weights) and [`styles`](#styles) to download, are available and some will depend on your chosen provider.
    
    See the full [configuration reference](#font-configuration-reference) to learn more.
    
2.  Apply styles using the `<Font />` component. It must be imported and added to your page `<head>`. Providing the font’s [`cssVariable`](#cssvariable) is required, and you can optionally [output preload links](#preload):
    
    src/components/Head.astro
    
        ---import { Font } from 'astro:assets';---
        <Font cssVariable="--font-roboto" preload />
    
    This is commonly done in a component such as `Head.astro` that is used in a common site layout.
    
    See the full [`<Font>` component reference](#font--component-reference) for more information.
    
    Since the `<Font />` component generates CSS with font declarations, you can reference the font family using the `cssVariable`:
    
    *   [CSS](#tab-panel-3411)
    *   [Tailwind CSS 4.0](#tab-panel-3412)
    *   [Tailwind CSS 3.0](#tab-panel-3413)
    
        <style>body {    font-family: var(--font-roboto);}</style>
    
    src/styles/global.css
    
        @import 'tailwindcss';
        @theme inline {    --font-sans: var(--font-roboto);}
    
    tailwind.config.mjs
    
        /** @type {import("tailwindcss").Config} */export default {content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],theme: {    extend: {},    fontFamily: {        sans: ["var(--font-roboto)"]    }},plugins: []};
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Available remote font providers
-------------------------------

[Section titled Available remote font providers](#available-remote-font-providers)

Astro re-exports most [unifont](https://github.com/unjs/unifont/) providers. The following have built-in support:

*   [Adobe](https://fonts.adobe.com/)
*   [Bunny](https://fonts.bunny.net/)
*   [Fontshare](https://www.fontshare.com/)
*   [Fontsource](https://fontsource.org/)
*   [Google](https://fonts.google.com/)

To use a built-in remote provider, configure `provider` with the appropriate value for your chosen font provider:

*   [Adobe](#tab-panel-3414)
*   [Bunny](#tab-panel-3415)
*   [Fontshare](#tab-panel-3416)
*   [Fontsource](#tab-panel-3417)
*   [Google](#tab-panel-3418)

    provider: fontProviders.adobe({ id: process.env.ADOBE_ID })

    provider: fontProviders.bunny()

    provider: fontProviders.fontshare()

    provider: fontProviders.fontsource()

    provider: fontProviders.google()

Additionally, the `google()` font provider accepts all options available for the [unifont Google `ProviderOption`](https://github.com/unjs/unifont/blob/main/src/providers/google.ts#L10-L26):

    provider: fontProviders.google({  glyphs: {    Roboto: ["a"]  }})

You can also [make a custom Astro font provider](#build-your-own-font-provider) for any unifont provider.

Usage examples
--------------

[Section titled Usage examples](#usage-examples)

astro.config.mjs

    import { defineConfig, fontProviders } from "astro/config";
    export default defineConfig({  experimental: {    fonts: [      {        name: "Roboto",        cssVariable: "--font-roboto"        provider: fontProviders.google(),        // Default included:        // weights: [400] ,        // styles: ["normal", "italics"],        // subsets: ["cyrillic-ext", "cyrillic", "greek-ext", "greek", "vietnamese", "latin-ext", "latin"],        // fallbacks: ["sans-serif"],      },      {        name: "Inter",        cssVariable: "--font-inter",        provider: fontProviders.fontsource(),        // Specify weights that are actually used        weights: [400, 500, 600, 700],        // Specify styles that are actually used        styles: ["normal"],        // Download only font files for characters used on the page        subsets: ["cyrillic"],      },      {        name: "JetBrains Mono",        cssVariable: "--font-jetbrains-mono",        provider: fontProviders.fontsource(),        // Download only font files for characters used on the page        subsets: ["latin"],        // Use a fallback font family matching the intended appearance        fallbacks: ["monospace"],      },      {        name: "Poppins",        cssVariable: "--font-poppins",        provider: "local",        // Weight and style are not specified so Astro        // will try to infer them for each variant        variants: [          {            src: [              "./src/assets/fonts/Poppins-regular.woff2",              "./src/assets/fonts/Poppins-regular.woff",            ]          },          {            src: [              "./src/assets/fonts/Poppins-bold.woff2",              "./src/assets/fonts/Poppins-bold.woff",            ]          },        ]      }    ],  }});

`<Font />` component reference
------------------------------

[Section titled &lt;Font /&gt; component reference](#font--component-reference)

This component outputs style tags and can optionally output preload links for a given font family.

It must be imported and added to your page `<head>`. This is commonly done in a component such as `Head.astro` that is used in a common site layout for global use but may be added to individual pages as needed.

With this component, you have control over which font family is used on which page, and which fonts are preloaded.

### cssVariable

[Section titled cssVariable](#cssvariable)

**Example type:** `"--font-roboto" | "--font-comic-sans" | ...`

The [`cssVariable`](#cssvariable-1) registered in your Astro configuration:

src/components/Head.astro

    ---import { Font } from 'astro:assets';---
    <Font cssVariable="--font-roboto" />

### preload

[Section titled preload](#preload)

**Type:** `boolean`  
**Default:** `false`

Whether to output [preload links](https://web.dev/learn/performance/optimize-web-fonts#preload) or not:

src/components/Head.astro

    ---import { Font } from 'astro:assets';---
    <Font cssVariable="--font-roboto" preload />

Font configuration reference
----------------------------

[Section titled Font configuration reference](#font-configuration-reference)

All properties of your fonts must be configured in the Astro config. Some properties are common to both remote and local fonts, and other properties are available depending on your chosen font provider.

### Common properties

[Section titled Common properties](#common-properties)

The following properties are available for remote and local fonts. `provider`, `name`, and `cssVariable` are required.

astro.config.mjs

    import { defineConfig, fontProviders } from "astro/config";
    export default defineConfig({  experimental: {    fonts: [{      provider: fontProviders.google(),      name: "Roboto",      cssVariable: "--font-roboto"    }]  }});

#### provider

[Section titled provider](#provider)

**Type:** `AstroFontProvider | "local"`

The source of your font files. You can use a [built-in provider](#available-remote-font-providers), write your own [custom provider](#build-your-own-font-provider), or set to `"local"` to use local font files:

astro.config.mjs

    import { defineConfig, fontProviders } from "astro/config";
    export default defineConfig({  experimental: {    fonts: [{      provider: fontProviders.google(),      name: "Roboto",      cssVariable: "--font-roboto"    }]  }});

#### name

[Section titled name](#name)

**Type:** `string`

The font family name, as identified by your font provider:

    name: "Roboto"

#### cssVariable

[Section titled cssVariable](#cssvariable-1)

**Type:** `string`

A valid [ident](https://developer.mozilla.org/en-US/docs/Web/CSS/ident) of your choosing in the form of a CSS variable (i.e. starting with `--`):

    cssVariable: "--font-roboto"

#### fallbacks

[Section titled fallbacks](#fallbacks)

**Type:** `string[]`  
**Default:** `["sans-serif"]`

An array of fonts to use when your chosen font is unavailable, or loading. Fallback fonts will be chosen in the order listed. The first available font will be used:

    fallbacks: ["CustomFont", "serif"]

To disable fallback fonts completely, configure an empty array:

    fallbacks: []

Specify at least a [generic family name](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family#generic-name) matching the intended appearance of your font. Astro will then attempt to generate [optimized fallbacks](https://developer.chrome.com/blog/font-fallbacks) using font metrics. To disable this optimization, set `optimizedFallbacks` to false.

#### optimizedFallbacks

[Section titled optimizedFallbacks](#optimizedfallbacks)

**Type:** `boolean`  
**Default:** `true`

Whether or not to enable Astro’s default optimization when generating fallback fonts. You may disable this default optimization to have full control over how [`fallbacks`](#fallbacks) are generated:

    optimizedFallbacks: false

### Remote font properties

[Section titled Remote font properties](#remote-font-properties)

Further configuration options are available for remote fonts. Set these to customize the data loaded from your [font provider](#available-remote-font-providers), for example to only download certain font weights or styles.

Under the hood, these options are handled by [unifont](https://github.com/unjs/unifont/). Some properties may not be supported by some providers and may be handled differently by each provider.

#### weights

[Section titled weights](#weights)

**Type:** `(number | string)[]`  
**Default:** `[400]`

An array of [font weights](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight). If no value is specified in your configuration, only weight `400` is included by default to prevent unnecessary downloads. You will need to include this property to access any other font weights:

    weights: [200, "400", "bold"]

If the associated font is a [variable font](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide), you can specify a range of weights:

    weights: ["100 900"]

#### styles

[Section titled styles](#styles)

**Type:** `("normal" | "italic" | "oblique")[]`  
**Default:** `["normal", "italic"]`

An array of [font styles](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style):

    styles: ["normal", "oblique"]

#### subsets

[Section titled subsets](#subsets)

**Type:** `string[]`  
**Default:** `["cyrillic-ext", "cyrillic", "greek-ext", "greek", "vietnamese", "latin-ext", "latin"]`

Defines a list of [font subsets](https://knaap.dev/posts/font-subsetting/) to preload.

    subsets: ["latin"]

#### display

[Section titled display](#display)

**Type:** `"auto" | "block" | "swap" | "fallback" | "optional"`  
**Default:** `"swap"`

Defines [how a font displays](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) based on when it is downloaded and ready for use:

    display: "block"

#### unicodeRange

[Section titled unicodeRange](#unicoderange)

**Type:** `string[]`  
**Default:** `undefined`

Determines when a font must be downloaded and used based on a specific [range of unicode characters](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range). If a character on the page matches the configured range, the browser will download the font and all characters will be available for use on the page. To configure a subset of characters preloaded for a single font, see the [subsets](#subsets) property instead.

This can be useful for localization to avoid unnecessary font downloads when a specific part of your website uses a different alphabet and will be displayed with a separate font. For example, a website that offers both English and Japanese versions can prevent the browser from downloading the Japanese font on English versions of the page that do not contain any of the Japanese characters provided in `unicodeRange`.

    unicodeRange: ["U+26"]

#### stretch

[Section titled stretch](#stretch)

**Type:** `string`  
**Default:** `undefined`

A [font stretch](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-stretch):

    stretch: "condensed"

#### featureSettings

[Section titled featureSettings](#featuresettings)

**Type:** `string`  
**Default:** `undefined`

Controls the [typographic font features](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-feature-settings) (e.g. ligatures, small caps, or swashes):

    featureSettings: "'smcp' 2"

#### variationSettings

[Section titled variationSettings](#variationsettings)

**Type:** `string`  
**Default:** `undefined`

Font [variation settings](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-variation-settings):

    variationSettings: "'xhgt' 0.7"

### Local font `variants`

[Section titled Local font variants](#local-font-variants)

**Type:** `LocalFontFamily["variants"]`

The `variants` property is required when using local font files. Each variant represents a [`@font-face` declaration](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/) and requires a `weight`, `style`, and `src` value.

Additionally, [some other properties of remote fonts](#other-properties) may be specified within each variant.

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({    experimental: {        fonts: [{            provider: "local",            name: "Custom",            cssVariable: "--font-custom",            variants: [                {                    weight: 400,                    style: "normal",                    src: ["./src/assets/fonts/custom-400.woff2"]                },                {                    weight: 700,                    style: "normal",                    src: ["./src/assets/fonts/custom-700.woff2"]                }                // ...            ]        }]    }});

#### weight

[Section titled weight](#weight)

**Type:** `number | string`  
**Default:** `undefined`

A [font weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight):

    weight: 200

If the associated font is a [variable font](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide), you can specify a range of weights:

    weight: "100 900"

When the value is not set, by default Astro will try to infer the value based on the first [`source`](#src).

#### style

[Section titled style](#style)

**Type:** `"normal" | "italic" | "oblique"`  
**Default:** `undefined`

A [font style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style):

    style: "normal"

When the value is not set, by default Astro will try to infer the value based on the first [`source`](#src).

#### src

[Section titled src](#src)

**Type:** `(string | URL | { url: string | URL; tech?: string })[]`

Font [sources](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src). It can be a path relative to the root, a package import or a URL. URLs are particularly useful if you inject local fonts through an integration:

*   [Relative path](#tab-panel-3419)
*   [URL](#tab-panel-3420)
*   [Package import](#tab-panel-3421)

    src: ["./src/assets/fonts/MyFont.woff2", "./src/assets/fonts/MyFont.woff"]

    src: [new URL("./custom.ttf", import.meta.url)]

    src: ["my-package/SomeFont.ttf"]

Caution

We recommend not putting your font files in [the `public/` directory](/en/reference/configuration-reference/#publicdir). Since Astro will copy these files into that folder at build time, this will result in duplicated files in your build output. Instead, store them somewhere else in your project, such as in [`src/`](/en/reference/configuration-reference/#srcdir).

You can also specify a [tech](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src#tech) by providing objects:

    src: [{ url:"./src/assets/fonts/MyFont.woff2", tech: "color-COLRv1" }]

#### Other properties

[Section titled Other properties](#other-properties)

The following options from remote font families are also available for local font families within variants:

*   [display](#display)
*   [unicodeRange](#unicoderange)
*   [stretch](#stretch)
*   [featureSettings](#featuresettings)
*   [variationSettings](#variationsettings)

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({    experimental: {        fonts: [{            provider: "local",            name: "Custom",            cssVariable: "--font-custom",            variants: [                {                    weight: 400,                    style: "normal",                    src: ["./src/assets/fonts/custom-400.woff2"],                    display: "block"                }            ]        }]    }});

Build your own font provider
----------------------------

[Section titled Build your own font provider](#build-your-own-font-provider)

If you do not wish to use one of the [built-in providers](#available-remote-font-providers) (eg. you want to use a 3rd-party unifont provider or build something for a private registry), you can build your own.

An Astro font provider is made up of two parts: the config object and the actual implementation.

1.  Using the `defineAstroFontProvider()` type helper, create a function that returns a font provider config object containing:
    
    *   `entrypoint`: A URL, a path relative to the root, or a package import.
    *   `config`: An optional serializable object passed to the unifont provider.
    
    *   [Without config](#tab-panel-3422)
    *   [With config](#tab-panel-3423)
    
    provider/config.ts
    
        import { defineAstroFontProvider } from 'astro/config';
        export function myProvider() {    return defineAstroFontProvider({        entrypoint: new URL('./implementation.js', import.meta.url)    });};
    
    provider/config.ts
    
        import { defineAstroFontProvider } from 'astro/config';
        interface Config {    // ...};
        export function myProvider(config: Config) {    return defineAstroFontProvider({        entrypoint: new URL('./implementation.js', import.meta.url),        config    });};
    
2.  Create a second file to export your unifont `provider` implementation:
    
    implementation.ts
    
        import { defineFontProvider } from "unifont";
        export const provider = defineFontProvider("my-provider", async (options, ctx) => {    // fetch/define your custom fonts    // ...});
    
    Tip
    
    You can check out [the source code for unifont’s providers](https://github.com/unjs/unifont/blob/main/src/providers/) to learn more about how to create a unifont provider.
    
3.  Add your custom provider to your font configuration.
    
    astro.config.mjs
    
        fonts: [{  provider: fontProviders.myProvider(),  name: "Custom Font",  cssVariable: "--font-custom" }]
    

Caching
-------

[Section titled Caching](#caching)

The Fonts API caching implementation was designed to be practical in development and efficient in production. During builds, font files are copied to the `_astro/fonts` output directory, so they can benefit from HTTP caching of static assets (usually a year).

To clear the cache in development, remove the `.astro/fonts` directory. To clear the build cache, remove the `node_modules/.astro/fonts` directory

Further reading
---------------

[Section titled Further reading](#further-reading)

For full details and to give feedback on this experimental API, see [the Fonts RFC](https://github.com/withastro/roadmap/blob/rfc/fonts/proposals/0052-fonts.md).

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/fonts.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Responsive images](/en/reference/experimental-flags/responsive-images/) [Next  
Client prerendering](/en/reference/experimental-flags/client-prerender/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/experimental-flags/heading-id-compat
Experimental Markdown heading ID compatibility
==============================================

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@5.5.0`

The `experimental.headingIdCompat` flag makes the IDs generated by Astro for Markdown headings compatible with common platforms like GitHub and npm.

To enable heading ID compatibility, set the flag to `true` in your Astro configuration:

astro.config.mjs

    import { defineConfig } from "astro/config"
    export default defineConfig({  experimental: {    headingIdCompat: true,  }})

Usage
-----

[Section titled Usage](#usage)

This experimental flag allows you to retain the trailing hyphens on the end of IDs for Markdown headings ending in special characters, creating IDs compatible with those generated by other common platforms. It requires no specific usage and only affects how Astro generates the `id` for your headings written using Markdown syntax.

Astro, like many platforms, uses the popular [`github-slugger`](https://github.com/Flet/github-slugger) package to convert the text content of a Markdown heading to a slug to use in IDs. This experimental flag allows you to omit Astro’s additional default processing step that strips a trailing hyphen from the end of IDs for headings ending in special characters.

For example, the following Markdown heading:

    ## `<Picture />`

will generate the following HTML in Astro by default:

    <h2 id="picture"><code>&lt;Picture /&gt;</h2>

Using `experimental.headingIdCompat`, the same Markdown will generate the following HTML, which is identical to that of platforms such as GitHub:

    <h2 id="picture-"><code>&lt;Picture /&gt;</h2>

In a future major version, Astro will switch to use the compatible ID style by default, but you can opt in to the future behavior early using the `experimental.headingIdCompat` flag.

Usage with `rehypeHeadingIds` plugin
------------------------------------

[Section titled Usage with rehypeHeadingIds plugin](#usage-with-rehypeheadingids-plugin)

If you are [using the `rehypeHeadingIds` plugin](/en/guides/markdown-content/#heading-ids-and-plugins) directly, opt in to the compatibility mode when passing the plugin in your Astro configuration:

astro.config.mjs

    import { defineConfig } from 'astro/config';import { rehypeHeadingIds } from '@astrojs/markdown-remark';import { otherPluginThatReliesOnHeadingIDs } from 'some/plugin/source';
    export default defineConfig({  markdown: {    rehypePlugins: [      [rehypeHeadingIds, { headingIdCompat: true }],      otherPluginThatReliesOnHeadingIDs,    ],  },});

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/heading-id-compat.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Preserve scripts order](/en/reference/experimental-flags/preserve-scripts-order/) [Next  
Legacy flags](/en/reference/legacy-flags/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/experimental-flags/preserve-scripts-order
Experimental preserve scripts order
===================================

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@5.5.0`

Renders multiple `<style>` and `<script>` tags in the same order as they were declared in the source code.

To enable this behavior, add the `experimental.preserveScriptOrder` feature flag to your Astro config:

astro.config.mjs

    import { defineConfig } from "astro/config"
    export default defineConfig({  experimental: {    preserveScriptOrder: true  }})

Usage
-----

[Section titled Usage](#usage)

This experimental flag requires no specific usage and only affects the order in which Astro renders your styles and scripts.

When rendering multiple `<style>` and `<script>` tags on the same page, Astro currently reverses their order in your generated HTML output. This can give unexpected results, for example, CSS styles being overridden by earlier defined style tags when your site is built. This experimental flag instead renders `<script>` and `<style>` tags in the order they are defined.

For example, the following component has two `<style>` tags and two `<script>` tags:

src/components/MyComponent.astro

    <p>I am a component</p><style>  body {    background: red;  }</style><style>  body {    background: yellow;  }</style><script>    console.log("hello")</script><script>    console.log("world!")</script>

After compiling, Astro’s default behavior will create an inline style where `yellow` appears first, and then `red`. This means the `red` background is applied. Similarly with the two scripts, the word `world!` is logged first, and then `hello` second:

    body {background:#ff0} body {background:red}

    console.log("world!")console.log("hello")

When `experimental.preserveScriptOrder` is set to `true`, the rendering order of `<style>` and `<script>` tags matches the order in which they are written. For the same example component, the style generated `red` appears first, and then `yellow`; as for the scripts, `hello` is logged first, and then `world!`:

    body {background:red} body {background:#ff0}

    console.log("hello")console.log("world!")

In a future major version, Astro will preserve style and script order by default, but you can opt in to the future behavior early using the `experimental.preserveScriptOrder` flag.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/preserve-scripts-order.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Intellisense for collections](/en/reference/experimental-flags/content-intellisense/) [Next  
Markdown heading ID compatibility](/en/reference/experimental-flags/heading-id-compat/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/reference/experimental-flags/responsive-images
Experimental responsive images
==============================

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@5.0.0`

Enables support for automatic responsive images in your project.

The term [responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images) refers images that work well on different devices. This particularly applies to images that resize to fit their container, and that can be served in different sizes depending on the device’s screen size and resolution.

There are a number of additional properties that can be set to control how the image is displayed, but these can be complicated to handle manually. Incorrect handling of these properties can lead to images that are slow to download or that are not displayed correctly. This is one of the most common causes of poor Core Web Vitals and Lighthouse performance scores.

When this flag is enabled, Astro can automatically generate the required `srcset` and `sizes` values for images, and apply the correct styles to ensure they resize correctly. This behavior can be configured globally or on a per-image basis.

To enable the feature, first add the `responsiveImages` flag to your `astro.config.mjs` file:

astro.config.mjs

    {  experimental: {    responsiveImages: true,  },}

Enabling this flag will not change anything by default, but responsive images can then be configured by setting the [image layout](#image-layout) either globally or per image.

To do this, you have access to additional [`image` configuration settings](#configuration-settings) for controlling the default behavior of all images processed and optimized by Astro:

*   Local and remote images using [the Markdown `![]()` syntax](/en/guides/images/#images-in-markdown-files).
*   The [`<Image />`](/en/guides/images/#display-optimized-images-with-the-image--component) and [`<Picture />`](/en/guides/images/#create-responsive-images-with-the-picture--component) components.

Additionally, Astro’s image components can receive [responsive image props](#responsive-image-properties) to override these defaults on a per-image basis.

Images in your `public/` folder are never optimized, and responsive images are not supported.

Note

Enabling responsive images will generate additional image sizes for all affected images. For prerendered pages this happens during the build so may increase the build time of your project, especially if you have a large number of images.

For pages rendered on-demand the images are generated as-needed, so this has no impact on build times but may increase the number of transformations performed. Depending on your image service this may incur additional costs.

Image layout
------------

[Section titled Image layout](#image-layout)

In order to generate the correct `srcset` and `sizes` attributes, the `<Image />` and `<Picture />` components need to know how the image should resize when its container changes size. This is done by setting the `layout` prop, or `image.experimentalLayout` default. The supported values are:

*   `constrained` - The image will scale down to fit the container, maintaining its aspect ratio, but will not scale up beyond the specified `width` and `height`, or the image’s original dimensions. Use this if you want the image to display at the requested size where possible, but shrink to fit smaller screens. This matches the default behavior for images when using Tailwind. If you’re not sure, this is probably the layout you should choose.
*   `full-width` - The image will scale to fit the width of the container, maintaining its aspect ratio. Use this for hero images or other images that should take up the full width of the page.
*   `fixed` - The image will maintain the requested dimensions and not resize. It will generate a `srcset` to support high density displays, but not for different screen sizes. Use this if the image will not resize, for example icons or logos smaller than any screen width, or other images in a fixed-width container.
*   `none` - The image will not be responsive. No `srcset` or `sizes` will be automatically generated, and no styles will be applied. This is useful if you have enabled a default layout, but want to disable it for a specific image.

The chosen `layout` will be used to generate the correct `srcset` and `sizes` attributes for the image, and will define the default styles applied to that `<img>` tag.

Configuration settings
----------------------

[Section titled Configuration settings](#configuration-settings)

Set [`image.experimentalLayout`](/en/reference/configuration-reference/#imageexperimentallayout) with a default value to enable responsive images throughout your project.

If this value is not configured, you can still pass a `layout` prop to any `<Image />` or `<Picture />` component to create a responsive image. However, Markdown images will not be responsive.

Optionally, you can configure [`image.experimentalObjectFit`](/en/reference/configuration-reference/#imageexperimentalobjectfit) and [`image.experimentalObjectPosition`](/en/reference/configuration-reference/#imageexperimentalobjectposition) which will apply to all processed images by default.

Each of these settings can be overridden on any individual `<Image />` or `<Picture />` component with a prop, but Markdown images will always use the default settings.

astro.config.mjs

    {  image: {    // Used for all Markdown images; not configurable per-image    // Used for all `<Image />` and `<Picture />` components unless overridden with a prop    experimentalLayout: 'constrained',  },  experimental: {    responsiveImages: true,  },}

Responsive image properties
---------------------------

[Section titled Responsive image properties](#responsive-image-properties)

These are additional properties available to the `<Image />` and `<Picture />` components when responsive images are enabled:

*   `layout`: The [layout type](#image-layout) for the image. Can be `constrained`, `fixed`, `full-width`, or `none`. If set to `none`, responsive behavior is disabled for this image and all other options are ignored. Defaults to `none`, or the value of [`image.experimentalLayout`](/en/reference/configuration-reference/#imageexperimentallayout) if set.
*   `fit`: Defines how the image should be cropped if the aspect ratio is changed. Values match those of CSS `object-fit`. Defaults to `cover`, or the value of [`image.experimentalObjectFit`](/en/reference/configuration-reference/#imageexperimentalobjectfit) if set.
*   `position`: Defines the position of the image crop if the aspect ratio is changed. Values match those of CSS `object-position`. Defaults to `center`, or the value of [`image.experimentalObjectPosition`](/en/reference/configuration-reference/#imageexperimentalobjectposition) if set.
*   `priority`: If set, eagerly loads the image. Otherwise, images will be lazy-loaded. Use this for your largest above-the-fold image. Defaults to `false`.

The `widths` and `sizes` attributes are automatically generated based on the image’s dimensions and the layout type, and in most cases should not be set manually. The generated `sizes` attribute for `constrained` and `full-width` images is based on the assumption that the image is displayed at close to the full width of the screen when the viewport is smaller than the image’s width. If it is significantly different (e.g. if it’s in a multi-column layout on small screens) you may need to adjust the `sizes` attribute manually for best results.

The `densities` attribute is not compatible with responsive images and will be ignored if set.

For example, with `constrained` set as the default layout, you can override any individual image’s `layout` property:

    ---import { Image } from 'astro:assets';import myImage from '../assets/my_image.png';---<Image src={myImage} alt="This will use responsive layout" width={800} height={600} /><Image src={myImage} alt="This will use full-width layout" layout="full-width" /><Image src={myImage} alt="This will disable responsive images" layout="none" />

Generated HTML output for responsive images
-------------------------------------------

[Section titled Generated HTML output for responsive images](#generated-html-output-for-responsive-images)

When a layout is set, either by default or on an individual component, images have automatically generated `srcset` and `sizes` attributes based on the image’s dimensions and the layout type. Images with `constrained` and `full-width` layouts will have styles applied to ensure they resize according to their container.

MyComponent.astro

    ---import { Image, Picture } from 'astro:assets';import myImage from '../assets/my_image.png';---<Image src={myImage} alt="A description of my image." layout='responsive' width={800} height={600} /><Picture src={myImage} alt="A description of my image." layout='full-width' formats={['avif', 'webp', 'jpeg']} />

This `<Image />` component will generate the following HTML output:

    <img  src="/_astro/my_image.hash3.webp"  srcset="/_astro/my_image.hash1.webp 640w,      /_astro/my_image.hash2.webp 750w,      /_astro/my_image.hash3.webp 800w,      /_astro/my_image.hash4.webp 828w,      /_astro/my_image.hash5.webp 1080w,      /_astro/my_image.hash6.webp 1280w,      /_astro/my_image.hash7.webp 1600w"  alt="A description of my image"  sizes="(min-width: 800px) 800px, 100vw"  loading="lazy"  decoding="async"  fetchpriority="auto"  width="800"  height="600"  style="--fit: cover; --pos: center;"  data-astro-image="constrained">

Overriding image styles
-----------------------

[Section titled Overriding image styles](#overriding-image-styles)

The responsive image component applies a small number of styles to ensure they resize correctly. The applied styles depend on the layout type, and are designed to give the best behavior for the generated `srcset` and `sizes` attributes. These are the default styles:

Responsive Image Styles

    :where([data-astro-image]) {  object-fit: var(--fit);  object-position: var(--pos);}:where([data-astro-image='full-width']) {  width: 100%;}:where([data-astro-image='constrained']) {  max-width: 100%;}

You can override the `object-fit` and `object-position` styles by setting the `fit` and `position` props on the `<Image />` or `<Picture />` component.

The styles use the [`:where()` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:where), which has a [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity) of 0, meaning that it is easy to override with your own styles. Any class or tag name will have a higher specificity than `:where()`, so you can easily override the styles by adding your own class or tag name to the image.

Tailwind 4 is a special case, because it uses [cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), meaning the Tailwind rules are always lower specificity than rules that don’t use layers. Astro supports browsers that do not support cascade layers, so it cannot use them for images. This means that if you need to override the styles using Tailwind 4, you must use [the `!important` modifier](https://tailwindcss.com/docs/styling-with-utility-classes#using-the-important-modifier).

For a complete overview, and to give feedback on this experimental API, see the [Responsive Images RFC](https://github.com/withastro/roadmap/blob/responsive-images/proposals/0053-responsive-images.md).

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/responsive-images.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Configuring experimental flags](/en/reference/experimental-flags/) [Next  
Fonts](/en/reference/experimental-flags/fonts/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



