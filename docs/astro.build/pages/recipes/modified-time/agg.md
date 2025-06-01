Add last modified time
======================

Learn how to build a [remark plugin](https://github.com/remarkjs/remark) that adds the last modified time to the frontmatter of your Markdown and MDX files. Use this property to display the modified time in your pages.

Uses Git history

This recipe calculates time based on your repository’s Git history and may not be accurate on some deployment platforms. Your host may be performing **shallow clones** which do not retrieve the full git history.

Recipe
------

[Section titled Recipe](#recipe)

1.  Install Helper Packages
    
    Install [`Day.js`](https://www.npmjs.com/package/dayjs) to modify and format times:
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-1787)
    *   [pnpm](#tab-panel-1788)
    *   [Yarn](#tab-panel-1789)
    
    Terminal window
    
        npm install dayjs
    
    Terminal window
    
        pnpm add dayjs
    
    Terminal window
    
        yarn add dayjs
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Create a Remark Plugin
    
    This plugin uses `execSync` to run a Git command that returns the timestamp of the latest commit in ISO 8601 format. The timestamp is then added to the frontmatter of the file.
    
    remark-modified-time.mjs
    
        import { execSync } from "child_process";
        export function remarkModifiedTime() {  return function (tree, file) {    const filepath = file.history[0];    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);    file.data.astro.frontmatter.lastModified = result.toString();  };}
    
    Using the file system instead of Git
    
    Although using Git is the recommended way to get the last modified timestamp from a file, it is possible to use the file system modified time. This plugin uses `statSync` to get the `mtime` (modified time) of the file in ISO 8601 format. The timestamp is then added to the frontmatter of the file.
    
    remark-modified-time.mjs
    
        import { statSync } from "fs";
        export function remarkModifiedTime() {  return function (tree, file) {    const filepath = file.history[0];    const result = statSync(filepath);    file.data.astro.frontmatter.lastModified = result.mtime.toISOString();  };}
    
3.  Add the plugin to your config
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';import { remarkModifiedTime } from './remark-modified-time.mjs';
        export default defineConfig({  markdown: {    remarkPlugins: [remarkModifiedTime],  },});
    
    Now all Markdown documents will have a `lastModified` property in their frontmatter.
    
4.  Display Last Modified Time
    
    If your content is stored in a [content collection](/en/guides/content-collections/), access the `remarkPluginFrontmatter` from the `render(entry)` function. Then render `lastModified` in your template wherever you would like it to appear.
    
    src/pages/posts/\[slug\].astro
    
        ---import { getCollection, render } from 'astro:content';import dayjs from "dayjs";import utc from "dayjs/plugin/utc";
        dayjs.extend(utc);
        export async function getStaticPaths() {  const blog = await getCollection('blog');  return blog.map(entry => ({    params: { slug: entry.id },    props: { entry },  }));}
        const { entry } = Astro.props;const { Content, remarkPluginFrontmatter } = await render(entry);
        const lastModified = dayjs(remarkPluginFrontmatter.lastModified)  .utc()  .format("HH:mm:ss DD MMMM YYYY UTC");---
        <html>  <head>...</head>  <body>    ...    <p>Last Modified: {lastModified}</p>    ...  </body></html>
    
    If you’re using a [Markdown layout](/en/basics/layouts/#markdown-layouts), use the `lastModified` frontmatter property from `Astro.props` in your layout template.
    
    src/layouts/BlogLayout.astro
    
        ---import dayjs from "dayjs";import utc from "dayjs/plugin/utc";
        dayjs.extend(utc);
        const lastModified = dayjs()  .utc(Astro.props.frontmatter.lastModified)  .format("HH:mm:ss DD MMMM YYYY UTC");---
        <html>  <head>...</head>  <body>    <p>{lastModified}</p>    <slot />  </body></html>
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/modified-time.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Create a dev toolbar app](/en/recipes/making-toolbar-apps/) [Next  
Add reading time](/en/recipes/reading-time/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

