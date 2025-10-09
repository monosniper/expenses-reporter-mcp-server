import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const ReportsDeleteToolArgs = z.object({
	id: z.number().describe('ID of report'),
}).strict()

class ReportsDeleteTool extends MCPTool {
	name = "reports_delete";
	description = "Удаление файла отчета. Системный тул";
	schema = ReportsDeleteToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.delete({
			endpoint: `reports/${input.id}`,
		})
	}
}

export default ReportsDeleteTool;
