import React from 'react'
import EmojiInputBox from './EmojiInputBox'
import Emoji from "./Emoji"
import { Button } from 'react-bootstrap'
import $ from 'jquery'


function PostBox() {
    return (
        <div className="card bg-light mb-3">
            <b className="card-header">TELL ME AN EMORTION!</b>
            <div className="card-body">
                <form id='thePost' onSubmit={submit}>
                    <label for="type" className='form-check-label'>Type: &nbsp; </label>
                    <select name='type' className='form-control-sm'>
                        <option>Timer</option>
                    </select>
                    &nbsp;
                    &nbsp;
                    <label className='form-check-label'>Validity: &nbsp; </label>
                    <select name='time' className='form-control-sm'>
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
                    <input id="secret" name="secret" className="form-control"></input>
                    <br></br>
                    <Button type='submit' className='d-inline' variant="info">POST</Button>
                    <br></br>
                </form>
            </div>
        </div>
    );
}
function submit(e)
{
    e.preventDefault();
    $.ajax({
        url:'http://localhost:5000/api/test/add',
        type:'post',
        data:$('#thePost').serialize(),
        success:function(data){
            console.log($('#thePost').serialize())
            //whatever you wanna do after the form is successfully submitted
        }
    });
}
    
export default PostBox;