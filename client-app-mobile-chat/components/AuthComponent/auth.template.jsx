import styles from './auth.style.jsx';

import { TextInput, View, Image, TouchableHighlight, Text } from "react-native";

import { Checkbox } from 'react-native-paper';

export default function AuthTemplate(props) {

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
                <Text style={styles.title}>Connexion</Text>
                <TextInput
                    style={styles.inputEmail}
                    title="Email"
                    placeholder="Email" 
                    placeholderTextColor="white"
                />
                <TextInput
                    style={styles.inputPassword}
                    title="Password"
                    placeholder="Register"
                    placeholderTextColor="white"
                />
                <View style={styles.containerCheckBox}>
                    <Checkbox
                        value="first"
                        color="white"
                        uncheckedColor="white"
                        status={props.getCheckState === true ? 'checked' : 'unchecked'}
                        onPress={() => props.changeCheckState()}
                    />
                    <Text style={styles.textTextRadio}>remember me</Text>
                </View>
                <View style={styles.containerButton}>
                    <TouchableHighlight
                        style={styles.buttonRegister}
                        underlayColor='#fff'>
                        <Text style={[styles.textButtonRegister]}>Register</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.buttonLogin}
                        underlayColor='#fff'>
                        <Text style={[styles.textButtonLogin]}>Log in</Text>
                    </TouchableHighlight>
                </View>
                <Text style={{ color: '#8093FF' }}>forgot password</Text>
            </View>
        </View>
    );
}
