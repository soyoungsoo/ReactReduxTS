import React from "react";
import "./css/common.scss";
import "./SignupTerms.scss";

function SignupSuccess() {
    return (
        <div id="SignupTerms">
            <div className="box">
                <h2 className="title">가입 완료</h2>
                <p className="desc">회원가입이 완료되었습니다.</p>

                <div className="wrap_input">
                    <div className="input_box">
                        <input type="text" id="user_id"/>
                        <label htmlFor="user_id">이름</label>
                    </div>
                    <div className="input_box">
                        <input type="password" id="user_id"/>
                        <label htmlFor="user_id">아이디</label>
                    </div>
                </div>

                <button className="btn_login">로그인 하러가기</button>
            </div>
        </div>
    )
}

export default SignupSuccess;