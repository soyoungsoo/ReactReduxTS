import React from "react";
import SectionSide from "./SectionSide";
import "./css/SectionEDetail.scss";
import {Link} from "react-router-dom";

function SectionEDetail() {
    return (
        <div id="SectionEDetail">
            <div className="header">
                <div className="header_post">
                    <h2 className="header_post_title">[기업가정신 칼럼]친환경 코팅·천연 인테리어 프랜차이즈로 1인 기술창업시장을 선도하다, 아이메이드</h2>
                    <ul className="links">
                        <li>
                            <button className="icon_facebook_share ir_txt">페이스북 공유</button>
                        </li>
                        <li>
                            <button className="icon_kakao_share ir_txt">카카오 공유</button>
                        </li>
                    </ul>
                </div>
                <div className="header_post_info">
                    <p>
                        <i className="icon_upload_user"/>
                        <span>파이낸셜뉴스</span>
                    </p>
                    <p>
                        <i className="icon_upload_time"/>
                        <span>등록일자 2021.09.23. 오후 3:29</span>
                    </p>
                    <p>
                        <i className="icon_upload_time"/>
                        <span>입력일자 2021.09.23. 오후 3:29</span>
                    </p>
                    <p>
                        <i className="icon_upload_user"/>
                        <span>댓글 202</span>
                    </p>
                </div>
            </div>
            <div className="wrap_section">
                <div className="main_section">
                    <div className="main_section_content">
                        안녕하십니까.

                        반갑습니다. (사)서울국제만화애니메이션페스티벌 조직위원장 임용섭입니다.

                        SICAF는 세계인들에게 시·청각적 즐거움을 선사하는 문화축제입니다.

                        SICAF는 1995년에 전문 만화·애니메이션 제작사와 단체가 서로 협력하여 조직·구성한 우리나라의 자랑스러운 대표 만화·애니메이션 축제이며, 세계인의 축제입니다.

                        SICAF는 아시아 최초의 만화·애니메이션 융합 축제로써 플랫폼 역할을 통해 만화·애니메이션의 현재 트렌드를 알리며, 흐름과 미래의 방향을 가늠케 하는 역할을 했습니다. 또한, 이러한 SICAF의 시도는 일본, 중국 등의 유사 축제의 귀감이 되기도 하였습니다.

                        2021년 SICAF의 콘셉트는 '리셋 그리고 함께하는 즐거움'’입니다.

                        '리셋 그리고 함께하는 즐거움'은 전 세계인이 함께 코로나19를 슬기롭게 극복하고, 즐겁고 행복한 삶으로 환원하자’라는 것입니다.
                    </div>
                    <div className="main_section_report">
                        <div className="main_section_report_wrap">
                            <div className="main_section_report_info">
                                <img src={require('../../assets/image/common/ic-user-profile.svg').default} alt="기자 프로필 이미지" />
                                <h2 className="main_section_report_info_media">OOO미디어</h2>
                                <p className="main_section_report_info_email">webmasterOOOedia.com</p>
                            </div>
                            <Link to="#" className="btn_another_article">다른기사 더보기&nbsp;&nbsp;></Link>
                        </div>
                        <p className="main_section_report_copyright">저작권자 © OOO미디어 무단전재 및 재배포 금지</p>
                    </div>
                    <div className="main_section_another_news">
                        <div className="left_content">
                            <h2 className="title">당신이 안 본 뉴스</h2>
                            <ul className="list">
                                <li>
                                    <Link to="#">
                                        <p>구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <p>구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <p>구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <p>구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <p>구찌 티파니도 판다…한해 카톡으로 선물 3조 넘었다.</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="right_content">
                            <img src={require('../../assets/image/common/ic-menu.svg').default} alt="이미지" />
                            <p className="title">[단독] "페북관리 하라고 8천억 쏟아부은 꼴?"…청년 5만명 채용 디지털일자리 논란</p>
                        </div>
                    </div>
                    <div className="main_section_reply">
                        <h2 className="title">기사 댓글 <span className="count">(0)</span></h2>
                        <div className="editor">
                            <div className="editor_info">
                                <div className="editor_info_user">
                                    <img className="user_profile" src={require('../../assets/image/common/ic-user-profile.svg').default} alt="기자 프로필 이미지" />
                                    <p className="nickname">로그인해주세요</p>
                                </div>
                                <p className="word_count">0/400</p>
                            </div>
                            <textarea className="editor_input" placeholder="권리침해, 욕설 및 특정 대상을 비하하는 내용을 게시할 경우, 이용약관 및 관련법률에 의해 제해될 수 있습니다. 공공기기에서는 사용 후 로그아웃 해주세요."/>
                        </div>
                        <button className="btn_register">등록</button>
                    </div>
                </div>
                <SectionSide/>
            </div>
        </div>
    )
};

export default SectionEDetail;