import React from "react";

import ContentPage from "./ContentPage";
import AdminPage from "./AdminPage";
import SignUpPage from "./SignUpPage";
import { Link } from "react-router-dom";

function Main(){
    return(
        <div>
            <ContentPage/>
            <hr/>
            <AdminPage/>
            <hr/>
            <Link to="/login/signup">SignUpPage</Link>
        </div>
    );
}

export default Main;