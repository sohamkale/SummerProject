import React, {useState, useEffect} from 'react';
import {TouchableOpacity, TouchableHighlight, View, Image, Text, TextInput} from 'react-native';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements'
import {ScrollView} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import axios from 'axios';
import {Emoji} from 'emoji-mart-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
//import Collapsible from 'react-native-collapsible';


/**importing required files**/
import {LikeButton, DislikeButton} from '../thumbs';
import Comment from './Answer/Comment';
import Button from "react-native-bootstrap-buttons";

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
        borderColor: 'blue',
        borderWidth: 3,
        margin: 5
    },
    row: {
        flexDirection: 'row',
    },
    title: {

        fontFamily: 'BlackBurger',
        margin: 15,
        fontSize: 18
    },
    time: {
        color: 'grey',
        fontSize: 10,
    },
    secret: {
        margin: 15,
        marginLeft:'auto',
        marginRight:'auto',
        fontSize: 20,
        backgroundColor: 'rgba(	173, 216, 230, 0.4 )',
        fontFamily: 'cavolini'
    },
    likes: {
        fontSize: 18,
        margin: 10,
        fontWeight: 'bold',
    },

    emojibox: {
        flexWrap: 'wrap',
    },

    ansBtn: {
        marginLeft:'auto',marginRight:'auto',
        marginBottom:10,
        justifyContent: 'center',
        width: 250
    },
    center: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
        marginBottom: 12,
    },
    commentTitle: {
        fontWeight: 'bold',
        margin: 13,
        fontSize: 15,
    },

    inputBox:{
        margin:5,
        borderColor: 'grey',
        borderWidth: 1,
        fontFamily: 'cavolini'
    }

};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();

/**END SECTION**/

