import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BabyService from '../../infrastructure/repositories/ApiBbayRepositor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistroBebe = () => {
  const [bebe, setBebe] = useState(bebe);
  const route = useRoute();
  const [relacion, setRelacion] = useState();
  const [nombreBebe, setNombreBebe] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [genero, setGenero] = useState('');
  const [peso, setPeso] = useState('');
  const [estatura, setEstatura] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleConfirm = date => {
    date = new Date(date);
    date = date.toISOString().split('T')[0];
    setFechaNacimiento(date);
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);



  const cargarDatos = () => {
    // const bebe =  ?? undefined;
  //  console.log(route.params)
    if (route.params && route.params.bebe !== undefined) {
      const bebe = route.params.bebe;
      setNombreBebe(bebe.nameBaby);
      setRelacion(bebe.userRol);
      setEstatura(bebe.height + '');
      setPeso(bebe.weight + '');
      
      setFechaNacimiento(bebe.birthdate);
      if (+bebe.gender === 1) {
        setGenero('niño');
      } else {
        setGenero('niña');
      }
      setBebe(bebe);
    }
  };

  const handleEnviar = async () => {
    setIsLoading(true);
    try {
      let response = await AsyncStorage.getItem('usuario');
      if (!response)
        throw new Error('No se encontró el usuario en AsyncStorage.');

      const parsedUsuario = JSON.parse(response);
      const IdUser = parsedUsuario.IdUser ?? 0;
   
      let IdBaby = 0;
     console.log({bebe})
      if (bebe!== undefined) {
        IdBaby = bebe.IdBaby;
      }
      const baby = {
        IdBaby,
        birthdate: fechaNacimiento,
        gender: genero === 'niño' ? 1 : 0,
        IdUser: IdUser,
        nameBaby: nombreBebe,
        userRol: relacion,
        weight: peso,
        height: estatura,
      };
      console.log({baby})
      let responseBaby = await BabyService.guardar(baby);

      await AsyncStorage.setItem('bebe', JSON.stringify(responseBaby.value));
      console.log('Bebe:', responseBaby)
    
        navigation.navigate('Inicio');
    } catch (error) {
      console.error('Error al enviar datos del bebé:', error.message);
      // Muestra un mensaje de error al usuario aquí
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bebe2.png')} // Asegúrate de tener la ruta correcta de la imagen
      style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handl  ">
          <View style={styles.innerContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Háblanos un poco de tu bebé</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tu relación con el bebé</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={relacion}
                  style={styles.picker}
                  onValueChange={itemValue => setRelacion(itemValue)}>
                  <Picker.Item label="Selecciona tu relación" value="" />
                  <Picker.Item label="Madre" value="madre" />
                  <Picker.Item label="Padre" value="padre" />
                  <Picker.Item label="Otro" value="otro" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre de tu bebé</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Nombre del bebé"
                placeholderTextColor="#999"
                value={nombreBebe}
                onChangeText={setNombreBebe}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Fecha de nacimiento</Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setDatePickerVisibility(true)}>
                <Text style={styles.datePickerButtonText}>
                  {fechaNacimiento ? fechaNacimiento : 'Selecciona una fecha'}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Peso del bebé"
                placeholderTextColor="#999"
                value={peso}
                onChangeText={texto => {
                  if (texto.length === 0) {
                    setPeso('');
                  } else {
                    const regex = /^\d*\.?\d*$/;
                    value = regex.test(texto);
                    if (value) setPeso(texto);
                  }
                }}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Estatura (cm)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Estatura del bebé"
                placeholderTextColor="#999"
                value={estatura}
                onChangeText={texto => {
                  if (texto.length === 0) {
                    setEstatura('');
                  } else {
                    const regex = /^\d*\.?\d*$/;
                    value = regex.test(texto);
                    if (value) setEstatura(texto);
                  }
                }}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Género</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    genero === 'niño' && styles.genderButtonSelected,
                  ]}
                  onPress={() => setGenero('niño')}>
                  <Image
                    source={require('../../assets/images/hombre.png')}
                    style={styles.icon}
                  />
                  <Text
                    style={[
                      styles.genderButtonText,
                      genero === 'niño' && styles.genderButtonTextSelected,
                    ]}>
                    Niño
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    genero === 'niña' && styles.genderButtonSelected,
                  ]}
                  onPress={() => setGenero('niña')}>
                  <Image
                    source={require('../../assets/images/nina.png')}
                    style={styles.icon}
                  />
                  <Text
                    style={[
                      styles.genderButtonText,
                      genero === 'niña' && styles.genderButtonTextSelected,
                    ]}>
                    Niña
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.submitContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleEnviar}
                disabled={isLoading}>
                <LinearGradient
                  colors={['#4CCFC0', '#2a9d8f']}
                  style={styles.gradient}>
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.submitButtonText}>Enviar</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'Urbanist-Bold',
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Urbanist-Regular',
    color: '#333',
    marginBottom: 10,
  },
  textInput: {
    height: 50,
    borderColor: '#4CCFC0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontFamily: 'Urbanist-Regular',
    color: '#333', // Añadir color al texto
  },
  pickerWrapper: {
    height: 50,
    borderColor: '#4CCFC0',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
  },
  picker: {
    color: '#333', // Añadir color al texto del Picker
    width: '100%',
  },
  datePickerButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CCFC0',
    borderRadius: 10,
  },
  datePickerButtonText: {
    color: '#fff',
    fontFamily: 'Urbanist-Regular',
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CCFC0',
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Agregado para centrar horizontalmente
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  genderButtonSelected: {
    backgroundColor: '#4CCFC0',
  },
  genderButtonText: {
    color: '#4CCFC0',
    fontFamily: 'Urbanist-Regular',
    fontSize: 16,
    textAlign: 'center', // Agregado para centrar el texto horizontalmente
  },
  genderButtonTextSelected: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center', // Agregado para centrar el texto horizontalmente
  },
  submitContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  submitButton: {
    borderRadius: 10,
    height: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CCFC0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
    textTransform: 'uppercase', // Texto en mayúsculas
    letterSpacing: 1, // Espaciado entre letras
  },
});

export default RegistroBebe;
