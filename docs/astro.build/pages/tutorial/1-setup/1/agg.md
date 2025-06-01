Prepare your dev environment
============================

Get ready to…

*   Install any tools that you will use to build your Astro website

Get the dev tools you need
--------------------------

[Section titled Get the dev tools you need](#get-the-dev-tools-you-need)

### Terminal

[Section titled Terminal](#terminal)

You will use a **command line (terminal)** to create your Astro project and to run key commands to build, develop, and test your site.

You can access the command line through a local terminal program for your operating system. Common applications include **Terminal** (MacOS/Linux), **Command Prompt** (Windows), and **Termux** (Android). One of these will probably already be on your machine.

### Node.js

[Section titled Node.js](#nodejs)

For Astro to run on your system, you will also need to have a compatible version of [**Node.js**](https://nodejs.org/en/) installed. Astro supports **even-numbered** Node.js versions. The current minimum supported versions of each are: `v18.20.8`, `v20.3.0`, and `v22.0.0`. (`v19` and `v21` are not supported.)

To check to see whether you already have a compatible version installed, run the following command in your terminal:

Terminal window

    node -v
    // Example outputv18.20.8

If the command returns a version number supported by Astro, you’re good to go!

If the command returns an error message like `Command 'node' not found`, or a version number lower than the required, then you need to [install a compatible Node.js version](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Code Editor

[Section titled Code Editor](#code-editor)

Additionally, you will need to download and install a **code editor** to write your code.

We’ll use…

This tutorial will use **VS Code**, but you can use any editor for your operating system.

1.  [Download and install VS Code](https://code.visualstudio.com/#alt-downloads) or another code editor of your choice.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

Which of the following is…

1.  A code editor, for making changes to your files and their content?
    
    1.  web browser
        
    2.  Terminal
        
    3.  VS Code
        
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  An online version control provider for your repository?
    
    1.  GitHub
        
    2.  Terminal
        
    3.  VS Code
        
    
    Submit
    
3.  An application for running commands?
    
    1.  GitHub
        
    2.  Terminal
        
    3.  web browser
        
    
    Submit
    

Checklist for moving on
-----------------------

[Section titled Checklist for moving on](#checklist-for-moving-on)

 *    I can access the command line in a terminal.
*    I have Node.js installed.
*    I have a code editor like VS Code.

### Resources

[Section titled Resources](#resources)

*   [FreeCodeCamp.org](https://freecodecamp.org) external — a free educational site with full courses or quick refreshers in HTML, CSS, JS, and more.
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/1-setup/1.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Check in: Unit 1 - Setup](/en/tutorial/1-setup/) [Next  
Create your first Astro project](/en/tutorial/1-setup/2/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

