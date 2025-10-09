import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const CategoriesPatchToolArgs = z.object({
	id: z.number().describe('ID of category'),
	name: z.string().describe('New name of category')
}).strict()

class CategoriesPatchTool extends MCPTool {
	name = "categories_patch";
	description = "Редактирование категории расходов текущего телеграм пользователя";
	schema = CategoriesPatchToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.patch({
			endpoint: `categories/${input.id}`,
			body: {
				name: input.name
			},
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default CategoriesPatchTool;
