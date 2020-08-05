import React,{useState, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import axios from 'axios';
import Emortion from "../../components/Emortion/PostBox/Emortion";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import Disclaimer from "../../components/Shared/Disclaimer/Disclaimer";


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
    center: {
        marginLeft:'auto',
        marginRight:'auto'
    }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();

function Users (props)
{
    const[allUsers, setAllUsers] = useState([]);
    const [three, setThree] = useState([]);

    useEffect(()=>{
        axios.get(`https://facetweetit.herokuapp.com/api/users/top`).then((res)=>{
            if(res.data)
            {
                setThree(res.data);
            }
        }).catch(function(e){
            console.log(e)
        });

        if (props.route.params.user) {
            axios.get('https://facetweetit.herokuapp.com/api/users')
                .then((res) => {
                    setAllUsers (res.data);
                }).catch(function (e) {
                console.log(e)
            });
        }
    },[]);

    function User({user})
    {
        return (<ListItem
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            leftAvatar={{
                title: user.name,
                source: { uri: user.profileImage },
                showAccessory: false,
            }}
            title={user.name}
            subtitle={"Score: "+user.totScore}
            titleStyle={{fontFamily:"BlackBurger"}}
            subtitleStyle={{fontFamily:"BlackBurger"}}
        />)
    }

    return (<View>
        <ScrollView>
            <Disclaimer/>
            <Text style={[s.center,{fontFamily:"BlackBurger"}]}>TOP 3 EMOTERS</Text>
            {
                three.map((item, index) => (
                    <User key={index} user={item}/>
                ))
            }
        <Text style={[s.center,{fontFamily:"BlackBurger"}]}>All Emoters</Text>
        {
            allUsers.map((item, index) => (
                <User key={index} user={item}/>
            ))
        }
        </ScrollView>
    </View>)
}

export default Users;