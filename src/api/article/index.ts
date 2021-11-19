import API from '../api';
import { GetArticleOptionType } from "../../models/article";

export default {
    getArticleList: (params: GetArticleOptionType) => API.get('/article', params),
    getArticle: (article_idx: number) => API.get(`/article/${article_idx}`),
    addArticle: (payload: FormData) => API.post('/article', payload),
    updateArticle: (article_idx: number, payload: FormData) => API.patch(`/article/${article_idx}`, payload),
    uploadArticleImage: (payload: Object) => API.post('/article/image', payload),
    deleteArticle: (article_idx: number) => API.delete(`/article/${article_idx}`),
    deleteArticleList: (payload: number[]) => API.delete(`/article/list`, {article_idx_list: payload}),
}