import React from "react";
import {Link} from "react-router-dom";
import "./css/SideArticleText.scss";

function SideArticleText() {
    return (
        <div id="SideArticleText">
            <h2 className="side_title">최신 뉴스</h2>
            <ul className="list">
                <li>
                    <Link to="#">구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</Link>
                </li>
                <li>
                    <Link to="#">구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</Link>
                </li>
                <li>
                    <Link to="#">구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</Link>
                </li>
                <li>
                    <Link to="#">구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</Link>
                </li>
                <li>
                    <Link to="#">구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</Link>
                </li>
            </ul>
        </div>
    )
}

export default SideArticleText;