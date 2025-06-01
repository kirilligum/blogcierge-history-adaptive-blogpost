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