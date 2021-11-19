import {getOptionType} from "../api/common";
import {MemberType} from "./member";

export interface GetArticleOptionType extends getOptionType {
    state?: number // 0: 임시 1: 대기 2: 거절 3: 승인
}

export interface ListType {
    count: number,
    items: ItemType[],
    last: number,
    page: number,
    total_count: number,
    popular?: ItemType[],
    recent?: ItemType[]
}

export interface ItemType {
    idx: number,
    title: string,
    sub_title: string,
    content: string,
    thumbnail_key: string,
    link_url: string,
    state: number,
    inserted_at: number,
    created_at: number,
    member_idx: number,
    reporter_name: string,
    large_section_name: string,
    large_section_idx: number,
    medium_section_name: string
    medium_section_idx: number,
    type: number,
    section_idx: number,
    section_state: number,
    hit: number
}

export interface ImageItem {
    idx: number,
    thumbnail?: boolean,
    file_type?: string,
    file_name?: string,
    file_size?: number,
    file_key: string,
    dataUri: string,
    member_idx?: number
}

export interface FileItem {
    idx?: number,
    file_key?: string,
    file_name?: string,
    file_size?: number,
    file_type?: string,
    name?: string,
    size?: number
}

export interface VideoList {
    url: string
}

export interface SectionList {
    large_section_idx: number,
    medium_section_idx: number
}

export interface ReplyType {
    items: ReplyItem[],
    page: number,
    count: number,
    total_count: number,
    last: number
}

export interface ReplyItem {
    idx: number,
    id: string,
    content: string,
    depth: number,
    deleted: number,
    created_at: number,
    parent_idx: number,
    reply_cnt: number,
    child: ReplyType // 프론트 커스텀 키
}

export interface CommonArticleType {
    idx: number,
    title: string,
    sub_title: string,
    content: string,
    link_url: string,
    inserted_at: number
}

export interface Article extends CommonArticleType {
    temporary: 0 | 1, // 임시여부(int) 0: 일반등록 1: 임시등록
    image_list: ImageItem[],
    video_list: VideoList[],
    section_list: SectionList[],
    file: Object[] | FileItem[],
    thumbnail_key: string,
    file_list:Object[] | FileItem[]
}

export interface ArticleView extends CommonArticleType {
    thumbnail_key: string,
    state: number,
    created_at: number,
    member_idx: number,
    reporter_name: string,
    reporter_email: string,
    large_section_name: string,
    large_section_idx: number,
    medium_section_name: string,
    medium_section_idx: number,
    type: number
    section_idx: number,
    popular: ItemType[],
    recent: ItemType[],
    not_seen: ItemType[],
    reply_list: ReplyType,
    reporter_idx: number
    reporter_info: MemberType
    reporter_popular: ItemType[]
    reporter_recent: ItemType[]
    media_info: {
        domain: string
    }
}

export enum State {
    Temp = 0,
    TempStr = "임시",
    Wait = 1,
    WaitStr = "대기",
    Reject = 2,
    RejectStr = "거절",
    Accept = 3,
    AcceptStr = "승인"
}

export enum Temporary {
    Registration = 0,  // 일반 등록
    Temporary = 1 // 임시 등록
}