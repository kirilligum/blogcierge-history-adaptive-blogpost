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

