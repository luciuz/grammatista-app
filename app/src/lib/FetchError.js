class FetchError extends Error
{
	constructor() {
		super();

		/**
		 * @type {string}
		 */
		this.code = undefined;

		/**
		 * @type {string}
		 */
		this.text = undefined;

		/**
		 * @type {object}
		 */
		this.data = undefined;
	}

	/**
	 * @param code
	 * @param data
	 */
	addParams(code, data) {
		this.code = code;
		if (typeof data === 'string') {
			this.text = data;
		}
		if (typeof data === 'object') {
			this.data = data;
		}
	}
}

export default FetchError;