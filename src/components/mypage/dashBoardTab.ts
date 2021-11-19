import UserInfoEdit from "../user/UserInfoEdit";
import AdminUserManage from "../admin/AdminUserManage";
import AdminArticleMange from "../admin/AdminArticleMange";
import ReporterArticleAdd from "../reporter/ReporterArticleAdd";
import ReporterNewsSaveList from "../reporter/ReporterArticleSaveList";
import ReporterNewsList from "../reporter/ReporterArticleList";
import {MediaInfoType} from "../../models/member";

export const dashBoardTab = {
    [MediaInfoType.mediaMaster]: {
        title: "관리자 대시보드",
        list: [
            {
                title: "마이페이지",
                child: ["정보 수정"],
                component: [UserInfoEdit],
                query: []
            },
            {
                title: "회원 관리",
                child: ["회원 리스트"],
                component: [AdminUserManage],
                query: []
            },
            {
                title: "기사 관리",
                child: ["기사 리스트"],
                component: [AdminArticleMange],
                query: []
            }
        ]
    },
    [MediaInfoType.reporter]: {
        title: "기자 대시보드",
        list: [
            {
                title: "마이페이지",
                child: ["정보 수정"],
                component: [UserInfoEdit],
                query: []
            },
            {
                title: "기사 관리",
                child: ["기사 작성", "임시 저장 기사", "기사 목록"],
                component: [ReporterArticleAdd, ReporterNewsSaveList, ReporterNewsList],
                query: ['', '&state=0', '']
            }
        ]
    },

    [MediaInfoType.normalUser]: {
        title: "대시보드",
        list: [
            {
                title: "마이페이지",
                child: ["정보 수정"],
                component: [UserInfoEdit],
                query: []
            }
        ]
    }
}