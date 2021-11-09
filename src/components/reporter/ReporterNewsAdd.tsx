import React, {useEffect, useRef, useState} from "react";
import "./css/ReporterNewsAdd.scss";
import _ from "lodash";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import MediaAPI from "../../api/media/index";
import ArticleAPI from "../../api/article/index";
import {JoinMediaItemType, MediaSectionChildType, MediaSectionType} from "../../models/media";
import {Article, ImageList, Temporary} from "../../models/Article";
import validator from "../../util/validator";
import variable from "../../const/variable";
import message from "../../const/message";

function ReporterNewsAdd() {
    const fileRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<Editor>(null);
    const [article, setArticle] = useState<Article>({} as Article);
    const [mediaList, setMediaList] = useState<JoinMediaItemType[]>([]);
    const [mediaSectionList, setMediaSectionList] = useState<MediaSectionType[]>([]);
    const [selectMedia, setSelectMedia] = useState(0);
    const mediaSectionChildList:MediaSectionChildType[] = mediaSectionList.find(item => item.idx === selectMedia)?.child || [];
    const [selectMediaChild, setSelectMediaChild] = useState(0);

    const [selectThumbnail, setSelectThumbnail] = useState(0); // 선택한 썸네일 인덱스
    const [imageList, setImageList] = useState<string[]>([]); // 이미지 목록
    const [fileList, setFileList] = useState<File[]>([]); // 첨부파일 목록

    const [titleRef, subTitleRef, linkUrlRef, insertedAtRef] = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const refs = [linkUrlRef, titleRef, subTitleRef, insertedAtRef];

    useEffect(() => {
        getJoinMediaList();
        getMediaSection();
    }, []);

    const getConvertContent = async () => {
        let imageCDNList:ImageList[] = await uploadImage() || [];
        let editorHTML = editorRef.current!.getInstance().getHTML();
        let image_list = [];

        if (imageCDNList.length) {
            imageCDNList.forEach((item, idx) => editorHTML = editorHTML.replaceAll(imageList[idx], window.$Global.getImageCDN(item.file_key)));
            imageCDNList[selectThumbnail].thumbnail = true;
            image_list = imageCDNList.map((item, idx) => {
                let result: any = {idx: item.idx};
                if (selectThumbnail === idx) result.thumbnail = true;
                return result;
            });
        }
        return {
            content: editorHTML,
            image_list: image_list
        }
    };

    const getJoinMediaList = async () => {
        let result = await MediaAPI.getJoinMediaList();
        if (result.status === 200) setMediaList(result.data);
    };

    const getMediaSection = async () => {
        let result = await MediaAPI.getMediaSection();
        if (result.status === 200) setMediaSectionList(result.data);
    };

    const addArticle = async (temporary: Temporary.Temporary | Temporary.Registration) => {
        if (validator.CheckRefValue(refs)) {
            if (selectMediaChild === 0) {
                alert(message.choiceSection);
                return;
            }
            let section_list = [{medium_section_idx: selectMediaChild}];
            let resultContent = await getConvertContent();
            let formData = new FormData();

            // formData.append("section_list", JSON.stringify(section_list));
            formData.append("title", article.title);
            formData.append("sub_title", article.sub_title);
            formData.append("content", resultContent.content);
            formData.append("link_url", article.link_url);
            formData.append("temporary", temporary.toString());
            formData.append("image_list", JSON.stringify(resultContent.image_list));
            // formData.append("video_list", article.video_list);
            formData.append("inserted_at", article.inserted_at.toString());
            fileList.forEach(item => formData.append("file", item));

            let result = await ArticleAPI.addArticle(formData);
            if (result.status === 200) console.log(result.data);
        }
    }

    const onChangeFiles = (files: FileList | null) => {
        if (files) setFileList(fileList.concat(Array.from(files)))
    };

    const deleteFile = (index: number) => {
        let copy = _.cloneDeep(fileList);
        copy.splice(index,1);
        setFileList(copy);
    };

    const uploadContentImage = (blob: Blob)=> {
        let extend = blob.type.substr(blob.type.lastIndexOf("/") + 1);
        if (variable.imgTypeRegx.test(extend.toString())) {
            return window.$Global.readImage(blob).then((img: string) => img);
        } else {
            alert(message.onlyImageFile);
        }
    };

    const uploadImage = async () => {
        if (imageList.length) {
            const formData = new FormData();
            imageList.forEach(item => formData.append('image_file', window.$Global.dataURItoBlob(item)));

            let result = await ArticleAPI.uploadArticleImage(formData);
            if (result.status === 200) return result.data;
        }
    };

    return (
        <div id="ReporterNewsAdd">
            <div className="form">
                <h2 className="title">기사 등록하기</h2>
                <div className="field">
                    <p className="field_title">미디어 선택</p>
                    <select className="media" disabled>
                        <option defaultChecked={true} hidden>선택</option>
                        {
                            mediaList.map((item, idx) => <option key={idx}>{item.domain}</option>)
                        }
                    </select>
                </div>
                <div className="field">
                    <p className="field_title">섹션 추가</p>
                    <div className="wrap_select">
                        <select onChange={e => setSelectMedia(Number(e.target.value))} disabled>
                            <option defaultChecked={true} hidden>선택</option>
                            {
                                mediaSectionList.map((item, idx) => <option value={item.idx}>{item.name}</option>)
                            }
                        </select>
                        <select onChange={e => setSelectMediaChild(Number(e.target.value))} disabled={!Boolean(mediaSectionChildList.length)}>
                            <option defaultChecked={true} hidden>선택</option>
                            {
                                mediaSectionChildList.map((item, idx) => <option>{item.name}</option>)
                            }
                        </select>
                        {/*<button className="icon_add ir_txt">추가</button>*/}
                    </div>
                </div>
                <div className="field">
                    <p className="field_title">기사 링크</p>
                    <input type="text" ref={linkUrlRef} data-name={"기사 링크"} className="full_size" placeholder="입력하세요" value={article.link_url} onChange={e => setArticle({...article, link_url: e.target.value})}/>
                </div>
                <div className="field">
                    <p className="field_title">제목</p>
                    <input type="text" ref={titleRef} data-name={"제목"} className="full_size" placeholder="입력하세요" value={article.title} onChange={e => setArticle({...article, title: e.target.value})}/>
                </div>
                <div className="field">
                    <p className="field_title">부제목</p>
                    <input type="text" ref={subTitleRef} data-name={"부제목"} className="full_size" placeholder="입력하세요" value={article.sub_title} onChange={e => setArticle({...article, sub_title: e.target.value})}/>
                </div>
                <div className="field">
                    <p className="field_title">입력날짜</p>
                    <input type="date" ref={insertedAtRef} data-name={"입력날짜"} placeholder="입력하세요" value={window.$Global.convertDate(article.inserted_at)} onChange={e => setArticle({...article, inserted_at: new Date(e.target.value).getTime()})}/>
                </div>
                <div className="field">
                    <Editor
                        initialValue={""}
                        placeholder={'기사 내용을 입력해주세요'}
                        initialEditType={'wysiwyg'}
                        language={'ko'}
                        toolbarItems={[
                            ['heading', 'bold', 'italic'],
                            ['strike', 'hr', 'quote', 'ul', 'ol', 'task'],
                            ['table', 'image', 'link', 'code', 'codeblock']
                        ]}
                        ref={editorRef}
                        height="650px"
                        onChange={() => {
                            let html = editorRef.current!.getInstance().getHTML();
                            let src = html.match(new RegExp(variable.dataUriRegx, 'g'));
                            if (src) setImageList(src as string[]);
                        }}
                        hooks={{
                            addImageBlobHook: async (blob, callback) => {
                                const upload = await uploadContentImage(blob);
                                callback(upload);
                                return false;
                            }
                        }}
                    />
                </div>

                <div className="btns">
                    <button className="btn_save" onClick={() => addArticle(Temporary.Temporary)}>임시 저장</button>
                    <button className="btn_request" onClick={() => addArticle(Temporary.Registration)}>승인 요청</button>
                </div>
            </div>
            <div className="library">
                <h2 className="title">라이브러리</h2>
                <div className="lib_image_area">
                    <h2 className="lib_image_title">이미지</h2>
                    <ul className="lib_image_list">
                        {
                            imageList?.map((item, idx) => {
                                return (
                                    <li key={idx} className="lib_image_item" onClick={() => setSelectThumbnail(idx)}>
                                        <img src={item} alt="썸네일 후보 이미지" />
                                        {
                                            selectThumbnail === idx
                                            &&
											<div className="thumbnail">
												<p>썸네일</p>
											</div>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="lib_file_area">
                    <div className="head">
                        <h2 className="lib_file_title">첨부파일</h2>
                        <button className="btn_add" onClick={() => fileRef.current?.click()}>등 록</button>
                        <input type="file" ref={fileRef} onChange={e => onChangeFiles(e.target.files)} multiple hidden/>
                    </div>
                    <ul className="lib_file_list">
                        {
                            fileList.map((item, idx) => {
                                return (
                                    <li key={idx} className="lib_file_item">
                                        <div className="info">
                                            <p className="filename">{item.name}</p>
                                            <p className="size">{window.$Global.convertFileSize(item.size)}</p>
                                        </div>
                                        <button className="icon_exit ir_txt" onClick={() => deleteFile(idx)}>닫기</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ReporterNewsAdd;