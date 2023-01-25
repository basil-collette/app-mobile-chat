import { View, Text, StatusBar, TouchableWithoutFeedback } from "react-native";
import { SvgCircleChevron, SvgHome, SvgUser, SvgGear } from '@assets/svg/';
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
        {props.backButton && <TouchableWithoutFeedback
          onPress={() => props.backButton()}
        >
          <SvgCircleChevron width={25} height={25} fill="white" />
        </TouchableWithoutFeedback >}

        {props.title &&
          <View style={{ flexDirection: "row", paddingVertical: 5, paddingRight : 15, paddingLeft : 5,backgroundColor:"white",paddingbackgroundColor: "white",alignItems:"center",borderRadius:15}}> 
          {props.SVGProfil && props.SVGProfil()}
          {props.title && <Text style={{ color: "blue", marginLeft: 10 }}>{props.title}</Text>}
          </View>}
        
        <View style={!props.title && !props.SVGProfil ? {marginLeft : 'auto' } : {} }>
        {props.goOption &&
        <TouchableWithoutFeedback
          onPress={() =>props.goOption ? props.goOption() : null}
        >
          <SvgGear width={25} height={25} fill="white" />
        </TouchableWithoutFeedback>
}
        </View>


      </View>

      {props.children}

    </View>
  );
};