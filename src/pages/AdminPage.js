import React from 'react';
import { Link } from 'react-router-dom';


function AdminPage(){

    return(
        <div>
            <Link to="/admin/pwquiz">Password Quiz</Link>
        </div>
    );

}

export default AdminPage;