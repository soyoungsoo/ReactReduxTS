import React from "react";
import "./Header.scss";

function Header() {
    return (
        <header id="Header">
            <div className="wrap_logo"/>
            <ul className="btn_list">
                <li>로그인</li>
                <li>회원가입</li>
            </ul>
        </header>
    )
}

export default Header;