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

