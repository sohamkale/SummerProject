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
    //states and vars
    const [name, setName] = useState("anonymous");
    const [open, setOpen] = useState(false);
    //const [answer, setAnswer] = useState(null);
    const [userId, setUserId] = useState();
    useEffect(() => {
        GetUserName(emortion.postObjId);
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                setUserId(user.uid);
            }else {
            }
        })
    }, []);

    // const addComment = () => {
    //     let comment = {
    //         'answer': answer,
    //         'userId': userId,
    //         // 'numLikes': numLikes
    //     }
    //     axios.post(`/api/posts/answer/${emortion._id}`, comment).then((res)=>{
    //         props.getPosts();
    //         document.getElementById('answerInput').value = "";
    //         setAnswer("");
    //         // console.log(document.getElementById('answerInput').value);
    //     });
    //     // console.log(emortion._id);
    // }

    // const onChangeAnswer = (e) => {
    //     console.log(e.target.id);
    //     console.log(e.target.value);
    //     setAnswer(e.target.value);
    // }
    return (
        <div>
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
                    <AnswerAgent/>
                    
                </div>
            </div>
            <br></br>
        </div>
    );

    function AnswerAgent()
    {
        if(userId!=emortion.postObjId)
        return(<div>
            <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        variant='link'
                    >
                        Answer the Emortion
                    </Button>
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            <form id={'answerForm'+emortion._id} onSubmit={SendComment}>
                                <input hidden name="userId" value={userId}></input>
                                <input hidden name="name" value={props.currUser}></input>
                                <input defaultValue="" required name="answer" className="form-control answer" placeholder="What do you think the Emorter is saying?"></input>
                                <span><Button  type="submit" variant="info">Evaluate</Button></span>
                            </form>
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
        </div>)
        else
            return(<div></div>);
    }

    function SendComment(e)
    {
        console.log(e)
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
}



export default Emortion;