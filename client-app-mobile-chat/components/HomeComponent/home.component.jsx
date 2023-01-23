import React, { useContext, useState, useEffect } from 'react';
import HomeTemplate from "./home.template.jsx";
import GlobalTemplate from "@comp/GlobalComponent/global.template.jsx";
import { SocketContext } from '@context/socket.context';
import * as StoreService from '@services/StoreService';
import { Animated } from 'react-native';
import { easeOutBackAnimation } from '@assets/animation'

export default function HomeComponent(props) {

  const socket = useContext(SocketContext);

  const [state, setState] = useState({
    user: { prenom: '', nom: '' },
    animation: {
      ChatBtn: new Animated.ValueXY({ x: -400, y: 0 }),
      UserListBtn: new Animated.ValueXY({ x: 400, y: 0 })
    }
  });

  useEffect(() => {
    setUser();

    easeOutBackAnimation(state.animation.ChatBtn, 500, 50, { x: 0, y: 0 });
    easeOutBackAnimation(state.animation.UserListBtn, 500, 200, { x: 0, y: 0 });

    console.log("HomeComponent loaded");
    return () => {
      console.log('HomeComponent Destruct');
    };
  }, []);

  //FUNCTIONS ______________________________________________________________________ FUNCTIONS

  const setUser = async () => {
    setState({
      ...state,
      user: await StoreService.retrieveData('user')
    });
  }

  //TEMPLATE CALLBACK ________________________________________________________________________________ TEMPLATE CLALBACK

  const goProfile = () => {
    props.navigation.navigate('UserDetail',{});
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
      userName={state.user.prenom + ' ' + state.user.nom}
      goProfile={goProfile}
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