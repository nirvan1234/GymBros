import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'
import { View, Text, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import { AuthContext } from '../authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("")

    const navigation = useNavigation();
    const {setToken, token} = useContext(AuthContext);

    useEffect(() =>{
        if(token){
            navigation.replace('Main', {screen: 'Main'})
        }

    },[token , navigation])


    // const handleLogin = () => {
    //     const user = {
    //         email: mail,
    //         password: password
    //     }

    //     axios.post("http://localhost:4000/login", user).then(response => {
    //         const token = response.data.token;
    //         AsyncStorage.setItem("authToken",token)
    //         setToken(token);

    //     }).catch();

    // }
    const handleLogin = () => {
        const user = {
          email: mail,
          password: password,
        };
        console.log(user);
    
        axios.post('http://localhost:4000/login', user).then(response => {
          const token = response.data.token;
          console.log("token",token)
          AsyncStorage.setItem('authToken', token);
          setToken(token);
        });
      };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ padding: 10, alignItems: "center" }}>
                <KeyboardAvoidingView>
                    <View style={{ padding: 80, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 15, fontWeight: 500 }}>Login to your Account</Text>

                        <View style={{ marginTop: 50 }}>
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
                        <View style={{ marginTop: 50 }}>
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
                            onPress={handleLogin}
                            style={{
                                width: 200,
                                backgroundColor: "#4A55A2",
                                padding: 15,
                                marginTop: 50,
                                marginRight: 'auto',
                                marginLeft: 'auto',
                                borderRadius: 6
                            }}
                        >
                            <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16, textAlign: "center" }}>Login</Text>
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

export default Login;
