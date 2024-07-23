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
import styles from '../../Styles/registroStyles';
import UserService from '../../infrastructure/repositories/ApiUserRepository';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage"
const {width, height} = Dimensions.get('window');




const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleNombreChange = text => setNombre(text);
  const handleApellidoChange = text => setApellido(text);
  const handleEmailChange = text => setEmail(text);
  const handleContraseñaChange = text => setContrasena(text);

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const handleRegistro = async () => {
    if (!nombre || !apellido || !email || !contrasena) {
      setErrorMessage('Por favor, complete todos los campos.');
      setVisible(true);
    } else if (!validateEmail(email)) {
      setErrorMessage('Por favor, ingrese un correo electrónico válido.');
      setVisible(true);
    } else if (contrasena.length < 6 || contrasena.length > 8) {
      setErrorMessage('La contraseña debe tener entre 6 y 8 caracteres.');
      setVisible(true);
    } else {
      const user = {
        IdUser: 0,
        fullName: nombre,
        fullLastName: apellido,
        email: email,
        password: contrasena,
      };
      try {
        const response = await UserService.guardar(user);
        await AsyncStorage.setItem('usuario', JSON.stringify(response.value));
        console.log('se esta guardando esto:' , response)
        navigation.navigate('Bienvenida');
      } catch (error) {
        console.error('Error al guardar el usuario:', error);
        setErrorMessage('Ocurrió un error al guardar el usuario. Por favor, intente nuevamente.');
        setVisible(true);
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
              <Text style={styles.formHeaderText}>REGISTRO</Text>
              <View style={styles.inputContainer}>
                <Image
                  source={require('../../assets/images/avatar.png')}
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.textInput, {color: '#000'}]}
                  placeholder="Nombre"
                  onChangeText={handleNombreChange}
                  value={nombre}
                  placeholderTextColor="#888"
                />
              </View>
              <View style={styles.inputContainer}>
                <Image
                  source={require('../../assets/images/avatar.png')}
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.textInput, {color: '#000'}]}
                  placeholder="Apellido"
                  onChangeText={handleApellidoChange}
                  value={apellido}
                  placeholderTextColor="#888"
                />
              </View>
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
              <TouchableOpacity style={styles.button} onPress={handleRegistro}>
                <Text style={styles.buttonText}>REGISTRAR</Text>
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
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registerLinkText}>
                  ¿Ya tienes una cuenta?{' '}
                  <Text style={styles.boldText}>Logout</Text>
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

export default Registro;
