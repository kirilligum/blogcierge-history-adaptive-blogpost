Dynamically import images
=========================

Local [images](/en/guides/images/) must be imported into `.astro` files in order to display them. There will be times where you will want or need to dynamically import the image paths of your images instead of explicitly importing each individual image.

In this recipe, you will learn how to dynamically import your images using Vite’s `import.meta.glob` function. You will build a card component that displays the name, age, and photo of a person.

Recipe
------

[Section titled Recipe](#recipe)

1.  Create a new `assets` folder under the `src` directory and add your images inside that new folder.
    
    *   Directorysrc/
        
        *   Directoryassets/
            
            *   avatar-1.jpg
            *   avatar-2.png
            *   avatar-3.jpeg
            
        
    
    Note
    
    `assets` is a popular folder name convention for placing images but you are free to name the folder whatever you like.
    
2.  Create a new Astro component for your card and import the `<Image />` component.
    
    src/components/MyCustomCardComponent.astro
    
        ---import { Image } from 'astro:assets';---
    
3.  Specify the `props` that your component will receive in order to display the necessary information on each card. You can optionally define their types, if you are using TypeScript in your project.
    
    src/components/MyCustomCardComponent.astro
    
        ---import { Image } from 'astro:assets';
        interface Props {   imagePath: string;   altText: string;   name: string;   age: number;}
        const { imagePath, altText, name, age } = Astro.props;---
    
4.  Create a new `images` variable and use the `import.meta.glob` function which returns an object of all of the image paths inside the `assets` folder. You will also need to import `ImageMetadata` type to help define the type of the `images` variable.
    
    src/components/MyCustomCardComponent.astro
    
        ---import type { ImageMetadata } from 'astro';import { Image } from 'astro:assets';
        interface Props {   imagePath: string;   altText: string;   name: string;   age: number;}
        const { imagePath, altText, name, age } = Astro.props;const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/*.{jpeg,jpg,png,gif}')---
    
5.  Use the props to create the markup for your card component.
    
    src/components/MyCustomCardComponent.astro
    
        ---import type { ImageMetadata } from 'astro';import { Image } from 'astro:assets';
        interface Props {   imagePath: string;   altText: string;   name: string;   age: number;}
        const { imagePath, altText, name, age } = Astro.props;const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/*.{jpeg,jpg,png,gif}');---<div class="card">    <h2>{name}</h2>    <p>Age: {age}</p>    <Image src={} alt={altText} /></div>
    
6.  Inside the `src` attribute, pass in the `images` object and use bracket notation for the image path. Then make sure to invoke the glob function.
    
    Since you are accessing the `images` object which has an unknown type, you should also `throw` an error in case an invalid file path is passed as a prop.
    
    src/components/MyCustomCardComponent.astro
    
        ---import type { ImageMetadata } from 'astro';import { Image } from 'astro:assets';
        interface Props {   imagePath: string;   altText: string;   name: string;   age: number;}
        const { imagePath, altText, name, age } = Astro.props;const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/*.{jpeg,jpg,png,gif}');if (!images[imagePath]) throw new Error(`"${imagePath}" does not exist in glob: "src/assets/*.{jpeg,jpg,png,gif}"`);---<div class="card">    <h2>{name}</h2>    <p>Age: {age}</p>    <Image src={images[imagePath]()} alt={altText} /></div>
    
    Note
    
    `images` is an object that contains all of the image paths inside the `assets` folder.
    
        const images = {  './assets/avatar-1.jpg': () => import('./assets/avatar-1.jpg'),  './assets/avatar-2.png': () => import('./assets/avatar-2.png'),  './assets/avatar-3.jpeg': () => import('./assets/avatar-3.jpeg')}
    
    The `imagePath` prop is a string that contains the path to the image that you want to display. The `import.meta.glob()` is doing the work of finding the image path that matches the `imagePath` prop and handling the import for you.
    
7.  Import and use the card component inside an Astro page, passing in the values for the `props`.
    
    src/pages/index.astro
    
        ---import MyCustomCardComponent from '../components/MyCustomCardComponent.astro';---<MyCustomCardComponent    imagePath="/src/assets/avatar-1.jpg"    altText="A headshot of Priya against a brick wall background."    name="Priya"    age={25}/>
    

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/dynamically-importing-images.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Build your Astro site with Docker](/en/recipes/docker/) [Next  
Add icons to external links](/en/recipes/external-links/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

