import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Image, StyleSheet } from 'react-native'

const UserCard = (props) => {
  console.log("props", props.user);
  const { name, email , _id } = props.user;

  const navigation = useNavigation();


  return (
    <View styel={{ padding: 10 , marginTop:10}}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Pressable>
          <Image
            style={styles.imageBig}
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/011/405/724/small/call-food-logo-design-food-delivery-service-logo-concept-free-vector.jpg",
            }}
          />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text
            style={{
            }}>{name}</Text>
          <Text
            style={{

            }}>{email}</Text>
        </View>
        <Pressable
            onPress={() => navigation.navigate("RequestChatScreen", {
              name: name,
              receiverId: _id,
            })}
            style={{
              width: 100,
              backgroundColor: "#4A55A2",
              padding: 5,
              marginRight: 10,
              borderRadius: 6
            }}
          >
            <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16, textAlign: "center" }}>Chat</Text>
          </Pressable>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  imageBig: {
    height: 60,
    width: 60,
    borderRadius: 10
  },

});

export default UserCard
