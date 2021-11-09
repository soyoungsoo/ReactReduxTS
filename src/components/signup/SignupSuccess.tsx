import React from "react";
import {Link} from "react-router-dom";
import "./css/common.scss";
import "./css/SignupSuccess.scss";
import qs from "query-string";
import {useLocation} from "react-router";

function SignupSuccess() {
    const location = useLocation();
    const {id, name} = qs.parse(location.search);
    return (
        <div id="SignupSuccess">
            <div className="box">
                <h2 className="title">가입 완료</h2>
                <p className="desc">회원가입이 완료되었습니다.</p>

                <div className="wrap_input">
                    <div className="input_box">
                        <p className="input">{name}</p>
                        <label htmlFor="user_name">이름</label>
                    </div>
                    <div className="input_box">
                        <p className="input">{id}</p>
                        <label htmlFor="user_id">아이디</label>
                    </div>
                </div>

                <Link to="login" className="btn_next">로그인 하러가기</Link>
            </div>
        </div>
    )
}

export default SignupSuccess;