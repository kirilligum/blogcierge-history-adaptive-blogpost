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
2.  Create a `.dev.vars` file in your project root with the IDs of these new resources. This file is used for local development.
3.  Print a list of the created resources and their IDs. **You will need this for Step 5.**

### Step 4: Add API Keys for Local Development

The setup script created a `.dev.vars` file. Open it and add your API keys for the LLM providers you intend to use.

```ini
# .dev.vars

# ... (generated resource IDs will be here) ...

# Add your secret API keys below
OPENROUTER_API_KEY="sk-or-..."
LLAMA_API_KEY="llm-..."
```
**Note:** `.dev.vars` is included in `.gitignore` and should never be committed to your repository.

### Step 5: Create and Configure Your Cloudflare Pages Project

1.  Go to your [Cloudflare Dashboard](https://dash.cloudflare.com).
2.  Navigate to **Workers & Pages** and click **Create application**.
3.  Select the **Pages** tab and click **Connect to Git**.
4.  Connect your GitHub account and select your forked `blogcierge-history-adaptive-blogpost` repository.
5.  In the "Build settings", select **Astro** as the framework preset. This should configure the build command (`astro build`) and output directory (`/dist`) correctly.
6.  Click **Save and Deploy**. Cloudflare will start the first deployment, which may fail because the bindings are not yet configured. This is expected.
7.  After the project is created, go to its settings page: **Settings > Functions**.
8.  Under **KV namespace bindings** and **R2 bucket bindings**, add a binding for each resource. Use the output from the `yarn setup:cloudflare` script (from Step 3) to fill these in.
    *   Click **Add binding** for each resource:
        *   **`BLGC_ADMIN_KV`**: Variable name `BLGC_ADMIN_KV`, select the corresponding KV namespace.
        *   **`BLGC_BLOGPOST_AI_CACHE`**: Variable name `BLGC_BLOGPOST_AI_CACHE`, select the corresponding KV namespace.
        *   **`BLGC_SITE_CONTENT_CACHE`**: Variable name `BLGC_SITE_CONTENT_CACHE`, select the corresponding KV namespace.
        *   **`BLGC_USER_INTERACTIONS_KV`**: Variable name `BLGC_USER_INTERACTIONS_KV`, select the corresponding KV namespace.
        *   **`BLGC_AI_LOGS_BUCKET`**: Variable name `BLGC_AI_LOGS_BUCKET`, select the corresponding R2 bucket.
9.  Next, go to **Settings > Environment variables** and add your secret API keys for production:
    *   `LLAMA_API_KEY`
    *   `OPENROUTER_API_KEY`

### Step 6: Redeploy

Once all environment variables and bindings are configured in the dashboard, go to the "Deployments" tab of your Pages project and click **Retry deployment** on the failed build.

Your site should now build and deploy successfully!

### Step 7: First-Time Admin Setup

After your site is live, you need to create your admin account.
1.  Navigate to `https://your-project-name.pages.dev/blog/admin`.
2.  You will be redirected to the setup page.
3.  Enter your desired admin email and password to create your account.

Congratulations! Your BlogCierge instance is now fully deployed and configured.
