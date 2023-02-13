import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native'
import ProfilTemplate from "./profil.template.jsx";
import StoreService from '@services/StoreService';
import { apiHttpRequest } from '@services/RequestService';
import { getGetUserURL, getUpdateUserURL } from '@endpoint/ApiEndpoint';
import InputService from '@services/InputService';
import RegexService from '@services/RegexService';
import { easeOutAnimation } from '@assets/animation'
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";

export default function ProfilComponent(props) {

  const [state, setState] = useState({
    userDetail: props.navigation.state.params.userDetail,
    userInputs: { idUser: '', prenom: '', nom: '', email: '', password: '', confirmPassword: '' },
    animation: { profilContainer: new Animated.ValueXY({ x: 0, y: 800 }) }
  });

  useEffect(() => {
    init();
    
    console.log("HomeComponent loaded");
    return () => {
      console.log('HomeComponent Destruct');
    };
  }, []);

  //FUNCTIONS ______________________________________________________________________ FUNCTIONS

  const init = async () => {
    easeOutAnimation(state.animation.profilContainer, 500, 200, { x: 0, y: 0 });
    
    const connectedUser = await JSON.parse(await StoreService.retrieveData('user'));

    let finalUserDetails = (connectedUser.idUser == state.userDetail.idUser) ? connectedUser : await apiHttpRequest(getGetUserURL(state.userDetail.idUser), 'GET', null, null);
  
    setState((currentState) => {
      return ({
        ...currentState,
        userDetail: finalUserDetails,
        userInputs: { ...finalUserDetails, password: '', confirmPassword: '' }
      });
    });
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const verifyUserInputs = () => {
    let userSent = {};

    if (state.userInputs.email != state.userDetail.email) {
      if (!RegexService.testEmailRegex(state.userInputs.email)) {
        throw new Error('email incorrect');
      }
      userSent.email = state.userInputs.email;
    }

    if (state.userInputs.prenom != state.userDetail.prenom) {
      if (!RegexService.testNameRegex(state.userInputs.prenom)) {
        throw new Error('prenom incorrect');
      }
      userSent.prenom = state.userInputs.prenom;
    }

    if (state.userInputs.nom != state.userDetail.nom) {
      if (!RegexService.testNameRegex(state.userInputs.nom)) {
        throw new Error('nom incorrect');
      }
      userSent.nom = state.userInputs.nom;
    }

    if (state.userInputs.password != '') {
      if (!RegexService.testPasswordRegex(state.userInputs.password)) {
        throw new Error('password incorrect');
      }
      if (state.userInputs.password != state.userInputs.confirmPassword) {
        throw new Error('confirm password different that password');
      }
      userSent.password = state.userInputs.password;
    }

    return userSent;
  }

  const resetInputs = () => {
    setState((currentState) => {
      return ({
        ...currentState,
        userInputs: {...currentState.userDetail, password: '', confirmPassword: ''}
      });
    });
  }

  const requestUpdateUser = async () => {
    let userSent = verifyUserInputs();

    if (!Object.keys(userSent).length > 0) {
      throw new Error('nothing changed !');
    }

    const request = await apiHttpRequest(getUpdateUserURL(state.userDetail.idUser), 'PUT', null, userSent);

    await StoreService.storeData('user', request);
    
    setState((currentState) => {
      return (Object.assign(currentState, request));
    });

    //send toast
    alert('user updated');
  }

  const updateInput = (inputName, value) => {
    const newUserInputs = InputService.setInputStates(state.userInputs, inputName, value);
    
    setState((currentState) => {
      return ({
        ...currentState,
        userInputs: newUserInputs
      });
    });
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <GlobalTemplate
      goBack={goBack}
      >
      <ProfilTemplate
        updateInput={updateInput}
        resetInputs={resetInputs}
        requestUpdateUser={requestUpdateUser}
        userDetails={state.userDetail}
        userInputs={state.userInputs}
        profilAnimation = {{ transform: state.animation.profilContainer.getTranslateTransform() }}
      />
    </GlobalTemplate>
  );
};