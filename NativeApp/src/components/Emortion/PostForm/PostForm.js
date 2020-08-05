import React, {useState,useEffect} from 'react';
import {TextInput, View, Text, Picker as Pick, TouchableHighlight, Image, ScrollView} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import Button from "react-native-bootstrap-buttons";
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import { Picker,Emoji } from 'emoji-mart-native'
import Emortion from "../PostBox/Emortion";
import axios from 'axios';


function PostForm(props)
{

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

        inputBox:{
            margin:5,
            borderColor: 'grey',
            borderWidth: 1,
            fontFamily: 'cavolini'
        },

        emojiViewBox:{

        },
        btnSmall:{
            width:1
        },
        center:{
            marginLeft:'auto',
            marginRight:'auto',
        },
        btnRow:{
            flexDirection: "row",
            margin:5
        },
        smallBtn:{
            margin:20
        },
        pickerImage:{
            width: 30,
            height:30,
        },
        emojibox: {
            flexWrap: 'wrap',
            borderWidth: 2,
            borderColor: 'lightgrey',
            height: 80,
        },

    };
    const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
    const s = styles = bootstrapStyleSheet.create();
    /**END SECTION**/



    const [emojis, setEmojis] = useState([]);
    const [secret, setSecret] = useState('');
    const [selectedValue, setSelectedValue] = useState("1h");
    const [note, setNote] = useState("");


    function appendEmoji(emoji, event)
    {
        const newList = emojis.concat(emoji);
        setEmojis(newList);
    }

    function EraseEmoji()
    {
        var newList = [...emojis];
        newList.pop();
      setEmojis(newList);
    }

    function EraseAll()
    {
        setEmojis([]);
        setSecret('');
    }

    function Submit()
    {
        setNote('');
        if(emojis.length<=0)
            setNote('You cannot Post a message without an emoji!');
        else{

            if(secret.length<=0)
                setNote('You need to put a secret answer to you Emortion!');
            else
            {
                axios.post('https://facetweetit.herokuapp.com/api/posts/add', {
                    userId: props.user.userId ? props.user.userId: "",
                    username: props.user.name ? props.user.name: "",
                    type: 'Timer',
                    emojiObjects: emojis,
                    secretAnswer: secret,
                    validity: selectedValue
                })
                    .then(function (response) {
                        EraseAll();
                        props.getPosts();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            }
        }

    return (<>
        <View style={s.row}>
            <Text>Validity</Text>
        <Pick
            selectedValue={selectedValue}
            style={[{ height: 50, width: 150 }, s.row]}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
            <Picker.Item label="1h" value="1h" />
            <Picker.Item label="2h" value="2h" />
            <Picker.Item label="3h" value="3h" />
        </Pick>
        </View>
        <View style={[s.emojibox, s.row]}>
            {
                emojis.map((item, index) => (
                  <Emoji margin={2} style={s.emoji} emoji={item} size={40} key={index}/>
                ))
            }
        </View>
        <View style={[s.btnRow, s.center, {width:100}]}>
            <Button buttonStyle={s.smallBtn} labelStyle={{marginLeft:'auto', marginRight:'auto'}} buttonType="danger" label="DELETE" onPress={EraseEmoji}/>
            <Text>  </Text>
            <Button buttonStyle={s.smallBtn} labelStyle={{marginLeft:'auto', marginRight:'auto'}} buttonType="danger" label="CLEAR" onPress={EraseAll}/>
        </View>
        <Collapse>
            <CollapseHeader>
                <View style={[s.btn]}>
                    <Image style={[s.pickerImage, s.center]} source={require('./emoji.png')}/>
                </View>
            </CollapseHeader>
            <CollapseBody>
                <Picker onSelect={appendEmoji} skin={1} showSkinTones={false}/>
            </CollapseBody>
        </Collapse>
        <TextInput style={[s.inputBox]} placeholder={"Secret Answer to your Emortion"} onChangeText={text => setSecret(text)} value={secret}/>
        <Text style={{color: 'brown'}}>{note}</Text>
        <Button buttonStyle={s.smallBtn} labelStyle={{marginLeft:'auto', marginRight:'auto'}} buttonType="success" label="POST" onPress={Submit}/>
        </>);
}

export default  PostForm;