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
  },

  container: {
    backgroundColor: "#3B55EB",
    borderRadius: 10,
    backgroundColor: "#3B55EB",
    padding: 30,
    paddingTop: 60
  },

  profilInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  profilInfoSVGContainer: {
    position: 'absolute',
    bottom: '100%',
    backgroundColor: "#AAAABC",
    borderRadius: 60
  },

  inputContainer: {
    
  },
  inputContainerGap: {
    marginBottom: 5
  },
  input: {
    height: 46,
    width: 242,
    color: 'white',
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 10,
    borderColor: 'white',
    backgroundColor: '#AAAABC',
  },

  containerButton: {
    width: 242,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  resetBtn: {
    fontSize: 17,
    backgroundColor: "transparent",
    borderWidth : 1,
    borderColor:'#ffffff',
    height: 41,
    width: 115,
    borderRadius: 14,
    padding : 10,
  },
  saveBtn: {
    fontSize: 17,
    backgroundColor: "#ffffff",
    height: 41,
    width: 115,
    borderRadius: 14,
    padding : 10
  },

  triangle: {
    width: 0,
    height: 0,
    marginTop: -1,
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