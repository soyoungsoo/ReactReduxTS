import React from "react";
import {useLocation} from "react-router";
import qs from "query-string";
import {MediaInfoType} from "../../models/member";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {dashBoardTab} from "./dashBoardTab";
import DashBoardTab from "../common/DashBoardTab";
import DashBoardTemplate from "../common/DashBoardTemplate";
import {Tab} from "./interface/Tab";

function MyPageContainer() {
    const location = useLocation();
    const query = qs.parse(location.search);
    const depth1 = Number(query.depth1 || 0);
    const depth2 = Number(query.depth2 || 0);

    const memberInfo = useSelector((state: RootState) => state.member);
    const rank = memberInfo.media_info?.rank;

    let rankType = MediaInfoType.normalUser;

    if (MediaInfoType.reporter === rank) {
        rankType = MediaInfoType.reporter
    } else if (MediaInfoType.mediaMaster === rank) {
        rankType = MediaInfoType.mediaMaster
    }

    const boardTab:Tab = dashBoardTab[rankType] as Tab;
    const childTitle = boardTab.list[depth1]?.child[depth2];
    const Component = boardTab.list[depth1]?.component[depth2];

    let props = {};
    if (MediaInfoType.mediaMaster === rank) {props = {title: childTitle}}

    if (!Component) return null;

    return (
        <div id="MyPageContainer" style={{display: "flex"}}>
            <DashBoardTab tab={boardTab} activeDepth1={depth1} activeDepth2={depth2}/>
            <DashBoardTemplate title={boardTab.list[depth1]?.title} Component={() => <Component {...props}/>}/>
        </div>
    )
}

export default MyPageContainer;