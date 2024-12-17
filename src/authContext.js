import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [authUser, setAuthUser] = useState(
        AsyncStorage.getItem('authToken') || null,
      );

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
        <AuthContext.Provider value={{ token, userId, setToken, setUserId ,authUser, setAuthUser}}>{children}</AuthContext.Provider>)
}

export { AuthContext, AuthProvider }

