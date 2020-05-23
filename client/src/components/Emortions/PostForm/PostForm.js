import React, { useEffect, useState } from 'react'
import EmojiInputBox from '../EmojiInputBox'
import Emoji from "../Emoji"
import { Button } from 'react-bootstrap'
import fire from "../../../config/Fire";
import $ from 'jquery'
import axios from 'axios';

const API_BASE = process.env.REACT_APP_PRODUCTION ? '' : 'http://localhost:5000';

const PostForm = (props) => {
    const [userId, setUserId] = useState(null);
    const [hasArrived, setHasArrived] = useState(false);
    useEffect(() => {
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUserId(user.uid);
            }
        });
    }, []);

    useEffect(() => {
        setHasArrived(true);

    }, [props]);




    return (
        <div>
            <div className="card bg-light mb-3">
                <b className="card-header">TELL ME AN EMORTION!</b>
                <div className="card-body">
                    <form id='thePost' onSubmit={submit}>
                        <input hidden name="userId" value={userId}></input>
                        <label for="type" className='form-check-label'>Type: &nbsp; </label>
                        <select name='type' className='form-control-sm'>
                            <option>Timer</option>
                        </select>
                    &nbsp;
                    &nbsp;
                    <label className='form-check-label'>Validity: &nbsp; </label>
                        <select name='validity' className='form-control-sm'>
                            <option>1h</option>
                            <option>2h</option>
                            <option>3h</option>
                        </select>
                        <br></br>
                        <br></br>
                        <EmojiInputBox />
                        <br></br>
                        <Emoji />
                        <br></br>
                        <label>Secret Answer</label>
                        <input required id="secret" name="secretAnswer" className="form-control"></input>
                        <br></br>
                        <Button type='submit' className='d-inline' variant="info">POST</Button>
                        <br></br>
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
        var form = $('#thePost').serializeArray();
        var emojis = (document.getElementById('maintext').childNodes);
        var emojiArray = [];
        emojis.forEach(function (item, index) {
            if (item.nodeName == "SPAN")
                emojiArray.push(item.style.backgroundPosition)
            else
                emojiArray.push(item.getElementsByTagName("SPAN")[0].style.backgroundPosition)
        });
        form.push({ name: 'emojiArray', value: emojiArray })
        $.ajax({
            url: '/api/posts/add',
            type: 'POST',
            data: JSON.stringify(
                form
            ),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (hasArrived) {
                   props.postsArray();
                }
            }
        });
    }

}



export default PostForm;