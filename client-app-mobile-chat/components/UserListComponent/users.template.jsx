import { View, Text, ScrollView, TouchableWithoutFeedback, Animated, TextInput, TouchableOpacity} from "react-native";
import UsersStyle from "./users.style.jsx";
import { SvgProfil, SvgEnveloppe } from '@assets/svg';

export default function userListTemplate(props) {
  return (
    <View style={UsersStyle.componentBody}>

      <Animated.View style={[props.userListContainer, { width:"100%", alignItems:"center", marginBottom:"auto", marginTop:"auto" }]}>
        <View style={UsersStyle.userListContainer} >

          <Text style={UsersStyle.usersListTitle}>Users</Text>

          <TextInput style={UsersStyle.searchInput} placeholder="Search..." onChangeText={(e) => {props.searchBar(e)}} />
          <ScrollView contentContainerStyle={UsersStyle.scrollViewContainer} persistentScrollbar={true}>
            {
              props.users.filter((element) => {return(
                  props.filter.trim() == ""
                  || (element.prenom + " " + element.nom).toLowerCase().includes(props.filter.toLowerCase())
                  || (element.nom + " " + element.prenom).toLowerCase().includes(props.filter.toLowerCase())
              )}).sort((a, b) => {
                b.isConnected - a.isConnected
              }).map((user, index) => {
                if (user.idUser == props.connectedUser.idUser) return;

                const finalStyle = (index != props.users.length - 1) ? [UsersStyle.userContainer, {marginBottom: 5}] : UsersStyle.userContainer;
              
                return (
                  <View style={finalStyle} key={index}>
                    <TouchableOpacity
                      onPress={() => {props.goProfile(user)}}
                      style={UsersStyle.profilButton}
                      activeOpacity ={0.5}
                      >
                        <View style={{ backgroundColor: user.isConnected ? "#43C851" : "#CC5656", borderRadius: 20 }}>
                          <SvgProfil width={25} height={25} fill="white" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {props.goDiscussion(user)}}
                      underlayColor='#8093FF'
                      style = {UsersStyle.containerSendMessage}
                      activeOpacity = {0.5}
                      >
                        <Text style={UsersStyle.alignBoxUser}>{user.prenom + ' ' + user.nom}</Text>
                        <View style={UsersStyle.SendButton}>
                          <SvgEnveloppe height={25} width={25} fill="#3B55EB" />
                        </View>
                    </TouchableOpacity>
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