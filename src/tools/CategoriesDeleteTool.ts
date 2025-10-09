import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const CategoriesDeleteToolArgs = z.object({
	id: z.number().describe('ID of category')
}).strict()

class CategoriesDeleteTool extends MCPTool {
	name = "categories_delete";
	description = "Удаление категории расходов текущего телеграм пользователя";
	schema = CategoriesDeleteToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.delete({
			endpoint: `categories/${input.id}`,
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default CategoriesDeleteTool;
