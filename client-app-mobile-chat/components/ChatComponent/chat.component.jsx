import React, { useState, useEffect, useContext, useRef } from 'react';
import ChatTemplate from './chat.template.jsx';
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { apiHttpRequest } from '@services/RequestService';
import { getGetMessageUserURL, getGetMessageSalonURL, getGetUserURL, getSendMessageSalonURL, getSendMessageUserURL } from '@endpoint/ApiEndpoint';
import * as StoreService from '@services/StoreService';
import { SocketContext } from '@context/socket.context';
import { SvgProfil} from '@assets/svg'

export default function ChatComponent(props) {
  
  const socket = useContext(SocketContext);
  const refScrollView = useRef();
  const refMsgInput = useRef();
  const refSendBtn = useRef();
  const [state, setState] = useState({
    chatLibelle: props.navigation.state.params.chatLibelle,
    typeChat: props.navigation.state.params.typeChat,
    idDestination: props.navigation.state.params.idDestination,
    connectedUser: { idUser: '', prenom: '', nom: '' },
    msgInput: '',
    messages: [],
    interlocutorIsConnected: false
  });

  useEffect(() => {
    init();

    console.log("ChatComponent loaded");

    return () => {
      socket.off('new_chatmsg_to_client');

      if (state.typeChat == 'salon') {
        socket.emit('leave_room', state.idDestination);
      }

      console.log('ChatComponent Destruct');
    };
  }, []);

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

    if (state.typeChat == 'salon') {

      socket.emit('join_room', state.idDestination);

    } else if (state.typeChat == 'user') {
      setInterlocutorState();
    
      let setInterlocuteurStateRemoverInterval = setInterval(() => {
        setInterlocutorState();
      }, 3000);
    }
  
    const userResult = await JSON.parse(await StoreService.retrieveData('user'));

    const endpoint = (state.typeChat == 'user') ? getGetMessageUserURL(state.idDestination) : getGetMessageSalonURL(state.idDestination);
    
    const messagesResult = await apiHttpRequest(endpoint, 'GET', null, null);
    
    setState((currentState) => {
      return {
        ...currentState,
        messages: messagesResult,
        connectedUser: userResult
      };
    });
  }

  const setInterlocutorState = async () => {
    const interlocutor = await apiHttpRequest(getGetUserURL(state.idDestination), 'GET', null, null);
    
    setState((currentState) => {
      return ({
        ...currentState,
        interlocutorIsConnected: interlocutor.isConnected
      });
    });
  }
  
  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goOption = () => {
    props.navigation.navigate('Option', {});
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  const sendMessage = async () => {
    if (state.msgInput.trim() == "") {
      return;
    }

    const body = {
      content: state.msgInput
    };

    let endPoint;
    if (state.typeChat == 'salon') {
      endPoint = getSendMessageSalonURL();
      body.idSalon = state.idDestination;
    } else if (state.typeChat == 'user') {
      endPoint = getSendMessageUserURL();
      body.idUserReceiver = state.idDestination;
    } else {
      // error, say that typechat isnt correct
      return;
    }

    try {
      const response = await apiHttpRequest(endPoint, 'POST', null, body);

      refMsgInput.current.clear();

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

  return (
    <GlobalTemplate
      title={state.chatLibelle}
      SVGProfil={state.typeChat =="user" ? () => <SvgProfil height={25} width = {25} fill={state.interlocutorIsConnected == true ? "#43C851" : "#CC5656"}></SvgProfil> :null}
      goBack={goBack}
      goOption={goOption}
      >

      <ChatTemplate
        connectedUser={state.connectedUser}
        messages={state.messages}
        sendMessage={sendMessage}
        updateMsgInput={updateMsgInput}
        scrollView={refScrollView}
        msgInput={refMsgInput}
        refSendBtn={refSendBtn}
        /> 
      
    </GlobalTemplate>
  );
}