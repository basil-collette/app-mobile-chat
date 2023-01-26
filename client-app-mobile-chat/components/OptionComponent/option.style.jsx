import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#3C3C49"
  },
    containerHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: "#3B55EB",
      width: "100%",
      padding : 10
    },
    containerGearLogo: {
      flex: 0.45,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:"center",
      width: "100%"
    },
    containerBulle:{
      flexDirection: "column",
      alignItems: "center",
      justifyContent:"center",
      width: "100%",
    
      },
      bulle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width : 280,
        height : 110,
        borderRadius : 10,
        marginBottom: 25
      },
      triangleBulleDroite : {
        position : "absolute",
        width: 0,
        left : "100%",
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 15,
        borderBottomWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: "#CC5656",
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
    },
      triangleBulleGauche : {
        position : "absolute",
        width: 0,
        right : "100%",
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 15,
        borderBottomWidth: 10,
        borderTopWidth: 10,
        borderRightColor: "#AAAABC",
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
      },
      
});