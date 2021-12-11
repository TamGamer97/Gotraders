import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from 'expo-updates';
import * as firebase from "firebase";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBIO65yNUDH0irIhr2s2whjlXCe8QyVuok",
    authDomain: "gotraders-fed82.firebaseapp.com",
    databaseURL: "https://gotraders-fed82-default-rtdb.firebaseio.com",
    projectId: "gotraders-fed82",
    storageBucket: "gotraders-fed82.appspot.com",
    messagingSenderId: "944924023304",
    appId: "1:944924023304:web:f4d390857ea2814dfc0fbd"
};

if(firebase.apps.length == 0)
{
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
// db.settings({ timestampInSnapshots: true });



// default functions
function getData(collection, document)
{
    let data = [];
    return new Promise((resolve, reject) => {

        db.collection(collection).get().then(snapshot => {
            docs = snapshot.docs

            docs.forEach(doc => {

                documentName = doc.id

                if(document == "*")
                {
                    data.push(doc.data())
                }

                if(document != "*")
                {
                    if(document == documentName)
                    {
                        data = doc.data()
                    }
                }
                
            })


            resolve(data)
            
        })

        if(data == [])
        {
            reject("Collection data not found")
        }

    })
}
function setData(collection, document, datatoSet)
{
    
    console.log(collection + " " + document + " " + datatoSet)
    db.collection(collection).doc(document).set(datatoSet)
}
async function docExists(collection, document)
{
    const userDocRef = await db.collection(collection).doc(document);
   const doc = await userDocRef.get();
   if (!doc.exists) {
     return false
   } else {
     return true
   }
}

export const save = async(key, value) => {
    try{
        await AsyncStorage.setItem(key, value)
        console.log('Saved')
    } catch (err) {
      //console.log(err)
    }
}
export const load = async(key) => {
    try{
        let value = await AsyncStorage.getItem(key)

        return value
    } catch(err) {
    //   console.log(err)
    }
}
export const remove = async(id) => {
    AsyncStorage.removeItem(id)
}

export async function checkLoggedin()
{
    let retTYpe = false

    await load('email').then(email => {
        if(email) {retTYpe = true}
        else{retTYpe = false}
    }).catch(retTYpe = false)

    return retTYpe
}
export async function getUsersFromCategory(category)
{
    console.log('searching')

    const nameList = []

    const data = await getData('Jobs', category)
    for (const job in data[category + "-Jobs"])
    {
        let name = data[category + "-Jobs"][job]['Job-sellersId']
        nameList.push(name)
    }

    // console.log(nameList)

    let sellersInfo = []
    
    for (const sellerIdInd in nameList)
    {
        let sellerId = nameList[sellerIdInd]
        let data = await getData('Accounts', sellerId)
        // console.log(data)
        let obj = {name: data['username'], profileImage: data['profile']}
        sellersInfo.push(obj)
    }

    console.log('found')
    return sellersInfo
}

export async function getGigData(category)
{
    console.log('searching gigs')
    let data = await getData('Jobs', category)
    data = data[category + "-Jobs"]

    let gigList = [ ]

    for (const jobInex in data)
    {
        let singleJob = data[jobInex]
        let gigObj = {}
        gigObj['desc'] = singleJob['Job-description']
        gigObj['url'] = singleJob['Job-image']
        gigObj['category'] = category
        gigObj['id'] = singleJob['Job-id']
        
        gigList.push(gigObj)
    }

    console.log('found gigs')
    return gigList

}

export async function getSignleGigData(category, id)
{
    console.log('searching single gigs ' + category + " " + id)
    let data = await getData('Jobs', category)
    data = data[category + "-Jobs"]

    let gigList = [ ]

    for (const jobInex in data)
    {
        let singleJob = data[jobInex]
        if(singleJob['Job-id'] == id)
        {
            gigList.push(singleJob['Job-image'])
            gigList.push(singleJob['Job-title'])
            gigList.push(singleJob['Job-description'])
            gigList.push(category)
            gigList.push(singleJob['Job-price'])
            gigList.push(singleJob['Job-time'])
            gigList.push(singleJob['Job-seller'])
            gigList.push(singleJob['Job-contact'])
        }
    }

    console.log('found gigs')
    return gigList
}

export async function getTransactions()
{
    const userId = await load('id')

    const accountData = await getData('Accounts', userId)

    let Spent = accountData['transactions']['spent']
    let Earned = accountData['transactions']['earned']

    return [Spent, Earned]
}

export async function validateAccount(email, password, username, id)
{
    await save('username', username)
    await save('password', password)
    await save('email', email)
    await save('id', JSON.stringify(id))

    return
}

export async function login(email, password)
{
    let validy = 0
    let detailList = []
    await db.collection('Accounts').get().then(snapshot => {
        var docs = snapshot.docs

        docs.forEach(doc => {
            let docData = doc.data()
            if(email == docData['email'])
            {
                if(password == docData['password'])
                {
                    validy = 1
                    console.log('validity = 1')
                    detailList.push(docData['username'])
                    detailList.push(docData['id'])
                }
            }
        })
    })

    return [validy, detailList[0], detailList[1]]
}

export async function signup(email, username, password)
{
    const timeStamp = Date.now()
    const defaultProfile = "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"

    let Fields = {email: email, id: timeStamp, password: password, profile: defaultProfile, transactions: {earned: 0, spent: 0}, username: username }

    setData('Accounts', JSON.stringify(timeStamp), Fields)

    return [1, timeStamp]
}

export async function logout()
{
    await remove('id')
    await remove('email')
    await remove('password')
    await remove('username')

    await Updates.reloadAsync();

    return
}

export async function getAccountData()
{
    const id = await load('id')

    // console.log(id)

    let data = await getData('Accounts', id)

    let profileUrl = data['profile']
    let username = data['username']

    let fullName = null
    let category = null
    let userType = null

    try{
        fullName = data['name']
    }catch(err){}

    try{
        category = data['category']
    }catch(err){}

    try{
        userType = data['userType']
    }catch(err){}

    // console.log(profileUrl)

    return [profileUrl, username, fullName, category, userType]
}

export async function AccountConfig(config, data)
{
    const id = await load('id')
    if(config == "fullname")
    {
        let Accountdata = await getData('Accounts', id)
        Accountdata['name'] = data
        setData('Accounts', id, Accountdata)
        return
    }
    if(config == "profile")
    {
        let Accountdata = await getData('Accounts', id)
        Accountdata['profile'] = data
        setData('Accounts', id, Accountdata)
        return
    }
    if(config == "category")
    {
        let Accountdata = await getData('Accounts', id)
        Accountdata['category'] = data
        setData('Accounts', id, Accountdata)
        return
    }
    if(config == "userType")
    {
        let Accountdata = await getData('Accounts', id)
        Accountdata['userType'] = data // data = buyer ? seller
        setData('Accounts', id, Accountdata)
        return
    }
}

export async function initilizeGig(gigConfig)
{
    const id = await load('id')
    const name = await load('username')

    const timeStamp = Date.now()

    let category = gigConfig['category']
    delete gigConfig['category']

    gigConfig['Job-seller'] = name
    gigConfig['Job-sellersId'] = id
    gigConfig['Job-id'] = JSON.stringify(timeStamp)

    console.log(gigConfig)

    let data = await getData('Jobs', category)
    
    console.log(data)
    
    data[category + "-Jobs"][[timeStamp]] = gigConfig

    setData('Jobs', category, data)

    

}

// getUsersFromCategory('Plumbing')