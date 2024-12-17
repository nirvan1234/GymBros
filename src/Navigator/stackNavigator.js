import React, { Component, useContext , useEffect } from 'react'
import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import SimpleIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BookScreen from '../screens/BookScreen'
import PlayScreen from '../screens/PlayScreen'
import ProfileScreen from '../screens/ProfileScreen'
import Login from '../screens/Login';
import Register from '../screens/Register';
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../authContext';
import RequestChatScreen from '../screens/RequestChatScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
   return (
      <Tab.Navigator>
         <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
               TabBarActiveTintColor: "green",
               TabBarIcon: ({ focused }) => {
                  focused ? (
                     <Icon name="logout" color="rgba(110, 120, 170, 1)" size={25} />
                  ) : (
                     <SimpleIcon name="user" color="rgba(110, 120, 170, 1)" size={25} />
                  )
               }
            }}
         />
         <Tab.Screen
            name="Book"
            component={BookScreen}
            options={{
               TabBarActiveTintColor: "green",
               headerShown: false,
               TabBarIcon: ({ focused }) => {
                  focused ? (
                     <SimpleIcon name="wallet" color="rgba(110, 120, 170, 1)" size={25} />
                  ) : (
                     <SimpleIcon name="wallet" color="rgba(110, 120, 170, 1)" size={25} />
                  )
               }
            }}
         />
         <Tab.Screen
            name="Play"
            component={PlayScreen}
            options={{
               TabBarActiveTintColor: "green",
               headerShown: false,
               headerShown: false,
               TabBarIcon: ({ focused }) => {
                  focused ? (
                     <SimpleIcon name="wallet" color="rgba(110, 120, 170, 1)" size={25} />
                  ) : (
                     <SimpleIcon name="wallet" color="rgba(110, 120, 170, 1)" size={25} />
                  )
               }
            }}
         />
         <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
               TabBarActiveTintColor: "green",
               headerShown: false,
               TabBarIcon: ({ focused }) => {
                  focused ? (
                     <SimpleIcon name="wallet" color="rgba(110, 120, 170, 1)" size={25} />
                  ) : (
                     <SimpleIcon name="wallet" color="rgba(110, 120, 170, 1)" size={25} />
                  )
               }
            }}
         />
      </Tab.Navigator>
   )
}

const StackNavigator = () => {

   const { token, setToken } = useContext(AuthContext);

   useEffect(() => {
      const fetchUser = async () => {
         const token = await AsyncStorage.getItem('authToken');
         console.log('token from context', token);
      };

      fetchUser();
   }, []);

   const AuthStack = () => {
      return <Stack.Navigator>
         <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
         />
      </Stack.Navigator>
   }

   const MainStack = () => {
      return (
         <Stack.Navigator>
            <Stack.Screen
               name="main"
               component={BottomTabs}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="RequestChatScreen"
               component={RequestChatScreen}
            />
         </Stack.Navigator>
      )
   }

   return (

      <NavigationContainer>
         {token === null || token === '' ? <AuthStack /> : <MainStack />}
      </NavigationContainer>
   )
}

export default StackNavigator
