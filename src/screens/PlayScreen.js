import React, {useState , useEffect , useContext} from 'react'
import { jwtDecode } from "jwt-decode";
import { View ,SafeAreaView, Text , Pressable,Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../authContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PlayScreen = () => {
  const [options, setOptions] = useState(['Chats']);
  const [chats, setChats] = useState([]);
  const [requests, setRequests] = useState([]);
  const {token, setToken, setUserId, userId} = useContext(AuthContext);
  const navigation = useNavigation();

  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setToken('');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error', error);
    }
  };



  // useEffect(() => {
  //   if (userId) {
  //     getrequests();
  //   }
  // }, [userId]);
  // useEffect(() => {
  //   if (userId) {
  //     getUser();
  //   }
  // }, [userId]);
  // const getrequests = async () => {
  //   try {
  //     // const result = await fetch(`http://10.0.2.2:4000/getrequests/${userId}`)
  //     // // const result = await fetch('http://localhost:4000/user/6752efa8b3aebd92b288ee8b');
  //     // const data = await result.json();
  //     const response = await axios.get(
  //       `http://10.0.2.2:4000/getrequests/${userId}`,
  //     );
  //      console.log("response", response);
  //     // setRequests(response.data);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };
  // console.log(requests);



  useEffect(() => {
    const fetchUser = async () => {
        const fetchToken = await AsyncStorage.getItem("authToken");
        const decodedToken = jwtDecode(fetchToken);
        console.log("decodedtoken", decodedToken);
        setToken(fetchToken);
        const userId = decodedToken.userId;
        setUserId(userId);
    }

    fetchUser();

}, [])


  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'space-between',
      }}>
      <Pressable onPress={logout}>
        <Image
          style={{width: 30, height: 30, borderRadius: 15}}
          source={{
            uri: 'https://lh3.googleusercontent.com/ogw/AF2bZyi09EC0vkA0pKVqrtBq0Y-SLxZc0ynGmNrVKjvV66i3Yg=s64-c-mo',
          }}
        />
      </Pressable>

      <Text style={{fontSize: 15, fontWeight: '500'}}>Chats</Text>

      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <AntDesign name="camerao" size={26} color="black" />
          <MaterialIcons
            onPress={() => navigation.navigate('Profile')}
            name="person-outline"
            size={26}
            color="black"
          />
        </View>
      </View>
    </View>

    <View style={{padding: 10}}>
      <Pressable
        onPress={() => chooseOption('Chats')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text>Chats</Text>
        </View>
        {/* <Entypo name="chevron-small-down" size={26} color="black" /> */}
      </Pressable>

      {/* <View>
        {options?.includes('Chats') &&
          (chats?.length > 0 ? (
            <View>
              {chats?.map((item, index) => (
                <Chat item={item} key={item?._id} />
              ))}
            </View>
          ) : (
            <View
              style={{
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{textAlign: 'center', color: 'gray'}}>
                  No Chats yet
                </Text>
                <Text style={{marginTop: 4, color: 'gray'}}>
                  Get started by nessaging a friend
                </Text>
              </View>
            </View>
          ))}
      </View> */}

      <Pressable
        onPress={() => chooseOption('Requests')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text>Requests</Text>
        </View>
        {/* <Entypo name="chevron-small-down" size={26} color="black" /> */}
      </Pressable>

      <View style={{marginVertical: 12}}>
        {options?.includes('Requests') && (
          <View>
            <Text style={{fontSize: 15, fontWeight: '500'}}>
              Checkout all the requests
            </Text>

            {requests?.map((item, index) => (
              <Pressable style={{marginVertical: 12}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Pressable>
                    <Image
                      source={{uri: item?.from?.image}}
                      style={{width: 40, height: 40, borderRadius: 20}}
                    />
                  </Pressable>

                  <View style={{flex: 1}}>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>
                      {item?.from?.name}
                    </Text>

                    <Text style={{marginTop: 4, color: 'gray'}}>
                      {item?.message}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => acceptRequest(item?.from?._id)}
                    style={{
                      padding: 8,
                      backgroundColor: '#005187',
                      width: 75,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        textAlign: 'center',
                        color: 'white',
                      }}>
                      Accept
                    </Text>
                  </Pressable>

                  <AntDesign name="delete" size={26} color="red" />
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  </SafeAreaView>

  )
}

export default PlayScreen
