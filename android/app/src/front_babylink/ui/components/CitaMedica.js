import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import CirculoImage from '../../assets/images/circulo.png';
import Accesorio from '../../assets/images/accesorio.png';
import CitasMedicasServices from '../../infrastructure/repositories/CitasMedicasServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const CitaMedica = () => {
  const navigation = useNavigation();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState('');
  const [isTimeValid, setIsTimeValid] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const validateTime = text => {
    const formattedText = text.replace(/[^0-9]/g, '');
    let newTime = '';
    if (formattedText.length >= 1) {
      newTime += formattedText.substring(0, 2);
    }
    if (formattedText.length >= 3) {
      newTime += ':' + formattedText.substring(2, 4);
    }
    setTime(newTime);

    const hours = parseInt(formattedText.substring(0, 2), 10);
    const minutes = parseInt(formattedText.substring(2, 4), 10);

    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      setIsTimeValid(true);
    } else {
      setIsTimeValid(false);
    }
  };

  const handleSave = async () => {
    if (!titulo) {
      setErrorMessage('Por favor, ingrese un título.');
      setModalVisible(true);
    } else if (!descripcion) {
      setErrorMessage('Por favor, ingrese una descripción.');
      setModalVisible(true);
    } else if (!selectedDate) {
      setErrorMessage('Por favor, seleccione una fecha.');
      setModalVisible(true);
    } else if (!time || !isTimeValid) {
      setErrorMessage(
        'Por favor, ingrese una hora válida en el formato hh:mm.',
      );
      setModalVisible(true);
    } else {
      let storage;
      let bebe;
      try {
        storage = await AsyncStorage.getItem('bebe');
        bebe = JSON.parse(storage);
        IdBaby = bebe.IdBaby;
      } catch (error) {}

      const newCita = {
        IdMedicalAppointment: 0,
        IdBaby: IdBaby, // Esta dato lo sacan del local storage
        title: titulo,
        description: descripcion,
        hour: `${time}:00`,
        date: selectedDate.toISOString().split('T')[0],
      };
      const response = await CitasMedicasServices.guardar(newCita);

      // Llamada a la API para guardar la cita
      // fetch('https://tu-api-url.com/citas', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newCita),
      // })
      //   .then(response => {
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      //     return response.json();
      //   })
      //   .then(data => {
      //     // Maneja la respuesta del servidor
      //     Alert.alert('Éxito', 'Cita guardada exitosamente');
      //     // Solo redirigir si la llamada a la API es exitosa
      //     navigation.navigate('RegistroCitas', { newCita });
      //   })
      //   .catch(error => {
      //     // Maneja errores
      //     console.error('Error:', error);
      //     setErrorMessage('Hubo un problema al guardar la cita. Inténtalo nuevamente.');
      //     setModalVisible(true);
      //   });

      // Simulación de redirección sin llamada a la API para propósitos de prueba
      navigation.navigate('RegistroCita', {newCita});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={CirculoImage} style={styles.circulo} />
        <Image source={Accesorio} style={styles.imagenDerecha} />
        <Text style={styles.title}>Cita Medica</Text>
        <View style={styles.ellipse} />
        <TextInput
          style={styles.inputTitulo}
          placeholder="Titulo"
          placeholderTextColor="#6c757d" // Color del placeholder
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripcion"
          placeholderTextColor="#6c757d" // Color del placeholder
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <View style={styles.calendarioContainer}>
          <MaterialCommunityIcons
            name="calendar-clock-outline"
            color="#1E1E1E"
            style={styles.iconC}
          />
          <Text style={styles.fechaLetra}>Fecha</Text>
          <Text
            style={[
              styles.fecha,
              {textDecorationLine: 'underline', color: 'black'},
            ]}>
            {selectedDate
              ? selectedDate.toISOString().split('T')[0]
              : 'Selecciona'}
          </Text>
          <TouchableOpacity onPress={toggleCalendar} style={styles.iconButton}>
            <AntDesign name="down" color="#1E1E1E" size={20} />
          </TouchableOpacity>
        </View>

        {showCalendar && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowCalendar(false);
              if (date) {
                setSelectedDate(date);
              }
            }}
          />
        )}

        <View style={styles.relojContainer}>
          <AntDesign name="clockcircleo" color="#1E1E1E" style={styles.icon} />
          <Text style={styles.fechaHora}>Hora</Text>
          <TextInput
            style={[styles.timeInput, !isTimeValid && styles.invalidInput]}
            placeholder="hh:mm"
            placeholderTextColor="#6c757d" // Color del placeholder
            value={time}
            onChangeText={validateTime}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>
        <View style={styles.amPmContainer}>
          <Text style={styles.amPm}>
            {time && time.split(':')[0] >= 12 ? 'pm' : 'am'}
          </Text>
        </View>

        <TouchableOpacity style={styles.buttonGuardar} onPress={handleSave}>
          <Text style={styles.textGuardar}>Guardar</Text>
        </TouchableOpacity>

        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.errorTitle}>Error</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.okButton}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circulo: {
    position: 'absolute',
    width: 286.83,
    height: 285,
    left: 134,
    top: -50.51,
    transform: [{rotate: '-10.35deg'}],
  },
  imagenDerecha: {
    position: 'absolute',
    width: 170,
    height: 144,
    left: -4,
    top: 90,
    resizeMode: 'cover',
    zIndex: 1,
  },
  title: {
    position: 'absolute',
    width: 160,
    height: 24,
    left: 148,
    top: 180,
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontSize: 25,
    lineHeight: 24,
    color: '#000000',
  },
  ellipse: {
    position: 'absolute',
    width: 415,
    height: 231,
    top: -26,
    backgroundColor: 'rgba(27, 139, 79, 0.4)',
    borderRadius: 40,
  },
  input: {
    position: 'absolute',
    width: 310,
    height: 60,
    left: 50,
    top: 370,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#1B8B4F',
    borderRadius: 10,
    textAlign: 'center',
    color: '#000000', // Color del texto
  },
  inputTitulo: {
    position: 'absolute',
    width: 310,
    height: 60,
    left: 50,
    top: 280,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#1B8B4F',
    borderRadius: 10,
    textAlign: 'center',
    color: '#000000', // Color del texto
  },
  calendarioContainer: {
    position: 'absolute',
    left: 46,
    top: 645,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fecha: {
    top: -100,
    marginLeft: 60,
    fontFamily: 'Urbanist',
    fontWeight: '800',
    fontSize: 21,
    lineHeight: 68,
    color: 'rgba(0, 0, 0, 0.85)',
  },
  fechaLetra: {
    top: -100,
    marginLeft: 20,
    fontFamily: 'Urbanist',
    fontSize: 22,
    fontWeight: '400',
    color: '#000000', // Color del texto
  },
  iconC: {
    top: -100,
    marginLeft: 10,
    fontFamily: 'Urbanist',
    fontSize: 25,
    fontWeight: '400',
    color: '#000000', // Color del texto
  },
  fechaHora: {
    top: -60,
    marginLeft: 16,
    fontFamily: 'Urbanist',
    fontSize: 22,
    fontWeight: '200',
    color: '#000000', // Color del texto
  },
  relojContainer: {
    position: 'absolute',
    left: 46,
    top: 543,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    top: -60,
    marginLeft: 89,
    width: 100,
    fontFamily: 'Urbanist',
    fontWeight: '800',
    fontSize: 21,
    lineHeight: 24,
    color: '#000000', // Color del texto
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    textAlign: 'center',
  },
  invalidInput: {
    borderBottomColor: 'red',
  },
  icon: {
    top: -60,
    marginLeft: 10,
    fontFamily: 'Urbanist',
    fontWeight: '400',
    fontSize: 21,
    lineHeight: 24,
    color: '#000000', // Color del texto
  },
  iconButton: {
    top: -95,
    height: 24,
    left: 10,
  },
  amPmContainer: {
    position: 'absolute',
    left: 276,
    top: 530, // Ajusta según sea necesario
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonGuardar: {
    position: 'absolute',
    width: 277,
    height: 64,
    left: 69,
    top: 672,
    backgroundColor: 'rgba(27, 139, 79, 0.4)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGuardar: {
    fontFamily: 'Inria Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 0.09,
    color: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 150,
    paddingVertical: 10,
    borderRadius: 15,
  },
  okButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CitaMedica;
