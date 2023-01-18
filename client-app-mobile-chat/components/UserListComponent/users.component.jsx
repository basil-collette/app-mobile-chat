import React, { useState, useEffect, useContext } from 'react';
import UserListTemplate from './users.template.jsx';
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { apiHttpRequest } from '@services/RequestService';
import { SocketContext } from '@context/socket.context';
import * as StoreService from '@services/StoreService';

export default function HomeComponent(props) {

  const socket = useContext(SocketContext);

  const [state, setState] = useState({
    chatLibelle: props.navigation.state.params.chatLibelle,
    connectedUser: {prenom: '', nom: ''},
    users: [],
  });

  useEffect(() => {
    init();

    console.log("UserListComponent loaded");

    return () => {
      console.log('UserListComponent Destruct');
    };
  }, []);

  //FUNCTIONS ________________________________________________________________________________________ FUNCTIONS

  const init = async () => {
    const user = await StoreService.retrieveData('user');
    
    const endpoint = 'user/auth/' + user.idUser + '/getall';
    
    const allUsers = await apiHttpRequest(endpoint, null, null);
    
    setState({
      ...state,
      connectedUser: user,
      users: allUsers
    });
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goBack = () => {
    props.navigation.goBack();
  }

  const goProfile = () => {
    props.navigation.navigate('Option', {});
  }
    
  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <GlobalTemplate
      userName={state.connectedUser.prenom + ' ' + state.connectedUser.nom}
      goProfile={goProfile}
      >

      <UserListTemplate
        users={state.users}
        goBack={goBack}
        /> 
      
    </GlobalTemplate>
  );
};