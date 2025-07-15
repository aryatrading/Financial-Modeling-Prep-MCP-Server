import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { QuotesClient } from "../api/quotes/QuotesClient.js";

/**
 * Register all quotes-related tools with the MCP server
 * @param server The MCP server instance
 * @param accessToken The Financial Modeling Prep API access token (optional when using lazy loading)
 */
export function registerQuotesTools(
  server: McpServer,
  accessToken?: string
): void {
  const quotesClient = new QuotesClient(accessToken);

  server.tool(
    "getQuote",
    {
      symbol: z.string().describe("symbol"),
    },
    async ({ symbol }) => {
      try {
        const results = await quotesClient.getQuote({ symbol });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getQuoteShort",
    {
      symbol: z.string().describe("symbol"),
    },
    async ({ symbol }) => {
      try {
        const results = await quotesClient.getQuoteShort({ symbol });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getAftermarketTrade",
    {
      symbol: z.string().describe("Stock symbol"),
    },
    async ({ symbol }) => {
      try {
        const results = await quotesClient.getAftermarketTrade({ symbol });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getAftermarketQuote",
    {
      symbol: z.string().describe("Stock symbol"),
    },
    async ({ symbol }) => {
      try {
        const results = await quotesClient.getAftermarketQuote({ symbol });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getStockPriceChange",
    {
      symbol: z.string().describe("Stock symbol"),
    },
    async ({ symbol }) => {
      try {
        const results = await quotesClient.getStockPriceChange({ symbol });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getBatchQuotes",
    {
      symbols: z.string().describe("Comma-separated list of symbols"),
    },
    async ({ symbols }) => {
      try {
        const results = await quotesClient.getBatchQuotes({ symbols });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getBatchQuotesShort",
    {
      symbols: z.string().describe("Comma-separated list of symbols"),
    },
    async ({ symbols }) => {
      try {
        const results = await quotesClient.getBatchQuotesShort({ symbols });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getBatchAftermarketTrade",
    {
      symbols: z.string().describe("Comma-separated list of stock symbols"),
    },
    async ({ symbols }) => {
      try {
        const results = await quotesClient.getBatchAftermarketTrade({
          symbols,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getBatchAftermarketQuote",
    {
      symbols: z.string().describe("Comma-separated list of stock symbols"),
    },
    async ({ symbols }) => {
      try {
        const results = await quotesClient.getBatchAftermarketQuote({
          symbols,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getExchangeQuotes",
    {
      exchange: z.string().describe("Exchange name (e.g., NASDAQ, NYSE)"),
      short: z.boolean().optional().describe("Whether to use short format"),
    },
    async ({ exchange, short }) => {
      try {
        const results = await quotesClient.getExchangeQuotes({
          exchange,
          short,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getMutualFundQuotes",
    {
      short: z.boolean().optional().describe("Whether to use short format"),
    },
    async ({ short }) => {
      try {
        const results = await quotesClient.getMutualFundQuotes({ short });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getETFQuotes",
    {
      short: z.boolean().optional().describe("Whether to use short format"),
    },
    async ({ short }) => {
      try {
        const results = await quotesClient.getETFQuotes({ short });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getCommodityQuotes",
    {
      short: z.boolean().optional().describe("Whether to use short format"),
    },
    async ({ short }) => {
      try {
        const results = await quotesClient.getCommodityQuotes({ short });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getCryptoQuotes",
    {
      short: z.boolean().optional().describe("Whether to use short format"),
    },
    async ({ short }) => {
      try {
        const results = await quotesClient.getCryptoQuotes({ short });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getForexQuotes",
    {
      short: z.boolean().optional().describe("Whether to use short format"),
    },
    async ({ short }) => {
      try {
        const results = await quotesClient.getForexQuotes({ short });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getIndexQuotes",
    {
      short: z.boolean().optional().describe("Whether to use short format"),
    },
    async ({ short }) => {
      try {
        const results = await quotesClient.getIndexQuotes({ short });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
