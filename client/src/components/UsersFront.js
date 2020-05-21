
import React , { Component, useEffect, useState } from "react";
import axios from 'axios';
import {Container, Row, Col, Button, Image} from 'react-bootstrap';
const API_BASE = process.env.REACT_APP_PRODUCTION ? '' : 'http://localhost:5000';
const UsersFront = (props) => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    let postsArray = [];
    let array = [];
    useEffect(() => {
        axios.get('/users/')
            .then((res)=>{
                if(res.data.length > 0){
                    console.log("users");
                   console.log(res.data);
                    res.data.map(user => array.push(user.email))
                }
                console.log(array);
                setUsers(array);
                // window.location.href='/Login';
            });
            axios.get(API_BASE + "/posts/")
            .then((res)=>{
                if(res.data.length > 0){
                    console.log("posts");
                    console.log(res.data);
                    res.data.map(post => postsArray.push(post._id))
                }
                console.log(postsArray);
                setPosts(postsArray);
                // window.location.href='/Login';
            });
    }, [])
    return(     
        <div>
        <div className="SignupClassFullDiv">
        <Container fluid className=" SignupClassMainDiv">
        <div>
          {users.map((brand) => (
            <p>{brand}</p>
          ))}
        </div>
        <div>
          {posts.map((brand) => (
            <p>{brand}</p>
          ))}
        </div>
        </Container>
        </div>
        
</div>
    );
}
export default UsersFront;