import React, { useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { SocketContext, socket } from './context/socket.context';
import AuthComponent from './components/AuthComponent/auth.component.jsx'
import HomeComponent from './components/HomeComponent/home.component.jsx'
import UsersComponent from './components/UsersComponent/users.component.jsx'
import ChatComponent from '@comp/ChatComponent/chat.component.jsx';
import RegisterComponent from '@comp/RegisterComponent/register.component.jsx';
import ProfilComponent from '@comp/ProfilComponent/profil.component.jsx';

export default function App() {

  useEffect(() => {
    require('./socket')(socket);

    console.log("AppComponent loaded");

    return () => {
      console.log('AppComponent Destruct');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket['connected']) {
      console.log('not connected');
    } else {
      console.log('connected');
    }
  }, [socket]);

  const AppStackNavigator = createStackNavigator({
    
    Login: {
      screen: AuthComponent,
      //unmountOnBlur: true,
      navigationOptions: {
        headerShown: false
      },
    },
    Signin: {
      screen: RegisterComponent,
      navigationOptions: {
        headerShown: false
      }
    },
    Home: {
      screen: HomeComponent,
      navigationOptions: {
        headerShown: false
      }
    },
    Chat: {
      screen: ChatComponent,
      navigationOptions: {
        headerShown: false
      }
    },
    Users : {
      screen: UsersComponent,
      navigationOptions: {
        headerShown: false
      }
    },
      Profil : {
        screen: ProfilComponent,
        navigationOptions: {
          headerShown: false
        },
      }
  });

  const AppContainer = createAppContainer(AppStackNavigator);

  return (
    <SocketContext.Provider value={socket}>
      <AppContainer />
    </SocketContext.Provider>
  );
}