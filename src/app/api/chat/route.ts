import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SALEOR_API_URL = process.env.SALEOR_INSTANCE_API_URL!;
const STORE_URL = process.env.STORE_URL!;

async function fetchProducts() {
  const query = `
    query {
      products(first: 100, channel: "channel-us") {
        edges {
          node {
            name
            description
            slug
            pricing {
              priceRange {
                start {
                  gross {
                    currency
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(SALEOR_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();
  return (
    json.data?.products?.edges?.map((edge: any) => ({
      name: edge.node.name,
      description: edge.node.description,
      price: `${edge.node.pricing?.priceRange?.start?.gross?.amount} ${edge.node.pricing?.priceRange?.start?.gross?.currency}`,
      link: `${STORE_URL}/products/${edge.node.slug}`,
    })) || []
  );
}

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const products = await fetchProducts();

  const productList = products.length
    ? products
        .map((p: any) => `- [${p.name}](${p.link}), Price: ${p.price}.`)
        .join("\n")
    : "No products available at the moment.";

  const systemPrompt = `
    You are an AI assistant for an online store. Your job is to help customers find products, answer questions about availability, prices, and features.
    Only respond to inquiries related to the store and its products.

    Here is the list of available products with links:
    ${productList}
  `;

  const chatMessages = [{ role: "system", content: systemPrompt }, ...messages];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: chatMessages,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
