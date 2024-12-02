import React from 'react'
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet ,SafeAreaView, Pressable ,Image} from 'react-native';

const VenueCard = ({item}) => {
    console.log(item);
  return (
    <View>
        <Pressable>
            <Image
            style={{
                width:"100%",
                height:200,
                borderTopLeftRadius:10,
                borderTopRightRadius:10

            }}
            source={{uri: item?.image}}
            />
              <View>
                <View>
                    <Text>
                        {item?.name.length >40 ?
                        item?.name?.substring(0,40) + "...":
                        item?.name}
                    </Text>
                </View>
            
            </View>
        </Pressable>
    </View>
  )
}

export default VenueCard;
