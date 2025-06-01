Image Service API
=================

`astro:assets` was designed to make it easy for any image optimization service to build a service on top of Astro.

What is an Image Service?
-------------------------

[Section titled What is an Image Service?](#what-is-an-image-service)

Astro provides two types of image services: Local and External.

*   **Local services** handle image transformations directly at build for static sites, or at runtime both in development mode and for on-demand rendering. These are often wrappers around libraries like Sharp, ImageMagick, or Squoosh. In dev mode and in production routes rendered on demand, local services use an API endpoint to do the transformation.
*   **External services** point to URLs and can add support for services such as Cloudinary, Vercel, or any [RIAPI](https://github.com/riapi/riapi)\-compliant server.

Building using the Image Services API
-------------------------------------

[Section titled Building using the Image Services API](#building-using-the-image-services-api)

Service definitions take the shape of an exported default object with various required methods (“hooks”).

External services provide a `getURL()` that points to the `src` of the output `<img>` tag.

Local services provide a `transform()` method to perform transformations on your image, and `getURL()` and `parseURL()` methods to use an endpoint for dev mode and when rendered on demand.

Both types of services can provide `getHTMLAttributes()` to determine the other attributes of the output `<img>` and `validateOptions()` to validate and augment the passed options.

### External Services

[Section titled External Services](#external-services)

An external service points to a remote URL to be used as the `src` attribute of the final `<img>` tag. This remote URL is responsible for downloading, transforming, and returning the image.

    import type { ExternalImageService, ImageTransform, AstroConfig } from "astro";
    const service: ExternalImageService = {  validateOptions(options: ImageTransform, imageConfig: AstroConfig['image']) {    const serviceConfig = imageConfig.service.config;
        // Enforce the user set max width.    if (options.width > serviceConfig.maxWidth) {      console.warn(`Image width ${options.width} exceeds max width ${serviceConfig.maxWidth}. Falling back to max width.`);      options.width = serviceConfig.maxWidth;    }
        return options;  },  getURL(options, imageConfig) {    return `https://mysupercdn.com/${options.src}?q=${options.quality}&w=${options.width}&h=${options.height}`;  },  getHTMLAttributes(options, imageConfig) {    const { src, format, quality, ...attributes } = options;    return {      ...attributes,      loading: options.loading ?? 'lazy',      decoding: options.decoding ?? 'async',    };  }};
    
    export default service;

### Local Services

[Section titled Local Services](#local-services)

To create your own local service, you can point to the [built-in endpoint](https://github.com/withastro/astro/blob/main/packages/astro/src/assets/endpoint/generic.ts) (`/_image`), or you can additionally create your own endpoint that can call the service’s methods.

    import type { LocalImageService, AstroConfig } from "astro";
    const service: LocalImageService = {  getURL(options: ImageTransform, imageConfig: AstroConfig['image']) {    const searchParams = new URLSearchParams();    searchParams.append('href', typeof options.src === "string" ? options.src : options.src.src);    options.width && searchParams.append('w', options.width.toString());    options.height && searchParams.append('h', options.height.toString());    options.quality && searchParams.append('q', options.quality.toString());    options.format && searchParams.append('f', options.format);    return `/my_custom_endpoint_that_transforms_images?${searchParams}`;    // Or use the built-in endpoint, which will call your parseURL and transform functions:    // return `/_image?${searchParams}`;  },  parseURL(url: URL, imageConfig) {    return {      src: params.get('href')!,      width: params.has('w') ? parseInt(params.get('w')!) : undefined,      height: params.has('h') ? parseInt(params.get('h')!) : undefined,      format: params.get('f'),      quality: params.get('q'),    };  },  transform(buffer: Uint8Array, options: { src: string, [key: string]: any }, imageConfig): { data: Uint8Array, format: OutputFormat } {    const { buffer } = mySuperLibraryThatEncodesImages(options);    return {      data: buffer,      format: options.format,    };  },  getHTMLAttributes(options, imageConfig) {    let targetWidth = options.width;    let targetHeight = options.height;    if (typeof options.src === "object") {      const aspectRatio = options.src.width / options.src.height;
          if (targetHeight && !targetWidth) {        targetWidth = Math.round(targetHeight * aspectRatio);      } else if (targetWidth && !targetHeight) {        targetHeight = Math.round(targetWidth / aspectRatio);      }    }
        const { src, width, height, format, quality, ...attributes } = options;
        return {      ...attributes,      width: targetWidth,      height: targetHeight,      loading: attributes.loading ?? 'lazy',      decoding: attributes.decoding ?? 'async',    };  },  propertiesToHash: ['src', 'width', 'height', 'format', 'quality'],};export default service;

At build time for static sites and pre-rendered routes, both `<Image />` and `getImage(options)` call the `transform()` function. They pass options either through component attributes or an `options` argument, respectively. The transformed images will be built to a `dist/_astro` folder. Their file names will contain a hash of the properties passed to `propertiesToHash`. This property is optional and will default to `['src', 'width', 'height', 'format', 'quality']`. If your custom image service has more options that change the generated images, add these to the array.

In dev mode and when using an adapter to render on demand, Astro doesn’t know ahead of time which images need to be optimized. Astro uses a GET endpoint (by default, `/_image`) to process the images at runtime. `<Image />` and `getImage()` pass their options to `getURL()`, which will return the endpoint URL. Then, the endpoint calls `parseURL()` and passes the resulting properties to `transform()`.

#### getConfiguredImageService & imageConfig

[Section titled getConfiguredImageService &amp; imageConfig](#getconfiguredimageservice--imageconfig)

If you implement your own endpoint as an Astro endpoint, you can use `getConfiguredImageService` and `imageConfig` to call your service’s `parseURL` and `transform` methods and provide the image config.

To access the image service config ([`image.service.config`](/en/reference/configuration-reference/#imageservice)), you can use `imageConfig.service.config`.

src/api/my\_custom\_endpoint\_that\_transforms\_images.ts

    import type { APIRoute } from "astro";import { getConfiguredImageService, imageConfig } from 'astro:assets';
    export const GET: APIRoute = async ({ request }) => {  const imageService = await getConfiguredImageService();
      const imageTransform = imageService.parseURL(new URL(request.url), imageConfig);  // ... fetch the image from imageTransform.src and store it in inputBuffer  const { data, format } = await imageService.transform(inputBuffer, imageTransform, imageConfig);  return new Response(data, {      status: 200,      headers: {        'Content-Type': mime.getType(format) || ''      }    }  );}

[See the built-in endpoint](https://github.com/withastro/astro/blob/main/packages/astro/src/assets/endpoint/generic.ts) for a full example.

Hooks
-----

[Section titled Hooks](#hooks)

### `getURL()`

[Section titled getURL()](#geturl)

**Required for local and external services**

`getURL(options: ImageTransform, imageConfig: AstroConfig['image']): string`

For local services, this hook returns the URL of the endpoint that generates your image (for on-demand rendering and in dev mode). It is unused during build. The local endpoint that `getURL()` points to may call both `parseURL()` and `transform()`.

For external services, this hook returns the final URL of the image.

For both types of services, `options` are the properties passed by the user as attributes of the `<Image />` component or as options to `getImage()`. They are of the following type:

    export type ImageTransform = {    // ESM imported images | remote/public image paths    src: ImageMetadata | string;    width?: number;    height?: number;    widths?: number[] | undefined;    densities?: (number | `${number}x`)[] | undefined;    quality?: ImageQuality;    format?: OutputFormat;    alt?: string;    [key: string]: any;};

### `parseURL()`

[Section titled parseURL()](#parseurl)

**Required for local services; unavailable for external services**

`parseURL(url: URL, imageConfig: AstroConfig['image']): { src: string, [key: string]: any}`

This hook parses the generated URLs by `getURL()` back into an object with the different properties to be used by `transform` (for on-demand rendering and in dev mode). It is unused during build.

### `transform()`

[Section titled transform()](#transform)

**Required for local services only; unavailable for external services**

`transform(buffer: Uint8Array, options: { src: string, [key: string]: any }, imageConfig: AstroConfig['image']): { data: Uint8Array, format: OutputFormat }`

This hook transforms and returns the image and is called during the build to create the final asset files.

You must return a `format` to ensure that the proper MIME type is served to users for on-demand rendering and development mode.

### `getHTMLAttributes()`

[Section titled getHTMLAttributes()](#gethtmlattributes)

**Optional for both local and external services**

`getHTMLAttributes(options: ImageTransform, imageConfig: AstroConfig['image']): Record<string, any>`

This hook returns all additional attributes used to render the image as HTML, based on the parameters passed by the user (`options`).

### `getSrcSet()`

[Section titled getSrcSet()](#getsrcset)

**Added in:** `astro@3.3.0`

**Optional for both local and external services.**

`getSrcSet?: (options: ImageTransform, imageConfig: AstroConfig['image']): SrcSetValue[] | Promise<SrcSetValue[]>;`

This hook generates multiple variants of the specified image, for example, to generate a `srcset` attribute on an `<img>` or `<picture>`’s `source`.

This hook returns an array of objects with the following properties:

    export type SrcSetValue = {  transform: ImageTransform;  descriptor?: string;  attributes?: Record<string, any>;};

### `validateOptions()`

[Section titled validateOptions()](#validateoptions)

**Optional for both local and external services**

`validateOptions(options: ImageTransform, imageConfig: AstroConfig['image']): ImageTransform`

This hook allows you to validate and augment the options passed by the user. This is useful for setting default options, or telling the user that a parameter is required.

[See how `validateOptions()` is used in Astro built-in services](https://github.com/withastro/astro/blob/0ab6bad7dffd413c975ab00e545f8bc150f6a92f/packages/astro/src/assets/services/service.ts#L124).

User configuration
------------------

[Section titled User configuration](#user-configuration)

Configure the image service to use in `astro.config.mjs`. The config takes the following form:

astro.config.mjs

    import { defineConfig } from "astro/config";
    export default defineConfig({  image: {    service: {      entrypoint: "your-entrypoint", // 'astro/assets/services/sharp' | string,      config: {        // ... service-specific config. Optional.      }    }  },});

Utilities
---------

[Section titled Utilities](#utilities)

Astro exposes a number of helper functions that can be used to develop a custom image service. These utilities can be imported from `astro/assets/utils`:

    import {    isRemoteAllowed,    matchHostname,    matchPathname,    matchPattern,    matchPort,    matchProtocol,    isESMImportedImage,    isRemoteImage,    resolveSrc,    imageMetadata,    emitESMImage,    getOrigQueryParams,    inferRemoteSize,    propsToFilename,    hashTransform} from "astro/assets/utils";

### `isRemoteAllowed()`

[Section titled isRemoteAllowed()](#isremoteallowed)

**Type:** `(src: string, { domains, remotePatterns }: {domains: string[], remotePatterns: RemotePattern[] }): boolean`  

**Added in:** `astro@4.0.0`

Determines whether a given remote resource, identified by its source URL, is allowed based on specified domains and remote patterns.

    import { isRemoteAllowed } from 'astro/assets/utils';
    const testImageURL = 'https://example.com/images/test.jpg';const domains = ['example.com', 'anotherdomain.com'];const remotePatterns = [  { protocol: 'https', hostname: 'images.example.com', pathname: '/**' }, // Allow any path under this hostname];
    const url = new URL(testImageURL);const isAllowed = isRemoteAllowed(url.href, { domains, remotePatterns });
    console.log(`Is the remote image allowed? ${isAllowed}`);

### `matchHostname()`

[Section titled matchHostname()](#matchhostname)

**Type:** `(url: URL, hostname?: string, allowWildcard = false): boolean`  

**Added in:** `astro@4.0.0`

Matches a given URL’s hostname against a specified hostname, with optional support for wildcard patterns.

    import { matchHostname } from 'astro/assets/utils';
    const testURL = new URL('https://sub.example.com/path/to/resource');
    // Example usage of matchHostnameconst hostnameToMatch = 'example.com';
    // Match without wildcardconst isMatchWithoutWildcard = matchHostname(testURL, hostnameToMatch);console.log(`Does the hostname match without wildcard? ${isMatchWithoutWildcard}`); // Output: false
    // Match with wildcardconst isMatchWithWildcard = matchHostname(testURL, hostnameToMatch, true);console.log(`Does the hostname match with wildcard? ${isMatchWithWildcard}`); // Output: true

### `matchPathname()`

[Section titled matchPathname()](#matchpathname)

**Type:** `(url: URL, pathname?: string, allowWildcard = false): boolean`  

**Added in:** `astro@4.0.0`

Matches a given URL’s pathname against a specified pattern, with optional support for wildcards.

    import { matchPathname } from 'astro/assets/utils';
    const testURL = new URL('https://example.com/images/photo.jpg');
    // Example pathname to matchconst pathnameToMatch = '/images/photo.jpg';
    // Match without wildcardconst isMatchWithoutWildcard = matchPathname(testURL, pathnameToMatch);console.log(`Does the pathname match without wildcard? ${isMatchWithoutWildcard}`); // Output: true
    // Match with wildcardconst wildcardPathname = '/images/*';const isMatchWithWildcard = matchPathname(testURL, wildcardPathname, true);console.log(`Does the pathname match with wildcard? ${isMatchWithWildcard}`); // Output: true

### `matchPattern()`

[Section titled matchPattern()](#matchpattern)

**Type:** `(url: URL, remotePattern: RemotePattern): boolean`  

**Added in:** `astro@4.0.0`

Evaluates whether a given URL matches the specified remote pattern based on protocol, hostname, port, and pathname.

    import { matchPattern } from 'astro/assets/utils';
    const testURL = new URL('https://images.example.com/photos/test.jpg');
    // Define a remote pattern to match the URLconst remotePattern = {  protocol: 'https',  hostname: 'images.example.com',  pathname: '/photos/**', // Wildcard to allow all files under /photos/  port: '', // Optional: Match any port or leave empty for default};
    // Check if the URL matches the remote patternconst isPatternMatched = matchPattern(testURL, remotePattern);
    console.log(`Does the URL match the remote pattern? ${isPatternMatched}`); // Output: true

### `matchPort()`

[Section titled matchPort()](#matchport)

**Type:** `(url: URL, port?: string): boolean`  

**Added in:** `astro@4.0.0`

Checks if the given URL’s port matches the specified port. If no port is provided, it returns `true`.

    import { matchPort } from 'astro/assets/utils';
    const testURL1 = new URL('https://example.com:8080/resource');const testURL2 = new URL('https://example.com/resource');
    // Example usage of matchPortconst portToMatch = '8080';
    // Match a URL with a port specifiedconst isPortMatch1 = matchPort(testURL1, portToMatch);console.log(`Does the port match? ${isPortMatch1}`); // Output: true
    // Match a URL without a port specified (default port will be assumed)const isPortMatch2 = matchPort(testURL2, portToMatch);console.log(`Does the port match? ${isPortMatch2}`); // Output: false
    // Check a URL without explicitly providing a port (defaults to true if port is undefined)const isPortMatch3 = matchPort(testURL1);console.log(`Does the port match (no port specified)? ${isPortMatch3}`); // Output: true

### `matchProtocol()`

[Section titled matchProtocol()](#matchprotocol)

**Type:** `(url: URL, protocol?: string): boolean`  

**Added in:** `astro@4.0.0`

Compares the protocol of the provided URL with a specified protocol.

    import { matchProtocol } from 'astro/assets/utils';
    const testURL1 = new URL('https://example.com/resource');const testURL2 = new URL('http://example.com/resource');
    // Example usage of matchProtocolconst protocolToMatch = 'https';
    // Match a URL with correct protocolconst isProtocolMatch1 = matchProtocol(testURL1, protocolToMatch);console.log(`Does the protocol match for testURL1? ${isProtocolMatch1}`); // Output: true
    // Match a URL with incorrect protocolconst isProtocolMatch2 = matchProtocol(testURL2, protocolToMatch);console.log(`Does the protocol match for testURL2? ${isProtocolMatch2}`); // Output: false
    // Match a URL without explicitly providing a protocol (defaults to true if protocol is undefined)const isProtocolMatch3 = matchProtocol(testURL1);console.log(`Does the protocol match (no protocol specified)? ${isProtocolMatch3}`); // Output: true

### `isESMImportedImage()`

[Section titled isESMImportedImage()](#isesmimportedimage)

**Type:** `(src: ImageMetadata | string): boolean`  

**Added in:** `astro@4.0.0`

Determines if the given source is an ECMAScript Module (ESM) imported image.

    import { isESMImportedImage } from 'astro/assets/utils';
    // Example usage of isESMImportedImageconst imageMetadataExample = {  src: '/images/photo.jpg',  width: 800,  height: 600,  format: 'jpg',};
    const filePathExample = '/images/photo.jpg';
    // Check if the input is an ESM imported imageconst isMetadataImage = isESMImportedImage(imageMetadataExample);console.log(`Is imageMetadataExample an ESM imported image? ${isMetadataImage}`); // Output: true
    const isFilePathImage = isESMImportedImage(filePathExample);console.log(`Is filePathExample an ESM imported image? ${isFilePathImage}`); // Output: false

### `isRemoteImage()`

[Section titled isRemoteImage()](#isremoteimage)

**Type:** `(src: ImageMetadata | string): boolean`  

**Added in:** `astro@4.0.0`

Determines if the provided source is a remote image URL in the form of a string.

    import { isRemoteImage } from 'astro/assets/utils';
    // Example usage of isRemoteImageconst remoteImageUrl = 'https://example.com/images/photo.jpg';const localImageMetadata = {  src: '/images/photo.jpg',  width: 800,  height: 600,  format: 'jpg',};
    // Check if the input is a remote image URLconst isRemote1 = isRemoteImage(remoteImageUrl);console.log(`Is remoteImageUrl a remote image? ${isRemote1}`); // Output: true
    const isRemote2 = isRemoteImage(localImageMetadata);console.log(`Is localImageMetadata a remote image? ${isRemote2}`); // Output: false

### `resolveSrc()`

[Section titled resolveSrc()](#resolvesrc)

**Type:** `(src: UnresolvedImageTransform['src']): Promise<string | ImageMetadata>`  

**Added in:** `astro@4.0.0`

Returns the image source. This function ensures that if `src` is a Promise (e.g., a dynamic `import()`), it is awaited and the correct `src` is extracted. If `src` is already a resolved value, it is returned as-is.

    import { resolveSrc } from 'astro/assets/utils';import localImage from "./images/photo.jpg";
    const resolvedLocal = await resolveSrc(localImage);// will be `{ src: '/images/photo.jpg', width: 800, height: 600, format: 'jpg' }`
    const resolvedRemote = await resolveSrc("https://example.com/remote-img.jpg");// will be `"https://example.com/remote-img.jpg"`
    const resolvedDynamic = await resolveSrc(import("./images/dynamic-image.jpg"))// will be `{ src: '/images/dynamic-image.jpg', width: 800, height: 600, format: 'jpg' }`

### `imageMetadata()`

[Section titled imageMetadata()](#imagemetadata)

**Type:** `(data: Uint8Array, src?: string): Promise<Omit<ImageMetadata, 'src' | 'fsPath'>>`  

**Added in:** `astro@4.0.0`

Extracts image metadata such as dimensions, format, and orientation from the provided image data.

    import { imageMetadata } from 'astro/assets/utils';
    async function extractImageMetadata() {  // Example image data (Uint8Array)  const exampleImageData = new Uint8Array([/* ...binary image data... */]);
      // Optional source path (useful for debugging or additional metadata context)  const sourcePath = '/images/photo.jpg';
      try {    // Extract metadata from the image data    const metadata = await imageMetadata(exampleImageData, sourcePath);
        console.log('Extracted Image Metadata:', metadata);    // Example output:    // {    //   width: 800,    //   height: 600,    //   format: 'jpg',    //   orientation: undefined    // }  } catch (error) {    console.error('Failed to extract metadata from image:', error);  }}
    await extractImageMetadata();

### `emitESMImage()`

[Section titled emitESMImage()](#emitesmimage)

Deprecated

Use the [`emitImageMetadata`](#emitimagemetadata) function instead.

**Type:** `(id: string | undefined, _watchMode: boolean, experimentalSvgEnabled: boolean, fileEmitter?: FileEmitter): Promise<ImageMetadataWithContents | undefined>`  

**Added in:** `astro@4.0.0`

Processes an image file and emits its metadata and optionally its contents. In build mode, the function uses `fileEmitter` to generate an asset reference. In development mode, it resolves to a local file URL with query parameters for metadata.

    import { emitESMImage } from 'astro/assets/utils';
    const imageId = '/images/photo.jpg';const unusedWatchMode = false; // Deprecated, unusedconst unusedExperimentalSvgEnabled = false; // Set to `true` only if you are using SVG and want the file data to be embedded
    try {  const result = await emitESMImage(imageId, unusedWatchMode, unusedExperimentalSvgEnabled);  if (result) {    console.log('Image metadata with contents:', result);    // Example output:    // {    //   width: 800,    //   height: 600,    //   format: 'jpg',    //   contents: Uint8Array([...])    // }  } else {    console.log('No metadata was emitted for this image.');  }} catch (error) {  console.error('Failed to emit ESM image:', error);}

### `emitImageMetadata()`

[Section titled emitImageMetadata()](#emitimagemetadata)

**Type:** `(id: string | undefined, fileEmitter?: FileEmitter): Promise<ImageMetadataWithContents | undefined>`  

**Added in:** `astro@5.7.0`

Processes an image file and emits its metadata and optionally its contents. In build mode, the function uses `fileEmitter` to generate an asset reference. In development mode, it resolves to a local file URL with query parameters for metadata.

    import { emitImageMetadata } from 'astro/assets/utils';
    const imageId = '/images/photo.jpg';
    try {  const result = await emitImageMetadata(imageId);  if (result) {    console.log('Image metadata with contents:', result);    // Example output:    // {    //   width: 800,    //   height: 600,    //   format: 'jpg',    //   contents: Uint8Array([...])    // }  } else {    console.log('No metadata was emitted for this image.');  }} catch (error) {  console.error('Failed to emit ESM image:', error);}

### `getOrigQueryParams()`

[Section titled getOrigQueryParams()](#getorigqueryparams)

**Type:** `(params: URLSearchParams): Pick<ImageMetadata, 'width' | 'height' | 'format'> | undefined`  

**Added in:** `astro@4.0.0`

Retrieves the `width`, `height`, and `format` of an image from a [`URLSearchParams` object](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams). If any of these parameters are missing or invalid, the function returns `undefined`.

    import { getOrigQueryParams } from 'astro/assets/utils';
    const url = new URL('https://example.com/image.jpg?width=800&height=600&format=jpg');const queryParams = url.searchParams;
    // Extract the original query parametersconst origParams = getOrigQueryParams(queryParams);
    if (origParams) {  console.log('Original query parameters:', origParams);  // Example output:  // {  //   width: 800,  //   height: 600,  //   format: 'jpg'  // }} else {  console.log('Failed to extract original query parameters.');}

### `inferRemoteSize()`

[Section titled inferRemoteSize()](#inferremotesize)

**Type:** `(url: string): Promise<Omit<ImageMetadata, 'src' | 'fsPath'>>`  

**Added in:** `astro@4.0.0`

Infers the dimensions of a remote image by streaming its data and analyzing it progressively until sufficient metadata is available.

    import { inferRemoteSize } from 'astro/assets/utils';
    async function getRemoteImageSize() {  const remoteImageUrl = 'https://example.com/image.jpg';
      try {    // Infer remote image size from the URL    const imageSize = await inferRemoteSize(remoteImageUrl);
        console.log('Inferred remote image size:', imageSize);    // Example output:    // {    //   width: 1920,    //   height: 1080,    //   format: 'jpg'    // }  } catch (error) {    console.error('Failed to infer the size of the remote image:', error);  }}
    await getRemoteImageSize();

### `propsToFilename()`

[Section titled propsToFilename()](#propstofilename)

**Type:** `(filePath: string, transform: ImageTransform, hash: string): string`  

**Added in:** `astro@4.0.0`

Generates a formatted filename for an image based on its source path, transformation properties, and a unique hash.

The formatted filename follows this structure:

`<prefixDirname>/<baseFilename>_<hash><outputExtension>`

*   `prefixDirname`: If the image is an ESM imported image, this is the directory name of the original file path; otherwise, it will be an empty string.
*   `baseFilename`: The base name of the file or a hashed short name if the file is a `data:` URI.
*   `hash`: A unique hash string generated to distinguish the transformed file.
*   `outputExtension`: The desired output file extension derived from the `transform.format` or the original file extension.

    import { propsToFilename } from 'astro/assets/utils';
    function generateTransformedFilename() {  const filePath = '/images/photo.jpg';  const transform = {    format: 'png',    src: '/images/photo.jpg'  };  const hash = 'abcd1234';
      // Generate the transformed filename based on the file path, transformation, and hash  const filename = propsToFilename(filePath, transform, hash);
      console.log('Generated transformed filename:', filename);  // Example output: '/images/photo_abcd1234.png'}
    generateTransformedFilename();

### `hashTransform()`

[Section titled hashTransform()](#hashtransform)

**Type:** `(transform: ImageTransform, imageService: string, propertiesToHash: string[]): string`  

**Added in:** `astro@4.0.0`

Transforms the provided `transform` object into a hash string based on selected properties and the specified `imageService`.

    import { hashTransform } from 'astro/assets/utils';
    function generateTransformHash() {  const transform = {    width: 800,    height: 600,    format: 'jpg',  };
      const imageService = 'astroImageService';  const propertiesToHash = ['width', 'height', 'format'];
      // Generate the hash based on the transform, image service, and properties  const hash = hashTransform(transform, imageService, propertiesToHash);
      console.log('Generated transform hash:', hash);  // Example output: 'd41d8cd98f00b204e9800998ecf8427e'}
    generateTransformHash();

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/image-service-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Content Loader API](/en/reference/content-loader-reference/) [Next  
Dev Toolbar App API](/en/reference/dev-toolbar-app-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)