Configuration Reference
=======================

The following reference covers all supported configuration options in Astro. To learn more about configuring Astro, read our guide on [Configuring Astro](/en/guides/configuring-astro/).

astro.config.mjs

    import { defineConfig } from 'astro/config'
    export default defineConfig({  // your configuration options here...})

Top-Level Options
-----------------

[Section titled Top-Level Options](#top-level-options)

### site

[Section titled site](#site)

**Type:** `string`

Your final, deployed URL. Astro uses this full URL to generate your sitemap and canonical URLs in your final build. It is strongly recommended that you set this configuration to get the most out of Astro.

    {  site: 'https://www.my-site.dev'}

### base

[Section titled base](#base)

**Type:** `string`

The base path to deploy to. Astro will use this path as the root for your pages and assets both in development and in production build.

In the example below, `astro dev` will start your server at `/docs`.

    {  base: '/docs'}

When using this option, all of your static asset imports and URLs should add the base as a prefix. You can access this value via `import.meta.env.BASE_URL`.

The value of `import.meta.env.BASE_URL` will be determined by your `trailingSlash` config, no matter what value you have set for `base`.

A trailing slash is always included if `trailingSlash: "always"` is set. If `trailingSlash: "never"` is set, `BASE_URL` will not include a trailing slash, even if `base` includes one.

Additionally, Astro will internally manipulate the configured value of `config.base` before making it available to integrations. The value of `config.base` as read by integrations will also be determined by your `trailingSlash` configuration in the same way.

In the example below, the values of `import.meta.env.BASE_URL` and `config.base` when processed will both be `/docs`:

    {   base: '/docs/',   trailingSlash: "never"}

In the example below, the values of `import.meta.env.BASE_URL` and `config.base` when processed will both be `/docs/`:

    {   base: '/docs',   trailingSlash: "always"}

### trailingSlash

[Section titled trailingSlash](#trailingslash)

**Type:** `'always' | 'never' | 'ignore'`  
**Default:** `'ignore'`

Set the route matching behavior for trailing slashes in the dev server and on-demand rendered pages. Choose from the following options:

*   `'ignore'` - Match URLs regardless of whether a trailing ”/” exists. Requests for “/about” and “/about/” will both match the same route.
*   `'always'` - Only match URLs that include a trailing slash (e.g: “/about/”). In production, requests for on-demand rendered URLs without a trailing slash will be redirected to the correct URL for your convenience. However, in development, they will display a warning page reminding you that you have `always` configured.
*   `'never'` - Only match URLs that do not include a trailing slash (e.g: “/about”). In production, requests for on-demand rendered URLs with a trailing slash will be redirected to the correct URL for your convenience. However, in development, they will display a warning page reminding you that you have `never` configured.

When redirects occur in production for GET requests, the redirect will be a 301 (permanent) redirect. For all other request methods, it will be a 308 (permanent, and preserve the request method) redirect.

Trailing slashes on prerendered pages are handled by the hosting platform, and may not respect your chosen configuration. See your hosting platform’s documentation for more information. You cannot use Astro [redirects](#redirects) for this use case at this point.

    {  // Example: Require a trailing slash during development  trailingSlash: 'always'}

**See Also:**

*   build.format

### redirects

[Section titled redirects](#redirects)

**Type:** `Record<string, RedirectConfig>`  
**Default:** `{}`  

**Added in:** `astro@2.9.0`

Specify a mapping of redirects where the key is the route to match and the value is the path to redirect to.

You can redirect both static and dynamic routes, but only to the same kind of route. For example, you cannot have a `'/article': '/blog/[...slug]'` redirect.

    export default defineConfig({  redirects: {   '/old': '/new',   '/blog/[...slug]': '/articles/[...slug]',   '/about': 'https://example.com/about',   '/news': {     status: 302,     destination: 'https://example.com/news'   },   // '/product1/', '/product1' // Note, this is not supported  }})

For statically-generated sites with no adapter installed, this will produce a client redirect using a [`<meta http-equiv="refresh">` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#http-equiv) and does not support status codes.

When using SSR or with a static adapter in `output: static` mode, status codes are supported. Astro will serve redirected GET requests with a status of `301` and use a status of `308` for any other request method.

You can customize the [redirection status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages) using an object in the redirect config:

    export default defineConfig({  redirects: {    '/other': {      status: 302,      destination: '/place',    },  }})

### output

[Section titled output](#output)

**Type:** `'static' | 'server'`  
**Default:** `'static'`

Specifies the output target for builds.

*   `'static'` - Prerender all your pages by default, outputting a completely static site if none of your pages opt out of prerendering.
*   `'server'` - Use server-side rendering (SSR) for all pages by default, always outputting a server-rendered site.

    import { defineConfig } from 'astro/config';
    export default defineConfig({  output: 'static'})

**See Also:**

*   adapter

### adapter

[Section titled adapter](#adapter)

**Type:** `AstroIntegration`

Deploy to your favorite server, serverless, or edge host with build adapters. Import one of our first-party adapters ([Cloudflare](/en/guides/integrations-guide/cloudflare/), [Netlify](/en/guides/integrations-guide/netlify/), [Node.js](/en/guides/integrations-guide/node/), [Vercel](/en/guides/integrations-guide/vercel/)) or explore [community adapters](https://astro.build/integrations/2/?search=&categories%5B%5D=adapters) to enable on-demand rendering in your Astro project.

See our [on-demand rendering guide](/en/guides/on-demand-rendering/) for more on Astro’s server rendering options.

    import netlify from '@astrojs/netlify';{  // Example: Build for Netlify serverless deployment  adapter: netlify(),}

**See Also:**

*   output

### integrations

[Section titled integrations](#integrations)

**Type:** `AstroIntegration[]`

Extend Astro with custom integrations. Integrations are your one-stop-shop for adding framework support (like Solid.js), new features (like sitemaps), and new libraries (like Partytown).

Read our [Integrations Guide](/en/guides/integrations-guide/) for help getting started with Astro Integrations.

    import react from '@astrojs/react';import mdx from '@astrojs/mdx';{  // Example: Add React + MDX support to Astro  integrations: [react(), mdx()]}

### root

[Section titled root](#root)

**Type:** `string`  
**CLI:** `--root`  
**Default:** `"."` (current working directory)

You should only provide this option if you run the `astro` CLI commands in a directory other than the project root directory. Usually, this option is provided via the CLI instead of the Astro config file, since Astro needs to know your project root before it can locate your config file.

If you provide a relative path (ex: `--root: './my-project'`) Astro will resolve it against your current working directory.

#### Examples

[Section titled Examples](#examples)

    {  root: './my-project-directory'}

Terminal window

    $ astro build --root ./my-project-directory

### srcDir

[Section titled srcDir](#srcdir)

**Type:** `string`  
**Default:** `"./src"`

Set the directory that Astro will read your site from.

The value can be either an absolute file system path or a path relative to the project root.

    {  srcDir: './www'}

### publicDir

[Section titled publicDir](#publicdir)

**Type:** `string`  
**Default:** `"./public"`

Set the directory for your static assets. Files in this directory are served at `/` during dev and copied to your build directory during build. These files are always served or copied as-is, without transform or bundling.

The value can be either an absolute file system path or a path relative to the project root.

    {  publicDir: './my-custom-publicDir-directory'}

### outDir

[Section titled outDir](#outdir)

**Type:** `string`  
**Default:** `"./dist"`

Set the directory that `astro build` writes your final build to.

The value can be either an absolute file system path or a path relative to the project root.

    {  outDir: './my-custom-build-directory'}

**See Also:**

*   build.server

### cacheDir

[Section titled cacheDir](#cachedir)

**Type:** `string`  
**Default:** `"./node_modules/.astro"`

Set the directory for caching build artifacts. Files in this directory will be used in subsequent builds to speed up the build time.

The value can be either an absolute file system path or a path relative to the project root.

    {  cacheDir: './my-custom-cache-directory'}

### compressHTML

[Section titled compressHTML](#compresshtml)

**Type:** `boolean`  
**Default:** `true`

This is an option to minify your HTML output and reduce the size of your HTML files.

By default, Astro removes whitespace from your HTML, including line breaks, from `.astro` components in a lossless manner. Some whitespace may be kept as needed to preserve the visual rendering of your HTML. This occurs both in development mode and in the final build.

To disable HTML compression, set `compressHTML` to false.

    {  compressHTML: false}

### scopedStyleStrategy

[Section titled scopedStyleStrategy](#scopedstylestrategy)

**Type:** `'where' | 'class' | 'attribute'`  
**Default:** `'attribute'`  

**Added in:** `astro@2.4`

Specify the strategy used for scoping styles within Astro components. Choose from:

*   `'where'` - Use `:where` selectors, causing no specificity increase.
*   `'class'` - Use class-based selectors, causing a +1 specificity increase.
*   `'attribute'` - Use `data-` attributes, causing a +1 specificity increase.

Using `'class'` is helpful when you want to ensure that element selectors within an Astro component override global style defaults (e.g. from a global stylesheet). Using `'where'` gives you more control over specificity, but requires that you use higher-specificity selectors, layers, and other tools to control which selectors are applied. Using `'attribute'` is useful when you are manipulating the `class` attribute of elements and need to avoid conflicts between your own styling logic and Astro’s application of styles.

### security

[Section titled security](#security)

**Type:** `Record<"checkOrigin", boolean> | undefined`  
**Default:** `{checkOrigin: true}`  

**Added in:** `astro@4.9.0`

Enables security measures for an Astro website.

These features only exist for pages rendered on demand (SSR) using `server` mode or pages that opt out of prerendering in `static` mode.

By default, Astro will automatically check that the “origin” header matches the URL sent by each request in on-demand rendered pages. You can disable this behavior by setting `checkOrigin` to `false`:

astro.config.mjs

    export default defineConfig({  output: "server",  security: {    checkOrigin: false  }})

#### security.checkOrigin

[Section titled security.checkOrigin](#securitycheckorigin)

**Type:** `boolean`  
**Default:** `true`  

**Added in:** `astro@4.9.0`

Performs a check that the “origin” header, automatically passed by all modern browsers, matches the URL sent by each `Request`. This is used to provide Cross-Site Request Forgery (CSRF) protection.

The “origin” check is executed only for pages rendered on demand, and only for the requests `POST`, `PATCH`, `DELETE` and `PUT` with one of the following `content-type` headers: `'application/x-www-form-urlencoded'`, `'multipart/form-data'`, `'text/plain'`.

If the “origin” header doesn’t match the `pathname` of the request, Astro will return a 403 status code and will not render the page.

### vite

[Section titled vite](#vite)

**Type:** `ViteUserConfig`

Pass additional configuration options to Vite. Useful when Astro doesn’t support some advanced configuration that you may need.

View the full `vite` configuration object documentation on [vite.dev](https://vite.dev/config/).

#### Examples

[Section titled Examples](#examples-1)

    {  vite: {    ssr: {      // Example: Force a broken package to skip SSR processing, if needed      external: ['broken-npm-package'],    }  }}

    {  vite: {    // Example: Add custom vite plugins directly to your Astro project    plugins: [myPlugin()],  }}

Build Options
-------------

[Section titled Build Options](#build-options)

### build.format

[Section titled build.format](#buildformat)

**Type:** `('file' | 'directory' | 'preserve')`  
**Default:** `'directory'`

Control the output file format of each page. This value may be set by an adapter for you.

*   `'file'`: Astro will generate an HTML file named for each page route. (e.g. `src/pages/about.astro` and `src/pages/about/index.astro` both build the file `/about.html`)
*   `'directory'`: Astro will generate a directory with a nested `index.html` file for each page. (e.g. `src/pages/about.astro` and `src/pages/about/index.astro` both build the file `/about/index.html`)
*   `'preserve'`: Astro will generate HTML files exactly as they appear in your source folder. (e.g. `src/pages/about.astro` builds `/about.html` and `src/pages/about/index.astro` builds the file `/about/index.html`)

    {  build: {    // Example: Generate `page.html` instead of `page/index.html` during build.    format: 'file'  }}

#### Effect on Astro.url

[Section titled Effect on Astro.url](#effect-on-astrourl)

Setting `build.format` controls what `Astro.url` is set to during the build. When it is:

*   `directory` - The `Astro.url.pathname` will include a trailing slash to mimic folder behavior. (e.g. `/foo/`)
*   `file` - The `Astro.url.pathname` will include `.html`. (e.g. `/foo.html`)

This means that when you create relative URLs using `new URL('./relative', Astro.url)`, you will get consistent behavior between dev and build.

To prevent inconsistencies with trailing slash behaviour in dev, you can restrict the [`trailingSlash` option](#trailingslash) to `'always'` or `'never'` depending on your build format:

*   `directory` - Set `trailingSlash: 'always'`
*   `file` - Set `trailingSlash: 'never'`

### build.client

[Section titled build.client](#buildclient)

**Type:** `string`  
**Default:** `'./client'`

Controls the output directory of your client-side CSS and JavaScript when building a website with server-rendered pages. `outDir` controls where the code is built to.

This value is relative to the `outDir`.

    {  output: 'server',  build: {    client: './client'  }}

### build.server

[Section titled build.server](#buildserver)

**Type:** `string`  
**Default:** `'./server'`

Controls the output directory of server JavaScript when building to SSR.

This value is relative to the `outDir`.

    {  build: {    server: './server'  }}

### build.assets

[Section titled build.assets](#buildassets)

**Type:** `string`  
**Default:** `'_astro'`  

**Added in:** `astro@2.0.0`

Specifies the directory in the build output where Astro-generated assets (bundled JS and CSS for example) should live.

    {  build: {    assets: '_custom'  }}

**See Also:**

*   outDir

### build.assetsPrefix

[Section titled build.assetsPrefix](#buildassetsprefix)

**Type:** `string | Record<string, string>`  
**Default:** `undefined`  

**Added in:** `astro@2.2.0`

Specifies the prefix for Astro-generated asset links. This can be used if assets are served from a different domain than the current site.

This requires uploading the assets in your local `./dist/_astro` folder to a corresponding `/_astro/` folder on the remote domain. To rename the `_astro` path, specify a new directory in `build.assets`.

To fetch all assets uploaded to the same domain (e.g. `https://cdn.example.com/_astro/...`), set `assetsPrefix` to the root domain as a string (regardless of your `base` configuration):

    {  build: {    assetsPrefix: 'https://cdn.example.com'  }}

**Added in:** `astro@4.5.0`

You can also pass an object to `assetsPrefix` to specify a different domain for each file type. In this case, a `fallback` property is required and will be used by default for any other files.

    {  build: {    assetsPrefix: {      'js': 'https://js.cdn.example.com',      'mjs': 'https://js.cdn.example.com',      'css': 'https://css.cdn.example.com',      'fallback': 'https://cdn.example.com'    }  }}

### build.serverEntry

[Section titled build.serverEntry](#buildserverentry)

**Type:** `string`  
**Default:** `'entry.mjs'`

Specifies the file name of the server entrypoint when building to SSR. This entrypoint is usually dependent on which host you are deploying to and will be set by your adapter for you.

Note that it is recommended that this file ends with `.mjs` so that the runtime detects that the file is a JavaScript module.

    {  build: {    serverEntry: 'main.mjs'  }}

### build.redirects

[Section titled build.redirects](#buildredirects)

**Type:** `boolean`  
**Default:** `true`  

**Added in:** `astro@2.6.0`

Specifies whether redirects will be output to HTML during the build. This option only applies to `output: 'static'` mode; in SSR redirects are treated the same as all responses.

This option is mostly meant to be used by adapters that have special configuration files for redirects and do not need/want HTML based redirects.

    {  build: {    redirects: false  }}

### build.inlineStylesheets

[Section titled build.inlineStylesheets](#buildinlinestylesheets)

**Type:** `'always' | 'auto' | 'never'`  
**Default:** `auto`  

**Added in:** `astro@2.6.0`

Control whether project styles are sent to the browser in a separate css file or inlined into `<style>` tags. Choose from the following options:

*   `'always'` - project styles are inlined into `<style>` tags
*   `'auto'` - only stylesheets smaller than `ViteConfig.build.assetsInlineLimit` (default: 4kb) are inlined. Otherwise, project styles are sent in external stylesheets.
*   `'never'` - project styles are sent in external stylesheets

    {  build: {    inlineStylesheets: `never`,  },}

### build.concurrency

[Section titled build.concurrency](#buildconcurrency)

**Type:** `number`  
**Default:** `1`  

**Added in:** `astro@4.16.0`

The number of pages to build in parallel.

**In most cases, you should not change the default value of `1`.**

Use this option only when other attempts to reduce the overall rendering time (e.g. batch or cache long running tasks like fetch calls or data access) are not possible or are insufficient. If the number is set too high, page rendering may slow down due to insufficient memory resources and because JS is single-threaded.

    {  build: {    concurrency: 2  }}

Breaking changes possible

This feature is stable and is not considered experimental. However, this feature is only intended to address difficult performance issues, and breaking changes may occur in a [minor release](/en/upgrade-astro/#semantic-versioning) to keep this option as performant as possible. Please check the [Astro CHANGELOG](https://github.com/withastro/astro/blob/refs/heads/next/packages/astro/CHANGELOG.md) for every minor release if you are using this feature.

Server Options
--------------

[Section titled Server Options](#server-options)

Customize the Astro dev server, used by both `astro dev` and `astro preview`.

    {  server: { port: 1234, host: true}}

To set different configuration based on the command run (“dev”, “preview”) a function can also be passed to this configuration option.

    {  // Example: Use the function syntax to customize based on command  server: ({ command }) => ({ port: command === 'dev' ? 4321 : 4000 })}

### server.host

[Section titled server.host](#serverhost)

**Type:** `string | boolean`  
**Default:** `false`  

**Added in:** `astro@0.24.0`

Set which network IP addresses the server should listen on (i.e. non-localhost IPs).

*   `false` - do not expose on a network IP address
*   `true` - listen on all addresses, including LAN and public addresses
*   `[custom-address]` - expose on a network IP address at `[custom-address]` (ex: `192.168.0.1`)

### server.port

[Section titled server.port](#serverport)

**Type:** `number`  
**Default:** `4321`

Set which port the server should listen on.

If the given port is already in use, Astro will automatically try the next available port.

    {  server: { port: 8080 }}

### server.allowedHosts

[Section titled server.allowedHosts](#serverallowedhosts)

**Type:** `Array<string> | true`  
**Default:** `[]`  

**Added in:** `astro@5.4.0`

A list of hostnames that Astro is allowed to respond to. When the value is set to `true`, any hostname is allowed.

    {  server: {    allowedHosts: ['staging.example.com', 'qa.example.com']  }}

### server.open

[Section titled server.open](#serveropen)

**Type:** `string | boolean`  
**Default:** `false`  

**Added in:** `astro@4.1.0`

Controls whether the dev server should open in your browser window on startup.

Pass a full URL string (e.g. “[http://example.com](http://example.com)”) or a pathname (e.g. “/about”) to specify the URL to open.

    {  server: { open: "/about" }}

### server.headers

[Section titled server.headers](#serverheaders)

**Type:** `OutgoingHttpHeaders`  
**Default:** `{}`  

**Added in:** `astro@1.7.0`

Set custom HTTP response headers to be sent in `astro dev` and `astro preview`.

Session Options
---------------

[Section titled Session Options](#session-options)

**Added in:** `astro@5.7.0`

Configures session storage for your Astro project. This is used to store session data in a persistent way, so that it can be accessed across different requests. Some adapters may provide a default session driver, but you can override it with your own configuration.

See [the sessions guide](/en/guides/sessions/) for more information.

astro.config.mjs

      {    session: {      // The name of the Unstorage driver      driver: 'redis',      // The required options depend on the driver      options: {        url: process.env.REDIS_URL,      },      ttl: 3600, // 1 hour    }  }

### session.driver

[Section titled session.driver](#sessiondriver)

**Type:** `string | undefined`  

**Added in:** `astro@5.7.0`

The Unstorage driver to use for session storage. The [Node](/en/guides/integrations-guide/node/#sessions), [Cloudflare](/en/guides/integrations-guide/cloudflare/#sessions), and [Netlify](/en/guides/integrations-guide/netlify/#sessions) adapters automatically configure a default driver for you, but you can specify your own if you would prefer or if you are using an adapter that does not provide one.

The value is the “Driver name” from the [Unstorage driver documentation](https://unstorage.unjs.io/drivers).

astro.config.mjs

    {  adapter: vercel(),  session: {    driver: "redis",  },}

Note

Some drivers may need extra packages to be installed. Some drivers may also require environment variables or credentials to be set. See the [Unstorage documentation](https://unstorage.unjs.io/drivers) for more information.

### session.options

[Section titled session.options](#sessionoptions)

**Type:** `Record<string, unknown> | undefined`  
**Default:** `{}`  

**Added in:** `astro@5.7.0`

The driver-specific options to use for session storage. The options depend on the driver you are using. See the [Unstorage documentation](https://unstorage.unjs.io/drivers) for more information on the options available for each driver.

astro.config.mjs

    {   session: {     driver: "redis",     options: {       url: process.env.REDIS_URL     },   }}

### session.cookie

[Section titled session.cookie](#sessioncookie)

**Type:** `string | AstroCookieSetOptions | undefined`  
**Default:** `{ name: "astro-session", sameSite: "lax", httpOnly: true, secure: true }`  

**Added in:** `astro@5.7.0`

The session cookie configuration. If set to a string, it will be used as the cookie name. Alternatively, you can pass an object with additional options. These will be merged with the defaults.

astro.config.mjs

    { session: {   // If set to a string, it will be used as the cookie name.   cookie: "my-session-cookie", }}

astro.config.mjs

    { session: {   // If set to an object, it will be used as the cookie options.   cookie: {     name: "my-session-cookie",     sameSite: "lax",     secure: true,   } }}

### session.ttl

[Section titled session.ttl](#sessionttl)

**Type:** `number | undefined`  
**Default:** Infinity  

**Added in:** `astro@5.7.0`

An optional default time-to-live expiration period for session values, in seconds.

By default, session values persist until they are deleted or the session is destroyed, and do not automatically expire because a particular amount of time has passed. Set `session.ttl` to add a default expiration period for your session values. Passing a `ttl` option to [`session.set()`](/en/reference/api-reference/#set) will override the global default for that individual entry.

astro.config.mjs

    { session: {   // Set a default expiration period of 1 hour (3600 seconds)   ttl: 3600, }}

Note

Setting a value for `ttl` does not automatically delete the value from storage after the time limit has passed.

Values from storage will only be deleted when there is an attempt to access them after the `ttl` period has expired. At this time, the session value will be undefined and only then will the value be deleted.

Individual drivers may also support a `ttl` option that will automatically delete sessions after the specified time. See your chosen driver’s documentation for more information.

Dev Toolbar Options
-------------------

[Section titled Dev Toolbar Options](#dev-toolbar-options)

### devToolbar.enabled

[Section titled devToolbar.enabled](#devtoolbarenabled)

**Type:** `boolean`  
**Default:** `true`

Whether to enable the Astro Dev Toolbar. This toolbar allows you to inspect your page islands, see helpful audits on performance and accessibility, and more.

This option is scoped to the entire project, to only disable the toolbar for yourself, run `npm run astro preferences disable devToolbar`. To disable the toolbar for all your Astro projects, run `npm run astro preferences disable devToolbar --global`.

Prefetch Options
----------------

[Section titled Prefetch Options](#prefetch-options)

**Type:** `boolean | object`

Enable prefetching for links on your site to provide faster page transitions. (Enabled by default on pages using the `<ClientRouter />` router. Set `prefetch: false` to opt out of this behaviour.)

This configuration automatically adds a prefetch script to every page in the project giving you access to the `data-astro-prefetch` attribute. Add this attribute to any `<a />` link on your page to enable prefetching for that page.

    <a href="/about" data-astro-prefetch>About</a>

Further customize the default prefetching behavior using the [`prefetch.defaultStrategy`](#prefetchdefaultstrategy) and [`prefetch.prefetchAll`](#prefetchprefetchall) options.

See the [Prefetch guide](/en/guides/prefetch/) for more information.

### prefetch.prefetchAll

[Section titled prefetch.prefetchAll](#prefetchprefetchall)

**Type:** `boolean`

Enable prefetching for all links, including those without the `data-astro-prefetch` attribute. This value defaults to `true` when using the `<ClientRouter />` router. Otherwise, the default value is `false`.

    prefetch: {  prefetchAll: true}

When set to `true`, you can disable prefetching individually by setting `data-astro-prefetch="false"` on any individual links.

    <a href="/about" data-astro-prefetch="false">About</a>

### prefetch.defaultStrategy

[Section titled prefetch.defaultStrategy](#prefetchdefaultstrategy)

**Type:** `'tap' | 'hover' | 'viewport' | 'load'`  
**Default:** `'hover'`

The default prefetch strategy to use when the `data-astro-prefetch` attribute is set on a link with no value.

*   `'tap'`: Prefetch just before you click on the link.
*   `'hover'`: Prefetch when you hover over or focus on the link. (default)
*   `'viewport'`: Prefetch as the links enter the viewport.
*   `'load'`: Prefetch all links on the page after the page is loaded.

You can override this default value and select a different strategy for any individual link by setting a value on the attribute.

    <a href="/about" data-astro-prefetch="viewport">About</a>

Image Options
-------------

[Section titled Image Options](#image-options)

### image.endpoint

[Section titled image.endpoint](#imageendpoint)

**Type:** `Object`  
**Default:** `{route: '/_image', entrypoint: undefined}`  

**Added in:** `astro@3.1.0`

Set the endpoint to use for image optimization in dev and SSR. The `entrypoint` property can be set to `undefined` to use the default image endpoint.

    {  image: {    // Example: Use a custom image endpoint at `/custom_endpoint`    endpoint: {       route: '/custom_endpoint',       entrypoint: 'src/my_endpoint.ts',    },  },}

### image.service

[Section titled image.service](#imageservice)

**Type:** `Object`  
**Default:** `{entrypoint: 'astro/assets/services/sharp', config?: {}}`  

**Added in:** `astro@2.1.0`

Set which image service is used for Astro’s assets support.

The value should be an object with an entrypoint for the image service to use and optionally, a config object to pass to the service.

The service entrypoint can be either one of the included services, or a third-party package.

    {  image: {    // Example: Enable the Sharp-based image service with a custom config    service: {       entrypoint: 'astro/assets/services/sharp',       config: {         limitInputPixels: false,      },     },  },}

#### image.service.config.limitInputPixels

[Section titled image.service.config.limitInputPixels](#imageserviceconfiglimitinputpixels)

**Type:** `number | boolean`  
**Default:** `true`  

**Added in:** `astro@4.1.0`

Whether or not to limit the size of images that the Sharp image service will process.

Set `false` to bypass the default image size limit for the Sharp image service and process large images.

### image.domains

[Section titled image.domains](#imagedomains)

**Type:** `Array<string>`  
**Default:** `[]`  

**Added in:** `astro@2.10.10`

Defines a list of permitted image source domains for remote image optimization. No other remote images will be optimized by Astro.

This option requires an array of individual domain names as strings. Wildcards are not permitted. Instead, use [`image.remotePatterns`](#imageremotepatterns) to define a list of allowed source URL patterns.

astro.config.mjs

    {  image: {    // Example: Allow remote image optimization from a single domain    domains: ['astro.build'],  },}

### image.remotePatterns

[Section titled image.remotePatterns](#imageremotepatterns)

**Type:** `Array<RemotePattern>`  
**Default:** `[]`  

**Added in:** `astro@2.10.10`

Defines a list of permitted image source URL patterns for remote image optimization.

`remotePatterns` can be configured with four properties:

1.  protocol
2.  hostname
3.  port
4.  pathname

    {  image: {    // Example: allow processing all images from your aws s3 bucket    remotePatterns: [{      protocol: 'https',      hostname: '**.amazonaws.com',    }],  },}

You can use wildcards to define the permitted `hostname` and `pathname` values as described below. Otherwise, only the exact values provided will be configured: `hostname`:

*   Start with ’\*\*.’ to allow all subdomains (‘endsWith’).
*   Start with ’\*.’ to allow only one level of subdomain.

`pathname`:

*   End with ’/\*\*’ to allow all sub-routes (‘startsWith’).
*   End with ’/\*’ to allow only one level of sub-route.

### image.experimentalLayout

[Section titled image.experimentalLayout](#imageexperimentallayout)

**Type:** `ImageLayout`  
**Default:** `undefined`

The default layout type for responsive images. Can be overridden by the `layout` prop on the image component. Requires the `experimental.responsiveImages` flag to be enabled.

*   `constrained` - The image will scale to fit the container, maintaining its aspect ratio, but will not exceed the specified dimensions.
*   `fixed` - The image will maintain its original dimensions.
*   `full-width` - The image will scale to fit the container, maintaining its aspect ratio.

### image.experimentalObjectFit

[Section titled image.experimentalObjectFit](#imageexperimentalobjectfit)

**Type:** `ImageFit`  
**Default:** `"cover"`

The default object-fit value for responsive images. Can be overridden by the `fit` prop on the image component. Requires the `experimental.responsiveImages` flag to be enabled.

### image.experimentalObjectPosition

[Section titled image.experimentalObjectPosition](#imageexperimentalobjectposition)

**Type:** `string`  
**Default:** `"center"`

The default object-position value for responsive images. Can be overridden by the `position` prop on the image component. Requires the `experimental.responsiveImages` flag to be enabled.

### image.experimentalBreakpoints

[Section titled image.experimentalBreakpoints](#imageexperimentalbreakpoints)

**Type:** `Array<number>`  
**Default:** `[640, 750, 828, 1080, 1280, 1668, 2048, 2560] | [640, 750, 828, 960, 1080, 1280, 1668, 1920, 2048, 2560, 3200, 3840, 4480, 5120, 6016]`

The breakpoints used to generate responsive images. Requires the `experimental.responsiveImages` flag to be enabled. The full list is not normally used, but is filtered according to the source and output size. The defaults used depend on whether a local or remote image service is used. For remote services the more comprehensive list is used, because only the required sizes are generated. For local services, the list is shorter to reduce the number of images generated.

Markdown Options
----------------

[Section titled Markdown Options](#markdown-options)

### markdown.shikiConfig

[Section titled markdown.shikiConfig](#markdownshikiconfig)

**Type:** `Partial<ShikiConfig>`

Shiki is our default syntax highlighter. You can configure all options via the `markdown.shikiConfig` object:

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  markdown: {    shikiConfig: {      // Choose from Shiki's built-in themes (or add your own)      // https://shiki.style/themes      theme: 'dracula',      // Alternatively, provide multiple themes      // See note below for using dual light/dark themes      themes: {        light: 'github-light',        dark: 'github-dark',      },      // Disable the default colors      // https://shiki.style/guide/dual-themes#without-default-color      // (Added in v4.12.0)      defaultColor: false,      // Add custom languages      // Note: Shiki has countless langs built-in, including .astro!      // https://shiki.style/languages      langs: [],      // Add custom aliases for languages      // Map an alias to a Shiki language ID: https://shiki.style/languages#bundled-languages      // https://shiki.style/guide/load-lang#custom-language-aliases      langAlias: {        cjs: "javascript"      },      // Enable word wrap to prevent horizontal scrolling      wrap: true,      // Add custom transformers: https://shiki.style/guide/transformers      // Find common transformers: https://shiki.style/packages/transformers      transformers: [],    },  },});

See the [code syntax highlighting guide](/en/guides/syntax-highlighting/) for usage and examples.

### markdown.syntaxHighlight

[Section titled markdown.syntaxHighlight](#markdownsyntaxhighlight)

**Type:** `SyntaxHighlightConfig | SyntaxHighlightConfigType | false`  
**Default:** `{ type: 'shiki', excludeLangs: ['math'] }`

Which syntax highlighter to use for Markdown code blocks (\`\`\`), if any. This determines the CSS classes that Astro will apply to your Markdown code blocks.

*   `shiki` - use the [Shiki](https://shiki.style) highlighter (`github-dark` theme configured by default)
*   `prism` - use the [Prism](https://prismjs.com/) highlighter and [provide your own Prism stylesheet](/en/guides/syntax-highlighting/#add-a-prism-stylesheet)
*   `false` - do not apply syntax highlighting.

    {  markdown: {    // Example: Switch to use prism for syntax highlighting in Markdown    syntaxHighlight: 'prism',  }}

For more control over syntax highlighting, you can instead specify a configuration object with the properties listed below.

#### markdown.syntaxHighlight.type

[Section titled markdown.syntaxHighlight.type](#markdownsyntaxhighlighttype)

**Type:** `'shiki' | 'prism'`  
**Default:** `'shiki'`  

**Added in:** `astro@5.5.0`

The default CSS classes to apply to Markdown code blocks. (If no other syntax highlighting configuration is needed, you can instead set `markdown.syntaxHighlight` directly to `shiki`, `prism`, or `false`.)

#### markdown.syntaxHighlight.excludeLangs

[Section titled markdown.syntaxHighlight.excludeLangs](#markdownsyntaxhighlightexcludelangs)

**Type:** `Array<string>`  
**Default:** `['math']`  

**Added in:** `astro@5.5.0`

An array of languages to exclude from the default syntax highlighting specified in `markdown.syntaxHighlight.type`. This can be useful when using tools that create diagrams from Markdown code blocks, such as Mermaid.js and D2.

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  markdown: {    syntaxHighlight: {      type: 'shiki',      excludeLangs: ['mermaid', 'math'],    },  },});

### markdown.remarkPlugins

[Section titled markdown.remarkPlugins](#markdownremarkplugins)

**Type:** `RemarkPlugins`

Pass [remark plugins](https://github.com/remarkjs/remark) to customize how your Markdown is built. You can import and apply the plugin function (recommended), or pass the plugin name as a string.

    import remarkToc from 'remark-toc';{  markdown: {    remarkPlugins: [ [remarkToc, { heading: "contents"} ] ]  }}

### markdown.rehypePlugins

[Section titled markdown.rehypePlugins](#markdownrehypeplugins)

**Type:** `RehypePlugins`

Pass [rehype plugins](https://github.com/remarkjs/remark-rehype) to customize how your Markdown’s output HTML is processed. You can import and apply the plugin function (recommended), or pass the plugin name as a string.

    import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';{  markdown: {    rehypePlugins: [rehypeAccessibleEmojis]  }}

### markdown.gfm

[Section titled markdown.gfm](#markdowngfm)

**Type:** `boolean`  
**Default:** `true`  

**Added in:** `astro@2.0.0`

Astro uses [GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm) by default. To disable this, set the `gfm` flag to `false`:

    {  markdown: {    gfm: false,  }}

### markdown.smartypants

[Section titled markdown.smartypants](#markdownsmartypants)

**Type:** `boolean`  
**Default:** `true`  

**Added in:** `astro@2.0.0`

Astro uses the [SmartyPants formatter](https://daringfireball.net/projects/smartypants/) by default. To disable this, set the `smartypants` flag to `false`:

    {  markdown: {    smartypants: false,  }}

### markdown.remarkRehype

[Section titled markdown.remarkRehype](#markdownremarkrehype)

**Type:** `RemarkRehype`

Pass options to [remark-rehype](https://github.com/remarkjs/remark-rehype#api).

    {  markdown: {    // Example: Translate the footnotes text to another language, here are the default English values    remarkRehype: { footnoteLabel: "Footnotes", footnoteBackLabel: "Back to reference 1"},  },};

i18n
----

[Section titled i18n](#i18n)

**Type:** `object`  

**Added in:** `astro@3.5.0`

Configures i18n routing and allows you to specify some customization options.

See our guide for more information on [internationalization in Astro](/en/guides/internationalization/)

### i18n.locales

[Section titled i18n.locales](#i18nlocales)

**Type:** `Locales`  

**Added in:** `astro@3.5.0`

A list of all locales supported by the website. This is a required field.

Languages can be listed either as individual codes (e.g. `['en', 'es', 'pt-br']`) or mapped to a shared `path` of codes (e.g. `{ path: "english", codes: ["en", "en-US"]}`). These codes will be used to determine the URL structure of your deployed site.

No particular language code format or syntax is enforced, but your project folders containing your content files must match exactly the `locales` items in the list. In the case of multiple `codes` pointing to a custom URL path prefix, store your content files in a folder with the same name as the `path` configured.

### i18n.defaultLocale

[Section titled i18n.defaultLocale](#i18ndefaultlocale)

**Type:** `string`  

**Added in:** `astro@3.5.0`

The default locale of your website/application, that is one of the specified `locales`. This is a required field.

No particular language format or syntax is enforced, but we suggest using lower-case and hyphens as needed (e.g. “es”, “pt-br”) for greatest compatibility.

### i18n.fallback

[Section titled i18n.fallback](#i18nfallback)

**Type:** `Record<string, string>`  

**Added in:** `astro@3.5.0`

The fallback strategy when navigating to pages that do not exist (e.g. a translated page has not been created).

Use this object to declare a fallback `locale` route for each language you support. If no fallback is specified, then unavailable pages will return a 404.

##### Example

[Section titled Example](#example)

The following example configures your content fallback strategy to redirect unavailable pages in `/pt-br/` to their `es` version, and unavailable pages in `/fr/` to their `en` version. Unavailable `/es/` pages will return a 404.

    export default defineConfig({  i18n: {    defaultLocale: "en",    locales: ["en", "fr", "pt-br", "es"],    fallback: {      pt: "es",      fr: "en"    }  }})

### i18n.routing

[Section titled i18n.routing](#i18nrouting)

**Type:** `object | "manual"`  
**Default:** `object`  

**Added in:** `astro@3.7.0`

Controls the routing strategy to determine your site URLs. Set this based on your folder/URL path configuration for your default language.

    export default defineConfig({  i18n: {    defaultLocale: "en",    locales: ["en", "fr"],    routing: {      prefixDefaultLocale: false,      redirectToDefaultLocale: true,      fallbackType: "redirect",    }  }})

Since 4.6.0, this option can also be set to `manual`. When this routing strategy is enabled, Astro will **disable** its i18n middleware and no other `routing` options (e.g. `prefixDefaultLocale`) may be configured. You will be responsible for writing your own routing logic, or executing Astro’s i18n middleware manually alongside your own.

    export default defineConfig({  i18n: {    defaultLocale: "en",    locales: ["en", "fr"],    routing: "manual"  }})

#### i18n.routing.prefixDefaultLocale

[Section titled i18n.routing.prefixDefaultLocale](#i18nroutingprefixdefaultlocale)

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@3.7.0`

When `false`, only non-default languages will display a language prefix. The `defaultLocale` will not show a language prefix and content files do not exist in a localized folder. URLs will be of the form `example.com/[locale]/content/` for all non-default languages, but `example.com/content/` for the default locale.

When `true`, all URLs will display a language prefix. URLs will be of the form `example.com/[locale]/content/` for every route, including the default language. Localized folders are used for every language, including the default.

    export default defineConfig({  i18n: {    defaultLocale: "en",    locales: ["en", "fr", "pt-br", "es"],    routing: {      prefixDefaultLocale: true,    }  }})

#### i18n.routing.redirectToDefaultLocale

[Section titled i18n.routing.redirectToDefaultLocale](#i18nroutingredirecttodefaultlocale)

**Type:** `boolean`  
**Default:** `true`  

**Added in:** `astro@4.2.0`

Configures whether or not the home URL (`/`) generated by `src/pages/index.astro` will redirect to `/[defaultLocale]` when `prefixDefaultLocale: true` is set.

Set `redirectToDefaultLocale: false` to disable this automatic redirection at the root of your site:

astro.config.mjs

    export default defineConfig({  i18n:{    defaultLocale: "en",    locales: ["en", "fr"],    routing: {      prefixDefaultLocale: true,      redirectToDefaultLocale: false    }  }})

#### i18n.routing.fallbackType

[Section titled i18n.routing.fallbackType](#i18nroutingfallbacktype)

**Type:** `"redirect" | "rewrite"`  
**Default:** `"redirect"`  

**Added in:** `astro@4.15.0`

When [`i18n.fallback`](#i18nfallback) is configured to avoid showing a 404 page for missing page routes, this option controls whether to [redirect](/en/guides/routing/#redirects) to the fallback page, or to [rewrite](/en/guides/routing/#rewrites) the fallback page’s content in place.

By default, Astro’s i18n routing creates pages that redirect your visitors to a new destination based on your fallback configuration. The browser will refresh and show the destination address in the URL bar.

When `i18n.routing.fallback: "rewrite"` is configured, Astro will create pages that render the contents of the fallback page on the original, requested URL.

With the following configuration, if you have the file `src/pages/en/about.astro` but not `src/pages/fr/about.astro`, the `astro build` command will generate `dist/fr/about.html` with the same content as the `dist/en/about.html` page. Your site visitor will see the English version of the page at `https://example.com/fr/about/` and will not be redirected.

astro.config.mjs

    export default defineConfig({   i18n: {    defaultLocale: "en",    locales: ["en", "fr"],    routing: {      prefixDefaultLocale: false,      fallbackType: "rewrite",    },    fallback: {      fr: "en",    }  },})

### i18n.domains

[Section titled i18n.domains](#i18ndomains)

**Type:** `Record<string, string>`  
**Default:** `{}`  

**Added in:** `astro@4.3.0`

Configures the URL pattern of one or more supported languages to use a custom domain (or sub-domain).

When a locale is mapped to a domain, a `/[locale]/` path prefix will not be used. However, localized folders within `src/pages/` are still required, including for your configured `defaultLocale`.

Any other locale not configured will default to a localized path-based URL according to your `prefixDefaultLocale` strategy (e.g. `https://example.com/[locale]/blog`).

astro.config.mjs

    export default defineConfig({   site: "https://example.com",   output: "server", // required, with no prerendered pages   adapter: node({     mode: 'standalone',   }),   i18n: {    defaultLocale: "en",    locales: ["en", "fr", "pt-br", "es"],    prefixDefaultLocale: false,    domains: {      fr: "https://fr.example.com",      es: "https://example.es"    }  },})

Both page routes built and URLs returned by the `astro:i18n` helper functions [`getAbsoluteLocaleUrl()`](/en/reference/modules/astro-i18n/#getabsolutelocaleurl) and [`getAbsoluteLocaleUrlList()`](/en/reference/modules/astro-i18n/#getabsolutelocaleurllist) will use the options set in `i18n.domains`.

See the [Internationalization Guide](/en/guides/internationalization/#domains) for more details, including the limitations of this feature.

env
---

[Section titled env](#env)

**Type:** `object`  
**Default:** `{}`  

**Added in:** `astro@5.0.0`

Configuration options for type-safe environment variables.

See our guide for more information on [environment variables in Astro](/en/guides/environment-variables/).

### env.schema

[Section titled env.schema](#envschema)

**Type:** `EnvSchema`  
**Default:** `{}`  

**Added in:** `astro@5.0.0`

An object that uses `envField` to define the data type and properties of your environment variables: `context` (client or server), `access` (public or secret), a `default` value to use, and whether or not this environment variable is `optional` (defaults to `false`).

astro.config.mjs

    import { defineConfig, envField } from "astro/config"
    export default defineConfig({  env: {    schema: {      API_URL: envField.string({ context: "client", access: "public", optional: true }),      PORT: envField.number({ context: "server", access: "public", default: 4321 }),      API_SECRET: envField.string({ context: "server", access: "secret" }),    }  }})

`envField` supports four data types: string, number, enum, and boolean. `context` and `access` are required properties for all data types. The following shows the complete list of properties available for each data type:

    import { envField } from "astro/config"
    envField.string({   // context & access   optional: true,   default: "foo",   max: 20,   min: 1,   length: 13,   url: true,   includes: "oo",   startsWith: "f",   endsWith: "o",})envField.number({   // context & access   optional: true,   default: 15,   gt: 2,   min: 1,   lt: 3,   max: 4,   int: true,})envField.boolean({   // context & access   optional: true,   default: true,})envField.enum({   // context & access   values: ['foo', 'bar', 'baz'], // required   optional: true,   default: 'baz',})

### env.validateSecrets

[Section titled env.validateSecrets](#envvalidatesecrets)

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@5.0.0`

Whether or not to validate secrets on the server when starting the dev server or running a build.

By default, only public variables are validated on the server when starting the dev server or a build, and private variables are validated at runtime only. If enabled, private variables will also be checked on start. This is useful in some continuous integration (CI) pipelines to make sure all your secrets are correctly set before deploying.

astro.config.mjs

    import { defineConfig, envField } from "astro/config"
    export default defineConfig({  env: {    schema: {      // ...    },    validateSecrets: true  }})

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/types/public/config.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Template directives reference](/en/reference/directives-reference/) [Next  
CLI Commands](/en/reference/cli-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)