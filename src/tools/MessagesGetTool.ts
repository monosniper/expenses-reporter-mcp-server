import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const MessagesGetToolArgs = z.object({
	limit: z.number().describe('Limit of messages to retreive'),
	tgId: z.number().describe('Telegram ID of user'),
}).strict()

class MessagesGetTool extends MCPTool {
	name = "messages_get";
	description = "Получение сообщений от пользовталя в чате";
	schema = MessagesGetToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.get({
			endpoint: 'messages',
			params: {
				limit: input.limit,
				tgId: input.tgId,
			},
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default MessagesGetTool;
