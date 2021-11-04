import React, {useEffect} from "react";
import { RouteComponentProps } from 'react-router-dom';
import DashBoardTab from "../common/DashBoardTab";
import DashBoardTemplate from "../common/DashBoardTemplate";
import ReporterNewsAdd from "./ReporterNewsAdd";
import qs from "query-string";
import ReporterNewsSaveList from "./ReporterNewsSaveList";
import ReporterNewsList from "./ReporterNewsList";

function ReporterContainer({location}: RouteComponentProps) {
    const type = Number(qs.parse(location.search).type || 1);

    const isAdd = type === 1;
    const isNewsSave = type === 2;
    const isNewsList = type === 3;

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

    return (
        <div id="ReporterContainer" style={{display: "flex"}}>
            <DashBoardTab tab={dashBoardTab} activeDepth1={0} activeDepth2={0}/>
            {/*<DashBoardTemplate title="기사 관리" Component={ReporterNewsAdd}/>*/}
            {/*<DashBoardTemplate title="기사 관리" Component={ReporterNewsSaveList}/>*/}
            <DashBoardTemplate title="기사 관리" Component={ReporterNewsList}/>
        </div>
    )
}

export default ReporterContainer;