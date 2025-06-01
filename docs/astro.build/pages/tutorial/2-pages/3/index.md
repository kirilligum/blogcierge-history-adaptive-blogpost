Add dynamic content about you
=============================

Now that you have a multi-page website with HTML content, it’s time to add some dynamic HTML!

Get ready to…

*   Define your page title in frontmatter, and use it in your HTML
*   Conditionally display HTML elements
*   Add some content about you

Any HTML file is valid Astro language. But, you can do more with Astro than just regular HTML!

Define and use a variable
-------------------------

[Section titled Define and use a variable](#define-and-use-a-variable)

Open `about.astro`, which should look like this:

src/pages/about.astro

    ------<html lang="en">  <head>    <meta charset="utf-8" />    <meta name="viewport" content="width=device-width" />    <title>Astro</title>  </head>  <body>    <a href="/">Home</a>    <a href="/about/">About</a>    <a href="/blog/">Blog</a>    <h1>About Me</h1>    <h2>... and my new Astro site!</h2>
        <p>I am working through Astro's introductory tutorial. This is the second page on my website, and it's the first one I built myself!</p>
        <p>This site will update as I complete more of the tutorial, so keep checking back and see how my journey is going!</p>  </body></html>

1.  Add the following line of JavaScript in the frontmatter script, between the **code fences**:
    
    src/pages/about.astro
    
        ---const pageTitle = "About Me";---
    
2.  Replace both the static “Astro” title and “About Me” heading in your HTML with the dynamic variable `{pageTitle}`.
    
    src/pages/about.astro
    
        <html lang="en">  <head>    <meta charset="utf-8" />    <meta name="viewport" content="width=device-width" />    <title>Astro</title>    <title>{pageTitle}</title>  </head>  <body>    <a href="/">Home</a>    <a href="/about/">About</a>    <a href="/blog/">Blog</a>    <h1>About Me</h1>    <h1>{pageTitle}</h1>    <h2>... and my new Astro site!</h2>
            <p>I am working through Astro's introductory tutorial. This is the second page on my website, and it's the first one I built myself!</p>
            <p>This site will update as I complete more of the tutorial, so keep checking back and see how my journey is going!</p>  </body></html>
    
3.  Refresh the live preview of your `/about` page.
    
    Your page text should look the same, and your page title displayed in your browser tab should now read “About Me” instead of “Astro.”
    
    Instead of typing text directly into HTML tags, you just **defined and then used a variable** in the two sections of your `.astro` file, respectively.
    
4.  Use the same pattern to create a `pageTitle` value to use in `index.astro` (“Home Page”) and `blog.astro` (“My Astro Learning Blog”). Update the HTML of these pages in both places so that your page title matches the heading displayed on each page.
    

Takeaways

1.  **Define** variables in your Astro script using JavaScript or TypeScript expressions.
2.  **Use** these variables in your Astro template inside curly braces `{ }` to tell Astro you’re using some JavaScript.

Write JavaScript expressions in Astro
-------------------------------------

[Section titled Write JavaScript expressions in Astro](#write-javascript-expressions-in-astro)

1.  Add the following JavaScript to your frontmatter, between the **code fences**:
    
    (You can customize the code for yourself, but this tutorial will use the following example.)
    
    src/pages/about.astro
    
        ---const pageTitle = "About Me";
        const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};
        const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];---
    
2.  Then, add the following code to your HTML template, below your existing content:
    
    src/pages/about.astro
    
        <p>Here are a few facts about me:</p><ul>  <li>My name is {identity.firstName}.</li>  <li>I live in {identity.country} and I work as a {identity.occupation}.</li>  {identity.hobbies.length >= 2 &&    <li>Two of my hobbies are: {identity.hobbies[0]} and {identity.hobbies[1]}</li>  }</ul><p>My skills are:</p><ul>  {skills.map((skill) => <li>{skill}</li>)}</ul>
    

Takeaways

1.  Writing an Astro template is very much like **writing HTML**, but you can include JavaScript expressions within it.
2.  The Astro frontmatter script contains only JavaScript.
3.  You can use all modern JavaScript **logical operators**, **expressions** and **functions** in either section of your `.astro` file. But, curly braces are necessary (only) in the HTML template body.

### Test your knowledge

