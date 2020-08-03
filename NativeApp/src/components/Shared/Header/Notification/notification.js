import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {Avatar,Badge} from 'react-native-elements'
import{View,Text} from 'react-native'
import BootstrapStyleSheet from "react-native-bootstrap-styles";

/**STYLES**/
const
    BODY_COLOR = '#000022',
    TEXT_MUTED = '#888888';
// custom constants

const constants = {
    BODY_COLOR, TEXT_MUTED,
};

// custom classes
const classes = {
    notif:{
        margin: 10,
        resizeMode: 'stretch',
        marginLeft:'auto',
    },


};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();

function Notification(props) {

    useEffect(() => {
        if (props.user) {
            // alert("IN notification");
            axios.get('https://facetweetit.herokuapp.com/api/notifications/' + props.user.userId)
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
                    props.setNotifications(res.data);
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
                            props.setNotifications(res.data);
                        });
                    console.log(message.message);
                });
            }

        }
    }, []);

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
            // Avatar with mini badge
            <View  style={s.notif}>
                <Avatar
                    onPress={props.handleOpen}
                    rounded
                    source={require('./notification.png')}
                    size="small"
                />
            <RenderBadge/>
            </View>
        )
    else return (<></>);

    function RenderBadge()
    {
        return (props.notifications.length>0)?(
        <Badge
            value={props.notifications.length}
            status="error"
            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
    ):(<></>)
    }
}


export default Notification