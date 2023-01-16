import { View, Text, StatusBar, TouchableWithoutFeedback  } from "react-native";
import { SvgProfil, SvgHome, SvgChat, SvgUser } from '@assets/svg/';
import HomeStyle from "./home.style.jsx";

export default function HomeTemplate(props) {
  return (
    <View style={HomeStyle.container}>

      <StatusBar
        animated={true}
        backgroundColor="black"
        barStyle="dark"
        showHideTransition="fade"
      />

      <View style={HomeStyle.containerHeader}>
        <TouchableWithoutFeedback 
          onPress={() => props.goProfile()}
        >
          <SvgProfil width={25} height={25} fill="white" />
        </TouchableWithoutFeedback >

        <Text style={{ color: "white", fontSize: 15, marginLeft : 10}}>{props.userName}</Text>
      </View>

      <View style={HomeStyle.containerHomeLogo}>
        <SvgHome width={80} height={80} fill="gray" />
      </View>

      <View style={HomeStyle.containerBulle}>
        <TouchableWithoutFeedback
          onPress={() => {props.goRoom(1)}}
          underlayColor='#8093FF'
          >
            <View style={HomeStyle.bulle}>
              <SvgChat width={30} height={30} fill="white" />
              <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>Chat</Text>
              <View style={HomeStyle.triangleBulleGauche}></View>
            </View>
          
        </TouchableWithoutFeedback >

        <View style={HomeStyle.bulle} onPress={() => props.goUserList()}>
          <SvgUser width={30} height={30} fill ="white" />
          <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>Users</Text>
          <View style={HomeStyle.triangleBulleDroite}></View>
        </View>
      </View>

    </View>
  );
};