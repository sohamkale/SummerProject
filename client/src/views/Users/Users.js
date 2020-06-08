import React, {useEffect, useState} from 'react'
import './Users.css'
import axios from "axios";

function Users(props) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (props.user) {
            axios.get('/api/users')
                .then((res) => {
                    setUsers(res.data);
                    console.log(res.data)
                });
        }
    }, [props.user]);

    function User(properties) {
        var url=properties.user.profileImage;
        return (<div className="col-2">
                <div className="img-container">
                    <img src={(url === null || url === "null") ? require('./dpholder.png') : url} alt="Avatar" className="image"/>
                    <div className="overlay">{properties.user.name}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="container-fluid">
            <center>
                <div className="btn mb-3 btn-secondary font-weight-bold">Users of EmoteIt</div>
            </center>
            <div className="row">
                {users.map((user) =>
                        <User user={user}/>
                )}
            </div>
        </div>
    )
}

export default Users