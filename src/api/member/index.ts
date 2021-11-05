import API from '../api';
import { LoginType, SignupType, UpdateInfoType } from "../../models/member";

export default {
    login: (payload: LoginType) => API.post('/member/login', payload),
    signup: (payload: SignupType) => API.post('/member/sign_up', payload),
    mediaSignup: (payload: SignupType) => API.post('/media/member/sign_up', payload),
    updateInfo: (payload: UpdateInfoType) => API.patch('/member/modify', payload),
    checkID: (id: string) => API.post('/member/id_check', {id: id}),
    checkEmail: (email: string) => API.post('/member/email_check', {email: email}),
}