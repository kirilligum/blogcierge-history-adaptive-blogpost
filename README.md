# BlogCierge: AI-Adaptive Blog Platform

BlogCierge is an experimental blog platform that uses AI to personalize blog posts for each reader based on their interaction history.

## Features

-   **Dynamic Content Personalization**: Rewrites blog posts on-the-fly using an LLM to match the reader's knowledge level.
-   **Interactive AI Assistant**: Readers can ask questions about the blog post content.
-   **Admin Panel**: A secure area to view analytics and manage posts.
-   **Powered by Cloudflare**: Built with Astro and deployed on Cloudflare Pages, using KV for storage and R2 for logging.

## Getting Started: Deploying Your Own BlogCierge

Follow these steps to deploy your own version of BlogCierge.

### Prerequisites

1.  A [Cloudflare account](https://dash.cloudflare.com/sign-up).
2.  [Node.js](https://nodejs.org/en/) (version 18 or later) and [Yarn](https://yarnpkg.com/getting-started/install) installed.
3.  `wrangler` CLI, the Cloudflare developer tool. Install and log in:
    ```bash
    npm install -g wrangler
    wrangler login
    ```

### Step 1: Fork and Clone the Repository

Fork this repository to your own GitHub account, then clone it to your local machine.

```bash
git clone https://github.com/YOUR_USERNAME/blogcierge-history-adaptive-blogpost.git
cd blogcierge-history-adaptive-blogpost
```

### Step 2: Install Dependencies

Install the project dependencies using Yarn.

```bash
yarn install
```

### Step 3: Set Up Cloudflare Resources

This project requires several Cloudflare resources (KV namespaces and an R2 bucket). A setup script is provided to create these for you automatically.

Run the setup script:

```bash
yarn setup:cloudflare
```

This script will:
1.  Execute `wrangler` commands to create all necessary KV namespaces and the R2 bucket in your Cloudflare account.
2.  Automatically update your `wrangler.toml` file with the IDs of the newly created resources.
3.  Create a `.dev.vars` file if one doesn't exist, for you to add your API keys.

**Note:** The setup script modifies `wrangler.toml`. Do not commit these changes to version control.

### Step 4: Add API Keys for Local Development

If the setup script created a `.dev.vars` file, open it and add your API keys for the LLM providers you intend to use. If it already existed, ensure your keys are present.

```ini
# .dev.vars

# Add your secret API keys below
OPENROUTER_API_KEY="sk-or-..."
LLAMA_API_KEY="llm-..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```
**Note:** `.dev.vars` is included in `.gitignore` and should never be committed to your repository.

### Step 5: Local Development

To run the project locally, use the `preview` script. This command first builds the Astro site and then starts a local server using `wrangler`.

```bash
yarn preview
```

Wrangler automatically reads the resource bindings from your modified `wrangler.toml` and the secret keys from your `.dev.vars` file to simulate the Cloudflare environment.

### Step 6: Deploy to Cloudflare Pages

1.  Go to your [Cloudflare Dashboard](https://dash.cloudflare.com).
2.  Navigate to **Workers & Pages** and click **Create application**.
3.  Select the **Pages** tab and click **Connect to Git**.
4.  Connect your GitHub account and select your forked `blogcierge-history-adaptive-blogpost` repository.
5.  In the "Build settings", select **Astro** as the framework preset. This should configure the build command (`astro build`) and output directory (`/dist`) correctly.
6.  Go to **Settings > Environment variables** and add your secret API keys for production:
    *   `LLAMA_API_KEY`
    *   `OPENROUTER_API_KEY`
    *   `GITHUB_CLIENT_ID`
    *   `GITHUB_CLIENT_SECRET`
7.  Click **Save and Deploy**.

Your site should now build and deploy successfully. Bindings are handled automatically by `wrangler.toml`.

### Step 7: First-Time Admin Setup

After your site is live, you need to create your admin account.
1.  Navigate to `https://your-project-name.pages.dev/blog/admin`.
2.  You will be redirected to the setup page.
3.  Enter your desired admin email and password to create your account.

Congratulations! Your BlogCierge instance is now fully deployed and configured.
