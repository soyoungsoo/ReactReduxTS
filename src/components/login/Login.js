import React from "react";
import "../signup/css/common.scss";
import "./Login.scss";
import {Link} from "react-router-dom";

function Login() {
    return (
        <div id="Login">
            <div className="wrap">
                <div className="box">
                    <h2 className="title">회원 로그인</h2>
                    <p className="desc">로그인을 하시면 더욱 편리하게 사이트를 이용하실 수 있습니다.</p>

                    <div className="wrap_input">
                        <div className="input_box">

                            <input type="text" id="id"/>
                            <label htmlFor="id">아이디</label>
                        </div>
                        <div className="input_box">
                            <input type="password" id="pw"/>
                            <label htmlFor="pw">비밀번호</label>
                        </div>
                    </div>

                    <div className="option">
                        <div className="btn_save_id">
                            <input type="checkbox" id="save_id"/>
                            <label htmlFor="save_id">아이디 저장</label>
                        </div>
                        <div className="links">
                            <Link>아이디 찾기</Link>
                            <Link>비밀번호 찾기</Link>
                        </div>
                    </div>
                    <button className="btn_next">로그인</button>
                </div>

                <div className="notify">
                    <p>아직 IPNOW미디어 (IPNOW Media) 회원이 아닌가요?</p>
                    <Link to="/signup">회원가입</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;