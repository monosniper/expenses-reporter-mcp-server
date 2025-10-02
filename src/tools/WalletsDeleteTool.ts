import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

const WalletsDeleteToolArgs = z.object({
	id: z.number().describe('ID of wallet')
})

class WalletsDeleteTool extends MCPTool {
	name = "wallets_delete";
	description = "Удаление кошелька текущего телеграм пользователя";
	schema = WalletsDeleteToolArgs;

	async execute(input: MCPInput<this>) {
		return await Api.delete(`wallets/${input.id}`)
	}
}

export default WalletsDeleteTool;
