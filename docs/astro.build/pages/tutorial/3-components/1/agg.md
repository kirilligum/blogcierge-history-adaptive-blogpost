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

