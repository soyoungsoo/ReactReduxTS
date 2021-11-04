import React, {useRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "./Home.scss";
import {Link} from "react-router-dom";
import Article from "../common/Article";
import SideArticleImageAndText from "../common/SideArticleImageAndText";

function Home() {
    const sliderRef = useRef();
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
        autoplaySpeed: 3000
    };

    const prevSlider = () => {
        sliderRef.current.slickPrev();
    }

    const nextSlider = () => {
        sliderRef.current.slickNext();
    }

    return (
        <div id="Home">
            <div className="banner">
                <Slider {...banner}>
                    <img src="#" alt="배너 이미지" className="banner"/>
                    <img src="#" alt="배너 이미지" className="banner"/>
                </Slider>
            </div>
            <div className="wrap wrap_article">
                <div className="article_area">
                    <div className="area_head">
                        <h2 className="title">IP시장현황</h2>
                        <Link>
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                        </Link>
                    </div>
                    <Article/>
                </div>
                <div className="article_area">
                    <div className="area_head">
                        <h2 className="title">IP거래시장</h2>
                        <Link>
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                        </Link>
                    </div>
                    <Article/>
                </div>
            </div>

            <div className="slide_area">
                <div className="slide_head">
                    <h2 className="title">IP 신규등록</h2>
                    <div className="set_area">
                        <button className="btn_more_left ir_txt" onClick={prevSlider}>이전</button>
                        <button className="btn_more_right ir_txt" onClick={nextSlider}>다음</button>
                        <button className="btn_start ir_txt" onClick={nextSlider}>다음</button>
                        <button className="btn_pause ir_txt" onClick={nextSlider}>다음</button>
                    </div>
                </div>
                <div className="slider">
                    <Slider {...slider} ref={sliderRef}>
                        <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                        <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                        <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                        <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                        <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                        <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                    </Slider>
                </div>
            </div>

            <div className="wrap has_side">
                <div className="article_area">
                    <div className="area_head">
                        <h2 className="title">IP시장현황</h2>
                        <Link>
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 더보기 버튼" />
                        </Link>
                    </div>
                    <Article/>
                </div>
                <div className="side_area">
                    <div className="side_head">
                        <button className="active">무형자산</button>
                        <button>밸류업</button>
                        <button>추진운동본부</button>
                    </div>
                    <div className="news">
                        <div className="item">
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 이미지" />
                            <p>20대 카드론 연체 '노란불'···평균이상 연체율...</p>
                        </div>
                        <div className="item">
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 이미지" />
                            <p>20대 카드론 연체 '노란불'···평균이상 연체율...</p>
                        </div>
                        <div className="item">
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 이미지" />
                            <p>20대 카드론 연체 '노란불'···평균이상 연체율...</p>
                        </div>
                        <div className="item">
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 이미지" />
                            <p>20대 카드론 연체 '노란불'···평균이상 연체율...</p>
                        </div>
                        <div className="item">
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 이미지" />
                            <p>20대 카드론 연체 '노란불'···평균이상 연체율...</p>
                        </div>
                        <div className="item">
                            <img src={require('../../assets/image/common/btn-article-more.svg').default} alt="기사 이미지" />
                            <p>20대 카드론 연체 '노란불'···평균이상 연체율...</p>
                        </div>
                    </div>
                    <Link to="#" className="btn_more ir_txt">기사 더보기 버튼</Link>
                </div>
            </div>

            <div className="wrap wrap_board">
                <div className="board_area">
                    <div className="board_head">
                        <div className="sort_area">
                            <button className="active">IPNOW</button>
                            <button>백서사항</button>
                            <button>활동통계</button>
                        </div>
                        <Link className="btn_more"></Link>
                    </div>
                    <table>
                        <colgroup>
                            <col width="10%"/>
                            <col width="10%"/>
                            <col width="50%"/>
                            <col width="10%"/>
                            <col width="10%"/>
                            <col width="10%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>공시 대상 회사</th>
                                <th>보고서명</th>
                                <th>작성인</th>
                                <th>입력일자</th>
                                <th>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <SideArticleImageAndText/>
            </div>
        </div>
    )
}

export default Home;