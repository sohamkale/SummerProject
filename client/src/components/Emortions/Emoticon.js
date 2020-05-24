import React from 'react'

function Emoticon(position)
{
    var divStyle = {
        width: '24px',
        height: '24px',
        display: 'inline-block',
        backgroundSize: '5700% 5700%',
        backgroundPosition: position.position,
        backgroundImage: 'url(\'https://unpkg.com/emoji-datasource-apple@5.0.1/img/apple/sheets-256/64.png\')',
     };
    
     return (
        <span style={divStyle}></span>
    )
}

export default Emoticon;