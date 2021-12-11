import React from 'react';
import { Text, View, Image, LogBox, Picker } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units'

export default function App({setCate})
{


    return(
        <View style={{width: 180, height: 50, position: 'relative', backgroundColor: '#42CBC6', borderColor: 'white', borderWidth: 3}}>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                <Picker
                            // selectedValue={Noti}
                            style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', width: 140}}
                            onValueChange={(itemValue, itemIndex) => setCate(itemValue)}
                        >
                            <Picker.Item label="Plumbing" value="Plumbing" />
                            <Picker.Item label="Cleaning" value="Cleaning" />
                            <Picker.Item label="Painting" value="Painting" />
                            <Picker.Item label="Gardening" value="Gardening" />
                </Picker>
                </View>
        </View>
    )
}