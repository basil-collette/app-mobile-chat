import React, { useState, useEffect, useContext } from 'react';
import { StackActions } from '@react-navigation/native';
import RegisterTemplate from './register.template.jsx';
import { apiHttpRequest } from '@services/RequestService';
import RegexService from '@services/RegexService';
import InputService from '@services/InputService';
import ChappyError from '@error/ChappyError';
import { getRegisterURL } from '@endpoint/ApiEndpoint';
//CONTEXT
import { SocketContext } from '@context/socket.context';
import { ToastContext, ChappyToast, ToastTypeEnum } from 'rn-toaster-stack';
import { ErrorContext } from '@context/error.context';

export default function RegisterComponent(props) {
  
  const CONTEXTS = {
    socket: useContext(SocketContext),
    ErrorContext: useContext(ErrorContext),
    addToast: useContext(ToastContext)
  }

  const [state, setState] = useState({
    textBackButton: false,
    registerInputs: {prenom: '', nom: '', email: '', password: '', confirmPassword: ''}
  });

  useEffect(() => {
    console.log("RegisterComponent loaded");

    return () => {
      console.log('RegisterComponent Destruct');
    };
  }, []);

  //FUNCTIONS ________________________________________________________________________________________ FUNCTIONS

  const verifyRegisterInputs = () => {
    return (
      RegexService.testNameRegex(state. registerInputs.prenom) //prenom
      && RegexService.testNameRegex(state. registerInputs.nom) //nom
      && RegexService.testEmailRegex(state. registerInputs.email) //email
      && RegexService.testPasswordRegex(state. registerInputs.password) //password
      && state. registerInputs.confirmPassword == state. registerInputs.password //password == confirmPassword
    );
  }
  
  const finalizeRegister = () => {
    CONTEXTS.addToast(new ChappyToast(ToastTypeEnum.success, 'user created !'));

    const REDIRECT_DELAY = 2000; //time in milliseconds
    setTimeout(() => {
      props.navigation.replace('Login');
    }, REDIRECT_DELAY);
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goBack = () => {
    props.navigation.goBack();
  }

  const registerRequest = async () => {
    try {
      if (!verifyRegisterInputs()) {
        throw new ChappyError('register inputs aren\'t in a valid format', false, "RegisterComponent.registerRequest");
      }

      const result = await apiHttpRequest(getRegisterURL(), 'POST', null, state.registerInputs, true);
      finalizeRegister();

    } catch(err) {
      if (!(err instanceof ChappyError)) err = new ChappyError(err.message, false, "RegisterComponent.registerRequest");
      CONTEXTS.ErrorContext.handleError(err, err.isFatal);
    }
  }

  const toggleBackButtonState = () => {
    setState((currentState) => {
      return ({
        ...currentState,
        textBackButton: !state.textBackButton
      });
    });
  }

  const updateInput = (inputName, value) => {
    const newRegisterInputs = InputService.setInputStates(state.registerInputs, inputName, value);

    setState((currentState) => {
      return ({
        ...currentState,
        registerInputs: newRegisterInputs
      });
    });
  }

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <RegisterTemplate 
      BackButtonState={state.textBackButton}
      goBack={goBack}
      toggleBackButtonState={toggleBackButtonState}
      registerRequest={registerRequest}
      updateInput={updateInput}
      /> 
  );
}