Publish to NPM
==============

Building a new Astro component? **Publish it to [npm!](https://npmjs.com/)**

Publishing an Astro component is a great way to reuse your existing work across your projects, and to share with the wider Astro community at large. Astro components can be published directly to and installed from NPM, just like any other JavaScript package.

Looking for inspiration? Check out some of our favorite [themes](https://astro.build/themes/) and [components](https://astro.build/integrations/) from the Astro community. You can also [search npm](https://www.npmjs.com/search?q=keywords:astro-component,withastro) to see the entire public catalog.

Don’t want to go it alone?

Check out [Astro Community’s component template](https://github.com/astro-community/component-template) for a community-supported, out-of-the-box template!

Quick Start
-----------

[Section titled Quick Start](#quick-start)

To get started developing your component quickly, you can use a template already set up for you.

Terminal window

    # Initialize the Astro Component template in a new directorynpm create astro@latest my-new-component-directory -- --template component# yarnyarn create astro my-new-component-directory --template component# pnpmpnpm create astro@latest my-new-component-directory -- --template component

Creating a package
------------------

[Section titled Creating a package](#creating-a-package)

Prerequisites

Before diving in, it will help to have a basic understanding of:

*   [Node Modules](https://docs.npmjs.com/creating-node-js-modules)
*   [Package Manifest (`package.json`)](https://docs.npmjs.com/creating-a-package-json-file)
*   [Workspaces](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#workspaces)

To create a new package, configure your development environment to use **workspaces** within your project. This will allow you to develop your component alongside a working copy of Astro.

*   Directorymy-new-component-directory/
    
    *   Directorydemo/
        
        *   … for testing and demonstration
        
    *   package.json
    *   Directorypackages/
        
        *   Directorymy-component/
            
            *   index.js
            *   package.json
            *   … additional files used by the package
            
        
    

This example, named `my-project`, creates a project with a single package, named `my-component`, and a `demo/` directory for testing and demonstrating the component.

This is configured in the project root’s `package.json` file:

    {  "name": "my-project",  "workspaces": ["demo", "packages/*"]}

In this example, multiple packages can be developed together from the `packages` directory. These packages can also be referenced from `demo`, where you can install a working copy of Astro.

Terminal window

    npm create astro@latest demo -- --template minimal# yarnyarn create astro demo --template minimal# pnpmpnpm create astro@latest demo -- --template minimal

There are two initial files that will make up your individual package: `package.json` and `index.js`.

### `package.json`

[Section titled package.json](#packagejson)

The `package.json` in the package directory includes all of the information related to your package, including its description, dependencies, and any other package metadata.

    {  "name": "my-component",  "description": "Component description",  "version": "1.0.0",  "homepage": "https://github.com/owner/project#readme",  "type": "module",  "exports": {    ".": "./index.js",    "./astro": "./MyAstroComponent.astro",    "./react": "./MyReactComponent.jsx"  },  "files": ["index.js", "MyAstroComponent.astro", "MyReactComponent.jsx"],  "keywords": ["astro", "withastro", "astro-component", "...", "..."]}

#### `description`

[Section titled description](#description)

A short description of your component used to help others know what it does.

    {  "description": "An Astro Element Generator"}

#### `type`

[Section titled type](#type)

The module format used by Node.js and Astro to interpret your `index.js` files.

    {  "type": "module"}

Use `"type": "module"` so that your `index.js` can be used as an entrypoint with `import` and `export` .

#### `homepage`

[Section titled homepage](#homepage)

The url to the project homepage.

    {  "homepage": "https://github.com/owner/project#readme"}

This is a great way to direct users to an online demo, documentation, or homepage for your project.

#### `exports`

[Section titled exports](#exports)

The entry points of a package when imported by name.

    {  "exports": {    ".": "./index.js",    "./astro": "./MyAstroComponent.astro",    "./react": "./MyReactComponent.jsx"  }}

In this example, importing `my-component` would use `index.js`, while importing `my-component/astro` or `my-component/react` would use `MyAstroComponent.astro` or `MyReactComponent.jsx` respectively.

#### `files`

[Section titled files](#files)

An optional optimization to exclude unnecessary files from the bundle shipped to users via npm. Note that **only files listed here will be included in your package**, so if you add or change files necessary for your package to work, you must update this list accordingly.

    {  "files": ["index.js", "MyAstroComponent.astro", "MyReactComponent.jsx"]}

#### `keywords`

[Section titled keywords](#keywords)

An array of keywords relevant to your component, used to help others [find your component on npm](https://www.npmjs.com/search?q=keywords:astro-component,withastro) and in any other search catalogs.

Add `astro-component` or `withastro` as a special keyword to maximize its discoverability in the Astro ecosystem.

    {  "keywords": ["astro-component", "withastro", "... etc", "... etc"]}

Tip

Keywords are also used by our [integrations library](https://astro.build/integrations/)! [See below](#integrations-library) for a full list of keywords we look for in NPM.

* * *

### `index.js`

[Section titled index.js](#indexjs)

The main **package entrypoint** used whenever your package is imported.

    export { default as MyAstroComponent } from './MyAstroComponent.astro';
    export { default as MyReactComponent } from './MyReactComponent.jsx';

This allows you to package multiple components together into a single interface.

#### Example: Using Named Imports

[Section titled Example: Using Named Imports](#example-using-named-imports)

    ---import { MyAstroComponent } from 'my-component';import { MyReactComponent } from 'my-component';---<MyAstroComponent /><MyReactComponent />

#### Example: Using Namespace Imports

[Section titled Example: Using Namespace Imports](#example-using-namespace-imports)

    ---import * as Example from 'example-astro-component';---<Example.MyAstroComponent /><Example.MyReactComponent />

#### Example: Using Individual Imports

[Section titled Example: Using Individual Imports](#example-using-individual-imports)

    ---import MyAstroComponent from 'example-astro-component/astro';import MyReactComponent from 'example-astro-component/react';---<MyAstroComponent /><MyReactComponent />

* * *

Developing your package
-----------------------

[Section titled Developing your package](#developing-your-package)

Astro does not have a dedicated “package mode” for development. Instead, you should use a demo project to develop and test your package inside of your project. This can be a private website only used for development, or a public demo/documentation website for your package.

If you are extracting components from an existing project, you can even continue to use that project to develop your now-extracted components.

Testing your component
----------------------

[Section titled Testing your component](#testing-your-component)

Astro does not currently ship a test runner. _(If you are interested in helping out with this, [join us on Discord!](https://astro.build/chat))_

In the meantime, our current recommendation for testing is:

1.  Add a test `fixtures` directory to your `demo/src/pages` directory.
    
2.  Add a new page for every test that you’d like to run.
    
3.  Each page should include some different component usage that you’d like to test.
    
4.  Run `astro build` to build your fixtures, then compare the output of the `dist/__fixtures__/` directory to what you expected.
    
    *   Directorymy-project/demo/src/pages/\_\_fixtures\_\_/
        
        *   test-name-01.astro
        *   test-name-02.astro
        *   test-name-03.astro
        
    

Publishing your component
-------------------------

[Section titled Publishing your component](#publishing-your-component)

Once you have your package ready, you can publish it to npm using the `npm publish` command. If that fails, make sure that you have logged in via `npm login` and that your `package.json` is correct. If it succeeds, you’re done!

Notice that there was no `build` step for Astro packages. Any file type that Astro supports natively, such as `.astro`, `.ts`, `.jsx`, and `.css`, can be published directly without a build step.

If you need another file type that isn’t natively supported by Astro, add a build step to your package. This advanced exercise is left up to you.

Integrations Library
--------------------

[Section titled Integrations Library](#integrations-library)

Share your hard work by adding your integration to our [integrations library](https://astro.build/integrations/)!

Tip

Do you need some help building your integration, or just want to meet other integrations builders? We have a dedicated `#integrations` channel on our [Discord server](https://astro.build/chat). Come say hi!

### `package.json` data

[Section titled package.json data](#packagejson-data)

The library is automatically updated weekly, pulling in every package published to NPM with the `astro-component` or `withastro` keyword.

The integrations library reads the `name`, `description`, `repository`, and `homepage` data from your `package.json`.

Avatars are a great way to highlight your brand in the library! Once your package is published you can [file a GitHub issue](https://github.com/withastro/astro.build/issues/new/choose) with your avatar attached and we will add it to your listing.

Tip

Need to override the information our library reads from NPM? No problem! [File an issue](https://github.com/withastro/astro.build/issues/new/choose) with the updated information and we’ll make sure the custom `name`, `description`, or `homepage` is used instead.

### Categories

[Section titled Categories](#categories)

In addition to the required `astro-component` or `withastro` keyword, special keywords are also used to automatically organize packages. Including any of the keywords below will add your integration to the matching category in our integrations library.

category

keywords

Accessibility

`a11y`, `accessibility`

Adapters

`astro-adapter`

Analytics

`analytics`

CSS + UI

`css`, `ui`, `icon`, `icons`, `renderer`

Frameworks

`renderer`

Content Loaders

`astro-loader`

Images + Media

`media`, `image`, `images`, `video`, `audio`

Performance + SEO

`performance`, `perf`, `seo`, `optimization`

Dev Toolbar

`devtools`, `dev-overlay`, `dev-toolbar`

Utilities

`tooling`, `utils`, `utility`

Packages that don’t include any keyword matching a category will be shown as `Uncategorized`.

Share
-----

[Section titled Share](#share)

We encourage you to share your work, and we really do love seeing what our talented Astronauts create. Come and share what you create with us in our [Discord](https://astro.build/chat) or mention [@astrodotbuild](https://twitter.com/astrodotbuild) in a Tweet!

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/publish-to-npm.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Sitemap](/en/guides/integrations-guide/sitemap/) [Next  
Deployment overview](/en/guides/deploy/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

