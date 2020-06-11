import React from 'react';
import 'emoji-mart/css/emoji-mart.css'
import './Emoji.css'
import {Picker} from 'emoji-mart'
import {useMediaPredicate} from "react-media-hook";

function Emoji() {
/*    const isMobile = useMediaPredicate("(max-width: 767px)");
    const isTablet = useMediaPredicate("(min-width: 768px)");
    const isDesktop = useMediaPredicate("(min-width: 1025px)");*/

    return (
        <div>
            <div className="popup" id="popup">
                <div className="" onClick={myFunction}>
                    <img src={require('../emoji.png')} width='30px;'></img>
                </div>
                <div className='popuptext' id='myPopup'>
                    <div className="col-12"><PickerFunc/></div>
                </div>
                {/* <span className="popuptext" id="myPopup">Popup text...</span> */}
            </div>
        </div>
    );

    function PickerFunc() {
        return <Picker id="picker" style={{position: "relative", width: "100%", height: "100%"}}
                       onClick={AppendEmoji} /* include={["flags","foods","search"]}*/ /*exclude={["recent","smileys","foods","Search","people"]}*/ />
        /*   if(isMobile){
             return <Picker style={{ width: '90vw', position: 'absolute', top: '2vh', right: '-23vw'}} onClick={AppendEmoji}  /!*include={["flags"]}*!/ exclude={["recent"]} />
           }else if(isTablet){
             return <Picker style={{width: '60vw', position: 'absolute', top: '2vh', right: '2vw'}} onClick={AppendEmoji}  /!*include={["flags"]}*!/ exclude={["recent"]} />
           }else /!*if (isDesktop)*!/ {
             return <Picker onClick={AppendEmoji}  /!*include={["flags"]}*!/ exclude={["recent"]} />
           }*/
    }
}


function AppendEmoji(emoji, event) {
    var ele = event.target.cloneNode(true);
    //console.log(ele);
    document.getElementById('maintext').appendChild(ele);
}

function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

export default Emoji;
