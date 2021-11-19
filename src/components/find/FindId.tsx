import React from "react";
import "../signup/css/common.scss";
import "./css/common.scss";
import {Link} from "react-router-dom";
import message from "../../const/message"

function FindId() {
    const FindIDForm =
        <>
            <div className="wrap_input">
                <div className="input_box">
                    <input type="text" id="user_id" placeholder={message.requireInput}/>
                    <label htmlFor="user_id">이름</label>
                </div>
                <div className="input_box input_phone">
                    <input type="text" id="user_id" placeholder={message.requireInput}/>
                    <label htmlFor="user_id">전화번호</label>
                    <button className="btn btn_verify">인증번호 받기</button>
                </div>
                <div className="input_box">
                    <input type="text" id="user_id" placeholder={message.requireAuthNumberSix}/>
                    <label htmlFor="user_id">인증번호</label>
                </div>
            </div>
            <button className="btn_next">다음</button>
        </>;

    const FindIdData =
        <div className="find_data">
            <p className="find_data_info">
                회원님의 아이디는<br/>
                h2h2h2h2i@gmail.com<br/>
                입니다
            </p>
            <Link to="/login" className="btn_next btn_login">로그인 하러 가기</Link>
        </div>;

    return (
        <div id="FindId">
            <div className="wrap">
                <div className="box">
                    <h2 className="title">아이디 찾기</h2>
                    <p className="desc">회원정보에 등록한 휴대전화로 인증</p>
                    {/*{FindIDForm}*/}
                    {FindIdData}
                </div>

                <div className="notify">
                    <p>비밀번호를 잊으셨나요?</p>
                    <Link to="pw">비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    )
}

export default FindId;