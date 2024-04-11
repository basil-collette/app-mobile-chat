import { StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
  toastcontainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    paddingTop: StatusBar.currentHeight + 10,
    paddingHorizontal: 20
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius : 10,
  },
  toastError: {
    backgroundColor: '#CC5656'
  },
  toastInfo: {
    backgroundColor: '#3BCBEB'
  },
  toastSuccess: {
    backgroundColor: '#46C843'
  } ,

  toastMessage: {
    color : "white",
    marginLeft : 10
  }
});