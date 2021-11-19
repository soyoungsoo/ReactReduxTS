import React, {useEffect, useState} from "react";
import "./css/DashBoardTab.scss";
import {useHistory} from "react-router";
import {Tab} from "../mypage/interface/Tab";

export interface Props {
    tab: Tab
    activeDepth1: number
    activeDepth2: number
}

function DashBoardTab({tab, activeDepth1, activeDepth2}: Props) {
    const history = useHistory();
    const [depth1, setDepth1] = useState(activeDepth1);
    const [depth2, setDepth2] = useState(activeDepth2);

    useEffect(() => {
        let query = tab.list[depth1].query;
        let url = tab.list[depth1].query.length ? query[depth2] : '';
        history.push(`?depth1=${depth1}&depth2=${depth2}${url}`);
    }, [depth1, depth2]);

    return (
        <div id="DashBoardTab">
            <div className="dash_title">{tab.title}</div>
            <ul className="tab_list">
                {
                    tab.list.map((item, idx) => {
                        return (
                            <li key={idx} className={`tab_item ${activeDepth1 === idx ? 'active' : ''}`} onClick={() => setDepth1(idx)}>
                                <h2 className="tab_title">{item.title}</h2>
                                <ul className="child_tab_list">
                                    {
                                        item.child.map((item2, idx2) => <li key={idx2} className={`child_tab_item ${activeDepth2 === idx2 ? 'active' : ''}`} onClick={() => setDepth2(idx2)}>{item2}</li>)
                                    }
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default DashBoardTab;