export interface LoginType {
    id: string,
    password: string,
}

export interface MemberType extends LoginType {
    [key: string]: number | string | Object
    idx: number,
    name: string,
    email: string,
    phone: string,
    mobile_phone: string,
    admin: number,
    admin_level: number
    created_at: number,
    media_info: {
        idx: number,
        permission: number,
        rank: number
    },
    token: string,
    address: string,
    address_detail: string
    postal_code: string
}

export enum MediaInfoType {
    normalUser = 0, // 일반회원
    normalUserStr = "일반회원",
    reporter = 1, // 기자
    reporterStr = "기자",
    admin = 2, // 관리자
    adminStr = "관리자",
    mediaMaster = 3, // 미디어 마스터
    mediaMasterStr = "미디어 마스터",
    contractor = 4, // 계약자
    contractorStr = "계약자"
}