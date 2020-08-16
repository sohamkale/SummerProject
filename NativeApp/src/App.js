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
import React, {useState, useEffect} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import Navbar from './components/Shared/Header/Navbar';
import DemoCol from './components/DemoCol/DemoCol'
import Home from './view/Home/Home'
import Login from './view/Login/Login'
import Users from './view/Users/Users'





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
import axios from "axios";


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

//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function App() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF7E6'
    },
  };

  return (
      <NavigationContainer  ref={navigationRef} theme={MyTheme}>
        <Navbar user={user} setUser={setUser} notifications={notifications} setNotifications={setNotifications}/>
        <ImageBackground source={require('./components/logobw.png')} style={styles.backgroundImage} imageResizeMode={'repeat'}>
        <Drawer.Navigator initialRouteName="Login" headerMode="none">
          <Drawer.Screen name="Login" component={Login} initialParams={{user: user, setUser: setUser}}/>
          <Drawer.Screen name="Home" component={Home} initialParams={{user:user, setNotifications: setNotifications}}/>
          <Drawer.Screen name="Users" component={Users} initialParams={{user: user}}/>
        </Drawer.Navigator>

        </ImageBackground>
      </NavigationContainer>

  );
}



export default App;
