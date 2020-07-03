// @flow

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/**Import written app  files**/
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from './components/Shared/Header/Navbar';
import DemoCol from './components/DemoCol/DemoCol'
import Home from './view/Home/Home'
import Login from './view/Login/Login'
import axios from 'axios'
import fire from './config/Fire';
import * as firebase from 'firebase';


import Button from 'react-native-bootstrap-buttons';

import {
  SafeAreaView,
  StyleSheet,
    ImageBackground,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {getBackgroundColor} from "react-native/Libraries/LogBox/UI/LogBoxStyle";


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
  },

  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState(null);
  const [test, setTest] = useState('Hello');
  const [login, setLogin] = useState('User');
  const [status, setStatus] = useState('NA');

  function checkTest()
  {
    setTest(test+"1");
  }
  function logout()
  {
    setLogin('User');
    setStatus('Out')
  }
  function loginTest()
  {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {

    }).catch(function(error){
      console.log(error);
    })

    fire.auth().signInWithEmailAndPassword('m.immam@ufl.edu','Mynum6835697.').then( u =>{
      if(u.user.uid!=null)
        axios.get('http://facetweetit.herokuapp.com/api/users/'+u.user.uid).then((res)=>{
          if(res.data!=null)
            {
              setStatus('done')
              setUser(res.data);
              setLogin(res.data.name)
            }
          else
          {
            setStatus('data null')
          }
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

  return (
      <View>
        <Text>{test}</Text>
        <Text>{login}</Text>
        <Text>{status}</Text>
        <Button label={"Change"} onPress={checkTest}></Button>
        <Button label={"login"} onPress={loginTest}></Button>
        <Button label={"logout"} onPress={logout}></Button>
      </View>
  );
}

/*const App: () => React$Node = () => {
  const [user, setUser] = useState(null);
  return (
      <NavigationContainer>
      {/!*<StatusBar barStyle="dark-content" />*!/}
      <SafeAreaView>

          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login}
                options={{ title: 'Login Screen' }}/>
          </Stack.Navigator>
      </SafeAreaView>
    </ImageBackground>
      </NavigationContainer>
  );
};*/


export default App;
