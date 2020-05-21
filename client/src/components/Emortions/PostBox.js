import React from './node_modules/react'
import EmojiInputBox from './EmojiInputBox'
import Emoji from "./Emoji"
import { Button } from './node_modules/react-bootstrap'


function PostBox() {
    return (
        <div className="card bg-light mb-3">
            <b className="card-header">TELL ME AN EMORTION!</b>
            <div className="card-body">
                <form>
                    <label className='form-check-label'>Type: &nbsp; </label>
                    <select name='emortionType' className='form-control-sm'>
                        <option>Timer</option>
                    </select>
                    &nbsp;
                    &nbsp;
                    <label className='form-check-label'>Validity: &nbsp; </label>
                    <select name='emortionType' className='form-control-sm'>
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
                    <input id="secret" className="form-control"></input>
                    <br></br>
                    <Button className='d-inline' variant="info">POST</Button>
                    <br></br>
                </form>
            </div>
        </div>
    );
}
export default PostBox;