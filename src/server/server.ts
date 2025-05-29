import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js"; // <-- Make sure this exists!
import { registerAllTools } from "../tools/index.js";
import { getServerVersion } from "../utils/getServerVersion.js";
import { DEFAULT_API_KEY } from "../constants/index.js";
import express, { Request, Response } from "express";
import http from "node:http";
import cors from "cors";

const VERSION = getServerVersion();

interface ServerConfig {
  port: number;
  accessToken?: string;
}

function createMcpServer({
  config,
}: {
  config?: { FMP_ACCESS_TOKEN?: string };
}) {
  const accessToken = config?.FMP_ACCESS_TOKEN || DEFAULT_API_KEY;

  const mcpServer = new McpServer({
    name: "Financial Modeling Prep MCP",
    version: VERSION,
    configSchema: {
      type: "object",
      required: ["FMP_ACCESS_TOKEN"],
      properties: {
        FMP_ACCESS_TOKEN: {
          type: "string",
          title: "FMP Access Token",
          description: "Financial Modeling Prep API access token",
        },
      },
    },
  });

  registerAllTools(mcpServer, accessToken);

  return mcpServer;
}

export function startServer(config: ServerConfig): http.Server {
  const { port } = config;
  const app = express();
  const mcpServer = createMcpServer({ config: { FMP_ACCESS_TOKEN: config.accessToken } });
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      credentials: false,
    })
  );
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      version: VERSION,
      message: "Financial Modeling Prep MCP server is running",
    });
  });

  // ---- SSE MCP ENDPOINT ----
  let transport: SSEServerTransport;

  app.get("/sse", async (req, res) => {
    transport = new SSEServerTransport("/messages", res);
    await mcpServer.connect(transport);
  });

  app.post("/messages", async (req, res) => {
    // Note: to support multiple simultaneous connections, these messages will
    // need to be routed to a specific matching transport. (This logic isn't
    // implemented here, for simplicity.)
    await transport.handlePostMessage(req, res);
  });

  // ---- ENDPOINTS ----

  const server = app.listen(port, () => {
    console.log(`Financial Modeling Prep MCP server started on port ${port}`);
    console.log(`Health endpoint available at http://localhost:${port}/healthcheck`);
    console.log(`MCP SSE endpoint available at http://localhost:${port}/sse`);
  });

  return server;
}
