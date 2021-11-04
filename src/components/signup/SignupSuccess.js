import React from "react";
import "./css/common.scss";
import "./css/SignupSuccess.scss";

function SignupSuccess() {
    return (
        <div id="SignupSuccess">
            <div className="box">
                <h2 className="title">가입 완료</h2>
                <p className="desc">회원가입이 완료되었습니다.</p>

                <div className="wrap_input">
                    <div className="input_box">
                        <p className="input">이름</p>
                        <label htmlFor="user_name">이름</label>
                    </div>
                    <div className="input_box">
                        <p className="input">h2h2h2h2i@gmail.com</p>
                        <label htmlFor="user_id">아이디</label>
                    </div>
                </div>

                <button className="btn_next">로그인 하러가기</button>
            </div>
        </div>
    )
}

export default SignupSuccess;