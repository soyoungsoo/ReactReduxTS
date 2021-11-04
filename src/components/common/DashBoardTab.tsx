import React from "react";
import "./css/DashBoardTab.scss";

export interface Props {
    tab: Tab;
    activeDepth1: number;
    activeDepth2: number;
};

export interface Tab {
    title: string;
    list: Item[];
};

export interface Item {
    title: string;
    child: string[]
}

function DashBoardTab({tab, activeDepth1, activeDepth2}: Props) {
    return (
        <div id="DashBoardTab">
            <div className="dash_title">{tab.title}</div>
            <ul className="tab_list">
                {
                    tab.list.map((item, idx) => {
                        return (
                            <li className={`tab_item ${activeDepth1 == idx ? 'active' : ''}`}>
                                <h2 className="tab_title">{item.title}</h2>
                                <ul className="child_tab_list">
                                {
                                    item.child.map((item2, idx2) => <li className={`child_tab_item ${activeDepth2 == idx2 ? 'active' : ''}`}>{item2}</li>)
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