import React, {useEffect, useRef, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "./css/Home.scss";
import {Link} from "react-router-dom";
import ArticleListImageAndText from "../common/ArticleListImageAndText";
import MediaAPI from "../../api/media";
import {HomeType} from "../../models/home";
import path from "../../const/path";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import ArticleAreaItem from "./ArticleAreaItem";

function Home() {
    const sliderRef = useRef<Slider>(null);
    const [sliderPlay, setSliderPlay] = useState(true);
    const [homeData, setHomeData] = useState<HomeType>({} as HomeType);
    const section = useSelector((state: RootState) => state.section);
    const sectionE = homeData.section?.e;
    const sectionS = homeData.section?.s;
    const sectionG = homeData.section?.g;
    const sectionESG = homeData.section?.esg;
    const sectionEURL = `${path.section}/${sectionE?.idx}/${section.find(item => item.idx === sectionE?.idx)?.child[0]?.idx}`;
    const sectionSURL = `${path.section}/${sectionS?.idx}/${section.find(item => item.idx === sectionS?.idx)?.child[0]?.idx}`;
    const sectionGURL = `${path.section}/${sectionG?.idx}/${section.find(item => item.idx === sectionG?.idx)?.child[0]?.idx}`;

    const banner = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const slider = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 2500
    };

    useEffect(() => {
        MediaAPI.getHome().then((res: HomeType) => {
            console.log(res);
            setHomeData(res)
        });
    }, []);

    const slickPause = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPause();
        }
        setSliderPlay(false);
    }

    const slickPlay = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPlay();
        }
        setSliderPlay(true);
    }

    const prevSlider = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    }

    const nextSlider = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    }

    return (
        <div id="Home">
            {/*<div className="banner">*/}
            {/*    <Slider {...banner}>*/}
            {/*        <img src="#" alt="?????? ?????????" className="banner"/>*/}
            {/*        <img src="#" alt="?????? ?????????" className="banner"/>*/}
            {/*    </Slider>*/}
            {/*</div>*/}
            <div className="wrap wrap_article">
                <ArticleAreaItem title={sectionE?.name} url={sectionEURL} list={sectionE?.article}/>
                <ArticleAreaItem title={sectionS?.name} url={sectionSURL} list={sectionS?.article}/>
            </div>

            <div className="slide_area">
                <div className="slide_head">
                    <h2 className="title">?????? ??????</h2>
                    <div className="set_area">
                        <button className="btn_more_left ir_txt" onClick={prevSlider}>??????</button>
                        <button className="btn_more_right ir_txt" onClick={nextSlider}>??????</button>
                        {
                            sliderPlay
                            ? <button className="btn_pause ir_txt" onClick={slickPause}>??????</button>
                            : <button className="btn_start ir_txt" onClick={slickPlay}>??????</button>
                        }
                    </div>
                </div>
                <div className="slider">
                    <Slider {...slider} ref={sliderRef}>
                        {
                            sectionESG?.map(item => {
                                return (
                                    <Link key={item.idx} to={"#"}>
                                        <img src={window.$Global.getImageCDN(item.thumbnail_key)} alt="?????? ?????? ?????????"/>
                                    </Link>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>

            <div className="wrap has_side">
                <ArticleAreaItem title={sectionG?.name} url={sectionGURL} list={sectionG?.article}/>
                <ArticleListImageAndText data={homeData.popular}/>
                {/*<div className="side_area">*/}
                {/*    <div className="side_head">*/}
                {/*        <button className="active">????????????</button>*/}
                {/*        <button>?????????</button>*/}
                {/*        <button>??????????????????</button>*/}
                {/*    </div>*/}
                {/*    <div className="news">*/}
                {/*        <div className="item">*/}
                {/*            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="?????? ?????????" />*/}
                {/*            <p>20??? ????????? ?????? '?????????'?????????????????? ?????????...</p>*/}
                {/*        </div>*/}
                {/*        <div className="item">*/}
                {/*            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="?????? ?????????" />*/}
                {/*            <p>20??? ????????? ?????? '?????????'?????????????????? ?????????...</p>*/}
                {/*        </div>*/}
                {/*        <div className="item">*/}
                {/*            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="?????? ?????????" />*/}
                {/*            <p>20??? ????????? ?????? '?????????'?????????????????? ?????????...</p>*/}
                {/*        </div>*/}
                {/*        <div className="item">*/}
                {/*            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="?????? ?????????" />*/}
                {/*            <p>20??? ????????? ?????? '?????????'?????????????????? ?????????...</p>*/}
                {/*        </div>*/}
                {/*        <div className="item">*/}
                {/*            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="?????? ?????????" />*/}
                {/*            <p>20??? ????????? ?????? '?????????'?????????????????? ?????????...</p>*/}
                {/*        </div>*/}
                {/*        <div className="item">*/}
                {/*            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="?????? ?????????" />*/}
                {/*            <p>20??? ????????? ?????? '?????????'?????????????????? ?????????...</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <Link to="#" className="btn_more ir_txt">?????? ????????? ??????</Link>*/}
                {/*</div>*/}
            </div>
            <div className="wrap wrap_board">
                <div className="board_area">
                    {/*<div className="board_head">*/}
                    {/*    <div className="sort_area">*/}
                    {/*        <button className="active">IPNOW</button>*/}
                    {/*        <button>????????????</button>*/}
                    {/*        <button>????????????</button>*/}
                    {/*    </div>*/}
                    {/*    <Link to="#" className="btn_more"></Link>*/}
                    {/*</div>*/}
                    {/*<table>*/}
                    {/*    <colgroup>*/}
                    {/*        <col width="10%"/>*/}
                    {/*        <col width="10%"/>*/}
                    {/*        <col width="50%"/>*/}
                    {/*        <col width="10%"/>*/}
                    {/*        <col width="10%"/>*/}
                    {/*        <col width="10%"/>*/}
                    {/*    </colgroup>*/}
                    {/*    <thead>*/}
                    {/*        <tr>*/}
                    {/*            <th>??????</th>*/}
                    {/*            <th>?????? ?????? ??????</th>*/}
                    {/*            <th>????????????</th>*/}
                    {/*            <th>?????????</th>*/}
                    {/*            <th>????????????</th>*/}
                    {/*            <th>??????</th>*/}
                    {/*        </tr>*/}
                    {/*    </thead>*/}
                    {/*    <tbody>*/}
                    {/*        <tr>*/}
                    {/*            <td>1</td>*/}
                    {/*            <td>2</td>*/}
                    {/*            <td>3</td>*/}
                    {/*            <td>4</td>*/}
                    {/*            <td>5</td>*/}
                    {/*            <td>6</td>*/}
                    {/*        </tr>*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
                </div>
                {/*<ArticleListImageAndText data={homeData.popular}/>*/}
            </div>
        </div>
    )
}

export default Home;