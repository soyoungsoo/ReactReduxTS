import React, {useEffect, useState} from "react";
import "./css/Menubar.scss";
import path from "../../const/path";
import {Link} from "react-router-dom";
import MediaAPI from "../../api/media";
import {MediaSectionType} from "../../models/media";
import { useDispatch } from 'react-redux'
import {setSection} from "../../features/section/sectionSlice";

function Menubar() {
    const dispatch = useDispatch();
    const [mediaSectionList, setMediaSectionList] = useState<MediaSectionType[]>([]);

    useEffect(() => {
        MediaAPI.getMediaSection().then((res: MediaSectionType[]) => {
            res = res.filter((item: MediaSectionType) => item.child.length > 1); // 하위 카테고리가 없으면 그려주지 않음
            dispatch(setSection(res));
            setMediaSectionList(res);
        });
    }, []);

    return (
        <div id="Menubar">
            <ul className="depth1">
                <li>
                    <Link to="/">HOME</Link>
                </li>
                {
                    mediaSectionList.map(item => <li key={`large_${item.idx}`}><Link to={`${path.section}/${item.idx}/${item.child[0].idx}`}>{item.name}</Link></li>)
                }
                <li>
                    <div className="tool">
                        <button className="icon_menu ir_txt">목록 메뉴</button>
                        <button className="icon_search ir_txt">검색</button>
                    </div>
                </li>
            </ul>

            <ul className="depth2">
                {
                    mediaSectionList.map(item => {
                        return (
                                <li key={`medium_${item.idx}`} className="tab active">
                                    <ul>
                                        {
                                            item.child.map((item2, idx2) => <li key={`child_${idx2}`}><Link to={`${path.section}/${item.idx}/${item2.idx}`}>{item2.name}</Link></li>)
                                        }
                                    </ul>
                                </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}

export default Menubar;