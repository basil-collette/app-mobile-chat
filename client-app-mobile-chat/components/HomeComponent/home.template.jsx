import { View, Text, StatusBar, TouchableWithoutFeedback  } from "react-native";
import { SvgProfil, SvgHome, SvgChat, SvgUser } from '@assets/svg/';
import HomeStyle from "./home.style.jsx";

export default function HomeTemplate(props) {
  return (
    <>
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

        <TouchableWithoutFeedback
          onPress={() => props.goUserList()}
          underlayColor='#8093FF'
          >
            <View style={HomeStyle.bulle}>
              <SvgUser width={30} height={30} fill ="white" />
              <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>Users</Text>
              <View style={HomeStyle.triangleBulleDroite}></View>
            </View>
          
        </TouchableWithoutFeedback >

        
      </View>
    </>
  );
};