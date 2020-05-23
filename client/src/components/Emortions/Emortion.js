import React, { useEffect, useState } from 'react';
import Emoticon from '../Emortions/Emoticon'
import { emojiIndex } from 'emoji-mart';
import './Emortion.css'
import axios from 'axios';
import { Button, Collapse } from 'react-bootstrap'

const Emortion = (emortion) => {
    emortion = emortion.emortion
    //states and vars
    const [name, setName] = useState("anonymous");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        GetUserName(emortion.postObjId)
    }, []);

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
                                <input className="form-control answer" name="answer" type="text" required placeholder="What do you think emorter is saying?.."></input>
                                <span><Button variant="info" type="submit">Evaluate</Button></span>
                            </form>
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