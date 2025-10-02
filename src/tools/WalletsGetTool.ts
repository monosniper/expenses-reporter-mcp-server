import {MCPTool} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";

class WalletsGetTool extends MCPTool {
	name = "wallets_get";
	description = "Получение списка кошельков текущего телеграм пользователя";
	schema: any = z.object({});

	async execute() {
		return await Api.get('wallets')
	}
}

export default WalletsGetTool;
