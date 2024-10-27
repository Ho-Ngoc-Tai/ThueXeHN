import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ children, ...rest }) => {

    const checkAuth = () => {
<<<<<<< HEAD:ThueXeHN-Admin/src/components/PublicRoute.js
        if (localStorage.getItem('token') !== null) return false;
=======
        console.log(localStorage.getItem('client'));
        if (localStorage.getItem('client') !== null) return false;
>>>>>>> Feature-Client/cart:ThueXeHN-Client/Renter/src/components/PublicRoute.js
        return true;
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
<<<<<<< HEAD:ThueXeHN-Admin/src/components/PublicRoute.js
                                pathname: "/dash-board",
=======
                                pathname: "/home",
>>>>>>> Feature-Client/cart:ThueXeHN-Client/Renter/src/components/PublicRoute.js
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PublicRoute;