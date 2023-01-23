import { useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { SocketContext, socket } from '@context/socket.context';
import AuthComponent from '@comp/AuthComponent/auth.component.jsx';
import HomeComponent from '@comp/HomeComponent/home.component.jsx';
import UserListComponent from '@comp/UserListComponent/users.component.jsx';
import ChatComponent from '@comp/ChatComponent/chat.component.jsx';
import RegisterComponent from '@comp/RegisterComponent/register.component.jsx';
import ProfilComponent from '@comp/ProfilComponent/profil.component.jsx';
import { setJSExceptionHandler, setNativeExceptionHandler } from "react-native-exception-handler";

const errorHandler = (errorMessage) => {
  //toaster
  alert(error.message);
}

setJSExceptionHandler((error, isFatal) => {
  console.error({error: error, isFatal: isFatal});
  errorHandler(error.message);
}, true);

/*
setNativeExceptionHandler((errorString) => {
  console.log('setNativeExceptionHandler');
  console.log(errorString);
}, false);
*/

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
      }
    }
    /*
    Option: {
      screen: OptionComponent,
      unmountOnBlur: true,
    }
    */
  });

  const AppContainer = createAppContainer(AppStackNavigator);

  try {
    return (
      <SocketContext.Provider value={socket}>
        <AppContainer />
      </SocketContext.Provider>
    );
  } catch(error) {
    errorHandler(error.message);
  }
}