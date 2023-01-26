import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#3C3C49",
    color: "white",
    overflow: 'hidden'
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3B55EB",
    width: "100%",
    padding : 10
  },
  titleContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingRight: 15,
    paddingLeft: 5,
    backgroundColor: "white",
    paddingbackgroundColor: "white",
    alignItems:"center",
    borderRadius: 15
  },
  containerHomeLogo: {
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
    backgroundColor : "#3B55EB",
    borderRadius : 10,
    marginBottom: 25
  },
  bodyContainer: {
    backgroundColor: 'green',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20
  }
});