import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "#3C3C49"
  },
  messageList: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    width: "100%",
    flexGrow: 1,
    paddingVertical: 10
  },

  msgContainer: {
    flexDirection: "column",
    width: "100%",
  },
  msgInfo: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginBottom: 7
  },
  msgContainerInterlocutor: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 7
  },
  msgContainerConnectedUser: {
    width:"100%",
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 7
  },
  msgContentInterlocutor: {
    backgroundColor: "#3B55EB",
    borderRadius: 10,
    padding: 12,
    marginRight: 15,
    color: "white",
    fontSize: 18,
  },
  msgContentConnectedUser: {
    backgroundColor : "#AAAABC",
    borderRadius : 10,
    padding : 12,
    marginLeft: 15,
    color: "white",
    fontSize: 18,
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  triangleLeft: {
    borderRightWidth: 15,
    borderLeftWidth: 0,
    borderRightColor: "#3B55EB",
  },
  triangleRight: {
    borderLeftWidth: 15,
    borderRightWidth: 0,
    borderLeftColor: "#AAAABC",
  },

  messageBarContainer: {
    flexDirection: "row",
    backgroundColor : "#AAAABC",
    width : "100%",
    justifyContent:"center",
    padding : 10,
  },
   InputMessage: {
    flex: 1,
    color: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 10,
    padding: 5
  },
  sendButtonContainer: {
    paddingVertical: 10,
    alignContent: "center"
  },

});