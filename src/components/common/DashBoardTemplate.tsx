import React, {useEffect} from "react";
import "./css/DashBoardTemplate.scss";
import ArticleAPI from "../../api/article/index"

export interface Props {
    title: string;
    Component: () => React.ReactElement;
}

function DashBoardTemplate({title, Component} :Props) {
    return (
        <div id="DashBoardTemplate">
            <div className="dashBoard_title">{title}</div>
            <Component/>
        </div>
    )
}

export default DashBoardTemplate;