import React, {useEffect, useState} from 'react';
import { Text, View, Image, LogBox } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units'

import CategoryPicker from './CategoryPicker'

import { getTransactions } from './Functions';

export default function App()
{
    const [spent, setSpent] = useState(0)
    const [earned, setEarned] = useState(0)

    useEffect(async() => {
        let Transactions = await getTransactions()
        setSpent(Transactions[0])
        setEarned(Transactions[1])
    }, [])

    return(
        <View>
            <View style={{position: 'absolute', top: 0, backgroundColor: '#42CBC6', width: vw(100), height: 100}}>
                <Text style={{fontSize: 30, color: 'white', marginTop: 45, textAlign: 'center', fontWeight: 'bold'}}>Transactions</Text>
            </View>
            
            <View style={{position: 'relative', top: 120}}>
                <Text style={{textAlign: 'center', color: '#42CBC6', fontSize: 20, fontWeight: 'bold'}}>Amount Spent:</Text>
                <Text style={{textAlign: 'center', color: '#42CBC6', fontSize: 25, fontWeight: 'bold'}}>${spent}</Text>

                <Text style={{textAlign: 'center', color: '#42CBC6', fontSize: 20, fontWeight: 'bold', marginTop: 20}}>Amount Earned:</Text>
                <Text style={{textAlign: 'center', color: '#42CBC6', fontSize: 25, fontWeight: 'bold'}}>${earned}</Text>
            </View>

        </View>
    )
}