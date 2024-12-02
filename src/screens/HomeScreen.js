import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useLayoutEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet, ScrollView, Image, Pressable , ImageBackground} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';



const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View>
          <Text>New Gym</Text>
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
          <Ionicons name="chatbox-outline" size={24} color="black" />
          <Ionicons name="notifications-outline" size={24} color="black" />

          <Pressable onPress={() => navigation.navigate('ProfileDetail')}>
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

  const data = [
    {
      id: '10',
      image:
        'https://playov2.gumlet.io/v3_homescreen/marketing_journey/Tennis%20Spotlight.png',
      text: 'Learn Tennis',
      description: 'Know more',
    },
    {
      id: '11',
      image:
        'https://playov2.gumlet.io/v3_homescreen/marketing_journey/playo_spotlight_08.png',
      text: 'Up Your Game',
      description: 'Find a coach',
    },
    {
      id: '12',
      image:
        'https://playov2.gumlet.io/v3_homescreen/marketing_journey/playo_spotlight_03.png',
      text: 'Hacks to win',
      description: 'Yes, Please!',
    },
    {
      id: '13',
      image:
        'https://playov2.gumlet.io/v3_homescreen/marketing_journey/playo_spotlight_02.png',
      text: 'Spotify Playolist',
      description: 'Show more',
    },
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.imageBig}
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/011/405/724/small/call-food-logo-design-food-delivery-service-logo-concept-free-vector.jpg",
            }}
          />
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: "center", gap: 4 }}>
            <Text>Set your weekly fit Goal</Text>
            <Image
              style={styles.imageSmall}
              source={{
                uri: "https://static.vecteezy.com/system/resources/thumbnails/011/405/724/small/call-food-logo-design-food-delivery-service-logo-concept-free-vector.jpg",
              }}
            />
          </View>
          <View>
            <Text style={{ marginTop: 4, color: "gray" }}>GET YOURSELF FIT</Text>
          </View>
        </View>
      </View>

      <View style={styles.ActivityContainer}>
        <View style={styles.ActivityText}>
          <Text>Gear up for your Game</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text>Badminton Activity</Text>
          <Pressable style={styles.ActivityButton}>
            <Text style={{ textAlign: "center" }}>View</Text>
          </Pressable>
        </View>
        <Text style={{ marginTop: 4, color: "gray" }}>You have no games today.</Text>
        <Pressable
          // onPress={() =>
          //   navigation.navigate('PLAY', {initialOption: 'Calendar'})
          // }
          style={{
            marginVertical: 15,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              textDecorationLine: 'underline',
            }}>
            View My Calendar
          </Text>
        </Pressable>
      </View>
      <View
        style={styles.bookContainer}>
        <Pressable style={{ flex: 1 }}>
          <View style={{ borderRadius: 10 }}>
            <Image
              style={{
                width: 180,
                height: 140,

                borderRadius: 10,
              }}
              source={{
                uri: 'https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=800',
              }}
            />
          </View>
          <Pressable
            style={{
              backgroundColor: 'white',
              padding: 12,
              width: 180,
              borderRadius: 10,
              // position: "absolute",
              // top: 100,
              // left: "20%",
              // transform: [{ translateX: -100 }],
            }}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: '500' }}>Play</Text>
              <Text style={{ fontSize: 15, color: 'gray', marginTop: 7 }}>
                Find Players and join their activities
              </Text>
            </View>
          </Pressable>
        </Pressable>
        <View style={{ flex: 1 }}>
          <View>
            <Image
              style={{
                width: 180,
                height: 140,

                borderRadius: 10,
              }}
              source={{
                uri: 'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800',
              }}
            />
          </View>
          <Pressable
            style={{
              backgroundColor: 'white',
              padding: 12,
              width: 180,
              borderRadius: 10,
            }}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: '500' }}>Book</Text>
              <Text style={{ fontSize: 15, color: 'gray', marginTop: 7 }}>
                Book your slots in venues nearby
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={{ padding: 13 }}>
        <View style={{ padding: 10, backgroundColor: "white", borderRadius: 10, flexDirection: "row", gap: 10 }}>
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#29AB87',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <AntDesign name="addusergroup" size={24} color="green" />
          </View>
          <View>
            <Text style={{ fontWeight: 'bold' }}>Groups</Text>

            <Text style={{ marginTop: 10, color: 'gray' }}>
              Connect,Compete and Discuss
            </Text>
          </View>
        </View>
        <View style={{ padding: 10, backgroundColor: "white", borderRadius: 10, flexDirection: "row", gap: 10 }}>
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#29AB87',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <AntDesign name="addusergroup" size={24} color="green" />
          </View>
          <View>
            <Text style={{ fontWeight: 'bold' }}>GameTime Activity</Text>

            <Text style={{ marginTop: 10, color: 'gray' }}>
              355 PlayO hosted Games
            </Text>
          </View>
        </View>
      </View>
      <View style={{padding:13}}>
        <View style={{padding:10, backgroundColor:"#ffff", borderRadius:10}}>
            <Text style={{fontWeight:"500", fontSize:15}}>SpotLight</Text>
            <ScrollView horizontal  showsHorizontalScrollIndicator={false}>
               {data.map((item , index) =>(
                <ImageBackground
                key={index}
                imageStyle={{borderRadius: 10}}
                style={{
                  width: 220,
                  height: 280,
                  resizeMode: 'contain',
                  marginRight: 10,
                  marginVertical: 15,
                }}
                source={{uri: item?.image}}
                 >

                </ImageBackground>
               ))}
            </ScrollView>
        </View>
      </View>

     

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 13,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageBig: {
    height: 60,
    width: 60,
    borderRadius: 10
  },
  imageSmall: {
    height: 40,
    width: 40,
    borderRadius: 10
  },
  ActivityText: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: 200,
    marginVertical: 5

  },
  ActivityContainer: {
    padding: 13,
    backgroundColor: 'white',
    marginVertical: 6,
    marginHorizontal: 13,
    borderRadius: 12,
  },
  ActivityButton: {
    padding: 10,
    backgroundColor: "#ffff",
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 80
  },
  bookContainer: {
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  }
});
export default HomeScreen;
