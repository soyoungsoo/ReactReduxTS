import React, {useEffect, useState} from "react";
import "./css/ArticleDetail.scss";
import {Link, useParams} from "react-router-dom";
import MediaAPI from "../../api/media/index";
import {ArticleView, ReplyItem, ReplyType} from "../../models/article";
import SectionSide from "../section/SectionSide";
import Comment from "../common/Comment";
import qs from "query-string";
import {useLocation} from "react-router";
import _ from "lodash";
import message from "../../const/message";
import ArticleListAndOneImage from "../common/ArticleListAndOneImage";

function ArticleDetail() {
    const count = 10;
    const [curPageComment, setCurPageComment] = useState(2);

    const location = useLocation();
    const {article_idx} = useParams<{article_idx: string}>();
    const section_idx = Number(qs.parse(location.search).section_idx || 0);
    const [article, setArticle] = useState<ArticleView>({} as ArticleView);

    useEffect(() => {
        MediaAPI.getMediaArticle(Number(article_idx), section_idx).then((res: ArticleView) => setArticle(res));
    }, [article_idx, section_idx]);

    if (window.$Global.isEmptyObject(article)) return null;

    const getComment = () => {
        let param = {
            page: curPageComment,
            count: count,
            section_idx: section_idx
        }
        MediaAPI.getCommentList(Number(article_idx), param).then((res: ReplyType) => {
            let copy = _.cloneDeep(article);
            copy.reply_list = res;
            copy.reply_list.items = article.reply_list.items.concat(res.items);
            setArticle(copy);
            setCurPageComment(curPageComment + 1);
        })
    };

    const getReplyList = (reply_idx: number, page?: number) => {
        let param = {
            page: page || 1,
            count: count,
            section_idx: section_idx
        }
        MediaAPI.getCommentChildList(Number(article_idx), reply_idx, param).then((res: ReplyType) => {
            let copy = _.cloneDeep(article);
            copy.reply_list.items.find((item: ReplyItem) => {
                if (item.idx === reply_idx) {
                    if (page === 1) { // 1일 경우 초기화
                        item.child = res;
                    } else {
                        let beforeList = item?.child?.items || [];
                        item.child = {...res, items: beforeList.concat(res.items)};
                    }
                    item.reply_cnt = res.total_count;
                }
            });
            copy.reply_list.total_count += 1;
            setArticle(copy);
        })
    }

    const addComment = (comment: string) => {
        if (article_idx)
        MediaAPI.addComment(Number(article_idx), section_idx, comment).then((res: ReplyItem) => {
            let copy = _.cloneDeep(article);
            let newCommentArr:ReplyItem[] = [res];
            copy.reply_list.items = newCommentArr.concat(copy.reply_list.items);
            copy.reply_list.total_count += 1;
            setArticle(copy);
        });
    }

    const addReComment = (comment: string, reply_idx: number) => {
        if (reply_idx) {
            MediaAPI.addReComment(Number(article_idx), section_idx, reply_idx, comment).then((res: ReplyItem) => {
                getReplyList(reply_idx, 1);
            });
        }
    }

    const deleteComment = (reply_idx: number) => {
        if (window.confirm(message.delete)) {
            MediaAPI.deleteComment(Number(article_idx), section_idx, reply_idx).then(() => {
                let copy = _.cloneDeep(article);
                let large_find = copy.reply_list.items.find(item => item.idx === reply_idx);
                let find = large_find;

                if (!large_find) {
                    copy.reply_list.items.forEach(item => find = item.child?.items.find(item2 => item2.idx === reply_idx));
                }

                if (find) {
                    find.deleted = 1;
                    setArticle(copy);
                }
            });
        }
    };

    return (
        <div id="ArticleDetail">
            <div className="header">
                <div className="header_post">
                    <h2 className="header_post_title">{article.title}</h2>
                    {/*<ul className="links">*/}
                    {/*    <li>*/}
                    {/*        <button className="icon_facebook_share ir_txt">페이스북 공유</button>*/}
                    {/*    </li>*/}
                    {/*    <li>*/}
                    {/*        <button className="icon_kakao_share ir_txt">카카오 공유</button>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </div>
                <div className="header_post_info">
                    <p>
                        <i className="icon_upload_user"/>
                        <span>{article.medium_section_name}</span>
                    </p>
                    <p>
                        <i className="icon_upload_time"/>
                        <span>등록일자 {window.$Global.convertDate(article.inserted_at)}</span>
                    </p>
                    <p>
                        <i className="icon_upload_time"/>
                        <span>입력일자 {window.$Global.convertDate(article.created_at)}</span>
                    </p>
                    <p>
                        <i className="icon_upload_user"/>
                        <span>댓글 {article.reply_list.total_count}</span>
                    </p>
                </div>
            </div>
            <div className="wrap_section">
                <div className="main_section">
                    <div className="toastui-editor-contents" dangerouslySetInnerHTML={ {__html: article.content} }/>
                    <div className="main_section_report">
                        <div className="main_section_report_wrap">
                            <div className="main_section_report_info">
                                <img src={require('../../assets/image/common/ic-user-profile.svg').default} alt="기자 프로필 이미지" />
                                <h2 className="main_section_report_info_media">{article.reporter_name}</h2>
                                <p className="main_section_report_info_email">{article.reporter_email}</p>
                            </div>
                            <Link to={`/reporter/${article.reporter_idx}`} className="btn_another_article">다른기사 더보기</Link>
                        </div>
                        <p className="main_section_report_copyright">저작권자 © {article.reporter_name} 무단전재 및 재배포 금지</p>
                    </div>
                    <ArticleListAndOneImage title="당신이 안 본 뉴스" list={article.not_seen}/>
                    <Comment list={article.reply_list} replyCount={article.reply_list.total_count} getComment={getComment} getReplyList={getReplyList} addComment={addComment} addReComment={addReComment} deleteComment={deleteComment}/>
                </div>
                <SectionSide textData={article.recent} imgTextData={article.popular}/>
            </div>
        </div>
    )
}

export default ArticleDetail;