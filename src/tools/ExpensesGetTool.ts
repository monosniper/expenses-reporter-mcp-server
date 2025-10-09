import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const ExpensesGetToolArgs = z.object({
	walletId: z.number().describe('ID of wallet')
}).strict()

class ExpensesGetTool extends MCPTool {
	name = "expenses_get";
	description = "Получение списка расходов для указанного кошелька текущего телеграм пользователя";
	schema = ExpensesGetToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.get({
			endpoint: `expenses/wallet/${input.walletId}`,
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default ExpensesGetTool; 