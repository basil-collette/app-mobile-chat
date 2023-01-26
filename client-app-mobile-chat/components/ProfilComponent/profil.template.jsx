import { TextInput, View, TouchableHighlight, Text,Animated } from "react-native";
import { SvgProfil } from '@assets/svg';
import ProfilStyle from './profil.style.jsx';

export default function ProfilTemplate(props) {
  return (
    <View style={ProfilStyle.body}>

      <Animated.View style={[{alignItems: 'center'}, props.profilAnimation]}>
        <View style={ProfilStyle.container}>
          
          <View style={ProfilStyle.profilInfoContainer}>
            <View style={ProfilStyle.profilInfoSVGContainer}>
              <SvgProfil width={100} height={100} fill="white"></SvgProfil>
            </View>

            <Text style={{color :"white", fontSize: 17}}>{props.userDetails.prenom + ' ' + props.userDetails.nom}</Text>
          </View>

          <View style={ProfilStyle.inputContainer}>
            <Text style = {{color : "#AAAABC"}}>Firstname</Text>
            <TextInput
              style={ProfilStyle.input}
              value={props.userInputs.prenom}
              title="Firstname"
              cursorColor="white"
              editable={props.userDetails.email != null}
              onChangeText={(e) => { props.updateInput('prenom', e) }}
            />
          </View>

          <View style={ProfilStyle.inputContainer}>
            <Text style={{color : "#AAAABC"}}>Lastname</Text>
            <TextInput
              style={ProfilStyle.input}
              value={props.userInputs.nom}
              title="Lastname"
              cursorColor="white"
              editable={props.userDetails.email != null}
              onChangeText={(e) => { props.updateInput('nom', e) }}
            />
          </View>

          {props.userDetails.email && <>
            <View style = {ProfilStyle.inputContainer}>
              <Text style = {{color : "#AAAABC"}}>Email</Text>
              <TextInput
                style={ProfilStyle.input}
                value={props.userInputs.email}
                title="Email"
                keyboardType="email-address"
                cursorColor="white"
                selectionColor="#3B55EB"
                onChangeText={(e) => { props.updateInput('email', e) }}
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

            <View style={ProfilStyle.containerButton}>
              <TouchableHighlight
                style={ProfilStyle.resetBtn}
                underlayColor='#8093FF'
                onPress={() => { props.resetInputs() }}
                >
                <Text style={{color: '#fff', textAlign: 'center'}}>Reset</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={ProfilStyle.saveBtn}
                underlayColor='#8093FF'
                onPress={() => { props.requestUpdateUser() }}
                >
                <Text style={{color: '#3B55EB', textAlign: 'center'}}>Save</Text>
              </TouchableHighlight>
            </View>
          </>}

        </View>
        <View style={ProfilStyle.triangle}></View>
      </Animated.View>

    </View>
  );
};