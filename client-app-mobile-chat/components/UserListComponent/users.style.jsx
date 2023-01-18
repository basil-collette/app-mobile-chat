import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  componentBody: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingBottom: 41,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  userListContainer: {
    width: '100%',
    maxHeight: '100%',
    flexDirection: "column",
    backgroundColor: "#3B55EB",
    borderRadius: 10,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  scrollViewContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#3B55EB",
    borderRadius: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: 50,
    backgroundColor: "#AAAABC",
    borderRadius: 7,
  },
  userContainerGap: {
    marginBottom: 5
  },
  profilButton: {
    height: "100%",
    borderRightWidth: 3,
    borderRightColor: "#3B55EB",
    justifyContent: "center",
    borderLeftRadius: 10,
    padding: 10
  },
  containerSendMessage: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10
  },
  SendButton: {
    height: "100%",
    justifyContent: "center",
    borderLeftRadius: 10,
    padding: 10,
    borderRadius: 10
  },
  triangle: {
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderRightWidth: 18,
    borderLeftWidth: 18,
    borderTopWidth: 21,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderTopColor: "#3B55EB"
  },
  titleAlign: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    margin: 7
  },
  alignBoxUser: {
    color: "white",
    paddingLeft: 10,
    marginRight: "auto"

  },
});