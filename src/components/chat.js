import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import { AuthContext } from '../authContext'

const Chat = ({ item }) => {

    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const { userId } = useContext(AuthContext);
    return (
        <Pressable
            onPress={() => navigation.navigate("ChatRoom", {
                name: item.name,
                recieverId: item._id,
            })}
            style={{ marginVertical: 15 }}
        >
            <View style={{ flexDirection: 'row', alignItems: "center", gap: 10 }}>
                <Pressable>
                    <Image
                        style={styles.imageBig}
                        source={{
                            uri: "https://static.vecteezy.com/system/resources/thumbnails/011/405/724/small/call-food-logo-design-food-delivery-service-logo-concept-free-vector.jpg",
                        }}
                    />
                </Pressable>
                <View>
                    <Text style={{ fontSize: 15, fontWeight: 500 }}> {item.name}</Text>
                    <Text style={{ margin: 4, color: "gray" }}> Chat wiht {item.name}</Text>
                </View>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({

    imageBig: {
        height: 40,
        width: 40,
        borderRadius: 20
    },

});

export default Chat
