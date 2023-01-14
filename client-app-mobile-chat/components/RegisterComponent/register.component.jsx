import React, { useState, useEffect, useContext } from 'react';
import RegisterTemplate from './register.template.jsx';
import { httpRequest } from '../../services/RequestService';
import RegexService from '../../services/RegexService';
import InputService from '../../services/InputService';

export default function RegisterComponent(props) {
  
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
      RegexService.testNameRegex(state.connexionInputs.prenom) //prenom
      && RegexService.testNameRegex(state.connexionInputs.nom) //nom
      && RegexService.testEmailRegex(state.connexionInputs.email) //email
      && RegexService.testPasswordRegex(state.connexionInputs.password) //password
      && RegexService.testPasswordRegex(state.connexionInputs.confirmPassword) //confirmPassword
      && state.connexionInputs.confirmPassword == state.connexionInputs.password //password == confirmPassword
    );
  }
  
  const finalizeRegister = () => {

    props.navigation.navigate('Login');
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goBack = () => {
    props.navigation.goBack();
  }

  const registerRequest = async () => {
    try {
      if (!verifyRegisterInputs()) {
        //say that inputs are invalids
        return;
      }

      let result = await httpRequest('user/register/', true, null, state.registerInputs);

      if (result) {
        finalizeRegister();

      } else {
        //say that error occured during connexion
      }

    } catch(err) {
      console.error(err);
    }
  }

  const changeBackButtonState = () => {
    setState({
      ...state,
      textBackButton: !state.textBackButton
    })
  }

  const updateInput = (inputName, value) => {
    try {
      const newRegisterInputs = InputService.setInputStates(state.registerInputs, inputName, value);

      setState({
        ...state,
        registerInputs: newRegisterInputs
      });
    } catch(err) {
      //
    }
  }

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <RegisterTemplate 
      BackButtonState={state.textBackButton}
      goBack={goBack}
      changeBackButtonState={changeBackButtonState}
      registerRequest={registerRequest}
      updateInput={updateInput}
      /> 
  );

}