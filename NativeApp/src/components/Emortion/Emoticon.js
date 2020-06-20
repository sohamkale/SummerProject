import React from 'react'
import {Image, View} from 'react-native'
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import HTML from 'react-native-render-html';


function Emoticon(position) {
    var url = 'https://unpkg.com/emoji-datasource-apple@5.0.1/img/apple/sheets-256/64.png'
    var Style = {
        'emoji':
            {
                width: '24px',
                height: '24px',
                // display: 'inline-block',
                backgroundSize: '5700% 5700%',
                backgroundPosition: position.position,
                backgroundImage: 'url(\'https://unpkg.com/emoji-datasource-apple@5.0.1/img/apple/sheets-256/64.png\')',
            }
    };
    const htmlContent2 = `
      <span style="background: url('64.png');
      width: 25px; height:25px; background-size: 5700% 5700%; background-position:${position.position};
      background-color:rgba(0,0,0,0)">SS</span>

`;

    const htmlContent = `
    <div style="width: 24px; height:24px; overflow: hidden; margin:5px;">
    <img src='https://unpkg.com/emoji-datasource-apple@5.0.1/img/apple/sheets-256/64.png';
      style="width: 5700%; height: 5700%; position: absolute; margin-left: -19.6429%"
      </div>
      

`;
    return (
        <HTML html={htmlContent}/>
    );
}

export default Emoticon
