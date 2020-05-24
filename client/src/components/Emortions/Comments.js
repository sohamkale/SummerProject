import React, { useState, useEffect } from 'react';
import "./Comments.css";
import axios from 'axios';
const Comments = (props) => {
    const [commenter, setCommenter] = useState();
    useEffect(()=>{
        console.log(props.comment);
        if(props != null){
            setCommenter(props.comment.name);
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
                <div>{commenter ? commenter: ""}</div>
            <li>{props.answer} &nbsp; <span className='like'></span> {props.numLikes}</li>
            </div>
        </div>
    );

}

export default Comments;