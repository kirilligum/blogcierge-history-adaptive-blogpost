Cloudinary & Astro
==================

[Cloudinary](https://cloudinary.com) is an image and video platform and headless Digital Asset Manager (DAM) that lets you host assets and deliver them from their content delivery network (CDN).

When delivering from Cloudinary, you additionally get access to their Transformation API, giving you the ability to edit your assets with tools like background removal, dynamic cropping and resizing, and generative AI.

Using Cloudinary in Astro
-------------------------

[Section titled Using Cloudinary in Astro](#using-cloudinary-in-astro)

Cloudinary supports a wide variety of SDKs that can be used depending on your Astro environment.

The [Cloudinary Astro SDK](https://astro.cloudinary.dev/) provides native Astro components, including image, video, and upload components, as well as a content loader that can be used with Astro content collections.

Alternatively, both the Cloudinary [Node.js SDK](https://cloudinary.com/documentation/node_integration) and [JavaScript SDK](https://cloudinary.com/documentation/javascript_integration) can be used to generate URLs for your images. The Node.js SDK can additionally make requests to the Cloudinary API including uploading assets, requesting resources, and running content analysis.

Prerequisites
-------------

[Section titled Prerequisites](#prerequisites)

*   An existing Astro project
*   A Cloudinary account

Installing Astro Cloudinary
---------------------------

[Section titled Installing Astro Cloudinary](#installing-astro-cloudinary)

Install the Cloudinary Astro SDK by running the appropriate command for your package manager:

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [npm](#tab-panel-3179)
*   [pnpm](#tab-panel-3180)
*   [Yarn](#tab-panel-3181)

Terminal window

    npm install astro-cloudinary

Terminal window

    pnpm add astro-cloudinary

Terminal window

    yarn add astro-cloudinary

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Configuring your account
------------------------

[Section titled Configuring your account](#configuring-your-account)

Create a new `.env` file in the root of your project and add your Cloudinary credentials:

.env

    PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
    // Only needed if using CldUploadWidget or cldAssetsLoaderPUBLIC_CLOUDINARY_API_KEY="<Your API Key>"CLOUDINARY_API_SECRET="<Your API Secret>"

Using Cloudinary images
-----------------------

[Section titled Using Cloudinary images](#using-cloudinary-images)

Add images in `.astro` components by passing image data (e.g. `src`, `width`, `alt`) to the `<CldImage>` component. This will automatically optimize your image and give you access to the Transformations API.

Component.astro

    ---import { CldImage } from 'astro-cloudinary';---<CldImage  src="<Public ID>"  width="<Width>"  height="<Height>"  alt="<Description>"/>

See [Cloudinary’s `<CldImage>` documentation](https://astro.cloudinary.dev/cldimage/basic-usage) for more information.

Using Cloudinary videos
-----------------------

[Section titled Using Cloudinary videos](#using-cloudinary-videos)

To add video to your `.astro` components, add the `<CldVideoPlayer>` and pass the appropriate properties. This component will automatically optimize and embed your video using the [Cloudinary Video Player](https://cloudinary.com/documentation/cloudinary_video_player).

Component.astro

    ---import { CldVideoPlayer } from 'astro-cloudinary';---<CldVideoPlayer  src="<Public ID>"  width="<Width>"  height="<Height>"/>

See [Cloudinary’s `<CldVideoPlayer>` documentation](https://astro.cloudinary.dev/cldvideoplayer/basic-usage) for more information.

Enabling Cloudinary uploads
---------------------------

[Section titled Enabling Cloudinary uploads](#enabling-cloudinary-uploads)

To enable file uploading in your website or app’s UI, add the `<CldUploadWidget>` which will embed the [Cloudinary Upload Widget](https://cloudinary.com/documentation/upload_widget).

The following example creates a widget to allow unsigned uploads by passing an unsigned [Upload Preset](https://cloudinary.com/documentation/upload_presets):

Component.astro

    ---import { CldUploadWidget } from 'astro-cloudinary';---<CldUploadWidget uploadPreset="<Upload Preset>">  <button>Upload</button></CldUploadWidget>

For signed uploads, you can find [a guide and example](https://astro.cloudinary.dev/clduploadwidget/signed-uploads) on the Astro Cloudinary docs.

See [Cloudinary’s `<CldUploadWidget>` documentation](https://astro.cloudinary.dev/clduploadwidget/basic-usage) for more information.

Cloudinary content loader
-------------------------

[Section titled Cloudinary content loader](#cloudinary-content-loader)

The Cloudinary Astro SDK provides the `cldAssetsLoader` content loader to load Cloudinary assets for content collections.

To load a collection of images or videos, set `loader: cldAssetsLoader ({})` with a `folder`, if required:

config.ts

    import { defineCollection } from 'astro:content';import { cldAssetsLoader } from 'astro-cloudinary/loaders';
    export const collections = {  assets: defineCollection({    loader: cldAssetsLoader({      folder: '<Folder>' // Optional, without loads root directory    })  }),}

You can then use the [`getCollection()` or `getEntry()` query functions](/en/guides/content-collections/#querying-collections) to select one or many images or videos from your collection.

See [Cloudinary’s `cldAssetsLoader` documentation](https://astro.cloudinary.dev/cldassetsloader/basic-usage) for more information.

Generating Cloudinary image URLs
--------------------------------

[Section titled Generating Cloudinary image URLs](#generating-cloudinary-image-urls)

The Astro Cloudinary SDK provides a `getCldOgImageUrl()` helper for generating and using URLs for your images. Use this when you need a URL instead of a component to display your image.

One common use for a URL is for an Open Graph image in `<meta>` tags for social media cards. This helper, like the components, provides you access to Cloudinary transformations to create dynamic, unique social cards for any of your pages.

The following example shows the necessary `<meta>` tags for a social media card, using `getCldOgImageUrl()` to generate an Open Graph image:

Layout.astro

    ---import { getCldOgImageUrl } from 'astro-cloudinary/helpers';const ogImageUrl = getCldOgImageUrl({ src: '<Public ID>' });---<meta property="og:image" content={ogImageUrl} /><meta property="og:image:secure_url" content={ogImageUrl} /><meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta property="twitter:title" content="<Twitter Title>" /><meta property="twitter:card" content="summary_large_image" /><meta property="twitter:image" content={ogImageUrl} />

Find [Cloudinary Social Media Card templates](https://astro.cloudinary.dev/templates/social-media-cards) on the Cloudinary docs.

See [Cloudinary’s `getCldOgImageUrl()` documentation](https://astro.cloudinary.dev/getcldogimageurl/basic-usage) for more information.

Using Cloudinary in Node.js
---------------------------

[Section titled Using Cloudinary in Node.js](#using-cloudinary-in-nodejs)

For more complex asset management, uploading, or analysis, you can use the Cloudinary Node.js SDK when working in an Astro Node.js environment.

Install the Cloudinary Node.js SDK by running the appropriate command for your package manager:

*   [npm](#tab-panel-3182)
*   [pnpm](#tab-panel-3183)
*   [Yarn](#tab-panel-3184)

Terminal window

    npm install cloudinary

Terminal window

    pnpm add cloudinary

Terminal window

    yarn add cloudinary

Add the following environment variables in your `.env` file:

.env

    PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"PUBLIC_CLOUDINARY_API_KEY="<Your API Key>"CLOUDINARY_API_SECRET="<Your API Secret>"

Configure your account with a new Cloudinary instance by adding the following code between the fences of your Astro component:

Component.astro

    ---import { v2 as cloudinary } from "cloudinary";
    cloudinary.config({  cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,  api_key: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,  api_secret: import.meta.env.CLOUDINARY_API_SECRET,});---

This will give you access to all of the Cloudinary APIs to allow you to interact with your images, videos, and other supported files.

Component.astro

    await cloudinary.uploader.upload('./path/to/file');

Learn how to [upload files using the Cloudinary Node.js SDK with Astro Forms](https://www.youtube.com/watch?v=DQUYMyT2MTM).

Official Resources
------------------

[Section titled Official Resources](#official-resources)

*   [Cloudinary Astro SDK](https://astro.cloudinary.dev/)
*   [Cloudinary Node.js SDK](https://cloudinary.com/documentation/node_integration)
*   [Using Cloudinary with Astro (YouTube)](https://www.youtube.com/playlist?list=PL8dVGjLA2oMqnpf2tShn1exf5GkSWuu5-)
*   [Code Examples Using Cloudinary Astro SDK (GitHub)](https://github.com/cloudinary-community/cloudinary-examples/tree/main/examples/astro-cloudinary)

More DAM guides
---------------

*   ![](/logos/cloudinary.svg)
    
    ### [Cloudinary](/en/guides/media/cloudinary/)
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/guides/media/cloudinary.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Digital Asset Management overview](/en/guides/media/) [Next  
E-commerce](/en/guides/ecommerce/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)