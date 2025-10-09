import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const CategoriesGetToolArgs = z.object({
	walletId: z.number().describe('ID of wallet')
}).strict()

class CategoriesGetTool extends MCPTool {
	name = "categories_get";
	description = "Получение списка категорий расходов текущего телеграм пользователя";
	schema = CategoriesGetToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.get({
			endpoint: `categories/wallet/${input.walletId}`,
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default CategoriesGetTool;
