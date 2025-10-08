import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const CategoriesDeleteToolArgs = z.object({
	id: z.number().describe('ID of category')
}).strict()

class CategoriesDeleteTool extends MCPTool {
	name = "categories_delete";
	description = "Удаление категории расходов текущего телеграм пользователя";
	schema = CategoriesDeleteToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.delete(`categories/${input.id}`)
	}
}

export default CategoriesDeleteTool;
