import React, { useContext, useState, useEffect } from 'react';
import HomeTemplate from "./home.template.jsx";
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import * as StoreService from '@services/StoreService';
import { Animated } from 'react-native';
import { easeOutBackAnimation } from '@assets/animation';
import ChappyError from '@error/ChappyError';
//CONTEXT
import { ErrorContext } from '@context/error.context';

export default function HomeComponent(props) {

  const CONTEXTS = {
    ErrorContext: useContext(ErrorContext)
  }

  const [state, setState] = useState({
    user: { prenom: '', nom: '' },
    animation: {
      ChatBtn: new Animated.ValueXY({ x: -400, y: 0 }),
      UserListBtn: new Animated.ValueXY({ x: 400, y: 0 })
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
      easeOutBackAnimation(state.animation.ChatBtn, 500, 50, { x: 0, y: 0 });
      easeOutBackAnimation(state.animation.UserListBtn, 500, 200, { x: 0, y: 0 });

      const userResult = await JSON.parse(await StoreService.retrieveData('user'));

      setState({
        ...state,
        user: userResult
      });

    } catch (err) {
      if (!(err instanceof ChappyError)) err = new ChappyError(err.message, false, "HomeComponent.init()");
      CONTEXTS.ErrorContext.handleError(err, err.isFatal);
    }
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goOption = () => {
    props.navigation.navigate('Option',{});
  }

  const goRoom = (idRoom) => {
    const goRoomParams = {
      typeChat: 'salon',
      idDestination: idRoom,
      chatLibelle: 'Chat Général'
    };

    props.navigation.navigate('Chat', goRoomParams);
  }

  const goUserList = () => {
    props.navigation.navigate('UserList', {});
  }

  return (
    <GlobalTemplate
      goOption={goOption}
      >

      <HomeTemplate
        goRoom={goRoom}
        goUserList={goUserList}
        animationChatBtn={{ transform: state.animation.ChatBtn.getTranslateTransform() }}
        animationUserListBtn={{ transform: state.animation.UserListBtn.getTranslateTransform() }}
      />

    </GlobalTemplate>
  );
};