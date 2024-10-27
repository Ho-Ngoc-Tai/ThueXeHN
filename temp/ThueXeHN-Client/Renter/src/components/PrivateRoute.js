import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {

    const checkAuth = () => {
<<<<<<< HEAD:ThueXeHN-Admin/src/components/PrivateRoute.js
        if (localStorage.getItem('token') !== null){
=======
        if (localStorage.getItem('client') !== null){
>>>>>>> Feature-Client/cart:ThueXeHN-Client/Renter/src/components/PrivateRoute.js
            return true;
        }else{
            return false;
        }
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                checkAuth() ? (
                    children
                ) : (
                        <Redirect
                            to={{
<<<<<<< HEAD:ThueXeHN-Admin/src/components/PrivateRoute.js
                                pathname: "/",
=======
                                pathname: "/login",
>>>>>>> Feature-Client/cart:ThueXeHN-Client/Renter/src/components/PrivateRoute.js
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;