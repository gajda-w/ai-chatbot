import { ProductRepository } from "@/repositories/product";

export const graphqlApiProductRepository = ({
  apiUrl,
  storeUrl,
}: {
  apiUrl: string;
  storeUrl: string;
}): ProductRepository => ({
  getAll: async ({ channel, take }) => {
    const query = `
    query {
      products(first: ${take}, channel: "${channel}") {
        edges {
          node {
            name
            description
            slug
            thumbnail {
                url
                alt
            }
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

    const response = await fetch(apiUrl, {
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
        link: `${storeUrl}/products/${edge.node.slug}`,
        thumbnail: edge.node.thumbnail?.url || "",
      })) || []
    );
  },
});
