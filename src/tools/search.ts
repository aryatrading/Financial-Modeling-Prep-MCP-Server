import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SearchClient } from "../api/search/SearchClient.js";

/**
 * Register all search-related tools with the MCP server
 * @param server The MCP server instance
 * @param accessToken The Financial Modeling Prep API access token (optional when using lazy loading)
 */
export function registerSearchTools(
  server: McpServer,
  accessToken?: string
): void {
  const searchClient = new SearchClient(accessToken);

  server.tool(
    "searchSymbol",
    {
      query: z.string().describe("The search query to find symbols"),
      limit: z
        .number()
        .optional()
        .describe("Optional limit on number of results (default: 50)"),
      exchange: z
        .string()
        .optional()
        .describe("Optional exchange filter (e.g., NASDAQ, NYSE)"),
    },
    async ({ query, limit, exchange }, extra) => {
      try {
        // We'll just use the instance API key for now - the FMPClient has been modified
        // to handle missing or placeholder API keys, so this will work for listing tools
        const results = await searchClient.searchSymbol(query, limit, exchange);
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
    "searchName",
    {
      query: z.string().describe("The search query to find company names"),
      limit: z
        .number()
        .optional()
        .describe("Optional limit on number of results (default: 50)"),
      exchange: z
        .string()
        .optional()
        .describe("Optional exchange filter (e.g., NASDAQ, NYSE)"),
    },
    async ({ query, limit, exchange }, extra) => {
      try {
        const results = await searchClient.searchName(query, limit, exchange);
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
    "searchCIK",
    {
      cik: z.string().describe("The CIK number to search for"),
      limit: z
        .number()
        .optional()
        .describe("Optional limit on number of results (default: 50)"),
    },
    async ({ cik, limit }, extra) => {
      try {
        const results = await searchClient.searchCIK(cik, limit);
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
    "searchCUSIP",
    {
      cusip: z.string().describe("The CUSIP number to search for"),
    },
    async ({ cusip }, extra) => {
      try {
        const results = await searchClient.searchCUSIP(cusip);
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
    "searchISIN",
    {
      isin: z.string().describe("The ISIN number to search for"),
    },
    async ({ isin }, extra) => {
      try {
        const results = await searchClient.searchISIN(isin);
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
    "stockScreener",
    {
      marketCapMoreThan: z
        .number()
        .optional()
        .describe("Filter companies with market cap greater than this value"),
      marketCapLowerThan: z
        .number()
        .optional()
        .describe("Filter companies with market cap less than this value"),
      sector: z
        .string()
        .optional()
        .describe("Filter by sector (e.g., Technology)"),
      industry: z
        .string()
        .optional()
        .describe("Filter by industry (e.g., Consumer Electronics)"),
      betaMoreThan: z
        .number()
        .optional()
        .describe("Filter companies with beta greater than this value"),
      betaLowerThan: z
        .number()
        .optional()
        .describe("Filter companies with beta less than this value"),
      priceMoreThan: z
        .number()
        .optional()
        .describe("Filter companies with price greater than this value"),
      priceLowerThan: z
        .number()
        .optional()
        .describe("Filter companies with price less than this value"),
      dividendMoreThan: z
        .number()
        .optional()
        .describe("Filter companies with dividend greater than this value"),
      dividendLowerThan: z
        .number()
        .optional()
        .describe("Filter companies with dividend less than this value"),
      volumeMoreThan: z
        .number()
        .optional()
        .describe("Filter companies with volume greater than this value"),
      volumeLowerThan: z
        .number()
        .optional()
        .describe("Filter companies with volume less than this value"),
      exchange: z
        .string()
        .optional()
        .describe("Filter by exchange (e.g., NASDAQ)"),
      country: z.string().optional().describe("Filter by country (e.g., US)"),
      isEtf: z.boolean().optional().describe("Filter ETFs"),
      isFund: z.boolean().optional().describe("Filter funds"),
      isActivelyTrading: z
        .boolean()
        .optional()
        .describe("Filter actively trading companies"),
      limit: z.number().optional().describe("Limit number of results"),
      includeAllShareClasses: z
        .boolean()
        .optional()
        .describe("Include all share classes"),
    },
    async (params) => {
      try {
        const results = await searchClient.stockScreener(params);
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
    "searchExchangeVariants",
    {
      symbol: z
        .string()
        .describe("The stock symbol to search for exchange variants"),
    },
    async ({ symbol }) => {
      try {
        const results = await searchClient.searchExchangeVariants(symbol);
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
