import React, {useEffect, useState} from "react";
import "./css/AdminMemberInfoPopup.scss";
import AdminAPI from "../../api/admin";
import {MemberItemType} from "../../models/admin";
import {convertRankStateStr} from "../common/js/convertRankStateStr";
import {MediaInfoType} from "../../models/member";
import message from "../../const/message";

interface Props {
    show: boolean,
    onClickHide: () => void,
    idx: number,
    isEdit: boolean,
    callback?: () => void
}

function AdminMemberInfoPopup({show, onClickHide, idx, isEdit, callback}: Props) {
    const [member, setMember] = useState({} as MemberItemType);
    const [updateRank, setUpdateRank] = useState<number>(MediaInfoType.normalUser);
    
    useEffect(() => {
        if (idx) {
            AdminAPI.getMediaMemberInfo(idx).then((res: MemberItemType) => {
                setMember(res);
                setUpdateRank(res.rank);
            });
        }
    }, [idx]);

    const updateMediaMemberInfo = () => {
        AdminAPI.updateMediaMemberInfo(idx, updateRank).then(() => {
            alert(message.successChange);
            if (callback) callback();
            onClickHide();
        });
    }

    if (!show) return null;

    return (
        <div id="AdminMemberInfoPopup">
            <div className="head">
                <h2 className="title">회원정보 {isEdit ? '수정' : ''}</h2>
                <button className="icon_exit ir_txt" onClick={onClickHide}>닫기</button>
            </div>
            <div className="content">
                <div className="col col2">
                    <div className="row">
                        <h2>이름</h2>
                        <p>{member.name}</p>
                    </div>
                    <div className="row">
                        <h2>권한</h2>
                        {
                            isEdit
                            ?
                              <select value={updateRank} onChange={e => setUpdateRank(Number(e.target.value))}>
                                  <option value={MediaInfoType.normalUser}>{MediaInfoType.normalUserStr}</option>
                                  <option value={MediaInfoType.reporter}>{MediaInfoType.reporterStr}</option>
                              </select>
                            : <p>{convertRankStateStr(member.rank)}</p>
                        }
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <h2>아이디</h2>
                        <p>{member.id}</p>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <h2>이메일</h2>
                        <p>{member.email}</p>
                    </div>
                </div>
                <div className="col col2">
                    <div className="row">
                        <h2>전화번호</h2>
                        <p>{member.mobile_phone}</p>
                    </div>
                    <div className="row">
                        <h2>휴대폰</h2>
                        <p>{member.phone}</p>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <h2>가입일자</h2>
                        <p>{window.$Global.convertDate(member.created_at)}</p>
                    </div>
                </div>
                <div className="col col2">
                    <div className="row">
                        <h2>총 기사 수</h2>
                        <p className="count">{member.total_cnt || 0}개</p>
                    </div>
                    <div className="row">
                        <h2>업로드 기사 수</h2>
                        <p className="count">{member.approval_cnt || 0}개</p>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <h2>최근 기사</h2>
                        {
                            Boolean(member.recent_article?.length)
                            ?
                                <div>
                                    <p className="ellipsis">제목: {member.recent_article[0].title}</p>
                                    <p>생성일: {window.$Global.convertDate(member.recent_article[0].created_at)}</p>
                                    <p>조회수: {member.recent_article[0].hit}</p>
                                </div>
                            :   <p>없음</p>
                        }
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <h2>승인 요청 기사</h2>
                        <p>{member.pending_cnt || 0}개</p>
                    </div>
                </div>
            </div>
            <button className={isEdit ? 'btn_save' : `btn_confirm`} onClick={isEdit ? updateMediaMemberInfo : onClickHide}>{isEdit ? '변경' : '확인'}</button>
        </div>
    )
}

export default AdminMemberInfoPopup;