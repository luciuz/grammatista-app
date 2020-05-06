class ApiManager
{
	constructor(api, storage) {
		/**
		 * @type Api
		 * @protected
		 */
		this.api = api;

		/**
		 * @type {Storage}
		 * @protected
		 */
		this.storage = storage;

		this.init();
	}

	getApi()
	{
		return this.api;
	}

	getStorage()
	{
		return this.storage;
	}

	init() {
		this.api.token = this.storage.get(this.storage.TOKEN);
	}

	/**
	 * @typedef {object} AuthDto
	 * @property {string} token
	 * @property {string|null} view
	 */

	/**
	 * @returns {Promise<AuthDto>}
	 */
	async apiAuth() {
		const api = this.api;
		const data = this.getQueryData();
		data.transaction_token = this.getAuthTransactionToken();
		const authDto = await api.post(api.AUTH, data);
		this.storage.set(this.storage.TOKEN, authDto.token);
		api.setToken(authDto.token);
		return authDto;
	}

	/**
	 * @returns {string}
	 */
	getAuthTransactionToken() {
		const key = this.storage.AUTH_TRANSACTION_TOKEN;
		const token = this.storage.get(key);
		if (token) {
			return token;
		}

		const newToken = this.api.generateToken();
		this.storage.set(key, newToken);
		return newToken;
	}

	/**
	 * @returns {object}
	 */
	getQueryData() {
		const search = window.location.search.substring(1);
		return JSON.parse('{"'+ decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
	}
}

export default ApiManager;