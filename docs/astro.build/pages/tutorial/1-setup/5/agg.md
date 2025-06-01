Deploy your site to the web
===========================

Get ready to…

*   Add your GitHub repository as a new Netlify app
*   Deploy your Astro site to the web

Here, you will connect your GitHub repository to Netlify. Netlify will use that project to build and deploy your site live on the web every time you commit a change to your code.

We’ll use…

This tutorial will use **Netlify**, but you are welcome to use your preferred hosting service for deploying your site to the internet.

Create a new Netlify site
-------------------------

[Section titled Create a new Netlify site](#create-a-new-netlify-site)

1.  Create a free account at [Netlify](https://netlify.com) if you do not already have one.
    
    Make a note of your username. You will view your dashboard and any sites you create at `https://app.netlify.com/teams/username`
    
2.  Click Add new site > Import an existing project.
    
    You will be asked to connect to a Git provider. Choose GitHub and follow the steps onscreen to authenticate your GitHub account. Then, choose your Astro project’s GitHub repository from the list provided.
    
3.  At the final step, Netlify will show you your app’s site settings. The defaults should be correct for your Astro project, so you can scroll down and click Deploy site.
    

Congratulations, you have an Astro website!

Change your project name
------------------------

[Section titled Change your project name](#change-your-project-name)

On your site’s overview page in Netlify, you will see your randomly-generated project name, and your website URL of the form `https://project-name-123456.netlify.app`. You can change your project name to something more memorable, and this will automatically update your URL.

Visit your new website
----------------------

[Section titled Visit your new website](#visit-your-new-website)

Click on the URL in your site settings, or type it into a browser window to view your new website.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

You want to update the home page of your existing website. What steps do you take?

1.  I open a terminal, run `create astro`, and then visit my Netlify URL.
    
2.  I change a setting in my Netlify app, then start a new Astro project on astro.new.
    
3.  I make an edit to `index.astro`. I commit and push my changes to GitHub. Netlify will handle the rest!
    

Submit

class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can view my updated website online.
*    I’m ready to get back to coding!

### Resources

[Section titled Resources](#resources)

*   [A step-by-step guide to deploying on Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/) external
    

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/1-setup/5.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Store your repository online](/en/tutorial/1-setup/4/) [Next  
Check in: Unit 2 - Pages](/en/tutorial/2-pages/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

