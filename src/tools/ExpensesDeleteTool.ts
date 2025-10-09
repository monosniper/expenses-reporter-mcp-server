import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const ExpensesDeleteToolArgs = z.object({
	id: z.number().describe('ID of expense')
}).strict()

class ExpensesDeleteTool extends MCPTool {
	name = "expenses_delete";
	description = "Удаление записи о расходе текущего телеграм пользователя";
	schema = ExpensesDeleteToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.delete({
			endpoint: `expenses/${input.id}`,
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default ExpensesDeleteTool;
