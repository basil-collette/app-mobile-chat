import React, { useState, useEffect, useContext } from 'react';
import { Animated } from 'react-native';
import OptionTemplate from "./option.template.jsx";
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import StoreService from '@services/StoreService';
import AccountService from '@services/AccountService';
import { easeOutBackAnimation } from '@assets/animation'
//CONTEXT
import { ErrorContext } from '@context/error.context';

export default function OptionComponent(props) {

  const CONTEXTS = {
    ErrorContext: useContext(ErrorContext)
  }

  const [state, setState] = useState({
    user: { prenom: '', nom: '' },
    animation: {
      ProfileBtn: new Animated.ValueXY({ x: -400, y: 0 }),
      LogOutBtn: new Animated.ValueXY({ x: 400, y: 0 })
    }
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
      easeOutBackAnimation(state.animation.ProfileBtn, 500, 50, { x: 0, y: 0 });
      easeOutBackAnimation(state.animation.LogOutBtn, 500, 200, { x: 0, y: 0 });

      const userResult = await JSON.parse(await StoreService.retrieveData('user'));

      setState({
        ...state,
        user: userResult
      });

    } catch (err) {
      if (!(err instanceof ChappyError)) err = new ChappyError(err.message, false, "OptionComponent.init()");
      CONTEXTS.ErrorContext.handleError(err, err.isFatal);
    }
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goProfile = () => {
    props.navigation.navigate('UserDetail', {userDetail: state.user});
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  const disconnect = async () => {
    await AccountService.disconnect();
    
    props.navigation.navigate('Login');
  }

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <GlobalTemplate
      goBack={goBack}
      >

      <OptionTemplate
        goProfile={goProfile}
        disconnect={disconnect}
        animationProfileBtn={{ transform: state.animation.ProfileBtn.getTranslateTransform() }}
        animationLogOutBtn={{ transform: state.animation.LogOutBtn.getTranslateTransform() }}
      />

    </GlobalTemplate>
  );
};