import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const ReportsPostToolArgs = z.object({
	walletId: z.number().describe('ID of wallet'),
	startAt: z.string().describe('Start date for report (UNIX Timestamp)'),
	endAt: z.string().describe('End date for report (UNIX Timestamp)')
}).strict()

class ReportsPostTool extends MCPTool {
	name = "reports_post";
	description = "Генерация отчета";
	schema = ReportsPostToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.post('reports', {
			walletId: input.walletId,
			startAt: input.startAt,
			endAt: input.endAt
		})
	}
}

export default ReportsPostTool;
