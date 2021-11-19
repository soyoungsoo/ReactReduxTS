import React, {useState} from "react";
import "./css/ReporterArticleSaveList.scss";
import Pagination from "../common/Pagination";
import {ItemType} from "../../models/article";
import ArticleAPI from "../../api/article";
import _ from "lodash";
import message from "../../const/message";
import withNewsList from "./withNewsList";
import ArticlePopup from "../common/ArticlePopup";
import {PopupType} from "./interface/PopupType";
import {GetNewsListType} from "./interface/GetNewsListType";
import DashBoardListHead from "../common/DashBoardListHead";

function ReporterArticleSaveList(props: GetNewsListType) {
    const initCheckList = new Array(props.list.items?.length).fill(false);
    const [allCheck, setAllCheck] = useState(false);
    const [checkList, setCheckList] = useState(initCheckList);
    const [popupShow, setPopupShow] = useState(false);
    const [popupType, setPopupType] = useState<PopupType>({idx: 0, type: "EDIT"});

    const deleteArticle = (idx: number) => {
        if (window.confirm(message.delete)) {
            ArticleAPI.deleteArticle(idx).then(() => props.getList());
        }
    };

    const deleteArticleList = () => {
        let deleteList = checkList.filter(item => item);

        if (!deleteList.length) {
            alert(message.choiceArticleOneMore);
            return;
        }
        ArticleAPI.deleteArticleList(deleteList).then(() => {
            props.getList();
            setCheckList(initCheckList);
            setAllCheck(false);
        });
    };

    const onChangeCheckList = (index: number, idx: number) => {
        let copy = _.cloneDeep(checkList);
        copy[index] = copy[index] ? false : idx;
        setCheckList(copy);
    }

    const onChangeAllCheck = (event: HTMLInputElement) => {
        let allList = initCheckList;
        if (event.checked) {
            allList = props.list.items.map((item: ItemType, idx: number) => props.list.items[idx].idx);
        }
        setAllCheck(event.checked);
        setCheckList(allList);
    };

    const onClickPopupShow = (idx: number) => {
        setPopupType({...popupType, idx: idx});
        setPopupShow(true);
    };

    return (
        <>
            <div id="ReporterArticleSaveList">
                <div className="saveList_title">임시 저장 기사</div>
                <DashBoardListHead checkbox={true} allCheck={allCheck} count={props.list.total_count} countTxt={'총 임시 기사 수'} initKeyword={props.keyword} searchType={props.searchType}
                                   setSearchType={props.setSearchType} searchAPI={props.searchList} onChangeAllCheck={onChangeAllCheck} onDelete={deleteArticleList}
                />
                <table>
                    <caption className="ir_txt">임시 저장 기사 목록</caption>
                    <colgroup>
                        <col width="3%"/>
                        <col width="7%"/>
                        <col width="60%"/>
                        <col width="10%"/>
                        <col width="15%"/>
                        <col width="5%"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>선 택</th>
                        <th>번 호</th>
                        <th>기사 제목</th>
                        <th>생성 일자</th>
                        <th>기사 작성</th>
                        <th>삭 제</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.list.items?.map((item:ItemType, idx: number) => {
                            return (
                                <tr key={idx}>
                                    <td>
                                        <input type="checkbox" checked={Boolean(checkList[idx])} onChange={() => onChangeCheckList(idx, item.idx)}/>
                                    </td>
                                    <td>{props.list.total_count - idx - ((props.page - 1) * props.count)}</td>
                                    <td>{item.title}</td>
                                    <td>{window.$Global.convertDate(item.created_at)}</td>
                                    <td>
                                        <button className="btn_write ir_txt" onClick={() => onClickPopupShow(item.idx)}>상세내역 작성하기 버튼</button>
                                    </td>
                                    <td>
                                        <button className="btn_del" onClick={() => deleteArticle(item.idx)}>삭제</button>
                                    </td>
                                </tr>
                            )
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

export default withNewsList(ReporterArticleSaveList);