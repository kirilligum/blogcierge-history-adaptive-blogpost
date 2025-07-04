Dev Toolbar App API
===================

The Astro Dev Toolbar App API allows you to create [Astro Integrations](/en/reference/integrations-reference/) that add apps to the Astro Dev Toolbar. This allows you to add new features and integrations with third-party services.

![](/houston_chef.webp) **Related recipe:** [Create a dev toolbar app](/en/recipes/making-toolbar-apps/)

Toolbar app integration setup
-----------------------------

[Section titled Toolbar app integration setup](#toolbar-app-integration-setup)

Integrations can add apps to the dev toolbar in [the `astro:config:setup` hook](/en/reference/integrations-reference/#astroconfigsetup).

my-integration.js

    /** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "my-integration",  hooks: {    "astro:config:setup": ({ addDevToolbarApp }) => {      addDevToolbarApp({        id: "my-app",        name: "My App",        icon: "<svg>...</svg>",        entrypoint: "./my-app.js",      });    },  },});

### `addDevToolbarApp()`

[Section titled addDevToolbarApp()](#adddevtoolbarapp)

A function available to [the `astro:config:setup` hook](/en/reference/integrations-reference/#astroconfigsetup) that adds dev toolbar apps. It takes an object with the following required properties to define the toolbar app: [`id`](#id), [`name`](#name), [`icon`](#icon), and [`entrypoint`](#entrypoint).

### `id`

[Section titled id](#id)

A unique identifier for the app. This will be used to uniquely identify the app in hooks and events.

my-integration.js

    {  id: 'my-app',  // ...}

### `name`

[Section titled name](#name)

The name of the app. This will be shown to users whenever the app needs to be referenced using a human-readable name.

my-integration.js

    {  // ...  name: 'My App',  // ...}

### `icon`

[Section titled icon](#icon)

The icon used to display the app in the toolbar. This can either be an icon from [the icon list](#icons), or a string containing the SVG markup of the icon.

my-integration.js

    {  // ...  icon: '<svg>...</svg>', // or, e.g. 'astro:logo'  // ...}

### `entrypoint`

[Section titled entrypoint](#entrypoint)

The path to the file that exports the dev toolbar app.

my-integration.js

    {  // ...  entrypoint: './my-app.js',}

**Added in:** `astro@5.0.0`

The function also accepts a `URL` as `entrypoint`:

my-integration.js

    /** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "my-integration",  hooks: {    "astro:config:setup": ({ addDevToolbarApp }) => {      addDevToolbarApp({        id: "my-app",        name: "My App",        icon: "<svg>...</svg>",        entrypoint: new URL("./my-app.js", import.meta.url),      });    },  },});

Structure of a Dev Toolbar App
------------------------------

[Section titled Structure of a Dev Toolbar App](#structure-of-a-dev-toolbar-app)

A Dev Toolbar App is a `.js` or `.ts` file that default exports an object using the [`defineToolbarApp()` function](#definetoolbarapp) available from the `astro/toolbar` module.

src/my-app.js

    import { defineToolbarApp } from "astro/toolbar";
    export default defineToolbarApp({  init(canvas) {    const text = document.createTextNode('Hello World!');    canvas.appendChild(text);  },  beforeTogglingOff() {    const confirmation = window.confirm('Really exit?');    return confirmation;  }});

### `defineToolbarApp()`

[Section titled defineToolbarApp()](#definetoolbarapp)

**Added in:** `astro@4.7.0`

A function that defines the logic of your toolbar app when it is loaded and toggled off.

This function takes an object with an [`init()`](#init) function that will be called when the dev toolbar app is loaded. It can also take a [`beforeTogglingOff()`](#beforetogglingoff) function that will run when the toolbar app is clicked to toggle off its active status.

### `init()`

[Section titled init()](#init)

**Signature:** `init(canvas: ShadowRoot, app: ToolbarAppEventTarget, server: ToolbarServerHelpers) => void`

Although not required, most apps will use this function to define the core behavior of the app. This function will be called only once when the app is loaded, which will either be when the browser is idle or when the user clicks on the app in the UI, depending on which one comes first.

The function receives three arguments to define your app logic: [`canvas`](#canvas) (to render elements to the screen), [`app`](#app) (to send and receive client-side events from the dev toolbar), and [`server`](#server) (to communicate with the server).

#### `canvas`

[Section titled canvas](#canvas)

A standard [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) that the app can use to render its UI. Elements can be created and added to the ShadowRoot using the standard DOM APIs.

Every app receives its own dedicated ShadowRoot for rendering its UI. Additionally, the parent element is positioned using `position: absolute;` so the app UI will not affect the layout of an Astro page.

src/my-app.js

    export default defineToolbarApp({  init(canvas) {    canvas.appendChild(document.createTextNode('Hello World!'))  }});

#### `app`

[Section titled app](#app)

**Added in:** `astro@4.7.0`

A standard [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) with a few additional [helpers for client-side events](#client-side-events) that can be used to send and receive events from the Dev toolbar.

src/my-app.js

    export default defineToolbarApp({  init(canvas, app) {    app.onToggled(({ state }) => {      const text = document.createTextNode(        `The app is now ${state ? "enabled" : "disabled"}!`,      );      canvas.appendChild(text);    });  },});

#### `server`

[Section titled server](#server)

**Added in:** `astro@4.7.0`

An object that can be used to [communicate with the server](#client-server-communication).

src/my-app.js

    export default defineToolbarApp({  init(canvas, app, server) {    server.send('my-message', { message: 'Hello!' });
        server.on('server-message', (data) => {      console.log(data.message);    });  },});

### `beforeTogglingOff()`

[Section titled beforeTogglingOff()](#beforetogglingoff)

**Signature:** `beforeTogglingOff(canvas: ShadowRoot): boolean | void`

**Added in:** `astro@4.7.0`  

This optional function will be called when the user clicks on the app icon in the UI to toggle off the app. This function can be used, for example, to perform cleanup operations, or to ask the user for confirmation before toggling off the app.

If a falsy value is returned, the toggling off will be cancelled and the app will stay enabled.

src/my-app.js

    export default defineToolbarApp({  // ...  beforeTogglingOff() {    const confirmation = window.confirm('Are you sure you want to disable this app?');    return confirmation;  }});

#### canvas

[Section titled canvas](#canvas-1)

The ShadowRoot of the app, can be used to render any UI needed before closing. Same as the [`canvas` argument of the `init` function](#canvas).

Client-side Events
------------------

[Section titled Client-side Events](#client-side-events)

In addition to the standard methods of an `EventTarget` ([`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget), [`dispatchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent), [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)etc.), the [`app`](#app) object also has the following methods:

### `onToggled()`

[Section titled onToggled()](#ontoggled)

**Signature:** `onToggled(callback: (options: {state: boolean})) => void`

**Added in:** `astro@4.7.0`  

Registers a callback to be called when the user clicks on the app icon in the UI to toggle the app on or off.

src/my-app.js

    app.onToggled((options) => {  console.log(`The app is now ${options.state ? 'enabled' : 'disabled'}!`);});

### `onToolbarPlacementUpdated()`

[Section titled onToolbarPlacementUpdated()](#ontoolbarplacementupdated)

**Signature:** `onToolbarPlacementUpdated(callback: (options: {placement: 'bottom-left' | 'bottom-center' | 'bottom-right'})) => void`

**Added in:** `astro@4.7.0`  

This event is fired when the user changes the placement of the Dev Toolbar. This can, for example, be used to reposition the app’s UI when the toolbar is moved.

src/my-app.js

    app.onToolbarPlacementUpdated((options) => {  console.log(`The toolbar is now placed at ${options.placement}!`);});

### `toggleState()`

[Section titled toggleState()](#togglestate)

**Signature:** `toggleState(options: {state: boolean}) => void`

**Added in:** `astro@4.7.0`  

Changes the state of the app. This can be used to enable or disable the app programmatically, for example, when the user clicks on a button in the app’s UI.

src/my-app.js

    app.toggleState({ state: false });

### `toggleNotification()`

[Section titled toggleNotification()](#togglenotification)

**Signature:** `toggleNotification(options: {state?: boolean, level?: 'error' | 'warning' | 'info'}) => void`

**Added in:** `astro@4.7.0`  

Toggles a notification on the app icon. This can be used to inform the user that the app requires attention, or remove the current notification.

src/my-app.js

    app.toggleNotification({  state: true,  level: 'warning',});

#### `state: boolean`

[Section titled state: boolean](#state-boolean)

Indicates whether or not the app has a notification for the user. When `true`, the app icon will be highlighted. Conversely, when `false`, the highlight will be removed. If this property is not specified, `true` will be assumed.

#### `level: 'error' | 'warning' | 'info'`

[Section titled level: &#39;error&#39; | &#39;warning&#39; | &#39;info&#39;](#level-error--warning--info)

Indicates the level of the notification. This will be used to determine the color and shape (dark pink circle, gold triangle, or blue square) of the highlight on the app icon. If this property is not specified, `'error'` will be assumed.

Client-Server Communication
---------------------------

[Section titled Client-Server Communication](#client-server-communication)

Using [Vite’s methods for client-server communication](https://vite.dev/guide/api-plugin.html#client-server-communication), Dev Toolbar Apps and the server can communicate with each other. In order to facilitate sending and receiving custom messages, helper methods are provided for use both in your toolbar app (on the client) and in your integration (on the server).

### On the client

[Section titled On the client](#on-the-client)

In your app, use the [`server` object on the `init()` hook](#server) to send and receive messages to and from the server.

src/my-app.js

    export default defineToolbarApp({  init(canvas, app, server) {    server.send('my-message', { message: 'Hello!' });
        server.on('server-message', (data) => {      console.log(data.message);    });  },});

#### `send()`

[Section titled send()](#send)

**Signature:** `send<T>(event: stringify, data: T) => void`

**Added in:** `astro@4.7.0`

Sends data to the server from logic defined in your toolbar app.

src/my-app.js

    init(canvas, app, server) {  server.send('my-app:my-message', { message: 'Hello!' });}

When sending messages from the client to the server, it is good practice to prefix the event name with the app ID or other namespaces to avoid conflicts with other apps or other integrations that may be listening for messages.

#### `on()`

[Section titled on()](#on)

**Signature:** `on<T>(event: string, callback: (data: T) => void) => void`

**Added in:** `astro@4.7.0`  

Registers a callback to be called when the server sends a message with the specified event.

src/my-app.js

    init(canvas, app, server) {  server.on('server-message', (data) => {    console.log(data.message);  });}

### On the server

[Section titled On the server](#on-the-server)

In an integration, such as [the integration that adds your toolbar app](#toolbar-app-integration-setup), use the [`astro:server:setup` hook](/en/reference/integrations-reference/#astroserversetup) to access the `toolbar` object to send and receive messages to and from your apps.

my-integration.js

    export default () => ({  name: "my-integration",  hooks: {    "astro:config:setup": ({ addDevToolbarApp }) => {},    "astro:server:setup": ({ toolbar }) => {},  },});

#### `send()`

[Section titled send()](#send-1)

**Signature:** `send<T>(event: string, data: T) => void`

**Added in:** `astro@4.7.0`  

Sends data to the client.

my-integration.js

    'astro:server:setup': ({ toolbar }) => {  toolbar.send('server-message', { message: 'Hello!' });},

#### `on()`

[Section titled on()](#on-1)

**Signature:** `on<T>(event: string, callback: (data: T) => void) => void`

**Added in:** `astro@4.7.0`  

Registers a callback to be called when the client sends a message with the specified event.

my-integration.js

    'astro:server:setup': ({ toolbar }) => {  toolbar.on('my-app:my-message', (data) => {    console.log(data.message);  });},

#### `onInitialized()`

[Section titled onInitialized()](#oninitialized)

**Signature:** `onInitialized(appId: string, callback: () => void) => void`

**Added in:** `astro@4.7.0`  

Registers a callback to be called when the app is initialized.

my-integration.js

    'astro:server:setup': ({ toolbar }) => {  toolbar.onInitialized('my-app', () => {    console.log('The app is now initialized!');  });},

Note

The built-in `connection` event from Vite fires **before** Dev Toolbar apps are initialized and therefore cannot be used directly by apps. Use the `onInitialized` method to ensure that the app is fully initialized before sending messages to it.

#### `onAppToggled()`

[Section titled onAppToggled()](#onapptoggled)

**Signature:** `onAppToggled(appId: string, callback: (options: {state: boolean}) => void) => void`

**Added in:** `astro@4.7.0`  

Registers a callback to be called when the user clicks on the app icon in the UI to toggle the app on or off.

my-integration.js

    'astro:server:setup': ({ toolbar }) => {  toolbar.onAppToggled('my-app', ({ state }) => {    console.log(`The app is now ${state ? 'enabled' : 'disabled'}!`);  });},

Component Library
-----------------

[Section titled Component Library](#component-library)

The Dev Toolbar includes a set of web components that can be used to build apps with a consistent look and feel.

### `astro-dev-toolbar-window`

[Section titled astro-dev-toolbar-window](#astro-dev-toolbar-window)

Shows a window.

The slot of the component will be used as the content of the window.

    <astro-dev-toolbar-window>  <p>My content</p></astro-dev-toolbar-window>

When building a window using JavaScript, slotted content must go inside the light DOM of the component.

    const myWindow = document.createElement('astro-dev-toolbar-window');const myContent = document.createElement('p');myContent.textContent = 'My content';
    // use appendChild directly on `window`, not `myWindow.shadowRoot`myWindow.appendChild(myContent);

### `astro-dev-toolbar-button`

[Section titled astro-dev-toolbar-button](#astro-dev-toolbar-button)

Shows a button.

The slot of the component will be used as the content of the button.

    const myButton = document.createElement('astro-dev-toolbar-button');myButton.textContent = 'Click me!';myButton.buttonStyle = "purple";myButton.size = "medium";
    myButton.addEventListener('click', () => {  console.log('Clicked!');});

#### `size`

[Section titled size](#size)

The size of the button (`small`, `medium`, `large`).

#### `button-style`

[Section titled button-style](#button-style)

The style of the button (`ghost`, `outline`, `purple`, `gray`, `red`, `green`, `yellow`, `blue`). When using `ghost`, the button itself is invisible and only the content of the button will be shown.

In JavaScript, set this property using the `buttonStyle` property to avoid conflict with the native `style` property.

#### `button-border-radius`

[Section titled button-border-radius](#button-border-radius)

**Added in:** `astro@4.8.0`

The border radius of the button (`normal`, `rounded`). When using `rounded`, the button will have rounded corners and uniform padding on all sides.

In JavaScript, set this property using the `buttonBorderRadius` property.

### `astro-dev-toolbar-badge`

[Section titled astro-dev-toolbar-badge](#astro-dev-toolbar-badge)

Shows a badge.

The slot of the component will be used as the content of the badge.

    <astro-dev-toolbar-badge>My badge</astro-dev-toolbar-badge>

#### `size`

[Section titled size](#size-1)

The size of the badge (`small`, `large`).

#### `badge-style`

[Section titled badge-style](#badge-style)

The style (color) of the badge (`purple`, `gray`, `red`, `green`, `yellow`, `blue`).

In JavaScript, set this property using the `badgeStyle` property to avoid conflict with the native `style` property.

### `astro-dev-toolbar-card`

[Section titled astro-dev-toolbar-card](#astro-dev-toolbar-card)

Shows a card. Specify an optional `link` attribute to make the card act like an `<a>` element.

When making a card using JavaScript, a `clickAction` property can be specified to make the card act like a `<button>` element.

The slot of the component will be used as the content of the card.

    <astro-dev-toolbar-card icon="astro:logo" link="https://github.com/withastro/astro/issues/new/choose">Report an issue</astro-dev-toolbar-card>

#### `card-style`

[Section titled card-style](#card-style)

The style of the card (`purple`, `gray`, `red`, `green`, `yellow`, `blue`). The color is only applied to the border of the card on hover.

In JavaScript, set this property using the `cardStyle`.

### `astro-dev-toolbar-toggle`

[Section titled astro-dev-toolbar-toggle](#astro-dev-toolbar-toggle)

Shows a toggle element, acting as a checkbox. This element internally is a simple wrapper around a native `<input type="checkbox">` element. The checkbox element can be accessed using the `input` property.

    const toggle = document.createElement('astro-dev-toolbar-toggle');
    toggle.input.addEventListener('change', (evt) => {  console.log(`The toggle is now ${evt.currentTarget.checked ? 'enabled' : 'disabled'}!`);});

### `astro-dev-toolbar-radio-checkbox`

[Section titled astro-dev-toolbar-radio-checkbox](#astro-dev-toolbar-radio-checkbox)

**Added in:** `astro@4.8.0`

Shows a radio checkbox. Similar to the `astro-dev-toolbar-toggle` component, this element is a simple wrapper around a native `<input type="radio">` element. The radio element can be accessed using the `input` property.

    const radio = document.createElement('astro-dev-toolbar-radio-checkbox');
    radio.input.addEventListener('change', (evt) => {  console.log(`The radio is now ${evt.currentTarget.checked ? 'enabled' : 'disabled'}!`);});

#### `toggle-style`

[Section titled toggle-style](#toggle-style)

The style of the toggle (`purple`, `gray`, `red`, `green`, `yellow`, `blue`).

In JavaScript, set this property using the `toggleStyle` property.

### `astro-dev-toolbar-highlight`

[Section titled astro-dev-toolbar-highlight](#astro-dev-toolbar-highlight)

Can be used to highlight an element on the page. In most cases, you’ll want to position and resize this element using the `top`, `left`, `width` and `height` CSS properties to match the element you want to highlight.

    <!-- Highlight the entire page --><astro-dev-toolbar-highlight style="top: 0; left: 0; width: 100%; height: 100%;"></astro-dev-toolbar-highlight>

    const elementToHighlight = document.querySelector('h1');const rect = elementToHighlight.getBoundingClientRect();
    const highlight = document.createElement('astro-dev-toolbar-highlight');
    highlight.style.top = `${Math.max(rect.top + window.scrollY - 10, 0)}px`;highlight.style.left = `${Math.max(rect.left + window.scrollX - 10, 0)}px`;highlight.style.width = `${rect.width + 15}px`;highlight.style.height = `${rect.height + 15}px`;highlight.icon = 'astro:logo';

#### `style`

[Section titled style](#style)

The style of the highlight (`purple`, `gray`, `red`, `green`, `yellow`, `blue`).

#### `icon`

[Section titled icon](#icon-1)

An [icon](#icons) to show in the top right corner of the highlight.

### `astro-dev-toolbar-tooltip`

[Section titled astro-dev-toolbar-tooltip](#astro-dev-toolbar-tooltip)

Shows a tooltip with different sections. This component is set to `display: none;` by default and can be made visible using a `data-show="true"` attribute.

Sections are defined using the `sections` property. This property is an array of objects with the following shape:

    {  title?: string; // Title of the section  inlineTitle?: string; // Title of the section, shown inline next to the title  icon?: Icon; // Icon of the section  content?: string; // Content of the section  clickAction?: () => void | Promise<void>; // Action to perform when clicking on the section  clickDescription?: string; // Description of the action to perform when clicking on the section}

    const tooltip = document.createElement('astro-dev-toolbar-tooltip');
    tooltip.sections = [{  title: 'My section',  icon: 'astro:logo',  content: 'My content',  clickAction: () => {    console.log('Clicked!')  },  clickDescription: 'Click me!'}]

This component is often combined with the `astro-dev-toolbar-highlight` component to show a tooltip when hovering a highlighted element:

    const highlight = document.createElement('astro-dev-toolbar-highlight');
    // Position the highlight...
    const tooltip = document.createElement('astro-dev-toolbar-tooltip');
    // Add sections to the tooltip...
    highlight.addEventListener('mouseover', () => {  tooltip.dataset.show = 'true';});
    highlight.addEventListener('mouseout', () => {  tooltip.dataset.show = 'false';});

### `astro-dev-toolbar-icon`

[Section titled astro-dev-toolbar-icon](#astro-dev-toolbar-icon)

Shows an icon. An icon from [the icon list](#icons) can be specified using the `icon` attribute, or the SVG markup of an icon can be passed as a slot.

    <astro-dev-toolbar-icon icon="astro:logo" />

    <astro-dev-toolbar-icon>  <svg>...</svg></astro-dev-toolbar-icon>

#### Icons

[Section titled Icons](#icons)

Currently, the following icons are available and can be used in any component that accepts an icon:

*   `astro:logo`
*   `warning`
*   `arrow-down`
*   `bug`
*   `file-search`
*   `check-circle`
*   `gear`
*   `lightbulb`
*   `checkmark`
*   `dots-three`
*   `copy`

All of the above icons have `fill="currentColor"` set by default and will inherit their color from the parent element.

Reference

![](/_astro/CodingInPublic.DpaYu7Qd_5sx41.webp)

Learn Astro with **Coding in Public**
-------------------------------------

150+ video lessons • Astro v5 ready

[Get 20% off](https://learnastro.dev?code=ASTRO_PROMO)

document.querySelectorAll("a\[data-learn-astro-cta\]").forEach(a=>a.addEventListener("click",()=>{window.fathom?.trackEvent("Docs: Coding in Public campaign click")}));

[Edit page](https://github.com/withastro/docs/edit/main/src/content/docs/en/reference/dev-toolbar-app-reference.mdx) [Translate this page](https://contribute.docs.astro.build/guides/i18n/)

[Previous  
Image Service API](/en/reference/image-service-reference/) [Next  
Container API (experimental)](/en/reference/container-reference/)

[Contribute](/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)

