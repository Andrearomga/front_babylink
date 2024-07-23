import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 30,
    marginHorizontal: 23,
    shadowColor: '#00000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center',
    width: '90%',
  },
  formHeaderText: {
    fontSize: 28,
    color: '#1E1E1E',
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
    height: 50,
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CCFC0',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '60%',
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerLinkText: {
    color: '#1E1E1E',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  logoutLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  logoutLinkText: {
    color: '#1E1E1E',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#4CCFC0',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    width: '100%',
  },
});

export default styles;
