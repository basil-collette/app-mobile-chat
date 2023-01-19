import { TextInput, View, Image, TouchableHighlight, Text } from "react-native";
import RegisterStyle from './register.style.jsx';

export default function RegisterTemplate(props) {

    return (
        <View style={RegisterStyle.container}>
            <View style = {RegisterStyle.containerHeader}>
                <View style={RegisterStyle.triangleRight}></View>
                <View style={RegisterStyle.triangleLeft}></View>
                <View style={RegisterStyle.circleLeft}></View>
                <View style={RegisterStyle.circleRight}></View>
            </View>

            <View style={RegisterStyle.containerForm}>
                <Image
                    style={RegisterStyle.logo}
                    source={require('@assets/img/logo.png')}
                />

                <Text style={RegisterStyle.title}>Sign in</Text>

                <TextInput
                    style={RegisterStyle.input}
                    title="Email"
                    placeholder="Email" 
                    placeholderTextColor="white"
                    keyboardType="email-address"
                    cursorColor ="white"
                    selectionColor="#3B55EB"
                    onChangeText={(e) => {props.updateInput('email', e)}}
                />
                <TextInput
                    style={RegisterStyle.input}
                    title="Lastname"
                    placeholder="Lastname"
                    placeholderTextColor="white"
                    cursorColor ="white"
                    onChangeText={(e) => {props.updateInput('nom', e)}}
                />
                <TextInput
                    style={RegisterStyle.input}
                    title="Firstname"
                    placeholder="Firstname" 
                    placeholderTextColor="white"
                    cursorColor ="white"
                    onChangeText={(e) => {props.updateInput('prenom', e)}}
                />
                <TextInput
                    style={RegisterStyle.input}
                    title="Password"
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    cursorColor ="white"
                    onChangeText={(e) => {props.updateInput('password', e)}}
                />

                <View style = {{marginBottom : 45, height : 46}}>
                    <TextInput
                        style={RegisterStyle.input}
                        title="ConfPassword"
                        placeholder="Confirm password"
                        placeholderTextColor="white"
                        secureTextEntry={true}
                        cursorColor ="white"
                        onChangeText={(e) => {props.updateInput('confirmPassword', e)}}
                    />
                </View>

                <View style={RegisterStyle.containerButton}>
                    <TouchableHighlight
                        style={RegisterStyle.buttonBack}
                        underlayColor='#8093FF'
                        onPressIn={() => props.toggleBackButtonState()}
                        onPressOut={() => props.toggleBackButtonState()}
                        onPress={() => {props.goBack()}}
                        >
                        <Text style={[RegisterStyle.textButtonBack, {color : props.BackButtonState === true ? "white" : "#8093FF"}]}>Back</Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight
                        style={RegisterStyle.buttonSignIn}
                        underlayColor='#8093FF'
                        onPress={() => props.registerRequest()}
                        >
                        <Text style={[RegisterStyle.textButtonSignIn]}>Sign in</Text>
                    </TouchableHighlight>
                </View>

            </View>
        </View>
    );
}
