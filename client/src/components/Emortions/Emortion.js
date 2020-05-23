import React,{ useEffect, useState } from 'react';
import Emoticon from '../Emortions/Emoticon'
import { emojiIndex } from 'emoji-mart';
import './Emortion.css'
import axios from 'axios';

const Emortion = (emortion) => {
    emortion = emortion.emortion
    //states and vars
    const [name, setName] = useState("anonymous");
    
    useEffect(() => {
        GetUserName(emortion.postObjId)
    }, []);

    return (
        <div>
            <div class="card">
                <div class="card-header">
                    Emortion By: {name}
            </div>
                <div class="card-body">
                    <div>
                        {emortion.message.emojiArray.map((position, index) => (
                            <Emoticon position={position} />
                        ))}
                    </div>
                    <p class="card-text">Secret: {emortion.secretAnswer}</p>
                    <span className='like'></span> {emortion.numLikes}
                        
                </div>
            </div>
            <br></br>
        </div>
    );

    function GetUserName(userId)
    {
         axios.get('/api/users/'+userId)
        .then((res)=>{
          if(res.data){
              console.log("data is "+res.data)
            setName(res.data);
          }
          else{
              console.log(res)
              setName ("Not Found");
          }
      });
    }
}



export default Emortion;