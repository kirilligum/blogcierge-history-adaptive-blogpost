Sessions
========

**Added in:** `astro@5.7.0`

Sessions are used to share data between requests for [on-demand rendered pages](/en/guides/on-demand-rendering/).

Unlike [`cookies`](/en/guides/on-demand-rendering/#cookies), sessions are stored on the server, so you can store larger amounts of data without worrying about size limits or security issues. They are useful for storing things like user data, shopping carts, and form state, and they work without any client-side JavaScript:

src/components/CartButton.astro

    ---export const prerender = false; // Not needed with 'server' outputconst cart = await Astro.session?.get('cart');---
    <a href="/checkout">🛒 {cart?.length ?? 0} items</a>

Configuring sessions
--------------------

[Section titled Configuring sessions](#configuring-sessions)

Sessions require a storage driver to store the session data. The [Node](/en/guides/integrations-guide/node/#sessions), [Cloudflare](/en/guides/integrations-guide/cloudflare/#sessions), and [Netlify](/en/guides/integrations-guide/netlify/#sessions) adapters automatically configure a default driver for you, but other adapters currently require you to [specify a driver manually](/en/reference/configuration-reference/#sessiondriver).

astro.config.mjs

      {    adapter: vercel(),    session: {      driver: "redis",    },  }

See [the `session` configuration option](/en/reference/configuration-reference/#session-options) for more details on setting a storage driver, and other configurable options.

Interacting with session data
-----------------------------

[Section titled Interacting with session data](#interacting-with-session-data)

The [`session` object](/en/reference/api-reference/#session) allows you to interact with the stored user state (e.g. adding items to a shopping cart) and the session ID (e.g. deleting the session ID cookie when logging out). The object is accessible as `Astro.session` in your Astro components and pages and as `context.session` object in API endpoints, middleware, and actions.

The session is generated automatically when it is first used and can be regenerated at any time with [`session.regenerate()`](/en/reference/api-reference/#regenerate) or destroyed with [`session.destroy()`](/en/reference/api-reference/#destroy).

For many use cases, you will only need to use [`session.get()`](/en/reference/api-reference/#get) and [`session.set()`](/en/reference/api-reference/#set).

See [the Sessions API reference](/en/reference/api-reference/#session) for more details.

### Astro components and pages

[Section titled Astro components and pages](#astro-components-and-pages)

In `.astro` components and pages, you can access the session object via the global `Astro` object. For example, to display the number of items in a shopping cart:

src/components/CartButton.astro

    ---export const prerender = false; // Not needed with 'server' outputconst cart = await Astro.session?.get('cart');---
    <a href="/checkout">🛒 {cart?.length ?? 0} items</a>

### API endpoints

[Section titled API endpoints](#api-endpoints)

In API endpoints, the session object is available on the `context` object. For example, to add an item to a shopping cart:

src/pages/api/addToCart.ts

    export async function POST(context: APIContext) {  const cart = await context.session?.get('cart') || [];  const data = await context.request.json<{ item: string }>();  if(!data?.item) {    return new Response('Item is required', { status: 400 });  }  cart.push(data.item);  await context.session?.set('cart', cart);  return Response.json(cart);}

### Actions

[Section titled Actions](#actions)

In actions, the session object is available on the `context` object. For example, to add an item to a shopping cart:

src/actions/addToCart.ts

    import { defineAction } from 'astro:actions';import { z } from 'astro:schema';
    export const server = {  addToCart: defineAction({    input: z.object({ productId: z.string() }),    handler: async (input, context) => {      const cart = await context.session?.get('cart');      cart.push(input.productId);      await context.session?.set('cart', cart);      return cart;    },  }),};

### Middleware

[Section titled Middleware](#middleware)

Note

Sessions are not currently supported in edge middleware.

In middleware, the session object is available on the `context` object. For example, to set the last visit time in the session:

src/middleware.ts

    import { defineMiddleware } from 'astro:middleware';
    export const onRequest = defineMiddleware(async (context, next) => {  context.session?.set('lastVisit', new Date());  return next();});

Session data types
------------------

[Section titled Session data types](#session-data-types)

By default session data is untyped, and you can store arbitrary data in any key. Values are serialized and deserialized using [devalue](https://github.com/Rich-Harris/devalue), which is the same library used in content collections and actions. This means that supported types are the same, and include strings, numbers, `Date`, `Map`, `Set`, `URL`, arrays, and plain objects.

You can optionally define TypeScript types for your session data by creating a `src/env.d.ts` file and adding a declaration for the `App.SessionData` type:

src/env.d.ts

    declare namespace App {  interface SessionData {    user: {      id: string;      name: string;    };    cart: string[];  }}

This will allow you to access the session data with type-checking and auto-completion in your editor:

src/components/CartButton.astro

    ---const cart = await Astro.session?.get('cart');// const cart: string[] | undefined
    const something = await Astro.session?.get('something');// const something: any
    Astro.session?.set('user', { id: 1, name: 'Houston' });// Error: Argument of type '{ id: number; name: string }' is not assignable to parameter of type '{ id: string; name: string; }'.---

Caution

This is only used for type-checking and does not affect the runtime behavior of the session. Take extra care if you change the type when users have stored data in the session, as this could cause runtime errors.

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/sessions.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Actions](/en/guides/actions/) [Next  
Upgrade Astro](/en/upgrade-astro/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)