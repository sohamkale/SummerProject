import React from 'react';

const LoggedInTest = (props) => {
    return(
        <div>You are logged in {props.user.name}</div>
    );
}

export default LoggedInTest;