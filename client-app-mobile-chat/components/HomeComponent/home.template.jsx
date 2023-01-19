
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { SvgHome, SvgChat, SvgUser } from '@assets/svg/';
import HomeStyle from "./home.style.jsx";

export default function HomeTemplate(props) {
  return (
    <>
      <View style={HomeStyle.containerHomeLogo}>
        <SvgHome width={80} height={80} fill="gray" />
      </View>

      <View style={HomeStyle.containerBulle}>
        <TouchableWithoutFeedback
          onPress={() => { props.goProfile() }}
          underlayColor='#8093FF'
          >
          <Animated.View style={[HomeStyle.bulle,props.animationChatBtn]}>
            <SvgChat width={30} height={30} fill="white" />
            <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>Chat</Text>
            <View style={HomeStyle.triangleBulleGauche}></View>
          </Animated.View>

        </TouchableWithoutFeedback >


        <Animated.View style={[HomeStyle.bulle,props.animationUserListBtn]} onPress={() => props.goUserList()}>
          <SvgUser width={30} height={30} fill ="white" />
          <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>Users</Text>
          <View style={HomeStyle.triangleBulleDroite}></View>
        </Animated.View>
      </View>
    </>
  );
};