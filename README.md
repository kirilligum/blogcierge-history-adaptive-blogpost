# BlogCierge 🤖📚

An AI-adaptive, interactive blog platform that personalizes content based on user reading history and AI interactions.

https://youtu.be/ceV-guUP6oU

## 🌟 Features

### 🎯 Personalized Content

- **Adaptive Blog Posts**: Content automatically adjusts based on your reading history
- **Smart Summarization**: Removes redundant information you've already learned
- **Contextual Explanations**: Expands on new concepts based on your knowledge gaps
- **Real-time Personalization**: Uses SSR (Server-Side Rendering) for instant content adaptation

### 🤖 AI Assistant

- **Interactive Q&A**: Ask questions about blog posts with contextual AI responses
- **Word-level Interaction**: Click on any word to add it to your question
- **Conversation History**: Maintains context across your reading sessions
- **Smart Filtering**: AI determines if questions are relevant to the content

### 📊 Analytics & Tracking

- **Reading Analytics**: Track user interactions and reading patterns
- **Device-based Tracking**: Anonymous user identification across sessions
- **Conversation Analytics**: Query and analyze user interactions with AI
- **Read Status Tracking**: Mark posts as read with persistent state

### 🔄 Circular Economy Focus

- **Sustainability Content**: Specialized blog content about NYC's circular fashion economy
- **Educational Framework**: Structured learning with familiar vs. new concepts
- **Citation System**: Comprehensive source attribution and referencing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Yarn package manager
- Cloudflare account (for deployment)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kirilligum/blogcierge-history-adaptive-blogpost.git
   cd blogcierge-history-adaptive-blogpost
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file with:

   ```env
   LLAMA_API_KEY=your_llama_api_key_here
   ```

4. **Start development server**

   ```bash
   yarn dev
   ```

5. **Visit your local site**
   ```
   http://localhost:4321
   ```

## 🏗️ Architecture

### Technology Stack

- **Framework**: Astro 4.x with SSR
- **Deployment**: Cloudflare Pages
- **Storage**: Cloudflare KV (caching) + R2 (logs)
- **AI**: Llama API for content generation
- **Styling**: Custom CSS with design system
- **Content**: Markdown with frontmatter

### System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Browser  │    │  Cloudflare Edge │    │   Astro SSR     │
│                 │◄──►│                  │◄──►│                 │
│ • Reading       │    │ • KV Cache       │    │ • Content       │
│ • AI Chat       │    │ • R2 Logs        │    │   Adaptation    │
│ • Analytics     │    │ • CDN            │    │ • AI Processing │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Data Flow

```
User Reads Post → Device ID Generated → Reading History Stored
                                    ↓
Content Personalization ← LLM Analysis ← User History Retrieved
                                    ↓
Personalized Content Served ← Cache Check ← SSR Processing
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── BlogAssistant.astro    # AI chat interface
│   ├── ChipButton.astro       # Custom button component
│   └── Header.astro           # Site navigation
├── content/
│   └── blog/            # Markdown blog posts
├── layouts/             # Page layouts
│   ├── Layout.astro          # Base layout
│   └── BlogPostLayout.astro  # Blog-specific layout
├── pages/
│   ├── api/             # API endpoints
│   │   ├── ask.ts           # AI question handling
│   │   ├── feedback.ts      # User feedback collection
│   │   └── analytics-query.ts # Analytics queries
│   ├── blog/            # Blog pages
│   └── index.astro      # Homepage
├── styles/              # Global styles
└── utils/               # Utility functions
```

## 🔧 Configuration

### Cloudflare Bindings

The project requires several Cloudflare bindings configured in `wrangler.toml`:

```toml
# KV Namespaces
[[kv_namespaces]]
binding = "BLGC_BLOGPOST_AI_CACHE"      # Content caching
binding = "BLGC_USER_INTERACTIONS_KV"   # User tracking
binding = "BLGC_SITE_CONTENT_CACHE"     # Site-wide content cache

# R2 Buckets
[[r2_buckets]]
binding = "BLGC_AI_LOGS_BUCKET"         # Conversation logs
```

### Environment Variables

- `LLAMA_API_KEY`: API key for Llama AI service
- Additional Cloudflare bindings are configured via `wrangler.toml`

## 🎨 Key Components

### BlogAssistant

Interactive AI chat component that:

- Handles user questions about blog content
- Maintains conversation history
- Provides feedback mechanisms (like/dislike)
- Integrates with word-level content interaction

### Content Personalization Engine

Server-side system that:

- Analyzes user reading history
- Generates personalized content via LLM
- Caches results for performance
- Falls back gracefully when personalization fails

### Analytics Dashboard

Administrative interface for:

- Viewing user interaction patterns
- Querying conversation data
- Understanding content engagement
- Analyzing reading behaviors

## 🚀 Deployment

### Cloudflare Pages Deployment

1. **Build the project**

   ```bash
   yarn build
   ```

2. **Deploy to Cloudflare**

   ```bash
   yarn deploy
   ```

3. **Configure environment variables** in Cloudflare Pages dashboard

### Local Development with Cloudflare

```bash
# Start with Cloudflare Workers simulation
yarn preview
```

## 📊 Usage Examples

### Reading a Blog Post

1. Visit any blog post (e.g., `/blog/nyc-textile-waste-problem/`)
2. Content automatically personalizes based on your history
3. Use the AI assistant to ask questions
4. Click words to add them to your questions

### Analytics Queries

1. Visit `/analytics/`
2. Select user devices to analyze
3. Ask questions about user interactions
4. View aggregated conversation data

### Content Management

1. Add new blog posts to `src/content/blog/`
2. Use frontmatter for metadata and learning objectives
3. Include citations and concept categorization
4. Content automatically becomes available for personalization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Add appropriate TypeScript types
- Test AI interactions thoroughly
- Ensure responsive design compatibility
- Document new features and APIs

## 🔍 API Reference

### `/api/ask`

Handles AI questions about blog content

- **Method**: POST
- **Body**: `{ messages, slug, readerId, sessionId, currentUserQuestion }`
- **Response**: `{ answer, source }`

### `/api/feedback`

Collects user feedback on AI responses

- **Method**: POST
- **Body**: `{ slug, readerId, sessionId, aiResponseContent, userQuestionContext, rating }`
- **Response**: `{ message }`

### `/api/track-interaction`

Tracks user reading behavior

- **Method**: POST
- **Body**: `{ deviceId, date, slug, interactionType, readState }`
- **Response**: `{ message }`

## 🐛 Troubleshooting

### Common Issues

**AI responses not working**

- Check `LLAMA_API_KEY` environment variable
- Verify Cloudflare KV bindings are configured
- Check browser console for API errors

**Content not personalizing**

- Ensure user has reading history
- Check SSR is enabled (`output: 'server'` in astro.config.mjs)
- Verify device ID cookie is being set

**Analytics not loading**

- Confirm KV namespace bindings in Cloudflare
- Check user interaction data exists
- Verify API endpoints are accessible

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Kirill Igumenshchev

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build/)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com/)
- AI powered by [Llama API](https://api.llama.com/)
- Inspired by sustainable fashion and circular economy principles
