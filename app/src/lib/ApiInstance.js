import ApiClass from './Api';
import StorageClass from './Storage';
import ApiManagerClass from './ApiManager';

export const api = new ApiClass();
export const apiManager = new ApiManagerClass(api, new StorageClass());