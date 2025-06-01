Check in: Unit 3 - Components
=============================

Now that you have `.astro` and `.md` files generating entire pages on your website, it’s time to make and reuse smaller bits of HTML with Astro components!

Looking ahead
-------------

[Section titled Looking ahead](#looking-ahead)

In this unit, you’ll learn how to create **Astro components** to reuse code for common elements across your website.

You’ll build:

*   A Navigation component that presents a menu of links to your pages
*   A Footer component to include at the bottom of each page
*   A Social Media component, used in the Footer, that links to profile pages
*   An interactive Hamburger component to toggle the Navigation on mobile

Along the way, you’ll use CSS and JavaScript to build a responsive design that reacts to screen sizes and user input.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I am ready to build some Astro components!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/3-components/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Add site-wide styling](/en/tutorial/2-pages/5/) [Next  
Make a reusable Navigation component](/en/tutorial/3-components/1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/tutorial/3-components/1
Make a reusable Navigation component
====================================

Now that you have the same HTML written in multiple pages of your Astro site, it’s time to replace that duplicated content with a reusable Astro component!

Get ready to…

*   Create a new folder for components
*   Build an Astro component to display your navigation links
*   Replace existing HTML with a new, reusable navigation component

Create a new `src/components/` folder
-------------------------------------

[Section titled Create a new src/components/ folder](#create-a-new-srccomponents-folder)

To hold `.astro` files that will generate HTML but that will not become new pages on your website, you will need a new folder in your project: `src/components/`.

Create a Navigation component
-----------------------------

[Section titled Create a Navigation component](#create-a-navigation-component)

1.  Create a new file: `src/components/Navigation.astro`.
    
2.  Copy your links to navigate between pages from the top of any page and paste them into your new file, `Navigation.astro`:
    
    src/components/Navigation.astro
    
        ------<a href="/">Home</a><a href="/about/">About</a><a href="/blog/">Blog</a>
    
    Tip
    
    If there is nothing in the frontmatter of your `.astro` file, you don’t have to write the code fences. You can always add them back in when you need them.
    

### Import and use Navigation.astro

[Section titled Import and use Navigation.astro](#import-and-use-navigationastro)

1.  Go back to `index.astro` and import your new component inside the code fence:
    
    src/pages/index.astro
    
        ---import Navigation from '../components/Navigation.astro';import "../styles/global.css";
        const pageTitle = "Home Page";---
    
2.  Then below, replace the existing navigation HTML link elements with the new navigation component you just imported:
    
    src/pages/index.astro
    
        <a href="/">Home</a><a href="/about/">About</a><a href="/blog/">Blog</a><Navigation />
    
3.  Check the preview in your browser and notice that it should look exactly the same… and that’s what you want!
    

Your site contains the same HTML as it did before. But now, those three lines of code are provided by your `<Navigation />` component.

Try it yourself - Add navigation to the rest of your site
---------------------------------------------------------

[Section titled Try it yourself - Add navigation to the rest of your site](#try-it-yourself---add-navigation-to-the-rest-of-your-site)

Import and use the `<Navigation />` component in the other two pages on your site (`about.astro` and `blog.astro`) using the same method.

Don’t forget to

*   Add an import statement at the top of the component script, inside the code fence.
*   Replace the existing code with the navigation component.

Note

When you restructure your code but do not change the way your page looks in the browser, you are **refactoring**. You will **refactor** several times in this unit as you replace parts of your page HTML with components.

This allows you to get started quickly with any working code, often duplicated throughout your project. Then, you can improve your existing code’s design incrementally without changing the outward appearance of your site.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  You can do this when you have elements repeated on multiple pages:
    
    1.  restart the dev server
        
    2.  refactor to use a reusable component
        
    3.  make a new page
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  Astro components are:
    
    1.  reusable
        
    2.  fragments of HTML
        
    3.  both of the above!
        
    
    Submit
    
3.  Astro components will automatically create a new page on your site when you…
    
    1.  include `<html></html>`
        
    2.  refactor
        
    3.  put the `.astro` file within `src/pages/`
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can refactor content into reusable components.
*    I can add a new component to an `.astro` page.

### Resources

[Section titled Resources](#resources)

*   [Astro Component Overview](/en/basics/astro-components/)
    
*   [Refactoring](https://refactoring.com/) external
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/3-components/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Check in: Unit 3 - Components](/en/tutorial/3-components/) [Next  
Create a social media footer](/en/tutorial/3-components/2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/3-components/2
Create a social media footer
============================

Get ready to…

*   Create a Footer component
*   Create and pass props to a Social Media component

Now that you have used Astro components on a page, it’s time to use a component within another component!

Create a Footer Component
-------------------------

[Section titled Create a Footer Component](#create-a-footer-component)

1.  Create a new file at the location `src/components/Footer.astro`.
    
2.  Copy the following code into your new file, `Footer.astro`.
    
    src/components/Footer.astro
    
        ---const platform = "github";const username = "withastro";---
        <footer>  <p>Learn more about my projects on <a href={`https://www.${platform}.com/${username}`}>{platform}</a>!</p></footer>
    

### Import and use `Footer.astro`

[Section titled Import and use Footer.astro](#import-and-use-footerastro)

1.  Add the following import statement to the frontmatter in each of your three Astro pages (`index.astro`, `about.astro`, and `blog.astro`):
    
        import Footer from '../components/Footer.astro';
    
2.  Add a new `<Footer />` component in your Astro template on each page, just before the closing `</body>` tag to display your footer at the bottom of the page.
    
            <Footer />  </body></html>
    
3.  In your browser preview, check that you can see your new footer text on each page.
    

Try it yourself - Personalize your footer
-----------------------------------------

[Section titled Try it yourself - Personalize your footer](#try-it-yourself---personalize-your-footer)

Customize your footer to display multiple social networks (e.g. Instagram, Twitter, LinkedIn) and include your username to link directly to your own profile.

### Code Check-In

[Section titled Code Check-In](#code-check-in)

If you’ve been following along with each step in the tutorial, your `index.astro` file should look like this:

src/pages/index.astro

    ---import Navigation from '../components/Navigation.astro';import Footer from '../components/Footer.astro';import '../styles/global.css';
    const pageTitle = 'Home Page';---
    <html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <meta name="generator" content={Astro.generator} />    <title>{pageTitle}</title>  </head>  <body>    <Navigation />    <h1>{pageTitle}</h1>    <Footer />  </body></html>

Create a Social Media component
-------------------------------

[Section titled Create a Social Media component](#create-a-social-media-component)

Since you might have multiple online accounts you can link to, you can make a single, reusable component and display it multiple times. Each time, you will pass it different properties (`props`) to use: the online platform and your username there.

1.  Create a new file at the location `src/components/Social.astro`.
    
2.  Copy the following code into your new file, `Social.astro`.
    
    src/components/Social.astro
    
        ---const { platform, username } = Astro.props;---<a href={`https://www.${platform}.com/${username}`}>{platform}</a>
    

### Import and use `Social.astro` in your Footer

[Section titled Import and use Social.astro in your Footer](#import-and-use-socialastro-in-your-footer)

1.  Change the code in `src/components/Footer.astro` to import, then use this new component three times, passing different **component attributes** as props each time:
    
    src/components/Footer.astro
    
        ---const platform = "github";const username = "withastro";import Social from './Social.astro';---
        <footer>  <p>Learn more about my projects on <a href={`https://www.${platform}.com/${username}`}>{platform}</a>!</p>  <Social platform="twitter" username="astrodotbuild" />  <Social platform="github" username="withastro" />  <Social platform="youtube" username="astrodotbuild" /></footer>
    
2.  Check your browser preview, and you should see your new footer displaying links to these three platforms on each page.
    

Style your Social Media Component
---------------------------------

[Section titled Style your Social Media Component](#style-your-social-media-component)

1.  Customize the appearance of your links by adding a `<style>` tag to `src/components/Social.astro`.
    
    src/components/Social.astro
    
        ---const { platform, username } = Astro.props;---<a href={`https://www.${platform}.com/${username}`}>{platform}</a>
        <style>  a {    padding: 0.5rem 1rem;    color: white;    background-color: #4c1d95;    text-decoration: none;  }</style>
    
2.  Add a `<style>` tag to `src/components/Footer.astro` to improve the layout of its contents.
    
    src/components/Footer.astro
    
        ---import Social from './Social.astro';---<style>  footer {    display: flex;    gap: 1rem;    margin-top: 2rem;  }</style>
        <footer>  <Social platform="twitter" username="astrodotbuild" />  <Social platform="github" username="withastro" />  <Social platform="youtube" username="astrodotbuild" /></footer>
    
3.  Check your browser preview again and confirm that each page shows an updated footer.
    

### Test Yourself

[Section titled Test Yourself](#test-yourself)

1.  What line of code do you need to write in an Astro component’s frontmatter to receive values of `title`, `author`, and `date` as props?
    
    1.  `const { title, author, date } = Astro.props;`
        
    2.  `import BlogPost from '../components/BlogPost.astro'`
        
    3.  `<BlogPost title="My First Post" author="Dan" date="12 Aug 2022" />`
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  How do you **pass values as props** to an Astro component?
    
    1.  `const { title, author, date } = Astro.props;`
        
    2.  `import BlogPost from '../components/BlogPost.astro'`
        
    3.  `<BlogPost title="My First Post" author="Dan" date="12 Aug 2022" />`
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can create new `.astro` components in `src/components/`
*    I can import and use Astro components inside other Astro components.
*    I can pass props to an Astro component.

### Resources

[Section titled Resources](#resources)

*   [Component Props in Astro](/en/basics/astro-components/#component-props)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/3-components/2.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Make a reusable Navigation component](/en/tutorial/3-components/1/) [Next  
Build it yourself - Header](/en/tutorial/3-components/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/3-components/3
Build it yourself - Header
==========================

Since your site will be viewed on different devices, it’s time to create a page navigation that can respond to multiple screen sizes!

Get ready to…

*   Create a Header for your site that contains the Navigation component
*   Make the Navigation component responsive

Try it yourself - Build a new Header component
----------------------------------------------

[Section titled Try it yourself - Build a new Header component](#try-it-yourself---build-a-new-header-component)

1.  Create a new Header component. Import and use your existing `Navigation.astro` component inside a `<nav>` element which is inside a `<header>` element.
    
    Show me the code!
    
    Create a file named `Header.astro` in `src/components/`
    
    src/components/Header.astro
    
        ---import Navigation from './Navigation.astro';---<header>  <nav>    <Navigation />  </nav></header>
    

Try it yourself - Update your pages
-----------------------------------

[Section titled Try it yourself - Update your pages](#try-it-yourself---update-your-pages)

1.  On each page, replace your existing `<Navigation/>` component with your new header.
    
    Show me the code!
    
    src/pages/index.astro
    
        ---import Navigation from '../components/Navigation.astro';import Header from '../components/Header.astro';import Footer from '../components/Footer.astro';import '../styles/global.css';const pageTitle = "Home Page";---<html lang="en">  <head>    <meta charset="utf-8" />    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />    <meta name="viewport" content="width=device-width" />    <meta name="generator" content={Astro.generator} />    <title>{pageTitle}</title>  </head>  <body>    <Navigation />    <Header />    <h1>{pageTitle}</h1>    <Footer />  </body></html>
    
2.  Check your browser preview and verify that your header is displayed on every page. It won’t look different yet, but if you inspect your preview using dev tools, you will see that you now have elements like `<header>` and `<nav>` around your navigation links.
    

Add responsive styles
---------------------

[Section titled Add responsive styles](#add-responsive-styles)

1.  Update `Navigation.astro` with the CSS class to control your navigation links. Wrap the existing navigation links in a `<div>` with the class `nav-links`.
    
    src/components/Navigation.astro
    
        ------<div class="nav-links">  <a href="/">Home</a>  <a href="/about">About</a>  <a href="/blog">Blog</a></div>
    
2.  Copy the CSS styles below into `global.css`. These styles:
    
    *   Style and position the navigation links for mobile
    *   Include an `expanded` class that can be toggled to display or hide the links on mobile
    *   Use a `@media` query to define different styles for larger screen sizes
    
    Mobile-first design
    
    Start by defining what should happen on small screen sizes first! Smaller screen sizes require simpler layouts. Then, adjust your styles to accommodate larger devices. If you design the complicated case first, then you have to work to try to make it simple again.
    
    src/styles/global.css
    
        html {  background-color: #f1f5f9;  font-family: sans-serif;}
        body {  margin: 0 auto;  width: 100%;  max-width: 80ch;  padding: 1rem;  line-height: 1.5;}
        * {  box-sizing: border-box;}
        h1 {  margin: 1rem 0;  font-size: 2.5rem;}
        /* nav styles */
        .nav-links {  width: 100%;  top: 5rem;  left: 48px;  background-color: #ff9776;  display: none;  margin: 0;}
        .nav-links a {  display: block;  text-align: center;  padding: 10px 0;  text-decoration: none;  font-size: 1.2rem;  font-weight: bold;  text-transform: uppercase;}
        .nav-links a:hover,.nav-links a:focus {  background-color: #ff9776;}
        .expanded {  display: unset;}
        @media screen and (min-width: 636px) {  .nav-links {    margin-left: 5em;    display: block;    position: static;    width: auto;    background: none;  }
          .nav-links a {    display: inline-block;    padding: 15px 20px;  }
        }
    

Resize your window and look for different styles being applied at different screen widths. Your header is now **responsive** to screen size through the use of `@media` queries.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can use CSS to add responsive elements to my site.

### Resources

[Section titled Resources](#resources)

*   [Component-based Design](https://www.droptica.com/blog/component-based-design/) external
    
*   [Semantic HTML Tags](https://www.dofactory.com/html/semantics) external
    
*   [Mobile-first Design](https://www.mobileapps.com/blog/mobile-first-design) external
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/3-components/3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Create a social media footer](/en/tutorial/3-components/2/) [Next  
Send your first script to the browser](/en/tutorial/3-components/4/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/3-components/4
Send your first script to the browser
=====================================

Let’s add a hamburger menu to open and close your links on mobile screen sizes, requiring some client-side interactivity!

Get ready to…

*   Create a hamburger menu component
*   Write a `<script>` to allow your site visitors to open and close the navigation menu
*   Move your JavaScript to its `.js` file

Build a Hamburger component
---------------------------

[Section titled Build a Hamburger component](#build-a-hamburger-component)

Create a `<Hamburger />` component to open and close your mobile menu.

1.  Create a file named `Hamburger.astro` in `src/components/`
    
2.  Copy the following code into your component. This will represent your 3-line “hamburger” menu to open and close your navigation links on mobile. (You will add the new CSS styles to `global.css` later.)
    
    src/components/Hamburger.astro
    
        ------<div class="hamburger">  <span class="line"></span>  <span class="line"></span>  <span class="line"></span></div>
    
3.  Place this new `<Hamburger />` component just before your `<Navigation />` component in `Header.astro`.
    
    Show me the code!
    
    src/components/Header.astro
    
        ---import Hamburger from './Hamburger.astro';import Navigation from './Navigation.astro';---<header>  <nav>    <Hamburger />    <Navigation />  </nav></header>
    
4.  Add the following styles for your Hamburger component:
    
    src/styles/global.css
    
        /* nav styles */.hamburger {  padding-right: 20px;  cursor: pointer;}
        .hamburger .line {  display: block;  width: 40px;  height: 5px;  margin-bottom: 10px;  background-color: #ff9776;}
        .nav-links {  width: 100%;  top: 5rem;  left: 48px;  background-color: #ff9776;  display: none;  margin: 0;}
        .nav-links a {  display: block;  text-align: center;  padding: 10px 0;  text-decoration: none;  font-size: 1.2rem;  font-weight: bold;  text-transform: uppercase;}
        .nav-links a:hover, a:focus {  background-color: #ff9776;}
        .expanded {  display: unset;}
        @media screen and (min-width: 636px) {  .nav-links {    margin-left: 5em;    display: block;    position: static;    width: auto;    background: none;  }
          .nav-links a {    display: inline-block;    padding: 15px 20px;  }
          .hamburger {    display: none;  }}
    

Write your first script tag
---------------------------

[Section titled Write your first script tag](#write-your-first-script-tag)

Your header is not yet **interactive** because it can’t respond to user input, like clicking on the hamburger menu to show or hide the navigation links.

Adding a `<script>` tag provides client-side JavaScript to “listen” for a user event and then respond accordingly.

1.  Add the following `<script>` tag to `index.astro`, just before the closing `</body>` tag.
    
    src/pages/index.astro
    
          <Footer />  <script>    document.querySelector('.hamburger')?.addEventListener('click', () => {      document.querySelector('.nav-links')?.classList.toggle('expanded');    });  </script></body>
    
2.  Check your browser preview again at various sizes, and verify that you have a working navigation menu that is both responsive to screen size and responds to user input on this page.
    

### Importing a `.js` file

[Section titled Importing a .js file](#importing-a-js-file)

Instead of writing your JavaScript directly on each page, you can move the contents of your `<script>` tag into its own `.js` file in your project.

1.  Create `src/scripts/menu.js` (you will have to create a new `/scripts/` folder) and move your JavaScript into it.
    
    src/scripts/menu.js
    
        document.querySelector('.hamburger').addEventListener('click', () => {  document.querySelector('.nav-links').classList.toggle('expanded');});
    
2.  Replace the contents of the `<script>` tag on `index.astro` with the following file import:
    
    src/pages/index.astro
    
          <Footer />  <script>    document.querySelector('.hamburger')?.addEventListener('click', () => {      document.querySelector('.nav-links')?.classList.toggle('expanded');    });
            import "../scripts/menu.js";  </script></body>
    
3.  Check your browser preview again at a smaller size and verify that the hamburger menu still opens and closes your navigation links.
    
4.  Add the same `<script>` with import to your other two pages, `about.astro` and `blog.astro` and verify that you have a responsive, interactive header on each page.
    
    src/pages/about.astro & src/pages/blog.astro
    
          <Footer />  <script>    import "../scripts/menu.js";  </script></body>
    

Takeaway

You had previously used some JavaScript to build parts of your site:

*   Defining your page title and heading dynamically
*   Mapping through a list of skills on the About page
*   Conditionally displaying HTML elements

Those commands are all executed at build time to create static HTML for your site, and then the code is “thrown away.”

**The JavaScript in a `<script>` tag is sent to the browser**, and is available to run, based on user interactions like refreshing a page or toggling an input.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  When does Astro run any JavaScript written in a component’s frontmatter?
    
    1.  Astro never runs JavaScript
        
    2.  at build-time
        
    3.  When a visitor clicks a button
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  Optionally, Astro can send JavaScript to the browser to allow:
    
    1.  users to click page links
        
    2.  faster load times
        
    3.  client-side interactivity
        
    
    Submit
    
3.  The client-side JavaScript will be sent to a user’s browser when it is written or imported:
    
    1.  in `<script>` tags
        
    2.  between a `.astro` file’s code fences
        
    3.  in `global.css`
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can add client-side interactivity with JavaScript in a `<script>` tag.
*    I can import a `.js` file into a `<script>` tag.

### Resources

[Section titled Resources](#resources)

[Client-side scripts in Astro](/en/guides/client-side-scripts/)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/3-components/4.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Build it yourself - Header](/en/tutorial/3-components/3/) [Next  
Check in: Unit 4 - Layouts](/en/tutorial/4-layouts/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



