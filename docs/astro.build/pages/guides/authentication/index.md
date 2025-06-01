Authentication
==============

Authentication and authorization are two security processes that manage access to your website or app. Authentication verifies a visitor’s identity, while authorization grants access to protected areas and resources.

Authentication allows you to customize areas of your site for logged-in individuals and provides the greatest protection for personal or private information. Authentication libraries (e.g. [Auth.js](https://authjs.dev/), [Clerk](https://clerk.com)) provide utilities for multiple authentication methods such as email sign-in and OAuth providers.

Tip

There is no official authentication solution for Astro, but you can find [community “auth” integrations](https://astro.build/integrations/?search=auth) in the integrations directory.

See how to [add authentication with Supabase](/en/guides/backend/supabase/#adding-authentication-with-supabase) or [add authentication with Firebase](/en/guides/backend/google-firebase/#adding-authentication-with-firebase) in our dedicated guides for these backend services.

Auth.js
-------

[Section titled Auth.js](#authjs)

Auth.js is a framework agnostic solution for authentication. A community framework adapter [`auth-astro`](https://www.npmjs.com/package/auth-astro) is available for Astro.

### Installation

[Section titled Installation](#installation)

Use the `astro add` command for your preferred package manager to add the `auth-astro` integration.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-1695)
*   [pnpm](#tab-panel-1696)
*   [Yarn](#tab-panel-1697)

Terminal window

    npx astro add auth-astro

Terminal window

    pnpm astro add auth-astro

Terminal window

    yarn astro add auth-astro

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

#### Manual installation

[Section titled Manual installation](#manual-installation)

To install `auth-astro` manually, install the required package for your package manager:

*   [npm](#tab-panel-1698)
*   [pnpm](#tab-panel-1699)
*   [Yarn](#tab-panel-1700)

Terminal window

    npm install auth-astro @auth/core@^0.18.6

Terminal window

    pnpm add auth-astro @auth/core@^0.18.6

Terminal window

    yarn add auth-astro @auth/core@^0.18.6

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

astro.config.mjs

    import { defineConfig } from 'astro/config';import auth from 'auth-astro';
    export default defineConfig({  // ...  integrations: [auth()],});

### Configuration

[Section titled Configuration](#configuration)

Create an `auth.config.ts` file in your project’s root directory. Add any auth [providers](https://authjs.dev/getting-started/providers) or methods you wish to support, along with any environment variables they require.

auth.config.ts

    import GitHub from '@auth/core/providers/github';import { defineConfig } from 'auth-astro';
    export default defineConfig({  providers: [    GitHub({      clientId: import.meta.env.GITHUB_CLIENT_ID,      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,    }),  ],});

Create a `.env` file in the root of your project if it does not already exist. Add the following two environment variables. `AUTH_SECRET` should be a private string with a minimum of 32 characters.

.env

    AUTH_TRUST_HOST=trueAUTH_SECRET=<my-auth-secret>

### Usage

[Section titled Usage](#usage)

You can add sign-in and sign-out buttons using the `auth-astro/client` module in a script tag or client-side framework component.

src/pages/index.astro

    ---import Layout from 'src/layouts/Base.astro';---<Layout>  <button id="login">Login</button>  <button id="logout">Logout</button>
      <script>    const { signIn, signOut } = await import("auth-astro/client")    document.querySelector("#login").onclick = () => signIn("github")    document.querySelector("#logout").onclick = () => signOut()  </script></Layout>

You can fetch the user’s session using the `getSession` method.

src/pages/index.astro

    ---import Layout from 'src/layouts/Base.astro';import { getSession } from 'auth-astro/server';
    const session = await getSession(Astro.request);---<Layout>  {    session ? (      <p>Welcome {session.user?.name}</p>    ) : (      <p>Not logged in</p>    )  }</Layout>

### Next Steps

[Section titled Next Steps](#next-steps)

*   [`auth-astro` on GitHub](https://github.com/nowaythatworked/auth-astro?tab=readme-ov-file#auth-astro)
*   [Auth.js documentation](https://authjs.dev/)

Better Auth
-----------

[Section titled Better Auth](#better-auth)

Better Auth is a framework-agnostic authentication (and authorization) framework for TypeScript. It provides a comprehensive set of features out of the box and includes a plugin ecosystem that simplifies adding advanced functionalities.

It supports Astro out of the box, and you can use it to add authentication to your astro project.

### Installation

[Section titled Installation](#installation-1)

*   [npm](#tab-panel-1701)
*   [pnpm](#tab-panel-1702)
*   [Yarn](#tab-panel-1703)

Terminal window

    npm install better-auth

Terminal window

    pnpm add better-auth

Terminal window

    yarn add better-auth

For detailed setup instructions, check out the [Better Auth Installation Guide](https://www.better-auth.com/docs/installation).

### Configuration

[Section titled Configuration](#configuration-1)

Configure your database table to store user data and your preferred authentication methods as described in the [Better Auth Installation Guide](https://www.better-auth.com/docs/installation#configure-database). Then, you’ll need to mount the Better Auth handler in your Astro project.

src/pages/api/auth/\[...all\].ts

    import { auth } from "../../../lib/auth"; // import your Better Auth instanceimport type { APIRoute } from "astro";
    export const ALL: APIRoute = async (ctx) => {  return auth.handler(ctx.request);};

Follow the [Better Auth Astro Guide](https://www.better-auth.com/docs/integrations/astro) to learn more.

### Usage

[Section titled Usage](#usage-1)

Better Auth offers a `createAuthClient` helper for various frameworks, including Vanilla JS, React, Vue, Svelte, and Solid.

For example, to create a client for React, import the helper from `'better-auth/react'`:

*   [React](#tab-panel-1707)
*   [Solid](#tab-panel-1708)
*   [Svelte](#tab-panel-1709)
*   [Vue](#tab-panel-1710)

src/lib/auth-client.ts

    import { createAuthClient } from 'better-auth/react';
    export const authClient = createAuthClient();
    export const { signIn, signOut } = authClient;

src/lib/auth-client.ts

    import { createAuthClient } from 'better-auth/solid';
    export const authClient = createAuthClient();
    export const { signIn, signOut } = authClient;

src/lib/auth-client.ts

    import { createAuthClient } from 'better-auth/svelte';
    export const authClient = createAuthClient();
    export const { signIn, signOut } = authClient;

src/lib/auth-client.ts

    import { createAuthClient } from 'better-auth/vue';
    export const authClient = createAuthClient();
    export const { signIn, signOut } = authClient;

Once your client is set up, you can use it to authenticate users in your Astro components or any framework-specific files. The following example adds the ability to log in or log out with your configured `signIn()` and `signOut()` functions.

src/pages/index.astro

    ---import Layout from 'src/layouts/Base.astro';---<Layout>  <button id="login">Login</button>  <button id="logout">Logout</button>
      <script>    const { signIn, signOut } = await import("./lib/auth-client")    document.querySelector("#login").onclick = () => signIn.social({      provider: "github",      callbackURL: "/dashboard",    })    document.querySelector("#logout").onclick = () => signOut()  </script></Layout>

You can then use the `auth` object to get the user’s session data in your server-side code. The following example personalizes page content by displaying an authenticated user’s name:

src/pages/index.astro

    ---import { auth } from "../../../lib/auth"; // import your Better Auth instance
    const session = await auth.api.getSession({  headers: Astro.request.headers,});---
    <p>{session.user?.name}</p>

You can also use the `auth` object to protect your routes using middleware. The following example checks whether a user trying to access a logged-in dashboard route is authenticated, and redirects them to the home page if not.

src/middleware.ts

    import { auth } from "../../../auth"; // import your Better Auth instanceimport { defineMiddleware } from "astro:middleware";
    export const onRequest = defineMiddleware(async (context, next) => {  const isAuthed = await auth.api    .getSession({      headers: context.request.headers,    })  if (context.url.pathname === "/dashboard" && !isAuthed) {    return context.redirect("/");  }  return next();});

### Next Steps

[Section titled Next Steps](#next-steps-1)

*   [Better Auth Astro Guide](https://www.better-auth.com/docs/integrations/astro)
*   [Better Auth Astro Example](https://github.com/better-auth/better-auth/tree/main/examples/astro-example)
*   [Better Auth Documentation](https://www.better-auth.com/docs)
*   [Better Auth GitHub Repository](https://github.com/better-auth/better-auth)

Clerk
-----

[Section titled Clerk](#clerk)

Clerk is a complete suite of embeddable UIs, flexible APIs, and admin dashboards to authenticate and manage your users. An [official Clerk SDK for Astro](https://clerk.com/docs/references/astro/overview) is available.

### Installation

[Section titled Installation](#installation-2)

Install `@clerk/astro` using the package manager of your choice.

*   [npm](#tab-panel-1704)
*   [pnpm](#tab-panel-1705)
*   [Yarn](#tab-panel-1706)

Terminal window

    npm install @clerk/astro

Terminal window

    pnpm add @clerk/astro

Terminal window

    yarn add @clerk/astro

### Configuration

[Section titled Configuration](#configuration-2)

Follow [Clerk’s own Astro Quickstart guide](https://clerk.com/docs/quickstarts/astro) to set up Clerk integration and middleware in your Astro project.

### Usage

[Section titled Usage](#usage-2)

Clerk provides components that allow you to control the visibility of pages based on your user’s authentication state. Show logged out users a sign in button instead of the content available to users who are logged in:

src/pages/index.astro

    ---import Layout from 'src/layouts/Base.astro';import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/astro/components';---
    <Layout>    <SignedIn>        <UserButton />    </SignedIn>    <SignedOut>        <SignInButton />    </SignedOut></Layout>

Clerk also allows you to protect routes on the server using middleware. Specify which routes are protected, and prompt unauthenticated users to sign in:

src/middleware.ts

    import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';
    const isProtectedRoute = createRouteMatcher([  '/dashboard(.*)',  '/forum(.*)',]);
    export const onRequest = clerkMiddleware((auth, context) => {  if (!auth().userId && isProtectedRoute(context.request)) {    return auth().redirectToSignIn();  }});

### Next Steps

[Section titled Next Steps](#next-steps-2)

*   Read the [official `@clerk/astro` documentation](https://clerk.com/docs/references/astro/overview)
*   Start from a template with the [Clerk + Astro Quickstart project](https://github.com/clerk/clerk-astro-quickstart)

Lucia
-----

[Section titled Lucia](#lucia)

[Lucia](https://lucia-auth.com/) is a resource for implementing session-based authentication in a number of frameworks, including Astro.

### Guides

[Section titled Guides](#guides)

1.  Create a [basic sessions API](https://lucia-auth.com/sessions/basic-api/) with your chosen database.
2.  Add [session cookies](https://lucia-auth.com/sessions/cookies/astro) using endpoints and middleware.
3.  Implement [GitHub OAuth](https://lucia-auth.com/tutorials/github-oauth/astro) using the APIs you implemented.

### Examples

[Section titled Examples](#examples)

*   [GitHub OAuth example in Astro](https://github.com/lucia-auth/example-astro-github-oauth)
*   [Google OAuth example in Astro](https://github.com/lucia-auth/example-astro-google-oauth)
*   [Email and password example with 2FA in Astro](https://github.com/lucia-auth/example-astro-email-password-2fa)
*   [Email and password example with 2FA and WebAuthn in Astro](https://github.com/lucia-auth/example-astro-email-password-webauthn)

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   [Using Microsoft Entra Id EasyAuth with Astro and Azure Static Web App](https://agramont.net/blog/entra-id-easyauth-with-astro/)

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/authentication.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
E-commerce](/en/guides/ecommerce/) [Next  
Testing](/en/guides/testing/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)