import React, {useEffect, useState} from "react";
import "./css/Comment.scss";
import {ReplyItem, ReplyType} from "../../models/article";
import MemberAPI from "../../api/member/index";
import CommentItem from "./CommentItem";
import CommentEditor from "./CommentEditor";
import {MemberType} from "../../models/member";

interface Props {
    list: ReplyType
    replyCount: number,
    getComment: () => void,
    getReplyList: (reply_idx: number, page?: number) => void,
    addComment: (comment: string) => void,
    addReComment: (comment: string, reply_idx: number) => void,
    deleteComment: (reply_idx: number) => void
}

function Comment({list, replyCount, getComment, getReplyList, addComment, addReComment, deleteComment}: Props) {
    const maxCommentLength = 400;
    const isLogin = Boolean(sessionStorage.getItem("token"));

    const [loginUserId, setLoginUserId] = useState("");
    const myComment = Boolean(loginUserId);

    const parentComment = list.items.filter(item => item.depth === 1);
    const [replyShowList, setReplyShowList] = useState(new Array(parentComment.length).fill(false));
    const hasMore = list.page < list.last;

    useEffect(() => {
        if (isLogin) MemberAPI.myInfo().then((data: MemberType) => setLoginUserId(data.id));
    }, []);

    const onClickShowToggle = (idx: number, reply_idx?: number) => {
        let copy = replyShowList.concat();
        copy[idx] = !copy[idx];
        setReplyShowList(copy);
        if (reply_idx) {
            let hasChild = Boolean(list.items.find((item: ReplyItem) => item.idx === reply_idx)?.child?.items.length); // 이미 댓글을 호출했을 경우 (호출한 뒤에 달리는 댓글은 가져오지 못함)
            if (!hasChild) {
                getReplyList(reply_idx);
            }
        }
    }

    return (
        <div id="Comment">
            <div className="input_comment">
                <h2 className="title">기사 댓글 <span className="count">({replyCount})</span></h2>
                <CommentEditor idx={0} nickname={loginUserId} isLogin={isLogin} maxLength={maxCommentLength} addComment={addComment}/>
            </div>
            <ul className="comment_list">
                {
                    parentComment.map((item, idx) => {
                        const child = item.child;
                        const nextPage = child?.page + 1;
                        const hasMoreReply = child?.last > child?.page;
                        const deleted = Boolean(item.deleted);
                        return (
                            <li key={item.idx}>
                                <CommentItem isLogin={isLogin} myComment={myComment} item={item} onClickShowToggle={() => onClickShowToggle(idx, item.idx)} deleteComment={deleteComment}/>
                                {
                                    replyShowList[idx]
                                    &&
									<ul className="re_comment_list">
                                        {
                                            child?.items.map((item, idx) => {
                                                return <li key={idx}><CommentItem isLogin={isLogin} myComment={myComment} item={item} deleteComment={deleteComment}/></li>
                                            })
                                        }
                                        {
                                            hasMoreReply
                                            &&
											<button className="btn_more" onClick={() => getReplyList(item.idx, nextPage)}>
												<span>더보기</span>
												<i className="icon_arrow_bottom_more"/>
											</button>
                                        }
                                        {
                                            !deleted
                                            &&
											<li className="input_my">
												<CommentEditor idx={item.idx} nickname={loginUserId} isLogin={isLogin} maxLength={maxCommentLength} addComment={addReComment}/>
											</li>
                                        }
                                        {
                                            child?.items.length > 1
                                            &&
											<button className="btn_hide" onClick={() => onClickShowToggle(idx)}>
												<span>답글 접기</span>
												<i className="icon_arrow_top_more"/>
											</button>
                                        }
									</ul>
                                }
                            </li>
                        )
                    })
                }
            </ul>
            {
                hasMore
                &&
				<button className="btn_more" onClick={getComment}>
					<span>더보기</span>
					<i className="icon_arrow_bottom_more"/>
				</button>
            }
        </div>
    )
}

export default Comment;