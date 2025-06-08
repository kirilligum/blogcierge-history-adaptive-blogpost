# BlogCierge: AI-Adaptive Blog Platform

BlogCierge is an experimental blog platform that uses AI to personalize blog posts for each reader and provides a Git-based workflow for generating and managing supplemental content.

## How It Works: A Dual Architecture

This project uses two distinct architectures for its two primary features:

1.  **Dynamic Content Personalization (Server-Side Rendering):** When a user visits a blog post with the `?personalize=true` query parameter, the page is rendered on-the-fly by a Cloudflare Worker. It fetches the user's interaction history from KV and uses an LLM to rewrite the post content to match the reader's knowledge level. This provides a tailored experience.

2.  **Q&A Dataset Generation (Git-based Static Content):** The admin panel features a workflow to generate and manage Q&A datasets for blog posts. This process is designed to result in fast, static content for all visitors.
    *   **Generate:** An admin clicks "Generate" to trigger a background job that creates a Q&A dataset and stores it temporarily in an R2 bucket.
    *   **Commit:** After authenticating with GitHub, the admin clicks "Commit to Site." This calls a secure API that copies the Q&A data from R2 and commits it as a new JSON file to the `/src/data/qa/` directory in your GitHub repository.
    *   **Deploy:** This commit to your `main` branch automatically triggers a new build and deployment on Cloudflare Pages.
    *   **Serve:** During the build, Astro finds the local Q&A JSON file and bakes its content directly into the static HTML of the blog post. The final page is served from Cloudflare's global CDN with zero runtime overhead.

---

## Getting Started: Deploying Your Own BlogCierge

Follow these steps to deploy your own version of BlogCierge.

### Prerequisites

1.  A [Cloudflare account](https://dash.cloudflare.com/sign-up).
2.  A [GitHub account](https://github.com).
3.  [Node.js](https://nodejs.org/en/) (version 18 or later) and [Yarn](https://yarnpkg.com/getting-started/install) installed.
4.  `wrangler` CLI, the Cloudflare developer tool. Install and log in:
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

**Note:** The setup script modifies `wrangler.toml`. It is recommended not to commit these changes to version control if you plan to share your repository publicly.

### Step 4: Set Up GitHub OAuth App for Local Development

To use the "Commit to Site" feature locally, you need to create a GitHub OAuth App.

1.  Go to your GitHub **Settings > Developer settings > OAuth Apps** and click **New OAuth App**.
2.  Fill out the form with your **local development** details:
    *   **Application name:** `BlogCierge Local Dev`
    *   **Homepage URL:** `http://localhost:8788`
    *   **Authorization callback URL:** `http://localhost:8788/api/auth/github/callback`
3.  Click **Register application**.
4.  Click **Generate a new client secret**. Copy both the **Client ID** and the new **Client Secret**.

### Step 5: Add All Secrets to `.dev.vars`

Open the `.dev.vars` file in your project root (or create it by copying `.dev.vars.example`). Add all your secrets for local development.

```ini
# .dev.vars

# LLM API Keys
OPENROUTER_API_KEY="sk-or-..."
LLAMA_API_KEY="llm-..."

# GitHub OAuth App credentials (for local development)
GITHUB_CLIENT_ID="YOUR_LOCAL_CLIENT_ID"
GITHUB_CLIENT_SECRET="YOUR_LOCAL_CLIENT_SECRET"

# GitHub Repository details
GITHUB_REPO_OWNER="your-github-username"
GITHUB_REPO_NAME="your-repo-name"

# Cloudflare API credentials for deployment status
# Go to My Profile > API Tokens > Create Token > Use "Edit Cloudflare Pages" template.
CLOUDFLARE_API_TOKEN="YOUR_CLOUDFLARE_API_TOKEN"
CLOUDFLARE_ACCOUNT_ID="YOUR_CLOUDFLARE_ACCOUNT_ID"
CLOUDFLARE_PROJECT_NAME="your-cloudflare-pages-project-name"
```

### Step 6: Local Development

Run the project locally using the `preview` script. This command builds the site and then starts a local server using `wrangler`.

```bash
yarn preview
```

**Note on Local Workflow:** When you commit a Q&A file locally, it will trigger a deployment on Cloudflare, but it will **not** automatically appear in your local `yarn preview` session. To see the Q&A data locally, you would need to stop the server, `git pull` the changes from your repository, and then run `yarn preview` again.

### Step 7: Production Deployment

1.  **Create a Production GitHub OAuth App:** Go back to your GitHub Developer settings and create a **second, separate OAuth App** for your live site.
    *   **Application name:** `BlogCierge` (or your site's name)
    *   **Homepage URL:** `https://your-domain.com` (e.g., `https://blogcierge.com`)
    *   **Authorization callback URL:** `https://your-domain.com/api/auth/github/callback`
2.  **Deploy to Cloudflare Pages:**
    *   In your [Cloudflare Dashboard](https://dash.cloudflare.com), go to **Workers & Pages** and create a new **Pages** application.
    *   Connect it to your forked GitHub repository.
    *   In the "Build settings", select **Astro** as the framework preset.
3.  **Add Production Environment Variables:**
    *   In your Pages project settings, go to **Settings > Environment variables**.
    *   Add all the same secrets from your `.dev.vars` file, but use the credentials from your **production** GitHub OAuth App.
4.  **Deploy:** The first deployment will be triggered. Subsequent commits to your `main` branch will automatically trigger new deployments.

### Step 8: First-Time Admin Setup

After your site is live, navigate to `https://your-domain.com/blog/admin` to create your admin account.
