import API from '../api';
import { LoginType, MemberType } from "../../models/member";

export default {
    login: (payload: LoginType) => API.post('/member/login', payload),
    signup: (payload: MemberType) => API.post('/member/sign_up', payload),
    mediaSignup: (payload: MemberType) => API.post('/media/member/sign_up', payload),
    updateInfo: (payload: MemberType) => API.patch('/member/update', payload),
    checkID: (id: string) => API.post('/member/id_check', {id: id}),
    checkEmail: (email: string) => API.post('/member/email_check', {email: email}),
    myInfo: () => API.get('/member/info'),
}