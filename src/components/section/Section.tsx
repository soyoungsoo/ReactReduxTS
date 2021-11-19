import React, {useEffect, useState} from "react";
import "./css/Section.scss";
import path from "../../const/path";
import { RootState } from '../../app/store'
import { useSelector } from 'react-redux'
import {Link, useParams} from "react-router-dom";
import SectionSide from "./SectionSide";
import ArticleList from "../common/ArticleList";
import {MediaSectionType} from "../../models/media";
import MediaAPI from "../../api/media";
import {ListType} from "../../models/article";
import qs from "query-string";
import {useHistory, useLocation} from "react-router";
import {getOptionType} from "../../api/common";
import Pagination from "../common/Pagination";

function Section() {
    const history = useHistory();
    const location = useLocation();
    const {parent_idx, child_idx} = useParams<{parent_idx: string, child_idx: string}>();
    const section = useSelector((state: RootState) => state.section);
    const childSection:MediaSectionType = section.find(item => item.idx === Number(parent_idx)) as MediaSectionType;

    const count = 15;
    const page = Number(qs.parse(location.search).page?.toString() || 1);
    const [list, setList] = useState<ListType>({} as ListType);

    useEffect(() => {
        getArticle();
    }, [parent_idx, child_idx, page]);

    const getArticle = async () => {
        let params: getOptionType = {
            page: page,
            count: count
        };
        MediaAPI.getMediaArticleList(Number(parent_idx), Number(child_idx), params).then((res: ListType) => setList(res));
    };

    const changePage = (page:number) => {
        history.push(`?page=${page}`);
        window.scrollTo(0, 0);
    }

    return (
        <div id="Section">
            <div className="main_content">
                <ul className="tab">
                    {
                        childSection?.child.map((item, idx) => {
                            let classname = '';
                            if (child_idx) {
                                if (item.idx === Number(child_idx)) classname = 'active';
                            } else {
                                if (idx === 0) classname = 'active';
                            }
                            return (
                                <li key={item.idx} className={classname}>
                                    <Link to={`${path.section}/${parent_idx}/${item.idx}`}>{item.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <ArticleList list={list.items}/>
                <Pagination curPage={page} lastNum={list.last} onClick={changePage} />
            </div>
            <SectionSide textData={list.recent} imgTextData={list.popular}/>
        </div>
    )
}

export default Section;