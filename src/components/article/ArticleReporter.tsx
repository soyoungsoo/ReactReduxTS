import React, {useEffect, useState} from "react";
import SectionSide from "../section/SectionSide";
import ArticleListAndOneImage from "../common/ArticleListAndOneImage";
import MediaAPI from "../../api/media";
import {useParams} from "react-router-dom";
import {ArticleView} from "../../models/article";
import "./css/ArticleReporter.scss";
import ArticleList from "../common/ArticleList";

function ArticleReporter() {
    const {reporter_idx} = useParams<{reporter_idx: string}>();
    const [reporterArticle, setReporterArticle] = useState<ArticleView>({} as ArticleView);
    useEffect(() => {
        MediaAPI.getReporterArticleList(Number(reporter_idx)).then((res:any) => {
            console.log(res);
            setReporterArticle(res);
        });
    }, []);

    return (
        <div id="ArticleReporter">
            <div className="content">
                <div className="reporter_info">
                    <img src={require('../../assets/image/common/ic-user-profile.svg').default} className="profile_image" alt="기자 프로필 이미지" />
                    <div className="inner">
                        <h2>{reporterArticle.reporter_info?.name} 기자</h2>
                        <p>{reporterArticle.reporter_info?.email}</p>
                    </div>
                </div>
                <ArticleListAndOneImage title="기자의 인기기사" list={reporterArticle.reporter_popular}/>

                <div className="reporter_recent">
                    <h2>기자의 최신기사</h2>
                </div>
                <ArticleList list={reporterArticle.reporter_recent}/>
            </div>
            <SectionSide textData={reporterArticle.recent} imgTextData={reporterArticle.popular}/>
        </div>
    )
}

export default ArticleReporter;