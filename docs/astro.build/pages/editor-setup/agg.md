Editor setup
============

Customize your code editor to improve the Astro developer experience and unlock new features.

VS Code
-------

[Section titled VS Code](#vs-code)

[VS Code](https://code.visualstudio.com/) is a popular code editor for web developers, built by Microsoft. The VS Code engine also powers popular in-browser code editors like [GitHub Codespaces](https://github.com/features/codespaces) and [Gitpod](https://gitpod.io/).

Astro works with any code editor. However, VS Code is our recommended editor for Astro projects. We maintain an official [Astro VS Code Extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) that unlocks several key features and developer experience improvements for Astro projects.

*   Syntax highlighting for `.astro` files.
*   TypeScript type information for `.astro` files.
*   [VS Code Intellisense](https://code.visualstudio.com/docs/editor/intellisense) for code completion, hints and more.

To get started, install the [Astro VS Code Extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) today.

See how to [set up TypeScript](/en/guides/typescript/) in your Astro project.

Zed
---

[Section titled Zed](#zed)

[Zed](https://zed.dev/) is an open-source code editor that added support for Astro in version 0.123.2. You can install the [Astro extension](https://github.com/zed-extensions/astro) in the IDE’s Extensions tab. This extension includes features like syntax highlighting, code completion, and formatting.

JetBrains IDEs
--------------

[Section titled JetBrains IDEs](#jetbrains-ides)

[Webstorm](https://www.jetbrains.com/webstorm/) is a JavaScript and TypeScript IDE that added support for the Astro Language Server in version 2024.2. This update brings features like syntax highlighting, code completion, and formatting.

Install the official plugin through [JetBrains Marketplace](https://plugins.jetbrains.com/plugin/20959-astro) or by searching for “Astro” in the IDE’s Plugins tab. You can toggle the language server in `Settings | Languages & Frameworks | TypeScript | Astro`.

For more information on Astro support in Webstorm, check out [the official Webstorm Astro Documentation](https://www.jetbrains.com/help/webstorm/astro.html).

Other Code Editors
------------------

[Section titled Other Code Editors](#other-code-editors)

Our amazing community maintains several extensions for other popular editors, including:

*   [VS Code Extension on Open VSX](https://open-vsx.org/extension/astro-build/astro-vscode) Official - The official Astro VS Code Extension, available on the Open VSX registry for open platforms like [VSCodium](https://vscodium.com/)
*   [Nova Extension](https://extensions.panic.com/extensions/sciencefidelity/sciencefidelity.astro/) Community - Provides syntax highlighting and code completion for Astro inside of Nova
*   [Vim Plugin](https://github.com/wuelnerdotexe/vim-astro) Community - Provides syntax highlighting, indentation, and code folding support for Astro inside of Vim or Neovim
*   Neovim [LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/configs.md#astro) and [TreeSitter](https://github.com/virchau13/tree-sitter-astro) Plugins Community - Provides syntax highlighting, treesitter parsing, and code completion for Astro inside of Neovim
*   Emacs - See instructions for [Configuring Emacs and Eglot](https://medium.com/@jrmjrm/configuring-emacs-and-eglot-to-work-with-astro-language-server-9408eb709ab0) Community to work with Astro
*   [Astro syntax highlighting for Sublime Text](https://packagecontrol.io/packages/Astro) Community - The Astro package for Sublime Text, available on the Sublime Text package manager.

In-Browser Editors
------------------

[Section titled In-Browser Editors](#in-browser-editors)

In addition to local editors, Astro also runs well on in-browser hosted editors, including:

*   [StackBlitz](https://stackblitz.com/) and [CodeSandbox](https://codesandbox.io/) - online editors that run in your browser, with built-in syntax highlighting support for `.astro` files. No installation or configuration required!
*   [GitHub.dev](https://github.dev/) - allows you to install the Astro VS Code extension as a [web extension](https://code.visualstudio.com/api/extension-guides/web-extensions), which gives you access to only some of the full extension features. Currently, only syntax highlighting is supported.
*   [IDX](https://idx.dev) and [Gitpod](https://gitpod.io/) - a full dev environment in the cloud that can install the official Astro VS Code Extension from Open VSX.

Other tools
-----------

[Section titled Other tools](#other-tools)

### ESLint

[Section titled ESLint](#eslint)

[ESLint](https://eslint.org/) is a popular linter for JavaScript and JSX. For Astro support, [a community maintained plugin](https://github.com/ota-meshi/eslint-plugin-astro) can be installed.

See [the project’s User Guide](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/) for more information on how to install and set up ESLint for your project.

### Stylelint

[Section titled Stylelint](#stylelint)

[Stylelint](https://stylelint.io/) is a popular linter for CSS. [A community maintained Stylelint configuration](https://github.com/ota-meshi/stylelint-config-html) provides Astro support.

Installation instructions, editor integration, and additional information can be found in the project’s README.

### Prettier

[Section titled Prettier](#prettier)

[Prettier](https://prettier.io/) is a popular formatter for JavaScript, HTML, CSS, and more. If you’re using the [Astro VS Code Extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) or [the Astro language server within another editor](#other-code-editors), code formatting with Prettier is included.

To add support for formatting `.astro` files outside of the editor (e.g. CLI) or inside editors that don’t support our editor tooling, install [the official Astro Prettier plugin](https://github.com/withastro/prettier-plugin-astro).

1.  Install `prettier` and `prettier-plugin-astro`.
    
    (() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()
    
    *   [npm](#tab-panel-1277)
    *   [pnpm](#tab-panel-1278)
    *   [Yarn](#tab-panel-1279)
    
    Terminal window
    
        npm install --save-dev --save-exact prettier prettier-plugin-astro
    
    Terminal window
    
        pnpm add --save-dev --save-exact prettier prettier-plugin-astro
    
    Terminal window
    
        yarn add --dev --exact prettier prettier-plugin-astro
    
    class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
2.  Create a `.prettierrc` configuration file (or `.prettierrc.json`, `.prettierrc.mjs`, or [other supported formats](https://prettier.io/docs/configuration)) in the root of your project and add `prettier-plugin-astro` to it.
    
    In this file, also manually specify the parser for Astro files.
    
    .prettierrc
    
        {  "plugins": ["prettier-plugin-astro"],  "overrides": [    {      "files": "*.astro",      "options": {        "parser": "astro",      }    }  ]}
    
3.  Run the following command in your terminal to format your files.
    
    *   [npm](#tab-panel-1280)
    *   [pnpm](#tab-panel-1281)
    *   [Yarn](#tab-panel-1282)
    
    Terminal window
    
        npx prettier . --write
    
    Terminal window
    
        pnpm exec prettier . --write
    
    Terminal window
    
        yarn exec prettier . --write
    

See the [Prettier plugin’s README](https://github.com/withastro/prettier-plugin-astro/blob/main/README.md) for more information about its supported options, how to set up Prettier inside VS Code, and more.

Learn

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/editor-setup.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Configuration overview](/en/guides/configuring-astro/) [Next  
TypeScript](/en/guides/typescript/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

