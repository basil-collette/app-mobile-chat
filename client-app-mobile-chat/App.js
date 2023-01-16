import React, { useState, useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import AuthComponent from './components/AuthComponent/auth.component.jsx'
import HomeComponent from './components/HomeComponent/home.component.jsx'
import UsersComponent from './components/UsersComponent/users.component.jsx'
import { SocketContext, socket } from './context/socket.context';

export default function App() {

  useEffect(() => {
    require('./socket')(socket);

    console.log("AppComponent loaded");

    return () => {
      console.log('AppComponent Destruct');
      socket.disconnect();
    };
  }, []);

  const AppStackNavigator = createStackNavigator({
    Users : {
      screen: UsersComponent,
      navigationOptions: {
        headerShown: false
      },
    Login: {
      screen: AuthComponent,
      navigationOptions: {
        headerShown: false
      },
      unmountOnBlur: true,
    },
    Signin: {
      screen: HomeComponent, //RegisterComponent
      navigationOptions: {
        headerShown: false
      }
    },
    Home: {
      screen: HomeComponent,
      navigationOptions: {
        headerShown: false
      },
    
    }
    }
  });

  const AppContainer = createAppContainer(AppStackNavigator);

  return (
    <SocketContext.Provider value={socket}>
      <AppContainer />
    </SocketContext.Provider>
  );
}