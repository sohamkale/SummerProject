import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import './DemoCol.css'
import fire from "../../config/Fire";
import axios from 'axios';
import $ from 'jquery'
import {storage} from "../../config/Fire";
function DemoCol(props)
{
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    useState(() => {
        if(props.user){
            setUrl(props.user.profileImage);
        }
    }, []);

    const imageClick = e => {
        window.location="/profile";
    }
       
    const onImageChange = (e) => {
        console.log(e.target.files[0]);
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
            alert(realUploadBtn.value);
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
                        console.log(data);
                    })
                })
            });
        }
    })
    
    // alert("image clicked");
    }

    function ProfileImage()
    {
        var location =useLocation().pathname;
        return (location=="/home"||location=="/Home")?
            (<div className='DemoCol col-lg-2 col-md-2'>
                <br></br>
                <center className="blackburger-font">
                    {props.message}
                    <img width="90%" onClick={imageClick} src={(url === null) ? require('./dpholder.png') : url} className="rounded-circle" alt="Cinque Terre"/>
                    {props.user.name}<br/>
                    Score: {props.user.userscore}
                </center>
            </div>):
            (<div className='DemoCol col-lg-2 col-md-2'>
                <br></br>
                <center className="blackburger-font">
                    {props.message}
                    <form>
                    <div className="container">
                        <input type="file" onChange={onImageChange} id="imgUpload" style={{display:"none"}}/>
                        <img width="100%" onClick={changeImage} src={(url === null) ? require('./dpholder.png') : url} className="rounded-circle dp" />
                            <div  className="overlay rounded-circle">CHANGE</div>
                    </div>
                    {props.user.name}<br/>
                    Score: {props.user.totScore}
                    </form>
                </center>
            </div>)
    }

    return (
        <ProfileImage/>
    );

    
        
    // function trig()
    // {
    //     { $('#imgupload').trigger('click'); };
    // }

}

export default DemoCol;