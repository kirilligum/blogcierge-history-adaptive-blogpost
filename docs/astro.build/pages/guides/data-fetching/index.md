Data fetching
=============

`.astro` files can fetch remote data to help you generate your pages.

`fetch()` in Astro
------------------

[Section titled fetch() in Astro](#fetch-in-astro)

All [Astro components](/en/basics/astro-components/) have access to the [global `fetch()` function](https://developer.mozilla.org/en-US/docs/Web/API/fetch) in their component script to make HTTP requests to APIs using the full URL (e.g. `https://example.com/api`). Additionally, you can construct a URL to your project’s pages and endpoints that are rendered on demand on the server using [`new URL("/api", Astro.url)`](/en/reference/api-reference/#url).

This fetch call will be executed at build time, and the data will be available to the component template for generating dynamic HTML. If [SSR](/en/guides/on-demand-rendering/) mode is enabled, any fetch calls will be executed at runtime.

💡 Take advantage of [**top-level `await`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await) inside of your Astro component script.

💡 Pass fetched data to both Astro and framework components, as props.

src/components/User.astro

    ---import Contact from "../components/Contact.jsx";import Location from "../components/Location.astro";
    const response = await fetch("https://randomuser.me/api/");const data = await response.json();const randomUser = data.results[0];---<!-- Data fetched at build can be rendered in HTML --><h1>User</h1><h2>{randomUser.name.first} {randomUser.name.last}</h2>
    <!-- Data fetched at build can be passed to components as props --><Contact client:load email={randomUser.email} /><Location city={randomUser.location.city} />

Note

Remember, all data in Astro components is fetched when a component is rendered.

Your deployed Astro site will fetch data **once, at build time**. In dev, you will see data fetches on component refreshes. If you need to re-fetch data multiple times client-side, use a [framework component](/en/guides/framework-components/) or a [client-side script](/en/guides/client-side-scripts/) in an Astro component.

`fetch()` in Framework Components
---------------------------------

[Section titled fetch() in Framework Components](#fetch-in-framework-components)

The `fetch()` function is also globally available to any [framework components](/en/guides/framework-components/):

src/components/Movies.tsx

    import type { FunctionalComponent } from 'preact';
    const data = await fetch('https://example.com/movies.json').then((response) => response.json());
    // Components that are build-time rendered also log to the CLI.// When rendered with a `client:*` directive, they also log to the browser console.console.log(data);
    const Movies: FunctionalComponent = () => {  // Output the result to the page  return <div>{JSON.stringify(data)}</div>;};
    export default Movies;

GraphQL queries
---------------

[Section titled GraphQL queries](#graphql-queries)

Astro can also use `fetch()` to query a GraphQL server with any valid GraphQL query.

src/components/Film.astro

    ---const response = await fetch(  "https://swapi-graphql.netlify.app/.netlify/functions/index",  {    method: "POST",    headers: { "Content-Type": "application/json" },    body: JSON.stringify({      query: `        query getFilm ($id:ID!) {          film(id: $id) {            title            releaseDate          }        }      `,      variables: {        id: "ZmlsbXM6MQ==",      },    }),  });
    
    const json = await response.json();const { film } = json.data;---<h1>Fetching information about Star Wars: A New Hope</h1><h2>Title: {film.title}</h2><p>Year: {film.releaseDate}</p>

Fetch from a Headless CMS
-------------------------

[Section titled Fetch from a Headless CMS](#fetch-from-a-headless-cms)

Astro components can fetch data from your favorite CMS and then render it as your page content. Using [dynamic routes](/en/guides/routing/#dynamic-routes), components can even generate pages based on your CMS content.

See our [CMS Guides](/en/guides/cms/) for full details on integrating Astro with headless CMSes including Storyblok, Contentful, and WordPress.

Community resources
-------------------

[Section titled Community resources](#community-resources)

*   [Creating a fullstack app with Astro + GraphQL](https://robkendal.co.uk/blog/how-to-build-astro-site-with-graphql/)

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/data-fetching.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Images](/en/guides/images/) [Next  
Astro DB](/en/guides/astro-db/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)