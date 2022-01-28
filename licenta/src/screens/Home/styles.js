import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bottomPanel: {
    flex: 1,
    backgroundColor: '#222B38',
  },
  container: {
    flex: 1,
    backgroundColor: '#202020',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  topPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#424242',
    borderBottomWidth: 1
  },
  stopsText: {
    color: '#C0C3D7',
  },
  editView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  editButton: {
    borderColor: '#424242',
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginRight: 10
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  info: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optimizeButton: {
    backgroundColor: '#2296F3',
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  optimizeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  listLocations: {
    paddingRight: 5,
    paddingLeft: 5
  },
  modalView: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: '50%',
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalViewLoading: {
    height: 300,
    marginLeft: 20,
    marginRight: 20,
    marginTop: '50%',
    backgroundColor: "black",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 59,
    color: '#fff',
    backgroundColor: '#18191A',
    fontSize: 17,
    margin: 10,
    borderWidth: 1,
  },
  textCancel: {
    color: "#0AB9EE",
    fontWeight: "bold",
    textAlign: 'right'
  },
  routeName: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    marginLeft: 20
  }
});

export default styles;