import React, { useEffect, useState } from 'react';
import Emoticon from '../Postform/Emoticon'
import './Emortion.css'
import axios from 'axios';
import { Button, Collapse, Dropdown } from 'react-bootstrap'
import Comment from "./Answers/Comment";
import $ from 'jquery'
import {LikeButton, DislikeButton} from "../thumbs";

const Emortion = (props) => {
    let emortion = props.emortion

    //console.log(props)
    //states and vars
    // const [name, setName] = useState("anonymous");
    const [open, setOpen] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [showCount, setShowCount] = useState(8);
    const [img, setImg] = useState(require('../../Shared/dpholder.png'));

    //const [comments, setComments] = useState(props.emortion.comments);
    //const [answer, setAnswer] = useState(null);


    useEffect(() => {
        didUserAnswer();
        axios.get(`/api/users/${emortion.userId}`).then((res)=>{
            if(res.data.profileImage!=null|| res.data.profileImage!="null")
                setImg(res.data.profileImage)
        }).catch(function(e){
            console.log(e)
        });
        // if(props.emortion.name)
        //     setName(props.emortion.name);
        // else
        //     GetUserName(emortion.userId);

    }, [props.emortion]);


    const getComments = (postId) => {
        props.getPosts();
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
                    //document.getElementById('answerForm'+emortion._id).setAttribute('style',"display:none");
                    getComments(form[0].value);
                    didUserAnswer();
                }

            }
        });
    }

    function Secret() {
        if (new Date(emortion.revealsAt) <= new Date())
            return (
                <div>
                    <span className="badge badge-success">REVEALED</span>
                    <p className="card-text"><span className="secret btn btn-light">SECRET: {emortion.secretAnswer}</span></p>
                </div>
            );
        else return (
            <div>
                <span className="badge badge-warning">Answer reveals at {new Date(emortion.revealsAt).toLocaleTimeString()}</span>
                <span className="badge badge-warning">or when answered</span>
            </div>
        );
    }

    // function GetUserName(userId) {
    //     axios.get('/api/users/' + userId)
    //         .then((res) => {
    //             if (res.data) {
    //                 //console.log("data is "+res.data)
    //                 setName(res.data.name);
    //             }
    //             else {
    //                 //console.log(res)
    //                 setName("Not Found");
    //             }
    //         });
    // }

    function didUserAnswer()
    {
        var postObj = {
            _id: emortion._id,
        }
        axios.post(`/api/posts/diduseranswer/${props.user.userId}`, postObj).then((res)=>{
            //props.getPosts();
            setAnswered(res.data);
        }).catch(function(e){
            console.log(e)
        });
    }

    const likePost = () =>{
        if(props.user.userId!=emortion.userId)
        {
            var likePostObj = {
                _id: props.emortion._id,
                name: props.user.name
            };

            axios.post(`/api/posts/like/${props.user.userId}`, likePostObj).then((res)=>{
                props.getPosts();
            }).catch(function(e){
                console.log(e)
            });

        }
    }

    const dislikePost = () =>{

        var likePostObj = {
            _id: props.emortion._id,
        };

        axios.post(`/api/posts/dislike/${props.user.userId}`, likePostObj).then((res)=>{
            props.getPosts();
        }).catch(function(e){
            console.log(e)
        });

    }

    function LikeAgent()
    {
        return (emortion.likes.includes(props.user.userId)) ? <DislikeButton function={dislikePost}/> : <LikeButton function={likePost}/>;
    }

    function AnswerAgent()
    {
        if (props.user.userId!=emortion.userId & new Date(emortion.revealsAt) >= new Date() &!answered) return (<div>
            <form id={'answerForm'+emortion._id} onSubmit={SendComment}>
                <input readOnly hidden name="postId" value={props.emortion._id}></input>
                <input readOnly hidden name="userId" value={props.user.userId}></input>
                <input readOnly hidden name="name" value={props.user.name}></input>
                <input defaultValue="" required name="answer" className="form-control answer" placeholder="What do you think the Emorter is saying?"></input>
                <span><Button  type="submit" variant="info">Evaluate</Button></span>
            </form>
        </div>)
        else if(props.user.userId==emortion.userId)
            return (<center><b className="text-success">Cannot answer own posts!</b></center>)
        else if (new Date(emortion.revealsAt) < new Date())
            return (<center><b className="text-success">Answer revealed!</b></center>);
        else if (answered)
            return (<center><b className="text-success">You've already answered this post!</b></center>);
        else return(<div></div>)
    }

    function Comments()
    {
        if(answered || emortion.userId==props.user.userId || new Date(emortion.revealsAt) <= new Date()){
            return (<div>{
                emortion.comments.map((comment, index) => {
                return (
                    // <li className="text-left">{comment.answer}</li>
                    <Comment getComments={getComments} key={index} comment={comment} postId={emortion._id} getPosts={props.getPosts} user={props.user}/>
                )
            })}</div>)}
        else{
            return (<div className="text-warning"><center><b>You haven't answered this question!</b></center></div>);}
    }

    //Main
    return (
        <div>
            {/* {setReturnNo(returnNo+1)} */}
            <div className="card bg-light">
                <div className="card-body">
                    <div className="blackburger-font"><img src={img} width="50px;" className="rounded-circle"/> Emortion By {emortion.name}</div>
                    <p className="text-muted">{new Date(emortion.createdAt).toLocaleString()}</p>
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
                                <hr/>
                                <Comments/>
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