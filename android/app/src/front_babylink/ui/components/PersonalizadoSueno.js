import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';
import DreamService from '../../infrastructure/repositories/ApiDreamRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalizadoSueno = ({navigation, route}) => {
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [scheduleList, setScheduleList] = useState(
    route.params?.scheduleList || [],
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    isError: false,
  });

  const showStartPicker = () => setStartPickerVisible(true);
  const hideStartPicker = () => setStartPickerVisible(false);
  const handleConfirmStart = date => {
    setStartTime(formatTime(date));
    hideStartPicker();
  };

  const showEndPicker = () => setEndPickerVisible(true);
  const hideEndPicker = () => setEndPickerVisible(false);
  const handleConfirmEnd = date => {
    setEndTime(formatTime(date));
    hideEndPicker();
  };

  const formatTime = date => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const strMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  const updateCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    setCurrentTime(`${String(hours).padStart(2, '0')}:${minutes} ${ampm}`);
  };

  useEffect(() => {
    updateCurrentTime();
    const now = new Date();
    const secondsUntilNextMinute = 60 - now.getSeconds();
    const timeoutId = setTimeout(() => {
      updateCurrentTime();
      const intervalId = setInterval(updateCurrentTime, 60000);
      return () => clearInterval(intervalId);
    }, secondsUntilNextMinute * 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {}, []);

  const castearHora = hora => {
    // Dividir la hora en componentes de tiempo y AM/PM
    const [time, modifier] = hora.split(' ');

    // Dividir la hora y los minutos
    let [hours, minutes] = time.split(':');

    // Convertir a número
    hours = parseInt(hours, 10);

    // Si es PM y no es 12 PM, sumar 12 a la hora
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }

    // Si es AM y es 12 AM, convertir a 0 horas (medianoche)
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    // Asegurar que los minutos tienen dos dígitos
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    // Asegurar que las horas tienen dos dígitos
    const hoursStr = hours.toString().padStart(2, '0');

    // Formatear en 24 horas
    return `${hoursStr}:${minutes}:00`;
  };

  const guardarSueno = async () => {
  
    try {
      let bebe = await AsyncStorage.getItem("bebe");
  
      bebe = JSON.parse(bebe);
     
      const IdBaby = bebe.IdBaby;

      const dream = {
        IdDream: 0,
        IdBaby, // Esto lo recuperan del local storage
        initialHour: castearHora(startTime),
        finalHour: castearHora(endTime),
        IsActivated: 0,
      };
      
     
      const response = await DreamService.guardar(dream);
      console.log(response)
      setModalVisible(false);
    } catch (error) {
    
    }
  };

  const handleSave = () => {
    if (startTime && endTime) {
      const start = parseTime(startTime);
      const end = parseTime(endTime);
      if (start < end) {
        const newSchedule = {startTime, endTime};
        const updatedScheduleList = [...scheduleList, newSchedule];

        setModalContent({
          title: 'Horarios guardados',
          message: `Inicio: ${startTime}\nFin: ${endTime}`,
          isError: false,
        });
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('ListaSueno', {newSchedule});
        }, 2000);
      } else {
        setModalContent({
          title: 'Error',
          message: 'La hora de inicio debe ser anterior a la hora de fin.',
          isError: true,
        });
        setModalVisible(false);
      }
    } else {
      setModalContent({
        title: 'Error',
        message: 'Por favor, selecciona ambos horarios.',
        isError: true,
      });
      setModalVisible(true);
    }
  };

  const parseTime = timeString => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    return new Date(1970, 0, 1, hours, minutes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Buenas noches, Andrea</Text>
      <Ionicons name="star" style={styles.star1} />
      <Ionicons name="star" style={styles.star2} />
      <Ionicons name="star" style={styles.star3} />
      <Ionicons name="star" style={styles.star4} />
      <Image
        source={require('../../assets/images/circulo2.png')}
        style={styles.image29}
      />
      <View style={styles.rectangle50} />
      <Text style={styles.title}>Personaliza tus horarios</Text>
      <Text style={styles.label}>Hora de inicio</Text>
      <Text style={styles.endLabel}>Hora de fin</Text>
      <TouchableOpacity
        style={styles.startTimeContainer}
        onPress={showStartPicker}>
        <TextInput
          style={styles.startTimeInput}
          placeholderTextColor="#000"
          value={startTime}
          editable={false}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.endTimeContainer} onPress={showEndPicker}>
        <TextInput
          style={styles.endTimeInput}
          placeholderTextColor="#000"
          value={endTime}
          editable={false}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showStartPicker}>
        <Image
          source={require('../../assets/images/reloj1.png')}
          style={styles.whatsAppImage1}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showEndPicker}>
        <Image
          source={require('../../assets/images/reloj1.png')}
          style={styles.whatsAppImage2}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="time"
        onConfirm={handleConfirmStart}
        onCancel={hideStartPicker}
      />
      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="time"
        onConfirm={handleConfirmEnd}
        onCancel={hideEndPicker}
      />
      <Image
        source={require('../../assets/images/sol.png')}
        style={styles.sun}
      />
      <View style={styles.rectangle54} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Guardar</Text>
      </TouchableOpacity>
      <Text style={styles.time}>{currentTime}</Text>
      <View style={styles.circle} />
      <Image
        source={require('../../assets/images/luna2.png')}
        style={styles.moon}
      />

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          {!modalContent.isError ? null : (
            <Image
              source={require('../../assets/images/tacha1.jpeg')}
              style={styles.errorIcon}
            />
          )}
          <Text
            style={
              modalContent.isError ? styles.errorTitle : styles.successTitle
            }>
            {modalContent.title}
          </Text>
          <Text style={styles.errorMessage}>{modalContent.message}</Text>
          <TouchableOpacity
            onPress={() => {
              const start = parseTime(startTime);
              const end = parseTime(endTime);
              if (start < end) guardarSueno();
              else setModalVisible(false);
            }}
            style={styles.okButton}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const colors = {
  primaryBackground: '#070F22',
  secondaryBackground: '#EDF0F9',
  accent: '#141C2F',
  text: '#000000',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  greeting: {
    position: 'absolute',
    width: 324,
    height: 38,
    left: 53,
    top: 49,
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: colors.white,
  },
  star1: {
    position: 'absolute',
    fontSize: 14,
    left: 39,
    top: 186,
    color: colors.white,
  },
  star2: {
    position: 'absolute',
    fontSize: 14,
    left: 96,
    top: 20,
    color: colors.white,
  },
  star3: {
    position: 'absolute',
    fontSize: 14,
    left: 370,
    top: 242,
    color: colors.white,
  },
  star4: {
    position: 'absolute',
    fontSize: 8,
    left: 406,
    top: 136,
    color: colors.white,
  },
  image29: {
    position: 'absolute',
    width: 337,
    height: 338,
    left: 30,
    top: 150,
  },
  rectangle50: {
    position: 'absolute',
    width: 400,
    height: 320,
    left: -3,
    top: 510,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 30,
  },
  title: {
    position: 'absolute',
    width: 230,
    height: 24,
    left: 100,
    top: 527,
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: 0.05,
    color: colors.text,
  },
  startTimeContainer: {
    position: 'absolute',
    width: 158,
    height: 54,
    left: 15,
    top: 640,
    backgroundColor: colors.secondaryBackground,
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startTimeInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    color: colors.text,
  },
  endTimeContainer: {
    position: 'absolute',
    width: 158,
    height: 54,
    left: 220,
    top: 640,
    backgroundColor: colors.secondaryBackground,
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endTimeInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    color: colors.text,
  },
  label: {
    position: 'absolute',
    width: 150,
    height: 20,
    left: 10,
    top: 609,
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: colors.text,
  },
  endLabel: {
    position: 'absolute',
    width: 100,
    height: 22,
    left: 237,
    top: 609,
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: colors.text,
  },
  sun: {
    position: 'absolute',
    width: 40,
    height: 46.22,
    left: 210,
    top: 551,
  },
  rectangle54: {
    position: 'absolute',
    width: 345,
    height: 59,
    left: 39,
    top: 834,
    backgroundColor: colors.accent,
  },
  whatsAppImage1: {
    position: 'absolute',
    width: 31,
    height: 31,
    left: 22,
    top: 650,
  },
  whatsAppImage2: {
    position: 'absolute',
    width: 31,
    height: 31,
    left: 227,
    top: 650,
  },
  saveButton: {
    position: 'absolute',
    width: 325,
    height: 50,
    left: 40,
    top: 721,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  saveText: {
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 39,
    textAlign: 'center',
    letterSpacing: 0.1,
    color: colors.white,
  },
  time: {
    position: 'absolute',
    width: 116,
    height: 48,
    left: 155,
    top: 290,
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 40,
    lineHeight: 48,
    textAlign: 'center',
    letterSpacing: 0.1,
    color: colors.white,
  },
  circle: {
    position: 'absolute',
    width: 314,
    height: 312,
    left: 56,
    top: 214,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  moon: {
    position: 'absolute',
    width: 47,
    height: 47,
    left: 176.26,
    top: 551,
    transform: [{rotate: '10.96deg'}],
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  errorIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PersonalizadoSueno;
