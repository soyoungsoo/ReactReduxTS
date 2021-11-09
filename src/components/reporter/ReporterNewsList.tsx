import React, {useEffect, useState} from "react";
import Pagination from "../common/Pagination";
import "./css/ReporterNewsList.scss";
import ArticleAPI from "../../api/article";
import { GetArticleOptionType, ListType } from "../../models/Article";
import convertStateStr from  "./convertStateStr";
import qs from "query-string";
import { useHistory, useLocation } from 'react-router';

function ReporterNewsList() {
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
        };

        if (keyword) {
            params.keyword = keyword;
            params.option = searchType;
        }
        let result = await ArticleAPI.getArticleList(params);
        if (result.status === 200) setList(result.data);
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
        <div id="ReporterNewsList">
            <div className="list_title">기사 리스트</div>

            <div className="list_head">
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
                    <col width="5%"/>
                    <col width="55%"/>
                    <col width="5%"/>
                    <col width="15%"/>
                    <col width="10%"/>
                    <col width="15%"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>번 호</th>
                        <th>기사 제목</th>
                        <th>기사 작성</th>
                        <th>생성 일자</th>
                        <th>입력 일자</th>
                        <th>비 고</th>
                    </tr>
                </thead>
                <tbody>
                {
                    list.items?.map((item, idx) => {
                        return (
                            <tr>
                                <td>{list.total_count - idx}</td>
                                <td>{item.title}</td>
                                <td>{convertStateStr.convertState(item.state)}</td>
                                <td>{window.$Global.convertDate(item.created_at)}</td>
                                <td>{window.$Global.convertDate(item.inserted_at)}</td>
                                <td>
                                    <div className="btns">
                                        <button className="btn_edit ir_txt">수정 버튼</button>
                                        <button className="btn_more ir_txt">기사 더보기 버튼</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            <Pagination curPage={curPage} lastNum={list.last} onClick={setCurPage} />
        </div>
    )
}

export default ReporterNewsList;