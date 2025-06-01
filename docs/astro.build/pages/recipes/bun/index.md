Use Bun with Astro
==================

[Bun](https://bun.sh/) is an all-in-one JavaScript runtime & toolkit. See [Bun’s documentation](https://bun.sh/docs) for more information.

Caution

Using Bun with Astro may reveal rough edges. Some integrations may not work as expected. Consult [Bun’s official documentation for working with Astro](https://bun.sh/guides/ecosystem/astro) for details.

If you have any problems using Bun, please [open an Issue on GitHub with Bun directly](https://github.com/oven-sh/bun/issues/new/choose).

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

*   Bun installed locally on your machine. See the [installation instructions](https://bun.sh/docs/installation) in Bun’s official documentation.

Create a new Astro project with Bun
-----------------------------------

[Section titled Create a new Astro project with Bun](#create-a-new-astro-project-with-bun)

Create a new Astro project with Bun using the following `create-astro` command:

Terminal window

    bunx create-astro@latest my-astro-project-using-bun

Tip

You may also [create a new Astro project from any existing Astro GitHub repository](/en/install-and-setup/#install-from-the-cli-wizard) using the `--template` flag:

Terminal window

    bunx create-astro@latest my-astro-project-using-bun --template eliancodes/brutal

Install dependencies
--------------------

[Section titled Install dependencies](#install-dependencies)

If you’re starting a new project using `bunx create-astro`, the CLI will automatically use Bun to install dependencies and you can skip this step.

Otherwise, you’ll need to install your dependencies with Bun:

Terminal window

    bun install

Add Types
---------

[Section titled Add Types](#add-types)

Bun publishes the [`@types/bun`](https://www.npmjs.com/package/@types/bun) package, containing the runtime types for Bun.

Install `@types/bun` using the following command:

Terminal window

    bun add -d @types/bun

Using Astro integrations
------------------------

[Section titled Using Astro integrations](#using-astro-integrations)

You can also use any of the official Astro integrations with the `astro add` command:

Terminal window

    bunx astro add react

Run Astro with Bun
------------------

[Section titled Run Astro with Bun](#run-astro-with-bun)

Note

Use the [`--bun` CLI flag](https://bun.sh/docs/cli/bunx#shebangs) before every `astro` command to use Bun’s own runtime in place of Node.

### Run the development server

[Section titled Run the development server](#run-the-development-server)

To run the development server using Bun as the runtime, use the following command:

Terminal window

    bunx --bun astro dev

### Building your site with Bun

[Section titled Building your site with Bun](#building-your-site-with-bun)

To build your site using Bun as the runtime, use the following command:

Terminal window

    bunx --bun astro build

Astro will output your site to the `dist/` directory. Then, you can serve your site using the `preview` command:

Terminal window

    bunx --bun astro preview

Add SSR with Bun
----------------

[Section titled Add SSR with Bun](#add-ssr-with-bun)

Since Bun features [Node.js API compatibility](https://bun.sh/docs/runtime/nodejs-apis), you can use any Astro adapter for [on-demand rendering](/en/guides/on-demand-rendering/) with your Astro project:

Terminal window

    bunx astro add vercel

Testing in Bun
--------------

[Section titled Testing in Bun](#testing-in-bun)

Bun ships with a fast, built-in, Jest-compatible test runner through the `bun test` command. If you like to use that read [`bun test` documentation](https://bun.sh/docs/cli/test).

However, it is also possible to use Cypress or Playwright for a modern approach to testing web apps.

### Cypress

[Section titled Cypress](#cypress)

Cypress is a front-end testing tool and is on a mission to “make the testing experience enjoyable and generate developer happiness”. This enables you to write end-to-end tests for your Astro site.

Install Cypress with the following command:

Terminal window

    bun add cypress --dev

For the rest of the configuration and to start your first test, follow the rest of Cypress process in the [Astro Testing Guide](/en/guides/testing/#configuration).

### Playwright

[Section titled Playwright](#playwright)

Playwright is an end-to-end testing framework that allows you to test your Astro code on all modern rendering engines including Chromium, WebKit, and Firefox.

Install Playwright using the following command:

Terminal window

    bun create playwright

To create your first Playwright test, follow the instructions for the rest of the Playwright process in the [Astro Testing Guide](/en/guides/testing/#create-your-first-playwright-test).

Official Resources
------------------

[Section titled Official Resources](#official-resources)

*   [Build an app with Astro and Bun](https://bun.sh/guides/ecosystem/astro)

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

Using Bun with Astro? Add your blog post or video to this page!

*   [Building a Cloudflare Pages site with Bun](https://blog.otterlord.dev/posts/hello-from-bun/) - blog post
*   [Using Bun with Astro and Cloudflare Pages](https://handerson.hashnode.dev/using-bun-with-astro-and-cloudflare-pages) - blog post

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/bun.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Build forms with API routes](/en/recipes/build-forms-api/) [Next  
Call endpoints from the server](/en/recipes/call-endpoints/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)