Supabase & Astro
================

[Supabase](https://supabase.com/) is an open source Firebase alternative. It provides a Postgres database, authentication, edge functions, realtime subscriptions, and storage.

Initializing Supabase in Astro
------------------------------

[Section titled Initializing Supabase in Astro](#initializing-supabase-in-astro)

### Prerequisites

[Section titled Prerequisites](#prerequisites)

*   A Supabase project. If you don’t have one, you can sign up for free at [supabase.com](https://supabase.com/) and create a new project.
*   An Astro project with [`output: 'server'` for on-demand rendering](/en/guides/on-demand-rendering/) enabled.
*   Supabase credentials for your project. You can find these in the **Settings > API** tab of your Supabase project.
    *   `SUPABASE_URL`: The URL of your Supabase project.
    *   `SUPABASE_ANON_KEY`: The anonymous key for your Supabase project.

### Adding Supabase credentials

[Section titled Adding Supabase credentials](#adding-supabase-credentials)

To add your Supabase credentials to your Astro project, add the following to your `.env` file:

.env

    SUPABASE_URL=YOUR_SUPABASE_URLSUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

Now, these environment variables are available in your project.

If you would like to have IntelliSense for your environment variables, edit or create the `env.d.ts` in your `src/` directory and add the following:

src/env.d.ts

    interface ImportMetaEnv {  readonly SUPABASE_URL: string  readonly SUPABASE_ANON_KEY: string}
    interface ImportMeta {  readonly env: ImportMetaEnv}

Tip

Read more about [environment variables](/en/guides/environment-variables/) and `.env` files in Astro.

Your project should now include these files:

*   Directorysrc/
    
    *   **env.d.ts**
    
*   **.env**
*   astro.config.mjs
*   package.json

### Installing dependencies

[Section titled Installing dependencies](#installing-dependencies)

To connect to Supabase, you will need to install `@supabase/supabase-js` in your project.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3044)
*   [pnpm](#tab-panel-3045)
*   [Yarn](#tab-panel-3046)

Terminal window

    npm install @supabase/supabase-js

Terminal window

    pnpm add @supabase/supabase-js

Terminal window

    yarn add @supabase/supabase-js

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Next, create a folder named `lib` in your `src/` directory. This is where you will add your Supabase client.

In `supabase.ts`, add the following to initialize your Supabase client:

src/lib/supabase.ts

    import { createClient } from "@supabase/supabase-js";
    export const supabase = createClient(  import.meta.env.SUPABASE_URL,  import.meta.env.SUPABASE_ANON_KEY,);

Now, your project should include these files:

*   Directorysrc/
    
    *   Directorylib/
        
        *   **supabase.ts**
        
    *   env.d.ts
    
*   .env
*   astro.config.mjs
*   package.json

Adding authentication with Supabase
-----------------------------------

[Section titled Adding authentication with Supabase](#adding-authentication-with-supabase)

Supabase provides authentication out of the box. It supports email/password authentication and OAuth authentication with many providers including GitHub, Google, and several others.

### Prerequisites

[Section titled Prerequisites](#prerequisites-1)

*   An Astro project [initialized with Supabase](#initializing-supabase-in-astro).
*   A Supabase project with email/password authentication enabled. You can enable this in the **Authentication > Providers** tab of your Supabase project.

### Creating auth server endpoints

[Section titled Creating auth server endpoints](#creating-auth-server-endpoints)

To add authentication to your project, you will need to create a few server endpoints. These endpoints will be used to register, sign in, and sign out users.

*   `POST /api/auth/register`: to register a new user.
*   `POST /api/auth/signin`: to sign in a user.
*   `GET /api/auth/signout`: to sign out a user.

Create these endpoints in the `src/pages/api/auth` directory of your project. If you are using `static` rendering mode, you must specify `export const prerender = false` at the top of each file to render these endpoints on demand. Your project should now include these new files:

*   Directorysrc/
    
    *   Directorylib/
        
        *   supabase.ts
        
    *   Directorypages/
        
        *   Directoryapi/
            
            *   Directoryauth/
                
                *   **signin.ts**
                *   **signout.ts**
                *   **register.ts**
                
            
        
    *   env.d.ts
    
*   .env
*   astro.config.mjs
*   package.json

`register.ts` creates a new user in Supabase. It accepts a `POST` request with the an email and password. It then uses the Supabase SDK to create a new user.

src/pages/api/auth/register.ts

    // With `output: 'static'` configured:// export const prerender = false;import type { APIRoute } from "astro";import { supabase } from "../../../lib/supabase";
    export const POST: APIRoute = async ({ request, redirect }) => {  const formData = await request.formData();  const email = formData.get("email")?.toString();  const password = formData.get("password")?.toString();
      if (!email || !password) {    return new Response("Email and password are required", { status: 400 });  }
      const { error } = await supabase.auth.signUp({    email,    password,  });
      if (error) {    return new Response(error.message, { status: 500 });  }
      return redirect("/signin");};

`signin.ts` signs in a user. It accepts a `POST` request with the an email and password. It then uses the Supabase SDK to sign in the user.

src/pages/api/auth/signin.ts

    // With `output: 'static'` configured:// export const prerender = false;import type { APIRoute } from "astro";import { supabase } from "../../../lib/supabase";
    export const POST: APIRoute = async ({ request, cookies, redirect }) => {  const formData = await request.formData();  const email = formData.get("email")?.toString();  const password = formData.get("password")?.toString();
      if (!email || !password) {    return new Response("Email and password are required", { status: 400 });  }
      const { data, error } = await supabase.auth.signInWithPassword({    email,    password,  });
      if (error) {    return new Response(error.message, { status: 500 });  }
      const { access_token, refresh_token } = data.session;  cookies.set("sb-access-token", access_token, {    path: "/",  });  cookies.set("sb-refresh-token", refresh_token, {    path: "/",  });  return redirect("/dashboard");};

`signout.ts` signs out a user. It accepts a `GET` request and removes the user’s access and refresh tokens.

src/pages/api/auth/signout.ts

    // With `output: 'static'` configured:// export const prerender = false;import type { APIRoute } from "astro";
    export const GET: APIRoute = async ({ cookies, redirect }) => {  cookies.delete("sb-access-token", { path: "/" });  cookies.delete("sb-refresh-token", { path: "/" });  return redirect("/signin");};

### Creating auth pages

[Section titled Creating auth pages](#creating-auth-pages)

Now that you have created your server endpoints, create the pages that will use them.

*   `src/pages/register`: contains a form to register a new user.
*   `src/pages/signin`: contains a form to sign in a user.
*   `src/pages/dashboard`: contains a page that is only accessible to authenticated users.

Create these pages in the `src/pages` directory. Your project should now include these new files:

*   Directorysrc/
    
    *   Directorylib/
        
        *   supabase.ts
        
    *   Directorypages/
        
        *   Directoryapi/
            
            *   Directoryauth/
                
                *   signin.ts
                *   signout.ts
                *   register.ts
                
            
        *   **register.astro**
        *   **signin.astro**
        *   **dashboard.astro**
        
    *   env.d.ts
    
*   .env
*   astro.config.mjs
*   package.json

`register.astro` contains a form to register a new user. It accepts an email and password and sends a `POST` request to `/api/auth/register`.

src/pages/register.astro

    ---import Layout from "../layouts/Layout.astro";---
    <Layout title="Register">  <h1>Register</h1>  <p>Already have an account? <a href="/signin">Sign in</a></p>  <form action="/api/auth/register" method="post">    <label for="email">Email</label>    <input type="email" name="email" id="email" />    <label for="password">Password</label>    <input type="password" name="password" id="password" />    <button type="submit">Register</button>  </form></Layout>

`signin.astro` contains a form to sign in a user. It accepts an email and password and sends a `POST` request to `/api/auth/signin`. It also checks for the presence of the access and refresh tokens. If they are present, it redirects to the dashboard.

src/pages/signin.astro

    ---import Layout from "../layouts/Layout.astro";
    const { cookies, redirect } = Astro;
    const accessToken = cookies.get("sb-access-token");const refreshToken = cookies.get("sb-refresh-token");
    if (accessToken && refreshToken) {  return redirect("/dashboard");}---
    <Layout title="Sign in">  <h1>Sign in</h1>  <p>New here? <a href="/register">Create an account</a></p>  <form action="/api/auth/signin" method="post">    <label for="email">Email</label>    <input type="email" name="email" id="email" />    <label for="password">Password</label>    <input type="password" name="password" id="password" />    <button type="submit">Login</button>  </form></Layout>

`dashboard.astro` contains a page that is only accessible to authenticated users. It checks for the presence of the access and refresh tokens. If they are not present or are invalid, it redirects to the sign in page.

src/pages/dashboard.astro

    ---import Layout from "../layouts/Layout.astro";import { supabase } from "../lib/supabase";
    const accessToken = Astro.cookies.get("sb-access-token");const refreshToken = Astro.cookies.get("sb-refresh-token");
    if (!accessToken || !refreshToken) {  return Astro.redirect("/signin");}
    let session;try {  session = await supabase.auth.setSession({    refresh_token: refreshToken.value,    access_token: accessToken.value,  });  if (session.error) {    Astro.cookies.delete("sb-access-token", {      path: "/",    });    Astro.cookies.delete("sb-refresh-token", {      path: "/",    });    return Astro.redirect("/signin");  }} catch (error) {  Astro.cookies.delete("sb-access-token", {    path: "/",  });  Astro.cookies.delete("sb-refresh-token", {    path: "/",  });  return Astro.redirect("/signin");}
    const email = session.data.user?.email;---<Layout title="dashboard">  <h1>Welcome {email}</h1>  <p>We are happy to see you here</p>  <form action="/api/auth/signout">    <button type="submit">Sign out</button>  </form></Layout>

### Adding OAuth authentication

[Section titled Adding OAuth authentication](#adding-oauth-authentication)

To add OAuth authentication to your project, you will need to edit your Supabase client to enable authentication flow with `"pkce"`. You can read more about authentication flows in the [Supabase documentation](https://supabase.com/docs/guides/auth/server-side-rendering#understanding-the-authentication-flow).

src/lib/supabase.ts

    import { createClient } from "@supabase/supabase-js";
    export const supabase = createClient(  import.meta.env.SUPABASE_URL,  import.meta.env.SUPABASE_ANON_KEY,  {    auth: {      flowType: "pkce",    },  },);

Next, in the Supabase dashboard, enable the OAuth provider you would like to use. You can find the list of supported providers in the **Authentication > Providers** tab of your Supabase project.

The following example uses GitHub as the OAuth provider. To connect your project to GitHub, follow the steps in the [Supabase documentation](https://supabase.com/docs/guides/auth/social-login/auth-github).

Then, create a new server endpoint to handle the OAuth callback at `src/pages/api/auth/callback.ts`. This endpoint will be used to exchange the OAuth code for an access and refresh token.

src/pages/api/auth/callback.ts

    import type { APIRoute } from "astro";import { supabase } from "../../../lib/supabase";
    export const GET: APIRoute = async ({ url, cookies, redirect }) => {  const authCode = url.searchParams.get("code");
      if (!authCode) {    return new Response("No code provided", { status: 400 });  }
      const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);
      if (error) {    return new Response(error.message, { status: 500 });  }
      const { access_token, refresh_token } = data.session;
      cookies.set("sb-access-token", access_token, {    path: "/",  });  cookies.set("sb-refresh-token", refresh_token, {    path: "/",  });
      return redirect("/dashboard");};

Next, edit the sign in page to include a new button to sign in with the OAuth provider. This button should send a `POST` request to `/api/auth/signin` with the `provider` set to the name of the OAuth provider.

src/pages/signin.astro

    ---import Layout from "../layouts/Layout.astro";
    const { cookies, redirect } = Astro;
    const accessToken = cookies.get("sb-access-token");const refreshToken = cookies.get("sb-refresh-token");
    if (accessToken && refreshToken) {  return redirect("/dashboard");}---
    <Layout title="Sign in">  <h1>Sign in</h1>  <p>New here? <a href="/register">Create an account</a></p>  <form action="/api/auth/signin" method="post">    <label for="email">Email</label>    <input type="email" name="email" id="email" />    <label for="password">Password</label>    <input type="password" name="password" id="password" />    <button type="submit">Login</button>    <button value="github" name="provider" type="submit">Sign in with GitHub</button>  </form></Layout>

Finally, edit the sign in server endpoint to handle the OAuth provider. If the `provider` is present, it will redirect to the OAuth provider. Otherwise, it will sign in the user with the email and password.

src/pages/api/auth/signin.ts

    import type { APIRoute } from "astro";import { supabase } from "../../../lib/supabase";import type { Provider } from "@supabase/supabase-js";
    export const POST: APIRoute = async ({ request, cookies, redirect }) => {  const formData = await request.formData();  const email = formData.get("email")?.toString();  const password = formData.get("password")?.toString();  const provider = formData.get("provider")?.toString();
      const validProviders = ["google", "github", "discord"];
      if (provider && validProviders.includes(provider)) {    const { data, error } = await supabase.auth.signInWithOAuth({      provider: provider as Provider,      options: {        redirectTo: "http://localhost:4321/api/auth/callback"      },    });
        if (error) {      return new Response(error.message, { status: 500 });    }
        return redirect(data.url);  }
      if (!email || !password) {    return new Response("Email and password are required", { status: 400 });  }
      const { data, error } = await supabase.auth.signInWithPassword({    email,    password,  });
      if (error) {    return new Response(error.message, { status: 500 });  }
      const { access_token, refresh_token } = data.session;  cookies.set("sb-access-token", access_token, {    path: "/",  });  cookies.set("sb-refresh-token", refresh_token, {    path: "/",  });  return redirect("/dashboard");};

After creating the OAuth callback endpoint and editing the sign in page and server endpoint, your project should have the following file structure:

*   Directorysrc/
    
    *   Directorylib/
        
        *   supabase.ts
        
    *   Directorypages/
        
        *   Directoryapi/
            
            *   Directoryauth/
                
                *   signin.ts
                *   signout.ts
                *   register.ts
                *   callback.ts
                
            
        *   register.astro
        *   signin.astro
        *   dashboard.astro
        
    *   env.d.ts
    
*   .env
*   astro.config.mjs
*   package.json

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   [Getting into the holiday spirit with Astro, React, and Supabase](https://www.aleksandra.codes/astro-supabase)
*   [Astro and Supabase auth demo](https://github.com/kevinzunigacuellar/astro-supabase)

More backend service guides
---------------------------

*   ![](/logos/appwriteio.svg)
    
    ### [Appwrite](/en/guides/backend/appwriteio/)
    
*   ![](/logos/firebase.svg)
    
    ### [Firebase](/en/guides/backend/google-firebase/)
    
*   ![](/logos/neon.svg)
    
    ### [Neon](/en/guides/backend/neon/)
    
*   ![](/logos/sentry.svg)
    
    ### [Sentry](/en/guides/backend/sentry/)
    
*   ![](/logos/supabase.svg)
    
    ### [Supabase](/en/guides/backend/supabase/)
    
*   ![](/logos/turso.svg)
    
    ### [Turso](/en/guides/backend/turso/)
    
*   ![](/logos/xata.svg)
    
    ### [Xata](/en/guides/backend/xata/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/backend/supabase.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Sentry](/en/guides/backend/sentry/) [Next  
Turso](/en/guides/backend/turso/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

