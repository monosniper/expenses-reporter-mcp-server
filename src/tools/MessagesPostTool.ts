import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const MessagesPostToolArgs = z.object({
	content: z.string().describe('Content of message')
})

class MessagesPostTool extends MCPTool {
	name = "messages_post";
	description = "Сохранение сообщения от пользовталя в чате";
	schema = MessagesPostToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.post('messages')
	}
}

export default MessagesPostTool;
