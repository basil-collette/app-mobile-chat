import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "#3C3C49"
  },
  scrollViewStyle: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    width : "100%",
    alignItems:"center",
    flexGrow:1,
    paddingVertical: 10

  },

  triangleBulleGauche : {
    position : "absolute",
    width: 0,
    height: 0,
    right: "100%",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 15,
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderRightColor: "blue",
    borderBottomColor: "transparent",
    borderTopColor: "transparent"
  },
  triangleBulleDroite : {
    position :"absolute",
    left : "100%",
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 15,
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "blue",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    zIndex: 100
},
  messageBarContainer: {
    flexDirection: "row",
    backgroundColor : "#AAAABC",
    width : "100%",
    justifyContent:"center",
    padding : 10,
  },
  msgContent : {
    color: "white", 
    fontSize: 18,
  },
  msgContainerContent: {
    color : "#AAAABC",
    fontSize:18,
    width : "100%",
  },
   InputMessage: {
    flex : 1,
    color: 'white',
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight : 10,
    padding : 5
  },
  sendButtonContainer : {
    paddingVertical : 10,
    alignContent :"center"

  },

  msgContentContainerInterlocutor : {
    backgroundColor : "#3B55EB",
    borderRadius : 10,
    padding : 12,
    alignSelf:"flex-start",
    marginBottom:7
  },

  msgContentContainerConnectedUser : {
    backgroundColor : "#AAAABC",
    borderRadius : 10,
    padding : 12,
    alignSelf:"flex-end",
    marginBottom:7
  },
  msgContainer:{
  flexDirection:"column",
  width:"100%",
  },
  msgContentContainer:{
    fontSize:16,
    color : "gray",
    textAlign:"center",
    marginBottom:7
    
    }
});