import React, { useState, useEffect, useContext } from 'react';
import HomeTemplate from "./home.template.jsx";
import { SocketContext } from '@context/socket.context';
import * as StoreService from '@services/StoreService';

export default function HomeComponent(props) {

  const socket = useContext(SocketContext);

  const [state, setState] = useState({
    user: {prenom: '', nom: ''}
  });

  useEffect(() => {
    setUser();

    console.log("HomeComponent loaded");

    return () => {
      console.log('HomeComponent Destruct');
    };
  }, []);

  //FUNCTIONS ______________________________________________________________________ FUNCTIONS

  const setUser = async () => {
    setState({
      ...state,
      user: JSON.parse(await StoreService.retrieveData('user'))
    });
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goProfile = () => {
    props.navigation.navigate('Option', {});
  }

  const goRoom = (idRoom) => {
    const goRoomParams = {
      typeChat: 'salon',
      idDestination: idRoom,
      chatLibelle: 'Chat Général'
    };
    
    props.navigation.navigate('Chat', goRoomParams);
  }

  const goUserList = () => {
    props.navigation.navigate('UserList', {});
  }

  return (
    <HomeTemplate
      userName={state.user.prenom + ' ' + state.user.nom}
      goProfile={goProfile}
      goRoom={goRoom}
      goUserList={goUserList}
    />
    );
};