import React, {useEffect, useRef, useState} from "react";
import "./css/SignupInput.scss";
import MemberAPI from "../../api/member/index";
import { SignupType } from "../../models/member";
import _ from "lodash";
import validator from "../../util/validator";
import message from "../../const/message";
import variable from "../../const/variable";

export interface Props {
    funcNext: (query: string)  => void;
}

function SignupInput({funcNext}: Props) {
    const [signup, setSignup] = useState<SignupType>({
        id: "",
        password: "",
        name: "",
        email: "",
        phone: "", // 옵션
        mobile_phone: "",
        address: "",
        address_detail: "",
        postal_code: "",
    });
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
    const addressRef = useRef(null);
    const addressDetailRef = useRef(null);
    const postalCodeRef = useRef(null);

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
        copySignup[key as keyof SignupType] = value;
        setSignup(copySignup);
    };

    const onClickCheckId = async () => {
        if (validator.CheckRefValue([idRef])) {
            let result = await MemberAPI.checkID(signup.id);
            let success = result.status === 200;
            if (success) setCheckId(true);
        }
    };

    const onClickCheckEmail = async () => {
        if (validator.CheckRefValue([emailRef])) {
            let result = await MemberAPI.checkEmail(signup.email);
            let success = result.status === 200;
            if (success) setCheckEmail(true);
        }
    };

    const onClickSignupCall= async () => {
        if (validator.CheckRefValue([idRef, passwordRef, emailRef, nameRef, mobilePhoneRef, postalCodeRef, addressRef, addressDetailRef])) {
            if (!checkId) {
                alert(message.checkID);
                return;
            }

            if (!checkEmail) {
                alert(message.checkEmail);
                return;
            }

            let result = await MemberAPI.mediaSignup(signup);
            let success = result.status === 200;
            if (success) funcNext(`&id=${signup.id}&name=${signup.name}`);
        }
    };

    function searchAddress() {
        let { daum } = window;
        new daum.Postcode({
            oncomplete: function(data: any) {
                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                let roadAddr = data.roadAddress; // 도로명 주소 변수
                let extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                let copySignup = _.cloneDeep(signup);
                copySignup.postal_code = data.zonecode;
                copySignup.address = roadAddr + " " + extraRoadAddr;
                setSignup(copySignup);
            }
        }).open();
    }

    return (
        <div id="SignupInput">
            <div className="box">
                <h2 className="title">회원가입</h2>
                <p className="desc">아래 내용을 입력해주세요.</p>

                <div className="wrap_input">
                    <div className="input_box">
                        <input type="text" id="user_id" className="has_button" ref={idRef} data-name={"아이디"} value={signup.id} onChange={e => onChangeSignup("id", e.target.value)}/>
                        <label htmlFor="user_id">아이디</label>
                        <button className={`btn btn_check ${checkId ? 'use' : ''}`} onClick={onClickCheckId}>중복확인</button>
                    </div>
                    <div className="input_box">
                        <input type="password" id="pw" className={(checkPasswordRegx) ? `` : 'error'} ref={passwordRef} data-name={"비밀번호"} value={signup.password} onChange={e => onChangeSignup("password", e.target.value)}/>
                        <label htmlFor="pw">비밀번호 (영문 대소문자/숫자/특수문자 중 2가지 이상조합, 10~16자)</label>
                    </div>
                    <div className="input_box">
                        <input type="password" id="pw_confirm" className={checkPassword ? `` : 'error'} ref={passwordConfirmRef} data-name={"비밀번호 확인"} value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}/>
                        <label htmlFor="pw_confirm">비밀번호 확인</label>
                    </div>
                    <div className="input_box">
                        <input type="email" id="email" className="has_button" ref={emailRef} data-name={"이메일"} value={signup.email} onChange={e => onChangeSignup("email", e.target.value)}/>
                        <label htmlFor="email">이메일</label>
                        <button className={`btn btn_check ${checkEmail ? 'use' : ''}`} onClick={onClickCheckEmail}>중복확인</button>
                    </div>
                    <div className="input_box">
                        <input type="text" id="name" ref={nameRef} data-name={"이름"} value={signup.name} onChange={e => onChangeSignup("name", e.target.value)}/>
                        <label htmlFor="name">이름</label>
                    </div>
                    <div className="input_box">
                        <input type="number" id="number" ref={mobilePhoneRef} data-name={"전화번호"} value={signup.mobile_phone} onChange={e => onChangeSignup("mobile_phone", e.target.value)}/>
                        <label htmlFor="number">전화번호</label>
                    </div>
                    {/*<div className="input_box">*/}
                    {/*    <input type="password" id="pw"/>*/}
                    {/*    <label htmlFor="pw">휴대폰</label>*/}
                    {/*    <button className="btn btn_check">실명인증</button>*/}
                    {/*</div>*/}
                    <div className="input_box input_address">
                        <input type="text" id="postal_code" readOnly ref={postalCodeRef} data-name={"우편번호"} value={signup.postal_code} onChange={e => onChangeSignup("postal_code", e.target.value)}/>
                        <label htmlFor="postal_code">우편번호</label>
                        <button className="btn btn_search" onClick={searchAddress}>우편번호 검색</button>
                    </div>

                    <div className="input_box input_address">
                        <input type="text" id="address" readOnly ref={addressRef} data-name={"주소"} value={signup.address} onChange={e => onChangeSignup("address", e.target.value)}/>
                        <label htmlFor="address">주소</label>
                    </div>

                    <div className="input_box input_address">
                        <input type="text" id="address_detail" ref={addressDetailRef} data-name={"상세주소"} value={signup.address_detail} onChange={e => onChangeSignup("address_detail", e.target.value)}/>
                        <label htmlFor="address_detail">상세주소</label>
                    </div>
                </div>
                
                <button className="btn_next" onClick={onClickSignupCall}>완료</button>
            </div>
        </div>
    )
}

export default SignupInput;