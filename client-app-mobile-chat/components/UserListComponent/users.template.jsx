import { View, Text, ScrollView } from "react-native";
import UsersStyle from "./users.style.jsx";
import { SvgProfil, SvgArrow } from '@assets/svg';

export default function HomeTemplate(props) {
  return (
    <View style={UsersStyle.componentBody}>

      <View style={UsersStyle.userListContainer}>

        <Text style={UsersStyle.titleAlign}>Users</Text>

        <ScrollView contentContainerStyle={UsersStyle.scrollViewContainer}>

          {props.users.map((user, index) => {
            let finalStyle = (index + 1 != props.users.length) ? [UsersStyle.userContainer, {marginBottom: 5}] : UsersStyle.userContainer;
            return (
              <View style={finalStyle}>
                <View style={UsersStyle.profilButton}>
                  <View style={{ backgroundColor: "#43C851", borderRadius: 20 }}>
                    <SvgProfil width={25} height={25} fill="white" />
                  </View>
                </View>

                <View style = {UsersStyle.containerSendMessage}>
                  <Text style={UsersStyle.alignBoxUser}>{user.prenom + ' ' + user.nom}</Text>
                  <View style = {UsersStyle.SendButton}>
                    <SvgArrow width={25} height={25} fill="#3B55EB" />
                  </View>
                </View>
              </View>
            );
          })}
          
        </ScrollView>
        
      </View>

      <View style={UsersStyle.triangle}></View>

    </View>
  );
};