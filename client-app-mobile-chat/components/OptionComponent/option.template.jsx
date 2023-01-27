
import { Animated, View, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import {SvgLogOut, SvgProfil,SvgGear} from '@assets/svg/';
import OptionStyle from "./option.style.jsx";

export default function OptionTemplate(props) {
  return (
    <>
      <View style={OptionStyle.containerGearLogo}>
        <SvgGear width={80} height={80} fill="gray" />
      </View>

      <View style={OptionStyle.containerBulle}>
        <TouchableOpacity
          onPress={() => {props.goProfile()}}
          activeOpacity={0.5}
          >
          <Animated.View style={[OptionStyle.bulle, props.animationProfileBtn,{backgroundColor:"#AAAABC"}]}>
            <SvgProfil width={25} height={25} fill="white" />
            <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>Profile</Text>
            <View style={OptionStyle.triangleBulleGauche}></View>
          </Animated.View>
        </TouchableOpacity >
      
        <TouchableOpacity
          onPress={() => {props.goProfile()}}
          activeOpacity={0.5}
          >
          <Animated.View style={[OptionStyle.bulle, props.animationLogOutBtn,{backgroundColor:"#CC5656"}]}>
            <SvgLogOut style = {{transform: [{rotate: "180deg"}]}} width={25} height={25} fill ="white" />
            <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>Log out</Text>
            <View style={OptionStyle.triangleBulleDroite}></View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};