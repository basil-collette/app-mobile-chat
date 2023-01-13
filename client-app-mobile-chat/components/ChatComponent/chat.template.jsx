import React from 'react';
import ChatStyle from "./chat.style.jsx";
import { View, Text, Button } from 'react-native';

export default function ChatTemplate(props) {

  return (
    <View style={ChatStyle.container}>
        <Text style={ChatStyle.title}>{props.userName}</Text>

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
        </View>
    </View>
  );

};