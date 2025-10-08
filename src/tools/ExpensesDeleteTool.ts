import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const ExpensesDeleteToolArgs = z.object({
	id: z.number().describe('ID of expense')
}).strict()

class ExpensesDeleteTool extends MCPTool {
	name = "expenses_delete";
	description = "Удаление записи о расходе текущего телеграм пользователя";
	schema = ExpensesDeleteToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.delete(`expenses/${input.id}`)
	}
}

export default ExpensesDeleteTool;
