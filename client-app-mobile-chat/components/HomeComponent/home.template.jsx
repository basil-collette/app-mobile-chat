
import { Animated, View, Text, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import { SvgHome, SvgChat, SvgUser } from '@assets/svg/';
import HomeStyle from "./home.style.jsx";

export default function HomeTemplate(props) {
  return (
    <>
      <View style={HomeStyle.containerHomeLogo}>
        <SvgHome width={80} height={80} fill="gray" />
      </View>

      <View style={HomeStyle.containerBulle}>
        <TouchableOpacity
          onPress={() => {props.goRoom(1)}}
          underlayColor='#8093FF'
          activeOpacity={0.5}
          >
          <Animated.View style={[HomeStyle.bulle, props.animationChatBtn]}>
            <SvgChat width={30} height={30} fill="white" />
            <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>Chat</Text>
            <View style={HomeStyle.triangleBulleGauche}></View>
          </Animated.View>
        </TouchableOpacity >
      
        <TouchableOpacity
          onPress={() => {props.goUserList()}}
          underlayColor='#8093FF'
          activeOpacity={0.5}
          >
          <Animated.View style={[HomeStyle.bulle, props.animationUserListBtn]}>
            <SvgUser width={30} height={30} fill ="white" />
            <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>Users</Text>
            <View style={HomeStyle.triangleBulleDroite}></View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};