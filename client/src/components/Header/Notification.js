import React, {useEffect, useState} from 'react'
import './NavBar.css'
import axios from 'axios'
import fire from "../../config/Fire";


function Notification(props) {
    const [notifCounts, setNotifCounts] = useState(0);
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        if(props.user)
        {
            axios.get('/api/notifications/'+props.user.userId)
                .then((res)=>{
                    //setNotifications(res.data);
                    var arr=[];
                    var count =0;
                    res.data.forEach((item,index)=>{
                        if(!item.seen)
                        {
                            count++;
                            arr.push(item);
                        }
                    })
                    setNotifCounts(count);
                    setNotifications(arr);
                });
        }
    }, [props.user]);

    if(props.user)
        return (
        <div className="popup my-4 notifBox my-sm-0 ml-lg-3" id="notif">
            <div className="" onClick={showNotifications}>
                <img src={require('./notification.png')} width="25px" height="auto" alt=""/>
                <NotifBadge />
            </div>
            <div className='popuptext' id='notifications'>
                <div className="notificationBox">
                    {
                        notifications.map((notif) =>
                        <a href={"/Posts/"+notif.postId} key={notif._id} className={"notification"}>{notif.message}</a>
                    )}
                    <center><a href={"/notifications"} className={"notification"} style={{textDecoration: 'underline'}}>See All Notifications</a></center>
                </div>
            </div>
            {/* <span className="popuptext" id="myPopup">Popup text...</span> */}
        </div>
    )
            else return (<div></div>);

    function NotifBadge() {
        return (notifCounts > 0) ? (<span className="badge badge-danger notif-count">{notifCounts}</span>) : (<span></span>)
    }

    function showNotifications() {
        var popup = document.getElementById("notifications");
        popup.classList.toggle("show");
    }
}




export default Notification