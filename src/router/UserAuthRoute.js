import React from "react";
import { Route, Redirect } from 'react-router-dom';

function UserAuthRoute ({component: Component, auth, ...parentProps}) {
    if (!auth) {
        sessionStorage.setItem("historyURL", window.location.href);
    }
    return (
        <Route
            {...parentProps}
            render={props => (
                auth
                ? <Component {...props}/>
                : <Redirect to="/login"/>
            )}
        />
    );
}
export default UserAuthRoute;
