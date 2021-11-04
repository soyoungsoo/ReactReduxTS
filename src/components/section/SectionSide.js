import React from "react";
import "./css/SectionSide.scss";
import SideArticleImageAndText from "../common/SideArticleImageAndText";
import SideArticleText from "../common/SideArticleText";

function SectionSide() {
    return (
        <div id="SectionSide">
            <SideArticleText/>
            <SideArticleImageAndText/>
        </div>
    );
}

export default SectionSide;