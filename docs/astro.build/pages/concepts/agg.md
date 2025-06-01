# Aggregated from ./pages/concepts/islands
Islands architecture
====================

Astro helped pioneer and popularize a new frontend architecture pattern called **Islands Architecture.** Islands architecture works by rendering the majority of your page to fast, static HTML with smaller “islands” of JavaScript added when interactivity or personalization is needed on the page (an image carousel, for example). This avoids the monolithic JavaScript payloads that slow down the responsiveness of many other, modern JavaScript web frameworks.

A brief history
---------------

[Section titled A brief history](#a-brief-history)

The term “component island” was first coined by Etsy’s frontend architect [Katie Sylor-Miller](https://sylormiller.com/) in 2019. This idea was then expanded on and documented in [this post](https://jasonformat.com/islands-architecture/) by Preact creator Jason Miller on August 11, 2020.

> The general idea of an “Islands” architecture is deceptively simple: render HTML pages on the server, and inject placeholders or slots around highly dynamic regions \[…\] that can then be “hydrated” on the client into small self-contained widgets, reusing their server-rendered initial HTML.  
> — Jason Miller, Creator of Preact

The technique that this architectural pattern builds on is also known as **partial** or **selective hydration.**

In contrast, most JavaScript-based web frameworks hydrate & render an entire website as one large JavaScript application (also known as a single-page application, or SPA). SPAs provide simplicity and power but suffer from page-load performance problems due to heavy client-side JavaScript usage.

SPAs have their place, even [embedded inside an Astro page](/en/guides/migrate-to-astro/from-create-react-app/). But, SPAs lack the native ability to selectively and strategically hydrate, making them a heavy-handed choice for most projects on the web today.

Astro became popular as the first mainstream JavaScript web framework with selective hydration built-in, using that same component islands pattern first coined by Sylor-Miller. We’ve since expanded and evolved on Sylor-Miller’s original work, which helped to inspire a similar component island approach to dynamically server-rendered content.

What is an island?
------------------

[Section titled What is an island?](#what-is-an-island)

In Astro, an island is an enhanced UI component on an otherwise static page of HTML.

A [**client island**](#client-islands) is an interactive JavaScript UI component that is hydrated separately from the rest of the page, while a [**server island**](#server-islands) is a UI component that server-renders its dynamic content separately from the rest of the page.

Both islands run expensive or slower processes independently, on a per-component basis, for optimized page loads.

Island components
-----------------

[Section titled Island components](#island-components)

Astro components are the building blocks of your page template. They render to static HTML with no client-side runtime.

Think of a client island as an interactive widget floating in a sea of otherwise static, lightweight, server-rendered HTML. Server islands can be added for personalized or dynamic server-rendered elements, such as a logged in visitor’s profile picture.

Header (interactive island)

Sidebar (static HTML)

Static content like text, images, etc.

Image carousel (interactive island)

Footer (static HTML)

Source: [Islands Architecture: Jason Miller](https://jasonformat.com/islands-architecture/)

An island always runs in isolation from other islands on the page, and multiple islands can exist on a page. Client islands can still share state and communicate with each other, even though they run in different component contexts.

This flexibility allows Astro to support multiple UI frameworks like [React](https://react.dev/), [Preact](https://preactjs.com/), [Svelte](https://svelte.dev/), [Vue](https://vuejs.org/), and [SolidJS](https://www.solidjs.com/). Because they are independent, you can even mix several frameworks on each page.

Tip

Although most developers will stick to just one UI framework, Astro supports multiple frameworks in the same project. This allows you to:

*   Choose the framework that is best for each component.
*   Learn a new framework without needing to start a new project.
*   Collaborate with others even when working in different frameworks.
*   Incrementally convert an existing site to another framework with no downtime.

Client Islands
--------------

[Section titled Client Islands](#client-islands)

By default, Astro will automatically render every UI component to just HTML & CSS, **stripping out all client-side JavaScript automatically.**

src/pages/index.astro

    <MyReactComponent />

This may sound strict, but this behavior is what keeps Astro websites fast by default and protects developers from accidentally sending unnecessary or unwanted JavaScript that might slow down their website.

Turning any static UI component into an interactive island requires only a `client:*` directive. Astro then automatically builds and bundles your client-side JavaScript for optimized performance.

src/pages/index.astro

    <!-- This component is now interactive on the page!     The rest of your website remains static. --><MyReactComponent client:load />

With islands, client-side JavaScript is only loaded for the explicit interactive components that you mark using `client:*` directives.

And because interaction is configured at the component-level, you can handle different loading priorities for each component based on its usage. For example, `client:idle` tells a component to load when the browser becomes idle, and `client:visible` tells a component to load only once it enters the viewport.

### Benefits of client islands

The most obvious benefit of building with Astro Islands is performance: the majority of your website is converted to fast, static HTML and JavaScript is only loaded for the individual components that need it. JavaScript is one of the slowest assets that you can load per-byte, so every byte counts.

Another benefit is parallel loading. In the example illustration above, the low-priority “image carousel” island doesn’t need to block the high-priority “header” island. The two load in parallel and hydrate in isolation, meaning that the header becomes interactive immediately without having to wait for the heavier carousel lower down the page.

Even better, you can tell Astro exactly how and when to render each component. If that image carousel is really expensive to load, you can attach a special [client directive](/en/reference/directives-reference/#client-directives) that tells Astro to only load the carousel when it becomes visible on the page. If the user never sees it, it never loads.

In Astro, it’s up to you as the developer to explicitly tell Astro which components on the page need to also run in the browser. Astro will only hydrate exactly what’s needed on the page and leave the rest of your site as static HTML.

**Client islands are the secret to Astro’s fast-by-default performance story!**

Read more about [using JavaScript framework components](/en/guides/framework-components/) in your project.

Server islands
--------------

[Section titled Server islands](#server-islands)

Server islands are a way to move expensive or slow server-side code out of the way of the main rendering process, making it easy to combine high-performance static HTML and dynamic server-generated components.

Add the [`server:defer` directive](/en/reference/directives-reference/#server-directives) to any Astro component on your page to turn it into its own server island:

src/pages/index.astro

    ---import Avatar from "../components/Avatar.astro";---<Avatar server:defer />

This breaks up your page with smaller areas of server-rendered content that each load in parallel.

Your page’s main content can be rendered immediately with placeholder content, such as a generic avatar until your island’s own content is available. With server islands, having small components of personalized content does not delay the rendering of an otherwise static page.

This rendering pattern was built to be portable. It does not depend on any server infrastructure so it will work with any host, from a Node.js server in a Docker container to the serverless provider of your choice.

### Benefits of server islands

One benefit of server islands is the ability to render the more highly dynamic parts of your page on the fly. This allows the outer shell and main content to be more aggressively cached, providing faster performance.

Another benefit is providing a great visitor experience. Server islands are optimized and load quickly, often even before the browser has even painted the page. But in the short time it takes for your islands to render, you can display custom fallback content and prevent any layout shift.

An example of a site that benefits from Astro’s server islands is an e-commerce storefront. Although the main content of product pages change infrequently, these pages typically have some dynamic pieces:

*   The user’s avatar in the header.
*   Special deals and sales for the product.
*   User reviews.

Using server islands for these elements, your visitor will see the most important part of the page, your product, immediately. Generic avatars, loading spinners, and store announcements can be displayed as fallback content until the personalized parts are available.

Read more about [using server islands](/en/guides/server-islands/) in your project.

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/concepts/islands.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Why Astro?](/en/concepts/why-astro/) [Next  
Tutorial: Build a blog](/en/tutorial/0-introduction/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/concepts/why-astro
Why Astro?
==========

**Astro** is the web framework for building **content-driven websites** like blogs, marketing, and e-commerce. Astro is best-known for pioneering a new [frontend architecture](/en/concepts/islands/) to reduce JavaScript overhead and complexity compared to other frameworks. If you need a website that loads fast and has great SEO, then Astro is for you.

Features
--------

[Section titled Features](#features)

**Astro is an all-in-one web framework.** It includes everything you need to create a website, built-in. There are also hundreds of different [integrations](https://astro.build/integrations/) and [API hooks](/en/reference/integrations-reference/) available to customize a project to your exact use case and needs.

Some highlights include:

*   **[Islands](/en/concepts/islands/):** A component-based web architecture optimized for content-driven websites.
*   **[UI-agnostic](/en/guides/framework-components/):** Supports React, Preact, Svelte, Vue, Solid, HTMX, web components, and more.
*   **[Server-first](/en/guides/on-demand-rendering/):** Moves expensive rendering off of your visitors’ devices.
*   **[Zero JS, by default](/en/basics/astro-components/):** Less client-side JavaScript to slow your site down.
*   **[Content collections](/en/guides/content-collections/):** Organize, validate, and provide TypeScript type-safety for your Markdown content.
*   **[Customizable](/en/guides/integrations-guide/):** Partytown, MDX, and hundreds of integrations to choose from.

Design Principles
-----------------

[Section titled Design Principles](#design-principles)

Here are five core design principles to help explain why we built Astro, the problems that it exists to solve, and why Astro may be the best choice for your project or team.

Astro is…

1.  **[Content-driven](#content-driven):** Astro was designed to showcase your content.
2.  **[Server-first](#server-first):** Websites run faster when they render HTML on the server.
3.  **[Fast by default](#fast-by-default):** It should be impossible to build a slow website in Astro.
4.  **[Easy to use](#easy-to-use):** You don’t need to be an expert to build something with Astro.
5.  **[Developer-focused](#developer-focused):** You should have the resources you need to be successful.

### Content-driven

[Section titled Content-driven](#content-driven)

**Astro was designed for building content-rich websites.** This includes marketing sites, publishing sites, documentation sites, blogs, portfolios, landing pages, community sites, and e-commerce sites. If you have content to show, it needs to reach your reader quickly.

By contrast, most modern web frameworks were designed for building _web applications_. These frameworks excel at building more complex, application-like experiences in the browser: logged-in admin dashboards, inboxes, social networks, todo lists, and even native-like applications like [Figma](https://figma.com/) and [Ping](https://ping.gg/). However with that complexity, they can struggle to provide great performance when delivering your content.

Astro’s focus on content from its beginnings as a static site builder have allowed Astro to **sensibly scale up to performant, powerful, dynamic web applications** that still respect your content and your audience. Astro’s unique focus on content lets Astro make tradeoffs and deliver unmatched performance features that wouldn’t make sense for more application-focused web frameworks to implement.

### Server-first

[Section titled Server-first](#server-first)

**Astro leverages server rendering over client-side rendering in the browser as much as possible.** This is the same approach that traditional server-side frameworks -- PHP, WordPress, Laravel, Ruby on Rails, etc. -- have been using for decades. But you don’t need to learn a second server-side language to unlock it. With Astro, everything is still just HTML, CSS, and JavaScript (or TypeScript, if you prefer).

This approach stands in contrast to other modern JavaScript web frameworks like Next.js, SvelteKit, Nuxt, Remix, and others. These frameworks were built for client-side rendering of your entire website and include server-side rendering mainly to address performance concerns. This approach has been dubbed the **Single-Page App (SPA)**, in contrast with Astro’s **Multi-Page App (MPA)** approach.

The SPA model has its benefits. However, these come at the expense of additional complexity and performance tradeoffs. These tradeoffs harm page performance -- critical metrics like [Time to Interactive (TTI)](https://web.dev/interactive/) -- which doesn’t make much sense for content-focused websites where first-load performance is essential.

Astro’s server-first approach allows you to opt in to client-side rendering only if, and exactly as, necessary. You can choose to add UI framework components that run on the client. You can take advantage of Astro’s view transitions router for finer control over select page transitions and animations. Astro’s server-first rendering, either pre-rendered or on-demand, provides performant defaults that you can enhance and extend.

### Fast by default

[Section titled Fast by default](#fast-by-default)

Good performance is always important, but it is _especially_ critical for websites whose success depends on displaying your content. It has been well-proven that poor performance loses you engagement, conversions, and money. For example:

*   Every 100ms faster → 1% more conversions ([Mobify](https://web.dev/why-speed-matters/), earning +$380,000/yr)
*   50% faster → 12% more sales ([AutoAnything](https://www.digitalcommerce360.com/2010/08/19/web-accelerator-revs-conversion-and-sales-autoanything/))
*   20% faster → 10% more conversions ([Furniture Village](https://www.thinkwithgoogle.com/intl/en-gb/marketing-strategies/app-and-mobile/furniture-village-and-greenlight-slash-page-load-times-boosting-user-experience/))
*   40% faster → 15% more sign-ups ([Pinterest](https://medium.com/pinterest-engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7))
*   850ms faster → 7% more conversions ([COOK](https://web.dev/why-speed-matters/))
*   Every 1 second slower → 10% fewer users ([BBC](https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale))

In many web frameworks, it is easy to build a website that looks great during development only to load painfully slow once deployed. JavaScript is often the culprit, since many phones and lower-powered devices rarely match the speed of a developer’s laptop.

Astro’s magic is in how it combines the two values explained above -- a content focus with a server-first architecture -- to make tradeoffs and deliver features that other frameworks cannot. The result is amazing web performance for every website, out of the box. Our goal: **It should be nearly impossible to build a slow website with Astro.**

An Astro website can [load 40% faster with 90% less JavaScript](https://twitter.com/t3dotgg/status/1437195415439360003) than the same site built with the most popular React web framework. But don’t take our word for it: watch Astro’s performance leave Ryan Carniato (creator of Solid.js and Marko) [speechless](https://youtu.be/2ZEMb_H-LYE?t=8163).

### Easy to use

[Section titled Easy to use](#easy-to-use)

**Astro’s goal is to be accessible to every web developer.** Astro was designed to feel familiar and approachable regardless of skill level or past experience with web development.

The `.astro` UI language is a superset of HTML: any valid HTML is valid Astro templating syntax! So, if you can write HTML, you can write Astro components! But, it also combines some of our favorite features borrowed from other component languages like JSX expressions (React) and CSS scoping by default (Svelte and Vue). This closeness to HTML also makes it easier to use progressive enhancement and common accessibility patterns without any overhead.

We then made sure that you could also use your favorite UI component languages that you already know, and even reuse components you might already have. React, Preact, Svelte, Vue, Solid, and others, including web components, are all supported for authoring UI components in an Astro project.

Astro was designed to be less complex than other UI frameworks and languages. One big reason for this is that Astro was designed to render on the server, not in the browser. That means that you don’t need to worry about: hooks (React), stale closures (also React), refs (Vue), observables (Svelte), atoms, selectors, reactions, or derivations. There is no reactivity on the server, so all of that complexity melts away.

One of our favorite sayings is: **opt in to complexity.** We designed Astro to remove as much “required complexity” as possible from the developer experience, especially as you onboard for the first time. You can build a “Hello World” example website in Astro with just HTML and CSS. Then, when you need to build something more powerful, you can incrementally reach for new features and APIs as you go.

### Developer-focused

[Section titled Developer-focused](#developer-focused)

We strongly believe that Astro is only a successful project if people love using it. Astro has everything you need to support you as you build with Astro.

Astro invests in developer tools like a great CLI experience from the moment you open your terminal, an official VS Code extension for syntax highlighting, TypeScript and Intellisense, and documentation actively maintained by hundreds of community contributors and available in 14 languages.

Our welcoming, respectful, inclusive community on Discord is ready to provide support, motivation, and encouragement. Open a `#support` thread to get help with your project. Visit our dedicated `#showcase` channel for sharing your Astro sites, blog posts, videos, and even work-in-progress for safe feedback and constructive criticism. Participate in regular live events such as our weekly community call, “Talking and Doc’ing,” and API/bug bashes.

As an open-source project, we welcome contributions of all types and sizes from community members of all experience levels. You are invited to join in roadmap discussions to shape the future of Astro, and we hope you’ll contribute fixes and features to the core codebase, compiler, docs, language tools, websites, and other projects.

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/concepts/why-astro.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Getting started](/en/getting-started/) [Next  
Islands architecture](/en/concepts/islands/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



