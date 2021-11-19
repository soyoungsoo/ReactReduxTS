import React, {useEffect, useState} from "react";
import "./css/Header.scss";
import {Link} from "react-router-dom";
import MemberAPI from "../../api/member";
import {MemberType} from "../../models/member";
import {useDispatch} from "react-redux";
import {setMember} from "../../features/member/memberSlice";

function Header() {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const isLogin = sessionStorage.getItem("token");

    useEffect(() => {
        if (isLogin) MemberAPI.myInfo().then((res: MemberType) => {
            setUserName(res.name);
            dispatch(setMember(res))
        })
    }, []);

    const logout = () => {
        sessionStorage.removeItem("token");
    };

    return (
        <header id="Header">
            <Link to="/" className="logo">LOGO</Link>
            <ul className="btn_list">
                {
                    isLogin
                    ?
                    <>
                        <li>
                            <p>{userName}님 안녕하세요?</p>
                        </li>
                        <li>
                            <Link to="/myPage">마이페이지</Link>
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