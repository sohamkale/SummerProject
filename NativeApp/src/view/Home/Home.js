import React, {useEffect, useState} from 'react'
import DemoCol from '../../components/DemoCol/DemoCol';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import BootstrapStyleSheet from "react-native-bootstrap-styles";

/*App File imports*/
import Emortion from '../../components/Emortion/PostBox/Emortion'
import PostForm from '../../components/Emortion/PostForm/PostForm'
import fire from "../../config/Fire";
import axios from "axios";

import io from "socket.io-client";

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
    }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();
let socket;
function Home(props) {
    const [postsArray, setPostsArray] = useState([]);
    const [showCount, setShowCount] = useState(8);


    useEffect(() => {
            getPosts();
         }, []);


    const [socketIO, setsocketIO] = useState(null);

    const ENDPOINT = "https://facetweetit.herokuapp.com";

    useEffect(() => {
        if (props.route.params.user) {
            let room = "commonRoom";
            socket = io(ENDPOINT);
            setsocketIO(socket);
            let currUser = props.route.params.user.name;
            let currUserUid = props.route.params.user.userId;
            let usr = props.route.params.user;
            socket.emit('join', {usr, room, currUserUid});
            socket.on('joinedRoom', message => {
                console.log("connected to room");
            });
            if (socket) {
                socket.on('message', message => {
                    getPosts();
                });
            }
        }
    }, [ENDPOINT, props.route.params.user]);

    function getPosts()
    {

        console.log("testing bugsee");
        if(props.route.params.user!=null)
        {
            axios.get('https://facetweetit.herokuapp.com/api/posts').then((res) => {
                if (res.data != null) {
                    setPostsArray(res.data);
                } else
                {}
            })
        }
    }

    function ShowMore() {
        if (showCount + 5 < props.postsArray.length)
            setShowCount(showCount + 5);
        else {
            setShowCount(props.postsArray.length)
            document.getElementById("showmore").classList.add('d-none');
        }
    }
        return (
            <>
                <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <DemoCol user={props.route.params.user}/>
                    <PostForm user={props.route.params.user} getPosts={getPosts}/>
                    {
                        postsArray.slice(0, showCount).map((item, index) => (
                           <Emortion key={index} emortion={item}  getPosts={getPosts} user={props.route.params.user}/>
                        ))
                    }
                </ScrollView>
            </>
        );
    }

    export default Home;
