import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const ExpensesPatchToolArgs = z.object({
	id: z.number().describe('ID of expense'),
	amount: z.number().optional().describe('New amount of expense'),
	categoryId: z.number().optional().describe('New category ID for expense')
})

class ExpensesPatchTool extends MCPTool {
	name = "expenses_patch";
	description = "Редактирование записи о расходе текущего телеграм пользователя";
	schema = ExpensesPatchToolArgs;

	async execute(input: MCPInput<this>) {
		const body: any = {};
		if (input.amount !== undefined) body.amount = input.amount;
		if (input.categoryId !== undefined) body.categoryId = input.categoryId;
		
		return await Api.patch(`expenses/${input.id}`, body)
	}
}

export default ExpensesPatchTool;
