import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const ReportsPostToolArgs = z.object({
	walletId: z.number().describe('ID of wallet'),
	startAt: z.string().describe('Start date for report (UNIX Timestamp)'),
	endAt: z.string().describe('End date for report (UNIX Timestamp)')
}).strict()

class ReportsPostTool extends MCPTool {
	name = "reports_post";
	description = "Генерация отчета";
	schema = ReportsPostToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.post({
			endpoint: 'reports',
			body: {
				walletId: input.walletId,
				startAt: input.startAt,
				endAt: input.endAt
			},
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default ReportsPostTool;
