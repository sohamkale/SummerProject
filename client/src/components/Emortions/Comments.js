import React, { useState, useEffect } from 'react';

const Comments = (props) => {
    return (
        <div className="text-left">
            <li>{props.answer} &nbsp; <span className='like'></span> {props.numLikes}</li>
        </div>
    );

}

export default Comments;