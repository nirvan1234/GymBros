import React, { useContext, useLayoutEffect, useState } from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Image, StyleSheet, ScrollView, Alert } from 'react-native'
import { AuthContext } from '../authContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

const RequestChatScreen = () => {

  const navigation = useNavigation();

  const [message, setMessage] = useState("");

  const { setToken, token, userId } = useContext(AuthContext);


  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View>
          <Text>{route?.params?.name}</Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginRight: 15,
          }}>


          <Pressable
          //   onPress={() => navigation.navigate('ProfileDetail')}
          >
            <Image
              style={{ width: 30, height: 30, borderRadius: 15 }}
              source={{
                uri: "https://static.vecteezy.com/system/resources/thumbnails/011/405/724/small/call-food-logo-design-food-delivery-service-logo-concept-free-vector.jpg",
              }}
            />
          </Pressable>
        </View>

      )
    })

  }, [])

  console.log("Rec", route?.params.receiverId);
  console.log("Message", message);
  console.log("userId", userId);

  const sendMessage = async () => {
    try {
      const userData = {
        senderId: userId,
        receiverId: route?.params?.receiverId,
        message: message
      };

      const response = await axios.post("http://10.0.2.2:4000/sendrequest", userData);
      if (response.status == 200) {
        setMessage("");
        Alert.alert("Your request has been shared", "wait for the user to accept your request")
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  // const sendMessage = async () => {
  //   try {
  //     const userData = {
  //       senderId: userId,
  //       recieverID: route?.params?.recieverId,
  //       message: message,
  //     }
  //     const response = await axios.post("http://10.0.2.2:4000/sendrequest", userData);

  //     if (response.status == 200) {
  //       setMessage("");
  //       Alert.alert("Your request has been shared", "wait for the user to accept your request")
  //     }

  //   } catch (error) {
  //     console.log("error", error)
  //   }

  // }
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView></ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: '#dddddd',
          marginBottom: 20,
        }}>
        <Entypo name="emoji-happy" size={24} color="gray" />
        <TextInput
          placeholder='type your message...'
          value={message}
          onChangeText={setMessage}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: '#ddddd',
            borderRadius: 20,
            paddingHorizontal: 10,
            marginLeft: 10
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginHorizontal: 8,
          }}>
          <Entypo name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable
          onPress={sendMessage}
          style={{
            backgroundColor: '#0066b2',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default RequestChatScreen
