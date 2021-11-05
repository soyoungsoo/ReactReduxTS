export interface LoginType {
    id: string,
    password: string,
};

export interface SignupType extends LoginType {
    name: string, // 이름(string)
    email: string, // 이메일(string)
    phone?: string, // 전화번호(string)
    mobile_phone: string, // 핸폰번호(string)
    address: string, // 주소(string)
    address_detail: string, // 상세주소(string)
    postal_code: string // 우편번호(string)
}

export interface UpdateInfoType {
    name?: string, // 이름(string)
    password?: string, // 비밀번호(string)
    email?: string, // 이메일(string)
    phone?: string, // 전화번호(string)
    mobile_phone?: string, // 휴대폰 번호(string)
    address?: string, // 주소(string)
    address_detail?: string, // 상세주소(string)
    postal_code?: string // 우편번호(string)
}