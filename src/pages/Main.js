import React from "react";

import ContentPage from "./ContentPage";
import AdminPage from "./AdminPage";

function Main(){
    return(
        <div>
            <ContentPage/>
            <hr/>
            <AdminPage/>
        </div>
    );
}

export default Main;