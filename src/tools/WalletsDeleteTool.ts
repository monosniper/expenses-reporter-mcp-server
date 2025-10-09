import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const WalletsDeleteToolArgs = z.object({
	id: z.number().describe('ID of wallet')
}).strict()

class WalletsDeleteTool extends MCPTool {
	name = "wallets_delete";
	description = "Удаление кошелька текущего телеграм пользователя";
	schema = WalletsDeleteToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.delete({
			endpoint: `wallets/${input.id}`,
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default WalletsDeleteTool;
