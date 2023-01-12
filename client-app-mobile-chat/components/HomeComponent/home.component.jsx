import React, { useState, useEffect } from 'react';
import HomeTemplate from "./home.template.jsx";
import socketio from 'socket.io-client';
import { request } from '../../services/RequestService';
require('dotenv').config();

export default function HomeComponent(props) {

  const [state, setState] = useState({
    messages: []
  });

  useEffect(() => {
    //Connect to socket.io server
    const socket = socketio(process.env.ENDPOINT_API);

    //Listen for messages from the server
    socket.on('chat', (chatMsg) => {
      addMsg(chatMsg);
    });

    setState({
      ...state,
      socket: socket
    });

    console.log("HomeComponent loaded");

    //Cleanup function to disconnect from socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  /*
  useEffect(() => {
    console.log('socket state : ' + state.socket);
  }, [state.socket]);
  */

  //FUNCTIONS ______________________________________________________________________ FUNCTIONS

  const writeMsg = (message) => {
    //state.socket.emit('chat', message);

    const finalEndPoint = process.env.ENDPOINT_API + 'messagesalon/send/';
    const headers = { 'Authorization': 'Bearer hrkjherjhejf' };
    const body = {
      "content": "test",
      "idSalon": 1
    };

    try {
      request(finalEndPoint, true, null, headers, body);
    } catch(err) {
      console.error(err);
    }
  }

  const addMsg = (chatMsg) => {
    setState({
      ...state,
      messages: [...state.messages, chatMsg]
    });
  }
    
  return (<HomeTemplate writeMsg={writeMsg} messages={state.messages} />);
};