class FetchError extends Error
{
	constructor() {
		super();

		/**
		 * @type {string|null}
		 */
		this.code = null;

		/**
		 * @type {object|string|null}
		 */
		this.data = null;
	}

	/**
	 * @param code
	 * @param data
	 */
	addParams(code, data) {
		this.code = code;
		this.data = data;
	}
}

export default FetchError;