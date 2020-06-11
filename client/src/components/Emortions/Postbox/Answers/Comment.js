import React, {useEffect, useState} from 'react';
import "./Comments.css";
import axios from 'axios';
import {DislikeButton, LikeButton} from "../../thumbs";


const Comment = (props) => {
    const [img, setImg] = useState(require('../../../Shared/dpholder.png'));

    useEffect(()=>{
        axios.get(`/api/users/${props.comment.userId}`).then((res)=>{
            if(res.data.profileImage!=null || res.data.profileImage!="null")
                setImg(res.data.profileImage)
        }).catch(function(e){
            console.log(e)
        });
       
    }, [props.comment])

    function GetUserName(userId) {
        axios.get('/api/users/' + userId)
            .then((res) => {
                if (res.data) {
                    //console.log("data is "+res.data)
                   // setName(res.data);
                }
                else{
                   // setName("Anonymous");
                }
            });
    }

    const likeComment = () =>{
        if(props.comment.userId!=props.user.userId)
        {
            var commentPostObj = {
            comment_id: props.comment._id,
            post_id: props.postId,
                name:props.user.name
        };

        axios.post(`/api/posts/likeComment/${props.user.userId}`, commentPostObj).then((res)=>{
            props.getComments();
        }).catch(function(e){
            console.log(e)
        });
        }
    }

    const dislikeComment = () =>{
        var commentPostObj = {
            comment_id: props.comment._id,
            post_id: props.postId
        };

        axios.post(`/api/posts/dislikeComment/${props.user.userId}`, commentPostObj).then((res)=>{
            console.log('asdasd')
            props.getComments();
        }).catch(function(e){
            console.log(e)
        });

    }

    function LikeAgent()
    {
        return (props.comment.likes.includes(props.user.userId)) ? <DislikeButton function={dislikeComment}/> : <LikeButton function={likeComment}/>;
    }

    return (
        <div>
            <div className="commenter"><img src={img} width="30px;" className="rounded-circle"/> {props.comment.name}</div>
            <div className="answer">{props.comment.answer}</div> &nbsp; <LikeAgent/> <span className="likeCount" > {props.comment.likes.length} </span>  <span className="score badge badge-primary">SCORE: {props.comment.score}</span>
        </div>
    );

}

export default Comment;