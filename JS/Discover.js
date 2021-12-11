import React, {useEffect, useState} from 'react';
import { Text, View, Image, LogBox, ScrollView } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units'
import { TouchableOpacity } from 'react-native-gesture-handler';

import CategoryPicker from './CategoryPicker'
import {getGigData} from './Functions'
import GigView from './GigView'

export default function App()
{

    const [cate, setCate] = useState('Plumbing')
    const [gigsList, setGigs] = useState([]) // [{'desc': 'my desc', 'url': 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80', 'category':'Cleaning'}, {'desc': 'my desc', 'url': 'testurl', 'category':'Cleaning'}]
    const [stateChange, stateChanger] = useState(0)
    const [gigInfoPass, setGigIinfoPass] = useState([])

    useEffect(async() => {
        let data = await getGigData(cate)
        setGigs(data)
    },[cate])

    const GigInfo = ({gigDesc, gigImgUrl, gigCategory, gigId}) => {
        console.log(gigsList)
        return(
            <TouchableOpacity onPress={() => {OpenGig(gigId, gigCategory)}} style={{position: 'relative', marginTop: 30, width: vw(85), height: 220, backgroundColor: '#42CBC6', alignItems: 'center', borderRadius: 20}}>
                <Image  style={{width: vw(80), height: 120, marginTop: 5, borderRadius: 20, resizeMode: 'cover',}} source={{ uri: gigImgUrl}} />
                <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', backgroundColor: 'transparent', height: vh(9), textAlign: 'center'}}>{gigDesc}</Text>
                <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>{gigCategory}</Text>
            </TouchableOpacity>
        )
    }

    async function OpenGig(id, category)
    {
        setGigIinfoPass([category, id])
        stateChanger(1)

        console.log(gigInfoPass)
    }

    const Renderer = () => {
        if(stateChange == 0)
        {
            return (
                <View>
                    <View style={{position: 'absolute', top: 0, backgroundColor: '#42CBC6', width: vw(100), height: 100}}>
                        <Text style={{fontSize: 30, color: 'white', marginTop: 45, textAlign: 'center', fontWeight: 'bold'}}>Gotraders</Text>
                    </View>

                    <View style={{position: 'relative', top: 125, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                        
                        <CategoryPicker setCate={setCate}/>
                        
                    </View>


                    <View style={{position: 'relative', top: 155, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                        <ScrollView>
                            {gigsList.map((obj, index) => {
                                return <GigInfo key={index} gigDesc={obj['desc']} gigImgUrl={obj['url']} gigCategory={obj['category']} gigId={obj['id']} />
                            })}
                            <View style={{height: vh(100)}} />
                        </ScrollView>
                    </View>


                </View>
            )
        }else{
            return <GigView stateChanger={stateChanger} GigId={gigInfoPass[1]} GigCategory={gigInfoPass[0]} />
        }
    }

    return(
        <Renderer />
    )
}