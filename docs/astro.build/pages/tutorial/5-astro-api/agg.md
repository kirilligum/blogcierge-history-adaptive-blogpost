Check in: Unit 5 - Astro API
============================

Now that you have some blog posts, it’s time to use Astro’s API to work with your files!

Looking ahead
-------------

[Section titled Looking ahead](#looking-ahead)

In this unit, you’ll supercharge your blog with an index page, tag pages, and an RSS feed.

Along the way, you’ll learn how to use:

*   `import.meta.glob()` to access data from files in your project
*   `getStaticPaths()` to create multiple pages (routes) at once
*   The Astro RSS package to create an RSS feed

Checklist
---------

[Section titled Checklist](#checklist)

 *    I am ready to add some blog features to my Astro project!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/5-astro-api/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Combine layouts to get the best of both worlds](/en/tutorial/4-layouts/3/) [Next  
Create a blog post archive](/en/tutorial/5-astro-api/1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/tutorial/5-astro-api/1
Create a blog post archive
==========================

Now that you have a few blog posts to link to, it’s time to configure the Blog page to create a list of them automatically!

Get ready to…

*   Access data from all your posts at once using `import.meta.glob()`
*   Display a dynamically generated list of posts on your Blog page
*   Refactor to use a `<BlogPost />` component for each list item

Dynamically display a list of posts
-----------------------------------

[Section titled Dynamically display a list of posts](#dynamically-display-a-list-of-posts)

1.  Add the following code to `blog.astro` to return information about all your Markdown files. `import.meta.glob()` will return an array of objects, one for each blog post.
    
    src/pages/blog.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro'const allPosts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));const pageTitle = "My Astro Learning Blog";---<BaseLayout pageTitle={pageTitle}>  <p>This is where I will post about my journey learning Astro.</p>  <ul>    <li><a href="/posts/post-1/">Post 1</a></li>    <li><a href="/posts/post-2/">Post 2</a></li>    <li><a href="/posts/post-3/">Post 3</a></li>  </ul></BaseLayout>
    
2.  To generate the entire list of posts dynamically, using the post titles and URLs, replace your individual `<li>` tags with the following Astro code:
    
    src/pages/blog.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro'const allPosts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));const pageTitle = "My Astro Learning Blog";---<BaseLayout pageTitle={pageTitle}>  <p>This is where I will post about my journey learning Astro.</p>  <ul>    <li><a href="/posts/post-1/">Post 1</a></li>    <li><a href="/posts/post-2/">Post 2</a></li>    <li><a href="/posts/post-3/">Post 3</a></li>
            {allPosts.map((post: any) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}  </ul></BaseLayout>
    
    Your entire list of blog posts is now being generated dynamically using Astro’s built-in TypeScript support, by mapping over the array returned by `import.meta.glob()`.
    
3.  Add a new blog post by creating a new `post-4.md` file in `src/pages/posts/` and adding some Markdown content. Be sure to include at least the frontmatter properties used below.
    
        ---layout: ../../layouts/MarkdownPostLayout.astrotitle: My Fourth Blog Postauthor: Astro Learnerdescription: "This post will show up on its own!"image:    url: "https://docs.astro.build/default-og-image.png"    alt: "The word astro against an illustration of planets and stars."pubDate: 2022-08-08tags: ["astro", "successes"]---This post should show up with my other blog posts, because `import.meta.glob()` is returning a list of all my posts in order to create my list.
    
4.  Revisit your blog page in your browser preview at `http://localhost:4321/blog` and look for an updated list with four items, including your new blog post!
    

Challenge: Create a BlogPost component
--------------------------------------

[Section titled Challenge: Create a BlogPost component](#challenge-create-a-blogpost-component)

Try on your own to make all the necessary changes to your Astro project so that you can instead use the following code to generate your list of blog posts:

src/pages/blog.astro

    <ul>  {allPosts.map((post: any) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}  {allPosts.map((post: any) => <BlogPost url={post.url} title={post.frontmatter.title} />)}</ul>

Expand to see the steps

1.  Create a new component in `src/components/`.
    
    Show the filename
    
        BlogPost.astro
    
2.  Write the line of code in your component so that it will be able to receive a `title` and `url` as `Astro.props`.
    
    Show the code
    
    src/components/BlogPost.astro
    
        ---const { title, url } = Astro.props;---
    
3.  Add the templating used to create each item in your blog post list.
    
    Show the code
    
    src/components/BlogPost.astro
    
        <li><a href={url}>{title}</a></li>
    
4.  Import the new component into your Blog page.
    
    Show the code
    
    src/pages/blog.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';import BlogPost from '../components/BlogPost.astro';const allPosts = Object.values(import.meta.glob('../pages/posts/*.md', { eager: true }));const pageTitle = "My Astro Learning Blog";---
    
5.  Check Yourself: see the finished component code.
    
    Show the code
    
    src/components/BlogPost.astro
    
        ---const { title, url } = Astro.props---<li><a href={url}>{title}</a></li>
    
    src/pages/blog.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';import BlogPost from '../components/BlogPost.astro';const allPosts = Object.values(import.meta.glob('../pages/posts/*.md', { eager: true }));const pageTitle = "My Astro Learning Blog"---<BaseLayout pageTitle={pageTitle}>  <p>This is where I will post about my journey learning Astro.</p>  <ul>    {allPosts.map((post: any) => <BlogPost url={post.url} title={post.frontmatter.title} />)}  </ul></BaseLayout>
    

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

If your Astro component contains the following line of code:

    ---const myPosts = Object.values(import.meta.glob('./posts/*.md', { eager:  true }));---

Choose the syntax you could write to represent:

1.  The title of your third blog post.
    
    1.  `myPosts.map((post) => <LastUpdated date={post.frontmatter.pubDate} />)`
        
    2.  `myPosts[2].frontmatter.title`
        
    3.  `<a href={myPosts[0].url}>First Post!!</a>`
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  A link to the URL of your first blog post.
    
    1.  `myPosts.map((post) => <LastUpdated date={post.frontmatter.pubDate} />)`
        
    2.  `myPosts[2].frontmatter.title`
        
    3.  `<a href={myPosts[0].url}>First Post!!</a>`
        
    
    Submit
    
3.  A component for each post, displaying the date that it was last updated.
    
    1.  `myPosts.map((post) => <LastUpdated date={post.frontmatter.pubDate} />)`
        
    2.  `myPosts[2].frontmatter.title`
        
    3.  `<a href={myPosts[0].url}>First Post!!</a>`
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can query for data from my local files.
*    I can display a list of all my blog posts.

### Resources

[Section titled Resources](#resources)

*   [Importing glob patterns in Astro](/en/guides/imports/#importmetaglob)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/5-astro-api/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Check in: Unit 5 - Astro API](/en/tutorial/5-astro-api/) [Next  
Generate tag pages](/en/tutorial/5-astro-api/2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/5-astro-api/2
Generate tag pages
==================

Get ready to…

*   Create a page to generate multiple pages
*   Specify which page routes to build, and pass each page its own props

Dynamic page routing
--------------------

[Section titled Dynamic page routing](#dynamic-page-routing)

You can create entire sets of pages dynamically using `.astro` files that export a `getStaticPaths()` function.

Create pages dynamically
------------------------

[Section titled Create pages dynamically](#create-pages-dynamically)

1.  Create a new file at `src/pages/tags/[tag].astro`. (You will have to create a new folder.) Notice that the file name (`[tag].astro`) uses square brackets. Paste the following code into the file:
    
    src/pages/tags/\[tag\].astro
    
        ---import BaseLayout from '../../layouts/BaseLayout.astro';
        export async function getStaticPaths() {  return [    { params: { tag: "astro" } },    { params: { tag: "successes" } },    { params: { tag: "community" } },    { params: { tag: "blogging" } },    { params: { tag: "setbacks" } },    { params: { tag: "learning in public" } },  ];}
        const { tag } = Astro.params;---<BaseLayout pageTitle={tag}>  <p>Posts tagged with {tag}</p></BaseLayout>
    
    The `getStaticPaths` function returns an array of page routes, and all of the pages at those routes will use the same template defined in the file.
    
2.  If you have customized your blog posts, then replace the individual tag values (e.g. “astro”, “successes”, “community”, etc.) with the tags used in your own posts.
    
3.  Make sure that every blog post contains at least one tag, written as an array, e.g. `tags: ["blogging"]`.
    
4.  Visit `http://localhost:4321/tags/astro` in your browser preview and you should see a page, generated dynamically from `[tag].astro`. Check that you also have pages created for each of your tags at `/tags/successes`, `/tags/community`, and `/tags/learning%20in%20public`, etc., or at each of your custom tags. You may need to first quit and restart the dev server to see these new pages.
    

Use props in dynamic routes
---------------------------

[Section titled Use props in dynamic routes](#use-props-in-dynamic-routes)

1.  Add the following props to your `getStaticPaths()` function in order to make data from all your blog posts available to each page route.
    
    Be sure to give each route in your array the new props, and then make those props available to your component template outside of your function.
    
    src/pages/tags/\[tag\].astro
    
        ---import BaseLayout from '../../layouts/BaseLayout.astro';
        export async function getStaticPaths() {  const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));
          return [    {params: {tag: "astro"}, props: {posts: allPosts}},    {params: {tag: "successes"}, props: {posts: allPosts}},    {params: {tag: "community"}, props: {posts: allPosts}},    {params: {tag: "blogging"}, props: {posts: allPosts}},    {params: {tag: "setbacks"}, props: {posts: allPosts}},    {params: {tag: "learning in public"}, props: {posts: allPosts}}  ];}
        const { tag } = Astro.params;const { posts } = Astro.props;---
    
2.  Filter your list of posts, using Astro’s built-in TypeScript support, to only include posts that contain the page’s own tag.
    
    src/pages/tags/\[tag\].astro
    
        ---const { tag } = Astro.params;const { posts } = Astro.props;const filteredPosts = posts.filter((post: any) => post.frontmatter.tags?.includes(tag));---
    
3.  Now you can update your HTML template to show a list of each blog post containing the page’s own tag. Add the following code to `[tag].astro`:
    
    src/pages/tags/\[tag\].astro
    
        <BaseLayout pageTitle={tag}>  <p>Posts tagged with {tag}</p>  <ul>    {filteredPosts.map((post: any) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}  </ul></BaseLayout>
    
4.  You can even refactor this to use your `<BlogPost />` component instead! (Don’t forget to import this component at the top of `[tag].astro`.)
    
    src/pages/tags/\[tag\].astro
    
        <BaseLayout pageTitle={tag}>  <p>Posts tagged with {tag}</p>  <ul>    {filteredPosts.map((post: any) => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}    {filteredPosts.map((post: any) => <BlogPost url={post.url} title={post.frontmatter.title}/>)}  </ul></BaseLayout>
    
5.  Check your browser preview for your individual tag pages, and you should now see a list of all of your blog posts containing that particular tag.
    

### Analyze the pattern

[Section titled Analyze the pattern](#analyze-the-pattern)

For each of the following, state whether the code is written **inside** the `getStaticPaths()` function, or **outside** of it.

1.  The `import.meta.glob()` call to receive information about all your `.md` files to pass to each page route.
    
    1.  inside `getStaticPaths`
    2.  outside `getStaticPaths`
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  The list of routes to be generated (returned) by `getStaticPaths()`
    
    1.  inside `getStaticPaths`
    2.  outside `getStaticPaths`
    
    Submit
    
3.  The received values of `props` and `params` to be used in the HTML template.
    
    1.  inside `getStaticPaths`
    2.  outside `getStaticPaths`
    
    Submit
    

Takeaway

If you need information to construct the page routes, write it **inside** `getStaticPaths()`.

To receive information in the HTML template of a page route, write it **outside** `getStaticPaths()`.

Advanced JavaScript: Generate pages from existing tags
------------------------------------------------------

[Section titled Advanced JavaScript: Generate pages from existing tags](#advanced-javascript-generate-pages-from-existing-tags)

Your tag pages are now defined statically in `[tag].astro`. If you add a new tag to a blog post, you will also have to revisit this page and update your page routes.

The following example shows how to replace your code on this page with code that will automatically look for, and generate pages for, each tag used on your blog pages.

Note

Even if it looks challenging, you can try following along with the steps to build this function yourself! If you don’t want to walk through the JavaScript required right now, you can skip ahead to the [finished version of the code](#final-code-sample) and use it directly in your project, replacing the existing content.

1.  Check that all your blog posts contain tags
    
    Revisit each of your existing Markdown pages and ensure that every post contains a `tags` array in its frontmatter. Even if you only have one tag, it should still be written as an array, e.g. `tags: ["blogging"]`.
    
2.  Create an array of all your existing tags using Astro’s built-in TypeScript support.
    
    Add the following code to provide you with a list of every tag used in your blog posts.
    
    src/pages/tags/\[tag\].astro
    
        ---import BaseLayout from '../../layouts/BaseLayout.astro';
        export async function getStaticPaths() {  const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));
          const uniqueTags = [...new Set(allPosts.map((post: any) => post.frontmatter.tags).flat())];}
    
    Tell me what this line of code is doing in more detail!
    
    It’s OK if this isn’t something you would have written yourself yet!
    
    It goes through each Markdown post, one by one, and combines each array of tags into one single larger array. Then, it makes a new `Set` from all the individual tags it found (to ignore repeated values). Finally, it turns that set into an array (with no duplications), that you can use to show a list of tags on your page.
    
    You now have an array `uniqueTags` with element items `"astro"`, `"successes"`, `"community"`, `"blogging"`, `"setbacks"`, `"learning in public"`
    
3.  Replace the `return` value of the `getStaticPaths` function
    
    src/pages/tags/\[tag\].astro
    
        return [  {params: {tag: "astro"}, props: {posts: allPosts}},  {params: {tag: "successes"}, props: {posts: allPosts}},  {params: {tag: "community"}, props: {posts: allPosts}},  {params: {tag: "blogging"}, props: {posts: allPosts}},  {params: {tag: "setbacks"}, props: {posts: allPosts}},  {params: {tag: "learning in public"}, props: {posts: allPosts}}]
        return uniqueTags.map((tag) => {  const filteredPosts = allPosts.filter((post: any) => post.frontmatter.tags.includes(tag));  return {    params: { tag },    props: { posts: filteredPosts },  };});
    
4.  A `getStaticPaths` function should always return a list of objects containing `params` (what to call each page route) and optionally any `props` (data that you want to pass to those pages). Earlier, you defined each tag name that you knew was used in your blog and passed the entire list of posts as props to each page.
    
    Now, you generate this list of objects automatically using your `uniqueTags` array to define each parameter.
    
    And, now the list of all blog posts is filtered **before** it is sent to each page as props. Be sure to remove the previous line of code filtering the posts, and update your HTML template to use `posts` instead of `filteredPosts`.
    
    src/pages/tags/\[tag\].astro
    
        const { tag } = Astro.params;const { posts } = Astro.props;const filteredPosts = posts.filter((post) => post.frontmatter.tags?.includes(tag));---<!-- --><ul>  {filteredPosts.map((post: any) => <BlogPost url={post.url} title={post.frontmatter.title}/>)}  {posts.map((post: any) => <BlogPost url={post.url} title={post.frontmatter.title}/>)}</ul>
    

### Final code sample

[Section titled Final code sample](#final-code-sample)

To check your work, or if you just want complete, correct code to copy into `[tag].astro`, here is what your Astro component should look like:

src/pages/tags/\[tag\].astro

    ---import BaseLayout from '../../layouts/BaseLayout.astro';import BlogPost from '../../components/BlogPost.astro';
    export async function getStaticPaths() {  const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));
      const uniqueTags = [...new Set(allPosts.map((post: any) => post.frontmatter.tags).flat())];
      return uniqueTags.map((tag) => {    const filteredPosts = allPosts.filter((post: any) => post.frontmatter.tags.includes(tag));    return {      params: { tag },      props: { posts: filteredPosts },    };  });}
    const { tag } = Astro.params;const { posts } = Astro.props;---<BaseLayout pageTitle={tag}>  <p>Posts tagged with {tag}</p>  <ul>    {posts.map((post: any) => <BlogPost url={post.url} title={post.frontmatter.title}/>)}  </ul></BaseLayout>

Now, you should be able to visit any of your tag pages in your browser preview.

Navigate to `http://localhost:4321/tags/community` and you should see a list of only your blog posts with the tag `community`. Similarly `http://localhost:4321/tags/learning%20in%20public` should display a list of the blog posts tagged `learning in public`.

In the next section, you will create navigation links to these pages.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

Choose the term that matches the description.

1.  A function that returns an array of page routes.
    
    1.  params
    2.  dynamic routing
    3.  `getStaticPaths()`
    4.  props
    
    Submit
    
2.  The process of creating multiple page routes from one file in Astro.
    
    1.  params
    2.  dynamic routing
    3.  `getStaticPaths()`
    4.  props
    
    Submit
    
3.  A value that defines the name of a page route generated dynamically.
    
    1.  params
    2.  dynamic routing
    3.  `getStaticPaths()`
    4.  props
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can generate pages dynamically.
*    I can pass `props` to each page route.

### Resources

[Section titled Resources](#resources)

*   [Dynamic Page Routing in Astro](/en/guides/routing/#dynamic-routes)
    
*   [`getStaticPaths()` API documentation](/en/reference/routing-reference/#getstaticpaths)
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/5-astro-api/2.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Create a blog post archive](/en/tutorial/5-astro-api/1/) [Next  
Build a tag index page](/en/tutorial/5-astro-api/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/5-astro-api/3
Build a tag index page
======================

Now that you have individual pages for every tag, it’s time to make links to them.

Get ready to…

*   Add a new page using the `/pages/folder/index.astro` routing pattern
*   Display a list of all your unique tags, linking to each tag page
*   Update your site with navigation links to this new Tags page

Use the `/pages/folder/index.astro` routing pattern
---------------------------------------------------

[Section titled Use the /pages/folder/index.astro routing pattern](#use-the-pagesfolderindexastro-routing-pattern)

To add a Tag Index page to your website, you could create a new file at `src/pages/tags.astro`.

But, since you already have the directory `/tags/`, you can take advantage of another routing pattern in Astro, and keep all your files related to tags together.

Try it yourself - Make a Tag Index page
---------------------------------------

[Section titled Try it yourself - Make a Tag Index page](#try-it-yourself---make-a-tag-index-page)

1.  Create a new file `index.astro` in the directory `src/pages/tags/`.
    
2.  Navigate to `http://localhost:4321/tags` and verify that your site now contains a page at this URL. It will be empty, but it will exist.
    
3.  Create a minimal page at `src/pages/tags/index.astro` that uses your layout. You have done this before!
    
    Expand to see the steps
    
    1.  Create a new page component in `src/pages/tags/`.
        
        Show the filename
        
            index.astro
        
    2.  Import and use your `<BaseLayout>`.
        
        Show the code
        
        src/pages/tags/index.astro
        
            ---import BaseLayout from '../../layouts/BaseLayout.astro';---<BaseLayout></BaseLayout>
        
    3.  Define a page title, and pass it to your layout as a component attribute.
        
        Show the code
        
        src/pages/tags/index.astro
        
            ---import BaseLayout from '../../layouts/BaseLayout.astro';const pageTitle = "Tag Index";---<BaseLayout pageTitle={pageTitle}></BaseLayout>
        
    
4.  Check your browser preview again and you should have a formatted page, ready to add content to!
    

Create an array of tags
-----------------------

[Section titled Create an array of tags](#create-an-array-of-tags)

You have previously displayed items in a list from an array using `map()`. What would it look like to define an array of all your tags, then display them in a list on this page?

See the code

src/pages/tags/index.astro

    ---import BaseLayout from '../../layouts/BaseLayout.astro';const tags = ['astro', 'blogging', 'learning in public', 'successes', 'setbacks', 'community']const pageTitle = "Tag Index";---<BaseLayout pageTitle={pageTitle}>  <ul>    {tags.map((tag) => <li>{tag}</li>)}  </ul></BaseLayout>

You could do this, but then you would need to come back to this file and update your array every time you use a new tag in a future blog post.

Fortunately, you already know a way to grab the data from all your Markdown files in one line of code, then return a list of all your tags.

1.  In `src/pages/tags/index.astro`, add the line of code to the frontmatter script that will give your page access to the data from every `.md` blog post file.
    
    See the code
    
    src/pages/tags/index.astro
    
        ---import BaseLayout from '../../layouts/BaseLayout.astro';const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));const pageTitle = "Tag Index";---
    
2.  Next, add the following line of JavaScript to your page component. This is the same code relying on Astro’s built-in TypeScript support you used in `src/pages/tags/[tag].astro` to return a list of unique tags.
    
    src/pages/tags/index.astro
    
        ---import BaseLayout from '../../layouts/BaseLayout.astro';const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));const tags = [...new Set(allPosts.map((post: any) => post.frontmatter.tags).flat())];const pageTitle = "Tag Index";---
    

Create your list of tags
------------------------

[Section titled Create your list of tags](#create-your-list-of-tags)

Instead of creating items in an unordered list this time, create one `<p>` for each item, inside a `<div>`. The pattern should look familiar!

1.  Add the following code to your component template:
    
    src/pages/tags/index.astro
    
        <BaseLayout pageTitle={pageTitle}>  <div>{tags.map((tag) => <p>{tag}</p>)}</div></BaseLayout>
    
    In your browser preview, verify that you can see your tags listed. If any blog posts are missing tags, or they are improperly formatted, Astro’s built-in TypeScript support will show you errors so you can check and correct your code.
    
2.  To make each tag link to its own page, add the following `<a>` link to each tag name:
    
    src/pages/tags/index.astro
    
        <BaseLayout pageTitle={pageTitle}>  <div>    {tags.map((tag) => (      <p><a href={`/tags/${tag}`}>{tag}</a></p>    ))}  </div></BaseLayout>
    

Add styles to your tag list
---------------------------

[Section titled Add styles to your tag list](#add-styles-to-your-tag-list)

1.  Add the following CSS classes to style both your `<div>` and each `<p>` that will be generated. Note: Astro uses HTML syntax for adding class names!
    
    src/pages/tags/index.astro
    
        <BaseLayout pageTitle={pageTitle}>  <div class="tags">    {tags.map((tag) => (      <p class="tag"><a href={`/tags/${tag}`}>{tag}</a></p>    ))}  </div></BaseLayout>
    
2.  Define these new CSS classes by adding the following `<style>` tag to this page:
    
    src/pages/tags/index.astro
    
        <style>  a {    color: #00539F;  }
          .tags {    display: flex;    flex-wrap: wrap;  }
          .tag {    margin: 0.25em;    border: dotted 1px #a1a1a1;    border-radius: .5em;    padding: .5em 1em;    font-size: 1.15em;    background-color: #F8FCFD;  }</style>
    
3.  Check your browser preview at `http://localhost:4321/tags` to verify that you have some new styles and that each of the tags on the page has a working link to its own individual tag page.
    

### Code Check-In

[Section titled Code Check-In](#code-check-in)

Here is what your new page should look like:

src/pages/tags/index.astro

    ---import BaseLayout from '../../layouts/BaseLayout.astro';const allPosts = Object.values(import.meta.glob('../posts/*.md', { eager: true }));const tags = [...new Set(allPosts.map((post: any) => post.frontmatter.tags).flat())];const pageTitle = "Tag Index";---<BaseLayout pageTitle={pageTitle}>  <div class="tags">    {tags.map((tag) => (      <p class="tag"><a href={`/tags/${tag}`}>{tag}</a></p>    ))}  </div></BaseLayout><style>  a {    color: #00539F;  }
      .tags {    display: flex;    flex-wrap: wrap;  }
      .tag {    margin: 0.25em;    border: dotted 1px #a1a1a1;    border-radius: .5em;    padding: .5em 1em;    font-size: 1.15em;    background-color: #F8FCFD;  }</style>

Add this page to your navigation
--------------------------------

[Section titled Add this page to your navigation](#add-this-page-to-your-navigation)

Right now, you can navigate to `http://localhost:4321/tags` and see this page. From this page, you can click on links to your individual tag pages.

But, you still need to make these pages discoverable from other pages on your website.

1.  In your `Navigation.astro` component, include a link to this new tag index page.
    
    Show me the code
    
    src/components/Navigation.astro
    
        <a href="/">Home</a><a href="/about/">About</a><a href="/blog/">Blog</a><a href="/tags/">Tags</a>
    

Challenge: Include tags in your blog post layout
------------------------------------------------

[Section titled Challenge: Include tags in your blog post layout](#challenge-include-tags-in-your-blog-post-layout)

You have now written all the code you need to also display a list of tags on each blog post, and link them to their tag pages. You have existing work that you can reuse!

Follow the steps below, then check your work by comparing it to the [final code sample](#code-check-in-markdownpostlayout).

1.  Copy the `<div class="tags">...</div>` and `<style>...</style>` from `src/pages/tags/index.astro` and reuse it inside `MarkdownPostLayout.astro`:
    
    src/layouts/MarkdownPostLayout.astro
    
        ---import BaseLayout from './BaseLayout.astro';const { frontmatter } = Astro.props;---<BaseLayout pageTitle={frontmatter.title}>  <p><em>{frontmatter.description}</em></p>  <p>{frontmatter.pubDate.toString().slice(0,10)}</p>
          <p>Written by: {frontmatter.author}</p>
          <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />
          <div class="tags">    {tags.map((tag: string) => (      <p class="tag"><a href={`/tags/${tag}`}>{tag}</a></p>    ))}  </div>
          <slot /></BaseLayout><style>  a {    color: #00539F;  }
          .tags {    display: flex;    flex-wrap: wrap;  }
          .tag {    margin: 0.25em;    border: dotted 1px #a1a1a1;    border-radius: .5em;    padding: .5em 1em;    font-size: 1.15em;    background-color: #F8FCFD;  }</style>
    

Before this code will work, you need to make **one small edit** to the code you pasted into `MarkdownPostLayout.astro`. Can you figure out what it is?

Give me a hint

How are the other props (e.g. title, author, etc.) written in your layout template? How does your layout receive props from an individual blog post?

Give me another hint!

In order to use props (values passed) from a `.md` blog post in your layout, like tags, you need to prefix the value with a certain word.

Show me the code!

src/layouts/MarkdownPostLayout.astro

        <div class="tags">      {frontmatter.tags.map((tag: string) => (        <p class="tag"><a href={`/tags/${tag}`}>{tag}</a></p>      ))}    </div>

### Code Check-in: MarkdownPostLayout

[Section titled Code Check-in: MarkdownPostLayout](#code-check-in-markdownpostlayout)

To check your work, or if you just want complete, correct code to copy into `MarkdownPostLayout.astro`, here is what your Astro component should look like:

src/layouts/MarkdownPostLayout.astro

    ---import BaseLayout from './BaseLayout.astro';const { frontmatter } = Astro.props;---<BaseLayout pageTitle={frontmatter.title}>  <p><em>{frontmatter.description}</em></p>  <p>{frontmatter.pubDate.toString().slice(0,10)}</p>
      <p>Written by: {frontmatter.author}</p>
      <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />
      <div class="tags">    {frontmatter.tags.map((tag: string) => (      <p class="tag"><a href={`/tags/${tag}`}>{tag}</a></p>    ))}  </div>
      <slot /></BaseLayout><style>  a {    color: #00539F;  }
      .tags {    display: flex;    flex-wrap: wrap;  }
      .tag {    margin: 0.25em;    border: dotted 1px #a1a1a1;    border-radius: .5em;    padding: .5em 1em;    font-size: 1.15em;    background-color: #F8FCFD;  }</style>

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

Match each file path with a second file path that will create a page at the same route.

1.  `src/pages/categories.astro`
    
    1.  `src/pages/posts/post.astro`
    2.  `src/pages/posts/index.astro`
    3.  `src/components/shoes/Shoe.astro`
    4.  `src/pages/categories/index.astro`
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  `src/pages/posts.astro`
    
    1.  `src/pages/products/shoes.astro`
    2.  `src/pages/posts/post.astro`
    3.  `src/pages/posts/index.astro`
    4.  `src/pages/categories/index.astro`
    
    Submit
    
3.  `src/pages/products/shoes/index.astro`
    
    1.  `src/pages/products/shoes.astro`
    2.  `src/pages/posts/post.astro`
    3.  `src/pages/posts/index.astro`
    4.  `src/components/shoes/Shoe.astro`
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can use Astro’s `/pages/folder/index.astro` routing feature.

### Resources

[Section titled Resources](#resources)

*   [Static Routing in Astro](/en/guides/routing/#static-routes)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/5-astro-api/3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Generate tag pages](/en/tutorial/5-astro-api/2/) [Next  
Add an RSS feed](/en/tutorial/5-astro-api/4/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/5-astro-api/4
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



