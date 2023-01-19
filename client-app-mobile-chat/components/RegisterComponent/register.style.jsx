
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height : "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3C3C49"
  },
    containerHeader: {
      position : "relative",
      height : "25%",
      width: "100%"
    },
      circleLeft: {
        position : "absolute",
        width: 2000,
        height: 750,
        borderRadius: 1000 / 2,
        backgroundColor: "#D9D9D9",
        bottom : 70,
        right : 30,
        zIndex: 10
      },
      circleRight:{
        position : "absolute",
        width: 400,
        bottom: 15,
        left : 150,
        height: 500,
        borderRadius: 500 / 2,
        backgroundColor: "#3B55EB",
      },
      triangleRight: {
        position : "absolute",
        width: 0,
        height: 0,
        bottom : 70,
        left : "50%",
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 200,
        borderBottomWidth: 130,
        borderLeftColor: "transparent",
        borderBottomColor: "#3B55EB",
        transform : [{rotate : "-35deg"}],
        zIndex: 100
      }, 
      triangleLeft: {
        position : "absolute",
        width: 0,
        height: 0,
        bottom : 70,
        right : "50%",
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 200,
        borderBottomWidth: 130,
        borderRightColor: "transparent",
        borderBottomColor: "#D9D9D9",
        transform : [{rotate : "35deg"}],
        zIndex: 100
      }, 
    containerForm: {
      height : "75%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
      logo: {
        width : 80,
        height : 80,
        resizeMode: 'contain',
        padding : 10,
      },
      title : {
        color : '#AAAABC',
        textAlign : 'center',
        fontSize : 23,
        marginBottom: 45
      },
      input: {
        height: 46,
        width: 242,
        color: 'white',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'white',
        backgroundColor: '#AAAABC',
        padding: 10,
        marginBottom : 10
      },
    containerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width : 240,
      marginBottom: 25
    },
      buttonSignIn: {
        color: 'white',
        fontSize: 17,
        backgroundColor: "#3B55EB",
        height: 41,
        width: 115,
        borderRadius: 14,
        padding : 10
      },
      textButtonSignIn: {
        color: '#fff',
        textAlign: 'center',
      },
      buttonBack: {
        fontSize: 17,
        backgroundColor: "transparent",
        borderWidth : 1,
        borderColor:'#8093FF',
        height: 41,
        width: 115,
        borderRadius: 10,
        padding : 10
      },
      textButtonBack: {
        color: '#8093FF',
        textAlign: 'center',
      },
    textTextRadio: {
      color: 'white',
      textAlign: 'center',
    },
  
  
  
  
  
});

