import {MCPInput, MCPTool} from "mcp-framework";
import Api from "../http/api.js";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

class WalletsGetTool extends MCPTool {
	name = "wallets_get";
	description = "Получение списка кошельков текущего телеграм пользователя";
	schema = TelegramToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.get({
			endpoint: 'wallets',
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default WalletsGetTool;
