import React, { useState, useEffect } from 'react';
import "./Comments.css";
import axios from 'axios';


const Comment = (props) => {
    const [name, setName] = useState("Anonymous");
    useEffect(()=>{
        // console.log(props.comment);
        GetUserName(props.comment.userId)
       
    }, [])

    function GetUserName(userId) {
        axios.get('/api/users/' + userId)
            .then((res) => {
                if (res.data) {
                    //console.log("data is "+res.data)
                    setName(res.data);
                }
                else{
                    setName("Anonymous");
                }
            });
    }

    return (
        <div>
            <div className="commenter">{name}</div>
            {props.comment.answer} &nbsp; <span className='like'></span> {props.comment.numLikes}
        </div>
    );

}

export default Comment;