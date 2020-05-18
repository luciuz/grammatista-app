class Storage
{
	constructor() {
		this.TOKEN = 'token';
	}

	/**
	 * @param {string} key
	 * @returns {string}
	 */
	get(key) {
		return localStorage.getItem(key);
	}

	/**
	 * @param {string} key
	 * @param {string} value
	 */
	set(key, value) {
		localStorage.setItem(key, value);
	}

	/**
	 * @param {string} key
	 */
	delete(key) {
		localStorage.removeItem(key);
	}
}

export default Storage;