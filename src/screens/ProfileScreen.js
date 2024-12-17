import React, { useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { AuthContext } from '../authContext'
import UserCard from '../components/userCard'
import {jwtDecode} from 'jwt-decode';


const ProfileScreen = () => {
  const [users, setUsers] = useState([])
  const [requests, setRequests] = useState([]);

  // const userId = "6752efa8b3aebd92b288ee8b";

  const {token ,userId} = useContext(AuthContext);

  console.log("profile" ,userId);

//   const decodeToken = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       console.log('Decoded JWT:', decoded);
//       return decoded;
//     } catch (error) {
//       console.error('Failed to decode token:', error);
//       return null;
//     }
//   };
  

//   const decoded = decodeToken(token);

// console.log("profile", token , decoded)

//    const {userId} = decoded;

  const fetchUser = async () => {
    try {
      const result = await fetch(`http://10.0.2.2:4000/user/${userId}`)
      // const result = await fetch('http://localhost:4000/user/6752efa8b3aebd92b288ee8b');
      const data = await result.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  

  console.log("user", users);
  return (
    <SafeAreaView>
      <View>
        <Text 
        style={{
          textAlign:"center",
          marginTop: 12,
          fontSize: 15,
          fontWeight:"500"

        }}>People using Signal</Text>
      </View>
      <FlatList 
       data={users}
       renderItem={({item}) => <UserCard user={item} />}
      />
    </SafeAreaView>
  )
}

export default ProfileScreen
