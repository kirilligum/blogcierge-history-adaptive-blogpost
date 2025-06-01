Using streaming to improve page performance
===========================================

Astro’s SSR uses HTML streaming to send each component to the browser when available for faster page loading. To improve your page’s performance even further, you can build your components strategically to optimize their loading by avoiding blocking data fetches.

The following refactoring example demonstrates how to improve page performance by moving fetch calls to other components, moving them out of a component where they block page rendering.

The following page `await`s some data in its frontmatter. Astro will wait for all of the `fetch` calls to resolve before sending any HTML to the browser.

src/pages/index.astro

    ---const personResponse = await fetch('https://randomuser.me/api/');const personData = await personResponse.json();const randomPerson = personData.results[0];const factResponse = await fetch('https://catfact.ninja/fact');const factData = await factResponse.json();---<html>  <head>    <title>A name and a fact</title>  </head>  <body>    <h2>A name</h2>    <p>{randomPerson.name.first}</p>    <h2>A fact</h2>    <p>{factData.fact}</p>  </body></html>

Moving the `await` calls into smaller components allows you to take advantage of Astro’s streaming. Using the following components to perform the data fetches, Astro can render some HTML first, such as the title, and then the paragraphs when the data is ready.

src/components/RandomName.astro

    ---const personResponse = await fetch('https://randomuser.me/api/');const personData = await personResponse.json();const randomPerson = personData.results[0];---<p>{randomPerson.name.first}</p>

src/components/RandomFact.astro

    ---const factResponse = await fetch('https://catfact.ninja/fact');const factData = await factResponse.json();---<p>{factData.fact}</p>

The Astro page below using these components can render parts of the page sooner. The `<head>`, `<body>`, and `<h2>` tags are no longer blocked by data fetches. The server will then fetch data for `RandomName` and `RandomFact` in parallel and stream the resulting HTML to the browser.

src/pages/index.astro

    ---import RandomName from '../components/RandomName.astro';import RandomFact from '../components/RandomFact.astro';---<html>  <head>    <title>A name and a fact</title>  </head>  <body>    <h2>A name</h2>    <RandomName />    <h2>A fact</h2>    <RandomFact />  </body></html>

#### Including Promises directly

[Section titled Including Promises directly](#including-promises-directly)

You can also include promises directly in the template. Instead of blocking the entire component, it will resolve the promise in parallel and only block the markup that comes after it.

src/pages/index.astro

    ---const personPromise = fetch('https://randomuser.me/api/')  .then(response => response.json())  .then(personData => personData.results[0].name.first);const factPromise = fetch('https://catfact.ninja/fact')  .then(response => response.json())  .then(factData => factData.fact);---<html>  <head>    <title>A name and a fact</title>  </head>  <body>    <h2>A name</h2>    <p>{personPromise}</p>    <h2>A fact</h2>    <p>{factPromise}</p>  </body></html>

In this example, `A name` will render while `personPromise` and `factPromise` are loading. Once `personPromise` has resolved, `A fact` will appear and `factPromise` will render when it’s finished loading.

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/streaming-improve-page-performance.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Share state between islands](/en/recipes/sharing-state-islands/) [Next  
Style rendered Markdown with Tailwind Typography](/en/recipes/tailwind-rendered-markdown/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

