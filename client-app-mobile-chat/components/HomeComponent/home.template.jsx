import React from 'react';
import HomeStyle from "./home.style.jsx";
import { View, Text, Button } from 'react-native';

export default function HomeTemplate(props) {

  return (
    <View style={HomeStyle.container}>
        <Button title="Write"
                onPress={() => {
                    props.writeMsg("test");
                }}>
        </Button>

        <View style={HomeStyle.containerForm}>
          {props.messages.map((msg) => {
              return (
                <Text key={msg} value={msg} style={styles.title}></Text>
              );
          })}
        </View>
    </View>
  );

};