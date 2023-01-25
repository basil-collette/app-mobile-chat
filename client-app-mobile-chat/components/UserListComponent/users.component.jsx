import React, { useState, useEffect, useContext } from 'react';
import { Animated } from 'react-native';
import UserListTemplate from './users.template.jsx';
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { apiHttpRequest } from '@services/RequestService';
import * as StoreService from '@services/StoreService';
import { SocketContext } from '@context/socket.context';
import { easeOutAnimation } from '@assets/animation'

export default function userListComponent(props) {

  const socket = useContext(SocketContext);

  const [state, setState] = useState({
    chatLibelle: props.navigation.state.params.chatLibelle,
    connectedUser: { idUser: '', prenom: '', nom: '' },
    users: [],
    filter: "",
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

    const endpoint = `user/auth/${userResult.idUser}/getall`;

    const allUsers = await apiHttpRequest(endpoint, 'GET', null, null);

    setState((currentState) => {
      return {
        ...currentState,
        connectedUser: userResult,
        users: allUsers
      };
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

  const updateSearchInput = (e) => {
    setState((currentState) => {
      return {
        ...currentState,
        filter: e
      };
    });
  }

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <GlobalTemplate
      backButton={goBack}
      >
      <UserListTemplate
        connectedUser={state.connectedUser}
        users={state.users}
        goDiscussion={goDiscussion}
        goProfile={goProfile}
        searchBar={updateSearchInput}
        filter={state.filter}
        userListContainer={{ transform: state.animation.userListContainer.getTranslateTransform() }}
      />

    </GlobalTemplate>
  );
};