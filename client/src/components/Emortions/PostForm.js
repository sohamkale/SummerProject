import React, { useEffect, useState } from 'react'
import EmojiInputBox from './EmojiInputBox'
import Emoji from "./Emoji"
import { Button } from 'react-bootstrap'
import fire from "../../config/Fire";
import $ from 'jquery'
import axios from 'axios';

const API_BASE = process.env.REACT_APP_PRODUCTION ? '' : 'http://localhost:5000';

const PostForm = (props) => {
    const [hasArrived, setHasArrived] = useState(false);
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
                        <input readOnly hidden name="userId" value={props.userUid ? props.userUid: ""}></input>
                        <input readOnly hidden name="username" value={props.username ? props.username: ""}></input>
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
                        <EmojiInputBox />
                        <center><div className="text-danger"><b id="empty_warning"></b></div></center>
                        <Emoji />
                        <div className="form-group row">
                            <label  className="col-sm-2 col-form-label" style={{fontFamily:'Ink Free', fontWeight: 'bold', backgroundColor:'rgba(173, 216, 230, 0.4)!important'}}>Secret</label>
                            <div className="col-sm-6">
                                <input style={{fontFamily:'Ink Free', fontWeight: 'bold'}} defaultValue="" required id="postSecret" name="secretAnswer" className="form-control"></input>
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
                        EraseAll();
                        props.getPosts();
                    }
                }
            });
        }
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