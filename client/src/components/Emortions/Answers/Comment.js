import React, { useState, useEffect } from 'react';
import "./Comments.css";
import axios from 'axios';
import {DislikeButton, LikeButton} from "../thumbs";


const Comment = (props) => {
    const [name, setName] = useState("Anonymous");
    useEffect(()=>{
        // console.log(props.comment);
        if(props.comment.name)
            setName(props.comment.name);
        else
            GetUserName(props.comment.userId);
       
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

    const likeComment = () =>{
        // if(props.userUid!=emortion.postObjId)
        // {
        //     var likePostObj = {
        //         _id: props.emortion._id,
        //     };
        //
        //     axios.post(`/api/posts/like/${props.userUid}`, likePostObj).then((res)=>{
        //         props.getPosts();
        //     }).catch(function(e){
        //         console.log(e)
        //     });
        //
        // }
    }

    const dislikeComment = () =>{

        var commentPostObj = {
            comment_id: props.comment._id,
            post_id: props.postId
        };

        axios.post(`/api/posts/dislikecomment/${props.userUid}`, commentPostObj).then((res)=>{
            props.getPosts();
        }).catch(function(e){
            console.log(e)
        });

    }

    function LikeAgent()
    {
        return (props.comment.likes.includes(props.userUid)) ? <DislikeButton function={dislikeComment}/> : <LikeButton function={likeComment}/>;
    }

    return (
        <div>
            <div className="commenter">{name}</div>
            <div className="answer">{props.comment.answer}</div> &nbsp; <LikeAgent/> <span className="likeCount" > {props.comment.likes.length} </span>
        </div>
    );

}

export default Comment;