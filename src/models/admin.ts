import {ItemType} from "./article";

export interface MemberListType {
    count: number,
    items: MemberItemType[],
    last: number,
    page: number,
    total_count: number,
}


export interface MemberItemType {
    idx: number
    id: string
    email: string
    name: string
    phone: string
    mobile_phone: string
    rank: number
    created_at: number
    recent_article: ItemType[]
    total_cnt: number
    approval_cnt: number
    pending_cnt: number
}