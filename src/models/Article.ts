export interface GetArticleOptionType {
    page: number
    count: number
    keyword?: string
    option?: number //0: 제목 1: 내용
    state?: number // 0: 임시 1: 대기 2: 거절 3: 승인
}

export interface ListType {
    count: number,
    items: ItemType[],
    last: number,
    page: number,
    total_count: number,
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

export interface Article {
    title: string,
    sub_title: string,
    content: string,
    link_url: string, // 기사 링크(string)
    temporary: 0 | 1, // 임시여부(int) 0: 일반등록 1: 임시등록
    image_list: ImageList[],
    video_list: VideoList[],
    section_list: SectionList[],
    file: Object[] | null,
    inserted_at: number
}

export enum Temporary {
    Registration = 0,  // 일반 등록
    Temporary = 1 // 임시 등록
}

export interface ImageList {
    idx: number,
    thumbnail?: boolean,
    file_type?: string,
    file_name?: string,
    file_size?: number,
    file_key?: string,
    member_idx?: number
}

export interface VideoList {
    url: string
}

export interface SectionList {
    medium_section_idx: number
}