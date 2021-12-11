import React, {useEffect, useState} from 'react';
import { Text, View, Image, LogBox, TouchableOpacity, ScrollView, Alert, Picker } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units'
import Prompt from 'react-native-prompt-crossplatform';

import CategoryPicker from './CategoryPicker'

import { getAccountData, logout, AccountConfig } from './Functions';

export default function App({navigation})
{
    const [myProfile, setProfile] = useState('https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg')
    const [username, setUsername] = useState('...')
    const [fullName, setFullName] = useState("...")
    const [category, setCategory] = useState('Profile Category')
    const [userType, setUserType] = useState('Seller')

    const [prompTitle, setPromptTitle] = useState('...')
    const [promptVis, setPromptVis] = useState(false)
    const [prompText, setPromptText] = useState()
    const [promptResponse, setPromptResponse] = useState()
    const [promptActivity, setPromptActivity] = useState('')
    const [profileChange, changeProfile] = useState('')

    function callAlert(title, activity)
    {
        setPromptVis(true)
        setPromptTitle(title)
        setPromptActivity(activity)
        return promptResponse
    }

    async function accountData()
    {
        let data = await getAccountData()

        setProfile(data[0])
        setUsername(data[1])
        if(data[2])
        {
            setFullName(data[2])
        }
        if(data[3])
        {
            setCategory(data[3])
        }
        if(data[4])
        {
            setUserType(data[4])
        }
    }

    useEffect(() => {
        accountData()
    }, [profileChange])

    useEffect(async() => {

        if(promptActivity != '')
        {
            if(promptActivity == "FullName")
            {
                console.log('Youve enterd your full name')
                console.log(promptResponse)
                await AccountConfig('fullname', promptResponse)
            }
            if(promptActivity == "Profile")
            {
                console.log('Youve enterd a new profile picture')
                console.log(promptResponse)
                await AccountConfig('profile', promptResponse)
            }
            changeProfile(JSON.stringify(Date.now()))

        }

    }, [promptResponse])

    useEffect(async() => {

        console.log("category effect")

        if(category != "Profile Category")
        {
            // set category in db
            await AccountConfig('category', category)
            return
        }

    }, [category])

    const CategoryView = () => {
        if(category == "Profile Category")
        {
            return category
        }else{
            return 'Category: ' + category
        }
    }

    async function toggleUserType()
    {
        if(userType == "Seller")
        {
            setUserType('Buyer')
            await AccountConfig('userType', 'Buyer')
            return
        }
        if(userType == "Buyer")
        {
            setUserType('Seller')
            await AccountConfig('userType', 'Seller')
            return
        }

    }

    return(
        <View>
            <View style={{position: 'absolute', top: 0, backgroundColor: '#42CBC6', width: vw(100), height: 100}}>
                <Text style={{fontSize: 30, color: 'white', marginTop: 45, textAlign: 'center', fontWeight: 'bold'}}>Account</Text>
            </View>

            <View style={{position: 'relative', top: 130}}>
                <Image source={{ uri: myProfile }} style={{width: 80, height: 80, borderRadius: 50, marginLeft: 30}} />
                <Text style={{fontSize: 20, color: '#42CBC6', fontWeight: 'bold', position: 'relative', top: -60, marginLeft: 120}}>{username}</Text>
                <Text style={{fontSize: 15, color: '#42CBC6', fontWeight: 'bold', position: 'relative', top: -60, marginLeft: 120}}>{fullName}</Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', position: 'relative', top: 120}}>
                <ScrollView> 
                
                    <TouchableOpacity onPress={() => {callAlert('Enter Your Full Name', 'FullName')}} style={{width: vw(90), height: 50, backgroundColor: '#42CBC6', borderRadius: 5, marginBottom: 10}}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 10, textTransform: 'uppercase'}}>Full Name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: vw(90), height: 50, backgroundColor: '#42CBC6', borderRadius: 5, marginBottom: 10}}>
                        <Text pointerEvents="none" style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 10, textTransform: 'uppercase'}}> <CategoryView /> </Text>                        
                        <Picker style={{position: 'absolute', width: vw(90), height: 50, backgroundColor: '#42CBC6', borderRadius: 5, marginBottom: 10, color: 'transparent', fontWeight: 'bold', textTransform: 'uppercase' }}
                            selectedValue={category}
                            onValueChange={(itemValue, itemIndex) => {setCategory(itemValue); console.log('new item ' + itemValue)}}
                        >
                            <Picker.Item label="Plumbing" value="Plumbing" />
                            <Picker.Item label="Cleaning" value="Cleaning" />
                            <Picker.Item label="Painting" value="Painting" />
                            <Picker.Item label="Gardening" value="Gardening" />

                        </Picker>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {callAlert('Enter a url for your profiile', 'Profile')}} style={{width: vw(90), height: 50, backgroundColor: '#42CBC6', borderRadius: 5, marginBottom: 10}}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 10, textTransform: 'uppercase'}}>Profile Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {toggleUserType()}} style={{width: vw(90), height: 50, backgroundColor: '#42CBC6', borderRadius: 5, marginBottom: 10}}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 10, textTransform: 'uppercase'}}>Account Type: {userType}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('Folder')}} style={{width: vw(90), height: 50, backgroundColor: '#42CBC6', borderRadius: 5, marginBottom: 10}}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 10, textTransform: 'uppercase'}}>Manage Gigs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {logout()}} style={{width: vw(90), height: 50, backgroundColor: '#42CBC6', borderRadius: 5, marginBottom: 10}}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 10, textTransform: 'uppercase'}}>Logout</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>


            <Prompt
                title={prompTitle}
                placeholder={prompTitle}
                isVisible={promptVis}
                primaryColor={'#42CBC6'}
                onChangeText={(text) => { setPromptText(text) }}
                onCancel={() => { setPromptVis(false) }}
                onSubmit={() => { setPromptVis(false); setPromptResponse(prompText) }}
            />
        </View>
    )
}