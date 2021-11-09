import React, {useEffect, useState} from "react";
import "./css/ReporterNewsSaveList.scss";
import Pagination from "../common/Pagination";
import {ListType, ItemType, GetArticleOptionType} from "../../models/Article";
import ArticleAPI from "../../api/article";
import {useHistory, useLocation} from "react-router";
import qs from "query-string";

function ReporterNewsSaveList() {
    const history = useHistory();
    const location = useLocation();
    const keyword = qs.parse(location.search).keyword?.toString();

    const count = 10;
    const [searchType, setSearchType] = useState(0); // 0: 제목 1: 내용
    const [inputKeyword, setInputKeyword] = useState("");
    const [curPage, setCurPage] = useState(1);
    const [list, setList] = useState<ListType>({} as ListType);

    useEffect(() => {
        getList();
    }, [curPage]);

    const getList = async (initPage?: number) => {
        if (initPage) { // initPage 존재 시
            if (curPage !== 1) { // 현재 페이지가 1이 아닐 경우 1로 초기화하고 실행 종료
                setCurPage(1);
                return;
            }
        }
        let params: GetArticleOptionType = {
            page: curPage,
            count: count
            // state: 0 // 0: 임시 1: 대기 2: 거절 3: 승인
        };

        if (keyword) {
            params.keyword = keyword;
            params.option = searchType;
        }
        let result = await ArticleAPI.getArticleList(params);
        console.log(result.data);
        if (result.status === 200) {
            result.data.items.filter((item: ItemType) => item.state === 0);
            setList(result.data);
        }
    };

    const searchList = () => {
        let params = window.$Global.getParams();
        let keys = Object.keys(params);
        let key = keys[0];
        let value = params[key];
        history.push(`?${keys[0]}=${value}&keyword=${inputKeyword}`);
        getList(1);
    };

    return (
        <div id="ReporterNewsSaveList">
            <div className="saveList_title">임시 저장 기사</div>

            <div className="saveList_head">
                <div className="all_select_area">
                    <label htmlFor="all_check">
                        <input type="checkbox" id="all_check"/>전체선택
                    </label>
                    <button className="btn_del">삭제</button>
                </div>
                <div className="search_area">
                    <select value={searchType} onChange={e => setSearchType(Number(e.target.value))}>
                        <option value={0}>제목</option>
                        <option value={1}>내용</option>
                    </select>
                    <input type="text"
                           value={inputKeyword}
                           onKeyUp={e => e.key === 'Enter' && searchList()}
                           onChange={e => setInputKeyword(e.target.value)}
                    />
                    <button className="icon_search ir_txt" onClick={searchList}>검색 버튼</button>
                </div>
                <div className="count_area">
                    <p className="txt">총 임시 기사 수</p>
                    <p className="count">{list.total_count}건</p>
                </div>
            </div>

            <table>
                <caption className="ir_txt">임시 저장 기사 목록</caption>
                <colgroup>
                    <col width="3%"/>
                    <col width="7%"/>
                    <col width="60%"/>
                    <col width="10%"/>
                    <col width="15%"/>
                    <col width="5%"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>선 택</th>
                        <th>번 호</th>
                        <th>기사 제목</th>
                        <th>생성 일자</th>
                        <th>기사 작성</th>
                        <th>삭 제</th>
                    </tr>
                </thead>
                <tbody>
                {
                    list.items?.map((item, idx) => {
                        return (
                            <tr key={idx}>
                                <td>
                                    <input type="checkbox"/>
                                </td>
                                <td>{list.total_count - idx}</td>
                                <td>{item.title}</td>
                                <td>{window.$Global.convertDate(item.created_at)}</td>
                                <td>
                                    <button className="btn_write ir_txt">상세내역 작성하기 버튼</button>
                                </td>
                                <td>
                                    <button className="btn_del">삭제</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <Pagination curPage={curPage} lastNum={list.last} onClick={setCurPage} />
        </div>
    )
}

export default ReporterNewsSaveList;