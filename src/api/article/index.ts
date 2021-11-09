import API from '../api';
import { GetArticleOptionType } from "../../models/Article";

export default {
    getArticleList: (params: GetArticleOptionType) => API.get('/article', params),
    addArticle: (payload: FormData) => API.post('/article', payload),
    uploadArticleImage: (payload: Object) => API.post('/article/image', payload)
}