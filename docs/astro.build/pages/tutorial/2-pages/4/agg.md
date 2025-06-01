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

