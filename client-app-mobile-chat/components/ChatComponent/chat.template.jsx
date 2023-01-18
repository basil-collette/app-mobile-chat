import React from 'react';
import ChatStyle from "./chat.style.jsx";
import { View, Text, TextInput, ScrollView,TouchableHighlight } from 'react-native';
import { SvgArrow } from '../../assets/svg'
import chatStyle from './chat.style.jsx';

export default function ChatTemplate(props) {

  return (
    <View style={ChatStyle.container}>
      {/* <Text style={ChatStyle.title}>{props.userName}</Text>

        <Button title="Write"
                onPress={() => {
                    props.writeMsg("test");
                }}>
        </Button>

        <View style={ChatStyle.containerForm}>
          {props.messages.map((msg) => {
              return (
                <Text key={msg} style={ChatStyle.title}>{msg}</Text>
              );
          })}
        </View> */}
        
        <ScrollView contentContainerStyle={ChatStyle.scrollViewStyle} ref={props.scrollView} onContentSizeChange={(event) => {props.scrollView.current.scrollToEnd({ animated: true, index: -1 }, 200);
  }}>
        <View style={ChatStyle.msgContainer}>
          <Text style={ChatStyle.msgContentContainer}>user - 10:11</Text>
            <View style={ChatStyle.msgContentContainerInterlocutor}>
              <Text style={ChatStyle.msgContent}>Chat Chat Chat Chat ChatChat ChatChatChatChatChat Chat Chat </Text>
            </View>
            <View style={ChatStyle.msgContentContainerInterlocutor}>
              <Text style={ChatStyle.msgContent}>Lets go ! </Text>
            </View>
        </View>
        <View style = {ChatStyle.msgContainer}>
         <Text style={ChatStyle.msgContentContainer}>user - 10:11</Text>
          <View style={ChatStyle.msgContentContainerConnectedUser}>
            <Text style={ChatStyle.msgContent}>Je sais pas pourquoi mdr bref ooooh</Text>
          </View>
          <View style={ChatStyle.msgContentContainerConnectedUser}>
            <Text style={ChatStyle.msgContent}>sinon ça va toi ? </Text>
          </View>
          </View>
        <View style={ChatStyle.msgContainer}>
          <Text style={ChatStyle.msgContentContainer}>user - 10:11</Text>
            <View style={ChatStyle.msgContentContainerInterlocutor}>
              <Text style={ChatStyle.msgContent}>en vrai balek </Text>
            </View>
        </View>
        <View style = {ChatStyle.msgContainer}>
         <Text style={ChatStyle.msgContentContainer}>user - 10:11</Text>
          <View style={ChatStyle.msgContentContainerConnectedUser}>
            <Text style={ChatStyle.msgContent}>Chat</Text>
          </View>
          </View>

        <View style={ChatStyle.msgContainer}>
          <Text style={ChatStyle.msgContentContainer}>user - 10:11</Text>
            <View style={ChatStyle.msgContentContainerInterlocutor}>
              <Text style={ChatStyle.msgContent}>Wesh trkl ?  </Text>
            </View>
        </View>

        <View style = {ChatStyle.msgContainer}>
         <Text style={ChatStyle.msgContentContainer}>user - 10:11</Text>
          <View style={ChatStyle.msgContentContainerConnectedUser}>
            <Text style={ChatStyle.msgContent}>Oue et toi ? </Text>
          </View>
          </View>
        <View style={ChatStyle.msgContainer}>
          <Text style={ChatStyle.msgContentContainer}>user - 10:11</Text>
            <View style={ChatStyle.msgContentContainerInterlocutor}>
              <Text style={ChatStyle.msgContent}>Je te deteste putain pourquoi t'as fait ça devant ma daronne frr </Text>
            </View>
            <View style={ChatStyle.msgContentContainerInterlocutor}>
              <Text style={ChatStyle.msgContent}>Elle est choqué vrm </Text>
            </View>
        </View>

         <View style = {ChatStyle.msgContainer}>
         <Text style={ChatStyle.msgContentContainer}>user - 10:11</Text>
          <View style={ChatStyle.msgContentContainerConnectedUser}>
            <Text style={ChatStyle.msgContent}>cv c rien mon sang t bizarre</Text>
          </View>

          </View>

        </ScrollView>
      <View style={ChatStyle.messageBarContainer}>
        <TextInput
          style={ChatStyle.InputMessage}
          onChangeText={(e) => { props.updateInput('password', e) }}
          title="Password"
          placeholder="Register"
          placeholderTextColor="white"
          secureTextEntry={true}
        />
        <TouchableHighlight style={chatStyle.sendButtonContainer}>
          <SvgArrow width={25} height={25} fill="#3B55EB"></SvgArrow>
        </TouchableHighlight>
      </View>
    </View>
  );

};