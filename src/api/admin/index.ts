import API from '../api';
import { GetArticleOptionType } from "../../models/article";

export default {
    getArticleList: (params: GetArticleOptionType) => API.get(`/media/manager/article`, params),
    getArticleInfo: (article_idx: number) => API.get(`/media/manager/article/${article_idx}`),
    confirmArticle: (article_idx: number, section_idx: number) => API.post(`/media/manager/article/${article_idx}/section/${section_idx}/confirm`),
    rejectArticle:  (article_idx: number, section_idx: number) => API.delete(`/media/manager/article/${article_idx}/section/${section_idx}`),
    getMediaMemberList: (params: GetArticleOptionType) => API.get(`/media/manager/member`, params),
    getMediaMemberInfo: (member_idx: number) => API.get(`/media/manager/member/${member_idx}`),
    deleteMediaMember: (member_idx: number) => API.delete(`/media/manager/member/${member_idx}`),
    updateMediaMemberInfo: (member_idx: number, rank: number) => API.patch(`/media/manager/member/${member_idx}`, {rank: rank})
}