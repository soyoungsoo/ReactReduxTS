import API from '../api';
import {getOptionType, getCommentOptionType} from "../common";


export default {
    getJoinMediaList: () => API.get('/media/joined_list', {}),
    getMediaSection: () => API.get('/media/section'),
    getMediaArticleList: (large_section_idx?: number, medium_section_idx?: number, params?: getOptionType) => API.get('/media/article', {...params, large_section_idx, medium_section_idx}),
    getMediaArticle: (article_idx: number, section_idx: number) => API.get(`/media/article/${article_idx}`, {section_idx: section_idx}),
    getHome: () => API.get(`/media/article/home`),
    addComment: (article_idx: number, section_idx: number, content: string) => API.post(`/media/article/${article_idx}/reply`, {content: content}, {section_idx: section_idx}),
    addReComment: (article_idx: number, section_idx: number, reply_idx: number, content: string) => API.post(`/media/article/${article_idx}/reply/${reply_idx}`, {content: content}, {section_idx: section_idx}),
    deleteComment: (article_idx: number, section_idx: number, reply_idx: number) => API.delete(`/media/article/${article_idx}/reply/${reply_idx}`, {}, {section_idx: section_idx}),
    getCommentList: (article_idx: number, param: getCommentOptionType) => API.get(`/media/article/${article_idx}/reply`, param),
    getCommentChildList: (article_idx: number, reply_idx: number, param: getCommentOptionType) => API.get(`/media/article/${article_idx}/reply/${reply_idx}/child`, param),
    getReporterArticleList: (reporter_idx: number) => API.get(`/media/reporter/${reporter_idx}`)
}