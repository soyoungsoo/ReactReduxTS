export interface JoinMediaItemType {
    media_idx: number,
    domain: string,
    company_name: string,
    rank: number,
    permission: number
}

export interface MediaSectionType extends MediaSectionChildType {
    idx: number,
    parent_idx: number,
    name: string,
    type: number,
    state: number,
    child: MediaSectionChildType[]
}

export interface MediaSectionChildType {
    idx: number,
    parent_idx: number,
    name: string,
    type: number,
    state: number
}