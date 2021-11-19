import React from "react";
import {Link} from "react-router-dom";
import ArticleList from "../common/ArticleList";
import {ItemType} from "../../models/article";

interface Props {
    title: string
    url: string
    list: ItemType[]
}

function ArticleAreaItem({title, url, list}: Props) {
    let data = list?.slice(0, 4);
    return (
        <div className="article_area">
            <div className="area_head">
                <h2 className="title">{title}</h2>
                <Link to={url}>
                    <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                </Link>
            </div>
            <ArticleList list={data}/>
        </div>
    )
}

export default ArticleAreaItem;