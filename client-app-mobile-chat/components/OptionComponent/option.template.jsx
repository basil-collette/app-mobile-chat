
import { Animated, View, Text, TouchableWithoutFeedback } from "react-native";
import {SvgLogOut, SvgProfil,SvgGear} from '@assets/svg/';
import OptionStyle from "./option.style.jsx";

export default function OptionTemplate(props) {
  return (
    <>
      <View style={OptionStyle.containerGearLogo}>
        <SvgGear width={80} height={80} fill="gray" />
      </View>

      <View style={OptionStyle.containerBulle}>
        <TouchableWithoutFeedback
          onPress={() => {props.goProfile()}}
          underlayColor='#8093FF'
          >
          <Animated.View style={[OptionStyle.bulle, props.animationProfileBtn]}>
            <SvgProfil width={25} height={25} fill="white" />
            <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>Profile</Text>
            <View style={OptionStyle.triangleBulleGauche}></View>
          </Animated.View>
        </TouchableWithoutFeedback >
      
        <TouchableWithoutFeedback
          onPress={() => {props.goProfile()}}
          underlayColor='#8093FF'
          >
          <Animated.View style={[OptionStyle.bulle, props.animationLogOutBtn]}>
            <SvgLogOut style = {{transform: [{rotate: "180deg"}]}} width={25} height={25} fill ="white" />
            <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>Log out</Text>
            <View style={OptionStyle.triangleBulleDroite}></View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};