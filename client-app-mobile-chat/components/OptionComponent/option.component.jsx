import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import OptionTemplate from "./option.template.jsx";
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import * as StoreService from '@services/StoreService';
import { easeOutBackAnimation } from '@assets/animation'

export default function OptionComponent(props) {

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
    easeOutBackAnimation(state.animation.ProfileBtn, 500, 50, { x: 0, y: 0 });
    easeOutBackAnimation(state.animation.LogOutBtn, 500, 200, { x: 0, y: 0 });

    const userResult = await JSON.parse(await StoreService.retrieveData('user'));

    setState({
      ...state,
      user: userResult
    });
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goProfile = () => {
    props.navigation.navigate('UserDetail', {userDetail: state.user});
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  //TEMPLATE RETURN __________________________________________________________________________________ TEMPLATE RETURN

  return (
    <GlobalTemplate
      goBack={goBack}
      >

      <OptionTemplate
        goProfile={goProfile}
        animationProfileBtn={{ transform: state.animation.ProfileBtn.getTranslateTransform() }}
        animationLogOutBtn={{ transform: state.animation.LogOutBtn.getTranslateTransform() }}
      />

    </GlobalTemplate>
  );
};