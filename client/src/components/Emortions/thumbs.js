import React from 'react';
import "./Emortion.css"

function LikeButton(props)
{
    return (
        <img onClick={props.function} style={{margin: '4px'}} className="likes" width="25px" src={require('./like-svg.png')}/>
    );
}

function DislikeButton(props)
{
    return (
        <img onClick={props.function} style={{margin: '4px'}} className="likes" width="25px" src={require('./dislike.png')}/>
    );
}

export {
    LikeButton, DislikeButton
}