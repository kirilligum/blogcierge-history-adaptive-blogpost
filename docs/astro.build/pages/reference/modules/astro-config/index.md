Config imports API Reference
============================

**Added in:** `astro@5.7.0`

This virtual module `astro:config` exposes a non-exhaustive, serializable, type-safe version of the Astro configuration. There are two submodules for accessing different subsets of your configuration values: [`/client`](#imports-from-astroconfigclient) and [`/server`](#imports-from-astroconfigserver).

All available config values can be accessed from `astro:config/server`. However, for code executed on the client, only those values exposed by `astro:config/client` will be available. This protects your information by only making some data available to the client.

Imports from `astro:config/client`
----------------------------------

[Section titled Imports from astro:config/client](#imports-from-astroconfigclient)

    import {  i18n,  trailingSlash,  base,  build,  site,} from "astro:config/client";

Use this submodule for client-side code:

src/utils.js

    import { trailingSlash } from "astro:config/client";
    function addForwardSlash(path) {  if (trailingSlash === "always") {    return path.endsWith("/") ? path : path + "/"  } else {    return path  }}

See more about the configuration imports available from `astro:config/client`:

*   [`i18n`](/en/reference/configuration-reference/#i18n)
*   [`trailingSlash`](/en/reference/configuration-reference/#trailingslash)
*   [`base`](/en/reference/configuration-reference/#base)
*   [`build.format`](/en/reference/configuration-reference/#buildformat)
*   [`site`](/en/reference/configuration-reference/#site)

Imports from `astro:config/server`
----------------------------------

[Section titled Imports from astro:config/server](#imports-from-astroconfigserver)

    import {  i18n,  trailingSlash,  base,  build,  site,  srcDir,  cacheDir,  outDir,  publicDir,  root,} from "astro:config/server";

These imports include everything available from `astro:config/client` as well as additional sensitive information about your file system configuration that is not safe to expose to the client.

Use this submodule for server side code:

astro.config.mjs

    import { integration } from "./integration.mjs";
    export default defineConfig({    integrations: [      integration(),    ]});

integration.mjs

    import { outDir } from "astro:config/server";import { writeFileSync } from "node:fs";import { fileURLToPath } from "node:url";
    export default function() {  return {    name: "internal-integration",    hooks: {      "astro:build:done": () => {        let file = new URL("result.json", outDir);        // generate data from some operation        let data = JSON.stringify([]);        writeFileSync(fileURLToPath(file), data, "utf-8");      }    }  }}

See more about the configuration imports available from `astro:config/server`:

*   [`i18n`](/en/reference/configuration-reference/#i18n)
*   [`trailingSlash`](/en/reference/configuration-reference/#trailingslash)
*   [`base`](/en/reference/configuration-reference/#base)
*   [`build.format`](/en/reference/configuration-reference/#buildformat)
*   [`build.client`](/en/reference/configuration-reference/#buildclient)
*   [`build.server`](/en/reference/configuration-reference/#buildserver)
*   [`build.serverEntry`](/en/reference/configuration-reference/#buildserverentry)
*   [`build.assetsPrefix`](/en/reference/configuration-reference/#buildassetsprefix)
*   [`site`](/en/reference/configuration-reference/#site)
*   [`srcDir`](/en/reference/configuration-reference/#srcdir)
*   [`cacheDir`](/en/reference/configuration-reference/#cachedir)
*   [`outDir`](/en/reference/configuration-reference/#outdir)
*   [`publicDir`](/en/reference/configuration-reference/#publicdir)
*   [`root`](/en/reference/configuration-reference/#root)

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/modules/astro-config.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
astro:assets](/en/reference/modules/astro-assets/) [Next  
astro:content](/en/reference/modules/astro-content/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)