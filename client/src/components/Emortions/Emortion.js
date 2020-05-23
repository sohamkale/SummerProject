import React, { useEffect, useState } from 'react';
import Emoticon from '../Emortions/Emoticon'
import { emojiIndex } from 'emoji-mart';
import './Emortion.css'
import axios from 'axios';
import { Button, Collapse, Row, Container, Col } from 'react-bootstrap'
import Comments from "./Comments";
const Emortion = (props) => {
    let emortion = props.emortion
    //states and vars
    const [name, setName] = useState("anonymous");
    const [open, setOpen] = useState(false);
    const [answer, setAnswer] = useState(null);
    // const [numLikes, setNumLikes] = useState(0);
    useEffect(() => {
        console.log(emortion);
        GetUserName(emortion.postObjId)
    }, []);

    const addComment = () => {
        let comment = {
            'answer': answer,
            'userId': emortion.postObjId,
            // 'numLikes': numLikes
        }
        axios.post(`/api/posts/answer/${emortion._id}`, comment).then((res)=>{
            props.getPosts();
            document.getElementById('answerInput').value = "";
            setAnswer("");
            // console.log(document.getElementById('answerInput').value);
        });
        // console.log(emortion._id);
    }

    const onChangeAnswer = (e) => {
        console.log(e.target.id);
        console.log(e.target.value);
        setAnswer(e.target.value);
    }
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
                            <form>
                                <input hidden name="userId" value={emortion.userId}></input>
                                <input id='answerInput' onChange={onChangeAnswer} className="form-control answer" name="answer" type="text" value={answer} required placeholder="What do you think emorter is saying?.."></input>
                                <span><Button  onClick ={addComment} variant="info">Evaluate</Button></span>
                            </form>
                            <Container fluid className="text-center">
                                <h2>All Comments</h2>
                                <ul>
                                {emortion.comments.map((comment) => {
                                    return (
                                        // <li className="text-left">{comment.answer}</li>
                                        <Comments answer={comment.answer} numLikes={comment.numLikes}/>
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