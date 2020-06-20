// @flow
import React, {useState, useEffect} from 'react';
import {ScrollView, SafeAreaView, Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import RNRestart from 'react-native-restart'; // Import package from node modules
import Button from 'react-native-bootstrap-buttons';

import fire from '../../../config/Fire'
import axios from 'axios';``

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
        marginLeft: 'auto'
    },
    navbar:{
        height:65
    }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();
/**END OF STYLE**/

/**MAIN**/
const Navbar = (props) => {
    /**FUNCTIONS**/
    function handleHamburger()
    {setOpen(!open);}


    const [open, setOpen] = useState(false);

    function Collapsable()
    {
        if(open)
        {
            return(
            <View style={s.bgDark}>
                <Button buttonType="link" label="Den" />
                <Button buttonType="link" label="Users" />
                <Button buttonType="link" label="Feedback" />
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

    return (
        <View>
            <View style={[s.bgDark, s.navbar]}>
                <View style={s.container}>
                    {/*<Text style={[s.text, s.textWhite]}>Hello Card!</Text>*/}
                    <Image style={[s.logo]} source={require('../../logo.png')}/>
                    <HamburgerButton/>
                </View>
            </View>
            <Collapsable/>
        </View>
    );
};

export default Navbar;