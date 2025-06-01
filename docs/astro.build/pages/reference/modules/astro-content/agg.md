Content Collections API Reference
=================================

**Added in:** `astro@2.0.0`

Content collections offer APIs to configure and query your Markdown or MDX documents in `src/content/`. For features and usage examples, [see our content collections guide](/en/guides/content-collections/).

Imports from `astro:content`
----------------------------

[Section titled Imports from astro:content](#imports-from-astrocontent)

    import {  z,  defineCollection,  getCollection,  getEntry,  getEntries,  reference,  render } from 'astro:content';

### `defineCollection()`

[Section titled defineCollection()](#definecollection)

**Type:** `(input: CollectionConfig) => CollectionConfig`

**Added in:** `astro@2.0.0`

`defineCollection()` is a utility to configure a collection in a `src/content.config.*` file.

src/content.config.ts

    import { z, defineCollection } from 'astro:content';import { glob } from 'astro/loaders';
    const blog = defineCollection({  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),  schema: z.object({    title: z.string(),    permalink: z.string().optional(),  }),});
    // Expose your defined collection to Astro// with the `collections` exportexport const collections = { blog };

This function accepts the following properties:

#### `loader`

[Section titled loader](#loader)

**Type:** `() => Promise<Array<{ id: string, [key: string]: any }> | Record<string, Record<string, any>>> | [Loader](/en/reference/content-loader-reference/#object-loader-api)`

**Added in:** `astro@5.0.0`

A `loader` is either an object or a function that allows you to load data from any source, local or remote, into content collections.

[See the `Content Collection` guide](/en/guides/content-collections/#defining-the-collection-loader) for example usage.

#### `schema`

[Section titled schema](#schema)

**Type:** `ZodType | (context: [SchemaContext](#schemacontext)) => ZodType`

**Added in:** `astro@2.0.0`

`schema` is an optional Zod object to configure the type and shape of document frontmatter for a collection. Each value must use [a Zod validator](https://github.com/colinhacks/zod).

[See the `Content Collection` guide](/en/guides/content-collections/#defining-the-collection-schema) for example usage.

### `reference()`

[Section titled reference()](#reference)

**Type:** `(collection: string) => ZodEffects<ZodString, { collection, id: string }>`  

**Added in:** `astro@2.5.0`

The `reference()` function is used in the content config to define a relationship, or “reference,” from one collection to another. This accepts a collection name and transforms the reference into an object containing the collection name and the reference id.

This example defines references from a blog author to the `authors` collection and an array of related posts to the same `blog` collection:

    import { defineCollection, reference, z } from 'astro:content';import { glob, file } from 'astro/loaders';
    const blog = defineCollection({  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),  schema: z.object({    // Reference a single author from the `authors` collection by `id`    author: reference('authors'),    // Reference an array of related posts from the `blog` collection by `slug`    relatedPosts: z.array(reference('blog')),  })});
    const authors = defineCollection({  loader: file("src/data/authors.json"),  schema: z.object({ /* ... */ })});
    export const collections = { blog, authors };

Validation of referenced entries happens at runtime when using `getEntry()` or `getEntries()`:

src/pages/\[posts\].astro

    // if a referenced entry is invalid, this will return undefined.const relatedPosts = await getEntries(blogPost.data.relatedPosts);

[See the `Content Collection` guide](/en/guides/content-collections/#defining-collection-references) for example usage.

### `getCollection()`

[Section titled getCollection()](#getcollection)

**Type:** `(collection: string, filter?: (entry: CollectionEntry<collection>) => boolean) => CollectionEntry<collection>[]`

**Added in:** `astro@2.0.0`

`getCollection()` is a function that retrieves a list of content collection entries by collection name.

It returns all items in the collection by default, and accepts an optional `filter` function to narrow by entry properties. This allows you to query for only some items in a collection based on `id` or frontmatter values via the `data` object.

    ---import { getCollection } from 'astro:content';
    // Get all `src/content/blog/` entriesconst allBlogPosts = await getCollection('blog');
    // Only return posts with `draft: true` in the frontmatterconst draftBlogPosts = await getCollection('blog', ({ data }) => {  return data.draft === true;});---

[See the `Content Collection` guide](/en/guides/content-collections/#querying-collections) for example usage.

### `getEntry()`

[Section titled getEntry()](#getentry)

**Types:**

*   `(collection: string, id: string) => Promise<CollectionEntry<collection> | undefined>`
*   `({ collection: string, id: string }) => Promise<CollectionEntry<collection> | undefined>`

**Added in:** `astro@2.5.0`

`getEntry()` is a function that retrieves a single collection entry by collection name and the entry `id`. `getEntry()` can also be used to get referenced entries to access the `data` or `body` properties:

    ---import { getEntry } from 'astro:content';
    // Get `src/content/blog/enterprise.md`const enterprisePost = await getEntry('blog', 'enterprise');
    // Get `src/content/captains/picard.json`const picardProfile = await getEntry('captains', 'picard');
    // Get the profile referenced by `data.captain`const enterpriseCaptainProfile = await getEntry(enterprisePost.data.captain);---

See the `Content Collections` guide for examples of [querying collection entries](/en/guides/content-collections/#querying-collections).

### `getEntries()`

[Section titled getEntries()](#getentries)

**Type:** `(Array<{ collection: string, id: string }>) => Array<CollectionEntry<collection>>`

**Added in:** `astro@2.5.0`

`getEntries()` is a function that retrieves multiple collection entries from the same collection. This is useful for [returning an array of referenced entries](/en/guides/content-collections/#defining-collection-references) to access their associated `data` and `body` properties.

    ---import { getEntries, getEntry } from 'astro:content';
    const enterprisePost = await getEntry('blog', 'enterprise');
    // Get related posts referenced by `data.relatedPosts`const enterpriseRelatedPosts = await getEntries(enterprisePost.data.relatedPosts);---

### `render()`

[Section titled render()](#render)

**Type:** `(entry: CollectionEntry) => Promise<RenderedEntry>`

**Added in:** `astro@5.0.0`

A function to compile a given entry for rendering. This returns the following properties:

*   `<Content />` - A component used to render the document’s contents in an Astro file.
*   `headings` - A generated list of headings, [mirroring Astro’s `getHeadings()` utility](/en/guides/markdown-content/#available-properties) on Markdown and MDX imports.
*   `remarkPluginFrontmatter` \- The modified frontmatter object after any [remark or rehype plugins have been applied](/en/guides/markdown-content/#modifying-frontmatter-programmatically). Set to type `any`.

    ---import { getEntry, render } from 'astro:content';const entry = await getEntry('blog', 'entry-1');
    if (!entry) {   // Handle Error, for example:  throw new Error('Could not find blog post 1');}const { Content, headings, remarkPluginFrontmatter } = await render(entry);---

[See the `Content Collection` guide](/en/guides/content-collections/#rendering-body-content) for example usage.

`astro:content` types
---------------------

[Section titled astro:content types](#astrocontent-types)

    import type {  CollectionEntry,  CollectionKey,  ContentCollectionKey,  DataCollectionKey,  SchemaContext, } from 'astro:content';

### `CollectionEntry`

[Section titled CollectionEntry](#collectionentry)

Query functions including [`getCollection()`](#getcollection), [`getEntry()`](#getentry), and [`getEntries()`](#getentries) each return entries with the `CollectionEntry` type. This type is available as a utility from `astro:content`:

    import type { CollectionEntry } from 'astro:content';

`CollectionEntry` is a generic type. Use it with the name of the collection you’re querying. For example, an entry in your `blog` collection would have the type `CollectionEntry<'blog'>`.

Each `CollectionEntry` is an object with the following values:

#### `id`

[Section titled id](#id)

**Type:** `string`

A unique ID. Note that all IDs from Astro’s built-in `glob()` loader are slugified.

#### `collection`

[Section titled collection](#collection)

**Example Type:** `'blog' | 'authors' | ...`

The name of a collection in which entries are located. This is the name used to reference the collection in your schema, and in querying functions.

#### `data`

[Section titled data](#data)

**Type:** `CollectionSchema<TCollectionName>`

An object of frontmatter properties inferred from your collection schema ([see `defineCollection()` reference](#definecollection)). Defaults to `any` if no schema is configured.

#### `body`

[Section titled body](#body)

**Type:** `string`

A string containing the raw, uncompiled body of the Markdown or MDX document.

### `CollectionKey`

[Section titled CollectionKey](#collectionkey)

**Added in:** `astro@3.1.0`

A string union of all collection names defined in your `src/content.config.*` file. This type can be useful when defining a generic function wrapping the built-in `getCollection()`.

    import { type CollectionKey, getCollection } from 'astro:content';
    async function queryCollection(collection: CollectionKey) {  return getCollection(collection, ({ data }) => {    return data.draft !== true;  });}

### `SchemaContext`

[Section titled SchemaContext](#schemacontext)

The `context` object that `defineCollection` uses for the function shape of `schema`. This type can be useful when building reusable schemas for multiple collections.

This includes the following property:

*   `image` - The `image()` schema helper that allows you [to use local images in Content Collections](/en/guides/images/#images-in-content-collections)

    import { defineCollection, z, type SchemaContext } from "astro:content";
    export const imageSchema = ({ image }: SchemaContext) =>    z.object({        image: image(),        description: z.string().optional(),    });
    const blog = defineCollection({  loader: /* ... */,  schema: ({ image }) => z.object({    title: z.string(),    permalink: z.string().optional(),    image: imageSchema({ image })  }),});

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/modules/astro-content.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
astro:config](/en/reference/modules/astro-config/) [Next  
astro:env](/en/reference/modules/astro-env/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

