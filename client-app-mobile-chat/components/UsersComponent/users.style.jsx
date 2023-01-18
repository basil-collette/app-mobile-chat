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
    padding: 10,
    marginBottom: 25
  },
  bulleContainer: {
    flex: 0.95,
    width: "90%",
    backgroundColor: "#3B55EB",
    borderRadius: 10,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20
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
    height: 50,
    backgroundColor: "#AAAABC",
    borderRadius: 7,
    marginBottom: 10,
    width: "100%",
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
    position: "absolute",
    width: 0,
    top: "102%",
    right: "50%",
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 20,
    borderLeftWidth: 20,
    borderTopWidth: 25,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderTopColor: "#3B55EB",
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