import { useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SocketContext, socket } from '@context/socket.context';
import { ErrorProvider } from '@context/error.context';
import { ToastProvider } from '@context/toast/toast.context';
import { View, StatusBar } from 'react-native';
import AuthComponent from '@comp/AuthComponent/auth.component.jsx';
import HomeComponent from '@comp/HomeComponent/home.component.jsx';
import UserListComponent from '@comp/UserListComponent/users.component.jsx';
import ChatComponent from '@comp/ChatComponent/chat.component.jsx';
import RegisterComponent from '@comp/RegisterComponent/register.component.jsx';
import ProfilComponent from '@comp/ProfilComponent/profil.component.jsx';
import OptionComponent from '@comp/OptionComponent/option.component.jsx';

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
    UserList: {
      screen: UserListComponent,
      navigationOptions: {
        headerShown: false
      }
    },
    UserDetail : {
      screen: ProfilComponent,
      navigationOptions: {
        headerShown: false
      },
    },
    Option: {
      screen: OptionComponent,
      navigationOptions: {
        headerShown: false
      },
    }
  });

  const AppContainer = createAppContainer(AppStackNavigator);

  return (
    <View style={{ flex: 1, backgroundColor: "#3C3C49" }}>
      
      <StatusBar
        animated={true}
        backgroundColor="black"
        barStyle="dark"
        showHideTransition="fade"
      />

      <ToastProvider>
        <ErrorProvider>
          <SocketContext.Provider value={socket}>

            <AppContainer />

          </SocketContext.Provider>
        </ErrorProvider>
      </ToastProvider>

    </View>
  );
}
