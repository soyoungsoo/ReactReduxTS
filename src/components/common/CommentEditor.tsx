import React, {useState} from "react";
import message from "../../const/message";

interface Props {
    idx: number,
    nickname?: string,
    isLogin: boolean,
    maxLength: number,
    addComment: (comment: string, idx: number) => void
}

function CommentEditor({idx, nickname, isLogin, maxLength, addComment}: Props) {
    const [comment, setComment] = useState("");

    const onChangeContent = (value: string) => {
        if (value.length > maxLength) {
            alert(message.notMaxLengthOver);
            return;
        }
        setComment(value);
    }

    const onClickAdd = (comment: string, idx: number) => {
        setComment("");
        addComment(comment, idx);
    }

    return (
        <>
            <div className="editor">
                <div className="editor_info">
                    <div className="editor_info_user">
                        <img className="user_profile" src={require('../../assets/image/common/ic-user-profile.svg').default} alt="유저 프로필 이미지"/>
                        <p className="nickname">{isLogin ? nickname : message.requireLogin}</p>
                    </div>
                    <p className="word_count">{comment.length}/{maxLength}</p>
                </div>
                <textarea className="editor_input" value={comment} onChange={e => onChangeContent(e.target.value)} placeholder={message.commentAlert}/>
            </div>
            <button className="btn_register" onClick={() => onClickAdd(comment, idx)}>등록</button>
        </>
    )
}

export default CommentEditor;