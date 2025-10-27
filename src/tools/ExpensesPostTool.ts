import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const ExpensesPostToolArgs = z.object({
	walletId: z.number().describe('ID of wallet'),
	expenses: z.array(
		z.object({
			amount: z.number().describe('Amount of expense'),
			categoryId: z.number().describe('Category ID for expense'),
			date: z.string().describe('Date of expense (UNIX Timestamp)').optional(),
		}).describe('Expense data'),
	).describe('Array of expenses data'),
}).strict()

class ExpensesPostTool extends MCPTool {
	name = "expenses_post";
	description = "Создание новой записи о расходе для текущего телеграм пользователя";
	schema = ExpensesPostToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.post({
			endpoint: `expenses/wallet/${input.walletId}`,
			body: {
				// @ts-ignore
				expenses: input.expenses.map((expense: any) => ({
					amount: expense.amount,
					date: expense.date,
					categoryId: expense.categoryId
				}))
			},
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default ExpensesPostTool;