[Section titled Test your knowledge](#test-your-knowledge)

1.  A `.astro` file’s frontmatter is written in:
    
    1.  HTML
    2.  YAML
    3.  JavaScript
    
    Submit
    
    class s extends HTMLElement{#s;#i;#r;#e;#t;constructor(){super(),this.#s=this.dataset.correctLabel,this.#i=this.dataset.incorrectLabel,this.#r=Math.random().toString(),this.#e=this.querySelector(".submit"),this.#t=this.querySelector(".answer"),this.querySelectorAll(".opt-list > li").forEach(t=>this.#l(t))}#l(t){const e=t.querySelector('input\[type="radio"\]');e&&(e.removeAttribute("disabled"),e.setAttribute("name",this.#r),e.addEventListener("change",()=>{this.#n(),this.#c()}),e.checked&&this.#c())}#n(){this.#t.innerText="",this.#t.classList.remove("wrong","correct"),this.#t.classList.add("sr-only")}#o(t){const e=this.querySelector("input:checked ~ template");e?this.#t.replaceChildren(e.content.cloneNode(!0)):this.#t.innerText=t?this.#s:this.#i,this.#t.classList.remove("sr-only","wrong","correct"),this.#t.classList.add(t?"correct":"wrong")}#c(){this.#e.removeAttribute("disabled"),this.#e.classList.remove("sr-only"),this.#e.onclick=()=>this.#h()}#a(){this.#e.setAttribute("disabled",""),this.#e.classList.add("sr-only"),this.#e.onclick=null}#h(){const t=this.querySelector("input:checked");if(!t)return;this.#a();const e=t.dataset.isCorrect!==void 0&&\["","true"\].includes(t.dataset.isCorrect);this.#o(e)}}customElements.define("multiple-choice",s);
2.  In addition to HTML, Astro syntax allows you to include:
    
    1.  JavaScript logical operators, expressions and functions
    2.  YAML
    3.  Markdown
    
    Submit
    
3.  When do you need to write your JavaScript inside curly braces?
    
    1.  When you’re not sure whether it’s correct.
        
    2.  When inside the HTML template section of an Astro component.
        
    3.  Between the code fences in an Astro component.
        
    
    Submit
    

Conditionally render elements
-----------------------------

[Section titled Conditionally render elements](#conditionally-render-elements)

You can also use your script variables to choose **whether or not** to render individual elements of your HTML `<body>` content.

1.  Add the following lines to your frontmatter script to **define variables**:
    
    src/pages/about.astro
    
        ---const pageTitle = "About Me";
        const identity = {  firstName: "Sarah",  country: "Canada",  occupation: "Technical Writer",  hobbies: ["photography", "birdwatching", "baseball"],};
        const skills = ["HTML", "CSS", "JavaScript", "React", "Astro", "Writing Docs"];
        const happy = true;const finished = false;const goal = 3;---
    
2.  Add the following lines below your existing paragraphs.
    
    Then, check the live preview in your browser tab to see what is displayed on the page:
    
    src/pages/about.astro
    
        {happy && <p>I am happy to be learning Astro!</p>}
        {finished && <p>I finished this tutorial!</p>}
        {goal === 3 ? <p>My goal is to finish in 3 days.</p> : <p>My goal is not 3 days.</p>}
    
3.  Commit your changes to GitHub before moving on. Do this any time you want to save your work and update your live website.
    

Tip

Astro’s templating syntax is similar to JSX syntax. If you’re ever wondering how to use your script in your HTML, then searching for how it is done in JSX is probably a good starting point!

### Analyze the Pattern

[Section titled Analyze the Pattern](#analyze-the-pattern)

Given the following `.astro` script:

src/pages/about.astro

    ---const operatingSystem = "Linux";const quantity = 3;const footwear = "boots";const student = false;---

For each Astro template expression, can you predict the HTML (if any!) that will be sent to the browser? Click to reveal if you’re right!

1.  `<p>{operatingSystem}</p>`
    
     `<p>Linux</p>` class t extends HTMLElement{constructor(){super(),this.querySelector("input")?.addEventListener("click",e=>{e.target instanceof HTMLInputElement&&(e.target.checked=e.target.disabled=!0)},{once:!0})}}customElements.define("ad-spoiler",t);
    
2.  `{student && <p>I am still in school.</p>}`
    
     Nothing will display because `student` evaluates to false.
    
3.  `<p>I have {quantity + 8} pairs of {footwear}</p>`
    
     `<p>I have 11 pairs of boots</p>`
    
4.  `{operatingSystem === "MacOS" ? <p>I am using a Mac.</p> : <p>I am not using a Mac.</p>}`
    
     `<p>I am not using a Mac.</p>`
    

Checklist
---------

[Section titled Checklist](#checklist)

 *    I can define values in and use values in `.astro` files.
*    I can conditionally render HTML elements.

### Resources

[Section titled Resources](#resources)

*   [Dynamic expressions in Astro](/en/reference/astro-syntax/#jsx-like-expressions)

Tutorials

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/tutorial/2-pages/3.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Write your first Markdown blog post](/en/tutorial/2-pages/2/) [Next  
Style your About page](/en/tutorial/2-pages/4/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)