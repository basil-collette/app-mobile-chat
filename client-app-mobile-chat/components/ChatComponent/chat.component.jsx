import React, { useState, useEffect, useContext } from 'react';
import HomeTemplate from "./chat.template.jsx";
import { request } from '../../services/RequestService';
import { SocketContext } from '../../context/socket.context';
import * as StoreService from '../../services/StoreService';
import { ENDPOINT_API } from '@env'

export default function ChatComponent(props) {

  const socket = useContext(SocketContext);

  const [state, setState] = useState({
    messages: [],
    user: {prenom: '', nom: ''}
  });

  useEffect(() => {
    setUser();
  }, []);

  //FUNCTIONS ______________________________________________________________________ FUNCTIONS

  const setUser = async () => {
    setState({
      ...state,
      user: JSON.parse(await StoreService.retrieveData('user'))
    });
  }

  const writeMsg = async (message) => {
    /*
    socket.on('chat', (chatMsg) => {
      addMsg(chatMsg);
    });
    */

    const finalEndPoint = ENDPOINT_API + 'messagesalon/send/';
    const headers = { 'Authorization': 'Bearer ' + await StoreService.retrieveData('jwttoken') };
    const body = {
      "content": "testfromreact",
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
    
  return (<HomeTemplate writeMsg={writeMsg} messages={state.messages} userName={state.user.prenom + '' + state.user.nom} />);
};