import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { Avatar } from 'react-native-elements'

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
    dp: {
        borderWidth: 3,
        borderColor: "navy",
        margin:5
    },
    profileText:{
      margin:15,
        fontFamily:'BlackBurger',
        fontSize:18,
        marginTop:40
    }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();
/**END OF STYLE**/

function DemoCol(props)
{
    var x=props.user.profileImage;
    return(
        <View style={[s.profileContainer]}>
                <Avatar
                    size={150}
                    containerStyle={s.dp}
                    rounded
                    source={{ uri: props.user.profileImage }}
                />
            <Text style={[s.profileText]}>{'WELCOME TO THE DEN\n'+props.user.name+'\nScore: '+props.user.totScore}</Text>
        </View>
    );
}

export default DemoCol;
