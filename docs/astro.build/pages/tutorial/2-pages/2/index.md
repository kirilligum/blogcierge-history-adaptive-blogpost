Write your first Markdown blog post
===================================

Now that you have built pages using `.astro` files, it’s time to make some blog posts using `.md` files!

Get ready to…

*   Make a new folder and create a new post
*   Write some Markdown content
*   Link to your blog posts on your Blog page

Create your first `.md` file
----------------------------

[Section titled Create your first .md file](#create-your-first-md-file)

1.  Create a new directory at `src/pages/posts/`.
    
2.  Add a new (empty) file `post-1.md` inside your new `/posts/` folder.
    
3.  Look for this page in your browser preview by adding `/posts/post-1` to the end of your existing preview URL. (e.g. `http://localhost:4321/posts/post-1`)
    
4.  Change the browser preview URL to view `/posts/post-2` instead. (This is a page you have not yet created.)
    
    Note the different output when previewing an “empty” page, and one that doesn’t exist. This will help you troubleshoot in the future.
    

Write Markdown content
----------------------

[Section titled Write Markdown content](#write-markdown-content)

1.  Copy or type the following code into `post-1.md`
    
    src/pages/posts/post-1.md
    
        ---title: 'My First Blog Post'pubDate: 2022-07-01description: 'This is the first post of my new Astro blog.'author: 'Astro Learner'image:    url: 'https://docs.astro.build/assets/rose.webp'    alt: 'The Astro logo on a dark background with a pink glow.'tags: ["astro", "blogging", "learning in public"]---# My First Blog Post
        Published on: 2022-07-01
        Welcome to my _new blog_ about learning Astro! Here, I will share my learning journey as I build a new website.
        ## What I've accomplished
        1. **Installing Astro**: First, I created a new Astro project and set up my online accounts.
        2. **Making Pages**: I then learned how to make pages by creating new `.astro` files and placing them in the `src/pages/` folder.
        3. **Making Blog Posts**: This is my first blog post! I now have Astro pages and Markdown posts!
        ## What's next
        I will finish the Astro tutorial, and then keep adding more posts. Watch this space for more to come.
    
2.  Check your browser preview again at `http://localhost:4321/posts/post-1`. You should now see content on this page. It may not yet be properly formatted, but don’t worry, you will update this later in the tutorial!
    
3.  Use your browser’s Dev Tools to inspect this page. Notice that although you have not typed any HTML elements, your Markdown has been converted to HTML. You can see elements such as headings, paragraphs, and list items.
    

Note

The information at the top of the file, inside the code fences, is called frontmatter. This data—including tags and a post image—is information _about_ your post that Astro can use. It does not appear on the page automatically, but you will access it later in the tutorial to enhance your site.

Link to your posts
------------------

[Section titled Link to your posts](#link-to-your-posts)

1.  Link to your first post with an anchor tag in `src/pages/blog.astro`:
    
    src/pages/blog.astro
    
        ------<html lang="en">  <head>    <meta charset="utf-8"/>    <meta name="viewport" content="width=device-width" />    <title>Astro</title>  </head>  <body>    <a href="/">Home</a>    <a href="/about/">About</a>    <a href="/blog/">Blog</a>
            <h1>My Astro Learning Blog</h1>    <p>This is where I will post about my journey learning Astro.</p>    <ul>      <li><a href="/posts/post-1/">Post 1</a></li>    </ul>  </body></html>
    
2.  Now, add two more files in `src/pages/posts/`: `post-2.md` and `post-3.md`. Here is some sample code you can copy and paste into your files, or, you can create your own!
    
    src/pages/posts/post-2.md
    
        ---title: My Second Blog Postauthor: Astro Learnerdescription: "After learning some Astro, I couldn't stop!"image:    url: "https://docs.astro.build/assets/arc.webp"    alt: "The Astro logo on a dark background with a purple gradient arc."pubDate: 2022-07-08tags: ["astro", "blogging", "learning in public", "successes"]---After a successful first week learning Astro, I decided to try some more. I wrote and imported a small component from memory!
    
    src/pages/posts/post-3.md
    
        ---title: My Third Blog Postauthor: Astro Learnerdescription: "I had some challenges, but asking in the community really helped!"image:    url: "https://docs.astro.build/assets/rays.webp"    alt: "The Astro logo on a dark background with rainbow rays."pubDate: 2022-07-15tags: ["astro", "learning in public", "setbacks", "community"]---It wasn't always smooth sailing, but I'm enjoying building with Astro. And, the [Discord community](https://astro.build/chat) is really friendly and helpful!
    
3.  Add links to these new posts:
    
    src/pages/blog.astro
    
        ------<html lang="en">  <head>    <meta charset="utf-8"/>    <meta name="viewport" content="width=device-width" />    <title>Astro</title>  </head>  <body>    <a href="/">Home</a>    <a href="/about/">About</a>    <a href="/blog/">Blog</a>
            <h1>My Astro Learning Blog</h1>    <p>This is where I will post about my journey learning Astro.</p>    <ul>      <li><a href="/posts/post-1/">Post 1</a></li>      <li><a href="/posts/post-2/">Post 2</a></li>      <li><a href="/posts/post-3/">Post 3</a></li>    </ul>  </body></html>
    
4.  Check your browser preview and make sure that:
    
    All your links for Post 1, Post 2, and Post 3 lead to a working page on your site. (If you find a mistake, check your links on `blog.astro` or your Markdown file names.)
    

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  Content in a Markdown (`.md`) file is converted to:
    
    1.  HTML
    2.  CSS
    3.  JavaScript
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can create a new folder within `src/pages/` for my blog posts.
*    I can create a new Markdown (`.md`) blog post file.
*    I understand that Markdown is another language that, like Astro, produces HTML in my browser.

### Resources

[Section titled Resources](#resources)

*   [Markdown Cheat Sheet from The Markdown Guide](https://www.markdownguide.org/cheat-sheet/) external
    
*   [What are browser developer tools? MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) external
    
*   [YAML frontmatter](https://assemble.io/docs/YAML-front-matter.html) external
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/2.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Create your first Astro page](/en/tutorial/2-pages/1/) [Next  
Add dynamic content about you](/en/tutorial/2-pages/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)