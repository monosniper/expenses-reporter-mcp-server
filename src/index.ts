import {MCPServer} from "mcp-framework";
import 'dotenv/config'

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const server = new MCPServer({
	transport: {
		type: "http-stream",
		options: {
			port: PORT
		}
	}
});

server.start();
