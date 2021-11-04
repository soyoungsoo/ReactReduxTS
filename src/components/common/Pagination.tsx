import React from "react";
import {Link} from "react-router-dom";
import "./css/Pagination.scss";

function Pagination() {
    return (
        <ul id="Pagination">
            <li>
                <Link to="#" className="btn_first ir_txt">처음으로</Link>
            </li>
            <li>
                <Link to="#" className="btn_prev ir_txt">이전으로</Link>
            </li>
            <li>
                <Link to="#" className="number active">1</Link>
            </li>
            <li>
                <Link to="#" className="number">2</Link>
            </li>
            <li>
                <Link to="#" className="number">3</Link>
            </li>
            <li>
                <Link to="#" className="btn_last ir_txt">처음으로</Link>
            </li>
            <li>
                <Link to="#" className="btn_next ir_txt">다음으로</Link>
            </li>
        </ul>
    )
}

export default Pagination;