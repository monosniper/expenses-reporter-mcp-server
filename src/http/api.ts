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
			console.error("API error:", error.message ?? error);
			return { error: error.message ?? String(error) };
		}
	}

	async request(endpoint: string, method: string = "GET", params: Record<string, any> = {}, body: object = {}): Promise<object> {
		const url = new URL(`${this.host}/api/v1/${endpoint}`);

		// прикручиваем query-параметры
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				url.searchParams.append(key, String(value));
			}
		});

		const options: RequestInit = {
			method,
			headers: {
				"X-Telegram-Id": "1",
				"X-Telegram-Name": "Ravil",
				"Content-Type": "application/json",
			},
		};

		if (method !== "GET" && method !== "HEAD") {
			options.body = JSON.stringify(body);
		}
		return await this.send(url.toString(), options);
	}

	// удобные шорткаты
	async get(endpoint: string, params: Record<string, any> = {}): Promise<object> {
		return this.request(endpoint, "GET", params);
	}

	async post(endpoint: string, body: object = {}): Promise<object> {
		return this.request(endpoint, "POST", {}, body);
	}

	async put(endpoint: string, body: object = {}): Promise<object> {
		return this.request(endpoint, "PUT", {}, body);
	}

	async patch(endpoint: string, body: object = {}): Promise<object> {
		return this.request(endpoint, "PATCH", {}, body);
	}

	async delete(endpoint: string, params: Record<string, any> = {}): Promise<object> {
		return this.request(endpoint, "DELETE", params);
	}
}

export default new Api();