import { View, Text, StatusBar, TouchableWithoutFeedback  } from "react-native";
import { SvgProfil, SvgHome, SvgChat, SvgUser } from '@assets/svg/';
import GlobalStyle from "./global.style.jsx";

export default function GlobalTemplate(props) {
  return (
    <View style={GlobalStyle.container}>

      <StatusBar
        animated={true}
        backgroundColor="black"
        barStyle="dark"
        showHideTransition="fade"
      />

      <View style={GlobalStyle.containerHeader}>
        <TouchableWithoutFeedback
            onPress={() => props.goProfile()}
            >
            <View style={{flexDirection: "row"}}>
                <SvgProfil width={25} height={25} fill="white" />
                <Text style={{ color: "white", fontSize: 15, marginLeft : 10}}>{props.userName}</Text>
            </View>
        </TouchableWithoutFeedback >

        {props.profileBtn ? <Text>{props.profilBtn}</Text> : null}

        {props.title ? <Text>{props.title}</Text> : null}

        {props.homeBtn ? <SvgHome width={25} height={25} fill="white" /> : null}

      </View>

      {props.children}

    </View>
  );
};