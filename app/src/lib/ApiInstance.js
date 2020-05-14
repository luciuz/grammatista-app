import ApiClass from './Api';
import ApiClientClass from './ApiClient';
import StorageClass from './Storage';
import {uuid} from "uuidv4";

const apiUrl = 'http://localhost:8080/';
export const api = new ApiClass(new ApiClientClass(apiUrl));
export const storage = new StorageClass();
export const createTransToken = () => uuid();