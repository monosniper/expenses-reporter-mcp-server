import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const ExpensesPostToolArgs = z.object({
	walletId: z.number().describe('ID of wallet'),
	amount: z.number().describe('Amount of expense'),
	categoryId: z.number().describe('Category ID for expense')
}).strict()

class ExpensesPostTool extends MCPTool {
	name = "expenses_post";
	description = "Создание новой записи о расходе для текущего телеграм пользователя";
	schema = ExpensesPostToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.post({
			endpoint: `expenses/wallet/${input.walletId}`,
			body: {
				amount: input.amount,
				categoryId: input.categoryId
			},
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default ExpensesPostTool;
