import { View, Text, ScrollView, TouchableWithoutFeedback, Animated, TextInput} from "react-native";
import UsersStyle from "./users.style.jsx";
import { SvgProfil, SvgEnveloppe } from '@assets/svg';

export default function userListTemplate(props) {
  return (
    <View style={UsersStyle.componentBody}>

      <Animated.View style={[props.userListContainer, { width:"100%", alignItems:"center", marginBottom:"auto", marginTop:"auto" }]}>
        <View style={UsersStyle.userListContainer}>

          <Text style={UsersStyle.usersListTitle}>Users</Text>

          <TextInput style={UsersStyle.searchInput} placeholder="Search..." onChangeText={(e) => {props.searchBar(e)}} />

          <ScrollView contentContainerStyle={UsersStyle.scrollViewContainer}>
            {
              props.users.filter((element) => {return(
                  props.filter.trim() == ""
                  || (element.prenom + " " + element.nom).toLowerCase().includes(props.filter.toLowerCase())
                  || (element.nom + " " + element.prenom).toLowerCase().includes(props.filter.toLowerCase())
              )}).map((user, index) => {
                if (user.idUser == props.connectedUser.idUser) return;

                const finalStyle = (index != props.users.length - 1) ? [UsersStyle.userContainer, {marginBottom: 5}] : UsersStyle.userContainer;
              
                return (
                  <View style={finalStyle} key={index}>
                    <TouchableWithoutFeedback
                      onPress={() => {props.goProfile(user)}}
                      underlayColor='#8093FF'
                      >
                      <View style={UsersStyle.profilButton}>
                        <View style={{ backgroundColor: "#43C851", borderRadius: 20 }}>
                          <SvgProfil width={25} height={25} fill="white" />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                      onPress={() => {props.goDiscussion(user)}}
                      underlayColor='#8093FF'
                      >
                      <View style={UsersStyle.containerSendMessage}>
                        <Text style={UsersStyle.alignBoxUser}>{user.prenom + ' ' + user.nom}</Text>
                        <View style={UsersStyle.SendButton}>
                          <SvgEnveloppe height={25} width={25} fill="#3B55EB" />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                );
              })
            }
          </ScrollView>
        </View>

        <View style={UsersStyle.triangle}></View>
      </Animated.View>

    </View>
  );
};