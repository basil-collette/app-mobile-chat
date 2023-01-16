import React, { useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { SocketContext, socket } from '@context/socket.context';
import AuthComponent from '@comp/AuthComponent/auth.component.jsx'
import RegisterComponent from '@comp/RegisterComponent/register.component.jsx'
import HomeComponent from '@comp/HomeComponent/home.component.jsx'
import ChatComponent from '@comp/ChatComponent/chat.component.jsx'

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
    }/*,
    UserList: {
      screen: UserListComponent,
      navigationOptions: {
        headerShown: false
      }
    },
    UserDetail: {
      screen: UserDetailComponent,
      unmountOnBlur: true,
      navigationOptions: {
        headerShown: false
      }
    },
    Option: {
      screen: OptionComponent,
      unmountOnBlur: true,
      navigationOptions: {
        headerShown: false
      }
    }
    */
  });

  const AppContainer = createAppContainer(AppStackNavigator);

  return (
    <SocketContext.Provider value={socket}>
      <AppContainer />
    </SocketContext.Provider>
  );
}