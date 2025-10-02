import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const CategoriesPostToolArgs = z.object({
	walletId: z.number().describe('ID of wallet'),
	name: z.string().describe('Name of new category')
})

class CategoriesPostTool extends MCPTool {
	name = "categories_post";
	description = "Создание новой категории расходов для текущего телеграм пользователя";
	schema = CategoriesPostToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.post(`categories/wallet/${input.walletId}`, {
			name: input.name
		})
	}
}

export default CategoriesPostTool;
