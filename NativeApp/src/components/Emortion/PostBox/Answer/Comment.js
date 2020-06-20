import React,{useEffect, useState} from 'react'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import {Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import axios from 'axios'
import {LikeButton, DislikeButton} from '../../thumbs';

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
    dp: {
        borderColor: 'blue',
        borderWidth: 3,
        margin: 5
    },
    center: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    commentTitle: {
        fontWeight: 'bold',
        margin: 13,
        fontSize: 15,
    },
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();

/**END SECTION**/

function Comment(props)
{
    const [img, setImg] = useState(null);

    useEffect(() => {
        axios.get(`http://facetweetit.herokuapp.com/api/users/${props.comment.userId}`).then((res) => {
            setImg(res.data.profileImage);
        }).catch(function (e) {
            console.log(e);
        });
    }, [props.comment]);

    function LikeAgent() {
        return (props.comment.likes.includes(props.user.userId)) ? <DislikeButton size={30} function={dislikeComment}/> : <LikeButton size={30} function={likeComment}/>;
    }

    const likeComment = () =>{
        if(props.comment.userId!=props.user.userId)
        {
            var commentPostObj = {
                comment_id: props.comment._id,
                post_id: props.postId,
                name:props.user.name
            };

            axios.post(`http://facetweetit.herokuapp.com/api/posts/likeComment/${props.user.userId}`, commentPostObj).then((res)=>{
                props.getPosts();
            }).catch(function(e){
                console.log(e)
            });
        }
    }

    const dislikeComment = () =>{
        var commentPostObj = {
            comment_id: props.comment._id,
            post_id: props.postId
        };

        axios.post(`http://facetweetit.herokuapp.com/api/posts/dislikeComment/${props.user.userId}`, commentPostObj).then((res)=>{
            props.getPosts();
        }).catch(function(e){
            console.log(e)
        });

    }

    return ( <View style={[s.card, s.bgLight]}>
        <View style={[s.cardBody]}>
            <View style={[s.center,{width:350}]}>
                <Avatar
                    size={40}
                    containerStyle={s.dp}
                    rounded
                    source={(img != null) ? ({uri: img}) : (require('../../../dpholder.png'))}
                />
                <Text style={s.commentTitle}>{props.comment.name}</Text>
            </View>
            <View style={[s.center]}>
                <LikeAgent/>
                <Text style={s.commentTitle}>{props.comment.answer}</Text>
            </View>
            <Badge value={`Scored: ${props.comment.score}`} status="primary" />
        </View>
    </View>);

}

export default Comment