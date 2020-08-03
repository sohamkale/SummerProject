import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import './DemoCol.css'
import axios from 'axios';
import {storage} from "../../config/Fire";

function DemoCol(props)
{
    //const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    useState(() => {
        if(props.user){
            setUrl(props.user.profileImage);
        }
    }, props);

    const imageClick = e => {
        window.location="/profile";
    }
       
    const onImageChange = (e) => {
        // props.skillsArray.map((skillObj) => {
        //     if(skillObj.id === e.target.id){
        //       skillObj.imgName = e.target.files[0].name;
        //       skillObj.imgBool = true;
        //     }
        // })
    }

    const changeImage = e => {
        const realUploadBtn = document.getElementById('imgUpload');
        realUploadBtn.click();
        realUploadBtn.addEventListener('change', () => {
        if(realUploadBtn.value){

            const uploadTask = storage.ref(`images/${props.user.userId}/profileImage/${"image"}`).put(realUploadBtn.files[0]);
        
            uploadTask.on("state_changed", snapshot => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            }, error => {
                console.log(error);
            }, () => {
                storage.ref(`images/${props.user.userId}/profileImage/`).child(`${"image"}`).getDownloadURL().then(url => {
                    setUrl(url);
                    var newImage = {
                        "url": url
                    }
                    axios.post(`/api/users/addProfileImage/${props.user.userId}`, newImage).then((data)=>{
                    })
                })
            });
        }
    })
    
    // alert("image clicked");
    }

    function ChangeOption()
    {
            var location=useLocation().pathname;
            return (location.toLowerCase()==="/profile")?(
                <div className="container">
                    <input type="file" onChange={onImageChange} id="imgUpload" style={{display:"none"}}/>
                    <img width="100%" onClick={changeImage} src={(url === null || url === "null") ? require('../Shared/dpholder.png') : url} className="rounded-circle dp" />
                    <div>Click to Change</div>
                    <div  className="overlay rounded-circle">CHANGE</div>
                </div>
               ):( <div className="container">
                <img width="100%" src={(props.user.profileImage === null || props.user.profileImage === "null") ? require('../Shared/dpholder.png') : props.user.profileImage} className="rounded-circle dp" />
            </div>)
    }
    function VerticalDemo()
    {
        var location =useLocation().pathname;
        return (location.toLowerCase()=="/home")?
            (
                <div className='DemoCol'>
                    <br></br>
                    <center className="blackburger-font">
                        {props.message}
                        <img width="90%" onClick={imageClick} src={(url === null || url === "null") ? require('../Shared/dpholder.png') : url} className="rounded-circle" alt="Cinque Terre"/>
                        {props.user.name}<br/>
                        Score: {props.user.totScore}
                    </center>
                </div>):
            (<div className='DemoCol'>
                <br></br>
                <center className="blackburger-font">
                    {props.message}
                    <form>
                        <ChangeOption/>

                        {props.user.name}<br/>
                        Score: {props.user.totScore}
                    </form>
                </center>
            </div>)
    }

    function HorizontalDemo()
    {
        var location =useLocation().pathname;
        return (location=="/home"||location=="/Home")?
            (
                <div className='card-body row DemoVer blackburger-font'>
                    <div className="col-6"><img width="90%" onClick={imageClick} src={(url === null || url === "null") ? require('../Shared/dpholder.png') : url} className="rounded-circle" alt="Cinque Terre"/></div>
                    <div className="col-6 blackburger-font" style={{fontSize:'12px'}}>
                        <br/>
                        <br/>
                        {props.message}<br/>
                        {props.user.name}<br/>
                        Score: {props.user.totScore}
                    </div>
                </div>):
            ( <div className='card-body row DemoVer blackburger-font'>
                    <div className="col-6"> <form>
                        <ChangeOption/>
                    </form></div>
                    <div className="col-6 blackburger-font" style={{fontSize:'12px'}}>
                        <br/>
                        <br/>
                        {props.message}<br/>
                        {props.user.name}<br/>
                        Score: {props.user.totScore}
                    </div>
                </div>
            )
    }

    return (
        <div className="col-lg-2 col-md-2"><VerticalDemo/>
        <HorizontalDemo/>
        </div>
    );

    
        
    // function trig()
    // {
    //     { $('#imgupload').trigger('click'); };
    // }

}

export default DemoCol;