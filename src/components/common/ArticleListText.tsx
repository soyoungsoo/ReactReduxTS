import React from "react";
import {Link} from "react-router-dom";
import "./css/ArticleListText.scss";
import {ItemType} from "../../models/article";
import {getArticleURL} from "./js/getArticleURL";

interface Props {
    data: ItemType[] | undefined,
}

function ArticleListText({data}: Props) {
    let list = data?.slice(0, 5);
    if (!list?.length) return null;
    return (
        <div id="ArticleListText">
            <h2 className="side_title">최신 뉴스</h2>
            <ul className="list">
                {
                    list.map(item => <li key={item.idx}><Link to={getArticleURL(item.idx,  item.section_idx)}>{item.title}</Link></li>)
                }
            </ul>
        </div>
    )
}

export default ArticleListText;