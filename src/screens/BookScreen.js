import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import InstaStory from 'react-native-insta-story';

const ProfileScreen = () => {
  const channels = [
    {
      id: '0',
      name: 'Netflix',
      image: 'https://cdn-icons-png.flaticon.com/128/2504/2504929.png',
      text: 'Your in the right place',
      date: '2:45 AM',
    },
    {
      id: '2',
      name: 'Marc Zuckerberg',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHtsQvDUZ3Q90XuFjYvcZ-KVaDhUJcA39u-g&s',
      text: 'Anyone else watching this weekend?',
      date: '2:45 AM',
    },
    {
      id: '0',
      name: 'Indian Cricket Team',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAtic4zkoYA0BmKDTREcuxL0VWVMlP3UqBUg&s',
      text: 'Any guesses who won the Fielding medal for the series',
      date: '1:45 PM',
    },
    {
      id: '3',
      name: 'Cravings',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPcBoRdfwpZXICr6FFLcUDT4c22xCzTVwQj6e9lwQHTo-KZw12rZD_z4u-_595SK_EpU8&usqp=CAU',
      text: 'Fruit Platters are the best',
      date: '2:45 AM',
    },
    {
      id: '5',
      name: 'Royal Challengers Bangalore',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlVuzjh0-kKm1BbO5qBjeIwelK8r4DvYZ5A&s',
      text: 'We only want it to rain boundaries and wickets for RCB',
      date: '2:45 AM',
    },
  ];
  const data = [
    {
      user_id: 1,
      user_image:
        'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },
    {
      user_id: 2,
      user_image:
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      user_name: 'Test User',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 2 swiped'),
        },
      ],
    },
  ];
  return (
    <SafeAreaView>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>Updates</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <View style={{marginTop: 10}}>
            <Pressable>
              <Image
                style={{width: 58, height: 58, borderRadius: 29}}
                source={{
                  uri: 'https://lh3.googleusercontent.com/ogw/AF2bZyi09EC0vkA0pKVqrtBq0Y-SLxZc0ynGmNrVKjvV66i3Yg=s64-c-mo',
                }}
              />
              <Text style={{textAlign: 'center', marginTop: 5}}>sujan</Text>
            </Pressable>
          </View>
          <InstaStory data={data} duration={10} />
        </View>
      </View>

      <View style={{padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Channels</Text>
        {channels?.map((item, index) => (
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}>
            <View>
              <Image
                style={{width: 50, height: 50, borderRadius: 25}}
                source={{uri: item?.image}}
              />
            </View>

            <View style={{flex: 1}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {item?.name}
              </Text>
              <Text style={{marginTop: 4, color: 'gray'}}>{item?.text}</Text>
            </View>

            <Text>{item?.date}</Text>
          </View>
        ))}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Image
            style={{width: 120, height: 120}}
            source={{
              uri: 'https://signal.org/assets/images/features/Stickers.png',
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
// import React, { useState } from 'react';
// import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet ,SafeAreaView, Pressable } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import VenueCard from '../components/venueCard';

// const BookScreen = () => {

//   const venues = [
//     {
//       id: '0',
//       name: "DDSA - St.Joseph's Boys' High School (European)",
//       address: 'Ashok Nagar',
//       newImage:
//         'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800',
//       image:
//         'https://playo.gumlet.io/DDSASTJOSEPHSBOYSHIGHSCHOOLEUROPEANS20220919091705834667/DDSAStJosephsBoysHighSchoolEuropeans1666166846682.jpg?mode=crop&crop=smart&h=200&width=450&q=40&format=webp',
//       location:
//         'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
//       rating: 3.6,
//       timings: '5.30 AM - 9:00 PM',
//       sportsAvailable: [
//         {
//           id: '10',
//           name: 'Badminton',
//           icon: 'badminton',
//           price: 500,
//           courts: [
//             {
//               id: '10',
//               name: 'Standard synthetic court 1',
//             },
//             {
//               id: '11',
//               name: 'Standard synthetic court 2',
//             },
//             {
//               id: '12',
//               name: 'Standard synthetic court 3',
//             },
//           ],
//         },
//         {
//           id: '11',
//           name: 'Cricket',
//           icon: 'cricket',
//           price: 1100,
//           courts: [
//             {
//               id: '10',
//               name: 'Full Pitch 1',
//             },
//             {
//               id: '11',
//               name: 'Full Pitch 2',
//             },
//           ],
//         },
//         {
//           id: '12',
//           name: 'Tennis',
//           icon: 'tennis',
//           price: 900,
//           courts: [
//             {
//               id: '10',
//               name: 'Court 1',
//             },
//             {
//               id: '11',
//               name: 'Court 2',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: '1',
//       image:
//         'https://playo.gumlet.io/PANCHAJANYABADMINTONFITNESSACADEMY/panchajanyabadmintonfitnessacademy1597334767773.jpeg?mode=crop&crop=smart&h=200&width=450&q=40&format=webp',
//       name: 'Panchajanya Badminton & Fitness Academy',
//       address: 'Kittur Rani Chennamma Stadium',
//       location:
//         'Gate 01, Kittur Rani Chennamma Stadium, Sports Complex, Jayanagar, Jayanagar East, Byrasandra, Jayanagar, Bengaluru, Karnataka - 560011',
//       rating: 4.0,
//       newImage:
//         'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800',
//       timings: '5 AM - 10 PM',
//       sportsAvailable: [
//         {
//           id: '10',
//           name: 'Badminton',
//           icon: 'badminton',
//           price: 500,
//           courts: [
//             {
//               id: '10',
//               name: 'Standard synthetic court 1',
//             },
//             {
//               id: '11',
//               name: 'Standard synthetic court 2',
//             },
//             {
//               id: '12',
//               name: 'Standard synthetic court 3',
//             },
//           ],
//         },
//         {
//           id: '11',
//           name: 'Cricket',
//           icon: 'cricket',
//           price: 1100,
//           courts: [
//             {
//               id: '10',
//               name: 'Full Pitch 1',
//             },
//             {
//               id: '11',
//               name: 'Full Pitch 2',
//             },
//           ],
//         },
//         {
//           id: '12',
//           name: 'Tennis',
//           icon: 'tennis',
//           price: 900,
//           courts: [
//             {
//               id: '10',
//               name: 'Court 1',
//             },
//             {
//               id: '11',
//               name: 'Court 2',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: '2',
//       name: 'Sportexx',
//       image:
//         'https://playo.gumlet.io/SPORTEXX20220319100016960702/sportexx1647683524186.jpg?mode=crop&crop=smart&h=200&width=450&q=40&format=webp',
//       address: 'Hebbal Kempapura',
//       location: '#43/2, 3rd Cross, Sonnappa Layout, Bhuvaneshwari Nagar',
//       rating: 4.1,
//       newImage:
//         'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800',
//       timings: '5.30 AM - 9:00 PM',
//       sportsAvailable: [
//         {
//           id: '10',
//           name: 'Badminton',
//           icon: 'badminton',
//           price: 500,
//           courts: [
//             {
//               id: '10',
//               name: 'Standard synthetic court 1',
//             },
//             {
//               id: '11',
//               name: 'Standard synthetic court 2',
//             },
//             {
//               id: '12',
//               name: 'Standard synthetic court 3',
//             },
//           ],
//         },
//         {
//           id: '11',
//           name: 'Cricket',
//           icon: 'cricket',
//           price: 1100,
//           courts: [
//             {
//               id: '10',
//               name: 'Full Pitch 1',
//             },
//             {
//               id: '11',
//               name: 'Full Pitch 2',
//             },
//           ],
//         },
//       ],
//     },
//   ];


//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: 12,
//         }}>
//         <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
//           <Text>Shankar Nagar</Text>
//           <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: 10
//           }}>
//           <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
//           <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />

//           </View>
//       </View>
//       <View style={styles.textInputStyle}>
//         <TextInput placeholder='Search for Venues'/>
//         <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
//       </View>
//       <Pressable style={{flexDirection:"row" , alignItems:"center", gap:13, padding:10}}>
//         <View style={styles.nuggetStyle}>
//           <Text>Sports and Activity</Text>
//         </View>
//         <View style={styles.nuggetStyle}>
//           <Text>favorite</Text>
//         </View>
//         <View style={styles.nuggetStyle}>
//           <Text>others</Text>
//         </View>
//       </Pressable>
//       <FlatList 
//       data={venues}
//       renderItem={({item}) => <VenueCard item={item} />}
//       contentContainerStyle={{paddingBottom:10}}
//       showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// export default BookScreen;


// const styles = StyleSheet.create({
//  textInputStyle:{
//   marginHorizontal:12,
//   backgroundColor:"#E8E8E8",
//   padding:12,
//   flexDirection:"row",
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   borderRadius: 25,
//  },
//  nuggetStyle:{
//   padding: 10,
//   borderRadius: 10,
//   borderColor: '#E0E0E0',
//   borderWidth: 2,
//  }
// })