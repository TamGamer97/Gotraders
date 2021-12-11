import React, {useEffect, useState} from 'react';
import { Text, View, Image, LogBox, ScrollView } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units'
import { TouchableOpacity } from 'react-native-gesture-handler';

import {getSignleGigData} from './Functions'

export default function App({stateChanger, GigId, GigCategory})
{

    const [gigInfo, setGigInfo] = useState([])

    useEffect(async() => {
        let data = await getSignleGigData(GigCategory, GigId)

        setGigInfo(data)

        console.log(data)
    }, [GigId])

    const MyButton = ({title}, {funct}) => {
        return (
            <TouchableOpacity style={{width: 200, height: 50, backgroundColor: '#42CBC6', borderRadius: 10, marginTop: 10}}>
                <Text style={{textTransform: 'uppercase', textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 10}}>{title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={{position: 'absolute', top: 0, backgroundColor: '#42CBC6', width: vw(100), height: 100}}>
                <Text style={{fontSize: 30, color: 'white', marginTop: 45, textAlign: 'center', fontWeight: 'bold'}}>Gotraders</Text>
                <Text onPress={() => {stateChanger(0)}} style={{fontSize: 30, color: 'white', marginTop: -40, marginLeft: 20, textAlign: 'left', fontWeight: 'bold'}}>←</Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>

                <Image resizeMode={'cover'} style={{width: vw(75), height: 90, position: 'relative', top: 120, borderRadius: 10, borderColor: '#42CBC6', borderWidth: 2}} source={{uri: gigInfo[0]}} />
                <Text style={{position: 'relative', top: 130, fontSize: 30, color: '#42CBC6', fontWeight: 'bold', textDecorationLine: 'underline'}}>{gigInfo[1]}</Text>
                <Text style={{position: 'relative', top: 130, width: vw(80), textAlign: 'center', fontSize: 20, color: '#42CBC6', fontWeight: 'bold'}}>{gigInfo[2]}</Text>
            
            
            </View>

            <View style={{position: 'relative', top: 20}}>
                <Text style={{position: 'relative', top: 130, marginLeft: 50, textAlign: 'left', fontSize: 20, color: '#42CBC6', fontWeight: 'bold'}}><Text style={{textDecorationLine: 'underline', textTransform: 'uppercase'}}>Category</Text>: {gigInfo[3]}</Text>
                <Text style={{position: 'relative', top: 130, marginLeft: 50, textAlign: 'left', fontSize: 20, color: '#42CBC6', fontWeight: 'bold'}}><Text style={{textDecorationLine: 'underline', textTransform: 'uppercase'}}>Price</Text>: {gigInfo[4]}</Text>
                <Text style={{position: 'relative', top: 130, marginLeft: 50, textAlign: 'left', fontSize: 20, color: '#42CBC6', fontWeight: 'bold'}}><Text style={{textDecorationLine: 'underline', textTransform: 'uppercase'}}>Delivery</Text>: {gigInfo[5]}</Text>
                <Text style={{position: 'relative', top: 130, marginLeft: 50, textAlign: 'left', fontSize: 20, color: '#42CBC6', fontWeight: 'bold'}}><Text style={{textDecorationLine: 'underline', textTransform: 'uppercase'}}>Name</Text>: {gigInfo[6]}</Text>
                <Text style={{position: 'relative', top: 130, marginLeft: 50, textAlign: 'left', fontSize: 20, color: '#42CBC6', fontWeight: 'bold'}}><Text style={{textDecorationLine: 'underline', textTransform: 'uppercase'}}>Contact</Text>: {gigInfo[7]}</Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'relative', top: 170}}>
                <MyButton title={'Message'} />
                <MyButton title={'Order'} />       
            </View>
        </View>
    )
}