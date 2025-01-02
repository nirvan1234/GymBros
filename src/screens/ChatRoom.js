import { useNavigation, useRoute  } from '@react-navigation/native';
import React, { useContext, useLayoutEffect, useState  , useEffect} from 'react'
import { View , Text , SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Image, StyleSheet, ScrollView, Alert} from 'react-native'
import { AuthContext } from '../authContext';
import { useSocketContext } from '../SocketContext';
import axios from 'axios';


const ChatRoom = () => {
    const navigation = useNavigation();

  const [message, setMessage] = useState("");

  const { setToken, token, userId } = useContext(AuthContext);

  const {socket} = useSocketContext();

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

  const [messages, setMessages] = useState([]);

  const listeMessages = () => {
    const {socket} = useSocketContext();

    useEffect(() => {
      socket?.on('newMessage', newMessage => {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      });

      return () => socket?.off('newMessage');
    }, [socket, messages, setMessages]);
  };

  listeMessages();

  const sendMessage = async (senderId, receiverId) => {
    try {
      await axios.post('http://10.0.2.2:4000/sendMessage', {
        senderId,
        receiverId,
        message,
      });

      socket.emit('sendMessage', {senderId, receiverId, message});

      setMessage('');

      setTimeout(() => {
        fetchMessages();
      }, 100);
    } catch (error) {
      console.log('Error', error);
    }
  };
  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const receiverId = route?.params?.receiverId;

      const response = await axios.get('http://10.0.2.2:4000/messages', {
        params: {senderId, receiverId},
      });

      setMessages(response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  console.log("msg", messages);
  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
     <ScrollView>
        {messages?.map((item, index) => {
          return (
            <Pressable
            key={index}
            style={[
                item?.senderId?._id === userId
                  ? {
                      alignSelf: 'flex-end',
                      backgroundColor: '#DCF8C6',
                      padding: 8,
                      maxWidth: '60%',
                      borderRadius: 7,
                      margin: 10,
                    }
                  : {
                      alignSelf: 'flex-start',
                      backgroundColor: 'white',
                      padding: 8,
                      margin: 10,
                      borderRadius: 7,
                      maxWidth: '60%',
                    },
            
              ]}>
              <Text style={{fontSize:13,textAlign:"left"}}>{item?.message}</Text>
              <Text style={{textAlign:"right",fontSize:9,color:"gray",marginTop:4}}>{formatTime(item?.timeStamp)}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
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
      <Text>@</Text>
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
        <Text>@</Text>
        <Text>@</Text>
      </View>

      <Pressable
        onPress={() => sendMessage(userId, route?.params?.receiverId)}
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

export default ChatRoom
