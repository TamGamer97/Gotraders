import React, {useEffect, useState} from 'react';
import { Text, View, Image, LogBox, ScrollView } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units'

export default function App()
{
    return(
        <View>
            <View style={{position: 'absolute', top: 0, backgroundColor: '#42CBC6', width: vw(100), height: 100}}>
                <Text style={{fontSize: 30, color: 'white', marginTop: 45, textAlign: 'center', fontWeight: 'bold'}}>Chats</Text>
            </View>

        </View>
    )
}