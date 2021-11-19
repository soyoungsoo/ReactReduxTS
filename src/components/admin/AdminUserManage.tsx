import React, {useEffect, useState} from "react";
import "./css/AdminUserManage.scss";
import DashBoardListHead from "../common/DashBoardListHead";
import {useHistory, useLocation} from "react-router";
import qs from "query-string";
import AdminAPI from "../../api/admin";
import Pagination from "../common/Pagination";
import {MemberListType} from "../../models/admin";
import {GetArticleOptionType} from "../../models/article";
import AdminMemberInfoPopup from "./AdminMemberInfoPopup";
import message from "../../const/message";
import {convertRankStateStr} from "../common/js/convertRankStateStr";
import {MediaInfoType} from "../../models/member";

interface Props {
    title: string
}

function AdminUserManage({title}: Props) {
    const history = useHistory();
    const location = useLocation();
    const keyword = qs.parse(location.search).keyword?.toString() || '';
    const option = Number(qs.parse(location.search).option || 0);
    const page = Number(qs.parse(location.search).page?.toString() || 1);

    const count = 15;
    const [searchType, setSearchType] = useState(option); // 0: 제목 1: 내용
    const [list, setList] = useState<MemberListType>({} as MemberListType);

    const [popupShow, setPopupShow] = useState(false);
    const [editType, setEditType] = useState(false);
    const [selectMemberIdx, setSelectMemberIdx] = useState(0);

    let params = window.$Global.getParams();
    let keys = Object.keys(params);
    let key1 = keys[0];
    let key2 = keys[1];
    let commonQuery = `${key1}=${params[key1]}&${key2}=${params[key2]}`;

    useEffect(() => {
        getList();
    }, [page]);

    const getList = () => {
        let params: GetArticleOptionType = {
            page: page,
            count: count,
        };
        if (keyword) {
            params.keyword = keyword;
            params.option = searchType;
        }
        AdminAPI.getMediaMemberList(params).then((res: MemberListType) => setList(res));
    };

    const changePage = (page:number) => {
        history.push(`?${commonQuery}&option=${searchType}&keyword=${keyword}&page=${page}`);
    }

    const searchList = (keyword: string) => {
        history.push(`?${commonQuery}&option=${searchType}&keyword=${keyword}&page=${1}`);
    };

    const onClickShowInfo = (idx: number, isEdit: boolean) => {
        setPopupShow(true);
        setSelectMemberIdx(idx);
        setEditType(isEdit);
    }

    const onClickDelete = (idx: number) => {
        if (window.confirm(message.delete)) AdminAPI.deleteMediaMember(idx).then(() => getList());
    }

    return (
        <>
            <div id="AdminUserManage">
                <div className="page_title">{title}</div>
                <DashBoardListHead count={list.total_count} countTxt={"총 회원 수"} countUnit={"명"} option={[{text: '회원명', value: 0}]}
                                   initKeyword={keyword} searchType={searchType} setSearchType={setSearchType} searchAPI={searchList}
                />
                <table>
                    <colgroup>
                        {/*<col width="5%"/>*/}
                        <col width="10%"/>
                        <col width="15%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                        <col width="10%"/>
                        <col width="25%"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>회원명</th>
                            <th>ID</th>
                            <th>이메일</th>
                            <th>회원 등급</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        list.items?.map((item, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{list.total_count - idx - ((page - 1) * count)}</td>
                                    <td>{item.name}</td>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{convertRankStateStr(item.rank)}</td>
                                    <td>
                                        <div className="btns">
                                            <button className="btn_info" onClick={() => onClickShowInfo(item.idx, false)}>정보</button>
                                            {
                                                !(item.rank === MediaInfoType.mediaMaster)
                                                &&
                                                <>
													<button className="btn_edit ir_txt" onClick={() => onClickShowInfo(item.idx, true)}>수정 버튼</button>
													<button className="btn_del" onClick={() => onClickDelete(item.idx)}>삭제</button>
                                                </>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <Pagination curPage={page} lastNum={list.last} onClick={changePage} />
            </div>
            <AdminMemberInfoPopup show={popupShow} onClickHide={() => setPopupShow(false)} idx={selectMemberIdx} isEdit={editType} callback={getList}/>
        </>
    )
}

export default AdminUserManage;