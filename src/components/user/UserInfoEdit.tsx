import React, {useEffect, useRef, useState} from "react";
import "./css/UserInfoEdit.scss";
import message from "../../const/message";
import MemberAPI from "../../api/member";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import validator from "../../util/validator";
import variable from "../../const/variable";
import {searchAddress} from "../../util/address";

interface Props {
    title: string
}

function UserInfoEdit({title}: Props) {
    const memberInfo = useSelector((state: RootState) => state.member);
    const [edit, setEdit] = useState(false);
    const [member, setMember] = useState(memberInfo);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [checkPassword, setCheckPassword] = useState(true);
    const [checkPasswordRegx, setCheckPasswordRegx] = useState(true);

    const [passwordRef, passwordConfirmRef, nameRef, emailRef, phoneRef, mobilePhoneRef, postalCodeRef, addressRef, addressDetailRef] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const refs = [nameRef, emailRef, phoneRef, mobilePhoneRef, postalCodeRef, addressRef, addressDetailRef];

    useEffect(() => {
        setMember(memberInfo);
    }, [memberInfo]);

    useEffect(() => {
        if (password) {
            if (password.match(variable.passwordRegx)) {
                setCheckPasswordRegx(true);
            } else {
                setCheckPasswordRegx(false);
            }
        } else {
            setCheckPasswordRegx(true);
        }
        if (passwordConfirm === password) {
            setCheckPassword(true);
        } else {
            setCheckPassword(false);
        }
    }, [password, passwordConfirm]);

    const onClickSave = () => {
        if (password.length || passwordConfirm.length) {
            if (!checkPassword || !checkPasswordRegx) {
                alert(message.pwdAllRequire);
                return;
            }
        }
        if (validator.CheckRefValue(refs)) {
            let payload = {...member, password: password};
            MemberAPI.updateInfo(payload).then(() => {
                alert(message.successSave);
                setPassword("");
                setPasswordConfirm("");
                setEdit(false);
            });
        }
    }

    return (
        <div id="UserInfoEdit">
            <div className="head">
                <div className="page_title">{title}</div>
                {
                    edit
                    ? <button className="btn_save" onClick={onClickSave}>저장하기</button>
                    : <button className="btn_edit" onClick={() => setEdit(true)}>수정하기</button>
                }
            </div>

            <div className={`content ${edit ? 'edit' : ''}`}>
                <div className="col">
                    <div className="row">
                        <p className="not_edit">{member.id}</p>
                        <h2>아이디</h2>
                    </div>
                </div>
                {
                    edit
                    &&
					<div className="col col2">
						<div className="row">
                            <input type="password" id="memberId" className={checkPasswordRegx ? `` : 'error'} ref={passwordRef} data-name={"비밀번호"} value={password} onChange={e => setPassword(e.target.value)} autoFocus/>
							<label htmlFor="memberId">비밀번호 {message.pwdRule}</label>
						</div>
						<div className="row">
                            <input type="password" id="memberPwdCfm" className={checkPassword ? `` : 'error'} ref={passwordConfirmRef} data-name={"비밀번호 확인"} value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}/>
							<label htmlFor="memberPwdCfm">비밀번호 확인</label>
						</div>
					</div>
                }
                <div className="col col2">
                    <div className="row">
                        {
                            edit
                            ? <input type="text" id={"memberName"} ref={nameRef} data-name={"이름"} value={member.name} onChange={e => setMember({...member, name: e.target.value})}/>
                            : <p className="not_edit">{member.name}</p>
                        }
                        <label htmlFor="memberName">이름</label>
                    </div>
                    <div className="row">
                        {
                            edit
                            ? <input type="text" id="memberEmail" ref={emailRef} value={member.email} data-name={"이메일"} onChange={e => setMember({...member, email: e.target.value})}/>
                            : <p className="not_edit">{member.email}</p>
                        }
                        <label htmlFor="memberEmail">이메일</label>
                    </div>
                </div>
                <div className="col col2">
                    <div className="row">
                        {
                            edit
                            ? <input type="text" id="memberPhone" ref={phoneRef} value={member.phone} data-name={"전화번호"} onChange={e => setMember({...member, phone: window.$Global.numberRegx(e.target.value)})}/>
                            : <p className="not_edit">{member.phone}</p>
                        }
                        <label htmlFor="memberPhone">전화번호</label>
                    </div>
                    <div className="row">
                        {
                            edit
                            ? <input type="text" id="memberMPhone" ref={mobilePhoneRef} value={member.mobile_phone} data-name={"휴대폰"} onChange={e => setMember({...member, mobile_phone: window.$Global.numberRegx(e.target.value)})}/>
                            : <p className="not_edit">{member.mobile_phone}</p>
                        }
                        <label htmlFor="memberMPhone">휴대폰</label>
                    </div>
                </div>
                <div className="col col2">
                    <div className="row">
                        {
                            edit
                                ?
                                <div className="inner">
                                    <input type="text" id={"memberPostalCode"} ref={postalCodeRef} value={member.postal_code} data-name={"우편번호"}/>
                                    <button className="btn_search_address" onClick={() => searchAddress(member, setMember)}>우편번호 검색</button>
                                </div>
                                : <p className="not_edit">{member.postal_code}</p>
                        }
                        <label htmlFor="memberPostalCode">우편번호</label>
                    </div>
                    <div className="row">
                        {
                            edit
                            ? <input type="text" id={"memberAddress"} ref={addressRef} value={member.address} data-name={"주소"} readOnly/>
                            : <p className="not_edit">{member.address}</p>
                        }
                        <label htmlFor="memberAddress">주소</label>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        {
                            edit
                            ? <input type="text" id={"memberAddressDetail"} ref={addressDetailRef} value={member.address_detail} data-name={"상세주소"} onChange={e => setMember({...member, address_detail: e.target.value})}/>
                            : <p className="not_edit">{member.address_detail}</p>
                        }
                        <label htmlFor="memberAddressDetail">상세주소</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoEdit;