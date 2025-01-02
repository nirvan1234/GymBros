import {createContext, useContext, useEffect, useState} from 'react';
import io from 'socket.io-client';
import { AuthContext } from "./authContext";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const {authUser, userId} = useContext(AuthContext);

  console.log('auth', authUser)
  console.log('BABE', authUser);
  useEffect(() => {
    if (authUser) {
      const socket = io('http://10.0.2.2:6000', {
        query: {
          userId: userId,
        },
      });

      setSocket(socket);

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{socket, setSocket}}>
      {children}
    </SocketContext.Provider>
  );
};
// import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { AuthContext } from "./authContext";


// const SocketContext = createContext();

// const useSocketContext = () =>{

//     return useContext(SocketContext);

// }


// export const SocketContextProvider = ({chidren}) =>{
//     const [socket , setSocket] = useState([]);
//     const {userId,authUser} = useContext(AuthContext);

//     useEffect(() =>{
//         if(authUser){
//          const socket = io("http://10.0.2.2:6000",{
//             query:{
//                 userId: userId
//             }
//          })

//          setSocket(socket);
//          return () => socket.close();
//         }else{
//           if(socket){
//             socket.close();
//             setSocket(null);
//           }
//         }

//     },[])

//     return (
//         <SocketContext.Provider value={{socket , setSocket}}>
//           {chidren}
//         </SocketContext.Provider>
//     )

// }