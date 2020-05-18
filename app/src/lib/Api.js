import FetchError from "./FetchError";

class Api
{
	constructor(client) {
		this.USER_AUTH = 'user/auth';
		this.USER_CHECK = 'user/check';
		this.LESSON_SEARCH = 'lesson/search';
		this.LESSON_GET = 'lesson/get';
		this.VARIANT_CREATE = 'variant/create';
		this.VARIANT_GET = 'variant/get';
		this.VARIANT_FINISH = 'variant/finish';
		this.VARIANT_LIST = 'variant/list';
		this.BOOKMARK_SET = 'bookmark/set';
		this.BOOKMARK_DELETE = 'bookmark/delete';
		this.BOOKMARK_LIST = 'bookmark/list';

		this.CLIENT_ERROR_FAILED_TO_FETCH = 1;

		/**
		 * @type ApiClient
		 * @protected
		 */
		this.client = client;
	}

	getToken() {
		return this.client.getToken();
	}

	setToken(token) {
		this.client.setToken(token);
	}

	/**
	 * @typedef {object} VariantListDto
	 * @property {array.<VariantListItem>} list
	 * @property {number|null} rowsLeft
	 * @property {number|null} maxId
	 */

	/**
	 * @typedef {object} VariantListItem
	 * @property {number} id
	 * @property {string} title
	 * @property {boolean} isComplete
	 */

	/**
	 * @param {number|null} maxId
	 * @returns {Promise<VariantListDto>}
	 */
	async variantList(maxId) {
		const client = this.client;
		return await client.postAuth(this.VARIANT_LIST, {maxId: maxId});
	}

	/**
	 * @typedef {object} BookmarkListDto
	 * @property {array.<BookmarkListItem>} list
	 * @property {number|null} rowsLeft
	 * @property {number|null} maxId
	 */

	/**
	 * @typedef {object} BookmarkListItem
	 * @property {number} id
	 * @property {number} lessonId
	 * @property {string} title
	 * @property {boolean} isComplete
	 */

	/**
	 * @param {number|null} maxId
	 * @returns {Promise<BookmarkListDto>}
	 */
	async bookmarkList(maxId) {
		const client = this.client;
		return await client.postAuth(this.BOOKMARK_LIST, {maxId: maxId});
	}

	/**
	 * @param {number} lessonId
	 * @param {string} transactionToken
	 * @returns {Promise<boolean>}
	 */
	async deleteBookmark(lessonId, transactionToken) {
		const client = this.client;
		const response = await client.postAuth(
			this.BOOKMARK_DELETE,
			{
				lessonId: lessonId,
				transactionToken: transactionToken
			}
		);
		return Boolean(response);
	}

	/**
	 * @param {number} lessonId
	 * @param {string} transactionToken
	 * @returns {Promise<boolean>}
	 */
	async setBookmark(lessonId, transactionToken) {
		const client = this.client;
		const response = await client.postAuth(
			this.BOOKMARK_SET,
			{
				lessonId: lessonId,
				transactionToken: transactionToken
			}
		);
		return Boolean(response);
	}

	/**
	 * @typedef {object} VariantFinishDto
	 * @property {boolean} isComplete
	 */

	/**
	 * @param {number} id
	 * @param {object} userAnswer
	 * @param {string} transactionToken
	 * @returns {Promise<VariantFinishDto>}
	 */
	async finishVariant(id, userAnswer, transactionToken) {
		const client = this.client;
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
	 * @property {string} title
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
	 * @param {number} lessonId
	 * @param {string} transactionToken
	 * @returns {Promise<IdDto>}
	 */
	async createVariant(lessonId, transactionToken) {
		const client = this.client;
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
	 * @property {number|null} completeVariantId
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
	 * @returns {Promise<boolean>}
	 */
	async userCheck() {
		const client = this.client;
		const response = await client.postAuth(this.USER_CHECK);
		return Boolean(response);
	}

	/**
	 * @typedef {object} AuthDto
	 * @property {string} token
	 * @property {string|null} view
	 */

	/**
	 * @param {string} transactionToken
	 * @returns {Promise<AuthDto>}
	 */
	async userAuth(transactionToken) {
		const client = this.client;
		const data = this.getQueryData();
		data.transactionToken = transactionToken;
		return await client.post(this.USER_AUTH, data);
	}

	/**
	 * @returns {object}
	 */
	getQueryData() {
		const search = window.location.search.substring(1);
		return JSON.parse('{"'+ decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
	}

	/**
	 * @deprecated
	 * @param {Error} e
	 */
	logError(e) {
		if (e instanceof FetchError) {
			console.log('FetchError', e.data, e.text, e.code);
		} else {
			console.log('Error', e.message, e.name);
		}
	}

	/**
	 * @param {Error} e
	 * @return {array|boolean}
	 */
	isUserError(e) {
		const client = this.client;
		if (e instanceof FetchError) {
			switch (e.code) {
				case client.STATUS_BAD_REQUEST:
					const errors = e.data.errors;
					const text = (errors && errors[Object.keys(errors)[0]][0]) || '';
					return [e.code, text];
				case client.STATUS_UNAUTHORIZED:
				case client.STATUS_UNPROCESSABLE_ENTITY:
				case client.STATUS_TOO_MANY_REQUESTS:
				case client.STATUS_INTERNAL_ERROR:
				case client.STATUS_SERVICE_UNAVAILABLE:
					return [e.code, e.text];
				default:
					return false;
			}
		}
		if (e.name === 'TypeError' && e.message === 'Failed to fetch') {
			return [this.CLIENT_ERROR_FAILED_TO_FETCH, e.message + '.'];
		}
		return false;
	}
}

export default Api;