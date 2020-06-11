import React from 'react';

const NotFound = () => {
        return (
            <div className="container-fluid text-danger">
                <center>
                        <div className="font-weight-bold">Oh no! The requested page is not found or contains errors!</div>
                        <a className="btn btn-primary" href="/Home">Return to Home</a>
                </center>
            </div>
        )
}

export default NotFound;
