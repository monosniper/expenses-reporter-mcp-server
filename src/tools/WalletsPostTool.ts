import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const WalletsPostToolArgs = z.object({
	name: z.string().describe('Name of new wallet'),
	type: z.string().describe('Type of wallet'),
	tg_ids: z.array(z.number()).describe('Array of Telegram user IDs').optional(),
}).strict()

class WalletsPostTool extends MCPTool {
	name = "wallets_post";
	description = "Создание нового кошелька для текущего телеграм пользователя";
	schema = WalletsPostToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.post('wallets', {
			name: input.name,
			type: input.type,
			tg_ids: input.tg_ids
		})
	}
}

export default WalletsPostTool;
