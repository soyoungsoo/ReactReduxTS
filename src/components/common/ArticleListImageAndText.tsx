import React from "react";
import {Link} from "react-router-dom";
import "./css/ArticleListImageAndText.scss";
import {ItemType} from "../../models/article";
import {getArticleURL} from "./js/getArticleURL";

interface Props {
    data: ItemType[] | undefined
}

function ArticleListImageAndText({data}: Props) {
    let list = data?.slice(0, 5);
    if (!list?.length) return null;
    return (
        <div id="ArticleListImageAndText">
            <h2 className="side_title">인기 기사</h2>
            <ul className="list">
                {
                    list.map((item, idx) => {
                        return (
                            <li key={item.idx}>
                                <Link to={getArticleURL(item.idx,  item.section_idx)}>
                                    <p className="rank">{idx + 1}</p>
                                    <p className="title">{item.title}</p>
                                    {
                                        item.thumbnail_key && <img src={window.$Global.getImageCDN(item.thumbnail_key)} alt="인기 기사 이미지"/>
                                    }
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default ArticleListImageAndText;