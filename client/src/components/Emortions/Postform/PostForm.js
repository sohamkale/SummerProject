import React, { useEffect, useState } from 'react'
import {EmojiInputBox} from "./EmojiInputBox"
import EmojiPicker from './EmojiPicker'
import { Button } from 'react-bootstrap'
import $ from 'jquery'
import {Picker} from "emoji-mart";
import axios from 'axios'

const API_BASE = process.env.REACT_APP_PRODUCTION ? '' : 'http://localhost:5000';

const PostForm = (props) => {
    const [hasArrived, setHasArrived] = useState(false);
    const [emojis, setEmojis] = useState([]);

    useEffect(() => {

    }, []);

    useEffect(() => {
        setHasArrived(true);

    }, [props]);

    return (
        <div>
            <div className="card bg-light mb-3">
                <div className="card-body">
                    <div className="blackburger-font">TELL ME AN EMORTION!</div>
                    <form id='thePost' onSubmit={submit}>
                        <label htmlFor="type" className='form-check-label'>Type: &nbsp; </label>
                        <select id="postType" name='type' className='form-control-sm'>
                            <option>Timer</option>
                        </select>
                    &nbsp;
                    &nbsp;
                    <label className='form-check-label'>Validity: &nbsp; </label>
                        <select id="postValidity" name='validity' className='form-control-sm'>
                            <option>1h</option>
                            <option>2h</option>
                            <option>3h</option>
                        </select>
                        <EmojiInputBox emojis={emojis} setEmojis={setEmojis}/>
                        <center><div className="text-danger"><b id="empty_warning"></b></div></center>

                        <div className="form-group row">
                            <label  className="col-sm-2 col-form-label" style={{fontFamily:'Ink Free', fontWeight: 'bold', fontSize: '12px', backgroundColor:'rgba(173, 216, 230, 0.4)!important'}}><EmojiPicker appendEmoji={appendEmoji}/></label>
                            <div className="col-sm-6">
                                <input style={{fontFamily:'Ink Free', fontWeight: 'bold'}} defaultValue="" required id="postSecret" placeholder={"Secret Answer to your Emortion"} name="secretAnswer" className="form-control"></input>
                            </div>
                            <Button size="sm" type='submit' className='d-inline' variant="secondary" className="col-sm-2">POST</Button>
                        </div>
                    </form>

                </div>
            </div>
            {/* <div className=" fluid col-12">
        <CommentBox
            postsArray = {postsArray}/>
        </div> */}
        </div>
    );
    
    function submit(e) {

        e.preventDefault();


        document.getElementById("empty_warning").innerHTML="";

        if(document.getElementById("maintext").childElementCount<=0)
            document.getElementById("empty_warning").innerHTML="You cannot Post a message without an emoji!";

        else{

            axios.post('/api/posts/add', {
                userId: props.user.userId ? props.user.userId: "",
                username: props.user.name ? props.user.name: "",
                type: document.getElementById('postType').value,
                emojiObjects: emojis,
                secretAnswer: document.getElementById('postSecret').value,
                validity: document.getElementById('postValidity').value
            })
                .then(function (response) {
                    EraseAll();
                    props.getPosts();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    function appendEmoji(emoji, event) {
        const newList = emojis.concat(emoji);

        setEmojis(newList);
        /*//var ele = event.target.cloneNode(true);
        console.log(emoji)
        var ele = document.createElement('SPAN');
        //console.log(ele);
        //document.getElementById('maintext').appendChild(<GetEmoji emoji={emoji}/>);*/
    }
}



function EraseAll()
{
        document.getElementById("maintext").innerHTML="";
        document.getElementById("postType").value="Timer";
        document.getElementById("postValidity").value="1h";
        document.getElementById("postSecret").value="";
}

export default PostForm;