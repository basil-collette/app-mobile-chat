import styles from './register.style.jsx';

import { TextInput, View, Image, TouchableHighlight, Text } from "react-native";

import { Checkbox } from 'react-native-paper';

export default function RegisterTemplate(props) {

    return (
        <View style={styles.container}>
            <View style = {styles.containerHeader}>
                    <View style={styles.triangleRight}></View>
                    <View style={styles.triangleLeft}></View>
                    <View style={styles.circleLeft}></View>
                    <View style={styles.circleRight}></View>
            </View>
            <View style={styles.containerForm}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/img/logo.png')}
                />
                <Text style={styles.title}>Sign in</Text>
                <TextInput
                    style={styles.input}
                    title="Email"
                    placeholder="Email" 
                    placeholderTextColor="white"
                    keyboardType="email-address"
                    cursorColor ="white"
                    selectionColor="#3B55EB"
                />
                <TextInput
                    style={styles.input}
                    title="Lastname"
                    placeholder="Lastname"
                    placeholderTextColor="white"
                    cursorColor ="white"
                />
                <TextInput
                    style={styles.input}
                    title="First"
                    placeholder="Firstname" 
                    placeholderTextColor="white"
                    cursorColor ="white"
                />
                <TextInput
                    style={styles.input}
                    title="Password"
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    cursorColor ="white"
                />
                <View style = {{marginBottom : 45, height : 46}}>
                <TextInput
                    style={styles.input}
                    title="ConfPassword"
                    placeholder="Confirm password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    cursorColor ="white"
                />
                </View>
                <View style={styles.containerButton}>
                    <TouchableHighlight
                        style={styles.buttonBack}
                        underlayColor='#8093FF'
                        onPressIn = {() => props.changeBackButtonState()}
                        onPressOut = {() => props.changeBackButtonState()}
                        >
                        <Text style={[styles.textButtonBack, {color : props.BackButtonState === true ? "white" : "#8093FF"}]}>Back</Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight
                        style={styles.buttonSignIn}
                        underlayColor='#8093FF'
                        onPress = {() => console.log("LETS GO!")}
                        >
                        <Text style={[styles.textButtonSignIn]}>Sign in</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}
