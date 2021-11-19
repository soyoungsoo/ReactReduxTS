import React from "react";
import "./css/SectionSide.scss";
import ArticleListImageAndText from "../common/ArticleListImageAndText";
import ArticleListText from "../common/ArticleListText";
import {ItemType} from "../../models/article";

interface Props {
    textData: ItemType[] | undefined,
    imgTextData: ItemType[] | undefined
}

function SectionSide({textData, imgTextData}: Props) {
    return (
        <div id="SectionSide">
            <ArticleListText data={textData}/>
            <ArticleListImageAndText data={imgTextData}/>
        </div>
    );
}

export default SectionSide;