Imports reference
=================

Astro supports most static assets with zero configuration required. You can use the `import` statement anywhere in your project JavaScript (including your Astro frontmatter) and Astro will include a built, optimized copy of that static asset in your final build. `@import` is also supported inside of CSS & `<style>` tags.

Supported File Types
--------------------

[Section titled Supported File Types](#supported-file-types)

The following file types are supported out-of-the-box by Astro:

*   Astro Components (`.astro`)
*   Markdown (`.md`, `.markdown`, etc.)
*   JavaScript (`.js`, `.mjs`)
*   TypeScript (`.ts`)
*   NPM Packages
*   JSON (`.json`)
*   CSS (`.css`)
*   CSS Modules (`.module.css`)
*   Images & Assets (`.svg`, `.jpg`, `.png`, etc.)

Additionally, you can extend Astro to add support for different [UI Frameworks](/en/guides/framework-components/) like React, Svelte and Vue components. You can also install the [Astro MDX integration](/en/guides/integrations-guide/mdx/) or the [Astro Markdoc integration](/en/guides/integrations-guide/markdoc/) to use `.mdx` or `.mdoc` files in your project.

### Files in `public/`

[Section titled Files in public/](#files-in-public)

You can place any static asset in the [`public/` directory](/en/basics/project-structure/#public) of your project, and Astro will copy it directly into your final build untouched. `public/` files are not built or bundled by Astro, which means that any type of file is supported.

You can reference a `public/` file by a URL path directly in your HTML templates.

    // To link to /public/reports/annual/2024.pdfDownload the <a href="/reports/annual/2024.pdf">2024 annual statement as a PDF</a>.
    // To display /public/assets/cats/ginger.jpg<img src="/assets/cats/ginger.jpg" alt="An orange cat sleeping on a bed.">

Import statements
-----------------

[Section titled Import statements](#import-statements)

Astro uses ESM, the same [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#syntax) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) syntax supported in the browser.

### JavaScript

[Section titled JavaScript](#javascript)

    import { getUser } from './user.js';

JavaScript can be imported using normal ESM `import` & `export` syntax.

Importing JSX files

An appropriate [UI framework](/en/guides/framework-components/) ([React](/en/guides/integrations-guide/react/), [Preact](/en/guides/integrations-guide/preact/), or [Solid](/en/guides/integrations-guide/solid-js/)) is required to render JSX/TSX files. Use `.jsx`/`.tsx` extensions where appropriate, as Astro does not support JSX in `.js`/`.ts` files.

### TypeScript

[Section titled TypeScript](#typescript)

    import { getUser } from './user';import type { UserType } from './user';

Astro includes built-in support for [TypeScript](https://www.typescriptlang.org/). You can import `.ts` and `.tsx` files directly in your Astro project, and even write TypeScript code directly inside your [Astro component script](/en/basics/astro-components/#the-component-script) and any [script tags](/en/guides/client-side-scripts/).

**Astro doesn’t perform any type checking itself.** Type checking should be taken care of outside of Astro, either by your IDE or through a separate script. For type checking Astro files, the [`astro check` command](/en/reference/cli-reference/#astro-check) is provided.

TypeScript and file extensions

Per [TypeScript’s module resolution rules](https://www.typescriptlang.org/docs/handbook/module-resolution.html), `.ts` and `.tsx` file extensions should not be used when importing TypeScript files. Instead, either use `.js`/`.jsx` file extensions or completely omit the file extension.

    import { getUser } from './user.js'; // user.tsimport MyComponent from "./MyComponent"; // MyComponent.tsx

Read more about [TypeScript support in Astro](/en/guides/typescript/).

### NPM Packages

[Section titled NPM Packages](#npm-packages)

If you’ve installed an NPM package, you can import it in Astro.

    ---import { Icon } from 'astro-icon';---

If a package was published using a legacy format, Astro will try to convert the package to ESM so that `import` statements work. In some cases, you may need to adjust your [`vite` config](/en/reference/configuration-reference/#vite) for it to work.

Caution

Some packages rely on a browser environment. Astro components runs on the server, so importing these packages in the frontmatter may [lead to errors](/en/guides/troubleshooting/#document-or-window-is-not-defined).

### JSON

[Section titled JSON](#json)

    // Load the JSON object via the default exportimport json from './data.json';

Astro supports importing JSON files directly into your application. Imported files return the full JSON object in the default import.

### CSS

[Section titled CSS](#css)

    // Load and inject 'style.css' onto the pageimport './style.css';

Astro supports importing CSS files directly into your application. Imported styles expose no exports, but importing one will automatically add those styles to the page. This works for all CSS files by default, and can support compile-to-CSS languages like Sass & Less via plugins.

Read more about advanced CSS import use cases such as a direct URL reference for a CSS file, or importing CSS as a string in the [Styling guide](/en/guides/styling/#advanced).

### CSS Modules

[Section titled CSS Modules](#css-modules)

    // 1. Converts './style.module.css' classnames to unique, scoped values.// 2. Returns an object mapping the original classnames to their final, scoped value.import styles from './style.module.css';
    // This example uses JSX, but you can use CSS Modules with any framework.return <div className={styles.error}>Your Error Message</div>;

Astro supports CSS Modules using the `[name].module.css` naming convention. Like any CSS file, importing one will automatically apply that CSS to the page. However, CSS Modules export a special default `styles` object that maps your original classnames to unique identifiers.

CSS Modules help you enforce component scoping & isolation on the frontend with uniquely-generated class names for your stylesheets.

### Other Assets

[Section titled Other Assets](#other-assets)

    import imgReference from './image.png'; // imgReference === '/src/image.png'import svgReference from './image.svg'; // svgReference === '/src/image.svg'import txtReference from './words.txt'; // txtReference === '/src/words.txt'
    // This example uses JSX, but you can use import references with any framework.<img src={imgReference.src} alt="image description" />;

All other assets not explicitly mentioned above can be imported via ESM `import` and will return a URL reference to the final built asset. This can be useful for referencing non-JS assets by URL, like creating an image element with a `src` attribute pointing to that image.

It can also be useful to place images in the `public/` folder as explained on the [project-structure page](/en/basics/project-structure/#public).

Read more about appending Vite import parameters (e.g. `?url`, `?raw`) in [Vite’s static asset handling guide](https://vite.dev/guide/assets.html).

Note

Adding **alt text** to `<img>` tags is encouraged for accessibility! Don’t forget to add an `alt="a helpful description"` attribute to your image elements. You can just leave the attribute empty if the image is purely decorative.

Aliases
-------

[Section titled Aliases](#aliases)

An **alias** is a way to create shortcuts for your imports.

Aliases can help improve the development experience in codebases with many directories or relative imports.

src/pages/about/company.astro

    ---import Button from '../../components/controls/Button.astro';import logoUrl from '../../assets/logo.png?url';---

In this example, a developer would need to understand the tree relationship between `src/pages/about/company.astro`, `src/components/controls/Button.astro`, and `src/assets/logo.png`. And then, if the `company.astro` file were to be moved, these imports would also need to be updated.

You can add import aliases in `tsconfig.json`.

tsconfig.json

    {  "compilerOptions": {    "baseUrl": ".",    "paths": {      "@components/*": ["src/components/*"],      "@assets/*": ["src/assets/*"]    }  }}

Note

Make sure `compilerOptions.baseUrl` is set so the aliased paths can be resolved.

The development server will automatically restart after this configuration change. You can now import using the aliases anywhere in your project:

src/pages/about/company.astro

    ---import Button from '@components/controls/Button.astro';import logoUrl from '@assets/logo.png?url';---

These aliases are also integrated automatically into [VS Code](https://code.visualstudio.com/docs/languages/jsconfig) and other editors.

`import.meta.glob()`
--------------------

[Section titled import.meta.glob()](#importmetaglob)

[Vite’s `import.meta.glob()`](https://vite.dev/guide/features.html#glob-import) is a way to import many files at once using glob patterns to find matching file paths.

`import.meta.glob()` takes a relative [glob pattern](#glob-patterns) matching the local files you’d like to import as a parameter. It returns an array of each matching file’s exports. To load all matched modules up front, pass `{ eager: true }` as the second argument:

src/components/my-component.astro

    ---// imports all files that end with `.md` in `./src/pages/post/`const matches = import.meta.glob('../pages/post/*.md', { eager: true });const posts = Object.values(matches);---<!-- Renders an <article> for the first 5 blog posts --><div>{posts.slice(0, 4).map((post) => (  <article>    <h2>{post.frontmatter.title}</h2>    <p>{post.frontmatter.description}</p>    <a href={post.url}>Read more</a>  </article>))}</div>

Astro components imported using `import.meta.glob` are of type [`AstroInstance`](#astro-files). You can render each component instance using its `default` property:

src/pages/component-library.astro

    ---// imports all files that end with `.astro` in `./src/components/`const components = Object.values(import.meta.glob('../components/*.astro', { eager: true }));---<!-- Display all of our components -->{components.map((component) => (  <div>    <component.default size={24} />  </div>))}

### Supported Values

[Section titled Supported Values](#supported-values)

Vite’s `import.meta.glob()` function only supports static string literals. It does not support dynamic variables and string interpolation.

A common workaround is to instead import a larger set of files that includes all the files you need, then filter them:

src/components/featured.astro

    ---const { postSlug } = Astro.props;const pathToMyFeaturedPost = `src/pages/blog/${postSlug}.md`;
    const posts = Object.values(import.meta.glob("../pages/blog/*.md", { eager: true }));const myFeaturedPost = posts.find(post => post.file.includes(pathToMyFeaturedPost));---
    <p>  Take a look at my favorite post, <a href={myFeaturedPost.url}>{myFeaturedPost.frontmatter.title}</a>!</p>

### Import type utilities

[Section titled Import type utilities](#import-type-utilities)

#### Markdown files

[Section titled Markdown files](#markdown-files)

Markdown files loaded with `import.meta.glob()` return the following `MarkdownInstance` interface:

    export interface MarkdownInstance<T extends Record<string, any>> {  /* Any data specified in this file's YAML/TOML frontmatter */  frontmatter: T;  /* The absolute file path of this file */  file: string;  /* The rendered path of this file */  url: string | undefined;  /* Astro Component that renders the contents of this file */  Content: AstroComponentFactory;  /** (Markdown only) Raw Markdown file content, excluding layout HTML and YAML/TOML frontmatter */  rawContent(): string;  /** (Markdown only) Markdown file compiled to HTML, excluding layout HTML */  compiledContent(): string;  /* Function that returns an array of the h1...h6 elements in this file */  getHeadings(): Promise<{ depth: number; slug: string; text: string }[]>;  default: AstroComponentFactory;}

You can optionally provide a type for the `frontmatter` variable using a TypeScript generic.

    ---import type { MarkdownInstance } from 'astro';interface Frontmatter {    title: string;    description?: string;}
    const posts = Object.values(import.meta.glob<MarkdownInstance<Frontmatter>>('./posts/**/*.md', { eager: true }));---
    <ul>  {posts.map(post => <li>{post.frontmatter.title}</li>)}</ul>

#### Astro files

[Section titled Astro files](#astro-files)

Astro files have the following interface:

    export interface AstroInstance {  /* The file path of this file */  file: string;  /* The URL for this file (if it is in the pages directory) */  url: string | undefined;  default: AstroComponentFactory;}

#### Other files

[Section titled Other files](#other-files)

Other files may have various different interfaces, but `import.meta.glob()` accepts a TypeScript generic if you know exactly what an unrecognized file type contains.

    ---interface CustomDataFile {  default: Record<string, any>;}const data = import.meta.glob<CustomDataFile>('../data/**/*.js');---

### Glob Patterns

[Section titled Glob Patterns](#glob-patterns)

A glob pattern is a file path that supports special wildcard characters. This is used to reference multiple files in your project at once.

For example, the glob pattern `./pages/**/*.{md,mdx}` starts within the pages subdirectory, looks through all of its subdirectories (`/**`), and matches any filename (`/*`) that ends in either `.md` or `.mdx` (`.{md,mdx}`).

#### Glob Patterns in Astro

[Section titled Glob Patterns in Astro](#glob-patterns-in-astro)

To use with `import.meta.glob()`, the glob pattern must be a string literal and cannot contain any variables.

Additionally, glob patterns must begin with one of the following:

*   `./` (to start in the current directory)
*   `../` (to start in the parent directory)
*   `/` (to start at the root of the project)

[Read more about the glob pattern syntax](https://github.com/micromatch/picomatch#globbing-features).

### `import.meta.glob()` vs `getCollection()`

[Section titled import.meta.glob() vs getCollection()](#importmetaglob-vs-getcollection)

[Content collections](/en/guides/content-collections/) provide a [`getCollection()` API](/en/reference/modules/astro-content/#getcollection) for loading multiple files instead of `import.meta.glob()`. If your content files (e.g. Markdown, MDX, Markdoc) are located in collections within the `src/content/` directory, use `getCollection()` to [query a collection](/en/guides/content-collections/#querying-collections) and return content entries.

WASM
----

[Section titled WASM](#wasm)

    // Loads and initializes the requested WASM fileconst wasm = await WebAssembly.instantiateStreaming(fetch('/example.wasm'));

Astro supports loading WASM files directly into your application using the browser’s [`WebAssembly`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly) API.

Node Builtins
-------------

[Section titled Node Builtins](#node-builtins)

Astro supports Node.js built-ins, with some limitations, using Node’s newer `node:` prefix. There may be differences between development and production, and some features may be incompatible with on-demand rendering. Some [adapters](/en/guides/on-demand-rendering/) may also be incompatible with these built-ins modules or require configuration to support a subset (e.g., [Cloudflare Workers](/en/guides/integrations-guide/cloudflare/) or [Deno](https://github.com/denoland/deno-astro-adapter)).

The following example imports the `util` module from Node to parse a media type (MIME):

src/components/MyComponent.astro

    ---// Example: import the "util" built-in from Node.jsimport util from 'node:util';
    export interface Props {  mimeType: string,}
    const mime = new util.MIMEType(Astro.props.mimeType)---
    <span>Type: {mime.type}</span><span>SubType: {mime.subtype}</span>

Extending file type support
---------------------------

[Section titled Extending file type support](#extending-file-type-support)

With **Vite** and compatible **Rollup** plugins, you can import file types which aren’t natively supported by Astro. Learn where to find the plugins you need in the [Finding Plugins](https://vite.dev/guide/using-plugins.html#finding-plugins) section of the Vite Documentation.

Plugin configuration

Refer to your plugin’s documentation for configuration options, and how to correctly install it.

![](/houston_chef.webp) **Related recipe:** [Installing a Vite or Rollup plugin](/en/recipes/add-yaml-support/)

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/imports.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
CLI Commands](/en/reference/cli-reference/) [Next  
Routing Reference](/en/reference/routing-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

