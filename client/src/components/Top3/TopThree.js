import React, {useState, useEffect} from 'react'
import axios from "axios";
import Comment from "../Emortions/Postbox/Answers/Comment";
function TopThree()
{
    const [three, setThree] = useState([]);

    useEffect(()=>{
        axios.get(`/api/users/top`).then((res)=>{
            if(res.data)
            {
                setThree(res.data);
            }
        }).catch(function(e){
            console.log(e)
        });

    }, [])

    return (<>
        <br/>
        <center><div className="card col-lg-4 col-sm-12 col-md-12">
        <div className="card-header bg-warning text-white font-weight-bolder">
            TOP THREE EMOTERS
        </div>
        <div className="card-body text-left">
                {three.map((top, index) => {
            return (
            // <li className="text-left">{comment.answer}</li>
                <><img src={top.profileImage} width="20px;"
                     className="rounded-circle"/><span className="text-uppercase font-weight-bolder"> {top.name} - Score: {top.totScore}</span><br/></>
            )
        })}
        </div>
        </div></center></>)
}

export default TopThree;