import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const MessagesGetToolArgs = z.object({
	limit: z.number().describe('Limit of messages to retreive'),
	tgId: z.number().describe('Telegram ID of user'),
}).strict()

class MessagesGetTool extends MCPTool {
	name = "messages_get";
	description = "Получение сообщений от пользовталя в чате";
	schema = MessagesGetToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.get('messages', {
			limit: input.limit,
			tgId: input.tgId,
		})
	}
}

export default MessagesGetTool;
