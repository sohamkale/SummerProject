import React, {useState, useEffect} from 'react'
import {TouchableOpacity, View, Image, Text} from "react-native";
import {ScrollView} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import axios from 'axios'

/**importing required files**/
import {LikeButton, DislikeButton} from "../thumbs";
import Emoticon from '../Emoticon'

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
    hr: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
        alignItems: 'center',
        opacity: 0.4
    },
    dp: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "navy",
        margin: 10
    },
    row: {
        flexDirection: 'row'
    },
    title: {
        fontWeight: "bold",
        margin: 15,
        fontSize: 18
    },
    time: {
        color: "grey",
        fontSize: 10
    },
    secret: {
        fontWeight: "bold",
        margin: 15,
    },
    likes:{
        fontSize:18,
        margin:10,
        fontWeight: "bold"
    }

};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();


function Emortion(props) {
    const [img, setImg] = useState(null);

    useEffect(() => {
        axios.get(`http://facetweetit.herokuapp.com/api/users/${props.emortion.userId}`).then((res) => {
            setImg(res.data.profileImage)
        }).catch(function (e) {
            console.log(e)
        });
    }, [props.emortion]);

    function LikeAgent()
    {
        return (props.emortion.likes.includes(props.user.userId)) ? <DislikeButton/> : <LikeButton/>;
    }


    return (
        <View style={[s.card]}>
            <View style={[s.cardBody, s.row]}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Image style={[s.dp]} source={(img != null) ? ({uri: img}) : (require('../../dpholder.png'))}/>
                    </TouchableOpacity>
                    <View>
                        <Text style={[s.title]}>{props.emortion.name}</Text>
                    </View>
                    <View>
                        <Text style={[s.time]}>{new Date(props.emortion.createdAt).toLocaleString()}</Text>
                    </View>
            </View>
            <View style={s.row}>
               {
                    props.emortion.message.emojiArray.map((position, index) => (
                            <Emoticon key={index} position={position} />
                        ))
               }
            </View>
            <View>
                <Text style={[s.secret]}>Answer: {props.emortion.secretAnswer}</Text>
            </View>
            <View style={s.row}>
                <LikeAgent/>
                <Text style={s.likes}>{props.emortion.likes.length}</Text>
            </View>
        </View>
    );
}

export default Emortion;