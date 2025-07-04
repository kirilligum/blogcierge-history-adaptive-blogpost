Error reference
===============

The following reference is a complete list of the errors you may encounter while using Astro. For additional assistance, including common pitfalls, please also see our [Troubleshooting Guide](/en/guides/troubleshooting/).

Astro Errors
------------

[Section titled Astro Errors](#astro-errors)

*   [**UnknownCompilerError**](/en/reference/errors/unknown-compiler-error/)  
    Unknown compiler error.
*   [**ClientAddressNotAvailable**](/en/reference/errors/client-address-not-available/)  
    `Astro.clientAddress` is not available in current adapter.
*   [**PrerenderClientAddressNotAvailable**](/en/reference/errors/prerender-client-address-not-available/)  
    `Astro.clientAddress` cannot be used inside prerendered routes.
*   [**StaticClientAddressNotAvailable**](/en/reference/errors/static-client-address-not-available/)  
    `Astro.clientAddress` is not available in prerendered pages.
*   [**NoMatchingStaticPathFound**](/en/reference/errors/no-matching-static-path-found/)  
    No static path found for requested path.
*   [**OnlyResponseCanBeReturned**](/en/reference/errors/only-response-can-be-returned/)  
    Invalid type returned by Astro page.
*   [**MissingMediaQueryDirective**](/en/reference/errors/missing-media-query-directive/)  
    Missing value for `client:media` directive.
*   [**NoMatchingRenderer**](/en/reference/errors/no-matching-renderer/)  
    No matching renderer found.
*   [**NoClientEntrypoint**](/en/reference/errors/no-client-entrypoint/)  
    No client entrypoint specified in renderer.
*   [**NoClientOnlyHint**](/en/reference/errors/no-client-only-hint/)  
    Missing hint on `client:only` directive.
*   [**InvalidGetStaticPathParam**](/en/reference/errors/invalid-get-static-path-param/)  
    Invalid value returned by a `getStaticPaths` path.
*   [**InvalidGetStaticPathsEntry**](/en/reference/errors/invalid-get-static-paths-entry/)  
    Invalid entry inside getStaticPath’s return value
*   [**InvalidGetStaticPathsReturn**](/en/reference/errors/invalid-get-static-paths-return/)  
    Invalid value returned by getStaticPaths.
*   [**GetStaticPathsExpectedParams**](/en/reference/errors/get-static-paths-expected-params/)  
    Missing params property on `getStaticPaths` route.
*   [**GetStaticPathsInvalidRouteParam**](/en/reference/errors/get-static-paths-invalid-route-param/)  
    Invalid value for `getStaticPaths` route parameter.
*   [**GetStaticPathsRequired**](/en/reference/errors/get-static-paths-required/)  
    `getStaticPaths()` function required for dynamic routes.
*   [**ReservedSlotName**](/en/reference/errors/reserved-slot-name/)  
    Invalid slot name.
*   [**NoAdapterInstalled**](/en/reference/errors/no-adapter-installed/)  
    Cannot use Server-side Rendering without an adapter.
*   [**AdapterSupportOutputMismatch**](/en/reference/errors/adapter-support-output-mismatch/)  
    Adapter does not support server output.
*   [**NoAdapterInstalledServerIslands**](/en/reference/errors/no-adapter-installed-server-islands/)  
    Cannot use Server Islands without an adapter.
*   [**NoMatchingImport**](/en/reference/errors/no-matching-import/)  
    No import found for component.
*   [**InvalidPrerenderExport**](/en/reference/errors/invalid-prerender-export/)  
    Invalid prerender export.
*   [**InvalidComponentArgs**](/en/reference/errors/invalid-component-args/)  
    Invalid component arguments.
*   [**PageNumberParamNotFound**](/en/reference/errors/page-number-param-not-found/)  
    Page number param not found.
*   [**ImageMissingAlt**](/en/reference/errors/image-missing-alt/)  
    Image missing required “alt” property.
*   [**InvalidImageService**](/en/reference/errors/invalid-image-service/)  
    Error while loading image service.
*   [**MissingImageDimension**](/en/reference/errors/missing-image-dimension/)  
    Missing image dimensions
*   [**FailedToFetchRemoteImageDimensions**](/en/reference/errors/failed-to-fetch-remote-image-dimensions/)  
    Failed to retrieve remote image dimensions
*   [**UnsupportedImageFormat**](/en/reference/errors/unsupported-image-format/)  
    Unsupported image format
*   [**UnsupportedImageConversion**](/en/reference/errors/unsupported-image-conversion/)  
    Unsupported image conversion
*   [**PrerenderDynamicEndpointPathCollide**](/en/reference/errors/prerender-dynamic-endpoint-path-collide/)  
    Prerendered dynamic endpoint has path collision.
*   [**ExpectedImage**](/en/reference/errors/expected-image/)  
    Expected src to be an image.
*   [**ExpectedImageOptions**](/en/reference/errors/expected-image-options/)  
    Expected image options.
*   [**ExpectedNotESMImage**](/en/reference/errors/expected-not-esmimage/)  
    Expected image options, not an ESM-imported image.
*   [**IncompatibleDescriptorOptions**](/en/reference/errors/incompatible-descriptor-options/)  
    Cannot set both `densities` and `widths`
*   [**ImageNotFound**](/en/reference/errors/image-not-found/)  
    Image not found.
*   [**NoImageMetadata**](/en/reference/errors/no-image-metadata/)  
    Could not process image metadata.
*   [**CouldNotTransformImage**](/en/reference/errors/could-not-transform-image/)  
    Could not transform image.
*   [**ResponseSentError**](/en/reference/errors/response-sent-error/)  
    Unable to set response.
*   [**MiddlewareNoDataOrNextCalled**](/en/reference/errors/middleware-no-data-or-next-called/)  
    The middleware didn’t return a `Response`.
*   [**MiddlewareNotAResponse**](/en/reference/errors/middleware-not-aresponse/)  
    The middleware returned something that is not a `Response` object.
*   [**EndpointDidNotReturnAResponse**](/en/reference/errors/endpoint-did-not-return-aresponse/)  
    The endpoint did not return a `Response`.
*   [**LocalsNotAnObject**](/en/reference/errors/locals-not-an-object/)  
    Value assigned to `locals` is not accepted.
*   [**LocalsReassigned**](/en/reference/errors/locals-reassigned/)  
    `locals` must not be reassigned.
*   [**AstroResponseHeadersReassigned**](/en/reference/errors/astro-response-headers-reassigned/)  
    `Astro.response.headers` must not be reassigned.
*   [**MiddlewareCantBeLoaded**](/en/reference/errors/middleware-cant-be-loaded/)  
    Can’t load the middleware.
*   [**LocalImageUsedWrongly**](/en/reference/errors/local-image-used-wrongly/)  
    Local images must be imported.
*   [**AstroGlobUsedOutside**](/en/reference/errors/astro-glob-used-outside/)  
    Astro.glob() used outside of an Astro file.
*   [**AstroGlobNoMatch**](/en/reference/errors/astro-glob-no-match/)  
    Astro.glob() did not match any files.
*   [**RedirectWithNoLocation**](/en/reference/errors/redirect-with-no-location/)  
    A redirect must be given a location with the `Location` header.
*   [**UnsupportedExternalRedirect**](/en/reference/errors/unsupported-external-redirect/)  
    Unsupported or malformed URL.
*   [**InvalidDynamicRoute**](/en/reference/errors/invalid-dynamic-route/)  
    Invalid dynamic route.
*   [**MissingSharp**](/en/reference/errors/missing-sharp/)  
    Could not find Sharp.
*   [**UnknownViteError**](/en/reference/errors/unknown-vite-error/)  
    Unknown Vite Error.
*   [**FailedToLoadModuleSSR**](/en/reference/errors/failed-to-load-module-ssr/)  
    Could not import file.
*   [**InvalidGlob**](/en/reference/errors/invalid-glob/)  
    Invalid glob pattern.
*   [**FailedToFindPageMapSSR**](/en/reference/errors/failed-to-find-page-map-ssr/)  
    Astro couldn’t find the correct page to render
*   [**MissingLocale**](/en/reference/errors/missing-locale/)  
    The provided locale does not exist.
*   [**MissingIndexForInternationalization**](/en/reference/errors/missing-index-for-internationalization/)  
    Index page not found.
*   [**IncorrectStrategyForI18n**](/en/reference/errors/incorrect-strategy-for-i18n/)  
    You can’t use the current function with the current strategy
*   [**NoPrerenderedRoutesWithDomains**](/en/reference/errors/no-prerendered-routes-with-domains/)  
    Prerendered routes aren’t supported when internationalization domains are enabled.
*   [**MissingMiddlewareForInternationalization**](/en/reference/errors/missing-middleware-for-internationalization/)  
    Enabled manual internationalization routing without having a middleware.
*   [**CantRenderPage**](/en/reference/errors/cant-render-page/)  
    Astro can’t render the route.
*   [**UnhandledRejection**](/en/reference/errors/unhandled-rejection/)  
    Unhandled rejection
*   [**i18nNotEnabled**](/en/reference/errors/i18n-not-enabled/)  
    i18n Not Enabled
*   [**i18nNoLocaleFoundInPath**](/en/reference/errors/i18n-no-locale-found-in-path/)  
    The path doesn’t contain any locale
*   [**RouteNotFound**](/en/reference/errors/route-not-found/)  
    Route not found.
*   [**EnvInvalidVariables**](/en/reference/errors/env-invalid-variables/)  
    Invalid Environment Variables
*   [**ServerOnlyModule**](/en/reference/errors/server-only-module/)  
    Module is only available server-side
*   [**RewriteWithBodyUsed**](/en/reference/errors/rewrite-with-body-used/)  
    Cannot use Astro.rewrite after the request body has been read
*   [**ForbiddenRewrite**](/en/reference/errors/forbidden-rewrite/)  
    Forbidden rewrite to a static route.
*   [**UnknownFilesystemError**](/en/reference/errors/unknown-filesystem-error/)  
    An unknown error occurred while reading or writing files to disk.
*   [**CannotExtractFontType**](/en/reference/errors/cannot-extract-font-type/)  
    Cannot extract the font type from the given URL.
*   [**CannotDetermineWeightAndStyleFromFontFile**](/en/reference/errors/cannot-determine-weight-and-style-from-font-file/)  
    Cannot determine weight and style from font file.
*   [**CannotFetchFontFile**](/en/reference/errors/cannot-fetch-font-file/)  
    Cannot fetch the given font file.
*   [**CannotLoadFontProvider**](/en/reference/errors/cannot-load-font-provider/)  
    Cannot load font provider
*   [**ExperimentalFontsNotEnabled**](/en/reference/errors/experimental-fonts-not-enabled/)  
    Experimental fonts are not enabled
*   [**FontFamilyNotFound**](/en/reference/errors/font-family-not-found/)  
    Font family not found

CSS Errors
----------

[Section titled CSS Errors](#css-errors)

*   [**UnknownCSSError**](/en/reference/errors/unknown-csserror/)  
    Unknown CSS Error.
*   [**CSSSyntaxError**](/en/reference/errors/csssyntax-error/)  
    CSS Syntax Error.

Markdown Errors
---------------

[Section titled Markdown Errors](#markdown-errors)

*   [**UnknownMarkdownError**](/en/reference/errors/unknown-markdown-error/)  
    Unknown Markdown Error.
*   [**MarkdownFrontmatterParseError**](/en/reference/errors/markdown-frontmatter-parse-error/)  
    Failed to parse Markdown frontmatter.
*   [**InvalidFrontmatterInjectionError**](/en/reference/errors/invalid-frontmatter-injection-error/)  
    Invalid frontmatter injection.
*   [**MdxIntegrationMissingError**](/en/reference/errors/mdx-integration-missing-error/)  
    MDX integration missing.
*   [**UnknownConfigError**](/en/reference/errors/unknown-config-error/)  
    Unknown configuration error.
*   [**ConfigNotFound**](/en/reference/errors/config-not-found/)  
    Specified configuration file not found.
*   [**ConfigLegacyKey**](/en/reference/errors/config-legacy-key/)  
    Legacy configuration detected.

CLI Errors
----------

[Section titled CLI Errors](#cli-errors)

*   [**UnknownCLIError**](/en/reference/errors/unknown-clierror/)  
    Unknown CLI Error.
*   [**GenerateContentTypesError**](/en/reference/errors/generate-content-types-error/)  
    Failed to generate content types.

Content Collection Errors
-------------------------

[Section titled Content Collection Errors](#content-collection-errors)

*   [**UnknownContentCollectionError**](/en/reference/errors/unknown-content-collection-error/)  
    Unknown Content Collection Error.
*   [**RenderUndefinedEntryError**](/en/reference/errors/render-undefined-entry-error/)  
    Attempted to render an undefined content collection entry.
*   [**GetEntryDeprecationError**](/en/reference/errors/get-entry-deprecation-error/)  
    Invalid use of `getDataEntryById` or `getEntryBySlug` function.
*   [**InvalidContentEntryFrontmatterError**](/en/reference/errors/invalid-content-entry-frontmatter-error/)  
    Content entry frontmatter does not match schema.
*   [**InvalidContentEntryDataError**](/en/reference/errors/invalid-content-entry-data-error/)  
    Content entry data does not match schema.
*   [**ContentLoaderReturnsInvalidId**](/en/reference/errors/content-loader-returns-invalid-id/)  
    Content loader returned an entry with an invalid `id`.
*   [**ContentEntryDataError**](/en/reference/errors/content-entry-data-error/)  
    Content entry data does not match schema.
*   [**ContentLoaderInvalidDataError**](/en/reference/errors/content-loader-invalid-data-error/)  
    Content entry is missing an ID
*   [**InvalidContentEntrySlugError**](/en/reference/errors/invalid-content-entry-slug-error/)  
    Invalid content entry slug.
*   [**ContentSchemaContainsSlugError**](/en/reference/errors/content-schema-contains-slug-error/)  
    Content Schema should not contain `slug`.
*   [**MixedContentDataCollectionError**](/en/reference/errors/mixed-content-data-collection-error/)  
    Content and data cannot be in same collection.
*   [**ContentCollectionTypeMismatchError**](/en/reference/errors/content-collection-type-mismatch-error/)  
    Collection contains entries of a different type.
*   [**DataCollectionEntryParseError**](/en/reference/errors/data-collection-entry-parse-error/)  
    Data collection entry failed to parse.
*   [**DuplicateContentEntrySlugError**](/en/reference/errors/duplicate-content-entry-slug-error/)  
    Duplicate content entry slug.
*   [**UnsupportedConfigTransformError**](/en/reference/errors/unsupported-config-transform-error/)  
    Unsupported transform in content config.
*   [**FileParserNotFound**](/en/reference/errors/file-parser-not-found/)  
    File parser not found
*   [**FileGlobNotSupported**](/en/reference/errors/file-glob-not-supported/)  
    Glob patterns are not supported in the file loader

Action Errors
-------------

[Section titled Action Errors](#action-errors)

*   [**ActionsWithoutServerOutputError**](/en/reference/errors/actions-without-server-output-error/)  
    Actions must be used with server output.
*   [**ActionsReturnedInvalidDataError**](/en/reference/errors/actions-returned-invalid-data-error/)  
    Action handler returned invalid data.
*   [**ActionNotFoundError**](/en/reference/errors/action-not-found-error/)  
    Action not found.
*   [**ActionCalledFromServerError**](/en/reference/errors/action-called-from-server-error/)  
    Action unexpected called from the server.
*   [**ActionsCantBeLoaded**](/en/reference/errors/actions-cant-be-loaded/)  
    Can’t load the Astro actions.

Session Errors
--------------

[Section titled Session Errors](#session-errors)

*   [**SessionStorageInitError**](/en/reference/errors/session-storage-init-error/)  
    Session storage could not be initialized.
*   [**SessionStorageSaveError**](/en/reference/errors/session-storage-save-error/)  
    Session data could not be saved.
*   [**SessionWithoutSupportedAdapterOutputError**](/en/reference/errors/session-without-supported-adapter-output-error/)  
    Sessions cannot be used with an adapter that doesn’t support server output.
*   [**SessionConfigMissingError**](/en/reference/errors/session-config-missing-error/)  
    Session storage was enabled but not configured.
*   [**SessionConfigWithoutFlagError**](/en/reference/errors/session-config-without-flag-error/)  
    Session flag not set

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/astro/blob/main/packages/astro/src/core/errors/errors-data.ts) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Legacy flags](/en/reference/legacy-flags/) [Next  
Integrations overview](/en/guides/integrations-guide/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

