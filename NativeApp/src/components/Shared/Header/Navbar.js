// @flow
import React, {useState} from 'react';
import {ScrollView, SafeAreaView, Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Button from 'react-native-bootstrap-buttons';


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
const Navbar = () => {
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
            </View>
        );
        }
        else{
            return(<View></View>);
        }
    }

    return (
        <View>
            <View style={[s.bgDark, s.navbar]}>
                <View style={s.container}>
                    {/*<Text style={[s.text, s.textWhite]}>Hello Card!</Text>*/}
                    <Image style={[s.logo]} source={require('../../logo.png')}/>
                    <TouchableOpacity style={[s.hamburgertouch]} activeOpacity={0.5} onPress={handleHamburger} >
                        <Image style={[s.hamburger]} source={require('./hamburger.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Collapsable/>
        </View>
    );
};

export default Navbar;
