import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const ExpensesGetToolArgs = z.object({
	walletId: z.number().describe('ID of wallet')
}).strict()

class ExpensesGetTool extends MCPTool {
	name = "expenses_get";
	description = "Получение списка расходов для указанного кошелька текущего телеграм пользователя";
	schema = ExpensesGetToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.get(`expenses/wallet/${input.walletId}`)
	}
}

export default ExpensesGetTool; 