# AI Shopping Assistant

AI-powered shopping assistant for an online store, built using the [Vercel AI SDK](https://sdk.vercel.ai/docs) and OpenAI's GPT model. The chatbot helps customers find products, provides information about pricing and availability, and assists with general shopping inquiries related to the store.

## Features
- 🛍️ Assists customers with product-related questions
- 🔍 Provides product descriptions, prices, and purchase links
- 📦 Suggests alternatives when a product is unavailable
- ⚡ Built with Vercel AI SDK for real-time responses
- 🔗 Integrated with Saleor API for up-to-date product data

## Environment Variables

Create a `.env.local` file and add the necessary API keys:

```plaintext
OPENAI_API_KEY=your-openai-key
SALEOR_INSTANCE_API_URL=your-saleor-api-url
STORE_URL=your-store-url
```

## Getting Started

To start the development server, run the following commands:

```bash
pnpm install
pnpm dev
```

## Tech Stack
- **Vercel AI SDK** – AI-powered chat handling
- **OpenAI GPT** – AI-based responses
- **Saleor API** – Fetching real-time product data
- **Next.js** – Serverless API routes
- **TypeScript** – Type safety and maintainability

