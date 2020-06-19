import {Picker} from "emoji-mart";
import React from "react";
import './Emoji.css'

class EmojiPicker extends React.Component/*(props)*/ {
    /*    const isMobile = useMediaPredicate("(max-width: 767px)");
        const isTablet = useMediaPredicate("(min-width: 768px)");
        const isDesktop = useMediaPredicate("(min-width: 1025px)");*/
    /* function shouldComponentUpdate()
     {
         return false;
     }*/
    popupFunc() {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }
    render() {
        return (
            <div>
                <div className="popup" id="popup">
                    <div className="" onClick={this.popupFunc.bind(this)}>
                        <img src={require('../emoji.png')} width='30px;'></img>
                    </div>
                    <div className='popuptext' id='myPopup'>
                        <div className="col-12">
                            <Picker id="picker" style={{position: "relative", width: "100%", height: "100%"}}
                                                        onClick={this.props.appendEmoji} /* include={["flags","foods","search"]}*/ exclude={["title"]} />
                        </div>
                    </div>
                    {/* <span className="popuptext" id="myPopup">Popup text...</span> */}
                </div>
            </div>
        );
    }

}

export default EmojiPicker