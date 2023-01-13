import React, { useState, useEffect, useContext } from 'react';
import AuthTemplate from './auth.template.jsx';
import { SocketContext } from '../../context/socket.context';
import { request } from '../../services/RequestService';
import * as StoreService from '../../services/StoreService';

export default function AuthComponent(props) {

  const socket = useContext(SocketContext);
  
  const [state, setState] = useState({
    rememberStatusCheck: false,
    connexionInputs: {email: '', password: ''}
  });

  useEffect(() => {
    //check if remember login credentials

    console.log("AuthComponent loaded");

    return () => {
      console.log('AuthComponent Destruct');
    };
  }, []);

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const updateInputEmail = (inputEmailValue) => {
    setState({
      ...state,
      connexionInputs: {...state.connexionInputs, email: inputEmailValue}
    });
  }

  const updateInputPassword = (inputPasswordValue) => {
    setState({
      ...state,
      connexionInputs: {...state.connexionInputs, password: inputPasswordValue}
    });
  }

  const loginRequest = async () => {
    try {
      if (!verifyLoginInputs()) {
        //say that inputs are invalids
        return;
      }

      let resultToken = await request('user/login/', true, null, state.connexionInputs);

      if (resultToken) {
        await StoreService.storeData('user', resultToken.user);
        await StoreService.storeData('jwttoken', resultToken.token);
        
        socket.emit('associate_userid_to_socket', resultToken.user.idUser);

        finalizeLogin();

      } else {
        //say that error occured during connexion
      }

    } catch(err) {
      console.error(err);
    }
  }

  const goToRegister = () => {
    props.navigation.navigate('Signin');
  }

  //FUNCTIONS ________________________________________________________________________________________ FUNCTIONS

  const verifyLoginInputs = () => {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(state.connexionInputs.email)) {
      return false;
    }

    /*
    if (/.{6,}/g.test(state.connexionInputs.password)) {
      return false;
    }
    */

    return true;
  }
  
  const finalizeLogin = () => {

    //check if remember login credentials

    props.navigation.navigate('Home');
  }

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <AuthTemplate
      rememberStatus={state.rememberStatusCheck}
      setRememberStatusCheck={() => {setState({...state, rememberStatusCheck: !state.rememberStatusCheck})}}
      inputEmailEvent={updateInputEmail}
      inputPasswordEvent={updateInputPassword}
      registerBtnClick={goToRegister}
      loginBtnClick={loginRequest}
    /> 
  );

}