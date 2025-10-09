import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const CategoriesPostToolArgs = z.object({
	walletId: z.number().describe('ID of wallet'),
	name: z.string().describe('Name of new category')
}).strict()

class CategoriesPostTool extends MCPTool {
	name = "categories_post";
	description = "Создание новой категории расходов для текущего телеграм пользователя";
	schema = CategoriesPostToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.post({
			endpoint: `categories/wallet/${input.walletId}`,
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

export default CategoriesPostTool;
