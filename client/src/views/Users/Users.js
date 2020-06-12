import React, {useEffect, useState} from 'react'
import './Users.css'
import axios from "axios";

function Users(props) {
    const [allUsers, setAllUsers] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (props.user) {
            axios.get('/api/users')
                .then((res) => {
                    setAllUsers (res.data);
                    setUsers(res.data);
                });
        }
    }, [props.user]);

    function User(properties) {
        var url=properties.user.profileImage;
        return (<div className="col-lg-2 col-md-12 col-sm-6">
                <a href={'./profile/'+properties.user.userId}><div className="img-container">
                    <img data-toggle="tooltip" title={properties.user.name} src={(url === null || url === "null") ? require('./dpholder.png') : url} alt="Avatar" className="image"/>
                    {/*<div className="overlay">{properties.user.name}</div>*/}
                    <center><div className="image-name text-white">{properties.user.name}</div></center>
                </div></a>
            </div>
        )
    }

    function Search(e)
    {
        var val = allUsers.filter(
            user => {
                return (user.name.toLowerCase()).includes(e.target.value.toLocaleLowerCase());
            });
       setUsers(val);
    }

    return (
        <div className="container-fluid">
            <center>
                <div className="btn mb-3 btn-secondary font-weight-bold">Users of EmoteIt</div>
               <div> <input type="search" className="form-control-sm" placeholder="Search Someone!!" onChange={Search}/></div>
                <br/>
            </center>
            <center>
            <div className="row">
                {users.map((user) =>
                        <User user={user}/>
                )}
            </div>
            </center>
        </div>
    )
}

export default Users