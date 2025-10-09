import {logger} from "mcp-framework";

interface ApiRequestBase {
	endpoint: string;
	headers?: Record<string, string | number>;
}

interface ApiRequestQuery extends ApiRequestBase {
	params?: Record<string, any>;
	body?: never;
	headers?: Record<string, string | number>;
}

interface ApiRequestBody extends ApiRequestBase {
	body?: object;
	params?: never;
	headers?: Record<string, string | number>;
}

type ApiRequestArgs =
	| ({ method?: 'GET' | 'DELETE' } & ApiRequestQuery)
	| ({ method?: 'POST' | 'PUT' | 'PATCH' } & ApiRequestBody);

class Api {
	private readonly host: string;

	constructor() {
		if (typeof process.env.API_HOST !== 'string') {
			throw new Error('Missing API host');
		}
		this.host = process.env.API_HOST;
	}

	private async send(url: string, options: RequestInit): Promise<object> {
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				const text = await response.text();
				throw new Error(`HTTP ${response.status}: ${text}`);
			}
			return await response.json();
		} catch (error: any) {
			console.log(url, options);
			console.error('API error:', error.message ?? error);
			return { error: error.message ?? String(error) };
		}
	}

	async request(args: ApiRequestArgs): Promise<object> {
		const { endpoint, method = 'GET', params, body, headers = {} } = args;
		const url = new URL(`${this.host}/api/v1/${endpoint}`);

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					url.searchParams.append(key, String(value));
				}
			});
		}

		const options: RequestInit = {
			method,
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
		};

		if (body && method !== 'GET') {
			options.body = JSON.stringify(body);
		}

		return await this.send(url.toString(), options);
	}

	async get(args: ApiRequestQuery) {
		return this.request({ ...args, method: 'GET' });
	}

	async delete(args: ApiRequestQuery) {
		return this.request({ ...args, method: 'DELETE' });
	}

	async post(args: ApiRequestBody) {
		return this.request({ ...args, method: 'POST' });
	}

	async patch(args: ApiRequestBody) {
		return this.request({ ...args, method: 'PATCH' });
	}
}

export default new Api();
