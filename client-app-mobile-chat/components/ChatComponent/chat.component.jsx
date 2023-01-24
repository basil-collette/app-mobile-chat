/*
import React, { useContext, useRef } from 'react';
import ChatTemplate from './chat.template.jsx';
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { apiHttpRequest } from '@services/RequestService';
import * as StoreService from '@services/StoreService';
import { SocketContext } from '@context/socket.context';
 
export default class ChatComponent extends React.Component {

  static contextType = SocketContext;

  constructor(props) {
    super(props);

    this.state = {
      chatLibelle: props.navigation.state.params.chatLibelle,
      typeChat: props.navigation.state.params.typeChat,
      idDestination: props.navigation.state.params.idDestination,
      connectedUser: { idUser: '', prenom: '', nom: '' },
      msgInput: '',
      messages: []
    };

    this.scrollView = React.createRef();
    this.msgInput = React.createRef();

    this.init();
  }

  componentDidMount() {
    console.log('ChatComponent loaded');
  }

  componentWillUnmount() {
    console.log('ChatComponent destructed');
    this.context.off('new_chatmsg_to_client');
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    //return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
    //logComponentStackToMyService(info.componentStack);
  }

  //METHODS ________________________________________________________________________________________ METHODS

  async init() {
    this.context.on('new_chatmsg_to_client', (msg) => {
      addMsg(msg);
    });
  
    const userResult = await JSON.parse(await StoreService.retrieveData('user'));

    const endpoint = (this.state.typeChat == 'user' ? 'messageuser/getdiscussion/' : 'messagesalon/getall/') + this.state.idDestination;
    
    const messagesResult = await apiHttpRequest(endpoint, 'GET', null, null);
    
    this.setState((currentState) => {
      return {
        ...currentState,
        messages: messagesResult,
        connectedUser: userResult
      };
    });
  }

  addMsg(msg) {
    this.setState((currentState) => {
      return {
        ...currentState,
        messages: [...currentState.messages, msg],
      };
    });
  }

  goProfile() {
    props.navigation.navigate('Option', {});
  }
  
  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  goBack() {
    props.navigation.goBack();
  }

  async sendMessage() {
    const body = {
      content: this.state.msgInput
    };

    let endPoint;

    if (this.state.typeChat == 'salon') {

      endPoint = 'messagesalon/send/';
      body.idSalon = this.state.idDestination;

    } else if (this.state.typeChat == 'user') {

      endPoint = 'messageuser/send/';
      body.idUserReceiver = this.state.idDestination;

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

  updateMsgInput(value) {
    this.setState((currentState) => {
      return {
        ...currentState,
        msgInput: value
      };
    });
  }

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN
  
  render() {
    return (
      <GlobalTemplate
        userName={this.state.connectedUser.prenom + ' ' + this.state.connectedUser.nom}
        title={this.state.chatLibelle}
        >

        <ChatTemplate
          connectedUser={this.state.connectedUser}
          messages={this.state.messages}
          goBack={this.goBack}
          sendMessage={this.sendMessage}
          updateMsgInput={this.updateMsgInput}
          scrollView={this.scrollView}
          msgInput={this.msgInput}
          /> 
        
      </GlobalTemplate>
    );
  }
}
*/
import React, { useState, useEffect, useContext, useRef } from 'react';
import ChatTemplate from './chat.template.jsx';
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { apiHttpRequest } from '@services/RequestService';
import * as StoreService from '@services/StoreService';
import { SocketContext } from '@context/socket.context';

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
      userName={state.connectedUser.prenom + ' ' + state.connectedUser.nom}
      title={state.chatLibelle}
      goProfile={goProfile}
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