import React, { useState, useEffect } from 'react';
import "./Comments.css";
import axios from 'axios';
const Comments = (props) => {
    const [user, setUser] = useState();
    useEffect(()=>{
        console.log(props);
        if(props != null){
            axios.get(`/api/users/${props.comment.userId}`).then((res) => {
                setUser(res.data)
            })
        }
       
    }, [])
    return (
        <div className="text-left">
            <div className="commentFBType mb-2">
                {/* {(function() {
                    {axios.get(`/api/users/${props.comment.userId}`).then((res) => {
                        console.log(res.data);
                    })}
                })()} */}
                <div>{user ? user: ""}</div>
            <li>{props.answer} &nbsp; <span className='like'></span> {props.numLikes}</li>
            </div>
        </div>
    );

}

export default Comments;