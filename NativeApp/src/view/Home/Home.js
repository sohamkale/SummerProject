import React from 'react'
import DemoCol from '../../components/DemoCol/DemoCol';
import {SafeAreaView, ScrollView} from 'react-native';
import Login from '../Login/Login'

function Home(props)
{
    return (
        <>
            <DemoCol user={props.route.params.user}/>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
            </ScrollView>
            </>
    );
}

export default Home;
