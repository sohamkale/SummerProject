import React from 'react'
import DemoCol from '../../components/DemoCol/DemoCol';
import {SafeAreaView, ScrollView} from 'react-native';
import Login from '../Login/Login'

function Home(props)
{
    return (props.user!=null) ? (
        <>
            <DemoCol />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
            </ScrollView>
            </>
    ) : (<Login user={props.user} setUser={props.setUser}/>);
}

export default Home;
