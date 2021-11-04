import React from "react";
import {Link} from "react-router-dom";
import "./css/SideArticleImageAndText.scss";

function SideArticleImageAndText() {
    return (
        <div id="SideArticleImageAndText">
            <h2 className="side_title">인기 기사</h2>
            <ul className="list">
                <li>
                    <Link to="#">
                        <p className="rank">1</p>
                        <p className="title">구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</p>
                        <img src={require('../../assets/image/common/ic-menu.svg').default} alt="이미지" />
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        <p className="rank">2</p>
                        <p className="title">구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</p>
                        <img src={require('../../assets/image/common/ic-menu.svg').default} alt="이미지" />
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        <p className="rank">3</p>
                        <p className="title">구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</p>
                        <img src={require('../../assets/image/common/ic-menu.svg').default} alt="이미지" />
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        <p className="rank">4</p>
                        <p className="title">구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</p>
                        <img src={require('../../assets/image/common/ic-menu.svg').default} alt="이미지" />
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        <p className="rank">5</p>
                        <p className="title">구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</p>
                        <img src={require('../../assets/image/common/ic-menu.svg').default} alt="이미지" />
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SideArticleImageAndText;