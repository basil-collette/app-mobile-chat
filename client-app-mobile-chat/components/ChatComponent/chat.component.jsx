import React, { useState, useEffect, useContext, useRef} from 'react';
import ChatTemplate from './chat.template.jsx';
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { apiHttpRequest } from '@services/RequestService';
import * as StoreService from '@services/StoreService';
import { SocketContext } from '@context/socket.context';

export default function RegisterComponent(props) {
  
  const socket = useContext(SocketContext);
  const scrollView = useRef();
  const msgInput = useRef();

  const [messages, setMessages] = useState([]);
  const [state, setState] = useState({
    chatLibelle: props.navigation.state.params.chatLibelle,
    connectedUser: {idUser: '', prenom: '', nom: ''},
    msgInput: '',
    typeChat: props.navigation.state.params.typeChat,
    idDestination: props.navigation.state.params.idDestination
  });

  useEffect(() => {
    init();
    
    socket.on('client_chat', (msg)=> {
      addMsg(msg);
    });

    console.log("ChatComponent loaded");

    return () => {
      socket.removeListener('client_chat');
      console.log('ChatComponent Destruct');
    };
  }, []);

  //FUNCTIONS ________________________________________________________________________________________ FUNCTIONS

  const init = async () => {
    const userResult = await StoreService.retrieveData('user');

    const messagesResult = await apiHttpRequest('messageuser/getdiscussion/' + state.idDestination, null, null);
    
    setMessages(messages => messagesResult);
    setState({
      ...state,
      connectedUser: userResult
    });
  }

  const addMsg = (msg) => {
    setMessages(messages => [...messages, msg]);
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
      content: state.msgInput
    };

    let endPoint;

    if (state.typeChat == 'salon') {

      endPoint = 'messagesalon/send/';
      body.idSalon = state.idDestination;

    } else if (state.typeChat == 'user') {

      endPoint = 'messageuser/send/';
      body.idUserReceiver = state.idDestination;

    } else {
      // error, say that typechat isnt correct
      return;
    }

    try {
      const response = await apiHttpRequest(endPoint, null, body);

      msgInput.clear();
      setState({
        ...state,
        msgInput: ''
      });
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
      userName={state.connectedUser.prenom + ' ' + state.connectedUser.nom}
      goProfile={goProfile}
      title={state.chatLibelle}
      >

      <ChatTemplate
        connectedUser={state.connectedUser}
        messages={messages}
        goBack={goBack}
        sendMessage={sendMessage}
        updateMsgInput={updateMsgInput}
        scrollView={scrollView}
        msgInput={msgInput}
        /> 
      
    </GlobalTemplate>
  );
}