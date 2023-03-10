import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { SvgCircleChevron, SvgGear } from '@assets/svg/';
import GlobalStyle from "./global.style.jsx";

export default function GlobalTemplate(props) {
  return (
    <View style={GlobalStyle.container}>
      
      <View style={GlobalStyle.containerHeader}>
        {
          props.goBack
          && <TouchableOpacity
            onPress={() => props.goBack()}
            >
            <SvgCircleChevron width={25} height={25} fill="white" />
          </TouchableOpacity >
        }

        {
          props.title
          && <View style={GlobalStyle.titleContainer}>
            {props.SVGProfil && props.SVGProfil()}
            <Text style={{ color: "blue", marginLeft: 10 }}>{props.title}</Text>
            {/*
            props.SVGProfil ?
              <Text onPress={() => props.goBack()} style={{ color: "blue", marginLeft: 10 }}>{props.title}</Text>
              : <Text style={{ color: "blue", marginLeft: 10 }}>{props.title}</Text>
            */}
          </View>
        }

        {
          props.goOption
          && <TouchableOpacity style={!props.title ? {marginLeft: 'auto'} : {}}
            onPress={() => props.goOption()}
            >
            <SvgGear width={25} height={25} fill="white" />
          </TouchableOpacity>
        }

      </View>

      {props.children}

    </View>
  );
};