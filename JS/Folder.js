import React, {useEffect, useState} from 'react';
import { Text, View, Image, LogBox, TouchableOpacity } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units'
import { ScrollView } from 'react-native-gesture-handler';

import CreateGigs from './FolderCreate'

export default function App({navigation})
{

    const [viewSet, setView] = useState(0)

    const Gig = ({Name}) => {
        const [borderColor, setBorderColor] = useState('transparent') // local state!!!
        return <>
            <TouchableOpacity onPress={() => {console.log('pressed'); if(borderColor == "transparent") {setBorderColor('black')} else{setBorderColor('transparent')} }} style={{width: 150, height: 50, backgroundColor: '#42CBC6', borderRadius: 10, marginBottom: 20, borderColor: borderColor, borderWidth: 2}}>
                <Text style={{textAlign: 'center', marginTop: 10, fontSize: 20, color: 'white', fontWeight: 'bold', textTransform: 'uppercase'}}>{Name}</Text>
            </TouchableOpacity>
        </>
    }

    const ManageGigs = () => {
        return(
            <View>
                <View style={{position: 'absolute', top: 0, backgroundColor: '#42CBC6', width: vw(100), height: 100}}>
                    <Text style={{fontSize: 30, color: 'white', marginTop: 45, textAlign: 'center', fontWeight: 'bold'}}>Your Gigs</Text>
                    <Text onPress={() => {navigation.navigate('Account')}} style={{fontSize: 30, color: 'white', marginTop: -40, marginLeft: 20, textAlign: 'left', fontWeight: 'bold'}}>←</Text>
                </View>
    
                <TouchableOpacity onPress={() => {setView(1)}} style={{position: 'absolute', top: 600, right: 30, width: 70, height: 70, borderRadius: 50, backgroundColor: '#42CBC6'}}>
                    <Text style={{fontSize: 40, color: 'white', marginTop: 6, textAlign: 'center', fontWeight: 'bold'}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute', top: 540, right: 40, width: 50, height: 50, borderRadius: 50, backgroundColor: '#42CBC6', opacity: 1}}>
                    <Text style={{fontSize: 25, color: 'white', marginTop: 8, textAlign: 'center', fontWeight: 'bold'}}>⌧</Text>
                </TouchableOpacity>
    
    
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <ScrollView style={{position: 'relative', top: 120}}>
                        <Gig Name={'Gig 1'} />
                        <Gig Name={'Gig 2'} />
                    </ScrollView>
    
                </View>
    
    
            </View>
        )
    }


    const Manager = () => {
        if(viewSet == 0)
        {
            return <ManageGigs />
        }
        if(viewSet == 1)
        {
            return <CreateGigs viewState={setView} />
        }
    }

    return (
        <Manager />
    )

}