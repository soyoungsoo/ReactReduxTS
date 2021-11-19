import React from "react";
import ReporterArticleAdd from "../reporter/ReporterArticleAdd";
import "./css/ArticlePopup.scss";
import {EnumPopupType, PopupType} from "../reporter/interface/PopupType";

interface PopupProps extends PopupType {
    show: boolean,
    setShow: (show:boolean) => void
}

function ArticlePopup({show, setShow, idx, type}: PopupProps) {
    if (!show) return null;
    const title = (type === EnumPopupType.Edit && '수정') || (type === EnumPopupType.View && '상세보기')

    const onClickPopupClose = () => setShow(false);

    return (
        <div id="ArticlePopup">
            <div className="popup_head">
                <h2>{title}</h2>
                <button className="icon_exit ir_txt" onClick={onClickPopupClose}>팝업 닫기</button>
            </div>
            <ReporterArticleAdd idx={idx} type={type} editorHeight={"300px"}/>
        </div>
    )
}

export default ArticlePopup;