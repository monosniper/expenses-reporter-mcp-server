import {MCPServer} from "mcp-framework";
import 'dotenv/config'

const server = new MCPServer({
	transport: {
		type: "sse",
		options: {
			port: process.env.PORT ? Number(process.env.PORT) : undefined,
		}
	}
});

server.start();
