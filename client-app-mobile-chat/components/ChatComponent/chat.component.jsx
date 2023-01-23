import React, { useState, useEffect, useContext, useRef } from 'react';
import ChatTemplate from './chat.template.jsx';
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { apiHttpRequest } from '@services/RequestService';
import * as StoreService from '@services/StoreService';
import { SocketContext } from '@context/socket.context';
import { SvgProfil} from '../../assets/svg'
export default function ChatComponent(props) {
  
  const socket = useContext(SocketContext);
  const scrollView = useRef();
  const msgInput = useRef();

  const [messages, setMessages] = useState([]); //messages in a separate state to avoid async crossing setStates errors
  const [state, setState] = useState({
    chatLibelle: props.navigation.state.params.chatLibelle,
    connectedUser: { idUser: '', prenom: '', nom: '' },
    msgInput: '',
    typeChat: props.navigation.state.params.typeChat,
    idDestination: props.navigation.state.params.idDestination
  });

  useEffect(() => {
    init();

    console.log("ChatComponent loaded");

    return () => {
      socket.off('new_chatmsg_to_client');
      console.log('ChatComponent Destruct');
    };
  }, []);

  //FUNCTIONS ________________________________________________________________________________________ FUNCTIONS

  const init = async () => {
    socket.on('new_chatmsg_to_client', addMsg);
    
    const userResult = await StoreService.retrieveData('user');

    const messagesResult = await apiHttpRequest('messageuser/getdiscussion/' + state.idDestination, 'GET', null, null);
    
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
      const response = await apiHttpRequest(endPoint, 'POST', null, body);

      msgInput.current.clear();
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
      backButton={goBack}
      nameProfil = {state.chatLibelle}
      SVGProfil = { state.typeChat =="user" ? () => <SvgProfil height={25} width = {25} fill="green"></SvgProfil> :null}
      title ={state.chatLibelle}
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