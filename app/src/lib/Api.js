import {uuid} from "uuidv4";
import FetchError from "./FetchError";

class Api
{
	constructor(client, storage) {
		this.AUTH = 'user/auth';
		this.LESSON_SEARCH = 'lesson/search';
		this.LESSON_GET = 'lesson/get';
		this.VARIANT_CREATE = 'variant/create';
		this.VARIANT_GET = 'variant/get';
		this.VARIANT_FINISH = 'variant/finish';

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
	 * @typedef {object} VariantFinishDto
	 * @property {boolean} isComplete
	 */

	/**
	 * @returns {Promise<VariantFinishDto>}
	 */
	async finishVariant(id, userAnswer) {
		const client = this.client;
		const transactionToken = this.generateToken();
		return await client.postAuth(
			this.VARIANT_FINISH,
			{
				id: id,
				userAnswer: userAnswer,
				transactionToken: transactionToken
			}
		);
	}

	/**
	 * @typedef {object} VariantDto
	 * @property {number} id
	 * @property {boolean} isComplete
	 * @property {number|null} expiredAt
	 * @property {number|null} finishedAt
	 * @property {object} question
	 * @property {object|null} result
	 */

	/**
	 * @returns {Promise<VariantDto>}
	 */
	async getVariant(id) {
		const client = this.client;
		return await client.postAuth(this.VARIANT_GET, {id: id});
	}

	/**
	 * @typedef {object} IdDto
	 * @property {number} id
	 */

	/**
	 * @returns {Promise<IdDto>}
	 */
	async createVariant(lessonId) {
		const client = this.client;
		const transactionToken = this.generateToken();
		return await client.postAuth(this.VARIANT_CREATE, {lessonId: lessonId, transactionToken: transactionToken});
	}

	/**
	 * @typedef {object} LessonRichDto
	 * @property {number} id
	 * @property {string} title
	 * @property {object} body
	 * @property {boolean} isBookmark
	 * @property {boolean} isComplete
	 * @property {number|null} activeVariantId
	 */

	/**
	 * @returns {Promise<LessonRichDto>}
	 */
	async getLesson(id) {
		const client = this.client;
		return await client.postAuth(this.LESSON_GET, {id: id});
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
		data.transactionToken = this.getAuthTransactionToken();
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