import React from 'react';
import { Text, View, Image, LogBox, Picker, Dimensions, TouchableOpacity } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units'

export default function App({vis, name, profileLink})
{
    const Display = () => {
        if(vis)
        {
            const width = Dimensions.get('window').width
            return (
                <TouchableOpacity style={{width: 130, height: 180, marginLeft: 20, marginRight: 20, borderRadius: 10, backgroundColor: '#42CBC6'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={{ uri: profileLink}} style={{width: 80, height: 80, borderRadius: 50, marginTop: 20}} />
                        <Text style={{fontSize: 0.05*width, color: 'white', fontWeight: 'bold', marginTop: 20, textTransform: 'uppercase', backgroundColor: 'transparent', width: 110, textAlign: 'center'}}>{name}</Text>
                    </View>
                </TouchableOpacity>
            )
    
        }
        else{
            return (
                <View style={{width: 130, height: 180, marginLeft: 20, marginRight: 20, borderRadius: 10, backgroundColor: 'transparent'}}>
                    
                </View>
            )
        }
    }
    return(
        <Display />
    )
}