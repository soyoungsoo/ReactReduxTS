import React, {useEffect, useState} from "react";
import "./css/AdminArticleMange.scss";
import DashBoardListHead from "../common/DashBoardListHead";
import AdminAPI from "../../api/admin";
import {GetArticleOptionType, ListType} from "../../models/article";
import {useHistory, useLocation} from "react-router";
import qs from "query-string";
import Pagination from "../common/Pagination";
import message from "../../const/message";
import {convertArticleStateStr} from "../common/js/convertArticleStateStr";
import ArticlePopup from "../common/ArticlePopup";
import {PopupType} from "../reporter/interface/PopupType";

interface Props {
    title: string
}

function AdminArticleMange({title}: Props) {
    const history = useHistory();
    const location = useLocation();
    const keyword = qs.parse(location.search).keyword?.toString() || '';
    const option = Number(qs.parse(location.search).option || 0);
    const page = Number(qs.parse(location.search).page?.toString() || 1);

    const count = 15;
    const [searchType, setSearchType] = useState(option); // 0: 제목 1: 내용
    const [list, setList] = useState<ListType>({} as ListType);

    const [popupShow, setPopupShow] = useState(false);
    const [popupType, setPopupType] = useState<PopupType>({idx: 0, type: "VIEW"});

    const [checkList, setCheckList] = useState<Boolean[]>([]);

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

        AdminAPI.getArticleList(params).then((res: ListType) => {
            if (res.items.length === 0 && page > 1) { // 삭제 시 필요한 조건문, 마지막 끝 페이지 데이터가 없을 시 page를 1로 변경
                changePage(1);
            } else {
                setList(res);
                setCheckList(new Array(res.items.length).fill(false));
            }
        });
    };

    const changePage = (page:number) => {
        history.push(`?${commonQuery}&option=${searchType}&keyword=${keyword}&page=${page}`);
    }

    const searchList = (keyword: string) => {
        history.push(`?${commonQuery}&option=${searchType}&keyword=${keyword}&page=${1}`);
    };

    const confirmArticle = (article_idx: number, section_idx: number) => {
        if (window.confirm(message.confirm)) {
            AdminAPI.confirmArticle(article_idx, section_idx).then(() => getList());
        }
    }

    const rejectArticle = (article_idx: number, section_idx: number) => {
        if (window.confirm(message.reject)) {
            AdminAPI.rejectArticle(article_idx, section_idx).then(() => getList());
        }
    }

    const onClickPopupShow = (idx: number) => {
        setPopupShow(true);
        setPopupType({...popupType, idx: idx});
    }

    const onChangeAllCheck = (target: HTMLInputElement) => {
        setCheckList(new Array(checkList.length).fill(target.checked));
    };

    const onClickCheckBox = (idx: number) => {
        let copy = checkList.slice();
        copy[idx] = !copy[idx];
        setCheckList(copy);
    }

    return (
        <>
            <div id="AdminArticleMange">
                <div className="page_title">{title}</div>
                <DashBoardListHead count={list.total_count} countTxt={"총 임시 기사 수"} initKeyword={keyword} searchType={searchType}
                                   setSearchType={setSearchType} searchAPI={searchList} onChangeAllCheck={onChangeAllCheck}
                />
                <table>
                    <caption className="ir_txt">기사 목록</caption>
                    <colgroup>
                        {/*<col width="5%"/>*/}
                        <col width="5%"/>
                        <col width="50%"/>
                        <col width="5%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="20%"/>
                    </colgroup>
                    <thead>
                        <tr>
                            {/*<th>선택</th>*/}
                            <th>번호</th>
                            <th>기사 제목</th>
                            <th>기자명</th>
                            <th>업로드일</th>
                            <th>기사 작성</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.items?.map((item, idx) => {
                                return (
                                    <tr key={idx}>
                                        {/*<td>*/}
                                        {/*    <input type="checkbox" checked={Boolean(checkList[idx])} onChange={() => onClickCheckBox(idx)}/>*/}
                                        {/*</td>*/}
                                        <td>{list.total_count - idx - ((page - 1) * count)}</td>
                                        <td>
                                            <p className="ellipsis">{item.title}</p>
                                        </td>
                                        <td>{item.reporter_name}</td>
                                        <td>{window.$Global.convertDate(item.created_at)}</td>
                                        <td>{convertArticleStateStr(item.section_state)}</td>
                                        <td>
                                            <div className="btns">
                                                <button className="btn_info" onClick={() => onClickPopupShow(item.idx)}>정보</button>
                                                <button className="btn_accept" onClick={() => confirmArticle(item.idx,  item.section_idx)}>승인</button>
                                                <button className="btn_del" onClick={() => rejectArticle(item.idx,  item.section_idx)}>거절</button>
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
            <ArticlePopup show={popupShow} setShow={setPopupShow} idx={popupType.idx} type={popupType.type}/>
        </>
    )
}

export default AdminArticleMange;