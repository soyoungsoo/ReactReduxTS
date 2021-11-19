import React from "react";
import message from "../../const/message";
import {ReplyItem} from "../../models/article";

interface Props {
    isLogin: boolean,
    myComment: boolean,
    item: ReplyItem,
    onClickShowToggle?: () => void,
    deleteComment: (reply_idx: number) => void
}

function CommentItem({isLogin, myComment, item, onClickShowToggle, deleteComment}: Props) {
    const deleted = Boolean(item.deleted);
    const showDeleteButton = (myComment && !deleted);

    return (
        <div className="comment_item">
            <div className="comment_head">
                <div className="user_info">
                    <img className="user_profile" src={require('../../assets/image/common/ic-user-profile.svg').default} alt="유저 프로필 이미지"/>
                    <p className="nickname">{isLogin ? item.id : message.requireLogin}</p>
                </div>
                <div className="comment_ctl">
                    <p>{window.$Global.convertTime(item.created_at)}</p>
                    {/*<button className="btn_report">신고하기</button>*/}
                    {
                        showDeleteButton
                        &&
						<>
							{/*<button className="btn_edit">수정</button>*/}
							<button className="btn_delete" onClick={() => deleteComment(item.idx)}>삭제</button>
						</>
                    }
                </div>
            </div>
            <p className={`comment_content ${deleted ? 'deleted' : ''}`}>
                {
                    deleted ? message.deletedComment : item.content
                }
            </p>
            {
                ((item.depth === 1) && (!deleted || item.reply_cnt !== 0))
                &&
				<div className="re_comment_ctl">
					<button onClick={onClickShowToggle}>{item.reply_cnt === 0 ? '답글 달기' : '답글'}</button>
					<p>({item.reply_cnt})</p>
				</div>
            }
        </div>
    );
}

export default CommentItem;