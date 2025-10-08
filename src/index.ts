import {MCPServer} from "mcp-framework";
import 'dotenv/config'
import TelegramAuthProvider from "./authProvider.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const server = new MCPServer({
	transport: {
		type: "http-stream",
		options: {
			port: PORT,
			auth: {
				provider: new TelegramAuthProvider(),
				endpoints: {
					messages: true
				}
			}
		}
	}
});

server.start();
