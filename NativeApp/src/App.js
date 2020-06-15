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
  return (
      <NavigationContainer>
        <Navbar user={user} setUser={setUser}/>
        <ImageBackground source={require('./components/logobw.png')} style={styles.backgroundImage} imageResizeMode={'repeat'}>
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={Login} initialParams={{user: user, setUser: setUser}}/>
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>

        </ImageBackground>
      </NavigationContainer>

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
