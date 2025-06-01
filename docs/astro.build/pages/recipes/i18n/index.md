Add i18n features
=================

In this recipe, you will learn how to use content collections and dynamic routing to build your own internationalization (i18n) solution and serve your content in different languages.

Tip

In v4.0, Astro added built-in support for i18n routing that allows you to configure default and supported languages and includes valuable helper functions to assist you in serving an international audience. If you want to use this instead, see our [internationalization guide](/en/guides/internationalization/) to learn about these features.

This example serves each language at its own subpath, e.g. `example.com/en/blog` for English and `example.com/fr/blog` for French.

If you prefer the default language to not be visible in the URL unlike other languages, there are [instructions to hide the default language](/en/recipes/i18n/#hide-default-language-in-the-url) below.

See the [resources section](#resources) for external links to related topics such as right-to-left (RTL) styling and choosing language tags.

Recipe
------

[Section titled Recipe](#recipe)

### Set up pages for each language

[Section titled Set up pages for each language](#set-up-pages-for-each-language)

1.  Create a directory for each language you want to support. For example, `en/` and `fr/` if you are supporting English and French:
    
    *   Directorysrc/
        
        *   Directorypages/
            
            *   Directory**en/**
                
                *   about.astro
                *   index.astro
                
            *   Directory**fr/**
                
                *   about.astro
                *   index.astro
                
            *   index.astro
            
        
    
2.  Set up `src/pages/index.astro` to redirect to your default language.
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [Static](#tab-panel-1777)
    *   [On demand](#tab-panel-1778)
    
    src/pages/index.astro
    
        <meta http-equiv="refresh" content="0;url=/en/" />
    
    This approach uses a [meta refresh](https://en.wikipedia.org/wiki/Meta_refresh) and will work however you deploy your site. Some static hosts also let you configure server redirects with a custom configuration file. See your deploy platform’s documentation for more details.
    
    If you are using an SSR adapter, you can use [`Astro.redirect`](/en/guides/routing/#dynamic-redirects) to redirect to the default language on the server.
    
    src/pages/index.astro
    
        ---return Astro.redirect('/en/');---
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

### Use collections for translated content

[Section titled Use collections for translated content](#use-collections-for-translated-content)

1.  Create a folder in `src/content/` for each type of content you want to include and add subdirectories for each supported language. For example, to support English and French blog posts:
    
    *   Directorysrc/
        
        *   Directorycontent/
            
            *   Directoryblog/
                
                *   Directory**en/** Blog posts in English
                    
                    *   post-1.md
                    *   post-2.md
                    
                *   Directory**fr/** Blog posts in French
                    
                    *   post-1.md
                    *   post-2.md
                    
                
            
        
    
2.  Create a `src/content.config.ts` file and export a collection for each type of content.
    
    src/content.config.ts
    
        import { defineCollection, z } from 'astro:content';
        const blogCollection = defineCollection({  schema: z.object({    title: z.string(),    author: z.string(),    date: z.date()  })});
        export const collections = {  'blog': blogCollection};
    
    Read more about [Content Collections](/en/guides/content-collections/).
    
3.  Use [dynamic routes](/en/guides/routing/#dynamic-routes) to fetch and render content based on a `lang` and a `slug` parameter.
    
    *   [Static](#tab-panel-1779)
    *   [On demand](#tab-panel-1780)
    
    In static rendering mode, use `getStaticPaths` to map each content entry to a page:
    
    src/pages/\[lang\]/blog/\[...slug\].astro
    
        ---import { getCollection, render } from 'astro:content';
        export async function getStaticPaths() {  const pages = await getCollection('blog');
          const paths = pages.map(page => {    const [lang, ...slug] = page.id.split('/');    return { params: { lang, slug: slug.join('/') || undefined }, props: page };  });
          return paths;}
        const { lang, slug } = Astro.params;const page = Astro.props;const formattedDate = page.data.date.toLocaleString(lang);const { Content } = await render(page);---<h1>{page.data.title}</h1><p>by {page.data.author} • {formattedDate}</p><Content/>
    
    In [SSR mode](/en/guides/on-demand-rendering/), fetch the requested entry directly:
    
    src/pages/\[lang\]/blog/\[...slug\].astro
    
        ---import { getEntry, render } from 'astro:content';
        const { lang, slug } = Astro.params;const page = await getEntry('blog', `${lang}/${slug}`);
        if (!page) {  return Astro.redirect('/404');}
        const formattedDate = page.data.date.toLocaleString(lang);const { Content, headings } = await render(page);---<h1>{page.data.title}</h1><p>by {page.data.author} • {formattedDate}</p><Content/>
    
    Read more about [dynamic routing](/en/guides/routing/#dynamic-routes).
    
    Date formatting
    
    The example above uses the built-in [`toLocaleString()` date-formatting method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) to create a human-readable string from the frontmatter date. This ensures the date and time are formatted to match the user’s language.
    

### Translate UI strings

[Section titled Translate UI strings](#translate-ui-strings)

Create dictionaries of terms to translate the labels for UI elements around your site. This allows your visitors to experience your site fully in their language.

1.  Create a `src/i18n/ui.ts` file to store your translation strings:
    
    src/i18n/ui.ts
    
        export const languages = {  en: 'English',  fr: 'Français',};
        export const defaultLang = 'en';
        export const ui = {  en: {    'nav.home': 'Home',    'nav.about': 'About',    'nav.twitter': 'Twitter',  },  fr: {    'nav.home': 'Accueil',    'nav.about': 'À propos',  },} as const;
    
2.  Create two helper functions: one to detect the page language based on the current URL, and one to get translations strings for different parts of the UI in `src/i18n/utils.ts`:
    
    src/i18n/utils.ts
    
        import { ui, defaultLang } from './ui';
        export function getLangFromUrl(url: URL) {  const [, lang] = url.pathname.split('/');  if (lang in ui) return lang as keyof typeof ui;  return defaultLang;}
        export function useTranslations(lang: keyof typeof ui) {  return function t(key: keyof typeof ui[typeof defaultLang]) {    return ui[lang][key] || ui[defaultLang][key];  }}
    
    Did you notice?
    
    In step 1, the `nav.twitter` string was not translated to French. You may not want every term translated, such as proper names or common industry terms. The `useTranslations` helper will return the default language’s value if a key is not translated. In this example, French users will also see “Twitter” in the nav bar.
    
3.  Import the helpers where needed and use them to choose the UI string that corresponds to the current language. For example, a nav component might look like:
    
    src/components/Nav.astro
    
        ---import { getLangFromUrl, useTranslations } from '../i18n/utils';
        const lang = getLangFromUrl(Astro.url);const t = useTranslations(lang);---<ul>    <li>        <a href={`/${lang}/home/`}>          {t('nav.home')}        </a>    </li>    <li>        <a href={`/${lang}/about/`}>          {t('nav.about')}        </a>    </li>    <li>        <a href="https://twitter.com/astrodotbuild">          {t('nav.twitter')}        </a>    </li></ul>
    
4.  Each page must have a `lang` attribute on the `<html>` element that matches the language on the page. In this example, a [reusable layout](/en/basics/layouts/) extracts the language from the current route:
    
    src/layouts/Base.astro
    
        ---import { getLangFromUrl } from '../i18n/utils';
        const lang = getLangFromUrl(Astro.url);---<html lang={lang}>    <head>        <meta charset="utf-8" />        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />        <meta name="viewport" content="width=device-width" />        <title>Astro</title>    </head>    <body>        <slot />    </body></html>
    
    You can then use this base layout to ensure that pages use the correct `lang` attribute automatically.
    
    src/pages/en/about.astro
    
        ---import Base from '../../layouts/Base.astro';---<Base>    <h1>About me</h1>    ...</Base>
    

### Let users switch between languages

[Section titled Let users switch between languages](#let-users-switch-between-languages)

Create links to the different languages you support so users can choose the language they want to read your site in.

1.  Create a component to show a link for each language:
    
    src/components/LanguagePicker.astro
    
        ---import { languages } from '../i18n/ui';---<ul>  {Object.entries(languages).map(([lang, label]) => (    <li>      <a href={`/${lang}/`}>{label}</a>    </li>  ))}</ul>
    
2.  Add `<LanguagePicker />` to your site so it is shown on every page. The example below adds it to the site footer in a base layout:
    
    src/layouts/Base.astro
    
        ---import LanguagePicker from '../components/LanguagePicker.astro';import { getLangFromUrl } from '../i18n/utils';
        const lang = getLangFromUrl(Astro.url);---<html lang={lang}>    <head>        <meta charset="utf-8" />        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />        <meta name="viewport" content="width=device-width" />        <title>Astro</title>    </head>    <body>        <slot />        <footer>          <LanguagePicker />        </footer>    </body></html>
    

### Hide default language in the URL

[Section titled Hide default language in the URL](#hide-default-language-in-the-url)

1.  Create a directory for each language except the default language. For example, store your default language pages directly in `pages/`, and your translated pages in `fr/`:
    
    *   Directorysrc/
        
        *   Directorypages/
            
            *   about.astro
            *   index.astro
            *   Directory**fr/**
                
                *   about.astro
                *   index.astro
                
            
        
    
2.  Add another line to the `src/i18n/ui.ts` file to toggle the feature:
    
    src/i18n/ui.ts
    
        export const showDefaultLang = false;
    
3.  Add a helper function to `src/i18n/utils.ts`, to translate paths based on the current language:
    
    src/i18n/utils.ts
    
        import { ui, defaultLang, showDefaultLang } from './ui';
        export function useTranslatedPath(lang: keyof typeof ui) {  return function translatePath(path: string, l: string = lang) {    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`  }}
    
4.  Import the helper where needed. For example, a `nav` component might look like:
    
    src/components/Nav.astro
    
        ---import { getLangFromUrl, useTranslations, useTranslatedPath } from '../i18n/utils';
        const lang = getLangFromUrl(Astro.url);const t = useTranslations(lang);const translatePath = useTranslatedPath(lang);---<ul>    <li>        <a href={translatePath('/home/')}>          {t('nav.home')}        </a>    </li>    <li>        <a href={translatePath('/about/')}>          {t('nav.about')}        </a>    </li>    <li>        <a href="https://twitter.com/astrodotbuild">          {t('nav.twitter')}        </a>    </li></ul>
    
5.  The helper function can also be used to translate paths for a specific language. For example, when users switch between languages:
    
    src/components/LanguagePicker.astro
    
        ---import { languages } from '../i18n/ui';import { getLangFromUrl, useTranslatedPath } from '../i18n/utils';
        const lang = getLangFromUrl(Astro.url);const translatePath = useTranslatedPath(lang);---<ul>  {Object.entries(languages).map(([lang, label]) => (    <li>      <a href={translatePath('/', lang)}>{label}</a>    </li>  ))}</ul>
    

### Translate Routes

[Section titled Translate Routes](#translate-routes)

Translate the routes of your pages for each language.

1.  Add route mappings to `src/i18n/ui.ts`:
    
    src/i18n/ui.ts
    
        export const routes = {  de: {    'services': 'leistungen',  },  fr: {    'services': 'prestations-de-service',  },}
    
2.  Update the `useTranslatedPath` helper function in `src/i18n/utils.ts` to add router translation logic.
    
    src/i18n/utils.ts
    
        import { ui, defaultLang, showDefaultLang, routes } from './ui';
        export function useTranslatedPath(lang: keyof typeof ui) {  return function translatePath(path: string, l: string = lang) {    const pathName = path.replaceAll('/', '')    const hasTranslation = defaultLang !== l && routes[l] !== undefined && routes[l][pathName] !== undefined    const translatedPath = hasTranslation ? '/' + routes[l][pathName] : path
            return !showDefaultLang && l === defaultLang ? translatedPath : `/${l}${translatedPath}`  }}
    
3.  Create a helper function to get the route, if it exists based on the current URL, in `src/i18n/utils.ts`:
    
    src/i18n/utils.ts
    
        import { ui, defaultLang, showDefaultLang, routes } from './ui';
        export function getRouteFromUrl(url: URL): string | undefined {  const pathname = new URL(url).pathname;  const parts = pathname?.split('/');  const path = parts.pop() || parts.pop();
          if (path === undefined) {    return undefined;  }
          const currentLang = getLangFromUrl(url);
          if (defaultLang === currentLang) {    const route = Object.values(routes)[0];    return route[path] !== undefined ? route[path] : undefined;  }
          const getKeyByValue = (obj: Record<string, string>, value: string): string | undefined  => {      return Object.keys(obj).find((key) => obj[key] === value);  }
          const reversedKey = getKeyByValue(routes[currentLang], path);
          if (reversedKey !== undefined) {    return reversedKey;  }
          return undefined;}
    
4.  The helper function can be used to get a translated route. For example, when no translated route is defined, the user will be redirected to the home page:
    
    src/components/LanguagePicker.astro
    
        ---import { languages } from '../i18n/ui';import { getRouteFromUrl, useTranslatedPath } from '../i18n/utils';
        const route = getRouteFromUrl(Astro.url);---<ul>  {Object.entries(languages).map(([lang, label]) => {    const translatePath = useTranslatedPath(lang);    return (      <li>        <a href={translatePath(`/${route ? route : ''}`)}>{label}</a>      </li>    )  })}</ul>
    

Resources
---------

[Section titled Resources](#resources)

*   [Choosing a Language Tag](https://www.w3.org/International/questions/qa-choosing-language-tags)
*   [Right-to-left (RTL) Styling 101](https://rtlstyling.com/)

Community libraries
-------------------

[Section titled Community libraries](#community-libraries)

*   [astro-i18next](https://github.com/yassinedoghri/astro-i18next) — An Astro integration for i18next including some utility components.
*   [astro-i18n](https://github.com/alexandre-fernandez/astro-i18n) — A TypeScript-first internationalization library for Astro.
*   [astro-i18n-aut](https://github.com/jlarmstrongiv/astro-i18n-aut) — An Astro integration for i18n that supports the `defaultLocale` without page generation. The integration is adapter agnostic and UI framework agnostic.
*   [astro-react-i18next](https://github.com/jeremyxgo/astro-react-i18next) — An Astro integration that seamlessly enables the use of i18next and react-i18next in React components on Astro websites.
*   [paraglide](https://inlang.com/c/astro) — A fully type-safe i18n library specifically designed for partial hydration patterns like Astro islands.
*   [astro-loader-i18n](https://github.com/openscript/astro-loader-i18n) — An Astro glob content loader for i18n files and folder structures supporting the translation of routes.

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/i18n.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Add icons to external links](/en/recipes/external-links/) [Next  
Create a dev toolbar app](/en/recipes/making-toolbar-apps/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)