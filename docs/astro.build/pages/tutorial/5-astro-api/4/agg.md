Add an RSS feed
===============

Get ready to…

*   Install an Astro package for creating an RSS feed for your website
*   Create a feed that can be subscribed to and read by RSS feed readers

Install Astro’s RSS package
---------------------------

[Section titled Install Astro’s RSS package](#install-astros-rss-package)

Astro provides a custom package to quickly add an RSS feed to your website.

This official package generates a non-HTML document with information about all of your blog posts that can be read by **feed readers** like Feedly, The Old Reader, and more. This document is updated every time your site is rebuilt.

Individuals can subscribe to your feed in a feed reader, and receive a notification when you publish a new blog post on your site, making it a popular blog feature.

1.  Quit the Astro development server and run the following command in the terminal to install Astro’s RSS package.
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3399)
    *   [pnpm](#tab-panel-3400)
    *   [Yarn](#tab-panel-3401)
    
    Terminal window
    
        npm install @astrojs/rss
    
    Terminal window
    
        pnpm add @astrojs/rss
    
    Terminal window
    
        yarn add @astrojs/rss
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Restart the dev server to begin working on your Astro project again.
    
    *   [npm](#tab-panel-3402)
    *   [pnpm](#tab-panel-3403)
    *   [Yarn](#tab-panel-3404)
    
    Terminal window
    
        npm run dev
    
    Terminal window
    
        pnpm run dev
    
    Terminal window
    
        yarn run dev
    

Create an `.xml` feed document
------------------------------

[Section titled Create an .xml feed document](#create-an-xml-feed-document)

1.  Create a new file in `src/pages/` called `rss.xml.js`
    
2.  Copy the following code into this new document. Customize the `title` and `description` properties, and if necessary, specify a different language in `customData`:
    
    src/pages/rss.xml.js
    
        import rss, { pagesGlobToRssItems } from '@astrojs/rss';
        export async function GET(context) {  return rss({    title: 'Astro Learner | Blog',    description: 'My journey learning Astro',    site: context.site,    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),    customData: `<language>en-us</language>`,  });}
    
3.  Add the `site` property to the Astro config with your site’s own unique Netlify URL.
    
    astro.config.mjs
    
        import { defineConfig } from "astro/config";
        export default defineConfig({  site: "https://example.com"});
    
4.  Visit `http://localhost:4321/rss.xml` and verify that you can see (unformatted) text on the page with an `item` for each of your `.md` files. Each item should contain blog post information such as `title`, `url`, and `description`.
    
    View your RSS feed in a reader
    
    Download a feed reader, or sign up for an online feed reader service and subscribe to your site by adding your own Netlify URL. You can also share this link with others so they can subscribe to your posts, and be notified when a new one is published.
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can install an Astro package using the command line.
*    I can create an RSS feed for my website.

### Resources

[Section titled Resources](#resources)

*   [RSS item generation in Astro](/en/recipes/rss/#using-glob-imports)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/5-astro-api/4.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Build a tag index page](/en/tutorial/5-astro-api/3/) [Next  
Check in: Unit 6 - Astro Islands](/en/tutorial/6-islands/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

