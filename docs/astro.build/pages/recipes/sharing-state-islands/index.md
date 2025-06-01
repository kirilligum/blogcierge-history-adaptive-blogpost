Share state between islands
===========================

When building an Astro website with [islands architecture / partial hydration](/en/concepts/islands/), you may have run into this problem: **I want to share state between my components.**

UI frameworks like React or Vue may encourage [“context” providers](https://react.dev/learn/passing-data-deeply-with-context) for other components to consume. But when [partially hydrating components](/en/guides/framework-components/#hydrating-interactive-components) within Astro or Markdown, you can’t use these context wrappers.

Astro recommends a different solution for shared client-side storage: [**Nano Stores**](https://github.com/nanostores/nanostores).

![](/houston_chef.webp) **Related recipe:** [Share state between Astro components](/en/recipes/sharing-state/)

Why Nano Stores?
----------------

[Section titled Why Nano Stores?](#why-nano-stores)

The [Nano Stores](https://github.com/nanostores/nanostores) library allows you to author stores that any component can interact with. We recommend Nano Stores because:

*   **They’re lightweight.** Nano Stores ship the bare minimum JS you’ll need (less than 1 KB) with zero dependencies.
*   **They’re framework-agnostic.** This means sharing state between frameworks will be seamless! Astro is built on flexibility, so we love solutions that offer a similar developer experience no matter your preference.

Still, there are a number of alternatives you can explore. These include:

*   [Svelte’s built-in stores](https://svelte.dev/tutorial/writable-stores)
*   [Solid signals](https://www.solidjs.com/docs/latest) outside of a component context
*   [Vue’s reactivity API](https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api)
*   [Sending custom browser events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events) between components

FAQ

**🙋 Can I use Nano Stores in `.astro` files or other server-side components?**

Nano Stores can be used in `<script>` tags to [share state between `.astro` components](/en/recipes/sharing-state/). However, Using Nano Stores in the frontmatter of server-side components is not recommended because of the following restrictions:

*   Writing to a store from a `.astro` file or [non-hydrated component](/en/guides/framework-components/#hydrating-interactive-components) will _not_ affect the value received by [client-side components](/en/reference/directives-reference/#client-directives).
*   You cannot pass a Nano Store as a “prop” to client-side components.
*   You cannot subscribe to store changes from a `.astro` file, since Astro components do not re-render.

If you understand these restrictions and still find a use case, you can give Nano Stores a try! Just remember that Nano Stores are built for reactivity to changes on the **client** specifically.

**🙋 How do Svelte stores compare to Nano Stores?**

**Nano Stores and [Svelte stores](https://svelte.dev/tutorial/writable-stores) are very similar!** In fact, [nanostores allow you to use the same `$` shortcut](https://github.com/nanostores/nanostores#svelte) for subscriptions that you might use with Svelte stores.

If you want to avoid third-party libraries, [Svelte stores](https://svelte.dev/tutorial/writable-stores) are a great cross-island communication tool on their own. Still, you might prefer Nano Stores if a) you like their add-ons for [“objects”](https://github.com/nanostores/nanostores#maps) and [async state](https://github.com/nanostores/nanostores#lazy-stores), or b) you want to communicate between Svelte and other UI frameworks like Preact or Vue.

**🙋 How do Solid signals compare to Nano Stores?**

If you’ve used Solid for a while, you may have tried moving [signals](https://www.solidjs.com/docs/latest#createsignal) or [stores](https://www.solidjs.com/docs/latest#createstore) outside of your components. This is a great way to share state between Solid islands! Try exporting signals from a shared file:

sharedStore.js

    import { createSignal } from 'solid-js';
    export const sharedCount = createSignal(0);

…and all components importing `sharedCount` will share the same state. Though this works well, you might prefer Nano Stores if a) you like their add-ons for [“objects”](https://github.com/nanostores/nanostores#maps) and [async state](https://github.com/nanostores/nanostores#lazy-stores), or b) you want to communicate between Solid and other UI frameworks like Preact or Vue.

Installing Nano Stores
----------------------

[Section titled Installing Nano Stores](#installing-nano-stores)

To get started, install Nano Stores alongside their helper package for your favorite UI framework:

*   [Preact](#tab-panel-1800)
*   [React](#tab-panel-1801)
*   [Solid](#tab-panel-1802)
*   [Svelte](#tab-panel-1803)
*   [Vue](#tab-panel-1804)

Terminal window

    npm install nanostores @nanostores/preact

Terminal window

    npm install nanostores @nanostores/react

Terminal window

    npm install nanostores @nanostores/solid

Terminal window

    npm install nanostores

Note

No helper package here! Nano Stores can be used like standard Svelte stores.

Terminal window

    npm install nanostores @nanostores/vue

You can jump into the [Nano Stores usage guide](https://github.com/nanostores/nanostores#guide) from here, or follow along with our example below!

Usage example - ecommerce cart flyout
-------------------------------------

[Section titled Usage example - ecommerce cart flyout](#usage-example---ecommerce-cart-flyout)

Let’s say we’re building a simple ecommerce interface with three interactive elements:

*   An “add to cart” submission form
*   A cart flyout to display those added items
*   A cart flyout toggle

_[**Try the completed example**](https://github.com/withastro/astro/tree/main/examples/with-nanostores) on your machine or online via StackBlitz._

Your base Astro file may look like this:

src/pages/index.astro

    ---import CartFlyoutToggle from '../components/CartFlyoutToggle';import CartFlyout from '../components/CartFlyout';import AddToCartForm from '../components/AddToCartForm';---
    <!DOCTYPE html><html lang="en"><head>...</head><body>  <header>    <nav>      <a href="/">Astro storefront</a>      <CartFlyoutToggle client:load />    </nav>  </header>  <main>    <AddToCartForm client:load>    <!-- ... -->    </AddToCartForm>  </main>  <CartFlyout client:load /></body></html>

### Using “atoms”

[Section titled Using “atoms”](#using-atoms)

Let’s start by opening our `CartFlyout` whenever `CartFlyoutToggle` is clicked.

First, create a new JS or TS file to contain our store. We’ll use an [“atom”](https://github.com/nanostores/nanostores#atoms) for this:

src/cartStore.js

    import { atom } from 'nanostores';
    export const isCartOpen = atom(false);

Now, we can import this store into any file that needs to read or write. We’ll start by wiring up our `CartFlyoutToggle`:

*   [Preact](#tab-panel-1805)
*   [React](#tab-panel-1806)
*   [Solid](#tab-panel-1807)
*   [Svelte](#tab-panel-1808)
*   [Vue](#tab-panel-1809)

src/components/CartFlyoutToggle.jsx

    import { useStore } from '@nanostores/preact';import { isCartOpen } from '../cartStore';
    export default function CartButton() {  // read the store value with the `useStore` hook  const $isCartOpen = useStore(isCartOpen);  // write to the imported store using `.set`  return (    <button onClick={() => isCartOpen.set(!$isCartOpen)}>Cart</button>  )}

src/components/CartFlyoutToggle.jsx

    import { useStore } from '@nanostores/react';import { isCartOpen } from '../cartStore';
    export default function CartButton() {  // read the store value with the `useStore` hook  const $isCartOpen = useStore(isCartOpen);  // write to the imported store using `.set`  return (    <button onClick={() => isCartOpen.set(!$isCartOpen)}>Cart</button>  )}

src/components/CartFlyoutToggle.jsx

    import { useStore } from '@nanostores/solid';import { isCartOpen } from '../cartStore';
    export default function CartButton() {  // read the store value with the `useStore` hook  const $isCartOpen = useStore(isCartOpen);  // write to the imported store using `.set`  return (    <button onClick={() => isCartOpen.set(!$isCartOpen())}>Cart</button>  )}

src/components/CartFlyoutToggle.svelte

    <script>  import { isCartOpen } from '../cartStore';</script>
    <!--use "$" to read the store value--><button on:click={() => isCartOpen.set(!$isCartOpen)}>Cart</button>

src/components/CartFlyoutToggle.vue

    <template>  <!--write to the imported store using `.set`-->  <button @click="isCartOpen.set(!$isCartOpen)">Cart</button></template>
    <script setup>  import { isCartOpen } from '../cartStore';  import { useStore } from '@nanostores/vue';
      // read the store value with the `useStore` hook  const $isCartOpen = useStore(isCartOpen);</script>

Then, we can read `isCartOpen` from our `CartFlyout` component:

*   [Preact](#tab-panel-1810)
*   [React](#tab-panel-1811)
*   [Solid](#tab-panel-1812)
*   [Svelte](#tab-panel-1813)
*   [Vue](#tab-panel-1814)

src/components/CartFlyout.jsx

    import { useStore } from '@nanostores/preact';import { isCartOpen } from '../cartStore';
    export default function CartFlyout() {  const $isCartOpen = useStore(isCartOpen);
      return $isCartOpen ? <aside>...</aside> : null;}

src/components/CartFlyout.jsx

    import { useStore } from '@nanostores/react';import { isCartOpen } from '../cartStore';
    export default function CartFlyout() {  const $isCartOpen = useStore(isCartOpen);
      return $isCartOpen ? <aside>...</aside> : null;}

src/components/CartFlyout.jsx

    import { useStore } from '@nanostores/solid';import { isCartOpen } from '../cartStore';
    export default function CartFlyout() {  const $isCartOpen = useStore(isCartOpen);
      return $isCartOpen() ? <aside>...</aside> : null;}

src/components/CartFlyout.svelte

    <script>  import { isCartOpen } from '../cartStore';</script>
    {#if $isCartOpen}<aside>...</aside>{/if}

src/components/CartFlyout.vue

    <template>  <aside v-if="$isCartOpen">...</aside></template>
    <script setup>  import { isCartOpen } from '../cartStore';  import { useStore } from '@nanostores/vue';
      const $isCartOpen = useStore(isCartOpen);</script>

### Using “maps”

[Section titled Using “maps”](#using-maps)

Tip

**[Maps](https://github.com/nanostores/nanostores#maps) are a great choice for objects you write to regularly!** Alongside the standard `get()` and `set()` helpers an `atom` provides, you’ll also have a `.setKey()` function to efficiently update individual object keys.

Now, let’s keep track of the items inside your cart. To avoid duplicates and keep track of “quantity,” we can store your cart as an object with the item’s ID as a key. We’ll use a [Map](https://github.com/nanostores/nanostores#maps) for this.

Let’s add a `cartItem` store to our `cartStore.js` from earlier. You can also switch to a TypeScript file to define the shape if you’re so inclined.

(() => { class StarlightTabsRestore extends HTMLElement { connectedCallback() { const starlightTabs = this.closest('starlight-tabs'); if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return; const syncKey = starlightTabs.dataset.syncKey; if (!syncKey) return; const label = localStorage.getItem(\`starlight-synced-tabs\_\_${syncKey}\`); if (!label) return; const tabs = \[...starlightTabs?.querySelectorAll('\[role="tab"\]')\]; const tabIndexToRestore = tabs.findIndex( (tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label ); const panels = starlightTabs?.querySelectorAll(':scope > \[role="tabpanel"\]'); const newTab = tabs\[tabIndexToRestore\]; const newPanel = panels\[tabIndexToRestore\]; if (tabIndexToRestore < 1 || !newTab || !newPanel) return; tabs\[0\]?.setAttribute('aria-selected', 'false'); tabs\[0\]?.setAttribute('tabindex', '-1'); panels?.\[0\]?.setAttribute('hidden', 'true'); newTab.removeAttribute('tabindex'); newTab.setAttribute('aria-selected', 'true'); newPanel.removeAttribute('hidden'); } } customElements.define('starlight-tabs-restore', StarlightTabsRestore); })()

*   [JavaScript](#tab-panel-1796)
*   [TypeScript](#tab-panel-1797)

src/cartStore.js

    import { atom, map } from 'nanostores';
    export const isCartOpen = atom(false);
    /** * @typedef {Object} CartItem * @property {string} id * @property {string} name * @property {string} imageSrc * @property {number} quantity */
    /** @type {import('nanostores').MapStore<Record<string, CartItem>>} */export const cartItems = map({});

src/cartStore.ts

    import { atom, map } from 'nanostores';
    export const isCartOpen = atom(false);
    export type CartItem = {  id: string;  name: string;  imageSrc: string;  quantity: number;}
    export const cartItems = map<Record<string, CartItem>>({});

class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs\_\_";constructor(){super();const t=this.querySelector('\[role="tablist"\]');if(this.tabs=\[...t.querySelectorAll('\[role="tab"\]')\],this.panels=\[...this.querySelectorAll(':scope > \[role="tabpanel"\]')\],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??\[\];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('\[aria-selected="true"\]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs\[s\]&&(e.preventDefault(),this.switchTab(this.tabs\[s\],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels\[i\];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs\[a\],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

Now, let’s export an `addCartItem` helper for our components to use.

*   **If that item doesn’t exist in your cart**, add the item with a starting quantity of 1.
*   **If that item _does_ already exist**, bump the quantity by 1.

*   [JavaScript](#tab-panel-1798)
*   [TypeScript](#tab-panel-1799)

src/cartStore.js

    ...export function addCartItem({ id, name, imageSrc }) {  const existingEntry = cartItems.get()[id];  if (existingEntry) {    cartItems.setKey(id, {      ...existingEntry,      quantity: existingEntry.quantity + 1,    })  } else {    cartItems.setKey(      id,      { id, name, imageSrc, quantity: 1 }    );  }}

src/cartStore.ts

    ...type ItemDisplayInfo = Pick<CartItem, 'id' | 'name' | 'imageSrc'>;export function addCartItem({ id, name, imageSrc }: ItemDisplayInfo) {  const existingEntry = cartItems.get()[id];  if (existingEntry) {    cartItems.setKey(id, {      ...existingEntry,      quantity: existingEntry.quantity + 1,    });  } else {    cartItems.setKey(      id,      { id, name, imageSrc, quantity: 1 }    );  }}

Note

**🙋 Why use `.get()` here instead of a `useStore` helper?**

You may have noticed we’re calling `cartItems.get()` here, instead of grabbing that `useStore` helper from our React / Preact / Solid / Vue examples. This is because **useStore is meant to trigger component re-renders.** In other words, `useStore` should be used whenever the store value is being rendered to the UI. Since we’re reading the value when an **event** is triggered (`addToCart` in this case), and we aren’t trying to render that value, we don’t need `useStore` here.

With our store in place, we can call this function inside our `AddToCartForm` whenever that form is submitted. We’ll also open the cart flyout so you can see a full cart summary.

*   [Preact](#tab-panel-1815)
*   [React](#tab-panel-1816)
*   [Solid](#tab-panel-1817)
*   [Svelte](#tab-panel-1818)
*   [Vue](#tab-panel-1819)

src/components/AddToCartForm.jsx

    import { addCartItem, isCartOpen } from '../cartStore';
    export default function AddToCartForm({ children }) {  // we'll hardcode the item info for simplicity!  const hardcodedItemInfo = {    id: 'astronaut-figurine',    name: 'Astronaut Figurine',    imageSrc: '/images/astronaut-figurine.png',  }
      function addToCart(e) {    e.preventDefault();    isCartOpen.set(true);    addCartItem(hardcodedItemInfo);  }
      return (    <form onSubmit={addToCart}>      {children}    </form>  )}

src/components/AddToCartForm.jsx

    import { addCartItem, isCartOpen } from '../cartStore';
    export default function AddToCartForm({ children }) {  // we'll hardcode the item info for simplicity!  const hardcodedItemInfo = {    id: 'astronaut-figurine',    name: 'Astronaut Figurine',    imageSrc: '/images/astronaut-figurine.png',  }
      function addToCart(e) {    e.preventDefault();    isCartOpen.set(true);    addCartItem(hardcodedItemInfo);  }
      return (    <form onSubmit={addToCart}>      {children}    </form>  )}

src/components/AddToCartForm.jsx

    import { addCartItem, isCartOpen } from '../cartStore';
    export default function AddToCartForm({ children }) {  // we'll hardcode the item info for simplicity!  const hardcodedItemInfo = {    id: 'astronaut-figurine',    name: 'Astronaut Figurine',    imageSrc: '/images/astronaut-figurine.png',  }
      function addToCart(e) {    e.preventDefault();    isCartOpen.set(true);    addCartItem(hardcodedItemInfo);  }
      return (    <form onSubmit={addToCart}>      {children}    </form>  )}

src/components/AddToCartForm.svelte

    <form on:submit|preventDefault={addToCart}>  <slot></slot></form>
    <script>  import { addCartItem, isCartOpen } from '../cartStore';
      // we'll hardcode the item info for simplicity!  const hardcodedItemInfo = {    id: 'astronaut-figurine',    name: 'Astronaut Figurine',    imageSrc: '/images/astronaut-figurine.png',  }
      function addToCart() {    isCartOpen.set(true);    addCartItem(hardcodedItemInfo);  }</script>

src/components/AddToCartForm.vue

    <template>  <form @submit="addToCart">    <slot></slot>  </form></template>
    <script setup>  import { addCartItem, isCartOpen } from '../cartStore';
      // we'll hardcode the item info for simplicity!  const hardcodedItemInfo = {    id: 'astronaut-figurine',    name: 'Astronaut Figurine',    imageSrc: '/images/astronaut-figurine.png',  }
      function addToCart(e) {    e.preventDefault();    isCartOpen.set(true);    addCartItem(hardcodedItemInfo);  }</script>

Finally, we’ll render those cart items inside our `CartFlyout`:

*   [Preact](#tab-panel-1820)
*   [React](#tab-panel-1821)
*   [Solid](#tab-panel-1822)
*   [Svelte](#tab-panel-1823)
*   [Vue](#tab-panel-1824)

src/components/CartFlyout.jsx

    import { useStore } from '@nanostores/preact';import { isCartOpen, cartItems } from '../cartStore';
    export default function CartFlyout() {  const $isCartOpen = useStore(isCartOpen);  const $cartItems = useStore(cartItems);
      return $isCartOpen ? (    <aside>      {Object.values($cartItems).length ? (        <ul>          {Object.values($cartItems).map(cartItem => (            <li>              <img src={cartItem.imageSrc} alt={cartItem.name} />              <h3>{cartItem.name}</h3>              <p>Quantity: {cartItem.quantity}</p>            </li>          ))}        </ul>      ) : <p>Your cart is empty!</p>}    </aside>  ) : null;}

src/components/CartFlyout.jsx

    import { useStore } from '@nanostores/react';import { isCartOpen, cartItems } from '../cartStore';
    export default function CartFlyout() {  const $isCartOpen = useStore(isCartOpen);  const $cartItems = useStore(cartItems);
      return $isCartOpen ? (    <aside>      {Object.values($cartItems).length ? (        <ul>          {Object.values($cartItems).map(cartItem => (            <li>              <img src={cartItem.imageSrc} alt={cartItem.name} />              <h3>{cartItem.name}</h3>              <p>Quantity: {cartItem.quantity}</p>            </li>          ))}        </ul>      ) : <p>Your cart is empty!</p>}    </aside>  ) : null;}

src/components/CartFlyout.jsx

    import { useStore } from '@nanostores/solid';import { isCartOpen, cartItems } from '../cartStore';
    export default function CartFlyout() {  const $isCartOpen = useStore(isCartOpen);  const $cartItems = useStore(cartItems);
      return $isCartOpen() ? (    <aside>      {Object.values($cartItems()).length ? (        <ul>          {Object.values($cartItems()).map(cartItem => (            <li>              <img src={cartItem.imageSrc} alt={cartItem.name} />              <h3>{cartItem.name}</h3>              <p>Quantity: {cartItem.quantity}</p>            </li>          ))}        </ul>      ) : <p>Your cart is empty!</p>}    </aside>  ) : null;}

src/components/CartFlyout.svelte

    <script>  import { isCartOpen, cartItems } from '../cartStore';</script>
    {#if $isCartOpen}  {#if Object.values($cartItems).length}    <aside>      {#each Object.values($cartItems) as cartItem}      <li>        <img src={cartItem.imageSrc} alt={cartItem.name} />        <h3>{cartItem.name}</h3>        <p>Quantity: {cartItem.quantity}</p>      </li>      {/each}    </aside>  {:else}    <p>Your cart is empty!</p>  {/if}{/if}

src/components/CartFlyout.vue

    <template>  <aside v-if="$isCartOpen">    <ul v-if="Object.values($cartItems).length">      <li v-for="cartItem in Object.values($cartItems)" v-bind:key="cartItem.name">        <img :src=cartItem.imageSrc :alt=cartItem.name />        <h3>{{cartItem.name}}</h3>        <p>Quantity: {{cartItem.quantity}}</p>      </li>    </ul>    <p v-else>Your cart is empty!</p>  </aside></template>
    <script setup>  import { cartItems, isCartOpen } from '../cartStore';  import { useStore } from '@nanostores/vue';
      const $isCartOpen = useStore(isCartOpen);  const $cartItems = useStore(cartItems);</script>

Now, you should have a fully interactive ecommerce example with the smallest JS bundle in the galaxy 🚀

[**Try the completed example**](https://github.com/withastro/astro/tree/main/examples/with-nanostores) on your machine or online via StackBlitz!

Recipes

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/recipes/sharing-state-islands.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Share state between Astro components](/en/recipes/sharing-state/) [Next  
Using streaming to improve page performance](/en/recipes/streaming-improve-page-performance/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)