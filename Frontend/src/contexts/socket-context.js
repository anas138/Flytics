import React, { createContext, useEffect, useState } from "react";
import socketio from "socket.io-client";
import configData from "./../config.json";

const SOCKET_URL = configData.url.baseURL;

export const SocketContext = createContext();
export function SocketProvider(props) {
  const [user, setUser] = useState({});
  const [socket, setSocket] = useState(null);
  const setUserObject = (object) => {
    setUser(object);
  };
  useEffect(() => {
    if (!socket && Object.keys(user).length) {
      const socketConnect = socketio.connect(SOCKET_URL, {
        query: { userId: user.id },
      });
      setSocket(socketConnect);
    }
  }, [socket, user]);
  // const connectSocket = () => {
  //   if (!socket && Object.keys(user).length) {
  //     const socketConnect = socketio.connect(SOCKET_URL, {
  //       query: { userId: user.id },
  //     });
  //     setSocket(socketConnect);
  //   }
  // };
  return (
    <SocketContext.Provider value={{ user, setUserObject, socket }}>
      {props.children}
    </SocketContext.Provider>
  );
}
