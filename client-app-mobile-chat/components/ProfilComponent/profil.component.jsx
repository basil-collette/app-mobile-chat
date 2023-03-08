import React, { useState, useEffect, useContext } from 'react';
import { Animated } from 'react-native'
import ProfilTemplate from "./profil.template.jsx";
import StoreService from '@services/StoreService';
import { apiHttpRequest } from '@services/RequestService';
import { getGetUserURL, getUpdateUserURL } from '@endpoint/ApiEndpoint';
import InputService from '@services/InputService';
import RegexService from '@services/RegexService';
import { easeOutAnimation } from '@assets/animation'
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import ChappyError from '@error/ChappyError';
import ChappyToast from '@context/toast/ChappyToast';
//CONTEXT
import { ToastContext } from '@context/toast/toast.context';
import { ErrorContext } from '@context/error.context';

export default function ProfilComponent(props) {

  const CONTEXTS = {
    ErrorContext: useContext(ErrorContext),
    addToast: useContext(ToastContext)
  }

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
    try {
      easeOutAnimation(state.animation.profilContainer, 500, 200, { x: 0, y: 0 });
    
      const connectedUser = await JSON.parse(await StoreService.retrieveData('user'));

      let finalUserDetails = (connectedUser.idUser == state.userDetail.idUser) ? connectedUser : await apiHttpRequest(getGetUserURL(state.userDetail.idUser), 'GET', null, null, true);
    
      setState((currentState) => {
        return ({
          ...currentState,
          userDetail: finalUserDetails,
          userInputs: { ...finalUserDetails, password: '', confirmPassword: '' }
        });
      });

    } catch (err) {
      if (!(err instanceof ChappyError)) err = new ChappyError(err.message, false, "ProfilComponent.init()");
      CONTEXTS.ErrorContext.handleError(err, err.isFatal);
    }
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const verifyUserInputs = () => {
    let userSent = {};

    if (state.userInputs.email != state.userDetail.email) {
      if (!RegexService.testEmailRegex(state.userInputs.email)) {
        throw new ChappyError('email input format is incorrect', false, "ProfilComponent.verifyUserInputs()");
      }
      userSent.email = state.userInputs.email;
    }

    if (state.userInputs.prenom != state.userDetail.prenom) {
      if (!RegexService.testNameRegex(state.userInputs.prenom)) {
        throw new ChappyError('firstname input format is incorrect', false, "ProfilComponent.verifyUserInputs()");
      }
      userSent.prenom = state.userInputs.prenom;
    }

    if (state.userInputs.nom != state.userDetail.nom) {
      if (!RegexService.testNameRegex(state.userInputs.nom)) {
        throw new ChappyError('lastname input format is incorrect', false, "ProfilComponent.verifyUserInputs()");
      }
      userSent.nom = state.userInputs.nom;
    }

    if (state.userInputs.password != '') {
      if (!RegexService.testPasswordRegex(state.userInputs.password)) {
        throw new ChappyError('password input format is incorrect', false, "ProfilComponent.verifyUserInputs()");
      }
      if (state.userInputs.password != state.userInputs.confirmPassword) {
        throw new ChappyError('confirm password must be identical to password', false, "ProfilComponent.verifyUserInputs()");
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
    try {
      let userSent = verifyUserInputs();

      if (!Object.keys(userSent).length > 0) {
        const error = new ChappyError('user informations are identical to before !', false, "ProfilComponent.requestUpdateUser()");
        CONTEXTS.ErrorContext.handleError(error, error.isFatal);
      }

      const request = await apiHttpRequest(getUpdateUserURL(state.userDetail.idUser), 'PUT', null, userSent, true);

      await StoreService.storeData('user', request);
      
      setState((currentState) => {
        const tempUser = {...currentState.userDetail, request};
        return ({
          ...currentState,
          userDetail: tempUser
        });
      });

      //alert('user updated');
      CONTEXTS.addToast(new ChappyToast('success', 'user updated !'));

    } catch (err) {
      if (!(err instanceof ChappyError)) err = new ChappyError(err.message, false, "ProfilComponent.requestUpdateUser()");
      CONTEXTS.ErrorContext.handleError(err, err.isFatal);
    }
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