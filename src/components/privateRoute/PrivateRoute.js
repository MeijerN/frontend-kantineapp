import React from "react";
import {Route} from "react-router-dom";
import {Redirect} from "react-router-dom";

function PrivateRoute({isAuth, children, ...rest}) {
    return (
        <Route {...rest}>
            {isAuth === true ? children : <Redirect to="/"/>}
        </Route>
    );
}

export default PrivateRoute;