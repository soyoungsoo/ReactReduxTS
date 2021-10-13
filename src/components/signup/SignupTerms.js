import React from "react";
import "./css/common.scss";
import "./SignupTerms.scss";

function SignupTerms() {
    return (
        <div id="SignupTerms">
            <div className="box">
                <h2 className="title">이용약관</h2>
                <p className="desc">회원가입을 통해 다양한 혜택을 누리시기 바랍니다.</p>

                <div className="wrap_terms">
                    <div className="terms">
                        <div className="terms_header">
                            <h2 className="terms_header_title">이용약관동의 (필수)</h2>
                            <div className="btn_checkbox">
                                <input type="checkbox" id="terms1"/>
                                <label htmlFor="terms1">동의함</label>
                            </div>
                        </div>
                        <div className="terms_content">
                            이용약관
                            제1조 (목적)
                            이 약관은 주식회사 아이티엘(이하 ‘회사’)이 회원에게 IPNOW 서비스를 제공하기 위하여 운영하는 https://www.ipnow.co.kr/ (이하 ‘IPNOW’)의 이용과 관련하여 회사와 회원의 권리 및 의무 기타 필요한 사항을 규정함을 목적으로 합니다.

                            제 2 조 (정의)
                            이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                        </div>
                    </div>
                    <div className="terms">
                        <div className="terms_header">
                            <h2 className="terms_header_title">이용약관동의 (필수)</h2>
                            <div className="btn_checkbox">
                                <input type="checkbox" id="terms2"/>
                                <label htmlFor="terms2">동의함</label>
                            </div>
                        </div>
                        <div className="terms_content">
                            이용약관
                            제1조 (목적)
                            이 약관은 주식회사 아이티엘(이하 ‘회사’)이 회원에게 IPNOW 서비스를 제공하기 위하여 운영하는 https://www.ipnow.co.kr/ (이하 ‘IPNOW’)의 이용과 관련하여 회사와 회원의 권리 및 의무 기타 필요한 사항을 규정함을 목적으로 합니다.

                            제 2 조 (정의)
                            이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                        </div>
                    </div>
                    <div className="terms">
                        <div className="terms_header">
                            <h2 className="terms_header_title">이용약관동의 (필수)</h2>
                            <div className="btn_checkbox">
                                <input type="checkbox" id="terms3"/>
                                <label htmlFor="terms3">동의함</label>
                            </div>
                        </div>
                        <div className="terms_content">
                            이용약관
                            제1조 (목적)
                            이 약관은 주식회사 아이티엘(이하 ‘회사’)이 회원에게 IPNOW 서비스를 제공하기 위하여 운영하는 https://www.ipnow.co.kr/ (이하 ‘IPNOW’)의 이용과 관련하여 회사와 회원의 권리 및 의무 기타 필요한 사항을 규정함을 목적으로 합니다.

                            제 2 조 (정의)
                            이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                        </div>
                    </div>

                    <div className="btn_checkbox btn_all_check">
                        <input type="checkbox" id="terms_all_agree"/>
                        <label htmlFor="terms_all_agree">모두 동의합니다</label>
                    </div>
                </div>

                <button className="btn_next">다음</button>
            </div>
        </div>
    )
}

export default SignupTerms;