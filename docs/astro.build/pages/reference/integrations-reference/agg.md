Astro Integration API
=====================

**Astro Integrations** add new functionality and behaviors for your project with only a few lines of code.

This reference page is for anyone writing their own integration. To learn how to use an integration in your project, check out our [Using Integrations](/en/guides/integrations-guide/) guide instead.

Examples
--------

[Section titled Examples](#examples)

The official Astro integrations can act as reference for you as you go to build your own integrations.

*   **Renderers:** [`svelte`](/en/guides/integrations-guide/svelte/), [`react`](/en/guides/integrations-guide/react/), [`preact`](/en/guides/integrations-guide/preact/), [`vue`](/en/guides/integrations-guide/vue/), [`solid`](/en/guides/integrations-guide/solid-js/)
*   **Libraries:** [`partytown`](/en/guides/integrations-guide/partytown/)
*   **Features:** [`sitemap`](/en/guides/integrations-guide/sitemap/)

Quick API Reference
-------------------

[Section titled Quick API Reference](#quick-api-reference)

    interface AstroIntegration {  name: string;  hooks: {    'astro:config:setup'?: (options: {      config: AstroConfig;      command: 'dev' | 'build' | 'preview' | 'sync';      isRestart: boolean;      updateConfig: (newConfig: DeepPartial<AstroConfig>) => AstroConfig;      addRenderer: (renderer: AstroRenderer) => void;      addWatchFile: (path: URL | string) => void;      addClientDirective: (directive: ClientDirectiveConfig) => void;      addMiddleware: (middleware: AstroIntegrationMiddleware) => void;      addDevToolbarApp: (entrypoint: DevToolbarAppEntry) => void;      injectScript: (stage: InjectedScriptStage, content: string) => void;      injectRoute: (injectedRoute: InjectedRoute) => void;      createCodegenDir: () => URL;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:route:setup'?: (options: {      route: RouteOptions;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:routes:resolved'?: (options: {      routes: IntegrationResolvedRoute[];      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:config:done'?: (options: {      config: AstroConfig;      setAdapter: (adapter: AstroAdapter) => void;      injectTypes: (injectedType: InjectedType) => URL;      logger: AstroIntegrationLogger;      buildOutput: 'static' | 'server';    }) => void | Promise<void>;    'astro:server:setup'?: (options: {      server: vite.ViteDevServer;      logger: AstroIntegrationLogger;      toolbar: ReturnType<typeof getToolbarServerCommunicationHelpers>;      refreshContent?: (options: RefreshContentOptions) => Promise<void>;    }) => void | Promise<void>;    'astro:server:start'?: (options: {      address: AddressInfo;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:server:done'?: (options: {      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:build:start'?: (options: {      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:build:setup'?: (options: {      vite: vite.InlineConfig;      pages: Map<string, PageBuildData>;      target: 'client' | 'server';      updateConfig: (newConfig: vite.InlineConfig) => void;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:build:ssr'?: (options: {      manifest: SerializedSSRManifest;      entryPoints: Map<IntegrationRouteData, URL>;      middlewareEntryPoint: URL | undefined;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:build:generated'?: (options: {      dir: URL;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:build:done'?: (options: {      pages: { pathname: string }[];      dir: URL;      assets: Map<string, URL[]>;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;
        // ... any custom hooks from integrations  };}

Hooks
-----

[Section titled Hooks](#hooks)

Astro provides hooks that integrations can implement to execute during certain parts of Astro’s lifecycle. Astro hooks are defined in the `IntegrationHooks` interface, which is part of the global `Astro` namespace. Each hook has a [`logger` option](#astrointegrationlogger) that allows you to use the Astro logger to write logs.

The following hooks are built in to Astro:

### `astro:config:setup`

[Section titled astro:config:setup](#astroconfigsetup)

**Next hook:** [`astro:route:setup`](#astroroutesetup)

**When:** On initialization, before either the [Vite](https://vite.dev/config/) or [Astro config](/en/reference/configuration-reference/) have resolved.

**Why:** To extend the project config. This includes updating the [Astro config](/en/reference/configuration-reference/), applying [Vite plugins](https://vite.dev/guide/api-plugin.html), adding component renderers, and injecting scripts onto the page.

    'astro:config:setup'?: (options: {  config: AstroConfig;  command: 'dev' | 'build' | 'preview' | 'sync';  isRestart: boolean;  updateConfig: (newConfig: DeepPartial<AstroConfig>) => AstroConfig;  addRenderer: (renderer: AstroRenderer) => void;  addClientDirective: (directive: ClientDirectiveConfig) => void;  addMiddleware: (middleware: AstroIntegrationMiddleware) => void;  addDevToolbarApp: (entrypoint: DevToolbarAppEntry) => void;  addWatchFile: (path: URL | string) => void;  injectScript: (stage: InjectedScriptStage, content: string) => void;  injectRoute: (injectedRoute: InjectedRoute) => void;  createCodegenDir: () => URL;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `config` option

[Section titled config option](#config-option)

**Type:** `AstroConfig`

A read-only copy of the user-supplied [Astro config](/en/reference/configuration-reference/). This is resolved _before_ any other integrations have run. If you need a copy of the config after all integrations have completed their config updates, [see the `astro:config:done` hook](#astroconfigdone).

#### `command` option

[Section titled command option](#command-option)

**Type:** `'dev' | 'build' | 'preview' | 'sync'`

*   `dev` - Project is executed with `astro dev`
*   `build` - Project is executed with `astro build`
*   `preview` - Project is executed with `astro preview`
*   `sync` - Project is executed with `astro sync`

#### `isRestart` option

[Section titled isRestart option](#isrestart-option)

**Type:** `boolean`  

**Added in:** `astro@1.5.0`

`false` when the dev server starts, `true` when a reload is triggered. Useful to detect when this function is called more than once.

#### `updateConfig()` option

[Section titled updateConfig() option](#updateconfig-option)

**Type:** `(newConfig: DeepPartial<AstroConfig>) => AstroConfig;`

A callback function to update the user-supplied [Astro config](/en/reference/configuration-reference/). Any config you provide **will be merged with the user config + other integration config updates,** so you are free to omit keys!

For example, say you need to supply a [Vite](https://vite.dev/) plugin to the user’s project:

    import bananaCSS from '@vitejs/official-banana-css-plugin';
    export default {  name: 'banana-css-integration',  hooks: {    'astro:config:setup': ({ updateConfig }) => {      updateConfig({        vite: {          plugins: [bananaCSS()],        }      })    }  }}

#### `addRenderer()` option

[Section titled addRenderer() option](#addrenderer-option)

**Type:** `(renderer:` [`AstroRenderer`](https://github.com/withastro/astro/blob/fdd607c5755034edf262e7b275732519328a33b2/packages/astro/src/%40types/astro.ts#L872-L883) `) => void;`  
**Examples:** [`svelte`](https://github.com/withastro/astro/blob/main/packages/integrations/svelte/src/index.ts), [`react`](https://github.com/withastro/astro/blob/main/packages/integrations/react/src/index.ts), [`preact`](https://github.com/withastro/astro/blob/main/packages/integrations/preact/src/index.ts), [`vue`](https://github.com/withastro/astro/blob/main/packages/integrations/vue/src/index.ts), [`solid`](https://github.com/withastro/astro/blob/main/packages/integrations/solid/src/index.ts)

A callback function to add a component framework renderer (i.e. React, Vue, Svelte, etc). You can browse the examples and type definition above for more advanced options, but here are the 2 main options to be aware of:

*   `clientEntrypoint` - path to a file that executes on the client whenever your component is used. This is mainly for rendering or hydrating your component with JS.
*   `serverEntrypoint` - path to a file that executes during server-side requests or static builds whenever your component is used. These should render components to static markup, with hooks for hydration where applicable. [React’s `renderToString` callback](https://react.dev/reference/react-dom/server/renderToString) is a classic example.

**Added in:** `astro@5.0.0`

The functions `clientEntrypoint` and `serverEntrypoint` accept a `URL`.

#### `addWatchFile()` option

[Section titled addWatchFile() option](#addwatchfile-option)

**Type:** `(path: URL | string) => void`  

**Added in:** `astro@1.5.0`

If your integration depends on some configuration file that Vite doesn’t watch and/or needs a full dev server restart to take effect, add it with `addWatchFile`. Whenever that file changes, the Astro dev server will be reloaded (you can check when a reload happens with `isRestart`).

Example usage:

    // Must be an absolute path!addWatchFile('/home/user/.../my-config.json');addWatchFile(new URL('./ec.config.mjs', config.root));

#### `addClientDirective()` option

[Section titled addClientDirective() option](#addclientdirective-option)

**Type:** `(directive:` [`ClientDirectiveConfig`](https://github.com/withastro/astro/blob/00327c213f74627ac9ca1dec774efa5bf71e9375/packages/astro/src/%40types/astro.ts#L1872-L1875) `) => void;`  

**Added in:** `astro@2.6.0`

Adds a [custom client directive](/en/reference/directives-reference/#custom-client-directives) to be used in `.astro` files.

Note that directive entrypoints are only bundled through esbuild and should be kept small so they don’t slow down component hydration.

Example usage:

astro.config.mjs

    import { defineConfig } from 'astro/config';import clickDirective from './astro-click-directive/register.js'
    // https://astro.build/configexport default defineConfig({  integrations: [    clickDirective()  ],});

astro-click-directive/register.js

    /** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "client:click",  hooks: {    "astro:config:setup": ({ addClientDirective }) => {      addClientDirective({        name: "click",        entrypoint: "./astro-click-directive/click.js",      });    },  },});

astro-click-directive/click.js

    /** * Hydrate on first click on the window * @type {import('astro').ClientDirective} */export default (load, opts, el) => {  window.addEventListener('click', async () => {    const hydrate = await load()    await hydrate()  }, { once: true })}

You can also add types for the directives in your library’s type definition file:

astro-click-directive/index.d.ts

    import 'astro'declare module 'astro' {  interface AstroClientDirectives {    'client:click'?: boolean  }}

#### `addDevToolbarApp()` option

[Section titled addDevToolbarApp() option](#adddevtoolbarapp-option)

**Type:** `(entrypoint: DevToolbarAppEntry) => void;`  

**Added in:** `astro@3.4.0`

Adds a [custom dev toolbar app](/en/reference/dev-toolbar-app-reference/).

Example usage:

astro.config.mjs

    import { defineConfig } from 'astro/config';import devToolbarIntegration from './astro-dev-toolbar-app/integration.js'
    // https://astro.build/configexport default defineConfig({  integrations: [    devToolbarIntegration()  ],});

astro-dev-toolbar-app/integration.js

    /** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "dev-toolbar-app",  hooks: {    "astro:config:setup": ({ addDevToolbarApp }) => {      addDevToolbarApp({        entrypoint: "./astro-dev-toolbar-app/plugin.js",        id: "my-plugin",        name: "My Plugin"      });    },  },});

astro-dev-toolbar-app/plugin.js

    /** * @type {import('astro').DevToolbarApp} */export default {  id: "my-plugin",  name: "My Plugin",  icon: "<svg>...</svg>",  init() {    console.log("I'm a dev toolbar app!")  },};

#### `addMiddleware()` option

[Section titled addMiddleware() option](#addmiddleware-option)

**Type:** `(middleware:` [`AstroIntegrationMiddleware`](https://github.com/withastro/astro/blob/852ac0f75dfca1b2602e9cdbfa0447d9998e2449/packages/astro/src/%40types/astro.ts#L2124-L2127) `) => void;`  

**Added in:** `astro@3.5.0`

Adds [middleware](/en/guides/middleware/) to run on each request. Takes the `entrypoint` module that contains the middleware, and an `order` to specify whether it should run before (`pre`) other middleware or after (`post`).

@my-package/integration.js

    /** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "my-middleware-package",  hooks: {    "astro:config:setup": ({ addMiddleware }) => {      addMiddleware({        entrypoint: '@my-package/middleware',        order: 'pre'      });    },  },});

Middleware is defined in a package with an `onRequest` function, as with user-defined middleware.

@my-package/middleware.js

    import { defineMiddleware } from 'astro:middleware';
    export const onRequest = defineMiddleware(async (context, next) => {  if(context.url.pathname === '/some-test-path') {    return Response.json({      ok: true    });  }
      return next();});

**Added in:** `astro@5.0.0`

The function also accepts a `URL` for `entrypoint`:

@my-package/integration.js

    /** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "my-middleware-package",  hooks: {    "astro:config:setup": ({ addMiddleware }) => {      addMiddleware({        entrypoint: new URL('./middleware.js', import.meta.url),        order: 'pre'      });    },  },});

#### `injectRoute()` option

[Section titled injectRoute() option](#injectroute-option)

**Type:** `({ pattern: string; entrypoint: string | URL; prerender?: boolean }) => void;`

A callback function to inject routes into an Astro project. Injected routes can be [`.astro` pages](/en/basics/astro-pages/) or [`.js` and `.ts` route handlers](/en/guides/endpoints/#static-file-endpoints).

`injectRoute` takes an object with a `pattern` and an `entrypoint`.

*   `pattern` - where the route should be output in the browser, for example `/foo/bar`. A `pattern` can use Astro’s filepath syntax for denoting dynamic routes, for example `/foo/[bar]` or `/foo/[...bar]`. Note that a file extension is **not** needed in the `pattern`.
*   `entrypoint` - a bare module specifier pointing towards the `.astro` page or `.js`/`.ts` route handler that handles the route denoted in the `pattern`.
*   `prerender` - a boolean to set if Astro can’t detect your `prerender` export.

##### Example usage

[Section titled Example usage](#example-usage)

    injectRoute({  // Use Astro’s pattern syntax for dynamic routes.  pattern: '/subfolder/[dynamic]',  // Use relative path syntax for a local route.  entrypoint: './src/dynamic-page.astro',  // Use only if Astro can't detect your prerender export  prerender: false});

For an integration designed to be installed in other projects, use its package name to refer to the route entrypoint. The following example shows a package published to npm as `@fancy/dashboard` injecting a dashboard route:

    injectRoute({  pattern: '/fancy-dashboard',  entrypoint: '@fancy/dashboard/dashboard.astro'});

When publishing your package (`@fancy/dashboard`, in this case) to npm, you must export `dashboard.astro` in your `package.json`:

package.json

    {  "name": "@fancy/dashboard",  // ...  "exports": { "./dashboard.astro": "./dashboard.astro" }}

**Added in:** `astro@5.0.0`

The function also accepts a `URL` for `entrypoint`:

    injectRoute({  pattern: '/fancy-dashboard',  entrypoint: new URL('./dashboard.astro', import.meta.url)});

#### `injectScript()` option

[Section titled injectScript() option](#injectscript-option)

**Type:** `(stage: InjectedScriptStage, content: string) => void;`

A callback function to inject a string of JavaScript content onto every page.

The **`stage`** denotes how this script (the `content`) should be inserted. Some stages allow inserting scripts without modification, while others allow optimization during [Vite’s bundling step](https://vite.dev/guide/build.html):

*   `"head-inline"`: Injected into a script tag in the `<head>` of every page. **Not** optimized or resolved by Vite.
    
*   `"before-hydration"`: Imported client-side, before the hydration script runs. Optimized and resolved by Vite.
    
*   `"page"`: Similar to `head-inline`, except that the injected snippet is handled by Vite and bundled with any other `<script>` tags defined inside of Astro components on the page. The script will be loaded with a `<script type="module">` in the final page output, optimized and resolved by Vite.
    
*   `"page-ssr"`: Imported as a separate module in the frontmatter of every Astro page component. Because this stage imports your script, the `Astro` global is not available and your script will only be run once when the `import` is first evaluated.
    
    The main use for the `page-ssr` stage is injecting a CSS `import` into every page to be optimized and resolved by Vite:
    
        injectScript('page-ssr', 'import "global-styles.css";');
    

#### `createCodegenDir`

[Section titled createCodegenDir](#createcodegendir)

**Type:** `() => URL;`  

**Added in:** `astro@5.0.0`

A function that creates the `<root>/.astro/integrations/<normalized_integration_name>` folder and returns its path.

It allows you to have a dedicated folder, avoiding conflicts with another integration or Astro itself. This directory is created by calling this function so it’s safe to write files to it directly:

my-integration.ts

    import { writeFileSync } from 'node:fs'
    const integration = {  name: 'my-integration',  hooks: {    'astro:config:setup': ({ createCodegenDir }) => {      const codegenDir = createCodegenDir()      writeFileSync(new URL('cache.json', codegenDir), '{}', 'utf-8')    }  }}

### `astro:route:setup`

[Section titled astro:route:setup](#astroroutesetup)

**Added in:** `astro@4.14.0`

**Previous hook:** [`astro:config:setup`](#astroconfigsetup)

**Next hook:** [`astro:routes:resolved`](#astroroutesresolved)

**When:** In `astro build`, before bundling starts. In `astro dev`, while building the module graph and on every change to a file based route (added/removed/updated).

**Why:** To set options for a route at build or request time, such as enabling [on-demand server rendering](/en/guides/on-demand-rendering/#enabling-on-demand-rendering).

    'astro:route:setup'?: (options: {  route: RouteOptions;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `route` option

[Section titled route option](#route-option)

**Type:** [`RouteOptions`](https://github.com/withastro/astro/blob/3b10b97a4fecd1dfd959b160a07b5b8427fe40a7/packages/astro/src/types/public/integrations.ts#L14-L27)

An object with a `component` property to identify the route and the following additional values to allow you to configure the generated route: `prerender`.

##### `route.component`

[Section titled route.component](#routecomponent)

**Type:** `string`  

**Added in:** `astro@4.14.0`

The `component` property indicates the entrypoint that will be rendered on the route. You can access this value before the routes are built to configure on-demand server rendering for that page.

##### `route.prerender`

[Section titled route.prerender](#routeprerender)

**Type:** `boolean`  
**Default:** `undefined`  

**Added in:** `astro@4.14.0`

The `prerender` property is used to configure [on-demand server rendering](/en/guides/on-demand-rendering/#enabling-on-demand-rendering) for a route. If the route file contains an explicit `export const prerender` value, the value will be used as the default instead of `undefined`.

astro.config.mjs

    import { defineConfig } from 'astro/config';
    export default defineConfig({  integrations: [setPrerender()],});
    function setPrerender() {  return {    name: 'set-prerender',    hooks: {      'astro:route:setup': ({ route }) => {        if (route.component.endsWith('/blog/[slug].astro')) {          route.prerender = true;        }      },    },  };}

If the final value after running all the hooks is `undefined`, the route will fall back to a prerender default based on the [`output` option](/en/reference/configuration-reference/#output): prerendered for `static` mode, and on-demand rendered for `server` mode.

### `astro:routes:resolved`

[Section titled astro:routes:resolved](#astroroutesresolved)

**Added in:** `astro@5.0.0`

**Previous hook:** [`astro:route:setup`](#astroroutesetup)

**Next hook:** [`astro:config:done`](#astroconfigdone) (only during setup)

**When:** In `astro dev`, it also runs on every change to a file based route (added/removed/updated).

**Why:** To access routes and their metadata

    'astro:routes:resolved'?: (options: {  routes: IntegrationResolvedRoute[];  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `routes` option

[Section titled routes option](#routes-option)

**Type:** [`IntegrationResolvedRoute[]`](#integrationresolvedroute-type-reference)

A list of all routes with their associated metadata.

Example use:

my-integration.mjs

    const integration = () => {  return {    name: 'my-integration',    hooks: {      'astro:routes:resolved': ({ routes }) => {        const projectRoutes = routes.filter(r => r.origin === 'project').map(r => r.pattern)
            console.log(projectRoutes)      },    }  }}

### `astro:config:done`

[Section titled astro:config:done](#astroconfigdone)

**Previous hook:** [`astro:routes:resolved`](#astroroutesresolved)

**Next hook:** [`astro:server:setup`](#astroserversetup) when running in “dev” mode, or [`astro:build:start`](#astrobuildstart) during production builds

**When:** After the Astro config has resolved and other integrations have run their `astro:config:setup` hooks.

**Why:** To retrieve the final config for use in other hooks.

    'astro:config:done'?: (options: {  config: AstroConfig;  setAdapter: (adapter: AstroAdapter) => void;  injectTypes: (injectedType: InjectedType) => URL;  logger: AstroIntegrationLogger;  buildOutput: 'static' | 'server';}) => void | Promise<void>;

#### `config` option

[Section titled config option](#config-option-1)

**Type:** `AstroConfig`

A read-only copy of the user-supplied [Astro config](/en/reference/configuration-reference/). This is resolved _after_ other integrations have run.

#### `setAdapter()` option

[Section titled setAdapter() option](#setadapter-option)

**Type:** `(adapter: AstroAdapter) => void;`

Makes the integration an adapter. Read more in the [adapter API](/en/reference/adapter-reference/).

#### `injectTypes()` option

[Section titled injectTypes() option](#injecttypes-option)

**Type:** `(injectedType: { filename: string; content: string }) => URL`  

**Added in:** `astro@4.14.0`

Allows you to inject types into your user’s project by adding a new `*.d.ts` file.

The `filename` property will be used to generate a file at `/.astro/integrations/<normalized_integration_name>/<normalized_filename>.d.ts` and must end with `".d.ts"`.

The `content` property will create the body of the file and must be valid TypeScript.

Additionally, `injectTypes()` returns a URL to the normalized path so you can overwrite its content later on, or manipulate it in any way you want.

    const path = injectTypes({  filename: "types.d.ts",  content: "declare module 'virtual:integration' {}"})console.log(path) // URL

#### `buildOutput` option

[Section titled buildOutput option](#buildoutput-option)

**Type:** `'static' | 'server'`  

**Added in:** `astro@5.0.0`

Allows you to adapt the logic of your integration depending on the user’s project output.

### `astro:server:setup`

[Section titled astro:server:setup](#astroserversetup)

**Previous hook:** [`astro:config:done`](#astroconfigdone)

**Next hook:** [`astro:server:start`](#astroserverstart)

**When:** Just after the Vite server is created in “dev” mode, but before the `listen()` event is fired. [See Vite’s createServer API](https://vite.dev/guide/api-javascript.html#createserver) for more.

**Why:** To update Vite server options and middleware, or enable support for refreshing the content layer.

    'astro:server:setup'?: (options: {  server: vite.ViteDevServer;  logger: AstroIntegrationLogger;  toolbar: ReturnType<typeof getToolbarServerCommunicationHelpers>;  refreshContent: (options: {    loaders?: Array<string>;    context?: Record<string, any>;  }) => Promise<void>;}) => void | Promise<void>;

#### `server` option

[Section titled server option](#server-option)

**Type:** [`ViteDevServer`](https://vite.dev/guide/api-javascript.html#vitedevserver)

A mutable instance of the Vite server used in “dev” mode. For instance, this is [used by our Partytown integration](/en/guides/integrations-guide/partytown/) to inject the Partytown server as middleware:

    export default {  name: 'partytown',  hooks: {    'astro:server:setup': ({ server }) => {      server.middlewares.use(        function middleware(req, res, next) {          // handle requests        }      );    }  }}

#### `toolbar` option

[Section titled toolbar option](#toolbar-option)

**Type:** `ReturnType<typeof getToolbarServerCommunicationHelpers>`  

**Added in:** `astro@4.7.0`

An object providing callback functions to interact with the [dev toolbar](/en/reference/dev-toolbar-app-reference/):

##### `on()`

[Section titled on()](#on)

**Type:** `<T>(event: string, callback: (data: T) => void) => void`  

A function that takes an event name as first argument and a callback function as second argument. This allows you to receive a message from a dev toolbar app with data associated to that event.

##### `onAppInitialized()`

[Section titled onAppInitialized()](#onappinitialized)

**Type:** `(appId: string, callback: (data: Record<string, never>) => void) => void`  

A function fired when a dev toolbar app is initialized. The first argument is the id of the app that was initialized. The second argument is a callback function to run when the app is initialized.

##### `onAppToggled()`

[Section titled onAppToggled()](#onapptoggled)

**Type:** `(appId: string, callback: (data: { state: boolean; }) => void) => void`  

A function fired when a dev toolbar app is toggled on or off. The first argument is the id of the app that was toggled. The second argument is a callback function providing the state to execute when the application is toggled.

##### `send()`

[Section titled send()](#send)

**Type:** `<T>(event: string, payload: T) => void`  

A function that sends a message to the dev toolbar that an app can listen for. This takes an event name as the first argument and a payload as the second argument which can be any serializable data.

#### `refreshContent()` option

[Section titled refreshContent() option](#refreshcontent-option)

**Type:** `(options: { loaders?: Array<string>; context?: Record<string, any>; }) => Promise<void>`  

**Added in:** `astro@5.0.0`

A function for integrations to trigger an update to the content layer during `astro dev`. This can be used, for example, to register a webhook endpoint during dev, or to open a socket to a CMS to listen for changes.

By default, `refreshContent` will refresh all collections. You can optionally pass a `loaders` property, which is an array of loader names. If provided, only collections that use those loaders will be refreshed. For example, A CMS integration could use this property to only refresh its own collections.

You can also pass a `context` object to the loaders. This can be used to pass arbitrary data such as the webhook body, or an event from the websocket.

my-integration.ts

    {  name: 'my-integration',  hooks: {    'astro:server:setup': async ({ server, refreshContent }) => {      // Register a dev server webhook endpoint      server.middlewares.use('/_refresh', async (req, res) => {        if(req.method !== 'POST') {          res.statusCode = 405          res.end('Method Not Allowed');          return        }        let body = '';        req.on('data', chunk => {          body += chunk.toString();        });        req.on('end', async () => {          try {            const webhookBody = JSON.parse(body);            await refreshContent({              context: { webhookBody },              loaders: ['my-loader']            });            res.writeHead(200, { 'Content-Type': 'application/json' });            res.end(JSON.stringify({ message: 'Content refreshed successfully' }));          } catch (error) {            res.writeHead(500, { 'Content-Type': 'application/json' });            res.end(JSON.stringify({ error: 'Failed to refresh content: ' + error.message }));          }        });      });    }  }}

The loader can then access the `refreshContextData` property to get the webhook body. See the [`refreshContextData`](/en/reference/content-loader-reference/#refreshcontextdata) property for more information.

### `astro:server:start`

[Section titled astro:server:start](#astroserverstart)

**Previous hook:** [`astro:server:setup`](#astroserversetup)

**Next hook:** [`astro:server:done`](#astroserverdone)

**When:** Just after the server’s `listen()` event has fired.

**Why:** To intercept network requests at the specified address. If you intend to use this address for middleware, consider using `astro:server:setup` instead.

    'astro:server:start'?: (options: {  address: AddressInfo;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `address` option

[Section titled address option](#address-option)

**Type:** [`AddressInfo`](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules__types_node_net_d_._net_.addressinfo.html)

The address, family and port number supplied by the [Node.js Net module](https://nodejs.org/api/net.html).

### `astro:server:done`

[Section titled astro:server:done](#astroserverdone)

**Previous hook:** [`astro:server:start`](#astroserverstart)

**When:** Just after the dev server is closed.

**Why:** To run any cleanup events you may trigger during the `astro:server:setup` or `astro:server:start` hooks.

    'astro:server:done'?: (options: {  logger: AstroIntegrationLogger;}) => void | Promise<void>;

### `astro:build:start`

[Section titled astro:build:start](#astrobuildstart)

**Previous hook:** [`astro:config:done`](#astroconfigdone)

**Next hook:** [`astro:build:setup`](#astrobuildsetup)

**When:** After the `astro:config:done` event, but before the production build begins.

**Why:** To set up any global objects or clients needed during a production build. This can also extend the build configuration options in the [adapter API](/en/reference/adapter-reference/).

    'astro:build:start'?: (options: {  logger: AstroIntegrationLogger;}) => void | Promise<void>;

### `astro:build:setup`

[Section titled astro:build:setup](#astrobuildsetup)

**Previous hook:** [`astro:build:start`](#astrobuildstart)

**Next hook:** [`astro:build:ssr`](#astrobuildssr)

**When:** After the `astro:build:start` hook, runs immediately before the build.

**Why:** At this point, the Vite config for the build has been completely constructed, this is your final chance to modify it. This can be useful for example to overwrite some defaults. If you’re not sure whether you should use this hook or `astro:build:start`, use `astro:build:start` instead.

    'astro:build:setup'?: (options: {  vite: vite.InlineConfig;  pages: Map<string, PageBuildData>;  target: 'client' | 'server';  updateConfig: (newConfig: vite.InlineConfig) => void;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `vite` option

[Section titled vite option](#vite-option)

**Type:** [`InlineConfig`](https://vite.dev/guide/api-javascript.html#inlineconfig)

An object that allows you to access the Vite configuration used in the build.

This can be useful if you need to access configuration options in your integration:

    export default {  name: 'my-integration',  hooks: {    'astro:build:setup': ({ vite }) => {      const { publicDir, root } = vite;    },  }}

#### `pages` option

[Section titled pages option](#pages-option)

**Type:** `Map<string, [PageBuildData](https://github.com/withastro/astro/blob/3b10b97a4fecd1dfd959b160a07b5b8427fe40a7/packages/astro/src/core/build/types.ts#L17-L23)>`

A `Map` with a list of pages as key and their build data as value.

This can be used to perform an action if a route matches a criteria:

    export default {  name: 'my-integration',  hooks: {    'astro:build:setup': ({ pages }) => {      pages.forEach((data) => {        if (data.route.pattern.test("/blog")) {          console.log(data.route.type);        }      });    },  }}

#### `target` option

[Section titled target option](#target-option)

**Type:** `'client' | 'server'`

Builds are separated in two distinct phases: `client` and `server`. This option allow you to determine the current build phase.

This can be used to perform an action only in a specific phase:

    export default {  name: 'my-integration',  hooks: {    'astro:build:setup': ({ target }) => {      if (target === "server") {        // do something in server build phase      }    },  }}

#### `updateConfig()` option

[Section titled updateConfig() option](#updateconfig-option-1)

**Type:** `(newConfig: [InlineConfig](https://vite.dev/guide/api-javascript.html#inlineconfig)) => void`

A callback function to update the [Vite](https://vite.dev/) options used in the build. Any config you provide **will be merged with the user config + other integration config updates**, so you are free to omit keys!

For example, this can be used to supply a plugin to the user’s project:

    import awesomeCssPlugin from 'awesome-css-vite-plugin';
    export default {  name: 'my-integration',  hooks: {    'astro:build:setup': ({ updateConfig }) => {      updateConfig({        plugins: [awesomeCssPlugin()],      })    }  }}

### `astro:build:ssr`

[Section titled astro:build:ssr](#astrobuildssr)

**Previous hook:** [`astro:build:setup`](#astrobuildsetup)

**Next hook:** [`astro:build:generated`](#astrobuildgenerated)

**When:** After a production SSR build has completed.

**Why:** To access the SSR manifest and map of the emitted entry points. This is useful when creating custom SSR builds in plugins or integrations.

*   `entryPoints` maps a page route to the physical file emitted after the build;
*   `middlewareEntryPoint` is the file system path of the middleware file;

    'astro:build:ssr'?: (options: {  manifest: SerializedSSRManifest;  entryPoints: Map<IntegrationRouteData, URL>;  middlewareEntryPoint: URL | undefined;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `manifest` option

[Section titled manifest option](#manifest-option)

**Type:** [`SerializedSSRManifest`](https://github.com/withastro/astro/blob/3b10b97a4fecd1dfd959b160a07b5b8427fe40a7/packages/astro/src/core/app/types.ts#L91-L109)

Allows you to create a custom build by accessing the SSR manifest.

    export default {  name: 'my-integration',  hooks: {    'astro:build:ssr': ({ manifest }) => {      const { i18n } = manifest;      if (i18n?.strategy === "domains-prefix-always") {        // do something      }    },  },}

#### `entryPoints` option

[Section titled entryPoints option](#entrypoints-option)

**Type:** `Map<[IntegrationRouteData](#integrationroutedata-type-reference), URL>`  

**Added in:** `astro@2.7.0`

A `Map` of the emitted entry points with the `IntegrationRouteData` as key and the physical file URL as value.

    export default {  name: 'my-integration',  hooks: {    'astro:build:ssr': ({ entryPoints }) => {      entryPoints.forEach((url) => {        console.log(url.href);      });    },  },}

#### `middlewareEntryPoint` option

[Section titled middlewareEntryPoint option](#middlewareentrypoint-option)

**Type:** `URL | undefined`  

**Added in:** `astro@2.8.0`

Exposes the [middleware](/en/guides/middleware/) file path.

    export default {  name: 'my-integration',  hooks: {    'astro:build:ssr': ({ middlewareEntryPoint }) => {      if (middlewareEntryPoint) {        // do some operations if a middleware exist      }    },  },}

### `astro:build:generated`

[Section titled astro:build:generated](#astrobuildgenerated)

**Added in:** `astro@1.3.0`

**Previous hook:** [`astro:build:ssr`](#astrobuildssr)

**Next hook:** [`astro:build:done`](#astrobuilddone)

**When:** After a static production build has finished generating routes and assets.

**Why:** To access generated routes and assets **before** build artifacts are cleaned up. This is a very uncommon use case. We recommend using [`astro:build:done`](#astrobuilddone) unless you really need to access the generated files before cleanup.

    'astro:build:generated'?: (options: {  dir: URL;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `dir` option

[Section titled dir option](#dir-option)

**Type:** [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)

A URL path to the build output directory. Note that if you need a valid absolute path string, you should use Node’s built-in [`fileURLToPath`](https://nodejs.org/api/url.html#urlfileurltopathurl-options) utility.

    import { fileURLToPath } from 'node:url';
    export default {  name: 'my-integration',  hooks: {    'astro:build:generated': ({ dir }) => {      const outFile = fileURLToPath(new URL('./my-integration.json', dir));    }  }}

### `astro:build:done`

[Section titled astro:build:done](#astrobuilddone)

**Previous hook:** [`astro:build:generated`](#astrobuildgenerated)

**When:** After a production build (SSG or SSR) has completed.

**Why:** To access generated routes and assets for extension (ex. copy content into the generated `/assets` directory). If you plan to transform generated assets, we recommend exploring the [Vite Plugin API](https://vite.dev/guide/api-plugin.html) and [configuring via `astro:config:setup`](#updateconfig-option) instead.

    'astro:build:done'?: (options: {  pages: { pathname: string }[];  dir: URL;  /** @deprecated Use the `assets` map and the new `astro:routes:resolved` hook */  routes: IntegrationRouteData[];  assets: Map<string, URL[]>;  logger: AstroIntegrationLogger;}) => void | Promise<void>;

#### `dir` option

[Section titled dir option](#dir-option-1)

**Type:** [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)

A URL path to the build output directory. Note that if you need a valid absolute path string, you should use Node’s built-in [`fileURLToPath`](https://nodejs.org/api/url.html#urlfileurltopathurl-options) utility.

    import { writeFile } from 'node:fs/promises';import { fileURLToPath } from 'node:url';
    export default function myIntegration() {  return {    hooks: {      'astro:build:done': async ({ dir }) => {        const metadata = await getIntegrationMetadata();        // Use fileURLToPath to get a valid, cross-platform absolute path string        const outFile = fileURLToPath(new URL('./my-integration.json', dir));        await writeFile(outFile, JSON.stringify(metadata));      }    }  }}

#### `routes` option

[Section titled routes option](#routes-option-1)

Caution

This property is deprecated since v5.0. Check the [migration guide](/en/guides/upgrade-to/v5/#deprecated-routes-on-astrobuilddone-hook-integration-api).

**Type:** [`IntegrationRouteData[]`](#integrationroutedata-type-reference)

A list of all generated routes alongside their associated metadata.

You can reference the full `IntegrationRouteData` type below, but the most common properties are:

*   `component` - the input file path relative to the project root
*   `pathname` - the output file URL (undefined for routes using `[dynamic]` and `[...spread]` params)

#### `assets` option

[Section titled assets option](#assets-option)

**Type:** `Map<string, URL[]>`  

**Added in:** `astro@5.0.0`

Contains URLs to output files paths, grouped by [`IntegrationResolvedRoute`](#integrationresolvedroute-type-reference) `pattern` property.

#### `pages` option

[Section titled pages option](#pages-option-1)

**Type:** `{ pathname: string }[]`

A list of all generated pages. It is an object with one property.

*   `pathname` - the finalized path of the page.

### Custom hooks

[Section titled Custom hooks](#custom-hooks)

Custom hooks can be added to integrations by extending the `IntegrationHooks` interface through [global augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation).

    declare global {  namespace Astro {    export interface IntegrationHook {      'your:hook': (params: YourHookParameters) => Promise<void>    }  }}

Astro reserves the `astro:` prefix for future built-in hooks. Please choose a different prefix when naming your custom hook.

Integration types reference
---------------------------

[Section titled Integration types reference](#integration-types-reference)

### `AstroIntegrationLogger`

[Section titled AstroIntegrationLogger](#astrointegrationlogger)

An instance of the Astro logger, useful to write logs. This logger uses the same [log level](/en/reference/cli-reference/#--verbose) configured via CLI.

**Methods available** to write to terminal:

*   `logger.info("Message")`;
*   `logger.warn("Message")`;
*   `logger.error("Message")`;
*   `logger.debug("Message")`;

All the messages are prepended with a label that has the same value as the name of the integration.

integration.ts

    import type { AstroIntegration } from "astro";export function formatIntegration(): AstroIntegration {  return {    name: "astro-format",    hooks: {      "astro:build:done": ({ logger }) => {        // do something        logger.info("Integration ready.");      }    }  }}

The example above will log a message that includes the provided `info` message:

Terminal window

    [astro-format] Integration ready.

To log some messages with a different label, use the `.fork` method to specify an alternative to the default `name`:

integration.ts

    import type { AstroIntegration } from "astro";export function formatIntegration(): AstroIntegration {  return {    name: "astro-format",    hooks: {      "astro:config:done": ({ logger }) => {        // do something        logger.info("Integration ready.");      },      "astro:build:done": ({ logger }) => {        const buildLogger = logger.fork("astro-format/build");        // do something        buildLogger.info("Build finished.")      }    }  }}

The example above will produce logs with `[astro-format]` by default, and `[astro-format/build]` when specified:

Terminal window

    [astro-format] Integration ready.[astro-format/build] Build finished.

### `HookParameters`

[Section titled HookParameters](#hookparameters)

You can get the type of a hook’s arguments by passing the hook’s name to the `HookParameters` utility type. In the following example, a function’s `options` argument is typed to match the parameters of the `astro:config:setup` hook:

    import type { HookParameters } from 'astro';
    function mySetup(options: HookParameters<'astro:config:setup'>) {  options.updateConfig({ /* ... */ });}

### `IntegrationResolvedRoute` type reference

[Section titled IntegrationResolvedRoute type reference](#integrationresolvedroute-type-reference)

    interface IntegrationResolvedRoute {  pattern: RouteData['route'];  patternRegex: RouteData['pattern'];  entrypoint: RouteData['component'];  isPrerendered: RouteData['prerender'];  redirectRoute?: IntegrationResolvedRoute;  generate: (data?: any) => string;  params: string[];  pathname?: string;  segments: RoutePart[][];  type: RouteType;  redirect?: RedirectConfig;  origin: 'internal' | 'external' | 'project';}

#### `pattern`

[Section titled pattern](#pattern)

**Type:** `string`

Allows you to identify the type of route based on its path. Here are some examples of paths associated with their pattern:

*   `src/pages/index.astro` will be `/`
*   `src/pages/blog/[...slug].astro` will be `/blog/[...slug]`
*   `src/pages/site/[blog]/[...slug].astro` will be `/site/[blog]/[...slug]`

#### `patternRegex`

[Section titled patternRegex](#patternregex)

**Type:** `RegExp`

Allows you to access a regex used for matching an input URL against a requested route.

For example, given a `[fruit]/about.astro` path, the regex will be `/^\/([^/]+?)\/about\/?$/`. Using `pattern.test("banana/about")` will return `true`.

#### `entrypoint`

[Section titled entrypoint](#entrypoint)

**Type:** `string`

The URL pathname of the source component.

#### `isPrerendered`

[Section titled isPrerendered](#isprerendered)

**Type:** `boolean`

Determines whether the route use [on demand rendering](/en/guides/on-demand-rendering/). The value will be `true` for projects configured with:

*   `output: 'static'` when the route does not export `const prerender = true`
*   `output: 'server'` when the route exports `const prerender = false`

#### `redirectRoute`

[Section titled redirectRoute](#redirectroute)

**Type:** `IntegrationResolvedRoute | undefined`

When the value of `IntegrationResolvedRoute.type` is `redirect`, the value will be the `IntegrationResolvedRoute` to redirect to. Otherwise, the value will be undefined.

#### `generate()`

[Section titled generate()](#generate)

**Type:** `(data?: any) => string`

A function that provides the optional parameters of the route, interpolates them with the route pattern, and returns the path name of the route.

For example, with a route such as `/blog/[...id].astro`, the `generate` function could return:

    console.log(generate({ id: 'presentation' })) // will log `/blog/presentation`

#### `params`

[Section titled params](#params)

**Type:** `string[]`

Allows you to access the route `params`. For example, when a project uses the following [dynamic routes](/en/guides/routing/#dynamic-routes) `/pages/[lang]/[...slug].astro`, the value will be `['lang', '...slug']`.

#### `pathname`

[Section titled pathname](#pathname)

**Type:** `string | undefined`

For regular routes, the value will be the URL pathname where this route will be served. When the project uses [dynamic routes](/en/guides/routing/#dynamic-routes) (ie. `[dynamic]` or `[...spread]`), the pathname will be undefined.

#### `segments`

[Section titled segments](#segments)

**Type:** `[RoutePart](https://github.com/withastro/astro/blob/3b10b97a4fecd1dfd959b160a07b5b8427fe40a7/packages/astro/src/types/public/internal.ts#L154-L158)[][]`

Allows you to access the route [`params`](#params) with additional metadata. Each object contains the following properties:

*   `content`: the `param` name,
*   `dynamic`: whether the route is dynamic or not,
*   `spread`: whether the dynamic route uses the spread syntax or not.

For example, the following route `/pages/[blog]/[...slug].astro` will output the segments:

    [  [ { content: 'pages', dynamic: false, spread: false } ],  [ { content: 'blog', dynamic: true, spread: false } ],  [ { content: '...slug', dynamic: true, spread: true } ]]

#### `type`

[Section titled type](#type)

**Type:** `RouteType`

Allows you to identify the type of route. Possible values are:

*   `page`: a route that lives in the file system, usually an Astro component
*   `endpoint`: a route that lives in the file system, usually a JS file that exposes endpoints methods
*   `redirect`: a route points to another route that lives in the file system
*   `fallback`: a route that doesn’t exist in the file system that needs to be handled with other means, usually the middleware

#### `redirect`

[Section titled redirect](#redirect)

**Type:** `[RedirectConfig](https://github.com/withastro/astro/blob/3b10b97a4fecd1dfd959b160a07b5b8427fe40a7/packages/astro/src/types/public/config.ts#L39-L44) | undefined`

Allows you to access the route to redirect to. This can be a string or an object containing information about the status code and its destination.

#### `origin`

[Section titled origin](#origin)

**Type:** `'internal' | 'external' | 'project'`

Determines if a route comes from Astro core (`internal`), an integration (`external`) or the user’s project (`project`).

### `IntegrationRouteData` type reference

[Section titled IntegrationRouteData type reference](#integrationroutedata-type-reference)

Caution

This type is deprecated since v5.0. Use [`IntegrationResolvedRoute`](#integrationresolvedroute-type-reference) instead.

A smaller version of the `RouteData` that is used in the integrations.

    interface IntegrationRouteData {  type: RouteType;  component: string;  pathname?: string;  pattern: RegExp;  params: string[];  segments: { content: string; dynamic: boolean; spread: boolean; }[][];  generate: (data?: any) => string;  prerender: boolean;  distURL?: URL[];  redirect?: RedirectConfig;  redirectRoute?: IntegrationRouteData;}

#### `type`

[Section titled type](#type-1)

**Type:** `RouteType`

Allows you to identify the type of the route. The value can be:

*   `page`: a route that lives in the file system, usually an Astro component
*   `endpoint`: a route that lives in the file system, usually a JS file that exposes endpoints methods
*   `redirect`: a route that points to another route that lives in the file system
*   `fallback`: a route that doesn’t exist in the file system and needs to be handled with other means, usually middleware

#### `component`

[Section titled component](#component)

**Type:** `string`

Allows you to access the source component URL pathname.

#### `pathname`

[Section titled pathname](#pathname-1)

**Type:** `string | undefined`

For regular routes, the value will be the URL pathname where this route will be served. When the project uses [dynamic routes](/en/guides/routing/#dynamic-routes) (ie. `[dynamic]` or `[...spread]`), the pathname will be undefined.

#### `pattern`

[Section titled pattern](#pattern-1)

**Type:** `RegExp`

Allows you to access a regex used for matching an input URL against a requested route.

For example, given a `[fruit]/about.astro` path, the regex will be `/^\/([^/]+?)\/about\/?$/`. Using `pattern.test("banana/about")` will return `true`.

#### `params`

[Section titled params](#params-1)

**Type:** `string[]`

Allows you to access the route `params`. For example, when a project uses the following [dynamic routes](/en/guides/routing/#dynamic-routes) `/pages/[lang]/[...slug].astro`, the value will be `['lang', '...slug']`.

#### `segments`

[Section titled segments](#segments-1)

**Type:** `{ content: string; dynamic: boolean; spread: boolean; }[][]`

Allows you to access the route [`params`](#params-1) with additional metadata. Each object contains the following properties:

*   `content`: the `param`,
*   `dynamic`: whether the route is dynamic or not,
*   `spread`: whether the dynamic route uses the spread syntax or not.

For example, the following route `/pages/[lang]/index.astro` will output the segments `[[ { content: 'lang', dynamic: true, spread: false } ]]`.

#### `generate()`

[Section titled generate()](#generate-1)

**Type:** `(data?: any) => string`

A function that provides the optional parameters of the route, interpolates them with the route pattern, and returns the path name of the route.

For example, with a route such as `/blog/[...id].astro`, the `generate` function could return:

    console.log(generate({ id: 'presentation' })) // will log `/blog/presentation`

#### `prerender`

[Section titled prerender](#prerender)

**Type:** `boolean`

Determines whether the route is prerendered or not.

#### `distURL`

[Section titled distURL](#disturl)

**Type:** `URL[] | undefined`

The paths of the physical files emitted by this route. When a route **isn’t** prerendered, the value is either `undefined` or an empty array.

#### `redirect`

[Section titled redirect](#redirect-1)

**Type:** `[RedirectConfig](https://github.com/withastro/astro/blob/3b10b97a4fecd1dfd959b160a07b5b8427fe40a7/packages/astro/src/types/public/config.ts#L39-L44) | undefined`

Allows you to access the route to redirect to. This can be a string or an object containing information about the status code and its destination.

#### `redirectRoute`

[Section titled redirectRoute](#redirectroute-1)

**Type:** `IntegrationRouteData | undefined`

When the value of `RouteData.type` is `redirect`, the value will contains the `IntegrationRouteData` of the route to redirect to. Otherwise, the value will be undefined.

Allow installation with `astro add`
-----------------------------------

[Section titled Allow installation with astro add](#allow-installation-with-astro-add)

[The `astro add` command](/en/reference/cli-reference/#astro-add) allows users to easily add integrations and adapters to their project. If you want _your_ integration to be installable with this tool, **add `astro-integration` to the `keywords` field in your `package.json`**:

    {  "name": "example",  "keywords": ["astro-integration"],}

Once you [publish your integration to npm](https://docs.npmjs.com/cli/v8/commands/npm-publish), running `astro add example` will install your package with any peer dependencies specified in your `package.json`. This will also apply your integration to the user’s `astro.config.*` like so:

astro.config.mjs

    import { defineConfig } from 'astro/config';import example from 'example';
    export default defineConfig({  integrations: [example()],})

Caution

This assumes your integration definition is 1) a `default` export and 2) a function. Ensure this is true before adding the `astro-integration` keyword!

Integration Ordering
--------------------

[Section titled Integration Ordering](#integration-ordering)

All integrations are run in the order that they are configured. For instance, for the array `[react(), svelte()]` in a user’s `astro.config.*`, `react` will run before `svelte`.

Your integration should ideally run in any order. If this isn’t possible, we recommend documenting that your integration needs to come first or last in your user’s `integrations` configuration array.

Combine integrations into presets
---------------------------------

[Section titled Combine integrations into presets](#combine-integrations-into-presets)

An integration can also be written as a collection of multiple, smaller integrations. We call these collections **presets.** Instead of creating a factory function that returns a single integration object, a preset returns an _array_ of integration objects. This is useful for building complex features out of multiple integrations.

    integrations: [  // Example: where examplePreset() returns: [integrationOne, integrationTwo, ...etc]  examplePreset()]

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   [Build your own Astro Integrations](https://www.freecodecamp.org/news/how-to-use-the-astro-ui-framework/#chapter-8-build-your-own-astro-integrations-1) - by Emmanuel Ohans on FreeCodeCamp
*   [Astro Integration Template](https://github.com/florian-lefebvre/astro-integration-template) - by Florian Lefebvre on GitHub

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/integrations-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
astro:transitions](/en/reference/modules/astro-transitions/) [Next  
Adapter API](/en/reference/adapter-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

