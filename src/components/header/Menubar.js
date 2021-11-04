import React from "react";
import "./css/Menubar.scss";
import {Link} from "react-router-dom";

function Menubar() {
    return (
        <div id="Menubar">
            <ul className="depth1">
                <li>
                    HOME
                </li>
                <li>
                    Enhance News
                </li>
                <li>
                    Social Impact
                </li>
                <li>
                    Govermence
                </li>
                <li>
                    <div className="tool">
                        <button className="icon_menu ir_txt">목록 메뉴</button>
                        <button className="icon_search ir_txt">검색</button>
                    </div>
                </li>
            </ul>

            <ul className="depth2">
                <li className="tab">
                    <ul>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                    </ul>
                </li>
                <li className="tab active">
                    <ul>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                    </ul>
                </li>
                <li className="tab">
                    <ul>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                    </ul>
                </li>
                <li className="tab">
                    <ul>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                    </ul>
                </li>
                <li className="tab">
                    <ul>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                        <li>
                            <Link>회원가입</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Menubar;