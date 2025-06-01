Create a dev toolbar app
========================

Astro includes a [development toolbar](/en/guides/dev-toolbar/) that you can use to inspect your site, check for accessibility and performance issues, and more. This toolbar can be extended with custom apps.

Build a motivational dev toolbar app
------------------------------------

[Section titled Build a motivational dev toolbar app](#build-a-motivational-dev-toolbar-app)

In this recipe, you’ll learn how to create a dev toolbar app that helps you stay motivated while working on your site. This app will display a motivational message every time you toggle it on.

Tip

Just want to get started quickly? Jump start your app by creating a new Astro project with the `toolbar-app` template.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-1781)
*   [pnpm](#tab-panel-1782)
*   [Yarn](#tab-panel-1783)

Terminal window

    npm create astro@latest -- --template toolbar-app

Terminal window

    pnpm create astro -- --template toolbar-app

Terminal window

    yarn create astro -- --template toolbar-app

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Or, keep reading to learn how to build an app from scratch.

### Creating the Astro integration

[Section titled Creating the Astro integration](#creating-the-astro-integration)

Dev toolbar apps can only be added by [Astro Integrations](/en/guides/integrations-guide/) using [the `astro:config:setup` hook](/en/reference/integrations-reference/#astroconfigsetup). You will need to create both a toolbar app and the integration that will add it to the toolbar of your existing Astro project.

1.  In the root of your existing Astro project, create a new folder named `my-toolbar-app/` for your app and integration files. Create two new files in this folder: `app.ts` and `my-integration.ts`.
    
    *   Directory**my-toolbar-app/**
        
        *   **app.ts**
        *   **my-integration.ts**
        
    *   Directorysrc/
        
        *   Directorypages/
            
            *   …
            
        *   …
        
    *   astro.config.mjs
    *   package.json
    *   tsconfig.json
    
2.  In `my-integration.ts`, add the following code to provide both the name of your integration and the [`addDevToolbarApp()` function](/en/reference/dev-toolbar-app-reference/#toolbar-app-integration-setup) needed to add your dev toolbar app with the `astro:config:setup` hook:
    
    my-toolbar-app/my-integration.ts
    
        import { fileURLToPath } from 'node:url';import type { AstroIntegration } from 'astro';
        export default {  name: 'my-astro-integration',  hooks: {    'astro:config:setup': ({ addDevToolbarApp }) => {      addDevToolbarApp({        id: "my-toolbar-app",        name: "My Toolbar App",        icon: "🚀",        entrypoint: fileURLToPath(new URL('./app.ts', import.meta.url))      });    },  },} satisfies AstroIntegration;
    
    Using relative paths to the entrypoint
    
    The `entrypoint` is the path to your dev toolbar app file **relative to the root of your existing Astro project**, not to the integration folder (`my-toolbar-app`) itself.
    
    To use relative paths for entrypoints, get the path to the current file using `import.meta.url` and resolve the path to the entrypoint from there.
    
3.  To use this integration in your project, add it to the `integrations` array in your `astro.config.mjs` file.
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';import myIntegration from './my-toolbar-app/my-integration.ts';
        export default defineConfig({  integrations: [myIntegration],})
    
4.  If not already running, start the dev server. If your integration has been successfully added to your project, you should see a new “undefined” app in the dev toolbar.
    
    But, you will also see an error message that your dev toolbar app has failed to load. This is because you have not yet built the app itself. You will do that in the next section.
    

See the [Astro Integration API documentation](/en/reference/integrations-reference/) for more about building Astro integrations.

### Creating the app

[Section titled Creating the app](#creating-the-app)

Dev toolbar apps are defined using the `defineToolbarApp()` function from the `astro/toolbar` module. This function takes an object with an `init()` function that will be called when the dev toolbar app is loaded.

This `init()` function contains your app logic to render elements to the screen, send and receive client-side events from the dev toolbar, and communicate with the server.

app.ts

    import { defineToolbarApp } from "astro/toolbar";
    export default defineToolbarApp({    init(canvas, app, server) {      // ...    },});

To display motivational messages on the screen, you will use the `canvas` property to access a standard [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot). Elements can be created and added to the ShadowRoot using the standard DOM APIs.

1.  Copy the following code into `my-toolbar-app/app.ts`. This provides a list of motivational messages, and the logic to create a new `<h1>` element with a random message:
    
    my-toolbar-app/app.ts
    
        import { defineToolbarApp } from "astro/toolbar";
        const motivationalMessages = [  "You're doing great!",  "Keep up the good work!",  "You're awesome!",  "You're a star!",];
        export default defineToolbarApp({    init(canvas) {      const h1 = document.createElement('h1');      h1.textContent = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
              canvas.append(h1);    },});
    
2.  Start the dev server if it is not already running and toggle the app on in the dev toolbar. If your app is working successfully, you will see a motivational message displayed in the top-left corner of the screen. (And, it’s true!)
    
    However, this message will not change when the app is toggled on and off, as the `init()` function is only called once when the app is loaded.
    
3.  To add client-side interactivity to your app, add the `app` argument and use `onAppToggled()` to select a new random message each time your toolbar app is toggled on:
    
    app.ts
    
        import { defineToolbarApp } from "astro/toolbar";
        const motivationalMessages = [  "You're doing great!",  "Keep up the good work!",  "You're awesome!",  "You're a star!",];
        export default defineToolbarApp({    init(canvas, app) {      const h1 = document.createElement('h1');      h1.textContent = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
              canvas.append(h1);
              // Display a random message when the app is toggled      app.onToggled(({ state }) => {        const newMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];        h1.textContent = newMessage;      });    },});
    
4.  In your browser preview, toggle your app on and off several times. With this change, a new random message will be selected every time you toggle the app on, providing you with an infinite source of motivation!
    

See the [Astro Dev Toolbar API documentation](/en/reference/dev-toolbar-app-reference/) for more about building dev toolbar apps.

Building apps with a UI framework
---------------------------------

[Section titled Building apps with a UI framework](#building-apps-with-a-ui-framework)

UI frameworks like React, Vue, or Svelte can also be used to create dev toolbar apps. These frameworks provide a more declarative way to create UIs and can make your code more maintainable and easier to read.

The same motivational dev toolbar app built into your existing Astro project earlier on this page with JavaScript can be built using a UI framework (e.g. Preact) instead. Depending on your chosen framework, you may or may not require a build step.

Note

However you choose to build your dev toolbar app, using JavaScript or a UI framework, you will still need to [create the integration](#creating-the-astro-integration) that adds your app to the dev toolbar.

### Without a build step

[Section titled Without a build step](#without-a-build-step)

If your framework supports it, you can create a dev toolbar app without a build step. For example, you can use Preact’s `h` function to create elements and render them directly to the ShadowRoot:

app.ts

    import { defineToolbarApp } from "astro/toolbar";import { render, h } from "preact";
    const motivationalMessages = [  "You're doing great!",  "Keep up the good work!",  "You're awesome!",  "You're a star!",];
    export default defineToolbarApp({    init(canvas) {      const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];      render(h('h1', null, message), canvas);    },});

Alternatively, the [`htm` package](https://github.com/developit/htm) is a good choice for creating dev toolbar apps without a build step, offering native integration for React and Preact and support for other frameworks:

app.ts

    import { defineToolbarApp } from "astro/toolbar";import { render } from "preact";import { html } from 'htm/preact';
    const motivationalMessages = [  "You're doing great!",  "Keep up the good work!",  "You're awesome!",  "You're a star!",];
    export default defineToolbarApp({    init(canvas) {      const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];      render(html`<h1>${message}</h1>`, canvas);    },});

In both cases, you can now start your project and see the motivational message displayed in the top-left corner of the screen when you toggle the app on.

### With a build step

[Section titled With a build step](#with-a-build-step)

Astro does not preprocess JSX code in dev toolbar apps, so a build step is required in order to use JSX components in your dev toolbar app.

The following steps will use TypeScript to do this, but any other tools that compile JSX code will also work (e.g. Babel, Rollup, ESBuild).

1.  Install TypeScript inside your project:
    
    *   [npm](#tab-panel-1784)
    *   [pnpm](#tab-panel-1785)
    *   [Yarn](#tab-panel-1786)
    
    Terminal window
    
        npm install --save-dev typescript
    
    Terminal window
    
        pnpm install --save-dev typescript
    
    Terminal window
    
        yarn add --dev typescript
    
2.  Create a `tsconfig.json` file in the root of your toolbar app’s folder with the appropriate settings to build and for the framework you’re using ([React](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup), [Preact](https://preactjs.com/guide/v10/typescript), [Solid](https://www.solidjs.com/guides/typescript)). For example, for Preact:
    
    my-toolbar-app/tsconfig.json
    
        {  "compilerOptions": {    "skipLibCheck": true,    "module": "NodeNext",    "jsx": "react-jsx",    "jsxImportSource": "preact",  }}
    
3.  Adjust the `entrypoint` in your integration to point to the compiled file, remembering that this file is relative to the root of your Astro project:
    
    my-integration.ts
    
        addDevToolbarApp({  id: "my-toolbar-app",  name: "My Toolbar App",  icon: "🚀",  entrypoint: join(__dirname, "./app.js"),});
    
4.  Run `tsc` to build your toolbar app, or `tsc --watch` to automatically rebuild your app when you make changes.
    
    With these changes, you can now rename your `app.ts` file to `app.tsx` (or `.jsx`) and use JSX syntax to create your dev toolbar app:
    
    app.tsx
    
        import { defineToolbarApp } from "astro/toolbar";import { render } from "preact";
        const motivationalMessages = [  "You're doing great!",  "Keep up the good work!",  "You're awesome!",  "You're a star!",];
        export default defineToolbarApp({    init(canvas) {      const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];      render(<h1>{message}</h1>, canvas);    },});
    

You should now have all the tools you need to create a dev toolbar app using a UI framework of your choice!

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/making-toolbar-apps.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Add i18n features](/en/recipes/i18n/) [Next  
Add last modified time](/en/recipes/modified-time/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

