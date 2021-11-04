import React from "react";
import "./css/SectionE.scss";
import SectionSide from "./SectionSide";
import Article from "../common/Article";

function SectionE() {
    return (
        <div id="SectionE">
            <div className="main_content">
                <ul className="tab">
                    <li className="active">
                        <p>IP시장현황</p>
                    </li>
                    <li>
                        <p>IP거래시장</p>
                    </li>
                    <li>
                        <p>IP신규등록</p>
                    </li>
                </ul>

                <Article/>
            </div>
            <SectionSide/>
        </div>
    )
}

export default SectionE;