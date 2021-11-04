import React, {useEffect, useRef, useState} from "react";
import "./css/ReporterNewsAdd.scss";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';

function ReporterNewsAdd() {
    const editorRef = useRef<Editor>(null);

    useEffect(() => {
        console.log(editorRef.current);
        console.log(editorRef.current!.getInstance());
        console.log(editorRef.current!.getInstance().getHTML());
        // editorRef.current
    }, [editorRef]);

    return (
        <div id="ReporterNewsAdd">
            <div className="form">
                <h2 className="title">기사 등록하기</h2>
                <div className="field">
                    <p className="field_title">미디어 선택</p>
                    <select>
                        <option>선택</option>
                        <option>www.ipnowmedia.com</option>
                    </select>
                </div>
                <div className="field">
                    <p className="field_title">섹션 추가</p>
                    <div className="wrap_select">
                        <select>
                            <option>선택</option>
                        </select>
                        <select>
                            <option>선택</option>
                        </select>
                        <button className="icon_add ir_txt">추가</button>
                    </div>
                </div>
                <div className="field">
                    <p className="field_title">기사 링크</p>
                    <input type="text" className="full_size" placeholder="입력하세요"/>
                </div>
                <div className="field">
                    <p className="field_title">제목</p>
                    <input type="text" className="full_size" placeholder="입력하세요"/>
                </div>
                <div className="field">
                    <p className="field_title">부제목</p>
                    <input type="text" className="full_size" placeholder="입력하세요"/>
                </div>
                <div className="field">
                    <p className="field_title">입력날짜</p>
                    <input type="date" placeholder="입력하세요"/>
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
                    />
                </div>

                <div className="btns">
                    <button className="btn_save">임시 저장</button>
                    <button className="btn_request">승인 요청</button>
                </div>
        </div>
            <div className="library">
                <h2 className="title">라이브러리</h2>
                <div className="lib_image_area">
                    <h2 className="lib_image_title">이미지</h2>
                    <ul className="lib_image_list">
                        <li className="lib_image_item">
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                            <div className="thumbnail">
                                <p>썸네일</p>
                            </div>
                        </li>
                        <li className="lib_image_item">
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                        </li>
                        <li className="lib_image_item">
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                        </li>
                        <li className="lib_image_item">
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                        </li>
                    </ul>
                </div>
                <div className="lib_file_area">
                    <h2 className="lib_file_title">첨부파일</h2>
                    <ul className="lib_file_list">
                        <li className="lib_file_item">
                            <div className="info">
                                <p className="filename">SNS작가 + 이창민 + 프로필_1.hwp</p>
                                <p className="size">39,95MB</p>
                            </div>
                            <button className="icon_exit ir_txt">닫기</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ReporterNewsAdd;