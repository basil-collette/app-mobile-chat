import React, { useContext, useState, useEffect } from 'react';
import OptionTemplate from "./option.template.jsx";
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { SocketContext } from '@context/socket.context';
import * as StoreService from '@services/StoreService';
import { Animated } from 'react-native';
import { easeOutBackAnimation } from '@assets/animation'

export default function OptionComponent(props) {

  const socket = useContext(SocketContext);

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
    props.navigation.navigate('UserDetail', {});
  }

  const goRoom = (idRoom) => {
    const goRoomParams = {
      typeChat: 'salon',
      idDestination: idRoom,
      chatLibelle: 'Chat Général'
    };
    props.navigation.navigate('Chat', goRoomParams);
  }

  const goBack = () => {
    props.navigation.goBack();
  }

  return (
    <GlobalTemplate
    backButton = {goBack}
    >

      <OptionTemplate
        goProfile={goProfile}
        animationProfileBtn={{ transform: state.animation.ProfileBtn.getTranslateTransform() }}
        animationLogOutBtn={{ transform: state.animation.LogOutBtn.getTranslateTransform() }}
      />

    </GlobalTemplate>
  );
};