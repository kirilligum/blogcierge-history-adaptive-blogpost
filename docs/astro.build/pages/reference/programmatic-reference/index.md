Programmatic Astro API (experimental)
=====================================

If you need more control when running Astro, the `"astro"` package exports APIs to programmatically run the CLI commands.

These APIs are experimental and their API signature may change. Any updates will be mentioned in the [Astro changelog](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) and the information below will always show the current, up-to-date information.

`AstroInlineConfig`
-------------------

[Section titled AstroInlineConfig](#astroinlineconfig)

The `AstroInlineConfig` type is used by all of the command APIs below. It extends from the user [Astro config](/en/reference/configuration-reference/) type:

    interface AstroInlineConfig extends AstroUserConfig {  configFile?: string | false;  mode?: string;  logLevel?: "debug" | "info" | "warn" | "error" | "silent";}

### `configFile`

[Section titled configFile](#configfile)

**Type:** `string | false`  
**Default:** `undefined`

A custom path to the Astro config file.

If this value is undefined (default) or unset, Astro will search for an `astro.config.(js,mjs,ts,mts)` file relative to the `root` and load the config file if found.

If a relative path is set, it will resolve based on the `root` option.

Set to `false` to disable loading any config files.

The inline config passed in this object will take highest priority when merging with the loaded user config.

### `mode`

[Section titled mode](#mode)

**Type:** `string`  
**Default:** `"development"` when running `astro dev`, `"production"` when running `astro build`  

**Added in:** `astro@5.0.0`

The mode used when developing or building your site (e.g. `"production"`, `"testing"`).

This value is passed to Vite using [the `--mode` flag](/en/reference/cli-reference/#--mode-string) when the `astro build` or `astro dev` commands are run to determine the value of `import.meta.env.MODE`. This also determines which `.env` files are loaded, and therefore the values of `astro:env`. See the [environment variables page](/en/guides/environment-variables/) for more details.

To output a development-based build, you can run `astro build` with the [`--devOutput` flag](/en/reference/cli-reference/#--devoutput).

### `logLevel`

[Section titled logLevel](#loglevel)

**Type:** `"debug" | "info" | "warn" | "error" | "silent"`  
**Default:** `"info"`

The logging level to filter messages logged by Astro.

*   `"debug"`: Log everything, including noisy debugging diagnostics.
*   `"info"`: Log informational messages, warnings, and errors.
*   `"warn"`: Log warnings and errors.
*   `"error"`: Log errors only.
*   `"silent"`: No logging.

`dev()`
-------

[Section titled dev()](#dev)

**Type:** `(inlineConfig: AstroInlineConfig) => Promise<DevServer>`

Similar to [`astro dev`](/en/reference/cli-reference/#astro-dev), it runs Astro’s development server.

    import { dev } from "astro";
    const devServer = await dev({  root: "./my-project",});
    // Stop the server if neededawait devServer.stop();

### `DevServer`

[Section titled DevServer](#devserver)

    export interface DevServer {  address: AddressInfo;  handle: (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => void;  watcher: vite.FSWatcher;  stop(): Promise<void>;}

#### `address`

[Section titled address](#address)

**Type:** `AddressInfo`

The address the dev server is listening on.

This property contains the value returned by Node’s [`net.Server#address()` method](https://nodejs.org/api/net.html#serveraddress).

#### `handle()`

[Section titled handle()](#handle)

**Type:** `(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => void`

A handle for raw Node HTTP requests. You can call `handle()` with an [`http.IncomingMessage`](https://nodejs.org/api/http.html#class-httpincomingmessage) and an [`http.ServerResponse`](https://nodejs.org/api/http.html#class-httpserverresponse) instead of sending a request through the network.

#### `watcher`

[Section titled watcher](#watcher)

**Type:** `vite.FSWatcher`

The [Chokidar file watcher](https://github.com/paulmillr/chokidar#getting-started) as exposed by [Vite’s development server](https://vite.dev/guide/api-javascript#vitedevserver).

#### `stop()`

[Section titled stop()](#stop)

**Type:** `Promise<void>`

Stops the development server. This closes all idle connections and stops listening for new connections.

Returns a `Promise` that resolves once all pending requests have been fulfilled and all idle connections have been closed.

`build()`
---------

[Section titled build()](#build)

**Type:** `(inlineConfig: AstroInlineConfig, options?: BuildOptions) => Promise<void>`

Similar to [`astro build`](/en/reference/cli-reference/#astro-build), it builds your site for deployment.

    import { build } from "astro";
    await build({  root: "./my-project",});

### `BuildOptions`

[Section titled BuildOptions](#buildoptions)

    export interface BuildOptions {  devOutput?: boolean;  teardownCompiler?: boolean;}

#### `devOutput`

[Section titled devOutput](#devoutput)

**Type:** `boolean`  
**Default:** `false`

**Added in:** `astro@5.4.0`

Output a development-based build similar to code transformed in `astro dev`. This can be useful to test build-only issues with additional debugging information included.

#### `teardownCompiler`

[Section titled teardownCompiler](#teardowncompiler)

**Type:** `boolean`  
**Default:** `true`

**Added in:** `astro@5.4.0`

Teardown the compiler WASM instance after build. This can improve performance when building once but may cause a performance hit if building multiple times in a row.

When building multiple projects in the same execution (e.g. during tests), disabling this option can greatly increase performance and reduce peak memory usage at the cost of higher sustained memory usage.

`preview()`
-----------

[Section titled preview()](#preview)

**Type:** `(inlineConfig: AstroInlineConfig) => Promise<PreviewServer>`

Similar to [`astro preview`](/en/reference/cli-reference/#astro-preview), it starts a local server to serve your build output.

If no adapter is set in the configuration, the preview server will only serve the built static files. If an adapter is set in the configuration, the preview server is provided by the adapter. Adapters are not required to provide a preview server, so this feature may not be available depending on your adapter of choice.

    import { preview } from "astro";
    const previewServer = await preview({  root: "./my-project",});
    // Stop the server if neededawait previewServer.stop();

### `PreviewServer`

[Section titled PreviewServer](#previewserver)

    export interface PreviewServer {  host?: string;  port: number;  closed(): Promise<void>;  stop(): Promise<void>;}

#### `host`

[Section titled host](#host)

**Type:** `string`

The host where the server is listening for connections.

Adapters are allowed to leave this field unset. The value of `host` is implementation-specific.

#### `port`

[Section titled port](#port)

**Type:** `number`

The port where the server is listening for connections.

#### `stop()`

[Section titled stop()](#stop-1)

**Type:** `Promise<void>`

Asks the preview server to close, stop accepting requests, and drop idle connections.

The returned `Promise` resolves when the close request has been sent. This does not mean that the server has closed yet. Use the [`closed()`](#closed) method if you need to ensure the server has fully closed.

#### `closed()`

[Section titled closed()](#closed)

**Type:** `Promise<void>`

Returns a `Promise` that will resolve once the server is closed and reject if an error happens on the server.

`sync()`
--------

[Section titled sync()](#sync)

**Type:** `(inlineConfig: AstroInlineConfig) => Promise<void>`

Similar to [`astro sync`](/en/reference/cli-reference/#astro-sync), it generates TypeScript types for all Astro modules.

    import { sync } from "astro";
    await sync({  root: "./my-project",});

`mergeConfig()`
---------------

[Section titled mergeConfig()](#mergeconfig)

**Type:** `<T extends AstroConfig | AstroInlineConfig>(config: T, overrides: DeepPartial<T>) => T`

**Added in:** `astro@5.4.0`

Imported from `astro/config`, merges a partial Astro configuration on top of an existing, valid, Astro configuration.

`mergeConfig()` accepts an Astro config object and a partial config (any set of valid Astro config options), and returns a valid Astro config combining both values such that:

*   Arrays are concatenated (including integrations and remark plugins).
*   Objects are merged recursively.
*   Vite options are merged using [Vite’s own `mergeConfig` function](https://vite.dev/guide/api-javascript#mergeconfig) with the default `isRoot` flag.
*   Options that can be provided as functions are wrapped into new functions that recursively merge the return values from both configurations with these same rules.
*   All other options override the existing config.

    import { mergeConfig } from "astro/config";
    mergeConfig(  {    output: 'static',    site: 'https://example.com',    integrations: [partytown()],    server: ({command}) => ({      port: command === 'dev' ? 4321 : 1234,    }),    build: {      client: './custom-client',    },  },  {    output: 'server',    base: '/astro',    integrations: [mdx()],    server: ({command}) => ({      host: command === 'dev' ? 'localhost' : 'site.localhost',    }),    build: {      server: './custom-server',    },  });
    // Result is equivalent to:{  output: 'server',  site: 'https://example.com',  base: '/astro',  integrations: [partytown(), mdx()],  server: ({command}) => ({    port: command === 'dev' ? 4321 : 1234,    host: command === 'dev' ? 'localhost' : 'site.localhost',  }),  build: {    client: './custom-client',    server: './custom-server',  },}

`validateConfig()`
------------------

[Section titled validateConfig()](#validateconfig)

**Type:** `(userConfig: any, root: string, cmd: string): Promise<AstroConfig>`

**Added in:** `astro@5.4.0`

Imported from `astro/config`, validates an object as if it was exported from `astro.config.mjs` and imported by Astro.

It takes the following arguments:

*   The configuration to be validated.
*   The root directory of the project.
*   The Astro command that is being executed (`build`, `dev`, `sync`, etc.)

The returned promise resolves to the validated configuration, filled with all default values appropriate for the given Astro command.

    import { validateConfig } from "astro/config";
    const config = await validateConfig({  integrations: [partytown()],}, "./my-project", "build");
    // defaults are appliedawait rm(config.outDir, { recursive: true, force: true });

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/programmatic-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Container API (experimental)](/en/reference/container-reference/) [Next  
Configuring experimental flags](/en/reference/experimental-flags/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)