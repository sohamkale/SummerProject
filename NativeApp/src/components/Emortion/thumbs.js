import React from 'react';
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {Image, TouchableOpacity, View} from "react-native";

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
    likeButton:{
        margin:4,
        width:35,
        height:35
    }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();

function LikeButton(props)
{
    return (
        <TouchableOpacity activeOpacity={0.5}>
            <Image style={[s.likeButton]} source={require('./unlike-svg.png')}/>
        </TouchableOpacity>
    );
}

function DislikeButton(props)
{
    return (
        <TouchableOpacity activeOpacity={0.5}>
            <Image style={[s.likeButton]} source={require('./like-svg.png')}/>
        </TouchableOpacity>
    );
}

export {
    LikeButton, DislikeButton
}