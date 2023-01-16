import React, { useState, useEffect, useContext } from 'react';
import AuthTemplate from './auth.template.jsx';
import { SocketContext } from '@context/socket.context';
import { httpRequest } from '@services/RequestService';
import StoreService from '@services/StoreService';
import InputService from '@services/InputService';
import RegexService from '@services/RegexService';

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

  //FUNCTIONS ________________________________________________________________________________________ FUNCTIONS

  const verifyLoginInputs = () => {
    return (
      RegexService.testNameRegex(state.connexionInputs.email)
      && RegexService.testNameRegex(state.connexionInputs.password)
    );
  }
  
  const finalizeLogin = () => {
    //check if remember login credentials

    props.navigation.navigate('Home');
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const updateInput = (inputName, value) => {
    try {
      const newConnexionInputs = InputService.setInputStates(state.connexionInputs, inputName, value);

      setState({
        ...state,
        connexionInputs: newConnexionInputs
      });
    } catch(err) {
      //
    }
  }

  const loginRequest = async () => {
    try {
      if (!verifyLoginInputs()) {
        //say that inputs are invalids
        return;
      }

      let resultToken = await httpRequest('user/login/', true, null, state.connexionInputs);

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

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <AuthTemplate
      rememberStatus={state.rememberStatusCheck}
      setRememberStatusCheck={() => {setState({...state, rememberStatusCheck: !state.rememberStatusCheck})}}
      registerBtnClick={goToRegister}
      loginBtnClick={loginRequest}
      updateInput={updateInput}
    /> 
  );

}