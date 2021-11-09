import React, {useEffect} from "react";
import DashBoardTab from "../common/DashBoardTab";
import DashBoardTemplate from "../common/DashBoardTemplate";
import ReporterNewsAdd from "./ReporterNewsAdd";
import qs from "query-string";
import ReporterNewsSaveList from "./ReporterNewsSaveList";
import ReporterNewsList from "./ReporterNewsList";
import {useHistory, useLocation} from "react-router";

function ReporterContainer() {
    const history = useHistory();
    const location = useLocation();
    const depth2 = Number(qs.parse(location.search).depth2 || 0);
    const isAdd = depth2 === 0;
    const isNewsSave = depth2 === 1;
    const isNewsList = depth2 === 2;

    let dashBoardTab = {
        title: "기자 대시보드",
        list: [
            {
                title: "기사 관리",
                child: ["기사 작성", "임시 저장 기사", "기사 목록"]
            },
            // {
            //     title: "보고서",
            //     child: []
            // }
        ]
    };

    useEffect(() => {
        // window.onbeforeunload = () => true;
    }, []);

    const onChangeMenuTab = (depth: number) => {
        history.push(`?depth2=${depth}`);
    }

    return (
        <div id="ReporterContainer" style={{display: "flex"}}>
            <DashBoardTab tab={dashBoardTab} activeDepth1={0} activeDepth2={depth2} onChangeMenuTab={onChangeMenuTab}/>
            {
                isAdd && <DashBoardTemplate title={dashBoardTab.list[0].title} Component={ReporterNewsAdd}/>
            }
            {
                isNewsSave && <DashBoardTemplate title={dashBoardTab.list[0].title} Component={ReporterNewsSaveList}/>
            }
            {
                isNewsList && <DashBoardTemplate title={dashBoardTab.list[0].title} Component={ReporterNewsList}/>
            }
        </div>
    )
}

export default ReporterContainer;