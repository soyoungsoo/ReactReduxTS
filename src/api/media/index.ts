import API from '../api';
import { JoinMediaItemType } from "../../models/media";

export default {
    getJoinMediaList: () => API.get('/media/joined_list', {}),
    getMediaSection: () => API.get('/media/section')
}