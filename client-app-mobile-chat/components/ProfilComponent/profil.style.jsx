import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems : "center",
    backgroundColor: "#3C3C49",
    paddingHorizontal: 20
  },
  profilNameContainer : {
    position:"absolute",
    bottom : "100%",
  },
  inputContainer : {
  marginVertical:5
  },
  bulleContainer: {
    width: "100%",
    backgroundColor: "#3B55EB",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#3B55EB",
    borderRadius: 10,
    paddingTop:60,
  },

  triangle: {
    position: "absolute",
    width: 0,
    top: "112%",
    height: 0,
    borderStyle: "solid",
    borderRightWidth: 20,
    borderLeftWidth: 20,
    borderTopWidth: 25,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderTopColor: "#3B55EB",
    zIndex: 1000
  },
  input: {
    height: 46,
    width: 242,
    color: 'white',
    borderWidth: 2,
    borderRadius: 5,
    padding:10,
    borderColor: 'white',
    backgroundColor: '#AAAABC',
  },
  buttonSave: {
    color: 'white',
    fontSize: 17,
    backgroundColor: "#8093FF",
    height: 41,
    width: 115,
    borderRadius: 14,
    padding : 10,
    marginTop:30,
    marginBottom : 34
  },
  buttonSaveText : {
    color: '#fff',
    textAlign: 'center',
  }
});