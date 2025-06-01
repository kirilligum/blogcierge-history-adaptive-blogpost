Combine layouts to get the best of both worlds
==============================================

Now that you have added a layout to each blog post, it’s time to make your posts look like the rest of the pages on your website!

Get ready to…

*   Nest your blog post layout inside your main page layout

Nest your two layouts
---------------------

[Section titled Nest your two layouts](#nest-your-two-layouts)

You already have a `BaseLayout.astro` for defining the overall layout of your pages.

`MarkdownPostLayout.astro` gives you some additional templating for common blog post properties such as `title` and `date`, but your blog posts don’t look like the other pages on your site. You can match the look of your blog posts to the rest of your site by **nesting layouts**.

1.  In `src/layouts/MarkdownPostLayout.astro`, import `BaseLayout.astro` and use it to wrap the entire template content. Don’t forget to pass the `pageTitle` prop:
    
    src/layouts/MarkdownPostLayout.astro
    
        ---import BaseLayout from './BaseLayout.astro';const { frontmatter } = Astro.props;---<BaseLayout pageTitle={frontmatter.title}>  <meta charset="utf-8" />  <h1>{frontmatter.title}</h1>  <p>{frontmatter.pubDate.toString().slice(0,10)}</p>  <p><em>{frontmatter.description}</em></p>  <p>Written by: {frontmatter.author}</p>  <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />  <slot /></BaseLayout>
    
2.  In `src/layouts/MarkdownPostLayout.astro`, you can now remove the `meta` tag as it is already included in your `BaseLayout`:
    
    src/layouts/MarkdownPostLayout.astro
    
        ---import BaseLayout from './BaseLayout.astro';const { frontmatter } = Astro.props;---<BaseLayout pageTitle={frontmatter.title}>  <meta charset="utf-8" />  <h1>{frontmatter.title}</h1>  <p>{frontmatter.pubDate.toString().slice(0,10)}</p>  <p><em>{frontmatter.description}</em></p>  <p>Written by: {frontmatter.author}</p>  <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />  <slot /></BaseLayout>
    
3.  Check your browser preview at `http://localhost:4321/posts/post-1`. Now you should see content rendered by:
    
    *   Your **main page layout**, including your styles, navigation links, and social footer.
    *   Your **blog post layout**, including frontmatter properties like the description, date, title, and image.
    *   Your **individual blog post Markdown content**, including just the text written in this post.
4.  Notice that your page title is now displayed twice, once by each layout.
    
    Remove the line that displays your page title from `MarkdownPostLayout.astro`:
    
    src/layouts/MarkdownPostLayout.astro
    
        <BaseLayout pageTitle={frontmatter.title}>  <h1>{frontmatter.title}</h1>  <p>{frontmatter.pubDate.toString().slice(0,10)}</p>  <p><em>{frontmatter.description}</em></p>  <p>Written by: {frontmatter.author}</p>  <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />  <slot /></BaseLayout>
    
5.  Check your browser preview again at `http://localhost:4321/posts/post-1` and verify that this line is no longer displayed and that your title is only displayed once. Make any other adjustments necessary to ensure that you do not have any duplicated content.
    

Make sure that:

*   Each blog post shows the same page template, and no content is missing. (If one of your blog posts is missing content, check its frontmatter properties.)
    
*   No content is duplicated on a page. (If something is being rendered twice, then be sure to remove it from `MarkdownPostLayout.astro`.)
    

If you’d like to customize your page template, you can.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  This allows you to nest one layout inside another and take advantage of working with modular pieces.
    
    1.  continuous deployment
        
    2.  responsive design
        
    3.  component-based design
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  Multiple layouts are particularly useful for projects that contain Markdown pages, like a…
    
    1.  blog
        
    2.  dashboard
        
    3.  chat app
        
    
    Submit
    
3.  Which of these provides templating for all your pages?
    
    1.  `index.astro`
        
    2.  `BaseLayout.astro`
        
    3.  `post-1.md`
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can nest layouts, checking for any duplicated elements.

### Resources

[Section titled Resources](#resources)

*   [Nesting Layouts in Astro](/en/basics/layouts/#nesting-layouts)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/4-layouts/3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Create and pass data to a custom blog layout](/en/tutorial/4-layouts/2/) [Next  
Check in: Unit 5 - Astro API](/en/tutorial/5-astro-api/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)