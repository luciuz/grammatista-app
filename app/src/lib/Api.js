import {uuid} from 'uuidv4';
import FetchError from "./FetchError";

class Api
{
	constructor() {
		this.URL = 'http://localhost:8080/';
		this.AUTH = 'user/auth';
		this.LESSON_SEARCH = 'lesson/search';

		this.STATUS_OK = 200;
		this.STATUS_UNAUTHORIZED = 401;

		/**
		 * @type {string|null}
		 * @protected
		 */
		this.token = null;
	}

	getToken() {
		return this.token;
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
		return fetch(this.URL + url, this.getParams(data, auth));
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

	generateToken() {
		return uuid();
	}

	logError(e) {
		if (e instanceof FetchError) {
			console.log('FetchError', e.data, e.code);
		} else {
			console.log('Error', e.message, e.code);
		}
	}
}

export default Api;