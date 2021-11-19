import React from "react";
import {Route} from "react-router-dom";

function RouteExcept({component: Component, ...parentProps}) {
    const exceptPath = ['/signup', '/reporter', '/admin'];
    return (
        <Route
            {...parentProps}
            render={props => {
                const pathname = props.history.location.pathname;
                let result = exceptPath.findIndex(item => item == pathname) === -1;
                return (
                    result
                    ? <Component {...props}/>
                    : null
                )
            }}
        />
    )
}

export default RouteExcept;