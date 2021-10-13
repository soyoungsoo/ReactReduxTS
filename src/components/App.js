import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./header/Header";
import Login from "./login/Login";
import SignupContainer from "./signup/SignupContainer";

function App() {
    return (
        <BrowserRouter forceRefresh={false}>
            <div className="App">
                <Route path="/*" component={Header} exact/>
                <Switch>
                    <Route path="/login" component={Login} exact/>
                    <Route path="/signup" component={SignupContainer} exact/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
