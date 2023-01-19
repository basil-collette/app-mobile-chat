import React from 'react';
import UsersStyle from "./users.style.jsx";
import { TextInput, View, Image, TouchableHighlight, Text, StatusBar, ScrollView } from "react-native";
import Svg, { Path, SvgUri } from "react-native-svg"
import { SvgProfil, SvgChat, SvgHome, SvgArrow, SvgProfilGreen } from '../../assets/svg/';
import usersStyle from './users.style.jsx';

export default function UsersTemplate(props) {
  return (
    <View style={UsersStyle.container}>

      <StatusBar
        animated={true}
        backgroundColor="black"
        barStyle="dark"
        showHideTransition="fade"
      />
      <View style={UsersStyle.containerHeader}>
        <SvgProfil width={25} height={25} fill="white" />
        <Text style={{ color: "white", fontSize: 16, marginLeft: 5, marginRight: "60%" }}>Criss Brierre</Text>
        <SvgHome width={25} height={25} fill="white" />
      </View>

      <View style={usersStyle.bulleContainer}>
        <Text style={usersStyle.titleAlign}>Users</Text>

        <ScrollView contentContainerStyle={UsersStyle.scrollViewContainer}>

          <View style={UsersStyle.userContainer}>
            <View style={UsersStyle.profilButton}>
              <View style={{ backgroundColor: "#43C851", borderRadius: 20 }}>
                <SvgProfil width={25} height={25} fill="white" />
              </View>
            </View>
            <View style={usersStyle.containerSendMessage}>
              <Text style={usersStyle.alignBoxUser}>Criss Brierre</Text>
              <View style={usersStyle.SendButton}>
                <SvgArrow width={25} height={25} fill="#3B55EB" />
              </View>
            </View>
          </View>

          <View style={UsersStyle.userContainer}>
            <View style={UsersStyle.profilButton}>
              <View style={{ backgroundColor: "#CC5656", borderRadius: 20 }}>
                <SvgProfil width={25} height={25} fill="white" />
              </View>
            </View>
            <View style={usersStyle.containerSendMessage}>
              <Text style={usersStyle.alignBoxUser}>Criss Brierre</Text>
              <View style={usersStyle.SendButton}>
                <SvgArrow width={25} height={25} fill="#3B55EB" />
              </View>
            </View>
          </View>

        </ScrollView>
        <View style={UsersStyle.triangle}></View>
      </View>


    </View>
  );

};