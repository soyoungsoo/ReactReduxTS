import React from "react";
import "./css/Header.scss";

function Header() {
    return (
        <header id="Header">
            <div className="wrap_logo"/>
            <ul className="btn_list">
                {/*<li>OOO님 안녕하세요?</li>*/}
                {/*<li>마이페이지</li>*/}
                {/*<li>로그아웃</li>*/}
                <li>로그인</li>
                <li>회원가입</li>
            </ul>
        </header>
    )
}

export default Header;