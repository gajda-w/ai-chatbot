import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getAllProductsUseCase } from "@/use-case/product/get-products";
import { graphqlApiProductRepository } from "@/graphql-api/repository";
import { getShoppingAssistantPrompt } from "@/config/system-prompts";
import { formatProductList } from "@/utils.ts/format";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SALEOR_API_URL = process.env.SALEOR_INSTANCE_API_URL!;
const STORE_URL = process.env.STORE_URL!;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const products = await getAllProductsUseCase(
    {
      productRepository: graphqlApiProductRepository({
        apiUrl: SALEOR_API_URL,
        storeUrl: STORE_URL,
      }),
    },
    { channel: "channel-us", take: 100 }
  );

  const productList = formatProductList(products);
  const systemPrompt = getShoppingAssistantPrompt(productList);
  const chatMessages = [{ role: "system", content: systemPrompt }, ...messages];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: chatMessages,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
