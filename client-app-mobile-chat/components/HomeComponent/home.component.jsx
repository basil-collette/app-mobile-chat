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

  return (
    <HomeTemplate
      userName={state.user.prenom + '' + state.user.nom}
    />
    );
};