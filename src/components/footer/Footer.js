import React from "react";
import "./Footer.scss";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="footer_area">
                <div className="info_area">
                    <div className="logo">Logo</div>
                    <div className="info">
                        서울특별시 강남구 압구정로 313  |  대표전화 : 010-6351-7347  |<br/>
                        법인명 : 에프씨코리아  |  제호 : 에프씨케이미디어(fckmedia)  |  발행일 : 2020-05-27<br/>
                        발행인 : 홍수완  |  편집인 : 박항준  |  청소년보호책임자 : 박항준
                    </div>
                </div>

                <div className="desc_area">
                    <div className="link">
                        <Link to="#">서비스 이용약관</Link>
                        <Link to="#">개인정보 처리방침</Link>
                        <Link to="#">청소년 보호정책</Link>
                        <Link to="#">저작권 보호정책 표시</Link>
                    </div>
                    <p className="copyright">ⓒ Copyright © 2021 IPNOW. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;