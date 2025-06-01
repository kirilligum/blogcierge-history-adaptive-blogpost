On-demand rendering
===================

Your Astro project code must be **rendered** to HTML in order to be displayed on the web.

By default, Astro pages, routes, and API endpoints will be pre-rendered at build time as static pages. However, you can choose to render some or all of your routes on demand by a server when a route is requested.

On-demand rendered pages and routes are generated per visit, and can be customized for each viewer. For example, a page rendered on demand can show a logged-in user their account information or display freshly updated data without requiring a full-site rebuild.

On-demand rendering on the server at request time is also known as **server-side rendering (SSR)**.

Server adapters
---------------

[Section titled Server adapters](#server-adapters)

To render any page on demand, you need to add an **adapter**. Each adapter allows Astro to output a script that runs your project on a specific **runtime**: the environment that runs code on the server to generate pages when they are requested (e.g. Netlify, Cloudflare).

You may also wish to add an adapter even if your site is entirely static and you are not rendering any pages on demand. For example, the [Netlify adapter](/en/guides/integrations-guide/netlify/) enables Netlify’s Image CDN, and [server islands](/en/guides/server-islands/) require an adapter installed to use `server:defer` on a component.

### Adapters

*   ![](/logos/cloudflare-pages.svg)
    
    ### [@astrojs/cloudflare](/en/guides/integrations-guide/cloudflare/)
    
*   ![](/logos/netlify.svg)
    
    ### [@astrojs/netlify](/en/guides/integrations-guide/netlify/)
    
*   ![](/logos/node.svg)
    
    ### [@astrojs/node](/en/guides/integrations-guide/node/)
    
*   ![](/logos/vercel.svg)
    
    ### [@astrojs/vercel](/en/guides/integrations-guide/vercel/)
    

Astro maintains official adapters for [Node.js](https://nodejs.org/), [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), and [Cloudflare](https://www.cloudflare.com/). You can find both [official and community adapters in our integrations directory](https://astro.build/integrations/?search=&categories%5B%5D=adapters). Choose the one that corresponds to your [deployment environment](/en/guides/deploy/).

### Add an Adapter

[Section titled Add an Adapter](#add-an-adapter)

You can add any of the [official adapter integrations maintained by Astro](/en/guides/integrations-guide/#official-integrations) with the following `astro add` command. This will install the adapter and make the appropriate changes to your `astro.config.mjs` file in one step.

For example, to install the Netlify adapter, run:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-1720)
*   [pnpm](#tab-panel-1721)
*   [Yarn](#tab-panel-1722)

Terminal window

    npx astro add netlify

Terminal window

    pnpm astro add netlify

Terminal window

    yarn astro add netlify

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

You can also [add an adapter manually by installing the NPM package](/en/guides/integrations-guide/#installing-an-npm-package) (e.g. `@astrojs/netlify`) and updating `astro.config.mjs` yourself.

Note that different adapters may have different configuration settings. Read each adapter’s documentation, and apply any necessary config options to your chosen adapter in `astro.config.mjs`

Enabling on-demand rendering
----------------------------

[Section titled Enabling on-demand rendering](#enabling-on-demand-rendering)

**By default, your entire Astro site will be prerendered**, and static HTML pages will be sent to the browser. However, you may opt out of prerendering on any routes that require server rendering, for example, a page that checks for cookies and displays personalized content.

First, [add an adapter integration](#add-an-adapter) for your server runtime to enable on-demand server rendering in your Astro project.

Then, add `export const prerender = false` at the top of the individual page or endpoint you want to render on demand. The rest of your site will remain a static site:

src/pages/page-rendered-on-demand.astro

    ---export const prerender = false---<html><!--This content will be server-rendered on demand!Just add an adapter integration for a server runtime!All other pages are statically-generated at build time!--><html>

The following example shows opting out of prerendering in order to display a random number each time the endpoint is hit:

src/pages/randomnumber.js

    export const prerender = false;
    export async function GET() {  let number = Math.random();  return new Response(    JSON.stringify({      number,      message: `Here's a random number: ${number}`,    }),  );}

### `'server'` mode

[Section titled &#39;server&#39; mode](#server-mode)

For a **highly dynamic app**, after adding an adapter, you can [set your build output configuration to `output: 'server'`](/en/reference/configuration-reference/#output) to **server-render all your pages by default**. This is the equivalent of opting out of prerendering on every page.

Then, if needed, you can choose to prerender any individual pages that do not require a server to execute, such as a privacy policy or about page.

src/pages/about-my-app.astro

    ---export const prerender = true---<html><!--`output: 'server'` is configured, but this page is static!The rest of my site is rendered on demand!--><html>

Add `export const prerender = true` to any page or route to prerender a static page or endpoint:

src/pages/myendpoint.js

    export const prerender = true;
    export async function GET() {  return new Response(    JSON.stringify({      message: `This is my static endpoint`,    }),  );}

Tip

Start with the default `'static'` mode until you are sure that **most or all** of your pages will be rendered on demand! This ensures that your site is as performant as possible, not relying on a server function to render static content.

The `'server'` output mode does not bring any additional functionality. It only switches the default rendering behavior.

See more about the [`output` setting](/en/reference/configuration-reference/#output) in the configuration reference.

On-demand rendering features
----------------------------

[Section titled On-demand rendering features](#on-demand-rendering-features)

### HTML streaming

[Section titled HTML streaming](#html-streaming)

With HTML streaming, a document is broken up into chunks, sent over the network in order, and rendered on the page in that order. Astro uses HTML streaming in on-demand rendering to send each component to the browser as it renders them. This makes sure the user sees your HTML as fast as possible, although network conditions can cause large documents to be downloaded slowly, and waiting for data fetches can block page rendering.

![](/houston_chef.webp) **Related recipe:** [Using streaming to improve page performance](/en/recipes/streaming-improve-page-performance/)

Caution

Features that modify the [Response headers](https://developer.mozilla.org/en-US/docs/Glossary/Response_header) are only available at the **page level**. (You can’t use them inside of components, including layout components.) By the time Astro runs your component code, it has already sent the Response headers and they cannot be modified.

### Cookies

[Section titled Cookies](#cookies)

A page or API endpoint rendered on demand can check, set, get, and delete cookies.

The example below updates the value of a cookie for a page view counter:

src/pages/index.astro

    ---export const prerender = false; // Not needed in 'server' mode
    let counter = 0
    if (Astro.cookies.has('counter')) {  const cookie = Astro.cookies.get('counter')  const value = cookie?.number()  if (value !== undefined && !isNaN(value)) counter = value + 1}
    Astro.cookies.set('counter', String(counter))---<html>  <h1>Counter = {counter}</h1></html>

See more details about [`Astro.cookies` and the `AstroCookie` type](/en/reference/api-reference/#cookies) in the API reference.

### `Response`

[Section titled Response](#response)

[`Astro.response`](/en/reference/api-reference/#response) is a standard [`ResponseInit`](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#options) object. It can be used to set the response status and headers.

The example below sets a response status and status text for a product page when the product does not exist:

src/pages/product/\[id\].astro

    ---export const prerender = false; // Not needed in 'server' mode
    import { getProduct } from '../api';
    const product = await getProduct(Astro.params.id);
    // No product foundif (!product) {  Astro.response.status = 404;  Astro.response.statusText = 'Not found';}---<html>  <!-- Page here... --></html>

#### `Astro.response.headers`

[Section titled Astro.response.headers](#astroresponseheaders)

You can set headers using the `Astro.response.headers` object:

src/pages/index.astro

    ---export const prerender = false; // Not needed in 'server' mode
    Astro.response.headers.set('Cache-Control', 'public, max-age=3600');---<html>  <!-- Page here... --></html>

#### Return a `Response` object

[Section titled Return a Response object](#return-a-response-object)

You can also return a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object directly from any page using on-demand rendering either manually or with [`Astro.redirect`](/en/reference/api-reference/#redirect).

The example below looks up an ID in the database on a dynamic page and either it returns a 404 if the product does not exist, or it redirects the user to another page if the product is no longer available, or it displays the product:

src/pages/product/\[id\].astro

    ---export const prerender = false; // Not needed in 'server' mode
    import { getProduct } from '../api';
    const product = await getProduct(Astro.params.id);
    // No product foundif (!product) {  return new Response(null, {    status: 404,    statusText: 'Not found'  });}
    // The product is no longer availableif (!product.isAvailable) {  return Astro.redirect("/products", 301);}---<html>  <!-- Page here... --></html>

### `Request`

[Section titled Request](#request)

`Astro.request` is a standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object. It can be used to get the `url`, `headers`, `method`, and even the body of the request.

You can access additional information from this object for pages that are not statically generated.

#### `Astro.request.headers`

[Section titled Astro.request.headers](#astrorequestheaders)

The headers for the request are available on `Astro.request.headers`. This works like the browser’s [`Request.headers`](https://developer.mozilla.org/en-US/docs/Web/API/Request/headers). It is a [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) object where you can retrieve headers such as the cookie.

src/pages/index.astro

    ---export const prerender = false; // Not needed in 'server' mode
    const cookie = Astro.request.headers.get('cookie');// ...---<html>  <!-- Page here... --></html>

#### `Astro.request.method`

[Section titled Astro.request.method](#astrorequestmethod)

The HTTP method used in the request is available as `Astro.request.method`. This works like the browser’s [`Request.method`](https://developer.mozilla.org/en-US/docs/Web/API/Request/method). It returns the string representation of the HTTP method used in the request.

src/pages/index.astro

    ---export const prerender = false; // Not needed in 'server' mode
    console.log(Astro.request.method) // GET (when navigated to in the browser)---

See more details about [`Astro.request`](/en/reference/api-reference/#request) in the API reference.

### Server Endpoints

[Section titled Server Endpoints](#server-endpoints)

A server endpoint, also known as an **API route**, is a special function exported from a `.js` or `.ts` file within the `src/pages/` folder. A powerful feature of server-side rendering on demand, API routes are able to securely execute code on the server.

The function takes an [endpoint context](/en/reference/api-reference/) and returns a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).

To learn more, see our [Endpoints Guide](/en/guides/endpoints/#server-endpoints-api-routes).

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/on-demand-rendering.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Astro DB](/en/guides/astro-db/) [Next  
Server islands](/en/guides/server-islands/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)