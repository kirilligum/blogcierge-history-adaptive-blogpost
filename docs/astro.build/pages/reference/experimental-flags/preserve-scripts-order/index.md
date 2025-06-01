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