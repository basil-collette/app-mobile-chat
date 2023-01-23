import React, { useState, useEffect, useContext } from 'react';
import UserListTemplate from './users.template.jsx';
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { apiHttpRequest } from '@services/RequestService';
import { SocketContext } from '@context/socket.context';
import * as StoreService from '@services/StoreService';
import { Animated } from 'react-native';
import { easeOutAnimation } from '@assets/animation'

export default function userListComponent(props) {

  const socket = useContext(SocketContext);

  const [state, setState] = useState({
    chatLibelle: props.navigation.state.params.chatLibelle,
    connectedUser: { idUser: '', prenom: '', nom: '' },
    users: [],
    animation: { userListContainer: new Animated.ValueXY({ x: 0, y: 800 }) }
  });

  useEffect(() => {
    init();
    easeOutAnimation(state.animation.userListContainer, 500, 200, { x: 0, y: 0 });
    console.log("UserListComponent loaded");

    return () => {
      console.log('UserListComponent Destruct');
    };
  }, []);

  //FUNCTIONS ________________________________________________________________________________________ FUNCTIONS

  const init = async () => {
    const userResult = await JSON.parse(await StoreService.retrieveData('user'));
    
    const endpoint = 'user/auth/' + userResult.idUser + '/getall';
    
    const allUsers = await apiHttpRequest(endpoint, 'GET', null, null);

    setState({
      ...state,
      connectedUser: userResult,
      users: allUsers
    });
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goBack = () => {
    props.navigation.goBack();
  }

  const goProfile = (idUser) => {
    props.navigation.navigate('Option', { idUser: idUser });
  }

  const goDiscussion = (user) => {
    const goDiscussionParams = {
      typeChat: 'user',
      idDestination: user.idUser,
      chatLibelle: user.prenom + ' ' + user.nom
    };

    props.navigation.navigate('Chat', { ...goDiscussionParams });
  }

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <GlobalTemplate
      userName={state.connectedUser.prenom + ' ' + state.connectedUser.nom}
      goProfile={goProfile}
    >

      <UserListTemplate
        connectedUser={state.connectedUser}
        users={state.users}
        goBack={goBack}
        goDiscussion={goDiscussion}
        goProfile={goProfile}
        userListContainer={{ transform: state.animation.userListContainer.getTranslateTransform() }}
      />

    </GlobalTemplate>
  );
};