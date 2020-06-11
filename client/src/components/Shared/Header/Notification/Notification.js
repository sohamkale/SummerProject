import React, {useEffect, useState} from 'react'
import '../NavBar.css'
import axios from 'axios'

function Notification(props) {
    const [notifCounts, setNotifCounts] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const ENDPOINT = "/";


    useEffect(() => {
        if (props.user) {
            // alert("IN notification");
            axios.get('/api/notifications/' + props.user.userId)
                .then((res) => {
                    /*     //setNotifications(res.data);
                         var arr=[];
                         var count =0;
                         res.data.forEach((item,index)=>{
                             if(!item.seen)
                             {
                                 count++;
                                 arr.push(item);
                             }
                         })*/
                    setNotifCounts(res.data.length);
                    setNotifications(res.data);
                });

            if (props.socket) {
                props.socket.on('notification', message => {
                    // alert(message.message);
                    axios.get('/api/notifications/' + props.user.userId)
                        .then((res) => {
                            /*          //setNotifications(res.data);
                                      var arr=[];
                                      var count =0;
                                      res.data.forEach((item,index)=>{
                                          if(!item.seen)
                                          {
                                              count++;
                                              arr.push(item);
                                          }
                                      })*/
                            setNotifCounts(res.data.length);
                            setNotifications(res.data);
                        });
                    console.log(message.message);
                });
            }

        }
    }, [props.user, props.socket]);

    function notificationSeen(notif) {
        // alert("notification seen");

        axios.post('/api/notifications/' + notif._id)
            .then((res) => {
                axios.get('/api/notifications/' + props.user.userId)
                    .then((res) => {
                        /*    //setNotifications(res.data);
                            var arr=[];
                            var count =0;
                            res.data.forEach((item,index)=>{
                                if(!item.seen)
                                {
                                    count++;
                                    arr.push(item);
                                }
                            })*/
                        setNotifCounts(res.data.length);
                        setNotifications(res.data);
                    });
            });
    }

    if (props.user)
        return (
            <div className="popup my-4 notifBox my-sm-0 ml-lg-3" id="notif">
                <div className="" onClick={showNotifications}>
                    <img src={require('./notification.png')} width="25px" height="auto" alt=""/>
                    <NotifBadge/>
                </div>
                <div className='popuptext' id='notifications'>
                    <div className="notificationBox">
                        {
                            notifications.map((notif) =>
                                <div class='notifBackground'>
                                    <a onClick={() => notificationSeen(notif)} href={"/Posts/" + notif.postId}
                                       key={notif._id} className={"notification"}>{notif.message}
                                        <p className="text-muted">{new Date(notif.createdAt).toLocaleString()}</p>
                                    </a>
                                    <span onClick={() => notificationSeen(notif)} className="btn btn-secondary btn-sm mb-2 btn-x">X</span>
                                </div>
                            )}
                        <center><a href={"/notifications"} className={"notification"}
                                   style={{textDecoration: 'underline'}}>See All Notifications</a></center>
                    </div>
                </div>
                {/* <span className="popuptext" id="myPopup">Popup text...</span> */}
            </div>
        )
    else return (<div></div>);

    function NotifBadge() {
        return (notifCounts > 0) ? (<span className="badge badge-danger notif-count">{notifCounts}</span>) : (
            <span></span>)
    }

    function showNotifications() {
        var popup = document.getElementById("notifications");
        popup.classList.toggle("show");
    }
}


export default Notification