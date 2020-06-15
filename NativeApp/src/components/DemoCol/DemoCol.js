import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

/**STYLES**/
const
    BODY_COLOR = '#000022',
    TEXT_MUTED = '#888888',
    LIGHT_BLUE = '#ADD8E6';
// custom constants

const constants = {
    BODY_COLOR, TEXT_MUTED, LIGHT_BLUE,
};

// custom classes
const classes = {
  profileContainer: {
      // backgroundColor: LIGHT_BLUE,
      height: 180,
      flexDirection: 'row',
  },
    image: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "navy",
        margin:10
    },
    profileText:{
      margin:15,
        fontWeight:'bold',
        fontSize:20,
        marginTop:40
    }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();
/**END OF STYLE**/

function DemoCol(props)
{
    return(
        <View style={[s.profileContainer]}>
            <TouchableOpacity activeOpacity={0.5} >
                <Image style={[s.image]} source={require('../dpholder.png')}/>
            </TouchableOpacity>
            <Text style={[s.profileText]}>Mohammad Immam{'\n'}m.immam@ufl.edu{'\n'}Score: 20</Text>
        </View>
    );
}

export default DemoCol;
