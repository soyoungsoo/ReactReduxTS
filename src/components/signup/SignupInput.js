import React from "react";
import "./css/SignupInput.scss";

function SignupInput() {
    return (
        <div id="SignupInput">
            <div className="box">
                <h2 className="title">회원가입</h2>
                <p className="desc">아래 내용을 입력해주세요.</p>

                <div className="wrap_input">
                    <div className="input_box">
                        <input type="text" id="user_id"/>
                        <label htmlFor="user_id">아이디</label>
                        <button className="btn btn_check">중복확인</button>
                    </div>
                    <div className="input_box">
                        <input type="password" id="pw"/>
                        <label htmlFor="pw">비밀번호 (영문 대소문자/숫자/특수문자 중 2가지 이상조합, 10~16자)</label>
                    </div>
                    <div className="input_box">
                        <input type="password" id="pw"/>
                        <label htmlFor="pw">비밀번호 확인</label>
                    </div>
                    <div className="input_box">
                        <input type="password" id="pw"/>
                        <label htmlFor="pw">이메일</label>
                    </div>
                    <div className="input_box">
                        <input type="password" id="pw"/>
                        <label htmlFor="pw">이름</label>
                    </div>
                    <div className="input_box">
                        <input type="password" id="pw"/>
                        <label htmlFor="pw">전화번호</label>
                    </div>
                    <div className="input_box">
                        <input type="password" id="pw"/>
                        <label htmlFor="pw">휴대폰</label>
                        <button className="btn btn_check">실명인증</button>
                    </div>
                    <div className="input_box input_address">
                        <input type="password" id="pw"/>
                        <label htmlFor="pw">주소</label>
                        <button className="btn btn_search">우편번호 검색</button>
                    </div>
                </div>
                
                <button className="btn_next">완료</button>
            </div>
        </div>
    )
}

export default SignupInput;