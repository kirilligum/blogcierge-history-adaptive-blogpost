Experimental responsive images
==============================

**Type:** `boolean`  
**Default:** `false`  

**Added in:** `astro@5.0.0`

Enables support for automatic responsive images in your project.

The term [responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images) refers images that work well on different devices. This particularly applies to images that resize to fit their container, and that can be served in different sizes depending on the device’s screen size and resolution.

There are a number of additional properties that can be set to control how the image is displayed, but these can be complicated to handle manually. Incorrect handling of these properties can lead to images that are slow to download or that are not displayed correctly. This is one of the most common causes of poor Core Web Vitals and Lighthouse performance scores.

When this flag is enabled, Astro can automatically generate the required `srcset` and `sizes` values for images, and apply the correct styles to ensure they resize correctly. This behavior can be configured globally or on a per-image basis.

To enable the feature, first add the `responsiveImages` flag to your `astro.config.mjs` file:

astro.config.mjs

    {  experimental: {    responsiveImages: true,  },}

Enabling this flag will not change anything by default, but responsive images can then be configured by setting the [image layout](#image-layout) either globally or per image.

To do this, you have access to additional [`image` configuration settings](#configuration-settings) for controlling the default behavior of all images processed and optimized by Astro:

*   Local and remote images using [the Markdown `![]()` syntax](/en/guides/images/#images-in-markdown-files).
*   The [`<Image />`](/en/guides/images/#display-optimized-images-with-the-image--component) and [`<Picture />`](/en/guides/images/#create-responsive-images-with-the-picture--component) components.

Additionally, Astro’s image components can receive [responsive image props](#responsive-image-properties) to override these defaults on a per-image basis.

Images in your `public/` folder are never optimized, and responsive images are not supported.

Note

Enabling responsive images will generate additional image sizes for all affected images. For prerendered pages this happens during the build so may increase the build time of your project, especially if you have a large number of images.

For pages rendered on-demand the images are generated as-needed, so this has no impact on build times but may increase the number of transformations performed. Depending on your image service this may incur additional costs.

Image layout
------------

[Section titled Image layout](#image-layout)

In order to generate the correct `srcset` and `sizes` attributes, the `<Image />` and `<Picture />` components need to know how the image should resize when its container changes size. This is done by setting the `layout` prop, or `image.experimentalLayout` default. The supported values are:

*   `constrained` - The image will scale down to fit the container, maintaining its aspect ratio, but will not scale up beyond the specified `width` and `height`, or the image’s original dimensions. Use this if you want the image to display at the requested size where possible, but shrink to fit smaller screens. This matches the default behavior for images when using Tailwind. If you’re not sure, this is probably the layout you should choose.
*   `full-width` - The image will scale to fit the width of the container, maintaining its aspect ratio. Use this for hero images or other images that should take up the full width of the page.
*   `fixed` - The image will maintain the requested dimensions and not resize. It will generate a `srcset` to support high density displays, but not for different screen sizes. Use this if the image will not resize, for example icons or logos smaller than any screen width, or other images in a fixed-width container.
*   `none` - The image will not be responsive. No `srcset` or `sizes` will be automatically generated, and no styles will be applied. This is useful if you have enabled a default layout, but want to disable it for a specific image.

The chosen `layout` will be used to generate the correct `srcset` and `sizes` attributes for the image, and will define the default styles applied to that `<img>` tag.

Configuration settings
----------------------

[Section titled Configuration settings](#configuration-settings)

Set [`image.experimentalLayout`](/en/reference/configuration-reference/#imageexperimentallayout) with a default value to enable responsive images throughout your project.

If this value is not configured, you can still pass a `layout` prop to any `<Image />` or `<Picture />` component to create a responsive image. However, Markdown images will not be responsive.

Optionally, you can configure [`image.experimentalObjectFit`](/en/reference/configuration-reference/#imageexperimentalobjectfit) and [`image.experimentalObjectPosition`](/en/reference/configuration-reference/#imageexperimentalobjectposition) which will apply to all processed images by default.

Each of these settings can be overridden on any individual `<Image />` or `<Picture />` component with a prop, but Markdown images will always use the default settings.

astro.config.mjs

    {  image: {    // Used for all Markdown images; not configurable per-image    // Used for all `<Image />` and `<Picture />` components unless overridden with a prop    experimentalLayout: 'constrained',  },  experimental: {    responsiveImages: true,  },}

Responsive image properties
---------------------------

[Section titled Responsive image properties](#responsive-image-properties)

These are additional properties available to the `<Image />` and `<Picture />` components when responsive images are enabled:

*   `layout`: The [layout type](#image-layout) for the image. Can be `constrained`, `fixed`, `full-width`, or `none`. If set to `none`, responsive behavior is disabled for this image and all other options are ignored. Defaults to `none`, or the value of [`image.experimentalLayout`](/en/reference/configuration-reference/#imageexperimentallayout) if set.
*   `fit`: Defines how the image should be cropped if the aspect ratio is changed. Values match those of CSS `object-fit`. Defaults to `cover`, or the value of [`image.experimentalObjectFit`](/en/reference/configuration-reference/#imageexperimentalobjectfit) if set.
*   `position`: Defines the position of the image crop if the aspect ratio is changed. Values match those of CSS `object-position`. Defaults to `center`, or the value of [`image.experimentalObjectPosition`](/en/reference/configuration-reference/#imageexperimentalobjectposition) if set.
*   `priority`: If set, eagerly loads the image. Otherwise, images will be lazy-loaded. Use this for your largest above-the-fold image. Defaults to `false`.

The `widths` and `sizes` attributes are automatically generated based on the image’s dimensions and the layout type, and in most cases should not be set manually. The generated `sizes` attribute for `constrained` and `full-width` images is based on the assumption that the image is displayed at close to the full width of the screen when the viewport is smaller than the image’s width. If it is significantly different (e.g. if it’s in a multi-column layout on small screens) you may need to adjust the `sizes` attribute manually for best results.

The `densities` attribute is not compatible with responsive images and will be ignored if set.

For example, with `constrained` set as the default layout, you can override any individual image’s `layout` property:

    ---import { Image } from 'astro:assets';import myImage from '../assets/my_image.png';---<Image src={myImage} alt="This will use responsive layout" width={800} height={600} /><Image src={myImage} alt="This will use full-width layout" layout="full-width" /><Image src={myImage} alt="This will disable responsive images" layout="none" />

Generated HTML output for responsive images
-------------------------------------------

[Section titled Generated HTML output for responsive images](#generated-html-output-for-responsive-images)

When a layout is set, either by default or on an individual component, images have automatically generated `srcset` and `sizes` attributes based on the image’s dimensions and the layout type. Images with `constrained` and `full-width` layouts will have styles applied to ensure they resize according to their container.

MyComponent.astro

    ---import { Image, Picture } from 'astro:assets';import myImage from '../assets/my_image.png';---<Image src={myImage} alt="A description of my image." layout='responsive' width={800} height={600} /><Picture src={myImage} alt="A description of my image." layout='full-width' formats={['avif', 'webp', 'jpeg']} />

This `<Image />` component will generate the following HTML output:

    <img  src="/_astro/my_image.hash3.webp"  srcset="/_astro/my_image.hash1.webp 640w,      /_astro/my_image.hash2.webp 750w,      /_astro/my_image.hash3.webp 800w,      /_astro/my_image.hash4.webp 828w,      /_astro/my_image.hash5.webp 1080w,      /_astro/my_image.hash6.webp 1280w,      /_astro/my_image.hash7.webp 1600w"  alt="A description of my image"  sizes="(min-width: 800px) 800px, 100vw"  loading="lazy"  decoding="async"  fetchpriority="auto"  width="800"  height="600"  style="--fit: cover; --pos: center;"  data-astro-image="constrained">

Overriding image styles
-----------------------

[Section titled Overriding image styles](#overriding-image-styles)

The responsive image component applies a small number of styles to ensure they resize correctly. The applied styles depend on the layout type, and are designed to give the best behavior for the generated `srcset` and `sizes` attributes. These are the default styles:

Responsive Image Styles

    :where([data-astro-image]) {  object-fit: var(--fit);  object-position: var(--pos);}:where([data-astro-image='full-width']) {  width: 100%;}:where([data-astro-image='constrained']) {  max-width: 100%;}

You can override the `object-fit` and `object-position` styles by setting the `fit` and `position` props on the `<Image />` or `<Picture />` component.

The styles use the [`:where()` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:where), which has a [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity) of 0, meaning that it is easy to override with your own styles. Any class or tag name will have a higher specificity than `:where()`, so you can easily override the styles by adding your own class or tag name to the image.

Tailwind 4 is a special case, because it uses [cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), meaning the Tailwind rules are always lower specificity than rules that don’t use layers. Astro supports browsers that do not support cascade layers, so it cannot use them for images. This means that if you need to override the styles using Tailwind 4, you must use [the `!important` modifier](https://tailwindcss.com/docs/styling-with-utility-classes#using-the-important-modifier).

For a complete overview, and to give feedback on this experimental API, see the [Responsive Images RFC](https://github.com/withastro/roadmap/blob/responsive-images/proposals/0053-responsive-images.md).

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/experimental-flags/responsive-images.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Configuring experimental flags](/en/reference/experimental-flags/) [Next  
Fonts](/en/reference/experimental-flags/fonts/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

