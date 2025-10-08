import { AuthProvider, AuthResult } from "mcp-framework";
import { IncomingMessage } from "node:http";

export default class TelegramAuthProvider implements AuthProvider {
	async authenticate(req: IncomingMessage): Promise<boolean | AuthResult> {
		console.log(req)
		return true;
	}

	getAuthError() {
		return {
			status: 401,
			message: "Authentication failed"
		};
	}
}