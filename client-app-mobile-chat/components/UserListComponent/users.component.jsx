import React, { useState, useEffect, useContext } from 'react';
import { Animated } from 'react-native';
import UserListTemplate from './users.template.jsx';
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { apiHttpRequest } from '@services/RequestService';
import { getGetAllUsersURL } from '@endpoint/ApiEndpoint';
import * as StoreService from '@services/StoreService';
import { SocketContext } from '@context/socket.context';
import { easeOutAnimation } from '@assets/animation';
import ChappyError from '@error/ChappyError';
//CONTEXT
import { ErrorContext } from '@context/error.context';

export default function userListComponent(props) {

  const CONTEXTS = {
    ErrorContext: useContext(ErrorContext)
  }

  const socket = useContext(SocketContext);

  const [state, setState] = useState({
    chatLibelle: props.navigation.state.params.chatLibelle,
    connectedUser: { idUser: '', prenom: '', nom: '' },
    users: [],
    filter: "",
    animation: { userListContainer: new Animated.ValueXY({ x: 0, y: 800 }) },
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
    try {
      const userResult = await JSON.parse(await StoreService.retrieveData('user'));

      setState((currentState) => {
        return {
          ...currentState,
          connectedUser: userResult
        };
      });

      setUserList(userResult.idUser);

      const GET_USERS_CONNEXIONS_INTERVAL = 3000; //units in milliseconds
      let setUserListRemoverInterval = setInterval(() => {
        setUserList(userResult.idUser);
      }, GET_USERS_CONNEXIONS_INTERVAL);

    } catch (err) {
      if (!(err instanceof ChappyError)) err = new ChappyError(err.message, false, "UserListComponent.init()");
      CONTEXTS.ErrorContext.handleError(err, err.isFatal);
    }
  }

  const setUserList = async (idUser) => {
    try {
      const allUsers = await apiHttpRequest(getGetAllUsersURL(), 'GET', null, null);

      setState((currentState) => {
        return {
          ...currentState,
          users: allUsers
        };
      });

    } catch (err) {
      if (!(err instanceof ChappyError)) err = new ChappyError(err.message, false, "UserListComponent.setUserList()");
      CONTEXTS.ErrorContext.handleError(err, err.isFatal);
    }
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goBack = () => {
    props.navigation.goBack();
  }

  const goOption = () => {
    props.navigation.navigate('Option');
  }

  const goProfile = (user) => {
    props.navigation.navigate('UserDetail', { userDetail: user });
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
      goBack={goBack}
      goOption={goOption}
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