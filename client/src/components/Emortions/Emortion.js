import React, { useEffect, useState } from 'react';
import Emoticon from '../Emortions/Emoticon'
import { emojiIndex } from 'emoji-mart';
import './Emortion.css'
import axios from 'axios';
import fire from './../../config/Fire';
import { Button, Collapse, Row, Container, Col } from 'react-bootstrap'
import Comments from "./Answers/Comments";
import $ from 'jquery'



const Emortion = (props) => {
    let emortion = props.emortion

    //console.log(props)
    //states and vars
    const [name, setName] = useState("anonymous");
    const [open, setOpen] = useState(false);
    //const [answer, setAnswer] = useState(null);


    useEffect(() => {
        GetUserName(emortion.postObjId);

    }, []);

    const addComment = (answer, event) => {
        // console.log(props);
        event.preventDefault();
        let comment = {
            'answer': answer,
            'userId': props.userUid,
            'name': props.currUser
            // 'numLikes': numLikes
        }
        axios.post(`/api/posts/answer/${emortion._id}`, comment).then((res)=>{
            let comment2 = {
                'answer': answer,
                'userId': props.userUid,
                'name': props.currUser,
                'postId': emortion._id
            }
            // console.log("POSTARRAY: " );
            // console.log(props.postsArray);
            //props.addComment(comment2, props.postsArray);
            // props.getPosts(event);
            document.getElementById('answerInput').value = "";
            // setAnswer("");
        });
    }

    // const onChangeAnswer = (e) => {
    //     console.log(e.target.id);
    //     console.log(e.target.value);
    //     setAnswer(e.target.value);
    // }


    function SendComment(e)
    {
        e.preventDefault();
        var form = $('#answerForm'+emortion._id).serializeArray();
        $.ajax({
            url: '/api/posts/answer/'+emortion._id,
            type: 'POST',
            data: JSON.stringify(
                form
            ),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                props.getPosts();
                console.log(e)
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

    function AnswerAgent()
    {
        return (props.userUid!=emortion.postObjId)? (<div>
                <form id={'answerForm'+emortion._id} onSubmit={SendComment}>
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

                    <span className='like'></span> {emortion.numLikes}

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
                                <ul>
                                    {emortion.comments.map((comment, index) => {
                                        return (
                                            // <li className="text-left">{comment.answer}</li>
                                            <Comments key={index} currUser={props.currUser} answer={comment.answer} comment={comment} numLikes={comment.numLikes}/>
                                        )
                                    })}
                                </ul>
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