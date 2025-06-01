Check in: Unit 6 - Astro Islands
================================

Now that you have a fully functioning blog, it’s time to add some interactive islands to your site!

Looking ahead
-------------

[Section titled Looking ahead](#looking-ahead)

In this unit, you’ll use **Astro islands** to bring frontend framework components into your Astro site.

You will:

*   Add a UI framework, Preact, to your Astro project
*   Use Preact to create an interactive greeting component
*   Learn when you might _not_ choose islands for interactivity

Checklist
---------

[Section titled Checklist](#checklist)

 *    I am ready to add some interactivity to my site, and start living that island life!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/6-islands/index.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Add an RSS feed](/en/tutorial/5-astro-api/4/) [Next  
Build your first Astro island](/en/tutorial/6-islands/1/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

# Aggregated from ./pages/tutorial/6-islands/1
Build your first Astro island
=============================

Use a Preact component to greet your visitors with a randomly-selected welcome message!

Get ready to…

*   Add Preact to your Astro project
*   Include Astro islands (Preact `.jsx` components) on your home page
*   Use `client:` directives to make islands interactive

Add Preact to your Astro project
--------------------------------

[Section titled Add Preact to your Astro project](#add-preact-to-your-astro-project)

1.  If it’s running, quit the dev server to have access to the terminal (keyboard shortcut: Ctrl + C).
    
2.  Add the ability to use Preact components in your Astro project with a single command:
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-3405)
    *   [pnpm](#tab-panel-3406)
    *   [Yarn](#tab-panel-3407)
    
    Terminal window
    
        npx astro add preact
    
    Terminal window
    
        pnpm astro add preact
    
    Terminal window
    
        yarn astro add preact
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
3.  Follow the command line instructions to confirm adding Preact to your project.
    

Include a Preact greeting banner
--------------------------------

[Section titled Include a Preact greeting banner](#include-a-preact-greeting-banner)

This component will take an array of greeting messages as a prop and randomly select one of them to show as a welcome message. The user can click a button to get a new random message.

1.  Create a new file in `src/components/` named `Greeting.jsx`
    
    Note the `.jsx` file extension. This file will be written in Preact, not Astro.
    
2.  Add the following code to `Greeting.jsx`:
    
    src/components/Greeting.jsx
    
        import { useState } from 'preact/hooks';
        export default function Greeting({messages}) {
          const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];
          const [greeting, setGreeting] = useState(messages[0]);
          return (    <div>      <h3>{greeting}! Thank you for visiting!</h3>      <button onClick={() => setGreeting(randomMessage())}>        New Greeting      </button>    </div>  );}
    
3.  Import and use this component on your Home page `index.astro`.
    
    src/pages/index.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';import Greeting from '../components/Greeting';const pageTitle = "Home Page";---<BaseLayout pageTitle={pageTitle}>  <h2>My awesome blog subtitle</h2>  <Greeting messages={["Hi", "Hello", "Howdy", "Hey there"]} /></BaseLayout>
    
    Check the preview in your browser: you should see a random greeting, but the button won’t work!
    
4.  Add a second `<Greeting />` component with the `client:load` directive.
    
    src/pages/index.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';import Greeting from '../components/Greeting';const pageTitle = "Home Page";---<BaseLayout pageTitle={pageTitle}>  <h2>My awesome blog subtitle</h2>  <Greeting messages={["Hi", "Hello", "Howdy", "Hey there"]} />  <Greeting client:load messages={["Hej", "Hallo", "Hola", "Habari"]} /></BaseLayout>
    
5.  Revisit your page and compare the two components. The second button works because the `client:load` directive tells Astro to send and rerun its JavaScript on the _client_ when the page _loads_, making the component interactive. This is called a **hydrated** component.
    
6.  Once the difference is clear, remove the non-hydrated Greeting component.
    
    src/pages/index.astro
    
        ---import BaseLayout from '../layouts/BaseLayout.astro';import Greeting from '../components/Greeting';const pageTitle = "Home Page";---<BaseLayout pageTitle={pageTitle}>  <h2>My awesome blog subtitle</h2>  <Greeting messages={["Hi", "Hello", "Howdy", "Hey there"]} />  <Greeting client:load messages={["Hej", "Hallo", "Hola", "Habari"]} /></BaseLayout>
    

### Analyze the Pattern

[Section titled Analyze the Pattern](#analyze-the-pattern)

There are other `client:` directives to explore. Each sends the JavaScript to the client at a different time. `client:visible`, for example, will only send the component’s JavaScript when it is visible on the page.

Consider an Astro component with the following code:

    ---import BaseLayout from '../layouts/BaseLayout.astro';import AstroBanner from '../components/AstroBanner.astro';import PreactBanner from '../components/PreactBanner';import SvelteCounter from '../components/SvelteCounter.svelte';---<BaseLayout>  <AstroBanner />  <PreactBanner />  <PreactBanner client:load />  <SvelteCounter />  <SvelteCounter client:visible /></BaseLayout>

1.  Which of the five components will be **hydrated** islands, sending JavaScript to the client?
    
     `<PreactBanner client:load />` and `<SvelteCounter client:visible />` will be hydrated islands. class t extends HTMLElement{constructor(){super(),this.querySelector("input")?.addEventListener("click",e=>{e.target instanceof HTMLInputElement&&(e.target.checked=e.target.disabled=!0)},{once:!0})}}customElements.define("ad-spoiler",t);
    
2.  In what way(s) will the two `<PreactBanner />` components be the same? In what way(s) will they be different?
    
     **Same**: They both show the same HTML elements and look the same initially. **Different**: The component with the `client:load` directive will rerender after the page is loaded, and any interactive elements that it has will work.
    
3.  Assume the `SvelteCounter` component shows a number and has a button to increase it. If you couldn’t see your website’s code, only the live published page, how would you tell which of the two `<SvelteCounter />` components used `client:visible`?
    
     Try clicking the button, and see which one is interactive. If it responds to your input, it must have had a `client:` directive.
    

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

For each of the following components, identify what will be sent to the browser:

1.  `<ReactCounter client:load />`
    
    1.  HTML and CSS only
        
    2.  HTML, CSS, and JavaScript
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  `<SvelteCard />`
    
    1.  HTML and CSS only
        
    2.  HTML, CSS, and JavaScript
        
    
    Submit
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can install an Astro integration.
*    I can write UI framework components in their own language.
*    I can use a `client:` directive for hydration on my UI framework component.

### Resources

[Section titled Resources](#resources)

*   [Astro Integrations Guide](/en/guides/integrations-guide/)
    
*   [Using UI Framework Components in Astro](/en/guides/framework-components/#using-framework-components)
    
*   [Astro client directives reference](/en/reference/directives-reference/#client-directives)
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/6-islands/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Check in: Unit 6 - Astro Islands](/en/tutorial/6-islands/) [Next  
Back on dry land. Take your blog from day to night, no island required!](/en/tutorial/6-islands/2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/6-islands/2
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



# Aggregated from ./pages/tutorial/6-islands/3
Congratulations!
================

There’s one more edit to make…

src/pages/about.astro

    ---import BaseLayout from "../layouts/BaseLayout.astro";const pageTitle = "About Me";const happy = true;const finished = false;const finished = true;const goal = 3;const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];const skillColor = "navy";const fontWeight = "bold";const textCase = "uppercase";---

We hope you learned a little about the basics of Astro, and had fun along the way!

You can find the code for the project in this tutorial on [GitHub](https://github.com/withastro/blog-tutorial-demo/tree/complete) or open a working version in an online code environment like [IDX](https://idx.google.com/import?url=https:%2F%2Fgithub.com%2Fwithastro%2Fblog-tutorial-demo%2F) or [StackBlitz](https://stackblitz.com/github/withastro/blog-tutorial-demo/tree/complete?file=src/pages/index.astro).

Check out our docs for guides and reference material, and visit our Discord to ask questions, get help or just hang out!

Welcome to the universe, astronaut. 👩🏼‍🚀👨🏿‍🚀🧑‍🚀👩🏾‍🚀

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can’t wait to start my next Astro project! 🚀

Share your achievement!
-----------------------

[Section titled Share your achievement!](#share-your-achievement)

Congratulations on completing the Astro blog tutorial! Share your achievement with the world and let everyone know you’re an Astronaut now!

[Share on Twitter](https://twitter.com/intent/tweet?text=Just%20finished%20learning%20how%20to%20build%20my%20first%20Astro%20blog!%20Check%20it%20out%20at%20https://docs.astro.build/%0Avia%20%40astrodotbuild) [Share on Reddit](https://www.reddit.com/submit?url=https://docs.astro.build/&title=Just%20finished%20learning%20how%20to%20build%20my%20first%20Astro%20blog!) [Share on Bluesky](https://bsky.app/intent/compose?text=Just%20finished%20learning%20how%20to%20build%20my%20first%20Astro%20blog!%20Check%20it%20out%20at%20https://docs.astro.build/%0Avia%20%40astro.build)

Next Steps
----------

[Section titled Next Steps](#next-steps)

You can enhance this project’s final code with one of our tutorial extensions, or start your next Astro project!

[Start a new Astro Project](/en/install-and-setup/) Begin a new empty project, or use an existing Astro theme template.

[Join us on Discord](https://astro.build/chat) Connect with our community to ask questions, share your work, and get involved with the project!

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/6-islands/3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Back on dry land. Take your blog from day to night, no island required!](/en/tutorial/6-islands/2/) [Next  
Optional: Make a content collection](/en/tutorial/6-islands/4/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



# Aggregated from ./pages/tutorial/6-islands/4
Optional: Make a content collection
===================================

Now that you have a blog using Astro’s [built-in file-based routing](/en/guides/routing/#static-routes), you will update it to use a [content collection](/en/guides/content-collections/). Content collections are a powerful way to manage groups of similar content, such as blog posts.

Get ready to…

*   Move your folder of blog posts into `src/blog/`
*   Create a schema to define your blog post frontmatter
*   Use `getCollection()` to get blog post content and metadata

Learn: Pages vs Collections
---------------------------

[Section titled Learn: Pages vs Collections](#learn-pages-vs-collections)

Even when using content collections, you will still use the `src/pages/` folder for individual pages, such as your About Me page. But, moving your blog posts outside of this special folder will allow you to use more powerful and performant APIs to generate your blog post index and display your individual blog posts.

At the same time, you’ll receive better guidance and autocompletion in your code editor because you will have a **[schema](/en/guides/content-collections/#defining-the-collection-schema)** to define a common structure for each post that Astro will help you enforce through [Zod](https://zod.dev/), a schema declaration and validation library for TypeScript. In your schema, you can specify when frontmatter properties are required, such as a description or an author, and which data type each property must be, such as a string or an array. This leads to catching many mistakes sooner, with descriptive error messages telling you exactly what the problem is.

Read more about [Astro’s content collections](/en/guides/content-collections/) in our guide, or get started with the instructions below to convert a basic blog from `src/pages/posts/` to `src/blog/`.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  Which type of page would you probably keep in `src/pages/`?
    
    1.  Blog posts that all contain the same basic structure and metadata
        
    2.  Product pages in an eCommerce site
        
    3.  A contact page, because you do not have multiple similar pages of this type
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  Which is **not** a benefit of moving blog posts to a content collection?
    
    1.  Pages are automatically created for each file
        
    2.  Better error messages, because Astro knows more about each file
        
    3.  Better data fetching, with a more performant function
        
    
    Submit
    
3.  Content collections uses TypeScript …
    
    1.  To make me feel bad
        
    2.  To understand and validate my collections, and to provide editor tooling
        
    3.  Only if I have the `strictest` configuration set in `tsconfig.json`
        
    
    Submit
    

The steps below show you how to extend the final product of the Build a Blog tutorial by creating a content collection for the blog posts.

Upgrade dependencies
--------------------

[Section titled Upgrade dependencies](#upgrade-dependencies)

Upgrade to the latest version of Astro, and upgrade all integrations to their latest versions by running the following commands in your terminal:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3408)
*   [pnpm](#tab-panel-3409)
*   [Yarn](#tab-panel-3410)

Terminal window

    # Upgrade Astro and official integrations togethernpx @astrojs/upgrade

Terminal window

    # Upgrade Astro and official integrations togetherpnpm dlx @astrojs/upgrade

Terminal window

    # Upgrade Astro and official integrations togetheryarn dlx @astrojs/upgrade

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Create a collection for your posts
----------------------------------

[Section titled Create a collection for your posts](#create-a-collection-for-your-posts)

1.  Create a new **collection** (folder) called `src/blog/`.
    
2.  Move all your existing blog posts (`.md` files) from `src/pages/posts/` into this new collection.
    
3.  Create a `src/content.config.ts` file to [define a schema](/en/guides/content-collections/#defining-the-collection-schema) for your `postsCollection`. For the existing blog tutorial code, add the following contents to the file to define all the frontmatter properties used in its blog posts:
    
    src/content.config.ts
    
        // Import the glob loaderimport { glob } from "astro/loaders";// Import utilities from `astro:content`import { z, defineCollection } from "astro:content";// Define a `loader` and `schema` for each collectionconst blog = defineCollection({    loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),    schema: z.object({      title: z.string(),      pubDate: z.date(),      description: z.string(),      author: z.string(),      image: z.object({        url: z.string(),        alt: z.string()      }),      tags: z.array(z.string())    })});// Export a single `collections` object to register your collection(s)export const collections = { blog };
    
4.  In order for Astro to recognize your schema, quit (`CTRL + C`) and restart the dev server to continue with the tutorial. This will define the `astro:content` module.
    

Generate pages from a collection
--------------------------------

[Section titled Generate pages from a collection](#generate-pages-from-a-collection)

1.  Create a page file called `src/pages/posts/[...slug].astro`. Your Markdown and MDX files no longer automatically become pages using Astro’s file-based routing when they are inside a collection, so you must create a page responsible for generating each individual blog post.
    
2.  Add the following code to [query your collection](/en/guides/content-collections/#querying-collections) to make each blog post’s slug and page content available to each page it will generate:
    
    src/pages/posts/\[...slug\].astro
    
        ---import { getCollection, render } from 'astro:content';
        export async function getStaticPaths() {  const posts = await getCollection('blog');  return posts.map(post => ({    params: { slug: post.id }, props: { post },  }));}
        const { post } = Astro.props;const { Content } = await render(post);---
    
3.  Render your post `<Content />` within the layout for Markdown pages. This allows you to specify a common layout for all of your posts.
    
    src/pages/posts/\[...slug\].astro
    
        ---import { getCollection, render } from 'astro:content';import MarkdownPostLayout from '../../layouts/MarkdownPostLayout.astro';
        export async function getStaticPaths() {  const posts = await getCollection('blog');  return posts.map(post => ({    params: { slug: post.id }, props: { post },  }));}
        const { post } = Astro.props;const { Content } = await render(post);---<MarkdownPostLayout frontmatter={post.data}>  <Content /></MarkdownPostLayout>
    
4.  Remove the `layout` definition in each individual post’s frontmatter. Your content is now wrapped in a layout when rendered, and this property is no longer needed.
    
    src/content/posts/post-1.md
    
        ---layout: ../../layouts/MarkdownPostLayout.astrotitle: 'My First Blog Post'pubDate: 2022-07-01...---
    

Replace `import.meta.glob()` with `getCollection()`
---------------------------------------------------

[Section titled Replace import.meta.glob() with getCollection()](#replace-importmetaglob-with-getcollection)

5.  Anywhere you have a list of blog posts, like the tutorial’s Blog page (`src/pages/blog.astro/`), you will need to replace `import.meta.glob()` with [`getCollection()`](/en/reference/modules/astro-content/#getcollection) as the way to fetch content and metadata from your Markdown files.
    
    src/pages/blog.astro
    
        ---import { getCollection } from "astro:content";import BaseLayout from "../layouts/BaseLayout.astro";import BlogPost from "../components/BlogPost.astro";
        const pageTitle = "My Astro Learning Blog";const allPosts = Object.values(import.meta.glob("../pages/posts/*.md", { eager: true }));const allPosts = await getCollection("blog");---
    
6.  You will also need to update references to the data returned for each `post`. You will now find your frontmatter values on the `data` property of each object. Also, when using collections each `post` object will have a page `slug`, not a full URL.
    
    src/pages/blog.astro
    
        ---import { getCollection } from "astro:content";import BaseLayout from "../layouts/BaseLayout.astro";import BlogPost from "../components/BlogPost.astro";
        const pageTitle = "My Astro Learning Blog";const allPosts = await getCollection("blog");---<BaseLayout pageTitle={pageTitle}>  <p>This is where I will post about my journey learning Astro.</p>  <ul>    {      allPosts.map((post) => (        <BlogPost url={post.url} title={post.frontmatter.title} />)}        <BlogPost url={`/posts/${post.id}/`} title={post.data.title} />      ))    }  </ul></BaseLayout>
    
7.  The tutorial blog project also dynamically generates a page for each tag using `src/pages/tags/[tag].astro` and displays a list of tags at `src/pages/tags/index.astro`.
    
    Apply the same changes as above to these two files:
    
    *   fetch data about all your blog posts using `getCollection("blog")` instead of using `import.meta.glob()`
    *   access all frontmatter values using `data` instead of `frontmatter`
    *   create a page URL by adding the post’s `slug` to the `/posts/` path
    
    The page that generates individual tag pages now becomes:
    
    src/pages/tags/\[tag\].astro
    
        ---import { getCollection } from "astro:content";import BaseLayout from "../../layouts/BaseLayout.astro";import BlogPost from "../../components/BlogPost.astro";
        export async function getStaticPaths() {  const allPosts = await getCollection("blog");  const uniqueTags = [...new Set(allPosts.map((post) => post.data.tags).flat())];
          return uniqueTags.map((tag) => {    const filteredPosts = allPosts.filter((post) =>      post.data.tags.includes(tag)    );    return {      params: { tag },      props: { posts: filteredPosts },    };  });}
        const { tag } = Astro.params;const { posts } = Astro.props;---
        <BaseLayout pageTitle={tag}>  <p>Posts tagged with {tag}</p>  <ul>    { posts.map((post) => <BlogPost url={`/posts/${post.id}/`} title={post.data.title} />) }  </ul></BaseLayout>
    
    ### Try it yourself - Update the query in the Tag Index page
    
    [Section titled Try it yourself - Update the query in the Tag Index page](#try-it-yourself---update-the-query-in-the-tag-index-page)
    
    Import and use `getCollection` to fetch the tags used in the blog posts on `src/pages/tags/index.astro`, following the [same steps as above](#replace-importmetaglob-with-getcollection).
    
    Show me the code.
    
    src/pages/tags/index.astro
    
        ---import { getCollection } from "astro:content";import BaseLayout from "../../layouts/BaseLayout.astro";const allPosts = await getCollection("blog");const tags = [...new Set(allPosts.map((post) => post.data.tags).flat())];const pageTitle = "Tag Index";---<!-- ... -->
    

Update any frontmatter values to match your schema
--------------------------------------------------

[Section titled Update any frontmatter values to match your schema](#update-any-frontmatter-values-to-match-your-schema)

If necessary, update any frontmatter values throughout your project, such as in your layout, that do not match your collections schema.

In the blog tutorial example, `pubDate` was a string. Now, according to the schema that defines types for the post frontmatter, `pubDate` will be a `Date` object. You can now take advantage of this to use the methods available for any `Date` object to format the date.

To render the date in the blog post layout, convert it to a string using `toLocaleDateString()` method:

src/layouts/MarkdownPostLayout.astro

    <!-- ... --><BaseLayout pageTitle={frontmatter.title}>    <p>{frontmatter.pubDate.toLocaleDateString()}</p>    <p><em>{frontmatter.description}</em></p>    <p>Written by: {frontmatter.author}</p>    <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} /><!-- ... -->

Update the RSS function
-----------------------

[Section titled Update the RSS function](#update-the-rss-function)

The tutorial blog project includes an RSS feed. This function must also use `getCollection()` to return information from your blog posts. You will then generate the RSS items using the `data` object returned.

src/pages/rss.xml.js

    import rss from '@astrojs/rss';import { pagesGlobToRssItems } from '@astrojs/rss';import { getCollection } from 'astro:content';
    export async function GET(context) {  const posts = await getCollection("blog");  return rss({    title: 'Astro Learner | Blog',    description: 'My journey learning Astro',    site: context.site,    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),    items: posts.map((post) => ({      title: post.data.title,      pubDate: post.data.pubDate,      description: post.data.description,      link: `/posts/${post.id}/`,    })),    customData: `<language>en-us</language>`,  })}

For the full example of the blog tutorial using content collections, see the [Content Collections branch](https://github.com/withastro/blog-tutorial-demo/tree/content-collections) of the tutorial repo.

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can use content collections to manage groups of similar content for better performance and organization.

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/6-islands/4.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Congratulations!](/en/tutorial/6-islands/3/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)



