import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const ExpensesPatchToolArgs = z.object({
	id: z.number().describe('ID of expense'),
	amount: z.number().describe('New amount of expense'),
	categoryId: z.number().describe('New category ID for expense'),
	date: z.string().describe('Date of expense (UNIX Timestamp)').optional(),
}).strict()

class ExpensesPatchTool extends MCPTool {
	name = "expenses_patch";
	description = "Редактирование записи о расходе текущего телеграм пользователя";
	schema = ExpensesPatchToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		const body: any = {};
		if (input.amount !== undefined) body.amount = input.amount;
		if (input.categoryId !== undefined) body.categoryId = input.categoryId;
		if (input.date !== undefined) body.date = input.date;

		return await Api.patch({
			endpoint: `expenses/${input.id}`,
			body,
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default ExpensesPatchTool;
