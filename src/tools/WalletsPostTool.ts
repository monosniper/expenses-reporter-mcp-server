import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const WalletsPostToolArgs = z.object({
	name: z.string().describe('Name of new wallet'),
	type: z.enum(['personal', 'common']).describe('Type of wallet'),
	tg_ids: z.array(z.number()).describe('Array of Telegram user IDs'),
}).strict();

class WalletsPostTool extends MCPTool {
	name = "wallets_post";
	description = "Создание нового кошелька для текущего телеграм пользователя";
	schema = WalletsPostToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.post({
			endpoint: 'wallets',
			body: {
				name: input.name,
				type: input.type,
				tg_ids: input.tg_ids
			},
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default WalletsPostTool;
