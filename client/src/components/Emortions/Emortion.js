import React, { useEffect, useState } from 'react';
import Emoticon from '../Emortions/Emoticon'
import { emojiIndex } from 'emoji-mart';
import './Emortion.css'
import axios from 'axios';
import fire from './../../config/Fire';
import { Button, Collapse, Dropdown, Row, Container, Col } from 'react-bootstrap'
import Comment from "./Answers/Comment";
import $ from 'jquery'
import io from "socket.io-client";
import {LikeButton, DislikeButton} from "./thumbs";

const Emortion = (props) => {
    let emortion = props.emortion

    //console.log(props)
    //states and vars
    const [name, setName] = useState("anonymous");
    const [open, setOpen] = useState(false);
    const [numLikes, setNumLikes] = useState(0);
    //const [comments, setComments] = useState(props.emortion.comments);
    //const [answer, setAnswer] = useState(null);


    useEffect(() => {
        if(props.emortion.name)
            setName(props.emortion.name);
        else
            GetUserName(emortion.postObjId);

    }, []);


    const getComments = (postId) => {
        var username=props.userUid;
        props.socket.emit('addComment', postId, () => props.setPostsArray([]));
    }

    function SendComment(e)
    {

        e.preventDefault();
        var form = $('#answerForm'+emortion._id).serializeArray();
        $.ajax({
            url: '/api/posts/answer/'+emortion._id,
            type: 'POST',
            data: JSON.stringify(
                form),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if(data.error){
                    alert(data.error);
                }else {
                    getComments(form[0].value);
                }
                
            }
        });
    }

    function Secret() {
        if (new Date(emortion.revealsAt) <= new Date())
            return (
                <div>
                    <span className="badge badge-success">REVEALED</span>
                    <p className="card-text secret">Secret: {emortion.secretAnswer}</p>
                </div>


            );
        else return (
            <div>
                <span className="badge badge-warning">Answer reveals at {new Date(emortion.revealsAt).toLocaleTimeString()} or when Answered</span>
            </div>
        );
    }

    function GetUserName(userId) {
        axios.get('/api/users/' + userId)
            .then((res) => {
                if (res.data) {
                    //console.log("data is "+res.data)
                    setName(res.data);
                }
                else {
                    //console.log(res)
                    setName("Not Found");
                }
            });
    }

    const likePost = () =>{
        if(props.userUid!=emortion.postObjId)
        {
            setNumLikes(numLikes + 1);

            var likePostObj = {
                _id: props.emortion._id,
            };

            axios.post(`/api/posts/like/${props.userUid}`, likePostObj).then((res)=>{
                props.getPosts();
            }).catch(function(e){
                console.log(e)
            });

        }
    }

    const dislikePost = () =>{
        setNumLikes(numLikes + 1);

        var likePostObj = {
            _id: props.emortion._id,
        };

        axios.post(`/api/posts/dislike/${props.userUid}`, likePostObj).then((res)=>{
            props.getPosts();
        }).catch(function(e){
            console.log(e)
        });

    }

    function LikeAgent()
    {
        return (emortion.likes.includes(props.userUid)) ? <DislikeButton function={dislikePost}/> : <LikeButton function={likePost}/>;
    }

    function AnswerAgent()
    {
        return (props.userUid!=emortion.postObjId & new Date(emortion.revealsAt) >= new Date())? (<div>
                <form id={'answerForm'+emortion._id} onSubmit={SendComment}>
                    <input readOnly hidden name="postId" value={props.emortion._id}></input>
                    <input readOnly hidden name="userId" value={props.userUid}></input>
                    <input readOnly hidden name="name" value={props.username}></input>
                    <input defaultValue="" required name="answer" className="form-control answer" placeholder="What do you think the Emorter is saying?"></input>
                    <span><Button  type="submit" variant="info">Evaluate</Button></span>
                </form>
            </div>):
                (<div></div>);
    }

    //Main
    return (
        <div>
           {/* {setReturnNo(returnNo+1)} */}
            <div className="card bg-light">
                <div className="card-body">
                    <div className="blackburger-font">Emortion By {name}</div>
                    <div>
                        {emortion.message.emojiArray.map((position, index) => (
                            <Emoticon key={index} position={position} />
                        ))}
                    </div>
                    {/* {console.log(new Date().toISOString())} */}
                    <Secret />
                    <LikeAgent/> <span className="likeCount" >{emortion.likes.length} </span>
                    {/*<span  className='like'></span> {emortion.numLikes}*/}
                    <center>
                    <Dropdown.Toggle
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        variant="outline-info"
                    > Answers
                    </Dropdown.Toggle>
                    </center>
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            <AnswerAgent/>
                            <div className="text-center">
                                    {emortion.comments.map((comment, index) => {
                                        return (
                                            // <li className="text-left">{comment.answer}</li>
                                            <Comment key={index} comment={comment}/>
                                        )
                                    })}
                            </div>

                        </div>
                    </Collapse>

                    
                </div>
            </div>
            <br></br>
        </div>
    );

}



export default Emortion;