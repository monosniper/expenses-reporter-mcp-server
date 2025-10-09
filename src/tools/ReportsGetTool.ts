import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const ReportsGetToolArgs = z.object({
	id: z.number().describe('ID of report'),
	type: z.enum(['excel']).describe('Format of report'),
}).strict()

class ReportsGetTool extends MCPTool {
	name = "reports_get";
	description = "Получение отчета о расходах текущего телеграм пользователя";
	schema = ReportsGetToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.get({
			endpoint: input.id ? `reports/${input.id}/${input.type}` : 'reports',
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		});
	}
}

export default ReportsGetTool;
