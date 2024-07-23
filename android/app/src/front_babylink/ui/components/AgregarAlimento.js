import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import AlimnetoServicio from '../../infrastructure/repositories/ApiAlimentacionRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgregarAlimento = ({navigation,item}) => {

 

  const [title, setTitle] = useState('');
  const [time, setTime] = useState(new Date());
  const [timeRef, setTimeRef] = useState('');
  const [notes, setNotes] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSave = async () => {
    if (title.trim() === '') {
      setModalVisible(true);
      return;
    }

    try {
      let bebe = await AsyncStorage.getItem('bebe');
      bebe = JSON.parse(bebe);
      const IdBaby = bebe.IdBaby;

      const newAlimento = {
        IdFedding: 0,
        IdBaby,
        title: title,
        hour: timeRef,
        notes: notes,
      };
      const response = await AlimnetoServicio.guardar(newAlimento);
    } catch (error) {
      
    }

    // Aquí puedes manejar el guardado de los datos
    navigation.navigate('AlimentoList');
  };

  const castTime = dateString => {
    const date = new Date(dateString);

    // Obtener la hora en formato de 24 horas (HH:mm)
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
    return formattedTime + ':00';
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
    setTimeRef(castTime(currentTime));
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Registro de comida</Text>
        <View style={styles.form}>
          <Image
            source={require('../../assets/images/BEBEADD.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Título</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.text}>Hora de comida</Text>
          <TouchableOpacity
            style={styles.timeContainer}
            onPress={showTimepicker}>
            <Image
              source={require('../../assets/images/reloj1.png')}
              style={styles.icon}
            />
            <Text style={styles.timeText}>
              {time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>
          <Text style={styles.text}>Notas</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
        />
      )}
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Por favor, ingrese un título antes de guardar.
          </Text>
          <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90DBBC',
  },
  scrollViewContent: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#484343',
    fontFamily: 'Urbanist',
    letterSpacing: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    color: '#484343',
    marginBottom: 5,
    fontFamily: 'Urbanist',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  form: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 55,
  },
  input: {
    width: '100%',
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 15,
    borderRadius: 12,
    shadowColor: '#000',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  icon: {
    marginRight: 10,
    width: 25,
    height: 25,
  },
  timeText: {
    fontSize: 16,
    color: '#484343',
  },
  notesInput: {
    height: 80,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#C1C1C1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#1B8B4F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AgregarAlimento;
