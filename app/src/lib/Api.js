import {uuid} from "uuidv4";
import FetchError from "./FetchError";

class Api
{
	constructor(client, storage) {
		this.AUTH = 'user/auth';
		this.LESSON_SEARCH = 'lesson/search';

		/**
		 * @type ApiClient
		 * @protected
		 */
		this.client = client;

		/**
		 * @type {Storage}
		 * @protected
		 */
		this.storage = storage;

		this.init();
	}

	init() {
		this.client.setToken(this.storage.get(this.storage.TOKEN));
	}

	getClient() {
		return this.client;
	}

	/**
	 * @typedef {object} LessonSearchDto
	 * @property {array.<LessonItemDto>} list
	 * @property {number|null} rowsLeft
	 * @property {number|null} maxId
	 */

	/**
	 * @typedef {object} LessonItemDto
	 * @property {number} id
	 * @property {string} title
	 * @property {boolean} isBookmark
	 * @property {boolean} isComplete
	 */

	/**
	 * @returns {Promise<LessonSearchDto>}
	 */
	async lessonSearch(q, maxId) {
		const client = this.client;
		return await client.postAuth(this.LESSON_SEARCH, {q: q, maxId: maxId});
	}

	/**
	 * @typedef {object} AuthDto
	 * @property {string} token
	 * @property {string|null} view
	 */

	/**
	 * @returns {Promise<AuthDto>}
	 */
	async auth() {
		const client = this.client;
		const data = this.getQueryData();
		data.transaction_token = this.getAuthTransactionToken();
		const authDto = await client.post(this.AUTH, data);
		this.storage.set(this.storage.TOKEN, authDto.token);
		client.setToken(authDto.token);
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

		const newToken = this.generateToken();
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