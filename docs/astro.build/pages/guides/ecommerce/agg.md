E-commerce
==========

With Astro, you can build several e-commerce options, from checkout links to hosted payment pages to building an entire storefront using a payment service API.

Payment processing overlays
---------------------------

[Section titled Payment processing overlays](#payment-processing-overlays)

Some payment processing services (e.g. [Lemon Squeezy](#lemon-squeezy), [Paddle](#paddle)) add a payment form to allow your customer to purchase from your site. These can be hosted overlays or embedded in a page on your site. These may offer some basic customization or site branding, and may be added to your Astro project as scripts, buttons, or external links.

### Lemon Squeezy

[Section titled Lemon Squeezy](#lemon-squeezy)

[Lemon Squeezy](https://www.lemonsqueezy.com/) is an all-in-one platform for payments and subscriptions with multi-currency support, global tax compliance, PayPal integration and more. It allows you to create and manage digital products and services through your account dashboard and provides product URLs for the checkout process.

The basic [Lemon.js JavaScript library](https://docs.lemonsqueezy.com/help/lemonjs/what-is-lemonjs) allows you to sell your Lemon Squeezy products with a checkout link.

#### Basic Usage

[Section titled Basic Usage](#basic-usage)

The following is an example of adding a Lemon Squeezy “Buy now” element to an Astro page. Clicking this link will open a checkout and allow the visitor to complete a single purchase.

1.  Add the following `<script>` tag to your page `head` or `body`:
    
    src/pages/my-product-page.astro
    
        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
    
2.  Create an anchor tag on the page linking to your product URL. Include the class `lemonsqueezy-button` to open a checkout overlay when clicked.
    
    src/pages/my-product-page.astro
    
        <a class="lemonsqueezy-button" href="https://demo.lemonsqueezy.com/checkout/...">  Buy Now</a>
    

#### Lemon.js

[Section titled Lemon.js](#lemonjs)

Lemon.js also provides additional behavior such as [programmatically opening overlays](https://docs.lemonsqueezy.com/help/lemonjs/opening-overlays) and [handling overlay events](https://docs.lemonsqueezy.com/help/lemonjs/handling-events).

Read the [Lemon Squeezy developer getting started guide](https://docs.lemonsqueezy.com/guides/developer-guide) for more information.

### Paddle

[Section titled Paddle](#paddle)

[Paddle](https://www.paddle.com/) is a billing solution for digital products and services. It handles payments, taxes, and subscription management through an overlay or inline checkout.

[Paddle.js](https://developer.paddle.com/paddlejs/overview) is a lightweight JavaScript library that lets you build rich, integrated subscription billing experiences using Paddle.

#### Basic Usage

[Section titled Basic Usage](#basic-usage-1)

The following is an example of adding a Paddle “Buy Now” element to an Astro page. Clicking this link will open a checkout and allow the visitor to complete a single purchase.

After your default payment link domain (your own website) is approved by Paddle, you can turn any element on your page into a trigger for a checkout overlay using HTML data attributes.

1.  Add the following two `<script>` tags to your page `head` or `body`:
    
    src/pages/my-product-page.astro
    
        <script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script><script type="text/javascript">  Paddle.Setup({    token: '7d279f61a3499fed520f7cd8c08' // replace with a client-side token  });</script>
    
2.  Turn any element on your page into a Paddle Checkout button by adding the `paddle_button` class:
    
    src/pages/my-product-page.astro
    
        <a href="#" class="paddle_button">Buy Now</a>
    
3.  Add a `data-items` attribute to specify your product’s Paddle `priceId` and `quantity`. You can also optionally pass additional [supported HTML data attributes](https://developer.paddle.com/paddlejs/html-data-attributes) to prefill data, handle checkout success, or style your button and checkout overlay:
    
    src/pages/my-product-page.astro
    
        <a  href="#"  class="paddle_button"  data-display-mode="overlay"  data-theme="light"  data-locale="en"  data-success-url="https://example.com/thankyou"  data-items='[    {      "priceId": "pri_01gs59hve0hrz6nyybj56z04eq",      "quantity": 1    }  ]'>  Buy now</a>
    

#### Paddle.js

[Section titled Paddle.js](#paddlejs)

Instead of passing HTML data attributes, you can send data to the checkout overlay using JavaScript for passing multiple attributes and even greater customization. You can also create upgrade workflows using an inline checkout.

Read more about [using Paddle.js to build an inline checkout](https://developer.paddle.com/build/checkout/build-branded-inline-checkout).

Full-featured e-commerce solutions
----------------------------------

[Section titled Full-featured e-commerce solutions](#full-featured-e-commerce-solutions)

For more customization over your site’s shopping cart and checkout process, you can connect a more fully-featured financial service provider (e.g. [Snipcart](#snipcart)) to your Astro project. These e-commerce platforms may also integrate with other third-party services for user account management, personalization, inventory and analytics.

### Snipcart

[Section titled Snipcart](#snipcart)

[Snipcart](https://snipcart.com/) is a powerful, developer-first HTML/JavaScript shopping cart platform.

Snipcart also allows you to integrate with third-party services such as shipping providers, enable webhooks for an advanced e-commerce integration between your shopping cart and other systems, choose from several payment gateways (e.g. Stripe, Paypal, and Square), customize email templates, and even provides live testing environments.

Tip

Want a pre-built Snipcart solution instead? Check out [`astro-snipcart`](https://astro-snipcart.vercel.app/), a fully functional Astro community template including an optional design system, ready for you to integrate with your existing Snipcart account.

#### Basic Usage

[Section titled Basic Usage](#basic-usage-2)

The following is an example of configuring a Snipcart checkout and adding button elements for “Add to cart” and “Check out now” to an Astro page. This will allow your visitors to add products to a cart without being immediately sent to a checkout page.

For complete instructions, including setting up your Snipcart store, please see [the Snipcart installation documentation](https://docs.snipcart.com/v3/setup/installation).

1.  Add the script [as shown in the Snipcart installation instructions](https://docs.snipcart.com/v3/setup/installation) on your page after the `<body>` element.
    
    src/pages/my-product-page.astro
    
        <body></body><script>  window.SnipcartSettings = {    publicApiKey: "YOUR_API_KEY",    loadStrategy: "on-user-interaction",  };
          (function()...); // available from the Snipcart documentation</script>
    
2.  Customize `window.SnipcartSettings` with any of the [available Snipcart settings](https://docs.snipcart.com/v3/setup/installation#settings) to control the behavior and appearance of your cart.
    
    src/pages/my-product-page.astro
    
        <script>  window.SnipcartSettings = {    publicApiKey: "YOUR_API_KEY",    loadStrategy: "manual",    version: "3.7.1",    addProductBehavior: "none",    modalStyle: "side",  };
          (function()...); // available from the Snipcart documentation</script>
    
3.  Add `class="snipcart-add-item"` to any HTML element, such as a `<button>`, to add an item to the cart when clicked on. Also include any other data elements for [common Snipcart product attributes](https://docs.snipcart.com/v3/setup/products) such as price and description, and any optional fields.
    
    src/pages/my-product-page.astro
    
        <button  class="snipcart-add-item"  data-item-id="astro-print"  data-item-price="39.99"  data-item-description="A framed print of the Astro logo."  data-item-image="/assets/images/astro-print.jpg"  data-item-name="Astro Print"  data-item-custom1-name="Frame color"  data-item-custom1-options="Brown|Silver[+10.00]|Gold[+20.00]"  data-item-custom2-name="Delivery instructions"  data-item-custom2-type="textarea">  Add to cart</button>
    
4.  Add a Snipcart checkout button with the `snipcart-checkout` class to open the cart and allow guests to complete their purchase with a checkout modal.
    
    src/pages/my-product-page.astro
    
        <button class="snipcart-checkout">Click here to checkout</button>
    

#### Snipcart JavaScript SDK

[Section titled Snipcart JavaScript SDK](#snipcart-javascript-sdk)

The [Snipcart JavaScript SDK](https://docs.snipcart.com/v3/sdk/basics) lets you configure, customize and manage your Snipcart cart programmatically.

This allows you to perform actions such as:

*   Retrieve relevant information about the current Snipcart session and apply certain operations to the cart.
*   Listen to incoming events and trigger callbacks dynamically.
*   Listen to state changes and receive a full snapshot of the state of the cart.

See the [Snipcart documentation](https://docs.snipcart.com/v3/) for more information about all the options to integrate Snipcart with your Astro Project.

#### `astro-snipcart`

[Section titled astro-snipcart](#astro-snipcart)

There are two `astro-snipcart` community packages that can simplify using Snipcart.

*   [`@lloydjatkinson/astro-snipcart` Astro template](https://astro-snipcart.vercel.app/): This Astro template includes an optional design system for a complete e-commerce solution out of the box. Learn more on its own extensive documentation site, including [the motivation behind building `astro-snipcart`](https://astro-snipcart.vercel.app/motivation) as providing a convenient, Astro-native way for you to interact with the Snipcart API.
    
*   [`@Adammatthiesen/astro-snipcart` integration](https://github.com/Adammatthiesen/astro-snipcart): This integration was heavily inspired by the `astro-snipcart` theme and provides Astro components (or Vue components) that you can add to your existing Astro project for creating products, controlling the cart, and more. See the [full tutorial](https://matthiesen.xyz/blog/getting-started-with-my-astro-snipcart-addon) for more information.
    

Community Resources
-------------------

[Section titled Community Resources](#community-resources)

*   [Hands-On Experience: eCommerce Store with Astro?](https://crystallize.com/blog/building-ecommerce-with-astro)
*   [Collecting Payments with Stripe using Astro](https://zellwk.com/blog/stripe-astro-recipe/)

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/ecommerce.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Cloudinary](/en/guides/media/cloudinary/) [Next  
Authentication](/en/guides/authentication/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

