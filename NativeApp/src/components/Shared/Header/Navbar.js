// @flow
import React, {useState, useEffect} from 'react';
import {
    ScrollView,
    SafeAreaView,
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Linking
} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import RNRestart from 'react-native-restart';
// Import package from node modules
// any js module
import * as RootNavigation from '../../../RootNavigation';
import Button from 'react-native-bootstrap-buttons';

import fire from '../../../config/Fire'
import axios from 'axios';``
import {Avatar,Badge} from 'react-native-elements'

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
    logo: {
        width: 65,
        height: 45,
        margin: 10,
        resizeMode: 'stretch',
    },
    hamburger: {
        width: 35,
        height: 30,
        margin: 15,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    btnLink: {
        margin: 20
    },
    hamburgertouch:{
    },
    navbar:{
        height:65
    },
    notifTray:{
        backgroundColor:'navajowhite',
        borderColor:'goldenrod',
        borderWidth:2,
        color:'darkgoldenrod'
    },
    notifTrayText:{
        color:'darkgoldenrod'
    },
    notif:{
        margin: 10,
        resizeMode: 'stretch',
        marginLeft:'auto',
    },
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();
/**END OF STYLE**/

/**MAIN**/
const Navbar = (props) => {
    /**FUNCTIONS**/
    function handleHamburger()
    {
        /*RootNavigation.toggleDrawer();*/
        setOpen(!open);
    }

    function NavigateToPage(name, props)
    {
        setOpen(false);
        RootNavigation.navigate(name,props);
    }

    function OpenUrl(url)
    {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }

    const [open, setOpen] = useState(false);
    const [notifOpen,setNotifOpen]=useState(false);

    useEffect(() => {
        if (props.user) {
            // alert("IN notification");
            axios.get('https://facetweetit.herokuapp.com/api/notifications/' + props.user.userId)
                .then((res) => {
                    props.setNotifications(res.data);
                });

        }
    }, [props.user]);

    function Collapsable()
    {
        if(open)
        {
            return(
            <View style={s.bgDark}>
                {/*<Button buttonType="link" label="Den" />*/}
                <Button buttonType="link" label="Users" onPress={()=>NavigateToPage('Users',{user: props.user})}/>
                <Button buttonType="link" label="Feedback" onPress={()=>OpenUrl("http://www.emoteit.me/Feedback")}/>
                <Button buttonType="link" label="FAQ" onPress={()=>OpenUrl("http://www.emoteit.me/FAQ")}/>
                <LogoutButton/>
            </View>
        );
        }
        else{
            return(<View></View>);
        }
    }

    function handleLogout()
    {
        fire.auth().signOut().then(function() {
            setOpen(false);
            props.setUser(null);
            // Immediately reload the React Native Bundle
            RNRestart.Restart();
        }).catch(function(error) {
            // An error happened.
        });
    }

    function HamburgerButton()
    {
       return (props.user!=null) ? (
           <TouchableOpacity style={[s.hamburgertouch]} activeOpacity={0.5} onPress={handleHamburger} >
               <Image style={[s.hamburger]} source={require('./hamburger.png')}/>
           </TouchableOpacity>
       ) : (<></>)

    }

    function LogoutButton()
    {
        return (props.user!=null) ? (<><Button buttonType={'link'} label={'Welcome '+ props.user.name + ' Logout?'} onPress={handleLogout}></Button></> ):(<></>);
    }



    function NotificationTray() {
        if (notifOpen) {
            return (<View style={s.notifTray}>
                {
                    props.notifications.map((notif) =>
                        <>
                            <Text style= {s.notifTrayText}
                               key={notif._id}> {'\u2022 '+notif.message}
                            </Text>
                            <View style={{width:30, margin:2}}><Button buttonType={"danger"} label={"X"} onPress={()=>notificationSeen(notif)}/></View></>
                    )}
            </View>)
        }
        else return(<></>)
    }
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

    function notificationSeen(notif) {
        // alert("notification seen");

        axios.post('https://facetweetit.herokuapp.com/api/notifications/' + notif._id)
            .then((res) => {
                axios.get('https://facetweetit.herokuapp.com/api/notifications/' + props.user.userId)
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
                        props.setNotifications(res.data);
                    });
            });
    }

    function HandleNotifOpen() {
        setNotifOpen(!notifOpen);
    }

    return (
        <View>
            <View style={[s.bgDark, s.navbar]}>
                <View style={s.container}>
                    <HamburgerButton/>
                    <TouchableHighlight onPress={()=> {if(props.user) NavigateToPage('Home',{user: props.user})}}>
                    <Image style={[s.logo]} source={require('../../logo.png')}/>
                    </TouchableHighlight>
                    <View  style={[s.notif, s.center]}>
                        <Avatar
                            onPress={HandleNotifOpen}
                            rounded
                            source={require('./Notification/notification.png')}
                            size="small"
                        />
                        <RenderBadge/>
                    </View>
                    {/*<Notification user={props.user} handleOpen={HandleNotifOpen} notifications={notifications} setNotifications={setNotifications}/>*/}
                </View>
            </View>
            <NotificationTray/>
            <Collapsable/>
        </View>
    );
};

export default Navbar;
