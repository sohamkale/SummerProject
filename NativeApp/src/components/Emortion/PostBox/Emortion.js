import React, {useState, useEffect} from 'react';
import {TouchableOpacity, TouchableHighlight, View, Image, Text} from 'react-native';
import{Badge} from 'react-native-elements'
import {ScrollView} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import axios from 'axios';
import {Emoji} from 'emoji-mart-native';

/**importing required files**/
import {LikeButton, DislikeButton} from '../thumbs';
import Emoticon from '../Emoticon';


/** SECTION : STYLES**/
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
        opacity: 0.4,
    },
    dp: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'navy',
        margin: 10,
    },
    row: {
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        margin: 15,
        fontSize: 18,
    },
    time: {
        color: 'grey',
        fontSize: 10,
    },
    secret: {
        fontWeight: 'bold',
        margin: 15,
        fontSize:20
    },
    likes: {
        fontSize: 18,
        margin: 10,
        fontWeight: 'bold',
    },

    emojibox: {
        flexWrap: 'wrap',
    },

    ansBtn:{
        justifyContent: 'center',
        width:250
    },
    center:{
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    commentTitle:{
        fontWeight: 'bold',
        margin: 13,
        fontSize: 15,
    }

};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();
/**END SECTION**/

function Emortion(props) {
    const [img, setImg] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get(`http://facetweetit.herokuapp.com/api/users/${props.emortion.userId}`).then((res) => {
            setImg(res.data.profileImage);
        }).catch(function (e) {
            console.log(e);
        });
    }, [props.emortion]);

    function LikeAgent() {
        return (props.emortion.likes.includes(props.user.userId)) ? <DislikeButton/> : <LikeButton/>;
    }

    function RenderEmoji() {
        if (props.emortion.message.emojiObjects != null) {
            return (
                <View style={[s.center, s.emojibox]}>
                    {
                        props.emortion.message.emojiObjects.map((emojidata, index) => {
                            return (
                                <Emoji margin={2} style={s.emoji} emoji={emojidata} size={40} key={index}/>
                            );
                        })}
                </View>
            );
        } else {
            return (<></>);
        }
    }

    if (props.emortion.message.emojiObjects != null & props.emortion.message.emojiObjects.length > 0) {
        return (
            <>
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
                <RenderEmoji/>
                <View style={s.center}>
                    <Text style={[s.secret]}>Answer: {props.emortion.secretAnswer}</Text>
                </View>
                <View style={s.row}>
                    <LikeAgent/>
                    <Text style={s.likes}>{props.emortion.likes.length}</Text>
                    <View style={[s.row, s.ansBtn]}>
                    <TouchableHighlight style={[s.btnTouchable]}>
                        <View style={[s.btn, s.btnOutlineInfo]}>
                            <Text style={[s.btnText, s.textInfo]}>Answers</Text>
                        </View>
                    </TouchableHighlight>
                    </View>
                </View>
            </View>
                <View style={[s.card, s.bgLight]}>
                    <View style={[s.cardBody]}>
                        <View style={s.center}>
                            <Text style={s.commentTitle}>Sanjana Meherun</Text>
                        </View>
                        <View style={s.center}>
                            <Text style={s.commentTitle}>She Answered</Text>
                        </View>
                        <View style={s.badge}>
                            <Text style={s.commentTitle}>She Answered</Text>
                        </View>
                    </View>
                </View>
                </>
        );
    } else {
        return (<></>);
    }
}

export default Emortion;
