import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const MessagesPostToolArgs = z.object({
	messages: z.array(
		z.object({
			role: z.string().describe('Message\'s owner'),
			content: z.string().describe('Content of message'),
		}).describe('Message object')
	).describe('List of messages to save'),
}).strict()

class MessagesPostTool extends MCPTool {
	name = "messages_post";
	description = "Сохранение сообщения от пользовталя в чате";
	schema = MessagesPostToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.post({
			endpoint: 'messages',
			body: {
				// @ts-ignore
				messages: input.messages.map(message => ({
					role: message.role,
					content: message.content,
				}))
			},
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default MessagesPostTool;
