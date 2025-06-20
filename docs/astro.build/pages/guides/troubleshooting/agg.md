Troubleshooting
===============

Astro provides several different tools to help you troubleshoot and debug your code.

Tips and tricks
---------------

[Section titled Tips and tricks](#tips-and-tricks)

### Debugging with `console.log()`

[Section titled Debugging with console.log()](#debugging-with-consolelog)

`console.log()` is a simple-but-popular method of debugging your Astro code. Where you write your `console.log()` statement will determine where your debugging output is printed:

    ---console.log('Hi! I’m the server. This is logged in the terminal where Astro is running.');---
    <script>console.log('Hi! I’m the client. This is logged in browser dev console.');</script>

A `console.log()` statement in Astro frontmatter will always output to the **terminal** running the Astro CLI. This is because Astro runs on the server, and never in the browser.

Code that is written or imported inside of an Astro `<script>` tag is run in the browser. Any `console.log()` statements or other debug output will be printed to the **console in your browser**.

### Debugging framework components

[Section titled Debugging framework components](#debugging-framework-components)

[Framework components](/en/guides/framework-components/) (like React and Svelte) are unique: They render server-side by default, meaning that `console.log()` debug output will be visible in the terminal. However, they can also be hydrated for the browser, which may cause your debug logs to also appear in the browser.

This can be useful for debugging differences between the server output and the hydrated components in the browser.

### Astro `<Debug />` component

[Section titled Astro &lt;Debug /&gt; component](#astro-debug--component)

To help you debug your Astro components, Astro provides a built-in `<Debug />` component which renders any value directly into your component HTML template.

This component provides a way to inspect values on the client-side, without any JavaScript. It can be useful for quick debugging in the browser without having to flip back-and-forth between your terminal and your browser.

    ---import { Debug } from 'astro:components';const sum = (a, b) => a + b;---
    <!-- Example: Outputs {answer: 6} to the browser --><Debug answer={sum(2, 4)} />

The Debug component supports a variety of syntax options for even more flexible and concise debugging:

    ---import { Debug } from 'astro:components';const sum = (a, b) => a + b;const answer = sum(2, 4);---<!-- Example: All three examples are equivalent. --><Debug answer={sum(2, 4)} /><Debug {{answer: sum(2, 4)}} /><Debug {answer} />

Common Error Messages
---------------------

[Section titled Common Error Messages](#common-error-messages)

Here are some common error messages you might see in the terminal, what they might mean, and what to do about them. See our [full error reference guide](/en/reference/error-reference/) for a complete list of Astro errors you may encounter.

### Cannot use import statement outside a module

[Section titled Cannot use import statement outside a module](#cannot-use-import-statement-outside-a-module)

In Astro components, `<script>` tags are loaded as [JS modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) by default. If you have included the [`is:inline` directive](/en/reference/directives-reference/#isinline) or any other attribute in your tag, this default behavior is removed.

**Solution**: If you have added any attributes to your `<script>` tag, you must also add the `type="module"` attribute to be able to use import statements.

**Status**: Expected Astro behavior, as intended.

**Not sure that this is your problem?**  
Check to see if anyone else has reported [this issue](https://github.com/withastro/astro/issues?q=is%3Aissue+is%3Aopen+Cannot+use+import+statement)!

### `document` (or `window`) is not defined

[Section titled document (or window) is not defined](#document-or-window-is-not-defined)

This error occurs when trying to access `document` or `window` on the server.

Astro components run on the server, so you can’t access these browser-specific objects within the frontmatter.

Framework components run on the server by default, so this error can occur when accessing `document` or `window` during rendering.

**Solution**: Determine the code that calls `document` or `window`. If you aren’t using `document` or `window` directly and still getting this error, check to see if any packages you’re importing are meant to run on the client.

*   If the code is in an Astro component, move it to a `<script>` tag outside of the frontmatter. This tells Astro to run this code on the client, where `document` and `window` are available.
    
*   If the code is in a framework component, try to access these objects after rendering using lifecycle methods (e.g. [`useEffect()`](https://react.dev/reference/react/useEffect) in React, [`onMounted()`](https://vuejs.org/api/composition-api-lifecycle.html#onmounted) in Vue, and [`onMount()`](https://svelte.dev/docs#run-time-svelte-onmount) in Svelte). Tell the framework component to hydrate client-side by using a [client:](/en/reference/directives-reference/#client-directives) directive, like `client:load`, to run these lifecycle methods. You can also prevent the component from rendering on the server at all by adding the [`client:only`](/en/reference/directives-reference/#clientonly) directive.
    

**Status**: Expected Astro behavior, as intended.

### Expected a default export

[Section titled Expected a default export](#expected-a-default-export)

This error can be thrown when trying to import or render an invalid component, or one that is not working properly. (This particular message occurs because of the way importing a UI component works in Astro.)

**Solution**: Try looking for errors in any component you are importing and rendering, and make sure it’s working correctly. Consider opening an Astro starter template from [astro.new](https://astro.new) and troubleshooting just your component in a minimal Astro project.

**Status**: Expected Astro behavior, as intended.

### Refused to execute inline script

[Section titled Refused to execute inline script](#refused-to-execute-inline-script)

You may see the following error logged in the browser console:

> Refused to execute inline script because it violates the following Content Security Policy directive: …

This means that your site’s [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) disallows running inline `<script>` tags, which Astro outputs by default.

**Solution:** Update your CSP to include `script-src: 'unsafe-inline'` to allow inline scripts to run. Alternatively, you can use a third-party integration such as [`astro-shield`](https://github.com/KindSpells/astro-shield) to generate the CSP headers for you.

Common gotchas
--------------

[Section titled Common gotchas](#common-gotchas)

### My component is not rendering

[Section titled My component is not rendering](#my-component-is-not-rendering)

First, check to see that you have **imported the component** in your [`.astro` component script](/en/basics/astro-components/#the-component-script) or [`.mdx` file](/en/guides/integrations-guide/mdx/#using-components-in-mdx).

Then check your import statement:

*   Is your import linking to the wrong place? (Check your import path.)
    
*   Does your import have the same name as the imported component? (Check your component name and that it [follows the `.astro` syntax](/en/reference/astro-syntax/#differences-between-astro-and-jsx).)
    
*   Have you included the extension in the import? (Check that your imported file contains an extension. e.g. `.astro`, `.md`, `.vue`, `.svelte`. Note: File extensions are **not** required for `.js(x)` and `.ts(x)` files only.)
    

### My component is not interactive

[Section titled My component is not interactive](#my-component-is-not-interactive)

If your component is rendering (see above) but is not responding to user interaction, then you may be missing a [`client:*` directive](/en/reference/directives-reference/#client-directives) to hydrate your component.

By default, a [UI Framework component is not hydrated in the client](/en/guides/framework-components/#hydrating-interactive-components). If no `client:*` directive is provided, its HTML is rendered onto the page without JavaScript.

Tip

[Astro components](/en/basics/astro-components/) are HTML-only templating components with no client-side runtime. But, you can use a `<script>` tag in your Astro component template to send JavaScript to the browser that executes in the global scope.

### Cannot find package ‘X’

[Section titled Cannot find package ‘X’](#cannot-find-package-x)

If you see a `"Cannot find package 'react'"` (or similar) warning when you start up Astro, that means that you need to install that package into your project. Not all package managers will install peer dependencies for you automatically. If you are on Node v16+ and using npm, you should not need to worry about this section.

React, for example, is a peer dependency of the `@astrojs/react` integration. That means that you should install the official `react` and `react-dom` packages alongside your integration. The integration will then pull from these packages automatically.

Terminal window

    # Example: Install integrations and frameworks togethernpm install @astrojs/react react react-dom

See [Astro’s integration guide](/en/guides/integrations-guide/) for instructions on adding framework renderers, CSS tools and other packages to Astro.

### Using Astro with Yarn 2+ (Berry)

[Section titled Using Astro with Yarn 2+ (Berry)](#using-astro-with-yarn-2-berry)

Yarn 2+, a.k.a. Berry, uses a technique called [Plug’n’Play (PnP)](https://yarnpkg.com/features/pnp) to store and manage Node modules, which can [cause problems](https://github.com/withastro/astro/issues/3450) while initializing a new Astro project using `create astro` or while working with Astro. A workaround is to set the [`nodeLinker` property](https://yarnpkg.com/configuration/yarnrc#nodeLinker) in `.yarnrc.yml` to `node-modules`:

.yarnrc.yml

    nodeLinker: "node-modules"

### Adding dependencies to Astro in a monorepo

[Section titled Adding dependencies to Astro in a monorepo](#adding-dependencies-to-astro-in-a-monorepo)

When working with Astro in a monorepo setup, project dependencies should be added in each project’s own `package.json` file.

However, you may also want to use Astro in the root of the monorepo (e.g. [Nx projects recommend installing dependencies at the root](https://github.com/nrwl/nx/issues/3023#issuecomment-630558318)). In this case, manually add Astro-related dependencies (e.g. `@astrojs/vue`, `astro-component-lib`) to the `vite.ssr.noExternal` part of Astro’s config to ensure that these dependencies are properly installed and bundled:

astro.config.mjs

    import { defineConfig } from 'astro/config'export default defineConfig({  vite: {    ssr: {      noExternal: [        '@astrojs/vue',        'astro-component-lib',      ]    }  }})

### Using `<head>` in a component

[Section titled Using &lt;head&gt; in a component](#using-head-in-a-component)

In Astro, using a `<head>` tag works like any other HTML tag: it does not get moved to the top of the page or merged with the existing `<head>`. Because of this, you usually only want to include one `<head>` tag throughout a page. We recommend writing that single `<head>` and its contents in a [layout component](/en/basics/layouts/).

### An unexpected `<style>` is included

[Section titled An unexpected &lt;style&gt; is included](#an-unexpected-style-is-included)

You may notice an imported component’s `<style>` tag included in your HTML source even if that component doesn’t appear in the final output. For example, this will occur with [conditionally rendered](/en/reference/astro-syntax/#dynamic-html) components that are not displayed.

Astro’s build process works on the module graph: once a component is included in the template, its `<style>` tag is processed, optimized, and bundled, whether it appears in the final output or not.

Escaping special characters in Markdown
---------------------------------------

[Section titled Escaping special characters in Markdown](#escaping-special-characters-in-markdown)

Certain characters have a special meaning in Markdown. You may need to use a different syntax if you want to display them. To do this, you can use [HTML entities](https://developer.mozilla.org/en-US/docs/Glossary/Entity) for these characters instead.

For example, to prevent `<` being interpreted as the beginning of an HTML element, write `&lt;`.

Creating minimal reproductions
------------------------------

[Section titled Creating minimal reproductions](#creating-minimal-reproductions)

When troubleshooting your code, it can be helpful to create a **minimal reproduction** of the issue that you can share. This is a smaller, simplified Astro project that demonstrates your issue. Having a working reproduction in a new project helps to confirm that this is a repeatable problem, and is not caused by something else in your personal environment or existing project.

Sharing a minimal reproduction is helpful when asking for help in our support threads and is often required when filing a bug report to Astro.

### Create a StackBlitz via [astro.new](https://astro.new/repro)

[Section titled Create a StackBlitz via astro.new](#create-a-stackblitz-via-astronew)

You can use [astro.new](https://astro.new/repro) to create a new Astro project with a single click. For minimal reproductions, we strongly recommend starting from the minimal (empty) example running in [StackBlitz](https://stackblitz.com), with as little extra code as possible.

StackBlitz will run this Astro project in the browser, outside of your local environment. It will also provide you with a shareable link so that any Astro maintainer or support squad member can view your minimal reproduction outside of their own local environment. This means that everyone is viewing the exact same project, with the same configuration and dependencies. This makes it easy for someone else to help troubleshoot your code. If the issue is reproducible, it allows you to verify that the issue lies within the Astro code itself and you can feel confident submitting a bug report.

Note that not every issue is reproducible in StackBlitz. For example, your issue might be dependent on a specific environment or package manager, or it may involve HTML Streaming, which isn’t supported in StackBlitz. In this case, create a new minimal (empty) Astro project using the CLI, reproduce the issue, and upload it to a GitHub repository. Instead of sharing a StackBlitz URL, provide a link to the GitHub repository of your minimal reproduction.

### Minimal code

[Section titled Minimal code](#minimal-code)

Once your empty project is set up, go through the steps to reproduce the issue. This can include adding packages, changing configuration, and writing code.

You should only add the minimum amount of code necessary to reproduce the issue. Do not reproduce other elements of your existing project, and remove all code that is not directly related to the issue.

### Create an issue

[Section titled Create an issue](#create-an-issue)

If your issue can be reproduced, then it is time to create an issue and file a bug report!

Go to the appropriate Astro repository on GitHub and open a new issue. Most repositories have an issue template that will ask questions or require information in order to submit. It’s important that you follow these templates because if you don’t provide the information we need, then we have to ask you for it… and no one is working on your issue!

Include the link to your minimal reproduction on StackBlitz (or GitHub repository, if necessary). Start with a description of the expected versus actual behavior to provide context for the issue. Then, include clear, step-by-step instructions on how to replicate the issue in an Astro project.

Need more?
----------

[Section titled Need more?](#need-more)

Come and chat with us on [Discord](https://astro.build/chat) and explain your issue in the `#support` forum channel. We’re always happy to help!

Visit the current [open Issues in Astro](https://github.com/withastro/astro/issues/) to see if you are encountering a known problem or file a bug report.

You can also visit [RFC Discussions](https://github.com/withastro/rfcs/discussions/) to see whether you’ve found a known limitation of Astro, and check to see whether there are current proposals related to your use case.

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/troubleshooting.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
v1.0](/en/guides/upgrade-to/v1/) [Next  
Recipes overview](/en/recipes/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

