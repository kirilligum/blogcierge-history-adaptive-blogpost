Back on dry land. Take your blog from day to night, no island required!
=======================================================================

Now that you can build Astro islands for interactive elements, don’t forget that you can go pretty far with just vanilla JavaScript and CSS!

Let’s build a clickable icon to let your users toggle between light or dark mode using another `<script>` tag for interactivity… with no framework JavaScript sent to the browser.

Get ready to…

*   Build an interactive theme toggle with only JavaScript and CSS
*   Send as little JavaScript to the browser as possible!

Add and style a theme toggle icon
---------------------------------

[Section titled Add and style a theme toggle icon](#add-and-style-a-theme-toggle-icon)

1.  Create a new file at `src/components/ThemeIcon.astro` and paste the following code into it:
    
    src/components/ThemeIcon.astro
    
        ------<button id="themeToggle">  <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">    <path class="sun" fill-rule="evenodd" d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm12-7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1 0-1.6h2.4a.8.8 0 0 1 .8.8zM4 12a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1 0-1.6h2.5a.8.8 0 0 1 .8.8zm16.5-8.5a.8.8 0 0 1 0 1l-1.8 1.8a.8.8 0 0 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM6.3 17.7a.8.8 0 0 1 0 1l-1.7 1.8a.8.8 0 1 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM12 0a.8.8 0 0 1 .8.8v2.5a.8.8 0 0 1-1.6 0V.8A.8.8 0 0 1 12 0zm0 20a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-1.6 0v-2.4a.8.8 0 0 1 .8-.8zM3.5 3.5a.8.8 0 0 1 1 0l1.8 1.8a.8.8 0 1 1-1 1L3.5 4.6a.8.8 0 0 1 0-1zm14.2 14.2a.8.8 0 0 1 1 0l1.8 1.7a.8.8 0 0 1-1 1l-1.8-1.7a.8.8 0 0 1 0-1z"/>    <path class="moon" fill-rule="evenodd" d="M16.5 6A10.5 10.5 0 0 1 4.7 16.4 8.5 8.5 0 1 0 16.4 4.7l.1 1.3zm-1.7-2a9 9 0 0 1 .2 2 9 9 0 0 1-11 8.8 9.4 9.4 0 0 1-.8-.3c-.4 0-.8.3-.7.7a10 10 0 0 0 .3.8 10 10 0 0 0 9.2 6 10 10 0 0 0 4-19.2 9.7 9.7 0 0 0-.9-.3c-.3-.1-.7.3-.6.7a9 9 0 0 1 .3.8z"/>  </svg></button>
        <style>  #themeToggle {    border: 0;    background: none;  }  .sun { fill: black; }  .moon { fill: transparent; }
          :global(.dark) .sun { fill: transparent; }  :global(.dark) .moon { fill: white; }</style>
    
2.  Add the icon to `Header.astro` so that it will be displayed on all pages. Don’t forget to import the component.
    
    src/components/Header.astro
    
        ---import Hamburger from './Hamburger.astro';import Navigation from './Navigation.astro';import ThemeIcon from './ThemeIcon.astro';---<header>  <nav>    <Hamburger />    <ThemeIcon />    <Navigation />  </nav></header>
    
3.  Visit your browser preview at `http://localhost:4321` to see the icon now on all your pages. You can try clicking it, but you have not written a script to make it interactive yet.
    

Add CSS styling for a dark theme
--------------------------------

[Section titled Add CSS styling for a dark theme](#add-css-styling-for-a-dark-theme)

Choose some alternate colors to use in dark mode.

1.  In `global.css`, define some dark styles. You can choose your own, or copy and paste:
    
    src/styles/global.css
    
        html.dark {  background-color: #0d0950;  color: #fff;}
        .dark .nav-links a {  color: #fff;}
    

Add client-side interactivity
-----------------------------

[Section titled Add client-side interactivity](#add-client-side-interactivity)

To add interactivity to an Astro component, you can use a `<script>` tag. This script can check and set the current theme from `localStorage` and toggle the theme when the icon is clicked.

1.  Add the following `<script>` tag in `src/components/ThemeIcon.astro` after your `<style>` tag:
    
    src/components/ThemeIcon.astro
    
        <style>  .sun { fill: black; }  .moon { fill: transparent; }
          :global(.dark) .sun { fill: transparent; }  :global(.dark) .moon { fill: white; }</style>
        <script is:inline>  const theme = (() => {    const localStorageTheme = localStorage?.getItem("theme") ?? '';    if (['dark', 'light'].includes(localStorageTheme)) {      return localStorageTheme;    }    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {      return 'dark';    }      return 'light';  })();
          if (theme === 'light') {    document.documentElement.classList.remove('dark');  } else {    document.documentElement.classList.add('dark');  }
          window.localStorage.setItem('theme', theme);
          const handleToggleClick = () => {    const element = document.documentElement;    element.classList.toggle("dark");
            const isDark = element.classList.contains("dark");    localStorage.setItem("theme", isDark ? "dark" : "light");  }
          document.getElementById("themeToggle")?.addEventListener("click", handleToggleClick);</script>
    
2.  Check your browser preview at `http://localhost:4321` and click the theme icon. Verify that you can change between light and dark modes.
    

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

Choose whether each of the following statements describes Astro `<script>` tags, UI framework components, or both.

1.  They allow you to include interactive UI elements on your website.
    
    1.  Astro `<script>` tags
        
    2.  UI framework components
        
    3.  both
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  They will create static elements on your site unless you include a `client:` to send their JavaScript to the client and run in the browser.
    
    1.  Astro `<script>` tags
        
    2.  UI framework components
        
    3.  both
        
    
    Submit
    
3.  They allow you to “try out” a new framework without requiring you to start an entirely new project using that tech stack.
    
    1.  Astro `<script>` tags
        
    2.  UI framework components
        
    3.  both
        
    
    Submit
    
4.  They allow you to reuse code you have written in other frameworks and you can often just drop them right into your site.
    
    1.  Astro `<script>` tags
        
    2.  UI framework components
        
    3.  both
        
    
    Submit
    
5.  They allow you to add interactivity without needing to know or learn any other JavaScript frameworks.
    
    1.  Astro `<script>` tags
        
    2.  UI framework components
        
    3.  both
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can use JavaScript for interactivity when I don’t want to add a framework.

### Resources

[Section titled Resources](#resources)

*   [Client-side `<script>` in Astro](/en/guides/client-side-scripts/)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/6-islands/2.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Build your first Astro island](/en/tutorial/6-islands/1/) [Next  
Congratulations!](/en/tutorial/6-islands/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

