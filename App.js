import * as React from 'react';
import { Text, View, Image, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// pages
import Home from './JS/Home'
import Discover from './JS/Discover'
import Chats from './JS/Chat'
import Transactions from './JS/Transactions'
import Accounts from './JS/Account'
import Folder from './JS/Folder'
import LoadingPage from './JS/LoadingPage'
import Register from './JS/Register'


// icons
import HomeIcon from './Images/HomeIcon.png'
import DiscoverIcon from './Images/DiscoverPage.png'
import ChatIcon from './Images/chat.png'
import TransactionsIcon from './Images/Transactions.png'
import AccountsIcon from './Images/myAccount.png'

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Setting a timer for a long period of time'], ['AsyncStorage has been extracted fro']);

function HomeScreen() {
  return (
    <Home />
  );
}
function DiscoverScreen()
{
  return (
    <Discover />
  );
}
function ChatScreen()
{
  return (
    <Chats />
  )
}
function TransactionsScreen()
{
  return (
    <Transactions />
  );
}
function AccountsScreen({navigation})
{
  return (
    <Accounts navigation={navigation}/>
  );
}
function FodlersScreen({navigation})
{
  return (
    <Folder navigation={navigation} />
  );
}

function LoadingScrrenStack({navigation}) // stack not tab like others
{
  return(
     <LoadingPage navigation={navigation}/>
  )
}
function RegisterScreenStack({navigation}) // stack not tab like others
{
  return(
      <Register navigation={navigation} />
  )
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
  dark: false,
  colors: {
    primary: '#F3F3F3',
    background: '#F3F3F3',
    card: '#F3F3F3',
    text: '#F3F3F3',
    border: '#42CBC6',
    notification: '#42CBC6',
  },
};

function appTabs()
{
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarShowLabel: false, headerShown: false, tabBarIcon: ({focused}) => (<Image style={[{width :25, height: 25, marginTop: 5, }, focused ? {opacity: 1} : {opacity: 0.4}]} source={HomeIcon} />), }} />
      <Tab.Screen name="Discover" component={DiscoverScreen} options={{ tabBarShowLabel: false, headerShown: false, tabBarIcon: ({focused}) => (<Image style={[{width :25, height: 25, marginTop: 5, }, focused ? {opacity: 1} : {opacity: 0.4}]} source={DiscoverIcon} />), }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ tabBarShowLabel: false, headerShown: false, tabBarIcon: ({focused}) => (<Image style={[{width :25, height: 25, marginTop: 5, }, focused ? {opacity: 1} : {opacity: 0.4}]} source={ChatIcon} />), }} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} options={{ tabBarShowLabel: false, headerShown: false, tabBarIcon: ({focused}) => (<Image style={[{width :25, height: 25, marginTop: 5, }, focused ? {opacity: 1} : {opacity: 0.4}]} source={TransactionsIcon} />), }} />
      <Tab.Screen name="Account" component={AccountsScreen} options={{ tabBarShowLabel: false, headerShown: false, tabBarIcon: ({focused}) => (<Image style={[{width :25, height: 25, marginTop: 5, }, focused ? {opacity: 1} : {opacity: 0.4}]} source={AccountsIcon} />), }} />
      <Tab.Screen name="Folder" component={FodlersScreen} options={{ tabBarStyle: { display: 'none' }, tabBarButton: (props) => null, tabBarShowLabel: false, headerShown: false}} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loading" component={LoadingScrrenStack} />
        <Stack.Screen name="Register" component={RegisterScreenStack} />
        <Stack.Screen name="Home" component={appTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}