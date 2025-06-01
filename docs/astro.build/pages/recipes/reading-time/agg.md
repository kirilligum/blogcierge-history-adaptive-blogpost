Add reading time
================

Create a [remark plugin](https://github.com/remarkjs/remark) which adds a reading time property to the frontmatter of your Markdown or MDX files. Use this property to display the reading time for each page.

Recipe
------

[Section titled Recipe](#recipe)

1.  Install Helper Packages
    
    Install these two helper packages:
    
    *   [`reading-time`](https://www.npmjs.com/package/reading-time) to calculate minutes read
    *   [`mdast-util-to-string`](https://www.npmjs.com/package/mdast-util-to-string) to extract all text from your markdown
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-1790)
    *   [pnpm](#tab-panel-1791)
    *   [Yarn](#tab-panel-1792)
    
    Terminal window
    
        npm install reading-time mdast-util-to-string
    
    Terminal window
    
        pnpm add reading-time mdast-util-to-string
    
    Terminal window
    
        yarn add reading-time mdast-util-to-string
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Create a remark plugin.
    
    This plugin uses the `mdast-util-to-string` package to get the Markdown file’s text. This text is then passed to the `reading-time` package to calculate the reading time in minutes.
    
    remark-reading-time.mjs
    
        import getReadingTime from 'reading-time';import { toString } from 'mdast-util-to-string';
        export function remarkReadingTime() {  return function (tree, { data }) {    const textOnPage = toString(tree);    const readingTime = getReadingTime(textOnPage);    // readingTime.text will give us minutes read as a friendly string,    // i.e. "3 min read"    data.astro.frontmatter.minutesRead = readingTime.text;  };}
    
3.  Add the plugin to your config:
    
    astro.config.mjs
    
        import { defineConfig } from 'astro/config';import { remarkReadingTime } from './remark-reading-time.mjs';
        export default defineConfig({  markdown: {    remarkPlugins: [remarkReadingTime],  },});
    
    Now all Markdown documents will have a calculated `minutesRead` property in their frontmatter.
    
4.  Display Reading Time
    
    If your blog posts are stored in a [content collection](/en/guides/content-collections/), access the `remarkPluginFrontmatter` from the `render(entry)` function. Then, render `minutesRead` in your template wherever you would like it to appear.
    
    src/pages/posts/\[slug\].astro
    
        ---import { getCollection, render } from 'astro:content';
        export async function getStaticPaths() {  const blog = await getCollection('blog');  return blog.map(entry => ({    params: { slug: entry.id },    props: { entry },  }));}
        const { entry } = Astro.props;const { Content, remarkPluginFrontmatter } = await render(entry);---
        <html>  <head>...</head>  <body>    ...    <p>{remarkPluginFrontmatter.minutesRead}</p>    ...  </body></html>
    
    If you’re using a [Markdown layout](/en/basics/layouts/#markdown-layouts), use the `minutesRead` frontmatter property from `Astro.props` in your layout template.
    
    src/layouts/BlogLayout.astro
    
        ---const { minutesRead } = Astro.props.frontmatter;---
        <html>  <head>...</head>  <body>    <p>{minutesRead}</p>    <slot />  </body></html>
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/reading-time.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Add last modified time](/en/recipes/modified-time/) [Next  
Add an RSS feed](/en/recipes/rss/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

