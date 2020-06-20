import React, {useState, useEffect} from 'react';
import {View, TextInput, Text} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Button from 'react-native-bootstrap-buttons';
import * as firebase from 'firebase';
import fire from '../../config/Fire';
import axios from 'axios'
import Home from '../Home/Home'


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
    messageBox: {
        width:350,
        height: 300,
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    label: {
        fontWeight: 'bold',
        color: 'navajowhite',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    messageBoxBodyText: {
        color: '#fff',
        fontSize: 16,
    },
    content: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    button:{
        margin:8,
        alignItems: 'center',
    },

    input:{ color: 'whitesmoke',height: 40, borderBottomColor: 'gray', borderBottomWidth: 1 }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();

/**END OF STYLE**/

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                axios.get('http://facetweetit.herokuapp.com/api/users/'+user.uid).then((res)=>{
                    if(res.data!=null)
                    {
                        props.route.params.setUser(res.data);
                        props.navigation.navigate("Home",{user: res.data});
                    }
                }).catch(function(e){
                    console.log(e)
                });
            }
            else
                props.route.params.setUser(null);
        })


    }, []);

    /**functions**/
    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSignIn(){
        if(email!='' & password!='')
        {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {

            }).catch(function(error){
                console.log(error);
            })

            fire.auth().signInWithEmailAndPassword(email,password).then( u =>{
                if(u.user.uid!=null)
                    axios.get('http://facetweetit.herokuapp.com/api/users/'+u.user.uid).then((res)=>{
                        if(res.data!=null)
                            props.route.params.setUser(res.data);
                        }).catch(function(e){
                        console.log(e)
                });
            }).catch((err)=>{
                if(err.message === "The email address is badly formatted."){
                    alert("Please Enter Your E-mail and Password to Sign In");
                }else {
                    alert(err.message);
                }
            })
        }
        else {
            alert('username or email cannot be null!')
        }
    }

        return (
            <>
            <Text style={[s.label, s.textDark]}> Ready to EmoteIt? </Text>
            <View style={[s.content]}>
                <View style={[s.messageBox,s.bgDark]}>
                    <View styles={[s.form]}>
                        <TextInput
                            selectTextOnFocus={true}
                            textContentType={'emailAddress'}
                            style={s.input}
                            onChangeText={text => setEmail(text)}
                            value={email}
                        />
                        <Text style={s.label}>Email </Text>
                    </View>
                    <View>
                        <TextInput
                            selectTextOnFocus={true}
                            textContentType={'password'}
                            style={s.input}
                            onChangeText={text => setPassword(text)}
                            value={password}/>
                        <Text style={s.label}>Password</Text>
                        <View style={s.button}>
                            <Button buttonType="primary" label="Sign In" onPress={handleSignIn}/>
                        </View>
                        <View style={s.button}>
                            <Button buttonType="primary" label="Sign Up" />
                        </View>


                    </View>
                </View>

            </View>
                </>);

}

export default Login;