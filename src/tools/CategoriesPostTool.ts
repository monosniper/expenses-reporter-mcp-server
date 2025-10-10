import {MCPTool, MCPInput} from "mcp-framework";
import Api from "../http/api.js";
import { z } from "zod";
import {telegramHeaders, TelegramToolArgs} from "../TelegramToolArgs.js";
import config from "../config.js";

const CategoriesPostToolArgs = z.object({
	walletId: z.number().describe('ID of wallet'),
	categories: z.array(
		z.object({
			name: z.string().describe('Name of new category')
		}).describe('Category data'),
	).describe('Array of categories data'),
}).strict()

class CategoriesPostTool extends MCPTool {
	name = "categories_post";
	description = `
		Создание новой категории расходов для текущего пользователя Telegram.
		Цель: поддерживать чистую, обобщённую структуру категорий и корректную аналитику расходов.
		
		Правила для ИИ:
		1. Перед созданием новой категории обязательно проверяй существующие категории.
		2. Если существует подходящая категория по смыслу, используй её вместо создания новой.
		3. Название новой категории должно быть максимально обобщённым и логически объединять схожие расходы.
		4. Не создавай дублирующие или почти идентичные категории для каждого нового слова пользователя.
		5. Возвращай только действия с тулом и параметры в формате JSON, не описывай словами.
		
		Пример: 
		- Пользователь вводит: "обед 120к", "ужин 150к"
		- Существующие категории: "Пропитание", "Транспорт"
		- ИИ должен использовать "Пропитание" и не создавать отдельные категории для обеда и ужина.
	`;
	schema = CategoriesPostToolArgs.merge(TelegramToolArgs);

	async execute(input: MCPInput<this>) {
		return await Api.post({
			endpoint: `categories/wallet/${input.walletId}`,
			body: {
				// @ts-ignore
				categories: input.categories.map((category: any) => ({
					name: category.name
				}))
			},
			headers: {
				[config.headers.telegram_id]: input[telegramHeaders.telegram_id],
				[config.headers.telegram_name]: encodeURIComponent(input[telegramHeaders.telegram_name]),
			}
		})
	}
}

export default CategoriesPostTool;
