import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const ExpensesPostToolArgs = z.object({
	walletId: z.number().describe('ID of wallet'),
	amount: z.number().describe('Amount of expense'),
	categoryId: z.number().describe('Category ID for expense')
})

class ExpensesPostTool extends MCPTool {
	name = "expenses_post";
	description = "Создание новой записи о расходе для текущего телеграм пользователя";
	schema = ExpensesPostToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.post(`expenses/wallet/${input.walletId}`, {
			amount: input.amount,
			categoryId: input.categoryId
		})
	}
}

export default ExpensesPostTool;
