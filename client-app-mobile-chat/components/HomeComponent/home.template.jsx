import React from 'react';
import HomeStyle from "./home.style.jsx";
import { View, Text, StatusBar, } from "react-native";
import { SvgProfil, SvgHome, SvgChat, SvgUser } from '@assets/svg/';

export default function HomeTemplate(props) {
  return (
    <View style={HomeStyle.container}>

      <StatusBar
        animated={true}
        backgroundColor="black"
        barStyle="dark"
        showHideTransition="fade"
      />

      <View style={homeStyle.containerHeader}>
          <SvgProfil width={25} height={25} fill="white" />
        <Text style={{ color: "white", fontSize: 15, marginLeft : 10}}>Criss Brierre</Text>
      </View>

      <View style={HomeStyle.containerHomeLogo}>
        <SvgHome width={80} height={80} fill="gray" />
      </View>

      <View style={homeStyle.containerBulle}>
        <View style={HomeStyle.bulle}>
          <SvgChat width={30} height={30} fill="white" />
          <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>chat</Text>
          <View style={homeStyle.triangleBulleGauche}></View>
        </View>

        <View style={HomeStyle.bulle}>
          <SvgUser width={30} height={30} fill ="white" />
          <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>users</Text>
          <View style={homeStyle.triangleBulleDroite}></View>
        </View>
      </View>

    </View>
  );
};