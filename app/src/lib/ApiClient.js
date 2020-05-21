import FetchError from "./FetchError";

class ApiClient
{
	constructor(apiUrl) {
		this.STATUS_OK = 200;
		this.STATUS_BAD_REQUEST = 400;
		this.STATUS_UNAUTHORIZED = 401;
		this.STATUS_FORBIDDEN = 403;
		this.STATUS_UNPROCESSABLE_ENTITY = 422;
		this.STATUS_TOO_MANY_REQUESTS = 429;
		this.STATUS_INTERNAL_ERROR = 500;
		this.STATUS_SERVICE_UNAVAILABLE = 503;

		/**
		 * @type {string}
		 * @protected
		 */
		this.apiUrl = apiUrl;

		/**
		 * @type {string}
		 * @protected
		 */
		this.token = undefined;
	}

	async post(url, data) {
		const response = await this.fetch(url, data, false);
		return await this.handleResponse(response);
	}

	async postAuth(url, data) {
		const response = await this.fetch(url, data, true);
		return await this.handleResponse(response);
	}

	fetch(url, data, auth) {
		return fetch(this.apiUrl + url, this.getParams(data, auth));
	}

	async handleResponse(response) {
		const result = await response.json();
		if (response.status === this.STATUS_OK) {
			return result;
		}
		const error = new FetchError();
		error.addParams(response.status, result);
		throw error;
	}

	getParams(data, auth) {
		return {
			method: 'POST',
			headers: this.getHeaders(auth),
			mode: 'cors',
			body: JSON.stringify(data)
		};
	}

	getHeaders(auth) {
		const headers = {
			'Content-Type': 'application/json'
		}
		if (auth) {
			headers['Token'] = this.token;
		}
		return headers;
	}

	setToken(token) {
		this.token = token;
	}

	getToken() {
		return this.token;
	}
}

export default ApiClient;