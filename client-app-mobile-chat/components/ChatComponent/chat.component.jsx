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
  const [state, setState] = useState({
    chatLibelle: props.navigation.state.params.chatLibelle,
    typeChat: props.navigation.state.params.typeChat,
    idDestination: props.navigation.state.params.idDestination,
    connectedUser: { idUser: '', prenom: '', nom: '' },
    msgInput: '',
    messages: []
  });

  //FUNCTIONS ________________________________________________________________________________________ FUNCTIONS

  const addMsg = (msg) => {
    setState((currentState) => {
      return {
        ...currentState,
        messages: [...currentState.messages, msg],
      };
    });
  }
  
  const init = async () => {
    socket.on('new_chatmsg_to_client', (msg) => {
      addMsg(msg);
    });
  
    const userResult = await JSON.parse(await StoreService.retrieveData('user'));

    const endpoint = (state.typeChat == 'user' ? 'messageuser/getdiscussion/' : 'messagesalon/getall/') + state.idDestination;
    
    const messagesResult = await apiHttpRequest(endpoint, 'GET', null, null);
    
    setState((currentState) => {
      return {
        ...currentState,
        messages: messagesResult,
        connectedUser: userResult
      };
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
      setState((currentState) => {
        return {
          ...currentState,
          msgInput: ''
        };
      });
    } catch(err) {
      console.error(err);
    }
  }

  const updateMsgInput = (value) => {
    setState((currentState) => {
      return {
        ...currentState,
        msgInput: value
      };
    });
  }

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  useEffect(() => {
    console.log("ChatComponent loaded");

    return () => {
      socket.off('new_chatmsg_to_client');
      console.log('ChatComponent Destruct');
    };
  }, []);

  init();

  return (
    <GlobalTemplate
      title={state.chatLibelle}
      backButton={goBack}
      SVGProfil = { state.typeChat =="user" ? () => <SvgProfil height={25} width = {25} fill="green"></SvgProfil> :null}
      >

      <ChatTemplate
        connectedUser={state.connectedUser}
        messages={state.messages}
        goBack={goBack}
        sendMessage={sendMessage}
        updateMsgInput={updateMsgInput}
        scrollView={scrollView}
        msgInput={msgInput}
        /> 
      
    </GlobalTemplate>
  );
}