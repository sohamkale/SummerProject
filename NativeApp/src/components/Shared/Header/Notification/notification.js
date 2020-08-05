/*
import React, {useEffect, useState} from 'react'
import axios from 'axios'


import{View,Text} from 'react-native'
import BootstrapStyleSheet from "react-native-bootstrap-styles";


/!**STYLES**!/
const
    BODY_COLOR = '#000022',
    TEXT_MUTED = '#888888';
// custom constants

const constants = {
    BODY_COLOR, TEXT_MUTED,
};

// custom classes
const classes = {


    notifTray:{
        backgroundColor:'navajowhite',
        height:150,
        borderColor:'goldenrod',
        borderWidth:2,
        color:'darkgoldenrod'
    },
    notifTrayText:{
        color:'darkgoldenrod'
    },
    center:{
        marginLeft:'auto',
        marginRight:'auto'
    }


};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();
*/

function Notification(props) {


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
            <Collapse>
                <CollapseHeader>
                    <View  style={[s.notif, s.center]}>
                        <Avatar
                            onPress={props.handleOpen}
                            rounded
                            source={require('./notification.png')}
                            size="small"
                        />
                        <RenderBadge/>
                    </View>
                </CollapseHeader>
                <CollapseBody>
                    <View style={s.notifTray}>
                        {
                            notifications.map((notif) =>
                                <Text style= {s.notifTrayText}
                                      key={notif._id}> {'\u2022 '+notif.message}
                                </Text>
                            )}
                    </View>
                </CollapseBody>
            </Collapse>

        )
    else return (<></>);


}


export default Notification