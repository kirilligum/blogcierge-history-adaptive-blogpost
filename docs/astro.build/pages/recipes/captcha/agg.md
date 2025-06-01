Verify a Captcha
================

[Server endpoints](/en/guides/endpoints/#server-endpoints-api-routes) can be used as REST API endpoints to run functions such as authentications, database access, and verifications without exposing sensitive data to the client.

In this recipe, an API route is used to verify Google reCAPTCHA v3 without exposing the secret to clients.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

*   A project with [SSR](/en/guides/on-demand-rendering/) (`output: 'server'`) enabled

Recipe
------

[Section titled Recipe](#recipe)

1.  Create a `POST` endpoint that accepts recaptcha data, then verifies it with reCAPTCHA’s API. Here, you can safely define secret values or read environment variables.
    
    src/pages/recaptcha.js
    
        export async function POST({ request }) {  const data = await request.json();
          const recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';  const requestHeaders = {    'Content-Type': 'application/x-www-form-urlencoded'  };  const requestBody = new URLSearchParams({    secret: "YOUR_SITE_SECRET_KEY",   // This can be an environment variable    response: data.recaptcha          // The token passed in from the client  });
          const response = await fetch(recaptchaURL, {    method: "POST",    headers: requestHeaders,    body: requestBody.toString()  });
          const responseData = await response.json();
          return new Response(JSON.stringify(responseData), { status: 200 });}
    
2.  Access your endpoint using `fetch` from a client script:
    
    src/pages/index.astro
    
        <html>  <head>    <script is:inline src="https://www.google.com/recaptcha/api.js"></script>  </head>
          <body>    <button class="g-recaptcha"      data-sitekey="PUBLIC_SITE_KEY"      data-callback="onSubmit"      data-action="submit"> Click me to verify the captcha challenge! </button>
            <script is:inline>      function onSubmit(token) {        fetch("/recaptcha", {          method: "POST",          body: JSON.stringify({ recaptcha: token })        })        .then((response) => response.json())        .then((gResponse) => {          if (gResponse.success) {            // Captcha verification was a success          } else {            // Captcha verification failed          }        })      }    </script>  </body></html>
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/captcha.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Call endpoints from the server](/en/recipes/call-endpoints/) [Next  
Build your Astro site with Docker](/en/recipes/docker/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

