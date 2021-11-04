import React from "react";
import "./css/ReporterNewsSaveList.scss";
import Pagination from "../common/Pagination";

function ReporterNewsSaveList() {
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
                    <select>
                        <option>기본</option>
                    </select>
                    <input type="text"/>
                    <button className="icon_search ir_txt">검색 버튼</button>
                </div>
                <div className="count_area">
                    <p className="txt">총 임시 기사 수</p>
                    <p className="count">23건</p>
                </div>
            </div>

            <table>
                <caption className="ir_txt">임시 저장 기사 목록</caption>
                <colgroup>
                    <col width="3%"/>
                    <col width="7%"/>
                    <col width="50%"/>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="15%"/>
                    <col width="5%"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>선 택</th>
                        <th>번 호</th>
                        <th>기사 제목</th>
                        <th>섹 션</th>
                        <th>저장 일자</th>
                        <th>기사 작성</th>
                        <th>삭 제</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="checkbox"/>
                        </td>
                        <td>0001</td>
                        <td>0001</td>
                        <td>0001</td>
                        <td>2020.03.30</td>
                        <td>
                            <button className="btn_write ir_txt">상세내역 작성하기 버튼</button>
                        </td>
                        <td>
                            <button className="btn_del">삭제</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Pagination/>
        </div>
    )
}

export default ReporterNewsSaveList;