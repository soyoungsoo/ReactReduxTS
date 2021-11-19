import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import path from "./const/path";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import SignupContainer from "./components/signup/SignupContainer";
import FindId from "./components/find/FindId";
import FindPw from "./components/find/FindPw";
import Menubar from "./components/header/Menubar";
import Section from "./components/section/Section";
import Home from "./components/home/Home";
import React, {useEffect} from "react";
import RouteExcept from "./router/RouteExcept";
import ArticleDetail from "./components/article/ArticleDetail";
import UserAuthRoute from "./router/UserAuthRoute";
import MyPageContainer from "./components/mypage/MyPageContainer";
import ArticleReporter from "./components/article/ArticleReporter";

function App() {
    const auth = sessionStorage.getItem('token') != null;
    const agent = navigator.userAgent.toLowerCase();
    const isIE = (navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) || (agent.indexOf("msie") !== -1)

    useEffect(() => {
        if (isIE) {
            alert("본 서비스는 익스플로러 환경을 지원하지 않습니다\n원활한 사용을 위해 크롬, 엣지로 이용해주세요");
        }
    }, []);

    if (isIE) return null;

    return (
        <BrowserRouter forceRefresh={false}>
            <Route path="/*" component={Header}/>
            <RouteExcept path="/*" component={Menubar}/>
            <div className="App">
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path={`${path.find}/id`} component={FindId} exact/>
                    <Route path={`${path.find}/pw`} component={FindPw} exact/>
                    <Route path="/login" component={Login} exact/>
                    <Route path="/signup" component={SignupContainer} exact/>
                    <Route path={`${path.section}/:article_idx`} component={ArticleDetail} exact/>
                    <Route path={`${path.section}/:parent_idx/:child_idx`} component={Section} exact/>
                    <Route path={`${path.reporter}/:reporter_idx`} component={ArticleReporter} exact/>
                    <UserAuthRoute exact path={`/myPage`} auth={auth} component={MyPageContainer}/>
                </Switch>
            </div>
            <Route path="/*" component={Footer} exact/>
        </BrowserRouter>
    );
}

export default App;
