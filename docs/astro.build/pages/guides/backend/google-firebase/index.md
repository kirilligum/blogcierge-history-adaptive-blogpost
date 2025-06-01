Firebase & Astro
================

[Firebase](https://firebase.google.com/) is an app development platform that provides a NoSQL database, authentication, realtime subscriptions, functions, and storage.

See our separate guide for [deploying to Firebase hosting](/en/guides/deploy/google-firebase/).

Initializing Firebase in Astro
------------------------------

[Section titled Initializing Firebase in Astro](#initializing-firebase-in-astro)

### Prerequisites

[Section titled Prerequisites](#prerequisites)

*   A [Firebase project with a web app configured](https://firebase.google.com/docs/web/setup).
*   An Astro project with [`output: 'server'` for on-demand rendering](/en/guides/on-demand-rendering/) enabled.
*   Firebase credentials: You will need two sets of credentials to connect Astro to Firebase:
    *   Web app credentials: These credentials will be used by the client side of your app. You can find them in the Firebase console under _Project settings > General_. Scroll down to the **Your apps** section and click on the **Web app** icon.
    *   Project credentials: These credentials will be used by the server side of your app. You can generate them in the Firebase console under _Project settings > Service accounts > Firebase Admin SDK > Generate new private key_.

### Adding Firebase credentials

[Section titled Adding Firebase credentials](#adding-firebase-credentials)

To add your Firebase credentials to Astro, create an `.env` file in the root of your project with the following variables:

.env

    FIREBASE_PRIVATE_KEY_ID=YOUR_PRIVATE_KEY_IDFIREBASE_PRIVATE_KEY=YOUR_PRIVATE_KEYFIREBASE_PROJECT_ID=YOUR_PROJECT_IDFIREBASE_CLIENT_EMAIL=YOUR_CLIENT_EMAILFIREBASE_CLIENT_ID=YOUR_CLIENT_IDFIREBASE_AUTH_URI=YOUR_AUTH_URIFIREBASE_TOKEN_URI=YOUR_TOKEN_URIFIREBASE_AUTH_CERT_URL=YOUR_AUTH_CERT_URLFIREBASE_CLIENT_CERT_URL=YOUR_CLIENT_CERT_URL

Now, these environment variables are available for use in your project.

If you would like to have IntelliSense for your Firebase environment variables, edit or create the file `env.d.ts` in your `src/` directory and configure your types:

src/env.d.ts

    interface ImportMetaEnv {  readonly FIREBASE_PRIVATE_KEY_ID: string;  readonly FIREBASE_PRIVATE_KEY: string;  readonly FIREBASE_PROJECT_ID: string;  readonly FIREBASE_CLIENT_EMAIL: string;  readonly FIREBASE_CLIENT_ID: string;  readonly FIREBASE_AUTH_URI: string;  readonly FIREBASE_TOKEN_URI: string;  readonly FIREBASE_AUTH_CERT_URL: string  readonly FIREBASE_CLIENT_CERT_URL: string;}
    interface ImportMeta {  readonly env: ImportMetaEnv;}

Tip

Read more about [environment variables](/en/guides/environment-variables/) and `.env` files in Astro.

Your project should now include these new files:

*   Directorysrc/
    
    *   **env.d.ts**
    
*   **.env**
*   astro.config.mjs
*   package.json

### Installing dependencies

[Section titled Installing dependencies](#installing-dependencies)

To connect Astro with Firebase, install the following packages using the single command below for your preferred package manager:

*   `firebase` - the Firebase SDK for the client side
*   `firebase-admin` - the Firebase Admin SDK for the server side

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3038)
*   [pnpm](#tab-panel-3039)
*   [Yarn](#tab-panel-3040)

Terminal window

    npm install firebase firebase-admin

Terminal window

    pnpm add firebase firebase-admin

Terminal window

    yarn add firebase firebase-admin

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Next, create a folder named `firebase` in the `src/` directory and add two new files to this folder: `client.ts` and `server.ts`.

In `client.ts`, add the following code to initialize Firebase in the client using your web app credentials and the `firebase` package:

src/firebase/client.ts

    import { initializeApp } from "firebase/app";
    const firebaseConfig = {  apiKey: "my-public-api-key",  authDomain: "my-auth-domain",  projectId: "my-project-id",  storageBucket: "my-storage-bucket",  messagingSenderId: "my-sender-id",  appId: "my-app-id",};
    export const app = initializeApp(firebaseConfig);

Note

Remember to replace the `firebaseConfig` object with your own web app credentials.

In `server.ts`, add the following code to initialize Firebase in the server using your project credentials and the `firebase-admin` package:

src/firebase/server.ts

    import type { ServiceAccount } from "firebase-admin";import { initializeApp, cert, getApps } from "firebase-admin/app";
    const activeApps = getApps();const serviceAccount = {  type: "service_account",  project_id: import.meta.env.FIREBASE_PROJECT_ID,  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,  private_key: import.meta.env.FIREBASE_PRIVATE_KEY,  client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,  client_id: import.meta.env.FIREBASE_CLIENT_ID,  auth_uri: import.meta.env.FIREBASE_AUTH_URI,  token_uri: import.meta.env.FIREBASE_TOKEN_URI,  auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_CERT_URL,  client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL,};
    const initApp = () => {  if (import.meta.env.PROD) {    console.info('PROD env detected. Using default service account.')    // Use default config in firebase functions. Should be already injected in the server by Firebase.    return initializeApp()  }  console.info('Loading service account from env.')  return initializeApp({    credential: cert(serviceAccount as ServiceAccount)  })}
    export const app = activeApps.length === 0 ? initApp() : activeApps[0];

Note

Remember to replace the `serviceAccount` object with your own project credentials.

Finally, your project should now include these new files:

*   Directorysrc
    
    *   env.d.ts
    *   Directoryfirebase
        
        *   **client.ts**
        *   **server.ts**
        
    
*   .env
*   astro.config.mjs
*   package.json

Adding authentication with Firebase
-----------------------------------

[Section titled Adding authentication with Firebase](#adding-authentication-with-firebase)

### Prerequisites

[Section titled Prerequisites](#prerequisites-1)

*   An Astro project [initialized with Firebase](#initializing-firebase-in-astro).
*   A Firebase project with email/password authentication enabled in the Firebase console under _Authentication > Sign-in_ method.

### Creating auth server endpoints

[Section titled Creating auth server endpoints](#creating-auth-server-endpoints)

Firebase authentication in Astro requires the following three [Astro server endpoints](/en/guides/endpoints/):

*   `GET /api/auth/signin` - to sign in a user
*   `GET /api/auth/signout` - to sign out a user
*   `POST /api/auth/register` - to register a user

Create three endpoints related to authentication in a new directory `src/pages/api/auth/`: `signin.ts`, `signout.ts` and `register.ts`.

`signin.ts` contains the code to sign in a user using Firebase:

src/pages/api/auth/signin.ts

    import type { APIRoute } from "astro";import { app } from "../../../firebase/server";import { getAuth } from "firebase-admin/auth";
    export const GET: APIRoute = async ({ request, cookies, redirect }) => {  const auth = getAuth(app);
      /* Get token from request headers */  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];  if (!idToken) {    return new Response(      "No token found",      { status: 401 }    );  }
      /* Verify id token */  try {    await auth.verifyIdToken(idToken);  } catch (error) {    return new Response(      "Invalid token",      { status: 401 }    );  }
      /* Create and set session cookie */  const fiveDays = 60 * 60 * 24 * 5 * 1000;  const sessionCookie = await auth.createSessionCookie(idToken, {    expiresIn: fiveDays,  });
      cookies.set("__session", sessionCookie, {    path: "/",  });
      return redirect("/dashboard");};

Caution

Firebase only allows the use of [one cookie, and it must be named `__session`](https://firebase.google.com/docs/hosting/manage-cache#using_cookies). Any other cookies the client sends will not be visible to your application.

Note

This is a basic implementation of the signin endpoint. You can add more logic to this endpoint to suit your needs.

`signout.ts` contains the code to log out a user by deleting the session cookie:

src/pages/api/auth/signout.ts

    import type { APIRoute } from "astro";
    export const GET: APIRoute = async ({ redirect, cookies }) => {  cookies.delete("__session", {    path: "/",  });  return redirect("/signin");};

Note

This is a basic implementation of the signout endpoint. You can add more logic to this endpoint to suit your needs.

`register.ts` contains the code to register a user using Firebase:

src/pages/api/auth/register.ts

    import type { APIRoute } from "astro";import { getAuth } from "firebase-admin/auth";import { app } from "../../../firebase/server";
    export const POST: APIRoute = async ({ request, redirect }) => {  const auth = getAuth(app);
      /* Get form data */  const formData = await request.formData();  const email = formData.get("email")?.toString();  const password = formData.get("password")?.toString();  const name = formData.get("name")?.toString();
      if (!email || !password || !name) {    return new Response(      "Missing form data",      { status: 400 }    );  }
      /* Create user */  try {    await auth.createUser({      email,      password,      displayName: name,    });  } catch (error: any) {    return new Response(      "Something went wrong",      { status: 400 }    );  }  return redirect("/signin");};

Note

This is a basic implementation of the register endpoint. You can add more logic to this endpoint to suit your needs.

After creating server endpoints for authentication, your project directory should now include these new files:

*   Directorysrc
    
    *   env.d.ts
    *   Directoryfirebase
        
        *   client.ts
        *   server.ts
        
    *   Directorypages
        
        *   Directoryapi
            
            *   Directoryauth
                
                *   **signin.ts**
                *   **signout.ts**
                *   **register.ts**
                
            
        
    
*   .env
*   astro.config.mjs
*   package.json

### Creating pages

[Section titled Creating pages](#creating-pages)

Create the pages that will use the Firebase endpoints:

*   `src/pages/register` - will contain a form to register a user
*   `src/pages/signin` - will contain a form to sign in a user
*   `src/pages/dashboard` - will contain a dashboard that can only be accessed by authenticated users

The example `src/pages/register.astro` below includes a form that will send a `POST` request to the `/api/auth/register` endpoint. This endpoint will create a new user using the data from the form and then will redirect the user to the `/signin` page.

src/pages/register.astro

    ---import Layout from "../layouts/Layout.astro";---
    <Layout title="Register">  <h1>Register</h1>  <p>Already have an account? <a href="/signin">Sign in</a></p>  <form action="/api/auth/register" method="post">    <label for="name">Name</label>    <input type="text" name="name" id="name" />    <label for="email" for="email">Email</label>    <input type="email" name="email" id="email" />    <label for="password">Password</label>    <input type="password" name="password" id="password" />    <button type="submit">Login</button>  </form></Layout>

`src/pages/signin.astro` uses the Firebase server app to verify the user’s session cookie. If the user is authenticated, the page will redirect the user to the `/dashboard` page.

The example page below contains a form that will send a `POST` request to the `/api/auth/signin` endpoint with the ID token generated by the Firebase client app.

The endpoint will verify the ID token and create a new session cookie for the user. Then, the endpoint will redirect the user to the `/dashboard` page.

src/pages/signin.astro

    ---import { app } from "../firebase/server";import { getAuth } from "firebase-admin/auth";import Layout from "../layouts/Layout.astro";
    /* Check if the user is authenticated */const auth = getAuth(app);if (Astro.cookies.has("__session")) {  const sessionCookie = Astro.cookies.get("__session").value;  const decodedCookie = await auth.verifySessionCookie(sessionCookie);  if (decodedCookie) {    return Astro.redirect("/dashboard");  }}---
    <Layout title="Sign in">  <h1>Sign in</h1>  <p>New here? <a href="/register">Create an account</a></p>  <form action="/api/auth/signin" method="post">    <label for="email" for="email">Email</label>    <input type="email" name="email" id="email" />    <label for="password">Password</label>    <input type="password" name="password" id="password" />    <button type="submit">Login</button>  </form></Layout><script>  import {    getAuth,    inMemoryPersistence,    signInWithEmailAndPassword,  } from "firebase/auth";  import { app } from "../firebase/client";
      const auth = getAuth(app);  // This will prevent the browser from storing session data  auth.setPersistence(inMemoryPersistence);
      const form = document.querySelector("form") as HTMLFormElement;  form.addEventListener("submit", async (e) => {    e.preventDefault();    const formData = new FormData(form);    const email = formData.get("email")?.toString();    const password = formData.get("password")?.toString();
        if (!email || !password) {      return;    }    const userCredential = await signInWithEmailAndPassword(      auth,      email,      password    );    const idToken = await userCredential.user.getIdToken();    const response = await fetch("/api/auth/signin", {      method: "GET",      headers: {        Authorization: `Bearer ${idToken}`,      },    });
        if (response.redirected) {      window.location.assign(response.url);    }  });</script>

`src/pages/dashboard.astro` will verify the user’s session cookie using the Firebase server app. If the user is not authenticated, the page will redirect the user to the `/signin` page.

The example page below display the user’s name and a button to sign out. Clicking the button will send a `GET` request to the `/api/auth/signout` endpoint.

The endpoint will delete the user’s session cookie and redirect the user to the `/signin` page.

src/pages/dashboard.astro

    ---import { app } from "../firebase/server";import { getAuth } from "firebase-admin/auth";import Layout from "../layouts/Layout.astro";
    const auth = getAuth(app);
    /* Check current session */if (!Astro.cookies.has("__session")) {  return Astro.redirect("/signin");}const sessionCookie = Astro.cookies.get("__session").value;const decodedCookie = await auth.verifySessionCookie(sessionCookie);const user = await auth.getUser(decodedCookie.uid);
    if (!user) {  return Astro.redirect("/signin");}---
    <Layout title="dashboard">  <h1>Welcome {user.displayName}</h1>  <p>We are happy to see you here</p>  <form action="/api/auth/signout">    <button type="submit">Sign out</button>  </form></Layout>

### Adding OAuth providers

[Section titled Adding OAuth providers](#adding-oauth-providers)

To add OAuth providers to your app, you need to enable them in the Firebase console.

In the Firebase console, go to the **Authentication** section and click on the **Sign-in method** tab. Then, click on the **Add a new provider** button and enable the providers you want to use.

The example below uses the **Google** provider.

Edit the `signin.astro` page to add:

*   a button to sign in with Google underneath the existing form
*   an event listener on the button to handle the sign in process in the existing `<script>`.

src/pages/signin.astro

    ---import { app } from "../firebase/server";import { getAuth } from "firebase-admin/auth";import Layout from "../layouts/Layout.astro";
    /* Check if the user is authenticated */const auth = getAuth(app);if (Astro.cookies.has("__session")) {  const sessionCookie = Astro.cookies.get("__session").value;  const decodedCookie = await auth.verifySessionCookie(sessionCookie);  if (decodedCookie) {    return Astro.redirect("/dashboard");  }}---
    <Layout title="Sign in">  <h1>Sign in</h1>  <p>New here? <a href="/register">Create an account</a></p>  <form action="/api/auth/signin" method="post">    <label for="email" for="email">Email</label>    <input type="email" name="email" id="email" />    <label for="password">Password</label>    <input type="password" name="password" id="password" />    <button type="submit">Login</button>  </form>  <button id="google">Sign in with Google</button></Layout><script>  import {    getAuth,    inMemoryPersistence,    signInWithEmailAndPassword,    GoogleAuthProvider,    signInWithPopup,  } from "firebase/auth";  import { app } from "../firebase/client";
      const auth = getAuth(app);  auth.setPersistence(inMemoryPersistence);
      const form = document.querySelector("form") as HTMLFormElement;  form.addEventListener("submit", async (e) => {    e.preventDefault();    const formData = new FormData(form);    const email = formData.get("email")?.toString();    const password = formData.get("password")?.toString();
        if (!email || !password) {      return;    }    const userCredential = await signInWithEmailAndPassword(      auth,      email,      password    );    const idToken = await userCredential.user.getIdToken();    const response = await fetch("/api/auth/signin", {      headers: {        Authorization: `Bearer ${idToken}`,      },    });
        if (response.redirected) {      window.location.assign(response.url);    }  });
      const googleSignin = document.querySelector("#google") as HTMLButtonElement;  googleSignin.addEventListener("click", async () => {    const provider = new GoogleAuthProvider();    const userCredential = await signInWithPopup(auth, provider);    const idToken = await userCredential.user.getIdToken();    const res = await fetch("/api/auth/signin", {      headers: {        Authorization: `Bearer ${idToken}`,      },    });
        if (res.redirected) {      window.location.assign(res.url);    }  });</script>

When clicked, the Google sign in button will open a popup window to sign in with Google. Once the user signs in, it will send a `POST` request to the `/api/auth/signin` endpoint with the ID token generated by OAuth provider.

The endpoint will verify the ID token and create a new session cookie for the user. Then, the endpoint will redirect the user to the `/dashboard` page.

Connecting to Firestore database
--------------------------------

[Section titled Connecting to Firestore database](#connecting-to-firestore-database)

### Prerequisites

[Section titled Prerequisites](#prerequisites-2)

*   An Astro project initialized with Firebase as described in the [Initializing Firebase in Astro](#initializing-firebase-in-astro) section.
    
*   A Firebase project with a Firestore database. You can follow the [Firebase documentation to create a new project and set up a Firestore database](https://firebase.google.com/docs/firestore/quickstart).
    

In this recipe, the Firestore collection will be called **friends** and will contain documents with the following fields:

*   `id`: autogenerated by Firestore
*   `name`: a string field
*   `age`: a number field
*   `isBestFriend`: a boolean field

### Creating the server endpoints

[Section titled Creating the server endpoints](#creating-the-server-endpoints)

Create two new files in a new directory `src/pages/api/friends/`: `index.ts` and `[id].ts`. These will create two server endpoints to interact with the Firestore database in the following ways:

*   `POST /api/friends`: to create a new document in the friends collection.
*   `POST /api/friends/:id`: to update a document in the friends collection.
*   `DELETE /api/friends/:id`: to delete a document in the friends collection.

`index.ts` will contain the code to create a new document in the friends collection:

src/pages/api/friends/index.ts

    import type { APIRoute } from "astro";import { app } from "../../../firebase/server";import { getFirestore } from "firebase-admin/firestore";
    export const POST: APIRoute = async ({ request, redirect }) => {  const formData = await request.formData();  const name = formData.get("name")?.toString();  const age = formData.get("age")?.toString();  const isBestFriend = formData.get("isBestFriend") === "on";
      if (!name || !age) {    return new Response("Missing required fields", {      status: 400,    });  }  try {    const db = getFirestore(app);    const friendsRef = db.collection("friends");    await friendsRef.add({      name,      age: parseInt(age),      isBestFriend,    });  } catch (error) {    return new Response("Something went wrong", {      status: 500,    });  }  return redirect("/dashboard");};

Note

This is a basic implementation of the `friends` endpoint. You can add more logic to this endpoint to suit your needs.

`[id].ts` will contain the code to update and delete a document in the friends collection:

src/pages/api/friends/\[id\].ts

    import type { APIRoute } from "astro";import { app } from "../../../firebase/server";import { getFirestore } from "firebase-admin/firestore";
    const db = getFirestore(app);const friendsRef = db.collection("friends");
    export const POST: APIRoute = async ({ params, redirect, request }) => {  const formData = await request.formData();  const name = formData.get("name")?.toString();  const age = formData.get("age")?.toString();  const isBestFriend = formData.get("isBestFriend") === "on";
      if (!name || !age) {    return new Response("Missing required fields", {      status: 400,    });  }
      if (!params.id) {    return new Response("Cannot find friend", {      status: 404,    });  }
      try {    await friendsRef.doc(params.id).update({      name,      age: parseInt(age),      isBestFriend,    });  } catch (error) {    return new Response("Something went wrong", {      status: 500,    });  }  return redirect("/dashboard");};
    export const DELETE: APIRoute = async ({ params, redirect }) => {  if (!params.id) {    return new Response("Cannot find friend", {      status: 404,    });  }
      try {    await friendsRef.doc(params.id).delete();  } catch (error) {    return new Response("Something went wrong", {      status: 500,    });  }  return redirect("/dashboard");};

Note

This is a basic implementation of the `friends/:id` endpoint. You can add more logic to this endpoint to suit your needs.

After creating server endpoints for Firestore, your project directory should now include these new files:

*   Directorysrc
    
    *   env.d.ts
    *   Directoryfirebase
        
        *   client.ts
        *   server.ts
        
    *   Directorypages
        
        *   Directoryapi
            
            *   Directoryfriends
                
                *   **index.ts**
                *   **\[id\].ts**
                
            
        
    
*   .env
*   astro.config.mjs
*   package.json

### Creating pages

[Section titled Creating pages](#creating-pages-1)

Create the pages that will use the Firestore endpoints:

*   `src/pages/add.astro` - will contain a form to add a new friend.
*   `src/pages/edit/[id].astro` - will contain a form to edit a friend and a button to delete a friend.
*   `src/pages/friend/[id].astro` - will contain the details of a friend.
*   `src/pages/dashboard.astro` - will display a list of friends.

#### Add a new record

[Section titled Add a new record](#add-a-new-record)

The example `src/pages/add.astro` below includes a form that will send a `POST` request to the `/api/friends` endpoint. This endpoint will create a new friend using the data from the form and then will redirect the user to the `/dashboard` page.

src/pages/add.astro

    ---import Layout from "../layouts/Layout.astro";---
    <Layout title="Add a new friend">  <h1>Add a new friend</h1>  <form method="post" action="/api/friends">    <label for="name">Name</label>    <input type="text" id="name" name="name" />    <label for="age">Age</label>    <input type="number" id="age" name="age" />    <label for="isBestFriend">Is best friend?</label>    <input type="checkbox" id="isBestFriend" name="isBestFriend" />    <button type="submit">Add friend</button>  </form></Layout>

#### Edit or Delete a record

[Section titled Edit or Delete a record](#edit-or-delete-a-record)

`src/pages/edit/[id].astro` will contain a form to edit a friend data and a button to delete a friend. On submit, this page will send a `POST` request to the `/api/friends/:id` endpoint to update a friend data.

If the user clicks the delete button, this page will send a `DELETE` request to the `/api/friends/:id` endpoint to delete a friend.

src/pages/edit/\[id\].astro

    ---import Layout from "../../layouts/Layout.astro";import { app } from "../../firebase/server";import { getFirestore } from "firebase-admin/firestore";
    interface Friend {  name: string;  age: number;  isBestFriend: boolean;}
    const { id } = Astro.params;
    if (!id) {  return Astro.redirect("/404");}
    const db = getFirestore(app);const friendsRef = db.collection("friends");const friendSnapshot = await friendsRef.doc(id).get();
    if (!friendSnapshot.exists) {  return Astro.redirect("/404");}
    const friend = friendSnapshot.data() as Friend;---
    <Layout title="Edit {friend.name}">  <h1>Edit {friend.name}</h1>  <p>Here you can edit or delete your friend's data.</p>  <form method="post" action={`/api/friends/${id}`}>    <label for="name">Name</label>    <input type="text" id="name" name="name" value={friend.name} />    <label for="age">Age</label>    <input type="number" id="age" name="age" value={friend.age} />    <label for="isBestFriend">Is best friend?</label>    <input      type="checkbox"      id="isBestFriend"      name="isBestFriend"      checked={friend.isBestFriend}    />    <button type="submit">Edit friend</button>  </form>  <button type="button" id="delete-document">Delete</button></Layout><script>  const deleteButton = document.getElementById(    "delete-document"  ) as HTMLButtonElement;  const url = document.querySelector("form")?.getAttribute("action") as string;  deleteButton.addEventListener("click", async () => {    const response = await fetch(url, {      method: "DELETE",    });    if (response.redirected) {      window.location.assign(response.url);    }  });</script>

#### Display an individual record

[Section titled Display an individual record](#display-an-individual-record)

`src/pages/friend/[id].astro` will display the details of a friend.

src/pages/friend/\[id\].astro

    ---import Layout from "../../layouts/Layout.astro";import { app } from "../../firebase/server";import { getFirestore } from "firebase-admin/firestore";
    interface Friend {  name: string;  age: number;  isBestFriend: boolean;}
    const { id } = Astro.params;
    if (!id) {  return Astro.redirect("/404");}
    const db = getFirestore(app);const friendsRef = db.collection("friends");const friendSnapshot = await friendsRef.doc(id).get();
    if (!friendSnapshot.exists) {  return Astro.redirect("/404");}
    const friend = friendSnapshot.data() as Friend;---
    <Layout title={friend.name}>  <h1>{friend.name}</h1>  <p>Age: {friend.age}</p>  <p>Is best friend: {friend.isBestFriend ? "Yes" : "No"}</p></Layout>

#### Display a list of records with an edit button

[Section titled Display a list of records with an edit button](#display-a-list-of-records-with-an-edit-button)

Finally, `src/pages/dashboard.astro` will display a list of friends. Each friend will have a link to their details page and an edit button that will redirect the user to the edit page.

src/pages/dashboard.astro

    ---import { app } from "../firebase/server";import { getFirestore } from "firebase-admin/firestore";import Layout from "../layouts/Layout.astro";
    interface Friend {  id: string;  name: string;  age: number;  isBestFriend: boolean;}
    const db = getFirestore(app);const friendsRef = db.collection("friends");const friendsSnapshot = await friendsRef.get();const friends = friendsSnapshot.docs.map((doc) => ({  id: doc.id,  ...doc.data(),})) as Friend[];---
    <Layout title="My friends">  <h1>Friends</h1>  <ul>    {      friends.map((friend) => (        <li>          <a href={`/friend/${friend.id}`}>{friend.name}</a>          <span>({friend.age})</span>          <strong>{friend.isBestFriend ? "Bestie" : "Friend"}</strong>          <a href={`/edit/${friend.id}`}>Edit</a>        </li>      ))    }  </ul></Layout>

After creating all the pages, you should have the following file structure:

*   Directorysrc
    
    *   env.d.ts
    *   Directoryfirebase
        
        *   client.ts
        *   server.ts
        
    *   Directorypages
        
        *   dashboard.astro
        *   add.astro
        *   Directoryedit
            
            *   \[id\].astro
            
        *   Directoryfriend
            
            *   \[id\].astro
            
        *   Directoryapi
            
            *   Directoryfriends
                
                *   index.ts
                *   \[id\].ts
                
            
        
    
*   .env
*   astro.config.mjs
*   package.json

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   [Astro and Firebase SSR app example](https://github.com/kevinzunigacuellar/astro-firebase)
*   [Using Firebase Realtime Database in Astro with Vue: A Step-by-Step Guide](https://www.launchfa.st/blog/vue-astro-firebase-realtime-database)

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

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/backend/google-firebase.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Appwrite](/en/guides/backend/appwriteio/) [Next  
Neon](/en/guides/backend/neon/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)