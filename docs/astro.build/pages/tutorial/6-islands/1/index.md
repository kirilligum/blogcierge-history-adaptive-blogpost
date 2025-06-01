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