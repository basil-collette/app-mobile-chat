import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  body: {
    flex:1,
    width: '100%',
    flexDirection: "column",
    justifyContent: "center",
    alignItems : "center",
    backgroundColor: "#3C3C49",
    paddingHorizontal: 20,
    overflow: 'hidden'
  },

  container: {
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

  profilInfoContainer : {
    position:"absolute",
    bottom : "100%",
  },

  inputContainer : {
    marginVertical:5
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
    width: 115,
    height: 41,
    color: 'white',
    fontSize: 17,
    backgroundColor: "#8093FF",
    borderRadius: 14,
    padding : 10,
    marginTop:30,
    marginBottom : 34
  },
  buttonSaveText : {
    color: '#fff',
    textAlign: 'center',
  },

  triangle: {
    position: "absolute",
    top: "112%",
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderRightWidth: 20,
    borderLeftWidth: 20,
    borderTopWidth: 25,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderTopColor: "#3B55EB",
    zIndex: 1000
  }  
  
});