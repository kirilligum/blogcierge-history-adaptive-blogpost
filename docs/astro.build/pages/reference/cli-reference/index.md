CLI Commands
============

You can use the Command-Line Interface (CLI) provided by Astro to develop, build, and preview your project from a terminal window.

### `astro` commands

[Section titled astro commands](#astro-commands)

Use the CLI by running one of the **commands** documented on this page with your preferred package manager, optionally followed by any **flags**. Flags customize the behavior of a command.

One of the commands you’ll use most often is `astro dev`. This command starts the development server and gives you a live, updating preview of your site in a browser as you work:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-1861)
*   [pnpm](#tab-panel-1862)
*   [Yarn](#tab-panel-1863)

Terminal window

    # start the development servernpx astro dev

Terminal window

    # start the development serverpnpm astro dev

Terminal window

    # start the development serveryarn astro dev

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

You can type `astro --help` in your terminal to display a list of all available commands:

*   [npm](#tab-panel-1864)
*   [pnpm](#tab-panel-1865)
*   [Yarn](#tab-panel-1866)

Terminal window

    npx astro --help

Terminal window

    pnpm astro --help

Terminal window

    yarn astro --help

The following message will display in your terminal:

Terminal window

    astro [command] [...flags]
    Commands              add  Add an integration.            build  Build your project and write it to disk.            check  Check your project for errors.       create-key  Create a cryptography key              dev  Start the development server.             docs  Open documentation in your web browser.             info  List info about your current Astro setup.          preview  Preview your build locally.             sync  Generate TypeScript types for all Astro modules.      preferences  Configure user preferences.        telemetry  Configure telemetry settings.
    Global Flags  --config <path>  Specify your config file.    --root <path>  Specify your project root folder.     --site <url>  Specify your project site.--base <pathname>  Specify your project base.        --verbose  Enable verbose logging.         --silent  Disable all logging.        --version  Show the version number and exit.           --help  Show this help message.

You can add the `--help` flag after any command to get a list of all the flags for that command.

*   [npm](#tab-panel-1867)
*   [pnpm](#tab-panel-1868)
*   [Yarn](#tab-panel-1869)

Terminal window

    # get a list of all flags for the `dev` commandnpm run dev -- --help

Terminal window

    # get a list of all flags for the `dev` commandpnpm dev --help

Terminal window

    # get a list of all flags for the `dev` commandyarn dev --help

The following message will display in your terminal:

Terminal window

    astro dev [...flags]
    Flags                 --port  Specify which port to run on. Defaults to 4321.                 --host  Listen on all addresses, including LAN and public addresses.--host <custom-address>  Expose on a network IP address at <custom-address>                 --open  Automatically open the app in the browser on server start                --force  Clear the content layer cache, forcing a full rebuild.            --help (-h)  See all available flags.

Note

The extra `--` before any flag is necessary for `npm` to pass your flags to the `astro` command.

### `package.json` scripts

[Section titled package.json scripts](#packagejson-scripts)

You can also use scripts in `package.json` for shorter versions of these commands. Using a script allows you to use the same commands that you may be familiar with from other projects, such as `npm run build`.

The following scripts for the most common `astro` commands (`astro dev`, `astro build`, and `astro preview`) are added for you automatically when you create a project using [the `create astro` wizard](/en/install-and-setup/).

When you follow the instructions to [install Astro manually](/en/install-and-setup/#manual-setup), you are instructed to add these scripts yourself. You can also add more scripts to this list manually for any commands you use frequently.

package.json

    {  "scripts": {    "dev": "astro dev",    "build": "astro build",    "preview": "astro preview"  }}

You will often use these `astro` commands, or the scripts that run them, without any flags. Add flags to the command when you want to customize the command’s behavior. For example, you may wish to start the development server on a different port, or build your site with verbose logs for debugging.

*   [npm](#tab-panel-1870)
*   [pnpm](#tab-panel-1871)
*   [Yarn](#tab-panel-1872)

Terminal window

    # run the dev server on port 8080 using the `dev` script in `package.json`npm run dev -- --port 8080
    # build your site with verbose logs using the `build` script in `package.json`npm run build -- --verbose

Terminal window

    # run the dev server on port 8080 using the `dev` script in `package.json`pnpm dev --port 8080
    # build your site with verbose logs using the `build` script in `package.json`pnpm build --verbose

Terminal window

    # run the dev server on port 8080 using the `dev` script in `package.json`yarn dev --port 8080
    # build your site with verbose logs using the `build` script in `package.json`yarn build --verbose

`astro dev`
-----------

[Section titled astro dev](#astro-dev)

Runs Astro’s development server. This is a local HTTP server that doesn’t bundle assets. It uses Hot Module Replacement (HMR) to update your browser as you save changes in your editor.

The following hotkeys can be used in the terminal where the Astro development server is running:

*   `s + enter` to sync the content layer data (content and types).
*   `o + enter` to open your Astro site in the browser.
*   `q + enter` to quit the development server.

`astro build`
-------------

[Section titled astro build](#astro-build)

Builds your site for deployment. By default, this will generate static files and place them in a `dist/` directory. If any routes are [rendered on demand](/en/guides/on-demand-rendering/), this will generate the necessary server files to serve your site.

### Flags

[Section titled Flags](#flags)

The command accepts [common flags](#common-flags) and the following additional flags:

#### `--devOutput`

[Section titled --devOutput](#--devoutput)

**Added in:** `astro@5.0.0`

Outputs a development-based build similar to code transformed in `astro dev`. This can be useful to test build-only issues with additional debugging information included.

`astro preview`
---------------

[Section titled astro preview](#astro-preview)

Starts a local server to serve the contents of your static directory (`dist/` by default) created by running `astro build`.

This command allows you to preview your site locally [after building](#astro-build) to catch any errors in your build output before deploying it. It is not designed to be run in production. For help with production hosting, check out our guide on [Deploying an Astro Website](/en/guides/deploy/).

Since Astro 1.5.0, the [Node adapter](/en/guides/integrations-guide/node/) supports `astro preview` for builds generated with on-demand rendering.

Can be combined with the [common flags](#common-flags) documented below.

`astro check`
-------------

[Section titled astro check](#astro-check)

Runs diagnostics (such as type-checking within `.astro` files) against your project and reports errors to the console. If any errors are found the process will exit with a code of **1**.

This command is intended to be used in CI workflows.

### Flags

Use these flags to customize the behavior of the command.

#### `--watch`

[Section titled --watch](#--watch)

The command will watch for any changes in your project, and will report any errors.

#### `--root <path-to-dir>`

[Section titled --root &lt;path-to-dir&gt;](#--root-path-to-dir)

Specifies a different root directory to check. Uses the current working directory by default.

#### `--tsconfig <path-to-file>`

[Section titled --tsconfig &lt;path-to-file&gt;](#--tsconfig-path-to-file)

Specifies a `tsconfig.json` file to use manually. If not provided, Astro will attempt to find a config, or infer the project’s config automatically.

#### `--minimumFailingSeverity <error|warning|hint>`

[Section titled --minimumFailingSeverity &lt;error|warning|hint&gt;](#--minimumfailingseverity-errorwarninghint)

Specifies the minimum severity needed to exit with an error code. Defaults to `error`.

For example, running `astro check --minimumFailingSeverity warning` will cause the command to exit with an error if any warnings are detected.

#### `--minimumSeverity <error|warning|hint>`

[Section titled --minimumSeverity &lt;error|warning|hint&gt;](#--minimumseverity-errorwarninghint)

Specifies the minimum severity to output. Defaults to `hint`.

For example, running `astro check --minimumSeverity warning` will show errors and warning, but not hints.

#### `--preserveWatchOutput`

[Section titled --preserveWatchOutput](#--preservewatchoutput)

Specifies not to clear the output between checks when in watch mode.

#### `--noSync`

[Section titled --noSync](#--nosync)

Specifies not to run `astro sync` before checking the project.

Read more about [type checking in Astro](/en/guides/typescript/#type-checking).

`astro sync`
------------

[Section titled astro sync](#astro-sync)

**Added in:** `astro@2.0.0`

Tip

Running `astro dev`, `astro build` or `astro check` will run the `sync` command as well.

Generates TypeScript types for all Astro modules. This sets up a [`.astro/types.d.ts` file](/en/guides/typescript/#setup) for type inferencing, and defines modules for features that rely on generated types:

*   The `astro:content` module for the [Content Collections API](/en/guides/content-collections/).
*   The `astro:db` module for [Astro DB](/en/guides/astro-db/).
*   The `astro:env` module for [Astro Env](/en/guides/environment-variables/).
*   The `astro:actions` module for [Astro Actions](/en/guides/actions/)

`astro add`
-----------

[Section titled astro add](#astro-add)

Adds an integration to your configuration. Read more in [the integrations guide](/en/guides/integrations-guide/#automatic-integration-setup).

`astro docs`
------------

[Section titled astro docs](#astro-docs)

Launches the Astro Docs website directly from the terminal.

`astro info`
------------

[Section titled astro info](#astro-info)

Reports useful information about your current Astro environment. Useful for providing information when opening an issue.

Terminal window

    astro info

Example output:

    Astro                    v3.0.12Node                     v20.5.1System                   macOS (arm64)Package Manager          pnpmOutput                   serverAdapter                  @astrojs/vercel/serverlessIntegrations             none

`astro preferences`
-------------------

[Section titled astro preferences](#astro-preferences)

Manage user preferences with the `astro preferences` command. User preferences are specific to individual Astro users, unlike the `astro.config.mjs` file which changes behavior for everyone working on a project.

User preferences are scoped to the current project by default, stored in a local `.astro/settings.json` file.

Using the `--global` flag, user preferences can also be applied to every Astro project on the current machine. Global user preferences are stored in an operating system-specific location.

### Available preferences

*   `devToolbar` — Enable or disable the development toolbar in the browser. (Default: `true`)
*   `checkUpdates` — Enable or disable automatic update checks for the Astro CLI. (Default: `true`)

The `list` command prints the current settings of all configurable user preferences. It also supports a machine-readable `--json` output.

Terminal window

    astro preferences list

Example terminal output:

Preference

Value

devToolbar.enabled

true

checkUpdates.enabled

true

You can `enable`, `disable`, or `reset` preferences to their default.

For example, to disable the devToolbar in a specific Astro project:

Terminal window

    astro preferences disable devToolbar

To disable the devToolbar in all Astro projects on the current machine:

Terminal window

    astro preferences disable --global devToolbar

The devToolbar can later be enabled with:

Terminal window

    astro preferences enable devToolbar

The `reset` command resets a preference to its default value:

Terminal window

    astro preferences reset devToolbar

`astro telemetry`
-----------------

[Section titled astro telemetry](#astro-telemetry)

Sets telemetry configuration for the current CLI user. Telemetry is anonymous data that provides the Astro team insights into which Astro features are most often used. For more information see [Astro’s telemetry page](https://astro.build/telemetry/).

Telemetry can be disabled with this CLI command:

Terminal window

    astro telemetry disable

Telemetry can later be re-enabled with:

Terminal window

    astro telemetry enable

The `reset` command resets the telemetry data:

Terminal window

    astro telemetry reset

Want to disable telemetry in CI environments?

Add the `astro telemetry disable` command to your CI scripts or set the `ASTRO_TELEMETRY_DISABLED` environment variable.

Common flags
------------

[Section titled Common flags](#common-flags)

### `--root <path>`

[Section titled --root &lt;path&gt;](#--root-path)

Specifies the path to the project root. If not specified, the current working directory is assumed to be the root.

The root is used for finding the Astro configuration file.

Terminal window

    astro --root myRootFolder/myProjectFolder dev

### `--config <path>`

[Section titled --config &lt;path&gt;](#--config-path)

Specifies the path to the config file relative to the project root. Defaults to `astro.config.mjs`. Use this if you use a different name for your configuration file or have your config file in another folder.

Terminal window

    astro --config config/astro.config.mjs dev

### `--force <string>`

[Section titled --force &lt;string&gt;](#--force-string)

**Added in:** `astro@5.0.0`

Clear the [content layer cache](/en/guides/content-collections/#defining-the-collection-loader), forcing a full rebuild.

### `--mode <string>`

[Section titled --mode &lt;string&gt;](#--mode-string)

**Added in:** `astro@5.0.0`

Configures the [`mode`](/en/reference/programmatic-reference/#mode) inline config for your project.

### `--outDir <path>`

[Section titled --outDir &lt;path&gt;](#--outdir-path)

**Added in:** `astro@3.3.0`

Configures the [`outDir`](/en/reference/configuration-reference/#outdir) for your project. Passing this flag will override the `outDir` value in your `astro.config.mjs` file, if one exists.

### `--site <url>`

[Section titled --site &lt;url&gt;](#--site-url)

Configures the [`site`](/en/reference/configuration-reference/#site) for your project. Passing this flag will override the `site` value in your `astro.config.mjs` file, if one exists.

### `--base <pathname>`

[Section titled --base &lt;pathname&gt;](#--base-pathname)

**Added in:** `astro@1.4.1`

Configures the [`base`](/en/reference/configuration-reference/#base) for your project. Passing this flag will override the `base` value in your `astro.config.mjs` file, if one exists.

### `--port <number>`

[Section titled --port &lt;number&gt;](#--port-number)

Specifies which port to run the dev server and preview server on. Defaults to `4321`.

### `--host [optional host address]`

[Section titled --host \[optional host address\]](#--host-optional-host-address)

Sets which network IP addresses the dev server and preview server should listen on (i.e. non-localhost IPs). This can be useful for testing your project on local devices like a mobile phone during development.

*   `--host` — listen on all addresses, including LAN and public addresses
*   `--host <custom-address>` — expose on a network IP address at `<custom-address>`

Caution

Do not use the `--host` flag to expose the dev server and preview server in a production environment. The servers are designed for local use while developing your site only.

### `--allowed-hosts`

[Section titled --allowed-hosts](#--allowed-hosts)

**Added in:** `astro@5.4.0`

Specifies the hostnames that Astro is allowed to respond to in `dev` or `preview` modes. Can be passed a comma-separated list of hostnames or `true` to allow any hostname.

Refer to [Vite’s `allowedHosts` feature](https://vite.dev/config/server-options.html#server-allowedhosts) for more information, including security implications of allowing hostnames.

### `--verbose`

[Section titled --verbose](#--verbose)

Enables verbose logging, which is helpful when debugging an issue.

### `--silent`

[Section titled --silent](#--silent)

Enables silent logging, which will run the server without any console output.

### `--open`

[Section titled --open](#--open)

Automatically opens the app in the browser on server start. Can be passed a full URL string (e.g. `--open http://example.com`) or a pathname (e.g. `--open /about`) to specify the URL to open.

Global flags
------------

[Section titled Global flags](#global-flags)

Use these flags to get information about the `astro` CLI.

### `--version`

[Section titled --version](#--version)

Prints the Astro version number and exits.

### `--help`

[Section titled --help](#--help)

Prints the help message and exits.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/cli-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Configuration Reference](/en/reference/configuration-reference/) [Next  
Imports reference](/en/guides/imports/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)