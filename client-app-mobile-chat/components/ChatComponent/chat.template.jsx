import { View, Text, TextInput, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import ChatStyle from "./chat.style.jsx";
import { SvgArrow } from '@assets/svg'

export default function ChatTemplate(props) {

  return (
    <View style={ChatStyle.body}>

      <ScrollView
        contentContainerStyle={ChatStyle.messageList}
        persistentScrollbar={true}
        ref={props.scrollView}
        onContentSizeChange={() => {
          props.scrollView.current.scrollToEnd({ animated: true, index: -1 }, 200);
        }}
        >
        {props.messages.length > 0
          && <TouchableOpacity
              style={ChatStyle.previousMessage}
              onPress = {() => props.getPreviousMessage()}>
                
            <Text style={{color:"#ffff"}}>Previous Messages</Text>
          </TouchableOpacity>}

        {props.messagesShowed.map((msg, index) => {
          const isConnectedUser = props.connectedUser.idUser == msg.userSender.idUser;
          const baseMsgContainer = (isConnectedUser) ? ChatStyle.msgContainerConnectedUser : ChatStyle.msgContainerInterlocutor;
          const finalMsgContainer = (index + 1 != props.messages.length) ? [baseMsgContainer, {marginBottom: 5}] : baseMsgContainer;
          const content = (isConnectedUser) ? ChatStyle.msgContentConnectedUser : ChatStyle.msgContentInterlocutor;
          const triangle = (isConnectedUser) ? ChatStyle.triangleRight : ChatStyle.triangleLeft;

          return (
            <View key={index} style={ChatStyle.msgContainer}>
              <Text style={ChatStyle.msgInfo}>{msg.userSender.prenom + ' - ' + msg.createdAt}</Text>

              <View style={finalMsgContainer}>
                {isConnectedUser ?
                  <>
                    <Text style={content}>{props.getFilteredMessageCallback(msg.content)}</Text>
                    <View style={[ChatStyle.triangle, triangle]}></View>
                  </>
                  :
                  <>
                    <View style={[ChatStyle.triangle, triangle]}></View>
                    <Text style={content}>{props.getFilteredMessageCallback(msg.content)}</Text>
                  </>
                }
              </View>
            </View>
          );
        })}

      </ScrollView>

      <View style={ChatStyle.messageBarContainer}>
        <TextInput
          ref={props.msgInput}
          style={ChatStyle.InputMessage}
          onChangeText={(e) => { props.updateMsgInput(e) }}
          onPressIn = {() => props.scrollView.current.scrollToEnd({ animated: true, index: -1 }, 200)}
        />

        <TouchableOpacity
          style={ChatStyle.sendButtonContainer}
          ref={props.refSendBtn}
          onPress={() => {
            props.sendMessage();
          }}
          >
          <SvgArrow width={25} height={25} fill="#3B55EB"></SvgArrow>
        </TouchableOpacity>
      </View>

    </View>
  );
};