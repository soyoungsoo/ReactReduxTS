import React, {useEffect, useRef, useState} from "react";
import "./css/ReporterArticleAdd.scss";
import _ from "lodash";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import MemberAPI from "../../api/member";
import MediaAPI from "../../api/media";
import AdminAPI from "../../api/admin";
import ArticleAPI from "../../api/article";
import {JoinMediaItemType, MediaSectionChildType, MediaSectionType} from "../../models/media";
import {Article, FileItem, ImageItem, Temporary} from "../../models/article";
import validator from "../../util/validator";
import variable from "../../const/variable";
import message from "../../const/message";
import {useHistory} from "react-router";
import {EnumPopupType, PopupType} from "./interface/PopupType";
import {MediaInfoType, MemberType} from "../../models/member";

interface NewsAddType extends PopupType {
    editorHeight?: string
}

function ReporterArticleAdd({idx, type, editorHeight}: NewsAddType) {
    const history = useHistory();
    const fileRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<Editor>(null);
    const [article, setArticle] = useState<Article>({} as Article);
    const [mediaList, setMediaList] = useState<JoinMediaItemType[]>([]);
    const [mediaSectionList, setMediaSectionList] = useState<MediaSectionType[]>([]);
    const [selectMedia, setSelectMedia] = useState(0);
    const mediaSectionChildList:MediaSectionChildType[] = mediaSectionList.find(item => item.idx === selectMedia)?.child || [];
    const [selectMediaChild, setSelectMediaChild] = useState(0);

    const [selectThumbnail, setSelectThumbnail] = useState(""); // 선택한 썸네일 file_key
    const [imageList, setImageList] = useState<ImageItem[]>([]); // 추가한 이미지 목록
    const [uploadImageList, setUploadImageList] = useState<ImageItem[]>([]); // 서버에 저장된 이미지 목록

    const [fileList, setFileList] = useState<FileItem[]>([]); // 추가한 첨부파일 목록
    const [deleteFileList, setDeleteFileList] = useState<object[]>([]);
    const [titleRef, linkUrlRef] = [useRef(null), useRef(null)];
    const refs = [linkUrlRef, titleRef];
    const isEdit = type === EnumPopupType.Edit;
    const isView = type === EnumPopupType.View;

    const [memberMediaInfo, setMemberMediaInfo] = useState(MediaInfoType.normalUser);

    useEffect(() => {
        getJoinMediaList();
        getMediaSection();
        getMediaRank();
    }, []);

    useEffect(() => {
        getArticle();
    }, [idx, memberMediaInfo]);

    useEffect(() => {
        if (imageList.length === 1) { // 썸네일 인덱스가 이미지 리스트 개수보다 클 경우 0으로 초기화
            setSelectThumbnail(imageList[0].file_key);
        }
    }, [imageList]);

    const initData = (data: Article) => {
        setArticle(data);
        data.image_list?.forEach((item: ImageItem) => item.file_key = window.$Global.getImageCDN(item.file_key));
        setImageList(data.image_list || []);
        setUploadImageList(data.image_list);
        setSelectThumbnail(window.$Global.getImageCDN(data.thumbnail_key));
        setFileList(data.file_list || []);
        setSelectMedia(data.section_list[0]?.large_section_idx || 0);
        setSelectMediaChild(data.section_list[0]?.medium_section_idx || 0);
        editorRef.current?.getInstance().setHTML(data.content);
    }

    const getMediaRank = () => {
        MemberAPI.myInfo().then((res: MemberType) => setMemberMediaInfo(res.media_info.rank));
    };

    const getArticle = () => {
        if (idx && memberMediaInfo) {
            if (memberMediaInfo === MediaInfoType.reporter) {
                ArticleAPI.getArticle(idx).then((res: Article) => initData(res));
            } else if (memberMediaInfo === MediaInfoType.mediaMaster) {
                AdminAPI.getArticleInfo(idx).then((res: Article) => initData(res));
            }
        }
    }

    const getJoinMediaList = () => {
        MediaAPI.getJoinMediaList().then((res: JoinMediaItemType[]) => setMediaList(res));
    };

    const getMediaSection = () => {
        MediaAPI.getMediaSection().then((res: MediaSectionType[]) => setMediaSectionList(res));
    };

    const convertContent = async () => {
        let imageCDNList:ImageItem[] = await uploadImage() || [];
        let editorHTML = editorRef.current!.getInstance().getHTML();
        let image_list:any = [];

        if (imageCDNList.length) {
            imageCDNList.forEach((item, idx) => editorHTML = editorHTML.replaceAll(item.dataUri, window.$Global.getImageCDN(item.file_key)));
        }

        if (imageList.length) {
            imageList.forEach((item, idx) => {
                let find;
                let alreadyUpload = item.file_key.indexOf(variable.urlHttps) > -1;
                if (alreadyUpload) { // 이미 서버에 올라간 이미지일 경우
                    find = uploadImageList.find(uploadItem => item.file_key === uploadItem.file_key);
                } else { // 아직 서버에 올라가지 않은 이미지일 경우
                    find = imageCDNList.find(cdnItem => item.file_key === cdnItem.dataUri);
                }
                image_list.push({thumbnail: false, idx: find?.idx});
            });
            let thumbnailIndex = imageList.findIndex((item:ImageItem) => item.file_key === selectThumbnail);
            thumbnailIndex = thumbnailIndex ? thumbnailIndex : 0;
            image_list[thumbnailIndex].thumbnail = true;
        }

        return { content: editorHTML, image_list: image_list };
    };

    const addArticle = async (temporary: Temporary.Temporary | Temporary.Registration) => {
        if (validator.CheckRefValue(refs)) {
            if (selectMediaChild === 0) {
                alert(message.choiceSection);
                return;
            }
            let formData = new FormData();
            await setCommonFormData(formData, temporary);
            fileList.forEach(item => formData.append("file", item as Blob));

            await ArticleAPI.addArticle(formData).then(() => {
                alert(message.successADDArticle);
                history.go(0);
            });
        }
    }

    const updateArticle = async () => {
        if (validator.CheckRefValue(refs)) {
            if (idx) {
                let blobList = fileList.filter(item => (item instanceof Blob) && item);
                let formData = new FormData();

                await setCommonFormData(formData, Temporary.Registration);
                blobList.forEach(item => formData.append("file", item as Blob));
                formData.append("delete_file_list", JSON.stringify(deleteFileList));

                await ArticleAPI.updateArticle(idx, formData).then(() => {
                    alert(message.successSave);
                    history.go(0);
                });
            }
        }
    };

    const setCommonFormData = async (formData: FormData, temporary: number) => {
        let section_list = [{medium_section_idx: selectMediaChild}];
        let result = await convertContent();
        formData.append("section_list", JSON.stringify(section_list));
        formData.append("title", article.title);
        formData.append("sub_title", article.sub_title || "");
        formData.append("content", result.content);
        formData.append("link_url", article.link_url);
        formData.append("temporary", temporary.toString());
        formData.append("image_list", JSON.stringify(result.image_list));
        formData.append("inserted_at", article.inserted_at?.toString());
    }

    const onChangeFiles = (files: FileList | null) => {
        if (files) setFileList(fileList.concat(Array.from(files)))
    };

    const deleteFile = (file_idx: number, index: number) => {
        if (file_idx) {
            setDeleteFileList(deleteFileList.concat({idx: file_idx}));
        }
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
        let uploadList = imageList.filter(item => item.file_key.indexOf(variable.urlHttps) === -1); // 이미 서버에 저장된 이미지는 제외

        if (uploadList.length) {
            const formData = new FormData();
            uploadList.forEach(item => formData.append('image_file', window.$Global.dataURItoBlob(item.file_key)));
            return await ArticleAPI.uploadArticleImage(formData).then((res: ImageItem[]) => {
                uploadList.forEach((item, idx) => res[idx].dataUri = item.file_key);
                return res;
            });
        }
    };

    return (
        <div id="ReporterArticleAdd">
            <div className="form">
                <h2 className="title">기사 등록하기</h2>
                {/*<div className="field media">*/}
                {/*    <p className="field_title">미디어 선택</p>*/}
                {/*    <select className="media" disabled>*/}
                {/*        <option defaultChecked={true} hidden>선택</option>*/}
                {/*        {*/}
                {/*            mediaList.map((item, idx) => <option key={idx}>{item.domain}</option>)*/}
                {/*        }*/}
                {/*    </select>*/}
                {/*</div>*/}
                <div className="field">
                    <p className="field_title">섹션</p>
                    <div className="wrap_select">
                        <select value={selectMedia} onChange={e => setSelectMedia(Number(e.target.value))} disabled={isView}>
                            <option defaultChecked={true} hidden>선택</option>
                            {
                                mediaSectionList.map((item, idx) => <option key={idx} value={item.idx}>{item.name}</option>)
                            }
                        </select>
                        <select value={selectMediaChild} onChange={e => setSelectMediaChild(Number(e.target.value))} disabled={isView || !Boolean(mediaSectionChildList.length)}>
                            <option defaultChecked={true} hidden>선택</option>
                            {
                                mediaSectionChildList.map((item, idx) => <option key={idx} value={item.idx}>{item.name}</option>)
                            }
                        </select>
                        {/*<button className="icon_add ir_txt">추가</button>*/}
                    </div>
                </div>
                <div className="field">
                    <p className="field_title">기사 링크</p>
                    <input type="text" readOnly={isView} ref={linkUrlRef} data-name={"기사 링크"} className="full_size" placeholder={message.requireInput} value={article.link_url} onChange={e => setArticle({...article, link_url: e.target.value})}/>
                </div>
                <div className="field">
                    <p className="field_title">제목</p>
                    <input type="text" readOnly={isView} ref={titleRef} data-name={"제목"} className="full_size" placeholder={message.requireInput} value={article.title} onChange={e => setArticle({...article, title: e.target.value})}/>
                </div>
                <div className="field">
                    <p className="field_title">부제목</p>
                    <input type="text" readOnly={isView} className="full_size" value={article.sub_title} onChange={e => setArticle({...article, sub_title: e.target.value})}/>
                </div>
                <div className="field">
                    <p className="field_title">등록날짜</p>
                    <input type="date" readOnly={isView} value={window.$Global.convertDate(article.inserted_at)} onChange={e => setArticle({...article, inserted_at: new Date(e.target.value).getTime()})}/>
                </div>
                <div className="field">
                    {
                        !isView
                        ?
                            <Editor
                                initialEditType={'wysiwyg'}
                                language={'ko'}
                                toolbarItems={[
                                    ['heading', 'bold', 'italic'],
                                    ['strike', 'hr', 'quote', 'ul', 'ol', 'task'],
                                    ['table', 'image', 'link', 'code', 'codeblock']
                                ]}
                                ref={editorRef}
                                height={editorHeight || "650px"}
                                onChange={() => {
                                    let html = editorRef.current!.getInstance().getHTML();
                                    let src = html.match(new RegExp(variable.dataUriRegx + '|' + variable.imageCDNRegx, 'g'));
                                    let result = src?.map(item => {return {file_key: item}}) || [];
                                    setImageList(result as ImageItem[]);
                                }}
                                hooks={{
                                    addImageBlobHook: async (blob, callback) => {
                                        const upload = await uploadContentImage(blob);
                                        callback(upload);
                                        return false;
                                    }
                                }}
                            />
                        :   <div className="toastui-editor-contents" dangerouslySetInnerHTML={ {__html: article.content} }/>
                    }
                </div>
                <div className="btns">
                    {
                        !isView &&
                        (
                            isEdit
                            ?
                            <button className="btn_request" onClick={() => updateArticle()}>저장하기</button>
                            :
                            <>
                                <button className="btn_save" onClick={() => addArticle(Temporary.Temporary)}>임시 저장</button>
                                <button className="btn_request" onClick={() => addArticle(Temporary.Registration)}>승인 요청</button>
                            </>
                        )
                    }
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
                                    <li key={idx} className="lib_image_item" onClick={() => !isView && setSelectThumbnail(item.file_key)}>
                                        <img src={item.file_key} alt="썸네일 후보 이미지" />
                                        {
                                            selectThumbnail === item.file_key
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
                        <div className="inner">
                            <h2 className="lib_file_title">첨부파일</h2>
                            <p>최대 크기 200MB</p>
                        </div>
                        {
                            !isView && <button className="btn_add" onClick={() => fileRef.current?.click()}>등 록</button>
                        }
                        <input type="file" ref={fileRef} onChange={e => onChangeFiles(e.target.files)} multiple hidden/>
                    </div>
                    <ul className="lib_file_list">
                        {
                            fileList.map((item, idx) => {
                                return (
                                    <li key={idx} className="lib_file_item">
                                        <div className="info">
                                            <p className="filename">{item.name || item.file_name}</p>
                                            <p className="size">{window.$Global.convertFileSize(item.size || item.file_size)}</p>
                                        </div>
                                        {
                                            !isView && <button className="icon_exit ir_txt" onClick={() => deleteFile(item.idx || 0, idx)}>삭제</button>
                                        }
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

export default ReporterArticleAdd;