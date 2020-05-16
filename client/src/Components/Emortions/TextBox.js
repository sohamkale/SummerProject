import React from 'react'
import "./TextBox.css"
import {Button} from 'react-bootstrap'

function TextBox()
{
    return (
        <div>
            <textarea readOnly id="maintext" className="form-control"></textarea>
            <br></br>
            <Button className='d-inline' onClick={Erase} variant="danger">DELETE</Button>   
        </div>
    );
}

function Erase()
{
    document.getElementById("maintext").value=document.getElementById("maintext").value.slice(0,-2);
}
export default TextBox;