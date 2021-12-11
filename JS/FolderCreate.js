import React, {useEffect, useState} from 'react';
import { Text, View, Image, LogBox, TouchableOpacity, Button, TextInput, ScrollView, Picker, Alert } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units'

import {initilizeGig} from './Functions'

export default function App({viewState})
{

    let gigConfig = {}

    const [categoryState, setCategory] = useState('Gig category')

    const Inp = ({ph, stateUpdate}) => {
        return(
            <View style={{width: vw(80), height: 50, marginTop: 20, backgroundColor: '#42CBC6', borderRadius: 10}}>
                {/* <Text style={{color: 'white', textAlign: 'center', marginTop: 6, fontSize: 20, fontWeight: 'bold'}}>Continue</Text> */}
                <TextInput onChangeText={data => {gigConfig[[stateUpdate]] = data}} style={{color: 'white', textAlign: 'left', marginLeft: 20, marginTop: 10, fontSize: 20, fontWeight: 'bold'}} placeholderTextColor={'white'} placeholder={ph} />
            </View>
        )
    }

    async function createGig()
    {
        await initilizeGig(gigConfig)
        Alert.alert("Gig Created!")
    }

    useEffect(() => {
        gigConfig['category'] = categoryState
    }, [categoryState])

    return(
        <View>
            <View style={{position: 'absolute', top: 0, backgroundColor: '#42CBC6', width: vw(100), height: 100}}>
                <Text style={{fontSize: 30, color: 'white', marginTop: 45, textAlign: 'center', fontWeight: 'bold'}}>Create a Gig</Text>
                <Text onPress={() => {viewState(0)}} style={{fontSize: 30, color: 'white', marginTop: -40, marginLeft: 20, textAlign: 'left', fontWeight: 'bold'}}>←</Text>
            </View>

            <View style={{position: 'relative', top: 120, justifyContent: 'center', alignItems: 'center'}}>
                <ScrollView>

                    <Inp ph={'Gig name'} stateUpdate={'Job-title'} />
                    <Inp ph={'Gig description'} stateUpdate={'Job-description'} />
                    <TouchableOpacity style={{width: vw(80), height: 50, backgroundColor: '#42CBC6', borderRadius: 5, marginTop: 20}}>
                        <Text pointerEvents="none" style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'left', marginLeft: 20, marginTop: 10}}> {categoryState} </Text>                        
                        <Picker style={{position: 'absolute', width: vw(90), height: 50, backgroundColor: '#42CBC6', borderRadius: 5, marginBottom: 10, color: 'transparent', fontWeight: 'bold', textTransform: 'uppercase' }}
                            selectedValue={gigConfig.category}
                            onValueChange={(itemValue, itemIndex) => {setCategory(itemValue); console.log('new item ' + itemValue)}}
                        >
                            <Picker.Item label="Plumbing" value="Plumbing" />
                            <Picker.Item label="Cleaning" value="Cleaning" />
                            <Picker.Item label="Painting" value="Painting" />
                            <Picker.Item label="Gardening" value="Gardening" />

                        </Picker>
                    </TouchableOpacity>
                    <Inp ph={'Gig image url'} stateUpdate={'Job-image'} />
                    <Inp ph={'Contact info'} stateUpdate={'Job-contact'} />
                    <Inp ph={'Price'} stateUpdate={'Job-price'} />
                    <Inp ph={'Delivery time'} stateUpdate={'Job-time'} />

                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {createGig()}} style={{width: 140, height: 50, borderRadius: 10, backgroundColor: '#42CBC6', marginTop: 20}}>
                            <Text style={{textTransform: 'uppercase', color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 10}}>Create</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginBottom: 120}}></View>


                </ScrollView>
            </View>
            

        </View>
    )
}