Optional: Make a content collection
===================================

Now that you have a blog using Astro’s [built-in file-based routing](/en/guides/routing/#static-routes), you will update it to use a [content collection](/en/guides/content-collections/). Content collections are a powerful way to manage groups of similar content, such as blog posts.

Get ready to…

*   Move your folder of blog posts into `src/blog/`
*   Create a schema to define your blog post frontmatter
*   Use `getCollection()` to get blog post content and metadata

Learn: Pages vs Collections
---------------------------

[Section titled Learn: Pages vs Collections](#learn-pages-vs-collections)

Even when using content collections, you will still use the `src/pages/` folder for individual pages, such as your About Me page. But, moving your blog posts outside of this special folder will allow you to use more powerful and performant APIs to generate your blog post index and display your individual blog posts.

At the same time, you’ll receive better guidance and autocompletion in your code editor because you will have a **[schema](/en/guides/content-collections/#defining-the-collection-schema)** to define a common structure for each post that Astro will help you enforce through [Zod](https://zod.dev/), a schema declaration and validation library for TypeScript. In your schema, you can specify when frontmatter properties are required, such as a description or an author, and which data type each property must be, such as a string or an array. This leads to catching many mistakes sooner, with descriptive error messages telling you exactly what the problem is.

Read more about [Astro’s content collections](/en/guides/content-collections/) in our guide, or get started with the instructions below to convert a basic blog from `src/pages/posts/` to `src/blog/`.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  Which type of page would you probably keep in `src/pages/`?
    
    1.  Blog posts that all contain the same basic structure and metadata
        
    2.  Product pages in an eCommerce site
        
    3.  A contact page, because you do not have multiple similar pages of this type
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  Which is **not** a benefit of moving blog posts to a content collection?
    
    1.  Pages are automatically created for each file
        
    2.  Better error messages, because Astro knows more about each file
        
    3.  Better data fetching, with a more performant function
        
    
    Submit
    
3.  Content collections uses TypeScript …
    
    1.  To make me feel bad
        
    2.  To understand and validate my collections, and to provide editor tooling
        
    3.  Only if I have the `strictest` configuration set in `tsconfig.json`
        
    
    Submit
    

The steps below show you how to extend the final product of the Build a Blog tutorial by creating a content collection for the blog posts.

Upgrade dependencies
--------------------

[Section titled Upgrade dependencies](#upgrade-dependencies)

Upgrade to the latest version of Astro, and upgrade all integrations to their latest versions by running the following commands in your terminal:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3408)
*   [pnpm](#tab-panel-3409)
*   [Yarn](#tab-panel-3410)

Terminal window

    # Upgrade Astro and official integrations togethernpx @astrojs/upgrade

Terminal window

    # Upgrade Astro and official integrations togetherpnpm dlx @astrojs/upgrade

Terminal window

    # Upgrade Astro and official integrations togetheryarn dlx @astrojs/upgrade

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Create a collection for your posts
----------------------------------

[Section titled Create a collection for your posts](#create-a-collection-for-your-posts)

1.  Create a new **collection** (folder) called `src/blog/`.
    
2.  Move all your existing blog posts (`.md` files) from `src/pages/posts/` into this new collection.
    
3.  Create a `src/content.config.ts` file to [define a schema](/en/guides/content-collections/#defining-the-collection-schema) for your `postsCollection`. For the existing blog tutorial code, add the following contents to the file to define all the frontmatter properties used in its blog posts:
    
    src/content.config.ts
    
        // Import the glob loaderimport { glob } from "astro/loaders";// Import utilities from `astro:content`import { z, defineCollection } from "astro:content";// Define a `loader` and `schema` for each collectionconst blog = defineCollection({    loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),    schema: z.object({      title: z.string(),      pubDate: z.date(),      description: z.string(),      author: z.string(),      image: z.object({        url: z.string(),        alt: z.string()      }),      tags: z.array(z.string())    })});// Export a single `collections` object to register your collection(s)export const collections = { blog };
    
4.  In order for Astro to recognize your schema, quit (`CTRL + C`) and restart the dev server to continue with the tutorial. This will define the `astro:content` module.
    

Generate pages from a collection
--------------------------------

[Section titled Generate pages from a collection](#generate-pages-from-a-collection)

1.  Create a page file called `src/pages/posts/[...slug].astro`. Your Markdown and MDX files no longer automatically become pages using Astro’s file-based routing when they are inside a collection, so you must create a page responsible for generating each individual blog post.
    
2.  Add the following code to [query your collection](/en/guides/content-collections/#querying-collections) to make each blog post’s slug and page content available to each page it will generate:
    
    src/pages/posts/\[...slug\].astro
    
        ---import { getCollection, render } from 'astro:content';
        export async function getStaticPaths() {  const posts = await getCollection('blog');  return posts.map(post => ({    params: { slug: post.id }, props: { post },  }));}
        const { post } = Astro.props;const { Content } = await render(post);---
    
3.  Render your post `<Content />` within the layout for Markdown pages. This allows you to specify a common layout for all of your posts.
    
    src/pages/posts/\[...slug\].astro
    
        ---import { getCollection, render } from 'astro:content';import MarkdownPostLayout from '../../layouts/MarkdownPostLayout.astro';
        export async function getStaticPaths() {  const posts = await getCollection('blog');  return posts.map(post => ({    params: { slug: post.id }, props: { post },  }));}
        const { post } = Astro.props;const { Content } = await render(post);---<MarkdownPostLayout frontmatter={post.data}>  <Content /></MarkdownPostLayout>
    
4.  Remove the `layout` definition in each individual post’s frontmatter. Your content is now wrapped in a layout when rendered, and this property is no longer needed.
    
    src/content/posts/post-1.md
    
        ---layout: ../../layouts/MarkdownPostLayout.astrotitle: 'My First Blog Post'pubDate: 2022-07-01...---
    

Replace `import.meta.glob()` with `getCollection()`
---------------------------------------------------

[Section titled Replace import.meta.glob() with getCollection()](#replace-importmetaglob-with-getcollection)

5.  Anywhere you have a list of blog posts, like the tutorial’s Blog page (`src/pages/blog.astro/`), you will need to replace `import.meta.glob()` with [`getCollection()`](/en/reference/modules/astro-content/#getcollection) as the way to fetch content and metadata from your Markdown files.
    
    src/pages/blog.astro
    
        ---import { getCollection } from "astro:content";import BaseLayout from "../layouts/BaseLayout.astro";import BlogPost from "../components/BlogPost.astro";
        const pageTitle = "My Astro Learning Blog";const allPosts = Object.values(import.meta.glob("../pages/posts/*.md", { eager: true }));const allPosts = await getCollection("blog");---
    
6.  You will also need to update references to the data returned for each `post`. You will now find your frontmatter values on the `data` property of each object. Also, when using collections each `post` object will have a page `slug`, not a full URL.
    
    src/pages/blog.astro
    
        ---import { getCollection } from "astro:content";import BaseLayout from "../layouts/BaseLayout.astro";import BlogPost from "../components/BlogPost.astro";
        const pageTitle = "My Astro Learning Blog";const allPosts = await getCollection("blog");---<BaseLayout pageTitle={pageTitle}>  <p>This is where I will post about my journey learning Astro.</p>  <ul>    {      allPosts.map((post) => (        <BlogPost url={post.url} title={post.frontmatter.title} />)}        <BlogPost url={`/posts/${post.id}/`} title={post.data.title} />      ))    }  </ul></BaseLayout>
    
7.  The tutorial blog project also dynamically generates a page for each tag using `src/pages/tags/[tag].astro` and displays a list of tags at `src/pages/tags/index.astro`.
    
    Apply the same changes as above to these two files:
    
    *   fetch data about all your blog posts using `getCollection("blog")` instead of using `import.meta.glob()`
    *   access all frontmatter values using `data` instead of `frontmatter`
    *   create a page URL by adding the post’s `slug` to the `/posts/` path
    
    The page that generates individual tag pages now becomes:
    
    src/pages/tags/\[tag\].astro
    
        ---import { getCollection } from "astro:content";import BaseLayout from "../../layouts/BaseLayout.astro";import BlogPost from "../../components/BlogPost.astro";
        export async function getStaticPaths() {  const allPosts = await getCollection("blog");  const uniqueTags = [...new Set(allPosts.map((post) => post.data.tags).flat())];
          return uniqueTags.map((tag) => {    const filteredPosts = allPosts.filter((post) =>      post.data.tags.includes(tag)    );    return {      params: { tag },      props: { posts: filteredPosts },    };  });}
        const { tag } = Astro.params;const { posts } = Astro.props;---
        <BaseLayout pageTitle={tag}>  <p>Posts tagged with {tag}</p>  <ul>    { posts.map((post) => <BlogPost url={`/posts/${post.id}/`} title={post.data.title} />) }  </ul></BaseLayout>
    
    ### Try it yourself - Update the query in the Tag Index page
    
    [Section titled Try it yourself - Update the query in the Tag Index page](#try-it-yourself---update-the-query-in-the-tag-index-page)
    
    Import and use `getCollection` to fetch the tags used in the blog posts on `src/pages/tags/index.astro`, following the [same steps as above](#replace-importmetaglob-with-getcollection).
    
    Show me the code.
    
    src/pages/tags/index.astro
    
        ---import { getCollection } from "astro:content";import BaseLayout from "../../layouts/BaseLayout.astro";const allPosts = await getCollection("blog");const tags = [...new Set(allPosts.map((post) => post.data.tags).flat())];const pageTitle = "Tag Index";---<!-- ... -->
    

Update any frontmatter values to match your schema
--------------------------------------------------

[Section titled Update any frontmatter values to match your schema](#update-any-frontmatter-values-to-match-your-schema)

If necessary, update any frontmatter values throughout your project, such as in your layout, that do not match your collections schema.

In the blog tutorial example, `pubDate` was a string. Now, according to the schema that defines types for the post frontmatter, `pubDate` will be a `Date` object. You can now take advantage of this to use the methods available for any `Date` object to format the date.

To render the date in the blog post layout, convert it to a string using `toLocaleDateString()` method:

src/layouts/MarkdownPostLayout.astro

    <!-- ... --><BaseLayout pageTitle={frontmatter.title}>    <p>{frontmatter.pubDate.toLocaleDateString()}</p>    <p><em>{frontmatter.description}</em></p>    <p>Written by: {frontmatter.author}</p>    <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} /><!-- ... -->

Update the RSS function
-----------------------

[Section titled Update the RSS function](#update-the-rss-function)

The tutorial blog project includes an RSS feed. This function must also use `getCollection()` to return information from your blog posts. You will then generate the RSS items using the `data` object returned.

src/pages/rss.xml.js

    import rss from '@astrojs/rss';import { pagesGlobToRssItems } from '@astrojs/rss';import { getCollection } from 'astro:content';
    export async function GET(context) {  const posts = await getCollection("blog");  return rss({    title: 'Astro Learner | Blog',    description: 'My journey learning Astro',    site: context.site,    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),    items: posts.map((post) => ({      title: post.data.title,      pubDate: post.data.pubDate,      description: post.data.description,      link: `/posts/${post.id}/`,    })),    customData: `<language>en-us</language>`,  })}

For the full example of the blog tutorial using content collections, see the [Content Collections branch](https://github.com/withastro/blog-tutorial-demo/tree/content-collections) of the tutorial repo.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can use content collections to manage groups of similar content for better performance and organization.

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/6-islands/4.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Congratulations!](/en/tutorial/6-islands/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)