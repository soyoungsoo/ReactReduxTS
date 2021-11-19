import {ListType} from "../../../models/article";

export interface GetNewsListType {
    count: number,
    searchType: number,
    setSearchType: (page: number) => void,
    keyword: string,
    list: ListType,
    getList: () => void,
    searchList: () => void,
    page: number,
    changePage: (page: number) => void
}