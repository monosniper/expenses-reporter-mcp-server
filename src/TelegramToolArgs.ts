import { z } from "zod";
import config from "./config.js";

export const telegramHeaders = {
	telegram_id: `header_${config.headers.telegram_id.toLowerCase().replaceAll('-', '_')}`,
	telegram_name: `header_${config.headers.telegram_name.toLowerCase().replaceAll('-', '_')}`,
}

export const TelegramToolArgs = z.object({
	[telegramHeaders.telegram_id]: z.number().describe('ID of telegram user'),
	[telegramHeaders.telegram_name]: z.string().describe('Name of telegram user'),
}).strict()
