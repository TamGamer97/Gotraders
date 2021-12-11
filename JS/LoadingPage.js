import React, { useEffect, useState } from 'react';
import { Text, View, Image, LogBox, Picker } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units'

import loadingAni from '../Images/loading.gif'

import { checkLoggedin } from './Functions';

export default function App({navigation})
{   
    const [checkedLoggedin, setChecker] = useState(5)
    
    useEffect(async () => {
        let checker = await checkLoggedin()
        setChecker(checker)
    }, [])
    
    useEffect(() => {
        if(checkedLoggedin != 5)
        {
            if(checkedLoggedin == true)
            {
                navigation.navigate('Home')
            }
            else{
                console.log('login required')
                navigation.navigate('Register')
            }
        }
    }, [checkedLoggedin])


    return(
        <View style={{backgroundColor: '#42CBC6', width: vw(100), height: vh(100)}}>
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <Image style={{width: 130, height: 130, position: 'relative', top: 260}} source={loadingAni} />
            </View>
            <Text style={{position: 'relative', top: 270, textAlign: 'center', color: 'white', fontSize: 30, fontWeight: 'bold'}}>Signing in</Text>
        </View>
    )




}