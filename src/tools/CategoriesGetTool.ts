import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const CategoriesGetToolArgs = z.object({
	walletId: z.number().describe('ID of wallet')
})

class CategoriesGetTool extends MCPTool {
	name = "categories_get";
	description = "Получение списка категорий расходов текущего телеграм пользователя";
	schema = CategoriesGetToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.get(`categories/${input.walletId}`)
	}
}

export default CategoriesGetTool;
