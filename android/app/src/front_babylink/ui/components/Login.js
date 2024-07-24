import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {
  Modal,
  Portal,
  Button,
  Provider,
  Text as PaperText,
} from 'react-native-paper';
import closeIcon from '../../assets/images/tacha1.jpeg';
import styles from '../../Styles/registroStyles'; // Reutilizando los estilos de registroStyles
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../../infrastructure/repositories/ApiUserRepository';

const {width, height} = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('danira@gmail.com');
  const [contrasena, setContraseña] = useState('123456');
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleEmailChange = text => setEmail(text);
  const handleContraseñaChange = text => setContraseña(text);

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    console.clear();
    if (!email || !contrasena) {
      setErrorMessage('Por favor, complete todos los campos.');
      setVisible(true);
    } else if (!validateEmail(email)) {
      setErrorMessage('Por favor, ingrese un correo electrónico válido.');
      setVisible(true);
    } else {
      // Aquí puedes agregar la lógica de autenticación
   
      const response = await UserService.login(email, contrasena);
      
      try {
        AsyncStorage.setItem('usuario', JSON.stringify(response.value));
        console.log(response.value);
      } catch (error) {
        // console.log({error})
      }

      if (response.value.IdUser !== 0) {
        navigation.navigate('Inicio');
       
      }
    }
  };

  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={[styles.circleContainer, {height: height * 0.4}]}>
              <Svg
                height={height * 0.8}
                width={width}
                viewBox={`0 0 ${width} ${height * 0.8}`}>
                <Circle
                  cx={width / 2}
                  cy={height * 0.4}
                  r={height * 0.4}
                  fill="#4CCFC0"
                />
              </Svg>
            </View>
            <View style={[styles.headerContainer, {marginTop: height * 0.09}]}>
              <Image
                source={require('../../assets/images/niño2.png')}
                style={{width: 180, height: 180, resizeMode: 'contain'}}
              />
            </View>
            <View style={[styles.formContainer, {marginTop: -30, padding: 30}]}>
              <Text style={styles.formHeaderText}>INICIAR SESIÓN</Text>
              <View style={styles.inputContainer}>
                <Image
                  source={require('../../assets/images/correo2.png')}
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.textInput, {color: '#000'}]}
                  placeholder="Correo Electrónico"
                  onChangeText={handleEmailChange}
                  value={email}
                  keyboardType="email-address"
                  placeholderTextColor="#888"
                />
              </View>
              <View style={styles.inputContainer}>
                <Image
                  source={require('../../assets/images/candado.png')}
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.textInput, {color: '#000'}]}
                  placeholder="Contraseña"
                  onChangeText={handleContraseñaChange}
                  value={contrasena}
                  secureTextEntry
                  placeholderTextColor="#888"
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>INGRESAR</Text>
              </TouchableOpacity>
              <View style={styles.socialContainer}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/facebook.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/google.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/gorjeo.png')}
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.registerLink}
                onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.registerLinkText}>
                  ¿No tienes una cuenta?{' '}
                  <Text style={styles.boldText}>Regístrate</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}>
            <Image source={closeIcon} style={styles.closeIcon} />
            <PaperText style={styles.modalTitle}>Error</PaperText>
            <PaperText style={styles.modalMessage}>{errorMessage}</PaperText>
            <Button
              mode="contained"
              onPress={hideModal}
              style={styles.modalButton}>
              OK
            </Button>
          </Modal>
        </Portal>
      </KeyboardAvoidingView>
    </Provider>
  );
};

export default Login;
