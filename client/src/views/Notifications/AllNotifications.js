import React, {useEffect, useState} from 'react'
import axios from "axios";
import './Notifications.css'

function AllNotifications(props) {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if (props.user) {
            axios.get('/api/allnotifications/' + props.user.userId)
                .then((res) => {
                    setNotifications(res.data);
                });
        }
    }, [props.user]);

    return (
        <center>
        <div className="container-fluid row">
            <div className="col-12">
                    <div className="notificationBigBox">
                        {
                            notifications.map((notif) =>
                                <div>
                                    <a href={"/Posts/" + notif.postId} key={notif._id}
                                   className={"Bignotification"}>{notif.message}
                                        <p className="text-muted">{new Date(notif.createdAt).toLocaleString()}</p>
                                    </a>

                                </div>
                            )}
                        {/*<center><a href={"/notifications"} className={"notification"}*/}
                        {/*           style={{textDecoration: 'underline'}}>See All Notifications</a></center>*/}
                    </div>
            </div>
        </div>

        </center>
    )
}

export default AllNotifications;