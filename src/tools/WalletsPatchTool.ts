import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const WalletsPatchToolArgs = z.object({
	id: z.number().describe('ID of wallet'),
	name: z.string().optional().describe('New name of wallet'),
	tg_ids: z.array(z.number()).optional().describe('Array of Telegram user IDs')
}).strict()

class WalletsPatchTool extends MCPTool {
	name = "wallets_patch";
	description = "Редактирование кошелька текущего телеграм пользователя";
	schema = WalletsPatchToolArgs;

	async execute(input: MCPInput<this>) {
		const body: any = {};
		if (input.name !== undefined) body.name = input.name;
		if (input.tg_ids !== undefined) body.tg_ids = input.tg_ids;
		
		return await Api.patch(`wallets/${input.id}`, body)
	}
}

export default WalletsPatchTool;
