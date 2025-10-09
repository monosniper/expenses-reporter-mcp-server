import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const WalletsPatchToolArgs = z.object({
	id: z.number().describe('ID of wallet'),
	name: z.string().describe('New name of wallet'),
	tg_ids: z.array(z.number()).describe('Array of Telegram user IDs')
}).strict()

class WalletsPatchTool extends MCPTool {
	name = "wallets_patch";
	description = "Редактирование кошелька текущего телеграм пользователя";
	schema = WalletsPatchToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		const body: any = {};
		if (input.name !== undefined) body.name = input.name;
		if (input.tg_ids !== undefined) body.tg_ids = input.tg_ids;
		
		return await Api.patch({
			endpoint: `wallets/${input.id}`,
			body,
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default WalletsPatchTool;
