import React, {useState} from "react";
import Pagination from "../common/Pagination";
import "./css/ReporterArticleList.scss";
import {convertArticleStateStr} from "../common/js/convertArticleStateStr";
import withNewsList from "./withNewsList";
import {ItemType} from "../../models/article";
import {GetNewsListType} from "./interface/GetNewsListType";
import ArticlePopup from "../common/ArticlePopup";
import {EnumPopupType, PopupType} from "./interface/PopupType";
import DashBoardListHead from "../common/DashBoardListHead";

function ReporterArticleList(props: GetNewsListType) {
    const [popupShow, setPopupShow] = useState(false);
    const [popupType, setPopupType] = useState<PopupType>({idx: 0, type: "VIEW"});

    const onClickPopupShow = (idx: number, type: string) => {
        if (EnumPopupType.Edit === type) {
            setPopupType({...popupType, idx: idx, type: "EDIT"});
        } else {
            setPopupType({...popupType, idx: idx, type: "VIEW"});
        }
        setPopupShow(true);
    };

    return (
        <>
            <div id="ReporterArticleList">
                <div className="list_title">기사 리스트</div>
                <DashBoardListHead checkbox={false} count={props.list.total_count} countTxt={"총 기사 수"} initKeyword={props.keyword} searchType={props.searchType}
                                   setSearchType={props.setSearchType} searchAPI={props.searchList}
                />
                <table>
                    <caption className="ir_txt">임시 저장 기사 목록</caption>
                    <colgroup>
                        <col width="5%"/>
                        <col width="55%"/>
                        <col width="5%"/>
                        <col width="15%"/>
                        <col width="10%"/>
                        <col width="15%"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>번 호</th>
                        <th>기사 제목</th>
                        <th>기사 작성</th>
                        <th>생성 일자</th>
                        <th>입력 일자</th>
                        <th>비 고</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.list.items?.map((item: ItemType, idx: number) => {
                            return (
                                <tr key={item.idx}>
                                    <td>{props.list.total_count - idx - ((props.page - 1) * props.count)}</td>
                                    <td>{item.title}</td>
                                    <td>{convertArticleStateStr(item.state)}</td>
                                    <td>{window.$Global.convertDate(item.created_at)}</td>
                                    <td>{window.$Global.convertDate(item.inserted_at)}</td>
                                    <td>
                                        <div className="btns">
                                            <button className="btn_edit ir_txt" onClick={() => onClickPopupShow(item.idx, EnumPopupType.Edit)}>수정 버튼</button>
                                            <button className="btn_more ir_txt" onClick={() => onClickPopupShow(item.idx, EnumPopupType.View)}>기사 더보기 버튼</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <Pagination curPage={props.page} lastNum={props.list.last} onClick={props.changePage} />
            </div>
            <ArticlePopup show={popupShow} setShow={setPopupShow} idx={popupType.idx} type={popupType.type}/>
        </>
    )
}

export default withNewsList(ReporterArticleList);