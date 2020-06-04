import React, { useEffect, useState } from 'react';
import Emoticon from '../Emortions/Emoticon'
import { emojiIndex } from 'emoji-mart';
import './Emortion.css'
import axios from 'axios';
import fire from './../../config/Fire';
import { Button, Collapse, Row, Container, Col } from 'react-bootstrap'
import Comment from "./Answers/Comment";
import $ from 'jquery'
import io from "socket.io-client";



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
        GetUserName(emortion.postObjId);

    }, []);
/*    useEffect(() => {

        props.socket.on('comment', message => {
            setComments(message.posts);
        });

    }, [props.ENDPOINT]);*/

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
                getComments(form[0].value);
            }
        });
    }

    function Secret() {
        if (new Date(emortion.expiresAt) <= new Date())
            return (
                <p className="card-text secret">Revealed! <br></br>Secret: {emortion.secretAnswer}</p>
            );
        else return (<p className="card-text">Answer reveals at {new Date(emortion.expiresAt).toLocaleTimeString()}</p>);
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

    const likeComment = () =>{
        setNumLikes(numLikes + 1);
    
        var likePostObj = {
            "_id": props.emortion._id,
            "numLikes": props.emortion.numLikes
        }
        axios.post(`/api/posts/like/${props.userUid}`, likePostObj).then((res)=>{
            console.log(res.data);
            props.getPosts();
        })

    }

    function AnswerAgent()
    {
        return (props.userUid!=emortion.postObjId)? (<div>
                <form id={'answerForm'+emortion._id} onSubmit={SendComment}>
                    <input readOnly hidden name="postId" value={props.emortion._id}></input>
                    <input readOnly hidden name="userId" value={props.userUid}></input>
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
            <div className="card">
                <div className="card-header">
                    Emortion By: {name}
                </div>
                <div className="card-body">
                    <div>
                        {emortion.message.emojiArray.map((position, index) => (
                            <Emoticon key={index} position={position} />
                        ))}
                    </div>
                    {/* {console.log(new Date().toISOString())} */}
                    <Secret />

                    <span onClick={likeComment} className='like'></span> {emortion.numLikes}
                    
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        variant='link'
                    >Show Answers
                    </Button>
                    
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            <AnswerAgent/>
                            <Container fluid className="text-center">
                                <h2>All Comments</h2>
                                    {emortion.comments.map((comment, index) => {
                                        return (
                                            // <li className="text-left">{comment.answer}</li>
                                            <Comment key={index} comment={comment}/>
                                        )
                                    })}
                            </Container>

                        </div>
                    </Collapse>

                    
                </div>
            </div>
            <br></br>
        </div>
    );

}



export default Emortion;