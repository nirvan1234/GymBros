import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Image, Alert } from 'react-native'
import axios from 'axios';

const Register = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("");
    const [name, setName] = useState("");

    const navigation = useNavigation();

    const handleRegister = () => {
        const user = {
            name: name,
            email: mail,
            password: password
        }

        axios.post("http://localhost:4000/register", user).then(response => {
            console.log(response);
            Alert.alert(
                'Registration Successful',
                'you have registered successfully'
            )
            setName("");
            setMail("");
            setPassword("");
        }).catch(error => {
            Alert.alert(
                'Registration Successful',
                'you have registered successfully'
            )

        })

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ padding: 10, alignItems: "center" }}>
                <KeyboardAvoidingView>
                    <View style={{ padding: 20, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 15, fontWeight: 500 }}>Set up your profile</Text>
                        <Text style={{ marginTop: 10, margingHorizontal: 16, textAlign: "center", color: "gray" }}>
                            Profiles are visible to your friends and connection and group
                        </Text>

                        <Pressable style={{ marginTop: 20 }}>
                            <Image
                                source={{
                                    uri: image
                                        ? image
                                        : 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
                                }}
                                style={{ width: 50, height: 50, borderRadius: 25 }}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    marginTop: 4,
                                    color: 'gray',
                                    fontSize: 12,
                                }}>
                                Add
                            </Text>
                        </Pressable>

                        <View style={{ marginTop: 30 }}>
                            <Text style={{ fontSize: 15, fontWeight: 800, color: "gray" }}>Name</Text>
                            <View>
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    placeholderTextColor="#BEBEBE"
                                    style={{
                                        width: 340,
                                        marginTop: 15,
                                        borderBottomColor: '#BEBEBE',
                                        borderBottomWidth: 1,
                                        paddingBottom: 10,
                                        fontFamily: 'GeezaPro-Bold',
                                        fontSize: mail ? 15 : 15,
                                    }}
                                    placeholder="Enter your Name"
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={{ fontSize: 15, fontWeight: 800, color: "gray" }}>Email</Text>
                            <View>
                                <TextInput
                                    value={mail}
                                    onChangeText={setMail}
                                    placeholderTextColor="#BEBEBE"
                                    style={{
                                        width: 340,
                                        marginTop: 15,
                                        borderBottomColor: '#BEBEBE',
                                        borderBottomWidth: 1,
                                        paddingBottom: 10,
                                        fontFamily: 'GeezaPro-Bold',
                                        fontSize: mail ? 15 : 15,
                                    }}
                                    placeholder="Enter your email"
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={{ fontSize: 15, fontWeight: 800, color: "gray" }}>Password</Text>
                            <View>
                                <TextInput
                                    value={password}
                                    secureTextEntry={true}
                                    onChangeText={setPassword}
                                    placeholderTextColor="#BEBEBE"
                                    style={{
                                        width: 340,
                                        marginTop: 15,
                                        borderBottomColor: '#BEBEBE',
                                        borderBottomWidth: 1,
                                        paddingBottom: 10,
                                        fontFamily: 'GeezaPro-Bold',
                                        fontSize: mail ? 15 : 15,
                                    }}
                                    placeholder="Enter your Password"
                                />
                            </View>
                        </View>

                        <Pressable
                            style={{
                                width: 200,
                                backgroundColor: "#4A55A2",
                                padding: 15,
                                marginTop: 50,
                                marginRight: 'auto',
                                marginLeft: 'auto',
                                borderRadius: 6
                            }}
                            onPress={handleRegister}
                        >
                            <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16, textAlign: "center" }}>Register</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("Register")}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: 'gray',
                                    fontSize: 16,
                                    margin: 12,
                                }}
                            >Don't have an Acount? SignUp</Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
                <View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Register;




