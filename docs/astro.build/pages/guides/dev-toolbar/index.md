Dev toolbar
===========

While the dev server is running, Astro includes a dev toolbar at the bottom of every page in your local browser preview.

This toolbar includes a number of useful tools for debugging and inspecting your site during development and can be [extended with more dev toolbar apps](#extending-the-dev-toolbar) found in the integrations directory. You can even [build your own toolbar apps](/en/recipes/making-toolbar-apps/) using the [Dev Toolbar API](/en/reference/dev-toolbar-app-reference/)!

This toolbar is enabled by default and appears when you hover over the bottom of the page. It is a development tool only and will not appear on your published site.

Built-in apps
-------------

[Section titled Built-in apps](#built-in-apps)

### Astro Menu

[Section titled Astro Menu](#astro-menu)

The Astro Menu app provides easy access to various information about the current project and links to extra resources. Notably, it provides one-click access to the Astro documentation, GitHub repository, and Discord server.

This app also includes a “Copy debug info” button which will run the [`astro info`](/en/reference/cli-reference/#astro-info) command and copy the output to your clipboard. This can be useful when asking for help or reporting issues.

### Inspect

[Section titled Inspect](#inspect)

The Inspect app provides information about any [islands](/en/concepts/islands/) on the current page. This will show you the properties passed to each island, and the client directive that is being used to render them.

### Audit

[Section titled Audit](#audit)

The Audit app automatically runs a series of audits on the current page, checking for the most common performance and accessibility issues. When an issue is found, a red dot will appear in the toolbar. Clicking on the app will pop up a list of results from the audit and will highlight the related elements directly in the page.

Note

The basic performance and accessibility audits performed by the dev toolbar are not a replacement for dedicated tools like [Pa11y](https://pa11y.org/) or [Lighthouse](https://developers.google.com/web/tools/lighthouse), or even better, humans!

The dev toolbar aims to provide a quick and easy way to catch common issues during development, without needing to context-switch to a different tool.

### Settings

[Section titled Settings](#settings)

The Settings app allows you to configure options for the dev toolbar, such as verbose logging, disabling notifications, and adjusting its placement on your screen.

Extending the dev toolbar
-------------------------

[Section titled Extending the dev toolbar](#extending-the-dev-toolbar)

Astro integrations can add new apps to the dev toolbar, allowing you to extend it with custom tools that are specific to your project. You can find [more dev tool apps to install in the integrations directory](https://astro.build/integrations/?search=&categories%5B%5D=toolbar) or using the [Astro Menu](#astro-menu).

Install additional dev toolbar app integrations in your project just like any other [Astro integration](/en/guides/integrations-guide/) according to its own installation instructions.

![](/houston_chef.webp) **Related recipe:** [Create a dev toolbar app](/en/recipes/making-toolbar-apps/)

Disabling the dev toolbar
-------------------------

[Section titled Disabling the dev toolbar](#disabling-the-dev-toolbar)

The dev toolbar is enabled by default for every site. You can choose to disable it for individual projects and/or users as needed.

### Per-project

[Section titled Per-project](#per-project)

To disable the dev toolbar for everyone working on a project, set `devToolbar: false` in the [Astro config file](/en/reference/configuration-reference/#devtoolbarenabled).

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({  devToolbar: {    enabled: false  }});

To enable the dev toolbar again, remove these lines from your configuration, or set `enabled: true`.

### Per-user

[Section titled Per-user](#per-user)

To disable the dev toolbar for yourself on a specific project, run the [`astro preferences`](/en/reference/cli-reference/#astro-preferences) command.

Terminal window

    astro preferences disable devToolbar

To disable the dev toolbar in all Astro projects for a user on the current machine, add the `--global` flag when running `astro-preferences`:

Terminal window

    astro preferences disable --global devToolbar

The dev toolbar can later be enabled with:

Terminal window

    astro preferences enable devToolbar

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/dev-toolbar.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Environment variables](/en/guides/environment-variables/) [Next  
Site migration overview](/en/guides/migrate-to-astro/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)