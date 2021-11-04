import React from "react";
import Pagination from "../common/Pagination";
import "./css/ReporterNewsList.scss";

function ReporterNewsList() {
    return (
        <div id="ReporterNewsList">
            <div className="list_title">기사 리스트</div>

            <div className="list_head">
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
                    <col width="5%"/>
                    <col width="50%"/>
                    <col width="10%"/>
                    <col width="5%"/>
                    <col width="10%"/>
                    <col width="5%"/>
                    <col width="15%"/>
                </colgroup>
                <thead>
                <tr>
                    <th>번 호</th>
                    <th>기사 제목</th>
                    <th>섹 션</th>
                    <th>기사 작성</th>
                    <th>등록 일자</th>
                    <th>조회수</th>
                    <th>비 고</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>0001</td>
                    <td>0001</td>
                    <td>0001</td>
                    <td>0001</td>
                    <td>2020.03.30</td>
                    <td>152</td>
                    <td>
                        <div className="btns">
                            <button className="btn_edit ir_txt">기사 더보기 버튼</button>
                            <button className="btn_more ir_txt">기사 더보기 버튼</button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <Pagination/>
        </div>
    )
}

export default ReporterNewsList;