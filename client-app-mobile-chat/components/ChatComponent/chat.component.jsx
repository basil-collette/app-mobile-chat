import React, { useState, useEffect, useContext } from 'react';
import ChatTemplate from './chat.template.jsx';
import { httpRequest } from '@services/RequestService';
import * as StoreService from '@services/StoreService';
import { SocketContext } from '@context/socket.context';

export default function RegisterComponent(props) {
  
  const socket = useContext(SocketContext);

  const [state, setState] = useState({
    chatLibelle: props.chatLibelle,
    user: {prenom: '', nom: ''},
    msgInput: '',
    messages: [],
    typeChat: props.typeChat,
    idDestination: props.idDestination
  });

  useEffect(() => {
    setUser();

    socket.on('client-chat', (chatMsg) => {
      addMsg(chatMsg);
    });

    console.log("ChatComponent loaded");

    return () => {
      console.log('ChatComponent Destruct');
    };
  }, []);

  //FUNCTIONS ________________________________________________________________________________________ FUNCTIONS

  const setUser = async () => {
    setState({
      ...state,
      user: JSON.parse(await StoreService.retrieveData('user'))
    });
  }

  const addMsg = (msg) => {
    setState({
      ...state,
      message: [...state.message, msg]
    });
  }
  
  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goBack = () => {
    props.navigation.goBack();
  }

  const sendMessage = async () => {
    const body = {
      "content": state.msgInput
    };

    let endPoint;

    if (typeChat == 'salon') {

      endPoint = 'messagesalon';
      body['idSalon'] = state.idDestination;

    } else if (typeChat == 'user') {

      endPoint = 'messageuser';
      body['idUserReceiver'] = state.idDestination;

    } else {
      // error, say that typechat isnt correct
      return;
    }

    try {
      await httpRequest(endPoint, true, headers, body);
    } catch(err) {
      console.error(err);
    }
  }

  const updateMsgInput = (value) => {
    setState({
      ...state,
      msgInput: value
    });
  }

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <ChatTemplate
      messages={state.messages}
      goBack={goBack}
      sendMessage={sendMessage}
      updateMsgInput={updateMsgInput}
      /> 
  );
}