// @flow
import React, {useState} from 'react';
import {ScrollView, SafeAreaView, Text, StyleSheet, Image, View, Button} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';


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
        marginLeft: 'auto'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    btnLink: {
        margin: 20
    }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();
/**END OF STYLE**/

/**MAIN**/
const Navbar = () => {
    /**FUNCTIONS**/
    const [open, setOpen] = useState(false);

    return (
        <View>
            <View style={[s.bgDark, s.navbar, s.h45]}>
                <View style={s.container}>
                    {/*<Text style={[s.text, s.textWhite]}>Hello Card!</Text>*/}
                    <Image style={[s.logo]} source={require('../../logo.png')}/>
                    <Image style={[s.hamburger]} source={require('./hamburger.png')}/>
                </View>
            </View>
            {/*Opened Item*/}
            <ScrollView style={s.bgDark}>
                <Button style={[s.btnLink]} title="Den" />
                <Button style={[s.btnLink]} title="Users"/>
                <Button style={[s.btnLink]} title="Feedback"/>
            </ScrollView>
        </View>
    );
};

export default Navbar;