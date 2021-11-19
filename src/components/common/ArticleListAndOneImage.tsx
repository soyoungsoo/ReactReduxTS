import React from "react";
import "./css/ArticleListAndOneImage.scss";
import {Link} from "react-router-dom";
import {getArticleURL} from "./js/getArticleURL";
import {ItemType} from "../../models/article";

interface Props {
    title: string
    list: ItemType[]
}

function ArticleListAndOneImage({title, list}: Props) {
    const existsList = Boolean(list?.length);
    const textList = list?.slice(0, 5);

    if (!existsList) return null;

    return (
        <div id="ArticleListAndOneImage">
            <div className="left_content">
                <h2 className="title">{title}</h2>
                    <ul className="list">
                        {
                            textList?.map(item => <li key={item.idx}><Link to={getArticleURL(item.idx, item.section_idx)}><p>{item.title}</p></Link></li>)
                        }
                    </ul>
                </div>
                {
                    (list?.length === 6 && list[5].thumbnail_key)
                    &&
                    <div className="right_content">
                        <Link to={getArticleURL(list[5].idx, list[5].section_idx)}>
                            {
                                list[5].thumbnail_key && <img src={window.$Global.getImageCDN(list[5].thumbnail_key)} alt="이미지" />
                            }
                            <p className="title">{list[5].title}</p>
						</Link>
                    </div>
                }
        </div>
    )
}
export default ArticleListAndOneImage;
