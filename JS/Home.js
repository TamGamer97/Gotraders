import React, {useEffect, useState} from 'react';
import { Text, View, Image, LogBox, Picker } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units'

import CategoryPicker from './CategoryPicker'
import {getUsersFromCategory} from './Functions'
import SellerInfo from './SellerInfo'

export default function App()
{
    const [cate, setCate] = useState('Plumbing')
    const [visList, updateVis] = useState([false, false, false, false])
    const [nameList, updateNames] = useState(['user 1', 'user 2', 'user 3', 'user 5'])
    const [linkList, updateImages] = useState(['iamge', 'image', 'image', 'image'])

    var blink = 'https://media.istockphoto.com/photos/neon-background-abstract-blue-and-pink-with-light-shapes-line-picture-id1191658515?b=1&k=20&m=1191658515&s=170667a&w=0&h=cS0xPQx1SaV6awUuT62L1MFTNB68Bz7WtAiXkEpfUN4='

    useEffect(() => {
        updateSellers()
    }, [cate])

    async function updateSellers()
    {
        updateVis([false, false, false, false])

        let data = await getUsersFromCategory(cate)
        // console.log(data)
        for (const sellerinfoInd in data)
        {
            var sellerinfo = data[sellerinfoInd]
            
            var nl = nameList
            nl[sellerinfoInd] = sellerinfo['name']
            updateNames(nl)

            var il = linkList
            il[sellerinfoInd] = sellerinfo['profileImage']
            updateImages(il)

            var vl = visList
            vl[sellerinfoInd] = true
            updateVis(vl)

            // console.log(visList)

            if(sellerinfoInd == 3)
            {
                return
            }
        }
    }

    return(
        <View>
            <View style={{position: 'absolute', top: 0, width: vw(100), height: 170, backgroundColor: '#42CBC6'}}>
                <Text style={{textAlign: 'center', marginTop: 40, fontSize: 30, color: 'white', fontWeight: 'bold'}} >Gotraders</Text>
                <Text style={{textAlign: 'center', marginTop: 0, fontSize: 15, color: 'white', fontWeight: 'bold'}} >Post domestic jobs,{"\n"}get cheap quotes from traders</Text>
            </View>
            <View style={{position: 'absolute', top: -75, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                
                <CategoryPicker setCate={setCate}/>
                
            </View>

            <View style={{position: 'relative', top: 190, width: vw(100)}}>

                <Text style={{position: 'relative', top: 20, color: '#42CBC6', fontSize: 25, textAlign: 'center', fontWeight: 'bold', textDecorationLine: 'underline'}}>Users related to '{cate}'</Text>
                
                
                <View style={{justifyContent: 'center', alignItems: 'center', position: 'relative', top: 50}}>
                    <View name={'users display view'} style={{backgroundColor: 'transparent', width: vw(90), justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}> 

                        <SellerInfo vis={visList[0]} name={nameList[0]} profileLink={linkList[0]} />
                        <SellerInfo vis={visList[1]} name={nameList[1]} profileLink={linkList[1]} />

                    </View>
                    <View name={'users display view'} style={{backgroundColor: 'transparent', width: vw(90), justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 20}}> 

                        <SellerInfo vis={visList[2]} name={nameList[2]} profileLink={linkList[2]} />
                        <SellerInfo vis={visList[3]} name={nameList[3]} profileLink={linkList[3]} />

                    </View>

                </View>

            </View>

            
                
            

        </View>
    )
}