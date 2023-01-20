import { TextInput, View, TouchableHighlight, Text } from "react-native";
import { SvgProfil } from '@assets/svg';
import ProfilStyle from './profil.style.jsx';

export default function ProfilTemplate(props) {
  return (
    <View style={ProfilStyle.body}>
      <View style={ProfilStyle.container}>

        <View style={ProfilStyle.profilInfoContainer}>
          <View style={{ backgroundColor: "#AAAABC", borderRadius: 60 }}>
            <SvgProfil width={100} height={100} fill="white" ></SvgProfil>
          </View>
        </View>

        <Text style={{color :"white"}}>{props.userDetails.nom + ' ' + props.userDetails.prenom}</Text>

        <View style = {ProfilStyle.inputContainer}>
          <Text style = {{color : "#AAAABC"}}>Email</Text>
          <TextInput
            style={ProfilStyle.input}
            value={props.userDetails.email}
            title="Email"
            keyboardType="email-address"
            cursorColor="white"
            selectionColor="#3B55EB"
            onChangeText={(e) => { props.updateInput('email', e) }}
          />
        </View>

        <View style={ProfilStyle.inputContainer}>
          <Text style = {{color : "#AAAABC"}}>Firstname</Text>
          <TextInput
            style={ProfilStyle.input}
            value={props.userDetails.prenom}
            title="Firstname"
            cursorColor="white"
            onChangeText={(e) => { props.updateInput('prenom', e) }}
          />
        </View>

        <View style={ProfilStyle.inputContainer}>
          <Text style={{color : "#AAAABC"}}>Lastname</Text>
          <TextInput
            style={ProfilStyle.input}
            value={props.userDetails.nom}
            title="Lastname"
            cursorColor="white"
            onChangeText={(e) => { props.updateInput('nom', e) }}
          />
        </View>

        <View style={ProfilStyle.inputContainer}>
          <Text style={{color : "#AAAABC"}}>Password</Text>
          <TextInput
            style={ProfilStyle.input}
            title="Password"
            secureTextEntry={true}
            cursorColor="white"
            onChangeText={(e) => { props.updateInput('password', e) }}
          />
        </View>

        <View style={ProfilStyle.inputContainer}>
          <Text style={{color : "#AAAABC"}}>Confirm password</Text>
          <TextInput
            style={ProfilStyle.input}
            title="Password"
            secureTextEntry={true}
            cursorColor="white"
            onChangeText={(e) => { props.updateInput('confirmPassword', e) }}
          />
        </View>
       
        <TouchableHighlight
          style={ProfilStyle.buttonSave}
          underlayColor='#8093FF'
          onPress={async () => { await props.updateUserDetails() }}
          >
          <Text style={[ProfilStyle.buttonSaveText]}>Save</Text>
        </TouchableHighlight>

        <View style={ProfilStyle.triangle}></View>

      </View>
    </View>
  );
};