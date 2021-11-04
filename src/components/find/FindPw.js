import React from "react";
import "../signup/css/common.scss";
import "./common.scss";
import {Link} from "react-router-dom";

function FindPw() {

    const FindStep1 =
        <>
            <h2 className="title">비밀번호 찾기</h2>
            <p className="desc">비밀번호를 찾고자 하는 아이디를 입력해 주세요.</p>
            <div className="wrap_input">
                <div className="input_box input_phone">
                    <input type="text" id="user_id" placeholder="입력하세요"/>
                    <label htmlFor="user_id">아이디</label>
                    <button className="btn">본인인증</button>
                </div>
            </div>
            <button className="btn_next">다음</button>
        </>;

    const FindStep2 =
        <>
            <h2 className="title">새로운 비밀번호 설정하기</h2>
            <p className="desc">영문 대소문자/숫자/특수문자 중 2가지 이상조합, 10~16자</p>
            <div className="wrap_input">
                <div className="input_box input_phone">
                    <input type="text" id="user_id" placeholder="입력하세요"/>
                    <label htmlFor="user_id">새로운 비밀번호</label>
                </div>
                <div className="input_box input_phone">
                    <input type="text" id="user_id" placeholder="입력하세요"/>
                    <label htmlFor="user_id">비밀번호 확인</label>
                </div>
            </div>
            <button className="btn_next">다음</button>
        </>;

    const FindStep3 =
        <>
            <h2 className="title">새로운 비밀번호 설정완료</h2>
            <p className="desc">로그인 페이지로 돌아가 주세요.</p>
            <div className="find_data find_data_pw">
                <p className="find_data_info">비밀번호가 변경되었습니다.</p>
            </div>
            <button className="btn_next">로그인 하러 가기</button>
        </>;

    return (
        <div id="FindPw">
            <div className="wrap">
                <div className="box">
                    {/*{FindStep1}*/}
                    {/*{FindStep2}*/}
                    {FindStep3}
                </div>

                <div className="notify">
                    <p>아이디를 잊으셨나요?</p>
                    <Link to="id">아이디 찾기</Link>
                </div>
            </div>
        </div>
    )
}

export default FindPw;