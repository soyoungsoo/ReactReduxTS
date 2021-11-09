import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import SignupContainer from "./components/signup/SignupContainer";
import FindId from "./components/find/FindId";
import FindPw from "./components/find/FindPw";
import Menubar from "./components/header/Menubar";
import SectionE from "./components/section/SectionE";
import SectionEDetail from "./components/section/SectionEDetail";
import Home from "./components/home/Home";
import React from "react";
import RouteExcept from "./router/RouteExcept";
import ReporterContainer from "./components/reporter/ReporterContainer";

function App() {

    return (
        <BrowserRouter forceRefresh={false}>
            <Route path="/*" component={Header}/>
            <RouteExcept path="/*" component={Menubar}/>
            <div className="App">
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/find/id" component={FindId} exact/>
                    <Route path="/find/pw" component={FindPw} exact/>
                    <Route path="/login" component={Login} exact/>
                    <Route path="/signup" component={SignupContainer} exact/>
                    <Route path="/section/e" component={SectionE} exact/>
                    <Route path="/section/e/:idx" component={SectionEDetail} exact/>
                    <Route path="/reporter" component={ReporterContainer} exact/>
                </Switch>
            </div>
            <Route path="/*" component={Footer} exact/>
        </BrowserRouter>
    );
}

export default App;
