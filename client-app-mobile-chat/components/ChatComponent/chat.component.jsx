import React, { useState, useEffect, useContext, useRef} from 'react';
import ChatTemplate from './chat.template.jsx';
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { apiHttpRequest } from '@services/RequestService';
import * as StoreService from '@services/StoreService';
import { SocketContext } from '@context/socket.context';

export default function ChatComponent(props) {
  
  const socket = useContext(SocketContext);
  const scrollView = useRef();

  const [state, setState] = useState({
    chatLibelle: props.navigation.state.params.chatLibelle,
    user: {prenom: '', nom: ''},
    msgInput: '',
    messages: [],
    typeChat: props.navigation.state.params.typeChat,
    idDestination: props.navigation.state.params.idDestination
  });

  let orientationChangeListener;
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
      user: await StoreService.retrieveData('user')
    });
  }

  const addMsg = (msg) => {
    setState({
      ...state,
      message: [...state.message, msg]
    });
  }

  const goProfile = () => {
    props.navigation.navigate('Option', {});
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
      const response = await apiHttpRequest(endPoint,'POST',headers, body);

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
    <GlobalTemplate
      userName={state.user.prenom + ' ' + state.user.nom}
      goProfile={goProfile}
      title={state.chatLibelle}
      >

      <ChatTemplate
        messages={state.messages}
        goBack={goBack}
        sendMessage={sendMessage}
        updateMsgInput={updateMsgInput}
        scrollView={scrollView}
        /> 
      
    </GlobalTemplate>
  );
}