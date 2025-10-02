import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const CategoriesPatchToolArgs = z.object({
	id: z.number().describe('ID of category'),
	name: z.string().describe('New name of category')
})

class CategoriesPatchTool extends MCPTool {
	name = "categories_patch";
	description = "Редактирование категории расходов текущего телеграм пользователя";
	schema = CategoriesPatchToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.patch(`categories/${input.id}`, {
			name: input.name
		})
	}
}

export default CategoriesPatchTool;
