import React, {useEffect} from "react";
import "./css/Header.scss";
import {Link} from "react-router-dom";

function Header() {
    const isLogin = sessionStorage.getItem("token");

    const logout = () => {
        sessionStorage.removeItem("token");
    };

    return (
        <header id="Header">
            <div className="wrap_logo"/>
            <ul className="btn_list">
                {
                    isLogin
                    ?
                    <>
                        {/*<li>*/}
                        {/*    <p>OOO님 안녕하세요?</p>*/}
                        {/*</li>*/}
                        <li>
                            <Link to="/reporter" href="#">마이페이지</Link>
                        </li>
                        <li>
                            <Link to="/" href="#" onClick={logout}>로그아웃</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <Link to="/login" href="#">로그인</Link>
                        </li>
                        <li>
                            <Link to="/signup" href="#">회원가입</Link>
                        </li>
                    </>
                }
            </ul>
        </header>
    )
}

export default Header;