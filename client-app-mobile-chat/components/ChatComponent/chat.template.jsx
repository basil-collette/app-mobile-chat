import React from 'react';
import ChatStyle from "./chat.style.jsx";
import { View, Text, TextInput, ScrollView,TouchableHighlight } from 'react-native';
import { SvgArrow } from '../../assets/svg'
import chatStyle from './chat.style.jsx';

export default function ChatTemplate(props) {

  return (
    <View style={ChatStyle.container}>

      <ScrollView
        contentContainerStyle={ChatStyle.scrollViewStyle}
        ref={props.scrollView}
        onContentSizeChange={() => {
          props.scrollView.current.scrollToEnd({ animated: true, index: -1 }, 200);
        }}
        >

        {props.messages.map((msg, index) => {
          let identityStyle = (props.user.idUser == msg.idUser) ? ChatStyle.msgContentContainerConnectedUser : ChatStyle.msgContentContainerInterlocutor;
          let finalStyle = (index + 1 != props.messages.length) ? [identityStyle, {marginBottom: 5}] : identityStyle;
          
          return (
            <View key={msg.id} style={ChatStyle.msgContainer}>
              <Text style={ChatStyle.msgContentContainer}>{msg.createdAt}</Text>

              <View style={finalStyle}>
                <Text style={ChatStyle.msgContent}>{msg.content}</Text>
              </View>
            </View>
          );
        })}

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
        <TouchableHighlight
          style={chatStyle.sendButtonContainer}
          onPress={() => {
            props.sendMessage();
          }}
          >
          <SvgArrow width={25} height={25} fill="#3B55EB"></SvgArrow>
        </TouchableHighlight>
      </View>

    </View>
  );

};