function Emortion(props) {
    const [img, setImg] = useState(null);
    const [close, setClose] = useState(true);
    const [answered, setAnswered] = useState(false);


    useEffect(() => {
        didUserAnswer();
        axios.get(`https://facetweetit.herokuapp.com/api/users/${props.emortion.userId}`).then((res) => {
            setImg(res.data.profileImage);
        }).catch(function (e) {
            console.log(e);
        });
    }, [props.emortion]);

    function Secret() {
        if (new Date(props.emortion.revealsAt) <= new Date())
            return (<>
                <Badge status={"success"} value={"REVEALED"}/>
                <View style={[s.center, s.answers]}>
                    <Text style={[s.secret]}>SECRET: {props.emortion.secretAnswer}</Text>
                </View>
                </>
            );
        else return (
            <View style={s.center}>
                <Badge status="warning"
                       value={`Answer reveals at ${new Date(props.emortion.revealsAt).toLocaleTimeString()}`}/>
                <Badge status="warning" value={`or when answered`}/>
            </View>
        );
    }

    function didUserAnswer() {
        var postObj = {
            _id: props.emortion._id,
        }
        axios.post(`https://facetweetit.herokuapp.com/api/posts/diduseranswer/${props.user.userId}`, postObj).then((res) => {
            //props.getPosts();
            setAnswered(res.data);
        }).catch(function (e) {
            console.log(e)
        });
    }

    function LikeAgent() {
        return (props.emortion.likes.includes(props.user.userId)) ? <DislikeButton function={dislikePost}/> :
            <LikeButton function={likePost}/>;
    }

    const likePost = () => {
        if (props.user.userId != props.emortion.userId) {
            var likePostObj = {
                _id: props.emortion._id,
                name: props.user.name
            };

            axios.post(`https://facetweetit.herokuapp.com/api/posts/like/${props.user.userId}`, likePostObj).then((res) => {
                props.getPosts();
            }).catch(function (e) {
                console.log(e)
            });

        }
    }

    const dislikePost = () => {

        var likePostObj = {
            _id: props.emortion._id,
        };

        axios.post(`https://facetweetit.herokuapp.com/api/posts/dislike/${props.user.userId}`, likePostObj).then((res) => {
            props.getPosts();
        }).catch(function (e) {
            console.log(e)
        });

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

    function SendComment(answer)
    {
        if(answer!=null || answer!='')
        {
            axios.post('https://facetweetit.herokuapp.com/api/posts/answera/'+props.emortion._id, {
                answer: answer,
                userId: props.user.userId,
                name: props.user.name
            })
                .then(function (res) {
                    props.getPosts();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    function AnswerAgent({sendComment}) {
        const [commentToSend, setCommentToSend] = useState('');
        if (props.user.userId != props.emortion.userId & new Date(props.emortion.revealsAt) >= new Date() & !answered)
            return (<View>
                <TextInput editable style={s.inputBox} autoFocus={true} selectTextOnFocus={true} placeholder={"What do you the emorter is saying?"}  onChangeText={text => setCommentToSend(text)} value={commentToSend}/>
                    <Button labelStyle={{marginLeft:'auto', marginRight:'auto'}} buttonType="info" label="Evaluate" onPress={()=>sendComment(commentToSend)}/>
                {/*
                <View style={[s.btn, s.btnInfo]}>
                    <Text style={[s.btnText, s.textWhite]}>Evaluate</Text>
                </View>*/}
            </View>)
        else if (props.user.userId == props.emortion.userId)
            return (<View style={s.center}><Text style={[{color:'green', fontSize:15}]}>Cannot answer own posts!</Text></View>)
        else if (new Date(props.emortion.revealsAt) < new Date())
            return (<View style={s.center}><Text style={[{color:'green', fontSize:15}]}>Answer revealed!</Text></View>);
        else if (answered)
            return (<View style={s.center}><Text style={[{color:'green', fontSize:15}]}>You've already answered this post!</Text></View>);
      else return(<Text>Nothing</Text>)
    }


    function Comments() {
        if (answered || props.emortion.userId == props.user.userId || new Date(props.emortion.revealsAt) <= new Date()) {
            return (<View>
                {/*<Text style={[{color:'green', marginLeft:"auto", marginRight:"auto"}]}>Answer Revealed!</Text>*/}
                {props.emortion.comments.map((comment, index) => {
                    return (
                        <Comment key={index} comment={comment} getPosts={getComments} user={props.user}
                                 postId={props.emortion._id}/>
                    );
                })}
            </View>)
        } else {
            return (
                <View style={[s.center]}>
                    <Text style={{color:'goldenrod', fontSize:15}}>You haven't answered this emortion!</Text>
                </View>);
        }
    }

    function getComments() {
        handleCollapse(false)
        props.getPosts();
        handleCollapse(false);
    }

    function handleCollapse() {
            setClose(!close);
    }

    if (props.emortion.message.emojiObjects != null & props.emortion.message.emojiObjects.length > 0) {
        return (
            <>
                <View style={[s.card]}>
                    <View style={[s.cardBody, s.row]}>
                        <Avatar
                            size={50}
                            containerStyle={s.dp}
                            rounded
                            source={(img != null) ? ({uri: img}) : (require('../../dpholder.png'))}
                        />
                        <View>
                            <Text style={[s.title]}>{props.emortion.name}</Text>
                        </View>
                        <View>
                            <Text style={[s.time]}>{new Date(props.emortion.createdAt).toLocaleString()}</Text>
                        </View>
                    </View>
                    <RenderEmoji/>
                    <Secret/>
                    <View style={[s.row]}>

                        <LikeAgent/>
                        <Text style={s.likes}>{props.emortion.likes.length}</Text>
                    </View>
                        <View style={[s.row, s.ansBtn]}>

                            <Collapse>
                                <CollapseHeader>
                                    <View style={[s.btn, s.btnOutlineInfo]}>
                                        <Text style={[s.btnText, s.textInfo]}>Answers</Text>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <AnswerAgent sendComment={SendComment}/>
                                    <Comments/>
                                </CollapseBody>
                            </Collapse>
                        </View>

                </View>

            </>
        );
    } else {
        return (<></>);
    }
}

export default Emortion;
