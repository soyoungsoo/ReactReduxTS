import React from "react";
import {Link} from "react-router-dom";
import "./css/ArticleList.scss";
import {ItemType} from "../../models/article";
import {getArticleURL} from "../common/js/getArticleURL";

interface Props {
    list: ItemType[]
}

function ArticleList({list}: Props) {
    return (
        <ul id="ArticleList">
            {
                list?.map(item => {
                    let link = getArticleURL(item.idx,  item.section_idx);
                    return (
                        <li key={item.idx} className="item">
                            {
                                item.thumbnail_key && <Link to={link}><img src={window.$Global.getImageCDN(item.thumbnail_key)} alt="기사 이미지"/></Link>
                            }
                            <div className="item_info">
                                <Link to={link} className="item_info_title">{item.title}</Link>
                                <p className="item_info_desc">{window.$Global.removeHTML(item.content)}</p>
                                <div className="item_info_upload_info">
                                    <p>{item.medium_section_name}</p>
                                    <p>
                                        <i className="icon_upload_user"/>기자명 {item.reporter_name}
                                    </p>
                                    <p>
                                        <i className="icon_upload_time"/>{window.$Global.convertDate(item.inserted_at)}
                                    </p>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default ArticleList;