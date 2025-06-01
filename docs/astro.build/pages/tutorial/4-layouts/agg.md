Check in: Unit 4 - Layouts
==========================

Now that you can build with components, it’s time to create some custom layouts!

Looking ahead
-------------

[Section titled Looking ahead](#looking-ahead)

In this unit, you’ll build layouts to share common elements and styles across your pages and blog posts.

To do this, you will:

*   Create reusable layout components
*   Pass content to your layouts with `<slot />`
*   Pass data from Markdown frontmatter to your layouts
*   Nest multiple layouts

Checklist
---------

[Section titled Checklist](#checklist)

 *    I am ready to take my page design to the next level with layouts!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/4-layouts/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Send your first script to the browser](/en/tutorial/3-components/4/) [Next  
Build your first layout](/en/tutorial/4-layouts/1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/tutorial/4-layouts/1
Build your first layout
=======================

Get ready to…

*   Refactor common elements into a page layout
*   Use an Astro `<slot />` element to place page contents within a layout
*   Pass page-specific values as props to its layout

You still have some Astro components repeatedly rendered on every page. It’s time to refactor again to create a shared page layout!

Create your first layout component
----------------------------------

[Section titled Create your first layout component](#create-your-first-layout-component)

1.  Create a new file at the location `src/layouts/BaseLayout.astro`. (You will need to create a new `layouts` folder first.)
    
2.  Copy the **entire contents** of `index.astro` into your new file, `BaseLayout.astro`.
    
    src/layouts/BaseLayout.astro
    
        ---import Header from '../components/Header.astro';import Footer from '../components/Footer.astro';import '../styles/global.css';const pageTitle = "Home Page";---<html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <meta name="generator" content={Astro.generator} />    <title>{pageTitle}</title>  </head>  <body>    <Header />    <h1>{pageTitle}</h1>    <Footer />    <script>      import "../scripts/menu.js";    </script>  </body></html>
    

Use your layout on a page
-------------------------

[Section titled Use your layout on a page](#use-your-layout-on-a-page)

3.  Replace the code at `src/pages/index.astro` with the following:
    
    src/pages/index.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';const pageTitle = "Home Page";---<BaseLayout>  <h2>My awesome blog subtitle</h2></BaseLayout>
    
4.  Check the browser preview again to notice what did (or, spoiler alert: did _not_!) change.
    
5.  Add a `<slot />` element to `src/layouts/BaseLayout.astro` just above the footer component, then check the browser preview of your Home page and notice what really _did_ change this time!
    
    src/layouts/BaseLayout.astro
    
        ---import Header from '../components/Header.astro';import Footer from '../components/Footer.astro';import '../styles/global.css';const pageTitle = "Home Page";---<html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <meta name="generator" content={Astro.generator} />    <title>{pageTitle}</title>  </head>  <body>    <Header />    <h1>{pageTitle}</h1>    <slot />    <Footer />    <script>      import "../scripts/menu.js";    </script>  </body></html>
    

The `<slot />` allows you to inject (or “slot in”) **child content** written between opening and closing `<Component></Component>` tags to any `Component.astro` file.

Pass page-specific values as props
----------------------------------

[Section titled Pass page-specific values as props](#pass-page-specific-values-as-props)

6.  Pass the page title to your layout component from `index.astro` using a component attribute:
    
    src/pages/index.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';const pageTitle = "Home Page";---<BaseLayout pageTitle={pageTitle}>  <h2>My awesome blog subtitle</h2></BaseLayout>
    
7.  Change the script of your `BaseLayout.astro` layout component to receive a page title via `Astro.props` instead of defining it as a constant.
    
    src/layouts/BaseLayout.astro
    
        ---import Header from '../components/Header.astro';import Footer from '../components/Footer.astro';import '../styles/global.css';const pageTitle = "Home Page";const { pageTitle } = Astro.props;---
    
8.  Check your browser preview to verify that your page title has not changed. It has the same value, but is now being rendered dynamically. And now, each individual page can specify its own title to the layout.
    

Try it yourself - Use your layout everywhere
--------------------------------------------

[Section titled Try it yourself - Use your layout everywhere](#try-it-yourself---use-your-layout-everywhere)

**Refactor** your other pages (`blog.astro` and `about.astro`) so that they use your new `<BaseLayout>` component to render the common page elements.

Don’t forget to:

*   Pass a page title as props via a component attribute.
    
*   Let the layout be responsible for the HTML rendering of any common elements.
    
*   Move any existing `<style>` tags in the page `<head>` with styles you wish to keep to the page HTML template.
    
*   Delete anything from each individual page that is now being handled by the layout, including:
    
    *   HTML elements
    *   Components and their imports
    *   CSS rules in a `<style>` tag (e.g. `<h1>` in your About page)
    *   `<script>` tags

Keeping your About page styles

Using the `<BaseLayout>` to render your `about.astro` page means you will lose the `<style>` tag added to the `<head>` of this page. To continue to style items only at the page level using Astro’s scoped styling, move the `<style>` tag to the body of the page component. This allows you to style **elements created in this page component** (e.g. your list of skills).

Since your `<h1>` is now created by your layout component, you can add the `is:global` attribute to your style tag to affect every element on this page, including those created by other components: `<style is:global define:vars={{ skillColor, fontWeight, textCase }}>`

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  An Astro component (`.astro` file) can function as a:
    
    1.  page
    2.  UI component
    3.  layout
    4.  all of the above, because Astro components are so functional! 🏗️
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  To display a page title on the page, you can:
    
    1.  use a standard HTML element on the page with static text (e.g `<h1>Home Page</h1>`)
        
    2.  use a standard HTML element on the page referring to a variable defined in your component’s frontmatter script (e.g. `<h1>{pageTitle}</h1>`)
        
    3.  use a layout component on the page, passing the title as a component attribute (e.g. `<BaseLayout title="Home Page" />` or `<BaseLayout title={pageTitle} />`)
        
    4.  all of the above, because Astro lets you use plain HTML or supercharge it with some script and components! 💪
        
    
    Submit
    
3.  Information can be passed from one component to another by:
    
    1.  importing a UI component and rendering it in the template of another component
        
    2.  passing props to a component where it is rendered via a component attribute
        
    3.  sending HTML content to be rendered inside another component using a `<slot />` placeholder
        
    4.  all of the above, because Astro was built to take advantage of component-based design! 🧩
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can create an Astro layout component with a `<slot />`.
*    I can send page-specific properties to a layout.

### Resources

[Section titled Resources](#resources)

*   [Astro layout components](/en/basics/layouts/)
    
*   [Astro `<slot />`](/en/basics/astro-components/#slots)
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/4-layouts/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Check in: Unit 4 - Layouts](/en/tutorial/4-layouts/) [Next  
Create and pass data to a custom blog layout](/en/tutorial/4-layouts/2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/4-layouts/2
Create and pass data to a custom blog layout
============================================

Now that you have a layout for your pages, it’s time to add a layout for blog posts!

Get ready to…

*   Create a new blog post layout for your Markdown files
*   Pass YAML frontmatter values as props to layout component

Add a layout to your blog posts
-------------------------------

[Section titled Add a layout to your blog posts](#add-a-layout-to-your-blog-posts)

When you include the `layout` frontmatter property in an `.md` file, all of your frontmatter YAML values are available to the layout file.

1.  Create a new file at `src/layouts/MarkdownPostLayout.astro`
    
2.  Copy the following code into `MarkdownPostLayout.astro`
    
    src/layouts/MarkdownPostLayout.astro
    
        ---const { frontmatter } = Astro.props;---<meta charset="utf-8" /><h1>{frontmatter.title}</h1><p>Written by {frontmatter.author}</p><slot />
    
3.  Add the following frontmatter property in `post-1.md`
    
    src/pages/posts/post-1.md
    
        ---layout: ../../layouts/MarkdownPostLayout.astrotitle: 'My First Blog Post'pubDate: 2022-07-01description: 'This is the first post of my new Astro blog.'author: 'Astro Learner'image:    url: 'https://docs.astro.build/assets/rose.webp'    alt: 'The Astro logo on a dark background with a pink glow.'tags: ["astro", "blogging", "learning in public"]---
    
4.  Check your browser preview again at `http://localhost:4321/posts/post-1` and notice what the layout has added to your page.
    
5.  Add the same layout property to your two other blog posts `post-2.md` and `post-3.md`. Verify in your browser that your layout is also applied to these posts.
    

Tip

When using layouts, you now have the option of including elements, like a page title, in the Markdown content or in the layout. Remember to visually inspect your page preview and make any adjustments necessary to avoid duplicated elements.

Try it yourself - Customize your blog post layout
-------------------------------------------------

[Section titled Try it yourself - Customize your blog post layout](#try-it-yourself---customize-your-blog-post-layout)

**Challenge**: Identify items common to every blog post, and use `MarkdownPostLayout.astro` to render them, instead of writing them in your Markdown in `post-1.md` and in every future blog post.

Here’s an example of refactoring your code to include the `pubDate` in the layout component instead of writing it in the body of your Markdown:

src/pages/posts/post-1.md

    Published on: 2022-07-01
    Welcome to my _new blog_ about learning Astro! Here, I will share my learning journey as I build a new website.

src/layouts/MarkdownPostLayout.astro

    ---const { frontmatter } = Astro.props;---<meta charset="utf-8" /><h1>{frontmatter.title}</h1><p>Published on: {frontmatter.pubDate.toString().slice(0,10)}</p><p>Written by {frontmatter.author}</p><slot />

Refactor as much as you think is useful to you, and add as much to your layout as you want, remembering that everything that you add to your layout is one less thing you will write in each and every blog post!

Here is an example of a refactored layout that leaves only individual blog post content rendered by the slot. Feel free to use this, or create your own!

src/layouts/MarkdownPostLayout.astro

    ---const { frontmatter } = Astro.props;---<meta charset="utf-8" /><h1>{frontmatter.title}</h1><p>{frontmatter.pubDate.toString().slice(0,10)}</p><p><em>{frontmatter.description}</em></p><p>Written by: {frontmatter.author}</p><img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} /><slot />

Avoid duplication

Anything rendered by your layout does **not** need to be typed into your blog post! If you notice any duplication when you check your browser preview, then be sure to remove content from your Markdown file.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

Can you figure out what should go in the blanks so that the following two components together produce working Astro code?

1.  src/pages/posts/learning-astro.md
    
        ---layout: ../../__________/MyMarkdownLayout.astrotitle: "Learning About Markdown in Astro"author: Astro Learner____: 2022-08-08---I learned so much today! Astro allows me to write in Markdown, but also use variables from the frontmatter. I can even access those values in an Astro layout component.
    
2.  src/layouts/MyMarkdownLayout.astro
    
        ---import ____________ from '../components/Footer.astro'const { ___________ } = Astro.props---<h1>{frontmatter.title}</h1><p>Written by: {frontmatter.______} on {frontmatter.pubDate}</p>< _______ /><Footer />
    
    Show the blanks filled in!
    
    1.  src/pages/posts/learning-astro.md
        
            ---layout: ../../layouts/MyMarkdownLayout.astrotitle: "Learning About Markdown in Astro"author: Astro LearnerpubDate: 2022-08-08---I learned so much today! Astro allows me to write in Markdown, but also use variables from the frontmatter. I can even access those values in an Astro layout component.
        
    2.  src/layouts/MyMarkdownLayout.astro
        
            ---import Footer from '../components/Footer.astro'const { frontmatter } = Astro.props---<h1>{frontmatter.title}</h1><p>Written by: {frontmatter.author} on {frontmatter.pubDate}</p><slot /><Footer />
        
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can add a layout property to a Markdown blog post in its YAML frontmatter.
*    I can create a separate layout for Markdown posts.
*    I can use values from a blog post’s frontmatter in a layout component.

### Resources

[Section titled Resources](#resources)

*   [Markdown Layouts in Astro](/en/guides/markdown-content/#frontmatter-layout-property)
    
*   [Markdown Layout Props](/en/basics/layouts/#markdown-layout-props)
    
*   [Introduction to YAML](https://dev.to/paulasantamaria/introduction-to-yaml-125f) external
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/4-layouts/2.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Build your first layout](/en/tutorial/4-layouts/1/) [Next  
Combine layouts to get the best of both worlds](/en/tutorial/4-layouts/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/4-layouts/3
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



