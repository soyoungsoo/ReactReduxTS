import React, {useRef, useState} from "react";
import "../signup/css/common.scss";
import "./Login.scss";
import {Link} from "react-router-dom";
import MemberAPI from "../../api/member/index";
import {LoginType, MemberType} from "../../models/member";
import _ from "lodash";
import validator from "../../util/validator";
import message from "../../const/message";

function Login() {
    const idRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loginError, setLoginError] = useState(false);
    const [login, setLogin] = useState<LoginType>({id: "", password: ""});

    const onChangeLogin = (key: string, value: string) => {
        let copy = _.cloneDeep(login);
        copy[key as keyof LoginType] = value;
        setLogin(copy);
    };

    const onClickLogin = async () => {
        if (validator.CheckRefValue([idRef, passwordRef])) {
            MemberAPI.login(login).then((res: MemberType) => {
                sessionStorage.setItem("token", res.token);
                window.location.href = "/";
            }).catch(() => setLoginError(true));
        }
    }

    return (
        <div id="Login">
            <div className="wrap">
                <div className="box">
                    <h2 className="title">회원 로그인</h2>
                    <p className="desc">로그인을 하시면 더욱 편리하게 사이트를 이용하실 수 있습니다.</p>

                    <div className="wrap_input">
                        <div className="input_box">
                            <input type="text" id="id" placeholder={message.placeholder} className={loginError ? 'error' : ''}
                                   ref={idRef} value={login.id} data-name={"아이디"}
                                   onChange={event => onChangeLogin("id", event.target.value)}
                                   onKeyUp={e => e.key === 'Enter' && passwordRef.current!.focus()}
                            />
                            <label htmlFor="id">아이디</label>
                        </div>
                        <div className="input_box">
                            <input type="password" id="pw" placeholder={message.placeholder} className={loginError ? 'error' : ''}
                                   ref={passwordRef} value={login.password} data-name={"비밀번호"}
                                   onChange={event => onChangeLogin("password", event.target.value)}
                                   onKeyUp={e => e.key === 'Enter' && onClickLogin()}
                            />
                            <label htmlFor="pw">비밀번호</label>
                        </div>
                    </div>

                    <div className="option">
                        <div className="btn_save_id">
                            {/*<input type="checkbox" id="save_id"/>*/}
                            {/*<label htmlFor="save_id">아이디 저장</label>*/}
                        </div>
                        {/*<div className="links">*/}
                        {/*    <Link to="#">아이디 찾기</Link>*/}
                        {/*    <Link to="#">비밀번호 찾기</Link>*/}
                        {/*</div>*/}
                    </div>
                    <button className="btn_next" onClick={onClickLogin}>로그인</button>
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