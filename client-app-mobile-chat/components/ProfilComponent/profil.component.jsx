import React, { useState, useEffect } from 'react';
import ProfilTemplate from "./profil.template.jsx";
import StoreService from '@services/StoreService';
import { apiHttpRequest } from '@services/RequestService';
import InputService from '@services/InputService';
import RegexService from '@services/RegexService';
import {Animated} from 'react-native'
import { easeOutAnimation } from '@assets/animation'
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";

export default function ProfilComponent(props) {

  const [state, setState] = useState({
    connectedUser: { idUser: '', prenom: '', nom: '', email: '', password: '' },
    userInputs: { idUser: '', prenom: '', nom: '', email: '', password: '', confirmPassword: '' },
    animation: { profilContainer: new Animated.ValueXY({ x: 0, y: 800 }) }
  });

  useEffect(() => {
    init();
    easeOutAnimation(state.animation.profilContainer, 500, 200, { x: 0, y: 0 });
    console.log("HomeComponent loaded");
    
    return () => {
      console.log('HomeComponent Destruct');
    };
  }, []);

  const init = async () => {
    let userDetails = await StoreService.retrieveData('user');
  
    setState({
      ...state,
      connectedUser: userDetails,
      userInputs: { ...userDetails, confirmPassword: '' }
    });
  }

  const verifyUserInputs = () => {
    let infoAreOk = (
      RegexService.testNameRegex(state.userInputs.prenom)
      && RegexService.testNameRegex(state.userInputs.nom)
      && RegexService.testEmailRegex(state.userInputs.email)
    );

    if (state.userInputs.password !== '') {
      infoAreOk = (
        infoAreOk
        && RegexService.testPasswordRegex(state.userInputs.password)
        && state.userInputs.confirmPassword == state.userInputs.password
      );
    }

    return infoAreOk;
  }

  const updateUserDetails = async () => {
    try {
      if (!verifyUserInputs()) {
        //say that inputs are invalids
        return;
      }

      let userDetails = { ...state.userInputs };
      delete userDetails['confirmPassword'];

      if (userDetails.password == '') {
        delete userDetails['password'];
      }
      
      const request = await apiHttpRequest(`user/auth/${userDetails.idUser}/update/`, 'POST', null, userDetails);
      await StoreService.storeData('user', request);

    } catch (err) {
      console.error(err);
    }
  }

  const updateInput = (inputName, value) => {
    try {
      const newUserInputs = InputService.setInputStates(state.userInputs, inputName, value);
      setState({
        ...state,
        userInputs: newUserInputs
      });
    } catch (err) {
      console.error(err)
    }
  }
  const goBack = () => {
    props.navigation.goBack();
  }

  return (
    <GlobalTemplate
      backButton={goBack}
    >
    <ProfilTemplate
      updateInput={updateInput}
      updateUserDetails={updateUserDetails}
      connectedUser={state.connectedUser}
      userDetails={state.userInputs}
      profilAnimation = {{ transform: state.animation.profilContainer.getTranslateTransform() }}
    />
    </GlobalTemplate>
  );
};