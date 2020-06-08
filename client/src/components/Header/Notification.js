import React, {useState} from 'react'
import './NavBar.css'


function Notification() {
    const [notifCounts, setNotifCounts] = useState(2);

    return (
        <div className="popup my-4 notifBox my-sm-0 ml-lg-3" id="popup">
            <div className="" onClick={showNotifications}>
                <img src={require('./notification.png')} width="25px" height="auto" alt=""/>
                <NotifBadge/>
            </div>
            <div className='popuptext' id='notifications'>
                <div className="notification">
                    Foreach Notification put a notification Here
                </div>
            </div>
            {/* <span className="popuptext" id="myPopup">Popup text...</span> */}
        </div>
    );

    function NotifBadge() {
        return (notifCounts > 0) ? (<span className="badge badge-danger notif-count">{notifCounts}</span>) : (<t></t>)
    }

    function showNotifications() {
        var popup = document.getElementById("notifications");
        popup.classList.toggle("show");
    }
}




export default Notification