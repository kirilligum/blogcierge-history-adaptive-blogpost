Astro Container API (experimental)
==================================

**Added in:** `astro@4.9.0`

The Container API allows you to render Astro components in isolation.

This experimental server-side API unlocks a variety of potential future uses, but is currently scoped to allow [testing of `.astro` component output](/en/guides/testing/#vitest-and-container-api) in `vite` environments such as `vitest`.

It also allows you to [manually load rendering scripts](#adding-a-renderer-manually) for creating containers in pages rendered on demand or other “shell” environments outside of `vite` (e.g. inside a PHP or Elixir application).

This API allows you to [create a new container](#create), and render an Astro component returning [a string](#rendertostring) or a [`Response`](#rendertoresponse).

This API is experimental and subject to breaking changes, even in [minor or patch releases](/en/upgrade-astro/#semantic-versioning). Please consult [the Astro CHANGELOG](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md) for changes as they occur. This page will always be updated with the most current information for the latest version of Astro.

`create()`
----------

[Section titled create()](#create)

Creates a new instance of the container.

    import { experimental_AstroContainer } from "astro/container";
    const container = await experimental_AstroContainer.create();

It accepts an object with the following options:

    export type AstroContainerOptions = {  streaming?: boolean;  renderers?: AddServerRenderer[];};
    export type AddServerRenderer =  | {      renderer: NamedSSRLoadedRendererValue;      name: never;    }  | {      renderer: SSRLoadedRendererValue;      name: string;    };

### `streaming` option

[Section titled streaming option](#streaming-option)

**Type:** `boolean`

Enables rendering components using [HTML streaming](/en/guides/on-demand-rendering/#html-streaming).

### `renderers` option

[Section titled renderers option](#renderers-option)

**Type:** `AddServerRenderer[]`

A list of loaded client renderers required by the component. Use this if your `.astro` component renders any [UI framework components](/en/guides/framework-components/) or MDX using an official Astro integration (e.g. React, Vue, etc.).

Renderers can be added through the Container API automatically for static applications, or cases where the container isn’t called at runtime (e.g. testing with `vitest`).

For [on-demand rendered applications](/en/guides/on-demand-rendering/), or cases where the container is called at runtime or inside other “shells” (e.g. PHP, Ruby, Java, etc.), renderers must be manually imported.

#### Adding a renderer through the Container API

[Section titled Adding a renderer through the Container API](#adding-a-renderer-through-the-container-api)

For each official Astro integration, import and use the `getContainerRenderer()` helper function to expose its client and server rendering scripts. These are available for `@astrojs/react`, `@astrojs/preact`, `@astrojs/solid-js`, `@astrojs/svelte`, `@astrojs/vue`, and `@astrojs/mdx`.

For renderer packages outside the `@astrojs` npm org, look in their documentation for `getContainerRenderer()` or a similar function provided.

When using `vite` (`vitest`, Astro integrations, etc.), the renderers are loaded with the function `loadRenderers()` from the virtual module `astro:container`.

Caution

Outside `vite` or for on-demand usage, you’ll have to [load the renderers manually](#adding-a-renderer-manually).

The following example provides the necessary object to render an Astro component that renders a React component and a Svelte component:

    import { getContainerRenderer as reactContainerRenderer } from "@astrojs/react";import { getContainerRenderer as svelteContainerRenderer } from "@astrojs/svelte";import { loadRenderers } from "astro:container";
    const renderers = await loadRenderers([reactContainerRenderer(), svelteContainerRenderer()]);const container = await experimental_AstroContainer.create({    renderers})const result = await container.renderToString(ReactWrapper);

#### Adding a renderer manually

[Section titled Adding a renderer manually](#adding-a-renderer-manually)

When the container is called at runtime, or inside other “shells”, the `astro:container` virtual module’s helper functions are not available. You must import the necessary server and client renderers manually and store them inside the container using `addServerRenderer` and `addClientRenderer`.

Server renderers are required to build your project, and must be stored in the container for every framework used. Client renderers are additionally needed to any hydrate client-side components using [`client:*` directives](/en/reference/directives-reference/#client-directives).

Only one import statement is needed per framework. Importing a renderer makes both the server and client renderers available to your container. However, **server renderers must be added to your container before client renderers**. This allows your entire container to render first, and then hydrate any interactive components.

The following example manually imports the necessary server renderers to be able to display static Vue components and `.mdx` pages. It additionally adds both server and client renderers for interactive React components.

    import reactRenderer from "@astrojs/react/server.js";import vueRenderer from "@astrojs/vue/server.js";import mdxRenderer from "@astrojs/mdx/server.js";
    const container = await experimental_AstroContainer.create();container.addServerRenderer({renderer: vueRenderer});container.addServerRenderer({renderer: mdxRenderer});
    container.addServerRenderer({ renderer: reactRenderer });container.addClientRenderer({ name: "@astrojs/react", entrypoint: "@astrojs/react/client.js" });

`renderToString()`
------------------

[Section titled renderToString()](#rendertostring)

This function renders a specified component inside a container. It takes an Astro component as an argument and it returns a string that represents the HTML/content rendered by the Astro component.

    import { experimental_AstroContainer } from "astro/container";import Card from "../src/components/Card.astro";
    const container = await experimental_AstroContainer.create();const result = await container.renderToString(Card);

Under the hood, this function calls [`renderToResponse`](#rendertoresponse) and calls `Response.text()`.

It also accepts an object as a second argument that can contain a [number of options](#rendering-options).

`renderToResponse()`
--------------------

[Section titled renderToResponse()](#rendertoresponse)

It renders a component, and it returns a `Response` object.

    import { experimental_AstroContainer } from "astro/container";import Card from "../src/components/Card.astro";
    const container = await experimental_AstroContainer.create();const result = await container.renderToResponse(Card);

It also accepts an object as a second argument that can contain a [number of options](#rendering-options).

Rendering options
-----------------

[Section titled Rendering options](#rendering-options)

Both [`renderToResponse`](#rendertoresponse) and [`renderToString`](#rendertostring) accept an object as their second argument:

    export type ContainerRenderOptions = {  slots?: Record<string, any>;  props?: Record<string, unknown>;  request?: Request;  params?: Record<string, string | undefined>;  locals?: App.Locals;  routeType?: "page" | "endpoint";};

These optional values can be passed to the rendering function in order to provide additional information necessary for an Astro component to properly render.

### `slots`

[Section titled slots](#slots)

**Type**: `Record<string, any>`;

An option to pass content to be rendered with [`<slots>`](/en/basics/astro-components/#slots).

If your Astro component renders one default slot, pass an object with `default` as the key:

    import Card from "../src/components/Card.astro";
    const result = await container.renderToString(Card, {  slots: { default: "Some value" }});

If your component renders named slots, use the slot names as the object keys:

    ------<div>  <slot name="header" />  <slot name="footer" /></div>

    import Card from "../src/components/Card.astro";
    const result = await container.renderToString(Card, {  slots: {    header: "Header content",    footer: "Footer"  }});

You can also render components in cascade:

    ------<div>  <slot name="header" />  <slot name="footer" /></div>

    import Card from "../src/components/Card.astro";import CardHeader from "../src/components/CardHeader.astro";import CardFooter from "../src/components/CardFooter.astro";
    const result = await container.renderToString(Card, {  slots: {    header: await container.renderToString(CardHeader),    footer:  await container.renderToString(CardFooter)  }});

### `props` option

[Section titled props option](#props-option)

**Type**: `Record<string, unknown>`

An option to pass [properties](/en/basics/astro-components/#component-props) for Astro components.

    import Card from "../src/components/Card.astro";
    const result = await container.renderToString(Card, {  props: { name: "Hello, world!" }});

    ---// For TypeScript supportinterface Props {  name: string;};
    const { name } = Astro.props;---<div>  {name}</div>

### `request` option

[Section titled request option](#request-option)

**Type**: `Request`

An option to pass a `Request` with information about the path/URL the component will render.

Use this option when your component needs to read information like `Astro.url` or `Astro.request`.

You can also inject possible headers or cookies.

    import Card from "../src/components/Card.astro";
    const result = await container.renderToString(Card, {  request: new Request("https://example.com/blog", {    headers: {      "x-some-secret-header": "test-value"    }  })});

### `params` option

[Section titled params option](#params-option)

**Type**: `Record<string, string | undefined>`;

An object to pass information about the path parameter to an Astro component responsible for [generating dynamic routes](/en/guides/routing/#dynamic-routes).

Use this option when your component needs a value for `Astro.params` in order to generate a single route dynamically.

    ---const { locale, slug } = Astro.params;---<div></div>

    import LocaleSlug from "../src/components/[locale]/[slug].astro";
    const result = await container.renderToString(LocaleSlug, {  params: {    locale: "en",    slug: "getting-started"  }});

### `locals` options

[Section titled locals options](#locals-options)

**Type**: `App.Locals`

An option to pass information from [`Astro.locals`](/en/reference/api-reference/#locals) for rendering your component.

Use this option to when your component needs information stored during the lifecycle of a request in order to render, such as logged in status.

    ---const { checkAuth } = Astro.locals;const isAuthenticated = checkAuth();---{isAuthenticated ? <span>You're in</span> : <span>You're out</span> }

    import Card from "../src/components/Card.astro";
    test("User is in", async () => {  const result = await container.renderToString(Card, {    locals: {      checkAuth() { return true; }    }  });
      // assert result contains "You're in"});
    
    test("User is out", async () => {  const result = await container.renderToString(Card, {    locals: {      checkAuth() { return false; }    }  });
      // assert result contains "You're out"});

### `routeType` option

[Section titled routeType option](#routetype-option)

**Type**: `"page" | "endpoint"`

An option available when using `renderToResponse` to specify that you are rendering an [endpoint](/en/guides/endpoints/):

    container.renderToString(Endpoint, { routeType: "endpoint" });

    import * as Endpoint from "../src/pages/api/endpoint.js";
    const response = await container.renderToResponse(Endpoint, {  routeType: "endpoint"});const json = await response.json();

To test your endpoint on methods such as `POST`, `PATCH`, etc., use the `request` option to call the correct function:

    export function GET() {}
    // need to test thisexport function POST() {}

    import * as Endpoint from "../src/pages/api/endpoint.js";
    const response = await container.renderToResponse(Endpoint, {    routeType: "endpoint",    request: new Request("https://example.com", {      method: "POST" // Specify POST method for testing    })});const json = await response.json();

### `partial` option

[Section titled partial option](#partial-option)

**Type:** `boolean`  
**Default:** `true`  

**Added in:** `astro@4.16.6`

Whether or not the Container API renders components as if they were [page partials](/en/basics/astro-pages/#page-partials). This is usually the behavior you want when rendering `components.boolean` so you can render components without a full page shell.

To render a component as a full Astro page, including `<!DOCTYPE html>`, you can opt-out of this behavior by setting `partial` to `false`:

    import Blog from "../src/pages/Blog.astro";
    const result = await container.renderToString(Card, {    partial: false});console.log(result) // includes `<!DOCTYPE html>` at the beginning of the HTML

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/container-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Dev Toolbar App API](/en/reference/dev-toolbar-app-reference/) [Next  
Programmatic Astro API (experimental)](/en/reference/programmatic-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

