import ApiClass from './Api';
import ApiClientClass from './ApiClient';
import StorageClass from './Storage';

const apiUrl = 'http://localhost:8080/';
export const api = new ApiClass(new ApiClientClass(apiUrl), new StorageClass());