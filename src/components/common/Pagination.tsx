import React from "react";
import "./css/Pagination.scss";

interface PageType {
    curPage: number,
    lastNum: number,
    onClick: (page: number) => void
}

function Pagination({curPage, lastNum, onClick}: PageType) {
    let tag = [], viewCount = 10;
    let page = Math.ceil(curPage / viewCount);
    let lastPage = Math.ceil(lastNum / viewCount);

    let sNum = page > 1 ? ((page - 1) * viewCount + 1) : 1;
    let lNum = lastPage > page ? page * viewCount : lastNum;

    for (let i = sNum; i <= lNum; i++) {
        tag.push(
            <li key={i} onClick={() => onClick(i)}>
                <button className={`number ${i === curPage ? 'active' : ''}`}>{i}</button>
            </li>
        );
    }

    return (
        <ul id="Pagination">
            <li>
                <button onClick={() => onClick(1)} className="btn_first ir_txt">처음으로</button>
            </li>
            <li className={1 <= curPage - 1 ? "" : "not_click"}>
                <button onClick={() => onClick(curPage - 1)} className="btn_prev ir_txt">이전으로</button>
            </li>
            { tag }
            <li className={curPage < lastNum ? "" : "not_click"}>
                <button onClick={() => onClick(curPage + 1)} className="btn_last ir_txt">다음으로</button>
            </li>
            <li>
                <button onClick={() => onClick(lastNum)} className="btn_next ir_txt">마지막으로</button>
            </li>
        </ul>
    )
}

export default Pagination;