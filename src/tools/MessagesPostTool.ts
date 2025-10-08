import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const MessagesPostToolArgs = z.object({
	messages: z.array(
		z.object({
			role: z.string().describe('Message\'s owner'),
			content: z.string().describe('Content of message'),
		}).describe('Message object').strict()
	).describe('List of messages to save'),
}).strict()

class MessagesPostTool extends MCPTool {
	name = "messages_post";
	description = "Сохранение сообщения от пользовталя в чате";
	schema = MessagesPostToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.post('messages', {
			messages: input.messages.map(message => ({
				role: message.role,
				content: message.content,
			}))
		})
	}
}

export default MessagesPostTool;
