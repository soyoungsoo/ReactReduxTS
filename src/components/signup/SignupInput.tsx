import React, {useEffect, useRef, useState} from "react";
import "./css/SignupInput.scss";
import MemberAPI from "../../api/member/index";
import { MemberType } from "../../models/member";
import _ from "lodash";
import validator from "../../util/validator";
import message from "../../const/message";
import variable from "../../const/variable";
import {searchAddress} from "../../util/address";

export interface Props {
    funcNext: (query: string)  => void;
}

function SignupInput({funcNext}: Props) {
    const [signup, setSignup] = useState<MemberType>({password: ""} as MemberType);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [checkId, setCheckId] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(true);
    const [checkPasswordRegx, setCheckPasswordRegx] = useState(true);
    const idRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);
    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const mobilePhoneRef = useRef(null);
    const phoneRef = useRef(null);
    const addressRef = useRef(null);
    const addressDetailRef = useRef(null);
    const postalCodeRef = useRef(null);

    useEffect(() => {
        setCheckId(false);
    }, [signup.id]);

    useEffect(() => {
        if (signup.password) {
            if (signup.password.match(variable.passwordRegx)) {
                setCheckPasswordRegx(true);
            } else {
                setCheckPasswordRegx(false);
            }
        }

        if (passwordConfirm === signup.password) {
            setCheckPassword(true);
        } else {
            setCheckPassword(false);
        }
    }, [signup.password, passwordConfirm]);

    const onChangeSignup = (key: string, value: string) => {
        let copySignup = _.cloneDeep(signup);
        copySignup[key as keyof MemberType] = value;
        setSignup(copySignup);
    };

    const onClickCheckId = async () => {
        if (validator.CheckRefValue([idRef])) {
            MemberAPI.checkID(signup.id).then(() => setCheckId(true));
        }
    };

    const onClickCheckEmail = async () => {
        if (validator.CheckRefValue([emailRef])) {
            MemberAPI.checkEmail(signup.email).then(() => setCheckEmail(true));
        }
    };

    const onClickSignupCall= async () => {
        if (validator.CheckRefValue([idRef, passwordRef, emailRef, nameRef, mobilePhoneRef, phoneRef, postalCodeRef, addressRef, addressDetailRef])) {
            if (!checkId) {
                alert(message.checkID);
                return;
            }

            if (!checkEmail) {
                alert(message.checkEmail);
                return;
            }
            MemberAPI.mediaSignup(signup).then(() => funcNext(`&id=${signup.id}&name=${signup.name}`));
        }
    };

    return (
        <div id="SignupInput">
            <div className="box">
                <h2 className="title">????????????</h2>
                <p className="desc">?????? ????????? ??????????????????.</p>

                <div className="wrap_input">
                    <div className="input_box">
                        <input type="text" id="user_id" className="has_button" ref={idRef} data-name={"?????????"} value={signup.id} onChange={e => onChangeSignup("id", e.target.value)}/>
                        <label htmlFor="user_id">?????????</label>
                        <button className={`btn btn_check ${checkId ? 'use' : ''}`} onClick={onClickCheckId}>????????????</button>
                    </div>
                    <div className="input_box">
                        <input type="password" id="pw" className={(checkPasswordRegx) ? `` : 'error'} ref={passwordRef} data-name={"????????????"} value={signup.password} onChange={e => onChangeSignup("password", e.target.value)}/>
                        <label htmlFor="pw">???????????? {message.pwdRule}</label>
                    </div>
                    <div className="input_box">
                        <input type="password" id="pw_confirm" className={checkPassword ? `` : 'error'} ref={passwordConfirmRef} data-name={"???????????? ??????"} value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}/>
                        <label htmlFor="pw_confirm">???????????? ??????</label>
                    </div>
                    <div className="input_box">
                        <input type="email" id="email" className="has_button" ref={emailRef} data-name={"?????????"} value={signup.email} onChange={e => onChangeSignup("email", e.target.value)}/>
                        <label htmlFor="email">?????????</label>
                        <button className={`btn btn_check ${checkEmail ? 'use' : ''}`} onClick={onClickCheckEmail}>????????????</button>
                    </div>
                    <div className="input_box">
                        <input type="text" id="name" ref={nameRef} data-name={"??????"} value={signup.name} onChange={e => onChangeSignup("name", e.target.value)}/>
                        <label htmlFor="name">??????</label>
                    </div>
                    <div className="input_box">
                        <input type="text" id="phone" ref={mobilePhoneRef} data-name={"????????????"} value={signup.phone} onChange={e => onChangeSignup("phone", window.$Global.numberRegx(e.target.value))}/>
                        <label htmlFor="phone">????????????</label>
                    </div>
                    <div className="input_box">
                        <input type="text" id="mobilePhone" ref={phoneRef} data-name={"?????????"} value={signup.mobile_phone} onChange={e => onChangeSignup("mobile_phone", window.$Global.numberRegx(e.target.value))}/>
                        <label htmlFor="mobilePhone">?????????</label>
                        {/*<button className="btn btn_check">????????????</button>*/}
                    </div>
                    <div className="input_box input_address">
                        <input type="text" id="postal_code" readOnly ref={postalCodeRef} data-name={"????????????"} value={signup.postal_code} onChange={e => onChangeSignup("postal_code", e.target.value)}/>
                        <label htmlFor="postal_code">????????????</label>
                        <button className="btn btn_search" onClick={() => searchAddress(signup, setSignup)}>???????????? ??????</button>
                    </div>

                    <div className="input_box input_address">
                        <input type="text" id="address" readOnly ref={addressRef} data-name={"??????"} value={signup.address} onChange={e => onChangeSignup("address", e.target.value)}/>
                        <label htmlFor="address">??????</label>
                    </div>

                    <div className="input_box input_address">
                        <input type="text" id="address_detail" ref={addressDetailRef} data-name={"????????????"} value={signup.address_detail} onChange={e => onChangeSignup("address_detail", e.target.value)}/>
                        <label htmlFor="address_detail">????????????</label>
                    </div>
                </div>
                
                <button className="btn_next" onClick={onClickSignupCall}>??????</button>
            </div>
        </div>
    )
}

export default SignupInput;