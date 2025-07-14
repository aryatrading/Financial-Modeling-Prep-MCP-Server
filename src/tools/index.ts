import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSearchTools } from "./search.js";
import { registerDirectoryTools } from "./directory.js";
import { registerAnalystTools } from "./analyst.js";
import { registerCalendarTools } from "./calendar.js";
import { registerChartTools } from "./chart.js";
import { registerCompanyTools } from "./company.js";
import { registerCOTTools } from "./cot.js";
import { registerESGTools } from "./esg.js";
import { registerEconomicsTools } from "./economics.js";
import { registerDCFTools } from "./dcf.js";
import { registerFundTools } from "./fund.js";
import { registerCommodityTools } from "./commodity.js";
import { registerFundraisersTools } from "./fundraisers.js";
import { registerCryptoTools } from "./crypto.js";
import { registerForexTools } from "./forex.js";
import { registerStatementsTools } from "./statements.js";
import { registerForm13FTools } from "./form-13f.js";
import { registerIndexesTools } from "./indexes.js";
import { registerInsiderTradesTools } from "./insider-trades.js";
import { registerMarketPerformanceTools } from "./market-performance.js";
import { registerMarketHoursTools } from "./market-hours.js";
import { registerNewsTools } from "./news.js";
import { registerTechnicalIndicatorsTools } from "./technical-indicators.js";
import { registerQuotesTools } from "./quotes.js";
import { registerEarningsTranscriptTools } from "./earnings-transcript.js";
import { registerSECFilingsTools } from "./sec-filings.js";
import { registerGovernmentTradingTools } from "./government-trading.js";
import { registerBulkTools } from "./bulk.js";

/**
 * Register all tools with the MCP server
 * @param server The MCP server instance
 * @param accessToken The Financial Modeling Prep API access token (optional when using lazy loading)
 */
export function registerAllTools(
  server: McpServer,
  accessToken?: string
): void {
  registerSearchTools(server, accessToken);
  // registerDirectoryTools(server, accessToken);
  // registerAnalystTools(server, accessToken);
  // registerCalendarTools(server, accessToken);
  // registerChartTools(server, accessToken);
  // registerCompanyTools(server, accessToken);
  // registerCOTTools(server, accessToken);
  // registerESGTools(server, accessToken);
  // registerEconomicsTools(server, accessToken);
  // registerDCFTools(server, accessToken);
  // registerFundTools(server, accessToken);
  // registerCommodityTools(server, accessToken);
  // registerFundraisersTools(server, accessToken);
  // registerCryptoTools(server, accessToken);
  // registerForexTools(server, accessToken);
  // registerStatementsTools(server, accessToken);
  // registerForm13FTools(server, accessToken);
  registerIndexesTools(server, accessToken);
  // registerInsiderTradesTools(server, accessToken);
  // registerMarketPerformanceTools(server, accessToken);
  // registerMarketHoursTools(server, accessToken);
  registerNewsTools(server, accessToken);
  // registerTechnicalIndicatorsTools(server, accessToken);
  registerQuotesTools(server, accessToken);
  // registerEarningsTranscriptTools(server, accessToken);
  // registerSECFilingsTools(server, accessToken);
  // registerGovernmentTradingTools(server, accessToken);
  // registerBulkTools(server, accessToken);
}
