import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const ReportGetToolArgs = z.object({
	walletId: z.number().describe('ID of wallet'),
	startAt: z.string().describe('Start date for report (ISO format)'),
	endAt: z.string().describe('End date for report (ISO format)')
})

class ReportGetTool extends MCPTool {
	name = "report_get";
	description = "Получение отчета о расходах текущего телеграм пользователя";
	schema = ReportGetToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.get('report', {
			walletId: input.walletId,
			startAt: input.startAt,
			endAt: input.endAt
		})
	}
}

export default ReportGetTool;
