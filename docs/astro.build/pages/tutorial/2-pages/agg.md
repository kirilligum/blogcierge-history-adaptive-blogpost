Check in: Unit 2 - Pages
========================

Now that you have a working site on the web, it’s time to add pages and posts!

Looking ahead
-------------

[Section titled Looking ahead](#looking-ahead)

In this unit, you will:

*   Create your first Astro pages with the `.astro` syntax
*   Add blog posts with Markdown (`.md`) files
*   Style an individual page with `<style>`
*   Apply global styles across pages

Along the way, you’ll learn how the **two sections of a `.astro` file** work together to create a page, and how to use variables and conditional rendering on your pages.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I am ready to make some new pages for my Astro website!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Deploy your site to the web](/en/tutorial/1-setup/5/) [Next  
Create your first Astro page](/en/tutorial/2-pages/1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/tutorial/2-pages/1
Create your first Astro page
============================

Now that you know that `.astro` files are responsible for pages on your website, it’s time to create one!

Get ready to…

*   Create two new pages on your website: About and Blog
*   Add navigation links to your pages
*   Deploy an updated version of your website to the web

Create a new `.astro` file
--------------------------

[Section titled Create a new .astro file](#create-a-new-astro-file)

1.  In the files pane of your code editor, navigate to the folder `src/pages/` where you will see the existing file `index.astro`
    
2.  In that same folder, create a new file named `about.astro`.
    
3.  Copy, or retype the contents of `index.astro` into your new `about.astro` file.
    
    Tip
    
    Your editor might show a solid white circle on the tab label for this file. This means that the file is not yet saved. Under the File menu in VS Code, enable “Auto Save” and you should no longer need to save any files manually.
    
4.  Add `/about` to the end of your website preview’s URL in the address bar and check that you can see a page load there. (e.g. `http://localhost:4321/about`)
    

Right now, your “About” page should look exactly the same as the first page, but we’re going to change that!

Edit your page
--------------

[Section titled Edit your page](#edit-your-page)

Edit the HTML content to make this page about you.

To change or add more content to your About page, add more HTML element tags containing content. You can copy and paste the HTML code below between the existing `<body></body>` tags, or create your own.

src/pages/about.astro

    <body>  <h1>My Astro Site</h1>  <h1>About Me</h1>  <h2>... and my new Astro site!</h2>
      <p>I am working through Astro's introductory tutorial. This is the second page on my website, and it's the first one I built myself!</p>
      <p>This site will update as I complete more of the tutorial, so keep checking back and see how my journey is going!</p></body>

Now, visit your `/about` page in your browser tab again, and you should see your updated content.

Add navigation links
--------------------

[Section titled Add navigation links](#add-navigation-links)

To make it easier to preview all your pages, add HTML page navigation links before your `<h1>` at the top of both of your pages (`index.astro` and `about.astro`):

src/pages/about.astro

    <a href="/">Home</a><a href="/about/">About</a>
    <h1>About Me</h1><h2>... and my new Astro site!</h2>

Check that you can click these links to move back and forth between pages on your site.

Note

Unlike many frameworks, Astro uses standard HTML `<a>` elements to navigate between pages (also called _routes_), with traditional page refreshes.

Try it yourself - Add a Blog page
---------------------------------

[Section titled Try it yourself - Add a Blog page](#try-it-yourself---add-a-blog-page)

Add a third page `blog.astro` to your site, following the [same steps as above](#create-a-new-astro-file).

(Don’t forget to add a third navigation link to every page.)

Show me the steps.

1.  Create a new file at `src/pages/blog.astro`.
2.  Copy the entire contents of `index.astro` and paste them into `blog.astro`.
3.  [Add a third navigation link](#add-navigation-links) to the top of every page:

src/pages/index.astro

    <body>  <a href="/">Home</a>  <a href="/about/">About</a>  <a href="/blog/">Blog</a>
      <h1>My Astro Site</h1></body>

You should now have a website with three pages that all link to each other. It’s time to add some content to the Blog page.

Update the page content at `blog.astro` with:

src/pages/blog.astro

    <body>  <a href="/">Home</a>  <a href="/about/">About</a>  <a href="/blog/">Blog</a>
      <h1>My Astro Site</h1>  <h1>My Astro Learning Blog</h1>  <p>This is where I will post about my journey learning Astro.</p></body>

Preview your entire site by visiting all three pages in your browser preview and check that:

*   Every page correctly links to all three pages
*   Your two new pages each have their own descriptive heading
*   Your two new pages each have their own paragraph text

Publish your changes to the web
-------------------------------

[Section titled Publish your changes to the web](#publish-your-changes-to-the-web)

If you’ve followed our setup in Unit 1, you can publish your changes to your live website through Netlify.

When you are happy with the way your preview looks, **commit** your changes to your online repository at GitHub.

1.  In VS Code, preview the files that have changed since your last commit to GitHub.
    
    *   Go to the **Source Control tab** in the left menu. It should have a small “3” displayed.
        
    *   You should see `index.astro`, `about.astro`, and `blog.astro` listed as files that have changed.
        
2.  Enter a commit message (e.g. “Added two new pages - about and blog”) in the text box, and press Ctrl + Enter (macOS: Cmd ⌘ + Enter) to commit the change to your current workspace.
    
3.  Click the button to Sync Changes to GitHub.
    
4.  After waiting a few minutes, visit your Netlify URL to verify that your changes are published live.
    

Commit and deploy regularly

Follow these steps every time you pause working! Your changes will be updated in your GitHub repository. If you’ve deployed to a Netlify website, it will be rebuilt and republished.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can create a new page for my website and link to it from an existing page.
*    I can commit my changes back to GitHub and update my live site on Netlify.

### Resources

[Section titled Resources](#resources)

*   [File-based Routing in Astro](/en/basics/astro-pages/#file-based-routing)
    
*   [Astro page HTML](/en/basics/astro-pages/#astro-pages)
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Check in: Unit 2 - Pages](/en/tutorial/2-pages/) [Next  
Write your first Markdown blog post](/en/tutorial/2-pages/2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/2-pages/2
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



# Aggregated from ./pages/tutorial/2-pages/3
Add dynamic content about you
=============================

Now that you have a multi-page website with HTML content, it’s time to add some dynamic HTML!

Get ready to…

*   Define your page title in frontmatter, and use it in your HTML
*   Conditionally display HTML elements
*   Add some content about you

Any HTML file is valid Astro language. But, you can do more with Astro than just regular HTML!

Define and use a variable
-------------------------

[Section titled Define and use a variable](#define-and-use-a-variable)

Open `about.astro`, which should look like this:

src/pages/about.astro

    ------<html lang="en">  <head>    <meta charset="utf-8" />    <meta name="viewport" content="width=device-width" />    <title>Astro</title>  </head>  <body>    <a href="/">Home</a>    <a href="/about/">About</a>    <a href="/blog/">Blog</a>    <h1>About Me</h1>    <h2>... and my new Astro site!</h2>
        <p>I am working through Astro's introductory tutorial. This is the second page on my website, and it's the first one I built myself!</p>
        <p>This site will update as I complete more of the tutorial, so keep checking back and see how my journey is going!</p>  </body></html>

1.  Add the following line of JavaScript in the frontmatter script, between the **code fences**:
    
    src/pages/about.astro
    
        ---const pageTitle = "About Me";---
    
2.  Replace both the static “Astro” title and “About Me” heading in your HTML with the dynamic variable `{pageTitle}`.
    
    src/pages/about.astro
    
        <html lang="en">  <head>    <meta charset="utf-8" />    <meta name="viewport" content="width=device-width" />    <title>Astro</title>    <title>{pageTitle}</title>  </head>  <body>    <a href="/">Home</a>    <a href="/about/">About</a>    <a href="/blog/">Blog</a>    <h1>About Me</h1>    <h1>{pageTitle}</h1>    <h2>... and my new Astro site!</h2>
            <p>I am working through Astro's introductory tutorial. This is the second page on my website, and it's the first one I built myself!</p>
            <p>This site will update as I complete more of the tutorial, so keep checking back and see how my journey is going!</p>  </body></html>
    
3.  Refresh the live preview of your `/about` page.
    
    Your page text should look the same, and your page title displayed in your browser tab should now read “About Me” instead of “Astro.”
    
    Instead of typing text directly into HTML tags, you just **defined and then used a variable** in the two sections of your `.astro` file, respectively.
    
4.  Use the same pattern to create a `pageTitle` value to use in `index.astro` (“Home Page”) and `blog.astro` (“My Astro Learning Blog”). Update the HTML of these pages in both places so that your page title matches the heading displayed on each page.
    

Takeaways

1.  **Define** variables in your Astro script using JavaScript or TypeScript expressions.
2.  **Use** these variables in your Astro template inside curly braces `{ }` to tell Astro you’re using some JavaScript.

Write JavaScript expressions in Astro
-------------------------------------

[Section titled Write JavaScript expressions in Astro](#write-javascript-expressions-in-astro)

1.  Add the following JavaScript to your frontmatter, between the **code fences**:
    
    (You can customize the code for yourself, but this tutorial will use the following example.)
    
    src/pages/about.astro
    
        ---const pageTitle = "About Me";
        const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};
        const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];---
    
2.  Then, add the following code to your HTML template, below your existing content:
    
    src/pages/about.astro
    
        <p>Here are a few facts about me:</p><ul>  <li>My name is {identity.firstName}.</li>  <li>I live in {identity.country} and I work as a {identity.occupation}.</li>  {identity.hobbies.length >= 2 &&    <li>Two of my hobbies are: {identity.hobbies[0]} and {identity.hobbies[1]}</li>  }</ul><p>My skills are:</p><ul>  {skills.map((skill) => <li>{skill}</li>)}</ul>
    

Takeaways

1.  Writing an Astro template is very much like **writing HTML**, but you can include JavaScript expressions within it.
2.  The Astro frontmatter script contains only JavaScript.
3.  You can use all modern JavaScript **logical operators**, **expressions** and **functions** in either section of your `.astro` file. But, curly braces are necessary (only) in the HTML template body.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  A `.astro` file’s frontmatter is written in:
    
    1.  HTML
    2.  YAML
    3.  JavaScript
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  In addition to HTML, Astro syntax allows you to include:
    
    1.  JavaScript logical operators, expressions and functions
    2.  YAML
    3.  Markdown
    
    Submit
    
3.  When do you need to write your JavaScript inside curly braces?
    
    1.  When you’re not sure whether it’s correct.
        
    2.  When inside the HTML template section of an Astro component.
        
    3.  Between the code fences in an Astro component.
        
    
    Submit
    

Conditionally render elements
-----------------------------

[Section titled Conditionally render elements](#conditionally-render-elements)

You can also use your script variables to choose **whether or not** to render individual elements of your HTML `<body>` content.

1.  Add the following lines to your frontmatter script to **define variables**:
    
    src/pages/about.astro
    
        ---const pageTitle = "About Me";
        const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};
        const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];
        const happy = true;const finished = false;const goal = 3;---
    
2.  Add the following lines below your existing paragraphs.
    
    Then, check the live preview in your browser tab to see what is displayed on the page:
    
    src/pages/about.astro
    
        {happy && <p>I am happy to be learning Astro!</p>}
        {finished && <p>I finished this tutorial!</p>}
        {goal === 3 ? <p>My goal is to finish in 3 days.</p> : <p>My goal is not 3 days.</p>}
    
3.  Commit your changes to GitHub before moving on. Do this any time you want to save your work and update your live website.
    

Tip

Astro’s templating syntax is similar to JSX syntax. If you’re ever wondering how to use your script in your HTML, then searching for how it is done in JSX is probably a good starting point!

### Analyze the Pattern

[Section titled Analyze the Pattern](#analyze-the-pattern)

Given the following `.astro` script:

src/pages/about.astro

    ---const operatingSystem = "Linux";const quantity = 3;const footwear = "boots";const student = false;---

For each Astro template expression, can you predict the HTML (if any!) that will be sent to the browser? Click to reveal if you’re right!

1.  `<p>{operatingSystem}</p>`
    
     `<p>Linux</p>` class t extends HTMLElement{constructor(){super(),this.querySelector("input")?.addEventListener("click",e=>{e.target instanceof HTMLInputElement&&(e.target.checked=e.target.disabled=!0)},{once:!0})}}customElements.define("ad-spoiler",t);
    
2.  `{student && <p>I am still in school.</p>}`
    
     Nothing will display because `student` evaluates to false.
    
3.  `<p>I have {quantity + 8} pairs of {footwear}</p>`
    
     `<p>I have 11 pairs of boots</p>`
    
4.  `{operatingSystem === "MacOS" ? <p>I am using a Mac.</p> : <p>I am not using a Mac.</p>}`
    
     `<p>I am not using a Mac.</p>`
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can define values in and use values in `.astro` files.
*    I can conditionally render HTML elements.

### Resources

[Section titled Resources](#resources)

*   [Dynamic expressions in Astro](/en/reference/astro-syntax/#jsx-like-expressions)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Write your first Markdown blog post](/en/tutorial/2-pages/2/) [Next  
Style your About page](/en/tutorial/2-pages/4/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/2-pages/4
Style your About page
=====================

Now that you have an About page with content about you, it’s time to style it!

Get ready to…

*   Style items on a single page
*   Use CSS variables

Style an individual page
------------------------

[Section titled Style an individual page](#style-an-individual-page)

Using Astro’s own `<style></style>` tags, you can style items on your page. Adding **attributes** and **directives** to these tags gives you even more ways to style.

1.  Copy the following code and paste it into `src/pages/about.astro`:
    
    src/pages/about.astro
    
        <html lang="en">  <head>    <meta charset="utf-8" />    <meta name="viewport" content="width=device-width" />    <title>{pageTitle}</title>    <style>      h1 {        color: purple;        font-size: 4rem;      }    </style>  </head>
    
    Check all three pages in your browser preview.
    
    *   Which color is the page title of:
        
        *   Your Home page? black class t extends HTMLElement{constructor(){super(),this.querySelector("input")?.addEventListener("click",e=>{e.target instanceof HTMLInputElement&&(e.target.checked=e.target.disabled=!0)},{once:!0})}}customElements.define("ad-spoiler",t);
        *   Your About page?  purple
        *   Your Blog page?  black
    *   The page with the biggest title text is?  Your About page
        
    
    Tip
    
    If you are unable to determine colors visually, you can use the dev tools in your browser to inspect the `<h1>` title elements and verify the text color applied.
    
2.  Add the class name `skill` to the generated `<li>` elements on your About page, so you can style them. Your code should now look like this:
    
    src/pages/about.astro
    
        <p>My skills are:</p><ul>  {skills.map((skill) => <li class="skill">{skill}</li>)}</ul>
    
3.  Add the following code to your existing style tag:
    
    src/pages/about.astro
    
        <style>  h1 {    color: purple;    font-size: 4rem;  }  .skill {    color: green;    font-weight: bold;  }</style>
    
4.  Visit your About page in your browser again, and verify, through visual inspection or dev tools, that each item in your list of skills is now green and bold.
    

Use your first CSS variable
---------------------------

[Section titled Use your first CSS variable](#use-your-first-css-variable)

The Astro `<style>` tag can also reference any variables from your frontmatter script using the `define:vars={ {...} }` directive. You can **define variables within your code fence**, then **use them as CSS variables in your style tag**.

1.  Define a `skillColor` variable by adding it to the frontmatter script of `src/pages/about.astro` like this:
    
    src/pages/about.astro
    
        ---const pageTitle = "About Me";
        const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};
        const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];
        const happy = true;const finished = false;const goal = 3;
        const skillColor = "navy";---
    
2.  Update your existing `<style>` tag below to first define, then use this `skillColor` variable inside double curly braces.
    
    src/pages/about.astro
    
        <style define:vars={{skillColor}}>  h1 {    color: purple;    font-size: 4rem;  }  .skill {    color: green;    color: var(--skillColor);    font-weight: bold;  }</style>
    
3.  Check your About page in your browser preview. You should see that the skills are now navy blue, as set by the `skillColor` variable passed to the `define:vars` directive.
    

Try it yourself - Define CSS variables
--------------------------------------

[Section titled Try it yourself - Define CSS variables](#try-it-yourself---define-css-variables)

1.  Update the `<style>` tag on your About page so that it matches the one below.
    
    src/pages/about.astro
    
        <style define:vars={{skillColor, fontWeight, textCase}}>  h1 {    color: purple;    font-size: 4rem;  }  .skill {    color: var(--skillColor);    font-weight: var(--fontWeight);    text-transform: var(--textCase);  }</style>
    
2.  Add any missing variable definitions in your frontmatter script so that your new `<style>` tag successfully applies these styles to your list of skills:
    
    *   The text color is navy blue
    *   The text is bold
    *   The list items are in all-caps (all uppercase letters)

✅ Show me the code! ✅

src/pages/about.astro

    ---const pageTitle = "About Me";
    const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};
    const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];
    const happy = true;const finished = false;const goal = 3;
    const skillColor = "navy";const fontWeight = "bold";const textCase = "uppercase";---

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can add CSS styles to an individual page using an Astro `<style>` tag.
*    I can use variables to style elements on the page.

### Resources

[Section titled Resources](#resources)

*   [Astro syntax vs JSX - comparison](/en/reference/astro-syntax/#differences-between-astro-and-jsx)
    
*   [Astro `<style>` tag](/en/guides/styling/#styling-in-astro)
    
*   [CSS variables in Astro](/en/guides/styling/#css-variables)
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/4.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Add dynamic content about you](/en/tutorial/2-pages/3/) [Next  
Add site-wide styling](/en/tutorial/2-pages/5/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/2-pages/5
Add site-wide styling
=====================

Now that you have a styled About page, it’s time to add some global styles for the rest of your site!

Get ready to…

*   Apply styles globally

Add a global stylesheet
-----------------------

[Section titled Add a global stylesheet](#add-a-global-stylesheet)

You have seen that the Astro `<style>` tag is **scoped by default**, meaning that it only affects the elements in its own file.

There are a few ways to define styles **globally** in Astro, but in this tutorial, you will create and import a `global.css` file into each of your pages. This combination of stylesheet and `<style>` tag gives you the ability to control some styles site-wide, and to apply some specific styles exactly where you want them.

1.  Create a new file at the location `src/styles/global.css` (You’ll have to create a `styles` folder first.)
    
2.  Copy the following code into your new file, `global.css`
    
    src/styles/global.css
    
        html {  background-color: #f1f5f9;  font-family: sans-serif;}
        body {  margin: 0 auto;  width: 100%;  max-width: 80ch;  padding: 1rem;  line-height: 1.5;}
        * {  box-sizing: border-box;}
        h1 {  margin: 1rem 0;  font-size: 2.5rem;}
    
3.  In `about.astro`, add the following import statement to your frontmatter:
    
    src/pages/about.astro
    
        ---import '../styles/global.css';
        const pageTitle = "About Me";
        const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};
        const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];
        const happy = true;const finished = false;const goal = 3;
        const skillColor = "navy";const fontWeight = "bold";const textCase = "uppercase";---
    
4.  Check the browser preview of your About page, and you should now see new styles applied!
    

Try it yourself - Import your global stylesheet
-----------------------------------------------

[Section titled Try it yourself - Import your global stylesheet](#try-it-yourself---import-your-global-stylesheet)

Add the necessary line of code to each `.astro` file in your project to apply your global styles to every page of your site.

✅ Show me the code! ✅

Add the following import statement to the two other page files: `src/pages/index.astro` and `src/pages/blog.astro`

src/pages/index.astro

    ---import '../styles/global.css';---

Make any changes or additions you want to the content of your About page by adding HTML elements to the page template, either statically or dynamically. Write any additional JavaScript in your frontmatter script to provide you with values to use in your HTML. When you are happy with this page, commit your changes to GitHub before moving on to the next lesson.

### Analyze the Pattern

[Section titled Analyze the Pattern](#analyze-the-pattern)

Your About page is now styled using _both_ the imported `global.css` file _and_ a `<style>` tag.

*   Are styles from both styling methods being applied?
    
     Yes class t extends HTMLElement{constructor(){super(),this.querySelector("input")?.addEventListener("click",e=>{e.target instanceof HTMLInputElement&&(e.target.checked=e.target.disabled=!0)},{once:!0})}}customElements.define("ad-spoiler",t);
    
*   Are there any conflicting styles, and if so, which are applied?
    
     Yes, `<h1>` has a size of `2.5rem` globally, but `4rem` locally in the `<style>` tag. The local `4rem` rule is applied on the About page.
    
*   Describe how `global.css` and `<style>` work together.
    
     When conflicting styles are defined both globally and in a page’s local `<style>` tag, the local styles should overwrite any global styles. (But, there can be other factors involved, so always visually inspect your site to make sure your styles are properly applied!)
    
*   How would you choose whether to declare a style in a `global.css` file or a `<style>` tag?
    
     If you want a style to be applied site-wide, you would choose to use a `global.css` file. However, if you want styles to apply to only the HTML content in a single `.astro` file, and not affect other elements on your site, you would choose a `<style>` tag.
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can add global CSS styles by importing a `.css` file.

### Resources

[Section titled Resources](#resources)

*   [Astro syntax vs JSX - comparison](/en/reference/astro-syntax/#differences-between-astro-and-jsx)
    
*   [Astro `<style>` tag](/en/guides/styling/#styling-in-astro)
    
*   [CSS variables in Astro](/en/guides/styling/#css-variables)
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/5.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Style your About page](/en/tutorial/2-pages/4/) [Next  
Check in: Unit 3 - Components](/en/tutorial/3-components/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



