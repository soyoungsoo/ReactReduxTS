export interface getOptionType {
    page: number
    count: number
    keyword?: string
    option?: number, //0: 제목 1: 내용
}

export interface getCommentOptionType extends getOptionType {
    section_idx: number
}

