import React, { useEffect, useState } from 'react';
import { Text, View, Image, LogBox, Picker } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { login, validateAccount, signup } from './Functions';

export default function App({navigation})
{
    const [RenderView, updateRender] = useState(0)
    const Renderer = () => {
        if(RenderView == 0)
        {
            return(
                <View style={{backgroundColor: '#42CBC6', height: vh(100)}}>
                    <Text style={{color: 'white', fontSize: 35, fontWeight: 'bold', textAlign: 'center', position: 'relative', top: 120}}>Gotraders</Text>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center', position: 'relative', top: 120}}>Post domestic jobs,{"\n"}get cheep quotes from traders</Text>

                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', position: 'relative', top: 170, width: vw(70)}}>
                            A Platform designed to help
                            anyone that needs a job
                            or a job done
                        </Text>

                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', position: 'relative', top: 200, width: vw(70)}}>
                            Signup for free! and explore
                            the many offers or job
                            opportunity's 
                        </Text>

                        <View style={{position: 'relative', top: 250}}>
                            <TouchableOpacity onPress={() => {updateRender(1)}} style={{width: 200, height: 50, borderColor: 'white', borderWidth: 4}}>
                                <Text style={{color: 'white', textAlign: 'center', marginTop: 6, fontSize: 20, fontWeight: 'bold'}}>Continue</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                
                </View>
            )
        
        }
        if(RenderView == 1)
        {
            const [RegType, updateRegType] = useState(0)

            const [signupOpac, updateSingupOpac] = useState(1)
            const [loginOpac, updateLoginpOpac] = useState(0.4)

            let username = ""
            let email = ""
            let password = ""
            let rPassword = ""

            useEffect(() => {
                if(RegType == 0)
                {
                    updateSingupOpac(1)
                    updateLoginpOpac(0.4)
                }
                if(RegType == 1)
                {
                    updateSingupOpac(0.4)
                    updateLoginpOpac(1)
                }
            }, [RegType])

            const Inp = ({ph, stateUpdate}) => {
                return(
                    <View style={{width: 200, height: 50, borderColor: 'white', borderWidth: 4, marginTop: 20}}>
                        {/* <Text style={{color: 'white', textAlign: 'center', marginTop: 6, fontSize: 20, fontWeight: 'bold'}}>Continue</Text> */}
                        <TextInput onChangeText={data => {if(stateUpdate == "username") {username = data}; if(stateUpdate == "email") {email = data}; if(stateUpdate == "password") {password = data}; if(stateUpdate == "rPassword") {rPassword = data};}} style={{color: 'white', textAlign: 'center', marginTop: 6, fontSize: 20, fontWeight: 'bold'}} placeholderTextColor={'white'} placeholder={ph} />
                    </View>
                )
            }
            const RegView = () => {
                if(RegType == 0)
                {
                    return <>
                        <Inp stateUpdate={'username'} ph={'Username'} />
                        <Inp stateUpdate={'email'} ph={'Email'} />
                        <Inp stateUpdate={'password'} ph={'Password'} />
                        <Inp stateUpdate={'rPassword'} ph={'Password (repeat)'} />
                    </>
                }
                if(RegType == 1)
                {
                    return <>
                        <Inp stateUpdate={'email'} ph={'Email'} />
                        <Inp stateUpdate={'password'} ph={'Password'} />
                    </>
                }
            }
            async function registerAccount()
            {
                console.log(username)
                console.log(email)
                console.log(password)
                console.log(rPassword)

                if(email)
                {
                    if(password)
                    {
                        if(username)
                        {
                            if(password == rPassword)
                            {
                                // functions / signup
                                let validDetailsSignUp = await signup(email, username, password)
                                console.log(validDetailsSignUp)

                                if(validDetailsSignUp[0] == 1)
                                {
                                    console.log('signed uip word')
                                    await validateAccount(email, password, username, validDetailsSignUp[1])
                                    navigation.navigate('Home')
                                    // GO HOME
                                }

                                return
                            }else{
                                alert('Passwords do not match')
                                return
                            }
                        }else{
                            // functions / login
                            let validDetails = await login(email, password)

                            var valid = validDetails[0]
                            if(valid == 1)
                            {
                                await validateAccount(email, password, validDetails[1], validDetails[2])
                                navigation.navigate('Home')
                                // GO HOME
                            }else{
                                alert("Account not found")
                            }
                            return
                        }
                    }
                }
                alert("All fields must be enterd")
            }
            return(
                <View style={{backgroundColor: '#42CBC6', height: vh(100)}}>
                    <Text style={{color: 'white', fontSize: 35, fontWeight: 'bold', textAlign: 'center', position: 'relative', top: 80}}>Gotraders</Text>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center', position: 'relative', top: 80}}>Post domestic jobs,{"\n"}get cheap quotes from traders</Text>

                    <View style={{justifyContent: 'center', alignItems: 'center', position: 'relative', top: 120, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => {updateRegType(0)}} style={{width: 150, height: 50}}>
                            <Text style={{color: 'white', textAlign: 'center', marginTop: 6, fontSize: 28, fontWeight: 'bold', opacity: signupOpac}}>Signup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {updateRegType(1)}} style={{width: 150, height: 50}}>
                            <Text style={{color: 'white', textAlign: 'center', marginTop: 6, fontSize: 28, fontWeight: 'bold', opacity: loginOpac}}>Login</Text>
                        </TouchableOpacity>

                        <View style={{ position: 'absolute', top: 70 }}>
                            <RegView />
                            
                            <TouchableOpacity onPress={() => {registerAccount()}} style={{backgroundColor: 'white', marginTop: 30, width: 200, height: 50, borderColor: 'white', borderWidth: 4, borderRadius: 10}}>
                                <Text style={{color: '#42CBC6', textAlign: 'center', marginTop: 6, fontSize: 20, fontWeight: 'bold'}}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                
                
                </View>
            )
        }
    }
    return(
        <Renderer />
    )
}