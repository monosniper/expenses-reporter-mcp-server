import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const ReportsGetToolArgs = z.object({
	id: z.number().optional().describe('ID of report'),
	type: z.string().optional().describe('Format of report. Available only excel'),
}).strict()

class ReportsGetTool extends MCPTool {
	name = "reports_get";
	description = "Получение отчета о расходах текущего телеграм пользователя";
	schema = ReportsGetToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.get(input.id ? `reports/${input.id}/${input.type}` : 'reports');
	}
}

export default ReportsGetTool;
